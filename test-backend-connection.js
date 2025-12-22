/**
 * Test script to verify connection between frontend and deployed backend
 * 
 * To use this script:
 * 1. Replace 'YOUR_DEPLOYED_BACKEND_URL' with your actual deployed backend URL
 * 2. Run: node test-backend-connection.js
 */

const BACKEND_URL = 'YOUR_DEPLOYED_BACKEND_URL'; // e.g., 'https://your-project.vercel.app'

async function testConnection() {
  console.log('Testing connection to backend...');
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log('---');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${BACKEND_URL}/health`);
    const healthData = await healthResponse.json();
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Response:`, healthData);
    console.log('');

    // Test API v1 health endpoint
    console.log('2. Testing API v1 health endpoint...');
    const apiHealthResponse = await fetch(`${BACKEND_URL}/api/v1/health`);
    const apiHealthData = await apiHealthResponse.json();
    console.log(`   Status: ${apiHealthResponse.status}`);
    console.log(`   Response:`, apiHealthData);
    console.log('');

    // Test root endpoint
    console.log('3. Testing root endpoint...');
    const rootResponse = await fetch(`${BACKEND_URL}/`);
    const rootData = await rootResponse.json();
    console.log(`   Status: ${rootResponse.status}`);
    console.log(`   Response:`, rootData);
    console.log('');

    // Test sessions endpoint (POST)
    console.log('4. Testing session creation...');
    const sessionResponse = await fetch(`${BACKEND_URL}/api/v1/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_preferences: { language: 'en' } }),
    });
    const sessionData = await sessionResponse.json();
    console.log(`   Status: ${sessionResponse.status}`);
    console.log(`   Response:`, sessionData);
    console.log('');

    // If session creation was successful, test chat endpoint
    if (sessionResponse.ok && sessionData.session_id) {
      console.log('5. Testing chat endpoint with session ID...');
      const chatResponse = await fetch(`${BACKEND_URL}/api/v1/chat/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'Hello, are you working?',
          context: 'Testing connection',
          sessionId: sessionData.session_id,
        }),
      });
      const chatData = await chatResponse.json();
      console.log(`   Status: ${chatResponse.status}`);
      console.log(`   Response:`, chatData);
      console.log('');
    }

    console.log('Connection test completed successfully!');
    console.log('If all endpoints returned 200 status codes, your frontend and backend are properly connected.');
  } catch (error) {
    console.error('Error during connection test:', error.message);
  }
}

// Replace the placeholder URL with your actual deployed backend URL before running
if (BACKEND_URL.includes('YOUR_DEPLOYED_BACKEND_URL')) {
  console.log('Please update the BACKEND_URL variable with your actual deployed backend URL before running this script.');
} else {
  testConnection();
}