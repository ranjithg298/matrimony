import React from 'react';
import { LiveEvent, WebsiteSettings } from '../types';
import Footer from '../components/Footer';

interface LiveEventsPageProps {
    events: LiveEvent[];
    isPublic?: boolean;
    websiteSettings?: WebsiteSettings;
}

const EventCard: React.FC<{ event: LiveEvent }> = ({ event }) => {
    const eventDate = new Date(event.date);
    const isLive = eventDate <= new Date();

    return (
        <div className="bg-theme-surface rounded-xl border border-theme-border p-6 flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-shrink-0 text-center bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                <p className="text-sm text-theme-text-secondary">{eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()}</p>
                <p className="text-3xl font-bold text-theme-accent-primary">{eventDate.getDate()}</p>
                <p className="text-sm text-theme-text-secondary">{eventDate.getFullYear()}</p>
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-theme-text-primary">{event.title}</h3>
                <p className="text-sm text-theme-text-secondary my-2">
                    {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-theme-text-secondary text-sm mb-4">{event.description}</p>
            </div>
            <a
                href={event.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto mt-4 sm:mt-0 flex-shrink-0 font-bold py-2 px-6 rounded-lg transition-opacity ${isLive ? 'bg-theme-gradient text-white hover:opacity-90' : 'bg-theme-border text-theme-text-secondary cursor-not-allowed'}`}
                aria-disabled={!isLive}
            >
                {isLive ? 'Join Now' : 'Upcoming'}
            </a>
        </div>
    );
};


const LiveEventsPage: React.FC<LiveEventsPageProps> = ({ events, isPublic = false, websiteSettings }) => {
    const mainContent = (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-2">Live Matchmaking Events</h1>
                <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto">Join our curated online events to meet like-minded individuals in a guided and friendly environment.</p>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
                {events.length > 0 ? (
                    events.map(event => <EventCard key={event.id} event={event} />)
                ) : (
                    <p className="text-center text-theme-text-secondary">No upcoming events scheduled. Please check back soon!</p>
                )}
            </div>
        </div>
    );

    if (isPublic && websiteSettings) {
        return (
            <div className="bg-theme-bg min-h-screen">
                 <header className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#/" className="flex items-center space-x-2 focus:outline-none">
                         <img src={websiteSettings.logoUrl} alt={websiteSettings.siteName} className="h-8 object-contain" />
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient">{websiteSettings.siteName}</span>
                    </a>
                    <div className="space-x-4">
                        <a href="#/happy-stories" className="text-theme-text-secondary hover:text-theme-text-primary transition-colors">Happy Stories</a>
                        <a href="#/astrology" className="text-theme-text-secondary hover:text-theme-text-primary transition-colors">Astrology</a>
                        <a href="#/login" className="bg-theme-surface hover:bg-theme-border text-theme-text-primary font-semibold py-2 px-4 rounded-lg transition-colors">
                            Login
                        </a>
                    </div>
                </header>
                {mainContent}
                <Footer settings={websiteSettings}/>
            </div>
        );
    }
    
    return mainContent;
};

export default LiveEventsPage;
