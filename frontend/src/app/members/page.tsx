import React from 'react';
import { getMembersFromDB } from '@/graphql_Q&M/getMembers';
import MembersSection from '@/components/team/MembersSection';

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

export default async function MembersPage() {
  try {
    // Fetch all members from the database
    const membersData = await getMembersFromDB();

    // Backend/dev data can contain accidental duplicates (for example repeated test inserts).
    // Deduplicate before rendering so React keys remain stable and unique.
    const seen = new Set<string>();
    const uniqueMembersData = membersData.filter((member: MemberFromDB) => {
      const key = `${member.id || ''}|${member.rollNumber || ''}|${member.email || ''}`.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
    
    // Transform the canonical member shape (Data.tsx / DB) to the lightweight shape
    // expected by MembersSection. We derive `team`, `from`, `to`, and `status`
    // from the member.workHistory array (pick active position if present).
    const members = uniqueMembersData.map((member: MemberFromDB, index: number) => {
      const workHistory = Array.isArray(member.workHistory) ? member.workHistory : [];
      // Prefer the currently active position (end === null), else the most
      // recent entry (last element).
      const active = workHistory.find((w: WorkHistory) => !w.end) || workHistory[workHistory.length - 1] || null;
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
        <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] to-[#00B050] mb-4 tracking-tight leading-tight">
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
  } catch (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Error Loading Members</h1>
            <p className="text-gray-600 text-lg mb-4">
              Failed to load team members from the database. Please ensure the GraphQL backend is running and accessible.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-gray-600">
                Check that the backend service is running at http://localhost:8000/graphql
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
