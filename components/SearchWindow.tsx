import React from 'react';
import { Profile } from '../types';
import AdvancedSearchPage from '../pages/AdvancedSearchPage';

interface SearchWindowProps {
    profiles: Profile[];
    onSelectProfile: (profile: Profile) => void;
    currentUser: Profile;
    onShortlistProfile: (profileId: string) => void;
}

const SearchWindow: React.FC<SearchWindowProps> = (props) => {
    return (
        <div className="bg-white h-full overflow-y-auto imperial-gold">
           <AdvancedSearchPage {...props} />
        </div>
    );
};

export default SearchWindow;