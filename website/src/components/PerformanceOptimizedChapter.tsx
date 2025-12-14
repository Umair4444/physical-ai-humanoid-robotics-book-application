import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ChapterLayout } from './ChapterLayout';
import { ContentService } from '../services/ContentService';
import { Chapter } from '../types/module';
import { ChapterContent } from '../services/ContentService';

// Function to convert ChapterContent to Chapter type for compatibility with existing components
function adaptChapterContentToChapter(chapterContent: ChapterContent): Chapter {
  return {
    id: chapterContent.id,
    moduleId: chapterContent.moduleId,
    title: chapterContent.title,
    description: undefined, // Add default if not present
    order: (chapterContent as any).order || 0, // Add default if not present
    lessonContent: chapterContent.lessonContent,
    summaryContent: chapterContent.summaryContent,
    duration: chapterContent.duration || 0, // Add default if not present
    imageUrl: (chapterContent as any).imageUrl,
    isActive: false,
    isCompleted: false
  };
}

const PerformanceOptimizedChapter: React.FC = () => {
  const { moduleId, chapterId } = useParams<{ moduleId: string; chapterId: string }>();
  const history = useHistory();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Preload adjacent chapters to improve perceived performance
  useEffect(() => {
    const preloadAdjacentChapters = async () => {
      if (!chapterId) return;

      // Get chapter number to identify adjacent chapters
      const chapterNumber = parseInt(chapterId.split('-').pop() || '1');
      const totalChapters = 6; // Assuming 6 chapters per module

      // Preload next chapter if it exists
      if (chapterNumber < totalChapters) {
        const nextChapterId = `${moduleId}-chapter-${chapterNumber + 1}`;
        ContentService.getChapter(nextChapterId); // Call but don't wait for it
      }

      // Preload previous chapter if it exists
      if (chapterNumber > 1) {
        const prevChapterId = `${moduleId}-chapter-${chapterNumber - 1}`;
        ContentService.getChapter(prevChapterId); // Call but don't wait for it
      }
    };

    preloadAdjacentChapters();
  }, [chapterId, moduleId]);

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    const fetchChapterData = async () => {
      if (!chapterId) return;

      try {
        const startTime = performance.now();

        const chapterData = await ContentService.getChapter(chapterId);

        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        console.log(`Chapter ${chapterId} loaded in ${loadTime.toFixed(2)} milliseconds`);
        
        if (loadTime > 3000) {
          console.warn(`Chapter ${chapterId} took longer than 3 seconds to load`, loadTime);
        }
        
        if (isMounted && chapterData) {
          setChapter(adaptChapterContentToChapter(chapterData));
          setError(null);
        } else if (isMounted) {
          setError('Chapter not found');
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load chapter data');
          console.error('Error fetching chapter data:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchChapterData();

    return () => {
      isMounted = false;
    };
  }, [chapterId]);

  const navigateToChapter = (targetChapterId: string) => {
    if (targetChapterId) {
      history.push(`/modules/${moduleId}/${targetChapterId}`);
      // Scroll to top of page after navigation
      window.scrollTo(0, 0);
    }
  };

  // Find previous and next chapters in the same module
  const getAdjacentChapters = () => {
    if (!chapter) return { previousChapterId: undefined, nextChapterId: undefined };

    // This would normally be fetched from the module data to determine the sequence
    // For now, we'll simulate it based on the chapter ID pattern
    const chapterNumber = parseInt(chapterId.split('-').pop() || '1');
    const totalChapters = 6; // Assuming 6 chapters per module

    let previousChapterId: string | undefined;
    let nextChapterId: string | undefined;

    if (chapterNumber > 1) {
      previousChapterId = `${moduleId}-chapter-${chapterNumber - 1}`;
    }

    if (chapterNumber < totalChapters) {
      nextChapterId = `${moduleId}-chapter-${chapterNumber + 1}`;
    }

    return { previousChapterId, nextChapterId };
  };

  const { previousChapterId, nextChapterId } = getAdjacentChapters();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ai-primary mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading chapter...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Optimizing for fast loading</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Chapter not found! </strong>
          <span className="block sm:inline">The requested chapter does not exist.</span>
        </div>
      </div>
    );
  }

  // Get the module name from the module ID (this would normally come from a module lookup)
  const getModuleName = (moduleId: string) => {
    const moduleNumber = moduleId.split('-')[1];
    switch(moduleNumber) {
      case '1':
        return 'Introduction to AI Robotics';
      case '2':
        return 'Robotics Hardware';
      case '3':
        return 'Sensors and Perception';
      case '4':
        return 'Motion Planning';
      case '5':
        return 'Control Systems';
      case '6':
        return 'Machine Learning in Robotics';
      case '7':
        return 'Human-Robot Interaction';
      case '8':
        return 'Robotics Applications';
      case '9':
        return 'Ethics in AI Robotics';
      case '10':
        return 'Future of Robotics';
      default:
        return 'Module';
    }
  };

  return (
    <ChapterLayout
      chapter={chapter}
      moduleId={moduleId}
      moduleName={getModuleName(moduleId)}
      previousChapterId={previousChapterId}
      nextChapterId={nextChapterId}
      onNavigate={navigateToChapter}
    />
  );
};

export default PerformanceOptimizedChapter;