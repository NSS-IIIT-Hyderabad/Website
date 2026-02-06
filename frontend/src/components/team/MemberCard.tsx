"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Mail } from "lucide-react";

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
  const [hover, setHover] = useState(false);
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

  const getTeamGradient = () => {
    switch (member.team.toLowerCase()) {
      case "tech":
        return "from-emerald-500/90 to-sky-500/90";
      case "design":
        return "from-amber-500/90 to-rose-500/90";
      default:
        return "from-violet-500/90 to-fuchsia-500/90";
    }
  };

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
      style={{ perspective: 1200 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full rounded-3xl transition-all duration-700 ${
          hover ? "shadow-2xl shadow-blue-200/40" : "shadow-lg shadow-gray-200/60"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: hover ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ================= FRONT ================= */}
        <div
          className="absolute inset-0 bg-white rounded-3xl border border-gray-200 flex flex-col items-center px-7 pt-9 h-fit"
          style={{ backfaceVisibility: "hidden" }}
        >
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
            {isActive ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {getDurationText()}
          </div>
        </div>

        {/* ================= BACK ================= */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-800 via-blue-700 to-slate-800 flex flex-col items-center justify-center gap-6 text-white px-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="text-xl font-semibold">{member.name}</h3>

          {/* Team badge moved here */}
          <div
            className={`px-4 py-1.5 text-center rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r ${getTeamGradient()} shadow-md`}
          >
            {member.team}
          </div>

          <div className="flex gap-7 mt-2">
            {/* <a
              href={`https://www.linkedin.com/in/${member.rollNumber}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="w-13 h-13 rounded-full bg-white flex items-center justify-center shadow-md"
            >
              <Linkedin className="text-blue-700 w-6 h-6" />
            </a> */}

            <a
              href={`mailto:${member.email}`}
              onClick={(e) => e.stopPropagation()}
              className="w-13 h-13 rounded-full bg-white flex items-center justify-center shadow-md"
            >
              <Mail className="text-blue-700 w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
