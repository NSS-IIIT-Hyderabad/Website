// src/components/Loading_error/Loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-green-50 relative overflow-hidden font-playfair">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-[20%] right-[30%] w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      </div>
      
      {/* Custom spinner */}
      <div className="relative z-10 mb-8">
        <div className="w-16 h-16 relative">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-green-600 via-orange-500 to-blue-600 animate-spin [mask:conic-gradient(from_0deg,transparent_0deg,black_90deg,transparent_180deg,transparent_360deg)] [mask-composite:subtract]"></div>
          {/* Inner circle */}
          <div className="absolute top-2 left-2 w-12 h-12 bg-gradient-to-br from-orange-50 to-green-50 rounded-full"></div>
        </div>
      </div>
      
      {/* Loading message with animated dots */}
      <div className="text-slate-800 text-xl md:text-2xl font-medium tracking-wide text-center opacity-90 relative z-10">
        <span>Loading</span>
        <span className="inline-flex ml-1">
          <span className="animate-pulse delay-0">.</span>
          <span className="animate-pulse delay-75">.</span>
          <span className="animate-pulse delay-150">.</span>
        </span>
      </div>
    </div>
  );
}