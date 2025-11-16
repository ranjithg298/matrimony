import React from 'react';
import { Profile, Attribute } from '../types';

interface ProfileCompletenessProps {
  user: Profile;
  attributes: Attribute[];
}

const ProfileCompleteness: React.FC<ProfileCompletenessProps> = ({ user, attributes }) => {
  const calculateCompleteness = () => {
    let score = 0;
    // Core attributes are required for base completeness
    const coreAttributes = attributes.filter(attr => attr.isCore);
    const nonCoreAttributes = attributes.filter(attr => !attr.isCore);

    let total = 3 + coreAttributes.length + nonCoreAttributes.length; // Base: bio, interests, gallery

    if (user.bio && user.bio.length > 50) score++;
    if (user.interests && user.interests.length >= 3) score++;
    if (user.gallery && user.gallery.filter(g => g.status === 'approved').length >= 2) score++;
    
    coreAttributes.forEach(attr => {
        if (user.customFields[attr.id]) {
            score++;
        }
    });

    nonCoreAttributes.forEach(attr => {
      if (user.customFields[attr.id]) {
        score++;
      }
    });
    
    // Clamp score to total
    score = Math.min(score, total);

    return total > 0 ? Math.round((score / total) * 100) : 100;
  };

  const completeness = calculateCompleteness();
  const circumference = 2 * Math.PI * 52; // 2 * pi * r
  const strokeDashoffset = circumference - (completeness / 100) * circumference;

  const getProgressBarColor = () => {
    if (completeness < 40) return 'text-red-500';
    if (completeness < 75) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  const getSuggestions = () => {
      const suggestions = [];
      if (!user.bio || user.bio.length < 50) suggestions.push('Write a more detailed bio.');
      if (!user.interests || user.interests.length < 3) suggestions.push('Add at least 3 interests.');
      if (!user.gallery || user.gallery.filter(g => g.status === 'approved').length < 2) suggestions.push('Upload at least 2 photos to your gallery.');
      
      const missingCore = attributes.find(attr => attr.isCore && !user.customFields[attr.id]);
      if(missingCore) suggestions.push(`Add your ${missingCore.label}.`);
      
      const missingNonCore = attributes.find(attr => !attr.isCore && !user.customFields[attr.id]);
      if(missingNonCore && suggestions.length < 3) suggestions.push(`Add your ${missingNonCore.label}.`);

      return suggestions.slice(0, 3);
  }

  const suggestions = getSuggestions();

  return (
    <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
      <h3 className="text-xl font-bold text-theme-text-primary mb-4">Profile Completeness</h3>
      <div className="relative flex items-center justify-center h-40">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            className="text-theme-border"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="52"
            cx="80"
            cy="80"
          />
          <circle
            className={getProgressBarColor()}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="52"
            cx="80"
            cy="80"
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        <span className={`absolute text-4xl font-bold ${getProgressBarColor()}`}>{completeness}%</span>
      </div>
      <div className="text-center mt-4">
        <p className="text-theme-text-secondary">Complete your profile to get better matches.</p>
      </div>
      {suggestions.length > 0 && (
          <div className="mt-6 border-t border-theme-border pt-4">
            <h4 className="font-semibold text-theme-text-primary mb-2">How to improve:</h4>
            <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-theme-text-secondary">
                        <a href="#/app/profile" className="flex items-center gap-2 hover:text-theme-accent-primary">
                             <span className="w-1.5 h-1.5 bg-theme-accent-primary rounded-full flex-shrink-0"></span>
                            <span>{suggestion}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCompleteness;
