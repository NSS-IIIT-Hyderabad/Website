"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getEventsFromDB } from "@/graphql_Q&M/getEvents";
import type { Event } from "@/graphql_Q&M/getEvents";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const eventsData = await getEventsFromDB();
        setEvents(eventsData);
        setError(null);
      } catch (error) {
        console.error("Error loading events:", error);
        setError("Failed to load events. Please ensure the GraphQL backend is running.");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
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
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 font-semibold mb-2">Error</p>
              <p className="text-gray-600">{error}</p>
            </div>
          )}
          {loading && !error ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : !error && events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No events found</p>
            </div>
          ) : !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <div key={`${event.id || event.eventName || index}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {event.eventProfile && event.eventProfile !== "-" && (
                    <img 
                      src={event.eventProfile} 
                      alt={event.eventName} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.eventName}</h3>
                    <p className="text-sm text-orange-600 font-semibold mb-2">📅 {event.start} to {event.end}</p>
                    <p className="text-sm text-gray-700 mb-2">📍 {event.venue}</p>
                    <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
                    {event.audience && event.audience.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.audience.map((aud, audIndex) => (
                          <span key={`${aud}-${audIndex}`} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {aud}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
