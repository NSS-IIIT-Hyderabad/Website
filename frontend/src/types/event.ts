// Shared Event type, matching the GraphQL wire shape produced by the
// backend's EventModel (strawberry-graphql camelCases snake_case fields).

export interface EventDTO {
  eventName: string;
  startTime: string; // YYYY/MM/DD
  endTime: string; // YYYY/MM/DD
  venue: string;
  description: string;
  eventProfile?: string | null;
  audience?: string[];
}

export function toSlug(name: string): string {
  return name.replace(/\s+/g, "-").toLowerCase();
}
