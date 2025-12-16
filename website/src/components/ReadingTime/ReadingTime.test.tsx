import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReadingTime } from './ReadingTime';

describe('ReadingTime Component', () => {
  test('calculates reading time for short text', () => {
    const text = 'This is a short text.';
    render(<ReadingTime text={text} />);
    
    expect(screen.getByText(/1 min read/i)).toBeInTheDocument();
  });

  test('calculates reading time for longer text', () => {
    const longText = 'This is a much longer text that should take more time to read. '.repeat(20);
    render(<ReadingTime text={longText} />);
    
    expect(screen.getByText(/\d+ min read/i)).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    const text = 'Sample text';
    render(<ReadingTime text={text} className="custom-class" />);
    
    expect(screen.getByText(/\d+ min read/i)).toHaveClass('custom-class');
  });

  test('shows custom label when provided', () => {
    const text = 'Sample text';
    render(<ReadingTime text={text} label="Reading time" />);
    
    expect(screen.getByText(/reading time/i)).toBeInTheDocument();
  });

  test('returns 1 minute for empty text', () => {
    render(<ReadingTime text="" />);
    
    expect(screen.getByText(/1 min read/i)).toBeInTheDocument();
  });
});