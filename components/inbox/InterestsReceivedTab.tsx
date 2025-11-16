import React from 'react';
import { Profile } from '../../types';
import ProfileInterestCard from './ProfileInterestCard';
import HeartIcon from '../icons/HeartIcon';

interface InterestsReceivedTabProps {
    profiles: Profile[];
    onAccept: (profileId: string) => void;
    onDecline: (profileId: string) => void;
}

const InterestsReceivedTab: React.FC<InterestsReceivedTabProps> = ({ profiles, onAccept, onDecline }) => {
    if (profiles.length === 0) {
        return (
            <div className="text-center p-12 text-theme-text-secondary">
                <HeartIcon className="h-12 w-12 mx-auto mb-2 text-theme-border" />
                <p>No new interests received yet.</p>
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
                    <div className="mt-4 flex gap-2">
                        <button onClick={() => onDecline(profile.id)} className="w-full bg-theme-border text-theme-text-primary font-bold py-2 px-4 rounded-lg hover:bg-theme-border/80 transition duration-300">
                           Decline
                        </button>
                        <button onClick={() => onAccept(profile.id)} className="w-full bg-theme-accent-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300">
                           Accept
                        </button>
                    </div>
                </ProfileInterestCard>
            ))}
        </div>
    );
};

export default InterestsReceivedTab;
