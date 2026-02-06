"use client";
import React from "react";
import EventGrid from "@/components/events/EventGrid";

export default function EventsPage() {
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_events");
      if (raw) {
        JSON.parse(raw);
        return;
      }
    } catch {}
    // Using default events
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
      
      {/* All Events Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">

          <EventGrid />
        </div>
      </section>
    </div>
  );
}
