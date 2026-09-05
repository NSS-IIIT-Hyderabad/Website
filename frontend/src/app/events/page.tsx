"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql_Q&M/getEvents";
import EventGrid from "@/components/events/EventGrid";

export default function EventsPage() {
  const { data, loading, error } = useQuery(GET_EVENTS);
  const events = data?.viewEvents ?? [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-green-50">
      <section className="bg-transparent px-6 py-12 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="mx-auto max-w-3xl text-6xl font-extrabold leading-tight tracking-tight text-gray-600 sm:text-7xl">
            Our Events
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Join us in making a difference through community service
          </p>
        </div>
      </section>
      
      {/* All Events Grid */}
      <section className="bg-transparent py-20">
        <div className="container mx-auto px-6 lg:px-8">
          {loading && <div className="text-center text-gray-500">Loading events...</div>}
          {error && <div className="text-center text-gray-500">Unable to load events.</div>}
          {!loading && !error && <EventGrid events={events} />}
        </div>
      </section>
    </div>
  );
}
