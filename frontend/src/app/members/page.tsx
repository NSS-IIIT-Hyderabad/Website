import React from "react";
import MembersSection from "@/components/team/MembersSection";
// import { getMembersFromDB } from "@/graphql_Q&M/getMembers";
import Footer from "@/utils/Footer";
import Navbar from "@/utils/Navbar";

export default async function MembersPage() {
//   let members = [];
//   try {
//     const rawMembers = await getMembersFromDB();
//     members = rawMembers.map((doc: any) => ({
//       id: doc._id?.toString() ?? "",
//       email: doc.email ?? "",
//       name: doc.name ?? "",
//       photoUrl: doc.photoUrl ?? "",
//       team: doc.team ?? "",
//       rollNumber: doc.rollNumber ?? "",
//       status: doc.status === "active" ? "active" : "inactive" as "active" | "inactive",
//       from: doc.from ?? "",
//       to: doc.to ?? "",
//     }));
//   } catch (error) {
//     console.error("Error fetching members:", error);
//     members = [];
//   }

  // Mock data for now
  const members = [
    {
      id: "1",
      email: "chanda.kumar@students.iiit.ac.in",
      name: "Akshay Chanda",
      photoUrl: "hi",
      team: "Tech",
      rollNumber: "2024102014",
      status: "active" as "active",
      from: "2021",
      to: "2025",
    },
    {
      id: "2",
      email: "jane@example.com",
      name: "Jane Smith",
      photoUrl: "hi",
      team: "Design",
      rollNumber: "2020002",
      status: "inactive" as "inactive",
      from: "2020",
      to: "2024",
    },
    {
      id: "3",
      email: "john@example.com",
      name: "John Doe",
      photoUrl: "",
      team: "Design",
      rollNumber: "2020003",
      status: "active" as "active",
      from: "2020",
      to: "2024",
    },
    {
      id: "4",
      email: "emma@example.com",
      name: "Emma Watson",
      photoUrl: "",
      team: "Tech",
      rollNumber: "2021002",
      status: "active" as "active",
      from: "2021",
      to: "2025",
    },
    {
      id: "5",
      email: "li@example.com",
      name: "Li Wei",
      photoUrl: "hi",
      team: "Design",
      rollNumber: "2020004",
      status: "inactive" as "inactive",
      from: "2020",
      to: "2024",
    },
    {
      id: "6",
      email: "maria@example.com",
      name: "Maria Garcia",
      photoUrl: "",
      team: "Tech",
      rollNumber: "2021003",
      status: "active" as "active",
      from: "2021",
      to: "2025",
    },
    {
      id: "7",
      email: "rithik.palla@students.iiit.ac.in",
      name: "Rithik Reddy Palla",
      photoUrl: "",
      team: "Tech",
      rollNumber: "2024102005",
      status: "active" as "active",
      from: "2022",
      to: "2026",
    }
  ];

  return (
    <>
      <div
        style={{
          margin: 0,
          paddingTop: "calc(64px + 2vw)",
          paddingRight: "clamp(0.5rem, 2vw, 2rem)",
          paddingLeft: "clamp(0.25rem, 1vw, 1rem)", // Add small left padding
          boxSizing: "border-box",
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
          background: "#FAEBE8"
        }}
      >
        <Navbar />
        <MembersSection members={members} />
      </div>
      <Footer />
    </>
  );
}