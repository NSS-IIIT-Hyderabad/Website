import { getBackendBaseCandidates } from "@/services/backend/config";

function asAbsoluteGraphQLEndpoints(base: string): string[] {
  const trimmed = base.trim().replace(/\/$/, "");
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) {
    return [];
  }

  if (trimmed.endsWith("/graphql") || trimmed.endsWith("/api/graphql")) {
    return [trimmed];
  }

  if (trimmed.endsWith("/api")) {
    return [`${trimmed}/graphql`];
  }

  return [`${trimmed}/graphql`, `${trimmed}/api/graphql`];
}

export function buildBrowserGraphQLEndpoints(): string[] {
  if (typeof window !== "undefined") {
    return ["/api/graphql"];
  }

  return [...new Set(getBackendBaseCandidates().flatMap(asAbsoluteGraphQLEndpoints))];
}

export function getServerGraphQLEndpointCandidates(): string[] {
  return [...new Set(getBackendBaseCandidates().flatMap(asAbsoluteGraphQLEndpoints))];
}
