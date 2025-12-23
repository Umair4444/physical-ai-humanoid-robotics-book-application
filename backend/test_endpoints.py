from src.api.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

# Test the root endpoint
response = client.get('/')
print('Root endpoint:', response.json())

# Test the health endpoint
response = client.get('/health')
print('Health endpoint:', response.json())

# Test that the chat route exists (should return 422 for missing body, not 404)
response = client.post('/api/v1/chat')
print('Chat endpoint status code:', response.status_code)
if response.status_code != 404:
    print('Chat endpoint error detail:', response.json())
else:
    print('Chat endpoint route not found')