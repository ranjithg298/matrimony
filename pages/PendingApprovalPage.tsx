import React from 'react';
import HeartIcon from '../components/icons/HeartIcon';

interface PendingApprovalPageProps {
    onLogout: () => void;
}

const PendingApprovalPage: React.FC<PendingApprovalPageProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-primary flex items-center justify-center p-4">
      <div className="text-center bg-theme-surface p-8 sm:p-12 rounded-xl border border-theme-border max-w-lg">
         <HeartIcon className="h-16 w-16 text-theme-accent-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Thank you for registering!</h1>
        <p className="text-theme-text-secondary mb-6">
          Your profile is currently under review by our team to ensure the safety and quality of our community. This usually takes a few hours. We appreciate your patience.
        </p>
        <button
          onClick={onLogout}
          className="text-sm font-semibold text-theme-text-secondary hover:text-theme-text-primary underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
