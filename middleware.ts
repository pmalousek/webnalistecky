import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.headers.get("purpose") === "prefetch") {
    return NextResponse.next();
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (url && token) {
    // Fire-and-forget – neblokuje načtení stránky
    fetch(`${url}/incr/visits`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
