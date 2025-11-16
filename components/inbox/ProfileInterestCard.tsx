import React from 'react';
import { Profile } from '../../types';
import VerifiedIcon from '../icons/VerifiedIcon';
import PremiumIcon from '../icons/PremiumIcon';

interface ProfileInterestCardProps {
    profile: Profile;
    children?: React.ReactNode;
}

const ProfileInterestCard: React.FC<ProfileInterestCardProps> = ({ profile, children }) => {
    return (
        <div className="bg-theme-bg/50 border border-theme-border rounded-lg p-4 flex flex-col">
            <div className="flex items-center gap-3">
                <img src={profile.photo} alt={profile.name} className="w-16 h-16 rounded-full object-cover"/>
                <div>
                    <h3 className="font-bold text-lg flex items-center gap-1">
                        {profile.name}
                        {profile.isVerified && <VerifiedIcon className="w-4 h-4 text-blue-400" />}
                        {profile.isPremium && <PremiumIcon className="w-4 h-4 text-yellow-400" />}
                    </h3>
                    <p className="text-sm text-theme-text-secondary">{profile.age}, {profile.city}</p>
                </div>
            </div>
            <p className="text-sm text-theme-text-secondary mt-3 line-clamp-2 flex-grow">{profile.bio}</p>
            {children}
        </div>
    );
};

export default ProfileInterestCard;
