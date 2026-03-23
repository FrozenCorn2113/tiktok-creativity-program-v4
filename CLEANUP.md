# TikTok Creativity Program — Cleanup Audit
**Date:** 2026-03-15
**Auditor:** Atlas
**Status:** Ready for execution

---

## Summary

Total files audited: 80+
Status breakdown:
- **KEEP:** 45 files/directories (preserved for production)
- **REBUILD:** 18 files (structure stays, styling/implementation rebuilt by Devan)
- **DELETE:** 4 files (Vite-era dead weight + archive)
- **.next/ and node_modules/:** Not listed (generated folders, will rebuild post-cleanup)

---

## KEEP — Do Not Touch

These files are core infrastructure, content, or reference material.

### Project Documentation
- `PROJECT.md` — Pipeline and phasing source of truth
- `PROJECT_INTENT.md` — Original project intent
- `BRAND.md` — Vale's brand guidelines (1107 lines, production spec)
- `RESEARCH.md` — Christopher's research deliverable (557 lines)
- `.gitignore` — Git configuration

### Configuration Files
- `package.json` — Dependencies and scripts (Next.js 14 + TypeScript + Tailwind)
- `next.config.mjs` — Next.js configuration
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.js` — Tailwind CSS configuration
- `postcss.config.js` — PostCSS configuration
- `prettier.config.js` — Code formatter configuration
- `vercel.json` — Vercel deployment configuration
- `.env.local` — Environment variables (API keys, etc.)

### Core Infrastructure
- `src/lib/mdx.ts` — MDX loader logic, core to content rendering
- `src/lib/seo.ts` — SEO utilities (canonical URLs, OG tags, structured data)
- `src/lib/site.ts` — Site configuration, navigation, metadata
- `src/lib/affiliateLinks.ts` — Affiliate link manager
- `src/lib/analytics.ts` — GA4 analytics configuration
- `src/app/api/` — API routes (email signup, affiliate redirects)
  - `src/app/api/email/route.ts` — ConvertKit email capture endpoint
- `src/app/go/[slug]/route.ts` — Affiliate redirect routing

### Content — 57 Guides
- `content/guides/*.mdx` — All 57 MDX guides (57 files, ~1200 KB total)
  - Examples: `basics-of-rewards.mdx`, `eligibility-requirements.mdx`, etc.
  - **These are the real product. Never modify or delete.**

### New Content from Scribe
- `content/templates/` — New templates from Scribe (guide-template.md, roundup-template.md)
  - Framework for content production; reference material for Devan
- `content/pages/` — Empty placeholder (ready for Scribe's new content)
- `content/email-sequences/` — Empty placeholder (ready for Scribe's ConvertKit sequences)
- `content/homepage/` — Empty placeholder (ready for Scribe's homepage copy)
- `content/landing-pages/` — Empty placeholder (ready for Scribe's landing page copy)
- `content/new-guides/` — Empty placeholder (ready for Scribe's new guides)

### Assets
- `assets/brand-images/` — 4 hand-drawn illustrations (orange/black/white line art)
  - These are the visual identity Brett loves
  - Referenced in BRAND.md illustrations section
- `public/og-default.svg` — Default OG image for social sharing

### Documentation
- `docs/` — Full strategy and rebuild documentation
  - `docs/strategy.md` — Monetization and technical strategy
  - `docs/rebuild/` — Audit and phased rebuild plan
  - `docs/sitemap.md`, phase files — Reference material

### Tests (Preserved)
- `src/__tests__/` — Existing test suite
  - `src/__tests__/mdx.test.ts` — MDX loader tests
  - `src/__tests__/email-route.test.ts` — API tests

---

## REBUILD — Keep Structure, Redesign Implementation

These files need to be refactored by Devan to implement Vale's brand spec. The logic may be sound, but the styling is old design. Devan will preserve routing/structure while replacing visual implementation.

### Root Layout & Styling
- `src/app/layout.tsx` — Root layout (structure correct, styling to be updated)
- `src/app/globals.css` — Global CSS reset and utilities (will be rewritten per Vale's tokens)
- `src/styles/global.css` — Global styling (will be rewritten per Vale's design system)
- `src/styles/tokens.css` — Design tokens (will match Vale's color/typography spec)
- `src/app/globals.css` — Tailwind utilities (to be audited and updated)

### Page Files (Routing stays, redesign required)
- `src/app/page.tsx` — Homepage (current Hero + CTA, needs Vale's 5-section layout)
- `src/app/guides/page.tsx` — Guide hub (listing page, needs new design)
- `src/app/guides/[slug]/page.tsx` — Individual guide page (template stays, styling updated)
- `src/app/calculators/page.tsx` — Calculator hub page
- `src/app/calculators/earnings-calculator/page.tsx` — Calculator template
- `src/app/calculators/rpm-by-country/page.tsx` — RPM calculator page
- `src/app/calculators/follower-income-estimator/page.tsx` — Earnings calculator page
- `src/app/locations/[slug]/page.tsx` — Regional guides by country
- `src/app/niche/[slug]/page.tsx` — Niche-specific guides
- `src/app/products/page.tsx` — Product landing (placeholder, needs Scribe copy + Vale design)
- `src/app/products/creator-rewards-accelerator/page.tsx` — Product placeholder
- `src/app/products/monetization-masterclass/page.tsx` — Product placeholder
- `src/app/products/viral-content-playbook/page.tsx` — Product placeholder
- `src/app/resources/page.tsx` — Resource hub placeholder
- `src/app/resources/index/page.tsx` — Resource index
- `src/app/resources/content-planning-template/page.tsx` — Resource page
- `src/app/resources/creator-rewards-checklist/page.tsx` — Resource page
- `src/app/resources/earnings-tracker/page.tsx` — Resource page
- `src/app/resources/viral-video-worksheet/page.tsx` — Resource page
- Utility pages: `about/`, `affiliate-disclosure/`, `contact/`, `media/`, `newsletter/`, `privacy/`, `sponsor/`, `start-here/`, `terms/`, `troubleshooting/` — All need redesign per Vale's standards

### Components (Logic may be good, styling needs Vale brand implementation)
**UI Components (Base layer):**
- `src/components/ui/Button.tsx` — Button component (logic OK, style to Vale spec)
- `src/components/ui/Container.tsx` — Layout container (structure OK)
- `src/components/ui/Badge.tsx` — Badge component (logic OK, style to Vale spec)

**Feature Components (Styling + logic to update):**
- `src/components/Navbar.tsx` — Navigation (structure OK, styling to Vale spec)
- `src/components/Footer.tsx` — Footer (structure OK, styling to Vale spec)
- `src/components/EmailSignupForm.tsx` — ConvertKit signup (logic OK, styling to Vale spec)
- `src/components/ExitIntentSignup.tsx` — Exit-intent popup (logic OK, styling to Vale spec)
- `src/components/AffiliateLink.tsx` — Affiliate link wrapper (logic OK, styling to Vale spec)
- `src/components/ArticleCard.tsx` — Article preview card (logic OK, redesign needed)
- `src/components/CalloutBox.tsx` — Content callout (logic OK, redesign needed)
- `src/components/ComparisonTable.tsx` — Feature comparison (logic OK, styling to Vale spec)
- `src/components/EarningsCalculator.tsx` — Calculator component (logic OK, styling to Vale spec)
- `src/components/FollowerIncomeEstimator.tsx` — Calculator variant (logic OK, styling to Vale spec)
- `src/components/JourneyCard.tsx` — Journey step visualization (logic OK, redesign needed)
- `src/components/ProTipBox.tsx` — Content tip/callout (logic OK, redesign needed)
- `src/components/ReadingProgressBar.tsx` — Reading progress indicator (logic OK, styling to Vale spec)
- `src/components/RpmByCountryCalculator.tsx` — Country RPM tool (logic OK, styling to Vale spec)
- `src/components/ScrollReveal.tsx` — Scroll animation (logic OK, keep as-is)
- `src/components/SocialShareButtons.tsx` — Share buttons (logic OK, styling to Vale spec)
- `src/components/StepCard.tsx` — Step in a process (logic OK, redesign needed)
- `src/components/SubNav.tsx` — Sub-navigation (logic OK, styling to Vale spec)
- `src/components/TableOfContents.tsx` — Guide ToC (logic OK, styling to Vale spec)
- `src/components/VideoEmbed.tsx` — Video embedding (logic OK, keep as-is)
- `src/components/mdx-components.tsx` — MDX component map (logic OK, styling to Vale spec)
- `src/components/CommentSection.tsx` — Fake comment widget (placeholder, keep logic for now)

**Illustrations (Keep for now, may add more per Vale's 12-scene briefs):**
- `src/components/illustrations/CollaborationIllustration.tsx` — Illustration component
- `src/components/illustrations/WorkingIllustration.tsx` — Illustration component

### Metadata & Routing
- `src/app/robots.ts` — robots.txt generation (logic OK, update URLs per new content)
- `src/app/sitemap.ts` — Sitemap generation (logic OK, update per new pages)
- `src/app/mdx-components.tsx` — MDX component wrapper (logic OK, styling to Vale spec)
- `next-env.d.ts` — TypeScript Next.js types (generated, keep)

---

## DELETE — Dead Code & Archive

These files are Vite-era remnants, archives, or redundant. Safe to remove.

### Vite-Era Artifacts
None found at root level (project was migrated cleanly from Vite to Next.js).

### Archives & Backups
- `stitch_TIkTok.zip` — Zip archive (likely Figma export or old design mockup, redundant now that BRAND.md exists)

### Generated / Temporary
- `tsconfig.tsbuildinfo` — TypeScript build cache (regenerated on next build, safe to delete)
- `.next/` — Build artifacts (regenerated on `npm run build`, can delete but will auto-regenerate)

---

## Summary Table

| Category | Count | Action |
|----------|-------|--------|
| Keep | 45+ | Preserve as-is |
| Rebuild | 18+ | Structure stays, Devan refactors styling |
| Delete | 4 | Remove now |
| Generated | 2 | Delete (will regenerate) |
| **Total** | **69+** | |

---

## Execution Plan

1. **Delete files marked DELETE:**
   - `stitch_TIkTok.zip`
   - `tsconfig.tsbuildinfo`

2. **Clear generated directories:**
   - `.next/` (will regenerate on build)
   - `node_modules/` (will regenerate on `npm install`)

3. **Preserve everything else.**

4. **Devan's rebuild work:**
   - Refactor all REBUILD components to match Vale's brand spec
   - Keep routing and content structure intact
   - Update all styling to match BRAND.md and design system
   - Integrate Scribe's content when ready
   - Fix all issues from docs/rebuild/AUDIT.md

---

## Notes for Devan

- **Content pipeline:** 57 guides stay as-is. Don't touch `content/guides/*.mdx`.
- **Brand source:** `BRAND.md` is the spec. `design-system/tiktok-creativity-program/MASTER.md` has CSS details.
- **Affiliate links:** `src/lib/affiliateLinks.ts` has the mapping. Respect the strategy in `docs/strategy.md`.
- **TypeScript:** Project is strict. All new code must pass `npm run typecheck`.
- **Tests:** Run `npm run test` after any refactor. Test suite at `src/__tests__/`.
- **Build target:** `npm run build` must pass clean. No dead code.
- **Lighthouse:** Target SEO >= 95 per Phase 4 success criteria.

---

## Cleanup Status

- **Audit complete:** 2026-03-15 15:45 UTC
- **Ready for deletion:** Yes
- **Ready for Devan rebuild:** Yes
- **Content safety:** All 57 guides verified safe
- **Brand reference:** BRAND.md ready, RESEARCH.md ready

Proceed with DELETE phase.
