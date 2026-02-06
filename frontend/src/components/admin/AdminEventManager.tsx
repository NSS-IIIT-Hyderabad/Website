"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import eventsData from "@/data/eventsData";

export type EventItem = {
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  image?: string;
};

type LegacyEventData = {
  event_name?: string;
  name?: string;
  start?: string;
  startTime?: string;
  end?: string;
  endTime?: string;
  venue?: string;
  location?: string;
  description?: string;
  event_profile?: string;
  image?: string;
};

const STORAGE_KEY = "admin_events";

export default function AdminEventManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editing, setEditing] = useState<EventItem | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setEvents(JSON.parse(raw));
        return;
      } catch {}
    }
    // Map legacy eventsData shape to the EventItem shape used in this component
    const mapped = (eventsData as LegacyEventData[]).map(e => ({
      name: e.event_name || e.name || "",
      startTime: e.start || e.startTime || "",
      endTime: e.end || e.endTime || "",
      location: e.venue || e.location || "",
      description: e.description || "",
      image: e.event_profile || e.image || "",
    }));
    setEvents(mapped);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const openEditor = (e: EventItem | null) => setEditing(e);
  const saveEvent = (updated: EventItem, idx?: number) => {
    if (typeof idx === "number") {
      setEvents(prev => prev.map((ev, i) => (i === idx ? updated : ev)));
    } else {
      setEvents(prev => [updated, ...prev]);
    }
    openEditor(null);
  };

  const removeEvent = (idx: number) => {
    if (!confirm("Delete this event?")) return;
    setEvents(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-playfair font-bold text-blue-800">Admin - Events</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => openEditor({ name: "", startTime: "", endTime: "", location: "", description: "", image: "" })}>Add Event</button>
            <button className="px-4 py-2 bg-gray-100 rounded" onClick={() => { localStorage.removeItem(STORAGE_KEY);
              const mapped = (eventsData as LegacyEventData[]).map(e => ({
                name: e.event_name || e.name || "",
                startTime: e.start || e.startTime || "",
                endTime: e.end || e.endTime || "",
                location: e.venue || e.location || "",
                description: e.description || "",
                image: e.event_profile || e.image || "",
              }));
              setEvents(mapped);
            }}>Reset</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-4 border border-gray-100">
              {ev.image && <Image src={ev.image} alt={ev.name} width={400} height={160} className="w-full h-40 object-cover rounded-md mb-3" />}
              <div className="text-lg font-semibold text-blue-800">{ev.name}</div>
              <div className="text-sm text-gray-500">{ev.location}</div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{ev.description}</p>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-2 bg-blue-800 text-white rounded" onClick={() => openEditor(ev)}>Edit</button>
                <button className="px-3 py-2 bg-red-500 text-white rounded" onClick={() => removeEvent(idx)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="absolute inset-0 bg-black/40" onClick={() => openEditor(null)} />
          <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 overflow-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">{editing && editing.name ? "Edit Event" : "Add Event"}</h2>
            <EventEditor event={editing} onCancel={() => openEditor(null)} onSave={(e) => saveEvent(e)} />
          </div>
        </div>
      )}
    </div>
  );
}

function EventEditor({ event, onCancel, onSave }: { event: EventItem | null; onCancel: () => void; onSave: (e: EventItem) => void }) {
  const [local, setLocal] = useState<EventItem>(event || { name: "", startTime: "", endTime: "", location: "", description: "", image: "" });

  useEffect(() => setLocal(event || { name: "", startTime: "", endTime: "", location: "", description: "", image: "" }), [event]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3">
        <label className="text-sm text-gray-600">Name</label>
        <input className="p-2 border rounded" value={local.name} onChange={e => setLocal({ ...local, name: e.target.value })} />

        <label className="text-sm text-gray-600">Start Time (ISO)</label>
        <input className="p-2 border rounded" value={local.startTime} onChange={e => setLocal({ ...local, startTime: e.target.value })} />

        <label className="text-sm text-gray-600">End Time (ISO)</label>
        <input className="p-2 border rounded" value={local.endTime} onChange={e => setLocal({ ...local, endTime: e.target.value })} />

        <label className="text-sm text-gray-600">Location</label>
        <input className="p-2 border rounded" value={local.location} onChange={e => setLocal({ ...local, location: e.target.value })} />

        <label className="text-sm text-gray-600">Image URL</label>
        <input className="p-2 border rounded" value={local.image || ""} onChange={e => setLocal({ ...local, image: e.target.value })} />

        <label className="text-sm text-gray-600">Description</label>
        <textarea className="p-2 border rounded" value={local.description} onChange={e => setLocal({ ...local, description: e.target.value })} />
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button className="px-4 py-2 rounded border" onClick={onCancel}>Cancel</button>
        <button className="px-4 py-2 rounded bg-blue-800 text-white" onClick={() => onSave(local)}>Save</button>
      </div>
    </div>
  );
}
