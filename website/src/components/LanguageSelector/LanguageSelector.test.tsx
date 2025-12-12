import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelector } from './LanguageSelector';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Wrap the component with the required context provider
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageSelector Component', () => {
  test('renders language selector with all options', () => {
    render(
      <Wrapper>
        <LanguageSelector />
      </Wrapper>
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    // Check that all language options are present
    expect(screen.getByRole('option', { name: /english/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /اردو/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /中文/i })).toBeInTheDocument();
  });

  test('defaults to english', () => {
    render(
      <Wrapper>
        <LanguageSelector />
      </Wrapper>
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('en-US');
  });

  test('changes language when selected', () => {
    render(
      <Wrapper>
        <LanguageSelector />
      </Wrapper>
    );

    const selectElement = screen.getByRole('combobox');
    
    // Change to Urdu
    fireEvent.change(selectElement, { target: { value: 'ur-PK' } });
    expect(selectElement).toHaveValue('ur-PK');

    // Change to Chinese
    fireEvent.change(selectElement, { target: { value: 'zh-CN' } });
    expect(selectElement).toHaveValue('zh-CN');
  });

  test('displays flags for each language', () => {
    render(
      <Wrapper>
        <LanguageSelector />
      </Wrapper>
    );

    // All flags should be present in the options
    expect(screen.getAllByText(/🇺🇸|🇵🇰|🇨🇳/)).toHaveLength(3);
  });

  test('has proper accessibility attributes', () => {
    render(
      <Wrapper>
        <LanguageSelector />
      </Wrapper>
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('aria-label', 'Select language');
  });
});