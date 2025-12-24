# Troubleshooting Guide: Qdrant RAG Chatbot

## Overview
This guide provides solutions for common issues encountered with the Qdrant RAG Chatbot system.

## Connection Issues

### Qdrant Connection Failure
**Problem**: The application cannot connect to the Qdrant database.

**Symptoms**:
- 500 errors when using RAG features
- Status endpoint shows "unavailable"
- Error logs show connection refused or timeout

**Solutions**:
1. **Check if Qdrant is running**:
   ```bash
   # For Docker
   docker ps | grep qdrant
   
   # Check if port is accessible
   telnet your-qdrant-host 6333
   ```

2. **Verify environment variables**:
   - Check `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_HTTPS`, and `QDRANT_API_KEY`
   - Ensure values match your Qdrant configuration

3. **Network connectivity**:
   - If using Qdrant Cloud, verify network access
   - Check firewall settings if running locally

### API Key Issues
**Problem**: Authentication errors with AI services or Qdrant Cloud.

**Solutions**:
1. Verify API keys are correctly set in environment variables
2. Check for typos or expired keys
3. Ensure proper permissions for the API key

## Performance Issues

### Slow Response Times
**Problem**: RAG queries take longer than expected to return results.

**Symptoms**:
- Response times exceed 5 seconds
- High CPU or memory usage
- Timeout errors

**Solutions**:
1. **Check Qdrant performance**:
   - Verify Qdrant has sufficient resources
   - Check for slow disk I/O if running locally

2. **Embedding model performance**:
   - The first request after startup is slower as the model loads
   - Subsequent requests should be faster

3. **Database size**:
   - Large vector databases may impact search performance
   - Consider optimizing collection settings

### High Memory Usage
**Problem**: Application consumes excessive memory, especially during ingestion.

**Solutions**:
1. Process large document sets in smaller batches
2. Monitor memory usage during ingestion
3. Consider increasing available memory or optimizing the process

## Functional Issues

### No Search Results
**Problem**: Search queries return no results despite relevant content.

**Symptoms**:
- Empty search results
- Low confidence scores
- "No relevant information found" responses

**Solutions**:
1. **Verify document ingestion**:
   - Check if documents were properly ingested
   - Use `GET /api/v1/rag/status` to verify document count

2. **Check search parameters**:
   - Try with different `top_k` values
   - Adjust `score_threshold` if using one
   - Verify the query contains searchable terms

3. **Document content**:
   - Ensure documents contain text content
   - Check if documents are properly formatted

### Ingestion Failures
**Problem**: Document ingestion fails or doesn't complete properly.

**Symptoms**:
- Ingestion API returns errors
- Fewer documents in database than expected
- Ingestion process hangs or times out

**Solutions**:
1. **File format issues**:
   - Verify documents are in supported formats (MDX, Markdown)
   - Check for malformed content

2. **Large files**:
   - Break large documents into smaller chunks
   - Increase timeout settings if needed

3. **File permissions**:
   - Ensure the application has read access to docs directory
   - Check disk space availability

## Error Handling

### Common Error Messages

#### "Qdrant is not connected"
**Cause**: The application cannot establish a connection to Qdrant.
**Solution**: Follow the connection troubleshooting steps above.

#### "Failed to connect to Qdrant"
**Cause**: Network or configuration issue preventing connection.
**Solution**: Verify network connectivity and configuration settings.

#### "No relevant information found"
**Cause**: Search didn't return results above the relevance threshold.
**Solution**: Try different search terms or adjust the score threshold.

### Debugging Steps

1. **Check logs**:
   ```bash
   # Application logs
   tail -f logs/app.log
   
   # Qdrant logs (if running locally)
   docker logs qdrant
   ```

2. **Verify environment**:
   ```bash
   # Check if environment variables are set
   echo $QDRANT_HOST
   echo $QDRANT_PORT
   ```

3. **Test individual components**:
   - Test Qdrant connection independently
   - Verify AI service API keys
   - Check document parsing separately

## Testing and Validation

### Quick Health Check
Run these commands to verify system health:

```bash
# Check status
curl -X GET http://your-api-url/api/v1/rag/status

# Test search
curl -X POST http://your-api-url/api/v1/rag/search \
  -H "Content-Type: application/json" \
  -d '{"query": "test", "top_k": 1}'

# Test answer generation
curl -X POST http://your-api-url/api/v1/rag/answer \
  -H "Content-Type: application/json" \
  -d '{"query": "What is Physical AI?", "top_k": 1}'
```

### Validation Checklist
- [ ] Qdrant connection is active
- [ ] Environment variables are correctly set
- [ ] Documents are properly ingested
- [ ] Search returns relevant results
- [ ] Answer generation works correctly
- [ ] Error handling is functioning
- [ ] Performance meets requirements

## When to Escalate
Contact the development team if:
- Basic troubleshooting steps don't resolve the issue
- There are issues with the core architecture or design
- Performance problems persist after optimization attempts
- Security-related issues are discovered