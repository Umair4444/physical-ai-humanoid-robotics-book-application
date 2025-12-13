import React from 'react';
import CustomLayout from '../components/CustomLayout';

interface DocumentPageProps {
  title: string;
  content: string;
  description?: string;
}

const DocumentPage: React.FC<DocumentPageProps> = ({ title, content, description }) => {
  return (
    <CustomLayout title={`${title} - AI Robotics Textbook`} description={description}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article>
          <header className="mb-8">
            <h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                color: 'var(--ifm-color-text)',
              }}
            >
              {title}
            </h1>
          </header>
          
          <div 
            className="prose dark:prose-invert max-w-none"
            style={{
              color: 'var(--ifm-color-text)',
            }}
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </article>
      </div>
    </CustomLayout>
  );
};

export default DocumentPage;