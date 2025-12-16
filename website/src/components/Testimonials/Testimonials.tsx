import React from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';

const Testimonials: React.FC = () => {
  const { isDarkMode } = useTheme();

  const testimonials = [
    {
      id: 'testimonial-1',
      name: 'Dr. Sarah Johnson',
      role: 'Lead Robotics Engineer',
      content: 'This textbook transformed my understanding of AI robotics. The hands-on approach and real-world examples make complex concepts accessible.',
      rating: 5,
      avatar: '/img/avatar1.jpg'
    },
    {
      id: 'testimonial-2',
      name: 'Prof. Ahmed Khan',
      role: 'Director of AI Research',
      content: 'An invaluable resource for anyone serious about physical AI. The comprehensive coverage of humanoid design principles is unmatched.',
      rating: 5,
      avatar: '/img/avatar2.jpg'
    },
    {
      id: 'testimonial-3',
      name: 'Alex Chen',
      role: 'Senior Robotics Developer',
      content: 'The RAG chatbot integration is revolutionary for learning. I can get answers to complex questions instantly while studying.',
      rating: 4,
      avatar: '/img/avatar3.jpg'
    }
  ];

  // Helper function to render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">★½</span>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>★</span>
      );
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className={`p-6 rounded-xl shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {testimonial.name}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {testimonial.role}
                </p>
              </div>
            </div>
            <div className="mb-4">
              {renderStars(testimonial.rating)}
            </div>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              "{testimonial.content}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;