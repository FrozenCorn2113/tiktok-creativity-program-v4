# Vale Brand Implementation Review
**Reviewer:** Vale
**Date:** 2026-03-15
**Site:** http://localhost:3001
**Score: 41/100**

Brett's 10% is unfair to the token/CSS infrastructure work. But his instinct that something is deeply wrong is correct. The site is incomplete, not broken. Significant systems were built correctly. The visual layer that makes it a *brand* — illustrations, logo, hero layout, the identity signals — is entirely absent.

---

## What Devan Got Right

### 1. Design Token System — Excellent
The `tokens.css` file is a faithful reproduction of every value in BRAND.md. All color tokens are correct (`--color-primary: #F4A261`, `--color-ink-strong: #0B0F1A`, all surface/border/text tokens). Typography tokens are correct. Radius tokens are correct. Shadow tokens are correct. This is the foundation and it was done right.

### 2. Fonts — Correct
Both fonts are loading. `Manrope:wght@400;500;600;700;800` and `JetBrains Mono:wght@400;500` are in the `<head>`. The mono font is applied via the `.mono-output` class for calculator numerics. Heading elements inherit `var(--font-sans)` which resolves to Manrope. Type scale tokens map to the BRAND.md spec.

### 3. Button Component — Correct
The `Button.tsx` component implements every variant I specified: primary (orange, ink-strong text, correct on hover), secondary (white, border, warm-white hover), ghost (orange text, underline hover), affiliate (wider radius), dark. The WCAG rule — dark ink on orange, never white text on orange — is obeyed throughout. This was a specific requirement and it was followed.

### 4. Guide Cards — Correct
`GuideCard.tsx` matches the spec: `--radius-lg` border, `#EADFD3` border color, orange border on hover, orange-soft category badge with orange-dark text, "New" badge in info blue, 2-line title clamp, 3-line description clamp. The grid structure (1 col mobile, 2 col tablet, 3 col desktop) is correct.

### 5. Callout Boxes — Correct
`CalloutBox.tsx` implements all four callout types from BRAND.md Section "Callout Boxes, Pro Tips, Warnings." Left borders use the exact semantic colors specified: brand orange for tip, warning amber for warning, info blue for info, error red for error. Background fills match. The `max-w-[65ch]` constraint is applied. This is one of the most faithful component implementations in the build.

### 6. Calculator Component — Largely Correct
`EarningsCalculator.tsx` follows the two-panel layout spec. Input panel uses `var(--color-surface-inset)` on fields. Results panel uses `var(--color-surface-warm)`. Focus states use the orange focus ring. Mono font on numeric outputs. The `accent-[var(--color-primary)]` slider override is there. The no-affiliate-CTAs-in-calculator rule is honored — only a guide link appears in the results area.

### 7. Scroll Reveal + CountUp Animations — Correct
`ScrollReveal.tsx` drives `IntersectionObserver` on `.reveal` and `.reveal-stagger` elements. The CSS keyframes (`slideUp`, `fadeSlideUp`, `scaleIn`) are defined. `prefers-reduced-motion` is respected. The `useCountUp` hook in `TrustBar.tsx` uses `requestAnimationFrame` with ease-out cubic easing. These were specified in BRAND.md and they were built.

### 8. Navigation — Mostly Correct
Sticky header, scroll shadow, orange underline on active nav items (via `.nav-underline` CSS), dropdown menus with warm-white hover states, mobile hamburger, "Start here" CTA button. No animated X hamburger (as specified). The mobile menu slides in from right per spec.

### 9. Footer — Correct
Four-column layout (brand description + three link columns), white background (not dark — spec says never use dark footer), mandatory affiliate disclosure in the bottom bar, correct text sizing and muted link colors. Matches BRAND.md Section "Footer" precisely.

### 10. CSS Animations / Interactive Details
`.accent-underline` on the hero headline (orange underline mark, z-index correct), `.nav-underline::after` growing on hover, staggered reveal delays on grid children, reading progress bar. These refinements were specified and implemented.

---

## What Devan Completely Missed

### MISS 1 — No Illustrations. Zero. Anywhere. (Critical)
This is the single biggest failure and it defines everything Brett sees when he rates the site.

BRAND.md Section "Illustration Style Guide" specified 22 illustration scenes with detailed briefs. Four existing brand images are sitting in `assets/brand-images/` (`landpress-marketing-hero.png`, `landpress-marketing-2.png`, `landpress-marketing-3.png`, `landpress-marketing-4.png`). None of them appear anywhere on the site.

The homepage has no illustration in the hero. No illustration in the email capture section. The 404 page has a hardcoded `<div class="illustration-placeholder">404</div>` — a dashed box with literal text. The guide page header has no illustration. The calculator page has no illustration.

Two SVG illustration components exist (`WorkingIllustration.tsx`, `CollaborationIllustration.tsx`) but neither is imported or rendered on any page. They were built and abandoned.

