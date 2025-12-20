import pytest
from fastapi.testclient import TestClient
from main import app
import uuid
from src.services.session_manager import SessionManager

@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)

def test_send_message(client):
    """Test sending a message to a session."""
    # First, create a session
    response = client.post("/api/v1/sessions", json={
        "user_preferences": {"language": "en"}
    })
    assert response.status_code == 201
    session_data = response.json()
    session_id = session_data["session_id"]
    
    # Now send a message to the session
    response = client.post(f"/api/v1/sessions/{session_id}/messages", json={
        "session_id": session_id,
        "message": "Hello, AI!"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "response" in data
    assert data["session_id"] == session_id

def test_send_message_invalid_session(client):
    """Test sending a message to an invalid session."""
    invalid_session_id = "invalid-session-id"
    
    response = client.post(f"/api/v1/sessions/{invalid_session_id}/messages", json={
        "session_id": invalid_session_id,
        "message": "Hello, AI!"
    })
    
    assert response.status_code == 400  # Invalid session ID format

def test_send_message_nonexistent_session(client):
    """Test sending a message to a non-existent session."""
    nonexistent_session_id = str(uuid.uuid4())  # Valid UUID format but doesn't exist
    
    response = client.post(f"/api/v1/sessions/{nonexistent_session_id}/messages", json={
        "session_id": nonexistent_session_id,
        "message": "Hello, AI!"
    })
    
    assert response.status_code == 404  # Session not found

def test_send_message_too_long(client):
    """Test sending a message that is too long."""
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
    
    assert response.status_code == 400  # Message too long
    data = response.json()
    assert data["error_code"] == "MESSAGE_TOO_LONG"

def test_get_conversation_history(client):
    """Test getting conversation history."""
    # First, create a session
    response = client.post("/api/v1/sessions", json={
        "user_preferences": {"language": "en"}
    })
    assert response.status_code == 201
    session_data = response.json()
    session_id = session_data["session_id"]
    
    # Send a message to create some history
    response = client.post(f"/api/v1/sessions/{session_id}/messages", json={
        "session_id": session_id,
        "message": "Hello, AI!"
    })
    assert response.status_code == 200
    
    # Now get the conversation history
    response = client.get(f"/api/v1/sessions/{session_id}/history")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["session_id"] == session_id
    assert "messages" in data
    assert len(data["messages"]) >= 2  # Should have user message and AI response

def test_clear_conversation_history(client):
    """Test clearing conversation history."""
    # First, create a session
    response = client.post("/api/v1/sessions", json={
        "user_preferences": {"language": "en"}
    })
    assert response.status_code == 201
    session_data = response.json()
    session_id = session_data["session_id"]
    
    # Send a message to create some history
    response = client.post(f"/api/v1/sessions/{session_id}/messages", json={
        "session_id": session_id,
        "message": "Hello, AI!"
    })
    assert response.status_code == 200
    
    # Verify there is history
    response = client.get(f"/api/v1/sessions/{session_id}/history")
    assert response.status_code == 200
    data = response.json()
    assert len(data["messages"]) >= 2  # Should have user message and AI response
    
    # Clear the history
    response = client.delete(f"/api/v1/sessions/{session_id}/history")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    
    # Verify the history is now empty
    response = client.get(f"/api/v1/sessions/{session_id}/history")
    assert response.status_code == 200
    data = response.json()
    assert len(data["messages"]) == 0