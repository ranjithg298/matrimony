import React from 'react';

interface PhotoAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  analysisResult: string;
  isLoading: boolean;
}

const AILoadingIndicator: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-theme-border rounded w-1/3"></div>
        <div className="h-16 bg-theme-bg rounded"></div>
        <div className="space-y-2">
            <div className="h-4 bg-theme-bg rounded"></div>
            <div className="h-4 bg-theme-bg rounded w-5/6"></div>
        </div>
    </div>
);

const PhotoAnalysisModal: React.FC<PhotoAnalysisModalProps> = ({ isOpen, onClose, photoUrl, analysisResult, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
        <div className="p-6 border-b border-theme-border flex justify-between items-center">
          <h3 className="text-xl font-bold">AI Photo Analysis</h3>
          <button onClick={onClose} className="text-theme-text-secondary hover:text-theme-text-primary text-2xl">&times;</button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <img src={photoUrl} alt="Analyzed" className="w-full h-64 object-cover rounded-md mb-4" />
          {isLoading ? (
            <AILoadingIndicator />
          ) : (
            <div className="whitespace-pre-wrap text-sm text-theme-text-secondary">
                {analysisResult}
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

export default PhotoAnalysisModal;
