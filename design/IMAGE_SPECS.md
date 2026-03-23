# TCP Variant B4 — Image Specs
**Author:** Vale
**Date:** 2026-03-17
**Status:** READY FOR GENERATION — blocked on GEMINI_API_KEY rotation (current key flagged as leaked)

---

## Blocker

`GEMINI_API_KEY` in `~/.zshrc` is flagged as leaked by Google. All API calls return 403 PERMISSION_DENIED. Brett must rotate the key before image generation can proceed. Once rotated:

1. Update `~/.zshrc` with the new key
2. Run: `cd projects/tcp-variant-b4 && node scripts/generate-guide-heroes.mjs`
3. The script generates all 15 unique hero images + 15 thumbnails and writes them to `public/images/guides/`

---

## Strategy

**Option A selected** (per sprint plan): 15 unique hero images for highest-traffic guides. Remaining 49 guides continue using 8 existing category fallback images. This is the right call — unique heroes on the pages that get clicked, category fallbacks everywhere else.

**No new category images needed.** The 8 existing category heroes (`hero-getting-started.webp`, `hero-maximize-earnings.webp`, etc.) are solid. Don't replace them.

**Image naming convention for per-guide heroes:**
- `public/images/guides/hero-{slug}.webp` — 1200x630, WebP 85
- `public/images/guides/thumb-{slug}.webp` — 400x300, WebP 80 (derived from same buffer)

**Code change required in `src/app/guides/[slug]/page.tsx`:**
Devan must update line 86 to check for per-guide hero before falling back to category image:

```tsx
// Replace line 86-87 with:
const perGuideHero = `/images/guides/hero-${frontmatter.slug}.webp`
// Note: Next.js Image will 404 if file missing — use category fallback
// Devan: implement via custom hook or static manifest check
const categoryKey = frontmatter.category ? (categoryImageMap[frontmatter.category.toLowerCase()] ?? 'getting-started') : 'getting-started'
const heroImageSrc = PER_GUIDE_SLUGS.has(frontmatter.slug) ? perGuideHero : `/images/guides/hero-${categoryKey}.webp`
```

Add at top of file:
```tsx
const PER_GUIDE_SLUGS = new Set([
  'creator-rewards-2026',
  'qualified-views-not-counting',
  'optimize-rpm',
  'grow-5k-to-10k',
  'best-ring-lights',
  'no-qualified-views',
  'rpm-dropping',
  'creativity-program-not-showing',
  'tiktok-hook-formulas',
  'tiktok-viral-formula',
  'viral-psychology',
  'monetize-beauty',
  'monetize-fitness',
  'case-study-0-to-100k',
  'creator-rewards-uk',
])
```

---

## Brand Style Anchor

All images use this base prompt prefix — copy it exactly into every generation call:

```
Flat line-art illustration. Thin uniform black outlines, consistent 1.5-2px weight throughout — no tapered strokes, no brush variation. Flat color fills only — absolutely no gradients, no shading, no drop shadows, no inner glow. Pure white background. Orange accent color #F4A261 used sparingly: one clothing item per figure maximum, and one UI element in the scene. All other clothing is black or white. Hair is solid black fill or solid orange fill, simple shapes, no detail. Character proportions: slightly stylized with head approximately 1/6 body height, simplified limbs, minimal facial detail — eyes are simple dots or small arcs, small simple smile. All objects share the same thin outline and flat fill treatment. Background props drawn in same line style but filled light gray (#F2F2F2) to recede behind foreground. Clean modern vector illustration style, similar to Blush Design or unDraw.
```

This is identical to the base prompt in `scripts/generate-images.mjs`. Do not modify it — consistency is the whole point.

---

## Part 1: Unique Hero Images — 15 High-Traffic Guides

Priority order: generate in this sequence. If generation fails partway through, the earlier ones are highest value.

---

### 1. creator-rewards-2026
**Slug:** `creator-rewards-2026`
**Category:** Core (gets-started fallback)
**Guide title:** TikTok Creator Rewards Program 2026: How It Works, What It Pays, and How to Maximize It
**Output:** `public/images/guides/hero-creator-rewards-2026.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person seated at a clean desk, holding a phone showing a simplified TikTok earnings dashboard — a large dollar amount displayed prominently, a small upward-trending line chart below it, and an orange #F4A261 "Creator Rewards" label badge at the top of the screen. Character has black hair, wears an orange #F4A261 crewneck sweatshirt and black pants. The phone screen is the focal point — oversized relative to the character to be readable. Background props (light gray): a simple desk lamp to one side, a small notebook. Mood: excited but focused — first payout moment.
```

