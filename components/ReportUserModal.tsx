import React, { useState } from 'react';
import { Profile } from '../types';

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportedUser: Profile;
  onReport: (reason: string) => void;
}

const ReportUserModal: React.FC<ReportUserModalProps> = ({ isOpen, onClose, reportedUser, onReport }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;
  
  const handleSubmit = () => {
      if (reason.trim()) {
          onReport(reason);
          onClose();
      }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-md text-theme-text-primary border border-theme-border">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">Report {reportedUser.name}</h3>
          <p className="text-theme-text-secondary mb-4">Please provide a reason for reporting this user. Your report is anonymous.</p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full bg-theme-bg p-2 rounded-md border border-theme-border"
            placeholder="e.g., Inappropriate photos, spamming, fake profile..."
          />
        </div>
        <div className="bg-theme-bg/50 p-4 flex justify-end space-x-3 rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={!reason.trim()} className="px-4 py-2 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportUserModal;