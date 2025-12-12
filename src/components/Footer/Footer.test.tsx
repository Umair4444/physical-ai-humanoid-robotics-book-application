import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock the context hooks
jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' })
}));

jest.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({ t: (key: string) => key })
}));

describe('Footer Component', () => {
  test('renders footer with all sections', () => {
    render(<Footer />);
    
    expect(screen.getByText('AI Robotics Textbook')).toBeInTheDocument();
    expect(screen.getByText('footer.description')).toBeInTheDocument();
    expect(screen.getByText('footer.navigation')).toBeInTheDocument();
    expect(screen.getByText('footer.resources')).toBeInTheDocument();
    expect(screen.getByText('footer.contact')).toBeInTheDocument();
  });

  test('applies correct theme classes', () => {
    render(<Footer />);
    
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('bg-gray-100');
  });
});