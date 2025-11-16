import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-primary flex items-center justify-center p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h1 className="text-6xl font-bold text-theme-accent-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-theme-text-secondary mb-8">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <a
            href="#/"
            className="inline-block bg-theme-gradient text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition duration-300"
          >
            Go Home
          </a>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src="https://i.ibb.co/ck1SGFJ/Base-V2-404.png" alt="404 Not Found Illustration" className="w-full max-w-md mx-auto"/>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
