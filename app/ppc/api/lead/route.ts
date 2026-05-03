import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getResend } from "@/lib/resend";

const CZ_PHONE = /^(\+420|00420)?[ ]?[1-9][0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$/;

const schema = z.object({
  phone: z.string().regex(CZ_PHONE, "Neplatné telefonní číslo"),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  referrer: z.string().optional(),
});

function getRatelimit(): Ratelimit | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    prefix: "ppc_lead",
  });
}

export async function POST(req: NextRequest) {
  // Rate limiting — max 3 submissions per IP per 10 minutes
  const rl = getRatelimit();
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
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    referrer,
  } = result.data;

  const notificationEmail =
    process.env.NOTIFICATION_EMAIL ?? "info@realitakbrno.cz";
  const timestamp = new Date().toISOString();

  try {
    await getResend().emails.send({
      from: "prodam@send.realitakbrno.cz",
      to: notificationEmail,
      subject: `Nový lead z prodam.nekoupimbyt.cz — ${phone}`,
      text: `Nový lead z PPC stránky.

Telefon: ${phone}
Čas: ${timestamp}

UTM source: ${utm_source ?? "–"}
UTM medium: ${utm_medium ?? "–"}
UTM campaign: ${utm_campaign ?? "–"}
UTM content: ${utm_content ?? "–"}
UTM term: ${utm_term ?? "–"}
Referrer: ${referrer ?? "–"}`,
    });
  } catch (err) {
    console.error("Resend error (ppc lead):", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
