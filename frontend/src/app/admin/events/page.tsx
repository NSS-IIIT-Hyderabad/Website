"use client";

import AdminProtect from "@/components/admin/AdminProtect";
import AdminEventManager from "@/components/admin/AdminEventManager";

export default function AdminEventsPage() {
  return (
    <AdminProtect>
      <AdminEventManager />
    </AdminProtect>
  );
}
