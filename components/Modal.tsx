import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'red' | 'blue';
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', confirmColor = 'blue' }) => {
  if (!isOpen) return null;

  const confirmButtonColor = confirmColor === 'red' 
    ? 'bg-red-600 hover:bg-red-700' 
    : 'bg-theme-accent-primary hover:opacity-90';

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-md text-theme-text-primary border border-theme-border">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-theme-text-secondary">{message}</p>
        </div>
        <div className="bg-theme-bg/50 p-4 flex justify-end space-x-3 rounded-b-lg">
          <button onClick={onCancel} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`px-4 py-2 rounded-md text-white font-semibold ${confirmButtonColor}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;