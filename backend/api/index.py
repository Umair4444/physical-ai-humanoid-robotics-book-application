import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from typing import Dict, Any

# Create a minimal FastAPI app for testing
app = FastAPI(title="Test API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/test")
def test_endpoint():
    return {"status": "success", "message": "API is working"}

# Create Mangum adapter
handler = Mangum(app)

# Vercel requires a default export for serverless functions
def main(event, context):
    # Convert Vercel event to ASGI format for Mangum
    return handler(event, context)

# Export the handler
def __invoke(event, context):
    return main(event, context)