# Frontend-Backend Integration Guide: AI Chatbot

## Overview
This guide provides instructions to connect your existing frontend chatbot to the backend API.

## API Endpoints
The backend provides the following endpoints for chatbot functionality:

### Session Management
- `POST /api/v1/sessions` - Create a new chat session
- `GET /api/v1/sessions/{session_id}/status` - Get session status
- `DELETE /api/v1/sessions/{session_id}/history` - Clear conversation history

### Message Handling
- `POST /api/v1/sessions/{session_id}/messages` - Send a message and receive response
- `GET /api/v1/sessions/{session_id}/history` - Get conversation history

### WebSocket
- `WS /ws/chat/{session_id}` - Real-time chat communication

## Implementation Steps

### 1. Environment Configuration
Update your frontend environment configuration to include the backend API URL:

```javascript
// In your environment configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws/chat';
```

### 2. Session Creation
When a user starts a new chat, create a session:

```javascript
async function createSession() {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_preferences: {
          language: 'en',
          response_style: 'helpful'
        }
      })
    });
    
    const data = await response.json();
    return data.session_id;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}
```

### 3. Message Sending
Send user messages to the backend:

```javascript
async function sendMessage(sessionId, message) {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}
```

### 4. WebSocket Integration
For real-time communication, establish a WebSocket connection:

```javascript
function connectWebSocket(sessionId) {
  const ws = new WebSocket(`${WS_BASE_URL}/${sessionId}`);
  
  ws.onopen = () => {
    console.log('Connected to chat WebSocket');
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'response') {
      // Handle AI response
      displayResponse(data.content);
    } else if (data.type === 'error') {
      // Handle error
      displayError(data.message);
    }
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  ws.onclose = () => {
    console.log('Disconnected from chat WebSocket');
  };
  
  return ws;
}

function sendMessageViaWebSocket(ws, message) {
  ws.send(JSON.stringify({
    type: 'message',
    content: message
  }));
}
```

### 5. Update Your Chatbot Component
Integrate the API calls into your existing chatbot component:

```javascript
import React, { useState, useEffect } from 'react';

function Chatbot() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [ws, setWs] = useState(null);
  
  // Initialize session and WebSocket when component mounts
  useEffect(() => {
    async function initializeChat() {
      try {
        // Create a new session
        const newSessionId = await createSession();
        setSessionId(newSessionId);
        
        // Connect WebSocket
        const newWs = connectWebSocket(newSessionId);
        setWs(newWs);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    }
    
    initializeChat();
    
    // Cleanup WebSocket connection on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return;
    
    // Add user message to UI
    const userMessage = { sender: 'user', content: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInputValue('');
    
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Send via WebSocket for real-time response
      sendMessageViaWebSocket(ws, inputValue);
    } else {
      // Fallback to REST API
      try {
        const response = await sendMessage(sessionId, inputValue);
        const aiMessage = { sender: 'ai', content: response, timestamp: new Date() };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  
  // Render your chat interface
  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
```

## Testing
1. Start your backend server: `uvicorn main:app --reload`
2. Start your frontend application
3. Open the chat interface
4. Verify that messages are sent to the backend and responses are received
5. Test WebSocket connection for real-time responses
6. Verify session management works correctly

## Troubleshooting
- Ensure your backend server is running and accessible
- Check CORS settings in your backend to allow frontend requests
- Verify environment variables are set correctly
- Check browser console for any JavaScript errors