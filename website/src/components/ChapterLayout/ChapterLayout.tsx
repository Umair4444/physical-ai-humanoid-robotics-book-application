import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { Chapter } from '../../types/module';
import Link from '@docusaurus/Link';

interface ChapterLayoutProps {
  chapter: Chapter;
  moduleId: string;
  moduleName: string;
  previousChapterId?: string;
  nextChapterId?: string;
  onNavigate?: (chapterId: string) => void;
}

export const ChapterLayout: React.FC<ChapterLayoutProps> = ({
  chapter,
  moduleId,
  moduleName,
  previousChapterId,
  nextChapterId,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'lesson' | 'summary'>('lesson');

  const handlePrevious = () => {
    if (previousChapterId && onNavigate) {
      onNavigate(previousChapterId);
    } else if (previousChapterId) {
      // Fallback navigation
      window.location.href = `/modules/${moduleId}/${previousChapterId}`;
    }
  };

  const handleNext = () => {
    if (nextChapterId && onNavigate) {
      onNavigate(nextChapterId);
    } else if (nextChapterId) {
      // Fallback navigation
      window.location.href = `/modules/${moduleId}/${nextChapterId}`;
    }
  };

  return (
    <Layout title={chapter.title}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb navigation */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/modules" className="hover:underline">Modules</Link>
          <span className="mx-2">›</span>
          <Link to={`/modules/${moduleId}`} className="hover:underline">{moduleName}</Link>
          <span className="mx-2">›</span>
          <span>{chapter.title}</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{chapter.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Estimated time: {chapter.duration} min
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'lesson'
                    ? 'border-ai-primary text-ai-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Lesson
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'summary'
                    ? 'border-ai-primary text-ai-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Summary
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          {activeTab === 'lesson' ? (
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: chapter.lessonContent }}
            />
          ) : (
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: chapter.summaryContent }}
            />
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          {previousChapterId ? (
            <Link
              to={`/modules/${moduleId}/${previousChapterId}`}
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
            >
              ← Previous Chapter
            </Link>
          ) : (
            <div></div> // Spacer to keep next button aligned right
          )}

          {nextChapterId ? (
            <Link
              to={`/modules/${moduleId}/${nextChapterId}`}
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className="px-4 py-2 bg-ai-primary text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              Next Chapter →
            </Link>
          ) : (
            <div></div> // Spacer to keep previous button aligned left
          )}
        </div>
      </div>
    </Layout>
  );
};