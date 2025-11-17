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
            <div className="text-center p-12 text-theme-text-secondary h-full flex flex-col justify-center items-center">
                <HeartIcon className="w-12 h-12 text-theme-border mb-4"/>
                <p>No new interests yet.</p>
                <p className="text-xs">When someone sends you an interest, it will appear here.</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-3 overflow-y-auto">
            {profiles.map(profile => (
                <ProfileInterestCard 
                    key={profile.id}
                    profile={profile}
                >
                    <div className="mt-3 flex gap-2">
                        <button onClick={() => onDecline(profile.id)} className="w-full bg-theme-border text-theme-text-primary font-bold py-2 px-4 rounded-lg hover:bg-theme-border/80 transition duration-300 text-sm">
                        Decline
                        </button>
                        <button onClick={() => onAccept(profile.id)} className="w-full bg-theme-gradient text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 text-sm">
                        Accept
                        </button>
                    </div>
                </ProfileInterestCard>
            ))}
        </div>
    );
};

export default InterestsReceivedTab;