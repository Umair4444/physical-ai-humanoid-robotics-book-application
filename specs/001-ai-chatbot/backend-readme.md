# Backend Setup for AI Chatbot

This document provides instructions for setting up and running the backend for the AI chatbot application.

## Prerequisites

Before setting up the backend, ensure you have the following installed:
- Python 3.9 or higher
- uv (Python package installer)
- Git
- Access to Google Gemini API

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

4. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

5. Install the required dependencies:
   ```bash
   uv add -r requirements.txt
   ```

## Environment Variables

Create a `.env` file in the backend root directory and add the following environment variables:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/

# OpenAI Agent SDK Configuration
OPENAI_AGENT_API_KEY=your_openai_agent_api_key_here

# Server Configuration
HOST=localhost
PORT=8000
DEBUG=true  # Set to false in production

# Additional Configuration
LOG_LEVEL=INFO
```

### Obtaining API Keys

1. **Google Gemini API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Create an account or sign in
   - Navigate to the API Keys section
   - Create a new API key or use an existing one
   - Copy the API key and add it to your `.env` file

2. **OpenAI Agent SDK Key**:
   - If using OpenAI Agent SDK, obtain your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Add it to your `.env` file

## Running the Application

### Development Mode

To run the backend in development mode with auto-reload:

```bash
python -m uvicorn main:app --reload --host $HOST --port $PORT
```

### Production Mode

To run the backend in production mode:

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind $HOST:$PORT
```

## Available Endpoints

- `GET /` - Health check endpoint
- `POST /chat` - Send a message to the AI agent and receive a response
- `POST /chat/new` - Start a new conversation session
- `DELETE /chat/{session_id}` - Clear conversation history for a session

## Example Request

To send a message to the chatbot:

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, how are you?",
    "session_id": "unique-session-id"
  }'
```

## Logging

The application logs are output to the console by default. In production, configure logging to write to files or external services as needed.

## Troubleshooting

### Common Issues

1. **API Connection Errors**:
   - Verify your API keys are correct and have not expired
   - Check your internet connection
   - Ensure the Gemini API is accessible from your location

2. **Environment Variables Not Loading**:
   - Ensure your `.env` file is in the correct location
   - Restart your terminal/shell after updating environment variables
   - Verify the format of your `.env` file (no spaces around the `=`)

3. **Port Already in Use**:
   - Change the PORT variable in your `.env` file
   - Kill the process using the port: `pkill -f :8000` (Linux/macOS) or use Task Manager (Windows)

### Enable Debug Mode

Set `DEBUG=true` in your `.env` file to get more detailed error messages during development.

## Updating Dependencies

To update dependencies, modify the `requirements.txt` file and reinstall:

```bash
uv add -r requirements.txt --upgrade
```

## Stopping the Application

Press `Ctrl+C` in the terminal where the application is running to stop it.