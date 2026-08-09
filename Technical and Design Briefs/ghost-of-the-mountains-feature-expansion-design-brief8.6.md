# Ghost of the Mountains — Feature Expansion: Design Brief

**Companion to the Technical Brief.** These additions extend the existing site — reuse established design tokens, typography, spacing, and component styling throughout. No new visual language should be introduced. If existing color/spacing tokens or Tailwind config values aren't visible in context, check the current codebase's design token usage (existing components in `src/components/home/`) before inventing new values.

---

## Page Flow & Placement

Suggested order, integrated into the existing single-page scroll structure:

1. Hero → About → RangeMap → Habitat →
2. **[NEW] Cultural Significance** (bridges biology into human context)
3. Gallery →
4. **[NEW] Per-Country Conservation Data** (if implemented as its own section rather than a RangeMap extension)
5. ConservationCharts →
6. **[NEW] Timeline Scrubber** (pairs naturally with ThreatTimeline — consider merging or placing immediately adjacent)
7. ThreatTimeline → Facts →
8. **[NEW] "Spot the Snow Leopard" Game** (a good energy break between dense factual sections and the Knowledge Quiz — playful before testing knowledge)
9. KnowledgeQuiz → Solutions →
10. **[NEW] "How to Help Beyond Donating"** (placed before or merged with Solutions — both are action-oriented, avoid two near-duplicate CTA-style sections back to back)
11. CTA

Flag to Macallan for confirmation once a first pass is built — this ordering is a reasonable default, not a fixed requirement.

## Cultural Significance Section

- Visual treatment should feel respectful and grounded, not decorative/exoticized — avoid stock "mystical Asia" imagery clichés (incense smoke, generic Buddha silhouettes, etc.)
- Organize by region as four cards or a tabbed/accordion layout — match whichever pattern the RangeMap or existing accordion-style content already uses, for consistency
- If icons are used per region, prefer simple geographic or symbolic marks (mountain outline, compass point) over attempting to represent specific religious iconography
- The "culture → real conservation outcome" connecting paragraph (Nepal herder story) deserves visual weight — consider a pull-quote or highlighted callout treatment distinct from the standard body text, since it's the section's strongest, most concrete point

## Per-Country Conservation Data

- If extending RangeMap: keep the existing map interaction model exactly as-is, just deepen the content shown on click/expand
- If built as a standalone section: a responsive grid of 12 compact cards (country name, small conservation note, source citation) reads better than a long list — likely 3-4 columns desktop, 2 columns tablet, 1 column mobile, consistent with existing responsive card patterns elsewhere on the site
- Keep each card visually lightweight — this is reference-density content, not a section that needs heavy imagery per card

## "Spot the Snow Leopard" Game

- Visual difficulty progression should be authentic to real snow leopard camouflage (their rosette pattern genuinely blends into rocky, snow-dappled terrain) — leaning into real camouflage accuracy is both more visually interesting and reinforces an actual fact about the species, rather than arbitrary game difficulty
- Scene backgrounds should match the site's existing photography style/color grading — don't introduce a visually distinct "game mode" aesthetic that feels bolted-on
- Success state (revealing a fact) should use the same fact-card styling already established in `Facts.tsx` for consistency
- Mobile: ensure tap targets for finding the leopard are reasonably forgiving on small screens — precise pixel-hunting is frustrating on touch devices specifically

## Timeline Scrubber

- Reuse the color/style language already established in `ConservationCharts.tsx` (axis styling, tooltip treatment, color palette) so it reads as part of the same data-visualization family, not a new one
- Milestone markers should be clearly distinguishable from each other at a glance — consider subtle category coloring if it helps (e.g. legal/policy milestones vs. status changes vs. organizational founding) without overcomplicating
- Scrubber should work smoothly on both drag (desktop) and tap-through (mobile) — this is a genuinely tricky interaction to get right on touch devices, worth extra QA attention here specifically

## "How to Help Beyond Donating"

- Reuse the `Solutions.tsx` card-grid pattern directly rather than inventing new card styling
- Each external link (Snow Leopard Trust, Snow Leopard Conservancy, Panthera, GSLEP) should be clearly marked as leaving the site (external link icon or similar existing convention on the site, if one exists)
- This section's tone should read as genuinely empowering/actionable, not as a consolation prize for `/donate` not being real — avoid any copy that reads apologetic about the donate limitation; this section stands on its own merit

## Responsive Behavior (applies to all four additions)

- All new sections must match the existing site's mobile-first responsive behavior already established in prior sections — test at the same breakpoints already in use elsewhere in the codebase
- The game and timeline scrubber are the two highest-risk sections for mobile interaction issues — prioritize hands-on testing on an actual small viewport, not just browser devtools resizing

---

## Verification Checklist

- [ ] No new color values, fonts, or spacing scales introduced outside existing design tokens
- [ ] Cultural Significance section avoids exoticized/stereotypical visual treatment
- [ ] Per-country data display is scannable, not overwhelming, at all breakpoints
- [ ] Game difficulty progression reflects real camouflage patterns where feasible
- [ ] Timeline scrubber tested on both mouse-drag and touch interaction
- [ ] "How to Help" section visually distinct enough from Solutions to not feel redundant, if placed nearby
- [ ] All new sections pass the same responsive check at mobile/tablet/desktop as existing sections
