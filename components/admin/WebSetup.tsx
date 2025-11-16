import React, { useState } from 'react';
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
    
    const handleSave = () => {
        onSave(settings);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
             {/* API Key Settings */}
            <div className="bg-theme-bg/50 p-6 rounded-lg border-2 border-dashed border-theme-border">
                <h3 className="text-xl font-semibold mb-4 text-theme-text-primary flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6 text-theme-accent-primary" /> AI Service Status (Gemini API)
                </h3>
                <div className={`p-4 rounded-lg flex items-center gap-4 ${apiKeyStatus === 'Detected' ? 'bg-green-500/10 border-l-4 border-green-500' : 'bg-red-500/10 border-l-4 border-red-500'}`}>
                    <div>
                        <p className="font-bold text-lg">Status: <span className={apiKeyStatus === 'Detected' ? 'text-green-500' : 'text-red-500'}>{apiKeyStatus}</span></p>
                         <p className="text-sm text-theme-text-secondary mt-1">
                            {apiKeyStatus === 'Detected' 
                                ? 'Your Gemini API key is configured. AI features are enabled.' 
                                : 'No API key found. AI features (chat, analysis, etc.) will not work.'
                            }
                        </p>
                    </div>
                </div>
                 <div className="mt-4 text-sm text-theme-text-secondary space-y-2">
                    <p className='font-semibold text-theme-text-primary'>How to Connect:</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-theme-accent-primary underline font-semibold">Click here to get your Free API Key from Google AI Studio.</a>
                        </li>
                        <li>Go to your website's hosting provider (e.g., Vercel, Netlify).</li>
                        <li>In your project settings, find "Environment Variables".</li>
                        <li>Add a new variable with the name <code className="font-mono bg-theme-border px-1 py-0.5 rounded">API_KEY</code>.</li>
                        <li>Paste your API key as the value and save. The app will connect automatically on the next deployment.</li>
                    </ol>
                </div>
            </div>

            {/* Backend Integration Guide */}
            <div className="bg-theme-bg/50 p-6 rounded-lg border-2 border-dashed border-theme-border">
                <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">Data & Image Backend Integration</h3>
                <p className="text-sm text-theme-text-secondary mb-4">
                    This application is currently in a "backend-ready" state. All user data, profiles, and messages are temporarily stored in your browser. The new image upload buttons convert images into a format ready for a backend. To make data permanent and enable real-time features, you will need to connect a backend service.
                </p>
                <div className="text-sm text-theme-text-secondary space-y-2">
                    <p className='font-semibold text-theme-text-primary'>Instructions for your Backend Developer:</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li><strong>Data Storage:</strong> Create API endpoints to handle user registration, login, profile updates, and messaging. Replace the functions in `App.tsx` (e.g., `handleLogin`, `handleUpdateProfile`) with `fetch` calls to your new API.</li>
                        <li><strong>Image Storage:</strong> Create an image upload endpoint. The file upload components (e.g., in `ProfilePage.tsx`) use `FileReader` to generate Base64 strings. This string should be sent to your backend, which will then decode it and save it to a cloud storage service like Amazon S3, Google Cloud Storage, or Cloudinary.</li>
                        <li><strong>Real-time Chat:</strong> For a production-level chat, implement a WebSocket server or use a service like Socket.io or Firebase Realtime Database.</li>
                    </ol>
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