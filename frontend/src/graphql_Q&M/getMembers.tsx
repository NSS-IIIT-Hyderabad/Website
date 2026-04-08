// getMembers.tsx

type MemberData = {
  id?: string;
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
  id?: string;
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
      id
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

function getGraphQLEndpoints() {
  return [
    'http://backend:8000/graphql',
    'http://localhost:8000/graphql',
    'http://localhost/api/graphql',
  ];
}

async function fetchMembersFromGraphQL(): Promise<GraphQLMember[] | null> {
  for (const endpoint of getGraphQLEndpoints()) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: MEMBERS_QUERY }),
        cache: 'no-store',
      });

      if (!response.ok) {
        continue;
      }

      const payload = await response.json();
      const members = payload?.data?.viewMembers;
      if (Array.isArray(members)) {
        return members as GraphQLMember[];
      }
    } catch {
      // Try the next endpoint.
    }
  }

  return null;
}

// Transform Data.tsx format to the expected format
function transformMemberData(member: MemberData) {
  // Get the current/most recent work history entry
  const currentWork = member.workHistory && member.workHistory.length > 0 
    ? member.workHistory[0] 
    : null;
  
  // Determine status based on whether they have an active role
  const isActive = currentWork && currentWork.end === null;
  
  // Extract email username (part before @) to use as alternative ID
  const emailUsername = member.email ? member.email.split('@')[0] : '';
  
  return {
    id: member.id || member.rollNumber || member.email,
    name: member.name,
    email: member.email,
    // Preserve original batch if present; fall back to year for compatibility
    batch: member.batch || member.year || '',
    rollNumber: member.rollNumber,
    emailUsername: emailUsername, // Add this for matching
    team: currentWork?.team || 'General',
    status: isActive ? 'active' : 'inactive',
    start: currentWork?.start || '2024',
    end: currentWork?.end || (isActive ? 'Present' : '2024'),
    photoUrl: member.photoUrl || '/favicon.ico',
    // Include full member data for profile pages
    bio: member.bio || '',
    workHistory: member.workHistory || [],
    achievements: member.achievements || [],
    interests: member.interests || [],
    linkedin: member.linkedin || '',
    github: member.github || '',
    phone: member.phone || '',
    department: member.department || '',
    year: member.year || ''
  };
}

export async function getMembersFromDB() {
  const members = await fetchMembersFromGraphQL();
  if (!members || members.length === 0) {
    throw new Error('Failed to load members from GraphQL backend');
  }
  const transformedMembers = members.map((member) =>
    transformMemberData(member as MemberData)
  );
  return transformedMembers;
}
