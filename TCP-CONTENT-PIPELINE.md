# TCP Autonomous Content Pipeline

**Owner:** Bernard
**Created:** 2026-03-26
**Status:** Spec complete, ready for implementation

This document defines the two autonomous content systems for tiktokcreativityprogram.com: weekly social media posting and new guide creation. Both run without Brett.

---

## Part 1: Weekly Social Media Pipeline

### Overview

Every week, TCP publishes 17 social posts across 3 platforms:
- **Pinterest:** 7 pins (daily)
- **Instagram:** 5 posts (Mon-Fri)
- **X/Twitter:** 5 posts (Mon-Fri)

All content drives traffic back to existing TCP guides. No original research required for social posts. The 107 existing guides provide 15+ weeks of unique content before any guide needs repeating.

### Weekly Cadence

| Day | Pinterest | Instagram | X/Twitter |
|---|---|---|---|
| Monday | Pin (9:00 AM PT) | Carousel (10:00 AM PT) | Tweet (9:00 AM PT) |
| Tuesday | Pin (9:00 AM PT) | Single image (10:00 AM PT) | Thread (9:00 AM PT) |
| Wednesday | Pin (9:00 AM PT) | Carousel (10:00 AM PT) | Tweet (9:00 AM PT) |
| Thursday | Pin (9:00 AM PT) | Single image (10:00 AM PT) | Thread (9:00 AM PT) |
| Friday | Pin (9:00 AM PT) | Carousel (10:00 AM PT) | Tweet (9:00 AM PT) |
| Saturday | Pin (1:00 PM PT) | -- | -- |
| Sunday | Pin (1:00 PM PT) | -- | -- |

### Agent Roles

| Agent | Role | When |
|---|---|---|
| **Bernard** | Selects 7 guides, assigns to platform slots, writes briefs, reviews all output, schedules via Zernio MCP | Monday AM (planning), Wednesday (review + schedule) |
| **Scribe** | Writes all copy: 5 IG captions, 7 Pinterest descriptions, 5 X posts/threads | Monday-Tuesday |
| **Vale** | Generates all images: 7 Pinterest pins + 2 IG singles + carousel slide sets | Tuesday-Wednesday |
| **Wren** | Posts X content via Zernio | Wednesday (scheduled via Zernio, not live-posted) |

**Not automated:** Reddit (manual comment participation only), TikTok video (requires filmed content), Facebook (deferred).

### Guide Selection Process

Bernard selects 7 guides every Monday using these rules:

1. **Category rotation.** Pick from at least 3 of the 5 pillars: Getting Started, Maximize Earnings, Growth, Tools & Resources, Advanced/Niche.
2. **No repeats within 8 weeks.** Check the Guide Feature Log at the bottom of `TCP-CONTENT-CALENDAR.md`.
3. **No duplicate guides across platforms in the same week.** Each guide maps to one primary platform slot. Secondary platforms can reference the same guide if the content angle differs.
4. **Seasonal topics jump the queue.** Tax season prioritizes the tax guide. Q4 prioritizes the Q4 strategy guide. Algorithm updates prioritize the algorithm guide.
5. **Prioritize by SEO traffic potential.** High-volume keyword guides (RPM, qualified views, eligibility) get featured before niche-specific guides.
6. **New guides get featured the week they publish.** (See Part 2.)

### Image Generation

**All images route to Vale.** Never Devan, never Bernard, never anyone else.

**Pinterest pins:**
- 1000x1500px (2:3 ratio)
- Flat vector style, orange and navy on white
- No text, no people, no faces
- Each pin gets a unique image -- never reuse across posts
- Style: abstract/conceptual illustrations matching TCP brand (play buttons, graphs, icons)
- Output format: PNG (Pinterest accepts PNG and JPG natively)

**Instagram posts:**
- 1080x1080px
- Same flat vector style as Pinterest but square format
- Carousels: each slide is a unique image (navy background, white text areas, orange accents)
- Single image posts: one standalone illustration
- Output format: PNG or JPG -- NOT WebP (Instagram does not accept WebP)

**X/Twitter:**
- Text-only by default (threads and tweets perform better without images on X)
- Optional: 1200x675px image for single tweets when a visual adds value
- If used, output format: PNG or JPG

**Critical format rule:** Instagram and Pinterest require PNG or JPG. WebP is not accepted. Vale must export social images as PNG. Hero images for the website remain WebP.

