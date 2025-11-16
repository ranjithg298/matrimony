import React, { useRef, useEffect } from 'react';
import WinLogoIcon from './icons/WinLogoIcon';
import Win95Button from './Win95Button';
import MatchmakerWindow from './MatchmakerWindow';
import SearchWindow from './SearchWindow';
import { Attribute, Profile } from '../types';
import SnakeGame from './SnakeGame';

interface StartMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onOpenWindow: (id: string, title: string, component: React.ReactNode) => void;
    onLogout: () => void;
    currentUser: Profile;
    allProfiles: Profile[];
    attributes: Attribute[];
    onSendInterest: (profileId: string) => void;
    onSelectProfile: (profile: Profile) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, setIsOpen, onOpenWindow, onLogout, currentUser, allProfiles, attributes, onSendInterest, onSelectProfile }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setIsOpen]);

    const handleMenuClick = (action: () => void) => {
        action();
        setIsOpen(false);
    };

    return (
        <div className="win95-start-menu-container" ref={menuRef}>
            <Win95Button onClick={() => setIsOpen(!isOpen)} className={`font-bold flex items-center gap-1 ${isOpen ? 'active' : ''}`}>
                <WinLogoIcon className="h-5 w-5" />
                Start
            </Win95Button>

            {isOpen && (
                <div className="win95-start-menu">
                    <div onClick={() => handleMenuClick(() => onOpenWindow('matchmaker', 'AI Matchmaker', <MatchmakerWindow currentUser={currentUser} allProfiles={allProfiles} attributes={attributes} onSendInterest={onSendInterest} />))} className="win95-start-menu-item">
                        <span>✨</span>
                        <span>AI Matchmaker</span>
                    </div>
                     <div onClick={() => handleMenuClick(() => onOpenWindow('search', 'Find...', <SearchWindow profiles={allProfiles} onSelectProfile={onSelectProfile} currentUser={currentUser} onShortlistProfile={() => {}} />))} className="win95-start-menu-item">
                        <span>🔍</span>
                        <span>Search</span>
                    </div>
                    <div onClick={() => handleMenuClick(() => onOpenWindow('snake', 'Snake', <SnakeGame />))} className="win95-start-menu-item">
                        <span>🎮</span>
                        <span>Games</span>
                    </div>
                    <div className="h-px bg-[#808080] my-1 mx-[-2px] border-t border-white"></div>
                    <div onClick={() => handleMenuClick(onLogout)} className="win95-start-menu-item">
                         <span>🚪</span>
                        <span>Log Out</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartMenu;