import React from 'react';
import { BloomShapeType } from '../TapBloomEffect';

const colors = {
  orange: '#F97316',
  pink: '#EC4899',
  lavender: '#8B5CF6',
  sage: '#84A98C',
};

// All shapes are designed to be centered within a 30x30 viewbox
const shapeConfig: Record<BloomShapeType, { color: string; svg: React.ReactNode }> = {
  asterisk: {
    color: colors.orange,
    svg: (
      // A more balanced, centered 8-point star
      <path d="M15 5 L17.5 12 L24.5 14.75 L17.5 17.5 L15 24.5 L12.5 17.5 L5.5 14.75 L12.5 12 L15 5Z" />
    ),
  },
  semicircle: {
    color: colors.pink,
    svg: (
      // A proper top semi-circle, centered horizontally
      <path d="M5 15 C 5 9.477, 9.477 5, 15 5 C 20.523 5, 25 9.477, 25 15 Z" />
    ),
  },
  wavyline: {
    color: colors.sage,
    svg: (
      // The wavy line, now centered vertically
      <path d="M4 15 C 10.667 11.667, 21.6 11.8, 28 15" strokeWidth="4" strokeLinecap="round" fill="none" />
    ),
  },
  arc: {
    color: colors.lavender,
    svg: (
       // A smooth, clean arc that stays within bounds
      <path d="M25 5 C 15 5, 5 15, 5 25" strokeWidth="4" strokeLinecap="round" fill="none" />
    ),
  },
};


interface BloomShapeProps {
  type: BloomShapeType;
}

export const BloomShape: React.FC<BloomShapeProps> = ({ type }) => {
  const config = shapeConfig[type];

  return (
    <svg 
      width="30" 
      height="30" 
      viewBox="0 0 30 30" 
      fill={config.color} 
      stroke={config.color}
      xmlns="http://www.w3.org/2000/svg"
      className="transform -translate-x-1/2 -translate-y-1/2"
    >
      {config.svg}
    </svg>
  );
};
