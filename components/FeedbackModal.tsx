import React, { useState, useEffect, useCallback } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import Spinner from './Spinner';
import { DislikeIcon } from './icons/DislikeIcon';
import { LikeIcon } from './icons/LikeIcon';
import { CanvasLogo } from './icons/CanvasLogo';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [sentiment, setSentiment] = useState<'like' | 'dislike' | null>(null);
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    onClose();
  }, [isSubmitting, onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Reset form state when modal opens
      if (!isSubmitted) {
        setSentiment(null);
        setDetails('');
        setError('');
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose, isSubmitted]);

  useEffect(() => {
    if (!isOpen) {
      // Allow animation to finish before resetting submission state
      setTimeout(() => {
        setIsSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentiment) {
      setError('Please select one of the options.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Feedback Submitted:', { sentiment, details });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const sentimentButtonClasses = (type: 'like' | 'dislike') => {
    const isSelected = sentiment === type;
    const base = 'flex-1 flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-lg transition-all duration-200 transform hover:-translate-y-1';
    if (isSelected) {
        if (type === 'like') {
            return `${base} bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300 shadow-lg`;
        }
        return `${base} bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300 shadow-lg`;
    }
    return `${base} bg-white dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-slate-500`;
  }

  return (
    <>
      <style>{`
        @keyframes fade-in-scale-up {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-details { animation: fade-in-scale-up 0.3s ease-out forwards; }
      `}</style>
      <div
        className={`fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
            <h2 id="feedback-modal-title" className="text-lg font-bold text-gray-800 dark:text-white">Share Your Feedback</h2>
            <button onClick={handleClose} className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors" aria-label="Close">
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isSubmitted ? (
              <div className="p-10 text-center flex flex-col items-center justify-center">
                <CanvasLogo className="mb-4" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Thank you!</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">We appreciate you taking the time to help us improve Canvas AI.</p>
                <button onClick={handleClose} className="mt-8 px-6 py-2 bg-gray-800 dark:bg-slate-600 text-white font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-slate-500 transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="p-8">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 dark:text-white">What do you think of this page?</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your feedback helps us improve.</p>
                  </div>

                  <div className="mt-6 flex justify-center gap-4">
                    <button type="button" onClick={() => setSentiment('like')} className={sentimentButtonClasses('like')}>
                      <LikeIcon className="w-6 h-6" />
                      <span className="text-sm font-semibold">I like it</span>
                    </button>
                    <button type="button" onClick={() => setSentiment('dislike')} className={sentimentButtonClasses('dislike')}>
                      <DislikeIcon className="w-6 h-6" />
                      <span className="text-sm font-semibold">I don't like it</span>
                    </button>
                  </div>

                  {sentiment && (
                    <div className="mt-6 text-left animate-fade-in-details">
                      <label htmlFor="details" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Care to elaborate? <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        rows={4}
                        placeholder="Tell us what's on your mind..."
                        className="mt-2 w-full p-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors dark:text-white"
                      />
                    </div>
                  )}
                   {error && <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
                </div>

                <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 flex-shrink-0 flex justify-end items-center gap-4">
                  <button type="button" onClick={handleClose} className="px-5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting || !sentiment} className="px-5 py-2 text-sm font-semibold text-white bg-gray-800 dark:bg-purple-600 rounded-lg hover:bg-gray-900 dark:hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    {isSubmitting && <Spinner size="sm" />}
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;