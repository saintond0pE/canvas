import React from 'react';

export const ExpandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#ECFDF5"/>
    <path d="M60 30H70V40" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 70H30V60" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M70 60V70H60" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 40V30H40" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="35" y="35" width="30" height="30" rx="5" stroke="#10B981" strokeWidth="8" strokeLinejoin="round"/>
  </svg>
);