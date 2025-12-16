import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TranslationProps {
  id: string; // The key for the translation
  fallback?: string; // Fallback text if translation is not found
  params?: Record<string, string>; // Parameters for dynamic translations
}

/**
 * TranslationHelper is a component that ensures all text elements 
 * respect the selected language preference
 */
export const TranslationHelper: React.FC<TranslationProps> = ({ id, fallback, params }) => {
  const { t } = useLanguage();
  
  // Get the translated text
  const translated = t(id);
  const textToDisplay = translated !== id || fallback ? translated : (fallback || id);
  
  // If we have parameters, we would process them here
  let finalText = textToDisplay;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      finalText = finalText.replace(`{{${key}}}`, value);
    });
  }

  return <span>{finalText}</span>;
};

/**
 * A hook version of the translation helper for use directly in components
 */
export const useTranslationText = (id: string, fallback?: string, params?: Record<string, string>): string => {
  const { t } = useLanguage();
  
  // Get the translated text
  const translated = t(id);
  let textToDisplay = translated !== id || fallback ? translated : (fallback || id);
  
  // If we have parameters, process them
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      textToDisplay = textToDisplay.replace(`{{${key}}}`, value);
    });
  }
  
  return textToDisplay;
};