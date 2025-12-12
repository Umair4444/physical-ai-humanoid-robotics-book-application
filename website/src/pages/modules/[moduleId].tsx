import React, { useEffect, useState } from 'react';
import { useParams } from '@docusaurus/router';
import { ModuleLayout } from '../../components/ModuleLayout';
import { contentService } from '../../services/contentService';
import { Module, Chapter } from '../../types/module';

const ModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!moduleId) return;

      try {
        setLoading(true);
        const moduleData = await contentService.getModule(moduleId);
        if (moduleData) {
          setModule(moduleData);
          const chaptersData = await contentService.getChapters(moduleId);
          setChapters(chaptersData);
          setError(null);
        } else {
          setError('Module not found');
        }
      } catch (err) {
        setError('Failed to load module data');
        console.error('Error fetching module data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ai-primary mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading module...</p>
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

  if (!module) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Module not found! </strong>
          <span className="block sm:inline">The requested module does not exist.</span>
        </div>
      </div>
    );
  }

  return (
    <ModuleLayout module={module} chapters={chapters}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Module Content</h2>
        <p className="text-gray-700 dark:text-gray-300">
          This is the content for the module: {module.title}. 
          It contains {chapters.length} chapters covering various topics related to AI robotics.
        </p>
      </div>
    </ModuleLayout>
  );
};

export default ModulePage;