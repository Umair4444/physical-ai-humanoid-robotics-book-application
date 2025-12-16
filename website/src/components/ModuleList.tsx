import React from 'react';
import { Module } from '../types/module';
import Link from '@docusaurus/Link';

interface ModuleListProps {
  modules: Module[];
}

export const ModuleList: React.FC<ModuleListProps> = ({ modules }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12 text-ai-primary">AI Robotics Textbook Modules</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <div
            key={module.id}
            data-testid={`module-card-${module.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start">
              <span className="text-2xl mr-4">{module.icon}</span>
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{module.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{module.description}</p>
                <Link
                  to={`/modules/${module.id}`}
                  className="inline-block bg-ai-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Explore Module
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};