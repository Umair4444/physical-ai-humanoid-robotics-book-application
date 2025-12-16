import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Wrap the component with the required context provider
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeToggle Component', () => {
  test('renders theme toggle button with initial state', () => {
    render(
      <Wrapper>
        <ThemeToggle />
      </Wrapper>
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to dark mode'); // Default is light mode
  });

  test('toggles theme when clicked', () => {
    render(
      <Wrapper>
        <ThemeToggle />
      </Wrapper>
    );

    const toggleButton = screen.getByRole('button');
    
    // Initially in light mode
    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to dark mode');
    
    // Click to toggle to dark mode
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  test('has proper accessibility attributes', () => {
    render(
      <Wrapper>
        <ThemeToggle />
      </Wrapper>
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false'); // Default is light mode
    
    // Click to toggle
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true'); // Now in dark mode
  });

  test('has sun and moon icons', () => {
    render(
      <Wrapper>
        <ThemeToggle />
      </Wrapper>
    );

    // Initially the sun icon is visible (for light mode)
    expect(screen.getByText('☀️')).toBeInTheDocument();
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });
});