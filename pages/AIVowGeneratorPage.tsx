import React, { useState } from 'react';
import { generateWeddingVows } from '../services/geminiService';
import SparklesIcon from '../components/icons/SparklesIcon';

const AIVowGeneratorPage: React.FC = () => {
    const [inputs, setInputs] = useState({ partnerName: '', yearsTogether: '', feeling: '' });
    const [vows, setVows] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async () => {
        if (!inputs.partnerName || !inputs.yearsTogether || !inputs.feeling) {
            alert("Please fill in all fields.");
            return;
        }
        setIsLoading(true);
        setVows('');
        try {
            const result = await generateWeddingVows(inputs);
            setVows(result);
        } catch (error) {
            setVows("Sorry, we couldn't generate vows at this time. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(vows);
        alert("Vows copied to clipboard!");
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-theme-text-primary mb-2">AI Wedding Vow Generator</h1>
                    <p className="text-lg text-theme-text-secondary">Craft the perfect words for your special day with a little help from AI.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                        <h2 className="text-xl font-bold mb-4">Tell Us a Little Something...</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-theme-text-secondary">Your Partner's Name</label>
                                <input type="text" name="partnerName" value={inputs.partnerName} onChange={handleInputChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border mt-1" />
                            </div>
                             <div>
                                <label className="text-sm font-medium text-theme-text-secondary">How many years have you been together?</label>
                                <input type="text" name="yearsTogether" value={inputs.yearsTogether} onChange={handleInputChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border mt-1" />
                            </div>
                             <div>
                                <label className="text-sm font-medium text-theme-text-secondary">What's one key feeling you want to convey? (e.g., gratitude, adventure, comfort)</label>
                                <input type="text" name="feeling" value={inputs.feeling} onChange={handleInputChange} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border mt-1" />
                            </div>
                        </div>
                        <button onClick={handleGenerate} disabled={isLoading} className="w-full mt-6 bg-theme-gradient text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                            <SparklesIcon className="h-5 w-5" />
                            {isLoading ? 'Generating...' : 'Generate Vows'}
                        </button>
                    </div>

                    {/* Output */}
                    <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                         <h2 className="text-xl font-bold mb-4">Your Generated Vows</h2>
                         {isLoading ? (
                            <div className="space-y-2 animate-pulse">
                                <div className="h-4 bg-theme-border rounded w-full"></div>
                                <div className="h-4 bg-theme-border rounded w-5/6"></div>
                                <div className="h-4 bg-theme-border rounded w-full"></div>
                                <div className="h-4 bg-theme-border rounded w-4/6"></div>
                            </div>
                         ) : (
                             vows ? (
                                <div>
                                    <p className="text-theme-text-secondary whitespace-pre-wrap">{vows}</p>
                                    <button onClick={handleCopy} className="mt-4 text-sm bg-theme-border text-theme-text-primary font-semibold py-2 px-4 rounded-lg">Copy to Clipboard</button>
                                </div>
                             ) : (
                                <p className="text-theme-text-secondary">Your beautifully crafted vows will appear here once generated.</p>
                             )
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIVowGeneratorPage;