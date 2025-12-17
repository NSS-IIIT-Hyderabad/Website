// Shared Member type definitions

export interface Member {
  id?: string;
  email: string;
  name: string;
  photoUrl: string;
  team: string;
  rollNumber: string;
  status: 'active' | 'inactive';
  from: string;
  to: string;
}

export interface MemberFromDB {
  name: string;
  email: string;
  rollNumber: string;
  team: string;
  status: string;
  start: string;
  end: string;
  photoUrl: string;
}

// Helper function to transform DB member to UI member
export function transformMember(dbMember: MemberFromDB, index?: number): Member {
  return {
    id: dbMember.rollNumber || `member-${index || 0}`,
    email: dbMember.email || '',
    name: dbMember.name || '',
    photoUrl: dbMember.photoUrl || '',
    team: dbMember.team || '',
    rollNumber: dbMember.rollNumber || '',
    status: (dbMember.status === 'active' ? 'active' : 'inactive') as 'active' | 'inactive',
    from: dbMember.start || '',
    to: dbMember.end || '',
  };
}
