import { buildBrowserGraphQLEndpoints } from "@/services/graphql/config";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

async function runGraphQLRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  const graphqlEndpoints = buildBrowserGraphQLEndpoints();

  for (const endpoint of graphqlEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        continue;
      }

      const payload = (await response.json()) as GraphQLResponse<T>;
      if (payload?.errors?.length) {
        continue;
      }
      if (payload?.data) {
        return payload.data;
      }
    } catch {
      // Try next endpoint.
    }
  }

  return null;
}

export async function runGraphQLQuery<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  return runGraphQLRequest<T>(query, variables);
}

export async function runGraphQLMutation<T>(
  mutation: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  return runGraphQLRequest<T>(mutation, variables);
}

