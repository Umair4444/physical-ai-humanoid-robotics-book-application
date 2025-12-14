import React from 'react';
import Layout from '@theme/Layout';
import PerformanceOptimizedModuleList from '@site/src/components/PerformanceOptimizedModuleList';

const ModulesPage: React.FC = () => {
  return (
    <Layout
      title="Modules"
      description="Learn about Physical AI and Humanoid Robotics through our comprehensive modules">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Course Modules</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore our comprehensive curriculum on Physical AI and Humanoid Robotics
          </p>
        </section>
        
        <section>
          <PerformanceOptimizedModuleList />
        </section>
      </main>
    </Layout>
  );
}

export default ModulesPage;