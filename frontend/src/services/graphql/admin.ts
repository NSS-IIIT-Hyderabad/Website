import { runGraphQLMutation, runGraphQLQuery } from "@/services/graphql/client";
import { extractStoredUploadPath } from "@/utils/uploads";

export type AdminWorkHistory = {
  role: string;
  team: string;
  start: string;
  end: string | null;
};

export type AdminMember = {
  name: string;
  email: string;
  rollNumber: string;
  photoUrl?: string;
  phone?: string;
  batch?: string;
  year?: string;
  department?: string;
  linkedin?: string;
  github?: string;
  bio?: string;
  achievements?: string[];
  interests?: string[];
  workHistory: AdminWorkHistory[];
};

export type AdminEvent = {
  event_name: string;
  start: string;
  end: string;
  venue: string;
  description: string;
  event_profile?: string;
  audience?: string[];
};

export type AdminAccount = {
  memberId: string;
  rollNumber: string;
  email: string;
  name: string;
  active: boolean;
  source: string;
  grantedBy?: string | null;
  grantedAt: string;
};

const ADMIN_EVENTS_QUERY = `
  query AdminViewEvents {
    viewEvents {
      event_name
      start
      end
      venue
      description
      event_profile
      audience
    }
  }
`;

const ADMIN_MEMBERS_QUERY = `
  query AdminViewMembers {
    viewMembers {
      name
      email
      rollNumber
      photoUrl
      phone
      batch
      year
      department
      linkedin
      github
      bio
      achievements
      interests
      workHistory {
        role
        team
        start
        end
      }
    }
  }
`;

const ADD_EVENT_MUTATION = `
  mutation AdminAddEvent($event: EventInput!) {
    addEvent(event: $event)
  }
`;

const CHANGE_EVENT_MUTATION = `
  mutation AdminChangeEvent($eventName: String!, $event: EventInput!) {
    changeEvent(eventName: $eventName, event: $event)
  }
`;

const DELETE_EVENT_MUTATION = `
  mutation AdminDeleteEvent($eventName: String!) {
    deleteEvent(eventName: $eventName)
  }
`;

const CHANGE_MEMBER_MUTATION = `
  mutation AdminChangeMember($memberEmail: String!, $member: MemberInput!) {
    changeMemberByEmail(memberEmail: $memberEmail, member: $member)
  }
`;

const ADD_MEMBER_MUTATION = `
  mutation AdminAddMember($member: MemberInput!) {
    addMember(member: $member)
  }
`;

const DELETE_MEMBER_MUTATION = `
  mutation AdminDeleteMember($memberEmail: String!) {
    deleteMember(memberEmail: $memberEmail)
  }
`;

const IS_CURRENT_USER_ADMIN_QUERY = `
  query IsCurrentUserAdmin {
    isCurrentUserAdmin
  }
`;

const VIEW_ADMINS_QUERY = `
  query ViewAdmins {
    viewAdmins {
      memberId
      rollNumber
      email
      name
      active
      source
      grantedBy
      grantedAt
    }
  }
`;

const GRANT_ADMIN_MUTATION = `
  mutation GrantAdmin($identifier: String!) {
    grantAdmin(identifier: $identifier)
  }
`;

const REVOKE_ADMIN_MUTATION = `
  mutation RevokeAdmin($identifier: String!) {
    revokeAdmin(identifier: $identifier)
  }
`;

function hasAuthCookies(): boolean {
  if (typeof document === "undefined") {
    return true;
  }

  const raw = document.cookie || "";
  if (!raw.trim()) {
    return false;
  }

  const hasUid = /(?:^|;\s*)uid=/.test(raw);
  const hasEmail = /(?:^|;\s*)email=/.test(raw);
  const hasLogoutMarker = /(?:^|;\s*)logout=/.test(raw);

  return (hasUid || hasEmail) && !hasLogoutMarker;
}

export async function getAdminEvents(): Promise<AdminEvent[]> {
  const data = await runGraphQLQuery<{ viewEvents: Array<Partial<AdminEvent>> }>(ADMIN_EVENTS_QUERY);
  if (!Array.isArray(data?.viewEvents)) {
    throw new Error("Failed to load events from backend");
  }

  return data.viewEvents.map((event) => ({
    event_name: (event.event_name || "").toString(),
    start: (event.start || "").toString(),
    end: (event.end || "").toString(),
    venue: (event.venue || "").toString(),
    description: (event.description || "").toString(),
    event_profile: extractStoredUploadPath((event.event_profile || "").toString(), "events"),
    audience: Array.isArray(event.audience) ? event.audience : [],
  }));
}