**Vale's image generation workflow:**
1. Bernard provides image briefs (one per image) in the weekly routing message
2. Vale generates via Gemini Imagen API using TCP brand style prefix
3. Vale exports as PNG at the correct dimensions
4. Vale optimizes file size (under 500KB for social, under 200KB for web)
5. Bernard reviews all images before scheduling
6. Images are uploaded to Zernio via the media API, then attached to scheduled posts

### Scheduling via Zernio

All scheduling happens in the main Claude session (subagents cannot access MCP).

**Zernio account IDs:**
| Platform | Handle | ID |
|---|---|---|
| Instagram | @ttcprogram | 69babe7c6cb7b8cf4c7f14bb |
| Pinterest | @team1988 | 69bac0e26cb7b8cf4c7f1d26 |
| X/Twitter | @tiktokcreative | 69bac4056cb7b8cf4c7f29e0 |

**Scheduling sequence:**
1. Upload all images via `media_upload`
2. Create Pinterest pins via `posts_create` with `link` field pointing to the guide URL
3. Create Instagram posts via `posts_create` with carousel or single image
4. Create X posts via `posts_create` (or route to Wren for thread handling)
5. All posts use `scheduledAt` with ISO timestamps in UTC (PT + 7 hours standard, +8 during DST)

**Pinterest pins always include the guide link.** Format: `https://tiktokcreativityprogram.com/guides/{slug}`

### Hashtag Rotation

Follow the rotation schedule in `social/HASHTAG_SETS.md`. Each week advances through sets A-E per platform. After Week 4, restart or adjust based on performance data.

### Weekly Execution Timeline

| When | Who | What |
|---|---|---|
| **Monday 8:00 AM PT** | Bernard | Select 7 guides, assign to slots, write Scribe brief + Vale image briefs |
| **Monday 9:00 AM** | Scribe | Write all 17 pieces of copy (5 IG, 7 Pinterest, 5 X) |
| **Tuesday 9:00 AM** | Vale | Generate all images (7 pins + 2 singles + carousel sets) |
| **Wednesday 9:00 AM** | Bernard | Review all copy and images. Verdict: LOCKED or REVISION NEEDED |
| **Wednesday 12:00 PM** | Bernard | Upload images to Zernio, schedule all 17 posts for the week |
| **Thursday-Sunday** | Automated | Posts go live per schedule |
| **Following Monday** | Bernard | Check engagement metrics, log which guides were featured, begin next cycle |

---

## Part 2: New Guide Creation Pipeline

### Frequency

One new guide per week. At 52 guides/year, TCP grows from 107 to 159 guides by end of year. Each new guide adds a long-tail SEO entry point.

### Pipeline: content-only with Christopher research phase

```
Christopher (research) -> Bernard (topic selection + review)
  -> Scribe (write MDX) -> Bernard (review)
  -> Vale (hero image) -> Bernard (review)
  -> Devan (add to repo + push) -> Vercel auto-deploys
```

### Step 1: Topic Selection (Christopher + Bernard)

**Frequency:** Christopher delivers 3-5 topic candidates every Monday.

**Christopher's research brief:**
- Search for trending TikTok creator topics in the past 7 days
- Identify keyword gaps: queries with search volume that TCP does not rank for
- Check competitor content: what new guides have competing sites published?
- Check Reddit/X for recurring creator questions that no TCP guide answers
- Deliver each candidate with: proposed title, target keyword, estimated monthly search volume, competitive difficulty, and why it fills a gap

**Bernard's selection criteria:**
1. Does this keyword have meaningful search volume (500+ monthly searches)?
2. Does TCP not already cover this topic adequately?
3. Is this topic evergreen or at least seasonally relevant for 6+ months?
4. Does it fit one of the 5 content pillars?
5. Can it naturally link to at least 3 existing guides?

Bernard picks one topic per week and routes to Scribe.

### Step 2: Writing (Scribe)

Scribe writes the full MDX guide following the template at `content/templates/guide-template.md`.

**Scribe's brief includes:**
- Topic and target keyword (from Bernard)
- Christopher's research notes (key facts, stats, sources)
- Category assignment (one of: Eligibility, Apply, Earnings, Tools, Troubleshooting, Strategy)
- 3+ existing guides to cross-link
- Any specific angles or data points to include

**MDX frontmatter format (must match existing guides exactly):**

```mdx
---
title: "[Topic]: [What You Need to Know in 2026]"
description: "[One sentence, max 155 characters]"
date: "YYYY-MM-DD"
slug: "[kebab-case-slug]"
category: "[Category]"
readingTime: "[X min read]"
keywords:
  - "[primary keyword]"
  - "[secondary keyword]"
  - "[tertiary keyword]"
---
```

