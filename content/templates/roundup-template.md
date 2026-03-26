# Template: Roundup Page (Affiliate/Commercial)

**Use for:** "Best [X] for TikTok Creators" pages covering multiple products in a single category.
**Word count target:** 2,000–3,500 words
**Future agent note:** This template is the highest commercial-intent content type on the site. Affiliate link placement rules are strict — follow them exactly. Do not add affiliate CTAs to sections not listed as affiliate-permitted. Always label every affiliate link.

---

## Tone Rules (Read Before Writing)

This is not a sponsored post. The reader is a TikTok creator looking for practical product recommendations — they have high intent and low tolerance for obvious salesmanship. The voice is the same knowledgeable peer from the guide template: someone who uses these tools, has compared them, and is sharing what they actually found.

**Do:**
- Give a genuine verdict for each product — including weaknesses
- Acknowledge the free option clearly (don't bury it to push paid products)
- Make the comparison table genuinely useful — specific differences, not marketing claims
- Use "worth it if..." framing for purchase recommendations

**Do not:**
- Use "amazing," "game-changer," "must-have," or any hype language
- Write product descriptions that read like press releases
- Obscure a free option because it lacks an affiliate link
- Place affiliate links in FAQ sections
- Invent pricing or features — write "[current pricing at site]" if unknown

---

## Frontmatter

```mdx
---
title: "Best [Category] for TikTok Creators ([Year])"
  OR
title: "[Number] Best [Tools] for [Specific Use Case] ([Year])"
description: "[What the reader will find — which products, what criteria, what verdict. Max 155 characters.]"
date: "YYYY-MM-DD"
slug: "best-[category]-tiktok"
category: "Tools"
readingTime: "[X min read]"
keywords:
  - "best [category] for tiktok [year]"
  - "best [category] for tiktok creators"
  - "[category] for tiktok"
---
```

---

## Structure

### H1: Title (matches frontmatter title)

### Opening Paragraph (required)
- 2–4 sentences
- State what the roundup covers and what criteria you used to evaluate
- Mention the best free option upfront if one exists — don't make the reader hunt
- Do NOT open with a paid option recommendation before acknowledging free alternatives

### Quick-Pick Box (required — appears near top)

```mdx
<CalloutBox type="info" title="Quick picks">
  <ul>
    <li><strong>Best free option:</strong> [Product name] — [one-line reason]</li>
    <li><strong>Best for beginners:</strong> [Product name] — [one-line reason]</li>
    <li><strong>Best for power users:</strong> [Product name] — [one-line reason]</li>
    <li><strong>Best value paid option:</strong> [Product name] — [one-line reason]</li>
  </ul>
</CalloutBox>
```

Adjust categories as needed. Minimum 3 quick picks.

---

### Comparison Table (required — appears after quick picks)

```mdx
<ComparisonTable
  caption="[Category] comparison"
  columns={["Product", "Price", "Best For", "Key Feature", "Verdict"]}
  rows={[
    ["[Product]", "[Price or 'Free']", "[Best for]", "[Key feature]", "[One word: Recommended / Good / Skip]"],
    ...
  ]}
/>
```

Table rules:
- Include every product reviewed in the page
- Price column: use actual price if known, "[current pricing]" if not — never fabricate
- Verdict column: one word or short phrase — honest assessment
- Do not add affiliate links inside the table itself

---

### Individual Product Sections (H2 for each product — required)

Each product gets its own H2 section. Standard structure:

```mdx
## [Product name]

[Paragraph 1: What it is and what it does — 2–3 sentences. No hype. Just description.]

[Paragraph 2: Why it's relevant specifically for TikTok creators — 2–3 sentences. Be specific about what TikTok-specific problems it solves or features it has.]

[Paragraph 3: Pricing and plan details — what you get for free vs paid. Use "[current pricing at site]" if uncertain.]

[Paragraph 4: Verdict — 1–2 sentences. Who should use this and who should skip it. Be honest about weaknesses.]

<!-- If affiliate link exists: -->
<AffiliateLink slug="[slugName]" label="[Product name] — [descriptive text, e.g., 'free trial' or 'view pricing']" />
<span className="affiliate-label">Affiliate</span>

<!-- If no affiliate link: -->
[Link to product site as standard link, not affiliate]
```

Per-product word count: 150–300 words
Minimum products per roundup: 4
Maximum: 8 (beyond 8, readers lose decision clarity)

**Product section rules:**
- List the free option first (or early) even if it has no affiliate link
- If a product has no affiliate program, say so plainly or just link directly without the affiliate label
- Every affiliate link must be immediately followed by the `<span className="affiliate-label">Affiliate</span>` tag

---

### Email Capture (required — place between product sections, after first 2 products)

```mdx
<EmailSignupForm variant="inline" />
```

Placement: After the second or third product section. The reader has received some value (comparison table + first 2 reviews) before the ask.

---

### FAQ (required — minimum 3 questions)

```mdx
## Frequently asked questions

**[Common question about the category]?**
[Direct answer. 1–3 sentences. No affiliate links here.]

**[Another common question]?**
[Answer]

**[Another question]?**
[Answer]
```

FAQ rules:
- No affiliate CTAs inside FAQ answers
- Questions should be real questions creators ask, not made-up ones
- Base questions on what someone searching "best [X] for TikTok" would want to know

---

### Related Roundups (required)

```mdx
## Related guides

- [Guide title](/guides/slug)
- [Guide title](/guides/slug)
- [Guide title](/guides/slug)
```

---

## Affiliate Label Rules (Must Follow)

Every affiliate link on the page must be labeled. No exceptions. The label appears as small text directly following the link. In MDX:

```mdx
<AffiliateLink slug="filmora" label="Try Filmora — 7-day free trial" />
<span className="affiliate-label">Affiliate</span>
```

If uncertain whether a link is affiliate, treat it as affiliate and label it.

---

## SEO Checklist

- [ ] Year appears in title (e.g., 2026)
- [ ] Primary keyword in H1 and first 100 words
- [ ] Comparison table present and near top
- [ ] Each product reviewed in its own H2 section
- [ ] No affiliate CTAs in FAQ answers
- [ ] All affiliate links labeled
- [ ] Free option(s) acknowledged prominently
- [ ] Pricing marked `[current pricing at site]` where unverified
- [ ] Minimum 3 internal links to related guides

---

## Annotated Example

Below is a condensed annotated example using a video editing roundup. Annotations in `[brackets]`.

---

```mdx
---
title: "Best Video Editing Apps for TikTok Creators (2026)"
description: "Five video editing apps compared for TikTok workflows — from free mobile options to professional desktop tools."
date: "2026-03-15"
slug: "best-video-editing-apps-tiktok"
category: "Tools"
readingTime: "12 min read"
keywords:
  - "best video editing app for tiktok 2026"
  - "best video editing app for tiktok creators"
  - "video editing apps for tiktok"
---

# Best Video Editing Apps for TikTok Creators (2026)

[H1 exact match to title. Year included for evergreen refresh target.]

Most TikTok creators don't need professional editing software. They need something fast,
mobile-friendly, and built for vertical video. This roundup covers five options — from the
free tools that handle 90% of what TikTok requires to the paid tools worth upgrading to
once you're consistently posting.

[Opening paragraph: 3 sentences. Establishes scope. Mentions free options upfront.]

<CalloutBox type="info" title="Quick picks">
  <ul>
    <li><strong>Best free option:</strong> CapCut — built for TikTok, no watermark on free plan</li>
    <li><strong>Best for beginners:</strong> Filmora — simple interface, good templates</li>
    <li><strong>Best for advanced creators:</strong> DaVinci Resolve (free) — professional-grade, steep learning curve</li>
    <li><strong>Best mobile editor (paid):</strong> InShot Pro — clean interface, good music tools</li>
  </ul>
</CalloutBox>

[Quick-pick box gives the answer immediately — readers who just want a recommendation
get it without scrolling.]

<ComparisonTable
  caption="Video editing apps comparison"
  columns={["App", "Price", "Best For", "Key Feature", "Verdict"]}
  rows={[
    ["CapCut", "Free / Pro available", "Mobile-first TikTok creators", "Auto-captions, TikTok templates", "Recommended"],
    ["Filmora", "[current pricing at site]", "Beginner to intermediate", "Easy timeline, good transitions", "Good"],
    ["DaVinci Resolve", "Free / Studio version paid", "Advanced creators", "Pro color grading", "Good (for committed users)"],
    ["InShot", "Free / Pro [current pricing]", "Quick mobile edits", "Music sync, filters", "Good"],
    ["Adobe Premiere Rush", "[current pricing at site]", "Creators in Adobe ecosystem", "Cross-device sync with CC", "Skip unless you use Adobe CC"]
  ]}
/>

[Comparison table appears early. Honest verdicts including "Skip unless..."]

## CapCut

[H2 for first product — the free option comes first, not the highest-commission option.]

CapCut is TikTok's own editing app...

[No affiliate link for CapCut — noted in brief. Link directly without affiliate label.]

## Filmora

[H2 for second product]

...

<AffiliateLink slug="filmora" label="Try Filmora — view current plans" />
<span className="affiliate-label">Affiliate</span>

[Affiliate link immediately followed by label. Clear. Not hidden.]

<EmailSignupForm variant="inline" />

[Email capture after second product — value delivered, now ask.]

...

## Frequently asked questions

**Is CapCut free for TikTok?**
Yes. CapCut's free version does not add a watermark to exports. The Pro version adds additional
templates, AI tools, and team features — but the free version handles everything most creators
need. (Verify current Pro features and watermark policy at capcut.com before publishing.)

[FAQ answer: direct, no affiliate CTA, flags unverified detail.]
```

---

## Annual Refresh Protocol

1. Update year in title, meta description, and frontmatter date
2. Verify all pricing — replace `[current pricing at site]` with actual current prices or re-verify existing prices
3. Verify affiliate program status for each product — programs end or change commission rates
4. Check if any new tools have emerged that should replace or supplement existing picks
5. Do not change the slug
