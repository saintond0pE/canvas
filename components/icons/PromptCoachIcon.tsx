import React from 'react';

export const PromptCoachIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    {...props}
  >
    {/* A modern, rounded chat bubble path */}
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z"></path>
    
    {/* A single, prominent sparkle inside, inspired by the brand */}
    <path d="M12 7v2"></path>
    <path d="M12 15v-2"></path>
    <path d="m14.12 8.46-1.41-1.41"></path>
    <path d="m9.29 13.31 1.41 1.41"></path>
    <path d="m14.12 13.31-1.41 1.41"></path>
    <path d="m9.29 8.46 1.41-1.41"></path>
  </svg>
);