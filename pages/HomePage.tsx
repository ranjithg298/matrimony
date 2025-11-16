import React from 'react';
import { Profile, Attribute, Service, WebsiteSettings } from '../types';
import MatchmakerPanel from '../components/MatchmakerPanel';
import MatchFeed from '../components/MatchFeed';

interface HomePageProps {
    profiles: Profile[];
    services: Service[];
    currentUser: Profile;
    websiteSettings: WebsiteSettings; // Added for homepage settings
    onSelectProfile: (profile: Profile) => void;
    onShortlistProfile: (profileId: string) => void;
    attributes: Attribute[];
    onSendInterest: (profileId: string) => void;
}

const FeaturedServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <a href={`#/services/${service.slug}`} className="relative rounded-xl overflow-hidden group h-64 block">
        <img src={service.heroImageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
            <p className="text-sm text-gray-200">{service.description}</p>
        </div>
    </a>
);

const HomePage: React.FC<HomePageProps> = (props) => {
    const { 
        profiles, services, currentUser, websiteSettings, 
        onSelectProfile, onShortlistProfile, attributes, onSendInterest 
    } = props;
    
    // Don't show the current user in their own feed, only show approved users
    const displayProfiles = profiles.filter(p => p.id !== currentUser.id && p.role === 'user' && p.approvalStatus === 'approved');
    const featuredServices = services.filter(s => ['doctors-matrimony', '90s-kids-matrimony'].includes(s.slug));

    const homepageSections = websiteSettings.homepageSettings || [
        { id: 'matchmaker', title: 'AI Matchmaker Suggestion', enabled: true },
        { id: 'featured-services', title: 'Featured Services', enabled: true },
        { id: 'recommendations', title: 'Recommended for You', enabled: true },
    ];

    const renderSection = (id: string) => {
        const section = homepageSections.find(s => s.id === id);
        if (!section || !section.enabled) return null;

        switch (id) {
            case 'matchmaker':
                return (
                    <div key={id}>
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        <MatchmakerPanel 
                            currentUser={currentUser}
                            allProfiles={profiles}
                            attributes={attributes}
                            onSendInterest={onSendInterest}
                        />
                    </div>
                );
            case 'featured-services':
                if (featuredServices.length === 0) return null;
                return (
                    <div key={id}>
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {featuredServices.map(service => (
                                <FeaturedServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    </div>
                );
            case 'recommendations':
                return (
                    <div key={id}>
                        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                        <MatchFeed 
                            profiles={displayProfiles}
                            onSelectProfile={onSelectProfile}
                            currentUser={currentUser}
                            onShortlistProfile={onShortlistProfile}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            {homepageSections.map(section => renderSection(section.id))}
        </div>
    );
};

export default HomePage;