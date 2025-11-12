import React from 'react';

interface FeatureIconProps {
  type: 'security' | 'flexibility';
  className?: string;
}

export const FeatureIcons: React.FC<FeatureIconProps> = ({ type, className }) => {
  const commonClasses = "w-12 h-12";
  const finalClassName = `${commonClasses} ${className || ''}`;

  if (type === 'security') {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={finalClassName}>
        <rect width="48" height="48" rx="12" fill="#FEF2F2"/>
        <path d="M24 11L12 17V24C12 31.1 17.6 37.7 24 39C30.4 37.7 36 31.1 36 24V17L24 11Z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 24L23 27L28 22" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  if (type === 'flexibility') {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={finalClassName}>
        <rect width="48" height="48" rx="12" fill="#EFF6FF"/>
        <path d="M14 20L20 14" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 28L28 34" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 28L28 14" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 34L34 20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  return null;
};
