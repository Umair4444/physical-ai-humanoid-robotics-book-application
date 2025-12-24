# Qdrant Vector Database Integration

This document explains how the Qdrant vector database is integrated into the Physical AI Humanoid Robotics textbook application.

## Overview

Qdrant is used as the vector database for storing and retrieving textbook knowledge embeddings. This enables semantic search capabilities, allowing the AI to find relevant content from the textbook based on user queries.

## Architecture

The integration follows this architecture:
1. Textbook content is converted to vector embeddings using sentence transformers
2. Embeddings are stored in Qdrant collections
3. When a user asks a question, it's converted to an embedding
4. Qdrant performs a similarity search to find relevant textbook content
5. Relevant content is included in the AI prompt to provide context

## Configuration

The Qdrant integration is configured through environment variables in your `.env` file:

```env
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_HTTPS=false
# QDRANT_API_KEY=your-qdrant-api-key-here (optional, for cloud deployments)
QDRANT_COLLECTION_NAME=textbook_knowledge
```

## Implementation Details

### Qdrant Service (`src/vector_db/qdrant_service.py`)

The `QdrantService` class provides methods for:
- Initializing the Qdrant client connection
- Generating text embeddings using Sentence Transformers
- Adding texts to the vector database
- Performing similarity searches
- Managing collections

### Chat Service Integration

The `ChatService` class has been updated to:
- Initialize a `QdrantService` instance
- Use `_retrieve_knowledge()` method to fetch relevant content
- Include retrieved knowledge in the AI prompt when using specialized textbook knowledge mode

## Setting Up Qdrant

### Option 1: Local Qdrant (Docker)

1. Install Docker if not already installed
2. Run Qdrant in a container:
```bash
docker run -p 6333:6333 -p 6334:6334 \
    -e QDRANT__SERVICE__API_KEY=your-secret-api-key \
    --name qdrant \
    qdrant/qdrant
```

### Option 2: Qdrant Cloud

1. Sign up at [qdrant.tech](https://qdrant.tech)
2. Create a new cluster
3. Get your cluster URL and API key
4. Update your environment variables:
```env
QDRANT_HOST=your-cluster-url.qdrant.tech
QDRANT_PORT=6333
QDRANT_HTTPS=true
QDRANT_API_KEY=your-api-key-here
```

## Populating the Database

Use the `populate_qdrant.py` script to add initial content:

```bash
cd ai-textbook-backend
python populate_qdrant.py
```

## Testing the Integration

Run the test script to verify the Qdrant integration:

```bash
cd ai-textbook-backend
python test_qdrant.py
```

## Dependencies

The following packages are required for Qdrant integration:
- `qdrant-client` - Python client for Qdrant
- `sentence-transformers` - For generating text embeddings

These are included in `requirements.txt`.

## Troubleshooting

### Common Issues

1. **Connection Refused**: Verify that Qdrant is running and accessible at the configured host/port
2. **API Key Issues**: Ensure the API key is correct when using Qdrant Cloud
3. **Embedding Model Issues**: The service uses `all-MiniLM-L6-v2` model which is downloaded automatically on first use

### Verifying the Connection

Check if the Qdrant service is working:
```python
from src.vector_db.qdrant_service import QdrantService

service = QdrantService()
info = service.get_collection_info()
print(info)
```