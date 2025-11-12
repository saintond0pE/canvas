import React from 'react';

export const CanvasLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="134" 
    height="40" 
    viewBox="0 0 134 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Canvas AI Logo"
    {...props}
  >
    {/* Lavender Circle */}
    <path d="M22.5 28C17.201 28 12 23.464 12 18C12 12.536 17.201 8 22.5 8" fill="#C4B5FD" />
    {/* Text "canvas" */}
    <text 
      x="25" 
      y="30" 
      fontFamily="Arial, sans-serif" 
      fontSize="30" 
      fontWeight="bold" 
      fill="#2D3748"
    >
      canvas
    </text>
    {/* Orange Asterisk */}
    <path d="M69.75 0.5L72.5 7.5L79.5 10.25L72.5 13L69.75 20L67 13L60 10.25L67 7.5L69.75 0.5Z" fill="#F97316"/>
    {/* Pink Semi-circle */}
    <path d="M110 18C110 11.3726 104.627 6 98 6V18H110Z" fill="#F472B6"/>
    {/* Sage Wavy Line */}
    <path d="M122 36C115.333 32.6667 104.4 32.8 98 36" stroke="#84A98C" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);