from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
import uuid

class ConversationSession(BaseModel):
    session_id: str
    created_at: datetime
    last_activity_at: datetime
    is_active: bool
    messages: List['Message'] = []
    user_id: Optional[str] = None

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# Import at the bottom to avoid circular import
from .message import Message