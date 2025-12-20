import pytest
import asyncio
from unittest.mock import AsyncMock, patch, MagicMock
from fastapi.testclient import TestClient
from main import app
from src.services.ai_service import AIService

@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)

@pytest.mark.asyncio
async def test_ai_service_validate_response():
    """Test AI service response validation."""
    ai_service = AIService()

    # Valid response
    assert await ai_service.validate_response("This is a valid response.")

    # Invalid responses
    assert not await ai_service.validate_response("")
    assert not await ai_service.validate_response("   ")

def test_ai_service_filter_response():
    """Test AI service response filtering."""
    ai_service = AIService()

    # Test filtering removes leading/trailing whitespace
    raw_response = "  This is a response with extra whitespace.  \n\t"
    filtered_response = ai_service.filter_response(raw_response)

    assert filtered_response == "This is a response with extra whitespace."

def test_ai_service_rate_limiting():
    """Test AI service rate limiting functionality."""
    # Create an AI service with a very low rate limit for testing
    ai_service = AIService()
    ai_service._max_requests_per_minute = 2  # Only allow 2 requests per minute

    # Add 2 requests to the tracking list
    import time
    current_time = time.time()
    ai_service._request_times = [current_time - 10, current_time - 5]  # Two requests in the last minute

    # The next request should be over the limit
    assert not ai_service._check_rate_limit()

    # Clear the request times to allow a new request
    ai_service._request_times = [current_time - 70]  # One request from 70 seconds ago
    assert ai_service._check_rate_limit()

def test_end_to_end_message_flow_with_mocked_ai(client):
    """Test the complete message flow with mocked AI service."""
    # First, create a session
    response = client.post("/api/v1/sessions", json={
        "user_preferences": {"language": "en"}
    })
    assert response.status_code == 201
    session_data = response.json()
    session_id = session_data["session_id"]

    # Mock the AI service to return a specific response
    with patch('src.services.ai_service.AIService') as MockAIService:
        mock_ai_service_instance = MagicMock()
        mock_ai_service_instance.process_message_with_context = AsyncMock(return_value="Mocked AI response")
        mock_ai_service_instance.validate_response = AsyncMock(return_value=True)
        mock_ai_service_instance.filter_response = MagicMock(return_value="Mocked AI response")

        # Replace the AI service instance in the router
        from src.api.routers import message_router
        original_ai_service = message_router.ai_service
        message_router.ai_service = mock_ai_service_instance

        try:
            # Send a message
            response = client.post(f"/api/v1/sessions/{session_id}/messages", json={
                "session_id": session_id,
                "message": "Hello, AI!"
            })

            assert response.status_code == 200
            data = response.json()
            assert data["response"] == "Mocked AI response"
            assert data["status"] == "success"
            assert data["session_id"] == session_id
        finally:
            # Restore the original AI service
            message_router.ai_service = original_ai_service

@pytest.mark.asyncio
async def test_ai_service_process_message_with_context():
    """Test AI service processing a message with context using mocked client."""
    ai_service = AIService()

    # Create a mock response object that mimics the OpenAI API response
    mock_choice = MagicMock()
    mock_choice.message.content = "This is a test response from the AI."

    mock_response = MagicMock()
    mock_response.choices = [mock_choice]

    # Mock the client.chat.completions.create method
    with patch.object(ai_service.client, 'chat') as mock_chat:
        mock_chat.completions.create.return_value = mock_response

        # Test with some conversation history
        history = [
            {"role": "user", "content": "Hello"},
            {"role": "assistant", "content": "Hi there! How can I help you?"}
        ]

        user_message = "What is robotics?"

        response = await ai_service.process_message_with_context(history, user_message)

        assert response == "This is a test response from the AI."
        # Verify the API was called
        mock_chat.completions.create.assert_called_once()