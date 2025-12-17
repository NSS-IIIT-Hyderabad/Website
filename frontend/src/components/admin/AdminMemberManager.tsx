"use client";
import React, { useEffect, useMemo, useState } from "react";
import membersData from "@/data/Data";

type WorkHistory = { role: string; team: string; start: string; end: string | null };
// Base shape comes from data; augment with admin-only optional fields
type MemberBase = typeof membersData[number];
type Member = MemberBase & { year?: string };

const STORAGE_KEY = "admin_members";

export default function AdminMemberManager() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editing, setEditing] = useState<Member | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setMembers(JSON.parse(raw));
        return;
      } catch {}
    }
    setMembers(membersData as Member[]);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members]);

  const openEditor = (m: Member) => setEditing(m);
  const closeEditor = () => setEditing(null);

  const saveMember = (updated: Member) => {
    setMembers(prev => prev.map(m => (m.id === updated.id ? updated : m)));
    closeEditor();
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-playfair font-bold text-blue-800 mb-6">Admin - Members</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl shadow p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <img src={m.photoUrl || "/favicon.ico"} alt={m.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <div className="text-lg font-semibold text-blue-800">{m.name}</div>
                  <div className="text-sm text-gray-500">{m.email}</div>
                  <div className="text-sm text-gray-500">{m.rollNumber} • {m.year} • {m.department}</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4 line-clamp-3">{m.bio}</p>

              <div className="mt-4 flex gap-3">
                <button
                  className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                  onClick={() => openEditor(m)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating editor */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="absolute inset-0 bg-black/40" onClick={closeEditor} />
          <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 overflow-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Edit member - {editing.name}</h2>
            <MemberEditor member={editing} onCancel={closeEditor} onSave={saveMember} />
          </div>
        </div>
      )}
    </div>
  );
}

function MemberEditor({ member, onCancel, onSave }: { member: Member; onCancel: () => void; onSave: (m: Member) => void }) {
  const [local, setLocal] = useState<Member>(member);

  useEffect(() => setLocal(member), [member]);

  // isAdmin removed from member model; no-op

  const updateWorkHistory = (idx: number, patch: Partial<WorkHistory>) => {
    const copy = [...(local.workHistory || [])];
    copy[idx] = { ...copy[idx], ...patch };
    setLocal({ ...local, workHistory: copy });
  };

  const addWorkRow = () => setLocal(prev => ({ ...prev, workHistory: [...(prev.workHistory || []), { role: "", team: "", start: "", end: null }] }));
  const removeWorkRow = (idx: number) => setLocal(prev => ({ ...prev, workHistory: prev.workHistory?.filter((_, i) => i !== idx) || [] }));

  return (
    <div>
      {/* Display full details (read-only fields per requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">ID</label>
          <input className="w-full mt-1 p-2 border rounded" value={local.id} disabled />
        </div>
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input className="w-full mt-1 p-2 border rounded" value={local.name} disabled />
        </div>
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input className="w-full mt-1 p-2 border rounded" value={local.email} disabled />
        </div>
        <div>
          <label className="text-sm text-gray-600">Roll</label>
          <input className="w-full mt-1 p-2 border rounded" value={local.rollNumber} disabled />
        </div>
        <div>
          <label className="text-sm text-gray-600">Year</label>
          <input className="w-full mt-1 p-2 border rounded" value={local.year} disabled />
        </div>
        <div>
          <label className="text-sm text-gray-600">Department</label>
          <input className="w-full mt-1 p-2 border rounded" value={local.department} disabled />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-600">Photo URL</label>
        <input className="w-full mt-1 p-2 border rounded" value={local.photoUrl || ""} disabled />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">LinkedIn</label>
          <input className="w-full mt-1 p-2 border rounded" value={local.linkedin || ""} disabled />
        </div>
        <div>
          <label className="text-sm text-gray-600">GitHub</label>
          <input className="w-full mt-1 p-2 border rounded" value={local.github || ""} disabled />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-600">Bio</label>
        <textarea className="w-full mt-1 p-2 border rounded" value={local.bio || ""} disabled />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Achievements</label>
          <textarea className="w-full mt-1 p-2 border rounded" value={(local.achievements || []).join("\n")} disabled />
        </div>
        <div>
          <label className="text-sm text-gray-600">Interests</label>
          <textarea className="w-full mt-1 p-2 border rounded" value={(local.interests || []).join("\n")} disabled />
        </div>
      </div>

      {/* isAdmin control removed */}

      {/* Editable: Work History table */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semibold text-gray-700">Work History</h3>
          <button className="text-sm text-blue-700" onClick={addWorkRow}>+ Add</button>
        </div>

        <div className="mt-3 space-y-3">
          {(local.workHistory || []).map((wh, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <input className="p-2 border rounded col-span-1 md:col-span-1" value={wh.role} onChange={e => updateWorkHistory(idx, { role: e.target.value })} />
              <input className="p-2 border rounded col-span-1 md:col-span-1" value={wh.team} onChange={e => updateWorkHistory(idx, { team: e.target.value })} />
              <input className="p-2 border rounded col-span-1 md:col-span-1" value={wh.start} onChange={e => updateWorkHistory(idx, { start: e.target.value })} />
              <input className="p-2 border rounded col-span-1 md:col-span-1" value={wh.end || ""} onChange={e => updateWorkHistory(idx, { end: e.target.value || null })} />
              <div className="flex gap-2 justify-end">
                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => removeWorkRow(idx)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 rounded border" onClick={onCancel}>Cancel</button>
        <button className="px-4 py-2 rounded bg-blue-800 text-white" onClick={() => onSave(local)}>Save</button>
      </div>
    </div>
  );
}
