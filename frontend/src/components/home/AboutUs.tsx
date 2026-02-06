import React from "react";
import { Heart, Leaf, BookOpen, Users, Circle } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white via-slate-50 to-blue-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[calc(100vh-10rem)]">
        {/* LEFT - Content */}
        <div className="p-6 md:p-8 lg:p-12 flex items-center justify-center bg-white rounded-2xl shadow-lg">
          <div className="max-w-2xl space-y-8 animate-fade-in">
            {/* Mission Statement */}
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                <p>
                  The <span className="font-bold text-green-700">National Service Scheme</span> at IIIT Hyderabad stands as a beacon of hope and transformation, 
                  embodying the true spirit of <span className="font-semibold text-orange-600">&quot;सेवा परमो धर्मः&quot;</span> - service is the highest virtue.
                </p>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <div className="bg-white p-4 rounded-xl shadow-md text-center group hover:scale-110 transition-all duration-300 border-2 border-green-100 hover:border-green-300">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">100+</div>
                <div className="text-sm text-gray-700 font-semibold">Volunteers</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center group hover:scale-110 transition-all duration-300 border-2 border-blue-100 hover:border-blue-300">
                <div className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">50+</div>
                <div className="text-sm text-gray-700 font-semibold">Events</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center group hover:scale-110 transition-all duration-300 border-2 border-orange-100 hover:border-orange-300">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-sm text-gray-700 font-semibold">Interacted with</div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl text-center text-blue-800 mb-8 font-bold">
              Our Mission
            </h2>
            
            {/* Mission Pillars */}
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="modern-card text-center group hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className="text-4xl mb-3 group-hover:animate-bounce-gentle"><Heart className="w-10 h-10 mx-auto text-red-500" /></div>
                <h4 className="font-bold text-primary mb-2">Health & Wellness</h4>
                <p className="text-sm text-gray-600">Blood donation camps, health checkups, yoga sessions</p>
              </div>
              
              <div className="modern-card text-center group hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className="text-4xl mb-3 group-hover:animate-bounce-gentle"><Leaf className="w-10 h-10 mx-auto text-green-500" /></div>
                <h4 className="font-bold text-primary mb-2">Environment</h4>
                <p className="text-sm text-gray-600">Tree plantation, waste management, clean campus drives</p>
              </div>
              
              <div className="modern-card text-center group hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className="text-4xl mb-3 group-hover:animate-bounce-gentle"><BookOpen className="w-10 h-10 mx-auto text-blue-500" /></div>
                <h4 className="font-bold text-primary mb-2">Education</h4>
                <p className="text-sm text-gray-600">Digital literacy, skill development, knowledge sharing</p>
              </div>
              
              <div className="modern-card text-center group hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className="text-4xl mb-3 group-hover:animate-bounce-gentle"><Users className="w-10 h-10 mx-auto text-purple-500" /></div>
                <h4 className="font-bold text-primary mb-2">Community</h4>
                <p className="text-sm text-gray-600">Rural development, disaster relief, social awareness</p>
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
            
            <h1 className="heading-primary text-4xl md:text-6xl mb-4 animate-slide-up">
              Work for Cause,
            </h1>
            <h2 className="heading-primary text-3xl md:text-5xl mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Not for Applause.
            </h2>
            
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-2xl md:text-3xl mb-4"><Circle className="w-8 h-8 md:w-10 md:h-10 mx-auto text-yellow-200" /></div>
              <p className="text-lg md:text-xl italic mb-2 text-yellow-200">
                &quot;यत्र सेवा तत्र देवता&quot;
              </p>
              <p className="text-base md:text-lg opacity-90">
                Where there is service, there is divinity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;