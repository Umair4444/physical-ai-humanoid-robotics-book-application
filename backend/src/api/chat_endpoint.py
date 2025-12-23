from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from .models import ChatRequest, ChatResponse, ChatResponseMetadata, ToolCallResponse
from ..services.chat_service import ChatService
from ..models.chat_models import ChatMessage
from ..config.settings import settings
from datetime import datetime
import time
import logging


router = APIRouter()
chat_service = ChatService()


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatRequest):
    """
    Process a chat message and return an AI-generated response.

    Args:
        chat_request: The chat request containing the user's message and optional context

    Returns:
        ChatResponse containing the AI-generated response and metadata
    """
    try:
        # Start timing the request processing
        start_time = time.time()

        # Process the chat message using the service
        chat_response_model = await chat_service.process_chat_message(
            user_message=chat_request.message,
            conversation_context=chat_request.context.dict() if chat_request.context else None
        )

        # Calculate processing time
        processing_time = time.time() - start_time

        # Create the response metadata
        response_metadata = ChatResponseMetadata(
            confidence=chat_response_model.metadata.get("confidence") if chat_response_model.metadata else 0.9,
            sources=chat_response_model.metadata.get("sources", []) if chat_response_model.metadata else [],
            processing_time=processing_time,
            tool_calls=[
                ToolCallResponse(name=tool_call.get("name", ""), arguments=tool_call.get("arguments", {}))
                for tool_call in chat_response_model.tool_calls
            ] if chat_response_model.tool_calls else []
        )

        # Create and return the response
        return ChatResponse(
            response=chat_response_model.response_content,
            metadata=response_metadata,
            suggestions=chat_response_model.suggested_follow_ups
        )
    except Exception as e:
        logging.error(f"Error in chat endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request"
        )


@router.post("/chat-with-tools", response_model=ChatResponse)
async def chat_with_tools_endpoint(chat_request: ChatRequest):
    """
    Process a chat message using available tools and return an AI-generated response.

    Args:
        chat_request: The chat request containing the user's message and optional context

    Returns:
        ChatResponse containing the AI-generated response and metadata
    """
    try:
        # In a real implementation, we would have specific tools defined
        # For now, we'll pass an empty list of tools as a placeholder
        tool_names = []  # This would be populated with actual tool names in a real implementation

        # Start timing the request processing
        start_time = time.time()

        # Process the chat message with tools using the service
        chat_response_model = await chat_service.process_chat_message_with_tools(
            user_message=chat_request.message,
            tool_names=tool_names,
            conversation_context=chat_request.context.dict() if chat_request.context else None
        )

        # Calculate processing time
        processing_time = time.time() - start_time

        # Create the response metadata
        response_metadata = ChatResponseMetadata(
            confidence=chat_response_model.metadata.get("confidence") if chat_response_model.metadata else 0.9,
            sources=chat_response_model.metadata.get("sources", []) if chat_response_model.metadata else [],
            processing_time=processing_time,
            tool_calls=[
                ToolCallResponse(name=tool_call.get("name", ""), arguments=tool_call.get("arguments", {}))
                for tool_call in chat_response_model.tool_calls
            ] if chat_response_model.tool_calls else []
        )

        # Create and return the response
        return ChatResponse(
            response=chat_response_model.response_content,
            metadata=response_metadata,
            suggestions=chat_response_model.suggested_follow_ups
        )
    except Exception as e:
        logging.error(f"Error in chat with tools endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request"
        )