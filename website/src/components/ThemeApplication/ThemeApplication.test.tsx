import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

// Component to test theme application
const TestThemeComponent: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <div className={`theme-${theme} ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>{t('welcome')}</h1>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {String(isDarkMode)}</p>
    </div>
  );
};

// Wrapper for both providers
const ThemeLanguageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <LanguageProvider>{children}</LanguageProvider>
  </ThemeProvider>
);

describe('Theme and Language Application', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('applies theme classes correctly', () => {
    render(
      <ThemeLanguageWrapper>
        <TestThemeComponent />
      </ThemeLanguageWrapper>
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
    expect(screen.getByText('Is dark mode: false')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  test('applies dark theme when set in localStorage', () => {
    // Set theme in localStorage before rendering
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeLanguageWrapper>
        <TestThemeComponent />
      </ThemeLanguageWrapper>
    );

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    expect(screen.getByText('Is dark mode: true')).toBeInTheDocument();
  });

  test('applies different languages correctly', () => {
    // Set language in localStorage before rendering
    localStorage.setItem('language', 'ur-PK');

    render(
      <ThemeLanguageWrapper>
        <TestThemeComponent />
      </ThemeLanguageWrapper>
    );

    expect(screen.getByText('خوش آمدید')).toBeInTheDocument(); // Urdu translation of welcome
  });

  test('translates elements when language changes', () => {
    render(
      <ThemeLanguageWrapper>
        <TestThemeComponent />
      </ThemeLanguageWrapper>
    );

    // Initially in English
    expect(screen.getByText('Welcome')).toBeInTheDocument();

    // Change language to Urdu in localStorage and re-render
    localStorage.setItem('language', 'ur-PK');
    render(
      <ThemeLanguageWrapper>
        <TestThemeComponent />
      </ThemeLanguageWrapper>
    );

    expect(screen.getByText('خوش آمدید')).toBeInTheDocument(); // Urdu translation
  });
});