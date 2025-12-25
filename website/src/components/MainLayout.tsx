import React, { ReactNode } from 'react';
import Footer from './Footer';
import { ThemeApplier } from './ThemeApplier/ThemeApplier';
import Navigation from './Navigation/Navigation';
import ScrollTopButton from './ScrollButton/ScrollTopButton';
import FloatingChatbotButton from './FloatingChatbotButton/FloatingChatbotButton';
import { useLocation } from '@docusaurus/router';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
}) => {
  const location : any = useLocation()
  console.log(location)
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeApplier />
      <Navigation />

      <main className={location.pathname !== "/" ? `grow pt-20` : ""}>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {children}
      </main>
      <ScrollTopButton />
      <FloatingChatbotButton />
      <Footer />
    </div>
  );
};

export default MainLayout;
