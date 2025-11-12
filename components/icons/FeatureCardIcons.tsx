import React from 'react';

interface FeatureCardIconProps {
  type: 'ai' | 'inspiration' | 'history';
}

export const FeatureCardIcons: React.FC<FeatureCardIconProps> = ({ type }) => {
  const baseClasses = "flex h-12 w-12 items-center justify-center rounded-lg";

  switch (type) {
    case 'ai':
      return (
        <div className={`${baseClasses} bg-pink-500/10`}>
          <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.5 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.5 18l-1.178.398a3.375 3.375 0 00-2.424 2.424z" />
          </svg>
        </div>
      );
    case 'inspiration':
      return (
        <div className={`${baseClasses} bg-purple-500/10`}>
          <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.186m-1.5.186a6.01 6.01 0 01-1.5-.186m3.75 7.375a6.01 6.01 0 01-7.5 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.186m-1.5.186a6.01 6.01 0 01-1.5-.186m3.75 7.375a6.01 6.01 0 01-7.5 0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v.01M12 6.75v.01M12 10.5v.01" />
          </svg>
        </div>
      );
    case 'history':
      return (
        <div className={`${baseClasses} bg-orange-500/10`}>
          <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-7.95 0a8.25 8.25 0 00-11.664 0" />
          </svg>
        </div>
      );
    default:
      return null;
  }
};
