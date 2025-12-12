import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ThemeApplier } from './ThemeApplier';

// Mock component to test theme application
const MockComponent: React.FC = () => {
  return <div>Test Component</div>;
};

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <ThemeApplier />
    {children}
  </ThemeProvider>
);

describe('ThemeApplier Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset document classes
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-theme');
  });

  test('initially applies light theme by default', () => {
    render(
      <ThemeWrapper>
        <MockComponent />
      </ThemeWrapper>
    );

    // Verify document-level theme is applied
    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  test('applies dark theme when set via localStorage', () => {
    localStorage.setItem('theme', 'dark');
    
    render(
      <ThemeWrapper>
        <MockComponent />
      </ThemeWrapper>
    );

    // Verify document-level theme is applied
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  test('does not render visible elements', () => {
    const { container } = render(
      <ThemeWrapper>
        <MockComponent />
      </ThemeWrapper>
    );
    
    // ThemeApplier should not render any visible elements
    expect(container.firstChild).toBeNull();
  });
});