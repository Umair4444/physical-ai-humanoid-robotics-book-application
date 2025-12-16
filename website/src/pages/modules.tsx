import React from 'react';
import MainLayout from '../components/MainLayout';

const ModulesPage: React.FC = () => {
  // Sample module data
  const modules = [
    {
      id: 1,
      title: 'Introduction to Physical AI',
      description:
        'Understanding the fundamentals of AI in physical environments',
      duration: '2 weeks',
      lessons: 5,
      icon: '📘',
    },
    {
      id: 2,
      title: 'Humanoid Kinematics',
      description: 'Exploring the mechanics of humanoid robot movement',
      duration: '3 weeks',
      lessons: 7,
      icon: '🦿',
    },
    {
      id: 3,
      title: 'Embodied Cognition',
      description: 'How intelligence emerges from body-environment interaction',
      duration: '2 weeks',
      lessons: 4,
      icon: '🧠',
    },
    {
      id: 4,
      title: 'Locomotion Systems',
      description: 'Techniques for walking, running, and navigating terrain',
      duration: '4 weeks',
      lessons: 9,
      icon: '🚶',
    },
    {
      id: 5,
      title: 'Sensory Integration',
      description:
        'Processing data from multiple sensors for environmental awareness',
      duration: '3 weeks',
      lessons: 6,
      icon: '📡',
    },
    {
      id: 6,
      title: 'Adaptive Behaviors',
      description: 'Learning and adaptation in dynamic physical environments',
      duration: '3 weeks',
      lessons: 8,
      icon: '🔄',
    },
  ];

  return (
    <MainLayout
      title="Modules - AI Robotics Textbook"
      description="Explore the comprehensive modules of our AI robotics textbook"
    >
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{
              color: 'var(--ifm-color-text)',
            }}
          >
            Course Modules
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{
              color: 'var(--ifm-color-text-light)',
            }}
          >
            Dive deep into the fascinating world of physical AI and humanoid
            robotics
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map(module => (
            <div
              key={module.id}
              className="rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--ifm-card-background-color)',
              }}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{module.icon}</div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{
                    color: 'var(--ifm-color-primary)',
                  }}
                >
                  {module.title}
                </h2>
                <p
                  className="mb-4"
                  style={{
                    color: 'var(--ifm-color-text-light)',
                  }}
                >
                  {module.description}
                </p>

                <div className="flex justify-between text-sm mb-6">
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        'rgba(var(--ifm-color-primary-rgb), 0.1)',
                      color: 'var(--ifm-color-primary)',
                    }}
                  >
                    {module.duration}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        'rgba(var(--ifm-color-primary-rgb), 0.1)',
                      color: 'var(--ifm-color-primary)',
                    }}
                  >
                    {module.lessons} lessons
                  </span>
                </div>

                <a
                  href={`/modules/${module.id}`}
                  className="w-full py-3 rounded-lg font-semibold block text-center transition-colors"
                  style={{
                    backgroundColor: 'var(--ifm-color-primary)',
                    color: 'white',
                  }}
                >
                  Explore Module
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ModulesPage;
