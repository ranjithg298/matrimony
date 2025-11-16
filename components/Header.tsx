import React, { useState, useRef, useEffect } from 'react';
import { Profile, View, WebsiteSettings, Theme, Page, Notification } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import NotificationBell from './NotificationBell';

interface HeaderProps {
  currentUser: Profile;
  currentView: View;
  onLogout: () => void;
  settings: WebsiteSettings;
  pages: Page[];
  notifications: Notification[];
  onUpdateWebsiteSettings: (settings: WebsiteSettings) => void;
}

const NavItem: React.FC<{ label: string; active?: boolean; href: string; }> = ({ label, active, href }) => (
    <a href={href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${active ? 'text-theme-accent-primary' : 'text-theme-text-secondary hover:text-theme-text-primary'}`}>
        {label}
    </a>
);

const ThemeSwatch: React.FC<{theme: Theme, activeTheme: Theme, onClick: () => void}> = ({ theme, activeTheme, onClick }) => {
    const colors: Record<Theme, string> = {
        'imperial-gold': 'bg-[#D4A056]',
        'royal-purple': 'bg-[#533483]',
        'classic-blue': 'bg-[#1877F2]',
        'elegant-teal': 'bg-[#008080]',
        'sunset-rose': 'bg-[#D96D84]',
        'emerald-green': 'bg-[#10B981]',
        'midnight-blue': 'bg-[#60A5FA]',
    };

    return (
        <button onClick={onClick} title={theme} className={`w-6 h-6 rounded-full ${colors[theme]} ${activeTheme === theme ? 'ring-2 ring-offset-2 ring-offset-theme-surface ring-theme-accent-primary' : ''}`}></button>
    )
}

const Header: React.FC<HeaderProps> = ({ currentUser, currentView, onLogout, settings, pages, notifications, onUpdateWebsiteSettings }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleThemeChange = (theme: Theme) => {
      onUpdateWebsiteSettings({ ...settings, theme });
  }

  const visiblePages = pages.filter(p => p.status === 'published' && p.isVisibleInMenu);

  const mainNavLinks = [
      { label: 'Home', href: '#/app/home', view: 'home' },
      { label: 'Dashboard', href: '#/app/dashboard', view: 'dashboard' },
      { label: 'Search', href: '#/app/search', view: 'search' },
      { label: 'Inbox', href: '#/app/messages', view: 'messages' },
      { label: 'Live Events', href: '#/app/live', view: 'live' },
      { label: 'Vendors', href: '#/app/vendors', view: 'vendors' },
      { label: 'Astrologers', href: '#/app/astrologers', view: 'astrologers' },
  ];

  const allThemes: Theme[] = ['imperial-gold', 'royal-purple', 'classic-blue', 'elegant-teal', 'sunset-rose', 'emerald-green', 'midnight-blue'];

  return (
    <header className={`bg-theme-surface/80 border-b border-theme-border z-30 backdrop-blur-sm ${settings.stickyHeader ? 'sticky top-0' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo and Main Nav */}
                <div className="flex items-center space-x-8">
                    <a href="#/app/home" className="flex items-center space-x-2 cursor-pointer">
                        <img src={settings.logoUrl} alt={settings.siteName} className="h-8 object-contain" />
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-theme-gradient">{settings.siteName}</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-1">
                        {mainNavLinks.map(link => (
                             <NavItem key={link.view} label={link.label} href={link.href} active={currentView === link.view} />
                        ))}
                        {visiblePages.map(page => (
                            <NavItem key={page.id} label={page.title} href={`#/${page.slug}`} />
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <NotificationBell notifications={notifications} />
                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-theme-border transition-colors">
                            <img src={currentUser.photo} alt={currentUser.name} className="h-9 w-9 rounded-full object-cover border-2 border-theme-accent-secondary" />
                            <span className="hidden sm:inline font-medium text-sm text-theme-text-primary">{currentUser.name}</span>
                            <svg className={`h-5 w-5 text-theme-text-secondary transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-theme-surface ring-1 ring-theme-border focus:outline-none">
                                <a href="#/app/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">My Profile</a>
                                <a href="#/app/wedding-planner" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">My Wedding Planner</a>
                                <a href="#/app/preferences" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">Partner Preferences</a>
                                <a href="#/app/settings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">Settings</a>
                                <a href="#/app/pricing" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">Upgrade Plan</a>
                                <div className="border-t border-theme-border my-1"></div>
                                <a href="#/app/happy-stories" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">Happy Stories</a>
                                <a href="#/app/tell-your-story" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">Tell Your Story</a>
                                <a href="#/app/astrology" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">Astrology</a>
                                <a href="#/app/faq" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">FAQ</a>
                                {currentUser.role === 'admin' && <a href="#/app/admin" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-theme-accent-primary hover:bg-theme-border">Admin Dashboard</a>}
                                <div className="border-t border-theme-border my-1"></div>
                                <div className="px-4 pt-2 pb-1">
                                    <label className="text-xs text-theme-text-secondary">Theme</label>
                                    <div className="flex items-center flex-wrap gap-3 mt-2 mb-1">
                                        {allThemes.map(theme => (
                                            <ThemeSwatch key={theme} theme={theme} activeTheme={settings.theme} onClick={() => handleThemeChange(theme)} />
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-theme-border my-1"></div>
                                <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block px-4 py-2 text-sm text-red-500 hover:bg-theme-border">Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;