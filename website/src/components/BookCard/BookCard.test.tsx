import React from 'react';
import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';

const mockBook = {
  id: 'book-1',
  title: 'Introduction to AI Robotics',
  description: 'Learn the fundamentals of artificial intelligence in robotics applications',
  coverImage: '/img/book-cover.jpg',
  rating: 4.8,
  price: 29.99,
};

describe('BookCard Component', () => {
  it('renders book information correctly', () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(mockBook.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockBook.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockBook.rating.toString())).toBeInTheDocument();
  });

  it('renders the book cover image', () => {
    render(<BookCard book={mockBook} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockBook.coverImage);
    expect(image).toHaveAttribute('alt', mockBook.title);
  });

  it('displays star ratings', () => {
    render(<BookCard book={mockBook} />);

    // Check for rating display
    expect(screen.getByText(mockBook.rating.toString())).toBeInTheDocument();
  });
});