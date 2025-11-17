import React, { useState } from 'react';
import Modal from '../components/Modal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';

interface SettingsItemProps {
    title: string;
    description?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ title, description, onClick, children }) => (
    <button 
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-theme-border/50 transition-colors"
        disabled={!onClick}
    >
        <div>
            <h3 className="font-semibold text-theme-text-primary">{title}</h3>
            {description && <p className="text-sm text-theme-text-secondary">{description}</p>}
        </div>
        {children ? children : (onClick && <ChevronRightIcon className="h-5 w-5 text-theme-text-secondary" />)}
    </button>
);


const SettingsToggle: React.FC<{enabled: boolean, onToggle: (enabled: boolean) => void}> = ({ enabled, onToggle }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} className="sr-only peer" />
        <div className={`w-11 h-6 bg-theme-border rounded-full peer peer-focus:ring-4 peer-focus:ring-theme-accent-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-accent-primary`}></div>
    </label>
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
    <div className="p-4 sm:p-6 lg:p-8 text-theme-text-primary max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>
      
      <div className="bg-theme-surface rounded-xl border border-theme-border divide-y divide-theme-border mb-8">
        <SettingsItem title="Email Address" description="admin@matrimony.ai" />
        <SettingsItem title="Change Password" onClick={() => setChangePasswordModalOpen(true)} />
      </div>

       <div className="bg-theme-surface rounded-xl border border-theme-border divide-y divide-theme-border mb-8">
        <SettingsItem title="New Message Notifications">
            <SettingsToggle enabled={settings.newMessage} onToggle={handleToggle('newMessage')} />
        </SettingsItem>
        <SettingsItem title="New Interest Notifications">
            <SettingsToggle enabled={settings.newInterest} onToggle={handleToggle('newInterest')} />
        </SettingsItem>
         <SettingsItem title="New Match Notifications">
            <SettingsToggle enabled={settings.newMatch} onToggle={handleToggle('newMatch')} />
        </SettingsItem>
      </div>

       <div className="bg-theme-surface rounded-xl border border-theme-border divide-y divide-theme-border mb-8">
        <SettingsItem title="Help & Support" />
        <SettingsItem title="Contact Us" />
        <SettingsItem title="Privacy Policy" />
        <SettingsItem title="Terms of Service" />
      </div>
      
      <div className="text-center">
        <button onClick={() => setDeactivateModalOpen(true)} className="text-sm font-semibold text-red-500 hover:underline">Deactivate Account</button>
      </div>
      
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