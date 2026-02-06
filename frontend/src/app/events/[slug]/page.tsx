"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import eventsDataRaw, { EventItem } from "@/data/eventsData";
import Link from "next/link";
import { Calendar, MapPin, Share2, ArrowLeft, Info, Users, Flag } from "lucide-react";

function slugify(name: string) {
  return name.replace(/\s+/g, "-").toLowerCase();
}

function formatDateIndian(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function getEventStatus(start: string, end: string) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startDate = new Date(start);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setHours(23, 59, 59, 999);
  if (now < startDate) return { label: "Upcoming", color: "bg-blue-500" };
  if (now >= startDate && now <= endDate) return { label: "Ongoing", color: "bg-green-500" };
  return { label: "Completed", color: "bg-gray-500" };
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params as Record<string, string>)?.slug as string | undefined;
  const [event, setEvent] = useState<EventItem | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    // Try localStorage first (admin overrides)
    try {
      const raw = localStorage.getItem("admin_events");
      const list: EventItem[] = raw ? JSON.parse(raw) : eventsDataRaw;
      const found = list.find(e => slugify(e.event_name) === decodeURIComponent(slug));
      if (found) {
        setEvent(found);
        return;
      }
    } catch {
      // ignore
    }

    const fallback = eventsDataRaw.find(e => slugify(e.event_name) === decodeURIComponent(slug));
    if (fallback) setEvent(fallback);
  }, [slug]);

  if (!slug) return <div className="p-8">Invalid event</div>;
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 p-8">
        <div className="container mx-auto px-4">
          <div className="py-20 text-center">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-gray-600 font-medium">Loading event details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const status = getEventStatus(event.start, event.end);
  const posterUrl = event.event_profile && event.event_profile !== "No Poster URL" && event.event_profile !== ""
    ? event.event_profile 
    : "/favicon.ico";

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Enhanced Header with Indian Theme */}
      <section className="relative bg-gradient-to-r from-orange-400 via-white to-green-400 text-gray-900 py-8 shadow-xl border-b-4 border-white">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="container mx-auto px-4 relative animate-fade-in">
          <div className="flex items-center justify-between mb-5">
            <Link 
              href="/events" 
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 group transition-all duration-300 bg-white/90 hover:bg-white px-5 py-2.5 rounded-2xl shadow-md hover:shadow-lg border border-gray-200"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-sm">Back to Events</span>
            </Link>
            
            <div className="flex items-center gap-2 bg-white/95 px-5 py-2.5 rounded-2xl border-2 border-orange-200 shadow-md">
              <Flag className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-gray-800">NSS Event</span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-orange-200">
                <Users className="w-7 h-7 text-orange-500" />
              </div>
              <div className="flex-1">
                <h1 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
                  {event.event_name}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-orange-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md">
                    National Service Scheme
                  </span>
                  <span className="text-gray-600 text-sm font-medium">•</span>
                  <span className="text-gray-600 text-sm font-medium">IIIT Hyderabad</span>
                </div>
              </div>
            </div>
            
            <div className={`${status.color} text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-xl flex items-center gap-3 transition-all duration-300 hover:scale-105 border-2 border-white/50`}>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg"></div>
              <span className="text-base">{status.label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Event Content */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content - 2/3 width */}
            <div className="xl:col-span-2 space-y-8 animate-fade-in-up">
              {/* Enhanced Event Image with Loading State */}
              <div className="relative group">
                <div className={`overflow-hidden rounded-3xl shadow-2xl border-4 border-white transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <Image 
                    src={posterUrl} 
                    alt={event.event_name}
                    width={800}
                    height={500}
                    className="w-full h-72 md:h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {!imageLoaded && (
                  <div className="absolute inset-0 w-full h-72 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3 mx-auto"></div>
                      <p className="text-gray-500 font-medium">Loading poster...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Description Card */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-500 p-8">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-2xl shadow-lg">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-900">About this Event</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="xl:col-span-1 space-y-6 animate-slide-in-right">
              {/* Enhanced Event Info Card */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 text-xl mb-6 pb-3 border-b-2 border-gray-100 flex items-center gap-3">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-xl">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  Event Details
                </h3>
                
                <div className="space-y-5">
                  {/* Date */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 group hover:shadow-md transition-all duration-300">
                    <div className="bg-white p-2 rounded-xl mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">Date</h4>
                      <p className="text-sm text-gray-700 font-medium">
                        {formatDateIndian(event.start)} <span className="text-gray-500">to</span> {formatDateIndian(event.end)}
                      </p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 group hover:shadow-md transition-all duration-300">
                    <div className="bg-white p-2 rounded-xl mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">Venue</h4>
                      <p className="text-sm text-gray-700 font-medium">{event.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Audience Tags */}
                {event.audience && event.audience.length > 0 && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-sm">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">Audience</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.audience.map((aud, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          {aud.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Action Buttons */}
                <div className="mt-6 pt-6 border-t-2 border-gray-100 space-y-3">
                  <button 
                    onClick={() => { 
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Event link copied to clipboard!');
                    }} 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-bold"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Event
                  </button>
                  
                  <button 
                    onClick={() => router.back()} 
                    className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg font-bold"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced NSS Footer Note */}
      <div className="container mx-auto px-4 py-6 text-center border-t border-gray-200/50 mt-8">
        <div className="text-sm text-gray-600">
          <p className="font-semibold bg-gradient-to-r from-saffron to-green bg-clip-text text-transparent text-lg mb-2">
            National Service Scheme
          </p>
          <p className="text-gray-500 italic">&quot;Not Me But You&quot;</p>
        </div>
      </div>
    </div>
  );
}