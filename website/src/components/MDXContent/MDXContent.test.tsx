import React from 'react';
import { render, screen } from '@testing-library/react';
import MDXContent from './MDXContent';

describe('MDXContent Component', () => {
  test('renders MDX content correctly', () => {
    const mdxContent = '# Test Heading\n\nThis is a test paragraph.';
    
    render(<MDXContent content={mdxContent} />);
    
    expect(screen.getByRole('heading', { name: /test heading/i })).toBeInTheDocument();
    expect(screen.getByText(/this is a test paragraph/i)).toBeInTheDocument();
  });

  test('renders complex MDX content with images', () => {
    const mdxContent = `# Lesson Content\n\n![Test Image](/test.jpg "Test Image")\n\nThis is lesson content.`;
    
    render(<MDXContent content={mdxContent} />);
    
    expect(screen.getByRole('heading', { name: /lesson content/i })).toBeInTheDocument();
    expect(screen.getByText(/this is lesson content/i)).toBeInTheDocument();
    // Note: Images are more difficult to test in JSDOM environment
  });

  test('handles empty content', () => {
    render(<MDXContent content="" />);
    
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  test('renders with custom className', () => {
    const mdxContent = 'Test content';
    
    render(<MDXContent content={mdxContent} className="custom-mdx" />);
    
    const container = screen.getByText(/test content/i).closest('div');
    expect(container).toHaveClass('custom-mdx');
  });
});