---

### 2. qualified-views-not-counting
**Slug:** `qualified-views-not-counting`
**Category:** Troubleshooting
**Guide title:** TikTok Qualified Views Not Counting? Work Through This Diagnostic
**Output:** `public/images/guides/hero-qualified-views-not-counting.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person standing, holding a phone in both hands with a confused-but-focused expression. The phone screen shows a simplified analytics view: a bar chart where several bars are visible but one prominent bar is crossed out with a bold X mark — views that don't count. An orange #F4A261 question mark icon floats beside the screen as a graphic element (not text). Character has black hair, wears a white t-shirt and black pants. Background props (light gray): simple floating diagnostic checklist card to the right of the figure showing three checkboxes. Mood: methodical problem-solving, not panicked.
```

---

### 3. optimize-rpm
**Slug:** `optimize-rpm`
**Category:** Strategy
**Guide title:** How to Increase Your TikTok Creator Rewards RPM in 2026
**Output:** `public/images/guides/hero-optimize-rpm.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person standing beside a large freestanding display panel showing an RPM trend chart. The chart has five data points on a line — the line trends upward dramatically on the right side, ending at a peak point filled orange #F4A261 with a small upward arrow above it. Person points confidently at the peak with one finger, other hand on hip. Character has black hair, wears an orange #F4A261 blazer and black pants. Background props (light gray): a small side table with a laptop showing the same chart mirrored, small plant. Mood: confident, strategic — showing others the path to higher earnings.
```

---

### 4. grow-5k-to-10k
**Slug:** `grow-5k-to-10k`
**Category:** Growth
**Guide title:** How to Grow from 5K to 10K Followers on TikTok
**Output:** `public/images/guides/hero-grow-5k-to-10k.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person standing and looking at a large phone display (oversized, freestanding). The phone screen shows a follower count interface: "5,000" on the left side with an arrow pointing right to "10,000" in bold larger text. A simple progress bar below the numbers is half-filled in orange #F4A261. Person raises one fist slightly — quiet celebration. Character has black hair, wears a white hoodie and black pants. Background props (light gray): two small simplified person-silhouette icons floating to the right, representing new followers. Mood: milestone energy — halfway there, the finish line is visible.
```

---

### 5. best-ring-lights
**Slug:** `best-ring-lights`
**Category:** Affiliate (tools-equipment fallback)
**Guide title:** Best Ring Lights for TikTok Creators (2026)
**Output:** `public/images/guides/hero-best-ring-lights.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person standing in front of a large ring light (circular, outlined in bold black strokes, inner circle glowing with orange #F4A261 fill — the single orange accent). Person holds a phone toward the ring light, recording themselves. Simple recording indicator visible on phone screen. Character has black hair, wears a black turtleneck. Ring light is on a tall tripod stand. Background props (light gray): simplified desk to the side with a small monitor. Mood: creator setup, professional home studio feel, controlled and intentional.
```

---

### 6. no-qualified-views
**Slug:** `no-qualified-views`
**Category:** Troubleshooting
**Guide title:** Why Am I Not Getting Qualified Views on TikTok?
**Output:** `public/images/guides/hero-no-qualified-views.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person seated at a desk, holding their head in one hand in a mild "what is happening" gesture — not distressed, just puzzled. Open laptop on desk shows a simplified analytics dashboard where the "qualified views" metric displays zero (bold "0" on screen). A magnifying glass icon overlays the screen edge, outlined in black — one of the lens elements filled orange #F4A261. Character has black hair, wears a white shirt and black pants. Background props (light gray): desk lamp, small potted plant. Mood: puzzled but ready to investigate — problem-solving start.
```

---

### 7. rpm-dropping
**Slug:** `rpm-dropping`
**Category:** Troubleshooting
**Guide title:** TikTok RPM Dropping? Here's What's Actually Happening (2026)
**Output:** `public/images/guides/hero-rpm-dropping.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person standing and looking at a wall-mounted chart panel. The chart shows a line graph that rises, peaks, then drops sharply on the right side — the downward portion of the line is colored orange #F4A261 (the single orange UI element). Person tilts their head slightly, one hand raised with palm up — "why is this happening?" posture. Character has black hair, wears a white button-down and black pants. Background props (light gray): simple desk below the chart, small notebook. Mood: analytical curiosity, investigating a metric, not alarmed.
```

