"use client"; // 1. Must be the absolute first line of the file

import React, { use } from 'react'; // 2. Import 'use' from react
import Image from 'next/image';
import Link from 'next/link';
import { GET_MEMBERS } from '@/graphql_Q&M/getMembers';
import { useQuery } from "@apollo/client";
import { Mail, Calendar, ArrowLeft, Users } from 'lucide-react';

type Props = {
  params: Promise<{ id: string }>;
};

type WorkHistory = {
  role: string;
  team: string;
  start: string;
  end: string | null;
};

type Member = {
  id?: string;
  name: string;
  email: string;
  rollNumber: string;
  emailUsername?: string;
  photoUrl?: string;
  batch?: string;
  year?: string;
  team?: string;
  status?: string;
  workHistory: WorkHistory[];
  phone?: string;
  department?: string;
};

export default function MemberProfile({ params }: Props) {
  const { id } = use(params);
  let lookupId = String(id || '');
  try { lookupId = decodeURIComponent(lookupId); } catch { /* fall back to raw id */ }
  const normalizedLookup = lookupId.toLowerCase();
  const { data, loading, error } = useQuery(GET_MEMBERS);
  if (loading) return <div className="p-8 text-center">Loading member profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading data.</div>;

  const members = data?.viewMembers || [];

  // Try to find member by rollNumber, id, email, or email username (case-insensitive)
    const member = members.find((m: Member) => {
    const roll = m.rollNumber ? String(m.rollNumber).toLowerCase() : '';
    const mid = m.id ? String(m.id).toLowerCase() : '';
    const email = m.email ? String(m.email).toLowerCase() : '';
    const emailUser = email.includes('@') ? email.split('@')[0] : (m.emailUsername ? String(m.emailUsername).toLowerCase() : '');

    return (
      roll === normalizedLookup ||
      mid === normalizedLookup ||
      email === normalizedLookup ||
      emailUser === normalizedLookup
    );
  }) || null;

  if (!member) {
    return <div className="p-8 text-center text-gray-600">Member not found.</div>;
  }

  // Compute active status and pick current/most-recent work entry
  const workHistory = Array.isArray(member.workHistory) ? member.workHistory : [];
  const currentWork = workHistory.find((w: WorkHistory) => !w.end) || workHistory[workHistory.length - 1] || null;
  const isActive = workHistory.some((w: WorkHistory) => !w.end);

  // Friendly vars used by the UI (preserve UI without changing markup)
  const team = currentWork?.team || member.team || '';
  const start = currentWork?.start || '';
  const end = currentWork?.end || '';
  const batchOrYear = member.batch || member.year || null;

  const formatYear = (val?: string) => {
    if (!val) return '';
    const s = String(val).trim();
    if (!s) return '';
    if (s.toLowerCase() === 'present') return 'Present';
    if (s.includes('-')) return s.split('-')[0];
    return s;
  };

  const getPhoto = (val?: string) => {
    if (!val) return '/favicon.ico';
    const s = String(val).trim();
    if (!s) return '/favicon.ico';
    if (s === '-') return '/favicon.ico';
    return s;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-green-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/members" 
          className="mb-6 inline-flex items-center gap-2 text-[#332a67] transition-colors duration-200 hover:text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to all members</span>
        </Link>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="relative h-32 bg-[#332a67]">
            <div className="absolute -bottom-16 left-8">
              {/* India Flag Border */}
              <div className="w-32 h-32 rounded-full p-1 shadow-xl" style={{
                background: 'linear-gradient(to bottom, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)'
              }}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white">
                  <Image 
                    src={getPhoto(member.photoUrl)} 
                    alt={member.name || ''}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Status Badge */}
              <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg ${
                isActive 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-500 text-white'
              }`}>
                {isActive ? (
                  <>
                    Active
                  </>
                ) : (
                  <>
                    Past Member
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{member.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="inline-flex items-center rounded-full bg-gray-700 px-4 py-2 font-medium text-white shadow-lg">
                  <Users className="w-4 h-4 mr-2" />
                  {team} Team
                </div>
                {member.department && (
                  <div className="inline-flex items-center rounded-full bg-gray-700 px-4 py-2 font-medium text-white shadow-lg">
                    {member.department}
                  </div>
                )}
                {batchOrYear && (
                  <div className="inline-flex items-center rounded-full bg-gray-700 px-4 py-2 font-medium text-white shadow-lg">
                    {batchOrYear}
                  </div>
                )}
              </div>
              {member.phone && (
                <p className="text-gray-600 flex items-center gap-2">
                  📞 {member.phone}
                </p>
              )}
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Roll Number */}
              <div className="rounded-2xl border-2 border-gray-200 bg-gray-100 p-6">
                <h3 className="mb-2 text-sm font-semibold uppercase text-gray-600">Roll Number</h3>
                <p className="text-2xl font-bold text-gray-800">{member.rollNumber}</p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border-2 border-gray-200 bg-gray-100 p-6">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-[#332a67]">
                  <Mail className="w-4 h-4" />
                  Email
                </h3>
                <a 
                  href={`mailto:${member.email}`}
                  className="break-all text-lg font-semibold text-[#332a67] transition-colors hover:text-gray-700"
                >
                  {member.email}
                </a>
              </div>

              {/* Duration */}
                <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase text-green-800">
                    <Calendar className="w-4 h-4" />
                    Working Duration
                  </h3>
                  <p className="text-lg font-semibold text-green-900">
                    {(() => {
                      // compute overall duration from member.workHistory if present
                      const wh = Array.isArray(member.workHistory) ? member.workHistory : [];
                      if (!wh || wh.length === 0) {
                        return `${formatYear(start)} - ${end ? formatYear(end) : 'Present'}`;
                      }

                      // collect valid starts and ends
                      const starts = wh.map((w: WorkHistory) => w.start).filter(Boolean) as string[];
                      const ends = wh.map((w: WorkHistory) => w.end).filter(Boolean) as string[]; // end may be null for present

                      // earliest start
                      let earliestStart = starts.length ? starts[0] : start;
                      for (const s of starts) {
                        try { if (new Date(s) < new Date(earliestStart)) earliestStart = s; } catch { /* ignore */ }
                      }

                      // if any current role (no end) -> Present
                      const hasPresent = wh.some((w: WorkHistory) => !w.end);
                      if (hasPresent) return `${formatYear(earliestStart)} - Present`;

                      // latest end
                      let latestEnd = ends.length ? ends[0] : end;
                      for (const e of ends) {
                        try { if (new Date(e) > new Date(latestEnd)) latestEnd = e; } catch { /* ignore */ }
                      }

                      return `${formatYear(earliestStart)} - ${formatYear(latestEnd)}`;
                    })()}
                  </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {member.bio && (
          <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-gray-100 p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Work History Table */}
        {member.workHistory && member.workHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-[#332a67] px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Work History</h2>
            </div>
            
            {/* Current Position */}
            {member.workHistory.some((work: WorkHistory) => !work.end) && (
              <div className="p-6 border-b-2 border-gray-100">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-700">
                  Current Position
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-green-200 bg-green-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">Team</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">Started</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-green-800">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {member.workHistory
                        .filter((work: WorkHistory) => !work.end)
                        .map((work: WorkHistory, index: number) => (
                          <tr key={index} className="border-b border-green-100 hover:bg-green-50 transition-colors">
                            <td className="px-4 py-4 font-semibold text-gray-800">{work.role}</td>
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                                {work.team}
                              </span>
                            </td>
                              <td className="px-4 py-4 text-gray-700">{formatYear(work.start)}</td>
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Past Positions */}
            {member.workHistory.some((work: WorkHistory) => work.end) && (
              <div className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#332a67]">
                  Past Positions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200 bg-gray-100">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#332a67]">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#332a67]">Team</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#332a67]">Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {member.workHistory
                        .filter((work: WorkHistory) => work.end)
                        .map((work: WorkHistory, index: number) => (
                          <tr key={index} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                            <td className="px-4 py-4 font-semibold text-gray-800">{work.role}</td>
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center rounded-full bg-[#332a67] px-3 py-1 text-sm font-medium text-white">
                                {work.team}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-gray-600 text-sm">
                              {formatYear(work.start)} - {formatYear(work.end)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
