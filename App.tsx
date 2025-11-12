import React, { useState, useCallback, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ThumbnailEditor from './components/ThumbnailEditor';
import Header from './components/Header';
import { CursorTrail } from './components/CursorTrail';
import ProjectLibrary from './components/ProjectLibrary';

type Page = 'landing' | 'library' | 'editor';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    const pageBackgrounds = {
      landing: 'bg-[#FDFBF5]',
      library: 'bg-gray-50',
      editor: 'bg-white',
    };
    document.body.className = pageBackgrounds[currentPage] || 'bg-white';
    
    return () => {
      document.body.className = '';
    };
  }, [currentPage]);

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
          <div className="bg-[#FDFBF5]">
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
    <div className="min-h-screen text-gray-800 font-sans">
      {isDesktop && <CursorTrail />}
      <Header onLogoClick={currentPage === 'landing' ? navigateToHome : navigateToLibrary} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