---

### 8. creativity-program-not-showing
**Slug:** `creativity-program-not-showing`
**Category:** Troubleshooting
**Guide title:** TikTok Creativity Program Not Showing? Here's the Full Diagnostic (2026)
**Output:** `public/images/guides/hero-creativity-program-not-showing.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person holding a phone in both hands, scrolling through a simplified TikTok-style settings menu. A "Creator Rewards" menu item is visible but grayed out — a lock icon beside it. Orange #F4A261 fills one checkmark icon on a separate floating checklist card beside the figure, representing one diagnostic step completed. Character has black hair, wears an orange #F4A261 cap and a white t-shirt and black pants. Background props (light gray): simple chair, side table. Mood: systematic — working through a checklist to find the cause.
```

---

### 9. tiktok-hook-formulas
**Slug:** `tiktok-hook-formulas`
**Category:** Strategy
**Guide title:** TikTok Hook Formulas That Drive Completion Rate (and CRP Earnings)
**Output:** `public/images/guides/hero-tiktok-hook-formulas.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person standing in front of a large cue card or teleprompter-style board. The board shows three rows of simplified text lines — each row labeled with a formula label (just abstract lines representing text, not actual words). The top formula has a star or highlight shape beside it in orange #F4A261 — the winning hook. Person holds a marker, about to underline the top formula. Character has black hair, wears an orange #F4A261 lanyard over a white shirt and black pants. Background props (light gray): filmmaking clapperboard to the side, simple tripod. Mood: workshop energy — teaching, systematizing creativity.
```

---

### 10. tiktok-viral-formula
**Slug:** `tiktok-viral-formula`
**Category:** Strategy
**Guide title:** The TikTok Viral Formula for Creator Rewards: What Actually Earns in 2026
**Output:** `public/images/guides/hero-tiktok-viral-formula.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person standing with arms slightly out — a "I figured it out" open gesture. Around them: four floating simplified card elements arranged in a loose arc — Hook, Story, Payoff, CTA (abstract lines of text, no actual words). Connecting arrows between each card show the sequence. The arrow between "Story" and "Payoff" cards is filled orange #F4A261 — the critical link. Character has black hair, wears a white t-shirt and black pants. Background props (light gray): faint chart grid behind the cards. Mood: formula revealed — structured but exciting.
```

---

### 11. viral-psychology
**Slug:** `viral-psychology`
**Category:** Strategy
**Guide title:** The Psychology of Viral TikTok Content
**Output:** `public/images/guides/hero-viral-psychology.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person sitting cross-legged on a simple chair, one finger on chin in a thinking pose. Above their head: three floating thought bubble icons arranged in a triangle — a heart shape, a repeat/loop arrow, and a share arrow. The share arrow is filled orange #F4A261 — the orange accent. Character has black hair, wears a white sweater and black pants. Background props (light gray): a simple bookshelf to one side. Mood: introspective, thoughtful — understanding what makes content spread, not surface-level.
```

---

### 12. monetize-beauty
**Slug:** `monetize-beauty`
**Category:** Niche Guide
**Guide title:** Beauty Creators: TikTok Monetization Guide
**Output:** `public/images/guides/hero-monetize-beauty.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person seated at a vanity-style desk with a ring light behind them (simplified circular outline). They hold a lipstick or makeup brush in one hand and a phone in the other — phone shows a simplified recording indicator. The ring light inner circle is filled orange #F4A261. Character has black hair pulled back, wears a white blouse and black pants. On the desk: simplified makeup items (compact, brush) as flat outlined shapes. Background props (light gray): simple vanity mirror frame, small plant. Mood: creator-as-professional — beauty content as a legitimate business.
```

---

### 13. monetize-fitness
**Slug:** `monetize-fitness`
**Category:** Niche Guide
**Guide title:** How Fitness Creators Make Money on TikTok
**Output:** `public/images/guides/hero-monetize-fitness.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person in a slight forward lunge pose (exercise position) while holding a phone showing a simplified view counter with upward arrow — recording their workout. Phone screen has a live indicator in orange #F4A261. Character has black hair pulled back, wears an orange #F4A261 sports tank top and black leggings. Background props (light gray): simplified dumbbell on the floor, yoga mat outline. Mood: fitness creator at work — movement + content creation, not posing for a stock photo.
```

