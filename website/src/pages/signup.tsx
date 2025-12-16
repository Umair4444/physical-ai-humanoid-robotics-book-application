import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import { AuthService } from '@site/src/services/AuthService';
import { Button } from '../components/Button/Button';
import { useTheme } from '@site/src/contexts/ThemeContext';
import MainLayout from '../components/MainLayout';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const history = useHistory();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least 1 uppercase, 1 lowercase, and 1 number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // Clear general error when user updates form
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setGeneralError('');

    try {
      const response = await AuthService.register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      if (response.success) {
        // Redirect to home or a welcome page
        history.push('/');
      } else {
        setGeneralError('Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setGeneralError(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout
      title="Sign Up - Physical AI Humanoid Robotics"
      description="Create an account to access personalized learning resources on Physical AI Humanoid Robotics."
    >
      <div
        className={` flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4`}
      >
        <div
          className={`w-full max-w-md px-8 py-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="text-center mb-8">
            <h2 className="font-bold">Create an Account</h2>
            <p
              className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Join us to access personalized learning features
            </p>
          </div>

          {generalError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block mb-2 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.firstName
                      ? 'border-red-500'
                      : isDarkMode
                        ? 'border-gray-700 bg-gray-700'
                        : 'border-gray-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block mb-2 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.lastName
                      ? 'border-red-500'
                      : isDarkMode
                        ? 'border-gray-700 bg-gray-700'
                        : 'border-gray-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
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
                      ? 'border-gray-700 bg-gray-700'
                      : 'border-gray-300 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password
                    ? 'border-red-500'
                    : isDarkMode
                      ? 'border-gray-700 bg-gray-700'
                      : 'border-gray-300 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="At least 8 characters"
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
              <p
                className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Password must contain at least 1 uppercase, 1 lowercase, and 1
                number
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div
            className={`text-center mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <p>
              Already have an account?{' '}
              <Link
                to="/login"
                className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} font-medium hover:underline`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignupPage;
