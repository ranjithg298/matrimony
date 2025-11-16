import React from 'react';
import { Profile, Attribute } from '../types';
import ProfileCompleteness from './ProfileCompleteness';
import EyeIcon from './icons/EyeIcon';
import SettingsIcon from './icons/SettingsIcon';
import HeartIcon from './icons/HeartIcon';
import StarIcon from './icons/StarIcon';
import PuzzlePieceIcon from './icons/PuzzlePieceIcon';
import MagicWandIcon from './icons/MagicWandIcon';
import BellIcon from './icons/BellIcon';

interface SidebarProps {
    currentUser: Profile;
    attributes: Attribute[];
}

const SidebarLink: React.FC<{href: string; label: string; icon: React.ReactNode}> = ({href, label, icon}) => (
    <a href={href} className="flex items-center gap-3 p-3 bg-theme-surface hover:bg-theme-border rounded-lg text-sm font-semibold transition-colors">
        {icon}
        <span>{label}</span>
    </a>
)

const Sidebar: React.FC<SidebarProps> = ({ currentUser, attributes }) => {
    return (
        <aside className="space-y-6 sticky top-24">
            <ProfileCompleteness user={currentUser} attributes={attributes} />
            <div className="space-y-2">
                <SidebarLink href="#/app/notifications" label="Notifications" icon={<BellIcon className="w-5 h-5 text-theme-text-secondary"/>} />
                <SidebarLink href="#/app/profile-viewers" label="Who Viewed My Profile" icon={<EyeIcon className="w-5 h-5 text-theme-text-secondary"/>} />
                <SidebarLink href="#/app/shortlisted" label="Shortlisted Profiles" icon={<StarIcon className="w-5 h-5 text-theme-text-secondary"/>} />
                <SidebarLink href="#/app/quizzes" label="Compatibility Quizzes" icon={<PuzzlePieceIcon className="w-5 h-5 text-theme-text-secondary"/>} />
                <SidebarLink href="#/app/preferences" label="Partner Preferences" icon={<SettingsIcon className="w-5 h-5 text-theme-text-secondary"/>} />
                <SidebarLink href="#/app/vow-generator" label="AI Vow Generator" icon={<HeartIcon className="w-5 h-5 text-theme-text-secondary"/>} />
                <SidebarLink href="#/app/ai-wedding-concierge" label="AI Wedding Concierge" icon={<MagicWandIcon className="w-5 h-5 text-theme-text-secondary"/>} />
            </div>
        </aside>
    );
};

export default Sidebar;