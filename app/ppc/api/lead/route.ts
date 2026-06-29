import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getResend } from "@/lib/resend";

const CZ_PHONE = /^(\+420|00420)?[ ]?[1-9][0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$/;

const schema = z.object({
  phone: z.string().regex(CZ_PHONE, "Neplatné telefonní číslo"),
  name: z.string().max(120).optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  // Ad-platform click IDs — Google Ads auto-tagging (gclid/gbraid/wbraid) and
  // Meta (fbclid). These carry the real keyword/campaign attribution.
  gclid: z.string().optional(),
  gbraid: z.string().optional(),
  wbraid: z.string().optional(),
  fbclid: z.string().optional(),
  referrer: z.string().optional(),
});

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function getRatelimit(redis: Redis | null): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    prefix: "ppc_lead",
  });
}

/**
 * Failsafe persistence so a lead is never lost if Resend is down. Best-effort:
 * pushes the lead record onto a capped Redis list (LPUSH + LTRIM) and always
 * logs it structured to stdout (Vercel logs). Never throws — a failure here
 * must not break the request.
 */
async function persistLead(
  redis: Redis | null,
  record: Record<string, unknown>
): Promise<boolean> {
  // Structured stdout line — searchable in Vercel logs even with no Redis.
  console.log(`[ppc_lead] ${JSON.stringify(record)}`);
  if (!redis) return false;
  try {
    await redis.lpush("ppc_lead:log", JSON.stringify(record));
    await redis.ltrim("ppc_lead:log", 0, 999); // keep the last 1000 leads
    return true;
  } catch (err) {
    console.error("[ppc_lead] Redis persist failed:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const redis = getRedis();

  // Rate limiting — max 3 submissions per IP per 10 minutes
  const rl = getRatelimit(redis);
  if (rl) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "127.0.0.1";
    const { success } = await rl.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Příliš mnoho pokusů. Zkuste to za chvíli." },
        { status: 429 }
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 422 });
  }

  const {
    phone,
    name,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    gclid,
    gbraid,
    wbraid,
    fbclid,
    referrer,
  } = result.data;

  const notificationEmail =
    process.env.NOTIFICATION_EMAIL ?? "info@realitakbrno.cz";
  const timestamp = new Date().toISOString();

  // Failsafe first: capture the lead (Redis + stdout) before the email send,
  // so it survives even if Resend is down. Best-effort, never throws.
  const persisted = await persistLead(redis, {
    phone,
    name: name ?? null,
    timestamp,
    utm_source: utm_source ?? null,
    utm_medium: utm_medium ?? null,
    utm_campaign: utm_campaign ?? null,
    utm_content: utm_content ?? null,
    utm_term: utm_term ?? null,
    gclid: gclid ?? null,
    gbraid: gbraid ?? null,
    wbraid: wbraid ?? null,
    fbclid: fbclid ?? null,
    referrer: referrer ?? null,
  });

  let emailOk = false;
  try {
    await getResend().emails.send({
      from: "prodam@send.realitakbrno.cz",
      to: notificationEmail,
      subject: `Nový lead z nekoupimbyt.cz/ppc — ${name ? `${name}, ` : ""}${phone}`,
      text: `Nový lead z PPC stránky.

Jméno: ${name ?? "–"}
Telefon: ${phone}
Čas: ${timestamp}

— Atribuce —
UTM source: ${utm_source ?? "–"}
UTM medium: ${utm_medium ?? "–"}
UTM campaign: ${utm_campaign ?? "–"}
UTM content: ${utm_content ?? "–"}
UTM term: ${utm_term ?? "–"}
gclid: ${gclid ?? "–"}
gbraid: ${gbraid ?? "–"}
wbraid: ${wbraid ?? "–"}
fbclid: ${fbclid ?? "–"}
Referrer: ${referrer ?? "–"}`,
    });
    emailOk = true;
  } catch (err) {
    console.error("Resend error (ppc lead):", err);
  }

  // The lead is lost only if BOTH channels fail. If Redis captured it, the
  // user still gets a confirmation and Pavel can recover it from the log.
  if (!emailOk && !persisted) {
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
