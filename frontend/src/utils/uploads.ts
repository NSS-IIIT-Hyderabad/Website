const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
const rawUploadsBase = (env?.NEXT_PUBLIC_UPLOADS_BASE_URL || "").trim();
const rawApiBase = (env?.NEXT_PUBLIC_API_URL || "").trim();

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function isLocalhostWithoutPort(value: string): boolean {
  try {
    const parsed = new URL(value);
    const isLocal = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    const hasPort = Boolean(parsed.port);
    return isLocal && !hasPort;
  } catch {
    return false;
  }
}

function normalizeBasePath(pathname: string, source: "uploads" | "api"): string {
  let path = trimTrailingSlash(pathname || "");
  if (!path || path === "/") {
    return "";
  }

  if (source === "api") {
    // API URLs may end with /graphql or /api/graphql; strip these for static file paths.
    path = path.replace(/\/(api\/graphql|graphql|api)$/i, "");
    if (!path || path === "/") {
      return "";
    }
  }

  return path;
}

function resolveAbsoluteBase(rawValue: string, source: "uploads" | "api"): string {
  if (!/^https?:\/\//i.test(rawValue)) {
    return "";
  }

  try {
    const parsed = new URL(rawValue);
    const localNoPort = isLocalhostWithoutPort(rawValue);
    if (source === "uploads" && localNoPort) {
      // Fall through to API/base fallback when uploads base is ambiguous like http://localhost.
      return "";
    }

    const origin = trimTrailingSlash(parsed.origin);
    const basePath = normalizeBasePath(parsed.pathname, source);
    return `${origin}${basePath}`;
  } catch {
    return "";
  }
}

function pickAbsoluteBase(): string {
  const uploadsAbsolute = resolveAbsoluteBase(rawUploadsBase, "uploads");
  if (uploadsAbsolute) {
    return uploadsAbsolute;
  }

  const apiAbsolute = resolveAbsoluteBase(rawApiBase, "api");
  if (apiAbsolute) {
    return apiAbsolute;
  }

  const uploadsFallback = resolveAbsoluteBase(rawUploadsBase, "uploads");
  if (uploadsFallback) {
    return uploadsFallback;
  }

  return "";
}

const absoluteBase = pickAbsoluteBase();

function resolveRuntimeDevUploadsBase(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const { protocol, hostname, port } = window.location;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";
  if (!isLocalHost) {
    return "";
  }

  if (port === "3000") {
    return `${protocol}//${hostname}:8000`;
  }

  return "";
}

function isSameOriginAsCurrentWindow(url: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}

export type UploadCategory = "members" | "events";

function buildCategoryPath(category?: UploadCategory): string {
  return category ? `/uploads/profiles/${category}` : "/uploads/profiles";
}

function looksLikeImageFilename(value: string): boolean {
  return /^[^/]+\.(png|jpe?g|webp|gif|svg)$/i.test(value);
}

export function normalizeStoredUploadPath(value?: string | null, category?: UploadCategory): string {
  const raw = (value || "").trim();
  if (!raw || raw === "No Poster URL" || raw === "-") {
    return "";
  }

  let pathLike = raw;
  if (/^https?:\/\//i.test(pathLike)) {
    try {
      pathLike = new URL(pathLike).pathname;
    } catch {
      return "";
    }
  }

  if (pathLike.startsWith("/uploads/")) {
    return pathLike;
  }

  if (pathLike.startsWith("uploads/")) {
    return `/${pathLike}`;
  }

  if (pathLike.startsWith("/profiles/")) {
    return `/uploads${pathLike}`;
  }

  if (pathLike.startsWith("profiles/")) {
    return `/uploads/${pathLike}`;
  }

  if (pathLike.startsWith("/carousel_images/")) {
    return pathLike;
  }

  if (pathLike.startsWith("carousel_images/")) {
    return `/${pathLike}`;
  }

  const trimmed = pathLike.replace(/^\/+/, "");
  if (category === "events" && looksLikeImageFilename(trimmed) && /^\d+\./.test(trimmed)) {
    return `/carousel_images/${trimmed}`;
  }

  if (trimmed === "favicon.ico") {
    return "/favicon.ico";
  }

  const identity = trimmed;
  return `${buildCategoryPath(category)}/${identity}`;
}

export function extractUploadIdentity(value?: string | null): string {
  const normalized = normalizeStoredUploadPath(value);
  if (!normalized) {
    return "";
  }

  const parts = normalized.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
}

export function extractStoredUploadPath(value?: string | null, category?: UploadCategory): string {
  const normalized = normalizeStoredUploadPath(value, category);
  if (!normalized) {
    return "";
  }

  if (normalized.startsWith("/carousel_images/") || normalized === "/favicon.ico") {
    return normalized;
  }

  const identity = extractUploadIdentity(normalized);
  if (!identity) {
    return "";
  }
  const safeCategory = category || "events";
  return `/profiles/${safeCategory}/${identity}`;
}

export function buildUploadUrl(value?: string | null, category?: UploadCategory): string {
  const normalized = normalizeStoredUploadPath(value, category);
  if (!normalized) {
    return "";
  }

  const runtimeDevBase = resolveRuntimeDevUploadsBase();

  if (normalized.startsWith("/carousel_images/") || normalized === "/favicon.ico") {
    return normalized;
  }

  if (rawUploadsBase.startsWith("/")) {
    const basePath = trimTrailingSlash(rawUploadsBase);

    if (runtimeDevBase && normalized.startsWith("/uploads/")) {
      if (!basePath || basePath === "/uploads") {
        return `${runtimeDevBase}${normalized}`;
      }
      if (normalized === basePath || normalized.startsWith(`${basePath}/`)) {
        return `${runtimeDevBase}${normalized}`;
      }
    }

    if (normalized === basePath || normalized.startsWith(`${basePath}/`)) {
      return normalized;
    }
    return `${basePath}${normalized}`;
  }

  if (runtimeDevBase && normalized.startsWith("/uploads/")) {
    if (!absoluteBase || isSameOriginAsCurrentWindow(absoluteBase)) {
      return `${runtimeDevBase}${normalized}`;
    }
  }

  if (absoluteBase) {
    return `${absoluteBase}${normalized}`;
  }

  return normalized;
}

export function buildLegacyUploadUrl(value?: string | null): string {
  const raw = (value || "").trim();
  if (!raw || raw === "No Poster URL" || raw === "-") {
    return "";
  }

  let pathLike = raw;
  if (/^https?:\/\//i.test(pathLike)) {
    try {
      pathLike = new URL(pathLike).pathname;
    } catch {
      return "";
    }
  }

  const asPath = pathLike.startsWith("/") ? pathLike : `/${pathLike}`;
  if (asPath.startsWith("/uploads/")) {
    return buildUploadUrl(asPath);
  }

  if (asPath.startsWith("/carousel_images/")) {
    return asPath;
  }

  if (asPath.startsWith("/profiles/")) {
    return buildUploadUrl(`/uploads${asPath}`);
  }

  const bare = pathLike.replace(/^\/+/, "");
  if (looksLikeImageFilename(bare) && /^\d+\./.test(bare)) {
    return `/carousel_images/${bare}`;
  }

  return buildUploadUrl(`/uploads/profiles/${pathLike.replace(/^\/+/, "")}`);
}
