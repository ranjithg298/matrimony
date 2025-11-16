import React from 'react';

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="elegant-teal min-h-screen bg-theme-bg text-theme-text-primary flex items-center justify-center p-4">
      <div className="bg-theme-surface p-8 rounded-lg border border-theme-border max-w-lg text-center shadow-2xl">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong.</h1>
        <p className="text-theme-text-secondary mb-6">
            We're sorry for the inconvenience. An unexpected error occurred. Please try returning to the homepage.
        </p>
        <details className="text-left bg-theme-bg p-3 rounded-md mb-6">
            <summary className="cursor-pointer text-sm text-theme-text-secondary">Error Details</summary>
            <pre className="mt-2 text-xs text-red-300 overflow-auto">
                <code>{error.message}</code>
            </pre>
        </details>
        <button
            onClick={resetErrorBoundary}
            className="inline-block bg-theme-gradient text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition duration-300"
        >
            Return to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;