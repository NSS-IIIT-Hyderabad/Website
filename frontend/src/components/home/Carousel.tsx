"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";


interface CarouselProps {
  images: string[];
  interval?: number;
  children?: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 5000, children }) => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const router = useRouter();

  const scrollToJoinNSS = () => {
    const element = document.getElementById('join-nss');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigateToEvents = () => {
    router.push('/events');
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval, isAutoPlaying]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`NSS IIIT Hyderabad - Slide ${index + 1}`}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
              ${index === current ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white max-w-6xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            National Service Scheme
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-white to-green-500 bg-clip-text text-transparent">
              NSS IIIT Hyderabad
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-blue-100 font-bold leading-relaxed max-w-4xl mx-auto">
            Building tomorrow's leaders through today's service
          </p>
          
          <div className="text-lg md:text-xl mb-12 italic text-orange-200 max-w-3xl mx-auto">
            <p className="text-base text-green-200 font-medium">Not Me But You</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="https://chat.whatsapp.com/DmDwI59gXglHHZ9CuYPKkM" target="_blank" rel="noopener noreferrer" className="group  text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 cursor-pointer" style={{ background: '#b95943ff' }}>
              <span>Join Our Mission</span>
              <div className="w-2 h-2 bg-white rounded-full group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
            className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => redirect('/events')} >
              Explore Events
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 border-2 border-white/50
              ${index === current 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/30 hover:bg-white/60 hover:scale-110'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 z-20">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-green-500 transition-all duration-1000 ease-out"
          style={{ width: `${((current + 1) / images.length) * 100}%` }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-12 w-16 h-16 bg-orange-400/20 rounded-full animate-pulse z-10 hidden lg:block" />
      <div className="absolute bottom-40 right-16 w-12 h-12 bg-green-500/20 rounded-full animate-bounce z-10 hidden lg:block" />
      <div className="absolute top-1/3 right-12 w-8 h-8 bg-white/10 rounded-full animate-ping z-10 hidden lg:block" />
      
      {/* Navigation Overlay for Navbar */}
      <div className="absolute top-0 left-0 w-full z-40">
        {children}
      </div>
    </div>
  );
};

export default Carousel;
