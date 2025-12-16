import React from 'react';
import { MainLayout } from './MainLayout';
import { Module, Chapter } from '../types/module';
import Link from '@docusaurus/Link';

interface ModuleLayoutProps {
  module: Module;
  chapters: Chapter[];
  children: React.ReactNode;
}

export const ModuleLayout: React.FC<ModuleLayoutProps> = ({ module, chapters, children }) => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{module.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{module.title}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">{module.description}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with chapter list */}
          <div className="md:w-1/4">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Chapters</h2>
            <ul className="space-y-2">
              {chapters.map((chapter, index) => (
                <li key={chapter.id}>
                  <Link
                    to={`/modules/${module.id}/${chapter.id}`}
                    data-testid={`chapter-link-${chapter.id}`}
                    className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">{index + 1}. {chapter.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{chapter.duration} min</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content area */}
          <div className="md:w-3/4">
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};