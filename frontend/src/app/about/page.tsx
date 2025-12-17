'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import { Heart, Users, Target, Award, Sparkles, HandHeart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Clean Professional Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <Navbar />

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20">
            <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent animate-gradient-x">
              About NSS IIIT-H
            </h1>
            
            <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-blue-800 via-purple-600 to-indigo-800 rounded-full"></div>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-bounce-slow">
              Empowering students to create meaningful change through service, leadership, and community engagement
            </p>
            </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Mission Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-blue-200 hover:border-blue-300 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="p-10">
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-800 rounded-xl shadow-sm">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To develop the personality and character of students through voluntary community service, 
                  fostering social responsibility and creating a positive impact in society through sustainable initiatives.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-blue-200 hover:border-blue-300 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="p-10">
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-700 rounded-xl shadow-sm">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the leading student organization that inspires and empowers youth to become 
                  compassionate leaders, driving transformative change and building a more equitable society.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-blue-900 mb-4">
                What We Do
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our diverse initiatives span across multiple domains, creating lasting impact
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: HandHeart,
                  title: "Community Service",
                  description: "Regular outreach programs, blood donation drives, and support for underprivileged communities",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: Users,
                  title: "Skill Development",
                  description: "Workshops, training sessions, and leadership programs to enhance student capabilities",
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  icon: Target,
                  title: "Social Awareness",
                  description: "Campaigns on health, hygiene, environment, and social issues affecting communities",
                  gradient: "from-green-500 to-teal-500"
                },
                {
                  icon: Award,
                  title: "Educational Support",
                  description: "Tutoring programs, scholarship drives, and educational material distribution",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Heart,
                  title: "Health Initiatives",
                  description: "Health camps, awareness sessions, and partnerships with medical institutions",
                  gradient: "from-red-500 to-orange-500"
                },
                {
                  icon: Sparkles,
                  title: "Environmental Action",
                  description: "Tree plantation, clean-up drives, and sustainability awareness programs",
                  gradient: "from-emerald-500 to-green-600"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-blue-700 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-20">
            <div className="relative overflow-hidden rounded-2xl bg-blue-900 p-12 shadow-lg">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {[
                  { number: "500+", label: "Active Volunteers" },
                  { number: "10+", label: "Events Organized" },
                  { number: "10K+", label: "Lives Impacted:@IIITH-Campus and @outside IIITH" },
                  { number: "5+", label: "Years of Service" }
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="text-5xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-lg text-white/90 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="text-center">
            <div className="bg-white rounded-2xl px-12 py-10 border border-blue-200 shadow-md">
              <div>
                <h2 className="text-4xl font-bold text-blue-900 mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join us in our mission to create positive change in society
                </p>
                <a
                  href="/members"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white text-lg font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Users className="w-6 h-6" />
                  <span>Meet Our Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
