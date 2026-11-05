"use client";
import { login, logout } from "../../utils/loginNlogout";
import { useAuth } from "./first";
import { LogOut, UserRound } from "lucide-react";

export default function LoginButton() {
    const { user, loading } = useAuth();
    const buttonStyling = "w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-gray-700 transition-colors hover:text-green-600 focus-visible:ring-2 focus-visible:ring-[#332a67]";

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
    }

    return (
        <div className="flex items-center gap-2">
            {/* Profile Button */}
            <button
                onClick={() => window.location.replace("/me")}
                className={buttonStyling}
                title="Go to profile"
                aria-label="Go to profile"
                type="button"
            >
                <UserRound size={20}/>
            </button>

            {/* Logout Button */}
            <button
                onClick={logout}
                className={buttonStyling}
                aria-label="Log out"
                title="Log out"
                type="button"
                >
                    <LogOut size={20} />
            </button>
        </div>
    );
}
