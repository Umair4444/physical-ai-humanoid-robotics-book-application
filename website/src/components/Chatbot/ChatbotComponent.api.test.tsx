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
        response: 'This is a response from the API',
        sources: ['source1', 'source2'],
        timestamp: new Date(),
        sessionId: 'test-session',
      })
    ),
    initializeSession: jest.fn(() => Promise.resolve('test-session')),
  },
}));

describe('ChatbotComponent API Integration', () => {
  const renderWithProvider = () => {
    return render(
      <ChatbotProvider>
        <ChatbotComponent />
      </ChatbotProvider>
    );
  };

  it('should call ChatService.sendMessage when submitting a message', async () => {
    const { ChatService } = require('@site/src/services/ChatService');
    
    renderWithProvider();

    const input = screen.getByPlaceholderText('Ask about the textbook...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test API integration query' } });
    fireEvent.click(sendButton);

    // Wait for the API call to happen
    await waitFor(() => {
      expect(ChatService.sendMessage).toHaveBeenCalledWith(
        'Test API integration query',
        'test-session',
        ''
      );
    });
  });

  it('should display the response from the API', async () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText('Ask about the textbook...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'What is AI robotics?' } });
    fireEvent.click(sendButton);

    // Wait for the API response to be displayed
    await waitFor(() => {
      expect(screen.getByText('This is a response from the API')).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    // Mock an API error
    const { ChatService } = require('@site/src/services/ChatService');
    ChatService.sendMessage.mockRejectedValueOnce(new Error('API Error'));

    renderWithProvider();

    const input = screen.getByPlaceholderText('Ask about the textbook...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'This will cause an error' } });
    fireEvent.click(sendButton);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Sorry, I encountered an error. Please try again.')).toBeInTheDocument();
    });
  });

  it('should pass context to the API when available', async () => {
    const { ChatService } = require('@site/src/services/ChatService');
    
    renderWithProvider();

    // For now, just test that the API is called with an empty context
    // In a real implementation, context would be passed based on current page
    const input = screen.getByPlaceholderText('Ask about the textbook...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Context test' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(ChatService.sendMessage).toHaveBeenCalledWith(
        'Context test',
        'test-session',
        ''
      );
    });
  });
});