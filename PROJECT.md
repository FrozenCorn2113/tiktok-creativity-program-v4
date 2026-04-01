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

## Pending Review
<!-- Items awaiting Bernard review -->


## Active
<!-- Bernard maintains this section. Current tasks in flight. -->

### April Content Queue (LOCKED 2026-03-31, execution started 2026-04-01)
**Research:** `research/monthly-keyword-research-april-2026.md`
**Guide pipeline:**
1. TikTok Carousel + Creator Rewards (HIGH) -- DONE. Guide #114 LIVE (commit b069ef8f). All LOCKED: Christopher research, Scribe 2,400w, Devan integration, Vale hero wired in frontmatter. Bernard LOCKED 2026-04-01.
2. Q2 Spring Content Strategy 2026 (MEDIUM-HIGH -- seasonal, tax deadline angle) -- DONE. Guide #115 LIVE (commit 22809988). Full pipeline: Christopher research LOCKED, Scribe 2,300w LOCKED, Vale hero LOCKED, Devan integration LOCKED. Bernard LOCKED 2026-04-01.
3. TikTok Shop Creator Restrictions + Non-Interactive Video Rules (MEDIUM) -- DONE. Guide #116 LIVE (commit 22809988). Full pipeline: Christopher research LOCKED, Scribe 2,300w LOCKED, Vale hero LOCKED, Devan integration LOCKED. Editorial fix applied to old Shop guide (commit 55762712). Bernard LOCKED 2026-04-01.
4. Japan + South Korea country guides (gap fill) -- QUEUED

**Freshness fixes -- DONE (commit 1ec16ce4, Bernard LOCKED 2026-04-01):**
- `creator-tax-guide-2026.mdx` -- Added OBBBA $2,000 threshold for 2026 income
- `tiktok-shop-affiliate-commission-rates.mdx` -- Fixed Shop Plan date to early 2026 + added logistics mandate
- `tiktok-shop-affiliate-creativity-program.mdx` -- Added logistics mandate context
- `tiktok-creator-taxes-1099.mdx` -- Already current, no changes needed
- `tiktok-one-creator-marketplace.mdx` -- Already reflects completed sunset, no changes needed

**Brett action: Affiliate applications**
- CapCut: re-apply via Impact Radius (35% recurring)
- Metricool: open program (50% up to $50/user/month)

### Week 2 Social Calendar -- LOCKED, execution Apr 6
**Guide selection locked.** 7 guides: eligibility-requirements, creator-tax-guide-2026 (seasonal: US tax deadline Apr 15), multiple-revenue-streams, increase-watch-time-tiktok, best-video-editing-apps-tiktok, tiktok-rpm-by-niche-2026, viral-psychology.
**28 unique images needed from Vale.**
**Execution:** Monday Apr 6 -- Bernard routes Scribe (copy) + Vale (images). Schedule Wednesday Apr 8 via Zernio.
**See:** `TCP-CONTENT-CALENDAR.md` Week 2 section.

### 2026-03-30 Guide #112 -- TikTok Shop Affiliate Commission Rates -- DONE
**Full pipeline complete.** Christopher research LOCKED -> Scribe guide LOCKED (2,680w) -> Devan integrated (eb1430be) -> Vale hero image included. LIVE.

### 2026-03-30 Freshness Review Queue -- DONE
4 guides audited. Oracle deal: LOOKS GOOD. CHR + Additional Reward Criteria + Australia: fixes applied (commit 40950f04). Research: `research/freshness-audit-and-content-gap-2026-03-30.md`.

### Ongoing
- **116 guides live + 3 calculators.** Guide #115 (Q2 Spring Content Strategy, commit 22809988) + Guide #116 (TikTok Shop Restrictions, commit 22809988) shipped 2026-04-01.
- **Week 1 social LIVE:** 17 posts scheduled across X/Pinterest/Instagram (Mar 28 - Apr 4).
- **RULE: Every post gets a unique image. NEVER reuse images across posts.**
- **Affiliate activation: Kit + Buffer + 4 more LIVE.** 6 active affiliate links.
- **Email system LIVE.** Brett action: Run SQL for unsubscribe tracking.
- **AdSense READY TO APPLY.** Brett action item.
**Where:** `TCP-CONTENT-PIPELINE.md`

