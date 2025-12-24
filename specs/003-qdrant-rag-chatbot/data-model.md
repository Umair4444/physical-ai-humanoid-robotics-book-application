# Data Model: Qdrant RAG Chatbot

## Entities

### Document
- **id**: string (UUID) - Unique identifier for each document chunk
- **content**: string - The text content of the document chunk
- **embedding**: float array [384] - Vector embedding of the content
- **metadata**: object
  - source_file: string - Original file path in docs directory
  - section: string - Chapter/section identifier
  - page_number: number - Page number if applicable
  - title: string - Title of the section
  - created_at: datetime - When the embedding was created
  - updated_at: datetime - When the embedding was last updated

### Query
- **id**: string (UUID) - Unique identifier for the query
- **content**: string - The user's original query
- **embedding**: float array [384] - Vector embedding of the query
- **created_at**: datetime - When the query was made

### SearchResult
- **query_id**: string - Reference to the original query
- **document_id**: string - Reference to the matched document
- **score**: float - Relevance score (0.0 to 1.0)
- **matched_content**: string - The relevant text snippet
- **metadata**: object - Document metadata at time of search

### Response
- **id**: string (UUID) - Unique identifier for the response
- **query_id**: string - Reference to the original query
- **content**: string - The AI-generated response
- **source_documents**: array of strings - IDs of documents used to generate the response
- **confidence_score**: float - Confidence level of the response (0.0 to 1.0)
- **created_at**: datetime - When the response was generated

## Relationships

1. One Query → Many SearchResults (via query_id)
2. One Document → Many SearchResults (via document_id)
3. One Query → One Response (via query_id)
4. One Response → Many Documents (via source_documents array)

## Validation Rules

1. **Document**:
   - content must not be empty
   - embedding must be exactly 384 dimensions
   - source_file must exist in docs directory
   - created_at must be in the past

2. **Query**:
   - content must not be empty
   - content must be less than 1000 characters
   - created_at must be in the past

3. **SearchResult**:
   - score must be between 0.0 and 1.0
   - matched_content must not be empty

4. **Response**:
   - content must not be empty
   - confidence_score must be between 0.0 and 1.0
   - created_at must be in the past