import React from 'react';

interface DesktopIconProps {
    icon: string;
    label: string;
    onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onDoubleClick }) => {
    return (
        <div 
            onDoubleClick={onDoubleClick}
            className="flex flex-col items-center w-20 cursor-pointer p-1 rounded group"
        >
            <span className="text-4xl mb-1 group-hover:bg-blue-800/50 p-1">{icon}</span>
            <span className="text-white text-xs text-center bg-blue-900/50 group-hover:bg-blue-800 px-1 py-0.5">{label}</span>
        </div>
    );
};

export default DesktopIcon;