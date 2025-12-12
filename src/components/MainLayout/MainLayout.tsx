import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import ScrollTopButton from '../components/ScrollTopButton/ScrollTopButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
};

export default MainLayout;