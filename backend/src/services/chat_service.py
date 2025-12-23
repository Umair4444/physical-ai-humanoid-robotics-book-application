from typing import List, Optional, Dict, Any
from ..models.chat_models import ChatMessage, ChatResponseModel
from ..clients.gemini_client import GeminiClient
from ..utils.token_handler import truncate_message_if_needed
import logging
import time


class ChatService:
    """
    Service for handling chat operations using the Gemini client.
    """

    def __init__(self):
        self.gemini_client = GeminiClient()

    async def process_chat_message(
        self,
        user_message: str,
        conversation_context: Optional[Dict[str, Any]] = None
    ) -> ChatResponseModel:
        """
        Process a user's chat message and return an AI-generated response.

        Args:
            user_message: The message from the user
            conversation_context: Optional context from the conversation

        Returns:
            ChatResponseModel containing the AI-generated response
        """
        # Truncate message if needed
        truncated_message = truncate_message_if_needed(user_message)

        # Create the prompt for the AI
        prompt = self._build_prompt(truncated_message, conversation_context)

        # Track processing time
        start_time = time.time()

        try:
            # Generate response from the Gemini client
            response_data = await self.gemini_client.generate_response(
                prompt=prompt,
                max_tokens=1000,
                temperature=0.7
            )

            processing_time = time.time() - start_time

            # Create metadata for the response
            metadata = {
                "confidence": 0.9,  # Placeholder - in a real implementation, this would come from the AI
                "sources": [],  # Placeholder - in a real implementation, this would come from the AI
                "processing_time": processing_time,
                "tool_calls": response_data.get("tool_calls", [])
            }

            # Create and return the response model
            return ChatResponseModel(
                response_content=response_data["content"],
                metadata=metadata,
                suggested_follow_ups=self._generate_suggestions(response_data["content"]),
                tool_calls=self._process_tool_calls(response_data.get("tool_calls", []))
            )
        except Exception as e:
            logging.error(f"Error processing chat message: {e}")
            raise


    def _build_prompt(
        self,
        user_message: str,
        conversation_context: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Build a prompt for the AI based on the user message and context.

        Args:
            user_message: The message from the user
            conversation_context: Optional context from the conversation

        Returns:
            Formatted prompt string for the AI
        """
        # Check if specialized textbook knowledge should be used
        use_specialized_knowledge = True  # Default to using specialized knowledge
        if conversation_context and "use_specialized_knowledge" in conversation_context:
            use_specialized_knowledge = conversation_context.get("use_specialized_knowledge", True)

        if use_specialized_knowledge:
            # For specialized knowledge (toggle ON) - expert in textbook content
            return (
                f"User question: {user_message}\n\n"
                "You are an expert assistant for the Physical AI Humanoid Robotics Textbook. "
                "You can answer questions about the textbook content, site navigation, pricing, contact information, book overview, and related topics. "
                "For questions about the textbook content, provide detailed and accurate information. "
                "For site-related questions (pricing, contact, book overview), provide helpful responses. "
                "For general queries outside the scope of the textbook and website, respond with 'Sorry, this is not in my knowledge'. "
                "Be concise but thorough in your explanations. "
                "If the question is unclear, ask for clarification. "
                "When appropriate, relate concepts to practical applications in robotics."
            )
        else:
            # For general knowledge (toggle OFF) - only site-related, no textbook content
            return (
                f"User question: {user_message}\n\n"
                "You are a helpful assistant for the Physical AI Humanoid Robotics Textbook website. "
                "You can answer questions about site navigation, pricing, contact information, book overview, and related topics. "
                "For questions about the textbook content, respond with 'Sorry, this is not in my knowledge'. "
                "For general queries outside the scope of the website, respond with 'Sorry, this is not in my knowledge'. "
                "If the question is unclear, ask for clarification."
            )

    def _generate_suggestions(self, response_content: str) -> List[str]:
        """
        Generate follow-up suggestions based on the response content.

        Args:
            response_content: The content of the AI's response

        Returns:
            List of suggested follow-up questions or topics
        """
        # This is a simplified implementation
        # In a real implementation, this would use NLP to generate relevant suggestions
        suggestions = []

        # Add some generic suggestions related to robotics
        if "kinematics" in response_content.lower():
            suggestions.extend([
                "Can you explain inverse kinematics?",
                "What are the applications of kinematics in robotics?",
                "How do you solve kinematics equations?"
            ])
        elif "control" in response_content.lower():
            suggestions.extend([
                "What is PID control in robotics?",
                "How do you implement feedback control?",
                "What are the types of control systems?"
            ])
        elif "learning" in response_content.lower():
            suggestions.extend([
                "How is machine learning used in robotics?",
                "What are reinforcement learning applications?",
                "Can you explain imitation learning?"
            ])

        # Add some general suggestions if none were added based on content
        if not suggestions:
            suggestions = [
                "Can you explain this in more detail?",
                "What are some practical applications?",
                "How does this relate to humanoid robotics?"
            ]

        return suggestions[:3]  # Limit to 3 suggestions

    def _process_tool_calls(self, raw_tool_calls):
        """
        Process tool calls properly to handle both dict and object formats.

        Args:
            raw_tool_calls: Raw tool calls from the AI agent response

        Returns:
            List of properly formatted tool calls
        """
        processed_tool_calls = []

        for tc in raw_tool_calls:
            if isinstance(tc, dict):
                # If tc is already a dict, use it directly
                processed_tool_calls.append({
                    "name": tc.get("name", ""),
                    "arguments": tc.get("arguments", {})
                })
            elif hasattr(tc, 'name') and hasattr(tc, 'arguments'):
                # If tc is an object with name and arguments attributes
                processed_tool_calls.append({
                    "name": getattr(tc, 'name', ''),
                    "arguments": getattr(tc, 'arguments', {})
                })
            else:
                # If tc is neither dict nor object with expected attributes, skip it
                continue

        return processed_tool_calls