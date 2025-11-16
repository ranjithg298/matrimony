import React, { useState } from 'react';

const SmtpSettings = () => {
    const [showSaved, setShowSaved] = useState(false);
    
    const handleSave = () => {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-theme-text-secondary">Mail Driver</label>
                    <input type="text" defaultValue="smtp" className="w-full bg-theme-border p-2 rounded-md mt-1 border border-theme-border/50 text-theme-text-primary" />
                </div>
                 <div>
                    <label className="text-sm text-theme-text-secondary">Mail Host</label>
                    <input type="text" placeholder="smtp.mailgun.org" className="w-full bg-theme-border p-2 rounded-md mt-1 border border-theme-border/50 text-theme-text-primary" />
                </div>
                 <div>
                    <label className="text-sm text-theme-text-secondary">Mail Port</label>
                    <input type="text" placeholder="587" className="w-full bg-theme-border p-2 rounded-md mt-1 border border-theme-border/50 text-theme-text-primary" />
                </div>
                <div>
                    <label className="text-sm text-theme-text-secondary">Mail Username</label>
                    <input type="text" placeholder="your_username" className="w-full bg-theme-border p-2 rounded-md mt-1 border border-theme-border/50 text-theme-text-primary" />
                </div>
                <div>
                    <label className="text-sm text-theme-text-secondary">Mail Password</label>
                    <input type="password" placeholder="your_password" className="w-full bg-theme-border p-2 rounded-md mt-1 border border-theme-border/50 text-theme-text-primary" />
                </div>
                 <div>
                    <label className="text-sm text-theme-text-secondary">Mail Encryption</label>
                    <input type="text" placeholder="TLS" className="w-full bg-theme-border p-2 rounded-md mt-1 border border-theme-border/50 text-theme-text-primary" />
                </div>
                 <div className="md:col-span-2">
                    <label className="text-sm text-theme-text-secondary">Mail From Address</label>
                    <input type="email" placeholder="noreply@example.com" className="w-full bg-theme-border p-2 rounded-md mt-1 border border-theme-border/50 text-theme-text-primary" />
                </div>
            </div>
            <div className="flex justify-end items-center gap-4 mt-6">
                {showSaved && <span className="text-green-400">Saved!</span>}
                <button onClick={handleSave} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                    Save SMTP Settings
                </button>
            </div>
        </div>
    );
};

export default SmtpSettings;
