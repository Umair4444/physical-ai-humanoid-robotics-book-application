import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  test('renders card with content', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    );

    expect(screen.getByText(/card content/i)).toBeInTheDocument();
  });

  test('renders card with header, body, and footer', () => {
    render(
      <Card>
        <Card.Header>Card Header</Card.Header>
        <Card.Body>Card Body Content</Card.Body>
        <Card.Footer>Card Footer</Card.Footer>
      </Card>
    );

    expect(screen.getByText(/card header/i)).toBeInTheDocument();
    expect(screen.getByText(/card body content/i)).toBeInTheDocument();
    expect(screen.getByText(/card footer/i)).toBeInTheDocument();
  });

  test('renders with default styling', () => {
    render(<Card>Card content</Card>);

    const card = screen.getByText(/card content/i).closest('div');
    expect(card).toHaveClass('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-md');
  });

  test('renders with custom className', () => {
    render(<Card className="custom-class">Card content</Card>);

    const card = screen.getByText(/card content/i).closest('div');
    expect(card).toHaveClass('custom-class');
  });

  test('renders responsive design', () => {
    render(<Card responsive={true}>Responsive card content</Card>);

    const card = screen.getByText(/responsive card content/i).closest('div');
    expect(card).toHaveClass('w-full', 'max-w-full');
  });

  test('applies padding correctly', () => {
    render(<Card padding="large">Card with large padding</Card>);

    const card = screen.getByText(/card with large padding/i).closest('div');
    expect(card).toHaveClass('p-6');
  });
});