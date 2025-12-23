import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from src.agents.ai_agent import AIAgent


@pytest.mark.asyncio
async def test_ai_agent_process_message():
    """
    Test that the AI agent can process a message.
    """
    # Mock the Runner.run method to avoid actual API calls
    mock_result = AsyncMock()
    mock_result.final_output = "This is a test response"
    mock_result.usage = None

    with patch('src.agents.ai_agent.Runner.run', return_value=mock_result):
        ai_agent = AIAgent()
        result = await ai_agent.process_message("Test message")

        assert result["content"] == "This is a test response"
        assert result["model"] == "gemini/gemini-2.0-flash"  # Default model


@pytest.mark.asyncio
async def test_ai_agent_process_message_with_specific_tools():
    """
    Test that the AI agent can process a message with specific tools.
    """
    # Mock the Runner.run method to avoid actual API calls
    mock_result = AsyncMock()
    mock_result.final_output = "This is a test response with tools"
    mock_result.usage = None

    with patch('src.agents.ai_agent.Runner.run', return_value=mock_result):
        ai_agent = AIAgent()
        result = await ai_agent.process_message_with_specific_tools(
            "Test message",
            ["textbook_search"]
        )

        assert result["content"] == "This is a test response with tools"
        assert result["model"] == "gemini/gemini-2.0-flash"  # Default model


if __name__ == "__main__":
    pytest.main()