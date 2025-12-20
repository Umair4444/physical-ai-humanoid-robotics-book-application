from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Message(BaseModel):
    message_id: str
    session_id: str
    sender: str  # "user" or "ai"
    content: str
    timestamp: datetime
    status: str  # "sent", "delivered", "failed"
    response_to: Optional[str] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }