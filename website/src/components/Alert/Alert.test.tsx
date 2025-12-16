import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert Component', () => {
  test('renders alert with message', () => {
    render(<Alert message="This is an alert message" />);

    expect(screen.getByText(/this is an alert message/i)).toBeInTheDocument();
  });

  test('renders different types of alerts', () => {
    render(
      <>
        <Alert type="success" message="Success message" />
        <Alert type="error" message="Error message" />
        <Alert type="warning" message="Warning message" />
        <Alert type="info" message="Info message" />
      </>
    );

    expect(screen.getByText(/success message/i)).toHaveClass('bg-green-100');
    expect(screen.getByText(/error message/i)).toHaveClass('bg-red-100');
    expect(screen.getByText(/warning message/i)).toHaveClass('bg-yellow-100');
    expect(screen.getByText(/info message/i)).toHaveClass('bg-blue-100');
  });

  test('renders with close button when dismissible', () => {
    const handleClose = jest.fn();
    render(<Alert message="Dismissible alert" dismissible onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('renders with title', () => {
    render(<Alert title="Alert Title" message="Alert message" />);

    expect(screen.getByText(/alert title/i)).toBeInTheDocument();
    expect(screen.getByText(/alert message/i)).toBeInTheDocument();
  });

  test('renders icon based on type', () => {
    render(<Alert type="success" message="Success with icon" showIcon />);

    const icon = screen.getByRole('img', { hidden: true }); // Hidden because it's decorative
    expect(icon).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    const { queryByText } = render(<Alert message="Test alert" dismissible />);

    const alert = queryByText(/test alert/i);
    expect(alert).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(alert).not.toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<Alert message="Custom alert" className="custom-alert" />);

    expect(screen.getByText(/custom alert/i)).toHaveClass('custom-alert');
  });
});