**Content rules:**
- 1,500-2,500 words
- No em dashes anywhere
- No "In this guide, we'll cover..." openings
- No enthusiasm language ("exciting," "amazing," etc.)
- All stats must be sourced or marked `(verify before publishing)` for Christopher
- Maximum 2 affiliate CTAs per guide, never in FAQ or checklists
- Affiliate label must be visible next to any affiliate link
- Use CalloutBox components (info, tip, warning, success) -- max 3-4 per guide
- EmailSignupForm placed after core value, before FAQ
- Minimum 3 related guides linked at the bottom

### Step 3: Hero Image (Vale)

Every guide needs a hero image. Vale generates it.

**Spec:**
- Filename: `hero-{slug}.webp`
- Dimensions: 1200x800 minimum
- Format: WebP (website images use WebP, unlike social which needs PNG)
- Style: Landpress flat vector -- abstract/conceptual, orange and navy palette, white background
- No text in the image
- No people, no faces (anatomy issues with generation)
- File size: under 200KB
- Placed in `/public/images/guides/`

**Vale's brief (from Bernard) includes:**
- The guide topic
- A one-line visual concept (e.g., "ascending staircase of follower icons with a flag at 1K")
- Color notes if the default palette needs variation

### Step 4: Publishing (Devan)

Devan handles all file operations and git:

1. Place the MDX file at `content/guides/{slug}.mdx`
2. Place the hero image at `public/images/guides/hero-{slug}.webp`
3. Verify the frontmatter matches the schema (title, description, date, slug, category, readingTime, keywords)
4. Verify the slug is not already taken
5. Verify internal links to related guides resolve correctly
6. Run `npm run build` locally to confirm no MDX errors
7. Commit and push to `main`
8. Vercel auto-deploys -- no manual deploy step

**Devan does NOT:**
- Write the guide content (Scribe does)
- Generate the hero image (Vale does)
- Choose the topic (Bernard does)
- Modify existing guides unless explicitly briefed

### Step 5: Social Amplification

When a new guide publishes, it automatically enters that week's social rotation:

1. Bernard adds the new guide to the 7-guide selection for the current or next week
2. The new guide gets priority placement: Monday Instagram carousel + Monday Pinterest pin + Tuesday X thread
3. The social copy and images follow the same weekly pipeline (Scribe writes, Vale generates, Bernard schedules)

### Quality Gates

Every new guide passes through 3 review gates before publishing:

**Gate 1: Content Review (Bernard reviews Scribe's output)**
- Does the guide follow the template structure exactly?
- Is the frontmatter complete and correctly formatted?
- Are all stats sourced or flagged for verification?
- Is the tone correct (knowledgeable peer, not corporate)?
- No em dashes?
- No enthusiasm language?
- Are affiliate CTAs placed correctly (not in FAQ/checklists)?
- Does the SEO checklist pass?

**Gate 2: Image Review (Bernard reviews Vale's output)**
- Is the image the correct dimensions and format?
- Does it match the Landpress flat vector style?
- No text in the image?
- No people or faces?
- File size under 200KB?

**Gate 3: Build Review (Bernard reviews Devan's push)**
- Does `npm run build` succeed?
- Does the guide appear on the site at the correct URL?
- Does the hero image load?
- Do internal links work?
- Is the guide indexed in the correct category page?

**Escalation:** If any gate fails twice, Bernard escalates to Brett with a full diagnosis.

### Weekly New Guide Timeline

| When | Who | What |
|---|---|---|
| **Monday** | Christopher | Deliver 3-5 topic candidates with keyword data |
| **Monday** | Bernard | Pick one topic, write Scribe brief |
| **Tuesday-Wednesday** | Scribe | Write full MDX guide |
| **Wednesday** | Bernard | Gate 1 review. LOCKED or REVISION NEEDED |
| **Thursday** | Vale | Generate hero image |
| **Thursday** | Bernard | Gate 2 review |
| **Friday** | Devan | Add files, build, push |
| **Friday** | Bernard | Gate 3 review. Verify on live site |
| **Following week** | Bernard | Add new guide to social calendar |

---

## Part 3: Automation Setup

### Trigger Mechanism: Shell Cron

The most practical approach for zero-Brett-involvement is a persistent shell cron that launches Claude Code with a structured prompt every Monday morning.

**Cron job:**

```bash
# TCP Weekly Content Pipeline -- runs every Monday at 7:30 AM PT
# Crontab entry (adjust for system timezone):
30 14 * * 1 /Users/bcarter/Desktop/Claude\ Agents/scripts/tcp-weekly-pipeline.sh >> /Users/bcarter/Desktop/Claude\ Agents/logs/tcp-pipeline.log 2>&1
```

(14:30 UTC = 7:30 AM PT during PDT; adjust to 15:30 UTC during PST)

**Script: `scripts/tcp-weekly-pipeline.sh`**

```bash
#!/bin/bash
# TCP Weekly Content Pipeline Trigger
# Runs every Monday at 7:30 AM PT

export PATH="$PATH:/usr/local/bin"
AGENTS_DIR="/Users/bcarter/Desktop/Claude Agents"
LOG_FILE="$AGENTS_DIR/logs/tcp-pipeline-$(date +%Y-%m-%d).log"

echo "=== TCP Weekly Pipeline Started: $(date) ===" >> "$LOG_FILE"

# Launch Claude Code with the weekly pipeline prompt
cd "$AGENTS_DIR"
claude --print "You are Bernard. Run the TCP weekly content pipeline.

Tasks:
1. SOCIAL MEDIA: Select 7 guides for this week (check TCP-CONTENT-CALENDAR.md guide feature log for what was used recently). Assign to platform slots. Route Scribe for copy, Vale for images. Review outputs. Schedule all 17 posts via Zernio MCP.

2. NEW GUIDE: Check if Christopher has topic candidates ready. If yes, pick one and route Scribe to write it. If no, route Christopher to research 3-5 candidates for next week.

3. REVIEW: Check last week's posts for any issues. Update the guide feature log.

Reference files:
- TCP-CONTENT-PIPELINE.md (this pipeline spec)
- TCP-CONTENT-CALENDAR.md (existing calendar, guide log, Zernio IDs)
- social/SOCIAL_TEMPLATES.md (content templates CT1-CT7)
- social/HASHTAG_SETS.md (hashtag rotation)
- content/templates/guide-template.md (MDX template for new guides)

Quality rules:
- Every image must be unique (never reuse)
- Instagram images must be PNG or JPG (not WebP)
- No em dashes in any content
- No text in generated images
- No people in generated images
- Pinterest pins always link to the guide URL
- All stats must be sourced or flagged for verification" >> "$LOG_FILE" 2>&1

echo "=== TCP Weekly Pipeline Completed: $(date) ===" >> "$LOG_FILE"

# Log to Supabase
./log.sh "Bernard" "TCP weekly content pipeline" "completed" "Week of $(date +%Y-%m-%d)"
```

### Alternative Triggers

**Manual kick-off:** Brett types in any Claude Code session:

> Run the TCP weekly content pipeline. Bernard owns it.

This triggers the same sequence as the cron but within an existing session where MCP (Zernio) is available.

**Slash command (future):** If Brett wants a shortcut, create a Claude Code skill or alias:

> /tcp-week

Maps to the same prompt as above.

### Important: MCP Constraint

Zernio MCP is only available in the main Claude Code session. Subagents cannot access MCP tools. This means:

- Scribe and Vale run as subagents (no MCP needed)
- Christopher runs as a subagent (no MCP needed)
- Devan runs as a subagent (git push, no MCP needed)
- **Bernard must schedule posts in the main session** using Zernio MCP tools directly
- The cron script must run in a context where MCP is available, OR Bernard must queue the scheduling step for the next interactive session

**Practical recommendation:** The cron handles everything except Zernio scheduling. Bernard prepares all content and images, then queues the scheduling commands. When Brett opens any Claude session on Wednesday or later, the scheduling executes automatically. Alternatively, a second cron on Wednesday afternoon handles scheduling if MCP is available in headless mode.

---

## Part 4: Quality Standards

### Content Standards

| Rule | Applies To | Enforcement |
|---|---|---|
| No em dashes | All written content (social + guides) | Bernard reviews, Scribe must self-check |
| No enthusiasm language | Guide content | Bernard Gate 1 review |
| Stats must be sourced | All content | Mark `(verify before publishing)` if unverified; Christopher verifies |
| No "In this guide..." openings | Guide content | Scribe template rule |
| Tone: knowledgeable peer | All content | Scribe follows guide-template.md tone rules |
| No invented case studies | All content | Christopher provides real data only |
| Small relatable creators only | Any creator spotlights | No mega-famous creators |

### Image Standards

| Rule | Applies To | Enforcement |
|---|---|---|
| Every image must be unique | All social posts | Bernard reviews manifest before scheduling |
| No text in images | All generated images | Vale generation rule; Bernard reviews |
| No people or faces | All generated images | Vale generation rule; Bernard reviews |
| Landpress flat vector style | All TCP images | Vale uses TCP brand style prefix |
| Orange + navy palette | All TCP images | Vale uses TCP color spec |
| WebP for website | Hero images, site assets | Vale exports WebP for Devan |
| PNG/JPG for social | Instagram, Pinterest | Vale exports PNG for social posts |
| Pinterest: 1000x1500px | All pins | Vale follows spec |
| Instagram: 1080x1080px | All IG posts | Vale follows spec |
| Hero images: 1200x800px min | Guide heroes | Vale follows spec |
| Under 200KB (web) | Site images | Vale optimizes with sharp |
| Under 500KB (social) | Social images | Vale optimizes before upload |

### Platform Standards

| Rule | Platform | Details |
|---|---|---|
| Pins always link to guide | Pinterest | `https://tiktokcreativityprogram.com/guides/{slug}` |
| 3-5 hashtags per post | Instagram | Follow rotation in HASHTAG_SETS.md |
| 1-2 hashtags max | X/Twitter | First tweet only for threads |
| 2-5 hashtags in description | Pinterest | SEO-oriented, long-tail phrases |
| Carousel: 5-8 slides | Instagram | Each slide is a unique image |
| Threads: 3-5 tweets | X/Twitter | Hook tweet + points + optional CTA |
| No promotional content weeks 1-4 | All platforms | 100% value content |
| 4-1-1 ratio after week 4 | All platforms | 4 value, 1 curated, 1 promotional |

### Guide Publishing Standards

| Rule | Details |
|---|---|
| Frontmatter must match schema | title, description, date, slug, category, readingTime, keywords |
| Slug must be unique | Check against all 107+ existing guides |
| Category must be valid | Eligibility, Apply, Earnings, Tools, Troubleshooting, Strategy |
| Min 3 internal links | Related guides section at bottom |
| Max 2 affiliate CTAs | Never in FAQ or checklists |
| EmailSignupForm placement | After core value delivered, before FAQ |
| Max 3-4 CalloutBox per guide | Overuse dilutes their impact |
| `npm run build` must pass | Devan verifies before pushing |
| Year in title | Include 2026 for evergreen content |
| Meta description under 155 chars | Scribe self-checks |

---

## Appendix A: File Reference

| File | Purpose |
|---|---|
| `TCP-CONTENT-PIPELINE.md` | This document. Master pipeline spec. |
| `TCP-CONTENT-CALENDAR.md` | Week-by-week content with production copy, image briefs, guide feature log |
| `social/SOCIAL_TEMPLATES.md` | 7 content templates (CT1-CT7) for platform-specific posts |
| `social/HASHTAG_SETS.md` | 5 rotating hashtag sets per platform |
| `content/templates/guide-template.md` | MDX guide template with tone rules, structure, annotated example |
| `content/templates/comparison-template.md` | Template for comparison guides |
| `content/templates/roundup-template.md` | Template for roundup guides |
| `content/guides/` | All 107 MDX guide files |
| `public/images/guides/` | Hero images for guides |

## Appendix B: Zernio API Quick Reference

```
# Upload image
media_upload: file=[path or URL]

# Schedule a post
posts_create:
  accountId=[platform ID]
  text=[caption with hashtags]
  mediaUrls=[uploaded media URL(s)]
  link=[guide URL, Pinterest only]
  scheduledAt=[ISO 8601 UTC timestamp]

# List scheduled posts
posts_list: accountId=[platform ID], status=scheduled

# Delete a post
posts_delete: postId=[post ID]
```

**UTC conversion for posting times:**
- 9:00 AM PT = 16:00 UTC (PDT) / 17:00 UTC (PST)
- 10:00 AM PT = 17:00 UTC (PDT) / 18:00 UTC (PST)
- 1:00 PM PT = 20:00 UTC (PDT) / 21:00 UTC (PST)

## Appendix C: First Run Checklist

Before the pipeline runs autonomously for the first time:

- [ ] `scripts/tcp-weekly-pipeline.sh` exists and is executable
- [ ] Cron job is installed (`crontab -e`)
- [ ] Log directory exists: `logs/`
- [ ] Zernio accounts are connected and IDs verified
- [ ] Vale has tested Gemini Imagen for PNG export at correct dimensions
- [ ] Scribe has confirmed access to guide-template.md and social templates
- [ ] Christopher has confirmed access to keyword research tools
- [ ] Bernard has verified one full dry run (select guides, write briefs, review mock outputs, schedule test posts)
- [ ] Guide feature log in TCP-CONTENT-CALENDAR.md is current
