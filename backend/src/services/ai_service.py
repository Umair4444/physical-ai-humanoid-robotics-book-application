import asyncio
import time
from typing import List, Dict, Any, Optional
from datetime import datetime
import logging

from openai import RateLimitError, APIConnectionError, APITimeoutError
from ..models.message import Message
from ..config.ai_config import config
from .openai_client import create_openai_client
from ..exceptions.chatbot_exceptions import LLMServiceUnavailableException

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        # Create client only when needed
        self._client = None
        self.config = config
        self._request_times = []  # For rate limiting
        self._rate_limit_window = 60  # 60 seconds
        self._max_requests_per_minute = config.requests_per_minute

    @property
    def client(self):
        if self._client is None:
            self._client = create_openai_client()
        return self._client

    def _check_rate_limit(self) -> bool:
        """Check if we're within the rate limit."""
        now = time.time()
        # Remove requests older than the rate limit window
        self._request_times = [req_time for req_time in self._request_times 
                               if now - req_time < self._rate_limit_window]
        
        # Check if we're under the limit
        if len(self._request_times) >= self._max_requests_per_minute:
            return False
        
        # Add current request time
        self._request_times.append(now)
        return True

    async def process_message_with_context(
        self, 
        formatted_history: List[Dict[str, str]], 
        user_message: str,
        max_retries: int = 3
    ) -> str:
        """
        Process a user message with conversation context and return AI response.
        
        Args:
            formatted_history: List of message dictionaries with 'role' and 'content'
            user_message: The current user message
            max_retries: Number of times to retry on failure
        
        Returns:
            The AI's response as a string
        """
        # Add the current user message to the history
        full_context = formatted_history + [{"role": "user", "content": user_message}]
        
        for attempt in range(max_retries):
            try:
                # Check rate limit
                if not self._check_rate_limit():
                    logger.warning(f"Rate limit exceeded. Waiting before retry...")
                    await asyncio.sleep(60)  # Wait for the rate limit window to reset
                    continue  # Retry after waiting
                
                # Make the API call to the LLM
                response = self.client.chat.completions.create(
                    model=self.config.model_name,
                    messages=full_context,
                    temperature=self.config.temperature,
                    max_tokens=self.config.max_tokens
                )
                
                # Extract the response content
                ai_response = response.choices[0].message.content
                
                # Validate the response
                if not ai_response or not ai_response.strip():
                    raise ValueError("AI returned an empty response")
                
                logger.info(f"Successfully processed message, response length: {len(ai_response)}")
                return ai_response
                
            except (RateLimitError, APIConnectionError, APITimeoutError) as e:
                logger.warning(f"Attempt {attempt + 1} failed: {str(e)}")
                if attempt < max_retries - 1:
                    # Wait before retrying (exponential backoff)
                    wait_time = 2 ** attempt
                    logger.info(f"Waiting {wait_time}s before retry...")
                    await asyncio.sleep(wait_time)
                else:
                    logger.error(f"All {max_retries} attempts failed. Last error: {str(e)}")
                    raise LLMServiceUnavailableException(str(e))
                    
            except Exception as e:
                logger.error(f"Unexpected error during AI processing: {str(e)}")
                raise LLMServiceUnavailableException(str(e))
        
        # If we've exhausted all retries
        raise LLMServiceUnavailableException(f"Failed to get response after {max_retries} attempts")

    async def validate_response(self, response: str) -> bool:
        """
        Validate the AI response for appropriateness.
        
        Args:
            response: The AI response to validate
        
        Returns:
            True if the response is valid, False otherwise
        """
        # Basic validation: check for empty response
        if not response or not response.strip():
            return False
        
        # Additional validation could include:
        # - Checking for inappropriate content
        # - Checking for hallucinations
        # - Checking for relevance to robotics topic
        
        # For now, just ensure it's not empty
        return True

    def filter_response(self, response: str) -> str:
        """
        Filter the AI response to ensure it meets our requirements.
        
        Args:
            response: The raw AI response
        
        Returns:
            The filtered response
        """
        # Basic filtering: remove any leading/trailing whitespace
        filtered_response = response.strip()
        
        # Additional filtering could include:
        # - Removing inappropriate content
        # - Redacting sensitive information
        # - Ensuring adherence to robotics topic
        
        return filtered_response