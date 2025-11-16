import React, { useState, useRef } from 'react';
import { Profile, HappyStory } from '../types';

interface TellYourStoryPageProps {
    currentUser: Profile;
    onSubmit: (submission: Omit<HappyStory, 'id'>) => void;
}

const TellYourStoryPage: React.FC<TellYourStoryPageProps> = ({ currentUser, onSubmit }) => {
    const [formState, setFormState] = useState({
        yourName: currentUser.name,
        partnerName: '',
        yourEmail: currentUser.email,
        partnerEmail: '',
        firstMeetDate: '',
        weddingDate: '',
        story: '',
        photos: [] as string[],
        agreeTerms: false,
        featureAds: false,
    });
    const photoInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormState(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormState(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const photoPromises = files.map((file: File) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(photoPromises).then(base64Photos => {
                setFormState(prev => ({ ...prev, photos: [...prev.photos, ...base64Photos] }));
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.agreeTerms) {
            alert('You must agree to the terms and conditions.');
            return;
        }
        if (formState.photos.length === 0) {
            alert('Please upload at least one photo.');
            return;
        }
        
        const submission: Omit<HappyStory, 'id'> = {
            coupleNames: `${formState.yourName} & ${formState.partnerName}`,
            weddingDate: formState.weddingDate,
            imageUrl: formState.photos[0],
            story: formState.story,
        };
        onSubmit(submission);
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Thank you for sharing your Story!</h1>
                    <p className="text-theme-text-secondary mt-2">Your story might inspire many others to find their life partners too!</p>
                </div>
                 <div className="text-center border-y border-theme-border py-8 mb-8">
                    <img src="https://i.ibb.co/6rC6P2Q/anupam-mittal.png" alt="Anupam Mittal" className="w-24 h-24 rounded-full mx-auto" />
                    <p className="mt-4 text-lg italic text-theme-text-secondary max-w-2xl mx-auto">"The Shaadi Team would like to wish you and your better half, a life full of love, laughter and togetherness!"</p>
                    <p className="font-bold mt-2 text-theme-text-primary">Best Wishes, Anupam Mittal</p>
                    <p className="text-sm text-theme-text-secondary">Founder, matrimony.ai</p>
                </div>


                <form onSubmit={handleSubmit} className="bg-theme-surface p-8 rounded-xl border border-theme-border">
                    <h2 className="text-xl font-semibold mb-6 border-b border-theme-border pb-3">Give us details of you & your partner</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <input type="text" name="yourName" value={formState.yourName} onChange={handleChange} placeholder="Your Name" className="w-full bg-theme-bg p-3 rounded-md border border-theme-border" required />
                        <input type="text" name="partnerName" value={formState.partnerName} onChange={handleChange} placeholder="Your Partner's Name" className="w-full bg-theme-bg p-3 rounded-md border border-theme-border" required />
                        <input type="email" name="yourEmail" value={formState.yourEmail} onChange={handleChange} placeholder="Your Email ID" className="w-full bg-theme-bg p-3 rounded-md border border-theme-border" required />
                        <input type="email" name="partnerEmail" value={formState.partnerEmail} onChange={handleChange} placeholder="Your Partner's Email ID" className="w-full bg-theme-bg p-3 rounded-md border border-theme-border" />
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm text-theme-text-secondary mb-1">When did you first meet?</label>
                            <input type="date" name="firstMeetDate" value={formState.firstMeetDate} onChange={handleChange} className="w-full bg-theme-bg p-3 rounded-md border border-theme-border" />
                        </div>
                        <div>
                            <label className="block text-sm text-theme-text-secondary mb-1">Your Wedding Date</label>
                            <input type="date" name="weddingDate" value={formState.weddingDate} onChange={handleChange} className="w-full bg-theme-bg p-3 rounded-md border border-theme-border" />
                        </div>
                    </div>
                    
                    <div className="mb-6">
                         <label className="block text-sm text-theme-text-secondary mb-1">Tell us how you met on {`matrimony.ai`}</label>
                         <textarea name="story" value={formState.story} onChange={handleChange} rows={6} className="w-full bg-theme-bg p-3 rounded-md border border-theme-border" required></textarea>
                    </div>

                    <div className="mb-6">
                         <label className="block text-sm text-theme-text-secondary mb-1">Your Couple or Wedding Photos</label>
                         <input type="file" ref={photoInputRef} onChange={handlePhotoChange} multiple accept="image/*" className="hidden" />
                         <button type="button" onClick={() => photoInputRef.current?.click()} className="w-full text-sm bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-2 px-3 rounded-md border border-theme-border">
                            Upload Photos
                         </button>
                         <div className="mt-2 flex flex-wrap gap-2">
                            {formState.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`preview ${index+1}`} className="w-20 h-20 rounded-md object-cover" />
                            ))}
                         </div>
                    </div>

                    <div className="space-y-4 mt-8">
                        <label className="flex items-start gap-3">
                            <input type="checkbox" name="agreeTerms" checked={formState.agreeTerms} onChange={handleChange} className="mt-1 h-4 w-4" required />
                            <span className="text-sm text-theme-text-secondary">I have read and agree to the Terms & Conditions of sharing my story and photos.</span>
                        </label>
                        <label className="flex items-start gap-3">
                            <input type="checkbox" name="featureAds" checked={formState.featureAds} onChange={handleChange} className="mt-1 h-4 w-4" />
                            <span className="text-sm text-theme-text-secondary">I would like my story to be featured in matrimony.ai's advertisements.</span>
                        </label>
                    </div>

                    <div className="mt-8 text-center">
                        <button type="submit" className="bg-theme-gradient text-white font-bold py-3 px-8 rounded-lg hover:opacity-90">Submit My Story</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TellYourStoryPage;