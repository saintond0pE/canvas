import React from 'react';

export const RemixIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#FFFBEB"/>
    <path 
      d="M50 50C50 50 65 35 70 40C75 45 65 60 50 60C35 60 25 45 30 40C35 35 50 50 50 50Z" 
      stroke="#F59E0B" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M50 50C50 50 60 65 60 70C60 75 45 65 40 50C35 35 50 25 50 30C50 35 50 50 50 50Z" 
      stroke="#FCD34D" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);