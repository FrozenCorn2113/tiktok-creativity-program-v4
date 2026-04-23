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
| `REVIEW_WEBHOOK_SECRET` | Vercel | Shared secret for the Supabase DB webhook that fires real-time review notifications. Generate with `openssl rand -hex 32`. See "Real-time review notifications" section below. |
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

## Real-time review notifications (Gap 1)

Every new `review_requests` row fires an immediate email to `brettlc2113@gmail.com`
via a Supabase Database Webhook calling `POST /api/review/notify`. Closes the
"Scribe ships Tuesday, Brett sees it Monday" gap.

### One-time Brett action — register the Supabase webhook

1. Generate the shared secret locally: `openssl rand -hex 32`. Save the hex string.
2. Add to Vercel env (Production scope): `REVIEW_WEBHOOK_SECRET=<hex>`. Redeploy.
3. Add the same value to `.env.local` if you ever want to run `/api/review/notify` against local Next.
4. Open Supabase → project `tpihpenmsiojzznpcmcr` → Database → Webhooks → "Create a new hook".
   - Name: `tcp-review-notify`
   - Table: `public.review_requests`
   - Events: **Insert** only (leave Update/Delete off).
   - Type: HTTP Request.
   - Method: `POST`
   - URL: `https://tiktokcreativityprogram.com/api/review/notify`
   - HTTP Headers:
     - `Content-Type: application/json`
     - `x-tcp-webhook-secret: <hex from step 1>`
   - HTTP Params: (none)
   - Save.
5. Dry-run: insert a test row via Supabase SQL editor:
   ```sql
   INSERT INTO review_requests (item_type, item_label, context_md, created_by)
   VALUES ('copy-draft', 'Webhook test', 'Testing real-time notify.', 'manual');
   ```
   An email should land within a few seconds. Delete the row afterward.

If the webhook fires but Brett gets no email: check Vercel function logs for
`/api/review/notify` — 401 means secret mismatch, 500 means `REVIEW_TOKEN_SECRET`
or `RESEND_API_KEY` is missing on prod.

## Preview deploy for draft artifacts (Gap 2)

New route `/preview/[id]?t=<hmac-token>` renders draft artifacts faithfully:

| item_type | Rendered as |
|---|---|
| `email-draft` | Iframe of `preview_html` + Subject/From/To header from `context_md` frontmatter. |
| `copy-draft` | Minimal markdown render of `context_md` in article styling. |
| `page-draft` | Iframe of `preview_urls[0]` staging URL. |
| `bernard-proposal` (+ anything else) | Redirects to `/review/[token]` — no preview needed. |

Auth: same HMAC token as `/review/[token]`, verified against `REVIEW_TOKEN_SECRET`.
The review dashboard links to `/preview/[id]` whenever item_type is in the
previewable set.

### Migration

Run `supabase/migrations/003_add_preview_html.sql` in the Supabase SQL editor.
Adds `preview_html text` to `review_requests`. Non-breaking — existing rows stay valid.

### Agent handoff — how to populate a review_request

When Scribe / Vale / Devan drafts an artifact and needs Brett's eye, INSERT a row:

- `item_type`: one of `email-draft`, `copy-draft`, `page-draft`, or `bernard-proposal`.
- `item_label`: short title Brett sees in the subject line and dashboard.
- `context_md`: for previewable types, include `Subject: …`, `From: …`, `To: …`
  lines at the top (parsed as frontmatter by the email-draft preview). For
  `copy-draft`, put the full markdown body here. For `bernard-proposal`, include
  the `<!-- TCP_DISPATCH:{...} -->` sentinel so the dispatch processor picks it up.
- `preview_html`: for `email-draft` only — the final `renderEmailShell(...)`
  output. That HTML is what Brett sees in the iframe.
- `preview_urls`: for `page-draft`, index 0 must be the staging URL (Vercel
  preview, ngrok, etc.). Other indices are treated as supplementary links.

On INSERT, the Supabase webhook calls `/api/review/notify`, which emails Brett
with a link to the review dashboard. Brett's GO/REVISE writes back to the row;
the dispatch processor picks up bernard-proposals for same-day agent execution.

## Hypothesis gate mechanics

Bernard proposes an action only when a hypothesis in `HYPOTHESES.md` clears **all three**:

1. Held directionally for 3 consecutive weekly snapshots.
2. n ≥ 30 on the measured funnel step.
3. Reversible within one deploy.

No rate limit on proposals per week — if 3 clear, ship 3; if zero clear, Bernard sends an empty memo and the Monday brief shows "All clear." That's Prime mode, not a failure.

Retirement rule: 8 consecutive weeks with no confidence movement → auto-retired to `## Retired` section.
