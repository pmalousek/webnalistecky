import { NextResponse } from "next/server";

// Accessed via middleware rewrite: prodam.nekoupimbyt.cz/robots.txt → /ppc/robots.txt
export function GET() {
  return new NextResponse("User-agent: *\nDisallow: /\n", {
    headers: { "Content-Type": "text/plain" },
  });
}
