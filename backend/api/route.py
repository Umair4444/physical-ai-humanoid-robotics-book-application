from fastapi import FastAPI
from mangum import Mangum
from typing import Any, Dict
import os

# Import your main application
from vercel_app import app

# Create the Mangum adapter for serverless
handler = Mangum(app, lifespan="off")

# Define the async handler function
async def api_handler(request: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Vercel-compatible API handler
    """
    # Convert Vercel request to ASGI scope
    scope = {
        "type": "http",
        "method": request.get("method", "GET"),
        "path": request.get("path", "/"),
        "query_string": request.get("query", "").encode(),
        "headers": [(k.encode(), v.encode()) for k, v in request.get("headers", {}).items()],
    }
    
    # Create ASGI receive/send functions
    async def receive():
        return {
            "type": "http.request",
            "body": request.get("body", "").encode() if request.get("body") else b"",
            "more_body": False
        }
    
    response_body = b""
    
    async def send(message):
        nonlocal response_body
        if message["type"] == "http.response.body":
            response_body += message.get("body", b"")
    
    # Call the Mangum handler
    await handler(scope, receive, send)
    
    # Return Vercel-compatible response
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": response_body.decode()
    }

# Export the handler for Vercel
handler_func = api_handler