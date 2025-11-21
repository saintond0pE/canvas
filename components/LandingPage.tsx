
import React from 'react';
import Button from './Button';
import { LandingBackgroundShapes } from './icons/LandingBackgroundShapes';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { FeatureCardIcons } from './icons/FeatureCardIcons';
import { useTapBloom } from '../hooks/useTapBloom';
import { TapBloomEffect } from './TapBloomEffect';
import { LandingFeatureTransition } from './LandingFeatureTransition';


interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  isDesktop: boolean;
}

const features = [
  {
    icon: 'ai',
    title: 'AI-Powered Editing',
    description: 'Describe any change in plain English and watch our AI bring your vision to life in seconds. No complex tools needed.',
  },
  {
    icon: 'inspiration',
    title: 'Creative Inspiration',
    description: 'Feeling stuck? Let our AI analyze your image and suggest unique, creative prompts to spark your imagination.',
  },
  {
    icon: 'history',
    title: 'Unlimited History',
    description: 'Experiment freely with our undo and redo functionality. Your creative journey is always safe, so you can explore without limits.',
  },
];


const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, isDesktop }) => {
  const scrollY = useScrollPosition();
  const [blooms, addBloom] = useTapBloom();

  const handleTap = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDesktop) {
      const touch = e.touches[0];
      addBloom(touch.clientX, touch.clientY);
    }
  };

  return (
    <div className="relative overflow-hidden" onTouchStart={handleTap}>
      {!isDesktop && <TapBloomEffect blooms={blooms} />}
      <LandingBackgroundShapes scrollY={scrollY} />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-9xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-sm">
              Your canvas,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 animate-gradient-x">reimagined.</span>
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Canvas AI transforms your creative process. Describe your vision, and watch it come to life instantly.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
              <button 
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black text-lg font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Start Creating
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </span>
              </button>

              <button 
                onClick={onLogin}
                className="group px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-lg font-bold rounded-full transition-all hover:bg-white hover:border-purple-400 dark:hover:bg-slate-800 dark:hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                  Member Login
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Transition */}
      <div className="relative z-10 my-12 md:my-16 px-4">
        <LandingFeatureTransition />
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Column: Text */}
            <div className="max-w-xl">
               <h2 className="text-base font-semibold leading-7 text-pink-500 dark:text-pink-400 uppercase tracking-wider">Workflow</h2>
               <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Everything you need.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Canvas AI is more than an editor; it's your creative partner. We've packed it with powerful features to make your workflow seamless.
              </p>
            </div>
            
            {/* Right Column: Features */}
            <div className="space-y-10">
              {features.map((feature) => (
                <div key={feature.title} className="relative pl-16 group">
                  <dt className="text-lg font-bold leading-7 text-gray-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors">
                      <FeatureCardIcons type={feature.icon as 'ai' | 'inspiration' | 'history'} />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
