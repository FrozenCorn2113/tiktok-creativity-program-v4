# BUSINESS_MODEL: TikTok Creativity Program
**Author:** Bernard
**Date:** 2026-03-16 (v2 -- replaces SaaS model, rejected by Brett)
**Gates:** Everything downstream (Vale, Scribe, Devan) is blocked until Brett approves this.

---

## What This Site Is

A content + affiliate business. Free tools and SEO-optimized guides drive organic traffic. Traffic converts to email subscribers and affiliate clicks. No subscriptions, no auth, no Stripe, no paid tiers, no feature gating.

The conversion funnel: **free tool/guide --> email capture --> nurture sequence --> affiliate clicks + return visits.**

---

## 1. Revenue Model

### Primary: Affiliate Commissions

Creators in the TikTok Creativity Program already buy tools. The site recommends those tools naturally within guides and calculator results.

**Affiliate categories:**

| Category | Examples | Integration Point |
|---|---|---|
| Video editing software | CapCut Pro, Filmora, DaVinci Resolve, Adobe Premiere Rush | Editing guides, "tools we recommend" sections |
| Music/audio libraries | Epidemic Sound, Artlist, Envato Elements | Content creation guides, music licensing guide |
| Analytics tools | Pentos, Exolyt, Analisa.io | Analytics guides, "track your RPM" sections |
| Equipment | Ring lights, mics, cameras (Amazon Associates) | Equipment guides, starter kit recommendations |
| Stock assets | Canva Pro, Envato Elements, Storyblocks | Design and thumbnail guides |
| Courses/education | Skillshare, Udemy creator courses | Skill development guides |
| Creator platforms | Mavely, Stan Store, Linktree Pro | Monetization beyond CR guides |
| Hosting/tools | ConvertKit, Carrd, Notion | "Build your creator business" guides |

**How affiliates integrate into content:**

- **In-guide recommendations:** Natural mentions where a tool solves the problem the guide addresses. "To track your RPM trends over time, we recommend Exolyt (affiliate link)." Not banner ads -- contextual, editorial recommendations.
- **Calculator result pages:** After running the earnings calculator, show relevant tool recommendations based on the creator's stage. Low earners get "tools to improve your content quality." High earners get "analytics tools to optimize your RPM."
- **Dedicated comparison pages:** "Best Video Editing Software for TikTok Creators" -- SEO-targeted review/comparison content with affiliate links. These pages exist to rank and convert.
- **Resource/tools page:** Central hub of all recommended tools, organized by category. Each with a short editorial review and affiliate link.
- **Email sequences:** Contextual tool recommendations within nurture emails (see Section 2).

**Existing affiliate infrastructure:** 14 redirect slugs already exist at `/go/[slug]/`. Christopher's research identified ~15 affiliate programs. Expand and optimize these.

**Revenue expectation:** Affiliate is the primary revenue driver. Every page on the site should have at least one natural affiliate touchpoint.

### Secondary: Email Nurture (Indirect Revenue)

Email does not generate revenue directly. It drives repeat visits, builds trust, and surfaces affiliate offers to a warm audience. A subscriber who returns to the site 5x is worth more than a one-time visitor.

### Tertiary: Display Ad Revenue (Scale Play)

At sufficient traffic volume (50K+ monthly visits), add tasteful display ads via Mediavine or Raptive. This is a volume game -- more traffic = more ad impressions. Not worth pursuing until traffic justifies it. Do not design for ads now, but do not design in a way that prevents adding them later.

### Not Pursuing

- **Subscriptions/memberships:** Rejected. Too complex to build, too complex to maintain, wrong fit for this audience.
- **Digital products:** Not for V1. Could add downloadable toolkits later, but the site needs traffic first.
- **Courses:** High production cost. The guides ARE the educational product.
- **Consulting:** Does not scale, requires Brett's time.
- **Community/forum:** Reddit and Discord already serve this. No competitive advantage.

---

## 2. Email Funnel

### Lead Magnets (Email Capture)

Every email capture must offer genuine value in exchange. These are the entry points:

