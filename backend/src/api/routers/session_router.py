from fastapi import APIRouter
from typing import Optional
import uuid
from pydantic import BaseModel

from ...models.conversation_session import ConversationSession
from ...models.chat_request import ChatRequest
from ...services.session_manager import SessionManager
from ...exceptions.chatbot_exceptions import (
    InvalidSessionIdException,
    SessionNotFoundException,
    ChatbotException
)

router = APIRouter()
session_manager = SessionManager()

# Define a separate model for session creation request
class SessionCreateRequest(BaseModel):
    user_preferences: Optional[dict] = None

@router.post("/sessions")
def create_session(request: SessionCreateRequest):
    """Create a new chat session."""
    # Create a new session
    session = session_manager.create_session(request.user_preferences)

    return {
        "session_id": session.session_id,
        "created_at": session.created_at.isoformat(),
        "status": "active"
    }


@router.get("/sessions/{session_id}/status")
def get_session_status(session_id: str):
    """Get the status of a specific session."""
    # Validate session_id format
    try:
        uuid.UUID(session_id)
    except ValueError:
        raise InvalidSessionIdException(session_id)

    session = session_manager.get_session(session_id)
    if not session:
        raise SessionNotFoundException(session_id)

    return {
        "session_id": session.session_id,
        "status": "active" if session.is_active else "inactive",
        "last_activity_at": session.last_activity_at.isoformat(),
        "message_count": len(session.messages)
    }