import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatMessage from './ChatMessage';

describe('ChatMessage Component', () => {
  const mockMessage = {
    id: 'test-id',
    role: 'assistant' as const,
    content: 'This is a test message',
    timestamp: new Date(),
    sources: ['source1', 'source2'],
  };

  it('renders user message correctly', () => {
    render(
      <ChatMessage
        message={{
          ...mockMessage,
          role: 'user',
        }}
      />
    );

    expect(screen.getByText('This is a test message')).toBeInTheDocument();
    expect(screen.getByTestId('user-message')).toBeInTheDocument();
  });

  it('renders assistant message correctly', () => {
    render(<ChatMessage message={mockMessage} />);
    
    expect(screen.getByText('This is a test message')).toBeInTheDocument();
    expect(screen.getByTestId('assistant-message')).toBeInTheDocument();
  });

  it('displays sources when available', () => {
    render(<ChatMessage message={mockMessage} />);
    
    expect(screen.getByText('Sources:')).toBeInTheDocument();
    expect(screen.getByText('source1')).toBeInTheDocument();
    expect(screen.getByText('source2')).toBeInTheDocument();
  });

  it('formats timestamp correctly', () => {
    const timestamp = new Date(2023, 0, 1, 10, 30, 0); // Jan 1, 2023, 10:30 AM
    render(
      <ChatMessage
        message={{
          ...mockMessage,
          timestamp,
        }}
      />
    );

    // Check if the formatted time is displayed
    const timeElement = screen.getByText('10:30 AM');
    expect(timeElement).toBeInTheDocument();
  });

  it('renders without sources when not provided', () => {
    render(
      <ChatMessage
        message={{
          ...mockMessage,
          sources: undefined,
        }}
      />
    );

    expect(screen.queryByText('Sources:')).not.toBeInTheDocument();
  });
});