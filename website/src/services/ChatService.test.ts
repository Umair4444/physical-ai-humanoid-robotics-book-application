import { ChatService } from './ChatService';

// Mock the APIService
jest.mock('./APIService', () => {
  const mockPost = jest.fn();
  return {
    apiService: {
      post: mockPost,
    },
    APIService: jest.fn(() => ({
      post: mockPost,
    })),
  };
});

// Import the mocked APIService
import { apiService } from './APIService';

describe('ChatService', () => {
  const mockQuery = 'Test query';
  const mockSessionId = 'test-session-id';
  const mockBackendResponse = {
    response: 'This is a test response',
    metadata: {
      sources: ['source1', 'source2'],
      confidence: 0.95,
      processing_time: 0.5,
      tool_calls: []
    },
    suggestions: ['Suggestion 1', 'Suggestion 2']
  };

  const mockFrontendResponse = {
    id: 'response-1',
    response: 'This is a test response',
    sources: ['source1', 'source2'],
    timestamp: new Date(),
    sessionId: mockSessionId,
  };

  beforeEach(() => {
    (apiService.post as jest.Mock).mockClear();
  });

  it('should send a query to the chat API', async () => {
    (apiService.post as jest.Mock).mockResolvedValue(mockBackendResponse);

    const result = await ChatService.sendMessage(mockQuery, mockSessionId);

    expect(apiService.post).toHaveBeenCalledWith('/api/v1/chat', {
      message: mockQuery,
      context: undefined
    });

    expect(result.response).toEqual(mockBackendResponse.response);
    expect(result.sources).toEqual(mockBackendResponse.metadata.sources);
    expect(result.sessionId).toEqual(mockSessionId);
  });

  it('should handle API errors gracefully', async () => {
    const error = new Error('API Error');
    (apiService.post as jest.Mock).mockRejectedValue(error);

    await expect(ChatService.sendMessage(mockQuery, mockSessionId)).rejects.toThrow(
      'API Error'
    );
  });

  it('should handle network errors', async () => {
    const error = new Error('Network error');
    (apiService.post as jest.Mock).mockRejectedValue(error);

    await expect(ChatService.sendMessage(mockQuery, mockSessionId)).rejects.toThrow(
      'Network error'
    );
  });

  it('should send query with context when provided', async () => {
    const context = 'This is the context\nAnother context line';
    (apiService.post as jest.Mock).mockResolvedValue(mockBackendResponse);

    await ChatService.sendMessage(mockQuery, mockSessionId, context);

    expect(apiService.post).toHaveBeenCalledWith('/api/v1/chat', {
      message: mockQuery,
      context: {
        conversation_id: mockSessionId,
        previous_messages: [
          { sender: 'user', content: 'This is the context' },
          { sender: 'user', content: 'Another context line' }
        ]
      }
    });
  });
});