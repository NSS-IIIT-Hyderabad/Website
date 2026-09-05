import { gql } from "@apollo/client";

export const ADD_MEMBER = gql`
  mutation AddMember($member: MemberInput!) {
    addMember(member: $member)
  }
`;

export const CHANGE_MEMBER = gql`
  mutation ChangeMember($member: MemberInput!) {
    changeMember(member: $member)
  }
`;

export const REMOVE_MEMBER = gql`
  mutation RemoveMember($rollNumber: String!) {
    removeMember(rollNumber: $rollNumber)
  }
`;
