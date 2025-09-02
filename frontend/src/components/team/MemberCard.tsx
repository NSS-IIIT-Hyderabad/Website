// Fixed MemberCard.tsx
"use client";
import React, { useState } from "react";

type Member = {
  email: string;
  name: string;
  photoUrl: string;
  team: string;
  rollNumber: string;
  status: "active" | "inactive";
  from: string;
  to: string;
};

export default function MemberCard({ member }: { member: Member }) {
  const [imageError, setImageError] = useState(false);
  const [hover, setHover] = useState(false);

  const getFallbackImage = () => "/favicon.ico";
  const getImageSrc = (): string => {
    if (imageError) return getFallbackImage();
    if (!member.photoUrl || member.photoUrl.trim() === "" || member.photoUrl === "hi") {
      return getFallbackImage();
    }
    return member.photoUrl;
  };

  const handleImageError = () => setImageError(true);

  return (
    <div
      style={{
        width: 220,
        background: "#e0b4a877", // <-- changed from "#fff" to "#e0b4a8"
        borderRadius: 24,
        padding: 24,
        boxShadow: hover
          ? "0 8px 24px rgba(0,0,0,0.18)"
          : "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "box-shadow 0.3s, transform 0.3s",
        textAlign: "center",
        cursor: "pointer",
        transform: hover ? "translateY(-4px) scale(1.03)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          overflow: "hidden",
          marginBottom: 16,
          border: "4px solid #f3f3f3",
          background: "#eee",
        }}
      >
        <img
          src={getImageSrc()}
          alt={member.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={handleImageError}
        />
      </div>
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 20, color: "#222", margin: 0 }}>{member.name}</h3>
        <div style={{ color: "#555", fontSize: 15, margin: "4px 0" }}>{member.team}</div>
        <div style={{ color: "#888", fontSize: 13 }}>{member.rollNumber}</div>
        <div style={{ marginTop: 8, color: "#666", fontSize: 13 }}>
          {member.status === "active"
            ? <span>{member.from} - present</span>
            : <span>{member.from} - {member.to}</span>
          }
        </div>
      </div>
    </div>
  );
}
