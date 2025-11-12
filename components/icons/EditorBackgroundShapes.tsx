import React from 'react';

const colors = {
    orange: '#F97316',
    pink: '#EC4899',
    lavender: '#8B5CF6',
    sage: '#84A98C',
};


export const EditorBackgroundShapes: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            {/* Top Left Shape */}
            <div 
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15"
                style={{ backgroundColor: colors.lavender, filter: 'blur(80px)' }}
            />
            {/* Top Right Shape */}
             <div 
                className="absolute -top-24 right-0 -translate-x-1/4 w-[500px] h-[500px] rounded-full opacity-15"
                style={{ backgroundColor: colors.pink, filter: 'blur(100px)' }}
            />
            {/* Bottom Right Shape */}
             <div 
                className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 rounded-full opacity-15"
                style={{ backgroundColor: colors.orange, filter: 'blur(90px)' }}
            />
             {/* Bottom Left Shape */}
             <div 
                className="absolute bottom-0 -left-24 translate-y-1/4 w-[400px] h-[400px] rounded-lg opacity-10"
                style={{ backgroundColor: colors.sage, filter: 'blur(80px)', transform: 'rotate(30deg)' }}
            />
        </div>
    )
}