import React from 'react';

const NostalgiaMusic: React.FC = () => {
    return (
        <div className="nostalgia-hub-dark min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-6">
                    <img src="https://i.ibb.co/L5B7wMS/kadhal-rojave.jpg" alt="Album Art" className="w-full h-full object-cover" />
                </div>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Kadhal Rojave</h2>
                    <p className="text-theme-text-secondary">A.R. Rahman</p>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-2">
                    <div className="bg-gray-700 h-1 rounded-full"></div>
                    <div className="bg-white h-1 rounded-full absolute top-0" style={{ width: '50%' }}></div>
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1/2 -translate-y-1/2" style={{ left: '50%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-theme-text-secondary">
                    <span>1:17</span>
                    <span>2:23</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-8 mt-6">
                    <button className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14.208V5.792a1 1 0 00-1.555-.832L3.62 9.168a1 1 0 000 1.664l4.825 4z" /><path d="M11.555 5.168A1 1 0 0113 5.792v8.416a1 1 0 01-1.445.832l-4.825-4a1 1 0 010-1.664l4.825-4z" /></svg>
                    </button>
                    <button className="bg-[#6132F2] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                    </button>
                    <button className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M11.555 5.168A1 1 0 0113 5.792v8.416a1 1 0 01-1.445.832l-4.825-4a1 1 0 010-1.664l4.825-4z" transform="scale(-1, 1) translate(-20, 0)" /><path d="M8.445 14.832A1 1 0 0010 14.208V5.792a1 1 0 00-1.555-.832L3.62 9.168a1 1 0 000 1.664l4.825 4z" transform="scale(-1, 1) translate(-20, 0)" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NostalgiaMusic;