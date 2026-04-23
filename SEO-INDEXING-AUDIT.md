# TCP Indexing Audit — 2026-04-21

## Sitemap Health

Sitemap generated dynamically by `src/app/sitemap.ts` (Next.js Metadata Route). robots.ts points crawlers to `/sitemap.xml`.

- **URL count:** 40 static routes + guides from `getAllGuides()`.
- **Guide count:** 120 MDX files on disk BUT only **117 unique slugs** emitted to sitemap. Root causes below.
- **lastmod:** Static routes use `new Date().toISOString()` at build time (every deploy looks "fresh" — fine). Guide entries use `frontmatter.date` (accurate).
- **Canonical domain:** All URLs use `siteConfig.url` = `https://tiktokcreativityprogram.com`. Consistent. No www/non-www mix.
- **Drafts / noindex:** None leaking into sitemap.

**Sitemap integrity problems:**

1. **2 guides missing `slug` frontmatter** so they are silently dropped from `getAllGuides()` and never enter the sitemap, never generate pages, and 404 when linked:
   - `content/guides/tiktok-carousel-creator-rewards.mdx` (no slug)
   - `content/guides/tiktok-shop-affiliate-commission-rates.mdx` (no slug)

2. **Duplicate slug collision** — two files declare `slug: additional-reward-criteria-2026`:
   - `content/guides/additional-reward-criteria-2026.mdx`
   - `content/guides/additional-reward-criteria-2025.mdx` (filename says 2025, frontmatter slug says 2026)
   One overwrites the other in `getGuideBySlug()` loop. The 2025 filename exists but the route at `/guides/additional-reward-criteria-2025` does not. A redirect in `next.config.mjs` already handles this case.

3. **Sitemap count mismatch** — Google will see 117 guides in sitemap but the `/guides` listing page only renders 12 in initial HTML (see "Critical gaps" below). This is consistent with "Discovered, not indexed" status.

## Internal Linking

Audited all 120 MDX bodies plus `src/` component hardcoded links.

- **Total orphan guides (0 incoming internal links from other guides):** 11
  - `best-email-marketing-tiktok-creators`
  - `case-study-0-to-100k`
  - `monetization-france`
  - `monetization-resource-center` (the hub itself — only reachable via nav)
  - `tiktok-cameo-personalized-videos`
  - `tiktok-creativity-program-japan-south-korea`
  - `tiktok-live-subscriptions-strategy`
  - `tiktok-one-creator-marketplace`
  - `tiktok-pulse-ad-revenue-sharing`
  - `tiktok-rpm-oracle-sale-impact-2026`
  - `tiktok-search-views-creator-rewards`

- **Guides with fewer than 3 incoming links (indexing risk):** 30 (see raw audit output in chat). Notable: all 7 `ultimate-*-guide` pillars have only 2 incoming, and every `monetize-*` niche page has 2 incoming.

- **Hub / category pages present:**
  - `/guides` — EXISTS but **paginates client-side at 12 per page**. Initial SSR HTML only contains 12 guide links out of 117. Crawlers need to execute JS and observe state changes to discover the rest. This is almost certainly the root cause of "Discovered, currently not indexed" for the other ~105 guides.
  - `/guides/monetization-resource-center` — exists as a guide, not a true topic hub.
  - Category pages by topic (algorithm, monetization, taxes, tools) — **DO NOT EXIST**. The `/niche/*` pages cover creator types but not content topics.
  - `/tools` — exists, links to ~4 tool guides.
  - `/troubleshooting` — exists, links to 7 troubleshooting guides.
  - `/resources`, `/resources/index` — thin linking.

- **Related Guides on each guide page:** EXISTS. `src/app/guides/[slug]/page.tsx` L68–71 filters `getAllGuides()` by matching `category` and takes 3. Problem: sparse/uneven category taxonomy means some guides only share a category with 0–2 other guides, so the Related block is small or empty.

