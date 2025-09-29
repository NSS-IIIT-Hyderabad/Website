import React from "react";
import { Monitor, Palette, Users, Star, Mail, Sparkles, Phone } from "lucide-react";
import MembersSection from "@/components/team/MembersSection";
import { getMembersFromDB } from "@/graphql_Q&M/getMembers";
// import { getMembersFromDB } from "@/graphql_Q&M/getMembers";

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
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Hero Header */}
      <section className="relative w-full py-20 bg-indigo-900 text-white overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center">
          <div className="text-center text-white px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-sm font-medium mb-8">
              Our Team
            </div>
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Our Volunteer Family
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
              Meet the passionate changemakers who drive NSS IIIT Hyderabad's mission of community service and social responsibility
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-orange-300 mb-1">{members.length}</div>
                <div className="text-blue-100 font-medium">Active Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-green-300 mb-1">5+</div>
                <div className="text-blue-100 font-medium">Years of Service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300 mb-1">1k+</div>
                <div className="text-blue-100 font-medium">Lives Impacted</div>
              </div>
            </div>
          </div>
        </div>
        

        </section>
      
      {/* Team Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-6 py-3 rounded-lg text-sm font-medium mb-6">
              Team Structure
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-blue-800 mb-6">
              Our Team Structure
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Organized teams working together to create maximum impact in our communities through specialized skills and dedication
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center group hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Monitor className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-merriweather text-xl font-bold text-blue-800 mb-3">Tech Team</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Building digital solutions for community impact and social change</p>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold">
                {members.filter(m => m.team === 'Tech').length} Members
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center group hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-merriweather text-xl font-bold text-blue-800 mb-3">Design Team</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Creating visual stories that inspire action and engagement</p>
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg text-sm font-semibold">
                {members.filter(m => m.team === 'Design').length} Members
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center group hover:shadow-xl hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-merriweather text-xl font-bold text-blue-800 mb-3">Community Team</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Connecting with communities and organizing impactful events</p>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
                {members.filter(m => m.team !== 'Tech' && m.team !== 'Design').length} Members
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Members Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-lg text-sm font-medium mb-6">
              Meet the Team
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-blue-800 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every member brings unique skills and passion to our mission of creating positive social impact
            </p>
          </div>
          <MembersSection members={members} />
        </div>
      </section>
      
      {/* Join Our Team CTA */}
      <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-sm font-medium mb-8">
              Join Our Mission
            </div>
            
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Join Our Mission?
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Become part of a community that's dedicated to creating positive change and building a better tomorrow
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-white text-indigo-800 hover:bg-slate-50 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3">
                <span>Become a Volunteer</span>
              </button>
              
              <button className="group border-2 border-white text-white hover:bg-white hover:text-indigo-800 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                <span>Contact Leadership</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}