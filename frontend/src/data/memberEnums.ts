// Mirrors the RoleEnum / TeamTypeEnum / MemberStatusEnum defined in
// backend/model_members.py. strawberry-graphql represents enums on the wire
// using the Python Enum *member name* (e.g. "TECH_TEAM_MEMBER"), not the
// human-readable value ("Tech Team Member") - these tables translate between
// the two so the UI can show/collect nice labels while GraphQL
// queries/mutations keep using the wire enum names.

export const TEAM_OPTIONS: { value: string; label: string }[] = [
  { value: "NSS_CORE", label: "NSS Core" },
  { value: "TECH", label: "Tech" },
  { value: "DESIGN", label: "Design" },
  { value: "SOCIAL", label: "Social" },
  { value: "LOGISTICS", label: "Logistics" },
  { value: "CONTENT", label: "Content" },
];

export const ROLE_OPTIONS: { value: string; label: string }[] = [
  { value: "COORDINATOR", label: "Coordinator" },
  { value: "TECH_TEAM_HEAD", label: "Tech Team Head" },
  { value: "TECH_TEAM_MEMBER", label: "Tech Team Member" },
  { value: "DESIGN_TEAM_HEAD", label: "Design Team Head" },
  { value: "DESIGN_TEAM_MEMBER", label: "Design Team Member" },
  { value: "SOCIAL_MEDIA_TEAM_HEAD", label: "Social Media Team Head" },
  { value: "SOCIAL_MEDIA_TEAM_MEMBER", label: "Social Media Team Member" },
  { value: "LOGISTICS_TEAM_HEAD", label: "Logistics Team Head" },
  { value: "LOGISTICS_TEAM_MEMBER", label: "Logistics Team Member" },
  { value: "CONTENT_TEAM_HEAD", label: "Content Team Head" },
  { value: "CONTENT_TEAM_MEMBER", label: "Content Team Member" },
];

export const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "ACTIVE", label: "active" },
  { value: "INACTIVE", label: "inactive" },
];

function buildLookup(options: { value: string; label: string }[]) {
  const toLabel: Record<string, string> = {};
  const toValue: Record<string, string> = {};
  for (const { value, label } of options) {
    toLabel[value] = label;
    toValue[label] = value;
  }
  return { toLabel, toValue };
}

const teamLookup = buildLookup(TEAM_OPTIONS);
const roleLookup = buildLookup(ROLE_OPTIONS);
const statusLookup = buildLookup(STATUS_OPTIONS);

// GraphQL enum name -> human label (for displaying data returned by viewMembers/viewEvents)
export const teamLabel = (wireValue: string): string => teamLookup.toLabel[wireValue] ?? wireValue;
export const roleLabel = (wireValue: string): string => roleLookup.toLabel[wireValue] ?? wireValue;
export const statusLabel = (wireValue: string): string => statusLookup.toLabel[wireValue] ?? wireValue;

// human label -> GraphQL enum name (for building addMember/changeMember input)
export const teamEnumValue = (label: string): string => teamLookup.toValue[label] ?? label;
export const roleEnumValue = (label: string): string => roleLookup.toValue[label] ?? label;
export const statusEnumValue = (label: string): string => statusLookup.toValue[label] ?? label;