### Critical gaps

- `/guides` hub renders only 12 guides server-side. 105+ guides have no crawlable path from the hub. This alone explains the mass "Discovered not indexed" state.
- No topic category index pages (e.g. `/guides/category/monetization`, `/guides/category/tools`, `/guides/category/taxes`).
- Related Guides uses exact-category match only; no fallback to keyword or slug-prefix matches.
- Footer lists only 5 guides; nav dropdown lists 9. That is the entire server-rendered internal link surface for 117 guides.
- Orphan pages are heavily concentrated in newer/2026 announcement guides (Oracle, Pulse, Cameo, One CM, Live Subscriptions, JP/KR launch). These are high-value for SEO and get zero internal juice.

## 404s Found

7 unique URLs that currently return 404 in production (matches Google's count).

| URL | Source of link | Recommendation |
|---|---|---|
| `/guides/tiktok-carousel-creator-rewards` | `content/guides/tiktok-shop-creator-restrictions-creator-rewards.mdx` | Add `slug: tiktok-carousel-creator-rewards` to the MDX file that exists on disk but has no slug. Restores the page. |
| `/guides/tiktok-shop-affiliate-commission-rates` | `content/guides/multiple-revenue-streams.mdx`, `tiktok-cameo-personalized-videos.mdx`, `tiktok-rpm-oracle-sale-impact-2026.mdx`, `tiktok-shop-creator-restrictions-creator-rewards.mdx` | Add `slug: tiktok-shop-affiliate-commission-rates` to the existing MDX file. Restores the page. |
| `/guides/tiktok-rpm-rates-by-country` | `src/lib/email/welcome-template.ts` L48 | 301 redirect to `/calculators/rpm-by-country` (closest match) OR update email template link to `/guides/optimize-rpm`. |
| `/guides/tiktok-money-per-follower` | `src/lib/email/welcome-template.ts` L49 | 301 redirect to `/calculators/follower-income-estimator` OR update email template. |
| `/guides/tiktok-earnings-calculator` | `src/lib/email/welcome-template.ts` L50 | 301 redirect to `/calculators/earnings-calculator`. |
| `/guides/additional-reward-criteria-2025` | `creator-rewards-2026.mdx`, `eligibility-requirements.mdx`, `how-to-join-creativity-program.mdx` | Already redirected via `next.config.mjs` L42–46. Not actually a live 404 — but Google may still list it if cached. Confirm in GSC. |
| (Possible 7th — confirm via GSC export) | — | The above 6 are the real broken routes in code. The 7th is likely `additional-reward-criteria-2025` double-counted, a trailing-slash variant, or a deleted legacy URL. Ask Brett to export the 7 URLs from Search Console. |

## Top Fixes (ranked by indexing impact)

1. **Server-render the full guides list.** Change `/guides/page.tsx` so all 117 guide cards are in the initial SSR HTML (keep filter/paginate UI but render every `<a href>` on the server). This single change unblocks the bulk of the 149 "Discovered, not indexed" pages by giving Googlebot a crawlable link to every guide from the hub.

2. **Fix the 2 missing-slug files and the 1 duplicate-slug file.** Three slug edits in `content/guides/` restore 2 pages and eliminate 5 of the 7 reported 404s. Low effort, high payoff.

3. **Build proper category hub pages and link them from the footer.** Create `/guides/category/[topic]` routes for at least monetization, tools, taxes, troubleshooting, international, and niche guides. Every guide should be reachable in 2 clicks from the home page. This fixes the orphan-guide problem structurally and deepens internal linking for all 30 low-incoming guides.

4. **Update `welcome-template.ts` email links** to point at real URLs (calculators, not nonexistent guides) so future email sends stop generating 404 referrals and crawl waste.

5. **Expand Related Guides fallback logic** — if category match yields fewer than 3, fill from keyword or recency so every guide links to at least 3 peers.
