import { ChatService } from './ChatService';

// Mock the fetch API
global.fetch = jest.fn();

describe('ChatService', () => {
  const mockQuery = 'Test query';
  const mockSessionId = 'test-session-id';
  const mockResponse = {
    id: 'response-1',
    response: 'This is a test response',
    sources: ['source1', 'source2'],
    timestamp: new Date(),
    sessionId: mockSessionId,
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should send a query to the chat API', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await ChatService.sendMessage(mockQuery, mockSessionId);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          query: mockQuery,
          context: '',
          sessionId: mockSessionId,
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle API errors gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    await expect(ChatService.sendMessage(mockQuery, mockSessionId)).rejects.toThrow(
      'Failed to get chat response: 500'
    );
  });

  it('should handle network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(ChatService.sendMessage(mockQuery, mockSessionId)).rejects.toThrow(
      'Network error'
    );
  });

  it('should send query with context when provided', async () => {
    const context = 'This is the context';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    await ChatService.sendMessage(mockQuery, mockSessionId, context);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({
          query: mockQuery,
          context: context,
          sessionId: mockSessionId,
        }),
      })
    );
  });
});