import logging
import sys
from logging import config

def setup_logging():
    """Set up logging configuration for the application."""
    # In serverless environments like Vercel, we can't write to files
    # So we only configure console logging
    logging_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            },
            "detailed": {
                "format": "%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s",
            },
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "level": "INFO",
                "formatter": "detailed",  # Use detailed formatter for serverless
                "stream": sys.stdout,
            },
        },
        "root": {
            "level": "INFO",
            "handlers": ["console"],
        },
    }

    logging.config.dictConfig(logging_config)
    return logging.getLogger(__name__)

# Set up the logger
logger = setup_logging()