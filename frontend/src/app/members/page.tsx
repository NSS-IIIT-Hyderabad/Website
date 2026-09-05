"use client";

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MEMBERS } from '@/graphql_Q&M/getMembers';
import MembersSection from '@/components/team/MembersSection';
import { teamLabel, roleLabel } from '@/data/memberEnums';

type WorkHistory = {
  role: string;
  team: string;
  start: string;
  end: string | null;
};

type MemberFromDB = {
  id?: string;
  name: string;
  email: string;
  rollNumber: string;
  photoUrl?: string;
  team?: string;
  workHistory: WorkHistory[];
};

type TransformedMember = {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  team: string;
  rollNumber: string;
  status: 'active' | 'inactive';
  from: string;
  to: string;
  workHistory: WorkHistory[];
};

export default function MembersPage() {
  const { data, loading, error } = useQuery(GET_MEMBERS);
  const membersData = data?.viewMembers ?? [];
  
  // Transform the canonical member shape (Data.tsx / DB) to the lightweight shape
  // expected by MembersSection. We derive `team`, `from`, `to`, and `status`
  // from the member.workHistory array (pick active position if present).
  const members = membersData.map((member: MemberFromDB, index: number) => {
    // viewMembers returns GraphQL enum wire names (e.g. "TECH_TEAM_MEMBER"),
    // not the human labels - translate before using them anywhere.
    const workHistory = (Array.isArray(member.workHistory) ? member.workHistory : []).map((w: WorkHistory) => ({
      ...w,
      role: roleLabel(w.role),
      team: teamLabel(w.team),
    }));
    // Prefer the currently active position (end === null), else the most
    // recent entry (last element).
    const active = workHistory.find((w: WorkHistory) => !w.end) || workHistory[workHistory.length - 1] || null;
    const team = active?.team || teamLabel(member.team || '') || '';
    const from = active?.start || '';
    const to = active?.end || '';
    const status = active && !active.end ? 'active' : 'inactive';

    return {
      id: member.id || member.rollNumber || `member-${index}`,
      email: member.email || '',
      name: member.name || '',
      photoUrl: (member.photoUrl && member.photoUrl !== '-') ? member.photoUrl : '/favicon.ico',
      team: team || '',
      rollNumber: member.rollNumber || '',
      status,
      from,
      to,
      // pass full workHistory so child components can compute ranges
      workHistory: workHistory || [],
    };
  });

  if (loading) return <div className="min-h-screen p-12 text-center">Loading members...</div>;
  if (error) return <div className="min-h-screen p-12 text-center">Unable to load members.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
        <h1 className="text-6xl sm:text-7xl text-gray-600 max-w-3xl mx-auto font-extrabold tracking-tight leading-tight">
            Our Team
        </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated volunteers and alumni who make NSS a force for positive change
          </p>
        </div>

        {/* Members Section */}
        <MembersSection members={members as TransformedMember[]} />
      </div>
    </div>
  );
}
