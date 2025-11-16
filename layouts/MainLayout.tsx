import React, { useState, useEffect } from 'react';
import { Profile, View, WebsiteSettings, Page, Notification, Attribute } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
    currentUser: Profile;
    websiteSettings: WebsiteSettings;
    pages: Page[];
    attributes: Attribute[];
    notifications: Notification[];
    onLogout: () => void;
    onUpdateWebsiteSettings: (settings: WebsiteSettings) => void;
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { 
      currentUser, websiteSettings, pages, attributes, notifications,
      onLogout, onUpdateWebsiteSettings,
      children 
  } = props;
  
  const [currentView, setCurrentView] = useState<View>('home');
  
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#/app/')) {
            const view = hash.substring(6).split('/')[0] as View;
            setCurrentView(view || 'home');
        } else {
            setCurrentView('home');
        }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check if the children prop is one of the views that should use the two-column layout
  const isTwoColumnView = ['home', 'dashboard', 'search', 'preferences', 'profile-viewers', 'shortlisted', 'vow-generator', 'ai-wedding-concierge'].includes(currentView);

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col">
      <Header 
        currentUser={currentUser} 
        currentView={currentView}
        onLogout={onLogout}
        settings={websiteSettings}
        pages={pages}
        notifications={notifications}
        onUpdateWebsiteSettings={onUpdateWebsiteSettings}
      />
      <main className="relative flex-grow animate-fade-in-up">
        {isTwoColumnView ? (
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        {children}
                    </div>
                    <aside className="lg:col-span-1">
                        <Sidebar currentUser={currentUser} attributes={attributes} />
                    </aside>
                </div>
            </div>
        ) : (
            // For full-width pages like Messages, Profile, etc.
            children
        )}
      </main>
      <Footer settings={websiteSettings} />
    </div>
  );
};

export default MainLayout;