**Without illustrations this is a generic text site. The illustrations are the brand. This is the whole point.**

BRAND.md Section "Competitive Differentiation" states explicitly: "The illustration set alone signals investment." Devan built the skeleton and left out the skin.

**Fix:** Immediately use the four existing `landpress-marketing-*.png` files. Place `landpress-marketing-hero.png` in the homepage hero section (BRAND.md Section "Homepage / Landing", step 2 specifies a right-column illustration at 40% width). Place `landpress-marketing-2.png` or `landpress-marketing-4.png` in the email capture section (spec calls for Scene 08 on the right). Place a relevant image in guide page headers. This costs zero generation time — the assets exist and are unused.

### MISS 2 — Hero Layout is Wrong (Critical)
BRAND.md Section "Homepage / Landing" specifies a **two-column hero**: left column 60% (headline + value prop + CTA), right column 40% (illustration). The hero is centered, max-width `max-w-5xl`.

What was built: a centered single-column hero with text and two buttons. The grid is missing. There is no image column. The spec was explicit — even providing the exact Tailwind code:

```
grid md:grid-cols-[3fr_2fr] gap-12 items-center
```

This wasn't an interpretation call. The spec was copy-paste ready. The illustration slot simply wasn't included.

The background also uses `bg-[var(--color-surface-warm)]` without the white-to-warm-white gradient specified (`bg-gradient-to-b from-white to-[#FFF7ED]`).

### MISS 3 — No Logo Treatment (Significant)
BRAND.md Section "Navigation / Header" specifies: "Logo: site name in Manrope 700, ink color. No wordmark icon needed unless one is designed separately."

What was built: `<span class="font-bold text-[0.9375rem]">TikTok Creativity Program</span>` — 15px, bold. The specified size is effectively correct but it's rendered as a standard span, not a purposeful logo element. More importantly, there is no visual differentiation between the logo text and a nav link. The logo reads identically to surrounding UI text in weight, color, and sizing.

A proper logo treatment would give the name visual authority in the nav — slightly larger (16–18px), a specific tracking value, or a container that separates it visually from the links. Right now the nav reads left-to-right as a uniform stripe of text. The logo doesn't land.

### MISS 4 — None of the 21st.dev Components Were Used
BRAND.md Section "Component References" specified 11 verified 21st.dev component URLs with explicit instructions: "Browse the URL, view the live preview, copy the component code via the 'Copy' button on 21st.dev."

Zero components from 21st.dev appear in the build. There is no evidence in the source files of any 21st.dev component being evaluated, pulled, or adapted. Every component is a custom build from scratch.

This isn't inherently a failure — custom builds can be better — but:
- The hero section specifically missed the moumensoliman staggered animation approach I recommended
- The newsletter/email form is a from-scratch build when `ruixenui/newsletter-form` was verified and ready
- The efferd/header-1 sticky behavior with scroll blur was specified and the nav uses a simpler scroll-shadow approach instead

The instruction was clear. It wasn't followed.

### MISS 5 — Calculator Page Missing Illustration and Context Section
BRAND.md Section "Calculator Pages" specifies:
1. A header section with relevant illustration (Scene 03) right-aligned on desktop, warm-white background
2. A "Contextual guidance" section below the calculator: "What affects your results?"
3. Related calculators section (2 cards)

The live calculator page has a header (title + description), then immediately the calculator. No illustration. No contextual guidance section below the calculator (the FAQ section present is different — spec calls for prose guidance about RPM factors, content length, etc., with topical links to guides). The related calculators links do not appear as cards.

### MISS 6 — Guide Page Missing Illustration in Header
BRAND.md Section "Guide / Article Page" specifies: "a relevant illustration (one of the 12 scenes matched to content type) — right-aligned on desktop, full-width on mobile."

The guide header has breadcrumbs, category badge, H1, description, and meta. No illustration. The `PageHeader` component has no illustration prop.

Four existing images in `assets/brand-images/` could be mapped to content types right now:
- `landpress-marketing-hero.png` → general eligibility/earnings guides
- `landpress-marketing-2.png` → success/earnings topic
- `landpress-marketing-3.png` → tools/comparison topic
- `landpress-marketing-4.png` → application/process topic

### MISS 7 — Homepage Missing Two Required Sections
BRAND.md Section "Homepage / Landing" specifies 8 sections. The build has 6:

| Spec Section | Status |
|---|---|
| 1. Navigation | Built |
| 2. Hero (two-column with illustration) | Built but wrong — single column, no illustration |
| 3. Trust bar | Built |
| 4. Content pillars (4 cards) | Built |
| 5. Calculator preview (inline, links to full calculator) | Built — this was done well |
| 6. Featured guides strip (3 cards) | Built |
| 7. Email capture with Scene 08 illustration | Built, but no illustration |
| 8. Footer | Built |

The main issue isn't missing sections — it's that sections 2 and 7 are missing their illustrations. Those are the two places where the brand makes a visual statement.

