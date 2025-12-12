import React from 'react';
import { render, screen } from '@testing-library/react';
import { TranslationHelper, useTranslationText } from './TranslationHelper';
import { LanguageProvider } from '../../contexts/LanguageContext';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('TranslationHelper Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders translated text correctly for English', () => {
    render(
      <Wrapper>
        <TranslationHelper id="welcome" />
      </Wrapper>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  test('renders translated text correctly for Urdu', () => {
    localStorage.setItem('language', 'ur-PK');
    
    render(
      <Wrapper>
        <TranslationHelper id="welcome" />
      </Wrapper>
    );

    expect(screen.getByText('خوش آمدید')).toBeInTheDocument();
  });

  test('renders translated text correctly for Chinese', () => {
    localStorage.setItem('language', 'zh-CN');
    
    render(
      <Wrapper>
        <TranslationHelper id="welcome" />
      </Wrapper>
    );

    expect(screen.getByText('欢迎')).toBeInTheDocument();
  });

  test('uses fallback text when translation is not available', () => {
    render(
      <Wrapper>
        <TranslationHelper id="nonexistent-key" fallback="Fallback Text" />
      </Wrapper>
    );

    expect(screen.getByText('Fallback Text')).toBeInTheDocument();
  });

  test('renders id as fallback when no translation or explicit fallback', () => {
    render(
      <Wrapper>
        <TranslationHelper id="nonexistent-key" />
      </Wrapper>
    );

    expect(screen.getByText('nonexistent-key')).toBeInTheDocument();
  });

  test('renders in a span element', () => {
    render(
      <Wrapper>
        <TranslationHelper id="welcome" />
      </Wrapper>
    );

    const spanElement = screen.getByText('Welcome').closest('span');
    expect(spanElement).toBeInTheDocument();
  });
});

describe('useTranslationText Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  // Test component to use the hook
  const TestHookComponent: React.FC<{ id: string, fallback?: string }> = ({ id, fallback }) => {
    const translation = useTranslationText(id, fallback);
    return <div>{translation}</div>;
  };

  test('returns translated text for English', () => {
    render(
      <Wrapper>
        <TestHookComponent id="welcome" />
      </Wrapper>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  test('returns translated text for Urdu', () => {
    localStorage.setItem('language', 'ur-PK');
    
    render(
      <Wrapper>
        <TestHookComponent id="welcome" />
      </Wrapper>
    );

    expect(screen.getByText('خوش آمدید')).toBeInTheDocument();
  });

  test('uses fallback when translation is not available', () => {
    render(
      <Wrapper>
        <TestHookComponent id="nonexistent-key" fallback="Fallback Text" />
      </Wrapper>
    );

    expect(screen.getByText('Fallback Text')).toBeInTheDocument();
  });
});