---

### 14. case-study-0-to-100k
**Slug:** `case-study-0-to-100k`
**Category:** Case Study
**Guide title:** From 0 to 100K: A Creator's TikTok Journey
**Output:** `public/images/guides/hero-case-study-0-to-100k.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person standing next to a large timeline chart — a horizontal bar divided into milestones. Left end labeled with a simplified "0" badge, right end labeled with "100K" badge in bolder text. The 100K badge and the arrow connecting to it are filled orange #F4A261. Above the timeline, small icons mark key moments: phone icon, chart icon, dollar icon — abstract milestone markers. Character has black hair, stands tall with a relaxed smile, wears a white shirt and black pants. Background props (light gray): simple desk below the timeline. Mood: retrospective pride — looking back at a journey completed.
```

---

### 15. creator-rewards-uk
**Slug:** `creator-rewards-uk`
**Category:** International
**Guide title:** TikTok Creator Rewards UK: Complete 2026 Guide
**Output:** `public/images/guides/hero-creator-rewards-uk.webp` + thumb

**Prompt:**
```
[BASE_PROMPT] Scene: Person sitting at a desk with a laptop. The laptop screen shows a simplified map of the United Kingdom outline — just the coast shape, no detail — with a single location pin marker on it filled orange #F4A261. One hand on keyboard. Character has black hair, wears a white shirt and black pants. Background props (light gray): small bookshelf, coffee mug on desk. Mood: research-focused, informational — helping a specific geographic audience.
```

---

## Part 2: Inline Image Placements — Top 10 Guides

These go inside the guide body content. Placement is at the heading anchor specified. Add as `<Image>` components in the MDX at the anchor point.

**Output directory:** `public/images/guides/inline/`
**Dimensions:** 800x450 (16:9), WebP 80

**Inline prompt style:** Same BASE_PROMPT but scenes should be more diagram-oriented — show data, process steps, comparisons as illustrated concepts. Less character-focused, more information-focused.

---

### Guide: creator-rewards-2026

**Inline 1 — after "## What Are Qualified Views?"**
- **Filename:** `inline-creator-rewards-2026-qualified-views.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: Two side-by-side phone screens. Left phone labeled "Qualified" (text as abstract label lines) — a simplified video plays, viewer watches past 5-second mark shown by a progress bar reaching the midpoint, filled orange #F4A261. Right phone labeled "Not Qualified" — video progress bar barely started, viewer icon with an X mark above. Simple black outlines, flat fills. Mood: clear comparison, teaching a concept.`

**Inline 2 — after "## RPM by Niche"**
- **Filename:** `inline-creator-rewards-2026-rpm-chart.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: A horizontal bar chart showing 5 niche categories (abstract label lines, no actual text — just consistent line lengths suggesting category names). Bars vary in length — shortest on left, longest on right. The longest bar filled orange #F4A261 represents highest-earning niche. A dollar sign icon above the chart. Clean data visualization style — no people, just the chart on white background with light gray axis lines.`

---

### Guide: qualified-views-not-counting

**Inline 1 — after "## Step 1: Check Account Status"**
- **Filename:** `inline-qualified-views-diagnostic-checklist.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: A vertical checklist card (tall rectangle, black outline). Seven checklist rows — each with a checkbox on left and a short text-line placeholder on right. Top two checkboxes are filled (checked) in solid black. Third checkbox is filled orange #F4A261 (currently being checked). Remaining checkboxes are empty circles. Simple, clean, no character — just the diagnostic checklist card centered on white background.`

**Inline 2 — after "## The Most Common Cause"**
- **Filename:** `inline-qualified-views-common-cause.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: An oversized phone showing a TikTok-style video interface. The video duration bar runs 0 to 1:00. A shaded zone from 0 to :05 is filled light gray labeled "skip zone" (abstract). A shaded zone from :05 to end is white. A viewer icon appears in the skip zone with an arrow pointing left (bouncing). Orange #F4A261 accent fills a small "5 sec" marker badge. No character, just the phone and diagram elements.`

---

### Guide: optimize-rpm

**Inline 1 — after "## Niche Selection Matters More Than You Think"**
- **Filename:** `inline-optimize-rpm-niche-comparison.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: Two columns side by side. Left column: a simplified phone showing entertainment-style content (music note icon on screen). Right column: a phone showing finance/education content (dollar sign + upward arrow on screen). Below each phone: a simple dollar-per-thousand-views label (abstract text lines). The right column's RPM indicator bar is clearly taller — filled orange #F4A261. A simple "vs" separator between columns. No character.`

