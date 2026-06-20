import { NextRequest, NextResponse } from "next/server";
import { getBackendBaseCandidates } from "@/services/backend/config";

function getBackendCandidates(): string[] {
  return [...new Set(getBackendBaseCandidates().map((base) => `${base}/uploads/profiles`))];
}

export async function POST(request: NextRequest) {
  const category = (request.nextUrl.searchParams.get("category") || "").trim().toLowerCase();
  const resolvedCategory = category === "members" || category === "events" ? category : "events";
  const formData = await request.formData();
  const incomingCookie = request.headers.get("cookie") || "";
  const backends = getBackendCandidates().map((base) => `${base}/${resolvedCategory}`);
  let lastFailedStatus = 502;
  let lastFailedBody = "";
  let lastFailedContentType = "application/json";

  for (const endpoint of backends) {
    try {
      const upstream = await fetch(endpoint, {
        method: "POST",
        headers: {
          ...(incomingCookie ? { Cookie: incomingCookie } : {}),
        },
        body: formData,
        cache: "no-store",
      });

      const text = await upstream.text();
      const contentType = upstream.headers.get("content-type") || "application/json";
      if (!upstream.ok) {
        lastFailedStatus = upstream.status;
        lastFailedBody = text;
        lastFailedContentType = contentType;
        continue;
      }

      return new NextResponse(text, {
        status: upstream.status,
        headers: {
          "Content-Type": contentType,
        },
      });
    } catch {
      // Try next backend candidate.
    }
  }

  if (lastFailedBody) {
    return new NextResponse(lastFailedBody, {
      status: lastFailedStatus,
      headers: {
        "Content-Type": lastFailedContentType,
      },
    });
  }

  return NextResponse.json(
    { error: "Unable to reach backend upload service" },
    { status: 502 },
  );
}
