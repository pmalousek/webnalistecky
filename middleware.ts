import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis/cloudflare";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function middleware(req: NextRequest) {
  // Nepočítej prefetch požadavky od Next.js Linků
  if (req.headers.get("purpose") === "prefetch") {
    return NextResponse.next();
  }

  try {
    const redis = getRedis();
    if (redis) await redis.incr("visits");
  } catch {
    // Redis není dostupný – tiše pokračuj
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
