import React, { useState, useCallback, useRef } from 'react';
import { ImageFile } from '../types';
import FileUpload from './FileUpload';
import Button from './Button';
import Spinner from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UndoIcon } from './icons/UndoIcon';
import { RedoIcon } from './icons/RedoIcon';
import { VibrantUploadScene } from './icons/VibrantUploadScene';
import { editImageWithGemini, remixImage, interpretAndApplyEmotion, expandImage } from '../services/geminiService';
import { EditorBackgroundShapes } from './icons/EditorBackgroundShapes';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { RemixIcon } from './icons/RemixIcon';
import { EmotionIcon } from './icons/EmotionIcon';
import { ExpandIcon } from './icons/ExpandIcon';
import PromptCoach from './PromptCoach';

const ThumbnailEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isExtensionMenuOpen, setIsExtensionMenuOpen] = useState(false);
  
  const editedImage = history[historyIndex] || originalImage?.base64;

  const handleImageUpload = useCallback((file: ImageFile) => {
    setOriginalImage(file);
    setHistory([]);
    setHistoryIndex(-1);
    setError(null);
    setPrompt('');
  }, []);
  
  const handleStartOver = useCallback(() => {
    setOriginalImage(null);
  }, []);

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
    if (historyIndex > -1) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleDownload = (targetHeight: number) => {
    const imageToDownload = history[historyIndex];
    if (!imageToDownload) return;
    
    const img = new Image();
    img.onload = () => {
        const aspectRatio = img.width / img.height;
        const targetWidth = targetHeight * aspectRatio;

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `canvas_ai_${targetWidth}x${targetHeight}_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    img.src = imageToDownload;
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
                Start with a blank canvas
              </h1>
              <div className="mt-8 w-full max-w-2xl">
                <FileUpload onFileUpload={handleImageUpload} />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative min-h-[calc(100vh-89px)] flex flex-col items-center justify-center p-4 md:p-8">
            <EditorBackgroundShapes />
            
            <div className="relative w-full max-w-4xl aspect-video bg-white/20 rounded-2xl shadow-2xl overflow-hidden border-4 border-white/80 flex items-center justify-center">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-lg z-30">
                    <Spinner size="lg" />
                    <p className="text-gray-600 mt-4">AI is creating magic...</p>
                  </div>
                )}
                {editedImage ? (
                  <img src={editedImage} alt="Edited result" className="object-contain w-full h-full" />
                ) : (
                  <p>Upload an image to start</p>
                )}
            </div>
            
            <div className="relative mt-6 w-full max-w-4xl bg-white/50 backdrop-blur-2xl p-4 rounded-2xl shadow-lg border border-white/50">
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
                    <Button onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)} variant="icon" disabled={historyIndex < 0 || isLoading} aria-label="Download">
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
                    <Button onClick={() => setIsExtensionMenuOpen(!isExtensionMenuOpen)} variant="icon" disabled={historyIndex < 0 || isLoading} aria-label="Creative Extension">
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

                  <Button onClick={handleGenerate} disabled={isLoading || !prompt} size="lg" className="!py-4 h-full">
                    <SparklesIcon className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
            </div>
              <button onClick={handleStartOver} className="mt-4 text-sm text-gray-500 hover:text-gray-800 transition-colors">Start Over</button>
          </div>
        )}
      </div>
      {originalImage && <PromptCoach onApplySuggestion={handleApplySuggestion} />}
    </>
  );
};

export default ThumbnailEditor;
