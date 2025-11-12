import React, { useState, useRef, useEffect } from 'react';
import { getPromptCoaching } from '../services/geminiService';
import { PromptCoachIcon } from './icons/PromptCoachIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SendIcon } from './icons/SendIcon';
import Spinner from './Spinner';

interface Message {
  role: 'user' | 'model';
  content: string;
  suggestion?: string;
  tip?: string;
}

interface PromptCoachProps {
  onApplySuggestion: (suggestion: string) => void;
}

const PromptCoach: React.FC<PromptCoachProps> = ({ onApplySuggestion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hey! I'm your Prompt Coach. I can help you write a stronger creative prompt. What are you trying to make?",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleCoach = () => setIsOpen(!isOpen);

  const sendMessage = async (messageText: string) => {
    setIsLoading(true);
    try {
      const result = await getPromptCoaching(messageText);
      const newModelMessage: Message = {
        role: 'model',
        content: '',
        suggestion: result.suggestion,
        tip: result.tip,
      };
      setMessages(prev => [...prev, newModelMessage]);
    } catch (error) {
      console.error("Error with Prompt Coach:", error);
      const errorMessage: Message = {
        role: 'model',
        content: "Sorry, I had a little trouble thinking of something. Please try again!",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    const newUserMessage: Message = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    sendMessage(userInput);
    setUserInput('');
  };
  
  const handleTryAgain = () => {
    const lastUserMessage = messages.findLast(m => m.role === 'user');
    if (lastUserMessage) {
        // Remove the last model response to replace it
        setMessages(prev => prev.slice(0, -1));
        sendMessage(lastUserMessage.content);
    }
  }

  const handleUseThis = (suggestion: string) => {
    onApplySuggestion(suggestion);
    toggleCoach();
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleCoach}
        className="fixed bottom-6 right-6 z-30 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-100"
        aria-label="Open Prompt Coach"
      >
        <PromptCoachIcon className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[90vw] max-w-sm h-[70vh] max-h-[600px] flex flex-col bg-white/60 backdrop-blur-3xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-slide-in">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200/80 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center">
            <PromptCoachIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Prompt Coach</h3>
        </div>
        <button onClick={toggleCoach} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded-full">
          <CloseIcon className="w-5 h-5" />
        </button>
      </header>

      {/* Chat Body */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'user' ? (
                <p className="max-w-xs bg-purple-500 text-white p-3 rounded-2xl rounded-br-none shadow-md">
                  {msg.content}
                </p>
              ) : (
                <div className="max-w-xs bg-white p-3 rounded-2xl rounded-bl-none shadow-md space-y-3">
                  {msg.content && <p className="text-gray-700">{msg.content}</p>}
                  {msg.suggestion && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="font-semibold text-purple-800">Try this:</p>
                      <p className="text-purple-700 mt-1">"{msg.suggestion}"</p>
                    </div>
                  )}
                  {msg.tip && (
                    <p className="text-sm text-gray-500 italic">
                      <span className="font-semibold not-italic">🎨 Tip:</span> {msg.tip}
                    </p>
                  )}
                  {msg.suggestion && (
                    <div className="flex items-center gap-2 pt-2">
                       <button onClick={() => handleUseThis(msg.suggestion!)} className="flex-1 px-3 py-1.5 text-sm font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                        Use This
                      </button>
                      <button onClick={handleTryAgain} className="flex-1 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="max-w-xs bg-white p-3 rounded-2xl rounded-bl-none shadow-md flex items-center gap-2">
                  <Spinner size="sm" />
                  <p className="text-gray-500 text-sm">Coach is thinking...</p>
               </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="p-4 border-t border-gray-200/80 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="e.g., 'make it red'"
            className="w-full pl-4 pr-12 py-3 bg-white/80 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            disabled={isLoading}
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-purple-500 text-white rounded-full hover:bg-purple-600 disabled:bg-purple-300 transition-colors" disabled={isLoading || !userInput.trim()}>
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default PromptCoach;
