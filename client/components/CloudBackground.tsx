'use client';

/**
 * CloudBackground component with animated clouds
 * Creates a blue sky theme with floating cloud animations
 */
export default function CloudBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200" />
      
      {/* Cloud layers with different animation speeds for parallax effect */}
      <div className="absolute inset-0">
        {/* Large background clouds - slow */}
        <div className="absolute top-10 left-10 w-64 h-32 bg-white/80 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute top-20 right-20 w-80 h-40 bg-white/70 rounded-full blur-2xl animate-float-slow-delayed" />
        <div className="absolute top-40 left-1/3 w-72 h-36 bg-white/75 rounded-full blur-2xl animate-float-slow" />
        
        {/* Medium clouds - medium speed */}
        <div className="absolute top-32 left-1/4 w-48 h-24 bg-white/85 rounded-full blur-xl animate-float-medium" />
        <div className="absolute top-16 right-1/3 w-56 h-28 bg-white/80 rounded-full blur-xl animate-float-medium-delayed" />
        <div className="absolute bottom-1/4 left-20 w-52 h-26 bg-white/82 rounded-full blur-xl animate-float-medium" />
        
        {/* Small foreground clouds - fast */}
        <div className="absolute top-24 right-10 w-32 h-16 bg-white/90 rounded-full blur-lg animate-float-fast" />
        <div className="absolute top-48 left-1/2 w-40 h-20 bg-white/88 rounded-full blur-lg animate-float-fast-delayed" />
        <div className="absolute bottom-1/3 right-1/4 w-36 h-18 bg-white/90 rounded-full blur-lg animate-float-fast" />
      </div>
    </div>
  );
}
