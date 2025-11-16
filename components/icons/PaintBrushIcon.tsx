import React from 'react';

const PaintBrushIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor"
    >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.21.498-.347.822-.365a2.25 2.25 0 012.28.287l2.28.287a2.25 2.25 0 012.287 2.28.09.09 0 00.082.103l.358.056a2.25 2.25 0 011.838 1.838.09.09 0 00.103.082l.287.287a2.25 2.25 0 01.287 2.28l.056.358a.09.09 0 00.103.082l2.28 2.287a2.25 2.25 0 01.287 2.28l-6.375 6.375a1.125 1.125 0 01-1.59 0z" />
  </svg>
);

export default PaintBrushIcon;