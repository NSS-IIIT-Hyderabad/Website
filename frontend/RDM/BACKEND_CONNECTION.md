# Member Data Structure Reference

## Current Implementation
The frontend is currently using static data from `src/components/team/Data.tsx`. The data is automatically transformed to match the expected GraphQL format.

## Data Format

### Current Static Data Format (Data.tsx)
```typescript
{
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  year: string;
  department: string;
  photoUrl: string;
  phone: string;
  linkedin: string;
  github: string;
  bio: string;
  achievements: string[];
  interests: string[];
  isAdmin: boolean;
  workHistory: Array<{
    role: string;
    team: string;
    start: string;
    end: string | null;
  }>;
}
```

### Expected Backend Format (GraphQL)
```typescript
{
  name: string;
  email: string;
  rollNumber: string;
  team: string;
  status: 'active' | 'inactive';
  start: string;
  end: string;
  photoUrl: string;
}
```

## Transformation Logic
The `getMembersFromDB()` function in `src/graphql_Q&M/getMembers.tsx` currently:
1. Reads from `Data.tsx`
2. Transforms each member by taking their most recent `workHistory` entry
3. Sets `status` to 'active' if `end` is null, otherwise 'inactive'
4. Maps team from `workHistory[0].team`

## When Connecting Backend
To connect the real backend:

1. Update `src/graphql_Q&M/getMembers.tsx`:
   - Remove the import of `Data.tsx`
   - Uncomment the GraphQL fetch code
   - Ensure your backend returns data in the expected format

2. The GraphQL query should match:
```graphql
query {
  viewMembers {
    name
    email
    rollNumber
    team
    status
    start
    end
    photoUrl
  }
}
```

3. Set environment variable:
```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://your-backend:8000/graphql
```

## No Changes Needed In:
- All page components (`/app/members`, `/app/member/profile/[id]`, `/app/me/profile/[id]`)
- UI components (`MemberCard`, `MembersSection`)
- Type definitions (`/types/member.ts`)

These will work seamlessly once the backend returns the correct format.
