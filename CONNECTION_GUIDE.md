# Frontend-Backend Connection Guide

This document details how the frontend and backend of the Physical AI Humanoid Robotics textbook application are connected in deployed environments.

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

### How the Connection Works

1. **Environment Configuration**:
   - The `REACT_APP_API_BASE_URL` environment variable is read by the frontend
   - It points to the deployed backend URL in production

2. **API Service**:
   - The `APIService` class in `website/src/services/APIService.ts` uses the environment configuration
   - It's imported by various service classes like `ChatService.ts`
   - All API calls are routed through this service

3. **Request Flow**:
   - Frontend makes requests to `/api/v1/chat` endpoint
   - APIService prefixes the base URL from environment config
   - Request is sent to backend (e.g., `https://umair44-ai-textbook-backend.hf.space/api/v1/chat`)

## Backend Endpoints

The deployed backend exposes the following key endpoints:

- **GET /** - Root endpoint returning service status
- **POST /api/v1/chat** - Chat endpoint for AI interactions
- **GET /health** - Health check endpoint

## CORS Configuration

The backend's CORS settings in `ai-textbook-backend/src/config/settings.py` allow requests from:
- `http://localhost:3000` (Local development)
- `http://localhost:8000` (Docusaurus local server)
- `https://physical-ai-humanoid-robotics-book-nu-ashy.vercel.app` (Production frontend)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Verify the frontend domain is in the backend's allowed_origins
2. **Connection Refused**: Check that the backend server is running and accessible
3. **Environment Not Loading**:
   - For local development: ensure environment variables are properly prefixed with `REACT_APP_`
   - For production: ensure the environment variable is set in the Vercel project settings
4. **API Key Missing**: The backend requires either `GEMINI_API_KEY` or `OPENAI_API_KEY` to function properly

### Fixing the Connection Issue

If the deployed frontend shows "Unable to connect to the server", the issue is likely that the `REACT_APP_API_BASE_URL` environment variable is not set in the Vercel deployment. To fix this:

1. Go to your Vercel dashboard
2. Navigate to your project (physical-ai-humanoid-robotics-book-nu-ashy)
3. Go to Settings → Environment Variables
4. Add a new environment variable:
   - Key: `REACT_APP_API_BASE_URL`
   - Value: `https://umair44-ai-textbook-backend.hf.space`
   - Target: Production (or All)
5. Redeploy your project for the changes to take effect

### Testing the Connection

You can test the backend connection directly:
- Health: https://umair44-ai-textbook-backend.hf.space/health
- API Docs: https://umair44-ai-textbook-backend.hf.space/docs
- Chat endpoint: https://umair44-ai-textbook-backend.hf.space/api/v1/chat (requires POST request)

## Deployment Verification

To verify the connection is working:

1. Check that the backend is accessible at https://umair44-ai-textbook-backend.hf.space/
2. Verify the OpenAPI specification at https://umair44-ai-textbook-backend.hf.space/openapi.json
3. Confirm the environment variable is set in your Vercel deployment
4. Redeploy the frontend after setting the environment variable
5. Test the chat functionality on the deployed site