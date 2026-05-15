# Vercel Environment Audit Checklist — S03-CO-08b

Internal doc. Used to verify that the production environment variables in Vercel do not contain stale `realitakbrno.cz` URL fallbacks left over from the hosting transition (`realitakbrno.cz → nekoupimbyt.cz`).

Trigger: S02D02 ebook crisis (2026-05-12) — `EBOOK_DOWNLOAD_URL` in Vercel UI had been pointing at `https://realitakbrno.cz/ebook.pdf` since May 3, producing 404 links in delivery emails. Code-side fallbacks are all clean post-hotfix (c7dcf08); this checklist covers the env-layer that the code cannot see.

## 1. Env vars expected on production

Source: grep of `process.env.*` across `app/`, `lib/`, plus `.env.local.example`.

| Var | Required? | Code fallback | Purpose |
|---|---|---|---|
| `RESEND_API_KEY` | **Required** | none | Resend SDK auth (lib/resend.ts). Missing → email sends throw. |
| `KV_REST_API_URL` | Optional | `null` → feature off | Upstash Redis URL (rate limit /ppc/api/lead, /verze counter, /api/track). |
| `KV_REST_API_TOKEN` | Optional | `null` → feature off | Upstash Redis token (paired with URL). |
| `NOTIFICATION_EMAIL` | Optional | `info@realitakbrno.cz` | Inbox for lead notifications (ebook, contact, ppc lead). Fallback is the production inbox — safe. |
| `NEXT_PUBLIC_SITE_URL` | Optional | `https://nekoupimbyt.cz` | Used in `app/api/ebook/route.ts` to build the absolute link inside the delivery email. Fallback is production value — safe. |
| `EBOOK_DOWNLOAD_URL` | Optional | `/ebook.pdf` | Relative path appended to `NEXT_PUBLIC_SITE_URL`. Fallback is the production path — safe. |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Optional | `G-TD4YCWXN88` | GA4 property ID. Fallback is the actual production GA4 ID — safe. |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID` | **Required for ads** | none (fail-loud) | Google Ads conversion ID. Unset → conversion events skipped + console warning. |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | **Required for ads** | none (fail-loud) | Google Ads lead conversion label (paired with conversion ID). |
| `NEXT_PUBLIC_GOOGLE_ADS_PAGE_ENGAGEMENT_LABEL` | Optional | none | Reserved for future page-engagement event (handler not yet implemented). |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | none | Meta Pixel ID for /ppc. Unset → Meta Pixel script not rendered. |
| `NEXT_PUBLIC_SKLIK_CONVERSION_ID` | Optional | none | Sklik retargeting ID for /ppc. Unset → Sklik script not rendered. |

## 2. Fallback patterns to look for

For each env var in the Vercel Production environment, inspect the **value** for the substring `realitakbrno.cz`.

**Legit occurrences of `realitakbrno.cz` in Vercel env values:**
- `NOTIFICATION_EMAIL = info@realitakbrno.cz` — PMRE inbox (intentional).
- Anything containing `send.realitakbrno.cz` — Resend verified subdomain (intentional). The codebase only references `pavel@send.realitakbrno.cz` and `prodam@send.realitakbrno.cz` as `FROM_EMAIL` constants (hardcoded in source, not env-driven), so it's unlikely to see this in env, but if a custom `FROM_EMAIL` override exists, the `send.*` form is fine.

**Anything else containing `realitakbrno.cz` is a potential issue.** Most likely candidates:
- `NEXT_PUBLIC_SITE_URL` set to `https://realitakbrno.cz` or `https://www.realitakbrno.cz` → must be changed to `https://nekoupimbyt.cz` (or unset, code fallback handles it).
- `EBOOK_DOWNLOAD_URL` set to `https://realitakbrno.cz/ebook.pdf` → was the original S02D02 incident, was fixed to `/ebook.pdf`. Verify it's still `/ebook.pdf`.
- Any custom var (not listed above) whose value mentions `realitakbrno.cz` outside of an email signature context.

## 3. Vercel UI navigation

1. Vercel dashboard → project **webnalistecky** → **Settings** tab → **Environment Variables**
2. Filter by environment: **Production**. (Skip Preview and Development — they often contain placeholders or scratch values that don't affect production.)
3. For each row, expand the value (eye icon) and scan for the substring `realitakbrno.cz`.
4. Compare against the table in section 1 and the legit-occurrences list in section 2.

## 4. Expected outcomes

After completing sections 2–3:

- **(a) No unexpected `realitakbrno.cz` in production env values** → mark S03-CO-08b ✅ done. Document the audit pass date in this file's footer, or close the related memory entry (`project_s03_backlog_ebook_hygiene` Task 2).
- **(b) A stale `realitakbrno.cz` value found** → RCA:
  1. When was the var added/last modified? (Vercel UI shows timestamp.)
  2. Is the value still referenced anywhere? (grep the var name across the repo.)
  3. Fix the value to the `nekoupimbyt.cz` equivalent (or unset and rely on code fallback).
  4. Trigger a redeploy from main to pick up the new env. Verify the affected flow end-to-end.

## Audit log

| Date | Auditor | Outcome | Notes |
|---|---|---|---|
| (pending) | | | First audit per S03-CO-08b. |

## Test results

### S02N04 verification (PÁ 15. 5. / SO 16. 5. noc)

End-to-end verification after the P0 env naming refactor (`cd490be`).

| Test | Result | Notes |
|---|---|---|
| Vercel deploy | ✅ Ready | commit `cd490be`, fresh build (uncheck "Use existing Build Cache") |
| Console — env vars warnings | ✅ Clean | žádný `[tracking] Google Ads env vars missing` po fix Vercel project link |
| Network — `js?id=AW-18164838047` loaded | ✅ Real ID | (ne placeholder `AW-XXXXXXXXXX`) |
| Network — GA4 `page_view` | ✅ Fires | `tid=G-TD4YCWXN88`, `en=page_view` |
| Network — Google Ads `page_view` | ✅ Fires | `tid=AW-18164838047`, `en=page_view` |
| Network — `phone_click` conversion | ✅ Fires | `tid=AW-18164838047`, `en=phone_click` + 302 attribution cascade |
| Network — `qualify_lead` conversion (form submit) | ✅ Fires | `tid=AW-18164838047`, `en=qualify_lead` + 302 attribution cascade |
| Lighthouse mobile perf (3 runs) | ✅ Median 97 | run1 97, run2 97, run3 98 (≥ 95 cíl). Drop −2 vs. S02N03 baseline 99 = acceptable cost za addition Google Ads gtag.js (~150 kB). |

**Pending (next N blok):**
- Page engagement handler (scroll 75% / time 60s+) — `NEXT_PUBLIC_GOOGLE_ADS_PAGE_ENGAGEMENT_LABEL` ready in `tracking-config.ts` but no handler wired up.
- Mapping verify (events → conversion actions in Google Ads dashboard) — after LIVE + 24-48h attribution delay.
- P2 cleanup decisions: GA4 fallback policy (`G-TD4YCWXN88` hardcoded vs. Vercel env) + `NEXT_PUBLIC_SITE_URL` Shared/project dedup.
