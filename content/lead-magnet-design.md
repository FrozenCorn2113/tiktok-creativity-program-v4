# Lead Magnet PDF Design Spec: TikTok Creator Rewards Cheat Sheet

**Prepared by:** Vale
**Date:** 2026-03-23
**Content source:** `projects/tiktok-creativity-program/content/lead-magnet-cheat-sheet.md`
**Brand source:** `projects/tiktok-creativity-program/BRAND.md` v2.0
**Audience for this spec:** Devan (implementation)

---

## Format and Dimensions

- **Format:** PDF, generated programmatically (React-PDF, Puppeteer, or equivalent)
- **Page size:** US Letter (8.5 x 11 in / 612 x 792 pt)
- **Orientation:** Portrait
- **Estimated length:** 14-16 pages
- **Bleed:** None (digital-only distribution, no print)
- **Margins:** 0.75in top/bottom, 0.875in left/right (ensures comfortable reading on screens and if printed)

---

## Color Palette (from TCP BRAND.md)

All colors pulled directly from the established brand system. No additions.

| Role | Color | Hex |
|---|---|---|
| Primary accent | Brand Orange | `#F4A261` |
| Dark accent (hover, emphasis) | Orange Dark | `#E58B3A` |
| Soft accent (backgrounds, callouts) | Orange Soft | `#FFE9D5` |
| Primary text | Ink | `#111827` |
| Display headings | Ink Strong | `#0B0F1A` |
| Secondary text | Text Muted | `#475467` |
| Fine print, captions | Text Subtle | `#667085` |
| Page background | White | `#FFFFFF` |
| Section backgrounds, callout fills | Warm White | `#FFF7ED` |
| Featured callout backgrounds | Surface Muted | `#FFF1E6` |
| Table inset, input fields | Surface Inset | `#F9EDE1` |
| Borders, dividers | Border | `#EADFD3` |
| Table borders, strong dividers | Border Strong | `#DFD1C4` |
| Success/check indicators | Success Green | `#12B76A` |
| Warning indicators | Warning Amber | `#F79009` |
| Error/avoid indicators | Error Red | `#F04438` |

**WCAG rule carries forward:** Dark ink text on orange backgrounds. Never white on orange.

---

## Typography

### Font Stack

**Primary: Manrope** -- embedded in the PDF via Google Fonts TTF files.
**Mono: JetBrains Mono** -- for formula displays, earnings figures, and calculator references.

Devan must embed the font files directly in the PDF renderer. Google Fonts web imports do not work in PDF generation -- download the TTF/WOFF2 files and reference them locally.

### Type Scale (PDF-specific)

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| Cover Title | 48pt | 800 | 1.1 | Cover page main title only |
| Cover Subtitle | 18pt | 400 | 1.4 | Cover page subtitle |
| Section Title (H1) | 28pt | 700 | 1.2 | Section headings (numbered sections) |
| Subsection (H2) | 20pt | 700 | 1.25 | Subsection headings within sections |
| Subhead (H3) | 16pt | 600 | 1.3 | Third-level headings, card titles |
| Body | 11pt | 400 | 1.65 | All prose content |
| Body Bold | 11pt | 700 | 1.65 | Inline emphasis, key terms |
| Small | 9.5pt | 400 | 1.5 | Captions, table footnotes, metadata |
| Caption | 8pt | 500 | 1.4 | Page numbers, fine print, disclaimers |
| Mono Data | 12pt | 500 | 1.3 | Formula display, earnings figures |
| Table Cell | 10pt | 400 | 1.4 | Table body text |
| Table Header | 10pt | 700 | 1.4 | Table column headers |

### Tracking

- Cover Title: -0.02em (tight)
- Section Title: -0.01em (slightly tight)
- Body and below: 0 (default)

---

## Page Architecture

The PDF has four page types. Every page uses the same margin structure and footer.

### Page Type 1: Cover

