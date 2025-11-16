import React from 'react';
import { Notification } from '../types';
import BellIcon from '../components/icons/BellIcon';

interface NotificationsPageProps {
  notifications: Notification[];
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications }) => {
    
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
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Notifications</h1>
                <div className="bg-theme-surface rounded-xl border border-theme-border">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-theme-border">
                            {notifications.map(notification => (
                                <div key={notification.id} className={`p-4 ${!notification.isRead ? 'bg-theme-accent-primary/5' : ''}`}>
                                    <p className="text-theme-text-primary">{notification.message}</p>
                                    <p className="text-xs text-theme-text-secondary mt-1">{timeAgo(notification.timestamp)}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-theme-text-secondary">
                            <BellIcon className="w-12 h-12 mx-auto text-theme-border mb-4" />
                            <p>You have no notifications yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;