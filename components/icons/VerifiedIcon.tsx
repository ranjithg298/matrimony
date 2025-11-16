
import React from 'react';

// FIX: Add a `title` prop to the interface to be used for the SVG's <title> element for accessibility.
interface VerifiedIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

const VerifiedIcon: React.FC<VerifiedIconProps> = ({ title, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {title && <title>{title}</title>}
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 7.707a1 1 0 00-1.414-1.414L11 11.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export default VerifiedIcon;
