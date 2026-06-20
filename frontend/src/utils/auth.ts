"use client";

function isDevelopmentEnv(): boolean {
    const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
    const nodeEnv = (env?.NODE_ENV || "").trim().toLowerCase();
    if (nodeEnv === "development") {
        return true;
    }

    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0";
}

function getConfiguredApiBase(): string {
    const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
    const configured = (env?.NEXT_PUBLIC_API_URL || "").trim();
    if (!configured) {
        return "/api";
    }
    return configured.replace(/\/$/, "");
}

export function login() {
    const isDev = isDevelopmentEnv();
    const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "0.0.0.0";

    if (isDev && isLocalhost) {
        window.location.replace("/dev-login");
        return;
    }

    const next = `${window.location.pathname}${window.location.search}`;
    const query = new URLSearchParams({ next });
    window.location.replace(`/api/auth/login?${query.toString()}`);
}
export function logout() {
    window.location.replace("/api/auth/dev-logout?next=/");
}