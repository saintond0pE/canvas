import React from 'react';

export const EmotionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#FDF2F8"/>
    <path d="M50 65C60 65 65 55 65 50C65 45 60 35 50 35C40 35 35 45 35 50C35 55 40 65 50 65Z" stroke="#EC4899" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 50H60" stroke="#EC4899" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);