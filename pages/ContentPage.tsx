import React from 'react';
import { Page, WebsiteSettings } from '../types';
import Footer from '../components/Footer';

interface ContentPageProps {
    page: Page;
    websiteSettings: WebsiteSettings;
}

const ContentPage: React.FC<ContentPageProps> = ({ page, websiteSettings }) => {
    return (
         <div className="bg-theme-bg min-h-screen text-theme-text-primary">
            <header className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#/" className="flex items-center space-x-2 focus:outline-none">
                <img src={websiteSettings.logoUrl} alt={websiteSettings.siteName} className="h-8 object-contain" />
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient">{websiteSettings.siteName}</span>
                </a>
                <div className="flex items-center space-x-4">
                    {websiteSettings.headerLinks.map(link => (
                        <a key={link.id} href={link.url} className="hidden md:block text-theme-text-secondary hover:text-theme-text-primary transition-colors">{link.text}</a>
                    ))}
                    <a href="#/login" className="bg-theme-surface hover:bg-theme-border text-theme-text-primary font-semibold py-2 px-4 rounded-lg transition-colors">
                        Login
                    </a>
                </div>
            </header>
            
            <main className="container mx-auto px-6 py-12">
                <div className="bg-theme-surface p-8 rounded-lg border border-theme-border max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
                    <div 
                        className="prose prose-invert max-w-none text-theme-text-secondary"
                        dangerouslySetInnerHTML={{ __html: page.content }} 
                    />
                </div>
            </main>

            <Footer settings={websiteSettings} />
        </div>
    );
};

export default ContentPage;