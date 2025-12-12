// Responsive design utilities
export const responsiveDesign = {
  // Breakpoints based on research
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  } as const,
  
  // Media query generator
  mediaQuery: (minWidth: number, maxWidth?: number) => {
    if (maxWidth !== undefined) {
      // Range query
      return `@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
    } else {
      // Min-width query
      return `@media (min-width: ${minWidth}px)`;
    }
  },
  
  // Container padding based on screen size
  containerPadding: (screenWidth: number) => {
    if (screenWidth < 640) {
      return '1rem';   // 16px on mobile
    } else if (screenWidth < 1024) {
      return '2rem';   // 32px on tablet
    } else {
      return '4rem';   // 64px on desktop
    }
  },
  
  // Font sizing based on screen size
  responsiveFontSize: (baseSize: number, screenWidth: number) => {
    if (screenWidth < 640) {
      return `${baseSize * 0.875}px`; // Mobile, 87.5% of base
    } else if (screenWidth < 1024) {
      return `${baseSize * 0.9375}px`; // Tablet, 93.75% of base
    } else {
      return `${baseSize}px`; // Desktop, 100% of base
    }
  },
  
  // Component sizing based on screen size
  responsiveComponentSize: (size: 'sm' | 'md' | 'lg', screenWidth: number) => {
    const sizes = {
      sm: { mobile: '0.75rem', tablet: '0.875rem', desktop: '1rem' },
      md: { mobile: '1rem', tablet: '1rem', desktop: '1rem' },
      lg: { mobile: '1.25rem', tablet: '1.25rem', desktop: '1.5rem' },
    };
    
    if (screenWidth < 640) {
      return sizes[size].mobile;
    } else if (screenWidth < 1024) {
      return sizes[size].tablet;
    } else {
      return sizes[size].desktop;
    }
  }
};

// Hook to get current screen size
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

// Additional utility: isMobile hook
export const useIsMobile = () => {
  const screenSize = useScreenSize();
  return screenSize.width < 768;
};

// Additional utility: isTablet hook
export const useIsTablet = () => {
  const screenSize = useScreenSize();
  return screenSize.width >= 768 && screenSize.width < 1024;
};

// Additional utility: isDesktop hook
export const useIsDesktop = () => {
  const screenSize = useScreenSize();
  return screenSize.width >= 1024;
};

// Make sure React is available
import React from 'react';