"use client";
import React, { useState } from "react";
import { CheckCircle, XCircle, Linkedin, Mail } from "lucide-react";

type Member = {
  email: string;
  name: string;
  photoUrl: string;
  team: string;
  rollNumber: string;
  from: string;
  to: string;
};

export default function MemberCard({ member }: { member: Member }) {
  const [imageError, setImageError] = useState(false);
  const [hover, setHover] = useState(false);

  const getFallbackImage = () => "/favicon.ico";
  const getImageSrc = (): string => {
    if (imageError) return getFallbackImage();
    if (!member.photoUrl || member.photoUrl.trim() === "" || member.photoUrl === "hi") {
      return getFallbackImage();
    }
    return member.photoUrl;
  };

  const handleImageError = () => setImageError(true);

  // Social links
  const linkedInUrl = `https://www.linkedin.com/in/${member.rollNumber}`;
  const emailUrl = `mailto:${member.email}`;

  // Team colors based on Indian flag theme
  const getTeamGradient = () => {
    switch (member.team.toLowerCase()) {
      case 'tech':
        return 'from-green-500 to-blue-600';
      case 'design':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getStatusBadge = () => {
    const isActive = !member.to || member.to.toLowerCase() === 'present';
    if (isActive) {
      return 'bg-green-100 text-green-800 border border-green-200';
    }
    return 'bg-gray-100 text-gray-600 border border-gray-200';
  };

  return (
    <div
      className="w-full max-w-[280px] min-w-[220px] h-auto aspect-[280/320] mx-auto my-4 relative group"
      style={{ perspective: 1200 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 ease-out rounded-3xl cursor-pointer ${
          hover 
            ? 'shadow-2xl shadow-blue-200/50' 
            : 'shadow-lg shadow-gray-200/50'
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: hover ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-3xl flex flex-col items-center p-6 text-center justify-between border-2 border-gray-100 hover:border-blue-200 transition-all duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Indian Flag Border */}
          <div 
            className="absolute top-0 left-0 w-full h-1 rounded-t-lg"
            style={{
              background: "linear-gradient(to right, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)"
            }}
          />
          
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div
              className="relative mb-4"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid transparent",
                background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, #FF9933, #138808) border-box`,
                padding: 2,
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                <img
                  src={getImageSrc()}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={handleImageError}
                />
              </div>
              
              {/* Status Indicator */}
              <div 
                className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-3 border-white ${
                  (!member.to || member.to.toLowerCase() === 'present')
                    ? 'bg-green-500 animate-pulse' 
                    : 'bg-gray-400'
                }`}
              />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
              {member.name}
            </h3>
            
            {/* Team Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getTeamGradient()} text-white mb-3 shadow-lg`}>
              {member.team}
            </div>
          </div>
          
          {/* Duration Info */}
          <div className="w-full">
            <div className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getStatusBadge()} w-full justify-center`}>
              <span className="mr-2">
                {(!member.to || member.to.toLowerCase() === 'present') ? 
                  <CheckCircle className="w-4 h-4 text-green-600 inline" /> : 
                  <XCircle className="w-4 h-4 text-red-600 inline" />
                }
              </span>
              {(!member.to || member.to.toLowerCase() === 'present')
                ? `${member.from} - Present`
                : `${member.from} - ${member.to}`
              }
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-800 via-blue-700 to-slate-800 rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white border-2 border-blue-200"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />
          
          {/* Blurred Background Image */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden opacity-10"
          >
            <img
              src={getImageSrc()}
              alt=""
              className="w-full h-full object-cover blur-lg brightness-[0.2]"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
                {member.name}
              </h3>
              <p className="text-white/90 text-lg font-medium">
                Connect with me
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-6">
              <a 
                href={linkedInUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full border-2 border-white hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Linkedin className="w-7 h-7 text-blue-700" />
              </a>
              
              <a 
                href={emailUrl}
                className="flex items-center justify-center w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full border-2 border-white hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-7 h-7 text-blue-700" />
              </a>
            </div>
            
            {/* Roll Number */}
            <div className="mt-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-white shadow-lg">
              <span className="text-slate-700 text-sm font-medium">
                {member.rollNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
