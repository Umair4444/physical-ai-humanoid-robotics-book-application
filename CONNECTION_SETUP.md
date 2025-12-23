# Frontend-Backend Connection Guide

This document explains how the frontend (Docusaurus website) connects to the backend (FastAPI server) in both local development and deployed environments.

## Overview

The application consists of:
- **Frontend**: A Docusaurus-based website hosted at https://physical-ai-humanoid-robotics-book-nu-ashy.vercel.app/
- **Backend**: A FastAPI server hosted at https://umair44-ai-textbook-backend.hf.space/

## Connection Configuration

### Configuration

The frontend uses a dynamic configuration to determine the backend API URL:

- **Production Deployment** (when accessed from any domain other than localhost): `https://umair44-ai-textbook-backend.hf.space`
- **Local Development** (when accessed from localhost): Uses the `REACT_APP_API_BASE_URL` environment variable, defaulting to `http://localhost:8000`

The configuration is handled in `website/src/utils/envConfig.ts` to allow both production and development environments to work seamlessly.

### How It Works

1. **Environment Configuration**:
   - The `REACT_APP_API_BASE_URL` environment variable is read by the frontend
   - It defaults to `http://localhost:8000` for local development
   - In production, it points to the deployed backend URL

2. **API Service**:
   - The `APIService` class in `src/services/APIService.ts` uses the environment configuration
   - It's imported by various service classes like `ChatService.ts`
   - All API calls are routed through this service

3. **Request Flow**:
   - Frontend makes requests to `/api/v1/chat` endpoint
   - APIService prefixes the base URL from environment config
   - Request is sent to backend (e.g., `https://umair44-ai-textbook-backend.hf.space/api/v1/chat`)

## Local Development Setup

1. Start the backend server:
   ```bash
   cd ai-textbook-backend
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

2. Ensure the frontend `.env` file has:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8000
   ```

3. Start the frontend:
   ```bash
   cd website
   npm run start
   ```

## Production Deployment

1. The frontend is deployed to Vercel with the environment variable set to the production backend URL
2. The backend is deployed to Hugging Face Spaces
3. CORS is configured in the backend to allow requests from the frontend domain

## Troubleshooting

### Common Issues

1. **CORS Errors**: The backend's `allowed_origins` in `src/config/settings.py` already include both local and production frontend domains
2. **Connection Refused**: Verify the backend server is running and accessible
3. **Environment Not Loading**:
   - For local development: ensure environment variables are properly prefixed with `REACT_APP_`
   - For production: ensure the environment variable is set in the Vercel project settings
4. **API Key Missing**: The backend requires either `GEMINI_API_KEY` or `OPENAI_API_KEY` to function. If you get a 500 error with "API key not configured", set the appropriate environment variable in your deployment environment.

### Fixing the Connection Issue

If the deployed frontend shows "Unable to connect to the server", ensure that:

1. Your Vercel deployment has been updated with the latest code changes
2. For local development, the `REACT_APP_API_BASE_URL` environment variable is set in your `.env` file if you want to use a different backend URL
3. The production deployment will automatically use the deployed backend URL when accessed from the production domain

### Testing the Connection

You can test the backend connection directly:
- Local: http://localhost:8000/
- Production: https://umair44-ai-textbook-backend.hf.space/

Both should return a JSON response: `{"message": "AI Chatbot FastAPI Working"}`