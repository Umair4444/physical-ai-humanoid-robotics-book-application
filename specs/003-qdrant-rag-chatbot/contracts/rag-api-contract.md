# API Contract: Qdrant RAG Chatbot

## Overview
This document defines the API contract for the RAG (Retrieval-Augmented Generation) functionality that allows the chatbot to answer questions based on textbook content.

## Endpoints

### POST /api/v1/rag/search
Perform semantic search on the textbook content to find relevant information for a query.

#### Request
```json
{
  "query": "string",
  "top_k": "integer (optional, default: 5)",
  "filters": {
    "source_file": "string (optional)",
    "section": "string (optional)"
  }
}
```

#### Response
```json
{
  "query_id": "string",
  "results": [
    {
      "document_id": "string",
      "score": "float",
      "content": "string",
      "metadata": {
        "source_file": "string",
        "section": "string",
        "title": "string"
      }
    }
  ],
  "search_time": "float (seconds)"
}
```

#### Error Responses
- 400: Invalid request format
- 500: Internal server error (e.g., Qdrant connection failure)

### POST /api/v1/rag/answer
Generate an answer to a user's question based on the textbook content.

#### Request
```json
{
  "query": "string",
  "top_k": "integer (optional, default: 3)",
  "include_sources": "boolean (optional, default: true)"
}
```

#### Response
```json
{
  "response_id": "string",
  "query": "string",
  "answer": "string",
  "confidence_score": "float",
  "sources": [
    {
      "document_id": "string",
      "content": "string",
      "score": "float",
      "metadata": {
        "source_file": "string",
        "section": "string"
      }
    }
  ],
  "processing_time": "float (seconds)"
}
```

#### Error Responses
- 400: Invalid request format
- 500: Internal server error (e.g., Qdrant connection failure, AI service failure)

### POST /api/v1/rag/ingest
Ingest documents from the docs directory into the vector database.

#### Request
```json
{
  "source_directory": "string (optional, default: 'docs')",
  "reprocess_all": "boolean (optional, default: false)",
  "chunk_size": "integer (optional, default: 512)"
}
```

#### Response
```json
{
  "ingestion_id": "string",
  "documents_processed": "integer",
  "chunks_created": "integer",
  "processing_time": "float (seconds)",
  "status": "string ('completed' | 'failed' | 'partial')"
}
```

#### Error Responses
- 400: Invalid request format
- 500: Internal server error (e.g., document processing failure)

### GET /api/v1/rag/status
Check the status of the RAG system and vector database connection.

#### Response
```json
{
  "status": "string ('healthy' | 'degraded' | 'unavailable')",
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

## Error Format
All error responses follow this format:
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

## Authentication
All endpoints require authentication using the same mechanism as the existing chatbot API (likely API key in header).

## Rate Limiting
All endpoints are subject to the same rate limiting as the existing API (e.g., 100 requests per hour per API key).