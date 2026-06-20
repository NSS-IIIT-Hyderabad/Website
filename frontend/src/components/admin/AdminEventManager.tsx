"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteAdminEvent,
  getAdminEvents,
  isCurrentUserAdmin,
  type AdminEvent,
} from "@/services/graphql/admin";
import {
  AdminBanner,
  AdminDangerButton,
  AdminHeader,
  AdminInput,
  AdminPrimaryLink,
  AdminShell,
} from "@/components/admin/AdminUi";
import { buildLegacyUploadUrl, buildUploadUrl } from "@/utils/uploads";
import { encodeAdminRouteParam } from "@/utils/adminRouteParam";

export default function AdminEventManager() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadEvents() {
    try {
      setLoading(true);
      setError(null);

      const allowed = await isCurrentUserAdmin();
      setAuthorized(allowed);
      if (!allowed) {
        return;
      }

      const data = await getAdminEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load admin events", err);
      setError("Failed to load events from backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const removeEvent = async (eventName: string) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      const ok = await deleteAdminEvent(eventName);
      if (!ok) {
        throw new Error("delete mutation returned false");
      }
      setEvents((prev) =>
        prev.filter((e) => (e.event_name || "").toLowerCase() !== eventName.toLowerCase()),
      );
    } catch (err) {
      console.error("Failed to delete event", err);
      setError("Failed to delete event.");
    }
  };

  const filteredEvents = events
    .map((event, sourceIndex) => ({ event, sourceIndex }))
    .filter(({ event }) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        event.event_name.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q)
      );
    });

  return (
    <AdminShell>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <AdminHeader
              backHref="/admin"
              backLabel="Back to admin"
              title="Event Management"
              description="Create and maintain website events in MongoDB."
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <AdminInput
              className="w-72"
              value={search}
              onChange={(value) => setSearch(value)}
              placeholder="Search by title, venue, or description"
            />
            <AdminPrimaryLink href="/admin/events/new">Add Event</AdminPrimaryLink>
          </div>
      </div>

      {error && <AdminBanner message={error} />}

      {loading ? (
        <AdminBanner message="Loading events..." tone="neutral" />
      ) : !authorized ? (
        <AdminBanner message="You do not have admin permission to manage events." tone="neutral" />
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-600">
            Showing {filteredEvents.length} of {events.length} events
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map(({ event, sourceIndex }) => (
              <div key={`${event.event_name}-${sourceIndex}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  {(buildUploadUrl(event.event_profile, "events") || buildLegacyUploadUrl(event.event_profile)) && (
                    <img
                      src={buildUploadUrl(event.event_profile, "events") || buildLegacyUploadUrl(event.event_profile)}
                      alt={event.event_name}
                      className="mb-3 h-40 w-full rounded-md object-cover"
                    />
                  )}
                  <div className="text-lg font-semibold text-slate-900">{event.event_name}</div>
                  <div className="text-sm text-gray-500">{event.venue}</div>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">{event.description}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    {event.start} - {event.end}
                  </p>
                  {event.audience && event.audience.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {event.audience.map((aud, idx) => (
                        <span key={`${aud}-${idx}`} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                          {aud}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/admin/events/${encodeAdminRouteParam(event.event_name)}/edit`}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-white hover:bg-slate-800"
                    >
                      Edit
                    </Link>
                    <AdminDangerButton onClick={() => removeEvent(event.event_name)}>
                      Delete
                    </AdminDangerButton>
                  </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              No events match your search.
            </div>
          )}
        </>
      )}
    </AdminShell>
  );
}
