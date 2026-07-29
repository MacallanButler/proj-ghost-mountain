# Ghost of the Mountains — SEO Follow-Up Brief (Gap Fixes)

**Context:** This is a follow-up to the initial SEO Foundation brief. The first pass covered root-level metadata, `robots.ts`, and a basic sitemap — solid, but four items from the original brief weren't completed and one decision (the `/donate` page) has been finalized. This brief covers only the remaining gaps. Don't re-touch anything already confirmed working (metadataBase, canonical URLs, OG/Twitter tags).

**Reminder — do not deploy/flip anything crawler-facing until the domain migration to `ghostofthemountains.org` is fully confirmed live.** If it's already live, disregard this note.

---

## Task 1 — Per-Page Metadata (previously missed)

Root `layout.tsx` metadata is done, but every route still inherits it identically. Home, `/conservation`, `/story`, and `/donate` need distinct titles and descriptions.

`/conservation` and `/story` are currently `"use client"` page files — metadata cannot be exported from a client component. Restructure each as:
- `page.tsx` (server component) — exports `metadata`, renders the client component
- A new client component file (e.g. `ConservationClient.tsx`, `StoryClient.tsx`) — contains the existing `"use client"` logic moved as-is, no functional changes

Metadata targets:

| Route | Title | Description focus |
|---|---|---|
| `/` (home) | "Ghost of the Mountains — Interactive Snow Leopard Conservation Experience" | Broad: snow leopard facts, habitat, conservation, interactive education |
| `/conservation` | "How to Help Snow Leopards — Conservation Programs & Impact" | Donation programs, anti-poaching, camera traps, conservation-org-facing |
| `/story` | "Survive as a Snow Leopard — Interactive Choose-Your-Path Story" | Interactive/educational, kid-friendly, gamified learning angle |
| `/donate` | "Support Snow Leopard Conservation — Ghost of the Mountains" | Fine to keep simple — page won't be indexed (see Task 2), this is a fallback for direct/social shares only |

## Task 2 — Revert `/donate` Indexing + Add Disclosure + Track Clicks

Three changes to `/donate`, all related:

**a) Revert indexing settings.** The current build set `robots.ts` to `allow: '/'` with no exclusion, and included `/donate` in `sitemap.ts` at priority 0.5. Change to:
- `robots.ts`: add `/donate` to the `disallow` array
- `sitemap.ts`: remove the `/donate` entry entirely
- Add page-level `robots: { index: false, follow: true }` in `/donate`'s metadata export as a second layer of protection, since some crawlers respect meta robots even if `robots.txt` is misconfigured or ignored

Reasoning (for context, not to implement): this is a UI-only donation form with no real payment processor behind it. We still want to measure donate-click intent as a KPI to bring to conservation orgs, but that data should come from engaged, in-context site visitors — not cold search traffic that could reasonably expect a real transaction. Keeping it unindexed protects site credibility without losing the metric.

**b) Add a disclosure line to the donate form itself.** Place directly above or below the submit/donate button in `DonationForm.tsx`, clearly visible before a user submits — not buried in fine print. Suggested copy (Antigravity: feel free to refine tone, keep the substance):

> *This is a proof-of-concept demonstration for a conservation outreach project — no payment is processed and no funds are collected.*

This should be unmissable at the point of action, not a footnote elsewhere on the page.

**c) Track the donate button click as a GA4 event.** Add a `donate_click` (or similarly named, consistent with existing event naming conventions if any are already established elsewhere in the codebase) event fired on button click/form submission attempt — this is the actual KPI data point for org outreach later. Confirm it fires correctly in GA4 DebugView before considering this done.

## Task 3 — Structured Data (JSON-LD)

Not addressed in the first pass. Add:

- **Home page:** `WebSite` schema (`name`, `url`; skip `potentialAction`/search schema since there's no site search)
- **Facts content:** The existing "Did You Know?" facts in `Facts.tsx` are already phrased as short, factual, standalone statements. Restructure a subset into an explicit FAQ-style block (visible question/answer pairing, not just decorative fact cards) and add matching `FAQPage` JSON-LD. Don't force all facts into Q&A format if some don't fit naturally — a handful of strong ones is better than forcing all of them.
- **`/story` page:** `CreativeWork` schema for the interactive narrative

Validate all JSON-LD with Google's Rich Results Test before calling this done — malformed structured data is worse than none.

## Task 4 — Image Optimization Audit

Not addressed in the first pass. `src/assets/` is ~86MB with several raw source files over 5MB uncompressed.

- Confirm every image across the site (Hero, Gallery, ThreatTimeline, RangeMap backgrounds, and the `/story` page's mapped background images specifically — these weren't confirmed in the original audit) is rendered via `next/image`, not a plain `<img>` tag or CSS `background-image`
- Set `sizes` props matched to actual rendered dimensions rather than defaulting to full-viewport assumptions where an image renders smaller
- Check `Facts.tsx`'s `quality={100}` usage — that's rarely necessary; drop to 75–85 unless there's a specific visual reason not to
- Pre-compress the largest raw source files before they hit the Next.js image pipeline if feasible, to reduce build time and payload

---

## Verification Checklist

- [ ] Home, `/conservation`, `/story` each render a unique `<title>` and meta description in actual page source (not just the metadata object — verify rendered HTML)
- [ ] `/donate` returns `noindex` in both `robots.txt` and page-level meta robots
- [ ] `/donate` is absent from `sitemap.xml`
- [ ] Disclosure line is visible on `/donate` before the button, not just in small print elsewhere
- [ ] `donate_click` GA4 event fires and is visible in DebugView
- [ ] JSON-LD present on home and `/story`, validates with no errors in Rich Results Test
- [ ] FAQ-formatted facts section is visually real content, not just schema bolted onto decorative cards
- [ ] All images confirmed running through `next/image` sitewide
- [ ] Production build (`npm run build`) completes clean with no new errors
