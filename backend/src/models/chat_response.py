from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class ChatResponse(BaseModel):
    session_id: str
    response: Optional[str] = None
    status: str  # "success" or "error"
    error_code: Optional[str] = None
    timestamp: datetime
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }