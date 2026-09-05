"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql_Q&M/getEvents";
import { EventDTO, toSlug } from "@/types/event";
import Link from "next/link";
import { Calendar, MapPin, ArrowLeft, Info, Users } from "lucide-react";

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
  if (now < startDate) return { label: "Upcoming", color: "bg-[#332a67]" };
  if (now >= startDate && now <= endDate) return { label: "Ongoing", color: "bg-green-500" };
  return { label: "Completed", color: "bg-gray-500" };
}

export default function EventDetailPage() {
  const params = useParams();
  const slug = (params as Record<string, string>)?.slug as string | undefined;
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data, loading, error } = useQuery(GET_EVENTS);

  if (!slug) return <div className="p-8">Invalid event</div>;

  const events: EventDTO[] = data?.viewEvents ?? [];
  const event = events.find(e => toSlug(e.eventName) === decodeURIComponent(slug)) ?? null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-green-50 p-8">
        <div className="container mx-auto px-4">
          <div className="py-20 text-center">
            <div className="inline-block">
              <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#332a67] border-t-transparent"></div>
              <p className="text-gray-600 font-medium">Loading event details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-green-50 p-8">
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-600 font-medium">Event not found.</p>
          <Link href="/events" className="mt-4 inline-block text-[#332a67] underline">Back to Events</Link>
        </div>
      </div>
    );
  }

  const status = getEventStatus(event.startTime, event.endTime);
  const posterUrl = event.eventProfile && event.eventProfile !== "No Poster URL" && event.eventProfile !== ""
    ? event.eventProfile
    : "/favicon.ico";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 via-white to-green-50">
      {/* Enhanced Header with Indian Theme */}
      <section className="relative border-b-4 border-gray-200 bg-gray-100 py-8 text-gray-900 shadow-xl">
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
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="flex items-start gap-4 flex-1">
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-xl">
                <Users className="h-7 w-7 text-[#332a67]" />
              </div>
              <div className="flex-1">
                <h1 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
                  {event.eventName}
                </h1>
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
                    alt={event.eventName}
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
                      <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-4 border-[#332a67] border-t-transparent"></div>
                      <p className="text-gray-500 font-medium">Loading poster...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Description Card */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-500 p-8">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100">
                  <div className="rounded-2xl bg-[#332a67] p-3 shadow-lg">
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
                  <div className="rounded-xl bg-[#332a67] p-2">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  Event Details
                </h3>
                
                <div className="space-y-5">
                  {/* Date */}
                  <div className="group flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-100 p-4 transition-all duration-300 hover:shadow-md">
                    <div className="mt-0.5 rounded-xl bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Calendar className="h-5 w-5 text-[#332a67]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">Date</h4>
                      <p className="text-sm text-gray-700 font-medium">
                        {formatDateIndian(event.startTime)} <span className="text-gray-500">to</span> {formatDateIndian(event.endTime)}
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
                      <div className="rounded-xl bg-[#332a67] p-2 shadow-sm">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">Audience</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.audience.map((aud, i) => (
                        <span 
                          key={i} 
                          className="rounded-xl bg-[#332a67] px-3 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-700 hover:shadow-lg"
                        >
                          {aud.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}