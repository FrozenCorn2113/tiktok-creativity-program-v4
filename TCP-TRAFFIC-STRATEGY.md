# TCP Traffic Strategy — Live Doc

**Owner:** Bernard
**Last updated:** 2026-04-23
**Data window:** Weeks 1-4 (2026-03-31 → 2026-04-22)

---

## What's Working

### AI / LLM Referrals Are the Dominant Non-Direct Channel
Week 4 sources: chatgpt.com (110 sessions) + Bing (83) + Yahoo (18) + DuckDuckGo (16) + Copilot (4) = **231 AI/search sessions** out of 436 total (53%). TCP content is being cited by LLMs as authoritative. This is the strongest channel signal at Week 4.

**Why it works:** Structured, factual guides with specific numbers (RPM ranges, view counts, dollar figures) are exactly what LLMs cite. Every guide with a concrete stat or a clear "how to" answer is a potential AI citation.

**What to do more of:** Lead every guide with a direct answer to the headline question in the first paragraph. Use structured comparison tables. Q&A format within guides increases LLM citation probability. Specific numbers beat vague estimates every time (`$0.80 RPM` beats `moderate earnings`).

### Direct Traffic Signal Is Strong for Month 1
169 direct sessions (38.7% of total). High for a site in early operation. Suggests bookmarking behavior or repeat visits from creators returning to reference guides. Validates the "independent reference resource" positioning.

### New Content Gets Indexed Within the Same Week
`tiktok-minis-micro-dramas` and `tiktok-live-subscriptions-strategy` (both published this week) appear in the top 10 by pageviews within days of publication. SEO fundamentals are working. Publishing velocity directly translates to traffic velocity.

### Top Traffic Guide Is a High-Intent Query
`/guides/how-much-does-tiktok-pay-per-view` is the consistent #1 guide by pageviews. "How much does TikTok pay per view" is the highest-intent search query in this niche. Creators want a number. The guide delivers one.

**Implication:** Build a cluster around this guide. Related: RPM by niche, payout timeline, RPM optimization, geography impact on earnings.

### H7 Directional: Traffic Is Top-Heavy
Week 4: top-5 pages = 171/443 pageviews = 38.6%. One point below the 40% H7 threshold. Expected to cross next week. Justifies the "linking into top guides" action when confirmed.

---

## What's Not Working (Yet)

### Social Referrals: Not Visible in GA4 After 4 Weeks
Instagram, Pinterest, and X do not appear in GA4 top traffic sources at Week 4. AI and search traffic outpaces social referrals by more than 10x.

**Assessment:** Too early to cut. Pinterest SEO has a 3-6 month lag before pins rank in Pinterest search. Instagram and X referrals depend on account growth and bio link clicks. Hold through **Week 8**, then evaluate.

**Watch metric:** If social sources don't appear in the top 10 by Week 8 (2026-05-21), reallocate Instagram budget to Pinterest (2 pins/day instead of 1). X stays — thread format builds backlink authority regardless of referral clicks.

**Flag for Week 8 review:** H6 baseline is currently unmeasurable (near-zero social referral). Can't confirm or deny Pinterest-as-lead-channel until there's a denominator worth measuring.

### Email Funnel: Fully Blocked
0 subscribers, 0 signups. Resend API key is missing from the Vercel environment. The signup form may be functional but the welcome sequence is not firing. No email = no owned channel = no ability to baseline H4/H5/H8.

**This is the critical path block.** Every other funnel metric below it is speculation until this is fixed.

**Open action (Brett):** Add `RESEND_API_KEY` to Vercel env. Carried from prior cycles.

### H3: No Guide at 50 Sessions/Week Yet
Best performance: 39 sessions for `how-much-does-tiktok-pay-per-view`. H3 threshold is 50. At current growth rate, this guide likely crosses in 1-2 weeks. When it does, H3 confidence moves to 0.3 and expansion mode starts.

### Top Traffic Guides Were Not Featured Socially
`how-much-does-tiktok-pay-per-view` (#1 traffic guide) and `how-to-join-creativity-program` (#2) have never been featured in social content across Weeks 1-4. This is a missed amplification opportunity. Week 5 corrects this.

---

## Content Pillar Performance

| Pillar | Traffic Signal | Verdict |
|---|---|---|
| Maximize Earnings | Strongest (#1 guide, RPM topics) | Increase social frequency, build cluster guides |
| Getting Started | Strong (how-to-join #2, eligibility) | Maintain; these are top-of-funnel acquisition guides |
| Growth | Moderate (algorithm, search SEO) | Maintain at current pace |
| Tools & Resources | Building (AI tools, analytics) | Keep; AI tools is timely and drives affiliate potential |
| Advanced/Niche | Early traction (minis, live subs) | Cap at 1-2/week; too niche for top-of-funnel acquisition |

---

## Platform Channel Assessment

| Platform | Status | Referral Traffic (Week 4) | Verdict |
|---|---|---|---|
| Organic / SEO | Building | Via Bing/DDG/Yahoo (112 sessions) | Core channel. Invest in publishing velocity. |
| AI Referrals | Strong | chatgpt.com + Bing AI + Copilot = 197 sessions | Optimize content structure for LLM citation |
| Pinterest | 7 posts/week | Not yet visible | Hold. Evaluate at Week 8 (2026-05-21) |
| Instagram | 5 posts/week | Not yet visible | Hold. Evaluate at Week 8 |
| X / Twitter | 5 posts/week | Not yet visible | Hold. Thread depth builds authority |
| Email | Blocked (Resend key) | n/a | Fix Resend key — this unlocks the entire funnel |

---

## Pending Decisions (Brett)

1. **Resend API key** — Critical path. Email funnel is dark. Open item from prior cycles.
2. **Social evaluation gate** — Hold at Week 8 (2026-05-21). If no social referral traffic by then, shift to 2x Pinterest daily.

---

## Revision Log

| Date | Change | Rationale |
|---|---|---|
| 2026-04-23 | Initial doc created | First full week of data sufficient to assess channel performance |
