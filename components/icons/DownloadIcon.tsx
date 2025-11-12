import React from 'react';

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#EBF8F2"/>
    <path d="M50 30V65" stroke="#34D399" strokeWidth="8" strokeLinecap="round"/>
    <path d="M35 50L50 65L65 50" stroke="#34D399" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);