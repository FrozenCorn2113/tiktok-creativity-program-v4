# TikTok Creativity Program

## Repo
- **Local path:** `/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program`
- **Remote:** `FrozenCorn2113/tiktok-creativity-program`
- **Deploy:** Vercel auto-deploy from main
- **Domain:** tiktokcreativityprogram.com

## Tech Stack
Next.js (App Router), Tailwind CSS, MDX guides, Resend email + Supabase subscribers

## Accounts
- Google Analytics: G-9YX5PRYTJJ (property 507035708)
- Google Search Console: configured
- Amazon Associates: tag `tiktokcreatpr-20`
- Resend: transactional + welcome emails (RESEND_API_KEY via Vercel integration, free tier)
- Supabase: email_subscribers table (lead_magnet, source columns) for subscriber storage + segmentation

## Key Files
- `content/guides/` — all MDX guide content
- `src/app/` — Next.js App Router pages
- `src/lib/mdx.ts` — MDX processing and frontmatter
- `src/data/nicheData.ts` — niche page data and slug mappings
- `research/` — keyword and competitor research files
- `content/email-sequences/` — email sequences (sent via Resend)
- `social/` — social content templates and calendars

## Autonomy
- **Owner:** Bernard
- **Level:** Full — route agents, review, ship. Only escalate blockers to Brett.

## Rules
- The ONLY valid clone is this directory. Extra clones at `FrozenCorn2113/tiktok-creativity-program` and `design-system/tiktok-creativity-program` are archived — do NOT use them.
- TCP is handed off to autonomous operation. Agents run it, Brett checks in when he wants.
- No text in TCP images unless specifically asked.
- NEVER reuse the same image across social posts. Every post gets a unique image. Duplicated images = immediate delete.
- Amazon affiliate links use the AffiliateLink component with tag `tiktokcreatpr-20`.
- Exolyt has no affiliate program — removed from TCP tool list.
- Autonomous content pipeline: auto-post to all socials, weekly analytics review, no approval gates.
- Vercel auto-deploys from git pushes — no manual deploy needed. Verify local HEAD matches production before pushing.

## Active
<!-- Bernard maintains this section. Current tasks in flight. -->

### 2026-03-25 Creator Profile Screenshots -- COMPLETE

**Real TikTok profile screenshots captured for niche pages.** All 43 creators now have real screenshots. Playwright script (`scripts/screenshot-creators.mjs`) captures profile headers and converts to .webp.

**Status:** COMPLETE. All 3 dead accounts replaced. Full 500K+ sweep also completed (24 creators replaced total across all niches). Commit d6f3a113.

### 2026-03-25 Design Review Sprint

**Bernard visual review COMPLETE.** 17 issues identified across 7 pages. Review: `research/design-review-2026-03-25.md`

**DR1: Niche Page Critical Fixes (DEVAN)** -- LOCKED (commit bace7003)
- All C1-C4 items fixed: empty space, gray placeholders, font sizes, homepage card weight.

**DR2: Color + Typography Polish (DEVAN)** -- LOCKED (commit bace7003)
- All S1-S7 items fixed: calculator colors, guide descriptions, eligibility callouts, lead magnet banner, peach backgrounds harmonized.

**DR3: Niche Index Page Redesign** -- DEFERRED
- Current niche index page is functional and well-structured (8 niche cards with icons, ultimate guide links, email capture). Magazine-style redesign is a future polish item, not blocking.

### 2026-03-25 Quality Sprint -- ALL 7 WORKSTREAMS COMPLETE AND LOCKED

All morning sprint items shipped, reviewed, and locked. Site is in strong shape.

### 2026-03-25 Afternoon Sprint -- SEO + Revenue Optimization -- ALL COMPLETE

**AS1: Orphan Guide Cross-Linking (DEVAN)** -- LOCKED
- 36 internal links added across 28 source guides, all 12 orphans covered (commit ea211b1).

**AS2: Creator Profile Images for Niche Pages (VALE)** -- CANCELLED
- Styled initials are clean and honest. No action needed.

**AS3: Content Gap + Guide (CHRISTOPHER -> SCRIBE -> DEVAN)** -- LOCKED
- Christopher identified TikTok LIVE Subscriptions as #1 gap. Research: research/content-gap-seo-audit-2026-03-25.md
- Scribe wrote 2,800-word guide. Devan integrated, build clean (commit 822bbbd). Guide #106 LIVE.
- Runners-up for future: monetization-mexico, best-green-screen-tiktok-creators.

**AS4: SEO Quick Wins (CHRISTOPHER -> DEVAN)** -- LOCKED
- Only 1 of 8 reported stale 2025 files actually existed (additional-reward-criteria-2025). 301 redirect added (commit 74c91d1).
- Title lengths: all 3 flagged titles already within acceptable range on inspection. No changes needed.
- Meta descriptions: all 105 guides have descriptions. No issues.

### 2026-03-25 Evening Sprint -- Bernard 6pm Ops Review

**6 Pending Review items assessed and LOCKED:**

1. **Devan -- Navbar Logo Swap (commit 11436746)** -- LOCKED
   - Favicon SVG icon replaces text logo. Clean. Deployed.

2. **Devan -- Markdown Table Rendering (commit 61500212)** -- LOCKED
   - remark-gfm plugin + branded CSS. 81 guides with tables now render properly. Deployed.

3. **Devan -- Guide Thumbnail Fix (commit ba4d106f)** -- LOCKED
   - Thumbnails now use hero images consistently across 3 components. Deployed.

4. **Devan -- Calculator UI Overhaul (commit 3b1211a)** -- LOCKED
   - Dark slate results panel, instant slider, tight spacing, proper number formatting. All 3 calculators. Deployed.

5. **Christopher -- Niche Case Study Research** -- LOCKED
   - Comprehensive research with FACT/UNVERIFIED labeling. Named creators with verified earnings. RPM data by niche. Feeds niche page improvements.

6. **Devan -- Niche Page Bug Fixes (commit 775b2cc5)** -- LOCKED
   - Avatar/image overlap bug fixed. 3 too-famous artists creators replaced with mid-tier (Kooleen 487K, Dina Norlund 215K, Jess Karp 178K). Other niches still have famous creators -- Devan continuing.

**Visual audit from 7 screenshots (homepage, guides, guide page, calculator, 2 niches, lead magnet):**
- All pages visually consistent. Dark navy/orange brand applied throughout.
- Calculator redesign looks polished. Guide thumbnails rendering correctly.
- FINDING: Niche page middle sections (strategy, RPM, tools, related guides) use `whileInView` framer-motion animations. In headless screenshots these appear as blank space. For real users who scroll, sections render correctly. Low-risk but worth noting -- no SEO impact since sections are in the DOM (just opacity:0 initial state).

**Niche content depth audit (all 8 niches):**
- Fitness: 6 creators, 3 strategies, 4 focus, 3 tools, 4 guides -- BENCHMARK
- Musicians: 5 creators -- at standard
- Artists: 6 creators (3 just replaced with mid-tier) -- at standard
- Teachers: 6 creators -- at standard
- Comedy: 5 creators -- at standard
- Coaches: 7 creators -- above standard
- Travel: 5 creators -- at standard
- **Beauty: 4 creators -- THIN (only niche below 5).** Needs 2 more mid-tier creators to match baseline.
- All niches have identical structure: 3 strategy sections, 4 focus areas, 3 tools, 4 related guides, RPM note, ultimate guide CTA. Content quality is strong across the board.

**In flight (DO NOT DUPLICATE):**
- Devan: Swapping remaining too-famous creators across non-artists niches (musicians, fitness, teachers, beauty, comedy, coaches, travel)

**Next actions queued:**
- Route Devan: Add 2 mid-tier beauty creators (bring to 6, matching median) when current niche swap is done
- Future consideration: Add "Real Earnings Example" callout to niche pages using Christopher's case study research

### Ongoing
- **106 guides live + 3 calculators.** All guides loading. All Priority 1 keyword gaps covered.
- **Social rebuild LIVE:** 12 posts scheduled (6 IG + 6 Pinterest, Mar 26-31) with 6 unique Vale images.
- **RULE: Every post gets a unique image. NEVER reuse images across posts.**
- **Affiliate activation: Kit + Buffer + 4 more LIVE.** 6 active affiliate links.
- **Email subscription fix DEPLOYED** (commit a78c59f) -- Vercel env vars + RLS upsert fix.
- **AdSense READY TO APPLY.** All 4 legal pages live. Brett action item.
- **Reddit outreach:** 6 HIGH leads, copy-paste replies. Manual posting by Brett.

