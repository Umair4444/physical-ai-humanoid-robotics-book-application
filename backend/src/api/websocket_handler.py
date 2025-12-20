import asyncio
import json
from datetime import datetime
import uuid
from typing import Dict
from fastapi import WebSocket, WebSocketDisconnect

from ..models.message import Message
from ..services.session_manager import SessionManager
from ..models.conversation_session import ConversationSession
from ..exceptions.chatbot_exceptions import (
    MessageTooLongException,
    EmptyMessageException,
    SessionNotFoundException,
    InvalidSessionIdException,
    ChatbotException,
    LLMServiceUnavailableException
)
from ..services.ai_service import AIService

# Import the sanitization function
from ..utils.sanitization import sanitize_input

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}  # session_id -> WebSocket
        self.session_manager = SessionManager()
        self.ai_service = AIService()

    async def connect(self, websocket: WebSocket, session_id: str):
        """Accept a WebSocket connection for a specific session."""
        await websocket.accept()
        self.active_connections[session_id] = websocket

    def disconnect(self, session_id: str):
        """Remove a WebSocket connection."""
        if session_id in self.active_connections:
            del self.active_connections[session_id]

    async def send_personal_message(self, message: dict, session_id: str):
        """Send a message to a specific session's WebSocket."""
        if session_id in self.active_connections:
            await self.active_connections[session_id].send_text(json.dumps(message))

    async def broadcast(self, message: dict):
        """Send a message to all connected WebSockets."""
        for connection in self.active_connections.values():
            await connection.send_text(json.dumps(message))

manager = ConnectionManager()

async def handle_websocket_message(websocket: WebSocket, session_id: str, data: dict):
    """Handle incoming messages from WebSocket connections."""
    message_type = data.get("type")

    if message_type == "message":
        content = data.get("content", "")

        try:
            # Sanitize the input content
            sanitized_content = sanitize_input(content)

            # Validate message length
            if len(sanitized_content) > 4000:
                raise MessageTooLongException()

            if len(sanitized_content) == 0:
                raise EmptyMessageException()

            # Verify the session exists
            session = manager.session_manager.get_session(session_id)
            if not session:
                raise SessionNotFoundException(session_id)

            # Create user message with sanitized content
            user_message = Message(
                message_id=str(uuid.uuid4()),
                session_id=session_id,
                sender="user",
                content=sanitized_content,
                timestamp=datetime.now(),
                status="sent"
            )

            # Add user message to session
            if not manager.session_manager.add_message(session_id, user_message):
                raise SessionNotFoundException(session_id)

            # Format conversation history for the AI service
            formatted_history = manager.session_manager.format_conversation_history(session_id)

            # Process the message with the AI service
            ai_response_content = await manager.ai_service.process_message_with_context(
                formatted_history=formatted_history,
                user_message=sanitized_content
            )

            # Validate the response
            if not await manager.ai_service.validate_response(ai_response_content):
                # If validation fails, provide a fallback response
                ai_response_content = "I'm sorry, but I couldn't generate a proper response. Please try again."

            # Filter the response
            ai_response_content = manager.ai_service.filter_response(ai_response_content)

            # Create AI response message
            ai_message = Message(
                message_id=str(uuid.uuid4()),
                session_id=session_id,
                sender="ai",
                content=ai_response_content,
                timestamp=datetime.now(),
                status="sent"
            )

            # Add AI message to session
            manager.session_manager.add_message(session_id, ai_message)

            # Send the AI response back to the client
            await manager.send_personal_message({
                "type": "response",
                "session_id": session_id,
                "content": ai_response_content,
                "timestamp": datetime.now().isoformat()
            }, session_id)
        except LLMServiceUnavailableException:
            # If the LLM service is unavailable, provide a fallback response
            await manager.send_personal_message({
                "type": "error",
                "error_code": "LLM_SERVICE_UNAVAILABLE",
                "message": "I'm currently experiencing high demand. Please try again in a moment."
            }, session_id)
        except ChatbotException as e:
            await manager.send_personal_message({
                "type": "error",
                "error_code": e.error_code,
                "message": e.message
            }, session_id)
        except Exception as e:
            await manager.send_personal_message({
                "type": "error",
                "error_code": "INTERNAL_ERROR",
                "message": str(e)
            }, session_id)
    else:
        await manager.send_personal_message({
            "type": "error",
            "error_code": "INVALID_MESSAGE_TYPE",
            "message": f"Unknown message type: {message_type}"
        }, session_id)