#!/bin/bash

# Production Deployment Script for AI Chatbot Backend
# This script prepares the application for production deployment

set -e  # Exit on any error

echo "Starting production deployment preparation..."

# Create production requirements file
echo "Creating production requirements file..."
cat > backend/requirements-prod.txt << EOF
fastapi>=0.115.13
uvicorn[standard]>=0.32.0
openai>=1.57.4
python-dotenv>=1.0.1
pydantic>=2.10.3
uuid>=1.30
websockets>=13.1
gunicorn>=23.0.0
EOF

# Create a production-ready startup script
echo "Creating production startup script..."
cat > backend/start-prod.sh << 'EOF'
#!/bin/bash
# Production startup script

# Load environment variables
set -a
source .env
set +a

# Start the application with gunicorn
exec gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 --timeout 120 --keep-alive 5
EOF

chmod +x backend/start-prod.sh

# Create Dockerfile for containerized deployment
echo "Creating Dockerfile..."
cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Expose port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# Create docker-compose file for local production-like testing
echo "Creating docker-compose.yml..."
cat > backend/docker-compose.yml << 'EOF'
version: '3.8'

services:
  ai-chatbot-api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - OPENAI_BASE_URL=${OPENAI_BASE_URL}
      - MODEL_NAME=${MODEL_NAME}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
EOF

echo "Production deployment preparation completed successfully!"
echo ""
echo "Next steps:"
echo "1. Set your environment variables in a .env file"
echo "2. To run with Docker: docker-compose up -d"
echo "3. To run directly: cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000"
echo ""
echo "For Vercel deployment, make sure to set the environment variables in the Vercel dashboard."