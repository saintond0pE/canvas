import React from 'react';

export const PromptCoachIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
    className={`w-8 h-8 ${props.className || ''}`}
  >
    {/* A friendly, rounded top hat tilted slightly for personality */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.757 14.5C3.415 14.5 1.5 13.528 1.5 12.333V11.167C1.5 9.972 3.415 9 5.757 9H18.243C20.585 9 22.5 9.972 22.5 11.167V12.333C22.5 13.528 20.585 14.5 18.243 14.5H5.757z"
    />
    <path
      d="M5 10C5 9.44771525 5.44771525 9 6 9H18C18.5522847 9 19 9.44771525 19 10V20C19 20.5522847 18.5522847 21 18 21H6C5.44771525 21 5 20.5522847 5 20V10Z"
      transform="translate(12, 15) rotate(-5) translate(-12, -15)"
    />
    
    {/* A single, prominent sparkle, inspired by the brand's logo */}
    <path
      d="M12 1L13.65 5.35L18 7L13.65 8.65L12 13L10.35 8.65L6 7L10.35 5.35L12 1Z"
      transform="translate(0, -2.5) scale(0.8)"
    />
  </svg>
);