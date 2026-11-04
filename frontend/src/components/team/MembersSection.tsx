"use client";

import React, { useState } from "react";
import { RotateCcw, Search, GraduationCap } from "lucide-react";
import MemberCard from "./MemberCard";

type WorkHistory = {
  role?: string;
  team?: string;
  start?: string;
  end?: string | null;
  status?: string | null;
};

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
  workHistory?: WorkHistory[];
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
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [activeFilters, setActiveFilters] = useState<string[]>(["all"]);

  // Extract active status filters ("active", "inactive")
  const selectedStatuses = activeFilters.filter(
    (f) => f === "active" || f === "inactive"
  );

  // Extract active team filters (anything other than "all", "active", "inactive")
  const selectedTeams = activeFilters.filter(
    (f) => f !== "all" && f !== "active" && f !== "inactive"
  );

  const hasStatusFilter = selectedStatuses.length > 0;
  const hasTeamFilter = selectedTeams.length > 0;

  // Multi-select filter toggle function
  function toggleFilter(filter: string) {
    if (filter === "all") {
      setActiveFilters(["all"]);
      return;
    }

    setActiveFilters((prev) => {
      const isStatusFilter = filter === "active" || filter === "inactive";
      const opposingStatus = filter === "active" ? "inactive" : "active";

      let next: string[];

      if (isStatusFilter) {
        if (prev.includes(filter)) {
          // Deselect this status filter
          next = prev.filter((f) => f !== filter && f !== "all");
        } else {
          // Select this status filter and replace opposing status
          next = [...prev.filter((f) => f !== filter && f !== opposingStatus && f !== "all"), filter];
        }
      } else {
        // Toggle team filter
        if (prev.includes(filter)) {
          next = prev.filter((f) => f !== filter && f !== "all");
        } else {
          next = [...prev.filter((f) => f !== "all"), filter];
        }
      }

      return next.length === 0 ? ["all"] : next;
    });
  }

  // Filter members based on search and multi-criteria filters
  const filteredMembers = members.filter((member) => {
    const searchLower = searchTerm.trim().toLowerCase();
    const memberName = (member.name || "").toLowerCase();
    const memberTeam = (member.team || "").toLowerCase();
    const memberRoll = (member.rollNumber || "").toLowerCase();

    const matchesSearch =
      !searchLower ||
      memberName.includes(searchLower) ||
      memberTeam.includes(searchLower) ||
      memberRoll.includes(searchLower);

    if (!matchesSearch) return false;

    // If "all" is explicitly selected and no filters active, show all
    if (activeFilters.includes("all") && !hasStatusFilter && !hasTeamFilter) {
      return true;
    }

    // Match status (active vs inactive)
    const matchesStatus =
      !hasStatusFilter || selectedStatuses.includes(member.status);

    // Match team
    const matchesTeam =
      !hasTeamFilter ||
      selectedTeams.some(
        (t) => t.trim().toLowerCase() === memberTeam.trim().toLowerCase()
      );

    // Multi-criteria: MUST satisfy status filter AND team filter simultaneously
    return matchesStatus && matchesTeam;
  });

  // Group present by team, past by year
  const presentMembers = filteredMembers.filter((m) => m.status === "active");
  const pastMembers = filteredMembers.filter((m) => m.status === "inactive");

  const presentGroups = groupBy(presentMembers, (m) => m.team);

  // Group past members by end year only (extract year from YYYY-MM format), safely handling missing/unknown values
  const pastGroups = groupBy(pastMembers, (m) => {
    if (!m.to || m.to === "-" || m.to.toLowerCase() === "null") return "Unknown";
    const year = m.to.split("-")[0]?.trim();
    return year || "Unknown";
  });

  // Show only 2 rows (8 cards) per section if not viewing all
  const MAX_CARDS = 8;

  // Get unique teams for filter buttons
  const allTeams = [...new Set(members.map((m) => m.team?.trim()).filter(Boolean))] as string[];

  // Preferred team ordering for display
  const preferredOrder = ["NSS CORE", "TECH", "LOGISTICS", "SOCIAL MEDIA", "DESIGN"];
  const presentTeamKeys = Object.keys(presentGroups);
  const presentTeamKeyMap: { [upper: string]: string } = presentTeamKeys.reduce((acc: Record<string, string>, k) => {
    acc[k.toUpperCase().trim()] = k;
    return acc;
  }, {});
  const orderedPresentTeamKeys = [
    // keep only keys that exist in presentGroups in the preferred order
    ...preferredOrder.map((o) => presentTeamKeyMap[o]).filter(Boolean),
    // then any remaining teams (sorted alphabetically)
    ...presentTeamKeys.filter((k) => !preferredOrder.includes(k.toUpperCase())).sort(),
  ];

  // Team display mapping for consistent filter button casing & order
  const teamDisplayMap = allTeams.reduce<Record<string, string>>((acc, t) => {
    acc[t.toUpperCase()] = t;
    return acc;
  }, {});
  const orderedFilterTeams = [
    ...preferredOrder.map((o) => teamDisplayMap[o]).filter(Boolean),
    ...allTeams.filter((t) => !preferredOrder.includes(t.toUpperCase())).sort(),
  ];

  // Section visibility conditions
  const showPresentSection =
    (!hasStatusFilter || selectedStatuses.includes("active")) &&
    presentMembers.length > 0;

  const showPastSection =
    (!hasStatusFilter || selectedStatuses.includes("inactive")) &&
    pastMembers.length > 0;

  // Section title with simplified styling
  function SectionTitle({ children, accentClass = "bg-blue-800" }: { children: React.ReactNode; accentClass?: string }) {
    return (
      <div className="flex items-center justify-center my-12">
        <div className="flex-1 h-0.5 bg-orange-200 mr-4" />
        <div className={`rounded-lg px-6 py-3 text-white shadow-lg ${accentClass}`}>
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
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, team, or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 py-3 pl-12 pr-4 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setActiveFilters(["all"]);
              setExpandedGroups({});
            }}
            className="btn-base whitespace-nowrap bg-gray-200 px-6 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span>Clear</span>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "All Members", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ].map(({ label, value }) => {
              const isActive =
                value === "all"
                  ? activeFilters.includes("all")
                  : activeFilters.includes(value);

              return (
                <button
                  key={value}
                  onClick={() => toggleFilter(value)}
                  className={`rounded-lg border-2 px-6 py-2 font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "scale-105 border-gray-700 bg-gray-700 text-white shadow-lg"
                      : "border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:block h-8 w-px bg-gray-300" />

          <div className="flex flex-wrap gap-3 justify-center">
            {orderedFilterTeams.map((team) => {
              const isSelected = activeFilters.some(
                (f) => f.toLowerCase() === team.toLowerCase()
              );

              return (
                <button
                  key={team}
                  onClick={() => toggleFilter(team)}
                  className={`rounded-lg border-2 px-6 py-2 font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "scale-105 border-gray-700 bg-gray-700 text-white shadow-lg"
                      : "border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {team}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {searchTerm && (
        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <span className="font-semibold">{filteredMembers.length}</span> 
            {filteredMembers.length === 1 ? ' member' : ' members'} found for &quot;{searchTerm}&quot;
          </p>
        </div>
      )}

      {/* Present Members */}
      {showPresentSection && (
        <>
          <SectionTitle accentClass="bg-[#332a67]">Current Team Members</SectionTitle>
          {orderedPresentTeamKeys.map((team) => {
            const group = presentGroups[team];
            if (!group) return null;
            const groupKey = `present:${team}`;
            const isExpanded = !!expandedGroups[groupKey];
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
                  {(isExpanded ? group : group.slice(0, MAX_CARDS)).map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
                {!isExpanded && group.length > MAX_CARDS && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() =>
                        setExpandedGroups((prev) => ({ ...prev, [groupKey]: true }))
                      }
                      className="btn-base bg-gray-700 text-white hover:bg-gray-600"
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
      {showPastSection && (
        <>
          <SectionTitle>Past Members</SectionTitle>
          {Object.entries(pastGroups)
            .sort(([yearA], [yearB]) => {
              const numA = Number(yearA);
              const numB = Number(yearB);
              const isNumA = !Number.isNaN(numA);
              const isNumB = !Number.isNaN(numB);

              if (isNumA && isNumB) {
                return numB - numA; // Descending by year
              }
              if (isNumA) return -1; // Valid years before "Unknown"
              if (isNumB) return 1;
              return yearA.localeCompare(yearB);
            })
            .map(([year, group]) => {
              const groupKey = `past:${year}`;
              const isExpanded = !!expandedGroups[groupKey];

              return (
                <div key={year} className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                      {year === "Unknown" ? "Former Members" : `Team of ${year}`}
                      <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                        {group.length} {group.length === 1 ? 'past member' : 'past members'}
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center">
                    {(isExpanded ? group : group.slice(0, MAX_CARDS)).map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                  {!isExpanded && group.length > MAX_CARDS && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() =>
                          setExpandedGroups((prev) => ({ ...prev, [groupKey]: true }))
                        }
                        className="btn-base bg-gray-700 text-white hover:bg-gray-600"
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

      {/* No Results */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-20">
          <div className="text-8xl mb-6"><Search className="w-32 h-32 mx-auto text-gray-400" /></div>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">No Members Found</h3>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            We couldn&apos;t find any members matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveFilters(["all"]);
              setExpandedGroups({});
            }}
            className="btn-base bg-gray-700 text-white hover:bg-gray-600"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}