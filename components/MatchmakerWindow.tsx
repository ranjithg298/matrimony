import React from 'react';
import { Profile, Attribute } from '../types';
import MatchmakerPanel from './MatchmakerPanel';

// This is a wrapper component to pass props to MatchmakerPanel when used in a window
interface MatchmakerWindowProps {
    currentUser: Profile;
    allProfiles: Profile[];
    attributes: Attribute[];
    onSendInterest: (profileId: string) => void;
}

const MatchmakerWindow: React.FC<MatchmakerWindowProps> = (props) => {
    return (
        <div className="bg-white h-full overflow-y-auto imperial-gold">
           <MatchmakerPanel {...props} />
        </div>
    );
};

export default MatchmakerWindow;