// getEvents.tsx - Fetch events from GraphQL backend

export type Event = {
  id?: string;
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
      id
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

function getGraphQLEndpoints() {
  return [
    'http://backend:8000/graphql',
    'http://localhost:8000/graphql',
    'http://localhost/api/graphql',
  ];
}

async function fetchEventsFromGraphQL(): Promise<Event[] | null> {
  for (const endpoint of getGraphQLEndpoints()) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: EVENTS_QUERY }),
        cache: 'no-store',
      });

      if (!response.ok) {
        continue;
      }

      const payload = await response.json();
      let events = payload?.data?.viewEvents;
      if (Array.isArray(events)) {
        // Transform snake_case GraphQL fields to camelCase
        events = events.map((e: any) => ({
          id: e.id,
          eventName: e.event_name,
          start: e.start,
          end: e.end,
          venue: e.venue,
          description: e.description,
          eventProfile: e.event_profile,
          audience: e.audience,
        }));
        return events as Event[];
      }
    } catch {
      // Try the next endpoint.
    }
  }

  return null;
}

export async function getEventsFromDB(): Promise<Event[]> {
  const events = await fetchEventsFromGraphQL();
  if (!events || events.length === 0) {
    throw new Error('Failed to load events from GraphQL backend');
  }
  return events;
}
