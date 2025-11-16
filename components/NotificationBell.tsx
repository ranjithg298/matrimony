import React, { useState, useRef, useEffect } from 'react';
import { Notification } from '../types';
import BellIcon from './icons/BellIcon';

interface NotificationBellProps {
    notifications: Notification[];
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);
    
    // A simple function to format time ago
    const timeAgo = (timestamp: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full text-theme-text-secondary hover:bg-theme-border hover:text-theme-text-primary transition-colors focus:outline-none"
                aria-label="Notifications"
            >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs items-center justify-center">{unreadCount}</span>
                    </span>
                )}
            </button>
            
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-theme-surface ring-1 ring-theme-border z-50">
                    <div className="p-3 border-b border-theme-border">
                        <h3 className="font-semibold text-theme-text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <div key={notification.id} className={`p-3 hover:bg-theme-border/50 ${!notification.isRead ? 'bg-theme-accent-secondary/5' : ''}`}>
                                    <p className="text-sm text-theme-text-primary">{notification.message}</p>
                                    <p className="text-xs text-theme-text-secondary mt-1">{timeAgo(notification.timestamp)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-sm text-theme-text-secondary text-center">No new notifications.</p>
                        )}
                    </div>
                     <div className="p-2 border-t border-theme-border text-center">
                        <a href="#" className="text-sm font-semibold text-theme-accent-primary hover:underline">View All</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;