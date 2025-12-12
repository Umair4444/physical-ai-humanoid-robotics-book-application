import React from 'react';

interface ReadingTimeProps {
  text: string;
  label?: string;
  className?: string;
}

export const ReadingTime: React.FC<ReadingTimeProps> = ({
  text,
  label = 'min read',
  className = ''
}) => {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  
  // Count words in the text
  const wordCount = text.trim() 
    ? text.trim().split(/\s+/).filter(word => word.length > 0).length
    : 0;
  
  // Calculate reading time (minimum 1 minute)
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  
  const classes = [
    'text-gray-600 dark:text-gray-400 text-sm',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {readingTime} {label}
    </div>
  );
};