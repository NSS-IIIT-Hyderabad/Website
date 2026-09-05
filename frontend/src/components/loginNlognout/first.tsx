"use client";
import { createContext, useContext, useEffect, useState } from "react";

type AuthUser = {
  uid: string;
  email: string;
  role: string;
  member_id?: string | null;
};

const AuthContext = createContext({
  user: null as AuthUser | null,
  isAuthenticated: false,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/me`, {
      credentials: "include",
    })
      .then((response) => response.ok ? response.json() : null)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const value = { user, isAuthenticated: !!user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}