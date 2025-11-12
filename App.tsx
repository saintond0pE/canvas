import React, { useState, useCallback, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ThumbnailEditor from './components/ThumbnailEditor';
import Header from './components/Header';
import { CursorTrail } from './components/CursorTrail';

type Page = 'landing' | 'editor';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  useEffect(() => {
    // Set body class based on the current page for background colors
    if (currentPage === 'landing') {
      document.body.className = 'bg-[#FDFBF5]'; // Off-white canvas background
    } else {
      document.body.className = 'bg-white';
    }
    
    // Cleanup to ensure a predictable state
    return () => {
      document.body.className = '';
    };
  }, [currentPage]);

  const navigateToEditor = useCallback(() => {
    setCurrentPage('editor');
  }, []);

  const navigateToHome = useCallback(() => {
    setCurrentPage('landing');
  }, []);

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <CursorTrail />
      <Header onLogoClick={navigateToHome} />
      <main>
        {currentPage === 'landing' ? (
           <div className="bg-[#FDFBF5]">
            <LandingPage onGetStarted={navigateToEditor} />
           </div>
        ) : (
          <ThumbnailEditor />
        )}
      </main>
    </div>
  );
};

export default App;