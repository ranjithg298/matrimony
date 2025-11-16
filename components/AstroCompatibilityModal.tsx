import React from 'react';
import { Profile } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface AstroCompatibilityModalProps {
  isOpen: boolean;
  isLoading: boolean;
  report: string | null;
  user: Profile | null;
  onClose: () => void;
}

const AILoadingIndicator: React.FC = () => (
    <div className="space-y-4 animate-pulse p-6">
        <div className="h-4 bg-theme-border rounded w-1/3"></div>
        <div className="h-16 bg-theme-bg rounded"></div>
        <div className="space-y-2">
            <div className="h-4 bg-theme-bg rounded"></div>
            <div className="h-4 bg-theme-bg rounded w-5/6"></div>
            <div className="h-4 bg-theme-bg rounded w-4/6"></div>
        </div>
    </div>
);

const AstroCompatibilityModal: React.FC<AstroCompatibilityModalProps> = ({ isOpen, isLoading, report, user, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
        <div className="p-6 border-b border-theme-border flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6 text-theme-accent-primary" />
                    AI Astrological Compatibility
                </h3>
                <p className="text-theme-text-secondary text-sm mt-1">Report for you and {user.name}</p>
            </div>
            <button onClick={onClose} className="text-theme-text-secondary hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto">
            {isLoading && <AILoadingIndicator />}
            {!isLoading && report && (
                <div className="p-6 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {report}
                </div>
            )}
             {!isLoading && !report && (
                <div className="p-6 text-center text-theme-text-secondary">
                    <p>Something went wrong. Could not load the report.</p>
                </div>
             )}
        </div>

        <div className="bg-theme-bg/50 p-4 flex justify-end rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstroCompatibilityModal;
