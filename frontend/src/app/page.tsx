'use client';

import React from "react";
import { Users, BookOpen, Heart, Target, ArrowRight } from "lucide-react";
import Carousel from "@/components/home/Carousel";
import Testimonials from "@/components/home/Testimonials";
import AboutUs from "@/components/home/AboutUs";
import FlagshipEvents from "@/components/home/FlagshipEvents";
import VolunteerReg from "@/components/home/VolunteerReg";

const heroImages = [
  "/carousel_images/1.jpg",
  "/carousel_images/2.png",
  "/carousel_images/3.jpg",
  "/carousel_images/4.jpg",
  "/carousel_images/5.jpg",
  "/carousel_images/6.jpg",
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
    </div>
  );
}
