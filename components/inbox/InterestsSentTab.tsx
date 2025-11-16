import React from 'react';
import { Profile } from '../../types';
import ProfileInterestCard from './ProfileInterestCard';

interface InterestsSentTabProps {
    profiles: Profile[];
}

const InterestsSentTab: React.FC<InterestsSentTabProps> = ({ profiles }) => {
    if (profiles.length === 0) {
        return (
            <div className="text-center p-12 text-theme-text-secondary">
                <p>You haven't sent any interests yet.</p>
            </div>
        );
    }
    
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map(profile => (
                <ProfileInterestCard 
                    key={profile.id}
                    profile={profile}
                >
                    <div className="mt-4">
                        <p className="text-center text-sm font-semibold text-yellow-500 bg-yellow-500/10 py-2 rounded-lg">Interest Sent - Awaiting Response</p>
                    </div>
                </ProfileInterestCard>
            ))}
        </div>
    );
};

export default InterestsSentTab;
