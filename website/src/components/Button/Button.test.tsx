import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-ai-primary');
    expect(button).not.toHaveAttribute('disabled');
  });

  test('renders different variants', () => {
    render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </>
    );

    expect(screen.getByRole('button', { name: /primary/i })).toHaveClass('bg-ai-primary');
    expect(screen.getByRole('button', { name: /secondary/i })).toHaveClass('bg-gray-500');
    expect(screen.getByRole('button', { name: /outline/i })).toHaveClass('border-2', 'border-ai-primary');
    expect(screen.getByRole('button', { name: /ghost/i })).toHaveClass('bg-transparent');
  });

  test('renders different sizes', () => {
    render(
      <>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </>
    );

    expect(screen.getByRole('button', { name: /small/i })).toHaveClass('text-sm', 'py-1', 'px-2');
    expect(screen.getByRole('button', { name: /medium/i })).toHaveClass('text-base', 'py-2', 'px-4');
    expect(screen.getByRole('button', { name: /large/i })).toHaveClass('text-lg', 'py-3', 'px-6');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled button</Button>);
    
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  test('shows loading state', () => {
    render(<Button loading>Loading button</Button>);
    
    const button = screen.getByRole('button', { name: /loading button/i });
    expect(button).toBeDisabled();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<Button className="custom-class">Custom button</Button>);
    
    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });
});