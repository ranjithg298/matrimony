import React, { useState } from 'react';

const FormField: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => (
    <div>
        <label className="text-md font-medium text-theme-text-primary mb-2 block">{label}</label>
        {children}
    </div>
);

const ThirdPartySettings = () => {
    const [showSaved, setShowSaved] = useState(false);
    
    const handleSave = () => {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="bg-theme-bg/50 p-6 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Google Login Credentials</h3>
                <div className="space-y-4">
                    <FormField label="Client ID">
                        <input type="text" placeholder="Enter Google Client ID" className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary" />
                    </FormField>
                    <FormField label="Client Secret">
                        <input type="password" placeholder="Enter Google Client Secret" className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary" />
                    </FormField>
                </div>
            </div>
             <div className="bg-theme-bg/50 p-6 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Facebook Login Credentials</h3>
                <div className="space-y-4">
                    <FormField label="App ID">
                        <input type="text" placeholder="Enter Facebook App ID" className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary" />
                    </FormField>
                    <FormField label="App Secret">
                        <input type="password" placeholder="Enter Facebook App Secret" className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary" />
                    </FormField>
                </div>
            </div>
            <div className="bg-theme-bg/50 p-6 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Twitter Login Credentials</h3>
                <div className="space-y-4">
                    <FormField label="Client ID">
                        <input type="text" placeholder="Enter Twitter Client ID" className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary" />
                    </FormField>
                    <FormField label="Client Secret">
                        <input type="password" placeholder="Enter Twitter Client Secret" className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary" />
                    </FormField>
                </div>
            </div>

            <div className="flex justify-end items-center gap-4">
              {showSaved && <span className="text-green-400">Saved!</span>}
              <button onClick={handleSave} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                  Save Third-Party Settings
              </button>
            </div>
        </div>
    );
};

export default ThirdPartySettings;