| Lead Magnet | Trigger | Target Audience |
|---|---|---|
| Earnings Calculator results | User runs calculator, offer to email detailed breakdown | All visitors |
| "Creator Rewards Eligibility Checklist" | Eligibility guide pages | Pre-program creators |
| "First 30 Days Optimization Checklist" | New to CR guides | Recently accepted creators |
| "RPM Optimization Cheat Sheet" | RPM and earnings guides | Active creators |
| "Niche RPM Benchmark Data" | Niche-specific guides | Creators choosing/switching niches |
| Weekly newsletter signup | Site-wide, footer + dedicated page | All visitors |

**Capture mechanism:** ConvertKit (already integrated). Inline forms within guides at natural break points. Exit-intent popup on calculator pages (one per session, not aggressive). No paywall -- the content stays free, the lead magnet is bonus material.

### Nurture Sequence

**Goal:** Build trust, drive return visits, surface affiliate recommendations to a warm audience.

**Sequence structure (tag-based, not one-size-fits-all):**

**Welcome sequence (all subscribers, 5 emails over 10 days):**
1. Deliver the lead magnet + one quick win from it
2. "The #1 mistake creators make with the Creativity Program" (links to a guide)
3. Tool recommendation relevant to their entry point (first affiliate touchpoint)
4. Data-driven insight: "Creators who [specific action] see X% higher RPM" (links to optimization guide)
5. "What to focus on this week" -- stage-appropriate action items + tool recommendation

**Ongoing (weekly newsletter):**
- One actionable tip or data point
- Link to a new or updated guide
- One contextual affiliate recommendation
- Keep it short. Respect the inbox.

**Re-engagement (subscribers who haven't opened in 30 days):**
- "Here's what changed in the Creativity Program this month" (program updates are high-interest)
- If no open after 2 re-engagement attempts, remove from active list (keeps deliverability high)

---

## 3. Traffic Strategy

### SEO (Primary Traffic Driver)

The site already has 57+ MDX guides targeting long-tail keywords. This is the engine.

**What exists:** Guides covering eligibility, earnings, niches, regional topics, optimization. Christopher's research identified 20 keyword opportunities and competitive gaps.

**What to optimize:**
- Internal linking between related guides (currently weak)
- Schema markup for FAQ, HowTo, and calculator tools (rich snippet potential)
- Guide freshness -- TikTok updates the Creativity Program regularly. Updated content signals freshness to Google.
- Comparison/review pages targeting "best [tool] for TikTok creators" (these rank AND convert via affiliates)

### Calculator Virality (Secondary Traffic Driver)

Calculators are shareable. "I just found out my TikTok earnings potential" is social media content.

**Current calculators:** Earnings, RPM, Follower Income (3 total).

**Virality mechanics:**
- Share buttons on calculator results ("Share your estimated earnings on Twitter/TikTok")
- OG image generation for shared results (dynamic, shows the number)
- Embed option for bloggers/YouTubers covering the Creativity Program
- These calculators should be the best free versions available. If they are, creators link to them organically.

### Content Expansion

- **Comparison pages:** "CapCut vs. Filmora for TikTok Creators" -- high commercial intent, affiliate-rich
- **Timely content:** Program updates, policy changes, earning reports -- these spike in search when TikTok announces changes
- **Regional guides:** Expand coverage of non-US markets (lower competition, growing demand)

---

## 4. Updated Creative Brief for Vale

### What changed from the previous brief:

The previous Vale brief designed a conversion machine for a SaaS product. This brief designs a content site optimized for two things: **email capture** and **affiliate click-through**. No pricing page. No free-vs-pro treatment. No membership gate.

### Design requirements driven by the business model:

**Homepage:**
- Hero communicates what the site is: "The complete guide to TikTok's Creativity Program -- free tools, guides, and resources for creators." No mention of premium/pro/paid anything.
- Calculator preview in hero is fully functional (no locked features, no upgrade prompts)
- CTA hierarchy: primary "Try the Calculator" (engagement), secondary "Start the Learning Path" (content)
- Trust signals: guide count, calculator usage stats (once available), "100% free"

**Guide pages:**
- Clean reading experience. Content is the product.
- Contextual affiliate recommendations where editorially appropriate -- styled as recommendations, not ads. Think Wirecutter, not banner ads.
- Email capture at natural break points (after a key section, at the end). Offer the relevant lead magnet for that guide's topic.
- Related guides sidebar/footer for internal linking and session depth

**Calculator pages:**
- All features free. No locked sections, no blurred outputs, no upgrade prompts.
- Email capture on results: "Get a detailed breakdown emailed to you" or "Track your earnings over time -- join our weekly newsletter"
- Share buttons on results (social virality play)
- Tool recommendations based on results (affiliate touchpoint)

**Tools/Resources page:**
- Central hub of recommended tools, organized by category
- Each tool gets a mini-review card: what it does, who it's for, price, affiliate link
- This page exists to rank for "[category] tools for TikTok creators" and to convert via affiliate clicks
- Design should feel editorial, not like a link farm

**Start Here page:**
- Journey routing unchanged (validated by research)
- No Pro badges, no paid tier indicators. Everything is free.

**Email capture design:**
- Inline forms within content (not just sidebar/footer)
- Exit-intent popup on calculator pages (one per session, dismissible, not obnoxious)
- Lead magnet previews -- show what they get (checklist thumbnail, data preview)
- ConvertKit integration (existing)

**Global:**
- No pricing link in nav. No "Pro" anything.
- Clean, trustworthy, editorial feel. The site should feel like a resource, not a sales funnel.
- Affiliate disclosures where legally required (footer note + per-page where applicable)

### What Vale should NOT change from v3 spec:

- Color palette, typography, component library choices -- all still valid
- Learning hub structure with journey stages -- still the content architecture
- Dark calculator section pattern -- still correct
- Mobile-first approach -- still correct
- Creator-native tone -- still correct

### What Vale MUST update in this revision:

1. Remove all pricing/membership page specs
2. Remove free-vs-pro visual treatments from calculators
3. Remove "Pro" badges and upgrade prompts from all pages
4. Add tools/resources page layout (affiliate hub)
5. Revise homepage hero to communicate "free resource" not "freemium product"
6. Add email capture component specs (inline, popup, lead magnet preview)
7. Add affiliate recommendation card component (for in-guide and tools page use)
8. Ensure no design elements imply paid tiers exist

---

## 5. Implementation Sequence

This document gates the pipeline. Updated sequence:

1. **Brett reviews and approves this business model** -- nothing moves until confirmed.
2. **Bernard briefs Vale** with Section 4 above -- Vale revises design spec to optimize for email capture and affiliate click-through.
3. **Bernard briefs Scribe** -- Scribe writes email sequences, lead magnet content, affiliate recommendation copy, tools page reviews.
4. **Bernard briefs Devan** -- Devan builds a static content site with calculators, email capture, and affiliate integration. No auth, no payments, no feature gating.

### Technical implications for Devan:

- **No Supabase auth.** No user accounts.
- **No Stripe.** No payments.
- **No feature gating.** All tools are free.
- **Static site with interactive calculators.** Next.js SSG + client-side calculator logic.
- **ConvertKit integration** for email capture (already exists, expand).
- **Affiliate redirect system** at `/go/[slug]/` (already exists, expand).
- **This is dramatically simpler than the previous spec.** The build complexity dropped by 60%+ with auth/payments/gating removed.

---

## 6. Success Metrics

How we know this is working (post-launch):

| Metric | Target | Timeframe |
|---|---|---|
| Organic traffic | 10K monthly visits | 6 months |
| Email subscribers | 1,000 | 6 months |
| Affiliate click-through rate | 3-5% on guide pages | Ongoing |
| Email open rate | 35%+ | Ongoing |
| Calculator usage | 500 uses/month | 3 months |
| Affiliate revenue | $200/month | 6 months |

These are directional, not contractual. The point is: traffic drives email captures drives affiliate revenue. If any link in that chain breaks, diagnose and fix.

---

*Strategy by Bernard -- 2026-03-16 v2. SaaS/membership model rejected by Brett. Replaced with affiliate + email + traffic model. Awaiting Brett approval before routing downstream.*
