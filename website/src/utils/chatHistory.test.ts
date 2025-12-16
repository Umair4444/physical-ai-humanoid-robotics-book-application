import { loadChatHistory, saveChatHistory, clearChatHistory } from '../utils/chatHistory';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    getStore: () => store, // For testing purposes
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Chat History Utils', () => {
  const testMessages = [
    {
      id: 'msg1',
      role: 'user' as const,
      content: 'Hello',
      timestamp: new Date('2023-01-01T10:00:00'),
    },
    {
      id: 'msg2',
      role: 'assistant' as const,
      content: 'Hi there!',
      timestamp: new Date('2023-01-01T10:01:00'),
    },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it('should save chat history to localStorage', () => {
    saveChatHistory(testMessages);

    const saved = localStorage.getItem('chatbot-history');
    expect(saved).not.toBeNull();

    const parsed = JSON.parse(saved!);
    expect(parsed).toHaveLength(2);
    expect(parsed[0]).toEqual({
      id: 'msg1',
      role: 'user',
      content: 'Hello',
      timestamp: testMessages[0].timestamp.toISOString(),
    });
  });

  it('should load chat history from localStorage', () => {
    const messagesToSave = testMessages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    
    localStorage.setItem('chatbot-history', JSON.stringify(messagesToSave));

    const loaded = loadChatHistory();
    expect(loaded).toHaveLength(2);
    expect(loaded[0].id).toBe('msg1');
    expect(loaded[0].content).toBe('Hello');
    
    // Check that timestamps are converted back to Date objects
    expect(loaded[0].timestamp).toBeInstanceOf(Date);
    expect(loaded[0].timestamp.toISOString()).toBe(testMessages[0].timestamp.toISOString());
  });

  it('should return empty array when no history exists', () => {
    const loaded = loadChatHistory();
    expect(loaded).toHaveLength(0);
  });

  it('should clear chat history from localStorage', () => {
    saveChatHistory(testMessages);
    expect(localStorage.getItem('chatbot-history')).not.toBeNull();

    clearChatHistory();
    expect(localStorage.getItem('chatbot-history')).toBeNull();
  });

  it('should handle invalid JSON gracefully when loading', () => {
    localStorage.setItem('chatbot-history', 'invalid JSON');

    const loaded = loadChatHistory();
    expect(loaded).toHaveLength(0);
  });
});