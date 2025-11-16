import React from 'react';

const WinLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 21 21" 
    width="21" height="21"
  >
    <path fill="#c0c0c0" d="M0 0h21v21H0z"/>
    <path fill="#000" d="M1 1h19v19H1z"/>
    <path fill="#c0c0c0" d="M2 2h17v17H2z"/>
    <path fill="#fff" d="M3 3h15v15H3z"/>
    <path fill="#c0c0c0" d="M4 4h13v13H4z"/>
    <path fill="#000080" d="M5 5h11v11H5z"/>
    <path fill="#c0c0c0" d="M6 6h9v9H6z"/>
    <path fill="#000" d="M14 7h-1v1h1zM8 8h1v1H8zM14 9h-1v1h1zM8 10h1v1H8zM14 11h-1v1h1zM8 12h1v1H8zM14 13h-1v1h1zM8 14h1v1H8z"/>
    <path fill="#fff" d="M9 8h1v1H9zM10 9h1v1h-1zM11 10h1v1h-1zM12 11h1v1h-1zM13 12h1v1h-1z"/>
    <path fill="#c0c0c0" d="M9 7h4v1H9zM8 7h1v1H8zM7 8h1v5H7zM8 13h5v1H8zM13 8h1v5h-1z"/>
  </svg>
);

export default WinLogoIcon;