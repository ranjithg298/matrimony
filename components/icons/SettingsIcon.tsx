import React from 'react';

const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.912l2.25.378a1.5 1.5 0 0 1 1.258 1.488l.22.88a1.5 1.5 0 0 1-1.488 1.806l-2.25-.378a1.5 1.5 0 0 1-1.11-.912zM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5zM12 21a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5z" />
  </svg>
);

export default SettingsIcon;
