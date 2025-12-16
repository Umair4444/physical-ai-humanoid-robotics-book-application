import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle Component', () => {
  test('renders toggle with default state', () => {
    render(<Toggle checked={false} onChange={jest.fn()} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(toggle).not.toBeChecked();
  });

  test('renders checked state', () => {
    render(<Toggle checked={true} onChange={jest.fn()} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeChecked();
  });

  test('calls onChange when toggled', () => {
    const handleChange = jest.fn();
    render(<Toggle checked={false} onChange={handleChange} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('renders with label', () => {
    render(<Toggle checked={false} onChange={jest.fn()} label="Enable notifications" />);

    expect(screen.getByText(/enable notifications/i)).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Toggle checked={false} onChange={jest.fn()} disabled={true} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
  });

  test('renders different sizes', () => {
    render(
      <>
        <Toggle size="sm" checked={false} onChange={jest.fn()} />
        <Toggle size="md" checked={false} onChange={jest.fn()} />
        <Toggle size="lg" checked={false} onChange={jest.fn()} />
      </>
    );

    const smallToggle = screen.getAllByRole('switch')[0];
    const mediumToggle = screen.getAllByRole('switch')[1];
    const largeToggle = screen.getAllByRole('switch')[2];

    expect(smallToggle).toHaveClass('w-8');
    expect(mediumToggle).toHaveClass('w-10');
    expect(largeToggle).toHaveClass('w-12');
  });

  test('renders with custom className', () => {
    render(<Toggle checked={false} onChange={jest.fn()} className="custom-toggle" />);

    expect(screen.getByRole('switch')).toHaveClass('custom-toggle');
  });
});