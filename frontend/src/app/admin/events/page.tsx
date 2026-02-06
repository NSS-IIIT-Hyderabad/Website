"use client";
import React, { useState } from "react";
import eventsData, { EventItem } from "@/data/eventsData";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(eventsData.map(e => ({ ...e })));
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  function updateField(idx: number, key: keyof EventItem, value: EventItem[keyof EventItem]) {
    const copy = [...events];
    // create a new object for the updated event and assert its type to satisfy TS
    copy[idx] = { ...copy[idx], [key]: value } as EventItem;
    setEvents(copy);
  }
  
  function updateAudience(idx: number, audienceStr: string) {
    const copy = [...events];
    copy[idx].audience = audienceStr.split(',').map(a => a.trim()).filter(a => a);
    setEvents(copy);
  }

  function addEvent() {
    setEvents([...events, { 
      event_name: "New Event", 
      start: "", 
      end: "", 
      venue: "", 
      description: "", 
      event_profile: "",
      audience: []
    }]);
  }

  function removeEvent(idx: number) {
    const copy = [...events];
    copy.splice(idx, 1);
    setEvents(copy);
  }

  return (
    <div className="min-h-screen bg-nss-bg p-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-sm text-gray-600 hover:underline">← Back</a>
            <h1 className="text-2xl font-bold heading-primary">Admin - Events</h1>
          </div>
          <div className="flex items-center gap-3">
            <input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="border px-3 py-2 rounded w-72" />
            <button onClick={addEvent} className="btn-base btn-secondary">Add Event</button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">Total events: <strong>{events.length}</strong></p>

          {events.filter(ev => {
            const q = search.toLowerCase();
            return ev.event_name.toLowerCase().includes(q) || 
              (ev.venue || "").toLowerCase().includes(q) || 
              (ev.description || "").toLowerCase().includes(q) ||
              (ev.audience?.some(a => a.toLowerCase().includes(q)) ?? false);
          }).map((ev, idx) => (
            <div key={idx} className="modern-card">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{ev.event_name}</h3>
                    <span className="text-sm text-gray-600">{ev.start} - {ev.end}</span>
                  </div>
                  <p className="text-sm text-gray-600">{ev.venue}</p>
                  {ev.audience && ev.audience.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {ev.audience.map((aud, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{aud}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))} className="p-2 rounded hover:bg-gray-100 text-nss-primary">{expanded[idx] ? '▾' : '▸'}</button>
                  <button onClick={() => setEditingIdx(idx)} className="btn-base btn-primary">Edit</button>
                </div>
              </div>

              {expanded[idx] && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{ev.description}</p>
                  </div>
                  <div>
                    {ev.event_profile && ev.event_profile !== "No Poster URL" && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/events_posters/${ev.event_profile}`} alt={ev.event_name} className="w-full rounded" />
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <button onClick={() => removeEvent(idx)} className="text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Edit Modal */}
        {editingIdx !== null && events[editingIdx] && (
          <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 my-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Edit Event - {events[editingIdx].event_name}</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingIdx(null)} className="text-gray-600">Close</button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600">Event Name</label>
                    <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].event_name} onChange={e => updateField(editingIdx, 'event_name', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Venue</label>
                    <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].venue} onChange={e => updateField(editingIdx, 'venue', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Start Date</label>
                    <input className="w-full border px-3 py-2 rounded" type="date" value={events[editingIdx].start} onChange={e => updateField(editingIdx, 'start', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">End Date</label>
                    <input className="w-full border px-3 py-2 rounded" type="date" value={events[editingIdx].end} onChange={e => updateField(editingIdx, 'end', e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600">Description</label>
                  <textarea rows={4} className="w-full border px-3 py-2 rounded" value={events[editingIdx].description} onChange={e => updateField(editingIdx, 'description', e.target.value)} />
                </div>

                <div>
                  <label className="text-xs text-gray-600">Event Poster Filename</label>
                  <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].event_profile || ''} onChange={e => updateField(editingIdx, 'event_profile', e.target.value)} placeholder="e.g. poster_event_name.jpg" />
                </div>
                
                <div>
                  <label className="text-xs text-gray-600">Target Audience (comma-separated)</label>
                  <input className="w-full border px-3 py-2 rounded" value={events[editingIdx].audience?.join(', ') || ''} onChange={e => updateAudience(editingIdx, e.target.value)} placeholder="e.g. ug1, ug2, pg, fac" />
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingIdx(null)} className="btn-base btn-outline">Cancel</button>
                  <button onClick={() => {
                    // Save to localStorage
                    localStorage.setItem('admin_events', JSON.stringify(events));
                    setEditingIdx(null);
                    alert('Events saved to localStorage!');
                  }} className="btn-base btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
