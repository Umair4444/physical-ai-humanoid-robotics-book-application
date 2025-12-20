from openai import OpenAI
from ..config.ai_config import config

def create_openai_client():
    """Create and configure OpenAI client for Google Gemini API."""
    if not config.validate_config():
        raise ValueError("AI configuration is invalid. Please check your environment variables.")

    client = OpenAI(
        api_key=config.gemini_api_key,
        base_url=config.openai_base_url
    )

    return client

# Create a global client instance only when needed
client = None