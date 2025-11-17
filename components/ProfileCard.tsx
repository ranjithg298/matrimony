import React, { memo } from 'react';
import { Profile } from '../types';
import PremiumIcon from './icons/PremiumIcon';
import VerifiedIcon from './icons/VerifiedIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import StarIcon from './icons/StarIcon';
import StarSolidIcon from './icons/StarSolidIcon';

interface ProfileCardProps {
  profile: Profile;
  onSelectProfile: (profile: Profile) => void;
  currentUser: Profile;
  onShortlistProfile: (profileId: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSelectProfile, currentUser, onShortlistProfile }) => {
  const isShortlisted = currentUser.shortlisted?.includes(profile.id);

  const handleShortlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from firing
    onShortlistProfile(profile.id);
  }

  return (
    <div
      onClick={() => onSelectProfile(profile)}
      className="block bg-theme-surface rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/20"
    >
      <div className="relative h-96">
        <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src={profile.photo} alt={profile.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute top-4 left-4 flex items-center gap-2">
           {profile.distance && (
             <span className="text-white text-xs font-semibold bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">📍 {profile.distance} km away</span>
           )}
        </div>
        
        <div className="absolute top-4 right-4 flex items-center gap-2">
             {profile.compatibilityScore && (
                 <span className="font-bold text-white bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">{profile.compatibilityScore}%</span>
             )}
        </div>
        
        <div className="absolute bottom-0 left-0 p-4 w-full">
           <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        {profile.name}, {profile.age}
                    </h3>
                    <p className="text-gray-300">{profile.customFields.occupation || profile.city}</p>
                </div>
                {profile.customFields.maritalStatus === 'Never Married' && (
                     <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white flex-shrink-0">Single</span>
                )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileCard);