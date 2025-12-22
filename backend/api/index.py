from mangum import Mangum
from vercel_app import app

# Create the Mangum adapter for serverless
handler = Mangum(app, lifespan="off")

# Export the handler function for Vercel
handler = handler