import { runGraphQLQuery } from "@/services/graphql/client";
import { normalizeStoredUploadPath } from "@/utils/uploads";

export type Event = {
  eventName: string;
  start: string;
  end: string;
  venue: string;
  description: string;
  eventProfile?: string;
  audience?: string[];
};

const EVENTS_QUERY = `
  query ViewEvents {
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

export async function getEventsFromDB(): Promise<Event[]> {
  const data = await runGraphQLQuery<{ viewEvents: any[] }>(EVENTS_QUERY);
  const events = data?.viewEvents;

  if (!Array.isArray(events)) {
    throw new Error("Failed to load events from GraphQL backend");
  }

  return events.map((e) => ({
    eventName: e.event_name,
    start: e.start,
    end: e.end,
    venue: e.venue,
    description: e.description,
    eventProfile: normalizeStoredUploadPath(e.event_profile),
    audience: e.audience,
  }));
}
