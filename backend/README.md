# Deploying Backend to Vercel

This guide explains how to deploy the AI Chatbot backend to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. The Vercel CLI installed: `npm i -g vercel`
3. A Google Gemini API key
4. Python 3.11 runtime support

## Configuration Files

The deployment relies on the following configuration files:

- `vercel.json`: Configures the build process and routing to use the Mangum adapter for FastAPI
- `requirements.txt`: Lists all Python dependencies needed for the application
- `api/app.py`: Entry point that wraps the FastAPI application with the Mangum adapter
- `vercel_app.py`: The main FastAPI application that will be served

## Environment Variables

Before deploying, you need to set the following environment variables:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `OPENAI_BASE_URL`: The base URL for the OpenAI-compatible API (default: https://generativelanguage.googleapis.com/v1beta/openai/)
- `MODEL_NAME`: The name of the model to use (default: gemini-2.5-flash)
- `TEMPERATURE`: The temperature setting for the model (default: 0.7)
- `MAX_TOKENS`: The maximum number of tokens to generate (default: 1000)
- `REQUESTS_PER_MINUTE`: Maximum requests per minute (default: 60)
- `TOKENS_PER_MINUTE`: Maximum tokens per minute (default: 100000)

## Deployment Steps

### Option 1: Deploy from Vercel CLI (Recommended)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the deploy command:
   ```bash
   vercel --prod
   ```

3. Follow the prompts to link your project and set environment variables

4. Alternatively, you can use the provided deployment script:
   - On Windows: `deploy-vercel.bat`

### Option 2: Deploy from Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your repository
4. Set the root directory to `/backend`
5. Add the required environment variables in the dashboard
6. Click "Deploy"

## API Endpoints

Once deployed, your API will be available at:
- `https://your-project-name.vercel.app/api/v1/`

Available endpoints:
- `POST /api/v1/sessions` - Create a new chat session
- `POST /api/v1/chat/query` - Send a message and get AI response
- `GET /api/v1/messages/{session_id}` - Get messages for a session
- `GET /api/v1/history/{session_id}` - Get chat history for a session
- `GET /health` - Health check
- `GET /ready` - Readiness check
- `GET /docs` - Interactive API documentation
- `GET /redoc` - Alternative API documentation

## Notes

- Serverless functions have execution time limits (typically 10 seconds for hobby accounts, up to 60 seconds for pro)
- WebSocket functionality may not work as expected in serverless environments
- Session cleanup background tasks won't run continuously in serverless functions
- Consider using a database for persistent session storage in production
- The application uses the Mangum adapter to convert FastAPI into a serverless-compatible format
- CORS is configured to allow requests from localhost:3000, localhost:3001, and the deployed frontend domain