import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// A component that throws an error
const BrokenComponent: React.FC = () => {
  throw new Error('Test error');
};

// A component that works normally
const WorkingComponent: React.FC = () => <div>Working component</div>;

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Working component')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('renders fallback UI when child component throws an error', () => {
    console.error = jest.fn(); // Suppress console.error during test

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('renders custom fallback component when provided', () => {
    const CustomFallback: React.FC<{ error?: Error }> = ({ error }) => (
      <div data-testid="custom-fallback">Custom fallback: {error?.message}</div>
    );

    console.error = jest.fn(); // Suppress console.error during test

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toHaveTextContent('Custom fallback: Test error');
  });
});