import React, { useState } from 'react';
import { WebsiteSettings, Theme, Typography } from '../../types';

interface AppearanceSettingsProps {
    settings: WebsiteSettings;
    onSave: (settings: WebsiteSettings) => void;
}

const ThemeSwatch: React.FC<{theme: Theme, name: string, activeTheme: Theme, onClick: () => void}> = ({ theme, name, activeTheme, onClick }) => {
    const themeColors: Record<Theme, string[]> = {
        'imperial-gold': ['#FFFBF5', '#D4A056', '#8B2525', '#4F4A45'],
        'royal-purple': ['#1A1A2E', '#E94560', '#533483', '#E0E1DD'],
        'classic-blue': ['#F0F2F5', '#1877F2', '#42B72A', '#1C1E21'],
        'elegant-teal': ['#F0F7F6', '#008080', '#004D4D', '#033649'],
        'sunset-rose': ['#FFF5F7', '#D96D84', '#8C4054', '#5C232F'],
        'emerald-green': ['#F0FDF4', '#10B981', '#065F46', '#064E3B'],
        'midnight-blue': ['#111827', '#60A5FA', '#2563EB', '#F9FAFB'],
    };
    const colors = themeColors[theme];

    return (
        <div onClick={onClick} className="cursor-pointer">
            <div className={`w-full h-24 rounded-lg border-2 flex items-center justify-center ${activeTheme === theme ? 'border-theme-accent-primary' : 'border-theme-border'}`}>
                <div className="flex gap-2 p-2 bg-black/10 rounded-md">
                    {colors.map(color => (
                        <div key={color} style={{ backgroundColor: color }} className="w-8 h-12 rounded" />
                    ))}
                </div>
            </div>
            <p className="text-center text-sm mt-2 text-theme-text-primary">{name}</p>
        </div>
    )
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ settings: initialSettings, onSave }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [showSaved, setShowSaved] = useState(false);
    
    const handleSettingChange = (field: keyof WebsiteSettings, value: Theme | Typography) => {
        setSettings(prev => ({...prev, [field]: value}));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'range' ? Number(value) : value;
        setSettings(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'heroImageUrl' | 'siteBackgroundImageUrl') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettings(prev => ({ ...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave(settings);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Color Theme</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ThemeSwatch theme="imperial-gold" name="Imperial Gold" activeTheme={settings.theme} onClick={() => handleSettingChange('theme', 'imperial-gold')} />
                    <ThemeSwatch theme="royal-purple" name="Royal Purple" activeTheme={settings.theme} onClick={() => handleSettingChange('theme', 'royal-purple')} />
                    <ThemeSwatch theme="classic-blue" name="Classic Blue" activeTheme={settings.theme} onClick={() => handleSettingChange('theme', 'classic-blue')} />
                    <ThemeSwatch theme="elegant-teal" name="Elegant Teal" activeTheme={settings.theme} onClick={() => handleSettingChange('theme', 'elegant-teal')} />
                    <ThemeSwatch theme="sunset-rose" name="Sunset Rose" activeTheme={settings.theme} onClick={() => handleSettingChange('theme', 'sunset-rose')} />
                    <ThemeSwatch theme="emerald-green" name="Emerald Green" activeTheme={settings.theme} onClick={() => handleSettingChange('theme', 'emerald-green')} />
                    <ThemeSwatch theme="midnight-blue" name="Midnight Blue" activeTheme={settings.theme} onClick={() => handleSettingChange('theme', 'midnight-blue')} />
                </div>
            </div>

            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Homepage Hero</h3>
                <div>
                    <label className="text-sm text-theme-text-secondary">Background Image</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => handleFileChange(e, 'heroImageUrl')}
                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-theme-accent-primary/10 file:text-theme-accent-primary hover:file:bg-theme-accent-primary/20 mt-1" 
                    />
                </div>
                <div className="mt-4">
                    <label className="text-sm text-theme-text-secondary">Background Zoom ({settings.heroImageZoom || 100}%)</label>
                    <input 
                        type="range"
                        name="heroImageZoom" 
                        min="50" 
                        max="200" 
                        value={settings.heroImageZoom || 100}
                        onChange={handleInputChange}
                        className="w-full mt-1"
                    />
                </div>
            </div>

            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Typography</h3>
                <select value={settings.typography} onChange={e => handleSettingChange('typography', e.target.value as Typography)} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50 text-theme-text-primary">
                    <option value="classic">Classic (Serif)</option>
                    <option value="modern">Modern (Sans)</option>
                    <option value="roboto">Roboto</option>
                    <option value="merriweather">Merriweather</option>
                    <option value="nunito">Nunito</option>
                    <option value="lora">Lora</option>
                </select>
            </div>

            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Site Background Image</h3>
                <input type="file" onChange={e => handleFileChange(e, 'siteBackgroundImageUrl')} accept="image/*" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-theme-accent-primary/10 file:text-theme-accent-primary hover:file:bg-theme-accent-primary/20" />
                {settings.siteBackgroundImageUrl && (
                    <div className="mt-4">
                        <p className="text-sm text-theme-text-secondary mb-2">Current Background:</p>
                        <img src={settings.siteBackgroundImageUrl} alt="Background Preview" className="w-full h-32 object-cover rounded-md" />
                    </div>
                )}
            </div>
            
            <div className="flex justify-end items-center gap-4">
              {showSaved && <span className="text-green-400">Saved!</span>}
              <button onClick={handleSave} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                  Save Appearance
              </button>
            </div>
        </div>
    );
};

export default AppearanceSettings;