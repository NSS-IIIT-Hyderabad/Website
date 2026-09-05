"use client";

function apiBaseUrl() {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
}

export function login() {
    const returnPath = `${window.location.pathname}${window.location.search}`;
    window.location.replace(`${apiBaseUrl()}/login?path=${encodeURIComponent(returnPath)}`);
}

export function logout() {
    window.location.replace(`${apiBaseUrl()}/auth/logout`);
}