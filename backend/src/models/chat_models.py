from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class ChatMessage(BaseModel):
    """
    Model representing a single message in the conversation.
    """
    sender: str = Field(..., description="User identifier")
    content: str = Field(..., description="Message text")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="When sent")
    conversation_context: Optional[Dict[str, Any]] = Field(
        default=None, 
        description="Short-lived context per request"
    )


class ChatResponseModel(BaseModel):
    """
    Model for structured response from the AI agent.
    """
    response_content: str = Field(..., description="AI-generated text")
    metadata: Optional[Dict[str, Any]] = Field(
        default=None, 
        description="Confidence, sources, processing info"
    )
    suggested_follow_ups: List[str] = Field(
        default_factory=list, 
        description="Potential next questions/interactions"
    )
    tool_calls: List[Dict[str, Any]] = Field(
        default_factory=list, 
        description="List of tools used to generate the response"
    )


class ToolDefinition(BaseModel):
    """
    Model describing an available tool for the AI agent.
    """
    name: str = Field(..., description="Unique identifier for the tool")
    description: str = Field(..., description="Purpose and usage of the tool")
    parameters: Dict[str, Any] = Field(..., description="Schema for the tool's input parameters")
    # Note: We can't represent callable functions in Pydantic, so this would be handled separately in code


class ChatSession(BaseModel):
    """
    Model representing a conversation session (short-lived, per request).
    """
    session_id: str = Field(..., description="Unique identifier for the session")
    messages: List[ChatMessage] = Field(default_factory=list, description="List of ChatMessage objects")
    tools_used: List[str] = Field(default_factory=list, description="List of tools used in this session")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="When the session started")