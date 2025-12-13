import React, { type ReactNode } from 'react';
import { ThemeProvider } from '@site/src/contexts/ThemeContext';
import { LanguageProvider } from '@site/src/contexts/LanguageContext';
import { NavigationProvider } from '@site/src/contexts/NavigationContext';
import { ThemeApplier } from '@site/src/components/ThemeApplier/ThemeApplier';

// Wrap the entire app with our context providers and apply theme
export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationProvider>
          <ThemeApplier />
          {children}
        </NavigationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}