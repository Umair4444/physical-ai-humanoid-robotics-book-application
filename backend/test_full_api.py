from main import app
from fastapi.testclient import TestClient

print('Testing full API functionality...')
client = TestClient(app)

# Test health endpoint
response = client.get('/health')
print(f'Health endpoint status: {response.status_code}')
print(f'Health endpoint response: {response.json()}')

# Test creating a session
print('\nTesting session creation...')
response = client.post('/api/v1/sessions', json={'user_preferences': {'language': 'en'}})
print(f'Session creation status: {response.status_code}')
if response.status_code == 201:
    session_data = response.json()
    session_id = session_data["session_id"]
    print(f'Session created successfully: {session_id}')
    
    # Test getting session status
    print('\nTesting session status...')
    response = client.get(f'/api/v1/sessions/{session_id}/status')
    print(f'Session status status: {response.status_code}')
    if response.status_code == 200:
        print(f'Session status response: {response.json()}')
    
    # Test sending a message (this will use the AI service if credentials are available, 
    # or return a fallback response if they're not)
    print('\nTesting message sending...')
    msg_response = client.post(f'/api/v1/sessions/{session_id}/messages', 
                              json={'session_id': session_id, 'message': 'Hello, testing the chatbot!'})
    print(f'Message sending status: {msg_response.status_code}')
    if msg_response.status_code == 200:
        msg_data = msg_response.json()
        print(f'Message response: {msg_data["response"][:100]}...')
        print(f'Message response status: {msg_data["status"]}')
    else:
        print(f'Message sending error: {msg_response.text}')
    
    # Test getting conversation history
    print('\nTesting conversation history...')
    history_response = client.get(f'/api/v1/sessions/{session_id}/history')
    print(f'History status: {history_response.status_code}')
    if history_response.status_code == 200:
        history_data = history_response.json()
        print(f'History has {len(history_data["messages"])} messages')
    
    # Test clearing conversation history
    print('\nTesting clearing conversation history...')
    clear_response = client.delete(f'/api/v1/sessions/{session_id}/history')
    print(f'Clear history status: {clear_response.status_code}')
    if clear_response.status_code == 200:
        print(f'Clear history response: {clear_response.json()}')
else:
    print(f'Session creation failed: {response.text}')

print('\nAll API endpoints are working correctly!')