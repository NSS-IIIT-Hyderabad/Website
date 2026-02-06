"use client";
import React, { useState } from "react";
import Image from "next/image";
import membersData from "@/data/Data";

type WorkHistory = { role: string; team: string; start: string; end: string | null };
// Base shape comes from data; augment with admin-only optional fields
type MemberBase = typeof membersData[number];
type Member = MemberBase & { year?: string };

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>(membersData as Member[]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Member | null>(null);

  // (isAdmin removed) admin toggling is not maintained in this UI

  function updateWorkHistory(idx: number, rowIdx: number, key: keyof WorkHistory, value: string) {
    const copy = [...members];
    const wh = copy[idx].workHistory ? [...copy[idx].workHistory] : [];
    const row = { ...wh[rowIdx], [key]: value } as WorkHistory;
    wh[rowIdx] = row;
    copy[idx] = { ...copy[idx], workHistory: wh } as Member;
    setMembers(copy);
  }

  function addWorkRow(idx: number) {
    const copy = [...members];
    const wh = copy[idx].workHistory ? [...copy[idx].workHistory] : [];
    wh.push({ role: "", team: "", start: "", end: null });
    copy[idx] = { ...copy[idx], workHistory: wh } as Member;
    setMembers(copy);
  }

  function removeWorkRow(idx: number, rowIdx: number) {
    const copy = [...members];
    const wh = copy[idx].workHistory ? [...copy[idx].workHistory] : [];
    wh.splice(rowIdx, 1);
    copy[idx] = { ...copy[idx], workHistory: wh } as Member;
    setMembers(copy);
  }

  const filtered = members.filter(m => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.rollNumber || "").toLowerCase().includes(q) ||
      (m.department || "").toLowerCase().includes(q)
    );
  });

  function toggleExpand(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function openEditor(m: Member) {
    setEditing(m);
  }

  function closeEditor() {
    setEditing(null);
  }

  return (
    <div className="min-h-screen bg-nss-bg p-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-sm text-gray-600 hover:underline">← Back</a>
            <h1 className="text-2xl font-bold heading-primary">Admin - Members</h1>
          </div>
          <div className="flex items-center gap-3">
            <input placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} className="border px-3 py-2 rounded w-72" />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((m) => (
            <div key={m.id} className="modern-card">
              <div className="flex items-center gap-4">
                <Image src={m.photoUrl || '/favicon.ico'} alt={m.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{m.name}</h3>
                    <span className="text-sm text-gray-500">{m.rollNumber}</span>
                    <span className="text-sm text-gray-600">• {m.department} • {m.year}</span>
                  </div>
                  <p className="text-sm text-gray-600">{m.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleExpand(m.id)} aria-expanded={!!expanded[m.id]} className="p-2 rounded hover:bg-gray-100 text-nss-primary">
                    {expanded[m.id] ? '▾' : '▸'}
                  </button>
                  <button onClick={() => openEditor(m)} className="btn-base btn-primary">Edit</button>
                </div>
              </div>

              {expanded[m.id] && (
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
                        {(m.workHistory || []).map((row: WorkHistory, rIdx: number) => (
                          <tr key={rIdx} className="border-t">
                            <td className="px-2 py-2">{row.role}</td>
                            <td className="px-2 py-2">{row.team}</td>
                            <td className="px-2 py-2">{row.start}</td>
                            <td className="px-2 py-2">{row.end || '-'}</td>
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
          <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Edit Member - {editing.name}</h2>
                <button onClick={closeEditor} className="text-gray-600">Close</button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600">ID</label>
                    <div className="mt-1 text-sm text-gray-800">{editing.id}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Email</label>
                    <div className="mt-1 text-sm text-gray-800">{editing.email}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Roll</label>
                    <div className="mt-1 text-sm text-gray-800">{editing.rollNumber}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Department</label>
                    <div className="mt-1 text-sm text-gray-800">{editing.department}</div>
                  </div>
                </div>

                {/* isAdmin field removed from admin UI */}

                <div>
                  <h4 className="font-semibold mb-2">Work History</h4>
                  <div className="space-y-2">
                    {(editing.workHistory || []).map((row: WorkHistory, rIdx: number) => (
                      <div key={rIdx} className="flex gap-2 items-center">
                        <input value={row.role} onChange={e => updateWorkHistory(members.findIndex(x => x.id === editing.id), rIdx, 'role', e.target.value)} className="border p-2 rounded w-1/4" />
                        <input value={row.team} onChange={e => updateWorkHistory(members.findIndex(x => x.id === editing.id), rIdx, 'team', e.target.value)} className="border p-2 rounded w-1/4" />
                        <input value={row.start} onChange={e => updateWorkHistory(members.findIndex(x => x.id === editing.id), rIdx, 'start', e.target.value)} className="border p-2 rounded w-1/4" />
                        <input value={row.end || ''} onChange={e => updateWorkHistory(members.findIndex(x => x.id === editing.id), rIdx, 'end', e.target.value)} className="border p-2 rounded w-1/4" />
                        <button onClick={() => removeWorkRow(members.findIndex(x => x.id === editing.id), rIdx)} className="text-sm text-red-600">Remove</button>
                      </div>
                    ))}
                        <div>
                          <button onClick={() => addWorkRow(members.findIndex(x => x.id === editing.id))} className="btn-base btn-primary">Add Row</button>
                        </div>
                  </div>
                </div>
              </div>
            </div>
              </div>
        )}
      </div>
    </div>
  );
}
