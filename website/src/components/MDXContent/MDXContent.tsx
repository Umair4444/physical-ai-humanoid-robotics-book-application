import React from 'react';

interface MDXContentProps {
  content: string;
  className?: string;
}

const MDXContent: React.FC<MDXContentProps> = ({ content, className = '' }) => {
  return (
    <div 
      className={`mdx-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};

export default MDXContent;