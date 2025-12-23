import litellm
from typing import Dict, Any, Optional, List
from ..config.settings import settings
import logging


class GeminiClient:
    """
    Client for interacting with Google Gemini via LiteLLM.
    """
    
    def __init__(self):
        # Set the API key for LiteLLM
        self.api_key = settings.gemini_api_key or settings.openai_api_key
        if not self.api_key:
            raise ValueError("Either GEMINI_API_KEY or OPENAI_API_KEY must be set in environment variables")
    
    async def generate_response(
        self, 
        prompt: str, 
        model: Optional[str] = None,
        max_tokens: int = 1000,
        temperature: float = 0.7,
        tools: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        """
        Generate a response from the Gemini model via LiteLLM.
        
        Args:
            prompt: The input prompt for the model
            model: The model to use (defaults to settings.default_model)
            max_tokens: Maximum number of tokens to generate
            temperature: Sampling temperature (0-1)
            tools: Optional list of tools for function calling
            
        Returns:
            Dictionary containing the model response and metadata
        """
        model = model or settings.default_model
        
        try:
            # Prepare the messages
            messages = [{"role": "user", "content": prompt}]
            
            # Prepare the call parameters
            params = {
                "model": model,
                "messages": messages,
                "api_key": self.api_key,
                "max_tokens": max_tokens,
                "temperature": temperature,
            }
            
            # Add tools if provided
            if tools:
                params["tools"] = tools
            
            # Call the model using LiteLLM
            response = litellm.completion(**params)
            
            # Extract the response
            choice = response.choices[0]
            result = {
                "content": choice.message.content,
                "model": response.model,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            }
            
            # Add tool calls if present
            if hasattr(choice.message, 'tool_calls') and choice.message.tool_calls:
                result["tool_calls"] = []
                for tool_call in choice.message.tool_calls:
                    result["tool_calls"].append({
                        "id": tool_call.id,
                        "function": {
                            "name": tool_call.function.name,
                            "arguments": tool_call.function.arguments
                        },
                        "type": tool_call.type
                    })
            
            return result
        except Exception as e:
            logging.error(f"Error generating response from Gemini via LiteLLM: {e}")
            raise