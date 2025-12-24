# Quickstart Guide: Qdrant RAG Chatbot

## Overview
This guide will help you set up and run the Qdrant RAG (Retrieval-Augmented Generation) chatbot that answers questions based on textbook content.

## Prerequisites
- Python 3.8+
- Docker (for running Qdrant locally)
- Access to the textbook content in the `docs` directory

## Setup

### 1. Install Dependencies
```bash
cd ai-textbook-backend
pip install -r requirements.txt
```

### 2. Set Up Qdrant
You have two options:

#### Option A: Run Qdrant Locally with Docker
```bash
docker run -p 6333:6333 -p 6334:6334 \
    -e QDRANT__SERVICE__API_KEY=your-secret-api-key \
    --name qdrant \
    qdrant/qdrant
```

#### Option B: Use Qdrant Cloud
1. Sign up at [qdrant.tech](https://qdrant.tech)
2. Create a new cluster
3. Get your cluster URL and API key

### 3. Configure Environment Variables
Create a `.env` file in the `ai-textbook-backend` directory:

```env
# API Keys
GEMINI_API_KEY=your-gemini-api-key-here
# OPENAI_API_KEY=your-openai-api-key-here

# Qdrant Configuration
QDRANT_HOST=localhost          # or your Qdrant cloud URL
QDRANT_PORT=6333              # or 6334 for HTTPS
QDRANT_HTTPS=false            # or true for cloud
QDRANT_API_KEY=your-api-key   # if using cloud or secured instance
QDRANT_COLLECTION_NAME=textbook_knowledge
```

### 4. Run the Application
```bash
cd ai-textbook-backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

## Ingest Textbook Content

### 1. Verify Your Documents
Ensure your textbook content is in the `docs` directory in Markdown format.

### 2. Run the Ingestion Script
```bash
cd ai-textbook-backend
python populate_qdrant.py
```

This script will:
- Read documents from the `docs` directory
- Convert them to text
- Generate embeddings using the sentence transformer model
- Store them in Qdrant with appropriate metadata

## Using the RAG Chatbot

### 1. API Usage
The RAG functionality is available through the following endpoints:

#### Search for relevant content:
```bash
curl -X POST http://localhost:8000/api/v1/rag/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is Physical AI?",
    "top_k": 3
  }'
```

#### Get a RAG-enhanced answer:
```bash
curl -X POST http://localhost:8000/api/v1/rag/answer \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain the principles of humanoid locomotion",
    "top_k": 3
  }'
```

### 2. Integration with Existing Chat
The existing chat endpoint (`/api/v1/chat`) has been enhanced to use RAG when the `use_specialized_knowledge` flag is true (which is the default).

## Development

### Running Tests
```bash
cd ai-textbook-backend
python -m pytest tests/
```

### Adding New Documents
To add new textbook content:
1. Place your Markdown files in the appropriate location in the `docs` directory
2. Run the ingestion script again or call the ingestion API endpoint

### Troubleshooting
- If Qdrant is not connecting, verify your environment variables
- If embeddings are not generating, check that the sentence-transformers model downloads successfully
- If search results are not relevant, consider fine-tuning the embedding model or adjusting the chunking strategy