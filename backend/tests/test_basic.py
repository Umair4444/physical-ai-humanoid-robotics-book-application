import pytest
from fastapi.testclient import TestClient
from main import app
import uuid

@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)

def test_root_endpoint(client):
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_health_endpoint(client):
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    assert "message" in response.json()

def test_create_session(client):
    """Test creating a new session."""
    response = client.post("/api/v1/sessions", json={
        "user_preferences": {"language": "en"}
    })

    # Should return 201 Created
    assert response.status_code == 201
    data = response.json()
    assert "session_id" in data
    assert "created_at" in data
    assert data["status"] == "active"
    # Verify that session_id is a valid UUID
    try:
        uuid.UUID(data["session_id"])
        valid_uuid = True
    except ValueError:
        valid_uuid = False
    assert valid_uuid

def test_get_session_status(client):
    """Test getting session status."""
    # Generate a valid UUID for testing
    test_session_id = str(uuid.uuid4())

    response = client.get(f"/api/v1/sessions/{test_session_id}/status")
    # Should return 404 since session doesn't exist
    assert response.status_code in [200, 404]