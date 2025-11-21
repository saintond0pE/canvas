
import React from 'react';

export const LandingFeatureTransition: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B0F19] group isolate">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-pink-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[20%] w-[40%] h-[60%] bg-orange-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      {/* Main Content Area - 3D Floating Elements */}
      <div className="absolute inset-0 flex items-center justify-center gap-8 md:gap-20 perspective-[1000px]">
        
        {/* Element 1: The Idea (Orb) */}
        <div className="relative w-24 h-24 md:w-36 md:h-36 animate-float-slow group-hover:scale-110 transition-transform duration-700 ease-out">
           <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-60 blur-2xl group-hover:blur-3xl transition-all" />
           <div className="relative w-full h-full bg-gradient-to-br from-orange-300/20 to-orange-600/20 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] border border-white/20 flex items-center justify-center backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
              <div className="w-12 h-12 bg-orange-200/50 rounded-full blur-md animate-pulse" />
           </div>
        </div>

        {/* Element 2: The Canvas (Slate) */}
        <div className="relative w-32 h-24 md:w-48 md:h-36 animate-float-medium animation-delay-500 group-hover:scale-110 transition-transform duration-700 ease-out z-10">
           <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl opacity-50 blur-2xl group-hover:blur-3xl transition-all" />
           <div className="relative w-full h-full bg-gradient-to-br from-pink-300/10 to-pink-600/10 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] border border-white/20 flex items-center justify-center backdrop-blur-lg">
             {/* UI lines inside representing interface */}
             <div className="flex items-center gap-2 opacity-80">
                <div className="w-1.5 h-8 bg-gradient-to-b from-white/60 to-white/10 rounded-full" />
                <div className="w-1.5 h-12 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                <div className="w-1.5 h-6 bg-gradient-to-b from-white/60 to-white/10 rounded-full" />
             </div>
           </div>
        </div>

        {/* Element 3: The Tool (Wand/Prism) */}
        <div className="relative w-8 h-32 md:w-12 md:h-44 animate-float-fast animation-delay-1000 group-hover:rotate-12 transition-transform duration-700 ease-out">
           <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full opacity-60 blur-2xl group-hover:blur-3xl transition-all" />
           <div className="relative w-full h-full bg-gradient-to-b from-purple-300/20 to-indigo-600/20 rounded-full shadow-[inset_0_0_15px_rgba(255,255,255,0.2)] border border-white/20 backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
           </div>
        </div>

      </div>

      {/* Decorative Particle Trail */}
      <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 flex gap-4 opacity-80">
          <div className="w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-bounce duration-1000" />
          <div className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-bounce duration-1000 delay-100" />
          <div className="w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-bounce duration-1000 delay-200" />
      </div>
      
      {/* Glass Reflection/Sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow { animation: float 6s ease-in-out infinite; }
        .animate-float-medium { animation: float 5s ease-in-out infinite; }
        .animate-float-fast { animation: float 4s ease-in-out infinite; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
};