Full-page branded cover. No photography. Typography-first with geometric brand elements.

```
+--------------------------------------------------+
|                                                  |
|  [TCP wordmark - top left, Manrope 800, 14pt]   |
|  [tiktokcreativityprogram.com]                   |
|                                                  |
|                                                  |
|                                                  |
|  THE TIKTOK                                      |
|  CREATOR REWARDS                                 |
|  CHEAT SHEET                                     |
|  [Cover Title, 48pt, Ink Strong #0B0F1A]         |
|                                                  |
|  [Horizontal rule: 80px wide, 3px,               |
|   Brand Orange #F4A261]                          |
|                                                  |
|  Everything you need to start earning            |
|  from TikTok Creator Rewards                     |
|  [Cover Subtitle, 18pt, Text Muted #475467]      |
|                                                  |
|                                                  |
|  [Geometric accent: bottom-right corner,         |
|   abstract angular shapes in Orange Soft          |
|   #FFE9D5 and Brand Orange #F4A261,              |
|   purely decorative, no text, no icons]          |
|                                                  |
|  A free guide from                               |
|  tiktokcreativityprogram.com                     |
|  [Small, 9.5pt, Text Subtle #667085,             |
|   bottom-left, 0.75in from bottom]               |
+--------------------------------------------------+
```

**Cover design rules:**
- Background: White `#FFFFFF`
- Title aligned left, positioned in the vertical center of the page (approximately 40% from top)
- Title lines stacked, each on its own line. All caps for "THE TIKTOK" and "CREATOR REWARDS" -- mixed case for "Cheat Sheet" to create visual rhythm
- The horizontal accent rule sits 16pt below the last title line
- Subtitle sits 20pt below the accent rule
- Geometric corner accent: two overlapping angular shapes (parallelogram or chevron forms) in the bottom-right quadrant, extending to the page edge. One shape in `#FFE9D5`, one in `#F4A261` at 40% opacity. These are CSS/SVG shapes, not images. They provide visual weight without illustration.
- No photography, no illustration, no stock imagery
- The TCP wordmark is text-only: "TCP" in Manrope 800 + the full URL below it in Manrope 400 9.5pt

### Page Type 2: Section Opener

Used for each of the 7 main sections. The section number and title get prominent treatment.

```
+--------------------------------------------------+
|  [Running header - see footer spec]              |
|                                                  |
|  [Section number in large format]                |
|  01                                              |
|  [72pt, Manrope 800, Brand Orange #F4A261,       |
|   0.6 opacity]                                   |
|                                                  |
|  QUICK-START CHECKLIST                           |
|  [Section Title, 28pt, Ink Strong, all caps,     |
|   tracking -0.01em]                              |
|                                                  |
|  [2px horizontal rule, full content width,       |
|   Border #EADFD3]                                |
|                                                  |
|  [Section intro text begins here, Body 11pt]     |
|  ...                                             |
|                                                  |
|  [Page number - bottom center]                   |
+--------------------------------------------------+
```

**Section opener rules:**
- Section numbers displayed as two digits with leading zero: 01, 02, 03... 07
- The large number sits above the section title, creating a clear hierarchy
- A full-width horizontal rule (content-width, not margin-to-margin) separates the header block from the body content
- Section intro paragraph begins directly after the rule
- If section content continues to subsequent pages, those pages use Page Type 3

### Page Type 3: Content Page (standard)

The workhorse layout. All body content, tables, callouts, and visuals sit on this page type.

```
+--------------------------------------------------+
|  [Running header]                                |
|  TCP Cheat Sheet | Section Name     Page X of Y  |
|  [8pt, Manrope 500, Text Subtle, separated by    |
|   thin border line below]                        |
|                                                  |
|  [Content area - full width between margins]     |
|                                                  |
|  Body text, 11pt Manrope 400, #111827            |
|  Line height 1.65, paragraph spacing 12pt        |
|                                                  |
|  [Visual zone - when applicable]                 |
|                                                  |
|  More body text...                               |
|                                                  |
|  [Page number - bottom center]                   |
|  [X]                                             |
|  [8pt, Manrope 500, Text Muted]                  |
+--------------------------------------------------+
```

