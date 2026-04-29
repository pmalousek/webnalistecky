import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "@/lib/resend";

const schema = z.object({
  email: z.string().email(),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Souhlas je povinný" }),
  }),
  marketing: z.boolean().optional(),
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

  const { email, marketing, utm_source, utm_content } = result.data;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://realitakbrno.cz";
  const ebookPath = process.env.EBOOK_DOWNLOAD_URL ?? "/ebook.pdf";
  const ebookUrl = `${siteUrl}${ebookPath}`;
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL ?? "info@realitakbrno.cz";
  const timestamp = new Date().toISOString();

  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Váš ebook + krátké úvodní slovo",
      html: `
        <p>Dobrý den,</p>
        <p>posílám Vám slíbený ebook. Stáhnete ho tady:<br>
        <a href="${ebookUrl}">${ebookUrl}</a></p>
        <p>Sepsal jsem ho proto, že prodej bytu nebo domu je u většiny
        lidí největší finanční transakce v životě, a stojí za to ji
        řešit s někým, kdo ví, co dělá. V ebooku najdete šest věcí,
        na které se vyplatí ptát ještě před podpisem smlouvy s jakoukoli
        realitkou.</p>
        <p>Když budete chtít cokoli z ebooku probrat na konkrétní situaci,
        stačí odpovědět na tento e-mail nebo zavolat na 777&nbsp;759&nbsp;590.
        Konzultace je nezávazná a zdarma.</p>
        <p>S pozdravem<br>
        Pavel Maloušek<br>
        <a href="https://www.realitakbrno.cz">realitakbrno.cz</a></p>
      `,
      text: `Dobrý den,

posílám Vám slíbený ebook. Stáhnete ho tady:
${ebookUrl}

Sepsal jsem ho proto, že prodej bytu nebo domu je u většiny
lidí největší finanční transakce v životě, a stojí za to ji
řešit s někým, kdo ví, co dělá. V ebooku najdete šest věcí,
na které se vyplatí ptát ještě před podpisem smlouvy s jakoukoli
realitkou.

Když budete chtít cokoli z ebooku probrat na konkrétní situaci,
stačí odpovědět na tento e-mail nebo zavolat na 777 759 590.
Konzultace je nezávazná a zdarma.

S pozdravem
Pavel Maloušek
realitakbrno.cz`,
    });

    await getResend().emails.send({
      from: FROM_EMAIL,
      to: notificationEmail,
      subject: `Nový stažený ebook (${email})`,
      text: `Někdo si stáhl ebook.
E-mail: ${email}
Souhlas s marketingem: ${marketing ? "ano" : "ne"}
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
