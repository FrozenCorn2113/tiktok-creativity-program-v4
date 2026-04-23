# TCP Traffic Strategy

**Owner:** Bernard  
**Last updated:** 2026-04-23  
**Source:** Weekly snapshot `analytics/weekly/2026-04-23.md` + HYPOTHESES.md decision loop

---

## Current channel mix (week of 2026-04-16)

| Channel | Sessions | Share | Signal |
|---|---|---|---|
| Direct | 169 | 38.8% | Branded recall / bookmarks — healthy for week 1 |
| ChatGPT.com | 110 | 25.2% | AI search surfacing TCP guides unprompted |
| Bing organic | 83 | 19.0% | Early SEO traction on non-Google engines |
| Yahoo | 18 | 4.1% | Bing syndicate, counts with Bing share |
| DuckDuckGo | 16 | 3.7% | Privacy-focused, likely same audience as Bing |
| cn.bing.com | 13 | 3.0% | International — watch for geo-mismatch with RPM |
| Google organic | 0 | 0% | Not ranking yet, or too new to attribute |

**Key insight:** AI search (ChatGPT.com + Copilot) is already ~26% of traffic in week 1. This is passive — the content is being cited without any active outreach. This channel should be protected and amplified by continuing to publish factual, cite-worthy guides.

---

## What's working

### 1. Earnings content drives both traffic and signups
- "how-much-does-tiktok-pay-per-view" is the #1 guide (39 views) — nearly 2x the next guide
- RPM Cheat Sheet is the top-converting lead magnet (4/13 signups)
- **Action:** Publish more earnings-angle content. Every new guide should consider whether it can be framed around a money question.

### 2. New content gets picked up fast
- "tiktok-live-subscriptions-strategy" shipped this week and immediately hit #5 (19 views)
- This suggests the site has enough domain authority or AI indexing that new guides get surfaced quickly
- **Action:** Maintain current velocity (4 guides/week), prioritize topics with search demand

### 3. Inline CTAs outperform all other signup placements
- Inline: 6 signups (46%)
- Exit-intent: 4 (31%)
- Mobile-sticky: 2 (15%)
- Homepage section: 1 (8%)
- **Action:** Every new guide needs an inline CTA. Review older guides that don't have one.

### 4. Zero unsub rate
- 13 new subscribers, 0 unsubs
- Content quality and email cadence are not alienating subscribers yet
- **Action:** No changes to drip cadence. Monitor monthly.

---

## What's not working / watch list

### 1. Google organic = 0
- No Google sessions visible in week 1
- Either the site is too new to rank, or pages aren't indexed yet
- **Action:** Verify Search Console coverage. Check if sitemap submitted. Do not panic — week 1 is baseline.

### 2. Social channels (unknown — Zernio blocked)
- Could not pull Instagram, Pinterest, or X analytics this week (Zernio MCP permission denied)
- No data on social referral, post engagement, or follower growth
- **Action:** Brett to grant `mcp__zernio__analytics_get_analytics` permission. Without this, social ROI is unmeasurable.

### 3. Start Here page not in top 10
- The primary funnel page (`/`) drives 65 sessions but we can't see `/start-here` specifically
- H1 hypothesis (start-here CTR >3%) cannot be evaluated yet
- **Action:** Ensure `/start-here` appears in GA4 top pages report. If it's buried in direct, the CTA flow may be breaking.

### 4. Lead magnet gap: 5/13 signups had no lead magnet
- 38% of signups happened without a specific magnet attribution
- This likely means they came via homepage or organic reading without hitting a specific CTA
- **Action:** Homepage section CTA should offer the RPM Cheat Sheet (top performer) not a generic subscribe

---

## Content pillar performance

| Pillar | Traffic signal | Lead magnet signal | Priority |
|---|---|---|---|
| Earnings / RPM | Strong (2 of top 3 guides) | Strong (RPM Cheat Sheet #1) | Double down |
| Eligibility | Moderate (how-to-join at #2) | Moderate (Eligibility Checklist #3) | Maintain |
| Live / Subscriptions | Strong (new, instant top-5) | Untested | Expand |
| AI Tools | Early signal (#9 at 14 views) | Untested | Watch |
| Shop / Affiliate | Moderate (#7 at 18 views) | Untested | Maintain |
| Algorithm | Weak (#10 at 13 views) | Untested | Deprioritize |

---

## AI search strategy (new — not in original plan)

ChatGPT.com driving 25% of traffic in week 1 without any deliberate effort is a meaningful discovery. This channel:
- Is powered by factual, structured content (which TCP already publishes)
- Rewards guides that answer specific questions with definitive answers
- Is not affected by Google's algorithm changes

**What to do:**
- Continue publishing guides with specific, answerable titles ("How much does TikTok pay per view" is a perfect example)
- Add explicit summary sections at the top of guides (LLMs prefer skimmable answers)
- Never rely on this channel exclusively — it's a bonus, not a strategy

---

## Posting time strategy

Current schedule (from CONTENT_CALENDAR.md):
- TikTok: 6am / 6pm PT
- Instagram: 9am PT (Tue/Wed/Fri)
- Pinterest: 1pm or 4pm PT
- X: 9am PT (Wed best)

Zernio best-time-to-post data was blocked this week. Schedule unchanged until data is available.

---

## Weekly review triggers

| Condition | Action |
|---|---|
| Guide gets >50 sessions in first week | Christopher: write 2 follow-up cluster guides |
| Lead magnet converts >30% of signups | Scale that magnet — add to more CTAs |
| Any platform drives >30 social referral sessions | Lean into that platform, add posting frequency |
| Google organic sessions appear | Bernard: document which guide ranked first, use as SEO template |
| Unsub rate >2% in any week | Bernard: pause drip changes, review last email sent |

---

## Next review: 2026-04-30
