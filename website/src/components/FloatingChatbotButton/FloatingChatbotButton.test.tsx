import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FloatingChatbotButton from './FloatingChatbotButton';
import { ChatbotProvider } from '@site/src/contexts/ChatbotContext';

// Mock the ChatService
jest.mock('@site/src/services/ChatService', () => ({
  ChatService: {
    initializeSession: jest.fn(() => Promise.resolve('session-123')),
    sendMessage: jest.fn((query: string) =>
      Promise.resolve({
        id: 'response-1',
        response: `Mock response to: ${query}`,
        sources: ['source1', 'source2'],
        timestamp: new Date(),
        sessionId: 'session-123'
      })
    )
  }
}));

// Mock useChatbot hook
const mockMessages = [];
const mockSendMessage = jest.fn();
const mockSetIsTyping = jest.fn();
const mockUseChatbot = jest.fn();

jest.mock('@site/src/contexts/ChatbotContext', () => {
  const actual = jest.requireActual('@site/src/contexts/ChatbotContext');
  return {
    ...actual,
    useChatbot: () => mockUseChatbot()
  };
});

describe('FloatingChatbotButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseChatbot.mockReturnValue({
      messages: mockMessages,
      sendMessage: mockSendMessage,
      isTyping: false,
      setIsTyping: mockSetIsTyping
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the floating chat button initially', () => {
    render(
      <ChatbotProvider>
        <FloatingChatbotButton />
      </ChatbotProvider>
    );

    const chatButton = screen.getByLabelText(/Open AI Assistant chat/i);
    expect(chatButton).toBeInTheDocument();
    expect(chatButton.tagName).toBe('BUTTON');
  });

  it('opens the chat when the floating button is clicked', () => {
    render(
      <ChatbotProvider>
        <FloatingChatbotButton />
      </ChatbotProvider>
    );

    // Initially, the button should be visible
    const chatButton = screen.getByLabelText(/Open AI Assistant chat/i);
    expect(chatButton).toBeInTheDocument();

    // Click the floating button to open chat
    fireEvent.click(chatButton);

    // The chat component should now be visible
    const chatHeader = screen.getByText(/AI Assistant/i);
    expect(chatHeader).toBeInTheDocument();
  });

  it('closes the chat when the close button is clicked', () => {
    render(
      <ChatbotProvider>
        <FloatingChatbotButton />
      </ChatbotProvider>
    );

    // Open the chat first
    const openButton = screen.getByLabelText(/Open AI Assistant chat/i);
    fireEvent.click(openButton);

    // The chat should now be open
    const chatHeader = screen.getByText(/AI Assistant/i);
    expect(chatHeader).toBeInTheDocument();

    // Find and click the close button
    const closeButton = screen.getByLabelText(/Close chat/i);
    fireEvent.click(closeButton);

    // The chat should now be closed, and the floating button should be visible again
    expect(closeButton).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Open AI Assistant chat/i)).toBeInTheDocument();
  });
});