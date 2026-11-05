"use client";

import { useAuth } from "@/components/loginNlognout/first";
import { login, logout } from "@/utils/loginNlogout";
import VolunteerProfileCard from "@/components/profile/VolunteerProfileCard";

export default function MeProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <section className="p-12 text-center">
        Loading profile...
      </section>
    );
  }

  if (!user) {
    return (
      <section className="p-12 text-center">
        <button type="button" onClick={login}>
          Login
        </button>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <VolunteerProfileCard
        user={user}
        onLogout={logout}
      />
    </section>
  );
}
