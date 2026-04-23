# TCP Autonomous Ops Plan

Goal: TCP runs itself. Brett gets 2-3 emails per week, clicks a link or replies GO when needed, nothing else.

## Current autonomy (already in place)

- **Bernard:** full routing authority on TCP per `PROJECT.md`. Ships code, reviews content, locks deliverables.
- **Cron:** Monday 3:30am PT content pipeline, Friday 4am PT analytics (both in crontab, both verified running).
- **Cron:** Sunday 5pm PT weekly digest newsletter (launchd, current auto-gen).
- **Vercel:** auto-deploy from `main` on every push.
- **Zernio MCP:** all social posting flows, zero browser automation.
- **Memory:** Brett's preferences (no em dashes, no text in images, unique images per post, hook-first, etc.) are persisted and loaded every session.

## What's missing

1. **Monthly content queue kickoff** is manual — someone types "run the monthly queue" and Bernard goes. Make auto on day 1 of each month.
2. **Guide production** (Christopher research → Scribe copy → Vale hero → Devan integration) is manually chained. One cron per guide would fire the full chain.
3. **Visual approval channel** — Vale ships hero images and they sit in Pending Review waiting for Brett to open his terminal and approve. Needs to become an email with inline previews + one-click approve.
4. **Ricky is paused.** TCP Reddit leads stopped. Re-enable as a Sunday scan that emails Brett top leads + copy-paste replies (Brett posts manually).
5. **Brett briefing email** — nothing today summarizes the week for Brett. He has to read `PROJECT.md` + daily notes to catch up.
6. **Failure monitoring** — when a cron fails, an API key expires, or Resend starts bouncing, nobody tells Brett until he notices.
7. **Drip nurture scheduling** — wired in Phase 1b of the nurture plan, but listing here for completeness.

## Decision rights — Bernard vs Brett

Bernard ships autonomously:
- Any guide (research, copy, hero, integration, publish).
- Any freshness fix under 500 words of content change.
- Social calendars (copy, images, scheduling).
- Newsletter sends (Sunday 5pm PT).
- Drip nurture content updates (copy only).
- SEO fixes (redirects, meta, internal linking).
- Affiliate link swaps with equivalent-or-better partners.
- PDF content updates under 5 pages changed.

Brett approves (via email):
- New product launches (anything paid).
- New domains or subdomains.
- New email lead magnet concepts.
- Visual identity shifts (new color, new font, new logo treatment).
- Any spend or new SaaS subscription.
- Ricky Reddit leads — he posts manually per memory rule.
- New PDF cover designs or >5 pages changed.

Bernard flags Brett (no approval, just an FYI):
- First guide shipped per new niche.
- Any API/cron failure that self-heals.
- Weekly metrics summary.

## Cron schedule (final state)

```
# Daily
30 7 * * *   Atlas health check → email Brett ONLY on failure
0  8 * * *   Bernard inbox scan → process Resend replies, unsubscribes, support asks

# Weekly
30 3 * * 1   Monday content pipeline (existing)
0  7 * * 1   Brett Monday briefing email
0  9 * * 4   Scribe drafts Sunday newsletter
0 14 * * 5   Bernard reviews + locks newsletter
0 16 * * 5   Friday analytics (existing)
0 17 * * 0   Weekly digest send (existing)
0 18 * * 0   Ricky TCP Reddit scan → email Brett with top 10 leads

# Monthly
0  6 1 * *   Monthly content queue kickoff (Christopher research, Bernard selects)
0  9 15 * *  Mid-month freshness audit
```

All launchd / shell-cron paired so one failure doesn't silently kill the system.

## Three email touchpoints to Brett

### 1. Monday 7am PT — "TCP: Week of {DATE}"
One email. Plain text + inline images. Sections:
- **Shipped last week:** 3-line summary (guides shipped, social posts live, newsletter open rate, sub count delta).
- **This week's queue:** guides planned, social calendar locked, newsletter topic.
- **Needs your eye:** link to review dashboard if there's anything visual waiting. Otherwise "nothing — all clear."
- **Blockers:** API keys expiring, failed sends, anything Bernard can't resolve alone.
- **Ricky Reddit leads:** top 5 with subreddit + one-line angle + [link to copy-paste reply].

Brett reads over coffee. Optional reply.

### 2. When-needed — "TCP review: {WHAT}"
Fires only when visual work needs approval. Inline image previews + button to `https://tiktokcreativityprogram.com/review/{token}` where Brett clicks GO / REVISE / comment. Dashboard writes decision to Supabase, Bernard picks it up on next poll. No reply parsing needed.

Use cases: new hero image set, new PDF cover, new logo usage, new newsletter format.

### 3. Sunday 6pm PT — "TCP Ricky: {N} leads this week"
Only if there are leads. Subject line includes count so Brett can skip when zero. Each lead has: subreddit, post title, link, angle score, the ready-to-paste reply. Brett posts manually per memory.

That's the whole interface. 2-3 emails most weeks. One during slow weeks.

