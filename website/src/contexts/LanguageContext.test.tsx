import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

// Test component to use the language hook
const TestLanguageComponent = () => {
  const { language, changeLanguage, t } = useLanguage();
  
  return (
    <div>
      <span data-testid="language">{language}</span>
      <button data-testid="change-en" onClick={() => changeLanguage('en-US')}>EN</button>
      <button data-testid="change-ur" onClick={() => changeLanguage('ur-PK')}>UR</button>
      <button data-testid="change-zh" onClick={() => changeLanguage('zh-CN')}>ZH</button>
      <span data-testid="welcome-text">{t('welcome')}</span>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should provide default language as en-US', () => {
    render(
      <LanguageProvider>
        <TestLanguageComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('language')).toHaveTextContent('en-US');
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('Welcome');
  });

  test('should change language to ur-PK', () => {
    render(
      <LanguageProvider>
        <TestLanguageComponent />
      </LanguageProvider>
    );
    
    fireEvent.click(screen.getByTestId('change-ur'));
    
    expect(screen.getByTestId('language')).toHaveTextContent('ur-PK');
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('خوش آمدید');
  });

  test('should change language to zh-CN', () => {
    render(
      <LanguageProvider>
        <TestLanguageComponent />
      </LanguageProvider>
    );
    
    fireEvent.click(screen.getByTestId('change-zh'));
    
    expect(screen.getByTestId('language')).toHaveTextContent('zh-CN');
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('欢迎');
  });

  test('should translate text correctly', () => {
    render(
      <LanguageProvider>
        <TestLanguageComponent />
      </LanguageProvider>
    );
    
    // Test English
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('Welcome');
    
    fireEvent.click(screen.getByTestId('change-ur'));
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('خوش آمدید');
    
    fireEvent.click(screen.getByTestId('change-zh'));
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('欢迎');
  });
});