**Inline 2 — after "## The Search RPM Bonus"**
- **Filename:** `inline-optimize-rpm-search-bonus.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: A magnifying glass icon (large, centered) with a simplified search bar below it. Inside the magnifying glass lens: a small bar chart with one bar filled orange #F4A261 — the search-boosted RPM bar. To the right: a simple before/after comparison — two small dollar amount labels, the right one (after) is larger. Clean icon-and-chart style, no character.`

---

### Guide: grow-5k-to-10k

**Inline 1 — after "## Post Frequency vs. Post Quality"**
- **Filename:** `inline-grow-5k-post-strategy.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: A 2x2 grid (quadrant chart). Axes labeled with abstract lines (no text). Top-right quadrant shaded orange #F4A261 — the "High Quality, Consistent Frequency" zone. A small star icon in the top-right quadrant. Three other quadrants are white with light gray dashed borders. Simple axis arrows pointing right (frequency) and up (quality). Clean data visualization.`

**Inline 2 — after "## Hook Your Audience in 3 Seconds"**
- **Filename:** `inline-grow-5k-hook-anatomy.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: A horizontal video timeline strip. Three labeled zones marked by vertical dividers: Zone 1 (0-3 sec) filled orange #F4A261 — the hook, Zone 2 (3-30 sec) white — the story, Zone 3 (30+ sec) light gray — the payoff. A viewer retention line runs above the timeline, starting high, dipping slightly, then either rising or falling on the right. Simple, flat diagram. No character.`

---

### Guide: tiktok-hook-formulas

**Inline 1 — after "## The 5 Hook Formulas That Work"**
- **Filename:** `inline-hooks-formula-table.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: A structured card showing 5 rows, each representing a hook formula type. Each row has a small icon on the left (question mark, number, arrow, magnifying glass, exclamation mark — simple outlined icons) and two short abstract text lines on the right. The top row (question hook) has its icon and row border filled orange #F4A261. Clean list-card layout, no character, white background.`

---

### Guide: viral-psychology

**Inline 1 — after "## Why People Share Content"**
- **Filename:** `inline-viral-psychology-share-triggers.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: Three overlapping circle elements (Venn-diagram style, not overlapping — more like a triangle of circles connected by arrows). Each circle contains a simple icon: heart (emotion), repeat arrows (identity), share arrow (social currency). Orange #F4A261 fills the share arrow circle — the primary trigger. Connecting arrows between all three circles. Clean, icon-based concept diagram. No character.`

---

### Guide: monetize-beauty

**Inline 1 — after "## The Beauty Creator Revenue Stack"**
- **Filename:** `inline-monetize-beauty-revenue-stack.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: A stacked bar chart (single vertical bar divided into 4 colored sections). Bottom section largest (light gray — brand deals). Second section (white with black outline — affiliate). Third section (small, light gray — Creator Rewards). Top section (small, orange #F4A261 — "unlocked" layer). A vertical axis with dollar labels (abstract). The orange section has an upward arrow above it. Labels to the right of each section (abstract text lines). Clean, no character.`

---

### Guide: case-study-0-to-100k

**Inline 1 — after "## The First 10K: What Actually Worked"**
- **Filename:** `inline-case-study-growth-timeline.webp`
- **Prompt:** `[BASE_PROMPT] Diagram illustration: A horizontal growth timeline with 5 milestone markers along a curved upward path. Markers: 1K, 5K, 10K, 50K, 100K (abstract number badges). The line itself is thin black. The 100K badge and the final segment of the path approaching it are orange #F4A261. Simple milestone dots at each badge. Below each milestone: a small icon suggesting a key action (phone for first video, star for viral moment, dollar for monetization). No character.`

---

## Part 3: Calculator Page Visual Specs

### Calculator Index Page (`/calculators`)

**Current problem:** Uses v3 CSS custom properties (`var(--color-surface-warm)`). Looks like a different site. Needs a full redesign using v4 Tailwind tokens.

**Visual direction:**
- Layout: Full-width hero section + 3-card grid below
- Hero: Centered, warm white background (`bg-[#FFF7ED]`), headline + subheadline + short descriptor
- Cards: Elevated white cards with orange border-left accent, icon treatment, strong CTA button

