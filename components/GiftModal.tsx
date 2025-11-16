import React from 'react';
import { AVAILABLE_GIFTS } from '../constants';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendGift: (giftId: string) => void;
  recipientName: string;
}

const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose, onSendGift, recipientName }) => {
  if (!isOpen) return null;

  const handleGiftClick = (giftId: string) => {
    onSendGift(giftId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
        <div className="p-6 border-b border-theme-border flex justify-between items-center">
          <h3 className="text-xl font-bold">Send a Gift to {recipientName}</h3>
          <button onClick={onClose} className="text-theme-text-secondary hover:text-theme-text-primary text-2xl">&times;</button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {AVAILABLE_GIFTS.map(gift => (
              <button
                key={gift.id}
                onClick={() => handleGiftClick(gift.id)}
                className="p-4 bg-theme-bg/50 rounded-lg border border-theme-border hover:border-theme-accent-primary hover:bg-theme-accent-primary/10 transition-colors"
              >
                <div className="text-5xl">{gift.icon}</div>
                <p className="text-sm font-semibold mt-2">{gift.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftModal;