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

```ts
export const TRACKING = {
  GOOGLE_ADS_ID: 'AW-XXXXXXXXXX',          // Google Ads → Nástroje → Konverze
  GOOGLE_ADS_CONVERSION_LABEL: 'XXXXXXXX', // detail konverze
  META_PIXEL_ID: 'XXXXXXXXXX',             // Meta Business Suite → Events Manager
  SKLIK_CONVERSION_ID: 'XXXXXXX',          // Sklik → Konverze
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX',      // GA4 → Admin → Data Streams
};
```

## 7. Resend — from adresa pro PPC leady

PPC lead API posílá z `prodam@send.realitakbrno.cz`.
Doména `send.realitakbrno.cz` je ověřena v Resendu ✓ — žádné
další nastavení není potřeba.