**Content page rules:**
- Running header on every page except the cover
- Running header format: "TCP Cheat Sheet" (left) + section name (center) + "Page X of Y" (right)
- Running header text: 8pt Manrope 500, `#667085`, with a 1px `#EADFD3` line below, 8pt gap before content
- Page numbers bottom-center, 8pt Manrope 500, `#475467`
- Paragraph spacing: 12pt between paragraphs
- First paragraph after a heading: no extra top spacing (heading bottom-margin handles it)
- Heading spacing: H2 gets 28pt above, 10pt below. H3 gets 20pt above, 8pt below

### Page Type 4: Back Cover / Footer Page

Final page. Clean close with branding and legal.

```
+--------------------------------------------------+
|                                                  |
|                                                  |
|                                                  |
|  [Centered block, vertical middle]               |
|                                                  |
|  TCP                                             |
|  [Manrope 800, 24pt, Ink Strong]                 |
|                                                  |
|  tiktokcreativityprogram.com                     |
|  [Manrope 400, 14pt, Brand Orange #F4A261]       |
|                                                  |
|  [24pt gap]                                      |
|                                                  |
|  The most complete TikTok Creator                |
|  Rewards resource on the internet.               |
|  [Manrope 400, 12pt, Text Muted, italic]         |
|                                                  |
|                                                  |
|  [Bottom of page]                                |
|  [Disclaimer text, 8pt, Text Subtle,             |
|   centered, max-width 80%]                       |
|  [Copyright line, 8pt]                           |
+--------------------------------------------------+
```

---

## Visual Treatment for the 9 Placeholder Zones

Each `[VISUAL]` marker in the content maps to a specific design treatment. No photography. No generated illustrations for the PDF (the TCP illustration set is for the website). Instead, use typographic treatments, geometric shapes, and structured layouts to create visual interest.

### VISUAL 1: Cover Page
**Location:** Page 1 (full page)
**Treatment:** See Page Type 1 spec above. The entire cover IS the visual.

### VISUAL 2: Checklist Graphic (Section 1)
**Location:** Section 1 "Quick-Start Checklist," immediately after the intro paragraph
**Treatment:** Styled checklist card

```
+------------------------------------------+
| [Warm White #FFF7ED background card]     |
| [2px left border, Brand Orange #F4A261]  |
| [16pt padding all sides]                 |
|                                          |
|  [ ] Personal account (not Business)     |
|  [ ] 10,000+ followers                   |
|  [ ] 100,000+ video views (last 30 days) |
|  [ ] Age 18+                             |
|  [ ] Located in an eligible country      |
|                                          |
|  [Each row: 13pt Manrope 500, #111827]   |
|  [Checkbox: 14x14px square, 2px border   |
|   #EADFD3, rounded 2px corners,          |
|   empty (unchecked state)]               |
|  [Row spacing: 14pt between items]       |
+------------------------------------------+
```

The checkboxes are intentionally empty -- this is a fillable-feel design encouraging the reader to mentally (or physically, if printed) check off each requirement.

### VISUAL 3: Formula Graphic (Section 2)
**Location:** Section 2 "The Money Math," after the RPM explanation
**Treatment:** Centered formula display with mono typography

```
+------------------------------------------+
| [Surface Muted #FFF1E6 background,       |
|  full content width, 24pt vertical        |
|  padding, 20pt horizontal padding]       |
|                                          |
|  Qualified Views                         |
|  -------------- x RPM = Your Earnings   |
|       1,000                              |
|                                          |
|  [JetBrains Mono 500, 16pt, #0B0F1A]    |
|  [Division bar: 2px #E58B3A]             |
|  ["Your Earnings" in Brand Orange        |
|   #F4A261, bold]                         |
+------------------------------------------+
```

