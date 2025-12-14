import React, { useState } from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';
import MainLayout from '../components/MainLayout';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
    // Clear submission messages when user updates form
    if (submitSuccess || submitError) {
      setSubmitSuccess(false);
      setSubmitError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // In a real implementation, you would send the data to your backend
      // For now, we'll simulate the API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form on successful submission
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitError('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div
        className={`min-h-screen py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1
              className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Contact Us
            </h1>
            <p
              className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Have questions about our Physical AI Humanoid Robotics Textbook?
              We'd love to hear from you!
            </p>
          </div>

          <div
            className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2
                  className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3
                        className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      >
                        Email
                      </h3>
                      <p
                        className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        support@airoboticsbook.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3
                        className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      >
                        Phone
                      </h3>
                      <p
                        className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3
                        className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      >
                        Office
                      </h3>
                      <p
                        className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        123 Tech Avenue
                        <br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                {submitSuccess ? (
                  <div className="p-6 bg-green-100 text-green-700 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p>
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {submitError && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {submitError}
                      </div>
                    )}

                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.name
                            ? 'border-red-500'
                            : isDarkMode
                              ? 'border-gray-700 bg-gray-700 text-white'
                              : 'border-gray-300 bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.email
                            ? 'border-red-500'
                            : isDarkMode
                              ? 'border-gray-700 bg-gray-700 text-white'
                              : 'border-gray-300 bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="subject"
                        className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isDarkMode
                            ? 'border-gray-700 bg-gray-700 text-white'
                            : 'border-gray-300 bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Your subject"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.message
                            ? 'border-red-500'
                            : isDarkMode
                              ? 'border-gray-700 bg-gray-700 text-white'
                              : 'border-gray-300 bg-white'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Your message here..."
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-lg font-medium ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      } transition-colors`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
