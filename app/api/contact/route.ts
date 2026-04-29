import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "@/lib/resend";

const CZ_PHONE_REGEX =
  /^(\+420|00420)?[ ]?[1-9][0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$/;

const schema = z.object({
  name: z.string().min(1, "Jméno je povinné"),
  phone: z.string().regex(CZ_PHONE_REGEX, "Zadejte platné CZ telefonní číslo"),
  email: z.string().email("Zadejte platný e-mail"),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Souhlas je povinný" }),
  }),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
});

// DŮLEŽITÉ: Doména realitakbrno.cz musí být ověřena v Resend dashboardu.
// Pro testování bez ověřené domény změňte FROM_EMAIL na "onboarding@resend.dev".
const FROM_EMAIL = "Pavel Maloušek <pavel@realitakbrno.cz>";

export async function POST(req: NextRequest) {
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

  const { name, phone, email, utm_source, utm_content } = result.data;
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL ?? "info@realitakbrno.cz";
  const timestamp = new Date().toISOString();

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: notificationEmail,
      subject: `Nový kontakt z webu – ${name}`,
      text: `Jméno: ${name}
Telefon: ${phone}
E-mail: ${email}
UTM source: ${utm_source ?? "–"}
UTM content: ${utm_content ?? "–"}
Čas: ${timestamp}`,
    });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