Render the formula as a proper fraction layout, not inline text. The division bar is a horizontal line. "Qualified Views" above the bar, "1,000" below it, then "x RPM = Your Earnings" to the right at the vertical center. Center the entire formula block horizontally.

### VISUAL 4: Numbered Strategy Icons (Section 3)
**Location:** Section 3 "Seven Ways to Get More Qualified Views," before the first strategy
**Treatment:** Horizontal strip of 7 numbered circles

```
+------------------------------------------+
| [Full content width, 20pt vertical pad]  |
|                                          |
|  (1)  (2)  (3)  (4)  (5)  (6)  (7)     |
|                                          |
|  [Each circle: 36px diameter]            |
|  [Fill: Brand Orange #F4A261]            |
|  [Number: Manrope 700, 14pt, #0B0F1A]   |
|  [Even horizontal spacing between]       |
|  [Below each: abbreviated label,         |
|   8pt Manrope 500, Text Muted,           |
|   max 2 lines, centered under circle]    |
+------------------------------------------+
```

Abbreviated labels (one per circle):
1. Hook Fast
2. 60+ Seconds
3. Search SEO
4. Peak Timing
5. Smart Captions
6. Saves > Likes
7. Stay Original

### VISUAL 5: World Map / RPM Tiers (Section 4)
**Location:** Section 4 "Content Types That Earn the Most," after the geography RPM table
**Treatment:** Abstract tier visualization (no actual map -- maps are complex to render and rarely look good in programmatic PDFs)

```
+------------------------------------------+
| [Warm White #FFF7ED background card,     |
|  full content width, 20pt padding]       |
|                                          |
|  RPM BY AUDIENCE GEOGRAPHY               |
|  [H3 style, 12pt Manrope 700, all caps,  |
|   Text Muted, 4pt letter-spacing]        |
|                                          |
|  [Four horizontal bars, stacked]         |
|                                          |
|  TIER 1  US, UK, CA, AU                  |
|  [==============================] $0.75+ |
|  [Bar: Brand Orange #F4A261, full width] |
|                                          |
|  TIER 2  DE, FR, JP, KR                  |
|  [====================]          $0.50+  |
|  [Bar: Orange Soft #FFE9D5, 66% width]   |
|                                          |
|  TIER 3  MX, BR                          |
|  [===========]                   $0.20+  |
|  [Bar: Surface Inset #F9EDE1, 40% width] |
|                                          |
|  TIER 4  Most developing markets         |
|  [=====]                         $0.10+  |
|  [Bar: Border #EADFD3, 20% width]        |
|                                          |
|  [Tier label: 10pt Manrope 700, #111827] |
|  [Countries: 10pt Manrope 400, #475467]  |
|  [RPM value: JetBrains Mono 500, 11pt,   |
|   right-aligned, #111827]                |
|  [Bar height: 8px, rounded 4px corners]  |
|  [Row spacing: 16pt between tiers]       |
+------------------------------------------+
```

This horizontal bar chart communicates the tier hierarchy visually without needing a geographic map. The decreasing bar width and fading color intensity make the RPM difference immediately scannable.

### VISUAL 6: Warning Graphic (Section 5)
**Location:** Section 5 "Common Mistakes That Kill Your Earnings," before Mistake 1
**Treatment:** Styled warning callout strip with 5 items

```
+------------------------------------------+
| [Surface Muted #FFF1E6 background,       |
|  2px left border Error Red #F04438,      |
|  16pt padding]                           |
|                                          |
|  EARNINGS KILLERS                        |
|  [10pt Manrope 700, Error Red, all caps, |
|   2pt letter-spacing]                    |
|                                          |
|  X  Business account                     |
|  X  Wrong audience geography             |
|  X  Videos under 60 seconds              |
|  X  Reposted / repurposed content        |
|  X  Reacting to stale dashboard data     |
|                                          |
|  [X icon: 12px, Error Red #F04438]       |
|  [Text: 11pt Manrope 500, #111827]       |
|  [Row spacing: 10pt]                     |
+------------------------------------------+
```