## Visual review dashboard

Simple Next.js route: `/review/[token]` inside the existing TCP site. No new infra.

Flow:
1. Bernard locks visual work → creates `review_requests` row in Supabase with token, item type (hero/pdf/logo), image URLs, preview metadata.
2. Monday briefing email includes link per pending item.
3. Brett clicks → sees images inline, GO / REVISE buttons + comment box.
4. Button click PATCHes `review_requests.decision = 'go' | 'revise'` with timestamp.
5. Bernard cron polls pending rows every 10 min, acts on decided ones.

Token is HMAC-signed so no auth needed — one-click from Brett's inbox.

Build cost: ~3-4 hours Devan. Shares the email rendering code from Phase 1a nurture work.

## Failure monitoring

Atlas runs 7:30am PT daily. Checks:
- Last cron success timestamps (Monday content, Friday analytics, Sunday digest — stale if >26 hours past expected run).
- Resend API: recent bounce rate >5%, recent send failure rate >1%.
- Supabase: unreachable, schema drift (new columns expected missing).
- Vercel: last deploy status, build errors.
- Domain: DNS A record, cert expiry <14 days.

Result: if ANY failure, email Brett with the specific issue + Bernard's remediation attempt + what Brett needs to do. If all pass, silent — no email.

Pattern: `scripts/health-check.mjs` → Resend → Brett on fail only.

## Ricky reactivation

Memory notes Ricky was paused after 6 consecutive zero-lead weeks on VFO. TCP Ricky has been productive (15/15 lead quality repeatedly). Re-enable specifically for TCP, Sunday 6pm PT scan:

- Subreddits: `r/TikTokMonetizing`, `r/CreatorServices`, `r/NewTubers`, `r/TikTok`, `r/tiktokcreators`, `r/SocialMediaMarketing`.
- Filter: posts from last 7 days, ≥3 comments, asking a question TCP answers.
- Output: top 10 leads with copy-paste replies linking to the most relevant TCP guide. Email Brett with the digest — he posts manually per the `feedback_b2b_local_only` style.
- Quality gate: skip if score <12/15.

Write the email via `scripts/ricky-tcp-weekly.mjs`. Cron the shell wrapper.

## Phase rollout

**Phase A (week of 2026-04-27) — ships with nurture drip:**
- Brett Monday briefing email (`scripts/brett-monday-briefing.mjs` + cron). This alone cuts Brett's mental load 80%.
- Review dashboard route + Supabase table + HMAC token signing.
- Refactor Bernard to create `review_requests` rows instead of leaving items in PROJECT.md Pending Review.

**Phase B (week of 2026-05-04):**
- Ricky TCP weekly cron + email.
- Atlas health check cron.
- Monthly content queue auto-kickoff.

**Phase C (week of 2026-05-11):**
- Inbox scanner (process Resend replies: unsubscribes already work, but also capture buy-signal replies from Hormozi demand prompts and route to a Supabase `inbox_signals` table).
- Scribe autonomous newsletter draft pipeline (Thursday 9am PT → Friday 2pm Bernard review → Sunday 5pm send).

**Phase D (week of 2026-05-18):**
- Full autonomous guide production chain (Christopher kicks off one guide per week, chains through Scribe → Vale → Devan → Bernard review, ships without human input).

After Phase D, the only Brett touchpoints are: Monday briefing read, occasional review dashboard click, Sunday Ricky email (manual post). Everything else is hands-off.

## Success criteria

- Brett spends <30 min per week on TCP ops after Phase D.
- Zero missed content ships due to waiting on approval.
- Newsletter open rate ≥35% sustained.
- Drip nurture deliverability ≥99% (bounces + complaints <1%).
- No Brett interventions required for cron failures (Atlas detects, Bernard remediates, Brett gets FYI).

## Explicitly not doing

- **No AI-written copy autopilot.** Scribe drafts, Bernard reviews, humans retain voice. Hormozi research informs, doesn't replace.
- **No auto-approval of visuals.** Brett sees every new hero, every new PDF cover, every newsletter format change. One click, but he sees it.
- **No financial autonomy.** Bernard never signs up for anything, never upgrades tiers, never spends.
- **No product launch autonomy.** Phase 4 of the nurture plan still requires Brett greenlight.
- **No Slack/Discord/SMS channels.** Email only. One inbox, one channel, one habit.

## Files to build (Phase A)

- `src/app/review/[token]/page.tsx` — review dashboard
- `src/app/api/review/[token]/route.ts` — decision PATCH endpoint
- `supabase/migrations/003_create_review_requests.sql` — review_requests table
- `scripts/brett-monday-briefing.mjs` — Monday 7am PT email builder
- `scripts/brett-monday-briefing.sh` — cron wrapper
- `src/lib/email/briefing-template.ts` — uses Phase 1a shell
- Bernard playbook update in `PROJECT.md` — how to create review_requests

Estimated Devan build: 1 focused day after Phase 1a template shell lands.
