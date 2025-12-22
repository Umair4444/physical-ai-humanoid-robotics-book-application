# Quickstart Guide: AI Chatbot Backend

## Overview
This guide will help you quickly set up and run the AI Chatbot Backend for the Physical AI Humanoid Robotics Textbook project.

## Prerequisites
- Python 3.11+
- pip package manager
- Access to Google Gemini API (via OpenAI-compatible endpoint)
- Hugging Face account (for deployment)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install uv
uv pip install -r requirements.txt
```

### 4. Set Environment Variables
Create a `.env` file in the project root with the following:
```env
GEMINI_API_KEY=your_gemini_api_key_here
LOG_LEVEL=INFO
HF_TOKEN=your_hugging_face_token
```

### 5. Run the Development Server
```bash
cd backend
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Chat Endpoint
- **URL**: `POST /chat`
- **Description**: Send a message to the AI chatbot
- **Request Body**:
```json
{
  "message": "Your question here",
  "context": {}
}
```
- **Response**:
```json
{
  "response": "AI-generated response",
  "metadata": {
    "confidence": 0.9,
    "sources": [],
    "processing_time": 1.23
  },
  "suggestions": [
    "Follow-up question 1",
    "Follow-up question 2"
  ]
}
```

### Health Check
- **URL**: `GET /health`
- **Description**: Check the health status of the service
- **Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-22T10:00:00Z"
}
```

## Testing the Backend

### Unit Tests
```bash
cd backend
python -m pytest tests/unit/
```

### Integration Tests
```bash
cd backend
python -m pytest tests/integration/
```

## Deployment to Hugging Face Spaces

1. Create a new Space on Hugging Face
2. Connect your repository
3. Add the required environment variables in the Space settings
4. The Space will automatically build and deploy your application

## Troubleshooting

### Common Issues
- **API Key Issues**: Ensure your GEMINI_API_KEY is correctly set
- **Rate Limits**: Check if you're hitting API rate limits
- **Timeouts**: The service might timeout on Hugging Face if processing takes too long

### Error Codes
- `400`: Bad Request - Check your request format
- `429`: Rate Limited - Wait before sending another request
- `500`: Internal Server Error - Check server logs
- `503`: Service Unavailable - The LLM service might be down