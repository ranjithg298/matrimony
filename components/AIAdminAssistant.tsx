import React, { useState, useRef, useEffect } from 'react';
import { Profile, Report, ContactQuery, AdminAssistantMessage } from '../types';
import { getAdminAssistantResponse } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';
import UserIcon from './icons/UserIcon';

interface AIAdminAssistantProps {
    allProfiles: Profile[];
    reports: Report[];
    contactQueries: ContactQuery[];
}

const AIAdminAssistant: React.FC<AIAdminAssistantProps> = ({ allProfiles, reports, contactQueries }) => {
    const [messages, setMessages] = useState<AdminAssistantMessage[]>([
        { id: 'init', role: 'assistant', content: 'Hello! I am the Matrimony.AI Admin Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (query?: string) => {
        const userQuery = query || input;
        if (!userQuery.trim()) return;

        const userMessage: AdminAssistantMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: userQuery,
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Prepare a focused context object based on the query
        const contextData: any = {
            user_stats: {
                total_users: allProfiles.length,
                pending_approval: allProfiles.filter(p => p.approvalStatus === 'pending').length,
                premium_members: allProfiles.filter(p => p.isPremium).length,
            },
        };
        
        if (userQuery.toLowerCase().includes('report')) {
            contextData.pending_reports = reports.filter(r => r.status === 'pending');
        }
        if (userQuery.toLowerCase().includes('incomplete')) {
            contextData.users_with_incomplete_profiles = allProfiles
                .filter(p => !p.bio || p.bio.length < 50 || p.interests.length < 3)
                .map(p => ({ id: p.id, name: p.name, bio_length: p.bio.length, interests_count: p.interests.length }));
        }
        if (userQuery.toLowerCase().includes('quer') || userQuery.toLowerCase().includes('contact')) {
             contextData.new_contact_queries = contactQueries.filter(q => q.status === 'new');
        }


        const assistantResponse = await getAdminAssistantResponse(messages, userQuery, contextData);

        const assistantMessage: AdminAssistantMessage = {
            id: `asst-${Date.now()}`,
            role: 'assistant',
            content: assistantResponse,
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
    };

    const quickActions = [
        "Summarize pending reports",
        "Which users have incomplete profiles?",
        "Draft a welcome notification for new users",
        "How many new contact queries are there?",
    ];

    return (
        <div className="flex flex-col h-[calc(100vh_-_12rem)]">
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role !== 'user' && (
                            <div className="w-8 h-8 rounded-full bg-theme-accent-primary/20 flex items-center justify-center flex-shrink-0">
                                <SparklesIcon className="w-5 h-5 text-theme-accent-primary" />
                            </div>
                        )}
                        <div className={`max-w-lg p-3 rounded-lg ${msg.role === 'user' ? 'bg-theme-accent-primary text-white' : 'bg-theme-bg'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                         {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-theme-border flex items-center justify-center flex-shrink-0">
                                <UserIcon className="w-5 h-5 text-theme-text-secondary" />
                            </div>
                        )}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-theme-accent-primary/20 flex items-center justify-center flex-shrink-0">
                           <SparklesIcon className="w-5 h-5 text-theme-accent-primary animate-pulse" />
                        </div>
                        <div className="max-w-lg p-3 rounded-lg bg-theme-bg animate-pulse">
                            <div className="h-4 bg-theme-border rounded w-24"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
             <div className="flex-shrink-0 p-4 border-t border-theme-border">
                <div className="flex flex-wrap gap-2 mb-2">
                    {quickActions.map(action => (
                        <button 
                            key={action}
                            onClick={() => handleSend(action)}
                            className="text-xs bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-1 px-3 rounded-full"
                            disabled={isLoading}
                        >
                            {action}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask the AI Assistant..."
                        className="flex-grow bg-theme-bg border border-theme-border rounded-lg px-4 py-2 text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary"
                        disabled={isLoading}
                    />
                    <button onClick={() => handleSend()} disabled={isLoading} className="bg-theme-accent-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAdminAssistant;