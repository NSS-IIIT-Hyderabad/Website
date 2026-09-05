"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql_Q&M/getEvents";
import { ADD_EVENT, CHANGE_EVENT, REMOVE_EVENT } from "@/graphql_Q&M/eventMutations";
import { EventDTO } from "@/types/event";

type EventFormState = {
  eventName: string;
  startTime: string; // yyyy-mm-dd, HTML date input format
  endTime: string;
  venue: string;
  description: string;
  eventProfile: string;
  audience: string; // comma-separated in the form
};

const emptyForm: EventFormState = {
  eventName: "",
  startTime: "",
  endTime: "",
  venue: "",
  description: "",
  eventProfile: "",
  audience: "",
};

// Backend stores dates as YYYY/MM/DD; HTML date inputs use YYYY-MM-DD.
const toDateInput = (v: string) => (v ? v.replaceAll("/", "-") : "");
const toBackendDate = (v: string) => (v ? v.replaceAll("-", "/") : "");

export default function AdminEventsPage() {
  const { data, loading, error, refetch } = useQuery(GET_EVENTS, { fetchPolicy: "network-only" });
  const [addEvent] = useMutation(ADD_EVENT);
  const [changeEvent] = useMutation(CHANGE_EVENT);
  const [removeEvent] = useMutation(REMOVE_EVENT);

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState<{ mode: "add" | "edit"; form: EventFormState } | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const events: EventDTO[] = data?.viewEvents ?? [];
  const filtered = events.filter((ev) => {
    const q = search.toLowerCase();
    return (
      ev.eventName.toLowerCase().includes(q) ||
      (ev.venue || "").toLowerCase().includes(q) ||
      (ev.description || "").toLowerCase().includes(q) ||
      (ev.audience?.some((a) => a.toLowerCase().includes(q)) ?? false)
    );
  });

  function openAdd() {
    setFormError(null);
    setEditing({ mode: "add", form: emptyForm });
  }

  function openEdit(ev: EventDTO) {
    setFormError(null);
    setEditing({
      mode: "edit",
      form: {
        eventName: ev.eventName,
        startTime: toDateInput(ev.startTime),
        endTime: toDateInput(ev.endTime),
        venue: ev.venue,
        description: ev.description,
        eventProfile: ev.eventProfile || "",
        audience: (ev.audience || []).join(", "),
      },
    });
  }

  function updateForm(patch: Partial<EventFormState>) {
    setEditing((prev) => (prev ? { ...prev, form: { ...prev.form, ...patch } } : prev));
  }

  async function handleSave() {
    if (!editing) return;
    const { form, mode } = editing;
    const input = {
      eventName: form.eventName.trim(),
      startTime: toBackendDate(form.startTime),
      endTime: toBackendDate(form.endTime),
      venue: form.venue.trim(),
      description: form.description,
      eventProfile: form.eventProfile.trim() || null,
      audience: form.audience
        .split(",")
        .map((a) => a.trim().toLowerCase())
        .filter(Boolean),
    };

    setSaving(true);
    setFormError(null);
    try {
      if (mode === "add") {
        await addEvent({ variables: { event: input } });
      } else {
        await changeEvent({ variables: { event: input } });
      }
      await refetch();
      setEditing(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save event.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(eventName: string) {
    if (!confirm("Delete this event?")) return;
    try {
      await removeEvent({ variables: { eventName } });
      await refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete event.");
    }
  }

  return (
    <div className="min-h-screen bg-nss-bg p-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-sm text-gray-600 hover:underline">← Back</a>
            <h1 className="text-2xl font-bold heading-primary">Events</h1>
          </div>
          <div className="flex items-center gap-3">
            <input placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="border px-3 py-2 rounded w-72" />
            <button onClick={openAdd} className="btn-base btn-secondary">Add Event</button>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading events...</p>}
        {error && <p className="text-red-600">Unable to load events.</p>}

        <div className="space-y-4">
          <p className="text-sm text-gray-600">Total events: <strong>{events.length}</strong></p>

          {filtered.map((ev) => (
            <div key={ev.eventName} className="modern-card">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{ev.eventName}</h3>
                    <span className="text-sm text-gray-600">{ev.startTime} - {ev.endTime}</span>
                  </div>
                  <p className="text-sm text-gray-500">{ev.venue}</p>
                  {ev.audience && ev.audience.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {ev.audience.map((aud, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{aud}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setExpanded((prev) => ({ ...prev, [ev.eventName]: !prev[ev.eventName] }))} className="p-2 rounded hover:bg-gray-100 text-nss-primary">
                    {expanded[ev.eventName] ? "▾" : "▸"}
                  </button>
                  <button onClick={() => openEdit(ev)} className="btn-base btn-primary">Edit</button>
                </div>
              </div>

              {expanded[ev.eventName] && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{ev.description}</p>
                  </div>
                  <div>
                    {ev.eventProfile && ev.eventProfile !== "No Poster URL" && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={ev.eventProfile} alt={ev.eventName} className="w-full rounded" />
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3 text-right">
                <button onClick={() => handleRemove(ev.eventName)} className="text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 my-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{editing.mode === "add" ? "Add Event" : `Edit Event - ${editing.form.eventName}`}</h2>
                <button onClick={() => setEditing(null)} className="text-gray-600">Close</button>
              </div>

              {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600">Event Name</label>
                    <input
                      className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                      value={editing.form.eventName}
                      disabled={editing.mode === "edit"}
                      onChange={(e) => updateForm({ eventName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Venue</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.venue} onChange={(e) => updateForm({ venue: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Start Date</label>
                    <input className="w-full border px-3 py-2 rounded" type="date" value={editing.form.startTime} onChange={(e) => updateForm({ startTime: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">End Date</label>
                    <input className="w-full border px-3 py-2 rounded" type="date" value={editing.form.endTime} onChange={(e) => updateForm({ endTime: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600">Description</label>
                  <textarea rows={4} className="w-full border px-3 py-2 rounded" value={editing.form.description} onChange={(e) => updateForm({ description: e.target.value })} />
                </div>

                <div>
                  <label className="text-xs text-gray-600">Poster URL</label>
                  <input className="w-full border px-3 py-2 rounded" value={editing.form.eventProfile} onChange={(e) => updateForm({ eventProfile: e.target.value })} placeholder="e.g. /carousel_images/event.jpg" />
                </div>

                <div>
                  <label className="text-xs text-gray-600">Target Audience (comma-separated: ug1, ug2, ug3, ug4, pg, staff, faculty, internal, external)</label>
                  <input className="w-full border px-3 py-2 rounded" value={editing.form.audience} onChange={(e) => updateForm({ audience: e.target.value })} placeholder="e.g. ug1, ug2, internal" />
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditing(null)} className="btn-base btn-outline">Cancel</button>
                  <button onClick={handleSave} disabled={saving} className="btn-base btn-primary disabled:opacity-50">
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
