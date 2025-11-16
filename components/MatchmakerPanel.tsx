import React, { useState, useEffect, useCallback } from 'react';
import { Profile, Attribute } from '../types';
import { getMatchmakerSuggestion } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';
import HeartIcon from './icons/HeartIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import VerifiedIcon from './icons/VerifiedIcon';

interface MatchmakerPanelProps {
    currentUser: Profile;
    allProfiles: Profile[];
    attributes: Attribute[];
    onSendInterest: (profileId: string) => void;
}

const MatchmakerPanel: React.FC<MatchmakerPanelProps> = ({ currentUser, allProfiles, attributes, onSendInterest }) => {
    const [suggestion, setSuggestion] = useState<{ profile: Profile; reason: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [suggestedIds, setSuggestedIds] = useState<string[]>([]);

    const fetchSuggestion = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        const alreadyInteractedWith = [
            ...(currentUser.interestsSent || []),
            ...(currentUser.interestsReceived || []),
            ...suggestedIds,
            currentUser.id
        ];

        const candidates = allProfiles.filter(p => 
            p.role === 'user' && 
            p.approvalStatus === 'approved' && 
            !alreadyInteractedWith.includes(p.id)
        );

        if (candidates.length === 0) {
            setError("No new matches available right now. Check back later!");
            setIsLoading(false);
            setSuggestion(null);
            return;
        }

        try {
            const result = await getMatchmakerSuggestion(currentUser, candidates, attributes);
            
            if (result) {
                const profile = allProfiles.find(p => p.id === result.bestMatchId);
                if (profile) {
                    setSuggestion({ profile, reason: result.reason });
                    setSuggestedIds(prev => [...prev, profile.id]);
                } else {
                    setError("AI returned an invalid match. Please try again.");
                    // Fallback to a random candidate if AI fails unexpectedly
                    const fallbackProfile = candidates[Math.floor(Math.random() * candidates.length)];
                    setSuggestion({ profile: fallbackProfile, reason: "Our AI is taking a short break! We thought you two might get along based on your location and age." });
                    setSuggestedIds(prev => [...prev, fallbackProfile.id]);
                }
            } else {
                throw new Error("Could not get an AI suggestion.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not get an AI suggestion. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [currentUser, allProfiles, attributes, suggestedIds]);
    
    useEffect(() => {
        fetchSuggestion();
    }, []); // Fetch on initial mount

    const handleInterest = () => {
        if (suggestion) {
            onSendInterest(suggestion.profile.id);
            fetchSuggestion();
        }
    }

    if (isLoading) {
        return (
             <div className="bg-theme-surface p-6 rounded-xl border border-theme-border text-center animate-pulse">
                <SparklesIcon className="h-8 w-8 mx-auto text-theme-accent-primary mb-2" />
                <h2 className="text-xl font-bold">Finding your next match...</h2>
            </div>
        )
    }
    
    if (error) {
         return (
             <div className="bg-theme-surface p-6 rounded-xl border border-theme-border text-center">
                <h2 className="text-xl font-bold text-red-500">Oops!</h2>
                <p className="text-theme-text-secondary mt-2">{error}</p>
                 <button onClick={fetchSuggestion} className="mt-4 bg-theme-accent-primary text-white font-semibold py-2 px-4 rounded-lg">Try Again</button>
            </div>
        )
    }
    
    if (!suggestion) {
        return null;
    }

    const { profile, reason } = suggestion;

    return (
        <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-theme-gradient flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6" />
                    AI Matchmaker Suggestion
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                     <img src={profile.photo} alt={profile.name} className="w-full h-auto object-cover rounded-lg aspect-square"/>
                </div>
                <div className="md:col-span-2 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">{profile.name}, {profile.age} {profile.isVerified && <VerifiedIcon className="w-5 h-5 text-blue-400" />}</h3>
                        <p className="text-theme-text-secondary">{profile.city}</p>
                        <p className="mt-2 text-sm text-theme-text-secondary line-clamp-2">{profile.bio}</p>
                        <div className="mt-4 bg-theme-accent-primary/10 border-l-4 border-theme-accent-primary p-3 rounded-r-lg">
                            <h4 className="font-semibold text-sm text-theme-accent-primary">AI Recommendation:</h4>
                            <p className="text-sm text-theme-text-primary italic">"{reason}"</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 mt-4">
                        <button onClick={handleInterest} className="flex-1 flex items-center justify-center gap-2 bg-rose-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-600 transition duration-300">
                            <HeartIcon className="h-6 w-6" /> Send Interest
                        </button>
                         <button onClick={fetchSuggestion} className="flex-1 bg-theme-border text-theme-text-primary font-bold py-3 px-4 rounded-lg hover:bg-theme-border/80 transition duration-300 flex items-center justify-center gap-2">
                            Next Match <ArrowRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchmakerPanel;