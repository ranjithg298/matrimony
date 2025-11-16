import React from 'react';

interface Win95ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Win95Button: React.FC<Win95ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            {...props}
            className={`win95-button ${className || ''}`}
        >
            {children}
        </button>
    );
};

export default Win95Button;