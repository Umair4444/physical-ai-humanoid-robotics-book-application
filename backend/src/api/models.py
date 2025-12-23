from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


# Request models
class ChatMessageRequest(BaseModel):
    """
    Model for a single chat message in the request.
    """
    sender: str = Field(..., description="Identifier of the message sender")
    content: str = Field(..., description="Content of the message", max_length=1000)
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow, description="When the message was sent")


class ChatContextRequest(BaseModel):
    """
    Model for conversation context in the request.
    """
    conversation_id: Optional[str] = Field(default=None, description="ID of the current conversation")
    previous_messages: Optional[List[ChatMessageRequest]] = Field(
        default=None,
        description="Previous messages in the conversation (short-lived context)"
    )
    tool_names: Optional[List[str]] = Field(
        default=None,
        description="List of specific tool names to use for this request"
    )
    use_specialized_knowledge: Optional[bool] = Field(
        default=True,
        description="Whether to use specialized textbook knowledge or general site knowledge only"
    )


class ChatRequest(BaseModel):
    """
    Model for the chat endpoint request.
    """
    message: str = Field(..., description="The user's message to the chatbot", max_length=1000)
    context: Optional[ChatContextRequest] = Field(default=None, description="Optional conversation context")


# Response models
class ToolCallResponse(BaseModel):
    """
    Model for a tool call in the response.
    """
    name: str = Field(..., description="Name of the tool that was called")
    arguments: Dict[str, Any] = Field(..., description="Arguments passed to the tool")


class ChatResponseMetadata(BaseModel):
    """
    Model for metadata in the chat response.
    """
    confidence: Optional[float] = Field(
        default=None,
        description="Confidence level of the response (0-1)",
        ge=0,
        le=1
    )
    sources: List[str] = Field(
        default_factory=list,
        description="Sources used to generate the response"
    )
    processing_time: Optional[float] = Field(
        default=None,
        description="Time taken to process the request in seconds"
    )
    tool_calls: List[ToolCallResponse] = Field(
        default_factory=list,
        description="Tools used to generate the response"
    )


class ChatResponse(BaseModel):
    """
    Model for the chat endpoint response.
    """
    response: str = Field(..., description="The AI-generated response to the user's message")
    metadata: ChatResponseMetadata = Field(
        default_factory=ChatResponseMetadata,
        description="Additional information about the response"
    )
    suggestions: List[str] = Field(
        default_factory=list,
        description="Suggested follow-up questions or topics"
    )


# Health check response model
class HealthResponse(BaseModel):
    """
    Model for the health check endpoint response.
    """
    status: str = Field(..., description="Health status of the service", json_schema_extra={"example": "healthy"})
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="ISO 8601 timestamp of the health check")
    version: str = Field(..., description="Version of the service", json_schema_extra={"example": "1.0.0"})