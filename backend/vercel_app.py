from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import os
from dotenv import load_dotenv
import asyncio
import json

# Load environment variables
load_dotenv()

# Import logging configuration
from src.config.logging_config import logger

# Import sanitization utility
from src.utils.sanitization import sanitize_input

# Import routers
from src.api.routers.base_router import router as base_router
from src.api.routers.session_router import router as session_router
from src.api.routers.message_router import router as message_router
from src.api.routers.history_router import router as history_router
from src.api.routers.chat_query_router import router as chat_query_router

# Import exception handlers
from src.api.handlers.exception_handler import register_exception_handlers

# Import and run the cleanup task
from src.tasks.session_cleanup import run_cleanup_task
from src.services.session_manager import SessionManager


class SecurityMiddleware(BaseHTTPMiddleware):
    """Middleware to add security headers and sanitize input."""

    async def dispatch(self, request: Request, call_next):
        # Skip security headers for docs and redoc endpoints to ensure they work properly
        if request.url.path in ["/docs", "/redoc", "/openapi.json"]:
            response = await call_next(request)
            return response

        # Add security headers for all other requests
        response = await call_next(request)

        # Security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Referrer-Policy"] = "no-referrer-when-downgrade"
        response.headers["Content-Security-Policy"] = "default-src 'self'"

        return response


app = FastAPI(
    title="AI Chatbot API",
    description="API for the AI Chatbot Integration with the Physical AI Humanoid Robotics Textbook",
    version="1.0.0"
)

# Register exception handlers
register_exception_handlers(app)

# Add security middleware before CORS to ensure it's applied
app.add_middleware(SecurityMiddleware)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(base_router)
app.include_router(session_router, prefix="/api/v1")
app.include_router(message_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")
app.include_router(chat_query_router, prefix="/api/v1")

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to the AI Chatbot API"}

@app.get("/health")
def health_check():
    """
    Health check endpoint for the API.
    Returns status of the service and basic information.
    """
    import sys
    import os
    from datetime import datetime

    logger.info("Health check endpoint accessed")

    # Detect environment automatically based on Vercel environment variables
    # VERCEL_ENV is set by Vercel: 'production', 'preview', or 'development'
    vercel_env = os.getenv("VERCEL_ENV")
    # NODE_ENV might also be set
    node_env = os.getenv("NODE_ENV")
    # Custom ENVIRONMENT variable if set by user
    custom_env = os.getenv("ENVIRONMENT")

    # Determine environment in order of preference
    environment = custom_env or vercel_env
    # If no environment is set, determine if running locally
    if not environment:
        # Check if we're running locally (not in Vercel environment)
        if not os.getenv("VERCEL"):
            environment = "development"
        else:
            environment = "unknown"

    # Collect basic system information
    health_info = {
        "status": "healthy",
        "message": "AI Chatbot API is running",
        "version": "1.0.0",
        "python_version": sys.version,
        "environment": environment,
        "timestamp": datetime.now().isoformat(),
        "vercel_env": vercel_env,  # Vercel-specific environment
        "node_env": node_env,      # Node environment if available
        "custom_env": custom_env   # Custom environment if set
    }

    return health_info

@app.get("/ready")
def readiness_check():
    """Readiness check for container orchestration."""
    import sys
    import os
    from datetime import datetime

    logger.info("Readiness check endpoint accessed")

    # Detect environment automatically based on Vercel environment variables
    # VERCEL_ENV is set by Vercel: 'production', 'preview', or 'development'
    vercel_env = os.getenv("VERCEL_ENV")
    # NODE_ENV might also be set
    node_env = os.getenv("NODE_ENV")
    # Custom ENVIRONMENT variable if set by user
    custom_env = os.getenv("ENVIRONMENT")

    # Determine environment in order of preference
    environment = custom_env or vercel_env
    # If no environment is set, determine if running locally
    if not environment:
        # Check if we're running locally (not in Vercel environment)
        if not os.getenv("VERCEL"):
            environment = "development"
        else:
            environment = "unknown"

    # In a serverless environment, we can only check basic runtime conditions
    # More complex readiness checks would require persistent connections to DBs, etc.
    readiness_info = {
        "status": "ready",
        "message": "AI Chatbot API is ready to accept requests",
        "version": "1.0.0",
        "python_version": sys.version,
        "environment": environment,
        "timestamp": datetime.now().isoformat(),
        "vercel_env": vercel_env,  # Vercel-specific environment
        "node_env": node_env,      # Node environment if available
        "custom_env": custom_env   # Custom environment if set
    }

    return readiness_info

# Note: WebSocket functionality may not work properly in Vercel serverless functions
# The websocket endpoint would need special handling in a serverless environment

@app.on_event("startup")
async def startup_event():
    """Start background tasks on app startup."""
    logger.info("Starting up background tasks...")
    # Note: Background tasks in serverless environments are not persistent
    # The session cleanup task may not work as expected in Vercel
    # Consider using a different approach for session cleanup in serverless

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)