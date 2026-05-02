import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export async function POST() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ ok: false });
  }

  try {
    const redis = new Redis({ url, token });
    await redis.incr("visits");
  } catch {
    // Redis nedostupný – tiše ignoruj
  }

  return NextResponse.json({ ok: true });
}
