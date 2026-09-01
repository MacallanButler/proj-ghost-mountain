# Ghost of the Mountains — Analytics & SEO Upgrade Brief

**Context:** With the feature expansion (Cultural Significance, Per-Country Data, Spot-the-Snow-Leopard game, Timeline Scrubber, How to Help Beyond Donating) landing, this brief covers two things: (1) a full GA4 event taxonomy so we can actually see which features get traction and which don't, and (2) incremental SEO additions specific to the new content. This follows the same event-naming convention already established on macallanbutler.com (snake_case, e.g. `cta_click`, `scroll_depth`) for consistency across projects.

No new routes are being added — all new features are sections within the existing single-page site, so no new per-page metadata/sitemap entries are needed for this pass.

---

## Part 1 — GA4 Event Taxonomy

### Engagement / navigation (site-wide)

| Event name | Fires when | Parameters |
|---|---|---|
| `scroll_depth` | User reaches 25%, 50%, 75%, 100% of page | `depth_percent` |
| `section_view` | A named section enters viewport (use Intersection Observer) | `section_name` (e.g. `cultural_significance`, `timeline`, `game`) |
| `nav_click` | Any in-page nav/anchor link clicked | `destination_section` |
| `external_link_click` | Any outbound link not covered by a more specific event below | `destination_url` |

`section_view` is the one to prioritize — it directly answers "which features are people actually reaching," independent of whether they interact further. Without it, low engagement on a feature could just mean nobody scrolled that far, which is a very different problem than "they saw it and ignored it."

### Cultural Significance section

| Event name | Fires when | Parameters |
|---|---|---|
| `culture_region_expand` | User expands/opens a region card (Mongolia, Tibet & Himalayas, Ladakh, Central Asia) | `region_name` |

Tells us which cultural region resonates most — useful both for future content decisions and as a genuinely interesting stat to mention to conservation orgs ("most-viewed cultural region was X").

### Per-Country Conservation Data

| Event name | Fires when | Parameters |
|---|---|---|
| `country_card_click` | User clicks/expands a specific country's data | `country_name` |
| `range_map_marker_click` | Existing RangeMap marker interaction (add tracking if not already present — check first) | `country_name` |

This is a strong candidate for a genuinely useful stat: which range countries draw the most visitor interest. Worth cross-referencing against real-world funding gaps later (e.g. if Afghanistan or Russia get high interest despite being under-resourced in real conservation coverage, that's a notable finding).

### "Spot the Snow Leopard" Game

| Event name | Fires when | Parameters |
|---|---|---|
| `game_start` | User begins the game | — |
| `game_scene_complete` | A scene's leopard is found | `scene_number`, `difficulty`, `time_seconds` |
| `game_scene_skip` | User skips/gives up on a scene, if that option exists | `scene_number`, `difficulty` |
| `game_completed` | All scenes finished | `total_time_seconds`, `difficulty` |

Scene-level tracking matters more than just "game completed" — if most users drop off after scene 1, that tells you the difficulty curve or the concept itself needs adjusting, which a single completion event would hide entirely.

### Timeline Scrubber

| Event name | Fires when | Parameters |
|---|---|---|
| `timeline_milestone_click` | User selects a specific milestone on the scrubber | `milestone_year`, `milestone_label` |

### Knowledge Quiz (existing feature, add tracking if not already present — check first)

| Event name | Fires when | Parameters |
|---|---|---|
| `quiz_start` | Quiz begins | — |
| `quiz_question_answered` | Each question answered | `question_number`, `is_correct` |
| `quiz_completed` | Quiz finished | `score`, `total_questions` |

### "How to Help Beyond Donating"

| Event name | Fires when | Parameters |
|---|---|---|
| `how_to_help_link_click` | Click on any partner org link (Snow Leopard Trust, Snow Leopard Conservancy, Panthera, GSLEP) | `organization_name`, `link_type` (e.g. `donate_page`, `volunteer_page`, `homepage`) |
| `fact_sheet_download` | PDF fact sheet download clicked | — |

`fact_sheet_download` and `how_to_help_link_click` are arguably the two most meaningful metrics on the whole site — they measure people taking a real, honest action, unlike the donate button which is explicitly non-functional. Prioritize getting these right.

### Donate (already scoped in a prior brief — included here for completeness)

| Event name | Fires when | Parameters |
|---|---|---|
| `donate_click` | Donate button clicked (homepage CTA or `/donate` page) | `source_location` (e.g. `homepage_cta`, `donate_page`) |

---

## Part 2 — Which Events to Mark as GA4 Key Events

GA4's "Key events" (formerly "conversions") should be:

- `fact_sheet_download` — real, meaningful action, strongest single proof-point for outreach
- `how_to_help_link_click` — real engagement with actual conservation orgs
- `game_completed` — deepest level of interactive engagement
- `quiz_completed` — same, for the quiz
- `donate_click` — useful as an intent signal, but **any external reporting of this number must include the disclosure caveat** (it's a non-functional proof-of-concept button) — don't present it alongside the other key events without that context, since doing so would misrepresent what it measures.

## Part 3 — Custom Dimensions to Register

GA4 requires registering event parameters as custom dimensions before they're usable in standard reports (not just Explorations). Register at minimum:

- `region_name`, `country_name`, `scene_number`, `difficulty`, `milestone_year`, `organization_name`, `section_name`

## Part 4 — SEO Additions for the New Content

- **`ItemList` schema for the 12-country conservation data section** — a genuinely valid, well-fitting structured data type for this content (a real, itemized list of countries with descriptions). Add alongside the existing `FAQPage` and `WebSite` schema already on the site.
- **`Event` schema for International Day of the Snow Leopard (October 23)** — this is a recurring annual real-world event mentioned in the "How to Help" section, and `Event` schema is a legitimate fit here (unlike trying to force schema onto the game, which doesn't map cleanly to any schema.org type — skip forcing it there).
- **Add anchor IDs to each major section** (`#cultural-significance`, `#per-country-data`, `#timeline`, `#game`, `#how-to-help`) if not already present — enables direct deep-linking to specific sections, useful both for UX and for pointing conservation orgs or press directly at the most relevant part of the site rather than the homepage generally.
- **Update `lastmod` values in `sitemap.ts`** to reflect this content update — confirm the current implementation generates this dynamically at build time rather than using a hardcoded date (worth a quick check given how much content is being added in this pass).
- **Re-submit the sitemap and request re-indexing in GSC** after this deploys — substantial new content is worth prompting a fresh crawl rather than waiting on Google's own schedule.
- **Alt text for any new imagery** (game scene backgrounds, cultural section visuals) should be specific and non-generic from the start — avoid repeating the earlier "Mountain landscape at sunset" duplication issue.

---

## Verification Checklist

- [ ] All events listed above fire correctly, confirmed in GA4 DebugView before considering this done
- [ ] Custom dimensions registered in GA4 admin for all listed parameters
- [ ] Key events marked as specified, with `donate_click` excluded from any external reporting that doesn't include its disclosure context
- [ ] `section_view` uses Intersection Observer (or equivalent) rather than scroll-position math, for reliability across screen sizes
- [ ] `ItemList` and `Event` schema added and validated with Google's Rich Results Test
- [ ] Anchor IDs present and functional on all major sections
- [ ] Sitemap `lastmod` confirmed dynamic, not hardcoded
- [ ] Sitemap re-submitted and homepage re-indexing requested in GSC after deploy
- [ ] New images have specific, non-generic alt text
- [ ] Production build completes clean with no new errors
