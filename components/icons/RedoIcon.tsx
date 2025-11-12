import React from 'react';

export const RedoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#FEFCE8"/>
    <path 
      d="M30 35C45 35 55 45 55 65" 
      stroke="#FBBF24" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
    <path 
      d="M45 55L55 65L65 55" 
      stroke="#FBBF24" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);