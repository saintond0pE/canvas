import React from 'react';

interface LandingBackgroundShapesProps {
  scrollY: number;
}

const colors = {
  orange: '#F97316',
  pink: '#EC4899',
  lavender: '#8B5CF6',
  sage: '#84A98C',
};

export const LandingBackgroundShapes: React.FC<LandingBackgroundShapesProps> = ({ scrollY }) => {
  const scrollFactor = scrollY / 1000; // Normalize scroll value for subtle animations

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Top Left Shape */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-15"
        style={{
          backgroundColor: colors.lavender,
          filter: 'blur(100px)',
          top: '5%',
          left: '10%',
          transform: `translate(${scrollFactor * 50}px, ${scrollFactor * 30}px) rotate(${scrollFactor * 10}deg) scale(${1 + scrollFactor * 0.1})`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      {/* Top Right Shape */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          backgroundColor: colors.pink,
          filter: 'blur(120px)',
          top: '-10%',
          right: '-5%',
          transform: `translate(${scrollFactor * -40}px, ${scrollFactor * 20}px) rotate(${scrollFactor * -15}deg)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      {/* Bottom Right Shape - Activates on scroll */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-15"
        style={{
          backgroundColor: colors.orange,
          filter: 'blur(90px)',
          bottom: '5%',
          right: '15%',
          transform: `translate(${scrollFactor * -60}px, ${scrollFactor * -30}px) scale(${1 + scrollFactor * 0.2})`,
          transition: 'transform 0.5s ease-out',
        }}
      />
       {/* Bottom Left Shape - Activates on scroll */}
      <div
        className="absolute w-[400px] h-[400px] rounded-lg opacity-10"
        style={{
          backgroundColor: colors.sage,
          filter: 'blur(80px)',
          bottom: '10%',
          left: '-5%',
          transform: `rotate(${30 + scrollFactor * 20}deg)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
    </div>
  );
};
