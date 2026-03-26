# Template: Guide (Educational/Informational)

**Use for:** Eligibility guides, how-to walkthroughs, troubleshooting guides, earnings explainers, editorial analysis pieces.
**Word count target:** 1,500–2,500 words
**Future agent note:** Follow this template exactly. Do not add sections not listed here. Do not remove required sections. Tone rules apply to every word in the file — re-read the tone section before writing.

---

## Tone Rules (Read Before Writing)

The voice is the knowledgeable peer — someone who went through the Creator Rewards Program, read everything, ran the numbers, and is now explaining it plainly.

**Do:**
- Lead with the practical answer, not setup
- Use "you" and "your" — talk to one person
- Write short sentences when the content is complex
- Use callouts to surface important caveats without interrupting the prose

**Do not:**
- Open with "In this guide, we'll cover..." or any variation
- Use "exciting," "amazing," "fantastic," or any enthusiasm language
- Write FAQ sections that read like a robot answering support tickets
- Put affiliate CTAs in FAQ answers, eligibility checklists, or calculator outputs
- Invent facts. If unsure, add a parenthetical note like "(verify before publishing)" and flag it for Christopher

---

## Frontmatter

```mdx
---
title: "[Topic]: [What You Need to Know in 2026]"
  OR
title: "How to [Action]: [Specific Outcome]"
description: "[One sentence. What the reader will learn or be able to do. Max 155 characters.]"
date: "YYYY-MM-DD"
slug: "[kebab-case-slug-matching-target-keyword]"
category: "[Eligibility | Apply | Earnings | Tools | Troubleshooting | Strategy]"
readingTime: "[X min read]"
keywords:
  - "[primary keyword — exact match to the search query you're targeting]"
  - "[secondary keyword variation]"
  - "[tertiary keyword variation]"
---
```

**Title format rules:**
- Informational: "[Topic]: What You Need to Know in 2026"
- How-to: "How to [Specific Action]: [Outcome]"
- Troubleshooting: "[Problem]? Here's Why (and How to Fix It)"
- Explainer: "[Topic] Explained: [Key Detail]"
- Always include the year (2026) in titles for evergreen content that will need annual refresh

**Meta description rules:**
- Must be under 155 characters
- No clickbait — describe what the page actually delivers
- Include the primary keyword naturally

---

## Structure

### H1: Title (matches frontmatter title exactly)

### Opening Paragraph (required — no heading)
- 2–4 sentences
- State what the reader will understand or be able to do after reading
- Do NOT say "In this guide..." — just tell them directly what they're getting
- Address the frustration or question that brought them here
- Example: "The TikTok Creator Fund shut down in 2023. If you're searching for it now, you're looking for the Creator Rewards Program — which is different in ways that matter to your payout."

### CalloutBox (optional — use for high-priority quick facts)
```mdx
<CalloutBox type="info" title="Quick summary">
  <ul>
    <li>[Key fact 1]</li>
    <li>[Key fact 2]</li>
    <li>[Key fact 3]</li>
  </ul>
</CalloutBox>
```
Types: `info` (neutral), `tip` (actionable), `warning` (cautionary), `success` (positive outcome)

---

### H2 Sections (3–6 required)

Each H2 should address one clear question or step. Use the reader's natural question as the heading.

**Examples of good H2s:**
- "What the Creator Fund was (and why it ended)"
- "How the Creator Rewards Program is different"
- "Who qualifies for the Creator Rewards Program"
- "What to do if you don't qualify yet"

**Examples of bad H2s:**
- "Introduction" (redundant)
- "Key Takeaways" (at the start — fine at the end)
- "About the Program" (too vague)

**H3 subsections:** Use when a section has 3+ distinct sub-points. Don't use H3s for single-item clarifications — just write them into the paragraph.

---

### Inline Callouts (use throughout as needed)

Use `<CalloutBox>` when:
- A step is commonly skipped or done wrong
- A policy detail has a nuance that matters
- The consequence of ignoring something is significant

Don't overuse — maximum 3–4 per guide. If everything is called out, nothing is.

---

### Email Capture (required — placement: after core value delivered)

Place after the main informational content, before FAQ or conclusion. Not at the top. Not in the middle of a how-to sequence.

```mdx
<EmailSignupForm variant="inline" />
```

The reader should have gotten genuine value before you ask for their email. If the core question isn't answered yet, keep writing.

---

### Recommended Tools Block (optional — use only when tools are genuinely relevant)

This is where affiliate CTAs are permitted inside guides. Only include if there's a specific tool that helps with the task described in this guide.

