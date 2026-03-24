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
- Amazon affiliate links use the AffiliateLink component with tag `tiktokcreatpr-20`.
- Exolyt has no affiliate program — removed from TCP tool list.
- Autonomous content pipeline: auto-post to all socials, weekly analytics review, no approval gates.
- Vercel auto-deploys from git pushes — no manual deploy needed. Verify local HEAD matches production before pushing.

## Active
<!-- Bernard maintains this section. Current tasks in flight. -->
- Week 1 social posts: scheduled (5 of 7), blocked on Zernio account connections
- **Internal linking: READY for Devan** — Add 20 priority links from Christopher's audit (see Vault/Inbox/2026-03-23-tcp-research.md)
- **Guide refreshes: READY for Devan** — Update tiktok-algorithm-2026 (ownership/local feed) + tiktok-search-seo-optimize-views (Google Search integration)
- **New guide: Facebook Creator Fast Track vs TikTok Rewards** — READY for Scribe (timely, Meta launched March 18)
- **New guide: TikTok Creator Health Rating** — READY for Scribe
- **Resend + Supabase email integration: IN PROGRESS (Devan)** — Supabase table, Resend client, welcome email, download gating, API route updates
- 88 guides deployed to live site, all images verified working
- Growth plan delivered: see Vault/Inbox/2026-03-23-tcp-growth-plan.md
- Reddit outreach: research complete, READY for Ricky to begin engagement (verify subreddit rules first)
- Pinterest template creation: READY for Vale
- Affiliate link activation: BLOCKED on Brett applying to 8 programs
- Week 1 social posts: scheduled (5 of 7), blocked on Zernio account connections

## Pending Review
<!-- Agents add completed deliverables here. Bernard reviews and routes next. -->
- **What:** Resend + Supabase email integration — Resend client, branded welcome email template, both API routes updated to send welcome emails, EmailSignupForm updated with leadMagnet prop, all 4 resource pages wired with lead magnet names, SQL migration for email_subscribers table
- **Where:** `src/lib/resend.ts`, `src/lib/email/welcome-template.ts`, `src/lib/email/send-welcome.ts`, `src/app/api/email/route.ts`, `src/app/api/newsletter/route.ts`, `src/components/EmailSignupForm.tsx`, `supabase/migrations/001_create_email_subscribers.sql`
- **Status:** READY FOR REVIEW
- **BLOCKER:** The `email_subscribers` table must be created in Supabase before this works. Run the SQL in `supabase/migrations/001_create_email_subscribers.sql` via the Supabase SQL Editor (project: tpihpenmsiojzznpcmcr). I could not authenticate to the Supabase CLI to run it remotely.
- **Note:** Resend `from` address is `hello@tiktokcreativityprogram.com` — the domain must be verified in Resend dashboard for emails to send. If not yet verified, Resend will reject sends gracefully (the API route still succeeds, email just doesn't go out).

## Work Log
- [2026-03-23] Scribe — Search views SEO guide written + merged (old duplicate deleted). Bernard LOCKED.

## Done
<!-- Completed and locked items. Archive periodically. -->
- [2026-03-23] SEO guide rewrite: committed + pushed to production (b5eb90e). Slug renamed tiktok-search-views-seo → tiktok-search-seo-optimize-views. Bernard LOCKED.
- [2026-03-23] Christopher research (internal linking + Reddit + keyword scan): LOCKED. Report at Vault/Inbox/2026-03-23-tcp-research.md. Key finding: Meta Creator Fast Track comparison guide opportunity.
