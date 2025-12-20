import pytest
from fastapi.testclient import TestClient
from main import app
import uuid
from src.exceptions.chatbot_exceptions import (
    ChatbotException,
    SessionNotFoundException,
    MessageTooLongException,
    EmptyMessageException,
    InvalidSessionIdException
)

@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)

def test_session_not_found_error(client):
    """Test that SessionNotFoundException is properly handled."""
    nonexistent_session_id = str(uuid.uuid4())
    
    response = client.get(f"/api/v1/sessions/{nonexistent_session_id}/status")
    assert response.status_code == 404
    data = response.json()
    assert data["error_code"] == "SESSION_NOT_FOUND"
    assert "message" in data

def test_invalid_session_id_error(client):
    """Test that InvalidSessionIdException is properly handled."""
    invalid_session_id = "invalid-session-id-format"
    
    response = client.get(f"/api/v1/sessions/{invalid_session_id}/status")
    assert response.status_code == 400
    data = response.json()
    assert data["error_code"] == "INVALID_SESSION_ID"
    assert "message" in data

def test_message_too_long_error(client):
    """Test that MessageTooLongException is properly handled."""
    # First, create a session
    response = client.post("/api/v1/sessions", json={
        "user_preferences": {"language": "en"}
    })
    assert response.status_code == 201
    session_data = response.json()
    session_id = session_data["session_id"]
    
    # Create a message that is too long (over 4000 characters)
    long_message = "A" * 4001
    
    response = client.post(f"/api/v1/sessions/{session_id}/messages", json={
        "session_id": session_id,
        "message": long_message
    })
    
    assert response.status_code == 400
    data = response.json()
    assert data["error_code"] == "MESSAGE_TOO_LONG"
    assert "message" in data

def test_empty_message_error(client):
    """Test that EmptyMessageException is properly handled."""
    # First, create a session
    response = client.post("/api/v1/sessions", json={
        "user_preferences": {"language": "en"}
    })
    assert response.status_code == 201
    session_data = response.json()
    session_id = session_data["session_id"]
    
    # Send an empty message
    response = client.post(f"/api/v1/sessions/{session_id}/messages", json={
        "session_id": session_id,
        "message": ""
    })
    
    assert response.status_code == 400
    data = response.json()
    assert data["error_code"] == "EMPTY_MESSAGE"
    assert "message" in data

def test_invalid_session_id_in_message_endpoint(client):
    """Test that invalid session ID is handled in message endpoint."""
    invalid_session_id = "not-a-uuid"
    
    response = client.post(f"/api/v1/sessions/{invalid_session_id}/messages", json={
        "session_id": invalid_session_id,
        "message": "Hello"
    })
    
    assert response.status_code == 400
    data = response.json()
    assert data["error_code"] == "INVALID_SESSION_ID"
    assert "message" in data

def test_nonexistent_session_in_message_endpoint(client):
    """Test that non-existent session is handled in message endpoint."""
    nonexistent_session_id = str(uuid.uuid4())
    
    response = client.post(f"/api/v1/sessions/{nonexistent_session_id}/messages", json={
        "session_id": nonexistent_session_id,
        "message": "Hello"
    })
    
    assert response.status_code == 404
    data = response.json()
    assert data["error_code"] == "SESSION_NOT_FOUND"
    assert "message" in data

def test_invalid_session_id_in_history_endpoints(client):
    """Test that invalid session ID is handled in history endpoints."""
    invalid_session_id = "not-a-uuid"
    
    # Test GET history
    response = client.get(f"/api/v1/sessions/{invalid_session_id}/history")
    assert response.status_code == 400
    data = response.json()
    assert data["error_code"] == "INVALID_SESSION_ID"
    
    # Test DELETE history
    response = client.delete(f"/api/v1/sessions/{invalid_session_id}/history")
    assert response.status_code == 400
    data = response.json()
    assert data["error_code"] == "INVALID_SESSION_ID"

def test_nonexistent_session_in_history_endpoints(client):
    """Test that non-existent session is handled in history endpoints."""
    nonexistent_session_id = str(uuid.uuid4())
    
    # Test GET history
    response = client.get(f"/api/v1/sessions/{nonexistent_session_id}/history")
    assert response.status_code == 404
    data = response.json()
    assert data["error_code"] == "SESSION_NOT_FOUND"
    
    # Test DELETE history
    response = client.delete(f"/api/v1/sessions/{nonexistent_session_id}/history")
    assert response.status_code == 404
    data = response.json()
    assert data["error_code"] == "SESSION_NOT_FOUND"