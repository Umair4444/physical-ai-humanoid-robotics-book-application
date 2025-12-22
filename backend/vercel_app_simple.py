from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Import logging configuration (now only console logging)
from src.config.logging_config import logger

# Import routers - with error handling for AI service issues
try:
    from src.api.routers.chat_query_router import router as chat_query_router
    chat_router_available = True
except Exception as e:
    print(f"Chat router import error (this is expected in some environments): {e}")
    from fastapi import APIRouter
    chat_query_router = APIRouter()
    chat_router_available = False

from src.api.routers.base_router import router as base_router
from src.api.routers.session_router import router as session_router
from src.api.routers.message_router import router as message_router
from src.api.routers.history_router import router as history_router

# Create the FastAPI app
app = FastAPI(
    title="AI Chatbot API",
    description="API for the AI Chatbot Integration with the Physical AI Humanoid Robotics Textbook",
    version="1.0.0"
)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "http://localhost:3001",  # Alternative local dev port
        "https://your-frontend-domain.vercel.app",  # Deployed frontend
        "https://your-domain.com"  # Production domain (replace with actual domain)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(base_router)
app.include_router(session_router, prefix="/api/v1")
app.include_router(message_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")

# Only include chat router if it's available
if chat_router_available:
    app.include_router(chat_query_router, prefix="/api/v1")
else:
    # Add a fallback route for the chat endpoint
    @app.post("/api/v1/chat/query")
    async def chat_query_fallback():
        return {
            "id": "error",
            "response": "AI service is not properly configured.",
            "sources": [],
            "timestamp": "2025-01-01T00:00:00",
            "sessionId": "unknown"
        }

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
    from datetime import datetime
    import sys

    logger.info("Health check endpoint accessed")

    health_info = {
        "status": "healthy",
        "message": "AI Chatbot API is running",
        "version": "1.0.0",
        "python_version": sys.version,
        "environment": os.getenv("VERCEL_ENV", "unknown"),
        "timestamp": datetime.now().isoformat(),
    }

    return health_info

# Export the app for the Mangum handler
app_export = app