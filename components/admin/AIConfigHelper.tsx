import React, { useState, useRef, useEffect } from 'react';
import { getAdminConfigHelp } from '../../services/geminiService';
import SparklesIcon from '../icons/SparklesIcon';
import UserIcon from '../icons/UserIcon';
import MagicWandIcon from '../icons/MagicWandIcon';

const AIConfigHelper: React.FC = () => {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: 'Hello! I can help you with website customizations. Ask me things like "How do I change the button colors?" or "Give me CSS for a login page background image".' }
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

        setMessages(prev => [...prev, { role: 'user', content: userQuery }]);
        setInput('');
        setIsLoading(true);

        const assistantResponse = await getAdminConfigHelp(userQuery);

        setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
        setIsLoading(false);
    };

    const quickActions = [
        "Change the main gold color to a bright red",
        "How do I change the font for all headings?",
        "Give me CSS to make the header taller",
    ];

    return (
        <div className="flex flex-col h-[calc(100vh_-_12rem)]">
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role !== 'user' && (
                            <div className="w-8 h-8 rounded-full bg-theme-accent-secondary/20 flex items-center justify-center flex-shrink-0">
                                <MagicWandIcon className="w-5 h-5 text-theme-accent-secondary" />
                            </div>
                        )}
                        <div className={`max-w-lg p-3 rounded-lg ${msg.role === 'user' ? 'bg-theme-accent-primary text-white' : 'bg-theme-bg'}`}>
                            <div className="text-sm prose" dangerouslySetInnerHTML={{ __html: msg.content.replace(/```css\n([\s\S]*?)```/g, '<pre class="bg-gray-800 text-white p-2 rounded-md text-xs"><code>$1</code></pre>') }} />
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
                        <div className="w-8 h-8 rounded-full bg-theme-accent-secondary/20 flex items-center justify-center flex-shrink-0">
                           <SparklesIcon className="w-5 h-5 text-theme-accent-secondary animate-pulse" />
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
                        placeholder="Ask for CSS help or customization ideas..."
                        className="flex-grow bg-theme-bg border border-theme-border rounded-lg px-4 py-2 text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary"
                        disabled={isLoading}
                    />
                    <button onClick={() => handleSend()} disabled={isLoading} className="bg-theme-accent-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50">
                        Ask AI
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIConfigHelper;