import React, { useState } from 'react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
          alert("New passwords don't match!");
          return;
      }
      // In a real app, you would call an API
      console.log("Password change submitted");
      onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-md text-white border border-theme-border">
        <div className="p-6 border-b border-theme-border">
          <h3 className="text-xl font-bold">Change Password</h3>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-theme-text-secondary">Current Password</label>
                    <input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" 
                        required
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-theme-text-secondary">New Password</label>
                    <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border"
                        required
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-theme-text-secondary">Confirm New Password</label>
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border"
                        required
                    />
                </div>
            </div>
            <div className="bg-theme-bg/50 p-4 flex justify-end items-center rounded-b-lg gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
                Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-theme-accent-primary font-semibold hover:opacity-90">
                Update Password
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;