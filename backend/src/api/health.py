from fastapi import APIRouter
from .models import HealthResponse
from ..config.settings import settings
from datetime import datetime, timezone


router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint to verify the service is running.

    Returns:
        HealthResponse containing the status and version of the service
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc),
        version=settings.app_version
    )