'use client';

import React from "react";
import { Users, BookOpen, Heart, Target, ArrowRight } from "lucide-react";
import Carousel from "@/components/home/Carousel";
import Testimonials from "@/components/home/Testimonials";
import AboutUs from "@/components/home/AboutUs";
import FlagshipEvents from "@/components/home/FlagshipEvents";
import VolunteerReg from "@/components/home/VolunteerReg";

const heroImages = [
  "/carousel_images/0.jpeg",
  // "/carousel_images/1.jpeg",
  // "/carousel_images/2.jpg",
  "/carousel_images/shram.jpg",
  "/carousel_images/orphan.jpg",
  "/carousel_images/teach1.jpg",
  "/carousel_images/teach2.jpg",

  // "/carousel_images/3.jpg"
];

export default function HomePage() {
  const scrollToJoinNSS = () => {
    const element = document.getElementById('join-nss');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Hero Section with Carousel */}
      <div className="relative w-full h-[calc(100vh-5rem)]">
        <div className="w-full h-full">
          <Carousel images={heroImages} interval={5000} />
        </div>
      </div>

      {/* About NSS Section */}
      <div className="bg-white">
        <AboutUs />
      </div>

      {/* Flagship Events Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100">
        <FlagshipEvents />
      </div>

      {/* Volunteer Testimonials Section */}
      <div className="bg-white">
          <Testimonials />
      </div>

      {/* Join NSS Section */}
      <div id='join-nss' className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50">
          <VolunteerReg />
      </div>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-blue-800 to-slate-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Target className="w-4 h-4" />
              Make an Impact Today
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Make a
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent"> Difference?</span>
            </h2>

            <p className="text-xl md:text-2xl mb-12 text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Join thousands of passionate students who are creating positive change in their communities through NSS
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={scrollToJoinNSS}
                className="group bg-white text-blue-800 hover:bg-blue-50 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <Users className="w-6 h-6" />
                <span>Join NSS Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group border-2 border-white text-white hover:bg-white hover:text-blue-800 font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                <span>Learn More</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-300 mb-2">1k+</div>
                <div className="text-slate-200">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-300 mb-2">50+</div>
                <div className="text-slate-200">Community Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">10k+</div>
                <div className="text-slate-200">Lives Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
