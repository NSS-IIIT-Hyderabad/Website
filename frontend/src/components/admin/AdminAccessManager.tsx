"use client";

import React, { useEffect, useState } from "react";
import {
  getAdmins,
  grantAdminAccess,
  isCurrentUserAdmin,
  revokeAdminAccess,
  type AdminAccount,
} from "@/services/graphql/admin";
import {
  AdminBanner,
  AdminCard,
  AdminDangerButton,
  AdminHeader,
  AdminInput,
  AdminPrimaryButton,
  AdminShell,
} from "@/components/admin/AdminUi";

export default function AdminAccessManager() {
  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const allowed = await isCurrentUserAdmin();
      setAuthorized(allowed);
      if (!allowed) {
        return;
      }

      const adminRows = await getAdmins();
      setAdmins(adminRows);
    } catch (err) {
      console.error("Failed to load admin access data", err);
      setError("Failed to load admins list.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const activeAdmins = admins.filter((admin) => admin.active);

  const onGrant = async () => {
    const target = identifier.trim();
    if (!target) return;

    try {
      setSaving(true);
      setError(null);
      const ok = await grantAdminAccess(target);
      if (!ok) {
        setError("Unable to grant admin access. Member not found for the provided roll number or email.");
        return;
      }
      setIdentifier("");
      await loadData();
    } catch (err) {
      console.error("Failed to grant admin", err);
      setError("Failed to grant admin access. Use a valid roll number or email.");
    } finally {
      setSaving(false);
    }
  };

  const onRevoke = async (targetIdentifier: string) => {
    if (!window.confirm("Revoke admin access for this member?")) return;

    try {
      setSaving(true);
      setError(null);
      const ok = await revokeAdminAccess(targetIdentifier);
      if (!ok) {
        setError("Unable to revoke admin access. This may be the last active admin, which is protected.");
        return;
      }
      setAdmins((prev) =>
        prev.filter(
          (admin) =>
            (admin.memberId || admin.email || admin.rollNumber) !== targetIdentifier,
        ),
      );
    } catch (err) {
      console.error("Failed to revoke admin", err);
      setError("Failed to revoke admin access.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell>
      <AdminHeader
        backHref="/admin"
        backLabel="Back to admin"
        title="Admin Access Control"
        description="NSS Core members are auto-seeded as admins. Existing admins can grant or revoke access."
      />

      {error && <AdminBanner message={error} />}

      {loading ? (
        <AdminBanner message="Loading admin access..." tone="neutral" />
      ) : !authorized ? (
        <AdminBanner message="You do not have admin permission to manage access." tone="neutral" />
      ) : (
        <>
          <AdminCard>
              <h2 className="text-lg font-semibold text-slate-900">Grant Admin Access</h2>
              <p className="mt-1 text-sm text-slate-600">Enter member roll number or email.</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <AdminInput
                  value={identifier}
                  onChange={(value) => setIdentifier(value)}
                  placeholder="e.g. 2023001001 or member@iiit.ac.in"
                  className="w-full"
                />
                <AdminPrimaryButton
                  onClick={onGrant}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Grant"}
                </AdminPrimaryButton>
              </div>
            </AdminCard>

            <div className="mt-6">
            <AdminCard>
              <h2 className="text-lg font-semibold text-slate-900">Admins List</h2>
              <p className="mt-1 text-sm text-slate-600">Total admins: {activeAdmins.length}</p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-600">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Member</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Source</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeAdmins.map((admin) => (
                      <tr key={`${admin.memberId}-${admin.email}`} className="border-b border-slate-100">
                        <td className="px-3 py-2 text-slate-900">{admin.name || "-"}</td>
                        <td className="px-3 py-2">{admin.memberId || admin.rollNumber || "-"}</td>
                        <td className="px-3 py-2">{admin.email || "-"}</td>
                        <td className="px-3 py-2">{admin.source || "manual"}</td>
                        <td className="px-3 py-2">
                          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-white">
                            Active
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <AdminDangerButton
                            onClick={() => onRevoke(admin.memberId || admin.email || admin.rollNumber)}
                            disabled={saving}
                            className="px-3 py-1.5 text-xs"
                          >
                            Revoke
                          </AdminDangerButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AdminCard>
            </div>
        </>
      )}
    </AdminShell>
  );
}
