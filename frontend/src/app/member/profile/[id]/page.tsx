import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMembersFromDB } from '@/services/graphql/members';
import { notFound } from 'next/navigation';
import { Mail, Calendar, CheckCircle, XCircle, ArrowLeft, Users } from 'lucide-react';

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

export default async function MemberProfile({ params }: Props) {
  const { id } = await params as { id: string };

  // Decode the incoming param in case the URL used percent-encoding (e.g. %40 for @)
  let lookupId = String(id || '');
  try { lookupId = decodeURIComponent(lookupId); } catch { /* fall back to raw id */ }
  const normalizedLookup = lookupId.toLowerCase();

  // Fetch live data with error handling
  const members = await getMembersFromDB();

  // Try to find member by rollNumber, email, or email username (case-insensitive)
  const member = members.find((m: Member) => {
    const roll = m.rollNumber ? String(m.rollNumber).toLowerCase() : '';
    const email = m.email ? String(m.email).toLowerCase() : '';
    const emailUser = email.includes('@') ? email.split('@')[0] : (m.emailUsername ? String(m.emailUsername).toLowerCase() : '');

    return (
      roll === normalizedLookup ||
      email === normalizedLookup ||
      emailUser === normalizedLookup
    );
  }) || null;

  // Show 404 if member not found
  if (!member) {
    console.warn('Member not found with identifier:', id);
    notFound();
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/members" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to all members</span>
        </Link>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="h-32 bg-blue-600 relative">
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
                    <CheckCircle className="w-3 h-3" />
                    Active
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3" />
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
                <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full font-medium shadow-lg">
                  <Users className="w-4 h-4 mr-2" />
                  {team} Team
                </div>
                {member.department && (
                  <div className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full font-medium shadow-lg">
                    {member.department}
                  </div>
                )}
                {batchOrYear && (
                  <div className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-full font-medium shadow-lg">
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
              <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-sm font-semibold text-blue-800 uppercase mb-2">Roll Number</h3>
                <p className="text-2xl font-bold text-blue-900">{member.rollNumber}</p>
              </div>

              {/* Email */}
              <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                <h3 className="text-sm font-semibold text-purple-800 uppercase mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </h3>
                <a 
                  href={`mailto:${member.email}`}
                  className="text-lg font-semibold text-purple-900 hover:text-purple-600 transition-colors break-all"
                >
                  {member.email}
                </a>
              </div>

              {/* Duration */}
              <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
                  <h3 className="text-sm font-semibold text-green-800 uppercase mb-2 flex items-center gap-2">
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

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
              <h3 className="w-full text-lg font-semibold text-gray-700 mb-2">Connect</h3>
              
              <a 
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Send Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {member.bio && (
          <div className="mt-8 bg-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Work History Table */}
        {member.workHistory && member.workHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Work History</h2>
            </div>
            
            {/* Current Position */}
            {member.workHistory.some((work: WorkHistory) => !work.end) && (
              <div className="p-6 border-b-2 border-gray-100">
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Current Position
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-green-50 border-b-2 border-green-200">
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
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white">
                                {work.team}
                              </span>
                            </td>
                              <td className="px-4 py-4 text-gray-700">{formatYear(work.start)}</td>
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                                <CheckCircle className="w-4 h-4" />
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
                <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Past Positions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-50 border-b-2 border-blue-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Team</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {member.workHistory
                        .filter((work: WorkHistory) => work.end)
                        .map((work: WorkHistory, index: number) => (
                          <tr key={index} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                            <td className="px-4 py-4 font-semibold text-gray-800">{work.role}</td>
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
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
