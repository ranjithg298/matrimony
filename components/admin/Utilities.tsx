import React, { useState } from 'react';
import { WebsiteSettings } from '../../types';

interface UtilitiesProps {
    settings: WebsiteSettings;
    onSave: (settings: WebsiteSettings) => void;
}

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


const Utilities: React.FC<UtilitiesProps> = ({ settings: initialSettings, onSave }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [showSaved, setShowSaved] = useState(false);
    
    const handleMaintenanceToggle = (enabled: boolean) => {
        setSettings(prev => ({...prev, maintenanceMode: { ...prev.maintenanceMode, enabled }}));
    };
    
    const handleMaintenanceMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const message = e.target.value;
        setSettings(prev => ({...prev, maintenanceMode: { ...prev.maintenanceMode, message }}));
    };

    const handleSave = () => {
        onSave(settings);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Maintenance Mode</h3>
                <SettingsToggle 
                    label="Enable Maintenance Mode"
                    description="When enabled, only admins can access the site. Public users will see a maintenance page."
                    enabled={settings.maintenanceMode.enabled}
                    onToggle={handleMaintenanceToggle}
                />
                <div className="mt-4">
                    <label className="block text-sm font-medium text-theme-text-secondary mb-1">Maintenance Message</label>
                    <textarea 
                        value={settings.maintenanceMode.message}
                        onChange={handleMaintenanceMessageChange}
                        rows={3}
                        className="w-full bg-theme-border p-2 rounded-md mt-1 border border-theme-border/50 text-theme-text-primary"
                    />
                </div>
            </div>
            
             <div className="flex justify-end items-center gap-4">
              {showSaved && <span className="text-green-400">Saved!</span>}
              <button onClick={handleSave} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                  Save Utilities
              </button>
            </div>
        </div>
    );
};

export default Utilities;
