import React from 'react';
import { NOSTALGIA_GAMES } from '../../constants';

const NostalgiaGames: React.FC = () => {
    return (
        <div className="nostalgia-hub-dark min-h-screen">
            <div className="container mx-auto px-6 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">90s Games</h1>
                <p className="text-theme-text-secondary mb-12 max-w-2xl mx-auto">
                    Relive the magic of the 90s with our collection of classic games. Play with friends or challenge yourself!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {NOSTALGIA_GAMES.map(game => (
                        <div key={game.name} className="flex flex-col items-center">
                            <div className="w-full aspect-square rounded-lg overflow-hidden mb-4">
                                <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg font-semibold">{game.name}</h3>
                        </div>
                    ))}
                </div>
                <button className="mt-12 bg-theme-surface text-theme-text-primary font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition">
                    View All Games
                </button>
            </div>
        </div>
    );
};

export default NostalgiaGames;