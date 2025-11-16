import React from 'react';
import { Profile, PartnerPreferences, Attribute } from '../../types';
import CheckIcon from '../icons/CheckIcon';
import XIcon from '../icons/XIcon';

interface PartnerPreferencesTabProps {
  currentUser: Profile;
  targetPreferences?: PartnerPreferences;
  attributes: Attribute[];
}

const PreferenceItem: React.FC<{ label: string; preference: string | string[] | [number, number]; userValue: any; isMatch: boolean; }> = ({ label, preference, userValue, isMatch }) => (
    <div className="flex justify-between items-center py-3 border-b border-theme-border last:border-b-0">
        <div>
            <p className="font-semibold text-theme-text-primary">{label}</p>
            <p className="text-sm text-theme-text-secondary">Prefers: {Array.isArray(preference) ? preference.join(', ') : preference.toString()}</p>
            <p className="text-sm text-theme-text-secondary">You are: {userValue || 'N/A'}</p>
        </div>
        {isMatch ? (
            <div className="flex items-center gap-2 text-green-500 flex-shrink-0">
                <CheckIcon className="w-5 h-5" />
                <span>Match</span>
            </div>
        ) : (
             <div className="flex items-center gap-2 text-red-500 flex-shrink-0">
                <XIcon className="w-5 h-5" />
                <span>Mismatch</span>
            </div>
        )}
    </div>
);


const PartnerPreferencesTab: React.FC<PartnerPreferencesTabProps> = ({ currentUser, targetPreferences, attributes }) => {
  if (!targetPreferences) {
    return (
        <div className="bg-theme-surface p-8 rounded-xl border border-theme-border text-center text-theme-text-secondary">
            This user has not specified their partner preferences.
        </div>
    );
  }

  const checks = {
      age: currentUser.age >= targetPreferences.ageRange[0] && currentUser.age <= targetPreferences.ageRange[1],
      maritalStatus: targetPreferences.maritalStatus.includes(currentUser.customFields.maritalStatus),
      religion: targetPreferences.religion.includes(currentUser.customFields.religion),
      caste: targetPreferences.caste.length === 0 || targetPreferences.caste.some(c => (currentUser.customFields.caste || '').toLowerCase().includes(c.toLowerCase())),
      motherTongue: targetPreferences.motherTongue.includes(currentUser.customFields.motherTongue),
      occupation: targetPreferences.occupation.length === 0 || targetPreferences.occupation.includes(currentUser.customFields.occupation),
  };

  const matchPercentage = Math.round(
      (Object.values(checks).filter(Boolean).length / Object.keys(checks).length) * 100
  );
  
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (matchPercentage / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
             <div className="bg-theme-surface p-6 rounded-xl border border-theme-border text-center sticky top-24">
                 <h3 className="text-xl font-bold text-theme-text-primary mb-4">You Match</h3>
                  <div className="relative flex items-center justify-center h-40">
                    <svg className="w-40 h-40 transform -rotate-90">
                        <circle className="text-theme-border" strokeWidth="10" stroke="currentColor" fill="transparent" r="52" cx="80" cy="80" />
                        <circle className="text-theme-accent-primary" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="52" cx="80" cy="80" style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }} />
                    </svg>
                    <span className="absolute text-4xl font-bold text-theme-accent-primary">{matchPercentage}%</span>
                </div>
                <p className="text-theme-text-secondary mt-4">This score is based on how well your profile aligns with their preferences.</p>
             </div>
        </div>
        <div className="lg:col-span-2 bg-theme-surface p-6 rounded-xl border border-theme-border">
             <h2 className="text-2xl font-bold mb-4">What they're looking for...</h2>
             <div className="space-y-2">
                 <PreferenceItem label="Age" preference={`${targetPreferences.ageRange[0]} - ${targetPreferences.ageRange[1]}`} userValue={currentUser.age} isMatch={checks.age} />
                 <PreferenceItem label="Marital Status" preference={targetPreferences.maritalStatus} userValue={currentUser.customFields.maritalStatus} isMatch={checks.maritalStatus} />
                 <PreferenceItem label="Religion" preference={targetPreferences.religion} userValue={currentUser.customFields.religion} isMatch={checks.religion} />
                 <PreferenceItem label="Caste / Community" preference={targetPreferences.caste} userValue={currentUser.customFields.caste} isMatch={checks.caste} />
                 <PreferenceItem label="Mother Tongue" preference={targetPreferences.motherTongue} userValue={currentUser.customFields.motherTongue} isMatch={checks.motherTongue} />
                 <PreferenceItem label="Occupation" preference={targetPreferences.occupation} userValue={currentUser.customFields.occupation} isMatch={checks.occupation} />
             </div>
        </div>
    </div>
  );
};

export default PartnerPreferencesTab;
