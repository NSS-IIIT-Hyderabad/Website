"use client";

import AdminProtect from "@/components/admin/AdminProtect";
import AdminAccessManager from "@/components/admin/AdminAccessManager";

export default function AdminAccessPage() {
  return (
    <AdminProtect>
      <AdminAccessManager />
    </AdminProtect>
  );
}
