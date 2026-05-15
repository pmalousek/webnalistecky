# Deployment — nekoupimbyt.cz/ppc

## 1. Vercel — přidat doménu k projektu

1. Vercel dashboard → projekt **webnalistecky** → záložka **Domains**
2. Klikni **Add** → zadej `nekoupimbyt.cz/ppc`
3. Vercel zobrazí požadované DNS záznamy

## 2. Wedos — CNAME záznam

V Wedos DNS správě pro doménu `nekoupimbyt.cz` přidej:

| Typ | Název | Hodnota | TTL |
|-----|-------|---------|-----|
| `CNAME` | `prodam` | `cname.vercel-dns.com` | 3600 |

Propagace DNS: 10 min – 48 hod. Vercel automaticky vydá SSL certifikát.

## 3. Jak to funguje technicky

Middleware v `middleware.ts` detekuje hostname `prodam.*` a přepíše
URL interně z `/` na `/ppc`. Kód PPC stránky je v `app/ppc/` —
pro Vercel je to stále jeden projekt, jedna deployment.

## 4. Lokální testování

Přímý přístup (doporučeno):
```
http://localhost:3000/ppc
```

Nebo query-param fallback (jeden request):
```
http://localhost:3000/?variant=ppc
```

## 5. Env proměnné (stejné jako hlavní web)

Všechny existující env proměnné platí i pro PPC stránku.
Přidej ve Vercelu (Settings → Environment Variables), pokud chybí:

| Proměnná | Popis |
|----------|-------|
| `RESEND_API_KEY` | API klíč z resend.com |
| `NOTIFICATION_EMAIL` | Kam chodí notifikace o leadech |
| `KV_REST_API_URL` | Upstash Redis URL (rate limiting) |
| `KV_REST_API_TOKEN` | Upstash Redis token (rate limiting) |

## 6. Tracking ID — doplnit před spuštěním reklam

Soubor `lib/tracking-config.ts` obsahuje placeholdery `XXXXXXXXXX`.
Vyměň před spuštěním kampaní:

Set these `NEXT_PUBLIC_*` vars in Vercel Project Settings → Environment Variables. They are read in `lib/tracking-config.ts`:

| Vercel env var | Where to get it |
|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID` | Google Ads → Tools → Conversions → conversion detail (`AW-...`) |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Same conversion detail → conversion label |
| `NEXT_PUBLIC_GOOGLE_ADS_PAGE_ENGAGEMENT_LABEL` | Optional — page-engagement conversion label (handler TBD) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Business Suite → Events Manager |
| `NEXT_PUBLIC_SKLIK_CONVERSION_ID` | Sklik → Konverze |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 → Admin → Data Streams (fallback `G-TD4YCWXN88` if unset) |

## 7. Resend — from adresa pro PPC leady

PPC lead API posílá z `prodam@send.realitakbrno.cz`.
Doména `send.realitakbrno.cz` je ověřena v Resendu ✓ — žádné
další nastavení není potřeba.