The red left border and X marks create immediate visual contrast with the orange-accented positive content elsewhere in the document.

### VISUAL 7: 30-Day Calendar (Section 6)
**Location:** Section 6 "The 30-Day Kickstart Plan," after the intro paragraph
**Treatment:** Four-column week overview strip

```
+------------------------------------------+
| [Full content width]                     |
|                                          |
| WEEK 1      WEEK 2     WEEK 3    WEEK 4 |
| Setup       Build      Optimize  Scale   |
|                                          |
| [Card]      [Card]     [Card]    [Card]  |
| Days 1-7    Days 8-14  Days 15-21 22-30  |
|                                          |
+------------------------------------------+
```

Each week card:
```
+----------+
| [Top bar: 4px, color per week]           |
| Week 1: Brand Orange #F4A261             |
| Week 2: Orange Dark #E58B3A              |
| Week 3: Success Green #12B76A            |
| Week 4: Info Blue #0EA5E9                |
|                                          |
| WEEK 1                                   |
| [10pt Manrope 700, Ink #111827]          |
|                                          |
| Setup                                    |
| [14pt Manrope 700, matching top bar clr] |
|                                          |
| Days 1-7                                 |
| [9pt Manrope 400, Text Muted]            |
|                                          |
| [2-3 line summary of                     |
|  week's focus]                           |
| [9pt Manrope 400, Text Subtle]           |
+----------+
```

Card specs:
- Background: White `#FFFFFF`
- Border: 1px `#EADFD3`
- Border-radius: 6px
- Padding: 12pt
- Width: equal fourths of content width minus 8pt gutters
- Top accent bar: 4px tall, full card width, color varies by week

Week summaries (inside each card):
- Week 1: "Verify eligibility. Set up analytics. Research your niche. Plan first 5 videos."
- Week 2: "Publish 5 videos. Test hooks. Track retention. Learn what works."
- Week 3: "Analyze data. Double down on winners. Optimize qualified views."
- Week 4: "Increase output. Batch content. Set Month 2 goals."

### VISUAL 8: Resource Directory (Section 7)
**Location:** Section 7 "Resources," replacing the visual placeholder
**Treatment:** Clean grouped link list with category headers and visual separators

```
+------------------------------------------+
| [No special background -- white page]    |
|                                          |
| GETTING STARTED                          |
| [Category header: 10pt Manrope 700,     |
|  all caps, Brand Orange #F4A261,         |
|  2pt letter-spacing]                     |
| [1px line below, Border #EADFD3]         |
|                                          |
|  > Creativity Program Complete Guide     |
|  > Eligibility Requirements              |
|  > How to Join                           |
|  > Program Not Showing? Troubleshooting  |
|  > Convert Business to Personal          |
|                                          |
| [Each link: 10.5pt Manrope 400, #111827] |
| [> chevron: 8pt, Brand Orange]           |
| [Row spacing: 8pt]                       |
| [Category spacing: 20pt between groups]  |
|                                          |
| EARNING MORE                             |
| [same pattern...]                        |
|                                          |
| GROWING YOUR CONTENT                     |
| [same pattern...]                        |
|                                          |
| CALCULATORS                              |
| [same pattern...]                        |
|                                          |
| NICHE GUIDES                             |
| [same pattern...]                        |
|                                          |
| BEYOND CREATOR REWARDS                   |
| [same pattern...]                        |
+------------------------------------------+
```

All links should be actual clickable hyperlinks in the PDF pointing to the full URLs from the content source. Link text color is `#111827` (not blue -- stays on brand). Underline on the text is optional but if used, use `#EADFD3` (border color) not default blue underline.

### VISUAL 9: Footer / Back Cover
**Location:** Final page
**Treatment:** See Page Type 4 spec above.

