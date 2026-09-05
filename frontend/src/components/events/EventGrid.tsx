import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Search,
  X,
  Clock,
  CalendarCheck,
  CalendarX,
  Layers,
} from "lucide-react";

import { EventDTO, toSlug } from "@/types/event";

function formatDateIndian(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

interface EventGridProps {
  events: EventDTO[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "ongoing" | "upcoming" | "past">(
    "all"
  );

  /* ---------------- Event Status ---------------- */
  function getEventStatus(event: EventDTO) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(event.startTime);
    start.setHours(0, 0, 0, 0);

    const end = new Date(event.endTime);
    end.setHours(23, 59, 59, 999);

    if (today >= start && today <= end) return "ongoing";
    if (start > today) return "upcoming";
    if (end < today) return "past";
    return "unknown";
  }

  /* ---------------- Filtering ---------------- */
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.eventName.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      (event.audience?.some((a) =>
        a.toLowerCase().includes(search.toLowerCase())
      ) ??
        false);

    if (filter === "all") return matchesSearch;
    return matchesSearch && getEventStatus(event) === filter;
  });

  /* ---------------- Card Renderer ---------------- */
  const renderEventCard = (event: EventDTO, idx: number) => {
    const slug = encodeURIComponent(toSlug(event.eventName));

    const posterUrl =
      event.eventProfile && event.eventProfile !== "No Poster URL"
        ? event.eventProfile.startsWith("/")
          ? event.eventProfile
          : `/events_posters/${event.eventProfile}`
        : "/favicon.ico";

    const status = getEventStatus(event);

    const statusConfig = {
      ongoing: { label: "Ongoing", color: "bg-green-500", dotColor: "bg-green-300" },
      upcoming: { label: "Upcoming", color: "bg-purple-500", dotColor: "bg-purple-300" },
      past: { label: "Past", color: "bg-gray-500", dotColor: "bg-gray-300" },
      unknown: { label: "Event", color: "bg-blue-500", dotColor: "bg-blue-300" },
    }[status];

    return (
      <Link href={`/events/${slug}`} key={idx} className="group block">
        <div className="bg-white rounded-2xl shadow-md border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full flex flex-col relative min-h-[420px]">
          {/* Status Badge */}
          <div
            className={`absolute top-3 right-3 z-10 ${statusConfig.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5`}
          >
            <span
              className={`w-2 h-2 ${statusConfig.dotColor} rounded-full animate-pulse`}
            />
            {statusConfig.label}
          </div>

          <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-50 to-purple-50">
            <Image
              src={posterUrl}
              alt={event.eventName}
              width={400}
              height={192}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-lg text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {event.eventName}
            </h3>

            {/* Date */}
            <div className="flex items-center gap-2 text-orange-600 font-medium mb-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-100">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-semibold">
                {formatDateIndian(event.startTime)}{" "}
                <span className="text-gray-500">to</span>{" "}
                {formatDateIndian(event.endTime)}
              </span>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-2 text-green-600 font-medium mb-3 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-semibold line-clamp-1">
                {event.venue}
              </span>
            </div>

            {/* Description */}
            <div className="mb-3 min-h-[60px]">
              <p className="text-gray-600 text-sm leading-tight line-clamp-2">
                {event.description || (
                  <span className="opacity-0 select-none">No description</span>
                )}
              </p>
            </div>
            {/* Audience */}
            {event.audience && event.audience.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {event.audience.slice(0, 4).map((aud, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-semibold"
                  >
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

            {/* CTA */}
            <div className="w-full mt-auto">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#332a67] px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#43358a] group-hover:scale-105">
                View Details
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </Link>    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="w-full">
      {/* Search & Filters (Stacked) */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        {/* Search Bar */}
        <div className="relative w-full mb-3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, venues, audience..."
            className="w-full pl-12 pr-10 py-4 border-slate-300 border-1 rounded-xl"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
        {/* Filter Buttons Row */}
        <div className="flex flex-row flex-nowrap gap-3 w-full overflow-x-auto pb-2">
          {[
            { key: "all", label: "All", icon: Layers },
            { key: "ongoing", label: "Ongoing", icon: Clock },
            { key: "upcoming", label: "Upcoming", icon: CalendarCheck },
            { key: "past", label: "Past", icon: CalendarX },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as "all" | "ongoing" | "upcoming" | "past")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition whitespace-nowrap ${
                filter === key
                  ? "bg-[#332a67] text-white shadow-lg"
                  : "border-2 border-[#332a67] bg-white text-[#332a67] hover:bg-[#332a67] hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredEvents.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No events found
          </p>
        ) : (
          filteredEvents.map(renderEventCard)
        )}
      </div>
    </div>
  );
};

export default EventGrid;
