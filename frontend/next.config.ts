import type { NextConfig } from "next";

function resolveBackendBase(): string {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  const raw = (env?.INTERNAL_GRAPHQL_URL || env?.BACKEND_URL || env?.NEXT_PUBLIC_API_URL || "").trim();
  const fallback = "http://localhost:8000";
  if (!raw) {
    return fallback;
  }

  try {
    const parsed = new URL(raw);
    const cleanPath = parsed.pathname.replace(/\/(api\/graphql|graphql|api)$/i, "").replace(/\/+$/, "");
    return `${parsed.origin}${cleanPath}`;
  } catch {
    return fallback;
  }
}

const nextConfig: NextConfig = {
  compress: true,
  generateEtags: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const backendBase = resolveBackendBase();
    return [
      {
        source: "/uploads/:path*",
        destination: `${backendBase}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
