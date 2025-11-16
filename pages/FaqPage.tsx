import React, { useState } from 'react';
import { FAQS } from '../constants';
import { FaqItem, WebsiteSettings } from '../types';
import Footer from '../components/Footer';

const FaqAccordionItem: React.FC<{ item: FaqItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-theme-border">
            <h2>
                <button
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-medium text-left text-theme-text-secondary hover:bg-theme-surface/50"
                    onClick={onClick}
                >
                    <span className="text-theme-text-primary">{item.question}</span>
                     <svg className={`w-6 h-6 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </h2>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} grid`}>
                 <div className="overflow-hidden">
                    <div className="p-5 border-t border-theme-border">
                        <p className="mb-2 text-theme-text-secondary">{item.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const FaqPage: React.FC<{isPublic?: boolean, websiteSettings: WebsiteSettings}> = ({isPublic = false, websiteSettings}) => {
    const [openId, setOpenId] = useState<number | null>(0);

    const handleToggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    const content = (
         <div className="py-8 px-4 mx-auto max-w-screen-md lg:py-16 lg:px-6">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-theme-text-primary">Frequently Asked Questions</h1>
            <p className="mb-8 font-light text-center text-theme-text-secondary sm:text-xl">Have a question? We're here to help.</p>
            <div className="bg-theme-surface rounded-lg border border-theme-border">
                {FAQS.map((faq, index) => (
                    <FaqAccordionItem 
                        key={index}
                        item={faq}
                        isOpen={openId === index}
                        onClick={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    );

    if(isPublic) {
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
                {content}
                <Footer settings={websiteSettings}/>
            </div>
        )
    }

    return content;
};

export default FaqPage;