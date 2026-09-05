import { gql } from "@apollo/client";

// EventInput mirrors the backend's EventModel; field names are camelCased
// by strawberry-graphql (event_name -> eventName, start_time -> startTime, ...).
export const ADD_EVENT = gql`
  mutation AddEvent($event: EventInput!) {
    addEvent(event: $event)
  }
`;

export const CHANGE_EVENT = gql`
  mutation ChangeEvent($event: EventInput!) {
    changeEvent(event: $event)
  }
`;

export const REMOVE_EVENT = gql`
  mutation RemoveEvent($eventName: String!) {
    removeEvent(eventName: $eventName)
  }
`;
