// getMembers.tsx
import membersData from '@/data/Data';

// Transform Data.tsx format to the expected format
function transformMemberData(member: any) {
  // Get the current/most recent work history entry
  const currentWork = member.workHistory && member.workHistory.length > 0 
    ? member.workHistory[0] 
    : null;
  
  // Determine status based on whether they have an active role
  const isActive = currentWork && currentWork.end === null;
  
  // Extract email username (part before @) to use as alternative ID
  const emailUsername = member.email ? member.email.split('@')[0] : '';
  
  return {
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
  try {
    // Transform the data from Data.tsx to match the expected format
    const transformedMembers = membersData.map(transformMemberData);
    
    console.log(`Successfully loaded ${transformedMembers.length} members from local data`);
    return transformedMembers;
  } catch (error: any) {
    console.error('Failed to load members:', error);
    
    // Return empty array instead of throwing to prevent page crashes
    return [];
  }
}
