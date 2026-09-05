import React from "react";
import { Heart, Leaf, BookOpen, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white via-slate-50 to-blue-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[calc(100vh-10rem)]">
        {/* LEFT - Content */}
        <div className="p-6 md:p-8 lg:p-12 flex items-center justify-center bg-white rounded-2xl shadow-lg">
          <div className="max-w-2xl space-y-8 animate-fade-in">
            {/* Mission Statement */}
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
              <div className="rounded-xl border-l-4 border-gray-400 bg-gray-100 p-6 shadow-md">
                <p>
                  The <span className="font-bold text-gray-900">National Service Scheme</span> at IIIT Hyderabad and its volenteers stand as an embodiment of the principle that service is the highest virtue.
                </p>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <div className="group rounded-xl border-2 border-gray-200 bg-gray-100 p-4 text-center shadow-md transition-all duration-300 hover:scale-110 hover:border-gray-300">
                <div className="mb-2 text-3xl font-bold text-gray-700 md:text-4xl">200+</div>
                <div className="text-sm text-gray-700 font-semibold">Volunteers</div>
              </div>
              <div className="group rounded-xl border-2 border-gray-200 bg-gray-100 p-4 text-center shadow-md transition-all duration-300 hover:scale-110 hover:border-gray-300">
                <div className="mb-2 text-3xl font-bold text-gray-700 md:text-4xl">7+</div>
                <div className="text-sm text-gray-700 font-semibold">Events conducted yearly</div>
              </div>
              <div className="group rounded-xl border-2 border-gray-200 bg-gray-100 p-4 text-center shadow-md transition-all duration-300 hover:scale-110 hover:border-gray-300">
                <div className="mb-2 text-3xl font-bold text-gray-700 md:text-4xl">10K+</div>
                <div className="text-sm text-gray-700 font-semibold">Interacted with</div>
              </div>
            </div>

            <h2 className="mb-8 text-center text-3xl font-bold text-black md:text-4xl">
              Our Mission
            </h2>
            
            {/* Mission Pillars */}
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="modern-card group bg-gray-100 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mb-3 text-4xl group-hover:animate-bounce-gentle"><Heart className="mx-auto h-10 w-10 text-gray-600" /></div>
                <h4 className="mb-2 font-bold text-black">Health & Wellness</h4>
                <p className="text-sm text-gray-600"> Through Blood donation camps, health checkups and yoga sessions</p>
              </div>
              
              <div className="modern-card group bg-gray-100 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mb-3 text-4xl group-hover:animate-bounce-gentle"><Leaf className="mx-auto h-10 w-10 text-gray-600" /></div>
                <h4 className="mb-2 font-bold text-black">Environment</h4>
                <p className="text-sm text-gray-600">Through Tree plantation and clean campus drives</p>
              </div>
              
              <div className="modern-card group bg-gray-100 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mb-3 text-4xl group-hover:animate-bounce-gentle"><BookOpen className="mx-auto h-10 w-10 text-gray-600" /></div>
                <h4 className="mb-2 font-bold text-black">Education</h4>
                <p className="text-sm text-gray-600">Through career guidance, skill development and knowledge sharing through the Aksharamala Program</p>
              </div>
              
              <div className="modern-card group bg-gray-100 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mb-3 text-4xl group-hover:animate-bounce-gentle"><Users className="mx-auto h-10 w-10 text-gray-600" /></div>
                <h4 className="mb-2 font-bold text-black">Community</h4>
                <p className="text-sm text-gray-600">Through disaster relief, social awareness programs, cloth donation and community service</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* RIGHT - Hero Image */}
        <div className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] w-full bg-cover bg-center" style={{ backgroundImage: "url('/carousel_images/1.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-indigo-900/50 to-blue-900/60" />
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/30 rounded-full animate-bounce-gentle" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border-4 border-white/30 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/4 w-12 h-12 border-4 border-white/30 rounded-full animate-bounce-gentle" style={{ animationDelay: '2s' }} />
          
          <div className="relative z-10 text-center text-white p-6 max-w-2xl animate-fade-in">
            <div className="indian-flag-border w-32 h-2 mx-auto mb-8 rounded-full" />
            
            <h1 className="heading-primary text-3xl md:text-5xl mb-8 animate-slide-up">
              Not ME
            </h1>
            <h2 className="heading-primary text-6xl md:text-6xl mb-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              But YOU
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;