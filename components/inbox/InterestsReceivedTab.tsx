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
        return null;
    }

    return (
        <div className="flex space-x-4 overflow-x-auto pb-2">
            {profiles.map(profile => (
                <div key={profile.id} className="w-64 flex-shrink-0">
                    <ProfileInterestCard 
                        profile={profile}
                    >
                        <div className="mt-4 flex gap-2">
                            <button onClick={() => onDecline(profile.id)} className="w-full bg-theme-border text-theme-text-primary font-bold py-2 px-4 rounded-lg hover:bg-theme-border/80 transition duration-300 text-sm">
                            Decline
                            </button>
                            <button onClick={() => onAccept(profile.id)} className="w-full bg-theme-accent-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 text-sm">
                            Accept
                            </button>
                        </div>
                    </ProfileInterestCard>
                </div>
            ))}
        </div>
    );
};

export default InterestsReceivedTab;