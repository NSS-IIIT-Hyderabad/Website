import { runGraphQLQuery } from "@/services/graphql/client";
import { buildUploadUrl } from "@/utils/uploads";

type MemberData = {
  name: string;
  email: string;
  rollNumber: string;
  photoUrl?: string;
  batch?: string;
  year?: string;
  bio?: string;
  workHistory?: Array<{ role: string; team: string; start: string; end: string | null }>;
  achievements?: string[];
  interests?: string[];
  linkedin?: string;
  github?: string;
  phone?: string;
  department?: string;
};

type GraphQLMember = {
  name: string;
  email: string;
  rollNumber: string;
  photoUrl?: string;
  batch?: string;
  year?: string;
  bio?: string;
  achievements?: string[];
  interests?: string[];
  linkedin?: string;
  github?: string;
  phone?: string;
  department?: string;
  workHistory?: Array<{ role: string; team: string; start: string; end: string | null }>;
};

const MEMBERS_QUERY = `
  query ViewMembers {
    viewMembers {
      name
      email
      rollNumber
      photoUrl
      batch
      year
      bio
      achievements
      interests
      linkedin
      github
      phone
      department
      workHistory {
        role
        team
        start
        end
      }
    }
  }
`;

function transformMemberData(member: MemberData) {
  const currentWork =
    member.workHistory && member.workHistory.length > 0 ? member.workHistory[0] : null;
  const isActive = currentWork && currentWork.end === null;
  const emailUsername = member.email ? member.email.split("@")[0] : "";

  return {
    id: member.email || member.rollNumber,
    name: member.name,
    email: member.email,
    batch: member.batch || member.year || "",
    rollNumber: member.rollNumber,
    emailUsername,
    team: currentWork?.team || "General",
    status: isActive ? "active" : "inactive",
    start: currentWork?.start || "2024",
    end: currentWork?.end || (isActive ? "Present" : "2024"),
    photoUrl: buildUploadUrl(member.photoUrl, "members") || "/favicon.ico",
    bio: member.bio || "",
    workHistory: member.workHistory || [],
    achievements: member.achievements || [],
    interests: member.interests || [],
    linkedin: member.linkedin || "",
    github: member.github || "",
    phone: member.phone || "",
    department: member.department || "",
    year: member.year || "",
  };
}

export async function getMembersFromDB() {
  const data = await runGraphQLQuery<{ viewMembers: GraphQLMember[] }>(MEMBERS_QUERY);
  const members = data?.viewMembers;

  if (!Array.isArray(members)) {
    return [];
  }

  return members.map((member) => transformMemberData(member as MemberData));
}
