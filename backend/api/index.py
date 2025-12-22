import json
from mangum import Mangum
from vercel_app import app
import logging

# Set up logging to help debug Vercel deployment issues
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create the Mangum adapter for serverless
try:
    handler = Mangum(app, lifespan="off")
    logger.info("Mangum handler created successfully")
except Exception as e:
    logger.error(f"Error creating Mangum handler: {e}")
    raise

def main(event, context):
    logger.info(f"Received event: {event}")
    logger.info(f"Received context: {context}")
    response = handler(event, context)
    logger.info(f"Returning response: {response}")
    return response

# Export the handler function for Vercel
handler_func = main