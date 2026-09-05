"use client";

import { useAuth } from "@/components/loginNlognout/first";
import { login } from "@/utils/loginNlogout";

export default function MeProfile() {
  const { user, loading } = useAuth();

  if (loading) return <main className="p-12 text-center">Loading profile...</main>;
  if (!user) {
    return <main className="p-12 text-center"><button onClick={login}>Login</button></main>;
  }

  return (
    <main className="min-h-screen p-12">
      <h1 className="text-3xl font-bold">Your account</h1>
      <p className="mt-4">UID: {user.uid}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </main>
  );
}
