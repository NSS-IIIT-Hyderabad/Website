"use client";
import { hasCookie } from "cookies-next";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

type AuthContextValue = {
  user: Record<string, unknown> | null;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  user: Record<string, unknown>;
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  const value = {
    user: hasCookie("logout") ? null : user,
    isAuthenticated: hasCookie("logout") ? false : !!Object.keys(user).length,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}