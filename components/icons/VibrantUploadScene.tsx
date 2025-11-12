import React from 'react';

// New brand colors from the "canvas" logo
const colors = {
    bg: '#FDFBF5',
    orange: '#F97316',
    pink: '#EC4899',
    lavender: '#8B5CF6',
    sage: '#84A98C',
    lightLavender: '#DDD6FE',
    lightPink: '#FBCFE8',
};

export const VibrantUploadScene: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
<svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Background Gradient */}
    <rect width="1440" height="900" fill="url(#bg-gradient)"/>
    <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={colors.bg} />
        <stop offset="100%" stopColor="#F5F3FF" />
        </linearGradient>
    </defs>

    {/* Abstract Shapes - Inspired by user's reference */}
    {/* Bottom Left */}
    <g transform="translate(-100, 600)">
        <path d="M0 300C0 134.315 134.315 0 300 0H600V300H0Z" fill={colors.lavender} opacity="0.6"/>
        <circle cx="450" cy="150" r="80" fill={colors.lightLavender} opacity="0.8"/>
    </g>

    {/* Top Right */}
    <g transform="translate(900, -150) rotate(15)">
        <rect width="600" height="400" rx="50" fill={colors.lightPink} opacity="0.7"/>
        <rect x="50" y="50" width="500" height="300" rx="30" fill={colors.pink} opacity="0.6"/>
        {/* Halftone pattern */}
        <rect x="70" y="70" width="200" height="260" fill="url(#halftone)" />
    </g>

    {/* Center Left - Wavy */}
     <g transform="translate(50, 150)">
        <path d="M0 100 Q 150 -50 300 100 T 600 100" stroke={colors.sage} strokeWidth="15" opacity="0.5"/>
        <path d="M0 150 Q 150 0 300 150 T 600 150" stroke={colors.sage} strokeWidth="10" opacity="0.4"/>
    </g>

    {/* Center Right - Chart like */}
    <g transform="translate(1100, 400)">
        <rect y="160" width="80" height="140" fill={colors.orange} rx="10" opacity="0.9"/>
        <rect x="100" y="80" width="80" height="220" fill={colors.orange} rx="10" opacity="0.7"/>
        <rect x="200" y="0" width="80" height="300" fill={colors.orange} rx="10" opacity="0.5"/>
        <path d="M-50 300C50 200 200 350 350 300" stroke={colors.lavender} strokeWidth="20" strokeLinecap="round" opacity="0.6"/>
    </g>

    {/* Blurred circles for depth */}
    <g filter="url(#blur-filter)">
        <circle cx="200" cy="200" r="150" fill={colors.orange} opacity="0.15"/>
        <circle cx="1200" cy="150" r="100" fill={colors.sage} opacity="0.15"/>
        <circle cx="1300" cy="750" r="200" fill={colors.pink} opacity="0.2"/>
    </g>
    
    <defs>
        <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
        </filter>
        <pattern id="halftone" patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="10" cy="10" r="5" fill="white" opacity="0.5"/>
        </pattern>
    </defs>
</svg>
);