import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLayout from './MainLayout';

// Mock the child component
const MockChild = () => <div data-testid="child-content">Main Content</div>;

describe('MainLayout Component', () => {
  test('renders all layout components', () => {
    render(
      <MainLayout>
        <MockChild />
      </MainLayout>
    );
    
    // Check that navigation is rendered
    expect(document.querySelector('nav')).toBeInTheDocument();
    
    // Check that footer is rendered
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check that scroll button is rendered
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
    
    // Check that main content is rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});