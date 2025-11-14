import React from 'react';
import { BloomShapeType } from '../TapBloomEffect';

const colors = {
  orange: '#F97316',
  pink: '#EC4899',
  lavender: '#8B5CF6',
  sage: '#84A98C',
};

const shapeConfig: Record<BloomShapeType, { color: string; svg: React.ReactNode }> = {
  asterisk: {
    color: colors.orange,
    svg: (
      <path d="M15 0.5L17.5 7.5L24.5 10.25L17.5 13L15 20L12.5 13L5.5 10.25L12.5 7.5L15 0.5Z" />
    ),
  },
  semicircle: {
    color: colors.pink,
    svg: (
      <path d="M30 15C30 6.71573 23.2843 0 15 0V15H30Z" />
    ),
  },
  wavyline: {
    color: colors.sage,
    svg: (
      <path d="M2 18C8.66667 14.6667 19.6 14.8 26 18" strokeWidth="4" strokeLinecap="round" />
    ),
  },
  arc: {
    color: colors.lavender,
    svg: (
      <path d="M26 18C20.701 18 15.5 13.464 15.5 8C15.5 2.536 20.701 -2 26 -2" strokeWidth="4" strokeLinecap="round" fill="none" />
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