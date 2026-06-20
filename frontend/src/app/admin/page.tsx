"use client";
import React from "react";
import Link from "next/link";
import { CalendarDays, KeyRound, Shield, Users } from "lucide-react";
import AdminProtect from "@/components/admin/AdminProtect";
import { AdminCard, AdminShell } from "@/components/admin/AdminUi";

export default function AdminIndex() {
  return (
    <AdminProtect>
      <AdminShell>
        <AdminCard>
          <div className="flex items-start gap-3">
            <Shield className="mt-1 h-6 w-6 text-slate-700" />
            <div>
              <h1 className="text-3xl font-playfair font-bold text-slate-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage NSS website records from one place. Use the modules below to update members and events.
              </p>
            </div>
          </div>
        </AdminCard>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/members"
            className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3 text-purple-700">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-semibold text-purple-900">Members</h2>
            <p className="mt-2 text-sm text-slate-600">
              View member profiles and update work history details.
            </p>
          </Link>

          <Link
            href="/admin/events"
            className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3 text-purple-700">
              <CalendarDays className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-semibold text-purple-900">Events</h2>
            <p className="mt-2 text-sm text-slate-600">
              Create, edit, and remove event entries used by the website.
            </p>
          </Link>

          <Link
            href="/admin/access"
            className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3 text-purple-700">
              <KeyRound className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-semibold text-purple-900">Admin Access</h2>
            <p className="mt-2 text-sm text-slate-600">
              View admins list and grant or revoke admin permissions.
            </p>
          </Link>
        </div>
      </AdminShell>
    </AdminProtect>
  );
}
