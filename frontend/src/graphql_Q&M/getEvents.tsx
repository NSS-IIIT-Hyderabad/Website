import {gql} from "@apollo/client";

// Note: strawberry-graphql camelCases Python field names by default, so the
// snake_case fields on the backend's EventModel (event_name, start_time, ...)
// are exposed here as eventName, startTime, etc.
export const GET_EVENTS = gql`
  query GetEvents {
    viewEvents {
      eventName
      startTime
      endTime
      venue
      description
      eventProfile
      audience
    }
  }
`;
