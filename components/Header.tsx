
import React from 'react';
import { CanvasLogo } from './icons/CanvasLogo';
import { FeedbackIcon } from './icons/FeedbackIcon';
import { LoginIcon } from './icons/LoginIcon';
import ThemeToggle from './ThemeToggle';
import { User } from '../types';

interface HeaderProps {
    onLogoClick: () => void;
    onFeedbackClick: () => void;
    onLoginClick: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    user: User | null;
    profileRef?: React.RefObject<HTMLButtonElement>;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onFeedbackClick, onLoginClick, theme, onToggleTheme, user, profileRef }) => {
  return (
    <header className="py-4 px-8 sm:px-16 md:py-6 lg:px-24 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center transition-colors duration-300 sticky top-0 z-40">
      <button onClick={onLogoClick} className="flex items-center gap-3 text-2xl font-bold text-gray-900 group cursor-pointer" aria-label="Go to homepage">
        <CanvasLogo />
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={onFeedbackClick}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
        >
          <FeedbackIcon className="w-5 h-5" />
          <span>Feedback</span>
        </button>
        
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <button
          ref={profileRef}
          onClick={onLoginClick}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
          aria-label={user ? "User Profile" : "Log in"}
        >
          {user ? (
             user.avatar ? (
                 <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border border-gray-300 dark:border-slate-600" />
             ) : (
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                </div>
             )
          ) : (
             <LoginIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
