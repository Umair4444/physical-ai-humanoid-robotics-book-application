import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import { AuthService } from '@site/src/services/AuthService';
import { Button } from '../components/Button/Button';
import { useTheme } from '@site/src/contexts/ThemeContext';
import MainLayout from '../components/MainLayout';

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
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
      const response = await AuthService.login(
        formData.email,
        formData.password
      );

      if (response.success) {
        // Redirect to home or previous page
        history.push('/');
      } else {
        setGeneralError('Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setGeneralError(error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout
      title="Login"
      description="Sign in to access your personalized learning experience"
    >
      <div
        className={`flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}
      >
        <div
          className={`w-full max-w-md p-8 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p
              className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Sign in to access your personalized learning experience
            </p>
          </div>

          {generalError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className={`text-sm ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}
                >
                  Forgot password?
                </Link>
              </div>
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
                placeholder="Your password"
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div
            className={`text-center mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <p>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} font-medium hover:underline`}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
