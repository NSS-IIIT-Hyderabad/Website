"use client";

import AdminProtect from "@/components/admin/AdminProtect";
import AdminMemberManager from "@/components/admin/AdminMemberManager";

export default function AdminMembersPage() {
  return (
    <AdminProtect>
      <AdminMemberManager />
    </AdminProtect>
  );
}
