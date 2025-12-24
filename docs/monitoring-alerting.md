# Monitoring and Alerting: Qdrant RAG Chatbot

## Overview
This document outlines the monitoring and alerting strategy for the Qdrant RAG Chatbot system to ensure optimal performance and availability.

## Monitoring Architecture

### Components to Monitor
1. **Application Backend**: FastAPI application health and performance
2. **Qdrant Vector Database**: Connection status, performance, and data integrity
3. **AI Service**: Response times and availability of external AI services
4. **System Resources**: CPU, memory, disk, and network utilization
5. **API Endpoints**: RAG-specific and general chat endpoints

### Metrics Collection
- **Application Logs**: Structured logging for debugging and analysis
- **Performance Metrics**: Response times, error rates, throughput
- **Business Metrics**: Query success rates, content relevance, user satisfaction
- **Infrastructure Metrics**: Resource utilization, network latency

## Application Monitoring

### Key Application Metrics
- **Response Time**: P95 and P99 response times for all endpoints
- **Error Rate**: Percentage of requests resulting in errors (4xx, 5xx)
- **Throughput**: Requests per second (RPS) for each endpoint
- **Active Connections**: Number of concurrent connections
- **Queue Length**: Number of requests waiting to be processed

### Application Health Checks
```bash
# Health check endpoint
GET /health

# RAG-specific status
GET /api/v1/rag/status
```

### Application Logging
Configure structured logging for better analysis:

```python
# Example logging configuration
import logging
import sys
import json
from pythonjsonlogger import jsonlogger

def setup_logging():
    logHandler = logging.StreamHandler(sys.stdout)
    formatter = jsonlogger.JsonFormatter(
        '%(asctime)s %(name)s %(levelname)s %(message)s'
    )
    logHandler.setFormatter(formatter)
    
    logger = logging.getLogger('rag_chatbot')
    logger.addHandler(logHandler)
    logger.setLevel(logging.INFO)
    
    return logger
```

## Qdrant Monitoring

### Key Qdrant Metrics
- **Connection Status**: Whether the application can connect to Qdrant
- **Query Performance**: Response times for search queries
- **Index Performance**: Vector index creation and optimization times
- **Storage Usage**: Disk space used by vector database
- **Collection Health**: Status of the textbook knowledge collection

### Qdrant Health Checks
```bash
# Qdrant health endpoint
GET http://qdrant-host:6333/healthz

# Collection info
GET http://qdrant-host:6333/collections/textbook_knowledge
```

### Qdrant Performance Metrics
- **Search Latency**: Time taken for similarity searches
- **Indexing Throughput**: Documents processed per second during ingestion
- **Memory Usage**: RAM used by Qdrant instance
- **Disk Usage**: Storage used by vector database

## RAG-Specific Monitoring

### RAG Performance Metrics
- **RAG Response Time**: End-to-end time for RAG queries
- **Search Quality**: Average relevance score of returned results
- **Content Coverage**: Percentage of queries with relevant results
- **Caching Effectiveness**: Cache hit rate for frequent queries

### RAG Endpoints to Monitor
- `POST /api/v1/rag/search`: Semantic search performance
- `POST /api/v1/rag/answer`: Answer generation performance
- `POST /api/v1/rag/ingest`: Document ingestion performance
- `GET /api/v1/rag/status`: System status

### RAG Business Metrics
- **Query Success Rate**: Percentage of queries that return results
- **Source Citation Accuracy**: How often sources are correctly cited
- **User Satisfaction**: Feedback on answer quality
- **Content Freshness**: How up-to-date the knowledge base is

## Alert Configuration

### Critical Alerts (Immediate Response Required)

#### 1. System Unavailable
- **Metric**: Service health check fails
- **Threshold**: 1 consecutive failure
- **Severity**: Critical
- **Target**: On-call engineer
- **Action**: Immediate investigation required

#### 2. Qdrant Connection Failure
- **Metric**: Qdrant connection status
- **Threshold**: Connection unavailable for more than 5 minutes
- **Severity**: Critical
- **Target**: DevOps team
- **Action**: Check Qdrant service and network connectivity

#### 3. High Error Rate
- **Metric**: Error rate > 5%
- **Threshold**: Sustained for more than 5 minutes
- **Severity**: High
- **Target**: Engineering team
- **Action**: Investigate and resolve immediately

### High Priority Alerts

#### 1. Performance Degradation
- **Metric**: P95 response time > 10 seconds
- **Threshold**: Sustained for more than 10 minutes
- **Severity**: High
- **Target**: Engineering team
- **Action**: Investigate performance bottlenecks

#### 2. Low Cache Hit Rate
- **Metric**: Cache hit rate < 70%
- **Threshold**: Sustained for more than 15 minutes
- **Severity**: Medium
- **Target**: Engineering team
- **Action**: Investigate caching strategy

#### 3. Ingestion Failure
- **Metric**: Document ingestion failure
- **Threshold**: 1 failure
- **Severity**: High
- **Target**: DevOps team
- **Action**: Check document processing pipeline

### Medium Priority Alerts

