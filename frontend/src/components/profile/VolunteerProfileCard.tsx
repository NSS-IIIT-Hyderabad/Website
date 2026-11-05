"use client";

import Image from "next/image";

interface VolunteerProfileCardProps {
  user: {
    uid: string;
    email: string;
    role: string;
  };
  onLogout?: () => void;
}

export default function VolunteerProfileCard({
  user,
  onLogout,
}: VolunteerProfileCardProps) {
  return (
    <article className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
      <header className="mb-8 flex flex-col items-center text-center">
        <Image
          src="/favicon.ico"
          alt="National Service Scheme emblem"
          width={88}
          height={88}
        />

        <h1 className="mt-4 text-2xl font-bold text-[#332a67]">
          Volunteer Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          National Service Scheme · IIIT Hyderabad
        </p>
      </header>

      <section className="border-t border-gray-200 pt-6">
        <h2 className="mb-4 text-lg font-semibold text-[#332a67]">
          Account Information
        </h2>

        <dl className="space-y-4">
          <div>
            <dt className="text-sm text-gray-500">Volunteer UID</dt>
            <dd className="break-all font-medium text-gray-800">
              {user.uid}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Email Address</dt>
            <dd className="break-all font-medium text-gray-800">
              {user.email}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Account Role</dt>
            <dd className="font-medium text-gray-800">
              {user.role}
            </dd>
          </div>
        </dl>
      </section>

      {onLogout && (
        <footer className="mt-8 flex justify-center border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg bg-[#332a67] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#453985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#332a67]"
          >
            Log out
          </button>
        </footer>
      )}
    </article>
  );
}
