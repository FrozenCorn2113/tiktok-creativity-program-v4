# TCP Autonomy Loop — Setup Guide

The Fri→Mon weekly autonomy loop is a three-stage pipeline:

1. **Friday 4am PT — Snapshot.** `scripts/tcp-weekly-analytics.sh` calls `scripts/weekly-snapshot.mjs` which writes a structured markdown snapshot to `analytics/weekly/YYYY-MM-DD.md`, then continues with the existing Bernard social review.
2. **Friday 9am PT — Bernard decision.** `scripts/bernard-weekly-decision.sh` reads this week's snapshot + last 4 weeks + `HYPOTHESES.md` + `PROJECT.md`, invokes Bernard (opus), and inserts any cleared-gate proposals into `review_requests`.
3. **Monday 7am PT — Brett briefing.** `scripts/brett-monday-briefing.sh` renders the digest. Bernard proposals appear at the top (one-click GO/REVISE). GO dispatches the downstream agent same-day via `scripts/dispatch-processor.mjs` (runs every 10 min).

## Required env vars

All live in `.env.local` (local cron) and/or Vercel (production site).

| Var | Scope | Purpose |
|---|---|---|
| `RESEND_API_KEY` | both | Email sends (briefing, digest, drip) |
| `RESEND_AUDIENCE_ID` | both | Audience sync |
| `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` | both | Database access |
| `SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | both | Anon-role queries |
| `SUPABASE_SERVICE_ROLE_KEY` | local cron only | Bypasses RLS for snapshot signup queries + Bernard proposal inserts. Without this, snapshots will say "Supabase: non-array response (RLS?)". |
| `REVIEW_TOKEN_SECRET` | both | HMAC for review dashboard tokens. Generate with `openssl rand -hex 32`. Fails closed if missing. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Vercel | GA4 client-side tracking (already set) |
| `GA_PROPERTY_ID` | local cron | GA4 property id for Data API. Defaults to `507035708`. |
| `GA_SERVICE_ACCOUNT_PATH` | local cron | Path to JSON. Defaults to `./ga-service-account.json`. |
| `VERCEL_TOKEN` | local cron (future) | **Brett action:** paste a read-only, project-scoped token so Atlas (Phase B) can check deploy status. Not wired yet — land when Phase B builds. |

## `.gitignore` check

The file already catches:

```
.env
.env.local
.env.vercel
ga-service-account.json
```

Verify any time a new secret lands: `grep -q ga-service-account.json .gitignore && echo OK`.

## Crontab — add to existing setup

Existing TCP entries (keep):

```
30 3 * * 1 /Users/bcarter/Desktop/Claude\ Agents/scripts/tcp-weekly-content.sh
0 4 * * 5 /Users/bcarter/Desktop/Claude\ Agents/scripts/tcp-weekly-analytics.sh
0 7 * * 1 /Users/bcarter/Desktop/Claude\ Agents/projects/tiktok-creativity-program/scripts/brett-monday-briefing.sh
```

Add these (Bernard decision + dispatch processor):

```
0 9 * * 5 /Users/bcarter/Desktop/Claude\ Agents/projects/tiktok-creativity-program/scripts/bernard-weekly-decision.sh
*/10 * * * * /Users/bcarter/Desktop/Claude\ Agents/projects/tiktok-creativity-program/scripts/dispatch-processor.sh
```

Install with `crontab -e`. All times are Mac local (set to America/Los_Angeles).

## Verifying the loop

```bash
cd "/Users/bcarter/Desktop/Claude Agents/projects/tiktok-creativity-program"

# Snapshot writes the markdown regardless of dry-run (that's the deliverable):
DRY_RUN=1 node scripts/weekly-snapshot.mjs
ls -la analytics/weekly/

# Bernard decision runs without calling Claude or actually inserting (except one test row):
DRY_RUN=1 node scripts/bernard-weekly-decision.mjs

# Monday briefing renders HTML to scripts/last-briefing.html:
DRY_RUN=1 node scripts/brett-monday-briefing.mjs
open scripts/last-briefing.html

# Daily mode (alt subject, shortened copy):
DRY_RUN=1 node scripts/brett-monday-briefing.mjs --daily
```

## Stripe

Explicitly deferred. Add when the Creator Playbook checkout goes live:
- `STRIPE_API_KEY` (read-only restricted, `rk_live_...`)
- Add a "revenue" section to `weekly-snapshot.mjs` between `## 3.` and `## 4.`

## Out of scope for this build

- Ricky reactivation (Phase B, week of 2026-05-04)
- Atlas health check (Phase B)
- Monthly content queue auto-kickoff (Phase B)
- Inbox signals population (Phase C)
- Scribe autonomous newsletter draft (Phase C)

## Hypothesis gate mechanics

Bernard proposes an action only when a hypothesis in `HYPOTHESES.md` clears **all three**:

1. Held directionally for 3 consecutive weekly snapshots.
2. n ≥ 30 on the measured funnel step.
3. Reversible within one deploy.

No rate limit on proposals per week — if 3 clear, ship 3; if zero clear, Bernard sends an empty memo and the Monday brief shows "All clear." That's Prime mode, not a failure.

Retirement rule: 8 consecutive weeks with no confidence movement → auto-retired to `## Retired` section.
