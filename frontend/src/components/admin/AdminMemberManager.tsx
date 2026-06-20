"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteAdminMember,
  getAdminMembers,
  isCurrentUserAdmin,
  type AdminMember,
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

export default function AdminMemberManager() {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMembers() {
    try {
      setLoading(true);
      setError(null);

      const allowed = await isCurrentUserAdmin();
      setAuthorized(allowed);
      if (!allowed) {
        return;
      }

      const data = await getAdminMembers();
      setMembers(data);
    } catch (err) {
      console.error("Failed to load admin members", err);
      setError("Failed to load members from backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  const removeMember = async (memberEmail: string) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      const ok = await deleteAdminMember(memberEmail);
      if (!ok) {
        throw new Error("delete mutation returned false");
      }
      setMembers((prev) =>
        prev.filter(
          (m) => (m.email || "").toLowerCase() !== memberEmail.toLowerCase(),
        ),
      );
    } catch (err) {
      console.error("Failed to delete member", err);
      setError("Failed to delete member.");
    }
  };

  const filteredMembers = members.filter((m) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (m.name || "").toLowerCase().includes(q) ||
      (m.email || "").toLowerCase().includes(q) ||
      (m.rollNumber || "").toLowerCase().includes(q) ||
      (m.department || "").toLowerCase().includes(q)
    );
  });

  return (
    <AdminShell>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <AdminHeader
              backHref="/admin"
              backLabel="Back to admin"
              title="Member Management"
              description="Review member details and update work history in MongoDB."
            />
          </div>
          <div>
            <AdminInput
              className="w-72"
              value={search}
              onChange={(value) => setSearch(value)}
              placeholder="Search by name, email, roll, or department"
            />
          </div>
          <AdminPrimaryLink href="/admin/members/new">Add Member</AdminPrimaryLink>
      </div>

      {error && <AdminBanner message={error} />}

      {loading ? (
        <AdminBanner message="Loading members..." tone="neutral" />
      ) : !authorized ? (
        <AdminBanner message="You do not have admin permission to manage members." tone="neutral" />
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-600">
            Showing {filteredMembers.length} of {members.length} members
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((m, idx) => (
              <div key={`${m.rollNumber}-${m.email}-${idx}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={buildUploadUrl(m.photoUrl, "members") || buildLegacyUploadUrl(m.photoUrl) || "/favicon.ico"}
                      alt={m.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-lg font-semibold text-slate-900">{m.name}</div>
                      <div className="text-sm text-gray-500">{m.email}</div>
                      <div className="text-sm text-gray-500">
                        {m.rollNumber} • {m.batch || m.year || "-"} • {m.department || "-"}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm text-gray-600">{m.bio || "No bio"}</p>

                  <div className="mt-4 flex gap-3">
                    <Link
                      href={`/admin/members/${encodeURIComponent(m.email)}/edit`}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
                    >
                      Edit
                    </Link>
                    <AdminDangerButton
                      className="rounded-lg px-4 py-2"
                      onClick={() => removeMember(m.email)}
                    >
                      Delete
                    </AdminDangerButton>
                  </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              No members match your search.
            </div>
          )}
        </>
      )}
    </AdminShell>
  );
}
