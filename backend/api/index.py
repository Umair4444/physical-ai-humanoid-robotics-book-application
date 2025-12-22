from mangum import Mangum
from vercel_app_simple import app_export as app

# Create the Mangum adapter for serverless
handler = Mangum(app, lifespan="off")