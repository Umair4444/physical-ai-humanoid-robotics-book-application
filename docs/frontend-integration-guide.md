# Frontend Integration Guide: Qdrant RAG Chatbot

## Overview
This document explains how to integrate the frontend with the new RAG (Retrieval-Augmented Generation) functionality that enables the chatbot to answer questions based on textbook content.

## New API Endpoints

### 1. Document Search
**Endpoint**: `POST /api/v1/rag/search`
**Purpose**: Perform semantic search on textbook content

Request:
```json
{
  "query": "string",
  "top_k": "integer (optional, default: 5)",
  "filters": {
    "source_file": "string (optional)",
    "section": "string (optional)"
  },
  "score_threshold": "float (optional)",
  "group_by": "string (optional)"
}
```

Response:
```json
{
  "query_id": "string",
  "results": [
    {
      "id": "string",
      "text": "string",
      "metadata": {
        "source_file": "string",
        "section": "string",
        "title": "string"
      },
      "score": "float"
    }
  ],
  "search_time": "float"
}
```

### 2. RAG Answer Generation
**Endpoint**: `POST /api/v1/rag/answer`
**Purpose**: Generate answers based on textbook content

Request:
```json
{
  "query": "string",
  "top_k": "integer (optional, default: 3)",
  "include_sources": "boolean (optional, default: true)"
}
```

Response:
```json
{
  "response_id": "string",
  "query": "string",
  "answer": "string",
  "confidence_score": "float",
  "sources": [
    {
      "id": "string",
      "text": "string",
      "score": "float",
      "metadata": {
        "source_file": "string",
        "section": "string"
      }
    }
  ],
  "processing_time": "float"
}
```

### 3. Document Ingestion
**Endpoint**: `POST /api/v1/rag/ingest`
**Purpose**: Ingest documents from the docs directory

Request:
```json
{
  "source_directory": "string (optional, default: 'docs')",
  "reprocess_all": "boolean (optional, default: false)",
  "chunk_size": "integer (optional, default: 512)"
}
```

Response:
```json
{
  "ingestion_id": "string",
  "documents_processed": "integer",
  "chunks_created": "integer",
  "processing_time": "float",
  "status": "string"
}
```

### 4. System Status
**Endpoint**: `GET /api/v1/rag/status`
**Purpose**: Check RAG system status

Response:
```json
{
  "status": "string",
  "qdrant_connected": "boolean",
  "qdrant_collection_info": {
    "points_count": "integer",
    "vector_size": "integer",
    "distance": "string"
  },
  "last_ingestion_time": "string (ISO 8601 timestamp)",
  "documents_in_system": "integer"
}
```

## Frontend Implementation Guide

### 1. API Service Updates

Update your API service to include the new RAG endpoints:

```javascript
class RAGAPIService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async searchDocuments(query, options = {}) {
    const response = await fetch(`${this.baseURL}/api/v1/rag/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        top_k: options.topK || 5,
        filters: options.filters || {},
        score_threshold: options.scoreThreshold,
        group_by: options.groupBy
      })
    });
    return response.json();
  }

  async getRAGAnswer(query, options = {}) {
    const response = await fetch(`${this.baseURL}/api/v1/rag/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        top_k: options.topK || 3,
        include_sources: options.includeSources !== false
      })
    });
    return response.json();
  }

  async ingestDocuments(options = {}) {
    const response = await fetch(`${this.baseURL}/api/v1/rag/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_directory: options.sourceDirectory || 'docs',
        reprocess_all: options.reprocessAll || false,
        chunk_size: options.chunkSize || 512
      })
    });
    return response.json();
  }

  async getRAGStatus() {
    const response = await fetch(`${this.baseURL}/api/v1/rag/status`);
    return response.json();
  }
}
```

### 2. UI Elements for Source Citations

Display source citations in chat responses:

```jsx
function ChatMessage({ message }) {
  return (
    <div className="chat-message">
      <div className="message-content">{message.content}</div>
      
      {message.sources && message.sources.length > 0 && (
        <div className="sources-section">
          <h4>Sources:</h4>
          <ul className="sources-list">
            {message.sources.map((source, index) => (
              <li key={source.id || index} className="source-item">
                <p>{source.text.substring(0, 100)}...</p>
                <small className="source-meta">
                  {source.metadata?.source_file} | Score: {source.score.toFixed(2)}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### 3. RAG Toggle Implementation

Add a toggle to switch between RAG and general responses:

```jsx
function ChatInterface() {
  const [useRAG, setUseRAG] = useState(true);

  const handleSubmit = async (message) => {
    if (useRAG) {
      // Use RAG endpoint
      const response = await ragAPI.getRAGAnswer(message);
      // Process response with sources
    } else {
      // Use general chat endpoint
      const response = await generalChatAPI.sendMessage(message);
      // Process general response
    }
  };

  return (
    <div>
      <div className="rag-toggle">
        <label>
          <input
            type="checkbox"
            checked={useRAG}
            onChange={(e) => setUseRAG(e.target.checked)}
          />
          Use textbook knowledge (RAG)
        </label>
      </div>
      {/* Chat interface */}
    </div>
  );
}
```

### 4. Loading States for RAG Operations

Show appropriate loading states during RAG operations:

```jsx
function ChatInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [ragStatus, setRagStatus] = useState(null);

  useEffect(() => {
    const checkRAGStatus = async () => {
      try {
        const status = await ragAPI.getRAGStatus();
        setRagStatus(status);
      } catch (error) {
        console.error('Error fetching RAG status:', error);
      }
    };

    checkRAGStatus();
  }, []);

  const handleSubmit = async (message) => {
    setIsLoading(true);
    try {
      const response = await ragAPI.getRAGAnswer(message);
      // Process response
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <div className="loading-indicator">Searching textbook...</div>}
      {ragStatus?.status === 'unavailable' && (
        <div className="status-warning">
          RAG system unavailable. Responses will not include textbook content.
        </div>
      )}
      {/* Chat interface */}
    </div>
  );
}
```

## Testing the Integration

1. Verify that search requests return relevant results
2. Confirm that RAG answers include source citations
3. Test the toggle functionality between RAG and general responses
4. Validate that loading states appear during RAG operations
5. Check error handling when RAG system is unavailable

## Error Handling

Handle common RAG-specific errors:

- 429 (Rate Limit): Implement exponential backoff
- 500 (Server Error): Fallback to general responses
- Connection errors: Display appropriate messages to users