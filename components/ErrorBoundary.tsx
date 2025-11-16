import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // FIX: Replaced the constructor with a class property for state initialization.
  // This is a more modern syntax and resolves the "Property 'state' does not exist" error.
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  // FIX: Changed to an arrow function to automatically bind `this`, which is a modern alternative to binding in the constructor.
  // This also resolves the "Property 'setState' does not exist" error.
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
    // It's often better to navigate to a safe route on reset
    window.location.hash = '#/';
    window.location.reload();
  }

  render() {
    // FIX: The errors related to `this.state` and `this.props` are resolved by correcting the class structure above,
    // allowing TypeScript to correctly identify this as a React Component.
    if (this.state.hasError && this.state.error) {
      // You can render any custom fallback UI
      return <this.props.FallbackComponent error={this.state.error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
