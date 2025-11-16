import React from 'react';
import { Profile, Attribute } from '../types';
import MatchmakerPanel from '../components/MatchmakerPanel';
import MatchFeed from '../components/MatchFeed';

interface HomePageProps {
    profiles: Profile[];
    currentUser: Profile;
    onSelectProfile: (profile: Profile) => void;
    onShortlistProfile: (profileId: string) => void;
    attributes: Attribute[];
    onSendInterest: (profileId: string) => void;
}

const HomePage: React.FC<HomePageProps> = (props) => {
    const { profiles, currentUser, onSelectProfile, onShortlistProfile, attributes, onSendInterest } = props;
    
    // Don't show the current user in their own feed, only show approved users
    const displayProfiles = profiles.filter(p => p.id !== currentUser.id && p.role === 'user' && p.approvalStatus === 'approved');

    return (
        <div className="space-y-8">
            <MatchmakerPanel 
                currentUser={currentUser}
                allProfiles={profiles}
                attributes={attributes}
                onSendInterest={onSendInterest}
            />
            
            <div>
                <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
                <MatchFeed 
                    profiles={displayProfiles}
                    onSelectProfile={onSelectProfile}
                    currentUser={currentUser}
                    onShortlistProfile={onShortlistProfile}
                />
            </div>
        </div>
    );
};

export default HomePage;