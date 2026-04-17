"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isCurrentUserAdmin } from "@/services/graphql/admin";
import { AdminShell } from "@/components/admin/AdminUi";

type AdminProtectProps = {
  children?: React.ReactNode;
};

export default function AdminProtect({ children }: AdminProtectProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const checkAdminWithRetry = async (attempts = 3): Promise<boolean> => {
      let lastError: unknown = null;
      for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
          const status = await isCurrentUserAdmin();
          return status;
        } catch (err) {
          lastError = err;
          if (attempt < attempts) {
            await delay(200 * attempt);
          }
        }
      }
      throw lastError;
    };

    const checkAuth = async () => {
      try {
        const isAdmin = await checkAdminWithRetry();
        if (!active) return;
        setAuthorized(isAdmin);
        if (!isAdmin) {
          router.replace("/");
        }
      } catch (err) {
        console.error("Failed to check admin status:", err);
        if (!active) return;
        setAuthorized(false);
        router.replace("/");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    checkAuth();
    return () => {
      active = false;
    };
  }, [router]);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="inline-flex animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Verifying access...</p>
        </div>
        </div>
      </AdminShell>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
