import React from 'react';
import { render, screen } from '@testing-library/react';
import BooksPage from './books';

describe('BooksPage', () => {
  it('renders the books page correctly', () => {
    render(<BooksPage />);

    expect(screen.getByText('AI Robotics Textbook Library')).toBeInTheDocument();
    expect(screen.getByText('All Books')).toBeInTheDocument();
    expect(screen.getByText('Introduction to AI Robotics')).toBeInTheDocument();
    expect(screen.getByText('Humanoid Design Principles')).toBeInTheDocument();
  });

  it('renders filtering controls', () => {
    render(<BooksPage />);

    expect(screen.getByRole('combobox')).toBeInTheDocument(); // The select element
    expect(screen.getByRole('button', { name: /Featured/i })).toBeInTheDocument();
  });
});