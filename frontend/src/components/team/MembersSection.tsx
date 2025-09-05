// Fixed MembersSection.tsx - Enhanced with loading states and better UX
"use client";

import React, { useState } from "react";
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
  const [searchActive, setSearchActive] = useState(false);
  const [searchHover, setSearchHover] = useState(false);
  const [searchBtnHover, setSearchBtnHover] = useState(false);
  const [searchBtnActive, setSearchBtnActive] = useState(false);

  // Filter members based on search
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group present by team, past by year
  const presentMembers = filteredMembers.filter(m => m.status === "active");
  const pastMembers = filteredMembers.filter(m => m.status === "inactive");

  const presentGroups = groupBy(presentMembers, m => m.team);
  const pastGroups = groupBy(pastMembers, m => m.to);

  // Show only 2 rows (8 cards) per section if not viewing all
  const MAX_CARDS = 8;

  // Section title with lines
  function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        margin: "32px 0 24px 0"
      }}>
        <div style={{
          flex: 1,
          height: 1,
          background: "#222",
          opacity: 0.2,
          marginRight: 16
        }} />
        <span style={{
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: 1,
          color: "#222"
        }}>{children}</span>
        <div style={{
          flex: 1,
          height: 1,
          background: "#222",
          opacity: 0.2,
          marginLeft: 16
        }} />
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1600,
      margin: "0 auto",
      padding: "2.5rem 1rem",
      background: "none",
      minHeight: "100vh",
      borderRadius: 0,
      boxShadow: "none",
    }}>
      {/* Top Row: Members title and View All */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24
      }}>
        <span style={{
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 1,
          color: "#222"
        }}>Members</span>
        <button
          onClick={() => setShowAll(v => !v)}
          style={{
            background: "none",
            border: "none",
            color: "#E90000",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            textDecoration: "underline",
            padding: "0.3rem 1rem"
          }}
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      {/* Search Bar */}
      <div style={{
        marginBottom: 32,
        display: "flex",
        alignItems: "center",
        gap: 16, // <-- gap between input and button
        maxWidth: 600,
        width: "100%",
      }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: 12,
            border: `2px solid ${
              searchActive ? "#E90000" : searchHover ? "#222" : "#bbb"
            }`,
            padding: "0 1rem",
            height: 52,
            flex: 1,
            transition: "border 0.2s",
          }}
          onMouseEnter={() => setSearchHover(true)}
          onMouseLeave={() => setSearchHover(false)}
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
          tabIndex={-1}
        >
          {/* Search Icon SVG */}
          <svg width="22" height="22" fill="none" stroke="#888" strokeWidth="2" style={{ marginRight: 8 }} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, team, or roll number"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setSearchActive(true)}
            onBlur={() => setSearchActive(false)}
            style={{
              border: "none",
              outline: "none",
              fontSize: 16,
              background: "transparent",
              flex: 1,
              height: "100%",
            }}
          />
        </div>
        <button
          type="button"
          style={{
            height: 52,
            borderRadius: 12,
            border: "2px solid #E90000", // no border --> "none"
            // If you want a red border instead, use: border: "2px solid #E90000",
            background: searchBtnActive
              ? "#b30000"
              : searchBtnHover
              ? "#ff3333"
              : "#E90000",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16, 
            padding: "0 2rem",
            cursor: "pointer",
            boxShadow: searchBtnHover
              ? "0 4px 16px rgba(233,0,0,0.12)"
              : "0 2px 8px rgba(233,0,0,0.08)",
            transition: "background 0.15s, box-shadow 0.15s, border 0.15s"
          }}
          onMouseDown={() => setSearchBtnActive(true)}
          onMouseUp={() => setSearchBtnActive(false)}
          onMouseLeave={() => {
            setSearchBtnHover(false);
            setSearchBtnActive(false);
          }}
          onMouseEnter={() => setSearchBtnHover(true)}
          onClick={e => e.preventDefault()} // Prevents input blur on click
        >
          Search
        </button>
      </div>

      {/* Present Members */}
      <SectionTitle>CURRENT MEMBERS</SectionTitle>
      {Object.keys(presentGroups).length === 0 && (
        <div style={{ color: "#888", marginBottom: 24 }}>No present members found.</div>
      )}
      {Object.entries(presentGroups).map(([team, group]) => (
        <div key={team} style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 600, fontSize: 17, margin: "12px 0 20px 0" }}>{team}</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2.5rem",
              justifyItems: "center",
            }}
          >
            {(showAll ? group : group.slice(0, MAX_CARDS)).map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      ))}

      {/* Past Members */}
      <SectionTitle>PAST MEMBERS</SectionTitle>
      {Object.keys(pastGroups).length === 0 && (
        <div style={{ color: "#888", marginBottom: 24 }}>No past members found.</div>
      )}
      {Object.entries(pastGroups)
        .sort((a, b) => Number(b[0]) - Number(a[0])) // Descending by year
        .map(([year, group]) => (
          <div key={year} style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 17, margin: "12px 0 20px 0" }}>{year}</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "2.5rem",
                justifyItems: "center",
              }}
            >
              {(showAll ? group : group.slice(0, MAX_CARDS)).map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}