**21st.dev component recommendation:**
Use as starting point: https://21st.dev/community/components/vaib215/pricing-table — adapt the card structure (not the tier/pricing logic). Take the card shell (border, padding, hover state, CTA button placement) and fill with calculator content.

**Hero illustration for calculator index:**

**Output:** `public/images/calculators/hero-calculator-index.webp` (1200x630)

**Prompt:**
```
[BASE_PROMPT] Scene: Person seated at a large clean desk, facing an oversized desktop monitor. The monitor screen shows three distinct calculator interface cards side by side — each with a different icon: a dollar sign, a bar chart, and a group of people icons. The active card (center) has an orange #F4A261 highlight border. Person's hands are on a keyboard. Character has black hair, wears a white shirt and black pants. Background props (light gray): clean desk surface, small plant, notebook. Mood: analytical tools at your disposal — purposeful and focused.
```

**Card icon specs (SVG, not generated images):**
Devan should use Lucide React icons directly in the card headers — no image needed for icons:
- Earnings Calculator: `Calculator` + `DollarSign` from lucide-react
- RPM Calculator: `TrendingUp` from lucide-react
- Follower Calculator: `Users` from lucide-react

**Result display enhancement:**
- Animated number counters using Magic UI Number Ticker (already in brand spec)
- Result highlight: large number in `font-extrabold text-brand-primaryDeep`, subtext in `text-text-muted`
- Add a comparison bar below result: "Your estimated monthly earnings vs. average creator" — simple horizontal bar, user's bar fills to percentage of the 100% bar, filled orange `#F4A261`

**Comparison bar component (new, custom):**
```tsx
// EarningsComparisonBar component
// Props: userValue, averageValue, label
// Renders: two labeled bars, user bar fills proportionally in orange #F4A261
// Average bar fills in light gray
// No animation required — static render after calculation
```

---

## Generation Script

Write this as `scripts/generate-guide-heroes.mjs` — separate from the existing `generate-images.mjs` so it only runs new images and does not touch the 8 existing category images.

Key parameters:
- Model: `imagen-4.0-fast-generate-001`
- Aspect ratio: `16:9` for heroes, `16:9` for inline (different dimensions via sharp)
- Hero dimensions: 1200x630
- Thumbnail dimensions: 400x300 (derived from same buffer, crop center)
- Inline dimensions: 800x450
- WebP quality: 85 for heroes, 80 for thumbnails/inline
- Skip existing files (safe to re-run)
- 500ms delay between API calls

**IMAGES array for script:**

Priority 1 (generate first — top 5 by traffic):
1. `creator-rewards-2026`
2. `qualified-views-not-counting`
3. `optimize-rpm`
4. `grow-5k-to-10k`
5. `best-ring-lights`

Priority 2 (troubleshooting guides):
6. `no-qualified-views`
7. `rpm-dropping`
8. `creativity-program-not-showing`

Priority 3 (strategy guides):
9. `tiktok-hook-formulas`
10. `tiktok-viral-formula`
11. `viral-psychology`

Priority 4 (niche + case study):
12. `monetize-beauty`
13. `monetize-fitness`
14. `case-study-0-to-100k`
15. `creator-rewards-uk`

Inline images (generate last — lower priority than heroes):
16-25. The 10 inline images listed in Part 2 above.

---

## Summary for Devan

When the API key is rotated:

1. Update `~/.zshrc` with new key, run `source ~/.zshrc`
2. Run `node scripts/generate-guide-heroes.mjs` from `projects/tcp-variant-b4/`
3. Update `src/app/guides/[slug]/page.tsx` — add `PER_GUIDE_SLUGS` set and per-guide hero lookup (code above)
4. Place inline images in MDX at specified heading anchors using `<Image>` component
5. Rebuild calculator index page using v4 tokens + 21st.dev card structure (vaib215/pricing-table)
6. Add `EarningsComparisonBar` component to calculator result display
7. Build, screenshot, submit for Bernard G4 review

**Total new images:**
- 15 unique guide heroes + 15 thumbnails = 30 files
- 10 inline images = 10 files
- 1 calculator index hero = 1 file
- **Total: 41 new image files**

**Existing category images:** Do not regenerate. The 8 existing files in `public/images/guides/hero-*.webp` are correct and serve as fallbacks for all 49+ guides without unique heroes.
