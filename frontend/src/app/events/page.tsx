"use client";
import React, { useState } from "react";
import { Calendar as CalendarIcon, BarChart3, Users } from "lucide-react";
import EventGrid from "@/components/events/EventGrid";
import defaultEvents from "@/data/eventsData";





export default function EventsPage() {
  const [events, setEvents] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_events");
      if (raw) {
        setEvents(JSON.parse(raw));
        return;
      }
    } catch (e) {}
    setEvents(defaultEvents as any[]);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Compact Header Section */}
      <section className="relative bg-gradient-to-r from-orange-400 via-blue-400 to-green-400 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-4 leading-tight">
            NSS Events &
            <span className="bg-gradient-to-r from-orange-300 to-green-300 bg-clip-text text-transparent"> Activities</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join us in making a difference through community service
          </p>
        </div>
      </section>
      
      {/* Events Dashboard */}
      <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-green-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Community Events Overview
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-blue-800 mb-6">
              Our Impact
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See the incredible impact we're making together through community service and volunteer engagement.
            </p>
          </div>
          
          {/* Event Statistics - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-center">
              <div className="flex items-center justify-center mb-4">
                <BarChart3 className="w-8 h-8 text-orange-200" />
              </div>
              <h4 className="text-3xl font-bold text-orange-200 mb-2">{events ? events.length : "-"}</h4>
              <p className="text-white/90 font-medium">Total Events</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-200" />
              </div>
              <h4 className="text-3xl font-bold text-blue-200 mb-2">500+</h4>
              <p className="text-white/90 font-medium">Volunteers Engaged</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-center">
              <div className="flex items-center justify-center mb-4">
                <CalendarIcon className="w-8 h-8 text-green-200" />
              </div>
              <h4 className="text-3xl font-bold text-green-200 mb-2">50+</h4>
              <p className="text-white/90 font-medium">Communities Served</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* All Events Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">

          <EventGrid selectedDate={new Date()} events={events || undefined} />
        </div>
      </section>
    </div>
  );
}
