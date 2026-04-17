"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAdminEvents,
  isCurrentUserAdmin,
  saveAdminEvent,
  type AdminEvent,
} from "@/services/graphql/admin";
import {
  AdminBanner,
  AdminCard,
  AdminHeader,
  AdminShell,
  getUploadFileName,
} from "@/components/admin/AdminUi";
import {
  buildLegacyUploadUrl,
  buildUploadUrl,
  extractStoredUploadPath,
} from "@/utils/uploads";

type EventFormMode = "new" | "edit";

function emptyEvent(): AdminEvent {
  return {
    event_name: "",
    start: "",
    end: "",
    venue: "",
    description: "",
    event_profile: "",
    audience: [],
  };
}

export default function AdminEventFormPage({
  mode,
  eventId,
}: {
  mode: EventFormMode;
  eventId?: string;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [selectedPosterFile, setSelectedPosterFile] = useState<File | null>(null);
  const [selectedPosterPreview, setSelectedPosterPreview] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<AdminEvent>(emptyEvent);
  const [originalEventName, setOriginalEventName] = useState<string>("");
  const fieldLabelClass = "text-[11px] font-medium text-slate-600";
  const fieldInputClass = "h-8 w-full rounded border border-slate-300 px-2 text-xs";
  const fieldTextareaClass = "w-full rounded border border-slate-300 px-2 py-1 text-xs";

  const title = useMemo(() => (mode === "new" ? "Add Event" : "Edit Event"), [mode]);

  useEffect(() => {
    async function initialize() {
      try {
        setError(null);
        const allowed = await isCurrentUserAdmin();
        setAuthorized(allowed);
        if (!allowed) {
          setLoading(false);
          return;
        }

        if (mode === "edit" && eventId) {
          setLoading(true);
          const normalizedId = decodeURIComponent(eventId).trim();
          setOriginalEventName(normalizedId);
          const events = await getAdminEvents();
          const found = events.find(
            (item) => (item.event_name || "").trim().toLowerCase() === normalizedId.toLowerCase(),
          );
          if (!found) {
            setError("Event not found.");
          } else {
            setEvent(found);
          }
        }
      } catch (err) {
        console.error("Failed to initialize event form", err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, [mode, eventId]);

  const onSave = async () => {
    if (!event.event_name || !event.start || !event.end || !event.venue) {
      setError("Please fill event name, start date, end date, and venue.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      let profilePath = extractStoredUploadPath(event.event_profile, "events");

      if (selectedPosterFile) {
        const formData = new FormData();
        formData.append("file", selectedPosterFile);

        const uploadResponse = await fetch("/api/uploads/profiles?category=events", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!uploadResponse.ok) {
          const message = await uploadResponse.text();
          throw new Error(message || "Event poster upload failed");
        }

        const payload = (await uploadResponse.json()) as { path?: string };
        profilePath = extractStoredUploadPath(payload?.path || "", "events");
        if (!profilePath) {
          throw new Error("Event poster upload response was invalid");
        }
      }

      const ok = await saveAdminEvent(
        {
          ...event,
          event_profile: profilePath,
        },
        mode === "new",
        originalEventName || undefined,
      );
      if (!ok) {
        throw new Error("Event save mutation returned false");
      }
      router.push("/admin/events");
    } catch (err) {
      console.error("Failed to save event", err);
      setError(err instanceof Error ? err.message : "Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const onSelectPoster = (file: File | null) => {
    setSelectedPosterFile(file);
    if (selectedPosterPreview) {
      URL.revokeObjectURL(selectedPosterPreview);
      setSelectedPosterPreview("");
    }
    if (file) {
      setSelectedPosterPreview(URL.createObjectURL(file));
    }
  };

  return (
    <AdminShell compact>
      <AdminHeader backHref="/admin/events" backLabel="Back to events" title={title} />

      {error && <AdminBanner message={error} />}

      {!authorized ? (
        <AdminBanner message="You do not have admin permission to manage events." tone="neutral" />
      ) : loading ? (
        <AdminBanner message="Loading event details..." tone="neutral" />
      ) : (
        <AdminCard compact>
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-2.5 md:grid-cols-2">
              <div className="md:col-span-2">
              <label className={fieldLabelClass}>Event Name</label>
              <input
                className={fieldInputClass}
                value={event.event_name}
                onChange={(e) => setEvent({ ...event, event_name: e.target.value })}
              />
              </div>

              <div>
              <label className={fieldLabelClass}>Start Date</label>
              <input
                className={fieldInputClass}
                type="date"
                value={event.start}
                onChange={(e) => setEvent({ ...event, start: e.target.value })}
              />
              </div>

              <div>
              <label className={fieldLabelClass}>End Date</label>
              <input
                className={fieldInputClass}
                type="date"
                value={event.end}
                onChange={(e) => setEvent({ ...event, end: e.target.value })}
              />
              </div>

              <div className="md:col-span-2">
              <label className={fieldLabelClass}>Venue</label>
              <input
                className={fieldInputClass}
                value={event.venue}
                onChange={(e) => setEvent({ ...event, venue: e.target.value })}
              />
              </div>

              <div className="md:col-span-2">
              <label className={fieldLabelClass}>Audience (comma separated)</label>
              <input
                className={fieldInputClass}
                value={(event.audience || []).join(", ")}
                onChange={(e) =>
                  setEvent({
                    ...event,
                    audience: e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  })
                }
              />
              </div>

              <div className="md:col-span-2">
              <label className={fieldLabelClass}>Description</label>
              <textarea
                className={fieldTextareaClass}
                rows={2}
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
              />
              </div>

              <div className="md:col-span-2">
              <label className={fieldLabelClass}>Poster</label>
              <input
                className={fieldInputClass}
                type="file"
                accept="image/*"
                onChange={(e) => onSelectPoster(e.target.files?.[0] || null)}
                disabled={saving}
              />
              {selectedPosterFile && <p className="mt-1 text-xs text-slate-500">Poster queued. It will upload when you click Save.</p>}
              {(selectedPosterPreview || buildUploadUrl(event.event_profile, "events") || buildLegacyUploadUrl(event.event_profile)) && (
                <>
                  <img
                    src={selectedPosterPreview || buildUploadUrl(event.event_profile, "events") || buildLegacyUploadUrl(event.event_profile)}
                    alt="Event poster preview"
                    className="mt-1 h-40 w-full rounded border border-slate-200 object-cover"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    File: {selectedPosterFile?.name || getUploadFileName(event.event_profile) || "-"}
                  </p>
                </>
              )}
              </div>
            </div>

            <div className="mx-auto mt-4 flex w-full max-w-5xl justify-end gap-2">
              <Link href="/admin/events" className="rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                Cancel
              </Link>
              <button
                className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white disabled:opacity-60 hover:bg-slate-800"
                onClick={onSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
        </AdminCard>
      )}
    </AdminShell>
  );
}
