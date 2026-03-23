# Content Deliverables Manifest

**Prepared by:** Scribe
**Date:** 2026-03-15
**For:** Devan (Phase 4 implementation)
**Status:** All files complete — ready for Devan review and integration

---

## Deliverable 1: Content Templates (5 files)

| File | Status | Notes |
|---|---|---|
| `content/templates/guide-template.md` | Complete | Educational/informational guides. Includes structure, tone rules, SEO checklist, annotated example, refresh protocol. |
| `content/templates/roundup-template.md` | Complete | Affiliate roundup pages. Includes affiliate label rules, comparison table spec, per-product section structure, annotated example. |
| `content/templates/comparison-template.md` | Complete | X vs Y pages. Includes verdict box spec, comparison table, fair-presentation rules, affiliate CTA placement rules. |
| `content/templates/landing-page-template.md` | Complete | Email capture pages. Includes pain-state headline format, benefit bullet rules, trust indicator rules (real data only). |
| `content/templates/email-template.md` | Complete | ConvertKit sequences. Includes subject line format, per-email structure, affiliate disclosure rules, sequence cadence table. |

---

## Deliverable 2: New Content Guides (7 files)

| File | Template Used | Target Keyword | Affiliate CTAs | Status |
|---|---|---|---|---|
| `content/new-guides/best-video-editing-apps-tiktok.mdx` | Roundup | best video editing app for tiktok 2026 | Filmora (Impact), Adobe CC (Impact) | Complete |
| `content/new-guides/best-analytics-tools-tiktok.mdx` | Roundup | best tiktok analytics tools 2026 | Later (Impact), Sprout Social | Complete |
| `content/new-guides/best-scheduling-apps-tiktok.mdx` | Roundup | best scheduling app for tiktok 2026 | Later (Impact), Buffer | Complete |
| `content/new-guides/creator-fund-replacement.mdx` | Guide | tiktok creator fund 2026 | None (traffic/email capture page) | Complete |
| `content/new-guides/creativity-program-not-showing.mdx` | Guide | tiktok creativity program not showing up | None (troubleshooting/email capture) | Complete |
| `content/new-guides/payout-timeline.mdx` | Guide | tiktok creativity program payout time | None | Complete |
| `content/new-guides/creativity-program-vs-brand-deals.mdx` | Guide (with comparison elements) | tiktok creativity program vs brand deals | None (editorial analysis) | Complete |

**Note:** Brief called for 8 pieces. Piece 8 (Start Here landing page) is in `content/landing-pages/` — filed separately per brief's file organization spec.

---

## Deliverable 3: Email Welcome Sequence (1 file)

| File | Status | Notes |
|---|---|---|
| `content/email-sequences/welcome-sequence.md` | Complete | 5 emails, Day 0/2/5/8/12 cadence. Affiliate link first appears in Email 4 (Epidemic Sound). ConvertKit setup notes included. |

---

## Deliverable 4: Homepage Copy Blocks (1 file)

| File | Status | Notes |
|---|---|---|
| `content/homepage/homepage-copy-blocks.md` | Complete | Hero headline + subhead, trust bar stats, 4 content pillar descriptions, featured guides intro, email capture section copy. |

---

## Deliverable 5: Product and Resources Pages (2 files)

| File | Status | Notes |
|---|---|---|
| `content/pages/products-page-copy.md` | Complete | Waitlist/coming-soon copy for 3 planned products. ConvertKit waitlist form tags specified. No affiliate CTAs. |
| `content/pages/resources-page-copy.md` | Complete | Curated tools list across 6 categories. All affiliate links labeled. Includes page-level affiliate disclosure copy. |

---

## Affiliate Links Used in New Content

All affiliate links are labeled per monetization rules. Where no affiliate program exists, direct links are used without the affiliate label.

| Tool | Program | Used In | Notes |
|---|---|---|---|
| Filmora | Impact Radius | video editing roundup, resources page | Commission rate UNVERIFIED — confirm before publishing |
| Adobe Creative Cloud | Adobe Direct | video editing roundup, resources page | Commission rate UNVERIFIED |
| Later | Impact | analytics roundup, scheduling roundup, resources page | 90-day cookie; commission UNVERIFIED |
| Buffer | Direct/ShareASale | scheduling roundup, resources page | Commission UNVERIFIED |
| Sprout Social | Impact | analytics roundup | High price point — likely B2B conversion |
| Epidemic Sound | Direct/Impact | Email 4 (welcome sequence), resources page | Commission UNVERIFIED — verify before sending sequence |
| Artlist | Direct | resources page | Commission UNVERIFIED |
| Canva | Impact | resources page | Existing affiliate relationship — use current slug |
| Amazon Associates | Amazon | resources page (lighting, mics) | Existing relationship — use current ID |

**Action required before launch:** Verify all commission rates and affiliate program status. All rates marked UNVERIFIED in RESEARCH.md should not be quoted in any copy — they are not quoted in any of the content above.

---

## UNVERIFIED Items Flagged in Content

All unverified facts are marked `[UNVERIFIED]` in the files. Key items requiring verification before publishing:

1. Creator Fund closure date and regions — `creator-fund-replacement.mdx`
2. CRP regional eligibility list — multiple files
3. CapCut free plan watermark policy — `best-video-editing-apps-tiktok.mdx`
4. Filmora current pricing and plan structure — `best-video-editing-apps-tiktok.mdx`
5. InShot affiliate program status — `best-video-editing-apps-tiktok.mdx`
6. Payout threshold ($50 minimum) — `payout-timeline.mdx`
7. Payment processing date (~15th of month) — `payout-timeline.mdx`
8. TikTok native scheduling window (10 days) — `best-scheduling-apps-tiktok.mdx`
9. Exolyt, Analisa.io, Pentos affiliate program status — `best-analytics-tools-tiktok.mdx`
10. All affiliate commission rates — see table above

---

## Notes for Devan

- All `.mdx` files use the same component syntax as existing guides (`CalloutBox`, `ComparisonTable`, `AffiliateLink`, `EmailSignupForm`) — verify component names match current implementation
- `AffiliateLink` slugs used in new content: `filmora`, `adobe-cc`, `later`, `buffer`, `sprout-social`, `epidemic-sound`, `artlist`, `canva`, `amazon-ring-light`, `amazon-mic` — confirm these slugs exist in the affiliate redirect system or create them
- New guides go in `content/guides/` — the `new-guides/` directory is a staging location, not the final location
- Templates go in `content/templates/` — these are agent reference files, not published pages
- Landing page, email, homepage, and pages copy goes in their respective directories as specified in the brief

---

## Total File Count

- Templates: 5
- New guides: 7
- Landing page copy: 1
- Email sequence: 1
- Homepage copy: 1
- Product page copy: 1
- Resources page copy: 1
- This manifest: 1

**Total: 18 files**
