import React, { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  onClose: () => void;
  onUndo?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, onClose, onUndo }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-auto max-w-lg flex items-center justify-between gap-4 p-4 rounded-lg shadow-2xl bg-theme-surface backdrop-blur-md border border-theme-border z-50 animate-fade-in-up"
      role="alert"
      aria-live="assertive"
    >
      <span className="text-theme-text-primary text-sm">{message}</span>
      <div className="flex items-center gap-4 flex-shrink-0">
        {onUndo && (
          <button
            onClick={onUndo}
            className="text-sm font-semibold text-theme-accent-light hover:underline"
          >
            Undo
          </button>
        )}
        <button onClick={onClose} className="text-theme-text-secondary hover:text-theme-text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Snackbar;