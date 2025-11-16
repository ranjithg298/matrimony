import React from 'react';
import { NOSTALGIA_GAMES, NOSTALGIA_PUZZLE_IMAGES } from '../../constants';

const GameCard: React.FC<{ title: string, imageUrl: string, link: string}> = ({ title, imageUrl, link }) => (
    <a href={link} className="flex flex-col items-center group">
        <div className="w-full aspect-square rounded-lg overflow-hidden mb-4 transform transition-transform duration-300 group-hover:scale-105">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-semibold group-hover:text-theme-accent-primary transition-colors">{title}</h3>
    </a>
)

const NostalgiaGames: React.FC = () => {
    const puzzleGames = [
        { name: 'Power Rangers Puzzle', image: NOSTALGIA_PUZZLE_IMAGES['power-rangers'], link: '#/90s-hub/puzzle/power-rangers'},
        { name: 'Shinchan Puzzle', image: NOSTALGIA_PUZZLE_IMAGES['shinchan'], link: '#/90s-hub/puzzle/shinchan' },
        { name: 'Mr. Bean Puzzle', image: NOSTALGIA_PUZZLE_IMAGES['mr-bean'], link: '#/90s-hub/puzzle/mr-bean' },
    ]

    return (
        <div className="nostalgia-hub-dark min-h-screen">
            <div className="container mx-auto px-6 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">90s Games</h1>
                <p className="text-theme-text-secondary mb-12 max-w-2xl mx-auto">
                    Relive the magic of the 90s with our collection of classic games. Play with friends or challenge yourself!
                </p>

                <h2 className="text-2xl font-bold mb-8 text-left">Jigsaw Puzzles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {puzzleGames.map(game => (
                        <GameCard key={game.name} title={game.name} imageUrl={game.image} link={game.link} />
                    ))}
                </div>

                <div className="border-t border-gray-700 my-12"></div>
                
                <h2 className="text-2xl font-bold mb-8 text-left">Classic Board Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {NOSTALGIA_GAMES.map(game => (
                       <GameCard key={game.name} title={game.name} imageUrl={game.image} link={game.link} />
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