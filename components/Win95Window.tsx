import React, { useState, useRef, useEffect } from 'react';

interface Win95WindowProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onFocus: () => void;
    isActive: boolean;
    zIndex: number;
}

const Win95Window: React.FC<Win95WindowProps> = ({ title, children, onClose, onFocus, isActive, zIndex }) => {
    const [position, setPosition] = useState({ x: 50 + Math.random() * 100, y: 50 + Math.random() * 100 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        onFocus();
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !windowRef.current) return;
            let newX = e.clientX - dragStartPos.current.x;
            let newY = e.clientY - dragStartPos.current.y;

            // Constrain to viewport
            const { innerWidth, innerHeight } = window;
            const { offsetWidth, offsetHeight } = windowRef.current;
            newX = Math.max(0, Math.min(newX, innerWidth - offsetWidth));
            newY = Math.max(0, Math.min(newY, innerHeight - offsetHeight - 32)); // 32 for taskbar

            setPosition({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={windowRef}
            className="win95-window"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: zIndex,
            }}
            onMouseDown={onFocus}
        >
            <div className={`win95-title-bar ${isActive ? 'active' : ''}`} onMouseDown={handleMouseDown}>
                <span>{title}</span>
                <div className="win95-title-bar-buttons">
                    <button className="win95-title-bar-button" disabled>_</button>
                    <button className="win95-title-bar-button" disabled>▢</button>
                    <button className="win95-title-bar-button" onClick={onClose}>×</button>
                </div>
            </div>
            <div className="win95-window-content">
                {children}
            </div>
        </div>
    );
};

export default Win95Window;