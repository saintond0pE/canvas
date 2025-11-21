
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { login, register } from '../services/authService';
import Spinner from './Spinner';
import { LoginMode } from '../App';
import { CanvasLogo } from './icons/CanvasLogo';
import { SparkleTransition } from './SparkleTransition';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  initialMode: LoginMode;
  headerIconRef?: React.RefObject<HTMLButtonElement>;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, initialMode, headerIconRef }) => {
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Animation state
  const [showSparkles, setShowSparkles] = useState(false);
  const [startRect, setStartRect] = useState<DOMRect | null>(null);
  const [endRect, setEndRect] = useState<DOMRect | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsSignup(initialMode === 'signup');
  }, [initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let user: User;
      if (!isSignup) {
        user = await login(email, password);
      } else {
        user = await register(name, email, password);
      }
      
      // Login successful, start animation sequence
      if (buttonRef.current && headerIconRef?.current) {
          setStartRect(buttonRef.current.getBoundingClientRect());
          setEndRect(headerIconRef.current.getBoundingClientRect());
          setPendingUser(user);
          setShowSparkles(true);
      } else {
          // Fallback if refs aren't available
          onLoginSuccess(user);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setIsLoading(false);
    }
  };

  const handleAnimationComplete = () => {
      if (pendingUser) {
          onLoginSuccess(pendingUser);
      }
  };

  return (
    <div className="relative min-h-[calc(100vh-89px)] flex items-center justify-center overflow-hidden bg-[#0B0F19]">
      {showSparkles && startRect && endRect && (
          <SparkleTransition 
            startRect={startRect} 
            endRect={endRect} 
            onComplete={handleAnimationComplete} 
          />
      )}
      
      {/* Immersive Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-purple-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-indigo-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-pink-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-orange-500/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-3000" />
      </div>

      {/* Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Main Login Interface */}
      <div className={`relative z-10 w-full max-w-[400px] mx-4 transition-opacity duration-500 ${showSparkles ? 'opacity-0' : 'opacity-100'}`}>
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(139,92,246,0.15)] overflow-hidden">
          
          {/* Compact Header */}
          <div className="p-8 pb-0 text-center">
            <div className="inline-flex items-center justify-center mb-6 p-2 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                <CanvasLogo width="100" height="30" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
              {isSignup ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-gray-400">
              {isSignup ? 'Join the creative revolution.' : 'Enter your credentials to access the studio.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 pt-6 flex flex-col gap-4">
            
            {isSignup && (
              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                  id="name"
                  placeholder="Name"
                  required={isSignup}
                />
                <label htmlFor="name" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-pink-400 peer-focus:bg-black/80 peer-focus:px-1 peer-focus:rounded bg-transparent pointer-events-none peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-pink-400 peer-not-placeholder-shown:bg-black/80 peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:rounded">
                  Full Name
                </label>
              </div>
            )}

            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                id="email"
                placeholder="Email"
                required
              />
              <label htmlFor="email" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-400 peer-focus:bg-black/80 peer-focus:px-1 peer-focus:rounded bg-transparent pointer-events-none peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-purple-400 peer-not-placeholder-shown:bg-black/80 peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:rounded">
                Email Address
              </label>
            </div>

            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                id="password"
                placeholder="Password"
                required
              />
              <label htmlFor="password" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-orange-400 peer-focus:bg-black/80 peer-focus:px-1 peer-focus:rounded bg-transparent pointer-events-none peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-orange-400 peer-not-placeholder-shown:bg-black/80 peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:rounded">
                Password
              </label>
            </div>

            {error && (
              <div className="text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
                {error}
              </div>
            )}

            <button
              ref={buttonRef}
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <Spinner size="sm" /> : (isSignup ? 'Get Started' : 'Sign In')}
              {!isLoading && <span className="text-lg">→</span>}
            </button>
          </form>

          {/* Footer / Switcher */}
          <div className="px-8 pb-8 pt-0 text-center">
            <div className="relative flex items-center justify-center gap-2 py-4 border-t border-white/5">
               <span className="text-gray-400 text-sm">{isSignup ? 'Already a member?' : 'First time here?'}</span>
               <button 
                  onClick={() => { setIsSignup(!isSignup); setError(''); }}
                  className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:to-white transition-all"
               >
                 {isSignup ? 'Log In' : 'Sign Up'}
               </button>
            </div>
          </div>
          
        </div>
        
        {/* Decorative bottom text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Protected by Canvas AI Security • Terms & Privacy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
