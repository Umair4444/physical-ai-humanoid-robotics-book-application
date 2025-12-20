from main import app
from fastapi.testclient import TestClient

print('Testing basic import and client creation...')
client = TestClient(app)
print('TestClient created successfully')

# Test health endpoint
try:
    response = client.get('/health')
    print(f'Health endpoint status: {response.status_code}')
    if response.status_code == 200:
        print(f'Health endpoint response: {response.json()}')
    else:
        print(f'Health endpoint error: {response.text}')
except Exception as e:
    print(f'Error testing health endpoint: {e}')

# Test docs endpoint
try:
    response = client.get('/docs')
    print(f'Docs endpoint status: {response.status_code}')
    if response.status_code == 200:
        print('Docs endpoint is accessible')
    else:
        print(f'Docs endpoint error: {response.text}')
except Exception as e:
    print(f'Error testing docs endpoint: {e}')