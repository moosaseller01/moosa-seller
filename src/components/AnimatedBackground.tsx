import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Corner glows - extending beyond screen edges */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-slow" 
           style={{ animationDelay: '0s', animationDuration: '4s' }} />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-pink-500/25 rounded-full blur-3xl animate-pulse-slow" 
           style={{ animationDelay: '1s', animationDuration: '5s' }} />
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl animate-pulse-slow" 
           style={{ animationDelay: '2s', animationDuration: '6s' }} />
      <div className="absolute -bottom-32 -right-32 w-88 h-88 bg-purple-500/25 rounded-full blur-3xl animate-pulse-slow" 
           style={{ animationDelay: '3s', animationDuration: '7s' }} />
      
      {/* Side edge glows */}
      <div className="absolute top-1/2 -left-24 w-48 h-64 bg-purple-600/20 rounded-full blur-2xl animate-pulse-slow transform -translate-y-1/2" 
           style={{ animationDelay: '1.5s', animationDuration: '5s' }} />
      <div className="absolute top-1/2 -right-24 w-52 h-72 bg-pink-500/20 rounded-full blur-2xl animate-pulse-slow transform -translate-y-1/2" 
           style={{ animationDelay: '2.5s', animationDuration: '6s' }} />
      
      {/* Top and bottom edge glows */}
      <div className="absolute -top-16 left-1/4 w-64 h-32 bg-indigo-500/15 rounded-full blur-2xl animate-pulse-slow" 
           style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
      <div className="absolute -bottom-16 right-1/4 w-56 h-28 bg-purple-600/15 rounded-full blur-2xl animate-pulse-slow" 
           style={{ animationDelay: '3.5s', animationDuration: '5.5s' }} />
      
      {/* Very subtle center glow for depth */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2" 
           style={{ animationDelay: '4s', animationDuration: '8s' }} />
      
      {/* Additional floating particles near edges */}
      <div className="absolute top-1/4 left-8 w-4 h-4 bg-purple-400/40 rounded-full blur-sm animate-float" 
           style={{ animationDelay: '1s' }} />
      <div className="absolute top-3/4 right-12 w-3 h-3 bg-pink-400/50 rounded-full blur-sm animate-float" 
           style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-8 w-5 h-5 bg-indigo-400/30 rounded-full blur-sm animate-float" 
           style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-1/4 left-16 w-4 h-4 bg-purple-300/35 rounded-full blur-sm animate-float" 
           style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default AnimatedBackground;