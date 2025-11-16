import React from 'react';
import { Service, WebsiteSettings } from '../types';
import Footer from '../components/Footer';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

interface ServicePageProps {
    service: Service;
    websiteSettings: WebsiteSettings;
}

const ServicePage: React.FC<ServicePageProps> = ({ service, websiteSettings }) => {
    return (
         <div className="bg-theme-bg min-h-screen text-theme-text-primary">
            <header className="bg-theme-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-theme-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <a href="#/" className="flex items-center gap-2">
                            <img src={websiteSettings.logoUrl} alt={websiteSettings.siteName} className="h-12" />
                            <div>
                                <h1 className="font-serif text-2xl font-bold text-theme-text-primary">{websiteSettings.siteName}</h1>
                            </div>
                        </a>
                        <nav className="hidden lg:flex items-center gap-6">
                            {websiteSettings.headerLinks.map(link => (
                                <a key={link.id} href={link.url} className="font-semibold text-theme-text-primary hover:text-theme-accent-primary transition-colors">{link.text}</a>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>
            
            <main>
                {service.heroImageUrl && (
                    <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${service.heroImageUrl})` }}>
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                )}
                <div className="container mx-auto px-6 py-12">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-sm font-semibold text-theme-text-secondary hover:text-theme-text-primary mb-4 max-w-4xl mx-auto"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back
                    </button>
                    <div className={`bg-theme-surface p-8 rounded-lg border border-theme-border max-w-4xl mx-auto ${service.heroImageUrl ? '-mt-32 relative z-10' : ''}`}>
                        <h1 className="text-4xl font-bold mb-6 font-serif">{service.title}</h1>
                        <div 
                            className="prose prose-lg max-w-none text-theme-text-secondary"
                            dangerouslySetInnerHTML={{ __html: service.content }} 
                        />
                    </div>
                </div>
            </main>

            <Footer settings={websiteSettings} />
        </div>
    );
};

export default ServicePage;
