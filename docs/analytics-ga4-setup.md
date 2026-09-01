# Ghost of the Mountains — GA4 & SEO Setup and Operational Guide

This document accompanies the implementation of the Analytics & SEO Upgrade Brief. It provides the reference specifications for configuring Google Analytics 4 (GA4) property administration, custom dimensions, key events, and search console re-indexing.

---

## 1. Event Taxonomy Implemented

All event names use `snake_case` consistent with cross-project conventions (e.g. `cta_click`, `scroll_depth`).

| Event Name | Fires When | Parameters Sent |
|---|---|---|
| `scroll_depth` | User scrolls past 25%, 50%, 75%, 100% of page height | `depth_percent` (25, 50, 75, 100) |
| `section_view` | A named section enters viewport via `IntersectionObserver` | `section_name` (`hero`, `about`, `vitals_and_size`, `per_country_data`, `habitat`, `cultural_significance`, `gallery`, `conservation_charts`, `timeline`, `threats`, `facts`, `game`, `knowledge_quiz`, `solutions`, `how_to_help`, `cta`) |
| `nav_click` | In-page navigation / anchor link clicked in navbar or menu | `destination_section` (e.g. `range_map`, `data`, `quiz`) |
| `external_link_click` | Any outbound link not intercepted by a dedicated handler | `destination_url` |
| `culture_region_expand` | User expands a region card in Cultural Significance | `region_name` (e.g. `Mongolia`, `Tibet & the Himalayas`, `Ladakh (India)`, `Central Asia & the Pamirs`) |
| `country_card_click` | User clicks a country pill in the quick-reference grid | `country_name` (e.g. `China`, `Mongolia`, `India`, `Nepal`, etc.) |
| `range_map_marker_click` | User clicks a marker pin or geographic shape on the range map | `country_name` |
| `game_start` | User clicks "Start Game" in Spot the Snow Leopard | *(none)* |
| `game_scene_complete` | User locates the camouflaged leopard in a scene | `scene_number`, `difficulty` (`easy`, `medium`, `hard`), `time_seconds` |
| `game_scene_skip` | User skips a scene or timer runs out | `scene_number`, `difficulty` |
| `game_completed` | All 3 scenes are solved in a run | `total_time_seconds`, `difficulty` |
| `timeline_milestone_click` | User selects a milestone dot or clicks Next/Prev | `milestone_year`, `milestone_label` |
| `quiz_start` | User answers or starts the knowledge quiz | *(none)* |
| `quiz_question_answered` | Each question answer is confirmed | `question_number`, `is_correct` (`true` / `false`) |
| `quiz_completed` | All questions completed and score is displayed | `score`, `total_questions` |
| `how_to_help_link_click` | User clicks any partner organization link | `organization_name`, `link_type` (`donate_page`, `volunteer_page`, `homepage`) |
| `fact_sheet_download` | User clicks to download or print the PDF fact sheet | *(none)* |
| `donate_click` | User clicks a donate button (`navbar`, `homepage_cta`, or `donate_page`) | `source_location`, `amount`, `program`, `currency` |

---

## 2. GA4 Key Events (Conversions) Configuration

In your **Google Analytics 4 Property Admin** (`Admin` → `Data display` → `Key events`):

Mark the following 5 events as **Key events**:

1. `fact_sheet_download` — Direct high-intent action showing educational adoption.
2. `how_to_help_link_click` — Outbound engagement directly connecting visitors to real partner conservation organizations.
3. `game_completed` — Deepest interactive game engagement across all habitats.
4. `quiz_completed` — Deep educational quiz completion.
5. `donate_click` — Intent indicator.

> [!CAUTION]
> **Mandatory Disclosure on `donate_click`**:
> The donation flow on the site is an educational and technical proof-of-concept; **no real payments are processed or collected**. Whenever `donate_click` numbers are reported externally or cited to stakeholders, they **must include this explicit disclosure caveat**. Never bundle or present `donate_click` with other conversion numbers without context.

