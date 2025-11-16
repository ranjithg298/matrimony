import React from 'react';

const PuzzlePieceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.66.538-1.192 1.192-1.192h.017c.654 0 1.192.532 1.192 1.192v.017a1.192 1.192 0 01-1.192 1.192h-.017A1.192 1.192 0 0114.25 6.104v-.017zM9.75 12.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v6" />
  </svg>
);

export default PuzzlePieceIcon;