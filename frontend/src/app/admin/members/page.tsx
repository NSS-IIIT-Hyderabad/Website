"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MEMBERS } from "@/graphql_Q&M/getMembers";
import { ADD_MEMBER, CHANGE_MEMBER, REMOVE_MEMBER } from "@/graphql_Q&M/memberMutations";
import { ROLE_OPTIONS, TEAM_OPTIONS, STATUS_OPTIONS, roleLabel, teamLabel } from "@/data/memberEnums";

type WorkHistoryForm = { role: string; team: string; start: string; end: string; status: string };

type MemberDTO = {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  batch: string;
  department: string;
  photoUrl: string;
  phone: string;
  bio: string;
  linkedin: string;
  github: string;
  achievements: string[];
  interests: string[];
  workHistory: { role: string; team: string; start: string; end: string | null; status: string | null }[];
};

type MemberForm = {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  batch: string;
  department: string;
  photoUrl: string;
  phone: string;
  bio: string;
  linkedin: string;
  github: string;
  achievements: string; // newline-separated in the form
  interests: string; // newline-separated in the form
  workHistory: WorkHistoryForm[];
};

const emptyForm: MemberForm = {
  id: "",
  name: "",
  email: "",
  rollNumber: "",
  batch: "",
  department: "",
  photoUrl: "",
  phone: "",
  bio: "",
  linkedin: "",
  github: "",
  achievements: "",
  interests: "",
  workHistory: [],
};

function toForm(m: MemberDTO): MemberForm {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    rollNumber: m.rollNumber,
    batch: m.batch || "",
    department: m.department || "",
    photoUrl: m.photoUrl || "",
    phone: m.phone || "",
    bio: m.bio || "",
    linkedin: m.linkedin || "",
    github: m.github || "",
    achievements: (m.achievements || []).join("\n"),
    interests: (m.interests || []).join("\n"),
    workHistory: (m.workHistory || []).map((w) => ({
      role: w.role,
      team: w.team,
      start: w.start || "",
      end: w.end || "",
      status: w.status || "",
    })),
  };
}

