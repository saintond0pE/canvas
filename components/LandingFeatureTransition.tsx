import React from 'react';

const trailShapes = [
  { color: '#A8B5F9', size: 'w-8 h-8', className: 'rounded-lg' },
  { color: '#F472B6', size: 'w-7 h-7', className: 'rounded-md' },
  { color: '#F97316', size: 'w-6 h-6', className: 'rounded-full' },
  { color: '#84A98C', size: 'w-5 h-5', className: 'rounded-sm transform rotate-45' },
  { color: '#C4B5FD', size: 'w-4 h-4', className: 'rounded-lg' },
  { color: '#F472B6', size: 'w-3.5 h-3.5', className: 'rounded-md' },
  { color: '#F97316', size: 'w-3 h-3', className: 'rounded-full' },
  { color: '#84A98C', size: 'w-2.5 h-2.5', className: 'rounded-sm transform rotate-45' },
  { color: '#C4B5FD', size: 'w-2 h-2', className: 'rounded-sm' },
  { color: '#F472B6', size: 'w-1.5 h-1.5', className: 'rounded-sm' },
  { color: '#F97316', size: 'w-1 h-1', className: 'rounded-full' },
];


export const LandingFeatureTransition: React.FC = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl bg-[#232333] p-8">
      {/* Inner container with inset shadow */}
      <div className="relative w-full h-full bg-[#1a1a2e] rounded-2xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center gap-16">
        {/* Orange Circle */}
        <div 
          className="w-12 h-12 bg-orange-500 rounded-full"
        />
        {/* Pink Rounded Square */}
        <div 
          className="w-16 h-12 bg-pink-500 rounded-lg"
        />
        {/* Pink Line */}
        <div 
          className="w-1 h-10 bg-pink-500"
        />
      </div>

      {/* Shape trail at the bottom */}
      <div className="absolute bottom-8 left-8 flex items-end gap-2">
        {trailShapes.map((shape, index) => (
          <div
            key={index}
            className={`${shape.size} ${shape.className}`}
            style={{ backgroundColor: shape.color }}
          />
        ))}
      </div>
    </div>
  );
};
