
import React, { useEffect, useState } from 'react';

interface SparkleTransitionProps {
  startRect: DOMRect;
  endRect: DOMRect;
  onComplete: () => void;
}

interface Particle {
  id: number;
  tx: number; // translation X
  ty: number; // translation Y
  scale: number;
  color: string;
  delay: number;
  duration: number;
  cp1x: number; // Control point 1 X (for bezier curve simulation)
  cp1y: number; // Control point 1 Y
}

const COLORS = ['#F97316', '#EC4899', '#8B5CF6', '#FFFFFF'];

export const SparkleTransition: React.FC<SparkleTransitionProps> = ({ startRect, endRect, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 24;
    const newParticles: Particle[] = [];

    // Calculate centers
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;

    // Distance
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    for (let i = 0; i < particleCount; i++) {
      // Randomize curve control points to create an "arc" or "swarm" effect
      // We want them to curve outward slightly
      const spread = 100 + Math.random() * 200;
      const direction = i % 2 === 0 ? 1 : -1;
      
      newParticles.push({
        id: i,
        tx: deltaX,
        ty: deltaY,
        scale: 0.5 + Math.random() * 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.2, // Slight stagger
        duration: 0.8 + Math.random() * 0.4,
        cp1x: deltaX / 2 + (Math.random() * spread * direction), // Control point X relative to start
        cp1y: deltaY / 2 + (Math.random() * spread) // Control point Y relative to start
      });
    }

    setParticles(newParticles);

    // Cleanup time = max delay + max duration
    const maxTime = 1400; 
    const timer = setTimeout(() => {
      onComplete();
    }, maxTime);

    return () => clearTimeout(timer);
  }, [startRect, endRect, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full shadow-[0_0_8px_currentColor]"
          style={{
            left: startRect.left + startRect.width / 2,
            top: startRect.top + startRect.height / 2,
            width: '8px',
            height: '8px',
            backgroundColor: p.color,
            color: p.color,
            // We use CSS variables to pass the dynamic values to the keyframes
            // @ts-ignore
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--cp1x': `${p.cp1x}px`,
            '--cp1y': `${p.cp1y}px`,
            animation: `fly-sparkle ${p.duration}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @property --progress {
          syntax: '<number>';
          inherits: false;
          initial-value: 0;
        }

        @keyframes fly-sparkle {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          10% {
             transform: translate(0, 0) scale(1);
             opacity: 1;
          }
          80% {
            opacity: 1;
            transform: translate(var(--tx), var(--ty)) scale(0.5);
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(2);
            opacity: 0;
          }
        }
        
        /* 
           Note: A true bezier path in CSS usually requires nested elements or offset-path.
           For simplicity and performance in this 'swarm', we are doing a direct translation
           but usually, for the 'arc', we would use motion-path if browser support was 100% consistent 
           without vendor prefixes, or a nested rotation trick.
           
           To get the "Arc" effect without offset-path, we can use the "two-axis" animation trick:
           X axis animates linear, Y axis animates with a curve.
        */
      `}</style>
      
      {/* 
         Overwrite the standard animation above with a two-axis animation for the arc effect.
         We wrap the particle in a container.
      */}
      {particles.map((p) => (
          <div
             key={`container-${p.id}`}
             className="absolute"
             style={{
                left: startRect.left + startRect.width / 2,
                top: startRect.top + startRect.height / 2,
                animation: `fly-x ${p.duration}s ease-in forwards`,
                animationDelay: `${p.delay}s`,
                // @ts-ignore
                '--dest-x': `${p.tx}px`,
             }}
          >
              <div 
                className="w-3 h-3 rounded-full blur-[1px]"
                style={{
                    backgroundColor: p.color,
                    boxShadow: `0 0 10px ${p.color}`,
                    animation: `fly-y ${p.duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, scale-pulse ${p.duration}s ease-out forwards`,
                    // @ts-ignore
                    '--dest-y': `${p.ty}px`,
                }}
              />
          </div>
      ))}
      <style>{`
          @keyframes fly-x {
              to { transform: translateX(var(--dest-x)); }
          }
          @keyframes fly-y {
              0% { transform: translateY(0); }
              /* Adding a slight dip or rise based on index would be cool, but cubic-bezier gives a nice snap */
              to { transform: translateY(var(--dest-y)); }
          }
          @keyframes scale-pulse {
              0% { transform: scale(0); opacity: 0; }
              10% { transform: scale(1.5); opacity: 1; }
              90% { transform: scale(0.8); opacity: 1; }
              100% { transform: scale(3); opacity: 0; } /* Burst at the end */
          }
      `}</style>
    </div>
  );
};
