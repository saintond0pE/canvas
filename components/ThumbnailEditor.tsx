import React, { useState, useCallback, useEffect } from 'react';
import { ImageFile, Project } from '../types';
import FileUpload from './FileUpload';
import Button from './Button';
import Spinner from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';
import { SaveIcon } from './icons/SaveIcon';
import { UndoIcon } from './icons/UndoIcon';
import { RedoIcon } from './icons/RedoIcon';
import { VibrantUploadScene } from './icons/VibrantUploadScene';
import { editImageWithGemini, remixImage, interpretAndApplyEmotion, expandImage, getPromptSuggestions, getPromptCoaching } from '../services/geminiService';
import { getProject, saveProject } from '../services/projectService';
import { EditorBackgroundShapes } from './icons/EditorBackgroundShapes';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { RemixIcon } from './icons/RemixIcon';
import { EmotionIcon } from './icons/EmotionIcon';
import { ExpandIcon } from './icons/ExpandIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { IdeaIcon } from './icons/IdeaIcon';
import { EnhanceIcon } from './icons/EnhanceIcon';

interface ThumbnailEditorProps {
  projectId: string | null;
  onNavigateBack: () => void;
}

const ThumbnailEditor: React.FC<ThumbnailEditorProps> = ({ projectId, onNavigateBack }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState<string>('');
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isExtensionMenuOpen, setIsExtensionMenuOpen] = useState(false);

  // State for the new creative assistant bar
  const [ideaMode, setIdeaMode] = useState<'ask' | 'enhance'>('ask');
  const [brainstormIdeas, setBrainstormIdeas] = useState<string[]>([]);
  const [isBrainstorming, setIsBrainstorming] = useState<boolean>(false);
  const [coachingResult, setCoachingResult] = useState<{ suggestion: string; tip: string } | null>(null);
  const [isCoaching, setIsCoaching] = useState<boolean>(false);
  
  useEffect(() => {
    if (projectId) {
      const loadedProject = getProject(projectId);
      if (loadedProject) {
        setCurrentProject(loadedProject);
        setProjectName(loadedProject.name);
        setOriginalImage(loadedProject.originalImage);
        setHistory(loadedProject.history);
        setHistoryIndex(loadedProject.history.length - 1);
      }
    } else {
      // Reset for a new project
      setCurrentProject(null);
      setProjectName('');
      setOriginalImage(null);
      setHistory([]);
      setHistoryIndex(-1);
    }
    setError(null);
    setPrompt('');
  }, [projectId]);

  const editedImage = history[historyIndex] || originalImage?.base64;

  const handleImageUpload = useCallback((file: ImageFile) => {
    setOriginalImage(file);
    setProjectName(file.name.replace(/\.[^/.]+$/, "") || 'Untitled Project');
    setHistory([]);
    setHistoryIndex(-1);
    setError(null);
    setPrompt('');
  }, []);
  
  const handleBack = useCallback(() => {
    onNavigateBack();
  }, [onNavigateBack]);

  const handleSave = useCallback(() => {
    if (!originalImage) return;

    const projectToSave: Project = {
      id: currentProject?.id || Date.now().toString(),
      name: projectName || 'Untitled Project',
      originalImage,
      history,
      createdAt: currentProject?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };
    saveProject(projectToSave);
    onNavigateBack();
  }, [originalImage, projectName, history, currentProject, onNavigateBack]);

  const handleAIAction = async (action: (base64: string, mimeType: string, prompt?: string) => Promise<string>) => {
    const imageToEdit = history[historyIndex] || originalImage?.base64;
    if (!imageToEdit || !originalImage) return;

    setIsLoading(true);
    setError(null);
    setIsExtensionMenuOpen(false);

    try {
      const result = await action(imageToEdit, originalImage.type, prompt);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(result);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt) {
      setError('Please provide a description of the changes.');
      return;
    }
    handleAIAction(editImageWithGemini);
  };

  const handleRemix = () => handleAIAction(remixImage);
  const handleInterpretEmotion = () => {
     if (!prompt) {
      setError('Please describe an emotion or scene in the text box first.');
      return;
    }
    handleAIAction(interpretAndApplyEmotion);
  }
  const handleExpand = () => handleAIAction(expandImage);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };
  
  const handleDownload = (targetHeight: number) => {
    if (!editedImage) return;
    
    const img = new Image();
    img.onload = () => {
        const aspectRatio = img.width / img.height;
        const targetWidth = Math.round(targetHeight * aspectRatio);

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${projectName.replace(/\s+/g, '_')}_${targetWidth}x${targetHeight}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    img.src = editedImage;
    setIsDownloadMenuOpen(false);
  };

  const handleGetBrainstormIdeas = async () => {
    const imageToAnalyze = history[historyIndex] || originalImage?.base64;
    if (!imageToAnalyze || !originalImage) return;

    setIsBrainstorming(true);
    setError(null);
    setBrainstormIdeas([]);
    setCoachingResult(null);

    try {
        const ideas = await getPromptSuggestions(imageToAnalyze, originalImage.type);
        setBrainstormIdeas(ideas);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get ideas.');
    } finally {
        setIsBrainstorming(false);
    }
  };

  const handleEnhancePrompt = async () => {
      if (!prompt.trim()) {
          setError("Write a prompt first, then I can enhance it!");
          return;
      }
      setIsCoaching(true);
      setError(null);
      setBrainstormIdeas([]);
      setCoachingResult(null);
      try {
          const result = await getPromptCoaching(prompt);
          setCoachingResult(result);
      } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to get coaching.');
      } finally {
          setIsCoaching(false);
      }
  };

  const handleApplyCoachingSuggestion = () => {
      if (coachingResult) {
          setPrompt(coachingResult.suggestion);
          setCoachingResult(null);
      }
  };

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
      <div className="relative min-h-[calc(100vh-89px)] overflow-hidden">
        {!originalImage ? (
          <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-89px)] px-4 overflow-hidden">
            <VibrantUploadScene className="absolute top-0 left-0 w-full h-full object-cover" />
            <div className="relative z-10 text-center flex flex-col items-center">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
                Create a new project
              </h1>
               <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">Upload an image to start your next masterpiece.</p>
              <div className="mt-8 w-full max-w-2xl">
                <FileUpload onFileUpload={handleImageUpload} />
              </div>
              <button onClick={handleBack} className="mt-8 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                &larr; Back to Projects
              </button>
            </div>
          </div>
        ) : (
          <div className="relative min-h-[calc(100vh-89px)] flex flex-col items-center justify-center p-4 md:p-8">
            <EditorBackgroundShapes />
            
            <div className="relative w-full max-w-4xl aspect-video bg-white/20 dark:bg-black/20 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/80 dark:border-white/10 flex items-center justify-center">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/70 dark:bg-black/70 flex flex-col items-center justify-center rounded-3xl z-30">
                    <Spinner size="lg" />
                    <p className="text-gray-600 dark:text-gray-300 mt-4">AI is creating magic...</p>
                  </div>
                )}
                <img src={editedImage} alt="Edited result" className="object-cover w-full h-full" />
            </div>
            
            <div className="relative mt-8 w-full max-w-4xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-2xl p-4 rounded-2xl shadow-lg border border-white/50 dark:border-white/10">
              <div className="w-full mb-4">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Untitled Project"
                  className="w-full text-xl font-bold bg-transparent border-0 border-b-2 border-gray-300/50 dark:border-gray-500/50 focus:ring-0 focus:border-pink-500 dark:focus:border-pink-400 transition-colors p-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <textarea
                    id="prompt"
                    rows={2}
                    className="w-full p-3 text-lg bg-white/80 dark:bg-slate-700/80 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-pink-400 dark:focus:border-pink-400 transition-colors dark:text-white dark:placeholder-gray-400"
                    placeholder="Describe your vision or an emotion..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button onClick={handleUndo} variant="icon" disabled={historyIndex < 0 || isLoading} aria-label="Undo">
                    <UndoIcon className="w-10 h-10" />
                  </Button>
                  <Button onClick={handleRedo} variant="icon" disabled={historyIndex >= history.length - 1 || isLoading} aria-label="Redo">
                    <RedoIcon className="w-10 h-10" />
                  </Button>
                  
                  <div className="relative">
                    <Button onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)} variant="icon" disabled={!editedImage || isLoading} aria-label="Download">
                      <DownloadIcon className="w-10 h-10" />
                    </Button>
                    {isDownloadMenuOpen && (
                      <div className="absolute bottom-full mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-20 right-0">
                          <button onClick={() => handleDownload(720)} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">HD (720p)</button>
                          <button onClick={() => handleDownload(1080)} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">Full HD (1080p)</button>
                          <button onClick={() => handleDownload(2160)} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">4K (2160p)</button>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <Button onClick={() => setIsExtensionMenuOpen(!isExtensionMenuOpen)} variant="icon" disabled={!editedImage || isLoading} aria-label="Creative Extension">
                      <MagicWandIcon className="w-10 h-10" />
                    </Button>
                    {isExtensionMenuOpen && (
                      <div className="absolute bottom-full right-0 mb-3 w-max bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl p-2 rounded-2xl shadow-lg border border-white/50 dark:border-white/20 flex items-center gap-2 z-20">
                        <Button onClick={handleRemix} variant="icon" disabled={isLoading}><RemixIcon className="w-10 h-10" /></Button>
                        <Button onClick={handleInterpretEmotion} variant="icon" disabled={isLoading}><EmotionIcon className="w-10 h-10" /></Button>
                        <Button onClick={handleExpand} variant="icon" disabled={isLoading}><ExpandIcon className="w-10 h-10" /></Button>
                      </div>
                    )}
                  </div>
                  
                  <Button onClick={handleSave} disabled={isLoading} size="lg" className="!py-4 h-full bg-green-500 hover:bg-green-600 focus:ring-green-500">
                    <SaveIcon className="w-6 h-6" />
                  </Button>

                  <Button onClick={handleGenerate} disabled={isLoading || !prompt} size="lg" className="!py-4 h-full">
                    <SparklesIcon className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
              
              <div className="mt-6 p-1 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[15px] p-5">

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100">
                        <SparklesIcon className="w-5 h-5 text-pink-500" />
                      </div>
                      <h3 className="text-lg font-bold">Creative Assistant</h3>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-gray-200/70 dark:bg-slate-700/70 p-1 border border-white/80 dark:border-white/10">
                      <button
                        onClick={() => { setIdeaMode('ask'); setBrainstormIdeas([]); setCoachingResult(null); }}
                        className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-300 ${ideaMode === 'ask' ? 'bg-white dark:bg-slate-600 shadow text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
                      >
                        <IdeaIcon className="w-5 h-5" />
                        Ask for Ideas
                      </button>
                      <button
                        onClick={() => { setIdeaMode('enhance'); setBrainstormIdeas([]); setCoachingResult(null); }}
                        className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-300 ${ideaMode === 'enhance' ? 'bg-white dark:bg-slate-600 shadow text-pink-700 dark:text-pink-300' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
                      >
                        <EnhanceIcon className="w-5 h-5" />
                        Enhance Prompt
                      </button>
                    </div>
                  </div>

                  <div className="min-h-[120px] bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 border border-white dark:border-white/10 shadow-inner">
                    {ideaMode === 'ask' && (
                      <>
                        {brainstormIdeas.length === 0 && !isBrainstorming && (
                          <div className="text-center animate-fade-in">
                              <p className="text-gray-600 dark:text-gray-300 mb-4">Get creative suggestions based on your image.</p>
                              <Button onClick={handleGetBrainstormIdeas} disabled={isLoading || isBrainstorming} className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:ring-purple-500 text-white shadow-lg hover:shadow-purple-500/50">
                                {isBrainstorming ? <><Spinner size="sm" /> Brainstorming...</> : 'Brainstorm Ideas'}
                              </Button>
                          </div>
                        )}
                        {isBrainstorming && <Spinner />}
                        {brainstormIdeas.length > 0 && (
                          <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
                            {brainstormIdeas.map((idea, i) => (
                              <button key={i} onClick={() => setPrompt(idea)} className="px-3 py-1.5 bg-purple-100 dark:bg-purple-800/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800/80 transition-colors shadow-sm hover:shadow-md">
                                "{idea}"
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {ideaMode === 'enhance' && (
                      <>
                        {!coachingResult && !isCoaching && (
                          <div className="text-center animate-fade-in">
                              <p className="text-gray-600 dark:text-gray-300 mb-4">Write a prompt above and I'll help you improve it.</p>
                              <Button onClick={handleEnhancePrompt} disabled={isLoading || isCoaching || !prompt.trim()} className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:ring-pink-500 text-white shadow-lg hover:shadow-pink-500/50">
                                {isCoaching ? <><Spinner size="sm" /> Enhancing...</> : 'Enhance My Prompt'}
                              </Button>
                          </div>
                        )}
                        {isCoaching && <Spinner />}
                        {coachingResult && (
                          <div className="p-4 bg-white/80 dark:bg-slate-700/50 rounded-lg border border-pink-200 dark:border-pink-800/50 w-full text-left animate-fade-in shadow-md">
                            <p className="font-semibold text-pink-800 dark:text-pink-300">Suggestion:</p>
                            <p className="text-pink-700 dark:text-pink-300/90 mt-1">"{coachingResult.suggestion}"</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-3">
                              <span className="font-semibold not-italic">🎨 Tip:</span> {coachingResult.tip}
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                              <Button onClick={handleApplyCoachingSuggestion} size="sm" className="bg-pink-500 hover:bg-pink-600 focus:ring-pink-500">
                                Use Suggestion
                              </Button>
                              <Button onClick={handleEnhancePrompt} size="sm" variant="secondary">
                                Try Again
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
              <button onClick={handleBack} className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
                &larr; Back to Projects
              </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ThumbnailEditor;