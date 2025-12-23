from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from ..utils.logging import setup_logging
from typing import Callable, Awaitable
import traceback
from datetime import datetime, timezone


def add_error_handlers(app: FastAPI):
    """
    Add error handlers to the FastAPI application.
    """
    # Set up logging
    setup_logging()

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": {
                    "type": "HTTPException",
                    "message": exc.detail,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
            }
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        # Log the full traceback
        import logging
        logging.error(f"Unhandled exception: {exc}\n{traceback.format_exc()}")

        return JSONResponse(
            status_code=500,
            content={
                "error": {
                    "type": "InternalServerError",
                    "message": "An internal server error occurred",
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
            }
        )

    # Add a middleware to log all requests
    @app.middleware("http")
    async def log_requests(request: Request, call_next: Callable):
        start_time = datetime.now(timezone.utc)

        # Log the incoming request
        import logging
        logging.info(f"Request: {request.method} {request.url}")

        try:
            response = await call_next(request)
        except Exception as e:
            # Log any exceptions during request processing
            logging.error(f"Exception during request processing: {e}")
            raise
        finally:
            # Calculate and log processing time
            process_time = (datetime.now(timezone.utc) - start_time).total_seconds()
            logging.info(f"Response status: {response.status_code}, Process time: {process_time}s")

        return response