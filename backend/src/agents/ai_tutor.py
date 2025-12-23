from agents import Agent, Runner
from agents.extensions.models.litellm_model import LitellmModel
from agents.agent import StopAtTools
from agents import set_tracing_disabled
from typing import Dict, Any, List, Optional
from ..config.settings import settings
from ..agents.tool_registry import tool_registry
import logging


class AITutor:
    """
    AI Tutor that uses the OpenAI Agents SDK with Google Gemini via OpenAI-compatible API.
    """

    def __init__(self):
        # Disable tracing to avoid API key issues when using non-OpenAI models
        set_tracing_disabled(disabled=True)

        # Convert our registered tools to the format expected by openai-agents
        self.agent_tools = self._convert_tools_for_agent()

        # Initialize the agent with Google Gemini model via LiteLLM
        api_key = settings.gemini_api_key or settings.openai_api_key
        if not api_key:
            raise ValueError("Either GEMINI_API_KEY or OPENAI_API_KEY must be set in environment variables")

        self.agent = Agent(
            name="Physical AI Humanoid Robotics Expert",
            model=LitellmModel(
                model=settings.default_model,
                api_key=api_key
            ),
            # instruction=("you are helpful",)
            instructions="You are an expert assistant for the Physical AI Humanoid Robotics Textbook. "
                        "Provide accurate, helpful responses to user questions about the textbook content. "
                        "Use the available tools when appropriate to ensure factual accuracy.",
            tools=self.agent_tools,
            # Use a behavior that allows the agent to decide when to use tools
            tool_use_behavior="run_llm_again"  # Default behavior: run LLM again after tool use
        )
    
    def _convert_tools_for_agent(self) -> List[Dict[str, Any]]:
        """
        Convert our internal tool definitions to the format expected by openai-agents.

        Returns:
            List of tool definitions in the format expected by openai-agents
        """
        # For now, return an empty list to avoid tool compatibility issues
        # This allows the agent to work without tools while we resolve the tool format issue
        return []
    
    async def process_message(
        self,
        message: str,
        max_tokens: int = 1000,
        temperature: float = 0.7
    ) -> Dict[str, Any]:
        """
        Process a message using the AI agent.

        Args:
            message: The input message to process
            max_tokens: Maximum number of tokens to generate
            temperature: Sampling temperature (0-1)

        Returns:
            Dictionary containing the agent's response and metadata
        """
        try:
            # Run the agent with the provided message
            # Note: Runner.run() doesn't take options as a parameter
            result = await Runner.run(
                self.agent,
                message
            )

            # The result should be an object with attributes, not a dict
            # Let's check the actual structure of the result
            if hasattr(result, 'final_output'):
                content = result.final_output
            elif hasattr(result, 'content'):
                content = result.content
            elif isinstance(result, dict):
                # If result is a dictionary, check for 'final_output' or 'content'
                content = result.get('final_output', result.get('content', ''))
            else:
                # If it's neither an object with attributes nor a dict, convert to string
                content = str(result)

            # Handle tool_calls properly regardless of whether they're objects or dicts
            raw_tool_calls = getattr(result, 'tool_calls', []) if hasattr(result, 'tool_calls') else []
            if isinstance(raw_tool_calls, list):
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
            else:
                processed_tool_calls = []

            return {
                "content": content,
                "model": settings.default_model,
                "usage": getattr(result, 'usage', None) if hasattr(result, 'usage') else None,
                "tool_calls": processed_tool_calls
            }
        except Exception as e:
            logging.error(f"Error processing message with AI agent: {e}")
            raise
    
    async def process_message_with_specific_tools(
        self,
        message: str,
        tool_names: List[str],
        max_tokens: int = 1000,
        temperature: float = 0.7
    ) -> Dict[str, Any]:
        """
        Process a message using the AI agent with specific tools.

        Args:
            message: The input message to process
            tool_names: List of specific tool names to make available
            max_tokens: Maximum number of tokens to generate
            temperature: Sampling temperature (0-1)

        Returns:
            Dictionary containing the agent's response and metadata
        """
        try:
            # Since we're not using tools for now, return an empty list
            available_tools = []

            # Create a temporary agent with specific tools
            api_key = settings.gemini_api_key or settings.openai_api_key
            if not api_key:
                raise ValueError("Either GEMINI_API_KEY or OPENAI_API_KEY must be set in environment variables")

            temp_agent = Agent(
                name="Physical AI Humanoid Robotics Expert (Limited Tools)",
                model=LitellmModel(
                    model=settings.default_model,
                    api_key=api_key
                ),
                instructions="You are an expert assistant for the Physical AI Humanoid Robotics Textbook. "
                            "Provide accurate, helpful responses to user questions about the textbook content. "
                            f"Only use the following tools: {', '.join(tool_names)}",
                tools=available_tools
            )

            # Run the temporary agent with the provided message
            # Note: Runner.run() doesn't take options as a parameter
            result = await Runner.run(
                temp_agent,
                message
            )

            # The result should be an object with attributes, not a dict
            # Let's check the actual structure of the result
            if hasattr(result, 'final_output'):
                content = result.final_output
            elif hasattr(result, 'content'):
                content = result.content
            elif isinstance(result, dict):
                # If result is a dictionary, check for 'final_output' or 'content'
                content = result.get('final_output', result.get('content', ''))
            else:
                # If it's neither an object with attributes nor a dict, convert to string
                content = str(result)

            # Handle tool_calls properly regardless of whether they're objects or dicts
            raw_tool_calls = getattr(result, 'tool_calls', []) if hasattr(result, 'tool_calls') else []
            if isinstance(raw_tool_calls, list):
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
            else:
                processed_tool_calls = []

            return {
                "content": content,
                "model": settings.default_model,
                "usage": getattr(result, 'usage', None) if hasattr(result, 'usage') else None,
                "tool_calls": processed_tool_calls
            }
        except Exception as e:
            logging.error(f"Error processing message with specific tools: {e}")
            raise