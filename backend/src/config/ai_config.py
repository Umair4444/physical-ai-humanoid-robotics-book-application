import os
from typing import Optional

class AIConfig:
    """Configuration class for AI agent settings."""
    
    def __init__(self):
        self.gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
        self.openai_base_url: str = os.getenv("OPENAI_BASE_URL", "https://generativelanguage.googleapis.com/v1beta/openai/")
        self.model_name: str = os.getenv("MODEL_NAME", "gemini-2.5-flash")
        self.temperature: float = float(os.getenv("TEMPERATURE", "0.7"))
        self.max_tokens: int = int(os.getenv("MAX_TOKENS", "1000"))
        
        # Rate limiting settings
        self.requests_per_minute: int = int(os.getenv("REQUESTS_PER_MINUTE", "60"))
        self.tokens_per_minute: int = int(os.getenv("TOKENS_PER_MINUTE", "100000"))
    
    def validate_config(self) -> bool:
        """Validate that required configuration values are present."""
        return bool(self.gemini_api_key)
    
    def get_client_config(self) -> dict:
        """Get configuration for OpenAI client initialization."""
        return {
            "api_key": self.gemini_api_key,
            "base_url": self.openai_base_url
        }

# Create a global instance
config = AIConfig()