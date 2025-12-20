from fastapi import APIRouter
from typing import List
import uuid

from ...models.conversation_session import ConversationSession
from ...services.session_manager import SessionManager
from ...models.message import Message
from ...exceptions.chatbot_exceptions import (
    InvalidSessionIdException,
    SessionNotFoundException
)

router = APIRouter()
session_manager = SessionManager()

@router.get("/sessions/{session_id}/history")
def get_conversation_history(session_id: str):
    """Get the conversation history for a specific session."""
    # Validate session_id format
    try:
        uuid.UUID(session_id)
    except ValueError:
        raise InvalidSessionIdException(session_id)

    messages = session_manager.get_messages(session_id)
    if messages is None:
        raise SessionNotFoundException(session_id)

    # Format messages for response
    formatted_messages = []
    for msg in messages:
        formatted_messages.append({
            "message_id": msg.message_id,
            "sender": msg.sender,
            "content": msg.content,
            "timestamp": msg.timestamp.isoformat(),
            "status": msg.status
        })

    return {
        "session_id": session_id,
        "messages": formatted_messages,
        "status": "success"
    }


@router.delete("/sessions/{session_id}/history")
def clear_conversation_history(session_id: str):
    """Clear the conversation history for a specific session."""
    # Validate session_id format
    try:
        uuid.UUID(session_id)
    except ValueError:
        raise InvalidSessionIdException(session_id)

    success = session_manager.clear_messages(session_id)
    if not success:
        raise SessionNotFoundException(session_id)

    return {
        "session_id": session_id,
        "message": "Conversation history cleared successfully",
        "status": "success"
    }