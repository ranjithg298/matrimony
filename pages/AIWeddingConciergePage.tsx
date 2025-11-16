import React, { useState } from 'react';
import { Profile, AIWeddingPlan } from '../types';
import { generateAIWeddingPlan } from '../services/geminiService';
import SparklesIcon from '../components/icons/SparklesIcon';

interface AIWeddingConciergePageProps {
    currentUser: Profile;
    vendors: Profile[];
    onImportPlan: (plan: AIWeddingPlan) => void;
}

const AIWeddingConciergePage: React.FC<AIWeddingConciergePageProps> = ({ currentUser, vendors, onImportPlan }) => {
    const [inputs, setInputs] = useState({
        budget: 500000,
        guests: 150,
        city: currentUser.city,
        style: 'Traditional',
    });
    const [plan, setPlan] = useState<AIWeddingPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: name === 'budget' || name === 'guests' ? Number(value) : value }));
    };

    const handleGeneratePlan = async () => {
        setIsLoading(true);
        setError(null);
        setPlan(null);
        try {
            const result = await generateAIWeddingPlan(inputs, vendors);
            setPlan(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!currentUser.isPremium) {
        return (
            <div className="text-center p-12">
                <h2 className="text-2xl font-bold">Exclusive for Premium Members</h2>
                <p className="text-theme-text-secondary mt-2">The AI Wedding Concierge is a premium feature. Upgrade your plan to get started.</p>
                <a href="#/app/pricing" className="mt-4 inline-block bg-theme-gradient text-white font-bold py-2 px-6 rounded-lg">Upgrade Now</a>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">AI Wedding Concierge</h1>
                    <p className="text-theme-text-secondary mt-2">Get a personalized head start on your wedding planning in seconds.</p>
                </div>

                <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="text-sm font-medium">Budget (₹)</label>
                            <input type="number" name="budget" value={inputs.budget} onChange={handleInputChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border mt-1" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Guest Count</label>
                            <input type="number" name="guests" value={inputs.guests} onChange={handleInputChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border mt-1" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">City</label>
                            <input type="text" name="city" value={inputs.city} onChange={handleInputChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border mt-1" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Style</label>
                            <select name="style" value={inputs.style} onChange={handleInputChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border mt-1">
                                <option>Traditional</option>
                                <option>Modern</option>
                                <option>Intimate</option>
                                <option>Lavish</option>
                                <option>Destination</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleGeneratePlan} disabled={isLoading} className="w-full bg-theme-gradient text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                        <SparklesIcon className="h-5 w-5" />
                        {isLoading ? 'Generating Your Plan...' : 'Generate AI Plan'}
                    </button>
                </div>

                {error && <p className="text-center text-red-500 mt-4">{error}</p>}
                
                {plan && (
                    <div className="mt-8 bg-theme-surface p-6 rounded-xl border border-theme-border animate-fade-in-up">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Your AI-Generated Wedding Plan</h2>
                            <button onClick={() => onImportPlan(plan)} className="font-semibold py-2 px-4 rounded-lg bg-theme-accent-primary text-white">Import to My Planner</button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Budget */}
                            <div>
                                <h3 className="font-semibold mb-2">Budget Breakdown</h3>
                                <div className="bg-theme-bg/50 p-3 rounded-lg">
                                    {plan.budgetBreakdown.map(item => (
                                        <div key={item.category} className="flex justify-between py-1 border-b border-theme-border last:border-b-0">
                                            <span>{item.category}</span>
                                            <span className="font-mono">₹{item.cost.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Vendors */}
                            <div>
                                <h3 className="font-semibold mb-2">Vendor Suggestions</h3>
                                <div className="bg-theme-bg/50 p-3 rounded-lg">
                                    {plan.vendorSuggestions.map(v => (
                                        <div key={v.name} className="py-1 border-b border-theme-border last:border-b-0">
                                            <p className="font-semibold">{v.name}</p>
                                            <p className="text-sm text-theme-text-secondary">{v.category}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Checklist */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Starter Checklist</h3>
                            <div className="bg-theme-bg/50 p-3 rounded-lg">
                                {plan.checklist.map(item => (
                                    <div key={item.task} className="py-1">
                                        <p><strong>{item.category}:</strong> {item.task}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIWeddingConciergePage;