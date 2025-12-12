import React, { type ComponentType, type ReactNode } from 'react';
import { ThemeProvider } from '@site/src/contexts/ThemeContext';
import { LanguageProvider } from '@site/src/contexts/LanguageContext';
import { NavigationProvider } from '@site/src/contexts/NavigationContext';

// Create a wrapper component that provides all necessary contexts
const AppWrapper: ComponentType<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppWrapper;