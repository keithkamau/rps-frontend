import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    void error;
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
          <h1 className='text-4xl font-bold mb-4'>Oops!</h1>
          <p className='text-gray-400 mb-8'>Something went wrong.</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg'
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
