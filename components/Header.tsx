import React from 'react';
import { CanvasLogo } from './icons/CanvasLogo';
import { FeedbackIcon } from './icons/FeedbackIcon';
import ThemeToggle from './ThemeToggle';


interface HeaderProps {
    onLogoClick: () => void;
    onFeedbackClick: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onFeedbackClick, theme, onToggleTheme }) => {
  return (
    <header className="py-4 px-8 sm:px-16 md:py-6 lg:px-24 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center transition-colors duration-300">
      <button onClick={onLogoClick} className="flex items-center gap-3 text-2xl font-bold text-gray-900 group cursor-pointer" aria-label="Go to homepage">
        <CanvasLogo />
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={onFeedbackClick}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
        >
          <FeedbackIcon className="w-5 h-5" />
          <span>Feedback</span>
        </button>
        
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};

export default Header;