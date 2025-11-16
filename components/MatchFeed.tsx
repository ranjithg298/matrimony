import React from 'react';
import { Profile } from '../types';
import ProfileCard from './ProfileCard';

interface MatchFeedProps {
    profiles: Profile[];
    onSelectProfile: (profile: Profile) => void;
    currentUser: Profile;
    onShortlistProfile: (profileId: string) => void;
}

const MatchFeed: React.FC<MatchFeedProps> = ({ profiles, onSelectProfile, currentUser, onShortlistProfile }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {profiles.map(profile => (
        <ProfileCard 
            key={profile.id} 
            profile={profile}
            onSelectProfile={onSelectProfile}
            currentUser={currentUser}
            onShortlistProfile={onShortlistProfile}
        />
      ))}
    </div>
  );
};

export default MatchFeed;