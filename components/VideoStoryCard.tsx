import React from 'react';
import { HappyStory } from '../types';
import PlayIcon from './icons/PlayIcon';

interface VideoStoryCardProps {
    story: HappyStory;
    onPlayVideo: (url: string) => void;
}

const VideoStoryCard: React.FC<VideoStoryCardProps> = ({ story, onPlayVideo }) => {
  return (
    <div 
        className="bg-theme-surface rounded-xl overflow-hidden border border-theme-border group cursor-pointer"
        onClick={() => story.videoUrl && onPlayVideo(story.videoUrl)}
    >
        <div className="relative h-64">
            <img src={story.imageUrl} alt={story.coupleNames} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                    <PlayIcon className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
        <div className="p-6">
            <p className="text-sm text-theme-text-secondary mb-1">{story.weddingDate}</p>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient mb-3">{story.coupleNames}</h3>
            <p className="text-theme-text-secondary italic">"{story.story}"</p>
        </div>
    </div>
  );
};

export default VideoStoryCard;
