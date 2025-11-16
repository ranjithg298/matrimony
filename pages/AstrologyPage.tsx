import React, { useState } from 'react';
import { AstroPrediction, AuspiciousDate, WebsiteSettings } from '../types';
import Footer from '../components/Footer';
import { getAuspiciousDates } from '../services/geminiService';
import SparklesIcon from '../components/icons/SparklesIcon';

interface AstrologyPageProps {
    predictions: AstroPrediction[];
    auspiciousDates: AuspiciousDate[];
    isPublic?: boolean;
    websiteSettings: WebsiteSettings;
}

type AstroTab = 'horoscope' | 'calendar';

const AuspiciousCalendar: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [dates, setDates] = useState<AuspiciousDate[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFindDates = async () => {
        setIsLoading(true);
        setError(null);
        setDates([]);
        try {
            const result = await getAuspiciousDates(month, year);
            setDates(result);
        } catch (e) {
            setError("Could not fetch dates. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
    const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, name: new Date(0, i).toLocaleString('default', { month: 'long' }) }));

    return (
        <div>
            <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border mb-4 flex items-center gap-4">
                <select value={month} onChange={e => setMonth(Number(e.target.value))} className="bg-theme-border p-2 rounded-md">
                    {months.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}
                </select>
                <select value={year} onChange={e => setYear(Number(e.target.value))} className="bg-theme-border p-2 rounded-md">
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <button onClick={handleFindDates} disabled={isLoading} className="bg-theme-accent-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 flex items-center gap-2 disabled:opacity-50">
                    <SparklesIcon className="w-5 h-5"/>
                    {isLoading ? 'Finding...' : 'Find Dates'}
                </button>
            </div>
             {isLoading && <p className="text-center text-theme-text-secondary">Finding auspicious dates with AI...</p>}
             {error && <p className="text-center text-red-500">{error}</p>}
             {!isLoading && dates.length > 0 && (
                <div className="space-y-3">
                    {dates.map(d => (
                         <div key={d.date} className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border flex items-center justify-between">
                            <div>
                                <p className="font-bold text-theme-accent-light">{d.date}</p>
                                <p className="text-sm text-theme-text-secondary">{d.day}</p>
                            </div>
                            <p className="text-sm text-theme-text-primary text-right">{d.reason}</p>
                        </div>
                    ))}
                </div>
             )}
             {!isLoading && !error && dates.length === 0 && <p className="text-center text-theme-text-secondary">Select a month and year to find auspicious dates.</p>}
        </div>
    )
}


const AstrologyPage: React.FC<AstrologyPageProps> = ({ predictions, auspiciousDates, isPublic = false, websiteSettings }) => {
    const [activeTab, setActiveTab] = useState<AstroTab>('calendar');

    const renderContent = () => {
        if (activeTab === 'horoscope') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {predictions.map(p => (
                        <div key={p.rasi} className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                            <h3 className="font-bold text-theme-accent-light">{p.rasi}</h3>
                            <p className="text-sm text-theme-text-secondary mt-1">{p.prediction}</p>
                        </div>
                    ))}
                </div>
            );
        }
        if (activeTab === 'calendar') {
            return <AuspiciousCalendar />;
        }
        return null;
    }

    const mainContent = (
         <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-2">Astrology Hub</h1>
                <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto">Find guidance for your journey with Vedic insights.</p>
            </div>
             <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                <div className="flex border-b border-theme-border mb-4">
                    <button onClick={() => setActiveTab('calendar')} className={`px-4 py-2 font-semibold ${activeTab === 'calendar' ? 'border-b-2 border-theme-accent-primary text-theme-accent-primary' : 'text-theme-text-secondary'}`}>
                        Auspicious Wedding Dates
                    </button>
                    <button onClick={() => setActiveTab('horoscope')} className={`px-4 py-2 font-semibold ${activeTab === 'horoscope' ? 'border-b-2 border-theme-accent-primary text-theme-accent-primary' : 'text-theme-text-secondary'}`}>
                        Daily Rasi Palan
                    </button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
    
    if (isPublic) {
        return (
             <div className="bg-theme-bg min-h-screen">
                 <header className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#/" className="flex items-center space-x-2 focus:outline-none">
                        <img src={websiteSettings.logoUrl} alt={websiteSettings.siteName} className="h-8 object-contain" />
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient">{websiteSettings.siteName}</span>
                    </a>
                    <div className="space-x-4">
                        <a href="#/faq" className="text-theme-text-secondary hover:text-theme-text-primary transition-colors">FAQ</a>
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

export default AstrologyPage;