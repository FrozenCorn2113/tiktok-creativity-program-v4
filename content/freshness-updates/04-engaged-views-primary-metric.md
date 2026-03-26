# Freshness Update: Engaged Views Is the New Primary Metric

**Correction:** TikTok replaced total views with "Engaged Views" as the primary metric displayed in analytics. Engaged Views counts only views where the user watched beyond a swipe-past (not a full qualified view, but more meaningful than a raw impression). This changes how creators should read their dashboards and what numbers they reference.

**Source:** Christopher's freshness scan

---

## Files Affected and Changes

### 1. tiktok-analytics-metrics.mdx

This is the primary guide affected. The guide currently treats "total views" as the vanity metric and "qualified views" as the revenue metric. With Engaged Views as the new primary display metric, the framing needs to shift.

**CHANGE A (line 96-101, vanity metrics table):**

BEFORE:
```
| Vanity metric | Why it feels important | Why it's misleading |
|---|---|---|
| Total views | Big numbers feel like success | Doesn't predict earnings. Qualification rate does. |
| Likes | Easy to count, emotionally satisfying | Low weight in rewards formula; less meaningful than saves |
| Follower count | Milestone-based thinking | You only need 10K for Creator Rewards; more followers don't raise RPM |
| Following feed views | Still a "view" on the counter | Doesn't count as a qualified view, earns nothing |
```

AFTER:
```
| Metric | Why it feels important | Why it's misleading |
|---|---|---|
| Total views (legacy) | Big numbers feel like success | TikTok now shows Engaged Views as the default. Total views included swipe-pasts and don't predict earnings. |
| Engaged Views (new default) | Feels more accurate than total views | Better than total views but still not the same as qualified views. Engaged Views counts viewers who watched past a swipe, but doesn't account for traffic source, geography, or the 5-second qualified threshold. Treat it as a middle indicator, not a revenue predictor. |
| Likes | Easy to count, emotionally satisfying | Low weight in rewards formula; less meaningful than saves |
| Follower count | Milestone-based thinking | You only need 10K for Creator Rewards; more followers don't raise RPM |
| Following feed views | Still a "view" on the counter | Doesn't count as a qualified view, earns nothing |
```

**CHANGE B (line 119):**

BEFORE:
```
**Overview tab:** Gives you aggregate data across a date range. Useful for trend-spotting but not for video-level analysis. The metrics shown here (total views, new followers, profile views) are mostly vanity metrics. Don't spend much time here.
```

AFTER:
```
**Overview tab:** Gives you aggregate data across a date range. Useful for trend-spotting but not for video-level analysis. TikTok now shows Engaged Views as the default metric here instead of total views. Engaged Views filters out swipe-pasts, which makes it more useful than the old total views number, but it still doesn't tell you about qualified views or earnings. Don't spend much time here.
```

**CHANGE C (line 131):**

BEFORE:
```
4. Qualified views as a percentage of total views
```

AFTER:
```
4. Qualified views as a percentage of Engaged Views (or total views if your dashboard still shows the legacy metric)
```

**CHANGE D (line 144):**

BEFORE:
```
Open the Creator Rewards tab. Compare qualified views to total views for each video. If your ratio is dropping week over week, something changed in your hook quality or posting behavior.
```

AFTER:
```
Open the Creator Rewards tab. Compare qualified views to Engaged Views for each video. If your ratio is dropping week over week, something changed in your hook quality or posting behavior. Note: the qualified-to-Engaged-Views ratio will be higher than the old qualified-to-total-views ratio since Engaged Views already filters out swipe-pasts.
```

**CHANGE E (line 160):**

BEFORE:
```
**Not tracking qualified view rate separately.** Total views show up in your analytics in a way that feels good. Qualified views show you what's actually happening to your revenue potential. If you're not cross-referencing both, you're missing the most important ratio on your dashboard.
```

AFTER:
```
**Confusing Engaged Views with qualified views.** TikTok now defaults to Engaged Views instead of total views, which is an improvement, but Engaged Views is still not the same as qualified views. Engaged Views tells you people watched past a swipe. Qualified views tells you those watches counted toward earnings. If you're not checking the Creator Rewards tab for qualified view data specifically, you're missing the metric that drives revenue.
```

---

### 2. creativity-program-complete-guide-2026.mdx

**CHANGE A (add after line 127, engagement row in the metrics table):**

No table change needed. But add a note after the table (after line 136):

BEFORE:
```
These figures come from creator-reported data. TikTok does not publish official RPM rates.
```

AFTER:
```
These figures come from creator-reported data. TikTok does not publish official RPM rates.

**Note on Engaged Views:** TikTok now displays Engaged Views as the primary metric in analytics, replacing total views as the default. Engaged Views filters out swipe-pasts but is not the same as qualified views. When checking your earnings potential, always use the qualified view count from the Creator Rewards tab, not the Engaged Views number from your main analytics.
```

---

### 3. qualified-views-not-counting.mdx

**CHANGE A (line 41-44, diagnostic steps):**

BEFORE:
```
- If qualified views are 60% or more of total views: your content is holding watch time well, the issue may be geographic or content type
- If qualified views are under 40% of total views: watch time is the primary problem
```

AFTER:
```
- If qualified views are 60% or more of Engaged Views: your content is holding watch time well, the issue may be geographic or content type
- If qualified views are under 40% of Engaged Views: watch time is the primary problem
- Note: TikTok now shows Engaged Views as the default metric instead of total views. Engaged Views already filters out swipe-pasts, so the ratio between qualified views and Engaged Views will be higher than the old total views ratio. Adjust your expectations accordingly.
```

---

## Lower-priority references

These guides mention "total views" in passing but the context is about the concept (total vs. qualified), not about reading a specific dashboard metric. They remain accurate conceptually but could be updated for consistency in a future pass:

- how-much-does-tiktok-pay-per-view.mdx (line 52: "1 million total views")
- creator-rewards-uk.mdx (line 138: "total views")
- no-qualified-views.mdx (line 60: "500,000 total views")

These are illustrative examples, not dashboard instructions. No factual error. Flag for Bernard if he wants a consistency sweep.
