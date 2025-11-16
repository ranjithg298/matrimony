import React, { useState } from 'react';
import { WebsiteSettings, HomepageSection } from '../../types';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import ArrowDownIcon from '../icons/ArrowDownIcon';

interface HomepageManagementProps {
    settings: WebsiteSettings;
    onSave: (settings: WebsiteSettings) => void;
}

const HomepageManagement: React.FC<HomepageManagementProps> = ({ settings: initialSettings, onSave }) => {
    const [sections, setSections] = useState<HomepageSection[]>(initialSettings.homepageSettings || []);
    const [showSaved, setShowSaved] = useState(false);

    const handleToggle = (id: HomepageSection['id']) => {
        setSections(sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    };

    const handleTitleChange = (id: HomepageSection['id'], title: string) => {
        setSections(sections.map(s => s.id === id ? { ...s, title } : s));
    };
    
    const handleMove = (index: number, direction: 'up' | 'down') => {
        const newSections = [...sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= newSections.length) {
            return;
        }

        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]]; // Swap elements
        setSections(newSections);
    };

    const handleSave = () => {
        onSave({ ...initialSettings, homepageSettings: sections });
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    return (
        <div>
            <p className="text-sm text-theme-text-secondary mb-4">
                Customize the layout of the user homepage. Drag and drop sections to reorder them, change their titles, and toggle their visibility.
            </p>
            <div className="space-y-4">
                {sections.map((section, index) => (
                    <div key={section.id} className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border flex items-center gap-4">
                        <div className="flex flex-col gap-1">
                           <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="p-1 rounded-md hover:bg-theme-border disabled:opacity-30"><ArrowUpIcon className="h-4 w-4" /></button>
                           <button onClick={() => handleMove(index, 'down')} disabled={index === sections.length - 1} className="p-1 rounded-md hover:bg-theme-border disabled:opacity-30"><ArrowDownIcon className="h-4 w-4" /></button>
                        </div>
                        <div className="flex-grow">
                             <input 
                                type="text" 
                                value={section.title} 
                                onChange={(e) => handleTitleChange(section.id, e.target.value)}
                                className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary font-semibold"
                            />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={section.enabled} onChange={() => handleToggle(section.id)} className="sr-only peer" />
                            <div className={`w-11 h-6 bg-theme-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-accent-primary`}></div>
                        </label>
                    </div>
                ))}
            </div>

             <div className="flex justify-end items-center gap-4 mt-6">
              {showSaved && <span className="text-green-400">Saved!</span>}
              <button onClick={handleSave} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                  Save Homepage Layout
              </button>
            </div>
        </div>
    );
};

export default HomepageManagement;
