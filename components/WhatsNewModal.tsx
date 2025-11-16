import React from 'react';
import MagicWandIcon from './icons/MagicWandIcon';
import GiftIcon from './icons/GiftIcon';
import BellIcon from './icons/BellIcon';

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeatureHighlight: React.FC<{ icon: React.ReactNode; title: string; description: string; href: string }> = ({ icon, title, description, href }) => (
    <a href={href} onClick={(e) => { e.preventDefault(); window.location.hash = href; }} className="flex items-start gap-4 p-3 rounded-lg hover:bg-theme-border">
        <div className="flex-shrink-0 bg-theme-accent-primary/10 text-theme-accent-primary p-3 rounded-lg">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-theme-text-primary">{title}</h4>
            <p className="text-sm text-theme-text-secondary">{description}</p>
        </div>
    </a>
);

const WhatsNewModal: React.FC<WhatsNewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
        <div className="p-6 text-center border-b border-theme-border">
          <h3 className="text-2xl font-bold">🚀 What's New on matrimony.ai</h3>
          <p className="text-theme-text-secondary mt-1">We've been busy building new features to help you!</p>
        </div>
        <div className="p-6 space-y-4">
            <FeatureHighlight 
                icon={<MagicWandIcon className="w-6 h-6" />}
                title="AI Wedding Concierge"
                description="Get an instant, personalized wedding plan with budget breakdowns, vendor suggestions, and a starter checklist. (Premium)"
                href="#/app/ai-wedding-concierge"
            />
            <FeatureHighlight 
                icon={<GiftIcon className="w-6 h-6" />}
                title="Virtual Gifting"
                description="Show your interest in a more special way by sending virtual gifts directly from a user's profile. (Premium)"
                href="#/app/home"
            />
             <FeatureHighlight 
                icon={<BellIcon className="w-6 h-6" />}
                title="Notifications Center"
                description="Never miss an update! A new dedicated page to view all your profile activity, from interests to profile views."
                href="#/app/notifications"
            />
        </div>
        <div className="bg-theme-bg/50 p-4 flex justify-center rounded-b-lg">
          <button onClick={onClose} className="px-8 py-2 rounded-lg bg-theme-accent-primary text-white font-semibold hover:opacity-90">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsNewModal;