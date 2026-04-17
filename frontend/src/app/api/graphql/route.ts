import { NextRequest, NextResponse } from "next/server";
import { getServerGraphQLEndpointCandidates } from "@/services/graphql/config";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const incomingCookie = request.headers.get("cookie") || "";
  const backends = getServerGraphQLEndpointCandidates();
  let lastFailedStatus = 502;
  let lastFailedBody = "";

  for (const endpoint of backends) {
    try {
      const upstream = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(incomingCookie ? { Cookie: incomingCookie } : {}),
        },
        body,
        cache: "no-store",
      });

      if (!upstream.ok) {
        lastFailedStatus = upstream.status;
        lastFailedBody = await upstream.text();
        continue;
      }

      const text = await upstream.text();
      const contentType = upstream.headers.get("content-type") || "application/json";

      return new NextResponse(text, {
        status: upstream.status,
        headers: {
          "Content-Type": contentType,
        },
      });
    } catch {
      // Try the next backend candidate.
    }
  }

  if (lastFailedBody) {
    return new NextResponse(lastFailedBody, {
      status: lastFailedStatus,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.json(
    {
      errors: [{ message: "Unable to reach backend GraphQL service" }],
    },
    { status: 502 },
  );
}

export async function GET() {
  return NextResponse.json({ message: "Use POST for GraphQL" }, { status: 405 });
}