---

## Table Styling

Two tables appear in the content: the earnings projection table (Section 2) and the RPM by niche table (Section 4).

### Earnings Table (Section 2)

| Property | Value |
|---|---|
| Header row background | `#F4A261` (Brand Orange) |
| Header text | Manrope 700, 9.5pt, `#0B0F1A` (dark ink, NOT white) |
| Body row (odd) | White `#FFFFFF` |
| Body row (even) | `#FFF7ED` (Warm White) |
| Body text | Manrope 400, 10pt, `#111827` |
| Earnings columns | JetBrains Mono 400, 10pt, `#111827` |
| Cell padding | 8pt horizontal, 6pt vertical |
| Border | 1px `#EADFD3` between rows |
| Corner radius | 6px on outer table container |
| Column alignment | Left for text, right for numbers |

### RPM by Niche Table (Section 4)

Same styling as earnings table with one addition:
- The RPM Range column uses JetBrains Mono for the dollar values
- Rows are sorted highest-to-lowest RPM (Finance at top, Gaming at bottom) -- this is how the content already orders them
- Consider a subtle left-border accent (3px Brand Orange) on the top row to visually highlight the highest-earning niche

### Table Footnotes

Tables with asterisked footnotes: 8pt Manrope 400 italic, `#667085`, 8pt below the table, preceded by a 40px `#EADFD3` horizontal rule.

---

## Callout Box Styling

Several content sections benefit from callout treatments. Two types:

### Tip Callout (positive)
- Background: `#FFF7ED` (Warm White)
- Left border: 3px `#F4A261` (Brand Orange)
- Padding: 14pt all sides
- Label: "TIP" -- 9pt Manrope 700, Brand Orange, all caps, 2pt letter-spacing
- Body: 10.5pt Manrope 400, `#111827`
- Use for: actionable advice, pro tips, key insights

### Warning Callout (caution)
- Background: `#FFF7ED` (Warm White)
- Left border: 3px `#F04438` (Error Red)
- Padding: 14pt all sides
- Label: "AVOID" -- 9pt Manrope 700, Error Red, all caps, 2pt letter-spacing
- Body: 10.5pt Manrope 400, `#111827`
- Use for: common mistakes, things that disqualify content

---

## Internal Link Treatment

The content has 20+ internal links to tiktokcreativityprogram.com. In the PDF:

- All links are clickable hyperlinks pointing to the full URL
- Link text color: `#E58B3A` (Orange Dark) -- distinguishable from body text but not jarring blue
- No underline by default. Underline on hover is not applicable in PDF, so use the color distinction alone
- "Deep dive:" prefixed links get their own line, with the prefix in 10pt Manrope 600 `#475467` and the link text in 10pt Manrope 500 `#E58B3A`
- Format: `Deep dive: [link text]` on its own line, 8pt above and below

---

## Specific Page-by-Page Breakdown

### Page 1: Cover (VISUAL 1)
Full cover per Page Type 1 spec.

### Pages 2-3: What This Covers + Section 1 (Quick-Start Checklist)
- "What This Cheat Sheet Covers" intro as body text (no section number treatment -- it is a preamble)
- Section 1 starts mid-page or top of page 3
- VISUAL 2 (checklist card) placed after the intro paragraph, before "How to apply"

### Pages 4-5: Section 2 (The Money Math)
- Section opener with "02" treatment
- VISUAL 3 (formula graphic) placed after the RPM/qualified views explanation, before the earnings table
- Earnings table takes significant vertical space -- will likely push to page 5
- Table footnote below

### Pages 6-7: Section 3 (Seven Ways to Get More Qualified Views)
- Section opener with "03" treatment
- VISUAL 4 (numbered circles strip) at the top of the section, after the intro line
- The 7 strategies flow as continuous prose with H3 subheadings
- "Deep dive:" links at the end of applicable strategies

