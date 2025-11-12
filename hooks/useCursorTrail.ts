import { useState, useEffect } from 'react';

const TRAIL_LENGTH = 15;

interface Point {
  x: number;
  y: number;
}

export const useCursorTrail = () => {
  const [trail, setTrail] = useState<Point[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY }];
        if (newTrail.length > TRAIL_LENGTH) {
          newTrail.shift();
        }
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return trail;
};
