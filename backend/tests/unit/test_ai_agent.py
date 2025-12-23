import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from src.agents.ai_tutor import AITutor


@pytest.mark.asyncio
async def test_ai_tutor_process_message():
    """
    Test that the AI tutor can process a message.
    """
    # Mock the Runner.run method to avoid actual API calls
    mock_result = AsyncMock()
    mock_result.final_output = "This is a test response"
    mock_result.usage = None

    with patch('src.agents.ai_tutor.Runner.run', return_value=mock_result):
        ai_tutor = AITutor()
        result = await ai_tutor.process_message("Test message")

        assert result["content"] == "This is a test response"
        assert "gemini" in result["model"]  # Default model should be a Gemini model


@pytest.mark.asyncio
async def test_ai_tutor_process_message_with_specific_tools():
    """
    Test that the AI tutor can process a message with specific tools.
    """
    # Mock the Runner.run method to avoid actual API calls
    mock_result = AsyncMock()
    mock_result.final_output = "This is a test response with tools"
    mock_result.usage = None

    with patch('src.agents.ai_tutor.Runner.run', return_value=mock_result):
        ai_tutor = AITutor()
        result = await ai_tutor.process_message_with_specific_tools(
            "Test message",
            ["textbook_search"]
        )

        assert result["content"] == "This is a test response with tools"
        assert "gemini" in result["model"]  # Default model should be a Gemini model


if __name__ == "__main__":
    pytest.main()