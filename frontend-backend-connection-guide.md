# Connecting Frontend to Deployed Backend

This guide explains how to connect your Docusaurus frontend to your deployed FastAPI backend.

## Step 1: Deploy Your Backend to Vercel

1. Make sure you have a Vercel account (sign up at [vercel.com](https://vercel.com))
2. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Navigate to your backend directory:
   ```bash
   cd backend
   ```
4. Deploy your backend:
   ```bash
   vercel --prod
   ```
5. Take note of the deployment URL provided after deployment (e.g., `https://your-project-name.vercel.app`)

## Step 2: Configure Environment Variables

1. In your website directory, update the `.env` file with your deployed backend URL:
   ```bash
   # Replace 'your-project-name.vercel.app' with your actual deployment URL
   REACT_APP_API_BASE_URL=https://your-project-name.vercel.app/api/v1
   REACT_APP_CHATBOT_API_URL=https://your-project-name.vercel.app/api/v1/chat/query
   REACT_APP_BACKEND_API_URL=https://your-project-name.vercel.app
   ```

2. If you're using a custom domain, update the URLs accordingly.

## Step 3: Update CORS Settings (Optional)

If you updated the CORS settings in the backend as part of this process:
1. Make sure to redeploy your backend to Vercel after making changes
2. Add your frontend domain to the allowed origins list in `main.py` and `vercel_app.py`

## Step 4: Deploy Your Frontend

1. Navigate to your website directory:
   ```bash
   cd website
   ```
2. Build your Docusaurus site:
   ```bash
   npm run build
   ```
3. Deploy to your preferred hosting platform (Netlify, Vercel, GitHub Pages, etc.)

## Step 5: Test the Connection

1. After deployment, you can test the connection using the test script:
   ```bash
   # Update the test script with your backend URL first
   node test-backend-connection.js
   ```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your frontend domain is added to the `allow_origins` list in your backend's CORS configuration.

2. **Network Errors**: Verify that your backend URL is correct and accessible.

3. **API Key Issues**: Ensure all required environment variables (like GEMINI_API_KEY) are set in your Vercel project settings.

### Setting Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `OPENAI_BASE_URL`: `https://generativelanguage.googleapis.com/v1beta/openai/`
   - `MODEL_NAME`: `gemini-2.5-flash` (or your preferred model)
   - `TEMPERATURE`: `0.7`
   - `MAX_TOKENS`: `1000`
   - `REQUESTS_PER_MINUTE`: `60`
   - `TOKENS_PER_MINUTE`: `100000`

## Verification

Once everything is configured:

1. Your frontend should be able to create sessions via `/api/v1/sessions`
2. Your frontend should be able to send chat queries via `/api/v1/chat/query`
3. Your frontend should be able to retrieve and clear conversation history
4. All API calls should return appropriate responses without CORS errors