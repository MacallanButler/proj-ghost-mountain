# Ghost of the Mountains — Content Expansion Brief

**Context:** The site currently covers the basics well (about, range map, habitat, gallery, threats, facts/quiz, solutions) but is thin on sourced, credible depth — no citations anywhere, no IUCN conservation status, no taxonomy, no physical stats. This brief adds that depth without changing the existing structure, visual language, or component architecture. Additions should slot into existing sections or as new sections following the same design system (existing color tokens, typography, spacing, card patterns) — no new visual direction needed.

---

## Task 1 — Add IUCN Conservation Status

**Verified facts to use (sourced during research, cite accordingly):**
- Current status: **Vulnerable** (IUCN Red List, downlisted from Endangered in 2017)
- The downlisting was contested — Snow Leopard Trust and Panthera both publicly opposed it, arguing the science didn't support removing "Endangered" status and that public perception of improvement could undercut conservation funding and urgency
- "Vulnerable" still means "facing a high risk of extinction in the wild" — not a safe status, a lesser-urgent one
- Population estimate context: earlier estimates (~4,000) are now considered approximate/outdated; more recent IUCN assessment (2024-2 Red List) places the range at 7,446–7,996 individuals total, with only 2,710–3,386 of those being mature breeding individuals — the mature-individual number is the more meaningful conservation metric and is lower than the total headline number suggests

**Implementation:**
- Add IUCN status as a 4th stat in the existing top stats row (currently `3,000m+` / `-40°C` / `<4,000`) — e.g. `Vulnerable` / `IUCN Status`
- Add a short callout (in the "Numbers" or a new subsection) explaining the 2017 downlisting controversy — this is a genuinely interesting, nuanced point, don't flatten it to just "current status: Vulnerable." The tension (orgs publicly disagreeing with IUCN) is worth 2-3 sentences of real narrative, not just a badge.
- **Population number — decision confirmed, implement as follows.** Don't replace `<4,000` with a single new number. Instead, present both figures with a brief explanation of why they differ:
  - **Total population estimate:** 7,446–7,996 individuals (most recent IUCN assessment)
  - **Mature/breeding individuals:** 2,710–3,386 — this is the figure that matters most for extinction-risk assessment, since it excludes juveniles and non-breeding adults
  - One or two sentences of explanation: earlier widely-cited estimates (~4,000, still commonly seen on other sites) predate more recent survey methodology; the current IUCN figure is higher in raw total but the *mature individual* count is the more conservation-relevant number, and it's lower than the old headline figure suggested
  - This can live as an expandable/annotated stat rather than cluttering the main hero numbers — e.g. the primary stat block keeps a single headline number (recommend using the mature-individual range, ~2,700–3,400, since it's the most conservation-accurate framing) with a small "why this number?" link/expand that reveals the full breakdown. Antigravity's call on exact UI treatment, but the fuller explanation should be genuinely reachable, not buried in a footnote nobody clicks.

## Task 2 — Add Source Citations

No stat on the current site is attributed to a source. Fix this site-wide:

- Add a small, consistent citation pattern (e.g. a subtle "Source: [Org Name]" caption under stat blocks, or a linked footnote marker) for every factual claim currently presented as a bare number — population count, `-56% since 1980`, habitat elevation range, cold tolerance, etc.
- Primary sources to cite by name where applicable: **IUCN Red List**, **Snow Leopard Trust**, **Panthera**, **GSLEP** (Global Snow Leopard & Ecosystem Protection Program)
- This isn't just credibility polish — it's a direct SEO quality signal (Google rewards sourced factual content, especially in nature/science topics) and it's the single most important thing for the site's actual goal of eventually being taken seriously by conservation orgs

## Task 3 — Add Taxonomy / Classification Block

New content, doesn't exist anywhere currently. Add as a compact block, likely near the "What Is a Snow Leopard?" section:

| Rank | Value |
|---|---|
| Kingdom | Animalia |
| Phylum | Chordata |
| Class | Mammalia |
| Order | Carnivora |
| Family | Felidae |
| Genus | Panthera |
| Species | *P. uncia* |
| Binomial name | *Panthera uncia* (Schreber, 1775) |

Note for Antigravity: snow leopards were historically classified in their own genus (*Uncia*) before genetic studies placed them in *Panthera* — worth one sentence on this if there's room, it's a nice "even scientists debated this" detail consistent with the site's existing tone.

## Task 4 — Add Physical Stats

Currently missing entirely — the site has behavioral/adaptive facts (paws, nasal cavity) but no basic vitals. Add a stat block or card set:

- Weight: roughly 22–55 kg (49–121 lbs)
- Body length: roughly 75–150 cm, plus a notably long tail — 80–105% of body length, used for balance on steep terrain and wrapped around the body for warmth while resting
- Lifespan: roughly 10–12 years in the wild, up to 20+ in captivity

*(Antigravity: verify exact figures against IUCN/Panthera sourcing before publishing — treat the ranges above as directionally correct, not final copy, since precise figures vary slightly by source.)*

## Task 5 — Expand the FAQ Section

Two of the four existing FAQ questions render without visible answer content in the current build ("Can snow leopards roar like other big cats?" and "How do snow leopards survive in extreme sub-zero temperatures?") — **verify these accordions actually expand with real answer text**, this may just be a rendering check rather than missing content, but confirm before assuming it's fine.

Add these facts if the roar question's answer isn't already substantive:
- Snow leopards **cannot roar** — unlike lions, tigers, jaguars, and leopards, their hyoid bone (a structure in the throat) isn't fully ossified, which is required for roaring. Instead, they make a range of other vocalizations including a "chuff" or "prusten" — a soft, non-threatening greeting sound made by blowing air through the nose, also seen in tigers.

Add diet/hunting content as a new FAQ entry or short section:
- Primary prey: blue sheep (bharal), Himalayan tahr, ibex, and other mountain ungulates, supplemented by smaller mammals like marmots when needed
- Hunting style: ambush predators — stalk from above using rocky terrain for cover, then pursue in a short, explosive chase (this connects to the existing "50-foot leap" fact, which currently stands alone with no context for *why* that ability matters)

## Task 6 — Interactive Additions

In priority order (effort vs. payoff):

**a) Size comparison element** — visual/interactive comparison of a snow leopard against a house cat and an adult human, using the physical stats from Task 4. Slider or scroll-triggered reveal, matching existing interaction patterns already used elsewhere on the site (e.g. the range map's click-to-reveal pattern).

**b) Audio: the "chuff" vocalization** — if a royalty-free or properly licensed audio clip of snow leopard vocalization can be sourced, add a simple play button tied to the roar/vocalization FAQ answer. This is genuinely rare content most snow leopard sites don't include — strong differentiator. If no clean-license audio is available, skip rather than use anything of uncertain rights.

