import React, { useState } from 'react';
import { Profile, PartnerPreferences } from '../types';

const FormSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-theme-text-primary border-b border-theme-border pb-2">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);

const FormField: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => (
    <div>
        <label className="block text-sm font-medium text-theme-text-secondary mb-1">{label}</label>
        {children}
    </div>
);

interface PartnerPreferencesPageProps {
    currentUser: Profile;
    onUpdateProfile: (profile: Profile) => void;
}

const PartnerPreferencesPage: React.FC<PartnerPreferencesPageProps> = ({ currentUser, onUpdateProfile }) => {
    const [prefs, setPrefs] = useState<PartnerPreferences>(currentUser.partnerPreferences || {
        ageRange: [24, 30],
        heightRange: ["5' 4\"", "6' 0\""],
        maritalStatus: ['Never Married'],
        religion: ['Hindu'],
        caste: [],
        motherTongue: [],
        occupation: [],
        annualIncome: "Doesn't matter",
    });
    const [showSaved, setShowSaved] = useState(false);

    const handleRangeChange = (field: 'ageRange' | 'heightRange', index: 0 | 1, value: string) => {
        setPrefs(prev => {
            const newRange = [...prev[field]];
            newRange[index] = (field === 'ageRange' ? Number(value) || 0 : value) as never;
            return { ...prev, [field]: newRange };
        });
    };

    const handleMultiSelectChange = (field: 'maritalStatus', value: string) => {
        setPrefs(prev => {
            const currentValues = prev[field] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };
    
    const handleCommaSeparatedChange = (field: 'religion' | 'caste' | 'motherTongue' | 'occupation', value: string) => {
        const valuesArray = value.split(',').map(s => s.trim()).filter(Boolean);
        setPrefs(prev => ({...prev, [field]: valuesArray}));
    };
    
    const handleSingleValueChange = (field: 'annualIncome', value: string) => {
         setPrefs(prev => ({...prev, [field]: value}));
    };

    const handleSave = () => {
        onUpdateProfile({ ...currentUser, partnerPreferences: prefs });
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };
    
    const maritalStatusOptions = ['Never Married', 'Divorced', 'Widowed'];
    const incomeOptions = ["Doesn't matter", "< ₹1L", "₹1L - ₹3L", "₹3L - ₹5L", "₹5L - ₹8L", "₹8L - ₹12L", "₹12L - ₹18L", "₹18L - ₹25L", "₹25L+"];

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Partner Preferences</h1>
                <div className="flex items-center gap-4">
                    {showSaved && <span className="text-green-400">Saved!</span>}
                    <button onClick={handleSave} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90">
                        Save Preferences
                    </button>
                </div>
            </div>
            
            <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                <p className="text-theme-text-secondary mb-6">Help our AI find the best matches for you by specifying your preferences.</p>
                
                <FormSection title="Basic Details">
                     <FormField label="Age Range">
                        <div className="flex items-center gap-2">
                           <input type="number" value={prefs.ageRange[0]} onChange={e => handleRangeChange('ageRange', 0, e.target.value)} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                           <span className="text-theme-text-secondary">to</span>
                           <input type="number" value={prefs.ageRange[1]} onChange={e => handleRangeChange('ageRange', 1, e.target.value)} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </div>
                    </FormField>
                    <FormField label="Height Range">
                        <div className="flex items-center gap-2">
                           <input type="text" value={prefs.heightRange[0]} onChange={e => handleRangeChange('heightRange', 0, e.target.value)} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                           <span className="text-theme-text-secondary">to</span>
                           <input type="text" value={prefs.heightRange[1]} onChange={e => handleRangeChange('heightRange', 1, e.target.value)} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </div>
                    </FormField>
                    <div className="md:col-span-2">
                        <FormField label="Marital Status">
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                               {maritalStatusOptions.map(opt => (
                                   <label key={opt} className="flex items-center gap-2 text-sm">
                                       <input type="checkbox" checked={prefs.maritalStatus.includes(opt)} onChange={() => handleMultiSelectChange('maritalStatus', opt)} className="h-4 w-4 rounded border-gray-300 text-theme-accent-primary focus:ring-theme-accent-primary" />
                                       {opt}
                                   </label>
                               ))}
                            </div>
                        </FormField>
                    </div>
                </FormSection>

                <FormSection title="Religious & Social Background">
                     <FormField label="Religion (comma-separated)">
                        <input type="text" value={prefs.religion.join(', ')} onChange={e => handleCommaSeparatedChange('religion', e.target.value)} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                    </FormField>
                    <FormField label="Caste / Community (comma-separated)">
                        <input type="text" value={prefs.caste.join(', ')} onChange={e => handleCommaSeparatedChange('caste', e.target.value)} placeholder="e.g. Brahmin, Chettiar" className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                    </FormField>
                     <FormField label="Mother Tongue (comma-separated)">
                        <input type="text" value={prefs.motherTongue.join(', ')} onChange={e => handleCommaSeparatedChange('motherTongue', e.target.value)} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                    </FormField>
                </FormSection>
                
                <FormSection title="Education & Career">
                    <FormField label="Occupation (comma-separated)">
                        <input type="text" value={prefs.occupation.join(', ')} onChange={e => handleCommaSeparatedChange('occupation', e.target.value)} placeholder="e.g. Software Engineer, Doctor" className="w-full bg-theme-bg p-2 rounded-md border border-theme-border" />
                    </FormField>
                     <FormField label="Annual Income">
                         <select value={prefs.annualIncome} onChange={e => handleSingleValueChange('annualIncome', e.target.value)} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border">
                             {incomeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </FormField>
                </FormSection>
            </div>
        </div>
    );
};

export default PartnerPreferencesPage;