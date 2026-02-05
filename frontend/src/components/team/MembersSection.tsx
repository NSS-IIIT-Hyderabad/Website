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
  // Multi-select filter toggle function
  function toggleFilter(filter: string) {
    if (filter === "all") {
      setActiveFilters(["all"]);
    } else {
      setActiveFilters((prev) => {
        const next = prev.includes(filter)
          ? prev.filter(f => f !== filter)
          : [...prev.filter(f => f !== "all"), filter];
        return next.length === 0 ? ["all"] : next;
      });
    }
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
    const [activeFilters, setActiveFilters] = useState<string[]>(["all"]);

  // Filter members based on search and active filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
      // If "all" is selected, show all
      if (activeFilters.includes("all")) return matchesSearch;
      // If "active" or "inactive" is selected, match status
      const statusMatch = (activeFilters.includes("active") && member.status === "active") ||
        (activeFilters.includes("inactive") && member.status === "inactive");
      // If any team is selected, match team
      const teamMatch = activeFilters.some(f => f !== "active" && f !== "inactive" && f !== "all" && member.team.toLowerCase() === f.toLowerCase());
      return matchesSearch && (statusMatch || teamMatch);
  });

  // Group present by team, past by year
  const presentMembers = filteredMembers.filter(m => m.status === "active");
  const pastMembers = filteredMembers.filter(m => m.status === "inactive");

  const presentGroups = groupBy(presentMembers, m => m.team);
  // Group past members by end year only (extract year from YYYY-MM format)
  const pastGroups = groupBy(pastMembers, m => {
    if (!m.to) return "Unknown";
    // Extract year from date like "2024-05" -> "2024"
    const year = m.to.split('-')[0];
    return year;
  });

  // Show only 2 rows (8 cards) per section if not viewing all
  const MAX_CARDS = 8;

  // Get unique teams for filter buttons
  const allTeams = [...new Set(members.map(m => m.team))];

  // Preferred team ordering for display
  const preferredOrder = ["NSS CORE", "TECH", "LOGISTICS", "SOCIAL MEDIA", "DESIGN"];
  const presentTeamKeys = Object.keys(presentGroups);
  const presentTeamKeyMap: { [upper: string]: string } = presentTeamKeys.reduce((acc: any, k) => {
    acc[k.toUpperCase().trim()] = k;
    return acc;
  }, {});
  const orderedPresentTeamKeys = [
    // keep only keys that exist in presentGroups in the preferred order
    ...preferredOrder.map(o => presentTeamKeyMap[o]).filter(Boolean),
    // then any remaining teams (sorted alphabetically)
    ...presentTeamKeys.filter(k => !preferredOrder.includes(k.toUpperCase())).sort(),
  ];

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
            onClick={() => {
              setSearchTerm("");
              setActiveFilters(["all"]);
            }}
            className="btn-base bg-red-500 text-white hover:bg-red-700 px-6 py-3 whitespace-nowrap"
          >
            <span>Clear</span>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
            {/* Indian flag spectrum colors */}
            {[
              { label: "All Members", value: "all", color: "bg-orange-500", hover: "hover:bg-orange-100 hover:text-orange-600 border-orange-300" },
              { label: "Active", value: "active", color: "bg-green-600", hover: "hover:bg-green-100 hover:text-green-700 border-green-300" },
              { label: "Inactive", value: "inactive", color: "bg-blue-600", hover: "hover:bg-blue-100 hover:text-blue-700 border-blue-300" },
            ].map(({ label, value, color, hover }) => (
              <button
                key={value}
                onClick={() => toggleFilter(value)}
                className={`px-6 py-2 rounded-lg font-medium border-2 transition-all duration-200 ${
                  activeFilters.includes(value)
                    ? `${color} text-white shadow-lg scale-105 border-transparent`
                    : `bg-white text-gray-600 border-gray-200 ${hover}`
                }`}
              >
                {label}
              </button>
            ))}
            {allTeams.map((team, idx) => {
              // Assign saffron, white, green, blue, etc. in a cycle
              const teamColors = [
                "bg-[#FF9933]", // saffron
                "bg-[#138808]", // green
                "bg-[#1A5E9A]", // blue
                "bg-[#FFD700] text-yellow-900 border-yellow-200", // yellow
                "bg-[#FF9933]", // saffron again for cycle
              ];
              const hoverColors = [
                "hover:bg-orange-100 hover:text-orange-700 border-orange-300",
                "hover:bg-green-100 hover:text-green-700 border-green-300",
                "hover:bg-blue-100 hover:text-blue-700 border-blue-300",
                "hover:bg-yellow-100 hover:text-yellow-700 border-yellow-300",
                "hover:bg-orange-100 hover:text-orange-700 border-orange-300",
              ];
              const color = teamColors[idx % teamColors.length];
              const hover = hoverColors[idx % hoverColors.length];
              return (
                <button
                  key={team}
                  onClick={() => toggleFilter(team)}
                  className={`px-6 py-2 rounded-lg font-medium border-2 transition-all duration-200 ${
                    activeFilters.includes(team)
                      ? `${color} text-white shadow-lg scale-105 border-transparent`
                      : `bg-white text-gray-600 border-gray-200 ${hover}`
                  }`}
                >
                  {team}
                </button>
              );
            })}
          

          
          {/* (removed old single-select filter buttons) */}
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
  {(activeFilters.includes("all") || activeFilters.includes("active") || allTeams.some(team => activeFilters.includes(team))) && presentMembers.length > 0 && (
        <>
          <SectionTitle>Current Team Members</SectionTitle>
          {Object.keys(presentGroups).length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"><Search className="w-24 h-24 mx-auto text-gray-400" /></div>
              <p className="text-gray-500 text-lg">No current members found matching your criteria.</p>
            </div>
          )}
          {orderedPresentTeamKeys.map(team => {
            const group = presentGroups[team];
            if (!group) return null;
            return (
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
                      <span>View More</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Past Members */}
  {(activeFilters.includes("all") || activeFilters.includes("inactive")) && pastMembers.length > 0 && (
        <>
          <SectionTitle>Past Members</SectionTitle>
          {Object.keys(pastGroups).length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"><Search className="w-24 h-24 mx-auto text-gray-400" /></div>
              <p className="text-gray-500 text-lg">No past members found matching your criteria.</p>
            </div>
          )}
          {Object.entries(pastGroups)
            .sort((a, b) => Number(b[0]) - Number(a[0])) // Descending by year
            .map(([year, group]) => (
              <div key={year} className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                    Team of {year}
                    <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                      {group.length} {group.length === 1 ? 'past member' : 'past members'}
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
                      <span>View More</span>
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
              setActiveFilters(["all"]);
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