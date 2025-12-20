from fastapi import Request, FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging

from ...exceptions.chatbot_exceptions import ChatbotException
from ...models.error_response import ErrorResponse

logger = logging.getLogger(__name__)

def register_exception_handlers(app: FastAPI):
    """Register global exception handlers for the FastAPI application."""
    
    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        """Handle HTTP exceptions."""
        logger.error(f"HTTP Exception: {exc.status_code} - {exc.detail}")
        
        # Map common HTTP status codes to error codes
        error_code_map = {
            400: "INVALID_REQUEST",
            404: "NOT_FOUND",
            422: "VALIDATION_ERROR",
            500: "INTERNAL_ERROR"
        }
        
        error_code = error_code_map.get(exc.status_code, f"HTTP_{exc.status_code}")
        
        return JSONResponse(
            status_code=exc.status_code,
            content=jsonable_encoder(
                ErrorResponse(
                    error_code=error_code,
                    message=str(exc.detail) if exc.detail else "An error occurred"
                )
            )
        )
    
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        """Handle request validation errors."""
        logger.error(f"Validation Error: {exc}")
        
        # Extract the first error for simplicity
        if exc.errors():
            error = exc.errors()[0]
            field = ".".join(str(loc) for loc in error["loc"])
            message = f"{field}: {error['msg']}"
        else:
            message = "Request validation failed"
        
        return JSONResponse(
            status_code=422,
            content=jsonable_encoder(
                ErrorResponse(
                    error_code="VALIDATION_ERROR",
                    message=message
                )
            )
        )
    
    @app.exception_handler(ChatbotException)
    async def chatbot_exception_handler(request: Request, exc: ChatbotException):
        """Handle custom chatbot exceptions."""
        logger.error(f"Chatbot Exception: {exc.error_code} - {exc.message}")
        
        return JSONResponse(
            status_code=exc.status_code,
            content=jsonable_encoder(
                ErrorResponse(
                    error_code=exc.error_code,
                    message=exc.message
                )
            )
        )
    
    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        """Handle general exceptions."""
        logger.error(f"General Exception: {str(exc)}", exc_info=True)
        
        return JSONResponse(
            status_code=500,
            content=jsonable_encoder(
                ErrorResponse(
                    error_code="INTERNAL_ERROR",
                    message="An unexpected error occurred"
                )
            )
        )