```mdx
<CalloutBox type="tip" title="Tools worth knowing">
  [1–2 sentences explaining what the tool does and why it's relevant here.]
  <AffiliateLink slug="[slugName]" label="[Tool name — descriptive label]" />
  <span className="affiliate-label">Affiliate</span>
</CalloutBox>
```

Rules:
- Maximum one affiliate CTA per guide section, maximum two per guide total
- Never place in FAQ answers
- Never place in eligibility checklists
- The affiliate label must be visible

---

### FAQ (optional — use when 3+ distinct questions exist)

```mdx
## Frequently asked questions

**[Question?]**
[Answer — 1–3 sentences. Direct. No affiliate CTAs here.]

**[Question?]**
[Answer]
```

---

### Conclusion / Key Takeaways (required)

- 2–4 sentences or a brief bulleted list
- Summarize what the reader should now know or do
- If there's a next logical step, name it
- Do not introduce new information here

---

### Related Guides (required)

```mdx
## Related guides

- [Guide title](/guides/slug)
- [Guide title](/guides/slug)
- [Guide title](/guides/slug)
```

Minimum 3 related guides. Link to guides that are the logical next step or cover adjacent questions.

---

## SEO Checklist (before marking complete)

- [ ] Primary keyword appears in H1 (naturally, not forced)
- [ ] Primary keyword appears in first 100 words
- [ ] Meta description is under 155 characters
- [ ] At least one H2 contains a secondary keyword variation
- [ ] Year (2026) appears in title and at least one H2
- [ ] Internal links to at least 3 related guides
- [ ] No affiliate CTAs in FAQ answers or checklist sections

---

## Annotated Example

Below is an annotated example using the troubleshooting guide type. Annotations appear in `[brackets]`.

---

```mdx
---
title: "TikTok Creativity Program Not Showing Up? Here's Why (and How to Fix It)"
description: "If the Creator Rewards Program isn't visible in your TikTok settings, these are the most common reasons — and how to fix each one."
date: "2026-03-15"
slug: "creativity-program-not-showing"
category: "Troubleshooting"
readingTime: "7 min read"
keywords:
  - "tiktok creativity program not showing up"
  - "tiktok creativity program not available"
  - "creator rewards program not showing in settings"
---

# TikTok Creativity Program Not Showing Up? Here's Why (and How to Fix It)

[H1 matches title exactly. States the problem directly — no "welcome to this guide."]

If Creator Rewards isn't appearing in your TikTok settings, there are five common reasons.
Most of them are fixable. A few aren't — yet. Here's how to diagnose which situation
you're in.

[Opening paragraph: 3 sentences. States what you'll get. Doesn't waste time. No
"In this guide we'll cover..."]

<CalloutBox type="info" title="Quick check">
  <ul>
    <li>Region must be supported (US, UK, France, Germany, Brazil, Japan, South Korea, and others — verify current list with TikTok's official help page)</li>
    <li>Account must be Personal (not Business)</li>
    <li>Must be 18+ with 10,000+ followers and 100,000+ views in the last 30 days</li>
  </ul>
</CalloutBox>

[Callout surfaces the most important facts immediately. Unverified regional list is flagged.]

## Why the Creator Rewards Program doesn't appear in settings

[H2 restates the reader's exact problem. High keyword relevance.]

There are five reasons...

[Content continues — each reason is a clear H3 or bolded item with a 1–2 paragraph
explanation. Not bullet-only. Not wall-of-text. Mix of short prose and callouts.]

...

<EmailSignupForm variant="inline" />

[Email capture appears AFTER the main content delivers value — not before.]

## Frequently asked questions

**Does restarting the TikTok app help?**
Sometimes clearing your cache resolves display issues. Go to Profile → Settings → Free Up Space → Clear Cache. This won't fix an eligibility issue, but it resolves the occasional settings-not-loading glitch.

[FAQ is direct. No fluff. No affiliate CTAs here.]

## Related guides

- [How to Appeal TikTok Creator Rewards Rejection](/guides/appeal-rejection)
- [TikTok Creator Rewards Eligibility Requirements (2026)](/guides/eligibility-requirements)
- [When Does TikTok Pay? Creator Rewards Payout Timeline](/guides/payout-timeline)
```

---

## Annual Refresh Protocol (for autonomous agent use)

When refreshing this guide type each January:
1. Update the year in the title, meta description, and all H2s where year appears
2. Verify all policy details against TikTok's current help pages — add a "(verify before publishing)" note to any claim that can't be confirmed, and flag for Christopher
3. Update the `date` field in frontmatter to the refresh date
4. Do not change the slug (it has SEO history)
5. Add a "Last updated: [month] [year]" line to the opening paragraph or callout if significant content has changed
