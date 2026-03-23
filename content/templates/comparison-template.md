# Template: Comparison Page (X vs Y)

**Use for:** Direct head-to-head comparisons of two products, platforms, or options. Also used for editorial comparisons (e.g., program vs program, strategy vs strategy).
**Word count target:** 1,200–1,800 words
**Future agent note:** The reader arrives already considering both options. They want a clear verdict, not a balanced-but-inconclusive "it depends." Give them the verdict. Present both options fairly first, then declare a winner with reasoning.

---

## Tone Rules

Same voice as the guide template: knowledgeable peer, direct, no hype. The additional rule for comparison pages: be genuinely fair to the losing option. If a reader chose the "wrong" option for their situation, they should still feel the guide understood them. Acknowledge the cases where the "winner" is wrong for some people.

**Do:**
- Name a clear winner
- Acknowledge the cases where the loser is the right choice
- Use specific numbers and features when comparing — vague claims ("better performance") are useless
- Flag unverified specs/pricing with `[UNVERIFIED]`

**Do not:**
- Hedge the verdict ("it depends on your needs" is not a verdict)
- Place affiliate links before the verdict section
- Write product descriptions that read like marketing copy
- Add affiliate CTAs to the FAQ

---

## Frontmatter

```mdx
---
title: "[Product A] vs [Product B]: Which Is Better for [Use Case]?"
  OR for editorial comparisons:
title: "[Option A] vs [Option B] for TikTok Creators: [Key Question]"
description: "[One line. What you're comparing and what the verdict is. Max 155 characters.]"
date: "YYYY-MM-DD"
slug: "[product-a]-vs-[product-b]-tiktok"
category: "Tools"
  OR
category: "Strategy"
readingTime: "[X min read]"
keywords:
  - "[product a] vs [product b] tiktok"
  - "[product a] vs [product b] for creators"
  - "[product a] or [product b] for tiktok"
---
```

---

## Structure

### H1: Title (matches frontmatter)

### Opening Paragraph (required)
- 2–3 sentences
- State what you're comparing and what the article determines
- Optionally mention the verdict upfront (this is not always appropriate — use judgment; for tool comparisons it helps the reader decide if they need to read; for editorial analyses, build to it)

### Quick Verdict Box (required — near top)

```mdx
<CalloutBox type="info" title="Quick verdict">
  <strong>Winner for most creators:</strong> [Option A / Option B]<br />
  <strong>Better if you [specific condition]:</strong> [Option B]<br />
  <strong>Skip if:</strong> [Condition under which neither applies]
</CalloutBox>
```

---

### Comparison Table (required)

```mdx
<ComparisonTable
  caption="[Option A] vs [Option B]"
  columns={["Feature", "[Option A]", "[Option B]"]}
  rows={[
    ["[Feature 1]", "[A's value]", "[B's value]"],
    ["[Feature 2]", "[A's value]", "[B's value]"],
    ["[Feature 3]", "[A's value]", "[B's value]"],
    ["[Feature 4]", "[A's value]", "[B's value]"],
    ["[Feature 5]", "[A's value]", "[B's value]"]
  ]}
/>
```

Minimum 5 comparison rows. Use specific values, not "good/bad." If a value is unknown, write `[UNVERIFIED]`.

---

### Option A Detailed Section (H2)

```mdx
## [Option A name or title]: What it is and how it works

[2–3 paragraphs. What it is, what it does well, what it costs or how it works.
Be specific. Mention weaknesses.]
```

---

### Option B Detailed Section (H2)

Same structure as Option A. Same word count. Do not shortchange the loser.

---

### Side-by-Side Analysis (H2 — optional, use for complex comparisons)

Use when the straight table doesn't capture the nuance. Walk through 3–4 key decision factors with a paragraph each:

```mdx
## How they compare: [Decision factor 1]

[Paragraph comparing both on this specific dimension]

## How they compare: [Decision factor 2]

[Paragraph]
```

---

### Verdict (H2 — required)

```mdx
## Which one is right for you?

[1–2 paragraphs. Make a clear recommendation. Name the winner for the majority of readers.
Then give 1–2 specific scenarios where the loser is actually the right choice.
Do not hedge with "it depends" without immediately resolving the dependency.]
```

---

### Affiliate CTA (if applicable — place AFTER verdict)

Only one affiliate link per comparison page — for the winner (or the best-value option if both have affiliate links).

```mdx
<AffiliateLink slug="[slugName]" label="[Product] — [descriptive text]" />
<span className="affiliate-label">Affiliate</span>
```

**If neither option has an affiliate link** (e.g., editorial comparisons like CRP vs brand deals): no affiliate CTA. Link directly to relevant resources or related guides instead.

---

### EmailSignupForm (required — place before FAQ)

```mdx
<EmailSignupForm variant="inline" />
```

---

### FAQ (required — minimum 3 questions)

No affiliate CTAs in FAQ answers. Direct, specific questions and answers.

---

### Related Guides (required)

```mdx
## Related guides

- [Guide title](/guides/slug)
- [Guide title](/guides/slug)
- [Guide title](/guides/slug)
```

---

## SEO Checklist

- [ ] Both product/option names in H1
- [ ] Comparison table present and accurate
- [ ] Quick verdict box near top
- [ ] Clear winner named in the Verdict section
- [ ] Affiliate CTA only after the verdict, not before
- [ ] All affiliate links labeled
- [ ] No affiliate CTAs in FAQ
- [ ] Unverified specs or prices marked `[UNVERIFIED]`

---

## Annotated Example (condensed)

```mdx
---
title: "TikTok Creator Rewards Program vs Brand Deals: Which Makes More Money?"
description: "How to compare CRP earnings and brand deal income — and when to prioritize one over the other."
date: "2026-03-15"
slug: "creativity-program-vs-brand-deals"
category: "Strategy"
readingTime: "9 min read"
keywords:
  - "tiktok creativity program vs brand deals"
  - "creator rewards vs brand deals"
  - "tiktok brand deals or creator fund"
---

# TikTok Creator Rewards Program vs Brand Deals: Which Makes More Money?

[H1 contains both options and a clear question — high relevance for the comparison query.]

The Creator Rewards Program pays per qualified view. Brand deals pay per post.
Neither is objectively better — but at different follower counts and content cadences,
one almost always makes more sense to focus on first.

[Opening paragraph: 2 sentences. Direct. Hints at the nuance without hedging
the eventual verdict.]

<CalloutBox type="info" title="Quick verdict">
  <strong>Under 50K followers:</strong> Brand deals likely pay more per piece of content.<br />
  <strong>Over 100K followers with strong view counts:</strong> CRP can become your primary income stream.<br />
  <strong>Long term:</strong> Both. They're not mutually exclusive.
</CalloutBox>

[Quick verdict gives the answer immediately. Doesn't pretend there's only one winner.]

...

## The verdict: which should you prioritize?

[Named H2. This is where the recommendation lands after the reader has seen
both options laid out fairly.]

...

<!-- No affiliate CTA here — this is an editorial comparison, not a product comparison.
     Link to relevant guides instead. -->

<EmailSignupForm variant="inline" />

## Frequently asked questions

**Can I do brand deals and the Creator Rewards Program at the same time?**
Yes. TikTok doesn't prohibit creators in the Creator Rewards Program from accepting brand deals.
The two revenue streams are independent.

[FAQ: direct, no affiliate CTA.]
```
