import React from 'react';
import { getMembersFromDB } from '@/graphql_Q&M/getMembers';
import MembersSection from '@/components/team/MembersSection';

export default async function MembersPage() {
  // Fetch all members from the database
  const membersData = await getMembersFromDB();
  
  // Transform the canonical member shape (Data.tsx / DB) to the lightweight shape
  // expected by MembersSection. We derive `team`, `from`, `to`, and `status`
  // from the member.workHistory array (pick active position if present).
  const members = membersData.map((member: any, index: number) => {
    const workHistory = Array.isArray(member.workHistory) ? member.workHistory : [];
    // Prefer the currently active position (end === null), else the most
    // recent entry (last element).
    const active = workHistory.find((w: any) => !w.end) || workHistory[workHistory.length - 1] || null;
    const team = active?.team || member.team || '';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-white to-[#00B050] mb-4 drop-shadow-lg tracking-tight leading-tight">
            Our Team
        </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated volunteers and alumni who make NSS a force for positive change
          </p>
        </div>

        {/* Members Section */}
        <MembersSection members={members as any} />
      </div>
    </div>
  );
}
