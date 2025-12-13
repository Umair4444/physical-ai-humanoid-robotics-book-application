import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { ThemeApplier } from './ThemeApplier/ThemeApplier';

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
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeApplier />
      <Navigation />
      <main className="flex-grow pt-16">
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
