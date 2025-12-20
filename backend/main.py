from fastapi import FastAPI, WebSocket, WebSocketDisconnect
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

# Import WebSocket handler
from src.api.websocket_handler import manager, handle_websocket_message

# Import exception handlers
from src.api.handlers.exception_handler import register_exception_handlers

# Import and run the cleanup task
from src.tasks.session_cleanup import run_cleanup_task
from src.services.session_manager import SessionManager


class SecurityMiddleware(BaseHTTPMiddleware):
    """Middleware to add security headers and sanitize input."""

    async def dispatch(self, request: Request, call_next):
        # Add security headers
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

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to the AI Chatbot API"}

@app.get("/health")
def health_check():
    logger.info("Health check endpoint accessed")
    return {"status": "healthy", "message": "AI Chatbot API is running"}

@app.get("/ready")
def readiness_check():
    """Readiness check for container orchestration."""
    # Here you would check if all required services are available
    # For now, just return that the app is ready
    logger.info("Readiness check endpoint accessed")
    return {"status": "ready", "message": "AI Chatbot API is ready to accept requests"}

@app.websocket("/ws/chat/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time chat communication."""
    await manager.connect(websocket, session_id)
    try:
        while True:
            data = await websocket.receive_text()
            try:
                json_data = json.loads(data)
                await handle_websocket_message(websocket, session_id, json_data)
            except json.JSONDecodeError:
                await manager.send_personal_message({
                    "type": "error",
                    "error_code": "INVALID_JSON",
                    "message": "Invalid JSON format"
                }, session_id)
            except Exception as e:
                logger.error(f"Error handling WebSocket message: {str(e)}")
                await manager.send_personal_message({
                    "type": "error",
                    "error_code": "INTERNAL_ERROR",
                    "message": str(e)
                }, session_id)
    except WebSocketDisconnect:
        manager.disconnect(session_id)
        logger.info(f"WebSocket disconnected for session: {session_id}")
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
        manager.disconnect(session_id)

@app.on_event("startup")
async def startup_event():
    """Start background tasks on app startup."""
    logger.info("Starting up background tasks...")
    session_manager = SessionManager()
    # Start the session cleanup task in the background
    asyncio.create_task(run_cleanup_task(session_manager))

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)