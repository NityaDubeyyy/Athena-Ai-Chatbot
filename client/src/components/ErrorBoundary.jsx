import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-lg mb-6">We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all"
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner max-w-2xl overflow-auto">
              <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
              <pre className="text-sm text-red-500 whitespace-pre-wrap">{this.state.error?.toString()}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