### Pages 8-9: Section 4 (Content Types That Earn the Most)
- Section opener with "04" treatment
- RPM by niche table early in the section
- VISUAL 5 (tier bar chart) after the geography RPM table
- Niche-specific guide links formatted as a compact inline list

### Pages 10-11: Section 5 (Common Mistakes)
- Section opener with "05" treatment
- VISUAL 6 (warning strip) at the top of the section
- Each mistake as a bold-lead paragraph (mistake name in bold, explanation follows)

### Pages 11-13: Section 6 (30-Day Kickstart Plan)
- Section opener with "06" treatment
- VISUAL 7 (four-column week overview) at the top
- Week-by-week content flows below with H3 week headings
- Daily entries as compact paragraphs (Day number bolded)
- This is the longest section -- 3 pages expected

### Pages 13-14: Section 7 (Resources)
- Section opener with "07" treatment
- VISUAL 8 (grouped link directory) fills the section
- All links are clickable hyperlinks

### Page 15 (or 16): Back Cover (VISUAL 9)
Per Page Type 4 spec.

---

## Geometric Accent Elements

To maintain visual interest without photography or illustration, use these geometric accent elements sparingly:

### Section Dividers
Between major sections, instead of a simple horizontal rule, use a compound divider:
- Thin line (1px, `#EADFD3`) full content width
- Small orange diamond (8x8px, rotated 45 degrees, `#F4A261`) centered on the line
- This replaces the `---` markdown dividers in the source content

### Pull Quotes
For key statistics or standout facts (e.g., "A finance creator at $3.00 RPM earns 6x more per qualified view than a gaming creator at $0.50 RPM"):
- Extracted from body text and displayed larger
- 14pt Manrope 600, `#0B0F1A`
- Left border: 4px `#F4A261`
- Left padding: 16pt
- Top/bottom margin: 16pt
- Use sparingly -- maximum 1 per section, only for the most impactful data point

### Corner Accents
On section opener pages only, a subtle geometric element in the top-right corner:
- Small angular shape (similar to cover but smaller, approximately 60x60px)
- `#FFE9D5` (Orange Soft) fill
- 0.3 opacity
- Purely decorative, does not overlap with content

---

## Mandatory Implementation Checklist

Every item below must be implemented and is verifiable from the final PDF output.

### Global

1. PDF is US Letter (8.5 x 11 in), portrait orientation, all pages
2. Manrope font is embedded in the PDF (not referenced externally) -- all weights: 400, 500, 600, 700, 800
3. JetBrains Mono font is embedded in the PDF -- weights: 400, 500
4. Page margins are 0.75in top/bottom, 0.875in left/right on all content pages
5. Running header appears on every page except page 1 (cover) and the final page (back cover)
6. Running header format: "TCP Cheat Sheet" left, section name center, "Page X of Y" right, 8pt Manrope 500 `#667085`, 1px `#EADFD3` line below
7. Page numbers appear bottom-center on every page except cover and back cover, 8pt Manrope 500 `#475467`
8. All body text is 11pt Manrope 400 `#111827` with 1.65 line height
9. Paragraph spacing is 12pt between paragraphs throughout
10. No photography or stock imagery appears anywhere in the PDF
11. No illustrations from the TCP website illustration set appear in the PDF (those are web-only assets)
12. All 20+ internal links are clickable hyperlinks pointing to their full tiktokcreativityprogram.com URLs
13. Link text color is `#E58B3A` (Orange Dark) throughout -- no default blue links

### Cover (Page 1)

14. Cover title "THE TIKTOK CREATOR REWARDS CHEAT SHEET" is 48pt Manrope 800, `#0B0F1A`, left-aligned
15. Cover has a horizontal accent rule (80px wide, 3px, `#F4A261`) between title and subtitle
16. Cover subtitle is 18pt Manrope 400, `#475467`
17. Cover has geometric accent shapes in the bottom-right corner using `#FFE9D5` and `#F4A261`
18. Cover has "TCP" wordmark top-left in Manrope 800 14pt and URL below it in Manrope 400 9.5pt
19. Cover has "A free guide from tiktokcreativityprogram.com" bottom-left, 9.5pt `#667085`
20. Cover background is white `#FFFFFF` -- no colored background fill

