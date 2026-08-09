# Ghost of the Mountains — Feature Expansion: Technical Brief

**Project:** Ghost of the Mountains — Next.js 14, App Router, TypeScript, Tailwind, existing component patterns in `src/components/home/`
**Scope:** Four new content/feature additions to the existing site. No changes to existing sections, routing structure, or design system — these are additive.

1. Cultural Significance section
2. Per-Country Conservation Data (all 12 GSLEP range countries)
3. "Spot the Snow Leopard" game (multi-scene, multi-difficulty)
4. Interactive conservation timeline scrubber
5. "How to Help Beyond Donating" section

All factual content below is sourced during research for this brief — cite sources in the UI consistent with the citation pattern already established elsewhere on the site (per the prior content-expansion brief). Do not present cultural/spiritual beliefs as objective fact — frame consistently as "In [culture/tradition], the snow leopard is regarded as..." Do not add literal reproductions of sacred art (e.g. thangka paintings) — describe/reference respectfully rather than recreate specific religious imagery.

---

## Task 1 — Cultural Significance Section

New section, suggested placement after the existing "Habitat" section and before "Conservation Charts" — bridges the biological content into human/cultural context before pivoting to threats and data.

**Content, organized by region:**

**Mongolia** — In Mongolian shamanic and Tibetan Buddhist tradition, the snow leopard is regarded as a spirit animal and messenger, and is sometimes referred to as "Lord of the Mountains." Some traditions connect it to Tengri, the sky deity in Mongolian mythology. It appears frequently in traditional Mongolian art — carvings, embroidery — as a guardian figure.

**Tibet & the Himalayas** — In Tibetan Buddhist tradition, the snow leopard is viewed as a guardian of the mountains and a symbol of protection and spiritual guidance. It has historically appeared in Tibetan folk art and iconography as an emblem of resilience. This reverence has practical conservation relevance: Buddhist teachings discouraging the killing of animals have documented influence on herder tolerance of livestock predation in some communities.

**Ladakh (India)** — In Ladakhi culture, influenced by Tibetan Buddhism, the snow leopard is seen as a powerful, mystical creature symbolizing strength, grace, and independence, and as a guardian of the fragile mountain ecosystem.

**Central Asia & the Pamirs** — Known locally as "irbis" across parts of Central Asia, the snow leopard features in regional legends — among Wakhi and other communities in the Pamirs, folklore includes stories of people transforming into snow leopards. It's broadly associated with honor, strength, and luck across the region's oral traditions.

**Connecting culture to conservation (important — include this framing):** This isn't just folklore trivia. Local cultural reverence has directly shaped real conservation outcomes — for example, in November 2023, a herder in Nepal's Mustang district lost dozens of goats to a group of snow leopards in a single incident but chose not to retaliate, citing Buddhist teachings on compassion. Community-based programs (see Task 2) now formalize this by compensating herders for livestock losses, aligning economic incentive with existing cultural values.

## Task 2 — Per-Country Conservation Data (All 12 GSLEP Range Countries)

Expand beyond the current RangeMap's existing country markers into a dedicated data set covering all 12 GSLEP member countries, each with a brief, real conservation-program summary. Implementation can either extend the existing `RangeMap.tsx` click-to-reveal pattern with richer per-country data, or live as a new section (e.g. an expandable grid/accordion) — Antigravity's call on which fits the existing interaction model better, but reuse the established click/expand pattern rather than inventing a new one.

**Data set (name — brief conservation note, keep each to 1-2 sentences in final copy):**

- **Afghanistan** — Part of GSLEP since its founding; conservation work continues in the Wakhan Corridor despite significant operational challenges.
- **Bhutan** — Adopted a national Snow Leopard Conservation Action Plan (2024–2034); strong government-level commitment to protected-area management.
- **China** — Home to an estimated ~60% of the world's snow leopard habitat, the largest range share of any country; population data remains comparatively limited despite this scale.
- **India** — Runs Project Snow Leopard and the SECURE Himalaya project; completed its first-ever nationwide scientific snow leopard census (2019–2023) via the Wildlife Institute of India.
- **Kazakhstan** — Party to a regional memorandum (with Kyrgyzstan, Tajikistan, Uzbekistan) on conservation across the Western Tien Shan and Pamir-Alai.
- **Kyrgyzstan** — Hosts the GSLEP Secretariat in Bishkek; site of the original 2013 Bishkek Declaration that founded GSLEP.
- **Mongolia** — Long-running Snow Leopard Trust research project; one of the most data-rich snow leopard research programs globally, including radio-collaring studies.
- **Nepal** — Snow Leopard and Ecosystem Management Plan (2017–2026); the Snow Leopard Conservancy trains local citizen scientists to run camera-trap monitoring.
- **Pakistan** — Runs its own Snow Leopard and Ecosystem Protection Programme, focused on community-based conservation in northern mountain regions.
- **Russia** — National conservation strategy in place; among the least-studied range countries due to remote, sparsely surveyed habitat.
- **Tajikistan** — Party to GSLEP and the regional Western Tien Shan/Pamir-Alai memorandum; in process of formally joining CITES.
- **Uzbekistan** — Smallest range share among the 12, but an active GSLEP member and party to regional cross-border conservation agreements.

**Source attribution:** GSLEP, IUCN Cat Specialist Group, national conservation action plans, Snow Leopard Trust, Snow Leopard Conservancy. Cite per the site's existing citation pattern.

## Task 3 — "Spot the Snow Leopard" Game

Multi-scene, multi-difficulty hidden-object game, thematically tied to the site's existing "ghost"/camouflage framing.

**Suggested structure:**
- 3-4 scenes representing different habitat types across the range (e.g. rocky Himalayan cliffside, Mongolian steppe-mountain transition, snow-covered ridge, forested lower elevation) — reuse or lightly adapt existing gallery/hero imagery where suitable rather than requiring all-new art assets, if visually appropriate
- Difficulty levels via: leopard camouflage opacity/blending (easier = more visible outline, harder = near-perfect camouflage matching real coloration), reduced time limits at higher difficulty, or smaller click-target hitboxes
- Each scene: single hidden leopard shape (SVG or image overlay) positioned within a background image, click/tap detection within a defined hit region
- Track completion state (found/not found, time taken) in React state — no persistence needed unless a leaderboard is desired (out of scope for this pass)
- On success: reveal a real snow leopard fact (pull from existing Facts.tsx content pool or the new content from this brief) as a reward — reinforces the educational framing rather than being purely a game

**Technical notes:**
- Client component, consistent with other interactive sections already in the codebase (RangeMap, KnowledgeQuiz pattern)
- Keep asset sizes reasonable — reuse the image-optimization practices already flagged in the SEO brief (next/image, appropriate compression) rather than introducing new unoptimized large files

## Task 4 — Interactive Conservation Timeline Scrubber

Horizontal scrubber/slider showing key conservation milestones from 1975–present, replacing or supplementing the current static presentation in `ThreatTimeline.tsx` — check whether this extends that existing component or is better as a new adjacent one.

**Verified milestone data:**

| Year | Milestone |
|---|---|
| 1975 | Snow leopard listed on CITES Appendix I — highest level of international trade protection |
| 1981 | Snow Leopard Trust founded by Helen Freeman in Seattle |
| 1985/86 | Listed on Appendix I of the Convention on Migratory Species (source dates vary slightly between 1985–1986 — verify exact year before publishing) |
| 2008 | Beijing conference establishes the Snow Leopard Network, uniting global stakeholders |
| 2013 | Bishkek Declaration signed by all 12 range countries; GSLEP founded |
| 2017 | IUCN Red List status downlisted from Endangered to Vulnerable (see existing content on this site for the controversy context) |
| 2017 | Second Bishkek Declaration, "Caring for Snow Leopards and Mountains: Our Ecological Future," signed by all 12 range countries |
| 2020 | GSLEP's original "Secure 20 by 2020" landscape target evaluated and extended to 24 identified landscapes |
| 2024 | UN General Assembly formally proclaims October 23 as International Day of the Snow Leopard |
| 2024 | Samarkand Resolution adopted at the 8th GSLEP Steering Committee Meeting |

**Interaction:** draggable/clickable scrubber along the timeline; selecting a point reveals a short description of that milestone. Chart-based implementation can reuse the `recharts` patterns already in use in `ConservationCharts.tsx` for visual consistency, or a simpler custom horizontal-track component if that fits better — Antigravity's call, but match the existing visual language (colors, card styling) rather than introducing a new component style.

## Task 5 — "How to Help Beyond Donating" Section

Fills the gap left by `/donate` being an explicitly non-functional proof-of-concept — gives visitors real, legitimate actions.

**Content (real, verifiable options):**

- **Citizen science expeditions** — Organizations like Biosphere Expeditions run real paid citizen-science snow leopard field expeditions (e.g. in Kyrgyzstan, partnered with local universities and the Snow Leopard Trust) where volunteers assist with actual field research.
- **Wildlife-friendly tourism** — The Snow Leopard Conservancy India Trust's Himalayan Homestay Program (est. 2003) lets travelers stay with local families in snow leopard range areas, directly funding community-based conservation incentives.
- **International Day of the Snow Leopard** — October 23, formally recognized by the UN General Assembly in 2024. Visitors can participate in or spread awareness of this date annually.
- **Follow and support partner organizations directly** — Link out to Snow Leopard Trust, Snow Leopard Conservancy, Panthera, and GSLEP. Snow Leopard Trust specifically holds a 4-star Charity Navigator rating, worth noting as a credibility signal if linking to their actual donation page (distinct from this site's own non-functional `/donate`).
- **Community/school organizing** — Snow Leopard Trust's own "Take Action" resources suggest simple community-level actions: presentations to school groups, clubs, or local organizations to spread awareness.

Layout: reuse the existing card-grid pattern already established in `Solutions.tsx` for visual consistency rather than introducing a new grid system.

---

## Out of Scope

- Newsletter signup (deferred per Macallan's direction — not this pass)
- Any changes to `/donate` functionality itself
- Multi-language support
- Blog/article content

---

## Verification Checklist

- [ ] Cultural content attributes beliefs to specific cultures/traditions, doesn't present as objective fact
- [ ] No literal reproduction of sacred/religious art — described/referenced, not recreated
- [ ] All 12 GSLEP countries represented with accurate, sourced conservation notes
- [ ] Game has at least 3 scenes and functioning difficulty variation
- [ ] Game reveals a real fact on success (ties back to educational framing)
- [ ] Timeline scrubber includes all milestones listed above, with the 1985/86 CMS date verified and corrected before publishing
- [ ] "How to Help" section links to real, correctly-named organizations with working external links
- [ ] All new sections follow existing citation pattern for sourced facts
- [ ] Production build completes clean with no new errors