### 2026-03-26 Traffic Generation + Social Media Strategy
**Goal:** Comprehensive traffic and social strategy for TCP launch.
**Output:** `TCP-TRAFFIC-STRATEGY.md`
**Status:** Delivered. Awaiting Brett review.

### 2026-03-26 Creator Rewards Playbook (Full Content) -- DONE

Completed and LOCKED 2026-03-28. PDF (40 pages, full TCP brand, commit c9f37b82). Content: 10,200 words, 12 sections, 0 placeholders. See Done section.

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

**Next actions queued:**
- Future consideration: Add "Real Earnings Example" callout to niche pages using Christopher's case study research

### 2026-03-27 Beauty Niche Creator Addition -- DONE

Added 2 mid-tier beauty creators via Christopher research + Devan implementation. Build clean, auto-deployed.
- Kelli Anne Sewell (@makeupxka, ~213K) — NYC MUA, makeup tutorials/reviews/skin prep
- Tamar (@glowbytamar, ~122K) — licensed esthetician, honest skincare reviews, TikTok Shop focus
- **Note:** Devan found beauty niche at 3 in `niche-data.ts` (not 5 as tracked in PROJECT.md). Now at 5. May be a data file discrepancy vs `nicheData.ts` — verify if needed.

### Ongoing
- **108 guides live + 3 calculators.** All guides loading. Search index current. Next gap queued: France country guide.
- **Week 1 social LIVE:** 17 posts scheduled across X/Pinterest/Instagram (Mar 28 - Apr 4) with 30 unique Vale images.
- **RULE: Every post gets a unique image. NEVER reuse images across posts.**
- **Affiliate activation: Kit + Buffer + 4 more LIVE.** 6 active affiliate links.
- **Email system LIVE:** PDFs delivered via welcome email + landing pages. Unsubscribe page deployed. **Brett action: Run SQL in Supabase to activate unsubscribe tracking:** `ALTER TABLE email_subscribers ADD COLUMN unsubscribed_at timestamptz DEFAULT NULL;`
- **AdSense READY TO APPLY.** All 4 legal pages live. Brett action item.
- **Reddit outreach:** 6 HIGH leads, copy-paste replies. Manual posting by Brett.

### Creator Sweep Revision -- LOCKED (commit 58a55caf)
All 4 over-500K creators replaced. Beauty raised to 5 creators. All 45 creators now verified under 500K. Build clean.

### 2026-03-26 Lead Magnet & Email Quality Audit

**Full audit:** `TCP-LEAD-MAGNET-AUDIT.md`

**Key findings:**
- Zero actual PDF files exist. All "downloads" redirect to web pages with "use Ctrl+P" instructions.
- Comprehensive cheat sheet (340 lines, 7 sections, 30-day plan) was written but never built into anything.
- Welcome email is functional HTML but has no logo image, no PDF preview, no visual polish.
- Only Email 1 of 5-email sequence is implemented. Emails 2-5 exist as content only.
- Unsubscribe page does not exist (CAN-SPAM issue).
- 9 email capture points across the site, all working but all promising deliverables that don't exist as actual downloads.

**Execution plan:** Vale designs 2 PDFs in Canva + welcome email mockup. Devan builds unsubscribe page (parallel). Then Devan hosts PDFs, updates all links, implements email redesign, upgrades landing pages.

**Status:** RESOLVED (2026-03-28). All deliverables built and deployed: 2 PDFs live in /public/downloads/, unsubscribe page + API deployed, welcome email wired to deliver PDFs, landing pages have download buttons. One Brett action remaining (SQL migration).

## Pending Review
<!-- Agents add completed deliverables here. Bernard reviews and routes next. -->

- **What:** TikTok Shop creator restrictions + non-interactive video rules research brief — covers all 9 angles: Shop eligibility, follower requirements, pilot program, region availability, product category restrictions, CRP non-interactive video definition, Shop tag effect on CRP earnings, 2025-2026 policy changes, logistics mandate timeline, dual-program participation rules, ineligible video types, best practices, common disqualification mistakes
- **Where:** `projects/tiktok-creativity-program/research/tiktok-shop-restrictions-noninteractive-research.md`
- **Status:** READY FOR REVIEW

