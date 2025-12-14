import React from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';
import { FaBrain, FaGraduationCap, FaGlobe, FaMobileAlt } from 'react-icons/fa';

const Features: React.FC = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <FaBrain className="text-3xl text-indigo-600 dark:text-indigo-400" />,
      title: 'Cutting-Edge Content',
      description: 'Comprehensive coverage of physical AI and humanoid robotics with the latest research and industry trends.'
    },
    {
      icon: <FaGraduationCap className="text-3xl text-indigo-600 dark:text-indigo-400" />,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths using advanced AI to optimize your educational experience.'
    },
    {
      icon: <FaGlobe className="text-3xl text-indigo-600 dark:text-indigo-400" />,
      title: 'Expert Instructors',
      description: 'Learn from industry experts and top academics in the field of AI and robotics.'
    },
    {
      icon: <FaMobileAlt className="text-3xl text-indigo-600 dark:text-indigo-400" />,
      title: 'Flexible Access',
      description: 'Study at your own pace with full access on mobile, tablet, and desktop devices.'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Textbook?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-xl shadow-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-white'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;