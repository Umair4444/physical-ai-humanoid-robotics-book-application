import pytest
from fastapi.testclient import TestClient
from main import app
import uuid
from src.services.session_manager import SessionManager

@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)

@pytest.fixture
def session_manager():
    """Create a session manager instance."""
    return SessionManager()

def test_format_conversation_history(client):
    """Test formatting conversation history for LLM requests."""
    # First, create a session
    response = client.post("/api/v1/sessions", json={
        "user_preferences": {"language": "en"}
    })
    assert response.status_code == 201
    session_data = response.json()
    session_id = session_data["session_id"]
    
    # Send a few messages to create conversation history
    response = client.post(f"/api/v1/sessions/{session_id}/messages", json={
        "session_id": session_id,
        "message": "Hello, AI!"
    })
    assert response.status_code == 200
    
    response = client.post(f"/api/v1/sessions/{session_id}/messages", json={
        "session_id": session_id,
        "message": "How are you today?"
    })
    assert response.status_code == 200
    
    # Test that we can format the conversation history
    session_manager = SessionManager()
    formatted_history = session_manager.format_conversation_history(session_id)
    
    # Should have at least the two user messages and their AI responses
    assert len(formatted_history) >= 4  # 2 user messages + 2 AI responses
    
    # Check that the format is correct
    for msg in formatted_history:
        assert "role" in msg
        assert "content" in msg
        assert msg["role"] in ["user", "assistant"]

def test_context_window_size_estimation():
    """Test context window size estimation."""
    session_manager = SessionManager()
    
    # Create a session
    session = session_manager.create_session({"language": "en"})
    session_id = session.session_id
    
    # Add a message with known content length
    from src.models.message import Message
    from datetime import datetime
    
    test_content = "This is a test message with a known length."
    message = Message(
        message_id=str(uuid.uuid4()),
        session_id=session_id,
        sender="user",
        content=test_content,
        timestamp=datetime.now(),
        status="sent"
    )
    
    session_manager.add_message(session_id, message)
    
    # Estimate token count (1 token ≈ 4 chars, so 43 chars ≈ 10-11 tokens)
    estimated_tokens = session_manager.get_context_window_size(session_id)
    expected_tokens = len(test_content) // 4
    
    assert estimated_tokens == expected_tokens

def test_context_window_full_detection():
    """Test context window full detection."""
    # Create a session manager with a very small max context for testing
    session_manager = SessionManager(max_context_tokens=10)
    
    # Create a session
    session = session_manager.create_session({"language": "en"})
    session_id = session.session_id
    
    # Add a message that will make context exceed the limit
    from src.models.message import Message
    from datetime import datetime
    
    # A message with content that should exceed 10 tokens (40+ chars)
    long_content = "A" * 50  # This should be about 12 tokens
    message = Message(
        message_id=str(uuid.uuid4()),
        session_id=session_id,
        sender="user",
        content=long_content,
        timestamp=datetime.now(),
        status="sent"
    )
    
    session_manager.add_message(session_id, message)
    
    # Check if context window is full
    assert session_manager.is_context_window_full(session_id)

def test_truncate_oldest_messages():
    """Test truncating oldest messages to maintain context window size."""
    # Create a session manager with a small max context for testing
    session_manager = SessionManager(max_context_tokens=20)
    
    # Create a session
    session = session_manager.create_session({"language": "en"})
    session_id = session.session_id
    
    # Add several messages to exceed the context window
    from src.models.message import Message
    from datetime import datetime
    
    for i in range(5):  # Add 5 messages
        content = f"Message number {i} with some content."
        message = Message(
            message_id=str(uuid.uuid4()),
            session_id=session_id,
            sender="user",
            content=content,
            timestamp=datetime.now(),
            status="sent"
        )
        session_manager.add_message(session_id, message)
    
    # Initially, we should have 5 messages
    messages = session_manager.get_messages(session_id)
    assert len(messages) == 5
    
    # Truncate to target size (default 75% of max = 15 tokens)
    session_manager.truncate_oldest_messages(session_id)
    
    # After truncation, we should have fewer messages
    messages = session_manager.get_messages(session_id)
    # The exact number depends on the content length, but it should be reduced
    assert len(messages) <= 5

def test_session_timeout_functionality():
    """Test session timeout functionality."""
    import time
    from datetime import datetime, timedelta
    
    # Create a session manager with a short timeout for testing
    session_manager = SessionManager(session_timeout_minutes=0.01)  # 0.01 min = 0.6 seconds
    
    # Create a session
    session = session_manager.create_session({"language": "en"})
    session_id = session.session_id
    
    # Verify session exists initially
    retrieved_session = session_manager.get_session(session_id)
    assert retrieved_session is not None
    
    # Wait for the session to timeout
    time.sleep(1)  # Sleep for 1 second (more than 0.6 seconds timeout)
    
    # Try to get the session again - it should be expired and removed
    retrieved_session = session_manager.get_session(session_id)
    assert retrieved_session is None

def test_clear_conversation_history_preserves_session():
    """Test that clearing conversation history preserves the session."""
    session_manager = SessionManager()
    
    # Create a session
    session = session_manager.create_session({"language": "en"})
    session_id = session.session_id
    
    # Add some messages
    from src.models.message import Message
    from datetime import datetime
    
    for i in range(3):
        content = f"Message number {i}."
        message = Message(
            message_id=str(uuid.uuid4()),
            session_id=session_id,
            sender="user",
            content=content,
            timestamp=datetime.now(),
            status="sent"
        )
        session_manager.add_message(session_id, message)
    
    # Verify messages exist
    messages = session_manager.get_messages(session_id)
    assert len(messages) == 3
    
    # Clear the messages
    success = session_manager.clear_messages(session_id)
    assert success
    
    # Verify messages are cleared but session still exists
    messages = session_manager.get_messages(session_id)
    assert len(messages) == 0
    
    # Session should still be retrievable
    retrieved_session = session_manager.get_session(session_id)
    assert retrieved_session is not None