export async function saveAdminEvent(
  event: AdminEvent,
  isNew: boolean,
  eventNameOverride?: string,
): Promise<boolean> {
  const payload: AdminEvent = {
    ...event,
    event_profile: extractStoredUploadPath(event.event_profile, "events"),
  };

  if (isNew) {
    const result = await runGraphQLMutation<{ addEvent: boolean }>(ADD_EVENT_MUTATION, {
      event: payload,
    });
    return !!result?.addEvent;
  }

  const targetEventName = (eventNameOverride || event.event_name || "").trim();
  if (!targetEventName) {
    return false;
  }

  const result = await runGraphQLMutation<{ changeEvent: boolean }>(CHANGE_EVENT_MUTATION, {
    eventName: targetEventName,
    event: payload,
  });
  return !!result?.changeEvent;
}

export async function deleteAdminEvent(eventName: string): Promise<boolean> {
  const result = await runGraphQLMutation<{ deleteEvent: boolean }>(DELETE_EVENT_MUTATION, {
    eventName,
  });
  return !!result?.deleteEvent;
}

export async function getAdminMembers(): Promise<AdminMember[]> {
  const data = await runGraphQLQuery<{ viewMembers: AdminMember[] }>(ADMIN_MEMBERS_QUERY);
  if (!data?.viewMembers) {
    throw new Error("Failed to load members from backend");
  }
  return data.viewMembers;
}

export async function saveAdminMember(
  member: AdminMember,
  isNew = false,
  memberEmailOverride?: string,
): Promise<boolean> {
  const payload: AdminMember = {
    ...member,
    photoUrl: extractStoredUploadPath(member.photoUrl, "members"),
  };

  if (isNew) {
    const result = await runGraphQLMutation<{ addMember: boolean }>(ADD_MEMBER_MUTATION, {
      member: payload,
    });
    return !!result?.addMember;
  }

  const targetMemberEmail = (memberEmailOverride || payload.email || "").trim().toLowerCase();
  if (!targetMemberEmail) {
    return false;
  }

  const result = await runGraphQLMutation<{ changeMemberByEmail: boolean }>(
    CHANGE_MEMBER_MUTATION,
    {
      memberEmail: targetMemberEmail,
      member: payload,
    },
  );
  return !!result?.changeMemberByEmail;
}

export async function deleteAdminMember(memberEmail: string): Promise<boolean> {
  const result = await runGraphQLMutation<{ deleteMember: boolean }>(DELETE_MEMBER_MUTATION, {
    memberEmail,
  });
  return !!result?.deleteMember;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  if (!hasAuthCookies()) {
    return false;
  }

  try {
    const data = await runGraphQLQuery<{ isCurrentUserAdmin: boolean }>(
      IS_CURRENT_USER_ADMIN_QUERY,
    );
    return typeof data?.isCurrentUserAdmin === "boolean"
      ? data.isCurrentUserAdmin
      : false;
  } catch {
    // Admin checks should fail closed and never crash navigation.
    return false;
  }
}

export async function getAdmins(): Promise<AdminAccount[]> {
  const data = await runGraphQLQuery<{ viewAdmins: AdminAccount[] }>(
    VIEW_ADMINS_QUERY,
  );
  if (!data?.viewAdmins) {
    throw new Error("Failed to load admins list");
  }
  return data.viewAdmins;
}

export async function grantAdminAccess(identifier: string): Promise<boolean> {
  const result = await runGraphQLMutation<{ grantAdmin: boolean }>(
    GRANT_ADMIN_MUTATION,
    { identifier },
  );
  return !!result?.grantAdmin;
}

export async function revokeAdminAccess(identifier: string): Promise<boolean> {
  const result = await runGraphQLMutation<{ revokeAdmin: boolean }>(
    REVOKE_ADMIN_MUTATION,
    { identifier },
  );
  return !!result?.revokeAdmin;
}
