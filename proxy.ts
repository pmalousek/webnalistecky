import { NextRequest, NextResponse } from "next/server";

/**
 * /ppc routing:
 *   /ppc/*                     →  serve directly (Next.js)
 *   any path with ?variant=ppc →  rewrite to /ppc/*
 *
 * Local dev: access /ppc directly (localhost:3000/ppc)
 * or append ?variant=ppc to any URL for a one-request test.
 */

const PPC_PREFIX = "/ppc";

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Already at a /ppc path — let Next.js serve it directly.
  if (pathname.startsWith(PPC_PREFIX)) {
    return NextResponse.next();
  }

  const isPPC = searchParams.get("variant") === "ppc";

  if (isPPC) {
    const url = req.nextUrl.clone();
    // / → /ppc   |   /api/lead → /ppc/api/lead
    url.pathname = PPC_PREFIX + (pathname === "/" ? "" : pathname);
    url.searchParams.delete("variant");
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on every request except Next.js internals and static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico)$).*)",
  ],
};
