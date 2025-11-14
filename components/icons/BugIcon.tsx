import React from 'react';

export const BugIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}>
    <path d="M20 9V7a2 2 0 0 0-2-2h-4M4 9V7a2 2 0 0 1 2-2h4"/>
    <path d="m20 15-4-3h-4l-4 3"/>
    <path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/>
    <path d="M12 4v9"/><path d="m8 7 4 4 4-4"/>
  </svg>
);
