import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainLayout } from '../components/Layout/MainLayout';

// Mock the child components
jest.mock('../components/Header', () => ({
  Header: () => <header data-testid="header">Header</header>
}));

jest.mock('../components/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

describe('MainLayout Component', () => {
  test('renders children content within layout', () => {
    const testContent = 'Test Content';
    
    render(
      <MainLayout>
        <div>{testContent}</div>
      </MainLayout>
    );
    
    // Check that the content is rendered
    expect(screen.getByText(testContent)).toBeInTheDocument();
    
    // Check that header and footer are present
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders with default props', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    // Ensure layout is present
    const layout = screen.getByTestId('main-layout');
    expect(layout).toBeInTheDocument();
  });
});