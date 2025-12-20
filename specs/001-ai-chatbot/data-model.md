# Data Model: AI Chatbot Integration

## Overview
This document defines the data models for the AI Chatbot Integration feature, including entities, fields, relationships, and validation rules based on the feature requirements.

## Entities

### 1. ConversationSession
Represents a single chat session between the user and the AI agent.

**Fields:**
- `session_id` (string): Unique identifier for the conversation session (UUID)
- `created_at` (datetime): Timestamp when the session was created
- `last_activity_at` (datetime): Timestamp of the last activity in the session
- `is_active` (boolean): Whether the session is currently active
- `messages` (list[Message]): List of messages in the conversation
- `user_id` (string, optional): Identifier for the user (if implemented later)

**Validation Rules:**
- `session_id` must be unique
- `created_at` must be in the past
- `last_activity_at` must be greater than or equal to `created_at`
- `messages` must not exceed 4000 characters per message

**State Transitions:**
- Active → Inactive: After 15 minutes of inactivity
- Inactive → Active: When user starts a new conversation

### 2. Message
Represents a single message in the conversation.

**Fields:**
- `message_id` (string): Unique identifier for the message (UUID)
- `session_id` (string): Reference to the conversation session
- `sender` (string): Either "user" or "ai"
- `content` (string): The message content (up to 4000 characters)
- `timestamp` (datetime): When the message was sent
- `status` (string): "sent", "delivered", "failed"
- `response_to` (string, optional): Reference to the message this is a response to

**Validation Rules:**
- `sender` must be either "user" or "ai"
- `content` must be between 1 and 4000 characters
- `status` must be one of "sent", "delivered", "failed"
- `timestamp` must be in the past or present

### 3. ChatRequest
Represents a request from the frontend to the backend.

**Fields:**
- `session_id` (string): The session ID for the conversation
- `message` (string): The user's message content
- `user_preferences` (object, optional): User preferences for the session

**Validation Rules:**
- `session_id` must be a valid UUID string
- `message` must be between 1 and 4000 characters
- `message` must not be empty

### 4. ChatResponse
Represents a response from the backend to the frontend.

**Fields:**
- `session_id` (string): The session ID for the conversation
- `response` (string): The AI's response content
- `status` (string): "success", "error"
- `error_code` (string, optional): Error code if status is "error"
- `timestamp` (datetime): When the response was generated

**Validation Rules:**
- `status` must be either "success" or "error"
- If `status` is "error", `error_code` must be provided
- If `status` is "success", `response` must be provided and non-empty

## Relationships

### ConversationSession and Message
- One ConversationSession can have many Messages
- Relationship: One-to-Many (1:M)
- Cardinality: Each Message belongs to exactly one ConversationSession
- On deletion of ConversationSession: All associated Messages are deleted

## State Diagrams

### ConversationSession States
```
[Created] --> [Active] --> [Inactive]
     |            |            |
     |            |            |
     |            |            v
     +------------+------> [Archived]
```

- Created: Session is initialized when user first interacts
- Active: Session is currently in use (within 15-minute window)
- Inactive: Session has timed out due to inactivity
- Archived: Session data is cleaned up after extended inactivity

## Data Validation

### Message Length Validation
- User messages: 1-4000 characters
- AI responses: Up to 4000 characters
- Validation occurs at API entry point

### Session Timeout Validation
- Sessions automatically become inactive after 15 minutes of inactivity
- Last activity timestamp is updated on each interaction
- Background process may clean up old inactive sessions

## Storage Considerations

### In-Memory Storage Schema
For the initial implementation, data will be stored in memory using the following structure:

```python
# In-memory storage structure
conversations: Dict[str, ConversationSession] = {}
# Key: session_id, Value: ConversationSession object

# Each ConversationSession contains:
# - session metadata (id, timestamps, etc.)
# - list of messages in the conversation
```

### Thread Safety
- Dictionary access will be protected by threading locks
- Each operation on the conversation store will acquire the appropriate lock
- Background cleanup tasks will also use locks when accessing shared data

## API Integration Points

### Session Management
- Session creation via WebSocket connection or HTTP request
- Session retrieval using session_id
- Session timeout management with background tasks

### Message Handling
- Message storage upon receipt
- Message retrieval for conversation history
- Message validation before processing

## Future Considerations

### Scalability
- Migration to Redis or database storage when concurrent sessions exceed 100
- Session sharding based on session_id for distributed storage

### Persistence
- Optional database storage for conversation history
- Export functionality for user's conversation history

### Enhanced Models
- User model when authentication is implemented
- Enhanced message model with media attachments
- Metadata model for analytics and insights