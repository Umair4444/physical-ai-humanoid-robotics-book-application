from pydantic_settings import BaseSettings
from typing import List, Optional
from pydantic import ConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    app_title: str = "AI Chatbot Backend for Physical AI Humanoid Robotics Textbook"
    app_description: str = "An AI-powered chatbot backend for answering questions about Physical AI and Humanoid Robotics"
    app_version: str = "1.0.0"
    openapi_url: str = "/openapi.json"
    docs_url: str = "/docs"
    redoc_url: str = "/redoc"
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True
    allowed_origins: List[str] = ["*"]  # In production, specify exact origins

    # API Keys and external service configuration
    gemini_api_key: Optional[str] = None
    openai_api_key: Optional[str] = None

    # Rate limiting
    rate_limit_requests: int = 100
    rate_limit_window: int = 3600  # 1 hour in seconds

    # Model settings
    default_model: str = "gemini/gemini-2.5-flash"  # Using Google Gemini via OpenAI-compatible API

    # Application-specific settings
    max_message_length: int = 1000  # Maximum length of user messages
    response_timeout: int = 30  # Timeout for API responses in seconds

    model_config = ConfigDict(
        env_file=".env",
        extra="ignore"  # This will ignore extra fields from the .env file
    )


# Create a single instance of settings
settings = Settings()