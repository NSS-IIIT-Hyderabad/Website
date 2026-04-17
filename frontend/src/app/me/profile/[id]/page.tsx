import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getMembersFromDB } from '@/services/graphql/members';
import { redirect, notFound } from 'next/navigation';
import { Mail, Calendar, CheckCircle, XCircle, Linkedin, ArrowLeft, Users, User, Shield } from 'lucide-react';

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
  emailUsername: string;
  photoUrl?: string;
  batch?: string;
  status?: string;
  workHistory: WorkHistory[];
  bio?: string;
  achievements?: string[];
  interests?: string[];
  linkedin?: string;
  github?: string;
  phone?: string;
  department?: string;
  year?: string;
};

export default async function MeProfile({ params }: Props) {
  const { id } = await params as { id: string };
  const cookieStore = await cookies();
  const uid = cookieStore.get('uid')?.value ?? '';
  
  // Verify the requested ID matches the logged-in user
  if (uid !== id) {
    redirect('/members');
  }
  
  // Fetch live data with error handling
  const members = await getMembersFromDB();
  
  // Try to find member by rollNumber first, then by emailUsername
  const member = members.find((m: Member) => 
    m.rollNumber === id || m.emailUsername === id
  ) || null;

  // Show 404 if member not found
  if (!member) {
    console.warn('Member not found with ID:', id);
    notFound();
  }

  const isActive = member?.status === 'active' || member?.end?.toLowerCase() === 'present' || !member?.end;
  const linkedInUrl = `https://www.linkedin.com/in/${member.rollNumber}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with Badge */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/members" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to all members</span>
          </Link>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg">
            <Shield className="w-4 h-4" />
            <span className="font-bold text-sm">Your Profile</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-200">
          {/* Header with gradient */}
          <div className="h-32 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative">
            <div className="absolute -bottom-16 left-8">
              {/* India Flag Border */}
              <div className="w-32 h-32 rounded-full p-1 shadow-xl" style={{
                background: 'linear-gradient(to bottom, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)'
              }}>
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white">
                  <Image 
                    src={member.photoUrl || '/favicon.ico'} 
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
                  ? 'bg-green-500 text-white animate-pulse' 
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
                    Alumni
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-6 h-6 text-green-600" />
                <h1 className="text-4xl font-bold text-gray-800">{member.name}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium shadow-lg">
                  <Users className="w-4 h-4 mr-2" />
                  {member.team} Team
                </div>
                {member.department && (
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full font-medium shadow-lg">
                    {member.department}
                  </div>
                )}
                {member.year && (
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium shadow-lg">
                    {member.year}
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
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
                <h3 className="text-sm font-semibold text-green-800 uppercase mb-2">Roll Number</h3>
                <p className="text-2xl font-bold text-green-900">{member.rollNumber}</p>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border-2 border-emerald-200">
                <h3 className="text-sm font-semibold text-emerald-800 uppercase mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </h3>
                <a 
                  href={`mailto:${member.email}`}
                  className="text-lg font-semibold text-emerald-900 hover:text-emerald-600 transition-colors break-all"
                >
                  {member.email}
                </a>
              </div>

              {/* Duration */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl border-2 border-teal-200">
                <h3 className="text-sm font-semibold text-teal-800 uppercase mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Duration
                </h3>
                <p className="text-lg font-semibold text-teal-900">
                  {member.start} - {member.end || 'Present'}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
              <h3 className="w-full text-lg font-semibold text-gray-700 mb-2">Your Social Links</h3>
              
              <a 
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-medium">LinkedIn Profile</span>
              </a>

              <a 
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Your Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {member.bio && (
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-green-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About You</h2>
            <p className="text-gray-700 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Work History Table */}
        {member.workHistory && member.workHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Your Work History</h2>
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
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                {work.team}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-gray-700">{work.start}</td>
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
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {member.workHistory
                        .filter((work: WorkHistory) => work.end)
                        .map((work: WorkHistory, index: number) => {
                          const startDate = new Date(work.start);
                          const endDate = new Date(work.end);
                          const months = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
                          
                          return (
                            <tr key={index} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-4 font-semibold text-gray-800">{work.role}</td>
                              <td className="px-4 py-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                  {work.team}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-gray-700">
                                {months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : '< 1 month'}
                              </td>
                              <td className="px-4 py-4 text-gray-600 text-sm">
                                {work.start} - {work.end}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional Information - Achievements & Interests */}
        {((member.achievements && member.achievements.length > 0) || (member.interests && member.interests.length > 0)) && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Achievements */}
              {member.achievements && member.achievements.length > 0 && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 border-2 border-yellow-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    🏆 Your Achievements
                  </h3>
                  <ul className="space-y-3">
                    {member.achievements.map((achievement: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-yellow-600 mt-1">★</span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interests */}
              {member.interests && member.interests.length > 0 && (
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-5 border-2 border-pink-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    💡 Your Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.interests.map((interest: string, index: number) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-2">View Team Members</h3>
            <p className="text-blue-700 mb-4">Connect with other members of the NSS community</p>
            <Link 
              href="/members" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Users className="w-4 h-4" />
              Browse Members
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-900 mb-2">Upcoming Events</h3>
            <p className="text-purple-700 mb-4">Stay updated with NSS activities and programs</p>
            <Link 
              href="/events" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Calendar className="w-4 h-4" />
              View Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
