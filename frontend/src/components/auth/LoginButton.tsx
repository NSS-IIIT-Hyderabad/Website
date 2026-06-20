"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { login, logout } from "../../utils/auth";

export default function LoginButton() {
    const [uid, setUid] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const refreshAuthState = () => {
        const match = document.cookie.match(/(?:^|; )uid=([^;]*)/);
        const emailMatch = document.cookie.match(/(?:^|; )email=([^;]*)/);
        setUid(match ? decodeURIComponent(match[1]) : null);
        setEmail(emailMatch ? decodeURIComponent(emailMatch[1]) : null);
    };

    // Check for uid cookie on mount
    useEffect(() => {
        // Only show login in development mode
        const isDev = process.env.NODE_ENV === "development";
        const hostname = window.location.hostname;
        const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
        
        const shouldBeVisible = isDev && isLocalhost;
        setIsVisible(shouldBeVisible);
        
        refreshAuthState();

        window.addEventListener("focus", refreshAuthState);
        document.addEventListener("visibilitychange", refreshAuthState);

        return () => {
            window.removeEventListener("focus", refreshAuthState);
            document.removeEventListener("visibilitychange", refreshAuthState);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    if (!uid) {
        return (
            <button
                onClick={() => login()}
                style={{
                    padding: "0.5rem 1.2rem",
                    borderRadius: "12px",
                    background: "#1e3a8a",
                    color: "#fff",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Login
            </button>
        );
    } else {
        const profileId = email || uid;
        const profileHref = `/member/profile/${encodeURIComponent(profileId)}`;

        return (
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <button
                    onClick={() => window.location.replace(profileHref)}
                    style={{
                        padding: "0.3rem",
                        borderRadius: "50%",
                        background: "#fff",
                        border: "2px solid #1e3a8a",
                        cursor: "pointer",
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    title="Go to profile"
                >
                    <Image
                        src="/favicon.ico"
                        alt="Profile"
                        width={28}
                        height={28}
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />
                </button>
                <button
                    onClick={() => logout()}
                    style={{
                        padding: "0.45rem 0.8rem",
                        borderRadius: "10px",
                        background: "#f3f4f6",
                        color: "#111827",
                        fontWeight: 600,
                        border: "1px solid #d1d5db",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>
        );
    }
}