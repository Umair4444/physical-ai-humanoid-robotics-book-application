import React, { ReactNode } from 'react';
import Footer from './Footer';
import { ThemeApplier } from './ThemeApplier/ThemeApplier';
import Navigation from './Navigation/Navigation';

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
      <main className="grow pt-24">
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
