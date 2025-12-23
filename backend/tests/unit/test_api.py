import pytest
from fastapi.testclient import TestClient
from src.api.main import app


def test_health_endpoint():
    """
    Test the health check endpoint.
    """
    client = TestClient(app)
    
    response = client.get("/health")
    assert response.status_code == 200
    
    data = response.json()
    assert "status" in data
    assert data["status"] == "healthy"
    assert "timestamp" in data
    assert "version" in data


def test_chat_endpoint_exists():
    """
    Test that the chat endpoint exists.
    """
    client = TestClient(app)
    
    # This should return a 422 error for missing body, not a 404 for missing endpoint
    response = client.post("/api/v1/chat")
    assert response.status_code == 422  # Unprocessable Entity due to missing body


if __name__ == "__main__":
    pytest.main()