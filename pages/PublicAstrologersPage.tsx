import React from 'react';
import { Astrologer, WebsiteSettings } from '../types';
import Footer from '../components/Footer';

interface PublicAstrologersPageProps {
    astrologers: Astrologer[];
    isPublic?: boolean;
    websiteSettings?: WebsiteSettings;
}

const AstrologerCard: React.FC<{ astrologer: Astrologer }> = ({ astrologer }) => (
    <div className="bg-theme-surface rounded-xl border border-theme-border p-6 text-center transform transition-all duration-300 hover:shadow-2xl hover:shadow-theme-accent-primary/10 hover:-translate-y-1">
        <img src={astrologer.photo} alt={astrologer.name} className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-theme-accent-primary" />
        <h3 className="text-xl font-bold text-theme-text-primary mt-4">{astrologer.name}</h3>
        <p className="text-sm text-theme-text-secondary">{astrologer.experience} years experience</p>
        <div className="flex flex-wrap justify-center gap-2 my-4">
            {astrologer.specializations.map(spec => (
                <span key={spec} className="px-2 py-1 bg-theme-accent-primary/10 text-theme-accent-primary text-xs font-semibold rounded-full">{spec}</span>
            ))}
        </div>
        <p className="text-sm text-theme-text-secondary mb-4 h-16 line-clamp-3">{astrologer.bio}</p>
        <a href={astrologer.meetLink} target="_blank" rel="noopener noreferrer" className="w-full block bg-theme-gradient text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300">
            Book an Appointment
        </a>
    </div>
);


const PublicAstrologersPage: React.FC<PublicAstrologersPageProps> = ({ astrologers, isPublic = false, websiteSettings }) => {
    const mainContent = (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-2">Consult Our Expert Astrologers</h1>
                <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto">Get personalized guidance for your marital journey from our team of experienced Vedic astrologers.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {astrologers.map(astro => <AstrologerCard key={astro.id} astrologer={astro} />)}
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

export default PublicAstrologersPage;