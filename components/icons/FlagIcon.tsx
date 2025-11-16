import React from 'react';

const FlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor"
    >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 6V3m0 18h18M3 3h18m-18 0V21m18-18v6.75A4.5 4.5 0 0116.5 15h-9a4.5 4.5 0 01-4.5-4.5V3" />
  </svg>
);

export default FlagIcon;