**c) Camera-trap-style photo reveal** — leans into the existing "ghost" branding: an image mostly obscured/camouflaged that reveals on hover or tap, reinforcing the elusiveness theme already present in copy ("ghosts of the mountains," "documenting the elusive presence"). Could live in the existing Gallery section as an added interactive card rather than a whole new section.

**d) Downloadable one-page fact sheet (PDF)** — a printable summary combining taxonomy, physical stats, IUCN status, and key threats. Positions the site as a real educational resource for teachers/classrooms, and is a natural, legitimate reason for external sites (school resource pages, blogs) to link to it — the strongest realistic backlink opportunity currently missing from the site.

**e) Expand quiz question pool** — the quiz UI shows "Question 1 of 50 correct" which implies a larger question bank exists behind the scenes. Confirm it's actually pulling varied questions across taxonomy, diet, threats, and geography (not just repeating population-count-style questions), and expand using the new content from this brief as additional question material once it's live.

---

## Out of Scope

- No changes to overall visual design, color system, or typography — this is content depth, not a redesign
- No changes to the `/donate`, `/conservation`, or `/story` routes — those were covered in prior briefs
- Audio/video content only if cleanly licensed — do not use anything of uncertain rights

---

## Verification Checklist

- [ ] IUCN status ("Vulnerable") visible in the top stats row, with the 2017 downlisting context included as a short callout
- [ ] Both population figures (7,446–7,996 total / 2,710–3,386 mature) are shown with a clear explanation of the difference — not a single silently-swapped number
- [ ] Every stat on the site has a visible source citation
- [ ] Taxonomy block added and accurate
- [ ] Physical stats (weight, length, tail, lifespan) added and verified against sourcing
- [ ] All four FAQ accordion answers confirmed rendering real content
- [ ] Roar/vocalization and diet/hunting facts added
- [ ] At least the size-comparison interactive (Task 6a) implemented; others included if time allows
- [ ] Production build completes clean with no new errors
