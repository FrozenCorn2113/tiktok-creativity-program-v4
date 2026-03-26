# Freshness Update: Search Views Now Qualify for CRP

**CORRECTION NOTICE (2026-03-23):** This freshness update contains a factual error. The 30-second threshold for search views is CORRECT and should NOT be changed to 5 seconds. Search views do now qualify for CRP (that part is correct), but they require 30 seconds of watch time, NOT 5 seconds like FYP views. See Christopher's verification note in `research/keyword-guides/search-views-seo.md` for full sourcing. Edit instructions below that change "30 seconds" to "5 seconds" must NOT be applied. Edit instructions that update "FYP-only" language to include search views ARE valid, but must preserve the 30-second search threshold.

**Original (incorrect) correction:** As of December 2025, search views count toward Creator Rewards Program eligibility. Multiple guides currently state that only FYP views qualify, or that search views have a separate 30-second threshold. These need updating.

**Source:** Christopher's freshness scan (December 2025 TikTok update)

---

## Files Affected and Changes

### 1. maximize-qualified-views.mdx

**CHANGE A (line 43):**

BEFORE:
```
The most important of these in practice: **the 5-second threshold** and **the FYP-only source requirement**. Profile visits, search results, and direct shares don't generate qualified views. Only organic FYP delivery counts.
```

AFTER:
```
The most important of these in practice: **the 5-second threshold** and **the traffic source requirement**. Profile visits and direct shares don't generate qualified views. FYP and search views both count as of the December 2025 update, but Following feed and profile visit traffic still does not.
```

**CHANGE B (line 51):**

BEFORE:
```
- View came from a profile visit or direct link, not the FYP
```

AFTER:
```
- View came from a profile visit, Following feed, or direct link (not FYP or search)
```

---

### 2. no-qualified-views.mdx

**CHANGE A (line 40):**

BEFORE:
```
| View came from outside FYP | Profile visits, Following feed, direct share links, embedded players, and external URLs generate no qualified views. |
```

AFTER:
```
| View came from a non-qualifying source | Profile visits, Following feed, direct share links, embedded players, and external URLs generate no qualified views. FYP and search views both qualify as of December 2025. |
```

**CHANGE B (line 42):**

BEFORE:
```
| Viewer watched less than 30 seconds (Search) | Search-sourced views have a higher watch time threshold than FYP views. |
```

AFTER:
```
| Viewer watched less than 5 seconds (Search) | As of December 2025, search views qualify with the same 5-second threshold as FYP views. |
```

**CHANGE C (line 80):**

BEFORE:
```
Note that Search traffic can help if those viewers watch 30+ seconds. Check your average watch time before ruling search traffic out.
```

AFTER:
```
Search traffic now qualifies under the same rules as FYP traffic (5-second minimum, as of December 2025). This makes search optimization a direct earnings lever, not just a growth tactic.
```

**CHANGE D (line 124):**

BEFORE:
```
On traffic source: "For You" / FYP views are the only ones that reliably qualify. "Search" views can qualify if the viewer watches 30+ seconds. "Profile visits" and "Following" never qualify. "Sound," "Hashtag," and "Trending" route back through FYP and can qualify.
```

AFTER:
```
On traffic source: "For You" / FYP views and "Search" views both qualify (same 5-second threshold, as of December 2025). "Profile visits" and "Following" never qualify. "Sound," "Hashtag," and "Trending" route back through FYP and can qualify.
```

---

### 3. creativity-program-complete-guide-2026.mdx

**CHANGE A (line 142):**

BEFORE:
```
- Delivered from the For You Page (not profile visits, search, or direct links)
```

AFTER:
```
- Delivered from the For You Page or TikTok Search (not profile visits, Following feed, or direct links)
```

---

### 4. tiktok-analytics-metrics.mdx

**CHANGE A (line 58):**

BEFORE:
```
Your qualified view rate is the percentage of total views that count toward Creator Rewards earnings. A view only qualifies when it hits 5+ seconds of watch time, originates from the FYP, and comes from a unique viewer who didn't tap "Not Interested."
```

AFTER:
```
Your qualified view rate is the percentage of total views that count toward Creator Rewards earnings. A view only qualifies when it hits 5+ seconds of watch time, originates from the FYP or TikTok Search (as of December 2025), and comes from a unique viewer who didn't tap "Not Interested."
```

**CHANGE B (line 107):**

BEFORE:
```
| FYP traffic % | What share of your views can become qualified views |
```

AFTER:
```
| FYP + Search traffic % | What share of your views can become qualified views |
```

**CHANGE C (line 141):**

BEFORE:
```
For your top video, check what percentage of views came from the FYP. If it's under 60% FYP traffic, you're leaking views into sources that can't generate qualified views. This may indicate your content isn't reaching new audiences — it's circulating in your existing follower base.
```

AFTER:
```
For your top video, check what percentage of views came from the FYP and Search combined. If that total is under 60%, you're leaking views into sources that can't generate qualified views (Following feed, profile visits). This may indicate your content isn't reaching new audiences.
```

**CHANGE D (line 162):**

BEFORE:
```
**Mistaking FYP traffic for all traffic.** Your follower count grows your following-feed traffic as you scale. That traffic doesn't count toward qualified views. Watch the FYP percentage of your traffic and make sure it stays dominant.
```

AFTER:
```
**Ignoring traffic source mix.** Your follower count grows your Following feed traffic as you scale. That traffic doesn't count toward qualified views. FYP and Search views both qualify, but Following feed and profile visit traffic does not. Watch the combined FYP + Search percentage and make sure it stays dominant.
```

---

### 5. optimize-rpm.mdx

**CHANGE A (line 148):**

BEFORE:
```
| Non-FYP traffic | Profile visits and Following feed don't count as qualified views — high total views with low FYP percentage means low effective RPM |
```

AFTER:
```
| Non-qualifying traffic | Profile visits and Following feed don't count as qualified views. FYP and Search views both qualify (December 2025 update), but other sources do not. |
```

**CHANGE B (line 151):**

BEFORE:
```
| Early viewer drop-off | Views under 5 seconds (FYP) or under 30 seconds (search) don't qualify at all |
```

AFTER:
```
| Early viewer drop-off | Views under 5 seconds don't qualify at all, whether from FYP or Search |
```

---

### 6. tiktok-hook-formulas.mdx

**CHANGE A (line 36):**

BEFORE:
```
The Creator Rewards payment model pays based on qualified views, not total views. A view only qualifies when the viewer watches at least 5 seconds, from the FYP, without dismissing the video. If your hook can't hold someone for 5 seconds, that view generates exactly $0 in revenue.
```

AFTER:
```
The Creator Rewards payment model pays based on qualified views, not total views. A view only qualifies when the viewer watches at least 5 seconds, from the FYP or Search, without dismissing the video. If your hook can't hold someone for 5 seconds, that view generates exactly $0 in revenue.
```

---

## Additional files with minor references

These files mention FYP-only qualification in passing. Lower priority but should be consistent:

- **maximize-qualified-views.mdx line 165:** "Shares generate new qualified view opportunities by putting your content in front of fresh FYP audiences." -- No change needed, shares do create FYP distribution specifically.
- **maximize-qualified-views.mdx line 213:** "...FYP distribution where qualified views accumulate." -- No change needed, FYP is still the primary distribution channel.
- **creator-rewards-2026.mdx line 113:** Already acknowledges search views earn higher RPM. No factual correction needed. The December 2025 update officially confirmed search views count, so any remaining hedging on this point can be removed.
