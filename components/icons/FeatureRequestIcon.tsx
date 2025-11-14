import React from 'react';

export const FeatureRequestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M12 2a7 7 0 0 0-7 7c0 3.04 1.63 5.22 3.84 6.78.75.54 1.16 1.4 1.16 2.22V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1c0-.82.41-1.68 1.16-2.22C17.37 14.22 19 12.04 19 9a7 7 0 0 0-7-7z" />
        <path d="M12 22v-2" />
    </svg>
);