#### 1. Resource Utilization
- **Metric**: CPU or memory usage > 80%
- **Threshold**: Sustained for more than 30 minutes
- **Severity**: Medium
- **Target**: DevOps team
- **Action**: Plan for scaling or optimization

#### 2. Search Quality Degrading
- **Metric**: Average relevance score < 0.5
- **Threshold**: Sustained for more than 1 hour
- **Severity**: Medium
- **Target**: Engineering team
- **Action**: Investigate embedding model or search parameters

## Monitoring Tools Configuration

### Prometheus Metrics Exporter
```python
# Example metrics exporter for FastAPI
from prometheus_client import Counter, Histogram, Gauge
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import time

# Define metrics
REQUEST_COUNT = Counter('rag_requests_total', 'Total requests', ['method', 'endpoint', 'status'])
REQUEST_LATENCY = Histogram('rag_request_duration_seconds', 'Request latency', ['method', 'endpoint'])
QDRANT_CONNECTED = Gauge('rag_qdrant_connected', 'Qdrant connection status')

class MetricsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        response = await call_next(request)
        
        # Record metrics
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=request.url.path,
            status=response.status_code
        ).inc()
        
        REQUEST_LATENCY.labels(
            method=request.method,
            endpoint=request.url.path
        ).observe(time.time() - start_time)
        
        return response
```

### Example Alert Rules (Prometheus)
```yaml
groups:
- name: rag-chatbot
  rules:
  - alert: ServiceDown
    expr: up{job="rag-chatbot"} == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Service {{ $labels.instance }} is down"

  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5..", job="rag-chatbot"}[5m]) / rate(http_requests_total{job="rag-chatbot"}[5m]) > 0.05
    for: 5m
    labels:
      severity: high
    annotations:
      summary: "High error rate on {{ $labels.instance }}"
      description: "Error rate is {{ $value }} on {{ $labels.instance }}"

  - alert: SlowResponseTime
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{job="rag-chatbot"}[5m])) > 10
    for: 10m
    labels:
      severity: high
    annotations:
      summary: "Slow response time on {{ $labels.instance }}"
      description: "P95 response time is {{ $value }}s on {{ $labels.instance }}"
```

## Dashboard Configuration

### Key Dashboard Elements
1. **System Health Overview**: Overall system status and availability
2. **Performance Metrics**: Response times, error rates, throughput
3. **Qdrant Status**: Connection status and performance metrics
4. **RAG Metrics**: Search quality, cache effectiveness, content coverage
5. **Resource Utilization**: CPU, memory, disk, and network usage

### Example Dashboard (Grafana)
```json
{
  "dashboard": {
    "title": "RAG Chatbot Dashboard",
    "panels": [
      {
        "title": "System Health",
        "type": "stat",
        "targets": [
          {
            "expr": "up{job='rag-chatbot'}",
            "legendFormat": "API Status"
          }
        ]
      },
      {
        "title": "Response Times",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "P95 Response Time"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~'5..'}[5m]) / rate(http_requests_total[5m]) * 100",
            "legendFormat": "Error Rate (%)"
          }
        ]
      },
      {
        "title": "Qdrant Status",
        "type": "stat",
        "targets": [
          {
            "expr": "rag_qdrant_connected",
            "legendFormat": "Qdrant Connected"
          }
        ]
      }
    ]
  }
}
```

## Monitoring Best Practices

### Proactive Monitoring
- Set up alerts before issues occur
- Monitor trends, not just current values
- Implement synthetic transactions to test functionality

### Alert Management
- Avoid alert fatigue with appropriate thresholds
- Escalate alerts if not acknowledged in time
- Use different channels for different severities

### Documentation
- Document all alert conditions and their meanings
- Maintain runbooks for common alert responses
- Regularly review and update alert thresholds

## Testing Monitoring and Alerting

### Regular Testing Schedule
- **Weekly**: Test alert delivery and notification channels
- **Monthly**: Review and update alert thresholds
- **Quarterly**: Perform comprehensive monitoring review

### Test Procedures
```bash
# Test alert delivery
./test-alerts.sh

# Simulate high error rate
./simulate-errors.sh

# Test recovery from failures
./test-recovery.sh
```

## Contact and Escalation

### On-Call Schedule
- **Primary**: [Contact Information]
- **Secondary**: [Contact Information]
- **Manager**: [Contact Information]

### Escalation Path
1. **Level 1**: On-call engineer (30 minutes)
2. **Level 2**: Senior engineer (1 hour)
3. **Level 3**: Engineering manager (2 hours)
4. **Level 4**: VP of Engineering (4 hours)

## Reporting and Analysis

### Regular Reports
- **Daily**: System health and performance summary
- **Weekly**: Performance trends and incident summary
- **Monthly**: Comprehensive system analysis and optimization recommendations

### Key Performance Indicators (KPIs)
- **Availability**: Target 99.9% uptime
- **Performance**: P95 response time < 5 seconds
- **Quality**: >90% of queries return relevant results
- **User Satisfaction**: >4.0/5.0 rating on answer quality

### Continuous Improvement
- Regularly review and optimize alert thresholds
- Update monitoring based on system changes
- Implement additional metrics based on operational learnings