### Visual Zones

21. VISUAL 2 (Section 1): Checklist card with `#FFF7ED` background, 2px `#F4A261` left border, 5 rows with empty checkbox squares, each requirement on its own row
22. VISUAL 3 (Section 2): Formula displayed as proper fraction layout in JetBrains Mono 500 16pt on `#FFF1E6` background, division bar in `#E58B3A`, "Your Earnings" in `#F4A261`
23. VISUAL 4 (Section 3): Horizontal strip of 7 numbered circles (36px, `#F4A261` fill, `#0B0F1A` number text), with abbreviated labels below each
24. VISUAL 5 (Section 4): Horizontal bar chart showing 4 RPM tiers with decreasing bar widths (100%, 66%, 40%, 20%), tier labels, country abbreviations, and RPM values in JetBrains Mono
25. VISUAL 6 (Section 5): Warning callout strip with `#FFF1E6` background, 2px `#F04438` left border, "EARNINGS KILLERS" header in red, 5 items with red X marks
26. VISUAL 7 (Section 6): Four-column week card layout, each card with colored top accent bar (W1 orange, W2 dark orange, W3 green, W4 blue), week number, theme name, date range, and 2-3 line summary
27. VISUAL 8 (Section 7): Grouped resource directory with category headers in `#F4A261` all caps, orange chevron markers before each link, all links clickable

### Tables

28. Earnings projection table (Section 2): Orange header row `#F4A261` with dark ink text `#0B0F1A`, alternating body rows (white / `#FFF7ED`), dollar values in JetBrains Mono, 6px outer border-radius
29. RPM by niche table (Section 4): Same styling as earnings table, RPM values in JetBrains Mono, sorted highest-to-lowest
30. RPM by geography table (Section 4): Same base styling, three columns (Market Tier, Countries, RPM Range)
31. All table footnotes are 8pt Manrope 400 italic `#667085`, preceded by a 40px `#EADFD3` rule

### Typography Hierarchy

32. Section numbers displayed as two-digit format (01-07) in 72pt Manrope 800 `#F4A261` at 0.6 opacity
33. Section titles in 28pt Manrope 700 `#0B0F1A`, all caps, -0.01em tracking
34. H2 subsections in 20pt Manrope 700 with 28pt top margin and 10pt bottom margin
35. H3 subheads in 16pt Manrope 600 with 20pt top margin and 8pt bottom margin
36. "Deep dive:" link lines are standalone, prefix in 10pt Manrope 600 `#475467`, link in 10pt Manrope 500 `#E58B3A`

### Decorative Elements

37. Section dividers use compound treatment: 1px `#EADFD3` line with centered 8x8px orange diamond
38. Maximum 1 pull quote per section, 14pt Manrope 600, 4px `#F4A261` left border
39. Section opener pages have subtle `#FFE9D5` geometric corner accent (top-right, 0.3 opacity)

### Back Cover

40. Back cover is centered layout with "TCP" in 24pt Manrope 800, URL in 14pt `#F4A261`, tagline in 12pt italic `#475467`
41. Disclaimer and copyright text at bottom of back cover, 8pt `#667085`, centered, max-width 80%
42. Back cover background is white -- no colored fill

### Quality Gates

43. Orange buttons/elements never use white text -- always dark ink `#0B0F1A` (WCAG compliance)
44. PDF file size is under 2MB (no embedded raster images, all elements are vector/text)
45. PDF is tagged for accessibility (document title, language set to English)
46. All text is selectable (not rasterized)
47. PDF opens correctly in Chrome built-in viewer, macOS Preview, and Adobe Acrobat Reader
