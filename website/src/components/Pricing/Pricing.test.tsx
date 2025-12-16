import React from 'react';
import { render, screen } from '@testing-library/react';
import Pricing from './Pricing';

describe('Pricing Component', () => {
  it('renders all pricing tiers', () => {
    render(<Pricing />);

    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('shows correct pricing information', () => {
    render(<Pricing />);

    expect(screen.getByText(/\$29/)).toBeInTheDocument();
    expect(screen.getByText(/\$59/)).toBeInTheDocument();
    expect(screen.getByText(/\$99/)).toBeInTheDocument();
  });

  it('displays features for each tier', () => {
    render(<Pricing />);

    expect(screen.getByText(/Full textbook access/i)).toBeInTheDocument();
    expect(screen.getByText(/AI chatbot support/i)).toBeInTheDocument();
    expect(screen.getByText(/Certification exam/i)).toBeInTheDocument();
  });
});