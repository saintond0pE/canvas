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
import { editImageWithGemini, remixImage, interpretAndApplyEmotion, expandImage } from '../services/geminiService';
import { getProject, saveProject } from '../services/projectService';
import { EditorBackgroundShapes } from './icons/EditorBackgroundShapes';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { RemixIcon } from './icons/RemixIcon';
import { EmotionIcon } from './icons/EmotionIcon';
import { ExpandIcon } from './icons/ExpandIcon';
import PromptCoach from './PromptCoach';
import { SparklesIcon } from './icons/SparklesIcon';

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

  const handleApplySuggestion = useCallback((suggestion: string) => {
    setPrompt(suggestion);
  }, []);
  
  return (
    <>
      <div className="relative min-h-[calc(100vh-89px)] overflow-hidden">
        {!originalImage ? (
          <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-89px)] px-4 overflow-hidden">
            <VibrantUploadScene className="absolute top-0 left-0 w-full h-full object-cover" />
            <div className="relative z-10 text-center flex flex-col items-center">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800" style={{ textShadow: '2px 2px 8px rgba(255,255,255,0.3)' }}>
                Create a new project
              </h1>
               <p className="mt-4 text-lg text-gray-600 max-w-xl">Upload an image to start your next masterpiece.</p>
              <div className="mt-8 w-full max-w-2xl">
                <FileUpload onFileUpload={handleImageUpload} />
              </div>
              <button onClick={handleBack} className="mt-8 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                &larr; Back to Projects
              </button>
            </div>
          </div>
        ) : (
          <div className="relative min-h-[calc(100vh-89px)] flex flex-col items-center justify-center p-4 md:p-8">
            <EditorBackgroundShapes />
            
            <div className="relative w-full max-w-4xl aspect-video bg-white/20 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/80 flex items-center justify-center">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-3xl z-30">
                    <Spinner size="lg" />
                    <p className="text-gray-600 mt-4">AI is creating magic...</p>
                  </div>
                )}
                <img src={editedImage} alt="Edited result" className="object-cover w-full h-full" />
            </div>
            
            <div className="relative mt-8 w-full max-w-4xl bg-white/50 backdrop-blur-2xl p-4 rounded-2xl shadow-lg border border-white/50">
              <div className="w-full mb-4">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Untitled Project"
                  className="w-full text-xl font-bold bg-transparent border-0 border-b-2 border-gray-300/50 focus:ring-0 focus:border-pink-500 transition-colors p-2"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <textarea
                    id="prompt"
                    rows={2}
                    className="w-full p-3 text-lg bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
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
                      <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20 right-0">
                          <button onClick={() => handleDownload(720)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">HD (720p)</button>
                          <button onClick={() => handleDownload(1080)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Full HD (1080p)</button>
                          <button onClick={() => handleDownload(2160)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">4K (2160p)</button>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <Button onClick={() => setIsExtensionMenuOpen(!isExtensionMenuOpen)} variant="icon" disabled={!editedImage || isLoading} aria-label="Creative Extension">
                      <MagicWandIcon className="w-10 h-10" />
                    </Button>
                    {isExtensionMenuOpen && (
                      <div className="absolute bottom-full right-0 mb-3 w-max bg-white/60 backdrop-blur-2xl p-2 rounded-2xl shadow-lg border border-white/50 flex items-center gap-2 z-20">
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
                    {/* FIX: The SparklesIcon component was used but not imported. */}
                    <SparklesIcon className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
            </div>
              <button onClick={handleBack} className="mt-4 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                &larr; Back to Projects
              </button>
          </div>
        )}
      </div>
      {originalImage && <PromptCoach onApplySuggestion={handleApplySuggestion} />}
    </>
  );
};

export default ThumbnailEditor;