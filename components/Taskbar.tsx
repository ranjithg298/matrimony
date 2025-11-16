import React, { useState } from 'react';
import { WindowState, Profile, Attribute } from '../types';
import StartMenu from './StartMenu';

interface TaskbarProps {
    windows: WindowState[];
    activeWindow: string;
    onFocusWindow: (id: string) => void;
    onOpenWindow: (id: string, title: string, component: React.ReactNode) => void;
    onLogout: () => void;
    currentUser: Profile;
    allProfiles: Profile[];
    attributes: Attribute[];
    onSendInterest: (profileId: string) => void;
    onSelectProfile: (profile: Profile) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, activeWindow, onFocusWindow, onOpenWindow, onLogout, currentUser, allProfiles, attributes, onSendInterest, onSelectProfile }) => {
    const [isStartMenuOpen, setStartMenuOpen] = useState(false);

    return (
        <div className="win95-taskbar">
            <StartMenu 
                isOpen={isStartMenuOpen}
                setIsOpen={setStartMenuOpen}
                onOpenWindow={onOpenWindow}
                onLogout={onLogout}
                currentUser={currentUser}
                allProfiles={allProfiles}
                attributes={attributes}
                onSendInterest={onSendInterest}
                onSelectProfile={onSelectProfile}
            />

            <div className="w-px h-full bg-[#808080] mx-1 border-l border-white"></div>

            {windows.map(win => (
                <button
                    key={win.id}
                    onClick={() => onFocusWindow(win.id)}
                    className={`win95-taskbar-item ${win.id === activeWindow ? 'active' : ''}`}
                >
                    {win.title}
                </button>
            ))}
        </div>
    );
};

export default Taskbar;