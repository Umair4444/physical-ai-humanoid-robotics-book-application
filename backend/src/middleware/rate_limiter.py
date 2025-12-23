from fastapi import FastAPI, Request, HTTPException
from collections import defaultdict
import time
from typing import Dict


# Simple in-memory rate limiter (in production, use Redis or similar)
request_counts: Dict[str, list] = defaultdict(list)


def add_rate_limiting(app: FastAPI):
    """
    Add rate limiting middleware to the FastAPI application.
    """
    @app.middleware("http")
    async def rate_limit_middleware(request: Request, call_next):
        # Get the client's IP address
        client_ip = request.client.host
        
        # Current time
        now = time.time()
        
        # Clean up old requests (older than the time window)
        request_counts[client_ip] = [
            req_time for req_time in request_counts[client_ip] 
            if now - req_time < 3600  # 1 hour window
        ]
        
        # Check if the client has exceeded the rate limit
        if len(request_counts[client_ip]) >= 100:  # 100 requests per hour
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded: 100 requests per hour"
            )
        
        # Add the current request to the count
        request_counts[client_ip].append(now)
        
        # Continue with the request
        response = await call_next(request)
        
        return response