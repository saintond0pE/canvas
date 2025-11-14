import React from 'react';
import { BloomShape } from './icons/BloomShapes';

export type BloomShapeType = 'asterisk' | 'semicircle' | 'wavyline' | 'arc';

export interface Bloom {
  id: number;
  x: number;
  y: number;
  type: BloomShapeType;
  rotation: number;
}

interface TapBloomEffectProps {
  blooms: Bloom[];
}

export const TapBloomEffect: React.FC<TapBloomEffectProps> = ({ blooms }) => {
  return (
    <>
      <style>{`
        @keyframes bloom-in-out {
          0% { transform: scale(0) rotate(var(--start-rotation)); opacity: 0; }
          20% { transform: scale(1.2) rotate(var(--mid-rotation)); opacity: 1; }
          80% { transform: scale(1) rotate(var(--end-rotation)); opacity: 1; }
          100% { transform: scale(0.8) rotate(var(--end-rotation)); opacity: 0; }
        }
        .animate-bloom {
          --start-rotation: 0deg;
          --mid-rotation: 0deg;
          --end-rotation: 0deg;
          animation: bloom-in-out 1500ms cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
      `}</style>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        {blooms.map(bloom => {
            const startRotation = `${bloom.rotation - 20}deg`;
            const midRotation = `${bloom.rotation + 10}deg`;
            const endRotation = `${bloom.rotation}deg`;

            return (
                <div
                    key={bloom.id}
                    className="absolute animate-bloom"
                    style={{
                        left: bloom.x,
                        top: bloom.y,
                        // @ts-ignore
                        '--start-rotation': startRotation,
                        '--mid-rotation': midRotation,
                        '--end-rotation': endRotation,
                    }}
                >
                    <BloomShape type={bloom.type} />
                </div>
            )
        })}
      </div>
    </>
  );
};
