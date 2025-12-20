# Vercel Deployment Guide for FastAPI Applications

This guide explains common issues when deploying FastAPI applications to Vercel and how to resolve them.

## Common Issues and Solutions

### 1. Health Check Endpoint Not Working

**Problem:** The `/health` endpoint works locally but returns 404 or other errors on Vercel.

**Solution:**
- Ensure the endpoint is properly defined in your main application instance
- Use the `mangum` adapter to convert FastAPI app to AWS Lambda handler
- Check that your `vercel.json` routes all requests correctly to your API handler

### 2. Missing Dependencies

**Problem:** Local dependencies not available in Vercel environment.

**Solution:**
- Ensure all dependencies are listed in `requirements.txt`
- Test your deployment with a clean environment
- Use `pip freeze > requirements.txt` to capture all dependencies

### 3. Startup Events Not Working

**Problem:** `@app.on_event("startup")` code doesn't execute in serverless environment.

**Explanation:**
- Serverless functions don't have persistent lifecycle events like traditional servers
- Startup code runs once per cold start, not persistently
- Background tasks won't work as expected in serverless environments

### 4. WebSocket Support Limitations

**Problem:** WebSocket connections don't work properly on Vercel.

**Explanation:**
- Vercel serverless functions have a maximum execution time (typically 10 seconds for hobby accounts, 60 seconds for pro)
- WebSockets require persistent connections which don't work well with serverless functions
- Consider using a dedicated WebSocket service like Pusher or Socket.io with Redis

### 5. Environment Variables

**Problem:** Environment variables not accessible in deployed application.

**Solution:**
- Set environment variables in the Vercel dashboard under Settings > Environment Variables
- Make sure variables are properly mapped in `vercel.json`

## Recommended Vercel Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python",
      "config": { "maxLambdaSize": "15mb", "runtime": "python3.11" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.py"
    }
  ]
}
```

## Proper API Handler Setup

```python
import json
from mangum import Mangum
from your_main_app import app  # Import your FastAPI app

# Create the Mangum adapter for serverless
handler = Mangum(app, lifespan="off")

def main(event, context):
    return handler(event, context)

# Export the handler function for Vercel
handler_func = main
```

## Testing Health Checks

When testing your deployment:

1. Check the root endpoint: `https://your-project.vercel.app/`
2. Check the health endpoint: `https://your-project.vercel.app/health`
3. Check the OpenAPI docs: `https://your-project.vercel.app/docs`

## Troubleshooting Steps

1. **Verify the Vercel deployment logs:**
   - Check for any build errors or runtime errors
   - Look for missing dependencies or import errors

2. **Test locally with Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel dev
   ```

3. **Validate your requirements.txt:**
   - Make sure `mangum` is included
   - Ensure all dependencies are pinned to compatible versions

4. **Check API Gateway behavior:**
   - Vercel uses API Gateway which may modify request/response objects
   - Ensure your endpoints handle this correctly

## Advanced Configuration

For more complex deployments, you might need to adjust:

- `maxLambdaSize`: Increase if your deployment exceeds size limits
- `runtime`: Specify the correct Python version
- Add custom headers or redirects as needed

## Best Practices

1. Keep your serverless functions lightweight
2. Use external services for persistent data storage
3. Implement proper error handling
4. Use environment variables for configuration
5. Test your deployment thoroughly before going live