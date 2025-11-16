import React from 'react';

const NostalgiaLanding: React.FC = () => {
    return (
        <div className="nostalgia-hub-light">
            <div className="container mx-auto px-6 py-24 text-center">
                <div className="max-w-4xl mx-auto mb-8">
                    <img src="https://i.ibb.co/6g2Sk7B/90s-collage.jpg" alt="90s South Indian Cinema Collage" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="flex justify-center gap-4">
                    <a href="#/90s-hub/games" className="bg-[#E88D38] text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition">
                        Play Games
                    </a>
                    <a href="#/app/messages" className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition">
                        Join Chat
                    </a>
                </div>
                <p className="text-theme-text-secondary mt-6 max-w-2xl mx-auto">
                    Explore the nostalgia of South Indian 90s culture. Play classic games, listen to iconic music, chat with fellow enthusiasts, and customize your profile.
                </p>
            </div>
        </div>
    );
};

export default NostalgiaLanding;