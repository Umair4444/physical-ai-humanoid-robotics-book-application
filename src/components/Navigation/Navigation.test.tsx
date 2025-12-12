import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from './Navigation';

// Mock the context hooks
jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' })
}));

jest.mock('../../context/LanguageContext', () => ({
  useLanguage: () => ({ t: (key: string) => key })
}));

jest.mock('../../context/NavigationContext', () => ({
  useNavigation: () => ({ 
    currentModule: { title: 'Module 1' },
    currentChapter: { title: 'Chapter 1' }
  })
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock scroll behavior
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  test('renders navigation component with logo and links', () => {
    render(<Navigation />);
    
    expect(screen.getByText('AI Robotics Textbook')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('modules')).toBeInTheDocument();
    expect(screen.getByText('pricing')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();
    expect(screen.getByText('Module 1')).toBeInTheDocument();
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
  });

  test('applies correct theme classes', () => {
    render(<Navigation />);
    
    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('bg-white/80');
  });
});