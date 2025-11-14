import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="w-14 h-8 rounded-full bg-gray-200 dark:bg-slate-700 relative flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-purple-500"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div
        className="w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center absolute"
        style={{
          transform: theme === 'light' ? 'translateX(4px)' : 'translateX(28px)',
        }}
      >
        {theme === 'light' ? (
          <SunIcon className="w-4 h-4 text-yellow-500" />
        ) : (
          <MoonIcon className="w-4 h-4 text-purple-400" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;