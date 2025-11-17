"use client";
import React, { useState } from "react";
import {
  Menu,
  MapPin,
  Mail,
  MessageCircle,
  X,
  Instagram,
  Linkedin,
  Facebook,
  Globe,
  Home,
  Heart,
} from "lucide-react";
export default function Footer() {
  const [hovered, setHovered] = useState({
    x: false,
    instagram: false,
    linkedin: false,
    iiit: false,
    website: false,
  });

  const socialLinks = [
    {
      name: "X",
      url: "https://x.com/NSSIIITH",
      color: "#1e40af",
      key: "x",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nss_iiith/",
      color: "#f97316",
      key: "instagram",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/nssiiith/",
      color: "#16a34a",
      key: "linkedin",
    },
    // {
    //   name: "Facebook",
    //   url: "https://www.facebook.com/NSSIIITHyderabad",
    //   color: "#1877F2",
    //   key: "facebook",
    // },
    {
      name: "Whatsapp",
      url: "https://chat.whatsapp.com/DmDwI59gXglHHZ9CuYPKkM",
      color: "#25D366",
      key: "whatsapp",
    },
  ];

  const IconMap = {
    x: X,
    instagram: Instagram,
    linkedin: Linkedin,
    // facebook: Facebook,
    whatsapp: Heart,
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "#" },
    { name: "Members", href: "/members" },
    { name: "FAQs", href: "#" },
    { name: "Privacy Policy", href: "https://www.iiit.ac.in/privacy-policy/" },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-orange-50 border-t-4 border-blue-800 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #1e40af 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      {/* Main content */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand Section - Compact header */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href="https://nss.iiit.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform duration-300"
            >
              <img src="/favicon.ico" alt="NSS Logo" className="w-16 h-16" />
            </a>
            <div className="text-center sm:text-left">
              <h2 className="text-xl lg:text-2xl font-bold text-blue-800 mb-1">
                NSS IIIT Hyderabad
              </h2>
              <p className="text-xs lg:text-sm text-gray-600 italic">
                National Service Scheme
              </p>
            </div>
            <a
              href="https://www.iiit.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform duration-300"
            >
              <img
                src="/iiit-logo-color.png"
                alt="IIIT Logo"
                className="w-32 h-20"
              />
            </a>
          </div>
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Building a better society through service, innovation, and community
            engagement.
          </p>
        </div>

        {/* Content Sections - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-6 max-w-6xl mx-auto">
          {/* Quick Navigation */}
          <div className="text-center sm:text-left lg:text-left max-w-sm mx-auto sm:mx-0">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center sm:justify-start gap-2">
              <Menu size={18} />
              Quick Navigation
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      link.href.startsWith("http") ? "noopener noreferrer" : ""
                    }
                    className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 py-1 px-2 rounded hover:bg-orange-50 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Community */}
          <div className="text-center sm:col-span-2 lg:col-span-1 lg:text-center max-w-md mx-auto lg:max-w-xs">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center gap-2">
              <MessageCircle size={18} />
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
                  onMouseEnter={() =>
                    setHovered((prev) => ({ ...prev, [social.key]: true }))
                  }
                  onMouseLeave={() =>
                    setHovered((prev) => ({ ...prev, [social.key]: false }))
                  }
                >
                  {(() => {
                    const Icon = IconMap[social.key] || Globe;
                    return (
                      <Icon
                        size={16}
                        className={`transition-all duration-300 ${
                          hovered[social.key] ? "scale-110" : "scale-100"
                        }`}
                        style={{
                          color: hovered[social.key]
                            ? social.color
                            : "currentColor",
                        }}
                      />
                    );
                  })()}
                  <span className="text-center truncate">
                    {social.name === "IIIT Hyderabad" ? "IIIT" : social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left lg:text-left max-w-sm mx-auto sm:mx-0">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center sm:justify-start gap-2">
              <MapPin size={18} />
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 justify-center md:justify-start p-2 rounded hover:bg-green-50 transition-colors duration-300">
                <Mail
                  size={18}
                  className="mt-1 flex-shrink-0"
                  style={{ color: "#16a34a" }}
                />
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
                <MapPin
                  size={18}
                  className="mt-1 flex-shrink-0"
                  style={{ color: "#16a34a" }}
                />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <a
                    href="https://maps.app.goo.gl/SW5tAYxYni7B7ifd9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-green-600 text-sm font-medium leading-relaxed transition-colors duration-300 text-center md:text-left block"
                  >
                    IIIT Hyderabad, Gachibowli
                    <br />
                    Hyderabad, Telangana
                  </a>
                </div>
              </div>
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
              <Heart size={14} className="text-red-500 mx-1 animate-pulse" />
              by <span className="text-blue-800">NSS Tech Team</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
