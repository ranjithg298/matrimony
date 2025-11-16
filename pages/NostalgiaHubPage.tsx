import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import NostalgiaHeader from '../components/nostalgia/NostalgiaHeader';
import NostalgiaLanding from '../components/nostalgia/NostalgiaLanding';
import NostalgiaGames from '../components/nostalgia/NostalgiaGames';
import NostalgiaMusic from '../components/nostalgia/NostalgiaMusic';
import NostalgiaProfile from '../components/nostalgia/NostalgiaProfile';

interface NostalgiaHubPageProps {
    currentUser: Profile;
    allProfiles: Profile[];
}

const NostalgiaHubPage: React.FC<NostalgiaHubPageProps> = ({ currentUser }) => {
    const [hubRoute, setHubRoute] = useState('home');

    useEffect(() => {
        const handleHashChange = () => {
            const hashParts = window.location.hash.split('/');
            setHubRoute(hashParts[2] || 'home');
        };
        handleHashChange(); // Set initial route
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderContent = () => {
        switch (hubRoute) {
            case 'games':
                return <NostalgiaGames />;
            case 'music':
                return <NostalgiaMusic />;
            case 'profile':
                return <NostalgiaProfile currentUser={currentUser} />;
            case 'home':
            default:
                return <NostalgiaLanding />;
        }
    };

    return (
        <div className="nostalgia-hub min-h-screen">
            <NostalgiaHeader currentUser={currentUser} />
            <main>
                {renderContent()}
            </main>
        </div>
    );
};

export default NostalgiaHubPage;