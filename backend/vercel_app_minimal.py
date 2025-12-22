from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Create the FastAPI app with minimal configuration
app = FastAPI(
    title="AI Chatbot API",
    description="API for the AI Chatbot Integration",
    version="1.0.0"
)

# Add minimal CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Chatbot API"}

# Simple health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}

# Export the app
app_export = app