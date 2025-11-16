import React from 'react';
import { Profile, WindowState, Attribute } from '../types';
import Taskbar from '../components/Taskbar';
import Win95Window from '../components/Win95Window';
import DesktopIcon from '../components/DesktopIcon';
import MatchmakerWindow from '../components/MatchmakerWindow';
import SearchWindow from '../components/SearchWindow';
import MyProfileWindow from '../components/MyProfileWindow';

interface DesktopLayoutProps {
    currentUser: Profile;
    windows: WindowState[];
    activeWindow: string;
    onOpenWindow: (id: string, title: string, component: React.ReactNode) => void;
    onCloseWindow: (id: string) => void;
    onFocusWindow: (id: string) => void;
    onLogout: () => void;
    allProfiles: Profile[];
    attributes: Attribute[];
    onSendInterest: (profileId: string) => void;
    onSelectProfile: (profile: Profile) => void;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = (props) => {
    const { currentUser, windows, activeWindow, onOpenWindow, onCloseWindow, onFocusWindow, onLogout, allProfiles, attributes, onSendInterest, onSelectProfile } = props;

    const openMatchmaker = () => {
        onOpenWindow('matchmaker', 'AI Matchmaker', <MatchmakerWindow currentUser={currentUser} allProfiles={allProfiles} attributes={attributes} onSendInterest={onSendInterest} />);
    }

    const openSearch = () => {
        onOpenWindow('search', 'Find...', <SearchWindow profiles={allProfiles} onSelectProfile={onSelectProfile} currentUser={currentUser} onShortlistProfile={() => {}} />);
    }

    const openMyProfile = () => {
        onOpenWindow('my-profile', 'My Profile', <MyProfileWindow currentUser={currentUser} attributes={attributes} />);
    }

    return (
        <div className="windows-95-desktop">
            {/* Desktop Icons */}
            <div className="p-4 space-y-4">
                <DesktopIcon icon="💾" label="My Profile" onDoubleClick={openMyProfile} />
                <DesktopIcon icon="🌐" label="Find Matches" onDoubleClick={openMatchmaker} />
                <DesktopIcon icon="🔍" label="Search" onDoubleClick={openSearch} />
            </div>

            {/* Render Windows */}
            {windows.map(win => (
                <Win95Window
                    key={win.id}
                    title={win.title}
                    onClose={() => onCloseWindow(win.id)}
                    onFocus={() => onFocusWindow(win.id)}
                    isActive={win.id === activeWindow}
                    zIndex={win.zIndex}
                >
                    {win.component}
                </Win95Window>
            ))}

            <Taskbar
                windows={windows}
                activeWindow={activeWindow}
                onFocusWindow={onFocusWindow}
                onOpenWindow={onOpenWindow}
                onLogout={onLogout}
                currentUser={currentUser}
                allProfiles={allProfiles}
                attributes={attributes}
                onSendInterest={onSendInterest}
                onSelectProfile={onSelectProfile}
            />
        </div>
    );
};

export default DesktopLayout;