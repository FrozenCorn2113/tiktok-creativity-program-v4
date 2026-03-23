# BUILD PLAN: TikTok Creativity Program — Brand Rebuild
**Prepared by:** Devan
**Date:** 2026-03-15
**Status:** Ready for execution (pending Brett approval of Vale's brand direction)
**Blocked by:** Phase 3 Scribe content delivery (product/resource page copy)

---

## Pre-Build State Assessment

The codebase is in better shape than the PROJECT.md "disgusting design" note implies. The routing structure is solid, TypeScript is strict, the lib/ layer is clean, and the token system is already partially aligned with Vale's spec. The main problems are:

1. `tailwind.config.js` still references Inter and old TikTok brand colors (red/blue). Completely wrong palette.
2. `Button.tsx` uses `text-white` on the orange primary variant — direct WCAG violation per Vale's spec.
3. `CalloutBox.tsx` uses arbitrary Tailwind color classes (emerald, amber, teal, blue) instead of the design token values.
4. `ComparisonTable.tsx` is missing: winner row, sticky first column, scroll fade, check/X icon support.
5. `EarningsCalculator.tsx` uses `text-white` on the calculate button — same WCAG violation.
6. Homepage has only 2 sections. Vale specced 7. Major rebuild needed.
7. There is no `QuickPickBox`, no `RoundupPage` template, no `AffiliateLinkButton` component.
8. `tailwind.config.ts` exists alongside `tailwind.config.js` — duplicate, need to resolve.
9. No Lucide icons installed. Vale specs Lucide for CheckCircle2, XCircle, Minus, ChevronRight.
10. Font import in `layout.tsx` has the preconnect tags but no actual Google Fonts `<link>` href for Manrope or JetBrains Mono.

---

## 1. Dependencies

### Add
```
lucide-react          # Icons — CheckCircle2, XCircle, Minus, ChevronRight, Info, AlertTriangle, Lightbulb, ArrowRight
@tailwindcss/forms    # Reset for input/checkbox/select styling (calculator inputs need it)
```

### Already present — no action needed
- `tailwindcss`, `@tailwindcss/typography` — keep
- `next-mdx-remote`, `@mdx-js/loader`, `@next/mdx` — keep
- `rehype-slug`, `rehype-pretty-code` — keep (ToC and code blocks depend on them)
- `zod` — keep (API validation)

### Remove / Replace
- `tailwind.config.ts` — delete, keep only `tailwind.config.js` (duplicate, causes ambiguity)
- `@vitejs/plugin-react` — Vite-era artifact in devDependencies. Safe to remove. Not used in Next.js build.

### Fonts — handled via CSS import, NOT npm
Google Fonts are loaded via `@import` in `globals.css`. No npm package needed. The current `layout.tsx` has preconnect tags but no actual font href — that gets fixed in the CSS rewrite.

---

## 2. Files to Rewrite (Priority Order)

### Layer 0 — Foundation (do these first, everything else depends on them)

| File | Current problem | What changes |
|------|----------------|--------------|
| `tailwind.config.js` | Wrong palette (Inter, TikTok red/blue), no custom tokens | Full rewrite: Manrope + JetBrains Mono fonts, full Vale color palette mapped to Tailwind names, radius/shadow tokens |
| `src/styles/tokens.css` | Mostly correct but some token names differ from MASTER.md spec; shadow values wrong | Rewrite to match MASTER.md exactly: variable names, values, shadow depths |
| `src/app/globals.css` | Missing Google Fonts import; Tailwind directives are fine | Add `@import` for Manrope + JetBrains Mono; keep Tailwind directives; remove `@import "../styles/global.css"` (consolidate into tokens.css) |
| `src/styles/global.css` | Redundant file; tokens should live in `tokens.css` | Merge any non-token rules into `globals.css`, then delete this file |

### Layer 1 — Layout Shell (do these second — visible on every page)

| File | Current problem | What changes |
|------|----------------|--------------|
| `src/app/layout.tsx` | Missing font `<link>` href in `<head>`, body class uses wrong bg token | Add font link tag; update body class to use correct token; add `pt-16` to `<main>` to clear fixed nav |
| `src/components/Navbar.tsx` | Structure is good; needs scroll-shadow behavior (currently uses `backdrop-blur`, not in Vale spec); no `cursor-pointer` on logo; dropdown uses `group-hover:block` which won't work on mobile | Add scroll event listener for `scrolled` class with `--shadow-sm`; fix dropdown to be keyboard-accessible; update active link style (orange underline per spec); mobile: slide-in panel from right, not dropdown |
| `src/components/Footer.tsx` | Structure is good; "TC" text logo needs replacing with site name in Manrope 700; affiliate disclosure in bottom bar is present — keep | Restyle to match Vale spec: 3-column layout, bottom bar with affiliate disclosure. Remove Badge component from footer (overkill). |

### Layer 2 — Base UI Components

| File | Current problem | What changes |
|------|----------------|--------------|
| `src/components/ui/Button.tsx` | `primary` variant uses `text-white` — WCAG violation | Change primary to `text-[#0B0F1A]`; add `btn-affiliate` variant; add `ghost` variant; fix all padding/radius to match spec |
| `src/components/ui/Badge.tsx` | Uses `tone="accent"` prop system — not aligned with spec | Rewrite with `variant` prop: `category` (orange soft bg), `new` (blue soft bg), `muted` |
| `src/components/ui/Container.tsx` | Likely fine — check max-width | Verify `max-w-5xl` and responsive padding; update if needed |

### Layer 3 — Feature Components (the heavy work)

| File | Current problem | What changes |
|------|----------------|--------------|
| `src/components/CalloutBox.tsx` | Uses arbitrary Tailwind colors, not design tokens; wrong callout types (`success` not in spec, should be `tip`) | Full restyle: left-border pattern, Vale token colors, add Lucide icons, rename types to `tip/warning/info/error` |
| `src/components/ComparisonTable.tsx` | Missing winner row, sticky column, scroll fade, check/X icons; uses `bg-slate-50` for alternating rows | Full restyle + feature additions: winner row prop, check/X/partial cell rendering, sticky first col, scroll fade overlay |
| `src/components/EarningsCalculator.tsx` | `text-white` on calculate button; results area needs JetBrains Mono; slider unstyled; missing email capture CTA link to guide (not directly inline) | Restyle inputs to `--color-surface-inset` bg; fix button text color; apply JetBrains Mono to number output; style slider per spec; replace `EmailSignupForm` inline with muted "Improve your RPM →" text link |
| `src/components/TableOfContents.tsx` | No sticky behavior; no active state indicator; no mobile accordion | Add `sticky top-20` for sidebar usage; add active item indicator (orange left dot); create mobile accordion variant |
| `src/components/AffiliateLink.tsx` | Only renders as inline text link — needs button variant | Add `variant="button"` prop that renders as `btn-affiliate` style with arrow icon and "Affiliate" label above |
| `src/components/EmailSignupForm.tsx` | Needs Vale styling — `#FFF1E6` bg, 24px radius, 48px input height | Restyle to match inline form spec; add `variant="hero"` for 56px oversized start-here variant |
| `src/components/ArticleCard.tsx` | Probably uses image — Vale spec says NO images in guide cards | Remove image slot; add category badge (pill), read time + chevron; apply card hover border-orange spec |
| `src/components/RpmByCountryCalculator.tsx` | Same issues as EarningsCalculator | Same fixes — JetBrains Mono on numbers, input surface inset bg, fix button text color |
| `src/components/FollowerIncomeEstimator.tsx` | Same issues | Same fixes |
| `src/components/ReadingProgressBar.tsx` | Likely wrong color | Change to Brand Orange `#F4A261` |
| `src/components/SocialShareButtons.tsx` | Likely wrong colors/icons | Restyle with Lucide or Simple Icons; use Vale colors |
| `src/components/SubNav.tsx` | Wrong colors | Restyle — pill tabs: active = orange bg, inactive = white + border |
| `src/components/StepCard.tsx` | Likely wrong colors | Restyle per Vale card spec |
| `src/components/JourneyCard.tsx` | Likely wrong colors | Restyle |
| `src/components/ProTipBox.tsx` | Replace or merge | Consolidate into `CalloutBox` with `type="tip"`. If this is a standalone wrapper, deprecate and replace with CalloutBox in MDX components map. |
| `src/components/mdx-components.tsx` | Maps MDX elements to components — needs updated mappings for new CalloutBox, no-image policy | Update mappings; ensure prose styles use Tailwind Typography plugin overridden to Manrope; check `blockquote`, `table`, `code` styles |

### Layer 4 — Pages (after components are stable)

| File | What changes |
|------|--------------|
| `src/app/page.tsx` | Full rebuild to Vale's 7-section homepage layout |
| `src/app/guides/page.tsx` | Add page header, search bar, category filter tabs (SubNav), 3-col card grid |
| `src/app/guides/[slug]/page.tsx` | Add guide header (breadcrumb, badge, H1, date, read time, illustration slot), sticky ToC sidebar, related guides strip |
| `src/app/calculators/page.tsx` | Calculator hub: card grid linking to 3 calculators |
| `src/app/calculators/earnings-calculator/page.tsx` | Calculator header with Scene 03 illustration, panel layout, contextual guidance section |
| `src/app/calculators/rpm-by-country/page.tsx` | Same pattern as earnings-calculator |
| `src/app/calculators/follower-income-estimator/page.tsx` | Same pattern |
| `src/app/start-here/page.tsx` | Nav-less layout; oversized email form; trust strip; Scene 12 illustration |
| `src/app/locations/[slug]/page.tsx` | Guide page template (same as guides/[slug]) |
| `src/app/niche/[slug]/page.tsx` | Guide page template |
| `src/app/products/page.tsx` | Blocked on Scribe copy — placeholder styling only for now |
| `src/app/resources/page.tsx` | Blocked on Scribe copy — placeholder styling only for now |
| Utility pages (about, contact, privacy, terms, affiliate-disclosure, newsletter, sponsor, media, troubleshooting) | Apply consistent page header component; restyle prose content |

---

## 3. New Files to Create

| File | What it is | Source |
|------|-----------|--------|
| `src/components/QuickPickBox.tsx` | The "top recommendation" box for roundup pages — orange left border, warm white bg, product name, one-line verdict, affiliate button | Custom build from Vale's roundup spec |
| `src/components/AffiliateLinkButton.tsx` | Full button-style affiliate link with "Affiliate" label above and arrow icon | Custom build from Vale's button spec — distinct from the inline `AffiliateLink` text link |
| `src/components/GuideCard.tsx` | New card for guide listing pages — replaces/supersedes `ArticleCard.tsx` | Custom build from Vale's guide card spec |
| `src/components/TrustBar.tsx` | The 3-stat strip under the homepage hero | Custom build — simple, but extracted as reusable |
| `src/components/CategoryFilterTabs.tsx` | Pill tabs for the guide hub filter | Custom build |
| `src/components/PageHeader.tsx` | Reusable section header: breadcrumb + badge + H1 + meta line | Custom build — used on guide, calculator, and roundup pages |
| `src/components/RelatedGuides.tsx` | 3-card strip at bottom of guide and roundup pages | Custom build |
| `src/components/CalculatorPreview.tsx` | Simplified non-functional calculator preview for homepage (clicks through to full calculator) | Custom build |
| `src/components/RoundupProductSection.tsx` | Individual product section (H2 + verdict + review paragraphs + affiliate CTA) for roundup pages | Custom build |
| `src/app/not-found.tsx` | 404 page using Scene 11 illustration (person shrugging at broken screen) | Custom build |

---

## 4. Build Sequence

Each step must leave the site in a buildable state (`npm run build` passing). Do not start a step until the previous step builds clean.

### Step 1 — Dependencies and Config (30 min)
1. Remove `tailwind.config.ts` (duplicate)
2. Remove `@vitejs/plugin-react` from devDependencies
3. Install `lucide-react` and `@tailwindcss/forms`
4. Rewrite `tailwind.config.js` — Manrope/JetBrains Mono fonts, Vale palette mapped to Tailwind, radius and shadow tokens
5. Run `npm run build` — verify clean

### Step 2 — Token and Global CSS (20 min)
1. Rewrite `src/styles/tokens.css` to MASTER.md exact spec
2. Merge `src/styles/global.css` into `globals.css` and delete `global.css`
3. Update `src/app/globals.css` — add Google Fonts import, clean up
4. Run `npm run build`

### Step 3 — Layout Shell (45 min)
1. Fix `src/app/layout.tsx` — font link in head, body class correction, `pt-16` on main
2. Restyle `src/components/Navbar.tsx`
3. Restyle `src/components/Footer.tsx`
4. Run `npm run build` — verify every page still loads

### Step 4 — Base UI Components (30 min)
1. Fix `Button.tsx` — WCAG text color, new variants
2. Fix `Badge.tsx` — new variant system
3. Fix `Container.tsx` if needed
4. Run `npm run typecheck && npm run build`

### Step 5 — Feature Components (2-3 hours — biggest block)
Work in this sub-order (each one should build clean before moving to the next):
1. `CalloutBox.tsx` + `ProTipBox.tsx` (consolidate)
2. `ArticleCard.tsx` → `GuideCard.tsx` (new file, update all imports)
3. `ComparisonTable.tsx`
4. `AffiliateLink.tsx` + new `AffiliateLinkButton.tsx`
5. `EarningsCalculator.tsx`, `RpmByCountryCalculator.tsx`, `FollowerIncomeEstimator.tsx`
6. `EmailSignupForm.tsx`
7. `TableOfContents.tsx`
8. `SocialShareButtons.tsx`, `ReadingProgressBar.tsx`, `SubNav.tsx`, `StepCard.tsx`, `JourneyCard.tsx`
9. `mdx-components.tsx` — update all MDX mappings
10. Run `npm run test && npm run build`

### Step 6 — New Components (1 hour)
Build in dependency order:
1. `PageHeader.tsx`
2. `TrustBar.tsx`
3. `CategoryFilterTabs.tsx`
4. `QuickPickBox.tsx`
5. `RelatedGuides.tsx`
6. `CalculatorPreview.tsx`
7. `RoundupProductSection.tsx`
8. `AffiliateLinkButton.tsx`
9. `not-found.tsx`
10. Run `npm run build`

### Step 7 — Page Rebuilds (2-3 hours)
1. `src/app/page.tsx` — homepage (7 sections)
2. `src/app/start-here/page.tsx` — nav-less conversion page
3. `src/app/guides/page.tsx` — hub with filter
4. `src/app/guides/[slug]/page.tsx` — guide template with sidebar ToC
5. `src/app/calculators/page.tsx` + all 3 calculator pages
6. Location and niche dynamic pages (same template as guides/[slug])
7. Utility pages — apply PageHeader component, restyle prose
8. Run `npm run build` after each page group

### Step 8 — Product and Resource Pages (after Scribe delivers copy)
These pages are blocked on Phase 3 content. Placeholder shells exist. Do NOT build these until Scribe's content is in `content/pages/`.

### Step 9 — Final Pass
1. `npm run typecheck` — zero errors
2. `npm run test` — all existing tests pass
3. `npm run lint` — zero warnings
4. `npm run build` — clean
5. Manual Lighthouse check: SEO >= 95, Performance >= 85, Accessibility >= 90
6. Mobile: test at 390px — no horizontal scroll, all tap targets >= 48px, no content behind fixed nav
7. Screenshot all key pages before marking complete

---

## 5. Component Inventory

| Vale-Specced Component | Existing File | Action |
|------------------------|---------------|--------|
| Primary Button | `src/components/ui/Button.tsx` | Restyle — fix text color, update variants |
| Secondary Button | `src/components/ui/Button.tsx` | Already exists as `secondary` variant — fix hover colors |
| Affiliate Link Button | none | New file: `AffiliateLinkButton.tsx` |
| Ghost Button | `src/components/ui/Button.tsx` | Add `ghost` variant |
| Guide Card | `src/components/ArticleCard.tsx` | New file: `GuideCard.tsx`. Old one too far off to restyle in place. |
| Category Badge (pill) | `src/components/ui/Badge.tsx` | Restyle — new variant system |
| "New" Badge | `src/components/ui/Badge.tsx` | Add `new` variant |
| Comparison Table | `src/components/ComparisonTable.tsx` | Restyle + add winner row, icons, sticky col |
| Callout — Tip | `src/components/CalloutBox.tsx` | Restyle with left-border pattern, Lucide icons |
| Callout — Warning | `src/components/CalloutBox.tsx` | Add to CalloutBox, merge ProTipBox |
| Callout — Info | `src/components/CalloutBox.tsx` | Add to CalloutBox |
| Callout — Error | `src/components/CalloutBox.tsx` | Add to CalloutBox |
| Calculator Panel | `src/components/EarningsCalculator.tsx` | Restyle — JetBrains Mono, surface-inset inputs, fix button |
| Calculator Inputs | Part of each calculator component | Restyle per spec |
| Calculator Results | Part of each calculator component | Restyle — warm white bg, JetBrains Mono output |
| Calculator Preview (homepage) | none | New file: `CalculatorPreview.tsx` |
| Email Capture (inline) | `src/components/EmailSignupForm.tsx` | Restyle — FFF1E6 bg, 24px radius, 48px input |
| Email Capture (hero/start-here) | `src/components/EmailSignupForm.tsx` | Add `variant="hero"` with 56px inputs |
| Exit Intent Popup | `src/components/ExitIntentSignup.tsx` | Restyle to Vale modal spec (white bg, radius-lg, shadow-lg) |
| Navigation Header | `src/components/Navbar.tsx` | Restyle — scroll shadow, active underline, fix dropdown |
| Footer | `src/components/Footer.tsx` | Restyle — 3-col, affiliate disclosure bar |
| Table of Contents | `src/components/TableOfContents.tsx` | Add sticky, active indicator, mobile accordion |
| Reading Progress Bar | `src/components/ReadingProgressBar.tsx` | Change color to Brand Orange |
| Social Share Buttons | `src/components/SocialShareButtons.tsx` | Restyle with Lucide/Simple Icons |
| Affiliate Link (inline text) | `src/components/AffiliateLink.tsx` | Keep as-is for inline text use; add button variant |
| Quick Pick Box | none | New file: `QuickPickBox.tsx` (custom) |
| Page Header | none | New file: `PageHeader.tsx` (custom) |
| Trust Bar | none | New file: `TrustBar.tsx` (custom) |
| Category Filter Tabs | `src/components/SubNav.tsx` | Restyle as pill tabs per spec |
| Related Guides Strip | none | New file: `RelatedGuides.tsx` (custom) |
| Roundup Product Section | none | New file: `RoundupProductSection.tsx` (custom) |
| Step Card | `src/components/StepCard.tsx` | Restyle |
| Journey Card | `src/components/JourneyCard.tsx` | Restyle |
| Illustrations (existing) | `src/components/illustrations/` | Keep existing 2 SVG components; Scene 01 maps to `CollaborationIllustration` (closest match for now — pending new illustration generation) |
| Video Embed | `src/components/VideoEmbed.tsx` | No change needed |
| Scroll Reveal | `src/components/ScrollReveal.tsx` | No change needed — add `prefers-reduced-motion` check |

### 21st.dev Components Referenced in BRAND.md
Vale verified 11 21st.dev components. Based on what exists in the codebase and what's specced, here's the mapping:

| 21st.dev Reference | Use Case | Decision |
|-------------------|----------|----------|
| Animated tabs / pill tabs | Category filter on /guides | Custom build — `CategoryFilterTabs.tsx`. Simple enough to not need a library component. |
| Comparison table | Roundup pages | Custom build from existing `ComparisonTable.tsx` + Vale additions |
| Sticky table of contents | Guide sidebar | Custom build — enhance existing `TableOfContents.tsx` |
| Email capture form | Hero and inline | Custom build from existing `EmailSignupForm.tsx` |
| Progress indicator | Reading progress | Existing `ReadingProgressBar.tsx` — restyle only |
| Accordion / collapsible | Mobile ToC | Add accordion variant to `TableOfContents.tsx` |
| Callout / alert | Inline guide callouts | Custom build from existing `CalloutBox.tsx` |
| Card grid | Guide cards | Custom build from existing `ArticleCard.tsx` → `GuideCard.tsx` |
| Modal / dialog | Exit intent | Restyle existing `ExitIntentSignup.tsx` |
| Badge / pill | Category tags | Restyle existing `Badge.tsx` |
| Dropdown nav | Desktop navbar mega-menu | Restyle existing dropdown in `Navbar.tsx` |

None of these require installing a 21st.dev component directly — Vale used them as visual references, not install targets. The existing components can be restyled to match those patterns.

---

## 6. Open Questions

### Blocking — need answers before building

**Q1: Logo treatment.**
Vale's nav spec says "site name in Manrope 700, ink color" with no wordmark icon — but the current nav has a "TC" monogram in a bordered square. Does Brett want to keep the "TC" monogram, replace it with a wordmark, or wait for a separate logo decision? This affects `Navbar.tsx` and `Footer.tsx`.

**Q2: `start-here` page — nav removal.**
Vale says removing nav on the Start Here page improves conversion 2-4x (from RESEARCH.md). This requires a separate layout file (`src/app/start-here/layout.tsx`) that overrides the root layout to show logo-only header. Confirm this is the intent before building — it's a structural change to routing.

**Q3: Illustration availability.**
Vale wrote 12 scene briefs but no illustrations have been generated yet. Only 2 SVG illustration components exist (`CollaborationIllustration`, `WorkingIllustration`) from before. Pages that reference Scene 01–12 will have empty illustration slots until those are generated. Plan: build illustration slot components with correct dimensions and a placeholder div, so pages compile. Mark slots clearly for when assets arrive. Is illustration generation happening before or after this build phase?

**Q4: Scribe status.**
Product pages (`/products/*`) and resource pages (`/resources/*`) are blocked on Scribe's copy delivery. Should I build these pages with placeholder shells now, or skip entirely until copy arrives? Placeholder shells risk Scribe implementing them differently once copy is ready.

**Q5: `tailwind.config.ts` vs `tailwind.config.js`.**
Two Tailwind config files exist. `tailwind.config.js` is the one actually used (imported in `postcss.config.js`). `tailwind.config.ts` appears to be a duplicate or stale file. Safe to delete `tailwind.config.ts`? Confirm before I remove it.

### Non-blocking — flag only

**Q6: `CommentSection.tsx` is noted as "fake."**
CLEANUP.md says keep logic for now. Confirmed — not touching it. If it renders visually, it'll get restyled as a side effect of base token changes.

**Q7: `earnings-database` page.**
There is a `src/app/earnings-database/page.tsx` that does not appear in the CLEANUP.md file list. It may be an undocumented page. Will restyle it in the utility pages pass but not add new functionality.

**Q8: `vitest.config.ts` references.**
The test runner is Vitest. Existing tests cover `mdx.ts` and the email API route. These don't test any UI components. After restyling, tests should still pass unchanged. Confirm there are no additional test files not captured in the CLEANUP.md audit.

---

## Summary

- **~10 files to rewrite** (config + CSS layer + layout shell + base UI)
- **~20 components to restyle** (logic preserved, styling replaced)
- **~10 new components** to create
- **~20 pages** to rebuild (routing untouched, markup and styling replaced)
- **2 pages blocked** on Scribe (products/*, resources/*)
- **Illustration slots** will be empty until Vale's 12 scenes are generated

Build time estimate: 2–3 focused sessions. Foundation + shell in session 1, components in session 2, pages in session 3.
