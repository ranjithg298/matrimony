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
      className="block bg-theme-surface rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-theme-accent-secondary/10"
    >
      <div className="relative h-80">
        <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src={profile.photo} alt={profile.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <button 
          onClick={handleShortlistClick} 
          className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition-colors"
          title={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
        >
          {isShortlisted ? <StarSolidIcon className="h-5 w-5 text-yellow-300" /> : <StarIcon className="h-5 w-5" />}
        </button>

        <div className="absolute top-3 right-3 flex items-center gap-2">
            {profile.isPremium && (
                <div className="bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <PremiumIcon className="h-4 w-4 text-yellow-300" />
                </div>
            )}
             {profile.compatibilityScore && (
                 <span className="font-bold text-lg text-white bg-theme-accent-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">{profile.compatibilityScore}%</span>
             )}
        </div>
        
        <div className="absolute bottom-0 left-0 p-4">
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
               {profile.name}, {profile.age}
               {profile.isVerified && <VerifiedIcon className="w-5 h-5 text-blue-400" title="Document Verified" />}
               {profile.isPhotoVerified && <ShieldCheckIcon className="w-5 h-5 text-green-400" title="Photo Verified" />}
            </h3>
           <p className="text-gray-300">{profile.city}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileCard);