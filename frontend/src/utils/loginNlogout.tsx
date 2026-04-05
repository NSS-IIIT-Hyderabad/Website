"use client";
export function login() {
    const isDev = process.env.NODE_ENV === "development";
    const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    if (isDev && isLocalhost) {
        window.location.replace("/dev-login");
        return;
    }

    if (!isDev) {
        // Production mode: redirect to home instead of opening login
        window.location.replace("/");
        return;
    }

    const backendUrl = "http://localhost:8000";
    window.location.replace(`${backendUrl}/login`);
}
export function logout() {
    const isDev = process.env.NODE_ENV === "development";
    const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    if (isDev && isLocalhost) {
        window.location.replace("/api/auth/dev-logout?next=/");
        return;
    }

    window.location.replace("/");
}