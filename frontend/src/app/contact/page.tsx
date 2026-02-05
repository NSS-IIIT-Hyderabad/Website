'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import { Mail, Phone, MapPin, Instagram, Linkedin, X, Heart, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] to-[#00B050] tracking-tight leading-tight">
              Contact Us
              </h1>
              <div className="w-24 h-1 mx-auto mb-8 bg-gradient-to-r from-[#FF3B00] to-[#00B050] rounded-full"></div>
            </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Form */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-10 shadow-md border border-gray-200">
                <div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] to-[#00B050] mb-8">Are you interested in joining NSS?</h2>
                  
                  <form className="space-y-6">
                    <Link
                      href="/#join-nss"
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
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
              <div className="rounded-2xl bg-white border-2 border-gray-200 hover:border-orange-300 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-8 flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#FF3B00] to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                    <a href="mailto:nss@iiit.ac.in" className="text-orange-600 hover:text-orange-800 font-medium text-lg">
                      nss@iiit.ac.in
                    </a>
                    <p className="text-gray-600 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300">
                <div className="p-8 flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
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

              <div className="rounded-xl bg-white border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300">
                <div className="p-8 flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-[#00B050] rounded-lg flex items-center justify-center shadow-sm">
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
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-400 via-blue-400 to-green-400 p-8 shadow-lg">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-6">Follow Us On Social Media</h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/nss_iiith/", color: "from-blue-600 to-blue-800" },
                      { icon: X, label: "X", href: "https://x.com/NSSIIITH", color: "from-blue-700 to-blue-900" },
                      { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/nssiiith/", color: "from-blue-700 to-blue-900" },
                      { icon: Heart, label: "Whatsapp", href: "https://chat.whatsapp.com/DmDwI59gXglHHZ9CuYPKkM", color: "from-green-600 to-green-800" },
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
          <div className="relative mb-20">
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200 overflow-hidden">
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
            <div className="bg-white rounded-2xl px-12 py-10 shadow-md border border-gray-200">
              <div>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] to-[#00B050] mb-4">
                  Join Our Community
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Become a part of NSS and make a real difference in society
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <span>Learn More About Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}
