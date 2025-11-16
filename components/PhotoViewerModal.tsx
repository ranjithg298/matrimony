import React from 'react';

interface PhotoViewerModalProps {
  imageUrl: string;
  onClose: () => void;
}

const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4" 
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh]"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking on the image
      >
        <img src={imageUrl} alt="Full size view" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 text-white bg-black/50 rounded-full h-8 w-8 flex items-center justify-center text-2xl hover:bg-black/80"
          aria-label="Close image viewer"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PhotoViewerModal;