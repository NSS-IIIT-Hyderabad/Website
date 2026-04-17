import { NextResponse } from "next/server";
import { getBackendBaseCandidates } from "@/services/backend/config";

type ProbeResult = {
  ok: boolean;
  endpoint: string;
  status?: number;
  message?: string;
};

function isReachableStatus(status: number): boolean {
  return status >= 200 && status < 500;
}

async function safeFetch(
  input: string,
  init: RequestInit,
  timeoutMs = 3500,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function probeHealth(base: string): Promise<ProbeResult> {
  const endpoint = `${base}/health`;
  try {
    const response = await safeFetch(endpoint, { method: "GET" });
    return {
      ok: response.ok,
      endpoint,
      status: response.status,
      message: response.ok ? "ok" : "health endpoint returned non-200",
    };
  } catch (error) {
    return {
      ok: false,
      endpoint,
      message: error instanceof Error ? error.message : "health probe failed",
    };
  }
}

async function probeGraphQL(base: string): Promise<ProbeResult> {
  const endpoint = `${base}/graphql`;
  try {
    const response = await safeFetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: "query { __typename }" }),
    });

    return {
      ok: response.ok,
      endpoint,
      status: response.status,
      message: response.ok ? "ok" : "graphql endpoint returned non-200",
    };
  } catch (error) {
    return {
      ok: false,
      endpoint,
      message: error instanceof Error ? error.message : "graphql probe failed",
    };
  }
}

async function probeUploads(base: string): Promise<ProbeResult> {
  const endpoint = `${base}/uploads/profiles/events`;
  try {
    const formData = new FormData();
    const response = await safeFetch(endpoint, {
      method: "POST",
      body: formData,
    });

    return {
      ok: isReachableStatus(response.status),
      endpoint,
      status: response.status,
      message: isReachableStatus(response.status)
        ? "reachable"
        : "uploads endpoint returned server error",
    };
  } catch (error) {
    return {
      ok: false,
      endpoint,
      message: error instanceof Error ? error.message : "uploads probe failed",
    };
  }
}

export async function GET() {
  const backendBases = getBackendBaseCandidates();

  if (!backendBases.length) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        message: "No backend candidates available",
      },
      { status: 503 },
    );
  }

  for (const base of backendBases) {
    const [health, graphql, uploads] = await Promise.all([
      probeHealth(base),
      probeGraphQL(base),
      probeUploads(base),
    ]);

    if (health.ok && graphql.ok && uploads.ok) {
      return NextResponse.json(
        {
          status: "healthy",
          timestamp: new Date().toISOString(),
          backendBase: base,
          probes: {
            health,
            graphql,
            uploads,
          },
          candidates: backendBases,
        },
        { status: 200 },
      );
    }
  }

  const diagnostics = await Promise.all(
    backendBases.map(async (base) => {
      const [health, graphql, uploads] = await Promise.all([
        probeHealth(base),
        probeGraphQL(base),
        probeUploads(base),
      ]);
      return { base, probes: { health, graphql, uploads } };
    }),
  );

  return NextResponse.json(
    {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      message: "No backend candidate passed all probes",
      diagnostics,
    },
    { status: 503 },
  );
}
