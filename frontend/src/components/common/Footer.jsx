"use client";
import React, { useState } from "react";

export default function Footer() {
  const [hovered, setHovered] = useState({ x: false, instagram: false, linkedin: false, iiit: false, website: false });

  const socialLinks = [
    {
      name: "X",
      url: "https://x.com/NSSIIITH",
      icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      color: "#1e40af",
      key: "x"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nss_iiith/",
      icon: "M7.75 2C4.13 2 2 4.13 2 7.75v8.5C2 19.87 4.13 22 7.75 22h8.5c3.62 0 5.75-2.13 5.75-5.75v-8.5C22 4.13 19.87 2 16.25 2h-8.5zm0 2h8.5c2.54 0 3.75 1.21 3.75 3.75v8.5c0 2.54-1.21 3.75-3.75 3.75h-8.5C5.21 20 4 18.79 4 16.25v-8.5C4 5.21 5.21 4 7.75 4zm8.25 2.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-4.25 2.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zm0 2a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z",
      color: "#f97316",
      key: "instagram"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/nssiiith/",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      color: "#16a34a",
      key: "linkedin"
    },
    {
      name: "IIIT Hyderabad",
      url: "https://www.iiit.ac.in/",
      icon: "M3 6.75A3.75 3.75 0 0 1 6.75 3h10.5A3.75 3.75 0 0 1 21 6.75v10.5A3.75 3.75 0 0 1 17.25 21H6.75A3.75 3.75 0 0 1 3 17.25V6.75zm2 0v10.5c0 .966.784 1.75 1.75 1.75h10.5c.966 0 1.75-.784 1.75-1.75V6.75c0-.966-.784-1.75-1.75-1.75H6.75A1.75 1.75 0 0 0 5 6.75zm7 2.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zm0 2a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5z",
      color: "#1e40af",
      key: "iiit"
    },
    {
      name: "Website",
      url: "https://nss.iiit.ac.in/",
      icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 8 8c0 4.418-3.582 8-8 8s-8-3.582-8-8a8 8 0 0 1 8-8zm0 2a6 6 0 0 0-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6a6 6 0 0 0-6-6zm0 2a4 4 0 0 1 4 4c0 2.21-1.79 4-4 4s-4-1.79-4-4a4 4 0 0 1 4-4z",
      color: "#f97316",
      key: "website"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "#" },
    { name: "Members", href: "/members" },
    { name: "FAQs", href: "#" },
    { name: "Privacy Policy", href: "https://www.iiit.ac.in/privacy-policy/" }
  ];



  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-orange-50 border-t-4 border-blue-800 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #1e40af 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }} />
      </div>
      {/* Main content */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand Section - Compact header */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a href="https://nss.iiit.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <img 
                src="/favicon.ico" 
                alt="NSS Logo" 
                className="w-16 h-16"
              />
            </a>
            <div className="text-center sm:text-left">
              <h2 className="text-xl lg:text-2xl font-bold text-blue-800 mb-1">
                NSS IIIT Hyderabad
              </h2>
              <p className="text-xs lg:text-sm text-gray-600 italic">
                National Service Scheme
              </p>
            </div>
            <a href="https://www.iiit.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <img 
                src="/iiit-logo-color.png" 
                alt="IIIT Logo" 
                className="w-32 h-20"
              />
            </a>
          </div>
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Building a better society through service, innovation, and community engagement.
          </p>
        </div>

        {/* Content Sections - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-6 max-w-6xl mx-auto">
          
          {/* Quick Navigation */}
          <div className="text-center sm:text-left lg:text-left max-w-sm mx-auto sm:mx-0">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center sm:justify-start gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
              Quick Navigation
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 py-1 px-2 rounded hover:bg-orange-50 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left lg:text-left max-w-sm mx-auto sm:mx-0">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center sm:justify-start gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 justify-center md:justify-start p-2 rounded hover:bg-green-50 transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#16a34a" className="mt-1 flex-shrink-0">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a 
                    href="mailto:nss@iiit.ac.in" 
                    className="text-gray-700 hover:text-green-600 text-sm font-medium transition-colors duration-300"
                  >
                    nss@iiit.ac.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2 justify-center md:justify-start p-2 rounded hover:bg-green-50 transition-colors duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#16a34a" className="mt-1 flex-shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <a
                    href="https://maps.app.goo.gl/SW5tAYxYni7B7ifd9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-green-600 text-sm font-medium leading-relaxed transition-colors duration-300 text-center md:text-left block"
                  >
                    IIIT Hyderabad, Gachibowli<br />
                    Hyderabad, Telangana
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Community */}
          <div className="text-center sm:col-span-2 lg:col-span-1 lg:text-center max-w-md mx-auto lg:max-w-xs">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 4c4.41 0 8 3.59 8 8s-3.59 8-8 8c-1.86 0-3.59-.64-4.96-1.72L8 20H4v-4l2.28-3.04C5.36 11.59 4.72 9.86 4.72 8c0-4.41 3.59-8 8-8zm0 2c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24l.71.71L8.5 18.5h2l2.79-2.79.71.71C15.84 17.33 17.34 18 19 18c3.31 0 6-2.69 6-6s-2.69-6-6-6z"/>
              </svg>
              Follow Us
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
              {socialLinks.slice(0, 4).map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-2 py-2 bg-white/70 hover:bg-white/90 rounded text-gray-700 hover:text-blue-800 text-xs font-medium transition-all duration-300 border border-gray-200 hover:border-blue-300 group"
                  onMouseEnter={() => setHovered(prev => ({ ...prev, [social.key]: true }))}
                  onMouseLeave={() => setHovered(prev => ({ ...prev, [social.key]: false }))}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`transition-all duration-300 ${hovered[social.key] ? 'scale-110' : 'scale-100'}`}
                    style={{ color: hovered[social.key] ? social.color : 'currentColor' }}
                  >
                    <path d={social.icon} />
                  </svg>
                  <span className="text-center truncate">{social.name === 'IIIT Hyderabad' ? 'IIIT' : social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-blue-800 pt-4 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
            <p className="text-xs text-gray-600 m-0">
              © 2025 IIIT Hyderabad. All rights reserved.
            </p>
            <p className="text-sm font-medium text-gray-700 m-0 flex items-center gap-1">
              Made with 
              <span className="text-red-500 text-base animate-pulse">
                ♥
              </span>
              by <span className="text-blue-800">NSS Tech Team</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}