### Creator Sweep Revision -- LOCKED (commit 58a55caf)
All 4 over-500K creators replaced. Beauty raised to 5 creators. All 45 creators now verified under 500K. Build clean.

## Pending Review
<!-- Agents add completed deliverables here. Bernard reviews and routes next. -->

- **What:** Fixed broken email subscription flow. Root cause: Vercel's Supabase integration was injecting wrong project credentials (onmqirmoeovyonqloaxl) at runtime, overriding all standard env var names. Fixed by hardcoding correct Supabase URL/key in the API route and switching from JS client to direct REST API. Also added TCP_SUPABASE_URL/KEY env vars to Vercel. E2E tested: insert + welcome email both working.
- **Where:** `src/app/api/newsletter/route.ts`, `src/app/api/email/route.ts`
- **Status:** READY FOR REVIEW
- **Note:** Brett should disconnect or reconfigure the Vercel Supabase integration (it's linked to a different Supabase project). Until then, the hardcoded values in route.ts are the workaround.

- **What:** Full audit of all 43 TCP creators across 8 niches — verified handles, follower counts, account status, 500K flag check. 11 must-replace, 4 handle/description fixes, 6 need direct TikTok verification. Includes replacement suggestions for every flagged creator.
- **Where:** `projects/tiktok-creativity-program/creator-audit.md`
- **Status:** READY FOR REVIEW

- **What:** Replaced SVG placeholder icons with real hero images on the niche index page (both card grid and ultimate guides list)
- **Where:** `src/app/niche/page.tsx`
- **Status:** READY FOR REVIEW

- **What:** Fixed creator data per Christopher's audit -- corrected 4 handles/counts, removed 13 unverified/oversized creators, deleted corresponding screenshots
- **Where:** `src/app/niche/[slug]/niche-data.ts`
- **Status:** READY FOR REVIEW

- **What:** Full link audit — all TODO affiliate entries researched, external MDX links verified, affiliate programs found for 11 of 13 TODO items, priority action list compiled
- **Where:** `projects/tiktok-creativity-program/link-audit.md`
- **Status:** READY FOR REVIEW

- **What:** Resolved all 13 TODO/placeholder affiliate entries in affiliateLinks.ts with direct URLs (Stan Store URL corrected, all TODO comments removed)
- **Where:** `src/lib/affiliateLinks.ts`
- **Status:** READY FOR REVIEW

## Work Log
- [2026-03-25] Bernard sprint review -- All 7 priority items assessed. Items 1-7 already completed in prior sessions: hero images (185c614), niche overhaul (7c337c8), creator spotlights (58a55caf), calculator redesign (3b1211a+d6fbc8f), email flow (4afeebf), search bar (6774ff6), site audit (aa37beb). Creator sweep revision LOCKED. DR1+DR2 LOCKED. DR3 DEFERRED. No new work needed -- site is production-ready.
- [2026-03-25] Bernard 5:36pm cycle -- Reviewed 3 Pending Review items. Creator card screenshots restore LOCKED (commit 52010413). Design Review DR1+DR2 fixes LOCKED (commit bace7003). Creator sweep REVISION NEEDED: 4 creators still over 500K (Sivan Tayer 572.8K, Mysweetchubs 540.9K, Hindash 710K, Theambitious.christian 751.5K). Devan routed for revision.
- [2026-03-25] Bernard 6pm ops sprint -- Reviewed and LOCKED 6 Pending Review items (navbar logo, table rendering, thumbnails, calculator overhaul, niche case study research, niche bug fixes). Visual audit of 7 screenshots: all pages consistent, no design issues. Niche content depth audit: beauty is thin (4 creators vs 5-7 everywhere else), all others at standard. Queued beauty creator additions for Devan after current niche swap completes.
- [2026-03-25] Bernard Sprint Wave 4 -- Christopher content gap + SEO audit LOCKED. Scribe wrote LIVE Subscriptions guide (#106, 2,800 words). Devan integrated (822bbbd), orphan cross-linked 12 guides (ea211b1), added 301 redirect for stale 2025 guide (74c91d1). All reviewed and LOCKED.
- [2026-03-25] Wren — Social rebuild: 12 posts scheduled (6 IG + 6 Pinterest, Mar 26-31). 6 unique Vale images, no reuse. Manifest: Vault/Inbox/2026-03-25-tcp-social-rebuild.md. Bernard LOCKED.
- [2026-03-25] Devan — Minis/Micro-Dramas guide integrated (commit eede58e). Guide #104. 8 [UNVERIFIED] flags hedged, 2 affiliate links kept, build clean. Bernard LOCKED.
- [2026-03-25] Devan — Monetize Under 10K guide integrated (commit 05a69f8). Guide #105. 4 flags hedged, 3 broken links fixed, build clean. Bernard LOCKED.
- [2026-03-25] Scribe — Monetize Under 10K guide (2,338 words, highest funnel-top potential). Bernard G1 LOCKED.
- [2026-03-25] Vale — 6 social images created (monetization, growth, algorithm, tools, affiliate, consistency). No text, no faces, unique compositions. Bernard G1 LOCKED.
- [2026-03-25] Wren — X post LIVE: eligibility/monetization angle, social-monetization-01.png (DO NOT REUSE). Post ID 69c4078807747844faa0a0eb. URL: https://twitter.com/i/web/status/2036836625129283938
- [2026-03-25] Scribe — Effect House Monetization guide (2,628 words, P1 keyword). Bernard G1 LOCKED. Queued for Devan integration.
- [2026-03-24] Bernard — SOCIAL PURGE: Audited all 53 posts across 6 platforms. Visually inspected images: most TikTok/IG images were broken placeholders (faint dots, abstract shapes, blank canvases). Brett confirmed ugly. Deleted all 36 scheduled + 17 draft posts. New rule: unique image per post, no reuse. Holding for Christopher's cross-platform viral strategy research before rebuilding.
- [2026-03-24] Bernard — Kit vs Mailchimp guide: Scribe wrote (~1,750 words), Bernard G1 LOCKED + added AffiliateCardInline, Devan integrated + pushed (commit c46b507). Guide #102 LIVE. Qualifies for Kit $25 affiliate bonus.
- [2026-03-24] Bernard — Pinterest board fix: set boardId on all 16 pins (board "TikTok Creator Tips"), recreated 11 as scheduled, cleaned up 2 duplicate failed posts. Blocker resolved.
- [2026-03-24] Bernard — Social post diagnosis: Pinterest fails due to missing boardId (account has 0 boards). Uploaded 14 images to Zernio, attached to 14 posts. Fixed over-length tweet. Brett action: create Pinterest board.
- [2026-03-24] Scribe — Creator Search Insights guide (2,115 words) + Series/Paywall Feature guide (2,405 words). Bernard G1 LOCKED.
- [2026-03-24] Devan — 2 guides integrated, frontmatter fixed, links verified, build clean (commit cf22ac0). Bernard LOCKED. Guides #100 + #101 live.
- [2026-03-24] Bernard autonomous cycle — 4 parallel tracks: internal linking (Devan), Reddit outreach (Ricky), social scheduling (Wren), email verification
- [2026-03-24] Devan — 25 internal links across 18 guides, 13 orphan pages resolved (commit 9d74799). Bernard LOCKED.
- [2026-03-24] Ricky — 6 HIGH Reddit leads with draft replies (r/TikTokMonetizing primary). Bernard LOCKED.
- [2026-03-24] Wren — Week 1 social posts: 3 scheduled, 3 drafts (need images), 2 skipped. Bernard LOCKED.
- [2026-03-24] Scribe — Facebook Creator Fast Track vs TikTok Rewards guide (2,053 words). Bernard G1 LOCKED.
- [2026-03-24] Devan — Fast Track guide integrated, all links verified, build clean (commit 6b42add). Bernard LOCKED.
- [2026-03-24] Scribe — TikTok Creator Health Rating guide (2,106 words). Bernard G1 LOCKED.
- [2026-03-24] Devan — Health Rating guide integrated, all links verified, build clean (commit 141a2b9). Bernard LOCKED.
- [2026-03-24] Vale — 3 social images created (TikTok x2, Instagram). Bernard G1 LOCKED.
- [2026-03-24] Devan — Schema markup (JSON-LD: Article, BreadcrumbList, WebSite, Organization). Commit 07be557. Bernard LOCKED.
- [2026-03-24] Wren — 10 Pinterest pins scheduled (Mar 24-29). Bernard LOCKED.
- [2026-03-24] Devan — CTA links: 7 calculator + 9 tools links added, 4 broken links fixed (16 guides). Bernard LOCKED.
- [2026-03-23] Scribe — Search views SEO guide written + merged (old duplicate deleted). Bernard LOCKED.

## Done
<!-- Completed and locked items. Archive periodically. -->
- [2026-03-25] Bernard ops review -- Creator sweep revision LOCKED (commit 58a55caf): 4 over-500K creators replaced, beauty raised to 5 creators, all 45 under 500K cap. DR1+DR2 design fixes confirmed LOCKED (commit bace7003). DR3 niche index redesign DEFERRED (page already functional). Build verified clean.
- [2026-03-25] Evening ops sprint -- 6 items LOCKED:
  - Navbar logo swap (commit 11436746). LOCKED.
  - Markdown table rendering fix (commit 61500212). LOCKED.
  - Guide thumbnail fix (commit ba4d106f). LOCKED.
  - Calculator UI overhaul v2 (commit 3b1211a). LOCKED.
  - Christopher niche case study research (research/niche-case-studies-2026.md). LOCKED.
  - Niche page bug fixes + 3 artist creator swaps (commit 775b2cc5). LOCKED.
- [2026-03-25] Sprint Wave 4 ALL 4 AFTERNOON WORKSTREAMS LOCKED:
  - AS1 Orphan Cross-Linking (commit ea211b1): 36 links across 28 guides, 12 orphans resolved. LOCKED.
  - AS2 Creator Profile Images: CANCELLED (initials are appropriate for real people).
  - AS3 Content Gap + Guide #106 (commit 822bbbd): LIVE Subscriptions guide, 2,800 words, 4 affiliate placements, build clean. LOCKED.
  - AS4 SEO Quick Wins (commit 74c91d1): 1 redirect added, meta/titles verified clean. LOCKED.
  - Christopher research: content-gap-seo-audit-2026-03-25.md. LOCKED.
- [2026-03-25] Quality Sprint ALL 7 WORKSTREAMS LOCKED by Bernard afternoon review:
  - WS1 Hero Images (commit 185c614): 105/105 guides have hero+thumb images. LOCKED.
  - WS2 Niche Overhaul (commit 7c337c8): 10 mega-famous creators replaced, 20 profile images. LOCKED.
  - WS3 Calculator Redesign (commit d6fbc8f): 3 calculators redesigned, Creator Fund removed. LOCKED.
  - WS4 Email Flow (commit 4afeebf): Double-gating removed, honest welcome email. LOCKED.
  - WS5 Search Bar (commit 6774ff6): Cmd+K across 116 pages. LOCKED.
  - WS6 Site Audit (commit aa37beb): 3 broken links, 6 affiliates, 6 sitemap, 4 nav links fixed. LOCKED.
  - Niche Audit research consumed by WS2. LOCKED.
- [2026-03-25] Guides #104 + #105 LIVE: Minis/Micro-Dramas + Monetize Under 10K integrated by Devan (commits eede58e, 05a69f8, 212ea7a). All [UNVERIFIED] flags converted, links verified, build clean. Bernard LOCKED.
- [2026-03-25] X post LIVE: eligibility angle + social-monetization-01.png. Wren via Zernio. Bernard LOCKED.
- [2026-03-25] Bernard G1 review: 6 social images LOCKED. Production-ready, all specs met. Vale delivery approved for Wren social calendar.
- [2026-03-25] Bernard G1 review: Minis/Micro-Dramas guide LOCKED. Clean content, 0 em dashes, affiliate components correct. Routed to Devan for integration.
- [2026-03-25] Bernard G1 review: Monetize Under 10K guide LOCKED. 4 [UNVERIFIED] flags to convert to hedging language during Devan integration. Content otherwise clean.
- [2026-03-25] Effect House Monetization guide: LIVE (commit e8afbbd). Guide #103. P1 keyword, zero competition. Bernard LOCKED.
- [2026-03-25] Hero gen script fix: graceful quota handling (commit 344cb19). 50 guides remaining, 2 cron runs. Bernard LOCKED.
- [2026-03-24] Visual Overhaul Phase 3: 8 niche detail pages LIVE (commit 71589f0). 48 creator spotlights, SVG icons, RPM viz, tools, email capture. Bernard LOCKED.
- [2026-03-24] 8 niche SVG icons: flat #F4A261 24x24, all 8 niches. Vale LOCKED.
- [2026-03-24] Hero image style guide + 5 samples: prompt template documented, 5 unique heroes. Vale LOCKED.
- [2026-03-24] Creator research: 48 creators across 8 niches + 6 replacements + handle verification. Christopher LOCKED.
- [2026-03-24] Hero gen cron: launchd daily 6AM PT. Script needs fix (routed to Devan). Bernard LOCKED with caveat.
- [2026-03-24] Hero images: 65/102 generated. 37 remaining pending script fix. Vale partial LOCKED.
- [2026-03-25] Lead magnets (RPM Cheat Sheet + Eligibility Checklist) + 5-email welcome sequence: Scribe LOCKED. Ready for Devan integration.
- [2026-03-25] Favicon: all sizes deployed (commit d7cd4e1). Bernard LOCKED.
- [2026-03-25] Cross-platform social strategy research: Christopher LOCKED. 20+ sources, 6 platforms analyzed. Report: Vault/Inbox/2026-03-24-tcp-social-content-research.md
- [2026-03-25] 4 affiliate links activated + tracking spreadsheet: Devan LOCKED (commit 5152269).
- [2026-03-25] Kit affiliate activation: 7 guides updated, disclosures added (commit aec86d8). Bernard LOCKED.
- [2026-03-25] AdSense/Gumroad monetization research: Christopher LOCKED. Key: need Privacy/Terms/About/Contact pages. Report: Vault/Inbox/2026-03-24-tcp-adsense-gumroad-research.md
- [2026-03-25] Pinterest boardId fix: all 16 pins updated, 11 scheduled, 2 duplicates cleaned. Bernard LOCKED.
- [2026-03-25] Email Growth Sprint Track A: lead magnet pages, inline CTAs on 102 guides, exit-intent popup, welcome email rewritten, 4 legal pages (Privacy/Terms/About/Contact). Commit 021d29b. Bernard LOCKED.
- [2026-03-25] Skill Consolidation PROJECT COMPLETE: 24→14 skills, 42% reduction, 0 data loss. Bernard G-final LOCKED.
- [2026-03-24] Kit vs Mailchimp email marketing guide: LIVE (commit c46b507). Guide #102. Kit $25 affiliate bonus eligible. URL: /guides/best-email-marketing-tiktok-creators. Bernard LOCKED.
- [2026-03-24] TikTok Creator Health Rating guide: LIVE (commit 141a2b9). Guide #90. Bernard LOCKED.
- [2026-03-24] Facebook Creator Fast Track guide: LIVE (commit 6b42add). Guide #89. Bernard LOCKED.
- [2026-03-24] Social images: 3 images created by Vale, LOCKED. Brett needs to upload via Zernio dashboard.
- [2026-03-24] Internal linking SEO: 25 links, 18 guides, commit 9d74799. LIVE on Vercel. Bernard LOCKED.
- [2026-03-24] Faceless Niches + Scaled LIVE + AI Policy guides: LIVE (commit 6e8c033). Guides #91-93. Bernard LOCKED.
- [2026-03-24] Keyword gap analysis: 14 topics identified, top 5 Priority 1. Christopher LOCKED.
- [2026-03-24] CTA links: 7 calculator + 9 tools links, 4 broken links fixed across 16 guides. Bernard LOCKED.
- [2026-03-24] 10 Pinterest pins scheduled (Mar 24-29). Wren LOCKED.
- [2026-03-24] Email integration: code deployed, Resend domain verified, table created. Bernard LOCKED.
- [2026-03-23] SEO guide rewrite: committed + pushed to production (b5eb90e). Slug renamed tiktok-search-views-seo → tiktok-search-seo-optimize-views. Bernard LOCKED.
- [2026-03-23] Christopher research (internal linking + Reddit + keyword scan): LOCKED. Report at Vault/Inbox/2026-03-23-tcp-research.md. Key finding: Meta Creator Fast Track comparison guide opportunity.
