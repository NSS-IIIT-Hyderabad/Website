"use client";

import React, { useState } from "react";
import { Star, CheckCircle, XCircle, Monitor, Palette, Users, Eye, List, RotateCcw, Search, GraduationCap } from "lucide-react";
import MemberCard from "./MemberCard";

type Member = {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  team: string;
  rollNumber: string;
  status: "active" | "inactive";
  from: string;
  to: string;
};

type Grouped<T> = { [key: string]: T[] };

function groupBy<T>(arr: T[], key: (item: T) => string) {
  return arr.reduce((acc: Grouped<T>, item) => {
    const group = key(item);
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

export default function MembersSection({ members }: { members: Member[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter members based on search and active filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "active") return matchesSearch && member.status === "active";
    if (activeFilter === "inactive") return matchesSearch && member.status === "inactive";
    return matchesSearch && member.team.toLowerCase() === activeFilter.toLowerCase();
  });

  // Group present by team, past by year
  const presentMembers = filteredMembers.filter(m => m.status === "active");
  const pastMembers = filteredMembers.filter(m => m.status === "inactive");

  const presentGroups = groupBy(presentMembers, m => m.team);
  const pastGroups = groupBy(pastMembers, m => m.to);

  // Show only 2 rows (8 cards) per section if not viewing all
  const MAX_CARDS = 8;

  // Get unique teams for filter buttons
  const allTeams = [...new Set(members.map(m => m.team))];

  // Section title with simplified styling
  function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex items-center justify-center my-12">
        <div className="flex-1 h-0.5 bg-orange-200 mr-4" />
        <div className="px-6 py-3 bg-blue-800 rounded-lg text-white shadow-lg">
          <span className="text-lg md:text-xl font-bold tracking-wide">
            {children}
          </span>
        </div>
        <div className="flex-1 h-0.5 bg-orange-200 ml-4" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="mb-12">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, team, or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors duration-200 text-gray-700 placeholder-gray-400"
            />
          </div>
          
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-base bg-blue-800 text-white hover:bg-blue-900 px-6 py-3 whitespace-nowrap"
          >
            <span>{showAll ? "Show Less" : "View All"}</span>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFilter === "all"
                ? "bg-orange-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            All Members ({members.length})
          </button>
          
          <button
            onClick={() => setActiveFilter("active")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFilter === "active"
                ? "bg-green-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 border-2 border-gray-200 hover:border-green-300 hover:text-green-600"
            }`}
          >
            Active ({presentMembers.length})
          </button>
          
          <button
            onClick={() => setActiveFilter("inactive")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFilter === "inactive"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            Alumni ({pastMembers.length})
          </button>
          
          {allTeams.map((team) => (
            <button
              key={team}
              onClick={() => setActiveFilter(team)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === team
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {team} ({members.filter(m => m.team === team).length})
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      {searchTerm && (
        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <span className="font-semibold">{filteredMembers.length}</span> 
            {filteredMembers.length === 1 ? ' member' : ' members'} found for "{searchTerm}"
          </p>
        </div>
      )}

      {/* Present Members */}
      {(activeFilter === "all" || activeFilter === "active" || allTeams.includes(activeFilter)) && presentMembers.length > 0 && (
        <>
          <SectionTitle>Current Team Members</SectionTitle>
          {Object.keys(presentGroups).length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"><Search className="w-24 h-24 mx-auto text-gray-400" /></div>
              <p className="text-gray-500 text-lg">No current members found matching your criteria.</p>
            </div>
          )}
          {Object.entries(presentGroups).map(([team, group]) => (
            <div key={team} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                  {team} Team
                  <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {group.length} {group.length === 1 ? 'member' : 'members'}
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center">
                {(showAll ? group : group.slice(0, MAX_CARDS)).map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
              {!showAll && group.length > MAX_CARDS && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAll(true)}
                    className="btn-base bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                  >
                    <span>👀</span>
                    <span>View {group.length - MAX_CARDS} More {team} Members</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* Past Members */}
      {(activeFilter === "all" || activeFilter === "inactive") && pastMembers.length > 0 && (
        <>
          <SectionTitle>Alumni & Past Members</SectionTitle>
          {Object.keys(pastGroups).length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"><Search className="w-24 h-24 mx-auto text-gray-400" /></div>
              <p className="text-gray-500 text-lg">No alumni found matching your criteria.</p>
            </div>
          )}
          {Object.entries(pastGroups)
            .sort((a, b) => Number(b[0]) - Number(a[0])) // Descending by year
            .map(([year, group]) => (
              <div key={year} className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                    Class of {year}
                    <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                      {group.length} {group.length === 1 ? 'alumni' : 'alumni'}
                    </span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center">
                  {(showAll ? group : group.slice(0, MAX_CARDS)).map(member => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
                {!showAll && group.length > MAX_CARDS && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setShowAll(true)}
                      className="btn-base bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    >
                      <span>👀</span>
                      <span>View {group.length - MAX_CARDS} More Alumni from {year}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
        </>
      )}

      {/* No Results */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-20">
          <div className="text-8xl mb-6"><Search className="w-32 h-32 mx-auto text-gray-400" /></div>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">No Members Found</h3>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            We couldn't find any members matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveFilter("all");
            }}
            className="btn-base bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}