---

## 3. Custom Dimensions to Register in GA4 Admin

To use parameters in standard GA4 reports and Explorations, navigate to:
**Admin → Data display → Custom definitions → Custom dimensions → Create custom dimension**:

| Dimension Name | Scope | Event Parameter | Description |
|---|---|---|---|
| Region Name | Event | `region_name` | Cultural region card expanded |
| Country Name | Event | `country_name` | Country selected on range map or quick grid |
| Scene Number | Event | `scene_number` | Active scene in Spot the Snow Leopard |
| Difficulty | Event | `difficulty` | Difficulty mode (`easy`, `medium`, `hard`) |
| Milestone Year | Event | `milestone_year` | Year of clicked conservation milestone |
| Milestone Label | Event | `milestone_label` | Name of clicked conservation milestone |
| Organization Name | Event | `organization_name` | Partner conservation organization clicked |
| Link Type | Event | `link_type` | Nature of partner link (`donate_page`, `volunteer_page`, `homepage`) |
| Section Name | Event | `section_name` | Section viewed in viewport via IntersectionObserver |
| Destination Section | Event | `destination_section` | In-page navigation anchor clicked |
| Source Location | Event | `source_location` | Location of donate button clicked |
| Depth Percent | Event | `depth_percent` | Percentage of page scrolled (25, 50, 75, 100) |

---

## 4. Structured Data (SEO Schemas)

1. **`WebSite` Schema**: Present on homepage root (`@type: WebSite`).
2. **`FAQPage` Schema**: Embedded in `Facts.tsx` detailing snow leopard facts and adaptations.
3. **`ItemList` Schema**: Embedded in `RangeMap.tsx` detailing the 12 range countries, estimated populations, and conservation initiatives.
4. **`Event` Schema**: Embedded in `HowToHelp.tsx` for the annual UN observance of *International Day of the Snow Leopard* (October 23).

---

## 5. Major Anchor Deep Links

The following deep-link anchors are available for direct linking in press releases, social shares, and conservation partner communications:

- `#cultural-significance` (alias: `#culture`) — Cultural Context & Folklore
- `#per-country-data` (alias: `#range-map`) — 12-Country Range Map & Conservation Stats
- `#timeline` — Conservation Milestones Scrubber
- `#game` (alias: `#spot-game`) — Spot the Snow Leopard Game
- `#how-to-help` — How to Help Beyond Donating
- `#quiz` — Knowledge Quiz
- `#cta` — Donation CTA & Fact Sheet Download

---

## 6. Post-Deployment Verification Checklist

1. **GA4 DebugView**:
   - Install the Google Analytics Debugger Chrome Extension or pass `?debug_mode=true`.
   - Open GA4 Admin → DebugView.
   - Verify that scrolling triggers `scroll_depth` (25%, 50%, 75%, 100%).
   - Verify that scrolling into sections fires `section_view` with exact `section_name`.
   - Test expanding cultural regions (`culture_region_expand`).
   - Test clicking country pins and buttons (`country_card_click`, `range_map_marker_click`).
   - Test the Spot the Snow Leopard game (`game_start`, `game_scene_complete`, `game_scene_skip`, `game_completed`).
   - Test the scrubber (`timeline_milestone_click`).
   - Test the quiz (`quiz_start`, `quiz_question_answered`, `quiz_completed`).
   - Test partner links (`how_to_help_link_click`).
   - Test downloading fact sheet (`fact_sheet_download`).
   - Test donate links (`donate_click`).
2. **Google Search Console**:
   - Re-submit sitemap URL: `https://ghostofthemountains.org/sitemap.xml`.
   - In GSC URL Inspection tool, request indexing for `https://ghostofthemountains.org/` and `https://ghostofthemountains.org/factsheet`.
   - Run the Rich Results Test on `https://ghostofthemountains.org/` to verify `WebSite`, `FAQPage`, `ItemList`, and `Event` structured data schemas.
