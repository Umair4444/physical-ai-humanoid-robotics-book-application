# Vercel Deployment Setup for Physical AI Humanoid Robotics Backend

This document provides a complete guide to deploying your FastAPI backend on Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Vercel CLI installed: `npm install -g vercel`
3. Your project should have the following files in the `backend` directory:
   - `vercel.json` (updated to route requests properly)
   - `requirements.txt` (with all dependencies including mangum)
   - `vercel_app.py` (the main FastAPI application)
   - `api/app.py` (entry point with Mangum adapter)

## Configuration Files

### 1. vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/app.py",
      "use": "@vercel/python",
      "config": {
        "maxLambdaSize": "15mb",
        "runtime": "python3.11"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/app.py"
    }
  ]
}
```

### 2. requirements.txt

Make sure your `requirements.txt` includes all necessary dependencies:

```
fastapi>=0.115.13
uvicorn[standard]>=0.32.0
openai>=1.57.4
python-dotenv>=1.0.1
pydantic>=2.10.3
websockets>=13.1
pytest>=8.3.3
httpx>=0.27.2
pytest-asyncio>=0.23.7
mangum>=0.19.0
```

### 3. api/app.py (Entry Point)

This file serves as the entry point for the Vercel deployment:

```python
from mangum import Mangum
from vercel_app import app

# Create the Mangum adapter for serverless
handler = Mangum(app, lifespan="off")
```

## Deployment Steps

### Option 1: Using Vercel CLI (Recommended)

1. Navigate to your backend directory:
   ```bash
   cd D:\1.GITHUB\qwen-coder\physical-ai-humanoid-robotics-book-application\backend
   ```

2. Run the deployment command:
   ```bash
   vercel --prod
   ```

3. Follow the prompts to link your project to a Vercel account and configure the deployment.

4. Once deployed, Vercel will provide you with a unique URL for your backend.

### Option 2: Connect GitHub Repository to Vercel

1. Commit all changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "Setup Vercel deployment configuration"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and click "New Project".

3. Select your GitHub repository and click "Import".

4. In the configuration:
   - Framework Preset: None
   - Root Directory: backend/
   - Build Command: `echo "No build command needed for Python"`
   - Install Command: `pip install -r requirements.txt`
   - Output Directory: Leave empty

5. Click "Deploy" to start the deployment process.

## Environment Variables

If your application requires environment variables (such as API keys), you'll need to set them in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add your environment variables (e.g., OPENAI_API_KEY, DATABASE_URL, etc.)

## Testing the Deployment

Once deployed, test these endpoints:

- Root: `https://your-project-name.vercel.app/`
- Health: `https://your-project-name.vercel.app/health`
- API Docs: `https://your-project-name.vercel.app/docs`

## Important Notes

1. **Serverless Limitations**: Vercel runs your application as serverless functions with execution time limits. Background tasks may not work as expected.

2. **WebSocket Limitations**: WebSockets may not work reliably in Vercel's serverless environment. Consider using a dedicated WebSocket service if real-time communication is required.

3. **Cold Starts**: The first request to your API after a period of inactivity may be slower due to cold starts.

4. **Static Assets**: If you need to serve static files, consider using a CDN or object storage service.

## Troubleshooting

If you encounter issues during deployment:

1. Check the Vercel deployment logs in the dashboard for error messages
2. Ensure all dependencies are listed in `requirements.txt`
3. Verify that the `vercel.json` configuration is correct
4. Test locally with `vercel dev` command
5. Make sure your FastAPI app is properly wrapped with Mangum

## Rollback

To rollback to a previous deployment:
1. Go to your project in the Vercel dashboard
2. Navigate to Deployments
3. Find the deployment you want to rollback to
4. Click "Promote" to make it the production deployment