import React from 'react';

export const RemixIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#FFFBEB"/>
    <path d="M70 30C70 41.0457 61.0457 50 50 50C38.9543 50 30 41.0457 30 30" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 70C30 58.9543 38.9543 50 50 50C61.0457 50 70 58.9543 70 70" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M45 25L30 30L25 45" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M55 75L70 70L75 55" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);