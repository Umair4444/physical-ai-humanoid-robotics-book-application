import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatbotProvider } from '@site/src/contexts/ChatbotContext';
import ChatbotComponent from './ChatbotComponent';

// Mock the ChatService
jest.mock('@site/src/services/ChatService', () => ({
  ChatService: {
    sendMessage: jest.fn(() => 
      Promise.resolve({
        id: 'response-1',
        response: 'This is a response',
        sources: ['source1'],
        timestamp: new Date(),
        sessionId: 'test-session',
      })
    ),
    initializeSession: jest.fn(() => Promise.resolve('test-session')),
  },
}));

describe('ChatbotComponent', () => {
  const renderWithProvider = () => {
    return render(
      <ChatbotProvider>
        <ChatbotComponent />
      </ChatbotProvider>
    );
  };

  it('renders the chatbot interface', () => {
    renderWithProvider();

    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask about the textbook...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('allows user to enter a message and send it', async () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText('Ask about the textbook...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  it('shows loading indicator when waiting for response', async () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText('Ask about the textbook...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    // Check for loading indicator
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the response to be displayed
    await waitFor(() => {
      expect(screen.getByText('This is a response')).toBeInTheDocument();
    });
  });

  it('clears the input after sending a message', async () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText('Ask about the textbook...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
});