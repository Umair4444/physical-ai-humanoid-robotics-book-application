# AI Chatbot API Documentation

## Overview

The AI Chatbot API provides a conversational interface for interacting with an AI agent specialized in robotics topics. The API supports session management, message exchange, and real-time communication via WebSocket.

## Base URL

All API endpoints are relative to:
```
https://your-deployment-url.com/api/v1
```

## Authentication

No authentication required for initial implementation.

## Common Headers

All requests should include:
```
Content-Type: application/json
Accept: application/json
```

## API Endpoints

### 1. Create Chat Session
Creates a new chat session for a user.

**Endpoint:** `POST /sessions`

**Description:** Initializes a new conversation session and returns the session ID.

**Request:**
```json
{
  "user_preferences": {
    "language": "en",
    "response_style": "helpful"
  }
}
```

**Response (201 Created):**
```json
{
  "session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "created_at": "2025-12-20T10:30:00Z",
  "status": "active"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error_code": "INVALID_PREFERENCES",
  "message": "Invalid user preferences provided"
}
```

### 2. Send Message
Sends a message to the AI agent and receives a response.

**Endpoint:** `POST /sessions/{session_id}/messages`

**Description:** Sends a user message to the AI agent and returns the AI's response.

**Path Parameters:**
- `session_id`: The unique identifier of the conversation session

**Request:**
```json
{
  "session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "message": "How does inverse kinematics work in robotics?"
}
```

**Response (200 OK):**
```json
{
  "session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "response": "Inverse kinematics in robotics is the mathematical process of determining the joint parameters needed to position a robot's end effector at a specific location and orientation...",
  "timestamp": "2025-12-20T10:31:00Z",
  "status": "success"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error_code": "MESSAGE_TOO_LONG",
  "message": "Message exceeds maximum length of 4000 characters"
}
```

**Error Response (404 Not Found):**
```json
{
  "error_code": "SESSION_NOT_FOUND",
  "message": "The specified session does not exist or has expired"
}
```

### 3. Get Conversation History
Retrieves the conversation history for a specific session.

**Endpoint:** `GET /sessions/{session_id}/history`

**Description:** Returns the complete conversation history for the specified session.

**Path Parameters:**
- `session_id`: The unique identifier of the conversation session

**Response (200 OK):**
```json
{
  "session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "messages": [
    {
      "message_id": "m1n2o3p4-q5r6-7890-1234-567890abcdef",
      "sender": "user",
      "content": "How does inverse kinematics work in robotics?",
      "timestamp": "2025-12-20T10:30:30Z",
      "status": "delivered"
    },
    {
      "message_id": "m1n2o3p4-q5r6-7890-1234-567890abcdef",
      "sender": "ai",
      "content": "Inverse kinematics in robotics is the mathematical process of determining the joint parameters needed to position a robot's end effector at a specific location and orientation...",
      "timestamp": "2025-12-20T10:31:00Z",
      "status": "delivered"
    }
  ],
  "status": "success"
}
```

**Error Response (404 Not Found):**
```json
{
  "error_code": "SESSION_NOT_FOUND",
  "message": "The specified session does not exist or has expired"
}
```

### 4. Clear Conversation History
Clears the conversation history for a specific session.

**Endpoint:** `DELETE /sessions/{session_id}/history`

**Description:** Clears all messages in the conversation history while keeping the session active.

**Path Parameters:**
- `session_id`: The unique identifier of the conversation session

**Response (200 OK):**
```json
{
  "session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "message": "Conversation history cleared successfully",
  "status": "success"
}
```

**Error Response (404 Not Found):**
```json
{
  "error_code": "SESSION_NOT_FOUND",
  "message": "The specified session does not exist or has expired"
}
```

### 5. Get Session Status
Checks the status of a specific session.

**Endpoint:** `GET /sessions/{session_id}/status`

**Description:** Returns the current status of the specified session.

**Path Parameters:**
- `session_id`: The unique identifier of the conversation session

