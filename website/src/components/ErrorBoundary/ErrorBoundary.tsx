import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Render fallback UI
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Default fallback component
const DefaultErrorFallback: React.FC<{ error?: Error }> = ({ error }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-red-50 text-red-800 rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    {error && (
      <p className="text-red-700 mb-4">
        Error: {error.message}
      </p>
    )}
    <button 
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      onClick={() => window.location.reload()}
    >
      Reload Page
    </button>
    <p className="mt-4 text-sm text-red-600">
      If the problem persists, please contact support.
    </p>
  </div>
);

export default ErrorBoundary;
export { DefaultErrorFallback };