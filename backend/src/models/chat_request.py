from typing import Optional, Dict, Any
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    session_id: str = Field(..., description="The session ID for the conversation")
    message: str = Field(..., min_length=1, max_length=4000, description="The user's message content")
    user_preferences: Optional[Dict[str, Any]] = None