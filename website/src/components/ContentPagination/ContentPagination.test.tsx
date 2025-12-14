import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContentPagination from './ContentPagination';

describe('ContentPagination Component', () => {
  const longContent = 'A'.repeat(3000); // 3000 character content
  const shortContent = 'Short content';

  it('renders without pagination for short content', () => {
    render(<ContentPagination content={shortContent} />);
    
    // Should render content directly without pagination controls
    expect(screen.getByText(shortContent)).toBeInTheDocument();
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('renders with pagination for long content', () => {
    render(<ContentPagination content={longContent} itemsPerPage={1000} />);
    
    // Should render pagination controls
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    
    // Should render first page of content
    expect(screen.getByText(new RegExp(`^${'A'.repeat(1000)}`))).toBeInTheDocument();
  });

  it('navigates to next page', () => {
    render(<ContentPagination content={longContent} itemsPerPage={1000} />);
    
    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);
    
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });

  it('navigates to previous page', () => {
    render(<ContentPagination content={longContent} itemsPerPage={1000} />);
    
    // Go to page 2 first
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    
    // Then go back to page 1
    const prevPageButton = screen.getByText('Previous');
    fireEvent.click(prevPageButton);
    
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('does not allow navigation beyond available pages', () => {
    render(<ContentPagination content={longContent} itemsPerPage={1000} />);
    
    // Click next multiple times (should not go beyond last page)
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next')); // This should be disabled
    
    // Next button should be disabled at the last page
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('calls onPageChange callback when page changes', () => {
    const mockOnPageChange = jest.fn();
    render(
      <ContentPagination 
        content={longContent} 
        itemsPerPage={1000} 
        onPageChange={mockOnPageChange} 
      />
    );
    
    fireEvent.click(screen.getByText('Next'));
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2, 3);
  });
});