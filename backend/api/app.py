from mangum import Mangum
from vercel_app import app

# Create the Mangum adapter for serverless
handler = Mangum(app, lifespan="off")