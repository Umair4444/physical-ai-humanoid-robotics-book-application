import json
from mangum import Mangum
from vercel_app import app

# Create the Mangum adapter for serverless
handler = Mangum(app, lifespan="off")

def main(event, context):
    return handler(event, context)

# Export the handler function for Vercel
handler_func = main