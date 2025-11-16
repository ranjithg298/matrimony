import React, { useState } from 'react';
import { HappyStory, WebsiteSettings } from '../types';
import Footer from '../components/Footer';
import VideoPlayerModal from '../components/VideoPlayerModal';
import VideoStoryCard from '../components/VideoStoryCard';

interface HappyStoriesPageProps {
    stories: HappyStory[];
    isPublic?: boolean;
    websiteSettings: WebsiteSettings;
}

const StoryCard: React.FC<{story: HappyStory}> = ({ story }) => (
    <div className="bg-theme-surface rounded-xl overflow-hidden border border-theme-border transform transition-all duration-300 hover:shadow-2xl hover:shadow-theme-accent-primary/10 hover:-translate-y-1">
        <img src={story.imageUrl} alt={story.coupleNames} className="h-64 w-full object-cover" />
        <div className="p-6">
            <p className="text-sm text-theme-text-secondary mb-1">{story.weddingDate}</p>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient mb-3">{story.coupleNames}</h3>
            <p className="text-theme-text-secondary italic">"{story.story}"</p>
        </div>
    </div>
);

const HappyStoriesPage: React.FC<HappyStoriesPageProps> = ({ stories, isPublic = false, websiteSettings }) => {
    const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');
    const [videoModal, setVideoModal] = useState({ isOpen: false, url: '' });

    const photoStories = stories.filter(s => !s.videoUrl);
    const videoStories = stories.filter(s => s.videoUrl);

    const handlePlayVideo = (url: string) => {
        setVideoModal({ isOpen: true, url });
    };

    const content = (
         <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-2">Success Stories</h1>
                <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto">Read about the beautiful journeys that began on {websiteSettings.siteName}</p>
            </div>
            
            <div className="flex justify-center border-b border-theme-border mb-8">
                <button onClick={() => setActiveTab('photo')} className={`px-4 py-2 font-semibold ${activeTab === 'photo' ? 'border-b-2 border-theme-accent-primary text-theme-accent-primary' : 'text-theme-text-secondary'}`}>
                    Photo Stories
                </button>
                <button onClick={() => setActiveTab('video')} className={`px-4 py-2 font-semibold ${activeTab === 'video' ? 'border-b-2 border-theme-accent-primary text-theme-accent-primary' : 'text-theme-text-secondary'}`}>
                    Video Stories
                </button>
            </div>

            {activeTab === 'photo' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {photoStories.map(story => <StoryCard key={story.id} story={story} />)}
                </div>
            )}
            {activeTab === 'video' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoStories.map(story => <VideoStoryCard key={story.id} story={story} onPlayVideo={handlePlayVideo} />)}
                </div>
            )}
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
                {content}
                <Footer settings={websiteSettings}/>
                <VideoPlayerModal isOpen={videoModal.isOpen} videoUrl={videoModal.url} onClose={() => setVideoModal({isOpen: false, url: ''})} />
            </div>
        )
    }

    return (
        <>
            {content}
            <VideoPlayerModal isOpen={videoModal.isOpen} videoUrl={videoModal.url} onClose={() => setVideoModal({isOpen: false, url: ''})} />
        </>
    );
};

export default HappyStoriesPage;