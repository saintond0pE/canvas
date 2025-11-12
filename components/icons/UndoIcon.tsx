import React from 'react';

export const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#EBF8FF"/>
    <path 
      d="M70 35C55 35 45 45 45 65" 
      stroke="#60A5FA" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
    <path 
      d="M55 55L45 65L35 55" 
      stroke="#60A5FA" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);