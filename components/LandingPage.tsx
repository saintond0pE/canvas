import React from 'react';
import Button from './Button';
import { LandingBackgroundShapes } from './icons/LandingBackgroundShapes';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { FeatureCardIcons } from './icons/FeatureCardIcons';

interface LandingPageProps {
  onGetStarted: () => void;
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


const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const scrollY = useScrollPosition();

  // A simple function to determine visibility based on scroll position
  // This can be replaced with a more robust Intersection Observer for production
  const isFeaturesVisible = scrollY > 100;

  return (
    <div className="relative overflow-hidden">
      <LandingBackgroundShapes scrollY={scrollY} />
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 leading-tight tracking-tighter">
              Your canvas,
              <br />
              reimagined.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
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

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto lg:text-center">
             <h2 className="text-base font-semibold leading-7 text-pink-500">How it Works</h2>
             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to create
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Canvas AI is more than an editor; it's your creative partner. We've packed it with powerful features to make your workflow seamless and inspiring.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="flex flex-col transition-all duration-700 ease-out"
                  style={{
                    opacity: isFeaturesVisible ? 1 : 0,
                    transform: isFeaturesVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <FeatureCardIcons type={feature.icon as 'ai' | 'inspiration' | 'history'} />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;