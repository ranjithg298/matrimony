import React from 'react';
import { Profile } from '../../types';

interface NostalgiaHeaderProps {
    currentUser: Profile;
}

const NostalgiaHeader: React.FC<NostalgiaHeaderProps> = ({ currentUser }) => {
    return (
        <header className="bg-white/10 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#/90s-hub/home" className="text-xl font-bold tracking-wider">
                    90s South Rewind
                </a>
                <nav className="flex items-center gap-6">
                    <a href="#/90s-hub/games" className="text-sm font-semibold hover:text-theme-accent-primary transition-colors">Games</a>
                    <a href="#/90s-hub/music" className="text-sm font-semibold hover:text-theme-accent-primary transition-colors">Music</a>
                    <a href="#/app/messages" className="text-sm font-semibold hover:text-theme-accent-primary transition-colors">Chat</a>
                    <a href="#/90s-hub/profile" className="text-sm font-semibold hover:text-theme-accent-primary transition-colors">Profile</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </button>
                    <a href="#/app/profile">
                        <img src={currentUser.photo} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default NostalgiaHeader;