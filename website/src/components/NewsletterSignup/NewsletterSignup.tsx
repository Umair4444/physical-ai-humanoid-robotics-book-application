import React, { useState } from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';

const NewsletterSignup: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      // In a real implementation, you would send the email to your backend
      // For now, we'll simulate the API call
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail(''); // Clear the email field
      } else {
        setError('Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="flex items-center">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-green-900' : 'bg-green-100'}`}>
            <svg 
              className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div className="ml-4">
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Thank you for subscribing!
            </h3>
            <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              You'll receive our latest updates and resources.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-50'}`}>
      <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Subscribe to our Newsletter
      </h3>
      <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
        Stay updated with the latest in AI robotics. Get exclusive content and resources.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`flex-grow px-4 py-2 rounded-lg border ${
              error ? 'border-red-500' : 
              isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : isDarkMode 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            } transition-colors`}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </form>
      
      <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterSignup;