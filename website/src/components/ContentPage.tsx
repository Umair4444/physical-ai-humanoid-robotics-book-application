import React from 'react';
import CustomLayout from '../components/CustomLayout';

interface ContentPageProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

const ContentPage: React.FC<ContentPageProps> = ({ title, children, description }) => {
  return (
    <CustomLayout title={`${title} - AI Robotics Textbook`} description={description}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: 'var(--ifm-color-text)',
            }}
          >
            {title}
          </h1>
        </header>
        
        <main>
          {children}
        </main>
      </div>
    </CustomLayout>
  );
};

export default ContentPage;