**Response (200 OK):**
```json
{
  "session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "status": "active",
  "last_activity_at": "2025-12-20T10:31:00Z",
  "message_count": 5
}
```

**Error Response (404 Not Found):**
```json
{
  "error_code": "SESSION_NOT_FOUND",
  "message": "The specified session does not exist or has expired"
}
```

## WebSocket Endpoints

### 1. Real-time Chat Connection
Establishes a real-time connection for chat communication.

**Endpoint:** `WS /ws/chat/{session_id}`

**Description:** Establishes a WebSocket connection for real-time chat communication. This allows for immediate delivery of AI responses without polling.

**Message Format:**
- Client to Server:
```json
{
  "type": "message",
  "content": "How does SLAM work in robotics?"
}
```

- Server to Client (Success):
```json
{
  "type": "response",
  "session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "content": "SLAM (Simultaneous Localization and Mapping) is a process where a robot builds a map of an unknown environment while simultaneously keeping track of its location within that map...",
  "timestamp": "2025-12-20T10:32:00Z"
}
```

- Server to Client (Error):
```json
{
  "type": "error",
  "error_code": "SESSION_EXPIRED",
  "message": "Session has expired due to inactivity"
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `MESSAGE_TOO_LONG` | 400 | Message exceeds maximum length of 4000 characters |
| `SESSION_NOT_FOUND` | 404 | Session does not exist or has expired |
| `SESSION_EXPIRED` | 400 | Session has timed out due to inactivity |
| `INVALID_PREFERENCES` | 400 | Invalid user preferences provided |
| `LLM_SERVICE_UNAVAILABLE` | 503 | The LLM service is temporarily unavailable |
| `INTERNAL_ERROR` | 500 | An unexpected error occurred on the server |

## Health Checks

### Health Check
Check if the service is running.

**Endpoint:** `GET /health`

**Description:** Returns the health status of the API service. This endpoint is useful for monitoring tools and deployment health checks.

**Response:**
```json
{
  "status": "healthy",
  "message": "AI Chatbot API is running",
  "version": "1.0.0",
  "python_version": "3.x.x (default, date)",
  "environment": "production|development|test|unknown",
  "timestamp": "2023-01-01T12:00:00.000000"
}
```

### Readiness Check
Check if the service is ready to accept requests.

**Endpoint:** `GET /ready`

**Description:** Provides readiness information for container orchestration. This endpoint indicates that the service is initialized and ready to process requests.

**Response:**
```json
{
  "status": "ready",
  "message": "AI Chatbot API is ready to accept requests",
  "version": "1.0.0",
  "python_version": "3.x.x (default, date)",
  "environment": "production|development|test|unknown",
  "timestamp": "2023-01-01T12:00:00.000000"
}
```

## Security

The API includes the following security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Content-Security-Policy: default-src 'self'`

Input sanitization is performed on all user-provided content to prevent injection attacks.

## Rate Limiting

The API implements rate limiting to prevent abuse:
- Maximum requests per minute: Configurable via environment variable (default: 60)
- Maximum tokens per minute: Configurable via environment variable (default: 100,000)

## Session Management

- Sessions automatically expire after 15 minutes of inactivity
- Session data is stored in memory with thread-safe access
- Expired sessions are automatically cleaned up by a background task
- Conversation history is limited to prevent exceeding LLM context window limits

## Environment Variables

The following environment variables are required for the API to function:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `OPENAI_BASE_URL`: The base URL for the OpenAI-compatible API (default: https://generativelanguage.googleapis.com/v1beta/openai/)
- `MODEL_NAME`: The name of the model to use (default: gemini-2.5-flash)
- `TEMPERATURE`: The temperature setting for the model (default: 0.7)
- `MAX_TOKENS`: The maximum number of tokens to generate (default: 1000)
- `REQUESTS_PER_MINUTE`: Maximum requests per minute (default: 60)
- `TOKENS_PER_MINUTE`: Maximum tokens per minute (default: 100000)