from pydantic import BaseModel
from typing import Optional

class ErrorResponse(BaseModel):
    """Model for error responses."""
    status: str = "error"
    error_code: str
    message: str
    details: Optional[str] = None