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
- **TCP VISUAL OVERHAUL (3 workstreams)**
  - WS1: Guide Hero Images — 79 of 102 guides need branded hero+thumb images. Vale designs template, then batch generation.
  - WS2: Niche SVG Icons — 8 custom SVGs to replace emojis on /niche index page.
  - WS3: Niche Detail Page Redesign — 4 existing pages need redesign, 4 new pages need creation. Creator spotlights with real TikTok profile screenshots.
  - **Phase 1 (current):** Vale designs hero image template/style + 8 niche SVG icons.
  - **Phase 2:** Generate 79 hero images using Vale's approved style.
  - **Phase 3:** Christopher researches real creators per niche for spotlights. Vale designs niche page layout. Devan builds.
- **102 guides live + earnings calculator.** All guides loading. All Priority 1 keyword gaps covered.
- **Social strategy: Christopher research LOCKED.** Rebuilding social with data-driven approach. Key findings: carousels outperform static on IG (6.9%), video dominates TikTok (3.39%), text posts win on X (3.56%), Pinterest is search-engine play (5.75% video). Old static illustrations = zero completion rate. Next: Vale creates new social templates per Christopher's format recs, then Wren rebuilds content calendar.
- **RULE: Every post gets a unique image. NEVER reuse images across posts.**
- **Reddit outreach:** 6 HIGH leads, copy-paste replies. Manual posting by Brett. Report: Vault/Inbox/2026-03-24-tcp-reddit-leads.md
- **Affiliate activation: Kit + Buffer + 4 more LIVE.** 6 active affiliate links. Remaining programs have TODO placeholders ready for 5-min activation.
- **Email integration: DEPLOYED** — Brett verify sign-ups work
- **EMAIL GROWTH SPRINT — Track A COMPLETE (LOCKED):** Lead magnet pages live (/lead-magnets/rpm-cheat-sheet, /lead-magnets/eligibility-checklist) with email gates + print. Inline CTA on all 102 guides promotes RPM Cheat Sheet. Exit-intent popup active. Welcome email rewritten to deliver lead magnets. Commit 021d29b.
- **AdSense READY TO APPLY:** All 4 legal pages live (Privacy, Terms, About, Contact). Footer links added. Brett can now apply for AdSense.
- **MONETIZATION PLAN:** Top 3 selected: (1) Google AdSense — legal pages done, Brett applies, (2) Digital product bundle on Gumroad, (3) Ko-fi tip jar.
- **Content refreshes queued (4):** Algorithm 2026 (post-Oracle), posting schedule (Consistency Boost), country eligibility (Japan/SK), TikTok Shop (5 new features)
- **Next guides:** Effect House ($50K/mo, zero competition), Minis/Micro-Dramas, Monetize Under 10K. See Vault/Inbox/2026-03-24-tcp-weekly-keyword-research.md

## Pending Review
<!-- Agents add completed deliverables here. Bernard reviews and routes next. -->

- [2026-03-24] Vale — 8 niche SVG icons (flat, #F4A261, 24x24 viewBox) — What: hand-crafted SVG icons for all 8 niches replacing emojis — Where: `/public/images/niches/icon-{slug}.svg` (musicians, fitness-creators, artists, teachers, beauty, comedy, coaches, travel) — Status: READY FOR REVIEW
- [2026-03-24] Vale — Hero image style guide + 5 sample hero images — What: documented prompt template for Imagen API hero generation; 5 unique sample heroes generated (ring-light-setup, rewards-strategy-2026, music-niche, views-not-counting, platform-comparison) — Where: style doc at `Vale/hero-image-style.md`; images at `/public/images/guides/hero-{slug}.webp` + `thumb-{slug}.webp` — Status: READY FOR REVIEW
- [2026-03-24] Christopher — Niche creator research for 8 niches (48 creators) — What: real TikTok creator spotlights with handles, follower counts, content style, and monetization info for Musicians, Fitness, Artists, Teachers, Beauty, Comedians, Coaches, Travel. Includes flags for 6 creators needing verification before publish. — Where: `projects/tiktok-creativity-program/Christopher/niche-creator-research.md` — Status: READY FOR REVIEW
- [2026-03-24] Christopher — Creator replacements + handle verification (follow-up to above) — What: replaced 6 creators (James Charles, Sydney Cummings, Kirsty Partridge Art, Gabrielle Bernstein, Jason Derulo, Karol G); corrected 2 handles (Mrs. Kelly: @the_mrskelly confirmed; Marc Chinkoun: @marcchinkoun confirmed). New entries: Hindash, Sivan Tayer, Noor Ahmad, Rob Dial, Venbee, Lola Young. Active flags documented in file. File updated in place. — Where: `projects/tiktok-creativity-program/Christopher/niche-creator-research.md` — Status: READY FOR REVIEW
- [2026-03-24] Devan — Persistent cron for hero image generation — What: standalone bash script using Gemini Imagen API to generate hero + thumb WebP images for 68 remaining guides (65/day cap, 3s delay, idempotent). launchd plist runs daily at 6AM PT. — Where: script at `scripts/generate-hero-images.sh`, plist at `~/Library/LaunchAgents/com.tcp.generate-hero-images.plist` — Status: READY FOR REVIEW

## Work Log
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
