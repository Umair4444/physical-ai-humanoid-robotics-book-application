import React, { useState } from 'react';
import MainLayout from './MainLayout';
import { Tab, TabList, TabButton, TabPanel, TabPanels } from './Tab';
import { Chapter } from '../types/module';

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
    }
  };

  const handleNext = () => {
    if (nextChapterId && onNavigate) {
      onNavigate(nextChapterId);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            <a href={`/modules/${moduleId}`} className="hover:underline">
              {moduleName}
            </a>
            <span className="mx-2">›</span>
            <span>{chapter.title}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {chapter.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Estimated time: {chapter.duration} min
          </p>
        </div>

        <Tab>
          <TabList>
            <TabButton
              selected={activeTab === 'lesson'}
              onClick={() => setActiveTab('lesson')}
              id="lesson-tab"
            >
              Lesson
            </TabButton>
            <TabButton
              selected={activeTab === 'summary'}
              onClick={() => setActiveTab('summary')}
              id="summary-tab"
            >
              Summary
            </TabButton>
          </TabList>

          <TabPanels>
            <TabPanel selected={activeTab === 'lesson'}>
              <div
                className="prose dark:prose-invert max-w-none mt-4"
                dangerouslySetInnerHTML={{ __html: chapter.lessonContent }}
              />
            </TabPanel>
            <TabPanel selected={activeTab === 'summary'}>
              <div
                className="prose dark:prose-invert max-w-none mt-4"
                dangerouslySetInnerHTML={{ __html: chapter.summaryContent }}
              />
            </TabPanel>
          </TabPanels>
        </Tab>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          {previousChapterId ? (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              ← Previous Chapter
            </button>
          ) : (
            <div></div> // Spacer to keep next button aligned right
          )}

          {nextChapterId ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-ai-primary text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Next Chapter →
            </button>
          ) : (
            <div></div> // Spacer to keep previous button aligned left
          )}
        </div>
      </div>
    </MainLayout>
  );
};
