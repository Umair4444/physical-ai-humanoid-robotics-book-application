# Operational Runbooks: Qdrant RAG Chatbot

## Overview
This document provides operational procedures for monitoring, maintaining, and troubleshooting the Qdrant RAG Chatbot system.

## System Architecture
- **Frontend**: Docusaurus-based website
- **Backend**: FastAPI application with RAG functionality
- **Vector Database**: Qdrant for storing textbook embeddings
- **AI Service**: Gemini/OpenAI for response generation
- **Document Source**: Textbook content in docs directory

## Monitoring

### Key Metrics to Monitor
1. **Qdrant Connection Status**: Check if the backend can connect to Qdrant
2. **Response Time**: Track average response time for RAG queries
3. **Error Rates**: Monitor error rates for RAG endpoints
4. **Vector Database Size**: Track the number of embeddings in the database
5. **API Usage**: Monitor usage of RAG-specific endpoints

### Health Checks
- **Endpoint**: `GET /api/v1/rag/status`
- **Expected Response**: Should return system status with Qdrant connection info
- **Frequency**: Every 5 minutes
- **Alert Threshold**: Alert if status is "unavailable" for more than 5 minutes

### Performance Metrics
- **Target Response Time**: < 5 seconds for 95% of requests
- **Minimum Acceptable**: < 10 seconds for 99% of requests
- **Alert Threshold**: Alert if average response time exceeds 8 seconds

## Maintenance Procedures

### Daily Maintenance
1. **Check System Logs**: Review logs for any errors or warnings
2. **Verify Qdrant Connection**: Ensure the backend can connect to Qdrant
3. **Monitor Response Times**: Check if performance is within acceptable ranges
4. **Check API Usage**: Verify normal usage patterns

### Weekly Maintenance
1. **Update Textbook Content**: Run ingestion script to update with any new content
2. **Review Error Logs**: Analyze any recurring errors or issues
3. **Check Database Growth**: Monitor the size of the vector database
4. **Performance Review**: Analyze response times and optimize if needed

### Monthly Maintenance
1. **Backup Vector Database**: Create a backup of the Qdrant database
2. **Review Usage Patterns**: Analyze API usage and plan for scaling if needed
3. **Update Dependencies**: Update Python packages if needed (test in staging first)
4. **Security Review**: Review access logs and security settings

## Troubleshooting

### Common Issues and Solutions

#### Qdrant Connection Issues
**Symptoms**: 
- 500 errors on RAG endpoints
- Status endpoint shows "unavailable"
- Error logs show connection errors

**Solutions**:
1. Verify Qdrant service is running
2. Check network connectivity between backend and Qdrant
3. Verify environment variables (QDRANT_HOST, QDRANT_PORT, etc.)
4. Check authentication settings if using Qdrant Cloud

#### Slow Response Times
**Symptoms**:
- Response times exceed 5 seconds
- High CPU/memory usage
- Large number of concurrent requests

**Solutions**:
1. Check if Qdrant is responding slowly
2. Verify the embedding model is loading properly
3. Check for resource constraints on the server
4. Consider implementing additional caching

#### Ingestion Failures
**Symptoms**:
- Documents not appearing in search results
- Ingestion API returns errors
- Status shows fewer documents than expected

**Solutions**:
1. Check the format of documents in the docs directory
2. Verify document parser can handle the file format
3. Check available disk space and memory
4. Review ingestion logs for specific errors

#### Empty Search Results
**Symptoms**:
- Search returns no results despite relevant content
- Low confidence scores on relevant queries

**Solutions**:
1. Verify documents were properly ingested
2. Check if embedding model is working correctly
3. Adjust search parameters (top_k, score_threshold)
4. Verify document content is in the expected format

### Diagnostic Commands

#### Check System Status
```bash
curl -X GET http://your-api-url/api/v1/rag/status
```

#### Test Search Functionality
```bash
curl -X POST http://your-api-url/api/v1/rag/search \
  -H "Content-Type: application/json" \
  -d '{"query": "test", "top_k": 1}'
```

#### Check Logs
```bash
# Check application logs
tail -f /path/to/app/logs

# Check Qdrant logs (if running locally)
docker logs qdrant
```

## Backup and Recovery

### Backup Procedures
1. **Qdrant Vector Database**: Use Qdrant's built-in backup functionality
2. **Application Configuration**: Backup environment variables and settings
3. **Document Source**: Maintain backup of docs directory

### Recovery Procedures
1. **Restore Qdrant**: Restore from Qdrant backup if needed
2. **Re-ingest Documents**: Run ingestion script to repopulate vector database
3. **Verify Functionality**: Test all endpoints after recovery

## Scaling Guidelines

### When to Scale
- Response times consistently exceed 5 seconds
- Error rates increase significantly
- High concurrent user load
- Vector database size approaches limits

### Scaling Options
1. **Vertical Scaling**: Increase server resources (CPU, memory)
2. **Horizontal Scaling**: Add additional backend instances
3. **Qdrant Scaling**: Use Qdrant's clustering capabilities
4. **Caching**: Implement additional caching layers

## Security Considerations

### API Keys
- Rotate API keys regularly
- Monitor API key usage
- Use environment variables for storage

### Rate Limiting
- Monitor rate limiting effectiveness
- Adjust limits based on usage patterns
- Watch for abuse patterns

### Data Privacy
- Ensure no sensitive user data is stored
- Verify textbook content compliance
- Follow data retention policies