import React from 'react';

export const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#F5F3FF"/>
    <path d="M30 70L70 30" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round"/>
    <path d="M25 40L40 25" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round"/>
    <path d="M60 75L75 60" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round"/>
    <path d="M60 40L65 35" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round"/>
    <path d="M35 65L40 60" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);