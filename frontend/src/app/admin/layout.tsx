import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const IS_CURRENT_USER_ADMIN_QUERY = `
  query IsCurrentUserAdmin {
    isCurrentUserAdmin
  }
`;

type IsCurrentUserAdminPayload = {
  data?: {
    isCurrentUserAdmin?: boolean;
  };
};

async function isCurrentUserAdminServer(): Promise<boolean> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const rawCookie = requestHeaders.get("cookie") || "";

  if (!host || !rawCookie) {
    return false;
  }

  const forwardedProto = (requestHeaders.get("x-forwarded-proto") || "").split(",")[0].trim();
  const protocol = forwardedProto || (host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");

  try {
    const response = await fetch(`${protocol}://${host}/api/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: rawCookie,
      },
      body: JSON.stringify({ query: IS_CURRENT_USER_ADMIN_QUERY }),
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json()) as IsCurrentUserAdminPayload;
    return payload?.data?.isCurrentUserAdmin === true;
  } catch {
    return false;
  }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAdmin = await isCurrentUserAdminServer();

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
