import React, { useState } from "react";
import Link from "next/link";

import eventsData, { EventItem } from "@/data/eventsData";

function formatDateIndian(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

interface EventGridProps {
  selectedDate: Date;
  events?: EventItem[];
}

const EventGrid: React.FC<EventGridProps> = ({ selectedDate, events: passedEvents }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, ongoing, upcoming, past

  // Function to determine event status
  function getEventStatus(event: EventItem) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(event.start);
    start.setHours(0, 0, 0, 0);
    const end = new Date(event.end);
    end.setHours(23, 59, 59, 999);
    if (today >= start && today <= end) return "ongoing";
    if (start > today) return "upcoming";
    if (end < today) return "past";
    return "unknown";
  }





  // Use centralized events data or events passed as prop (admin edits saved to localStorage are passed down)
  const events = passedEvents || eventsData || [];
    // Filter events based on search query and status filter
  const filteredEvents = events.filter((event: EventItem) => {
    const matchesSearch = event.event_name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      (event.audience?.some(a => a.toLowerCase().includes(search.toLowerCase())) ?? false);
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && getEventStatus(event) === filter;
  });


  const renderEventCard = (event: EventItem, idx: number) => {
    const slug = encodeURIComponent(event.event_name.replace(/\s+/g, "-").toLowerCase());
    // event.event_profile may be a full path (starting with '/') or just a filename stored under /events_posters/
    const posterUrl = event.event_profile && event.event_profile !== "No Poster URL"
      ? (event.event_profile.startsWith('/') ? event.event_profile : `/events_posters/${event.event_profile}`)
      : "/favicon.ico";
    
    const status = getEventStatus(event);
    
    // Define status configuration for badge
    const statusConfig = {
      ongoing: { color: 'bg-green-500', dotColor: 'bg-green-200', label: 'Ongoing' },
      upcoming: { color: 'bg-purple-500', dotColor: 'bg-purple-200', label: 'Upcoming' },
      past: { color: 'bg-gray-500', dotColor: 'bg-gray-200', label: 'Past' },
      unknown: { color: 'bg-blue-500', dotColor: 'bg-blue-200', label: 'Event' }
    }[status] || { color: 'bg-blue-500', dotColor: 'bg-blue-200', label: 'Event' };
      
    return (
      <Link href={`/events/${slug}`} key={idx} className="group block">
        <div className="bg-white rounded-2xl shadow-md border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full flex flex-col relative min-h-[420px]">
          {/* Status Badge - Floating */}
          <div className={`absolute top-3 right-3 z-10 ${statusConfig.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5`}>
            <span className={`w-2 h-2 ${statusConfig.dotColor} rounded-full animate-pulse`}></span>
            {statusConfig.label}
          </div>
          
          <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-50 to-purple-50">
            <img 
              src={posterUrl} 
              alt={event.event_name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            {/* Event Title */}
            <h3 className="font-bold text-lg text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-snug">
              {event.event_name}
            </h3>
            
            {/* Date Info with Icon */}
            <div className="flex items-center gap-2 text-orange-600 font-medium mb-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-100">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold">
                {formatDateIndian(event.start)} <span className="text-gray-500">to</span> {formatDateIndian(event.end)}
              </span>
            </div>
            
            {/* Venue Info with Icon */}
            <div className="flex items-center gap-2 text-green-600 font-medium mb-3 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold line-clamp-1">{event.venue}</span>
            </div>
            
            {/* Description Preview */}
            <div className="mb-3 min-h-[60px] flex items-start">
              <p className="text-gray-600 text-sm leading-tight w-full overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }}>
              {event.description || <span className="opacity-0 select-none">No description</span>}
              </p>
            </div>

            {/* Audience Tags */}
            {event.audience && event.audience.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {event.audience.slice(0, 4).map((aud, i) => (
                  <span key={i} className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-semibold hover:scale-105 transition-transform">
                    {aud.toUpperCase()}
                  </span>
                ))}
                {event.audience.length > 4 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-semibold">
                    +{event.audience.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Enhanced CTA Button */}
            <div className="w-full mt-auto">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 transform group-hover:scale-105 shadow-md group-hover:shadow-xl flex items-center justify-center gap-2">
                <span>View Details</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  };



  return (
    <div className="w-full">
      {/* Enhanced Search Bar with Gradient */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search events, venues, or audience..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-5 py-4 pl-14 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-gray-700 bg-white shadow-md hover:shadow-lg text-base"
          />
          <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Modern Filter Chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          { key: "all", label: "All Events", color: "blue" },
          { key: "ongoing", label: "Ongoing", color: "green" },
          { key: "upcoming", label: "Upcoming", color: "purple" },
          { key: "past", label: "Past", color: "gray" }
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`group px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              filter === key
                ? `bg-gradient-to-r ${
                    color === 'blue' ? 'from-blue-600 to-blue-700' : 
                    color === 'green' ? 'from-green-600 to-green-700' : 
                    color === 'purple' ? 'from-purple-600 to-purple-700' : 
                    'from-gray-600 to-gray-700'
                  } text-white shadow-lg`
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
            }`}
          >
            <span className="text-sm font-semibold">{label}</span>
            {filter === key && (
              <span className="ml-1 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                {filteredEvents.length}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Enhanced Results Count with Animation */}
      {filteredEvents.length > 0 && (
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-full border border-blue-200">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-700 font-medium">
              <span className="font-bold text-blue-700">{filteredEvents.length}</span> 
              {filter === "all" ? " events" : ` ${filter} events`}
              {search && (
                <span className="text-gray-600">
                  {" "}matching <span className="font-semibold text-purple-600">"{search}"</span>
                </span>
              )}
            </span>
          </div>
        </div>
      )}
      
      {/* Enhanced Events Grid with Stagger Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full text-center py-20 animate-fade-in">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 max-w-md mx-auto border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No events found</h3>
              <p className="text-gray-500 leading-relaxed">
                {search ? (
                  <>No events match <span className="font-semibold text-gray-700">"{search}"</span></>
                ) : (
                  <>No {filter === "all" ? "" : filter + " "}events available</>
                )}
              </p>
              {(search || filter !== "all") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setFilter("all");
                  }}
                  className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredEvents.map((event, idx) => (
            <div 
              key={idx} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {renderEventCard(event, idx)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default EventGrid;
