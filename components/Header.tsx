import React, { useState } from 'react';
import { CanvasLogo } from './icons/CanvasLogo';
import { FeedbackIcon } from './icons/FeedbackIcon';
import { LikeIcon } from './icons/LikeIcon';
import { DislikeIcon } from './icons/DislikeIcon';
import ThemeToggle from './ThemeToggle';


interface HeaderProps {
    onLogoClick: () => void;
    onFeedbackClick: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onFeedbackClick, theme, onToggleTheme }) => {
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleLike = () => {
    setLiked(true);
    console.log("User feedback: Liked");
  };

  const handleDislike = () => {
    setLiked(false);
    console.log("User feedback: Disliked");
  };

  return (
    <header className="py-4 px-8 sm:px-16 md:py-6 lg:px-24 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center transition-colors duration-300">
      <button onClick={onLogoClick} className="flex items-center gap-3 text-2xl font-bold text-gray-900 group cursor-pointer" aria-label="Go to homepage">
        <CanvasLogo />
      </button>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-slate-800 rounded-full">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${liked === true ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-400' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
              aria-label="I like this"
            >
              <LikeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleDislike}
              className={`p-2 rounded-full transition-colors ${liked === false ? 'bg-red-100 dark:bg-red-800/50 text-red-600 dark:text-red-400' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
              aria-label="I don't like this"
            >
              <DislikeIcon className="w-5 h-5" />
            </button>
        </div>

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