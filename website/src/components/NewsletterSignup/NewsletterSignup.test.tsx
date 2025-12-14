import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterSignup from './NewsletterSignup';

// Mock the fetch API
global.fetch = jest.fn();

describe('NewsletterSignup Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders newsletter signup form elements', () => {
    render(<NewsletterSignup />);

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    expect(screen.getByText(/subscribe to our newsletter/i)).toBeInTheDocument();
  });

  it('validates email input', async () => {
    render(<NewsletterSignup />);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(subscribeButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid email', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<NewsletterSignup />);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            email: 'test@example.com',
          }),
        })
      );
    });
  });

  it('shows success message after successful subscription', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<NewsletterSignup />);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you for subscribing!/i)).toBeInTheDocument();
    });
  });
});