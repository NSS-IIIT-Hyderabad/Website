'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Twitter, Send, MessageCircle, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background with Light Colors */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient with subtle colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/40"></div>
        
        {/* Soft colored orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/40 to-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tl from-pink-100/30 to-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/20 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-xl">
                <MessageCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            
            <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"></div>
            
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Have questions or want to collaborate? We'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Form */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-purple-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-pink-50/30 to-blue-50/40 opacity-50"></div>
                <div className="relative">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">Are you interested in joining NSS?</h2>
                  
                  <form className="space-y-6">
                    <Link
                      href="/#join-nss"
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      <Rocket className="w-5 h-5" />
                      <span>Join Us</span>
                    </Link>
                  </form>
                </div>
              </div>
              {/* Large centered logo below the Join button */}
              <div className="mt-6">
                <div className="w-full flex justify-center">
                  <a href="/" aria-label="NSS IIIT Hyderabad" className="flex flex-col items-center gap-4">
                    <div className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-lg border-4 border-white/80">
                      <img
                        src="/favicon.ico"
                        alt="NSS IIIT Hyderabad Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl md:text-3xl font-bold text-gray-800">NSS IIIT Hyderabad</h4>
                      <p className="text-sm md:text-base text-gray-600 max-w-xl">National Service Scheme - community service &amp; student outreach</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="rounded-2xl bg-white border-2 border-purple-100/50 hover:border-purple-200 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-8 flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                    <a href="mailto:nss@iiit.ac.in" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                      nss@iiit.ac.in
                    </a>
                    <p className="text-gray-600 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white border-2 border-blue-100/50 hover:border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-8 flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                    <div>
                      <a href="tel:+919398684340" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                        +91 9398684340
                      </a>
                    </div>
                    <div>
                      <a href="tel:+919392332678" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                        +91 9392332678
                      </a>
                    </div>
                    <div>
                      <a href="tel:+917995036253" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
                        +91 7995036253
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white border-2 border-pink-100/50 hover:border-pink-200 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-8 flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
                    <p className="text-gray-700 font-medium text-lg">
                      IIIT Hyderabad
                    </p>
                    <p className="text-gray-600 mt-1">
                      Professor CR Rao Road, Gachibowli,<br />
                      Hyderabad, Telangana 500032, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF9933] via-blue-800 to-[#138808] p-8 shadow-xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-6">Follow Us On Social Media</h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Instagram, label: "Instagram", href: "https://instagram.com/nss.iiith", color: "from-pink-500 to-purple-600" },
                      { icon: Facebook, label: "Facebook", href: "https://facebook.com/nss.iiith", color: "from-blue-600 to-blue-800" },
                      { icon: Twitter, label: "Twitter", href: "https://twitter.com/nss_iiith", color: "from-sky-400 to-blue-600" },
                      { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/nss-iiith", color: "from-blue-700 to-blue-900" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/social flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-110 border border-white/30`}
                      >
                        <social.icon className="w-6 h-6 text-white" />
                        <span className="text-white font-medium hidden sm:inline">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative group mb-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9933] via-blue-500 to-[#138808] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-4 shadow-xl border border-gray-200 overflow-hidden">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=17.447249876210552,78.3487203338203&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-3xl shadow-2xl">
              <div className="bg-white rounded-3xl px-12 py-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Join Our Community
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Become a part of NSS and make a real difference in society
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span>Learn More About Us</span>
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
        
        @keyframes float-rotate {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        /* Use individual animation-* properties so inline styles (animationDuration/animationDelay)
           applied to particles are not inadvertently overridden by the shorthand. */
        .animate-float-rotate {
          animation-name: float-rotate;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
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
        
        .delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}
