# AI Chatbot Backend Feature

This feature implements an AI-powered chatbot backend deployed on Hugging Face, using OpenAI Agent SDK (Python) and Google Gemini via OpenAI-compatible API.

## Overview

The AI Chatbot Backend provides a stateless, HTTP-based interface for users to interact with an AI assistant. The backend is built with FastAPI and designed for deployment on Hugging Face Spaces. It integrates with both OpenAI Agent SDK and Google Gemini to provide AI responses to user queries.

## Prerequisites

- Python 3.9+
- FastAPI
- OpenAI Agent SDK (Python)
- Access to Google Gemini via OpenAI-compatible API
- Hugging Face account for deployment

## Required Environment Variables

The following environment variables must be set for the application to function:

- `GEMINI_API_KEY`: API key for accessing Google Gemini through the OpenAI-compatible API
- `HUGGING_FACE_TOKEN`: Token for deploying and managing the application on Hugging Face Spaces
- `LOG_LEVEL`: Logging level (default: INFO)

## Local Development Setup

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Set the required environment variables
6. Run the FastAPI server: `uvicorn main:app --reload`

## How to Run the FastAPI Server Locally

```bash
# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

# Set environment variables
export GEMINI_API_KEY=your_gemini_api_key
export LOG_LEVEL=INFO

# Run the server
uvicorn main:app --reload
```

## How to Run on Hugging Face Spaces

1. Create a new Space on Hugging Face
2. Connect your repository
3. Add the required environment variables in the Space settings
4. The Space will automatically build and deploy your application

## Common Errors and Troubleshooting

- **503 Service Unavailable**: The AI service might be temporarily unavailable. Check your API keys and service status.
- **429 Rate Limit Exceeded**: You've exceeded the API rate limit. Consider implementing request throttling.
- **500 Internal Server Error**: Check the application logs for detailed error information.
- **Slow Response Times**: This might be due to the AI model processing time or network latency to the AI service.