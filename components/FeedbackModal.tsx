import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import Spinner from './Spinner';
import { BugIcon } from './icons/BugIcon';
import { FeatureRequestIcon } from './icons/FeatureRequestIcon';
import { GeneralFeedbackIcon } from './icons/GeneralFeedbackIcon';
import { LikeIcon } from './icons/LikeIcon';
import { CanvasLogo } from './icons/CanvasLogo';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const feedbackTypes = [
  { value: 'bug', label: 'Bug Report', icon: BugIcon, color: 'red' },
  { value: 'feature', label: 'Feature Request', icon: FeatureRequestIcon, color: 'purple' },
  { value: 'general', label: 'General Feedback', icon: GeneralFeedbackIcon, color: 'blue' },
  { value: 'praise', label: 'Praise', icon: LikeIcon, color: 'pink' },
];

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState('not-specified');
  const [feedbackType, setFeedbackType] = useState('');
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
      // Reset form state when modal opens, except if it was just submitted
      if (!isSubmitted) {
        setRole('not-specified');
        setFeedbackType('');
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
          }, 300)
      }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackType || !details.trim()) {
      setError('Please select a feedback type and provide details.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Feedback Submitted:', { role, feedbackType, details });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const colorClasses = {
      red: { border: 'peer-checked:border-red-500', bg: 'peer-checked:bg-red-50 dark:peer-checked:bg-red-900/30', text: 'peer-checked:text-red-700 dark:peer-checked:text-red-300' },
      purple: { border: 'peer-checked:border-purple-500', bg: 'peer-checked:bg-purple-50 dark:peer-checked:bg-purple-900/30', text: 'peer-checked:text-purple-700 dark:peer-checked:text-purple-300' },
      blue: { border: 'peer-checked:border-blue-500', bg: 'peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/30', text: 'peer-checked:text-blue-700 dark:peer-checked:text-blue-300' },
      pink: { border: 'peer-checked:border-pink-500', bg: 'peer-checked:bg-pink-50 dark:peer-checked:bg-pink-900/30', text: 'peer-checked:text-pink-700 dark:peer-checked:text-pink-300' },
  }

  return (
    <>
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
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
                    <h2 id="feedback-modal-title" className="text-xl font-bold text-gray-800 dark:text-white">Share Your Feedback</h2>
                    <button onClick={handleClose} className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors" aria-label="Close">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {isSubmitted ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <CanvasLogo className="mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Thank you for your feedback!</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">We appreciate you taking the time to help us improve Canvas AI.</p>
                            <button onClick={handleClose} className="mt-8 px-6 py-2 bg-gray-800 dark:bg-slate-600 text-white font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-slate-500 transition-colors">
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Column 1: Role */}
                                <div className="space-y-2">
                                    <label htmlFor="role" className="text-sm font-semibold text-gray-700 dark:text-gray-300">1. What's your role?</label>
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors dark:text-white"
                                    >
                                        <option value="not-specified">Select one...</option>
                                        <option value="content-creator">Content Creator</option>
                                        <option value="marketer">Marketer</option>
                                        <option value="business-owner">Business Owner</option>
                                        <option value="student">Student</option>
                                        <option value="hobbyist">Hobbyist / Personal Use</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Column 2: Feedback Type */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">2. What kind of feedback?</label>
                                    <div className="space-y-3">
                                        {feedbackTypes.map(({ value, label, icon: Icon, color }) => (
                                            <label key={value} className="block cursor-pointer">
                                                <input type="radio" name="feedbackType" value={value} className="sr-only peer" checked={feedbackType === value} onChange={(e) => setFeedbackType(e.target.value)} />
                                                <div className={`flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-slate-600 rounded-lg transition-all ${colorClasses[color].border} ${colorClasses[color].bg} ${colorClasses[color].text} text-gray-500 dark:text-gray-400`}>
                                                    <Icon className="w-5 h-5" />
                                                    <span className="font-semibold text-sm">{label}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Column 3: Details */}
                                <div className="space-y-2">
                                    <label htmlFor="details" className="text-sm font-semibold text-gray-700 dark:text-gray-300">3. Care to elaborate?</label>
                                    <textarea
                                        id="details"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        rows={8}
                                        placeholder="Tell us what's on your mind..."
                                        className="w-full p-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors dark:text-white"
                                    />
                                </div>
                            </div>
                            
                            {error && <p className="px-8 text-sm text-red-600 dark:text-red-400">{error}</p>}

                            <div className="p-6 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 flex-shrink-0 flex justify-end items-center gap-4">
                                <button type="button" onClick={handleClose} className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" disabled={isSubmitting || !feedbackType || !details.trim()} className="px-5 py-2.5 text-sm font-semibold text-white bg-gray-800 dark:bg-purple-600 rounded-lg hover:bg-gray-900 dark:hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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