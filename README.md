# Lístečkovací web – Pavel Maloušek realitakbrno.cz

Landing page pro realitní kampaň Pavla Malouškaeta. Vytvořeno v Next.js 15 s App Routerem, TypeScriptem, Tailwind CSS, Resendem a Vercel Analytics.

---

## Obsah

1. [Lokální spuštění](#1-lokální-spuštění)
2. [Deploy na Vercel přes GitHub](#2-deploy-na-vercel-přes-github)
3. [Env proměnné ve Vercel dashboardu](#3-env-proměnné-ve-vercel-dashboardu)
4. [Ověření domény v Resendu](#4-ověření-domény-v-resendu)
5. [Výměna placeholder souborů v /public](#5-výměna-placeholder-souborů-v-public)

---

## 1. Lokální spuštění

**Požadavky:** Node.js ≥ 20, pnpm ≥ 9

```bash
# Naklonujte repo
git clone https://github.com/<vas-github-ucet>/listek-web.git
cd listek-web

# Nainstalujte závislosti
pnpm install

# Vytvořte lokální env soubor
cp .env.local.example .env.local
# → Otevřete .env.local a doplňte RESEND_API_KEY

# Spusťte vývojový server
pnpm dev
```

Web poběží na [http://localhost:3000](http://localhost:3000).

> **Bez `RESEND_API_KEY`** formuláře zobrazí chybu na straně serveru (HTTP 500).
> Formuláře jinak fungují – stránky `/dekujeme` a `/ebook-odeslan` jsou dostupné přímo.

---

## 2. Deploy na Vercel přes GitHub

1. Vytvořte GitHub repozitář a pushněte kód:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   git remote add origin https://github.com/<vas-github-ucet>/listek-web.git
   git push -u origin main
   ```
2. Přihlaste se na [vercel.com](https://vercel.com) a klikněte **Add New → Project**.
3. Importujte svůj GitHub repozitář.
4. Vercel automaticky detekuje Next.js – žádná další konfigurace build příkazu není potřeba.
5. Před prvním deploym nastavte env proměnné (viz sekce níže).
6. Klikněte **Deploy**.

Každý push do větve `main` spustí automatický redeploy.

---

## 3. Env proměnné ve Vercel dashboardu

V nastavení projektu na Vercelu (Settings → Environment Variables) přidejte:

| Proměnná | Popis | Příklad hodnoty |
|---|---|---|
| `RESEND_API_KEY` | API klíč z resend.com | `re_xxxxxxxxxxxx` |
| `NOTIFICATION_EMAIL` | Kam chodit notifikace o leadech | `info@realitakbrno.cz` |
| `EBOOK_DOWNLOAD_URL` | Cesta k PDF v /public | `/ebook.pdf` |
| `NEXT_PUBLIC_SITE_URL` | Produkční URL webu (bez lomítka na konci) | `https://www.realitakbrno.cz` |

> `NEXT_PUBLIC_SITE_URL` se vkládá do e-mailu jako prefix odkazu na ebook.
> Nastavte ji na doménu, kde skutečně web poběží.

---

## 4. Ověření domény v Resendu

Aby e-maily mohly odcházet z adresy `pavel@realitakbrno.cz`, musí být doména ověřena.

**Checklist:**

- [ ] Zaregistrujte se / přihlaste na [resend.com](https://resend.com)
- [ ] V levém menu vyberte **Domains → Add Domain**
- [ ] Zadejte `realitakbrno.cz` a klikněte **Add**
- [ ] Resend zobrazí DNS záznamy (SPF, DKIM, DMARC) – zkopírujte je
- [ ] Přidejte záznamy do DNS u registrátora domény (např. Wedos, Active24, Forpsi…)
- [ ] Vraťte se do Resendu a klikněte **Verify DNS Records**
- [ ] Počkejte na propagaci (obvykle 5–30 minut, max. 48 h)
- [ ] Status domény se změní na **Verified** ✓
- [ ] Zkopírujte API klíč (API Keys → Create API Key) a vložte ho do Vercelu jako `RESEND_API_KEY`

> **Testování bez ověřené domény:** V souboru `app/api/ebook/route.ts` a `app/api/contact/route.ts`
> změňte konstantu `FROM_EMAIL` na `"onboarding@resend.dev"`. E-maily pak půjdou přes
> Resendův testovací sender (omezeno na ověřené adresy příjemců v bezplatném plánu).

---

## 5. Výměna placeholder souborů v /public

Nahraďte placeholder soubory skutečnými před spuštěním:

### `public/pavel-foto.jpg`
- Přepište placeholder fotografií Pavla (JPG nebo WebP)
- Doporučené rozměry: cca 520 × 620 px (poměr 4:5), min. 260 × 310 px
- Soubor musí být pojmenovaný přesně `pavel-foto.jpg`

### `public/ebook.pdf`
- Přepište placeholder skutečným PDF ebooku
- Soubor musí být pojmenovaný přesně `ebook.pdf`
- Po nahrání ověřte, že je dostupný na `https://<vase-domena>/ebook.pdf`

### `public/logo.svg`
- Nahraďte placeholder SVG skutečným logem
- Soubor musí být pojmenovaný přesně `logo.svg`
- Doporučená velikost: čtvercová, min. 40 × 40 px

---

## Struktura projektu

```
/app
  layout.tsx                          – root layout + Vercel Analytics
  page.tsx                            – hlavní landing page
  dekujeme/page.tsx                   – stránka po odeslání kontaktního formuláře
  ebook-odeslan/page.tsx              – stránka po odeslání ebook formuláře
  zasady-ochrany-osobnich-udaju/      – GDPR stránka
  api/
    contact/route.ts                  – zpracování kontaktního formuláře + Resend
    ebook/route.ts                    – zpracování ebook formuláře + Resend
/components
  HeroSection.tsx
  ProcZrovnaJa.tsx
  EbookSection.tsx
  KontaktSection.tsx
  Footer.tsx
  ContactForm.tsx                     – React Hook Form + Zod
  EbookForm.tsx                       – React Hook Form + Zod
/lib
  resend.ts                           – Resend klient
  utm.ts                              – hook useUtmParams() + sessionStorage
/public
  ebook.pdf
  pavel-foto.jpg
  logo.svg
```
