"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAdminMembers,
  isCurrentUserAdmin,
  saveAdminMember,
  type AdminMember,
  type AdminWorkHistory,
} from "@/services/graphql/admin";
import {
  AdminBanner,
  AdminCard,
  AdminHeader,
  AdminShell,
  getUploadFileName,
} from "@/components/admin/AdminUi";
import { buildLegacyUploadUrl, buildUploadUrl, extractStoredUploadPath } from "@/utils/uploads";

type MemberFormMode = "new" | "edit";

const EMPTY_MEMBER: AdminMember = {
  name: "",
  email: "",
  rollNumber: "",
  photoUrl: "",
  phone: "",
  batch: "",
  year: "",
  department: "",
  linkedin: "",
  github: "",
  bio: "",
  achievements: [],
  interests: [],
  workHistory: [],
};

function deriveNameFromEmail(email: string): string {
  const local = (email || "").trim().toLowerCase().split("@")[0] || "";
  if (!local) return "";
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseCsv(input: string): string[] {
  return input
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function currentYearMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function normalizeWorkHistory(rows: AdminWorkHistory[] | undefined): AdminWorkHistory[] {
  return (rows || []).map((row) => {
    const endValue = (row.end || "").toString().trim().toLowerCase();
    return {
      ...row,
      end: endValue === "present" || endValue === "" ? null : row.end,
    };
  });
}

export default function AdminMemberFormPage({
  mode,
  memberEmail,
}: {
  mode: MemberFormMode;
  memberEmail?: string;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [member, setMember] = useState<AdminMember>(EMPTY_MEMBER);
  const isEditMode = mode === "edit";
  const fieldLabelClass = "text-xs font-medium text-slate-600";
  const fieldInputClass = "mt-1 w-full rounded border border-slate-300 px-2.5 py-1.5 text-sm";

  const title = useMemo(() => (mode === "new" ? "Add Member" : "Edit Member"), [mode]);

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

        if (mode === "edit" && memberEmail) {
          setLoading(true);
          const members = await getAdminMembers();
          const found = members.find(
            (m) => (m.email || "").trim().toLowerCase() === memberEmail.trim().toLowerCase(),
          );
          if (!found) {
            setError("Member not found.");
          } else {
            setMember({
              ...found,
              batch: found.batch || found.year || "",
              workHistory: normalizeWorkHistory(found.workHistory),
            });
          }
        }
      } catch (err) {
        console.error("Failed to initialize member form", err);
        setError("Failed to load member details.");
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, [mode, memberEmail]);

  const updateWorkHistory = (idx: number, patch: Partial<AdminWorkHistory>) => {
    const copy = [...(member.workHistory || [])];
    copy[idx] = { ...copy[idx], ...patch };
    setMember({ ...member, workHistory: copy });
  };

  const addWorkRow = () => {
    const current = currentYearMonth();
    setMember((prev) => ({
      ...prev,
      workHistory: [...(prev.workHistory || []), { role: "", team: "", start: current, end: null }],
    }));
  };

  const removeWorkRow = (idx: number) => {
    setMember((prev) => ({
      ...prev,
      workHistory: (prev.workHistory || []).filter((_, i) => i !== idx),
    }));
  };

  const endRole = (idx: number) => {
    if (!window.confirm("End this role as of the current month?")) {
      return;
    }
    updateWorkHistory(idx, { end: currentYearMonth() });
  };

  const onSave = async () => {
    if (!member.email || !member.rollNumber) {
      setError("Please fill email and roll number.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      let photoPath = extractStoredUploadPath(member.photoUrl, "members");

      if (selectedPhotoFile) {
        const formData = new FormData();
        formData.append("file", selectedPhotoFile);

        const uploadResponse = await fetch("/api/uploads/profiles?category=members", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!uploadResponse.ok) {
          const message = await uploadResponse.text();
          throw new Error(message || "Member photo upload failed");
        }

        const payload = (await uploadResponse.json()) as { path?: string };
        photoPath = extractStoredUploadPath(payload?.path || "", "members");
        if (!photoPath) {
          throw new Error("Member photo upload response was invalid");
        }
      }

      const payload: AdminMember = {
        ...member,
        name: deriveNameFromEmail(member.email),
        photoUrl: photoPath,
        year: member.batch || member.year || "",
        workHistory: normalizeWorkHistory(member.workHistory),
      };
      const ok = await saveAdminMember(
        payload,
        mode === "new",
        mode === "edit" ? memberEmail : undefined,
      );
      if (!ok) {
        throw new Error("Member save mutation returned false");
      }
      router.push("/admin/members");
    } catch (err) {
      console.error("Failed to save member", err);
      setError(err instanceof Error ? err.message : "Failed to save member.");
    } finally {
      setSaving(false);
    }
  };

  const onSelectPhoto = (file: File | null) => {
    setSelectedPhotoFile(file);
    if (selectedPhotoPreview) {
      URL.revokeObjectURL(selectedPhotoPreview);
      setSelectedPhotoPreview("");
    }
    if (file) {
      setSelectedPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <AdminShell compact>
      <AdminHeader backHref="/admin/members" backLabel="Back to members" title={title} />

      {error && <AdminBanner message={error} />}

      {!authorized ? (
        <AdminBanner message="You do not have admin permission to manage members." tone="neutral" />
      ) : loading ? (
        <AdminBanner message="Loading member details..." tone="neutral" />
      ) : (
        <AdminCard compact>
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className={fieldLabelClass}>Email</label>
                <input
                  className={fieldInputClass}
                  value={member.email}
                  onChange={(e) => setMember({ ...member, email: e.target.value.toLowerCase() })}
                  disabled={isEditMode}
                />
              </div>
              <div>
                <label className={fieldLabelClass}>Roll Number</label>
                <input
                  className={fieldInputClass}
                  value={member.rollNumber}
                  onChange={(e) => setMember({ ...member, rollNumber: e.target.value })}
                  disabled={isEditMode}
                />
              </div>
              <div className="md:col-span-2">
                <label className={fieldLabelClass}>Select Photo From File Manager (Uploads On Save)</label>
                <input
                  className={fieldInputClass}
                  type="file"
                  accept="image/*"
                  onChange={(e) => onSelectPhoto(e.target.files?.[0] || null)}
                  disabled={saving}
                />
                {selectedPhotoFile && <p className="mt-1 text-xs text-slate-500">Photo queued. It will upload when you click Save.</p>}
              </div>
              <div>
                <label className={fieldLabelClass}>Phone</label>
                <input
                  className={fieldInputClass}
                  value={member.phone || ""}
                  onChange={(e) => setMember({ ...member, phone: e.target.value })}
                />
              </div>
              <div>
                <label className={fieldLabelClass}>Batch</label>
                <input
                  className={fieldInputClass}
                  value={member.batch || ""}
                  onChange={(e) =>
                    setMember({ ...member, batch: e.target.value, year: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={fieldLabelClass}>Department</label>
                <input
                  className={fieldInputClass}
                  value={member.department || ""}
                  onChange={(e) => setMember({ ...member, department: e.target.value })}
                />
              </div>
              <div>
                <label className={fieldLabelClass}>LinkedIn</label>
                <input
                  className={fieldInputClass}
                  value={member.linkedin || ""}
                  onChange={(e) => setMember({ ...member, linkedin: e.target.value })}
                />
              </div>
              <div>
                <label className={fieldLabelClass}>GitHub</label>
                <input
                  className={fieldInputClass}
                  value={member.github || ""}
                  onChange={(e) => setMember({ ...member, github: e.target.value })}
                />
              </div>
              <div>
                <label className={fieldLabelClass}>Achievements (comma separated)</label>
                <input
                  className={fieldInputClass}
                  value={(member.achievements || []).join(", ")}
                  onChange={(e) => setMember({ ...member, achievements: parseCsv(e.target.value) })}
                />
              </div>
              <div>
                <label className={fieldLabelClass}>Interests (comma separated)</label>
                <input
                  className={fieldInputClass}
                  value={(member.interests || []).join(", ")}
                  onChange={(e) => setMember({ ...member, interests: parseCsv(e.target.value) })}
                />
              </div>
            </div>

            <div className="mx-auto mt-3 w-full max-w-5xl">
              <label className={fieldLabelClass}>Bio</label>
              <textarea
                className={fieldInputClass}
                rows={3}
                value={member.bio || ""}
                onChange={(e) => setMember({ ...member, bio: e.target.value })}
              />
            </div>

            {(selectedPhotoPreview || buildUploadUrl(member.photoUrl, "members") || buildLegacyUploadUrl(member.photoUrl)) && (
              <div className="mx-auto mt-3 w-full max-w-5xl">
                <label className={fieldLabelClass}>Photo Preview</label>
                <img
                  src={selectedPhotoPreview || buildUploadUrl(member.photoUrl, "members") || buildLegacyUploadUrl(member.photoUrl)}
                  alt="Member preview"
                  className="mt-1 h-40 w-40 rounded-full border border-slate-200 object-cover"
                />
                <p className="mt-1 text-xs text-slate-500">
                  File: {selectedPhotoFile?.name || getUploadFileName(member.photoUrl) || "-"}
                </p>
              </div>
            )}

            <div className="mx-auto mt-3 w-full max-w-5xl">
              <label className={fieldLabelClass}>Work History</label>
              <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full min-w-[780px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-slate-600">
                      <th className="px-3 py-2">Role</th>
                      <th className="px-3 py-2">Team</th>
                      <th className="px-3 py-2">Start</th>
                      <th className="px-3 py-2">End</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(member.workHistory || []).map((wh, idx) => (
                      <tr key={idx} className="border-t border-slate-100">
                        <td className="px-3 py-2">
                          <input
                            className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-sm"
                            value={wh.role}
                            onChange={(e) => updateWorkHistory(idx, { role: e.target.value })}
                            placeholder="Role"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-sm"
                            value={wh.team}
                            onChange={(e) => updateWorkHistory(idx, { team: e.target.value })}
                            placeholder="Team"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-sm"
                            type="month"
                            value={wh.start}
                            onChange={(e) => updateWorkHistory(idx, { start: e.target.value })}
                            placeholder="Start"
                          />
                        </td>
                        <td className="px-3 py-2 text-slate-700">{wh.end || "Present"}</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="rounded border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                              onClick={() => endRole(idx)}
                              disabled={!!wh.end}
                            >
                              End
                            </button>
                            <button
                              type="button"
                              className="rounded border border-red-300 px-2.5 py-1.5 text-sm text-red-700 hover:bg-red-50"
                              onClick={() => removeWorkRow(idx)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2">
                <button type="button" className="rounded border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50" onClick={addWorkRow}>
                  + Add Work Row
                </button>
              </div>
            </div>

            <div className="mx-auto mt-4 flex w-full max-w-5xl justify-end gap-2">
              <Link href="/admin/members" className="rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
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
