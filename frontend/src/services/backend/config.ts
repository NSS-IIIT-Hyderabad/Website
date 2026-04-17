type EnvMap = Record<string, string | undefined>;

function readEnv(name: string): string {
  const env = (globalThis as { process?: { env?: EnvMap } }).process?.env;
  return (env?.[name] || "").trim();
}

function normalizeAbsoluteBase(base: string): string {
  const trimmed = base.trim().replace(/\/$/, "");
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) {
    return "";
  }

  try {
    const parsed = new URL(trimmed);
    const cleanPath = parsed.pathname
      .replace(/\/(api\/graphql|graphql|api)$/i, "")
      .replace(/\/+$/, "");
    return `${parsed.origin}${cleanPath}`;
  } catch {
    return "";
  }
}

export function getBackendBaseCandidates(): string[] {
  const configured = [
    readEnv("BACKEND_URL"),
    readEnv("BACKEND_GRAPHQL_URL"),
    readEnv("INTERNAL_GRAPHQL_URL"),
    readEnv("NEXT_PUBLIC_API_URL"),
    readEnv("NEXT_PUBLIC_BACKEND_URL"),
  ]
    .map(normalizeAbsoluteBase)
    .filter((value): value is string => !!value);

  const defaults = [
    "http://backend-1:8000",
    "http://backend:8000",
    "http://nss-backend-dev:8000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
  ].map(normalizeAbsoluteBase);

  return [...new Set([...configured, ...defaults])];
}
