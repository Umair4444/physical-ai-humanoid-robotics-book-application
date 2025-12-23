from agents import Agent, Runner
from agents.extensions.models.litellm_model import LitellmModel
from agents.agent import StopAtTools
from agents import set_tracing_disabled
from typing import Dict, Any, List, Optional
from ..config.settings import settings
from ..agents.tool_registry import tool_registry
import logging


class AIAgent:
    """
    AI Agent that uses the OpenAI Agents SDK with Google Gemini via OpenAI-compatible API.
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
            instructions=(
                        "You are an expert assistant for the Physical AI Humanoid Robotics Textbook. "
                        "Provide accurate, helpful responses to user questions about the textbook content. "
                        "Use the available tools when appropriate to ensure factual accuracy.",)
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
        from agents import function_tool
        agent_tools = []

        for tool_def in tool_registry.get_all_tools():
            # Create a function tool that can be used by the agent
            agent_tool = {
                "type": "function",
                "function": {
                    "name": tool_def.name,
                    "description": tool_def.description,
                    "parameters": tool_def.parameters
                }
            }
            agent_tools.append(agent_tool)

        return agent_tools
    
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

            return {
                "content": content,
                "model": settings.default_model,
                "usage": getattr(result, 'usage', None) if hasattr(result, 'usage') else None,
                "tool_calls": getattr(result, 'tool_calls', []) if hasattr(result, 'tool_calls') else []
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
            # Get only the specified tools
            available_tools = [
                tool for tool in self.agent_tools
                if tool["function"]["name"] in tool_names
            ]

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

            return {
                "content": content,
                "model": settings.default_model,
                "usage": getattr(result, 'usage', None) if hasattr(result, 'usage') else None,
                "tool_calls": getattr(result, 'tool_calls', []) if hasattr(result, 'tool_calls') else []
            }
        except Exception as e:
            logging.error(f"Error processing message with specific tools: {e}")
            raise