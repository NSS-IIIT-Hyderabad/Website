import { gql } from "@apollo/client";

export const GET_MEMBERS = gql`
  query GetMembers {
    viewMembers {
      id
      name
      email
      rollNumber
      batch
      department
      photoUrl
      phone
      bio
      linkedin
      github
      achievements
      interests
      workHistory { role team start end status }
    }
  }
`;

export async function getMembersFromDB() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const response = await fetch(`${apiUrl}/graphql`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: GET_MEMBERS.loc?.source.body }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Unable to load members");
  const result = await response.json();
  if (result.errors) throw new Error(result.errors[0]?.message || "Unable to load members");
  return result.data?.viewMembers || [];
}
