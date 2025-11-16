import React from 'react';
import { Profile, PricingPlan } from '../types';
import ProfileCard from '../components/ProfileCard';
import LockClosedIcon from '../components/icons/LockClosedIcon';

interface ProfileViewersPageProps {
    currentUser: Profile;
    allProfiles: Profile[];
    onUpgradePlanRequest: (plan?: PricingPlan) => void;
    onSelectProfile: (profile: Profile) => void;
    onShortlistProfile: (profileId: string) => void;
}

const ProfileViewersPage: React.FC<ProfileViewersPageProps> = ({ currentUser, allProfiles, onUpgradePlanRequest, onSelectProfile, onShortlistProfile }) => {
    const viewerIds = currentUser.profileViewers || [];
    const viewers = viewerIds.map(id => allProfiles.find(p => p.id === id)).filter((p): p is Profile => !!p);

    const isPremium = currentUser.isPremium;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-2">Who Viewed Your Profile</h1>
                <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto">See who's been checking you out. This could be the start of something new!</p>
            </div>
            
            {!isPremium && (
                <div className="bg-theme-accent-primary/10 border-2 border-dashed border-theme-accent-primary p-8 rounded-xl text-center mb-8">
                    <LockClosedIcon className="h-12 w-12 mx-auto text-theme-accent-primary mb-4" />
                    <h2 className="text-2xl font-bold text-theme-text-primary">Unlock This Feature</h2>
                    <p className="text-theme-text-secondary mt-2 mb-4">Upgrade to a Premium Membership to see who has viewed your profile and get more insights.</p>
                    <button onClick={() => onUpgradePlanRequest()} className="bg-theme-gradient text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition duration-300">
                        Upgrade Now
                    </button>
                </div>
            )}

            {viewers.length > 0 ? (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${!isPremium ? 'blur-sm pointer-events-none' : ''}`}>
                    {viewers.map(profile => (
                        <ProfileCard 
                            key={profile.id} 
                            profile={profile}
                            onSelectProfile={onSelectProfile}
                            currentUser={currentUser}
                            onShortlistProfile={onShortlistProfile}
                        />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16">
                    <p className="text-theme-text-secondary">No one has viewed your profile yet. Make sure your profile is complete to attract more visitors!</p>
                </div>
            )}
        </div>
    );
};

export default ProfileViewersPage;