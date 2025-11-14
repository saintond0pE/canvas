import React from 'react';

export const EmotionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#FDF2F8"/>
    {/* Face */}
    <circle cx="50" cy="55" r="20" stroke="#EC4899" strokeWidth="8"/>
    {/* Smile */}
    <path d="M40 60C45 65 55 65 60 60" stroke="#EC4899" strokeWidth="8" strokeLinecap="round"/>
    {/* Color Palette Arc */}
    <path d="M30 40C35 25 65 25 70 40" stroke="#F472B6" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);