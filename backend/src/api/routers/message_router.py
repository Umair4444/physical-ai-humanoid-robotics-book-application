from fastapi import APIRouter
from datetime import datetime
import uuid
import asyncio

from ...models.message import Message
from ...models.chat_request import ChatRequest
from ...models.chat_response import ChatResponse
from ...services.session_manager import SessionManager
from ...models.conversation_session import ConversationSession
from ...exceptions.chatbot_exceptions import (
    InvalidSessionIdException,
    MessageTooLongException,
    EmptyMessageException,
    SessionNotFoundException,
    LLMServiceUnavailableException
)
from ...services.ai_service import AIService

# Import the sanitization function
from ...utils.sanitization import sanitize_input

router = APIRouter()
session_manager = SessionManager()
ai_service = AIService()

@router.post("/sessions/{session_id}/messages")
async def send_message(session_id: str, request: ChatRequest):
    """Send a message to the AI agent and receive a response."""
    # Validate session_id format
    try:
        uuid.UUID(session_id)
    except ValueError:
        raise InvalidSessionIdException(session_id)

    # Sanitize the input message
    sanitized_message = sanitize_input(request.message)

    # Validate message length (max 4000 characters)
    if len(sanitized_message) > 4000:
        raise MessageTooLongException()

    if len(sanitized_message) == 0:
        raise EmptyMessageException()

    # Verify the session exists
    session = session_manager.get_session(session_id)
    if not session:
        raise SessionNotFoundException(session_id)

    # Create user message with sanitized content
    user_message = Message(
        message_id=str(uuid.uuid4()),
        session_id=session_id,
        sender="user",
        content=sanitized_message,
        timestamp=datetime.now(),
        status="sent"
    )

    # Add user message to session
    if not session_manager.add_message(session_id, user_message):
        raise SessionNotFoundException(session_id)

    try:
        # Format conversation history for the AI service
        formatted_history = session_manager.format_conversation_history(session_id)

        # Process the message with the AI service
        ai_response_content = await ai_service.process_message_with_context(
            formatted_history=formatted_history,
            user_message=sanitized_message
        )

        # Validate the response
        if not await ai_service.validate_response(ai_response_content):
            # If validation fails, provide a fallback response
            ai_response_content = "I'm sorry, but I couldn't generate a proper response. Please try again."

        # Filter the response
        ai_response_content = ai_service.filter_response(ai_response_content)

    except LLMServiceUnavailableException:
        # If the LLM service is unavailable, provide a fallback response
        ai_response_content = "I'm currently experiencing high demand. Please try again in a moment."

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
    session_manager.add_message(session_id, ai_message)

    return ChatResponse(
        session_id=session_id,
        response=ai_response_content,
        status="success",
        timestamp=datetime.now()
    )