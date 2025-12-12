import React from 'react';

interface ChapterCompletionProps {
  chapterId: string;
  isCompleted: boolean;
  onToggleCompletion: (chapterId: string, completed: boolean) => void;
  className?: string;
}

export const ChapterCompletion: React.FC<ChapterCompletionProps> = ({
  chapterId,
  isCompleted,
  onToggleCompletion,
  className = ''
}) => {
  const handleToggle = () => {
    onToggleCompletion(chapterId, !isCompleted);
  };

  const completionText = isCompleted ? 'Completed' : 'Mark as completed';
  const accessLabel = isCompleted 
    ? `Mark chapter ${chapterId} as not completed` 
    : `Mark chapter ${chapterId} as completed`;

  const containerClasses = [
    'flex items-center',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          className="sr-only"
          aria-label={accessLabel}
        />
        <div 
          className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
            isCompleted 
              ? 'bg-ai-primary border-ai-primary' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {isCompleted && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
        <span className={`ml-2 text-sm ${isCompleted ? 'text-ai-primary' : 'text-gray-600 dark:text-gray-400'}`}>
          {completionText}
        </span>
      </label>
    </div>
  );
};