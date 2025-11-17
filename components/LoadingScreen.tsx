import React from 'react';
import HeartIcon from './icons/HeartIcon';

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-theme-bg">
            <div className="flex items-center space-x-4">
                <HeartIcon className="h-12 w-12 text-theme-accent-primary animate-pulse" />
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-theme-gradient">matrimony.ai</span>
            </div>
            <p className="mt-4 text-theme-text-secondary">Loading your perfect matches...</p>
        </div>
    );
};

export default LoadingScreen;