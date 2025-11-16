import React from 'react';
import { Profile, Attribute } from '../types';
import ProfileCompleteness from '../components/ProfileCompleteness';
import EyeIcon from '../components/icons/EyeIcon';

interface UserDashboardProps {
    currentUser: Profile;
    allProfiles: Profile[];
    attributes: Attribute[];
}

const InfoCard: React.FC<{title: string; value: number | string; label: string}> = ({title, value, label}) => (
    <div className="bg-theme-surface p-4 rounded-lg border border-theme-border">
        <p className="text-sm text-theme-text-secondary">{title}</p>
        <p className="text-3xl font-bold text-theme-text-primary">{value}</p>
        <p className="text-xs text-theme-text-secondary">{label}</p>
    </div>
);

const ActionCard: React.FC<{title: string, description: string, href: string, icon: React.ReactNode}> = ({ title, description, href, icon }) => (
    <a href={href} className="block bg-theme-surface p-6 rounded-xl border border-theme-border hover:border-theme-accent-primary hover:shadow-lg transition-all">
        <div className="flex items-center gap-4 mb-2">
            <div className="bg-theme-accent-primary/10 text-theme-accent-primary p-2 rounded-lg">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-theme-text-primary">{title}</h3>
        </div>
        <p className="text-sm text-theme-text-secondary">{description}</p>
    </a>
);


const UserDashboard: React.FC<UserDashboardProps> = ({ currentUser, allProfiles, attributes }) => {
    
    const interestsReceived = (currentUser.interestsReceived || []).length;
    const profileViewers = (currentUser.profileViewers || []).length;

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
            <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser.name}!</h1>
            <p className="text-theme-text-secondary mb-8">Here's a summary of your activity and tools to help you find your match.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InfoCard title="Interests Received" value={interestsReceived} label="People interested in you" />
                <a href="#/app/profile-viewers" className="hover:shadow-lg rounded-lg transition-shadow">
                    <InfoCard title="Profiles Viewed" value={profileViewers} label="People who viewed your profile" />
                </a>
                <InfoCard title="AI Matches Today" value={8} label="Based on your preferences" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ActionCard 
                        title="Who Viewed My Profile"
                        description="See a list of members who have shown interest by viewing your profile."
                        href="#/app/profile-viewers"
                        icon={<EyeIcon className="w-6 h-6" />}
                    />
                    <ActionCard 
                        title="My Wedding Planner"
                        description="Manage your guest list, budget, and checklist all in one place. Your complete wedding planning toolkit."
                        href="#/app/wedding-planner"
                        icon={<span>📅</span>}
                    />
                    <ActionCard 
                        title="Today's AI Matches"
                        description="Discover highly compatible profiles selected just for you by our advanced AI."
                        href="#/app/home"
                        icon={<span>✨</span>}
                    />
                     <ActionCard 
                        title="AI Vow Generator"
                        description="Need inspiration for your wedding vows? Let our AI help you craft the perfect words."
                        href="#/app/vow-generator" // This page needs to be created
                        icon={<span>💖</span>}
                    />
                </div>
                 <div className="lg:col-span-1">
                    <ProfileCompleteness user={currentUser} attributes={attributes} />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;