import React, { useEffect, useRef, useState } from 'react';

interface CaptchaProps {
    onGenerated: (text: string) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onGenerated }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [key, setKey] = useState(Date.now()); // Used to force re-render

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Generate random text
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let text = '';
        for (let i = 0; i < 6; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        onGenerated(text);

        // Styling
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#2F2E39'; // theme-border
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw text with effects
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            ctx.save();
            // Random color, rotation, and position for each character
            ctx.fillStyle = `rgb(${150 + Math.random() * 105}, ${150 + Math.random() * 105}, ${200 + Math.random() * 55})`;
            ctx.translate(25 + i * 25, canvas.height / 2);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillText(char, 0, 0);
            ctx.restore();
        }

        // Draw some random lines for noise
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgba(180, 180, 200, 0.5)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

    }, [onGenerated, key]);

    return (
        <div className="flex items-center gap-2">
            <canvas ref={canvasRef} width="180" height="50" className="rounded-lg" />
            <button type="button" onClick={() => setKey(Date.now())} title="Reload Captcha" className="p-2 bg-theme-border rounded-lg hover:bg-theme-border/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M20 4l-4 4M4 20l4-4" />
                </svg>
            </button>
        </div>
    );
};

export default Captcha;