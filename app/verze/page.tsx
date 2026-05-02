import { Redis } from "@upstash/redis";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verze",
  robots: { index: false, follow: false },
};

async function getVisits(): Promise<number | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  try {
    const redis = new Redis({ url, token });
    const count = await redis.get<number>("visits");
    return count ?? 0;
  } catch {
    return null;
  }
}

export default async function VerzePage() {
  const visits = await getVisits();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans bg-white">
      {visits !== null ? (
        <p className="text-[clamp(5rem,20vw,10rem)] font-bold text-brand leading-none tabular-nums">
          {visits.toLocaleString("cs-CZ")}
        </p>
      ) : (
        <p className="text-4xl text-gray-300">–</p>
      )}
      <p className="text-sm text-gray-400 mt-6 tracking-wide uppercase">
        návštěv hlavní stránky
      </p>
      <Link
        href="/"
        className="mt-16 text-xs text-gray-300 hover:text-gray-500 transition-colors"
      >
        ← zpět
      </Link>
    </main>
  );
}
