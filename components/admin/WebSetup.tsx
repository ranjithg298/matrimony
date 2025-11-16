

import React, { useState, useRef } from 'react';
import { WebsiteSettings, HeaderLink, SocialLink } from '../../types';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import SparklesIcon from '../icons/SparklesIcon';

interface WebSetupProps {
    settings: WebsiteSettings;
    onSave: (settings: WebsiteSettings) => void;
}

const WebSetup: React.FC<WebSetupProps> = ({ settings: initialSettings, onSave }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [showSaved, setShowSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const apiKeyStatus = process.env.API_KEY ? 'Detected' : 'Not Detected';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setSettings({ ...settings, [name]: checked });
        } else {
            setSettings({ ...settings, [name]: value });
        }
    };

    const handleLinkChange = (id: string, field: 'text' | 'url', value: string, type: 'header' | 'social') => {
        const links = type === 'header' ? 'headerLinks' : 'socialLinks';
        setSettings(prev => ({
            ...prev,
            [links]: prev[links].map(link => link.id === id ? { ...link, [field]: value } : link)
        }));
    };
    
    const handleSocialPlatformChange = (id: string, value: SocialLink['platform']) => {
         setSettings(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map(link => link.id === id ? { ...link, platform: value } : link)
        }));
    };

    const addLink = (type: 'header' | 'social') => {
        const links = type === 'header' ? 'headerLinks' : 'socialLinks';
        const newLink = type === 'header' 
            ? { id: `l${Date.now()}`, text: 'New Link', url: '#' }
            : { id: `s${Date.now()}`, platform: 'Facebook', url: '' };
        
        setSettings(prev => ({ ...prev, [links]: [...prev[links], newLink] }));
    };

    const removeLink = (id: string, type: 'header' | 'social') => {
        const links = type === 'header' ? 'headerLinks' : 'socialLinks';
        setSettings(prev => ({ ...prev, [links]: prev[links].filter(link => link.id !== id) }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettings({ ...settings, logoUrl: reader.result as string });
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
             {/* API Key Settings */}
            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-2 text-theme-text-primary flex items-center gap-2">
                    <SparklesIcon className="h-5 w-5 text-theme-accent-primary" /> AI Service (Gemini API)
                </h3>
                <div className={`p-3 rounded-md flex items-center gap-4 ${apiKeyStatus === 'Detected' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${apiKeyStatus === 'Detected' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {apiKeyStatus}
                    </span>
                    <p className="text-sm text-theme-text-secondary">
                        {apiKeyStatus === 'Detected' 
                            ? 'Your Gemini API key is configured. AI features should be functional.' 
                            : 'No API key found. AI features like chat replies and compatibility analysis will not work.'
                        }
                    </p>
                </div>
                 <div className="mt-3 text-xs text-theme-text-secondary space-y-1">
                    <p>
                        To enable AI features, you must add your Google Gemini API key as an environment variable named <code className="font-mono bg-theme-border px-1 py-0.5 rounded">API_KEY</code> in your hosting provider's settings (e.g., Vercel, Netlify).
                    </p>
                    <p>
                        This application is built to read the key securely from the environment and does not store it anywhere else.
                    </p>
                </div>
            </div>

            {/* Header Settings */}
            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Header Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-sm text-theme-text-secondary">Website Name</label>
                        <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50 text-theme-text-primary" />
                    </div>
                     <div>
                        <label className="text-sm text-theme-text-secondary">Slogan / Tagline</label>
                        <input type="text" name="slogan" value={settings.slogan} onChange={handleChange} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50 text-theme-text-primary" />
                    </div>
                </div>
                 <div className="flex items-center gap-4 mb-4">
                    <label className="text-sm text-theme-text-secondary">Website Logo</label>
                    <img src={settings.logoUrl} alt="logo" className="h-12 w-12 bg-white p-1 rounded-md object-contain" />
                    <input type="file" ref={fileInputRef} onChange={handleLogoChange} accept="image/*" className="hidden"/>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-theme-border text-white px-3 py-1 text-sm rounded-lg font-semibold hover:bg-theme-border/80">
                        Upload
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="stickyHeader" id="stickyHeader" checked={settings.stickyHeader} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-theme-accent-primary focus:ring-theme-accent-primary" />
                    <label htmlFor="stickyHeader" className="text-sm text-theme-text-primary">Enable Sticky Header</label>
                </div>
                <div className="mt-4">
                    <h4 className="text-md font-semibold text-theme-text-primary mb-2">Header Quick Links</h4>
                    <div className="space-y-2">
                        {settings.headerLinks.map(link => (
                            <div key={link.id} className="flex items-center gap-2">
                                <input type="text" placeholder="Link Text" value={link.text} onChange={e => handleLinkChange(link.id, 'text', e.target.value, 'header')} className="w-1/2 bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary text-sm" />
                                <input type="text" placeholder="URL" value={link.url} onChange={e => handleLinkChange(link.id, 'url', e.target.value, 'header')} className="w-1/2 bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary text-sm" />
                                <button onClick={() => removeLink(link.id, 'header')} className="text-red-500 hover:text-red-400 p-1"><TrashIcon className="h-4 w-4" /></button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addLink('header')} className="text-sm flex items-center gap-1 mt-2 text-theme-accent-primary hover:underline">
                        <PlusIcon className="h-4 w-4" /> Add Link
                    </button>
                </div>
            </div>

            {/* Contact & Footer Settings */}
            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Contact & Footer Settings</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-sm text-theme-text-secondary">Primary Phone</label>
                        <input type="text" name="contactPhonePrimary" value={settings.contactPhonePrimary} onChange={handleChange} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50 text-theme-text-primary" />
                    </div>
                     <div className="md:col-span-2">
                        <label className="text-sm text-theme-text-secondary">Contact Email</label>
                        <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50 text-theme-text-primary" />
                    </div>
                     <div className="md:col-span-2">
                        <label className="text-sm text-theme-text-secondary">Address</label>
                        <textarea name="address" value={settings.address} onChange={handleChange} rows={3} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50 text-theme-text-primary" />
                    </div>
                </div>
                <div>
                    <label className="text-sm text-theme-text-secondary">Footer Content</label>
                    <textarea name="footerContent" value={settings.footerContent} onChange={handleChange} rows={3} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50 text-theme-text-primary" />
                </div>
                 <div className="mt-2">
                    <label className="text-sm text-theme-text-secondary">Copyright Text</label>
                    <input type="text" name="copyrightText" value={settings.copyrightText} onChange={handleChange} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50 text-theme-text-primary" />
                </div>
                <div className="mt-4">
                    <h4 className="text-md font-semibold text-theme-text-primary mb-2">Social Media Links</h4>
                    <div className="space-y-2">
                         {settings.socialLinks.map(link => (
                            <div key={link.id} className="flex items-center gap-2">
                                <select value={link.platform} onChange={e => handleSocialPlatformChange(link.id, e.target.value as SocialLink['platform'])} className="bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary text-sm">
                                    <option>Facebook</option>
                                    <option>Twitter</option>
                                    <option>Instagram</option>
                                    <option>LinkedIn</option>
                                </select>
                                <input type="text" placeholder="Full URL" value={link.url} onChange={e => handleLinkChange(link.id, 'url', e.target.value, 'social')} className="flex-grow bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary text-sm" />
                                <button onClick={() => removeLink(link.id, 'social')} className="text-red-500 hover:text-red-400 p-1"><TrashIcon className="h-4 w-4" /></button>
                            </div>
                        ))}
                    </div>
                     <button onClick={() => addLink('social')} className="text-sm flex items-center gap-1 mt-2 text-theme-accent-primary hover:underline">
                        <PlusIcon className="h-4 w-4" /> Add Social Link
                    </button>
                </div>
            </div>


            <div className="flex justify-end items-center gap-4">
              {showSaved && <span className="text-green-400">Saved!</span>}
              <button onClick={handleSave} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                  Save Changes
              </button>
            </div>
        </div>
    );
};

export default WebSetup;