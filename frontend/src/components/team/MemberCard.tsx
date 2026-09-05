"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Member = {
  id?: string;
  email: string;
  name: string;
  photoUrl: string;
  team: string;
  rollNumber: string;
  from: string;
  to: string;
  workHistory?: Array<{ start?: string; end?: string | null }>;
};

export default function MemberCard({ member }: { member: Member }) {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  /* ---------- helpers ---------- */

  const formatYear = (val?: string) => {
    if (!val) return "";
    if (val.toLowerCase() === "present") return "Present";
    return val.includes("-") ? val.split("-")[0] : val;
  };

  const getImageSrc = () =>
    imageError || !member.photoUrl || ["", "-", "hi"].includes(member.photoUrl)
      ? "/favicon.ico"
      : member.photoUrl;

  const isActive = !member.to || member.to.toLowerCase() === "present";

  const getDurationText = () => {
    const wh = member.workHistory || [];
    if (!wh.length) {
      return isActive
        ? `${formatYear(member.from)} – Present`
        : `${formatYear(member.from)} – ${formatYear(member.to)}`;
    }

    const starts = wh.map(w => w.start).filter(Boolean) as string[];
    const ends = wh.map(w => w.end).filter(Boolean) as string[];

    const earliest = starts.sort()[0] ?? member.from;
    if (wh.some(w => !w.end)) return `${formatYear(earliest)} – Present`;

    const latest = ends.sort().at(-1) ?? member.to;
    return `${formatYear(earliest)} – ${formatYear(latest)}`;
  };

  const handleClick = () => {
    router.push(`/member/profile/${member.rollNumber}`);
  };

  /* ---------- JSX ---------- */

  return (
    <div
      className="w-full max-w-[280px] aspect-[280/360] mx-auto my-5"
      onClick={handleClick}
    >
      <div className="w-full h-full bg-white rounded-3xl border border-gray-200 flex flex-col items-center px-7 pt-9">
          {/* Profile Image */}
          <div className="relative mb-5">
            <div className="w-[116px] h-[116px] rounded-full p-[3px] bg-gradient-to-br from-orange-400 to-green-600">
              <Image
                src={getImageSrc()}
                onError={() => setImageError(true)}
                alt={member.name}
                width={116}
                height={116}
                className="w-full h-full rounded-full object-cover bg-gray-100"
              />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-800 text-center leading-snug">
            {member.name}
          </h3>

          {/* Roll */}
          <p className="mt-1.5 text-sm text-gray-500">
            {member.rollNumber}
          </p>

          {/* Duration (no overflow) */}
          <div
            className={`mt-2 mb-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {getDurationText()}
          </div>
      </div>
    </div>
  );
}