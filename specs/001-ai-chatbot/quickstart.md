# Quickstart Guide: AI Chatbot Integration

## Overview
This guide provides step-by-step instructions to set up and run the AI Chatbot Integration feature for the Physical AI Humanoid Robotics Textbook project.

## Prerequisites

### System Requirements
- Python 3.9 or higher
- Node.js 18.x or higher
- npm or yarn package manager
- Git version control system

### Environment Setup
- Access to Google Gemini API (requires API key)
- Internet connection for external API calls

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-organization/physical-ai-humanoid-robotics-book-application.git
cd physical-ai-humanoid-robotics-book-application
```

### 2. Set up Backend (FastAPI)

#### Navigate to Backend Directory
```bash
# If there's a specific backend directory
cd backend
# Or if the backend is in the root
cd .
```

#### Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Python Dependencies
```bash
pip install "fastapi[standard]" uvicorn openai-agents openai python-multipart
```

#### Set Environment Variables
Create a `.env` file in the backend directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
MODEL_NAME=gemini-2.5-flash
```

### 3. Set up Frontend (Docusaurus)

#### Navigate to Frontend Directory
```bash
cd website  # or wherever the Docusaurus app is located
```

#### Install Node Dependencies
```bash
npm install
# or if using yarn
yarn install
```

## Configuration

### 1. Backend Configuration

#### Update OpenAI Client Configuration
In your FastAPI application, configure the OpenAI client to use the Google Gemini API:

```python
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL")
)
```

#### Configure Session Management
Set up in-memory storage for conversation sessions with 15-minute timeout:

```python
import threading
from datetime import datetime, timedelta
from typing import Dict, List, Optional

# Thread-safe storage for sessions
sessions: Dict[str, dict] = {}
sessions_lock = threading.Lock()

# Background task to clean up expired sessions
def cleanup_expired_sessions():
    # Implementation to remove sessions older than 15 minutes
    pass
```

### 2. Frontend Configuration

#### Update API Endpoint
In your Docusaurus app, update the API endpoint configuration to point to your backend:

```javascript
const API_BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v1';
```

#### Add WebSocket Connection
For real-time chat functionality, implement WebSocket connection in your chat component:

```javascript
const ws = new WebSocket(`ws://localhost:8000/ws/chat/${sessionId}`);
```

## Running the Application

### 1. Start the Backend Server

#### Run FastAPI Development Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

#### Verify Backend
Visit `http://localhost:8000/docs` to access the automatic API documentation.

### 2. Start the Frontend Server

#### Run Docusaurus Development Server
```bash
cd website
npm run start
# or
yarn start
```

The frontend will be available at `http://localhost:3000`

## Basic Usage

### 1. Creating a Chat Session
1. Visit the chat interface on your Docusaurus site
2. A new session will be created automatically
3. The session ID will be stored in browser's localStorage

### 2. Sending Messages
1. Type your question in the chat input field
2. Press Enter or click Send
3. The message will be sent to the backend
4. The AI response will appear in the chat interface

### 3. Managing Conversation History
- View conversation history by refreshing the page
- Clear conversation history using the "Clear Chat" button
- Session automatically expires after 15 minutes of inactivity

## API Testing

### 1. Test Session Creation
```bash
curl -X POST http://localhost:8000/api/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{"user_preferences": {"language": "en"}}'
```

### 2. Test Sending Messages
```bash
curl -X POST http://localhost:8000/api/v1/sessions/your-session-id/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "How does inverse kinematics work in robotics?"}'
```

## Troubleshooting

### Common Issues

#### 1. API Key Issues
**Problem:** "Invalid API key" errors
**Solution:** Verify that your `GEMINI_API_KEY` is correctly set in the environment variables

#### 2. Connection Issues
**Problem:** Cannot connect to backend from frontend
**Solution:** Ensure both servers are running and check CORS configuration in FastAPI

#### 3. Model Response Issues
**Problem:** Slow or no responses from AI model
**Solution:** Verify internet connectivity and API endpoint configuration

### Debugging Tips

#### Enable Detailed Logging
Add logging configuration to your FastAPI app:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

#### Check API Documentation
Use the automatic API documentation at `/docs` endpoint to verify request/response formats

## Development Workflow

### 1. Making Backend Changes
1. Update your Python code
2. The server will automatically reload (if using `--reload` flag)
3. Test changes using the API documentation or frontend

### 2. Making Frontend Changes
1. Update your React components in the Docusaurus app
2. Changes will automatically reload in the browser
3. Test the UI interactions with the backend

## Deployment

### 1. Backend Deployment
The backend can be deployed to any service that supports Python applications (e.g., Vercel, Heroku, AWS, etc.)

### 2. Frontend Deployment
The Docusaurus frontend can be deployed to Vercel, Netlify, or GitHub Pages:

```bash
npm run build
# The static files will be in the build/ directory
```

## Next Steps

1. Explore the [API documentation](http://localhost:8000/docs) for all available endpoints
2. Customize the chat UI components in your Docusaurus theme
3. Implement additional features based on the project specifications
4. Add tests to ensure functionality meets requirements
5. Review the data models and API contracts for advanced usage

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Docusaurus Documentation](https://docusaurus.io/)
- [OpenAI Agents SDK Documentation](https://github.com/openai/openai-agents-python)