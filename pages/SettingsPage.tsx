import React, { useState } from 'react';
import Modal from '../components/Modal';
import ChangePasswordModal from '../components/ChangePasswordModal';

const SettingsSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="bg-theme-surface p-6 rounded-xl border border-theme-border mb-8">
        <h2 className="text-xl font-semibold mb-4 text-theme-text-primary border-b border-theme-border pb-3">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const SettingsToggle: React.FC<{label: string, description: string, enabled: boolean, onToggle: (enabled: boolean) => void}> = ({label, description, enabled, onToggle}) => (
    <div className="flex items-center justify-between">
        <div>
            <h3 className="text-md font-medium text-theme-text-primary">{label}</h3>
            <p className="text-sm text-theme-text-secondary">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} className="sr-only peer" />
            <div className={`w-11 h-6 bg-theme-border rounded-full peer peer-focus:ring-4 peer-focus:ring-orange-300/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-accent-primary`}></div>
        </label>
    </div>
);

const SettingsPage: React.FC = () => {
    const [settings, setSettings] = useState({
        newMessage: true,
        newInterest: true,
        newMatch: false,
        showToFree: true,
        shareAstro: true,
    });
    const [isDeactivateModalOpen, setDeactivateModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

    const handleToggle = (key: keyof typeof settings) => (enabled: boolean) => {
        setSettings(prev => ({...prev, [key]: enabled}));
    };
    
    const handleDeactivate = () => {
        // In a real app, this would call an API
        console.log("Deactivating account...");
        setDeactivateModalOpen(false);
    }

  return (
    <>
    <div className="p-4 sm:p-6 lg:p-8 text-theme-text-primary max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <SettingsSection title="Account">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-md font-medium text-theme-text-primary">Email Address</h3>
                <p className="text-sm text-theme-text-secondary">admin@matrimony.ai</p>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-md font-medium text-theme-text-primary">Password</h3>
                <p className="text-sm text-theme-text-secondary">••••••••••••</p>
            </div>
            <button onClick={() => setChangePasswordModalOpen(true)} className="text-sm bg-theme-bg hover:bg-theme-border text-theme-text-primary font-semibold py-1 px-3 rounded-md border border-theme-border">Change</button>
        </div>
      </SettingsSection>
      
      <SettingsSection title="Notifications">
          <SettingsToggle label="New Message" description="Notify me when I receive a new message" enabled={settings.newMessage} onToggle={handleToggle('newMessage')} />
          <SettingsToggle label="New Interest" description="Notify me when someone sends me an interest" enabled={settings.newInterest} onToggle={handleToggle('newInterest')} />
          <SettingsToggle label="New Match" description="Notify me about new AI-recommended matches" enabled={settings.newMatch} onToggle={handleToggle('newMatch')} />
      </SettingsSection>
      
       <SettingsSection title="Privacy">
          <SettingsToggle label="Show Profile to Free Members" description="Allow non-premium members to see your full profile" enabled={settings.showToFree} onToggle={handleToggle('showToFree')} />
          <SettingsToggle label="Share Astrological Details" description="Allow others to see your Rasi and Nakshatra" enabled={settings.shareAstro} onToggle={handleToggle('shareAstro')} />
      </SettingsSection>
      
      <SettingsSection title="Data & Privacy">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-md font-medium text-theme-text-primary">Deactivate Account</h3>
                <p className="text-sm text-theme-text-secondary">This will permanently delete your account and data.</p>
            </div>
            <button onClick={() => setDeactivateModalOpen(true)} className="text-sm bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md">Deactivate</button>
        </div>
      </SettingsSection>
      
      <Modal 
        isOpen={isDeactivateModalOpen}
        title="Deactivate Account"
        message="Are you sure you want to deactivate your account? This action is permanent and cannot be undone."
        onConfirm={handleDeactivate}
        onCancel={() => setDeactivateModalOpen(false)}
        confirmText="Deactivate"
        confirmColor="red"
      />
    </div>
    
    <ChangePasswordModal 
        isOpen={isChangePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
    />
    </>
  );
};

export default SettingsPage;