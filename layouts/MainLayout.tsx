import React, { useState, useEffect } from 'react';
import { Profile, View, WebsiteSettings, Page, Notification, Attribute } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  const isFullWidthPage = ['messages'].includes(currentView);

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
      <main className={`relative flex-grow animate-fade-in-up ${!isFullWidthPage ? 'container mx-auto p-4 sm:p-6 lg:p-8' : ''}`}>
        {children}
      </main>
      <Footer settings={websiteSettings} />
    </div>
  );
};

export default MainLayout;