- **What:** Guide #115 — Q2 Spring Content Strategy 2026 (2,200-2,600 words). Covers Q2 RPM seasonality and Oracle transition context, spring content themes with watch time engineering, tax season window (April 15 + June 15 pivots), highest-RPM niches for Q2, SRP positioning, volume compound math, qualified views vs total views trade-off, 30-day content plan, and summer prep lead time.
- **Where:** `projects/tiktok-creativity-program/content/guides/tiktok-q2-content-strategy-2026.mdx`
- **Status:** READY FOR REVIEW



## Work Log
- [2026-04-01] Bernard daily ops -- Guide #114 Pending Review cleared + LOCKED (hero wired, commit b069ef8f confirmed). Guides #115 + #116 full pipeline complete: Christopher research (8 angles each) -> Scribe (2,300w each) -> Vale (2 unique hero images) -> Devan integration (commit 22809988, broken link fixed, 8 cross-links added). Editorial fix: old Shop guide updated to hedge product tag CRP claim (commit 55762712). Site now at 116 guides. April Content Queue guides 2-3 DONE.
- [2026-04-01] Bernard monthly cycle -- April Content Queue activated. Christopher researching Carousel Monetization (Guide #114). Freshness fixes DONE: 3 guides updated (tax threshold, Shop Plan date, logistics mandate), 2 already current. Commit 1ec16ce4. Monthly maintenance DONE: build restored (gray-matter), hero image restored, .gitignore cleanup. Commit 3c1828a4. Ricky leads LOCKED (15 TCP at 13-14/15).
- [2026-03-31] Bernard overnight cycle -- Hero image for guide #112 (TikTok Shop Affiliate Commission Rates) LOCKED: 1200x630 WebP, dark charcoal + orange shapes, no text/faces, on-brand. Ricky overnight leads LOCKED: 25 leads (15 TCP at 15/15 quality, 10 YB, 0 VFO). TCP leads have copy-paste replies linking relevant guides. Brett posts manually.
- [2026-03-30] Bernard daily ops -- Freshness audit: Oracle deal LOOKS GOOD, 3 guides fixed (CHR scale/scope/quiz + Additional Reward 2026 context + Australia speculation removed), commits aeb94ebe + 40950f04. Guide #113 (Search Views + Creator Rewards, 2,100w) LIVE via Christopher research -> Scribe -> Vale hero -> Devan integration. Site at 113 guides.
- [2026-03-30] Guide #112 TikTok Shop Affiliate Commission Rates LIVE. Christopher research LOCKED, Scribe wrote (2,680w), Bernard reviewed + LOCKED, Devan integrated (eb1430be) with Vale hero image. Full pipeline in single cycle.
- [2026-03-30] Guide #111 TikTok One Creator Marketplace LIVE. Scribe wrote (2,350w), Bernard reviewed (em dash fix), Devan integrated (4f846f0a), Vale hero image (3dbfeada). Full pipeline complete.
- [2026-03-30] Bernard Monday cycle -- Reviewed 3 pending items. TikTok One Research: LOCKED (2,800w, all 9 questions, claims labeled). France Guide #109: LOCKED (1,750w, all 8 sections, minor note on em dashes in AffiliateLink labels). TikTok One Guide: REVISION NEEDED (3 em dashes at lines 44-46, Scribe routed for fix). Content Gap Analysis: all 3 gaps closed, moved to Done. Duplicate Week 2 calendar entry cleaned. Christopher routed for Monday weekly keyword scan. Kit 11 niche selection research started (Christopher, background).
- [2026-03-29] Bernard daily ops -- Closed all 3 content gaps from 2026-03-28 analysis. Guide #109 France LIVE (Scribe 1,800w + Devan d65a4ac4 + Vale hero e88e1b6a). Guide #110 TikTok One LIVE (Christopher research + Scribe 2,200w + Devan 62a10299 + Vale hero 17cc338b). Playbook Active entry cleaned up (was stale -- already done 2026-03-28). Week 2 social calendar LOCKED (7 guides, starts Apr 7, Scribe+Vale routes Apr 6).
- [2026-03-28] Bernard daily ops -- Cleared 17-item Pending Review backlog. All items LOCKED (see Done). Christopher content gap analysis: top opportunity is TikTok Pulse Ad Revenue Sharing (Low difficulty, zero TCP coverage). Routing Scribe for Pulse guide + Devan for Mexico guide integration. Brett action items: (1) SQL migration for unsubscribe tracking, (2) AdSense application.
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
- [2026-03-31] Vale hero image for guide #112 (TikTok Shop Affiliate Commission Rates): 1200x630 WebP, on-brand. Bernard LOCKED.
- [2026-03-31] Ricky overnight leads: 25 leads (15 TCP, 10 YB, 0 VFO). TCP leads quality at 15/15 with copy-paste replies. Bernard LOCKED. Brett posts manually.
- [2026-03-28] Bernard batch review -- 17 Pending Review items ALL LOCKED:
  - CalculatorNav component (all 3 calculator pages, active state, Framer Motion). LOCKED.
  - Homepage hero alexeubank.webp (file confirmed, path correct, commit bbd3e668). LOCKED.
  - Lead magnets wired up: PDFs in /public/downloads/, landing pages, welcome email (commit 11d2493b). LOCKED.
  - Creator Rewards Playbook PDF (40 pages, full TCP brand, commit c9f37b82). LOCKED.
  - Playbook content (10,200 words, 12 sections, no placeholders/em dashes). LOCKED.
  - LEAD-MAGNET-SPEC.md (production spec for 2 PDFs, 11 exclusive elements). LOCKED.
  - Unsubscribe page + API (CAN-SPAM compliance, commit b5ad225d). LOCKED. Brett SQL blocker noted.
  - Tools page fix (equipment → guide links, Cameras card, commit 8f7e981e). LOCKED.
  - 88 guide hero images (zero missing across all 107 guides). LOCKED.
  - Week 1 social tone pass (17 posts, hooks tightened, em dashes removed, TCP-CONTENT-CALENDAR.md). LOCKED.
  - Lead magnet PDFs (RPM Cheat Sheet 9pp + Eligibility Checklist 4pp + email hero image). LOCKED.
  - Niche thumbnail images on related guide cards (commit 40bbc8d8). LOCKED.
  - Broken internal link audit (1,002 links scanned, 2 fixed, commit e8867375). LOCKED.
  - CVE-2026-0969 fix: next-mdx-remote v6 + ComparisonTable JSON props (commit aa0cf571). LOCKED.
  - Mexico guide content (2,400w, no placeholders/em dashes -- routing to Devan for integration). LOCKED.
  - Responsive table fix (mobile horizontal scroll, commit d76dd0d1). LOCKED.
  - Email subscribe fix (hardcoded correct Supabase URL, commit 2f043944). LOCKED.
- [2026-03-28] **TCP Week 1 Content System COMPLETE.** 17 posts scheduled across 3 platforms via Zernio: 5 X (Mon-Fri 9AM PT), 7 Pinterest (daily 9AM/1PM PT), 5 Instagram (Mon-Fri 10AM PT, incl. 3 carousels). 30 unique images. Zero Brett involvement. Week 2 planning starts next Monday.
- [2026-03-28] Bernard batch review -- 7 items LOCKED:
  - Ricky TCP leads 2026-03-28 (10 leads, top 3 at 13/15). Brett posts manually.
  - Ricky TCP deep scan 2026-03-26 (10 leads). Brett posts manually.
  - Ricky full scan 2026-03-26 (2 leads: TCP + YB). Brett posts manually.
  - Resend audience sync (commit fcb0dfae). BLOCKER: Brett must set SUPABASE_SERVICE_ROLE_KEY in .env + Vercel for batch sync.
  - Content Calendar Week 1 (17 posts, TCP-CONTENT-CALENDAR.md). Production-ready.
  - Vale Week 1 images (30 unique, social/images/week-1/). Visually verified -- on-brand, unique, correct counts.
  - Content Pipeline Spec (TCP-CONTENT-PIPELINE.md). Comprehensive, execution-ready.
- [2026-03-26] Niche index hero images fix (Devan): LOCKED 2026-03-26 — commit 669da9c5, visually verified: all 8 hero images showing in card grid, all 8 thumbnails in guides list, zero broken images, zero console errors.
- [2026-03-26] Bernard morning cycle -- 8 Pending Review items assessed. 6 LOCKED: UNVERIFIED tag removal (6273ccaa), email subscription fix (REST API workaround), creator audit (43 creators, actionable), badge/pill removal (5a07f85d, badge.tsx deleted), link audit (179 lines, 13 TODO items resolved), affiliate link resolution (0 TODOs, all real URLs). Creator data fixes (niche-data.ts) conditionally LOCKED (57 entries plausible with replacements). Niche index hero images REVISION NEEDED (page still text-only, no hero images found).
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
