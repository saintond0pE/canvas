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


const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, isDesktop }) => {
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
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tighter">
              Your canvas,
              <br />
              reimagined.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Canvas AI provides an effective and powerful way to manage and enhance your creative projects. Describe your vision and let our AI bring it to life in seconds.
            </p>
            <div className="mt-10">
              <Button onClick={onGetStarted} size="lg">
                Start Creating Now
              </Button>
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
               <h2 className="text-base font-semibold leading-7 text-pink-500 dark:text-pink-400">How it Works</h2>
               <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need to create
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Canvas AI is more than an editor; it's your creative partner. We've packed it with powerful features to make your workflow seamless and inspiring.
              </p>
            </div>
            
            {/* Right Column: Features */}
            <div className="space-y-10">
              {features.map((feature) => (
                <div key={feature.title} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-slate-800">
                      <FeatureCardIcons type={feature.icon as 'ai' | 'inspiration' | 'history'} />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
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