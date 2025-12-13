import React, { useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { updateDocumentTheme, getCurrentTheme } from '../../utils/themeUtils';

/**
 * ThemeApplier is a component that ensures the theme is applied consistently
 * across the entire application by updating document-level attributes
 */
export const ThemeApplier: React.FC = () => {
  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    // Apply the theme at the document level to ensure consistency across all components
    updateDocumentTheme(isDarkMode);
  }, [theme, isDarkMode]);

  // This component doesn't render anything, just manages side effects
  return null;
};

export default ThemeApplier;