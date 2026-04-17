import { NextRequest, NextResponse } from "next/server";
import { getBackendBaseCandidates } from "@/services/backend/config";

export async function GET(request: NextRequest) {
  const nextPath = (request.nextUrl.searchParams.get("next") || "/").trim();
  const pathParam = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;

  for (const base of getBackendBaseCandidates()) {
    try {
      const target = new URL(`${base}/login`);
      target.searchParams.set("path", pathParam);
      return NextResponse.redirect(target);
    } catch {
      // Try next backend base candidate.
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}
