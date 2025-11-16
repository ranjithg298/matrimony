import React from 'react';
import { Profile } from '../../types';
import { NOSTALGIA_STICKERS, NOSTALGIA_MEMORIES } from '../../constants';

interface NostalgiaProfileProps {
    currentUser: Profile;
}

const NostalgiaProfile: React.FC<NostalgiaProfileProps> = ({ currentUser }) => {
    return (
        <div className="nostalgia-hub-light min-h-screen">
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="text-center mb-12">
                        <img src="https://i.ibb.co/D8R2z9P/avatar-priya.png" alt="Priya Sharma" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                        <h1 className="text-3xl font-bold">Priya Sharma</h1>
                        <p className="text-theme-text-secondary">@priya90s</p>
                        <p className="text-sm text-theme-text-secondary mt-1">Joined 2021</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center border-b border-theme-border mb-8">
                        <button className="py-2 px-4 border-b-2 border-theme-accent-primary text-theme-accent-primary font-semibold">Avatar</button>
                        <button className="py-2 px-4 text-theme-text-secondary font-semibold">Stickers</button>
                        <button className="py-2 px-4 text-theme-text-secondary font-semibold">Memories</button>
                    </div>

                    {/* Customize Avatar Section */}
                    <div className="mb-12">
                        <h2 className="text-xl font-bold mb-4">Customize Your Avatar</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-theme-text-secondary">Hairstyle</label>
                                <select className="w-full p-3 bg-theme-surface rounded-lg border border-theme-border mt-1">
                                    <option>90s Curls</option>
                                    <option>Classic Bob</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-theme-text-secondary">Clothing</label>
                                <select className="w-full p-3 bg-theme-surface rounded-lg border border-theme-border mt-1">
                                    <option>Salwar Kameez</option>
                                    <option>Denim Jacket</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-theme-text-secondary">Accessories</label>
                                <select className="w-full p-3 bg-theme-surface rounded-lg border border-theme-border mt-1">
                                    <option>Choker Necklace</option>
                                    <option>Round Glasses</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sticker Collection */}
                    <div className="mb-12">
                        <h2 className="text-xl font-bold mb-4">Sticker Collection</h2>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                            {NOSTALGIA_STICKERS.map((sticker, index) => (
                                <div key={index} className="bg-theme-surface p-2 rounded-lg border border-theme-border flex items-center justify-center">
                                    <img src={sticker} alt={`Sticker ${index + 1}`} className="w-full h-auto" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Favorite Memories */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Favorite Memories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {NOSTALGIA_MEMORIES.map((memory, index) => (
                                <div key={index}>
                                    <div className="bg-yellow-200 p-2 rounded-lg border-2 border-yellow-300">
                                        <img src={memory.image} alt={memory.title} className="w-full h-auto rounded" />
                                    </div>
                                    <p className="font-semibold mt-2">{memory.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NostalgiaProfile;