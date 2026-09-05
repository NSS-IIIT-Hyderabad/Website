"use client";
import Avatar from "boring-avatars";
import { login, logout } from "../../utils/loginNlogout";
import { useAuth } from "./first";

export default function LoginButton() {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) {
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
        return (
            <>
                <button
                    onClick={() => window.location.replace("/me")}
                    style={{
                        padding: "0.3rem",
                        borderRadius: "50%",
                        background: "#fff",
                        border: "2px solid #332a67",
                        cursor: "pointer",
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    title="Go to profile"
                >
                    <Avatar
                        size={28}
                        name={user.uid}
                        variant="beam"
                        colors={["#332a67", "#6b7280", "#d1d5db", "#9ca3af", "#4b5563"]}
                    />
                </button>
                <button onClick={() => logout()} className="ml-2 text-sm text-gray-600">Logout</button>
            </>
        );
    }
}