export default function AdminMembersPage() {
  const { data, loading, error, refetch } = useQuery(GET_MEMBERS, { fetchPolicy: "network-only" });
  const [addMember] = useMutation(ADD_MEMBER);
  const [changeMember] = useMutation(CHANGE_MEMBER);
  const [removeMember] = useMutation(REMOVE_MEMBER);

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState<{ mode: "add" | "edit"; form: MemberForm } | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const members: MemberDTO[] = data?.viewMembers ?? [];
  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.rollNumber || "").toLowerCase().includes(q) ||
      (m.department || "").toLowerCase().includes(q)
    );
  });

  function openAdd() {
    setFormError(null);
    setEditing({ mode: "add", form: emptyForm });
  }

  function openEdit(m: MemberDTO) {
    setFormError(null);
    setEditing({ mode: "edit", form: toForm(m) });
  }

  function updateForm(patch: Partial<MemberForm>) {
    setEditing((prev) => (prev ? { ...prev, form: { ...prev.form, ...patch } } : prev));
  }

  function updateWorkHistory(idx: number, patch: Partial<WorkHistoryForm>) {
    setEditing((prev) => {
      if (!prev) return prev;
      const wh = [...prev.form.workHistory];
      wh[idx] = { ...wh[idx], ...patch };
      return { ...prev, form: { ...prev.form, workHistory: wh } };
    });
  }

  function addWorkRow() {
    setEditing((prev) =>
      prev
        ? {
            ...prev,
            form: {
              ...prev.form,
              workHistory: [
                ...prev.form.workHistory,
                { role: ROLE_OPTIONS[0].value, team: TEAM_OPTIONS[0].value, start: "", end: "", status: STATUS_OPTIONS[0].value },
              ],
            },
          }
        : prev
    );
  }

  function removeWorkRow(idx: number) {
    setEditing((prev) =>
      prev ? { ...prev, form: { ...prev.form, workHistory: prev.form.workHistory.filter((_, i) => i !== idx) } } : prev
    );
  }

  async function handleSave() {
    if (!editing) return;
    const { form, mode } = editing;
    const input = {
      id: form.id.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      rollNumber: form.rollNumber.trim(),
      photoUrl: form.photoUrl.trim() || "-",
      phone: form.phone.trim() || "-",
      bio: form.bio,
      batch: form.batch,
      department: form.department,
      linkedin: form.linkedin.trim() || "-",
      github: form.github.trim() || "-",
      achievements: form.achievements.split("\n").map((a) => a.trim()).filter(Boolean),
      interests: form.interests.split("\n").map((a) => a.trim()).filter(Boolean),
      workHistory: form.workHistory.map((w) => ({
        role: w.role,
        team: w.team,
        start: w.start,
        end: w.end || null,
        status: w.status || null,
      })),
    };

    setSaving(true);
    setFormError(null);
    try {
      if (mode === "add") {
        await addMember({ variables: { member: input } });
      } else {
        await changeMember({ variables: { member: input } });
      }
      await refetch();
      setEditing(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save member.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(rollNumber: string) {
    if (!confirm("Delete this member?")) return;
    try {
      await removeMember({ variables: { rollNumber } });
      await refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete member.");
    }
  }

  return (
    <div className="min-h-screen bg-nss-bg p-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-sm text-gray-600 hover:underline">← Back</a>
            <h1 className="text-2xl font-bold heading-primary">Members</h1>
          </div>
          <div className="flex items-center gap-3">
            <input placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} className="border px-3 py-2 rounded w-72" />
            <button onClick={openAdd} className="btn-base btn-secondary">Add Member</button>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading members...</p>}
        {error && <p className="text-red-600">Unable to load members.</p>}

        <div className="space-y-4">
          {filtered.map((m) => (
            <div key={m.rollNumber} className="modern-card">
              <div className="flex items-center gap-4">
                <Image src={m.photoUrl && m.photoUrl !== "-" ? m.photoUrl : "/favicon.ico"} alt={m.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{m.name}</h3>
                    <span className="text-sm text-gray-500">{m.rollNumber}</span>
                    <span className="text-sm text-gray-600">• {m.department} • {m.batch}</span>
                  </div>
                  <p className="text-sm text-gray-600">{m.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setExpanded((prev) => ({ ...prev, [m.rollNumber]: !prev[m.rollNumber] }))} aria-expanded={!!expanded[m.rollNumber]} className="p-2 rounded hover:bg-gray-100 text-nss-primary">
                    {expanded[m.rollNumber] ? "▾" : "▸"}
                  </button>
                  <button onClick={() => openEdit(m)} className="btn-base btn-primary">Edit</button>
                  <button onClick={() => handleRemove(m.rollNumber)} className="text-sm text-red-600">Delete</button>
                </div>
              </div>

              {expanded[m.rollNumber] && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Work History</h4>
                  <div className="overflow-auto">
                    <table className="w-full text-sm table-auto">
                      <thead>
                        <tr className="text-left text-gray-600">
                          <th className="px-2 py-1">Role</th>
                          <th className="px-2 py-1">Team</th>
                          <th className="px-2 py-1">Start</th>
                          <th className="px-2 py-1">End</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(m.workHistory || []).map((row, rIdx) => (
                          <tr key={rIdx} className="border-t">
                            <td className="px-2 py-2">{roleLabel(row.role)}</td>
                            <td className="px-2 py-2">{teamLabel(row.team)}</td>
                            <td className="px-2 py-2">{row.start}</td>
                            <td className="px-2 py-2">{row.end || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Editor Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 my-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{editing.mode === "add" ? "Add Member" : `Edit Member - ${editing.form.name}`}</h2>
                <button onClick={() => setEditing(null)} className="text-gray-600">Close</button>
              </div>

              {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600">ID</label>
                    <input className="w-full border px-3 py-2 rounded disabled:bg-gray-100" value={editing.form.id} disabled={editing.mode === "edit"} onChange={(e) => updateForm({ id: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Roll Number (10 digits)</label>
                    <input className="w-full border px-3 py-2 rounded disabled:bg-gray-100" value={editing.form.rollNumber} disabled={editing.mode === "edit"} onChange={(e) => updateForm({ rollNumber: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Name</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.name} onChange={(e) => updateForm({ name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Email</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.email} onChange={(e) => updateForm({ email: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Batch</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.batch} onChange={(e) => updateForm({ batch: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Department</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.department} onChange={(e) => updateForm({ department: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Phone</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.phone} onChange={(e) => updateForm({ phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Photo URL</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.photoUrl} onChange={(e) => updateForm({ photoUrl: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">LinkedIn</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.linkedin} onChange={(e) => updateForm({ linkedin: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">GitHub</label>
                    <input className="w-full border px-3 py-2 rounded" value={editing.form.github} onChange={(e) => updateForm({ github: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600">Bio</label>
                  <textarea className="w-full border px-3 py-2 rounded" rows={3} value={editing.form.bio} onChange={(e) => updateForm({ bio: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600">Achievements (one per line)</label>
                    <textarea className="w-full border px-3 py-2 rounded" rows={3} value={editing.form.achievements} onChange={(e) => updateForm({ achievements: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Interests (one per line)</label>
                    <textarea className="w-full border px-3 py-2 rounded" rows={3} value={editing.form.interests} onChange={(e) => updateForm({ interests: e.target.value })} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold mb-2">Work History</h3>
                    <button onClick={addWorkRow} className="text-sm text-blue-700">+ Add</button>
                  </div>
                  <div className="space-y-2">
                    {editing.form.workHistory.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
                        <select className="border p-2 rounded" value={row.role} onChange={(e) => updateWorkHistory(idx, { role: e.target.value })}>
                          {ROLE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                        <select className="border p-2 rounded" value={row.team} onChange={(e) => updateWorkHistory(idx, { team: e.target.value })}>
                          {TEAM_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                        <input className="border p-2 rounded" placeholder="Start (e.g. 2024-01)" value={row.start} onChange={(e) => updateWorkHistory(idx, { start: e.target.value })} />
                        <input className="border p-2 rounded" placeholder="End (blank = present)" value={row.end} onChange={(e) => updateWorkHistory(idx, { end: e.target.value })} />
                        <button onClick={() => removeWorkRow(idx)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
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
