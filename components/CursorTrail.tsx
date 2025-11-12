import React from 'react';
import { useCursorTrail } from '../hooks/useCursorTrail';

const colors = ['#F97316', '#F472B6', '#C4B5FD', '#84A98C'];

const shapes = [
  // Circle
  { borderRadius: '50%' },
  // Square
  { borderRadius: '10%' },
  // "Pill"
  { borderRadius: '9999px', width: '2rem' },
  // Diamond (rotated square)
  { transform: 'rotate(45deg)', borderRadius: '20%' },
];

export const CursorTrail: React.FC = () => {
  const trail = useCursorTrail();

  return (
    <>
      {trail.map((point, index) => {
        const opacity = (index + 1) / trail.length;
        const scale = (index + 1) / trail.length;
        const shape = shapes[index % shapes.length];
        const color = colors[index % colors.length];

        return (
          <div
            key={index}
            className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50"
            style={{
              backgroundColor: color,
              ...shape,
              transform: `translate(${point.x - 12}px, ${point.y - 12}px) scale(${scale}) ${shape.transform || ''}`,
              opacity: opacity,
              transition: 'transform 0.2s cubic-bezier(0, 0, 0.5, 2), opacity 0.3s ease-out',
            }}
          />
        );
      })}
    </>
  );
};
