import React, { ReactNode } from 'react';
import OriginalLayout from '@theme-original/Layout';
import FloatingChatbotButton from '@site/src/components/FloatingChatbotButton/FloatingChatbotButton';
import ScrollTopButton from '@site/src/components/ScrollButton/ScrollTopButton';
import Navigation from '@site/src/components/Navigation/Navigation';
import { ThemeApplier } from '@site/src/components/ThemeApplier/ThemeApplier';
import Footer from '@site/src/components/Footer';

// Custom Layout that wraps the original layout with our additional components to match MainLayout
export default function Layout({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  return (
    <OriginalLayout {...props}>
      <>
        {/* <ThemeApplier /> */}
        {/* <Navigation /> */}
        {children}
        <ScrollTopButton />
        <FloatingChatbotButton />
        {/* <Footer /> */}
      </>
    </OriginalLayout>
  );
}
