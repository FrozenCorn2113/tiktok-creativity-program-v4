# TCP Hypotheses

Running thesis doc for TCP's weekly decision loop. Bernard's Friday 9am PT cron reads this file, compares each hypothesis against the last 4 weekly snapshots in `analytics/weekly/`, and proposes reversible actions when a hypothesis clears the replication gate.

## Rules

**Replication gate (Act mode trigger, per-hypothesis):**
1. Hypothesis has held directionally for **3 consecutive weekly snapshots**.
2. Measured step has **n ≥ 30 events** on the underlying funnel step.
3. Proposed action is **reversible within one deploy**.

Hypotheses that meet all three become review_requests. Brett clicks GO and the action dispatches same-day (Devan/Scribe/Christopher) — no 10-day queue.

**Retirement rule:** Any hypothesis whose confidence has not moved (in either direction) for **8 consecutive weeks** is auto-retired to the `## Retired` section with a note. Prevents the doc from turning into a graveyard.

**Hard cap:** ≤10 live hypotheses at any time. If a new one needs to land and the list is full, retire the oldest stagnant one first.

## Format

Each hypothesis is a row:

| ID | Claim | Measured metric | Current value | Confidence (0-1) | Consecutive weeks holding | Proposed action if threshold | Retirement rule |

Confidence scale: 0.0 = no evidence yet, 0.3 = directional, 0.6 = replicated once, 0.8 = replicated twice, 1.0 = replicated 3x (ready to act).

---

## Live

| ID | Claim | Measured metric | Current value | Confidence | Weeks holding | Proposed action if threshold | Retirement rule |
|---|---|---|---|---|---|---|---|
| H1 | `/start-here` signup CTR >3% → funnel worth doubling down on | signups from `/start-here` ÷ sessions to `/start-here` | tbd — `/start-here` not isolated in GA4 top pages; 1 signup from homepage-section (week 2026-04-16) | 0.0 | 0 | Devan: build 2 variant `/start-here` pages, A/B via query param; Scribe: write 3 hook variants | Confidence stuck at 0.0 for 8 weeks = retire |
| H2 | Day-5 drip reply rate >2% → replies are buy signal, scale the prompt | replies to day-5 drip ÷ day-5 sends | tbd — RESEND_API_KEY missing, email data blocked | 0.0 | 0 | Scribe: author 3 additional reply-asking variants; Devan: wire A/B in schedule-drip | Phase C ships first; if no replies land after 4 weeks post-Phase-C, retire |
| H3 | Organic `/guides` pages >50 sessions/wk each → SEO is THE channel | count of guides with ≥50 GA4 sessions last 7 days | 0 guides at ≥50 sessions; best: 39 sessions (how-much-does-tiktok-pay-per-view), Week 4 | 0.0 | 0 | Christopher: fire on 2x content velocity (8 guides/month instead of 4); Bernard: reshuffle calendar | If zero guides hit 50/wk for 8 weeks, SEO isn't the channel — retire + kill expansion plans |
| H4 | Welcome email (day 0) open rate >50% → TCP brand trust is strong | opens ÷ delivered for day-0 sends | tbd — RESEND_API_KEY missing, email data blocked | 0.0 | 0 | Scribe: introduce soft CTA to a mid-funnel asset (Playbook chapter) in the welcome; measure CTR | If <35% for 3 weeks, the welcome is flat — retire + rewrite from scratch |
| H5 | Unsub rate <1% of new signups → nurture cadence is not oversaturating | unsub count ÷ new signup count in same 7-day window | 0% (0 unsubs / 13 new signups, week 2026-04-16) — n=13, below 30-event gate | 0.3 | 1 | None — protective hypothesis. If confidence drops (rate climbs >2%), Bernard proposes drip cadence relaxation (e.g. drop day-8 email) | If rate >3% for 3 weeks, act regardless of "weeks holding" — emergency action |
| H6 | Pinterest sessions >30% of total social referral → Pinterest is the lead social channel | Pinterest sessions ÷ (Pinterest + IG + X) | Unmeasurable at Week 4 — social platforms absent from GA4 top sources; total social referral near-zero | 0.0 | 0 | Wren: shift pinning velocity from 1/day to 2/day; Vale: commission Pinterest-native image sizes (1000x1500 vertical) for every new guide | If <15% for 6 weeks, Pinterest isn't the channel — retire + reallocate to next-best |
| H7 | Top-5 pages drive >40% of total pageviews → traffic is top-heavy, invest in linking into them | sum of top-5 pageviews ÷ total pageviews | 38.6% (171/443 pageviews in top-5, Week 4) | 0.3 | 1 | Devan: add sidebar "related top guides" block on every page; Christopher: write cluster guides that link TO the top-5 | If top-5 share <20% for 4 weeks, traffic is evenly distributed — retire |
| H8 | Digest (Sunday newsletter) CTR >5% → newsletter is a live channel, not dead weight | clicks ÷ delivered on Sunday digest | tbd — RESEND_API_KEY missing, email data blocked | 0.0 | 0 | Scribe: add a "personal take" intro paragraph per digest; measure CTR lift | If <2% for 4 weeks, digest is dead — retire + pause Sunday sends, reallocate effort |
| H9 | AI search (ChatGPT + Bing AI + Copilot) sustains >20% of weekly sessions → LLM citation is a durable channel | (chatgpt.com + copilot.com + cn.bing.com sessions) ÷ total sessions | 29.6% (129/436 sessions, week 2026-04-16) — week 1 baseline | 0.3 | 1 | Christopher: add explicit answer-summary block at top of every guide (LLM-friendly); no traffic changes needed | If <10% for 4 consecutive weeks, treat as noise — retire |

---

## Retired

_(none yet — baselines lock week 1)_

---

## Meta-signals (tracked but not hypotheses)

These are observations Bernard surfaces in the weekly memo without proposing actions. They inform future hypotheses.

- **Channel entropy**: TCP currently has one input channel (SEO) and one output channel (weekly guide + drip + digest). If channel entropy stays at 1.0 for >12 weeks, Bernard flags over-optimization risk and recommends Ricky reactivation or a second content surface.
- **Hypothesis velocity**: If <1 new hypothesis is added per month, the system is coasting. Bernard flags and proposes research angles.
- **Baseline drift**: Week 1 snapshot locks the baseline. All subsequent weeks measure deltas against that fixed anchor, not a rolling one. Recompute baseline every 12 weeks.
- **AI referral signal (added 2026-04-23)**: chatgpt.com + Bing AI + Copilot = 197/436 sessions at Week 4. TCP content is being cited by LLMs. This is not a hypothesis yet — sample size too small — but worth watching as a potential channel hypothesis if it holds at Week 8.