### MISS 8 — Trust Bar Stats Show Zero (Minor but Visible)
The TrustBar `defaultStats` array is hardcoded: 64 guides, 3 calculators, Updated for 2026. But the homepage renders "0 guides, 0 free calculators, Updated for 0" on the server-rendered HTML because the countUp animation starts at 0 and the `isVisible` state triggers only client-side via `IntersectionObserver`.

This is a client-side hydration visibility issue. On first server-rendered load the numbers appear as 0. When JavaScript hydrates and the user scrolls past the element, they animate up. For a user who sees the trust bar in the initial viewport without scrolling, the numbers may appear to be broken.

---

## What Needs to Be Rebuilt

### Priority 1 — Illustrations Everywhere (Blocking)
This one change transforms the visual rating from 41 to at least 65 before anything else changes. The assets exist.

Specific changes:
1. **Homepage hero:** Add right column (`md:grid-cols-[3fr_2fr]`), insert `landpress-marketing-hero.png` or `WorkingIllustration.tsx`. If using the SVG component, it renders immediately with no image load.
2. **Homepage email capture:** Insert `landpress-marketing-4.png` on the right side of the email form section (desktop). Spec: Scene 08, right column, inline above text on mobile.
3. **Guide page header:** Add illustration prop to `PageHeader`. Map by category: Eligibility/Application → `landpress-marketing-hero.png`, Earnings → `landpress-marketing-2.png`, Tools → `landpress-marketing-3.png`.
4. **404 page:** Replace the `illustration-placeholder` div with `WorkingIllustration.tsx` or an actual image. The component exists. Use it.
5. **Calculator page header:** Add illustration to the header band.

### Priority 2 — Fix Hero Layout
Change the homepage hero from centered single-column to the specified two-column split. The code was provided in BRAND.md Section "1 — Hero Section":

```
<div class="max-w-5xl mx-auto px-4 grid md:grid-cols-[3fr_2fr] gap-12 items-center">
```

Add the gradient: `bg-gradient-to-b from-white to-[#FFF7ED]`.

### Priority 3 — Logo Visual Weight
Give the site name in the nav a distinct visual identity — at minimum 16px instead of 15px, a slight letter-spacing value, or a wrapper element that creates separation from the nav links. It currently disappears into the navigation.

### Priority 4 — Calculator Page Contextual Section
Add the "What affects your results?" section below the calculator as plain prose with guide links. This is brand behavior — tools that teach, not just calculate.

### Priority 5 — Re-evaluate 21st.dev Components
At minimum, look at:
- `moumensoliman/hero-section-shadcnui` for the hero staggered animation pattern
- `ruixenui/newsletter-form` to evaluate against the current email form
- `vaib215/pricing-table` as structural reference for comparison tables

---

## Specific BRAND.md Section References for Fixes

| Fix | BRAND.md Section |
|---|---|
| Hero two-column layout + gradient | "Homepage / Landing" → Section 2 + "1 — Hero Section" implementation spec |
| Illustration placement rules | "Illustration Style Guide" → existing images, Scene assignments |
| Guide header illustration | "Guide / Article Page" → Step 2 |
| Calculator header + contextual section | "Calculator Pages" → Steps 2 and 4 |
| Logo weight | "Navigation / Header" → Logo specification |
| 21st.dev components | "Component References" → Quick Reference table |
| Trust bar zero state | Implementation bug — not in BRAND.md |

---

## Overall Score: 41/100

### Breakdown

| Area | Score | Notes |
|---|---|---|
| Brand colors / tokens | 9/10 | Token system is complete and faithful. Minor: gradient on hero background missing. |
| Typography | 9/10 | Both fonts load. Type scale correct. JetBrains Mono on outputs. |
| Component fidelity (cards, callouts, buttons, calculator) | 8/10 | Cards, callouts, calculator, buttons — all match spec closely. |
| 21st.dev components | 0/10 | None used. Instruction was explicit and unambiguous. |
| Illustrations | 0/10 | Four existing assets unused. Two SVG components built and abandoned. Zero images on any page. |
| Animations/interactions | 7/10 | Scroll reveals, stagger, countUp all built. countUp has a zero-flash issue on server render. |
| Page layouts | 5/10 | Homepage hero wrong (single column). Guide/calculator headers missing illustration slots. Trust bar stats broken on SSR. |
| Overall feel | 3/10 | Reads as a competent generic blog. The illustration system is what makes this site different. Without it, there is nothing to distinguish it from any other Tailwind/Next.js content site. |
| Logo | 2/10 | Text only, same visual weight as navigation links. No identity. |

The infrastructure is solid — Devan built a well-engineered design system. But a design system is not a brand. The brand is the illustration identity, the warmth, the visual personality that makes the page say something before anyone reads a word. That layer is missing entirely. The site currently looks like a staging environment waiting for assets that never arrived.

---

*Vale — Brand Architect*
*2026-03-15*
