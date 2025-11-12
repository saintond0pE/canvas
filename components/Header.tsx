import React from 'react';
import { CanvasLogo } from './icons/CanvasLogo';

interface HeaderProps {
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="py-4 px-8 sm:px-16 md:py-6 lg:px-24 bg-white border-b border-gray-200">
      <button onClick={onLogoClick} className="flex items-center gap-3 text-2xl font-bold text-gray-900 group cursor-pointer" aria-label="Go to homepage">
        <CanvasLogo />
      </button>
    </header>
  );
};

export default Header;