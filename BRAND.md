# Brand Guide: TikTok Creativity Program
**Prepared by:** Vale
**Version:** 2.0 — Implementation-enforced rewrite
**Date:** 2026-03-15
**Audience:** Devan (build), Scribe (tone)
**Status:** Mandatory. This document supersedes v1.0.

---

## A Note on v1.0 Failure

The previous brand guide scored 41/100 in implementation. The design system (tokens, fonts, buttons, cards) was built correctly. Everything visual that makes this a brand — illustrations, layout structure, logo weight, 21st.dev components — was skipped entirely.

This version is written so every requirement can be verified from a screenshot. If it is not on the Mandatory Implementation Checklist in Section 11, Devan has permission to omit it. If it IS on the list, omission is a failure.

---

## ui-ux-pro-max Tool Findings and Overrides

The ui-ux-pro-max tool was run on this project. Its auto-recommendations are documented and overridden below. This is not optional — Devan must use the overrides, not the auto-recommendations.

### Auto-recommendation: REJECTED
- Suggested style: "Swiss Modernism 2.0" — wrong for a creator education site
- Suggested typography: Baloo 2 / Comic Neue — children's font, categorically wrong
- Suggested colors: Creator pink (#EC4899), rose red (#E11D48) — wrong palette entirely
- Suggested pattern: "Minimal Single Column" with centered layout only

### Validated findings (what the tool got right)
From the Flat Design result: "2D, minimalist, bold limited colors, no shadows in illustrations, clean lines, simple shapes, typography-focused, fast loading, clean transitions 150-200ms." This matches the illustration style already established. Apply this principle to component design: no decorative shadows, no gradients, flat fills.

From the Newsletter/Content First landing pattern: "Hero (Value Prop + Form), Recent Issues/Archives, Social Proof, About Author." Section order and primary CTA (email capture inline) validated for the homepage.

From the Comparison Table + CTA pattern: "Table: alternating rows white/light grey. Your product: highlighted row. CTA: below table." Validated for comparison and roundup pages. Conversion lift: 35% vs non-table layouts.

From Next.js stack guidelines: Use `fill` prop with `relative` parent for all responsive images (including illustration placements). Apply font to root `layout.tsx` body, not per-page.

### Typography override (authoritative)
The tool returned language-specific and corporate fonts that do not match. The established Manrope + JetBrains Mono pairing is correct and stays. Rationale: Manrope is a geometric humanist sans-serif (similar performance characteristics to the tool's "Modern Professional" Poppins result) with a warmer, more personal character suited to the creator audience. It is already loaded and tokenized. Do not switch it.

---

## 1. Design Principles

Five principles govern every visual decision. When in doubt, run the question through these.

**Earned trust, then monetization.** Every page earns confidence before asking for a click, signup, or purchase. Information comes first. Affiliate CTAs appear after the reader has received value.

**Independent clarity over corporate polish.** This is the smartest friend who figured out the Creator Rewards Program. The design feels like a well-organized personal resource — structured but not corporate. Approachable but not amateur.

**Mobile-native first.** TikTok creators live on their phones. Every layout decision starts at 390px. Desktop is an enhancement.

**Content breathes.** White space is active, not empty. The illustration style is built on it. Dense UI contradicts the visual identity.

**Utility is the aesthetic.** Calculators, checklists, comparison tables are the brand expression. Tools that work are what differentiate this site.

---

## 2. Brand Positioning, Voice, and Tone

**Positioning:** Independent, plain-language resource for TikTok creators navigating the Creator Rewards Program. No hype. No corporate FAQ energy.

**Voice:** The knowledgeable peer. Someone who went through the process, read everything, ran the numbers, and is now explaining it plainly.

**Tone:** Direct. Plain. Occasionally warm. Never hype. Never corporate-FAQ. Closer to "here's what actually determines your RPM" than "we're so excited to share our top picks."

**Personality pillars:**
- Credible without being stiff
- Practical without being cold
- Helpful without being salesy
- Clear without being condescending

**What the design is not:** Not TikTok's brand (avoid their red/black). Not a generic creator blog (no stock-photo faces, no gradient CTAs). Not an enterprise tool site (no heavy navy, no formal serif headers).

---

## 3. Color Palette

Palette is anchored to the four existing illustrations. These are non-negotiable.

### Primary Colors

| Token Name | Hex | CSS Variable | Tailwind Approx | Use |
|---|---|---|---|---|
| Brand Orange | `#F4A261` | `--color-primary` | `orange-400` | Primary accent, CTAs, illustration fills, active states |
| Orange Dark | `#E58B3A` | `--color-primary-dark` | `orange-500` | Hover states, strong borders |
| Orange Soft | `#FFE9D5` | `--color-accent-soft` | `orange-100` | Callout backgrounds, badge backgrounds |
| Ink | `#111827` | `--color-ink` | `gray-900` | Primary text, illustration outlines |
| Ink Strong | `#0B0F1A` | `--color-ink-strong` | — | Display headings, maximum contrast |

### Background and Surface Colors

| Token Name | Hex | CSS Variable | Use |
|---|---|---|---|
| White | `#FFFFFF` | `--color-background` | Primary page background, card backgrounds |
| Warm White | `#FFF7ED` | `--color-surface-warm` | Hero areas, section backgrounds, results panels |
| Surface Muted | `#FFF1E6` | `--color-surface-muted` | Email capture sections, featured callouts |
| Surface Inset | `#F9EDE1` | `--color-surface-inset` | Calculator input fields, code blocks |
| Border | `#EADFD3` | `--color-border` | Card borders, dividers |
| Border Strong | `#DFD1C4` | `--color-border-strong` | Table borders, active dividers |

### Text Colors

| Token Name | Hex | CSS Variable | Use |
|---|---|---|---|
| Text Primary | `#101828` | `--color-text-primary` | Body text, headings |
| Text Muted | `#475467` | `--color-text-muted` | Secondary text, captions, metadata |
| Text Subtle | `#667085` | `--color-text-subtle` | Placeholder text, fine print |

### Semantic Colors

| Token Name | Hex | CSS Variable | Use |
|---|---|---|---|
| Success Green | `#12B76A` | `--color-success` | Eligible indicators, checklist checks |
| Warning Amber | `#F79009` | `--color-warning` | Caveats, payout delays |
| Error Red | `#F04438` | `--color-error` | Errors, disqualifiers |
| Info Blue | `#0EA5E9` | `--color-info` | Informational callouts |

### WCAG Contrast — Hard Rules

- Ink `#111827` on White `#FFFFFF`: 16.7:1 — AAA
- Ink on Warm White `#FFF7ED`: 15.2:1 — AAA
- Brand Orange `#F4A261` on White: 2.9:1 — FAILS on body text; use for decorative/large elements only
- White text on Brand Orange: 2.9:1 — FAILS; never use
- Ink Strong `#0B0F1A` on Brand Orange `#F4A261`: 4.6:1 — AA (large text). Orange buttons always use `#0B0F1A` text. Not white.

**Button rule: Orange buttons always use dark ink text (#0B0F1A). Never white. This is a WCAG requirement, not a preference.**

### Ad-Safe Design Rule

The site will run Mediavine ads. Never use full-viewport-width color fills on ad-bearing pages. Use contained `max-w-*` sections. Keep outer shell backgrounds white or warm-white so standard ad units render cleanly.

---

## 4. Typography

### Font Stack (Do Not Change)

**ui-ux-pro-max auto-recommended Comic Neue and Baloo 2. Both are rejected. The following is the authoritative typography spec.**

**Primary: Manrope** (geometric humanist sans-serif, warmer character than Poppins, already tokenized)
- Source: Google Fonts
- Weights: 400, 500, 600, 700, 800
- CSS import (place in `app/layout.tsx` or root `_document`):

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
```

**Mono: JetBrains Mono** (calculator outputs, code, data values only)
- Source: Google Fonts
- Weights: 400, 500
- CSS import:

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

**Next.js font loading pattern (from ui-ux-pro-max stack validation):**

```tsx
// app/layout.tsx
import { Manrope, JetBrains_Mono } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

### Type Scale

| Token | Mobile Size | Desktop Size | Weight | Line Height | Use |
|---|---|---|---|---|---|
| Display | 2.5rem (40px) | 3.5rem (56px) | 800 | 1.15 | Hero headlines only |
| H1 | 2rem (32px) | 2.75rem (44px) | 700 | 1.2 | Page titles |
| H2 | 1.5rem (24px) | 1.875rem (30px) | 700 | 1.25 | Section headings |
| H3 | 1.125rem (18px) | 1.25rem (20px) | 600 | 1.3 | Card titles, subsections |
| H4 | 1rem (16px) | 1rem (16px) | 600 | 1.4 | Labels, sidebar headings |
| Body | 1rem (16px) | 1rem (16px) | 400 | 1.7 | All prose content |
| Body Large | 1.125rem (18px) | 1.125rem (18px) | 400 | 1.7 | Intro paragraphs, lead text |
| Small | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 | Metadata, captions |
| Caption | 0.75rem (12px) | 0.75rem (12px) | 500 | 1.4 | Tags, badges, timestamps |
| Button | 0.875rem (14px) | 0.9375rem (15px) | 600 | 1 | All button labels |
| Mono Output | 1.5rem–2rem | 1.75rem–2.5rem | 700 | 1.2 | Calculator result numbers |

### Typography Rules

- `tracking-tight` on Display and H1 only. Normal tracking everywhere else.
- Body text `max-w-prose` (65ch) inside article content. Never full-width.
- No italics in body text unless truly required.
- Never more than two heading levels visible on one mobile screen.

---

## 5. Style Direction

**Validated style: Flat Design with warm accents.**

From ui-ux-pro-max Flat Design result: 2D, minimalist, flat fills, no box shadows in illustrations, clean lines, simple shapes, typography-focused, fast loading, clean transitions 150–200ms ease.

This maps directly to the illustration set. Apply to components:
- No decorative box shadows on cards at rest (add `shadow-sm` on hover only)
- No gradients in UI fills
- Border separators instead of shadow dividers where possible
- Icons: Lucide SVG only (see Section 7)
- Transitions: 150–200ms ease for hover states, 200–300ms for reveals

**What this is not:** No glassmorphism. No neumorphism. No bento-grid aesthetic. No dark mode in Phase 1. No gradient CTAs.

---

## 6. Landing Page Patterns

From ui-ux-pro-max validation:

### Homepage Pattern: Newsletter/Content First (validated)

Section order — do not reorder:
1. Navigation (sticky, white)
2. Hero — two-column, value prop + illustration
3. Trust bar — 3 stats with countUp animation
4. Content pillars — 4 cards
5. Calculator preview — inline, links to full calculator
6. Featured guides strip — 3 cards
7. Email capture — two-column with illustration
8. Footer

### Comparison/Roundup Pattern: Comparison Table + CTA (validated, 35% conversion lift)

Section order:
1. Hero (problem statement headline)
2. Comparison table — highlighted row for recommended product
3. Product sections (one per product, H2 heading)
4. Bottom CTA (affiliate link)

CTA placement: after table in right-column position and below table. Never inside table cells.

### Guide/Article Pattern: Content First

Section order:
1. Breadcrumb
2. Header band — category badge, H1, description, meta, illustration right-aligned
3. Table of contents (sticky, desktop left column)
4. Article body — `max-w-prose`
5. Callout boxes inline
6. End-of-guide CTA (email capture or affiliate, never both)
7. Related guides (3 cards)

---

## 7. Component References from 21st.dev

These are verified 21st.dev URLs. Devan must visit each URL, view the live preview, and copy the component code using the Copy button on 21st.dev before building the corresponding section.

### Quick Reference Table

| Component Use | 21st.dev URL | Copy From | Customize |
|---|---|---|---|
| Site header / sticky nav | https://21st.dev/components/efferd/header-1 | efferd/header-1 | Background: white. Border-bottom: #EADFD3. Remove gradient. Logo: Manrope 700 18px #0B0F1A. Active link: orange underline. |
| Homepage hero section | https://21st.dev/components/moumensoliman/hero-section-shadcnui | moumensoliman/hero-section-shadcnui | Layout: grid cols-[3fr_2fr] gap-12. Add illustration slot to right column. Stagger animation applies to left column text only. Background: gradient-to-b from-white to-[#FFF7ED]. |
| Guide cards (blog card grid) | https://21st.dev/components/sumonadotwork/blog-cards | sumonadotwork/blog-cards | Card border: #EADFD3. Hover border: #F4A261. Remove card images. Add category badge slot top-left. Font: Manrope. |
| Email capture / newsletter form | https://21st.dev/components/ruixenui/newsletter-form | ruixenui/newsletter-form | Card background: #FFF1E6. Add illustration slot to right side on desktop. Button: #F4A261 with #0B0F1A text. Single email field only. |
| Site footer | https://21st.dev/components/efferd/minimal-footer | efferd/minimal-footer | Background: white (not dark). Four columns. Add affiliate disclosure in bottom bar. |
| Comparison table reference | https://21st.dev/components/vaib215/pricing-table | vaib215/pricing-table | Adapt structure for product comparison. Highlight row: border-l-4 #F4A261, background #FFF7ED. Check icons: #12B76A. X icons: #F04438. |
| Calculator slider | https://21st.dev/components/radu-activation-popescu/pricing-slider-loops | radu-activation-popescu/pricing-slider-loops | Track: #EADFD3. Fill: #F4A261. Thumb: white circle, border #F4A261. Output: JetBrains Mono. |
| Feature section (content pillars) | https://21st.dev/components/jatin-yadav05/feature-spotlight | jatin-yadav05/feature-spotlight | 4-card grid. Icons: Lucide SVG 20px. Card border: #EADFD3. No card images. |

### Notes for Devan on 21st.dev

21st.dev component URLs follow the pattern: `https://21st.dev/components/{username}/{slug}`. The live preview and Copy button appear on the component detail page. Copy the raw component code and customize per the column above. Do not use the component verbatim — it must be adapted to this brand's colors, fonts, and token system.

If a URL returns 404 at build time, search 21st.dev for the component type by keyword and select the closest match. Document which component was substituted in the pull request description.

---

## 8. Custom Component Specifications

These are built from scratch. No 21st.dev equivalent exists.

### Logo Treatment

The site name in the navigation must have visual authority separate from the nav links.

```tsx
<a href="/" className="flex items-center gap-2 shrink-0">
  <span className="text-[18px] font-[700] tracking-[-0.02em] text-[#0B0F1A] leading-none font-sans">
    TikTok Creativity Program
  </span>
</a>
```

Requirements:
- Font size: 18px (not 15px — the previous version failed because 15px has no authority)
- Weight: 700
- Letter spacing: -0.02em (tracking-tight equivalent)
- Color: #0B0F1A (Ink Strong — darker than nav link text)
- Must not be a plain `<span>` — wrap in `<a href="/">` with no underline decoration

### Buttons

**Primary button:**
```tsx
<button className="px-6 py-3 bg-[#F4A261] text-[#0B0F1A] font-[600] text-[15px] rounded-xl
  hover:bg-[#E58B3A] active:scale-95 transition-all duration-150 shadow-none hover:shadow-sm
  cursor-pointer">
  Label
</button>
```

**Secondary button:**
```tsx
<button className="px-6 py-3 bg-white text-[#111827] font-[600] text-[15px] rounded-xl
  border border-[#EADFD3] hover:border-[#DFD1C4] hover:bg-[#FFF7ED]
  transition-all duration-150 cursor-pointer">
  Label
</button>
```

**Affiliate link button:**
```tsx
<div className="flex flex-col gap-1">
  <span className="text-[12px] text-[#667085] font-[500]">Affiliate</span>
  <a href="[affiliate-url]" target="_blank" rel="noopener noreferrer sponsored"
    className="inline-flex items-center gap-2 px-7 py-3 bg-[#F4A261] text-[#0B0F1A]
    font-[600] text-[15px] rounded-2xl hover:bg-[#E58B3A] transition-all duration-150">
    Try [Product Name]
    {/* ChevronRight from lucide-react, size 16 */}
  </a>
</div>
```

### Callout Boxes

Four variants. Left border + tinted background.

```tsx
// tip variant
<div className="border-l-4 border-[#F4A261] bg-[#FFF7ED] rounded-r-xl p-4 max-w-[65ch]">
  <div className="flex items-center gap-2 mb-1">
    {/* Lightbulb icon from lucide-react, size 16, color #E58B3A */}
    <span className="text-[14px] font-[600] text-[#E58B3A]">Tip</span>
  </div>
  <p className="text-[14px] text-[#101828] leading-[1.6]">{children}</p>
</div>

// warning variant: border-[#F79009], bg-[#FFFAEB], icon Alerttriangle amber
// info variant: border-[#0EA5E9], bg-[#F0F9FF], icon Info blue
// error variant: border-[#F04438], bg-[#FEF3F2], icon XCircle red
```

### Guide Cards

Built from sumonadotwork/blog-cards as base. Key overrides:

- No card image
- Category badge in orange-soft pill at top
- Title: 2-line clamp, Manrope 700 20px
- Description: 3-line clamp, 14px text-muted
- Bottom: read-time + ChevronRight icon
- Hover: border shifts to #F4A261, shadow-sm appears
- Transition: 150ms ease

### Calculator Panel

Two-panel layout. Not from 21st.dev — custom build based on radu-activation-popescu/pricing-slider-loops for slider pattern only.

**Input panel (left on desktop, full-width on mobile):**
- Background: white
- Input fields: background `#F9EDE1`, border `#EADFD3`, focus-border `#F4A261`
- Focus ring: `ring-2 ring-[#F4A261] ring-offset-1`
- Labels: 14px Manrope 500 text-muted
- Number values in fields: JetBrains Mono
- Info tooltip icon: Lucide `Info` size 14, text-subtle color

**Results panel (right on desktop, below inputs on mobile):**
- Background: `#FFF7ED` (Warm White)
- Border: `1px solid #EADFD3`, `rounded-2xl`
- Primary result number: JetBrains Mono 700, 2rem–2.5rem, Ink Strong
- Secondary metrics: JetBrains Mono 500, 1.25rem, text-muted
- No affiliate CTAs in results panel — link to relevant guides only

**Below calculator — required section "What affects your results?":**
- Plain prose section, `max-w-prose`
- H2: "What affects your results?"
- Explains RPM factors, content length, qualified view thresholds
- Inline guide links (ghost button style) to related guides
- This section is NOT optional — it is brand behavior

### Comparison Table

Built from vaib215/pricing-table as structural reference. Key overrides:

- `overflow-x-auto` wrapper on mobile
- First column sticky: `sticky left-0 bg-white z-10`
- Right-fade gradient on mobile: `after:absolute after:right-0 after:top-0 after:h-full after:w-8 after:bg-gradient-to-l after:from-white`
- Header row: background `#FFF1E6`, text ink, Manrope 600 14px
- Alternating rows: odd white, even `#FAFAF9`
- Recommended row: `border-l-4 border-[#F4A261] bg-[#FFF7ED]`
- Check icon: Lucide `Check` inside `bg-[#DCFCE7]` circle, green
- X icon: Lucide `X` inside `bg-[#FEF2F2]` circle, red
- Outer radius: `rounded-xl overflow-hidden`
- Affiliate CTA: below table, not inside cells

---

## 9. Illustration Style Guide

### The Four Existing Images

These files are in `assets/brand-images/`. They are the single most important visual element on the site. A site without these images is not this brand.

| File | Best For |
|---|---|
| `landpress-marketing-hero.png` | Homepage hero, general eligibility/earnings guides, calculator pages |
| `landpress-marketing-2.png` | Earnings content, success stories, RPM analytics guides |
| `landpress-marketing-3.png` | Tools, comparison pages, roundup guides (group collaboration) |
| `landpress-marketing-4.png` | Email capture, payout guides, solo creator with phone |

### Core Style Attributes

**Outlines:** Thin, consistent 1.5–2px weight. No tapered strokes. No brush variation. Color: near-black #1A1A1A–#2A2A2A, slightly warm.

**Fills:** Flat fills only. No gradients. No drop shadows within illustrations. No inner glow. Three fill values: white, orange `#F4A261`, and very light gray `#F2F2F2` for background surfaces.

**Orange rule:** Orange appears on ONE clothing piece per figure AND ONE UI element per scene. Never background, never walls, never multiple elements.

**Background treatment:** Pure white background. No vignette. No background color. No gradient sky.

**Character proportions:** Slightly stylized — head approximately 1/6 body height. Simplified limbs. Minimal facial detail (dots or arcs for eyes, simple smile). Solid black or orange fill for hair.

### Next.js Image Implementation Pattern

From ui-ux-pro-max Next.js stack validation — use `fill` prop with `relative` parent for responsive images:

```tsx
// Correct pattern for all illustration placements
<div className="relative w-full h-[400px]">
  <Image
    src="/assets/brand-images/landpress-marketing-hero.png"
    alt="Creator at desk reviewing earnings dashboard"
    fill
    className="object-contain"
    priority={true} // only for above-fold images
  />
</div>
```

Do NOT use fixed `width` and `height` props for illustrations in responsive layouts.

### Illustration Placement Map

Every illustration placement is specified in the Mandatory Implementation Checklist (Section 11). Use this map for content-type matching:

| Content Type | Use This Image |
|---|---|
| Homepage hero | `landpress-marketing-hero.png` |
| Email capture / newsletter CTA | `landpress-marketing-4.png` |
| Earnings, RPM, success stories | `landpress-marketing-2.png` |
| Tools, comparisons, roundups | `landpress-marketing-3.png` |
| Eligibility, getting started | `landpress-marketing-hero.png` |
| Calculator pages | `landpress-marketing-hero.png` |
| 404 / empty states | `landpress-marketing-4.png` |

### Generated Illustrations (ILLUSTRATION_PROMPTS.md)

10 additional illustration briefs are in `ILLUSTRATION_PROMPTS.md` with generation-ready prompts for Google Imagen. Once generated, they are placed at `assets/brand-images/` with the filenames defined in that file. Placement for each generated illustration is in Section 11 Item 22 onward.

---

## 10. Layout Patterns Per Page Type

### Homepage Layout

```
MOBILE (390px):
[Nav — full width, sticky]
[Hero — single column, text then illustration stacked]
  - H1 display text
  - Subtitle body-large
  - Two buttons (primary + ghost)
  - Illustration: landpress-marketing-hero.png, full-width, max-h-[300px], object-contain, centered
[Trust bar — 3 stats stacked or 3-column flex]
[Content pillars — 2-column grid of 4 cards]
[Calculator preview — single column]
[Featured guides — single column, 3 stacked cards]
[Email capture — single column, text then illustration stacked]
[Footer — single column stacked]

DESKTOP (1280px):
[Nav — max-w-7xl centered, logo left, links center, CTA right]
[Hero — max-w-5xl centered, grid cols-[3fr_2fr] gap-12 items-center]
  LEFT COLUMN (60%):
    - Eyebrow text: small pill badge, text-muted
    - H1 display: Manrope 800, tracking-tight, max-w-[520px]
    - Subtitle: body-large, text-muted, max-w-[480px]
    - Button row: primary CTA + ghost secondary
  RIGHT COLUMN (40%):
    - landpress-marketing-hero.png
    - Position: relative, h-[440px], w-full
    - Image: fill, object-contain, object-right
[Trust bar — max-w-3xl centered, 3-column flex, gap-8]
[Content pillars — max-w-5xl centered, 4-column grid]
[Calculator preview — max-w-3xl centered, single panel with inputs + preview result]
[Featured guides — max-w-5xl centered, 3-column grid]
[Email capture — max-w-5xl centered, grid cols-[1fr_1fr] gap-12 items-center]
  LEFT COLUMN: email form
  RIGHT COLUMN: landpress-marketing-4.png, h-[360px], fill, object-contain
[Footer — max-w-7xl centered, 4-column grid]
```

**Hero background:** `bg-gradient-to-b from-white to-[#FFF7ED]` — not flat white.

### Guide / Article Page Layout

```
MOBILE:
[Nav]
[Header band — single column: breadcrumb, badge, H1, meta, then illustration full-width]
[Article body — single column, max-w-prose, px-4]
[Callout boxes — full-width within prose]
[End-of-article CTA]
[Related guides — single column, 3 stacked cards]
[Footer]

DESKTOP:
[Nav]
[Header band — max-w-5xl, grid cols-[3fr_2fr] gap-12 items-center]
  LEFT: breadcrumb, badge, H1, description, read-time + date meta
  RIGHT: illustration matched to guide category (see map Section 9), h-[320px], fill, object-contain
[Two-column body — max-w-5xl, grid cols-[auto_1fr] gap-8]
  LEFT: sticky ToC (w-64, top-24, max-h-screen overflow-y-auto)
  RIGHT: article prose (max-w-prose)
[End-of-article CTA — full-width within right column]
[Related guides — 3-column card grid]
[Footer]
```

### Calculator Page Layout

```
MOBILE:
[Nav]
[Header band — single column: H1, description, then illustration stacked]
[Calculator — single column, input panel then results panel stacked]
[What affects your results? — single column prose]
[Related guides — 2 cards stacked]
[Footer]

DESKTOP:
[Nav]
[Header band — max-w-5xl, grid cols-[3fr_2fr] gap-12 items-center, bg-[#FFF7ED]]
  LEFT: H1, description text
  RIGHT: landpress-marketing-hero.png, h-[320px], fill, object-contain
[Calculator — max-w-4xl, grid cols-[1fr_1fr] gap-8]
  LEFT: input panel (white bg, inputs in #F9EDE1)
  RIGHT: results panel (bg-[#FFF7ED], rounded-2xl)
[What affects your results? — max-w-prose, prose section, guide links]
[Related calculators — 2-column card grid]
[Footer]
```

### Guides Listing / Index Page Layout

```
MOBILE: [Nav] [H1 + description] [Filter bar — horizontal scroll] [Card grid 1-col] [Footer]

DESKTOP: [Nav] [H1 + description — max-w-2xl] [Filter bar — flex wrap] [Card grid 3-col, max-w-6xl] [Footer]
```

### Roundup / Comparison Page Layout

```
MOBILE: [Nav] [Header — H1, description, illustration stacked] [Problem intro prose] [Table — horizontal scroll] [Product sections] [Bottom CTA] [Footer]

DESKTOP: [Nav] [Header — max-w-5xl, two-column same as guide header] [Problem intro — max-w-prose] [Comparison table — max-w-4xl] [Product sections — prose with inline affiliate CTAs] [Bottom CTA] [Footer]
```

### Spacing System

| Token | Value | CSS Variable | Tailwind |
|---|---|---|---|
| xs | 4px | `--space-xs` | `p-1` |
| sm | 8px | `--space-sm` | `p-2` |
| md | 16px | `--space-md` | `p-4` |
| lg | 24px | `--space-lg` | `p-6` |
| xl | 32px | `--space-xl` | `p-8` |
| 2xl | 48px | `--space-2xl` | `p-12` |
| 3xl | 64px | `--space-3xl` | `p-16` |
| Section gap | 80–96px | — | `py-20 md:py-24` |

---

## 11. MANDATORY IMPLEMENTATION CHECKLIST

This is the most important section. Each item is screenshot-verifiable. If an item is not checked, the build fails. Items are grouped by page.

---

### Global

- [ ] G1. Font: Manrope loaded via `next/font/google` in `app/layout.tsx` with weights 400, 500, 600, 700, 800. Applied to `<body>` via `className`. NOT loaded per-page.
- [ ] G2. Mono font: JetBrains Mono loaded via `next/font/google` in `app/layout.tsx` with weights 400, 500. Applied via `--font-mono` CSS variable.
- [ ] G3. All design tokens from `tokens.css` remain unchanged. No new hardcoded hex values that duplicate token values.
- [ ] G4. No white text on orange backgrounds anywhere. All orange buttons use `text-[#0B0F1A]`.
- [ ] G5. All interactive elements have `cursor-pointer`.
- [ ] G6. Hover transitions use `transition-all duration-150` (150ms) or `duration-200` (200ms). No instant color snaps.
- [ ] G7. `prefers-reduced-motion` respected in all CSS animations and `ScrollReveal.tsx`. The CSS must include `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }`.
- [ ] G8. All icons are Lucide SVG (`lucide-react`). No emoji used as icons anywhere.
- [ ] G9. No stock photography on any page.
- [ ] G10. All illustration `<Image>` tags use `fill` prop with a `relative`-positioned parent container. No fixed `width`/`height` on responsive illustration slots.
- [ ] G11. Affiliate links include `rel="noopener noreferrer sponsored"`.
- [ ] G12. Affiliate disclosure text appears in the footer bottom bar on every page.

---

### Navigation / Header

Uses 21st.dev efferd/header-1 as the starting component.
21st.dev URL: https://21st.dev/components/efferd/header-1

- [ ] N1. Visit https://21st.dev/components/efferd/header-1, copy the component code, paste into `components/Navigation.tsx` or equivalent. Document the source component in a comment at the top of the file.
- [ ] N2. Header background: white (`#FFFFFF`). Bottom border: `border-b border-[#EADFD3]`.
- [ ] N3. On scroll (>10px): add `shadow-sm` — no gradient, no blur effect beyond what the base component provides.
- [ ] N4. Logo: `<a href="/">` wrapping `<span>` with text "TikTok Creativity Program", `font-bold text-[18px] tracking-[-0.02em] text-[#0B0F1A]`. Logo text must be visually larger and darker than nav link text.
- [ ] N5. Nav links: Manrope 500, 15px, `text-[#475467]`. Hover: `text-[#101828]`.
- [ ] N6. Active nav link: `text-[#101828]` plus orange underline via `::after` pseudo-element: `content:'', position:absolute, bottom:-2px, left:0, right:0, height:2px, background:#F4A261`.
- [ ] N7. Header CTA button (right side): Primary button style per Section 8. Label: "Start Here".
- [ ] N8. Mobile: hamburger icon (Lucide `Menu`, size 24) left, logo center OR logo left and hamburger right. No animated X on open — keep static `X` icon (Lucide `X`, size 24).
- [ ] N9. Mobile nav panel: slides in from right, white background, nav links stacked with 48px minimum tap height, CTA button pinned at bottom of panel.
- [ ] N10. Mobile nav groups have small gray label above each group (12px, `text-[#667085]`, Manrope 500).

---

### Homepage

Uses 21st.dev moumensoliman/hero-section-shadcnui for the hero section.
21st.dev URL: https://21st.dev/components/moumensoliman/hero-section-shadcnui

- [ ] H1. Visit https://21st.dev/components/moumensoliman/hero-section-shadcnui, copy the component code, paste into `components/HeroSection.tsx`. Document source in comment.
- [ ] H2. Hero section: two-column grid. Desktop: `grid md:grid-cols-[3fr_2fr] gap-12 items-center`. Mobile: single column, text above illustration. Container: `max-w-5xl mx-auto px-4`.
- [ ] H3. Hero background: `bg-gradient-to-b from-white to-[#FFF7ED]`. Not flat white.
- [ ] H4. Hero left column: eyebrow text (small orange pill badge with label "Free Guide"), H1 display text (Manrope 800, tracking-tight, max-w-[520px]), subtitle (body-large, text-muted, max-w-[480px] mt-4), button row (primary CTA + ghost secondary, mt-8 flex gap-4 flex-wrap).
- [ ] H5. Hero right column: `<div className="relative h-[440px] w-full hidden md:block">`. Inside: `<Image src="/assets/brand-images/landpress-marketing-hero.png" alt="Creator reviewing TikTok Creator Rewards earnings dashboard" fill className="object-contain object-right" priority />`.
- [ ] H6. Hero stagger animation from moumensoliman component: eyebrow fades in first, then H1, then subtitle, then buttons. Stagger delay 150ms between each element. Honor `prefers-reduced-motion`.
- [ ] H7. Trust bar: three stats. Desktop: `flex items-center justify-center gap-12 md:gap-16`. Mobile: grid-cols-3.
- [ ] H8. Trust bar numbers: countUp animation via `useCountUp` hook. Animation triggers on IntersectionObserver — initial render must show the TARGET number (not 0) as a `data-target` attribute or SSR-safe fallback. Fix: render the final number as the initial state and only trigger animation if JavaScript is available and element enters viewport.
- [ ] H9. Trust bar stats: exactly these three: "64 Guides", "3 Free Calculators", "Updated 2026". Labels below numbers in 12px text-muted.
- [ ] H10. Content pillars section: four cards in `grid grid-cols-2 md:grid-cols-4 gap-4`. Each card: white bg, `border border-[#EADFD3] rounded-2xl p-6`, hover `border-[#F4A261] shadow-sm`. Icon: Lucide SVG 24px, orange. Title: H3. Description: 14px body.
- [ ] H11. Content pillars use 21st.dev jatin-yadav05/feature-spotlight as reference. URL: https://21st.dev/components/jatin-yadav05/feature-spotlight — visit and copy. Adapt card structure.
- [ ] H12. Calculator preview: inline panel showing one input (monthly views) and a calculated result. Link to full calculator via ghost button "Calculate your earnings".
- [ ] H13. Featured guides: three cards using the guide card component. Section heading: H2 "Start with these guides". Card grid: `grid md:grid-cols-3 gap-4`.
- [ ] H14. Email capture section uses 21st.dev ruixenui/newsletter-form as starting point. URL: https://21st.dev/components/ruixenui/newsletter-form — visit and copy.
- [ ] H15. Email capture section: two-column on desktop (`grid md:grid-cols-2 gap-12 items-center`), single column on mobile. Background: `bg-[#FFF1E6]`, `rounded-3xl`, `px-8 py-12`.
- [ ] H16. Email capture LEFT column: headline (H2), description (body), email input + submit button (primary style, label "Get Free Checklist"), small-print disclaimer in 12px text-subtle below button.
- [ ] H17. Email capture RIGHT column: `<div className="relative h-[360px] w-full hidden md:block">`. Inside: `<Image src="/assets/brand-images/landpress-marketing-4.png" alt="Creator receiving TikTok earnings notification" fill className="object-contain object-right" />`.
- [ ] H18. Footer uses 21st.dev efferd/minimal-footer as starting point. URL: https://21st.dev/components/efferd/minimal-footer — visit and copy.
- [ ] H19. Footer: white background (NOT dark, NOT gray). Four columns: brand description + three link groups. Bottom bar: affiliate disclosure text. Manrope 400 14px text-muted for all footer body text.
- [ ] H20. All scroll reveal animations (`.reveal`, `.reveal-stagger` classes) apply to trust bar, content pillars, featured guides, and email capture sections. Not to the hero (which has its own entry animation).

---

### Guide / Article Page

- [ ] A1. Page header: two-column grid on desktop (`grid md:grid-cols-[3fr_2fr] gap-12 items-center`). Background: `bg-[#FFF7ED]`. Padding: `py-12 md:py-16`.
- [ ] A2. Page header LEFT column: breadcrumb (Lucide `ChevronRight` separators, 14px), category badge (orange-soft pill), H1 (Manrope 700, max-w-[540px]), description (body-large text-muted max-w-[480px] mt-3), meta row (read time + last-updated date, 14px text-subtle, Lucide `Clock` and `Calendar` icons).
- [ ] A3. Page header RIGHT column: illustration matched to guide category per Section 9 map. `<div className="relative h-[320px] w-full hidden md:block">`. `<Image src="{matched-illustration}" alt="{descriptive alt}" fill className="object-contain object-right" />`. This column MUST NOT be empty.
- [ ] A4. Category badge: `bg-[#FFE9D5] text-[#E58B3A] text-[12px] font-[600] px-3 py-1 rounded-full inline-block`.
- [ ] A5. Article body: two-column layout on desktop. Left column: sticky ToC (`w-64 shrink-0 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto`). Right column: article prose (`max-w-prose`).
- [ ] A6. Sticky ToC: visible on desktop only (`hidden md:block`). Contains H2 and H3 headings as links. Active heading highlighted with orange left border. Font: 14px Manrope 500 text-muted, active: text-[#101828].
- [ ] A7. Article body max-width: `max-w-prose` (65ch). Never full-container-width.
- [ ] A8. Callout boxes: all four variants (tip, warning, info, error) per Section 8 spec. Left border 4px solid, tinted background, Lucide icon, bold label.
- [ ] A9. End-of-article CTA: one of — email capture (inline, compact version) OR affiliate recommendation. Not both on the same page.
- [ ] A10. Related guides: `grid md:grid-cols-3 gap-4`. Heading: "Related guides" H2.
- [ ] A11. Reading progress bar: 3px height, `fixed top-0 left-0 right-0 z-50`, background `#F4A261`, width driven by scroll position. Already built in tokens.css — ensure it is wired to the guide page.

---

### Calculator Pages

- [ ] C1. Calculator page header: two-column on desktop (`grid md:grid-cols-[3fr_2fr] gap-12 items-center`), single column on mobile. Background: `bg-[#FFF7ED]`. Padding: `py-12 md:py-16`.
- [ ] C2. Calculator header LEFT column: H1 (Manrope 700), description (body-large text-muted mt-3).
- [ ] C3. Calculator header RIGHT column: `<div className="relative h-[320px] w-full hidden md:block">`. `<Image src="/assets/brand-images/landpress-marketing-hero.png" alt="Creator analyzing TikTok earnings with calculator" fill className="object-contain object-right" />`. This column MUST NOT be empty.
- [ ] C4. Calculator uses 21st.dev radu-activation-popescu/pricing-slider-loops as reference for slider behavior. URL: https://21st.dev/components/radu-activation-popescu/pricing-slider-loops — visit and reference the slider interaction pattern.
- [ ] C5. Calculator layout: two-panel on desktop (`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto`), stacked on mobile.
- [ ] C6. Input panel: white background. Each input group: label (14px Manrope 500 text-muted) above field. Input field: `bg-[#F9EDE1] border border-[#EADFD3] rounded-xl focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261] focus:ring-offset-1`. Numeric values in fields: `font-mono`.
- [ ] C7. Slider (if present): track `#EADFD3`, fill `#F4A261`, thumb white circle with `border-2 border-[#F4A261]`.
- [ ] C8. Results panel: `bg-[#FFF7ED] border border-[#EADFD3] rounded-2xl p-6`. Primary result: `font-mono font-[700] text-[2rem] md:text-[2.5rem] text-[#0B0F1A]`. Secondary metrics: `font-mono font-[500] text-[1.25rem] text-[#475467]`.
- [ ] C9. No affiliate CTAs in the results panel. Only links to related guides.
- [ ] C10. "What affects your results?" section: placed BELOW the calculator component, ABOVE related guides. Contains H2 heading, 2–3 paragraphs of prose explanation (RPM factors, qualified view thresholds), and inline guide links styled as ghost buttons (`text-[#F4A261] hover:underline font-[500]`). This section is required on every calculator page.
- [ ] C11. Related calculators: `grid md:grid-cols-2 gap-4`, 2 cards only.

---

### 404 Page

- [ ] E1. 404 page does NOT contain `<div class="illustration-placeholder">404</div>`. This element must be replaced.
- [ ] E2. 404 page: centered layout, `max-w-md mx-auto text-center py-24 px-4`.
- [ ] E3. 404 illustration: `<div className="relative h-[320px] w-full max-w-[320px] mx-auto mb-8">`. `<Image src="/assets/brand-images/landpress-marketing-4.png" alt="Creator looking puzzled at a broken page" fill className="object-contain" />`.
- [ ] E4. 404 heading: H1 "Page not found", body text explaining, primary button "Back to home", ghost button "Browse guides".

---

### Guides Listing / Index Page

- [ ] L1. Guide cards use sumonadotwork/blog-cards as starting component. URL: https://21st.dev/components/sumonadotwork/blog-cards — visit and copy. Adapt per Section 8.
- [ ] L2. Card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`. No card images — category badge instead.
- [ ] L3. Category badge on cards: `bg-[#FFE9D5] text-[#E58B3A] text-[12px] font-[600] px-3 py-1 rounded-full`.
- [ ] L4. "New" badge on cards (where applicable): `bg-[#EFF8FF] text-[#0EA5E9] text-[12px] font-[700] px-2 py-1 rounded-full`.
- [ ] L5. Card hover: `border-[#F4A261] shadow-sm` transition 150ms.
- [ ] L6. Filter bar: horizontal flex, gap-2, overflow-x-auto on mobile. Buttons: secondary style, active filter uses primary style (orange).

---

### Roundup / Comparison Pages

- [ ] R1. Page header: same two-column structure as guide pages. RIGHT column illustration: `landpress-marketing-3.png` (tools/comparison subject). `h-[320px]`, fill, object-contain.
- [ ] R2. Comparison table uses vaib215/pricing-table as reference. URL: https://21st.dev/components/vaib215/pricing-table — visit and reference. Adapt per Section 8 custom spec.
- [ ] R3. Table wrapper: `overflow-x-auto relative`. Mobile right-fade: `after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-8 after:bg-gradient-to-l after:from-white after:pointer-events-none`.
- [ ] R4. First column sticky on mobile: `sticky left-0 bg-white z-10 font-[600]`.
- [ ] R5. Recommended row: `border-l-4 border-[#F4A261] bg-[#FFF7ED]`.
- [ ] R6. Check icon: Lucide `Check` size 16, wrapped in `<span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#DCFCE7]">`.
- [ ] R7. X icon: Lucide `X` size 16, wrapped in `<span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FEF2F2]">`.
- [ ] R8. Affiliate CTA: below table, NOT inside table cells. Format per Section 8 affiliate button spec with "Affiliate" label above button.

---

### Pre-Delivery Checklist

Before any build is marked complete, verify every item in this list:

- [ ] P1. All four brand images (`landpress-marketing-hero.png`, `landpress-marketing-2.png`, `landpress-marketing-3.png`, `landpress-marketing-4.png`) appear on at least one page each. Confirm by searching the codebase for each filename.
- [ ] P2. Homepage hero is two-column with illustration in right column. Verify by resizing browser to 1280px.
- [ ] P3. Logo has distinct visual weight from nav links (18px, tracking-tight, Ink Strong).
- [ ] P4. All six 21st.dev component URLs were visited and code was copied (or a documented substitute was used). Source URL commented in each component file.
- [ ] P5. 404 page contains no `illustration-placeholder` div.
- [ ] P6. Calculator pages have "What affects your results?" prose section below the calculator.
- [ ] P7. Trust bar shows non-zero numbers on page load (no flash of zeros).
- [ ] P8. No white text on orange backgrounds. Screenshot every orange button and verify text is dark.
- [ ] P9. All icons are Lucide SVG. No emojis used as icons.
- [ ] P10. Mobile layout tested at 390px viewport for: homepage, one guide page, one calculator page. No horizontal scroll except inside intentional overflow-x-auto components.
- [ ] P11. `prefers-reduced-motion` tested by enabling in OS accessibility settings. All animations stop.
- [ ] P12. Affiliate disclosure text is visible in footer on every page type.
- [ ] P13. Guide article body does not exceed `max-w-prose` (65ch) on any viewport. Verify by opening a guide and measuring the text column width.
- [ ] P14. Reading progress bar visible and functional on guide/article pages.

---

## Lucide Icons Reference

The complete list of icons used on this site. Only icons on this list are approved. Do not introduce other icon sets.

```
import {
  ChevronRight,  // breadcrumb separators, card arrows, button arrows
  ChevronDown,   // dropdown indicators
  Menu,          // mobile hamburger
  X,             // mobile nav close, comparison table X
  Clock,         // read time meta
  Calendar,      // last-updated meta
  Check,         // comparison table check, success states, checklist items
  Info,          // tooltip triggers, info callout icon
  Lightbulb,     // tip callout icon
  AlertTriangle, // warning callout icon
  XCircle,       // error callout icon
  ExternalLink,  // affiliate link indicators
  BookOpen,      // guides section / nav icon
  Calculator,    // calculator section / nav icon
} from 'lucide-react'
```

Size reference: nav icons 18px, inline content icons 16px, callout header icons 16px, card icons 20–24px, feature spotlight icons 24px.

---

*Vale — Brand Architect*
*2026-03-15*
