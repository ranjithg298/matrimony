import React from 'react';
import { Profile } from '../types';
import MatchFeed from '../components/MatchFeed';
import StarIcon from '../components/icons/StarIcon';

interface ShortlistedPageProps {
    currentUser: Profile;
    allProfiles: Profile[];
    onSelectProfile: (profile: Profile) => void;
    onShortlistProfile: (profileId: string) => void;
}

const ShortlistedPage: React.FC<ShortlistedPageProps> = ({ currentUser, allProfiles, onSelectProfile, onShortlistProfile }) => {
    const shortlistedIds = currentUser.shortlisted || [];
    const shortlistedProfiles = shortlistedIds
        .map(id => allProfiles.find(p => p.id === id))
        .filter((p): p is Profile => !!p);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-theme-text-primary mb-2">My Shortlisted Profiles</h1>
                <p className="text-theme-text-secondary">Here are the profiles you've saved for later. You can remove them by clicking the star again.</p>
            </div>
            
            {shortlistedProfiles.length > 0 ? (
                <MatchFeed
                    profiles={shortlistedProfiles}
                    onSelectProfile={onSelectProfile}
                    currentUser={currentUser}
                    onShortlistProfile={onShortlistProfile}
                />
            ) : (
                <div className="text-center py-16 bg-theme-surface rounded-xl border border-theme-border">
                    <StarIcon className="h-16 w-16 mx-auto text-theme-border mb-4" />
                    <h2 className="text-xl font-semibold">Your Shortlist is Empty</h2>
                    <p className="text-theme-text-secondary mt-2">Click the star icon on any profile to add them here.</p>
                </div>
            )}
        </div>
    );
};

export default ShortlistedPage;