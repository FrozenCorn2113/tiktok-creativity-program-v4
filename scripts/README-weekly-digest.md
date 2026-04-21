# TCP Weekly Guide Digest

Runs every Sunday at 5pm PT. Finds guides published in the last 7 days (UTC) by
frontmatter `date`, falls back to `git log --diff-filter=A` over
`content/guides/*.mdx` if no frontmatter dates are in-window, then broadcasts a
warm-editorial digest to the Resend audience. Skips the send when nothing new
shipped.

## Files

- `scripts/send-weekly-digest.mjs` — the digest script.
- `scripts/send-weekly-digest.sh` — cron wrapper: sources env, logs to `logs/`.
- `scripts/last-digest.html` — preview output when `DRY_RUN=1`.

## Required env vars

- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`

## Optional env vars

- `RESEND_FROM_ADDRESS` — defaults to `TikTok Creativity Program <hello@tiktokcreativityprogram.com>` (matches the welcome email sender in `src/lib/email/send-welcome.ts`). Override only if you want a different sender.
- `DIGEST_SITE_URL` (default `https://tiktokcreativityprogram.com`)
- `DIGEST_WINDOW_DAYS` (default `7`)
- `DRY_RUN=1` — skip the send, write rendered HTML to `scripts/last-digest.html`

## Preview the rendered HTML

```bash
DRY_RUN=1 node scripts/send-weekly-digest.mjs
open scripts/last-digest.html
```

This does not require real Resend credentials.

## Send for real (manual)

```bash
# env is sourced from .env.local or .env by the wrapper
./scripts/send-weekly-digest.sh
tail -n 50 logs/weekly-digest-$(date -u +%Y-%m-%d).log
```

Or direct:

```bash
export RESEND_API_KEY=...
export RESEND_AUDIENCE_ID=...
node scripts/send-weekly-digest.mjs
```

## Install the cron

Sunday 5pm PT (`0 17 * * 0` local). Install with:

```bash
crontab -e
```

Add the line:

```
0 17 * * 0 /Users/bcarter/Desktop/Claude\ Agents/projects/tiktok-creativity-program/scripts/send-weekly-digest.sh
```

Logs land in `projects/tiktok-creativity-program/logs/weekly-digest-YYYY-MM-DD.log`.

## Design notes

- Cream paper `#FBF6EC`, ink `#0F0E0C`, orange accent `#F4A261`.
- Manrope with Arial/Helvetica fallback; Instrument Serif italic on one accent
  word per heading; JetBrains Mono eyebrow labels.
- CSS is inlined. No `<style>` blocks, no em dashes.
- Unsubscribe link uses the existing `/unsubscribe` flow.
