import React, { useState, useCallback, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ThumbnailEditor from './components/ThumbnailEditor';
import Header from './components/Header';
import { CursorTrail } from './components/CursorTrail';
import ProjectLibrary from './components/ProjectLibrary';
import FeedbackModal from './components/FeedbackModal';

type Page = 'landing' | 'library' | 'editor';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (userPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);


  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    const pageBackgrounds = {
      landing: 'bg-[#FDFBF5] dark:bg-gray-900',
      library: 'bg-gray-50 dark:bg-slate-950',
      editor: 'bg-white dark:bg-gray-900',
    };
    document.body.className = pageBackgrounds[currentPage] || 'bg-white dark:bg-gray-900';
    
    return () => {
      document.body.className = '';
    };
  }, [currentPage, theme]);

  const navigateToLibrary = useCallback(() => {
    setCurrentPage('library');
    setActiveProjectId(null);
  }, []);
  
  const navigateToEditor = useCallback((projectId: string | null) => {
    setActiveProjectId(projectId);
    setCurrentPage('editor');
  }, []);

  const navigateToHome = useCallback(() => {
    setCurrentPage('landing');
    setActiveProjectId(null);
  }, []);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <div className="bg-[#FDFBF5] dark:bg-gray-900">
            <LandingPage onGetStarted={navigateToLibrary} />
          </div>
        );
      case 'library':
        return <ProjectLibrary onSelectProject={navigateToEditor} onNewProject={() => navigateToEditor(null)} />;
      case 'editor':
        return <ThumbnailEditor projectId={activeProjectId} onNavigateBack={navigateToLibrary} />;
      default:
        return <LandingPage onGetStarted={navigateToLibrary} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      {isDesktop && <CursorTrail />}
      <Header 
        onLogoClick={currentPage === 'landing' ? navigateToHome : navigateToLibrary}
        onFeedbackClick={() => setIsFeedbackModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main>
        {renderPage()}
      </main>
      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
    </div>
  );
};

export default App;