import React, { type ReactNode } from 'react';
import { ThemeProvider } from '@site/src/contexts/ThemeContext';
import { LanguageProvider } from '@site/src/contexts/LanguageContext';
import { NavigationProvider } from '@site/src/contexts/NavigationContext';

// Wrap the entire app with our context providers
export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}