from main import app
from fastapi.testclient import TestClient

print('Testing the new chat query endpoint...')
client = TestClient(app)

# Test the new endpoint that matches frontend expectations
response = client.post('/api/v1/chat/query', json={
    'query': 'Hello, testing the chatbot!',
    'context': 'Testing',
    'sessionId': None
})
print(f'Chat query endpoint status: {response.status_code}')
if response.status_code == 200:
    data = response.json()
    print(f'Session ID: {data["sessionId"]}')
    print(f'Response: {data["response"][:100]}...')
else:
    print(f'Error: {response.text}')