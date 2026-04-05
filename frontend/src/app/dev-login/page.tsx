"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import membersData from "@/data/Data";

type MemberSuggestion = {
  id: string;
  email: string;
  name: string;
  normalizedId: string;
};

export default function DevLoginPage() {
  const router = useRouter();
  const [loginValue, setLoginValue] = useState("");
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const memberSuggestions = useMemo<MemberSuggestion[]>(() => {
    const unique = new Map<string, MemberSuggestion>();

    for (const member of membersData) {
      const originalEmail = (member.email || "").trim();
      const normalizedEmail = originalEmail.toLowerCase();

      const originalId = (member.id || member.rollNumber || "").trim();
      const normalizedId = originalId.toLowerCase();

      if (!normalizedEmail) continue;

      const key = normalizedId || normalizedEmail;

      if (!unique.has(key)) {
        unique.set(key, {
          id: originalId || originalEmail.split("@")[0],
          normalizedId,
          email: normalizedEmail,
          name: member.name || normalizedEmail,
        });
      }
    }

    return Array.from(unique.values());
  }, []);

  const filteredSuggestions = useMemo(() => {
    const query = loginValue.trim().toLowerCase();
    if (!query) return memberSuggestions.slice(0, 8);

    return memberSuggestions
      .filter(
        (member) =>
          member.email.includes(query) ||
          member.name.toLowerCase().includes(query) ||
          member.normalizedId.includes(query)
      )
      .slice(0, 8);
  }, [loginValue, memberSuggestions]);

  useEffect(() => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const isDevelopment = process.env.NODE_ENV === "development";

    if (!isLocalhost || !isDevelopment) {
      router.replace("/");
    }
  }, [router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedValue = loginValue.trim().toLowerCase();
    if (!normalizedValue) {
      setError("Please enter a member email or ID.");
      return;
    }

    const selectedMember = memberSuggestions.find(
      (member) =>
        member.email === normalizedValue ||
        member.normalizedId === normalizedValue ||
        member.name.toLowerCase() === normalizedValue
    );

    const email = selectedMember?.email || (normalizedValue.includes("@") ? normalizedValue : "");
    const uid =
      selectedMember?.id ||
      selectedMember?.email.split("@")[0] ||
      (normalizedValue.includes("@") ? normalizedValue.split("@")[0] : loginValue.trim());
    const name = selectedMember?.name || uid;

    if (!email) {
      setError("Please pick a valid member from the suggestions or enter a valid email.");
      return;
    }

    const query = new URLSearchParams({
      email,
      uid,
      name,
    });

    window.location.replace(`/api/auth/dev-login?${query.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Developer Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your email to create a local development session.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" autoComplete="off">
          <div>
            <label htmlFor="dev-email" className="block text-sm font-medium text-slate-700 mb-1">
              Email or ID
            </label>

            <input
              id="dev-email"
              name="dev-login-id"
              type="text"
              value={loginValue}
              autoComplete="off"
              spellCheck={false}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 120);
              }}
              onChange={(e) => {
                setLoginValue(e.target.value);
                setShowSuggestions(true);
                if (error) setError("");
              }}
              placeholder="you@example.com or member ID"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />

            {showSuggestions && filteredSuggestions.length > 0 ? (
              <div className="mt-2 border border-slate-200 rounded-lg bg-white shadow-sm max-h-56 overflow-y-auto">
                {filteredSuggestions.map((member) => (
                  <button
                    key={member.id || member.email}
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 border-b last:border-b-0 border-slate-100"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setLoginValue(member.id);
                      setShowSuggestions(false);
                      if (error) setError("");
                    }}
                  >
                    <p className="text-sm font-medium text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-600">ID: {member.id}</p>
                    <p className="text-xs text-slate-600">{member.email}</p>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}