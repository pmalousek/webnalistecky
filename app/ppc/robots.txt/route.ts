import { NextResponse } from "next/server";

// Served at nekoupimbyt.cz/ppc/robots.txt (path-based, proxy.ts).
export function GET() {
  return new NextResponse("User-agent: *\nDisallow: /\n", {
    headers: { "Content-Type": "text/plain" },
  });
}
