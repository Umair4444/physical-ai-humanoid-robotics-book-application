# Deployment Configuration: Qdrant RAG Chatbot

## Overview
This document provides configuration guidelines for deploying the Qdrant RAG Chatbot system to production.

## Architecture Overview

### Components
1. **Frontend**: Docusaurus-based documentation website
2. **Backend**: FastAPI application with RAG functionality
3. **Vector Database**: Qdrant for storing textbook embeddings
4. **AI Service**: Gemini/OpenAI for response generation
5. **Document Source**: Textbook content in docs directory

### Deployment Diagram
```
[User] -> [Load Balancer] -> [Frontend CDN] 
                      -> [Backend Instance 1]
                      -> [Backend Instance 2]
                      -> [Backend Instance N]
[Backend] -> [Qdrant Cluster]
[Backend] -> [AI Service API]
```

## Backend Configuration

### Environment Variables
Required for production deployment:

```env
# Server Configuration
PORT=8000
HOST=0.0.0.0
RELOAD=false

# API Keys
GEMINI_API_KEY=your-gemini-api-key-here
# OR
OPENAI_API_KEY=your-openai-api-key-here

# Model Configuration
DEFAULT_MODEL=gemini/gemini-2.5-flash

# Qdrant Configuration
QDRANT_HOST=your-qdrant-cluster-url
QDRANT_PORT=6333
QDRANT_HTTPS=true
QDRANT_API_KEY=your-qdrant-api-key
QDRANT_COLLECTION_NAME=textbook_knowledge

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600

# CORS Configuration
ALLOWED_ORIGINS=http://your-frontend-domain.com,https://your-frontend-domain.com
```

### Docker Configuration
Dockerfile for the backend:

```Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose for Local Development
docker-compose.yml for local development with all services:

```yaml
version: '3.8'

services:
  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - ./qdrant_data:/qdrant/storage
    environment:
      - QDRANT__SERVICE__API_KEY=your-local-dev-api-key

  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - QDRANT_HOST=qdrant
      - QDRANT_PORT=6333
      - QDRANT_API_KEY=your-local-dev-api-key
      # Add other required environment variables
    depends_on:
      - qdrant
    volumes:
      - ./docs:/app/docs  # Mount docs directory

  frontend:
    # Your frontend service configuration
    # This would depend on your frontend stack
```

## Qdrant Configuration

### Production Qdrant Settings
For production deployment of Qdrant:

```yaml
# config.yaml for Qdrant
service:
  api_key: "your-production-api-key"
  cors:
    enabled: true
  max_request_size_mb: 100

storage:
  snapshots_path: "/qdrant/snapshots"
  optimizers:
    max_segment_number: 5
    memmap_threshold: 50000
    indexing_threshold: 20000
    flush_interval_sec: 10
    max_optimization_threads: 1
```

### Qdrant Cloud Configuration
If using Qdrant Cloud:

1. Create a cluster with appropriate size based on expected load
2. Configure authentication with API keys
3. Set up proper network access rules
4. Configure backup and monitoring

## Scaling Configuration

### Horizontal Scaling
To scale the backend horizontally:

1. **Load Balancer**: Use a load balancer to distribute traffic across instances
2. **Session Management**: Ensure stateless operation (no server-side sessions)
3. **Database Connection**: Configure connection pooling appropriately
4. **Caching**: Implement distributed caching (Redis/Memcached)

### Auto-scaling Configuration
Example configuration for cloud platforms:

```yaml
# For Kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rag-chatbot-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rag-chatbot-backend
  template:
    spec:
      containers:
      - name: backend
        image: your-registry/rag-chatbot-backend:latest
        ports:
        - containerPort: 8000
        envFrom:
        - configMapRef:
            name: rag-chatbot-config
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: rag-chatbot-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: rag-chatbot-backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Monitoring and Observability

### Health Checks
Configure health checks for your deployment platform:

```json
{
  "health_check": {
    "endpoint": "/health",
    "timeout": 5,
    "interval": 30,
    "success_threshold": 1,
    "failure_threshold": 3
  }
}
```

### Logging Configuration
Set up structured logging:

```python
# logging.conf
{
  "version": 1,
  "disable_existing_loggers": false,
  "formatters": {
    "json": {
      "()": "pythonjsonlogger.jsonlogger.JsonFormatter",
      "format": "%(asctime)s %(name)s %(levelname)s %(message)s"
    }
  },
  "handlers": {
    "console": {
      "class": "logging.StreamHandler",
      "level": "INFO",
      "formatter": "json",
      "stream": "ext://sys.stdout"
    }
  },
  "loggers": {
    "uvicorn": {
      "level": "INFO",
      "handlers": ["console"],
      "propagate": false
    },
    "uvicorn.error": {
      "level": "INFO",
      "handlers": ["console"],
      "propagate": false
    },
    "uvicorn.access": {
      "level": "INFO",
      "handlers": ["console"],
      "propagate": false
    },
    "rag_chatbot": {
      "level": "INFO",
      "handlers": ["console"],
      "propagate": false
    }
  }
}
```

### Performance Monitoring
Monitor these key metrics:

1. **Response Time**: P95 and P99 response times for RAG queries
2. **Error Rates**: Percentage of failed requests
3. **Throughput**: Requests per second
4. **Qdrant Connection**: Status of Qdrant connectivity
5. **Resource Usage**: CPU, memory, and disk utilization

## Security Configuration

### API Security
1. **Rate Limiting**: Implement rate limiting to prevent abuse
2. **Authentication**: Consider API key authentication for sensitive endpoints
3. **Input Validation**: Validate all inputs to prevent injection attacks
4. **HTTPS**: Ensure all traffic is encrypted with HTTPS

### Data Security
1. **API Keys**: Store API keys securely, never in code
2. **Data Encryption**: Ensure data is encrypted in transit and at rest
3. **Access Control**: Limit access to sensitive data and systems

## Backup and Recovery

### Backup Strategy
1. **Qdrant Data**: Regular snapshots of the vector database
2. **Application Data**: Backup of application configurations
3. **Document Content**: Backup of the docs directory content

### Recovery Procedures
1. **Qdrant Recovery**: Restore from Qdrant snapshots if needed
2. **Document Re-ingestion**: Process to re-ingest documents after recovery
3. **Configuration Restore**: Restore environment and settings

## Deployment Checklist

### Pre-deployment
- [ ] All tests pass in staging environment
- [ ] Performance testing completed and acceptable
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Backup procedures tested

### Deployment
- [ ] Environment variables configured securely
- [ ] Database connections verified
- [ ] Health checks configured
- [ ] Monitoring and alerting set up
- [ ] Rollback plan ready

### Post-deployment
- [ ] Verify all endpoints are working
- [ ] Check logs for any errors
- [ ] Validate RAG functionality
- [ ] Test with sample queries
- [ ] Monitor performance metrics
- [ ] Update documentation if needed

## Rollback Plan
If deployment issues occur:

1. **Immediate Rollback**: Revert to previous stable version
2. **Data Validation**: Verify data integrity after rollback
3. **Service Verification**: Test all functionality after rollback
4. **Root Cause Analysis**: Determine cause of deployment failure
5. **Fix and Retest**: Apply fixes and test in staging before retry