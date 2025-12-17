import React from "react";
import { Home, AlertTriangle } from "lucide-react";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-orange-50 to-green-50 text-slate-800 relative overflow-hidden font-playfair">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-40 h-40 bg-white/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[30%] right-[20%] w-32 h-32 bg-white/4 rounded-full blur-xl"></div>
      </div>
      
      {/* 404 Icon */}
      <div className="relative z-10 mb-8">
        <AlertTriangle className="w-24 h-24 md:w-32 md:h-32 text-red-500 mx-auto mb-4 animate-pulse" />
      </div>
      
      {/* 404 Title */}
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-semibold text-slate-700 mb-0 relative z-10 drop-shadow-lg">
        404
      </h1>
      
      {/* Error message */}
      <p className="text-lg md:text-xl lg:text-2xl my-8 text-slate-600 font-normal tracking-wide max-w-2xl leading-relaxed relative z-10 px-4">
        Oops! The page you're looking for seems to have wandered off. Let's get you back to where the action is!
      </p>
      
      {/* Home button */}
      <a 
        href="/" 
        className="inline-flex items-center gap-3 text-lg text-slate-800 border-2 border-slate-800 py-3 px-8 rounded-lg transition-all duration-300 font-medium tracking-wide relative z-10 bg-transparent hover:bg-slate-800 hover:text-white hover:-translate-y-1 hover:shadow-xl active:translate-y-0 group"
      >
        <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        Go back home
      </a>
      
      {/* Additional decorative elements */}
      <div className="absolute bottom-10 left-10 w-3 h-3 bg-orange-300/30 rounded-full animate-bounce delay-0"></div>
      <div className="absolute bottom-16 left-16 w-2 h-2 bg-green-300/40 rounded-full animate-bounce delay-75"></div>
      <div className="absolute bottom-12 right-12 w-4 h-4 bg-blue-300/25 rounded-full animate-bounce delay-150"></div>
    </div>
  );
}
