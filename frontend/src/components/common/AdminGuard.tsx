"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/loginNlognout/first";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  useEffect(() => {
    if (!loading && isAdminRoute && user?.role !== "admin") router.replace("/");
  }, [isAdminRoute, loading, router, user]);

  if (isAdminRoute && (loading || user?.role !== "admin")) return null;
  return children;
}