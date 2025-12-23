from fastapi import FastAPI
from .chat_endpoint import router as chat_router
from .health import router as health_router
from ..config.settings import settings
from ..middleware.error_handler import add_error_handlers
from ..middleware.rate_limiter import add_rate_limiting
from fastapi.middleware.cors import CORSMiddleware


def create_app() -> FastAPI:
    """
    Create and configure the FastAPI application.

    Returns:
        FastAPI: Configured FastAPI application instance
    """
    app = FastAPI(
        title=settings.app_title,
        description=settings.app_description,
        version=settings.app_version,
        openapi_url=settings.openapi_url,
        docs_url=settings.docs_url,
        redoc_url=settings.redoc_url,
    )

    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Add rate limiting
    add_rate_limiting(app)

    # Include routers
    app.include_router(chat_router, prefix="/api/v1")
    app.include_router(health_router)

    # Add root endpoint
    @app.get("/")
    async def root():
        return {"message": "AI Chatbot FastAPI Working"}

    # Add error handlers
    add_error_handlers(app)

    return app


# Create the main app instance
app = create_app()


if __name__ == "__main__":
    import uvicorn
    # Run with the correct module path
    uvicorn.run(
        "src.api.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
    )