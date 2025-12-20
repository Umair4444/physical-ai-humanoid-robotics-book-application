from fastapi import APIRouter, HTTPException
from typing import Optional
import uuid
from datetime import datetime

from ...models.message import Message
from ...services.session_manager import SessionManager
from ...services.ai_service import AIService
from ...exceptions.chatbot_exceptions import ChatbotException

router = APIRouter()
session_manager = SessionManager()
ai_service = AIService()

@router.post("/chat/query")
async def chat_query_endpoint(request_data: dict):
    """
    Compatibility endpoint for frontend that expects a single chat endpoint.
    This endpoint handles both new sessions and existing sessions.
    """
    try:
        query = request_data.get('query', '')
        context = request_data.get('context', '')
        session_id = request_data.get('sessionId')

        if not query:
            raise HTTPException(status_code=400, detail={"error": "Query is required", "code": 400})

        if not session_id:
            # Create a new session
            session = session_manager.create_session({"language": "en"})
            session_id = session.session_id
        else:
            # Validate that the session exists
            session = session_manager.get_session(session_id)
            if not session:
                # Create a new session if the provided one doesn't exist
                session = session_manager.create_session({"language": "en"})
                session_id = session.session_id

        # Create user message
        user_message = Message(
            message_id=str(uuid.uuid4()),
            session_id=session_id,
            sender="user",
            content=query,
            timestamp=datetime.now(),
            status="sent"
        )

        # Add user message to session
        if not session_manager.add_message(session_id, user_message):
            raise HTTPException(status_code=404, detail="Session not found")

        # Format conversation history for the AI service
        formatted_history = session_manager.format_conversation_history(session_id)

        # Process the message with the AI service
        ai_response_content = await ai_service.process_message_with_context(
            formatted_history=formatted_history,
            user_message=query
        )

        # Validate the response
        if not await ai_service.validate_response(ai_response_content):
            # If validation fails, provide a fallback response
            ai_response_content = "I'm sorry, but I couldn't generate a proper response. Please try again."

        # Filter the response
        ai_response_content = ai_service.filter_response(ai_response_content)

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

        # Return response in the format expected by the frontend
        return {
            "id": str(uuid.uuid4()),
            "response": ai_response_content,
            "sources": [],  # Could be populated with source information if available
            "timestamp": datetime.now().isoformat(),
            "sessionId": session_id
        }

    except ChatbotException as e:
        raise HTTPException(status_code=400, detail={"error": e.message, "code": e.status_code})
    except Exception as e:
        raise HTTPException(status_code=500, detail={"error": str(e), "code": 500})