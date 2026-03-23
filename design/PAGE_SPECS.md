# Page Specifications — TikTok Creativity Program
## v4 — Affiliate + Email Model

**Rule:** Every section specifies an exact component (library + name + install command or URL). "Use a card here" is not acceptable. Devan installs exactly what is specified. Bernard verifies against this document.

**v4 Changes Summary:**
- Homepage hero revised: "free resource" framing, calculator-first CTA hierarchy, trust bar updated
- Guide pages: AffiliateDisclosure added, AffiliateRecommendationCard (inline) added, EmailCaptureInline added
- Calculator pages: All features free. Results section adds email capture + share buttons + affiliate card. NO locked features. Exit intent popup added.
- Tools/Resources page (PAGE 7): Fully rebuilt as affiliate hub with category tabs, grid affiliate cards, disclosure
- No pricing page. No Pro references anywhere.

---

## SHARED: Navigation (all pages)

**Component:** Aceternity UI Floating Navbar
- Source: https://ui.aceternity.com/components/floating-navbar
- Copy component code into `components/aceternity/floating-navbar.tsx`
- Install dependencies: `npm install framer-motion clsx tailwind-merge`

**Logo:**
- Text: "TikTok Creativity Program" — this is the wordmark
- Font: Manrope 800 (heading font, loaded)
- Color: text-brand-ink (#111827)
- Size: text-lg (18px), tracking-tight
- No icon or TikTok logo — text only

**Nav links (desktop):**
- Guides | Calculators | Tools | Start Here
- Font: Manrope 500, text-sm, text-text-secondary on default, text-text-primary on hover
- No icons on nav links
- "Tools" links to `/tools` (the new Tools/Resources page)
- NO "Pricing" link. NO "Pro" link. NO "Upgrade" link.

**Nav CTA:**
- shadcn Button: `size="sm"`, custom class `bg-brand-primary text-brand-ink hover:bg-brand-primaryHover font-semibold`
- Label: "Get Started Free"
- Links to: /start-here

**Behavior:**
- Floating pill appearance on scroll (Aceternity default behavior — keep it)
- Blur background on scroll: `backdrop-blur-md bg-white/80`
- Mobile: hamburger icon (Lucide `Menu`) opens shadcn Sheet (full-screen drawer from right)
  - Install: `npx shadcn@latest add sheet`
  - Drawer contains all nav links stacked vertically + CTA button full-width at bottom

---

## SHARED: Footer (all pages)

**Component:** Custom 4-column layout using shadcn primitives
- Base: `<footer>` with `bg-brand-ink` background, `text-text-inverse` text
- Container: `max-w-container mx-auto px-6 py-16`

**Layout:** 4 columns desktop, 2 columns tablet, 1 column mobile (CSS grid)

**Column 1 — Brand:**
- Logo: wordmark in white (Manrope 800, text-white)
- Tagline: [from CONTENT.md — footer-tagline] — text-text-muted, text-sm
- Email: small ConvertKit inline form (input + submit button, styled to match)

**Column 2 — Guides:**
- Heading: "Top Guides" (Manrope 600, text-white, text-sm, uppercase, tracking-wide)
- Links: 5 most popular guides, text-sm, text-gray-400, hover:text-white
- Link to /guides for full listing

**Column 3 — Tools:**
- Heading: "Calculators" (same heading style)
- Links: Earnings Calculator, RPM Calculator, Follower Income Calculator, Start Here
- Each is text-sm, text-gray-400, hover:text-white

**Column 4 — Resources:**
- Heading: "Resources" (same heading style)
- Links: Tools & Resources, About, Affiliate Disclosure, Privacy Policy, Contact
- Social: no social icons — the site is not officially on any platform

**Bottom bar:**
- Separator: 1px border-t border-white/10
- Left: copyright text, text-xs, text-gray-500
- Center: "All tools and guides are 100% free." — text-xs, text-gray-500 (reinforces free positioning)
- Right: "Not affiliated with TikTok or ByteDance." text-xs text-gray-500

**Affiliate disclosure in footer:**
- Below bottom bar: "Some links on this site are affiliate links. We may earn a commission at no cost to you. See our [Affiliate Disclosure](/affiliate-disclosure)." — text-xs, text-gray-500, centered

---

## PAGE 1: Homepage

### Section 1: Navigation
See SHARED: Navigation above.

---

### Section 2: Hero — CRITICAL. This is where creators decide to stay or leave.

**v4 framing:** Hero communicates "free resource" — the complete free guide to TikTok Creator Rewards. No mention of Pro, premium, or paid tiers anywhere in this section.

**Component:** Aceternity UI Spotlight Effect
- Source: https://ui.aceternity.com/components/spotlight
- Copy into `components/aceternity/spotlight.tsx`
- The Spotlight creates a moving light-beam cursor effect that follows the mouse — premium, creator-native feel

**Layout:** Full-width section, `min-h-[85vh]`, `bg-background-warm` (#FFF7ED), spotlight overlay on top

**Inner content:** 2-column grid `grid md:grid-cols-[3fr_2fr] gap-12 items-center`

**Left column — text:**
- Pre-headline badge: shadcn Badge, custom class `bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold tracking-wide`
  - Text: [from CONTENT.md — homepage-hero-badge]
  - Must communicate "free" — e.g. "100% Free Resource" or "Free Tools & Guides"
  - Lucide `Zap` icon (12px) inline left of text
- H1 headline: Manrope 800, 56px desktop / 36px mobile, text-brand-ink, line-height 1.1
  - Text: [from CONTENT.md — homepage-hero-headline]
  - Must position as the definitive FREE resource for TikTok Creator Rewards — NOT a product/service
  - NO "Pro", "Premium", or subscription language
  - Animation: Framer Motion staggered word reveal — each word animates in from `opacity: 0, y: 10` to `opacity: 1, y: 0`, stagger 0.08s, total duration ~0.8s on page load
- Subheadline: Manrope 400, 18px, text-text-secondary, max-w-lg, line-height 1.7
  - Text: [from CONTENT.md — homepage-hero-subheadline]
  - Should mention: free calculators, free guides, 100% free
  - Animation: Framer Motion, fade in from `opacity: 0` after headline completes (delay 0.7s)
- CTA row: flex gap-4, items-center, mt-8
  - **Primary CTA** (calculator-first per v4): shadcn Button, `size="lg"`, custom class `bg-brand-primary text-brand-ink hover:bg-brand-primaryHover font-bold shadow-orange hover:shadow-lg transition-all hover:scale-[1.02]`
    - Text: "Try the Calculator Free" (or from CONTENT.md — homepage-hero-cta-primary)
    - Lucide `Calculator` icon (16px) left of text
    - Links to: /calculators/earnings
  - **Secondary CTA**: shadcn Button, `variant="ghost"`, `size="lg"`, text-brand-ink
    - Text: "Start the Learning Path"
    - Lucide `ChevronRight` icon (16px) right of text
    - Links to: /start-here

**Right column — brand image:**
- Image: `public/images/brand/landpress-marketing-hero.png`
- Next.js Image: `<Image src="/images/brand/landpress-marketing-hero.png" alt="TikTok creator reviewing earnings dashboard on phone" width={480} height={440} className="rounded-2xl object-contain" priority />`
- Placement: right column, vertically centered, `max-h-[440px]`

**Scroll indicator:**
- Bottom-center of hero: Lucide `ChevronDown` icon, animated (Framer Motion, y oscillates 0 to 6 to 0, repeat infinity, duration 1.5s)
- Tap/click scrolls to next section

---

### Section 3: Trust Bar

**Component:** Custom stat bar — no library needed
- Background: `bg-white border-y border-border-default`
- Container: `max-w-container mx-auto px-6 py-6`
- Layout: flex, justify-between, items-center, wrap on mobile

**4 stats (v4 — updated from 3):**
1. Lucide `BookOpen` + Number: [from CONTENT.md — stat-guides-count] + label "Guides Published"
2. Lucide `Calculator` + Number: "3" + label "Free Calculators"
3. Lucide `Users` + Number: [from CONTENT.md — stat-creators-count] + label "Creators Helped"
4. Lucide `Zap` + Text: "100%" + label "Free Forever" — no lock icons, no asterisks

- Stat number: Manrope 800, 28px, text-brand-ink
- Magic UI Number Ticker for animated countup: `npx magicui-cli@latest add number-ticker`
  - Numbers animate from 0 to target when scrolled into view
  - IMPORTANT: Render target value as initial state server-side. Animate ONLY after IntersectionObserver fires client-side. This prevents the "0" flash on SSR.
- Stat label: Manrope 500, 13px, text-text-secondary
- Mobile: 2x2 grid or 4 items scrollable, gap-8

---

### Section 4: What Is the Creator Rewards Program?

**Component:** 21st.dev Feature Spotlight
- Source: https://21st.dev/r/jatin-yadav05/feature-spotlight
- Copy component code into `components/sections/feature-spotlight.tsx`
- Customize: replace hardcoded colors with brand tokens

**Layout:** Text-left, image-right (reverse of hero), `bg-white`, `py-24`

**Left — text:**
- Section label: Manrope 600, 12px, uppercase, tracking-widest, text-brand-primary
  - Text: [from CONTENT.md — what-is-section-label]
- H2: Manrope 700, 36px, text-brand-ink
  - Text: [from CONTENT.md — what-is-headline]
- Body paragraphs: Manrope 400, 16px, text-text-secondary, line-height 1.75, max-w-lg
  - Text: [from CONTENT.md — what-is-body]
- Feature checklist: 3 items, each with Lucide `CheckCircle` (16px, text-success), Manrope 500, text-brand-ink
  - Items: [from CONTENT.md — what-is-features-1/2/3]
- CTA: shadcn Button, `variant="outline"`, `size="md"`, border-brand-primary text-brand-ink hover:bg-brand-primarySoft
  - Text: "Read the Full Guide"
  - Lucide `ExternalLink` icon (14px) right

**Right — image:**
- Image: `public/images/homepage-explainer.webp` (800x600)
- Render: `<Image src="/images/homepage-explainer.webp" alt="Stylized creator reviewing TikTok earnings data" width={800} height={600} className="rounded-2xl shadow-lg w-full max-h-[420px] object-cover" loading="lazy" />`
- Placement: right column, `rounded-2xl`, `shadow-lg`, `w-full max-h-[420px] object-cover`

**Animation:** Section fades in on scroll (Framer Motion whileInView, opacity 0→1, y 20→0, duration 0.5s, once: true)

---

### Section 5: Three-Path Entry

**Purpose:** Route different visitor types immediately. Creator at different stages needs a different first step.

**Component:** Magic UI Bento Grid
- Install: `npx magicui-cli@latest add bento-grid`
- 3-card layout, equal columns desktop, stacked mobile

**Background:** `bg-background-warm` (#FFF7ED), `py-24`

**Section header (above grid):**
- H2: Manrope 700, 36px, centered, text-brand-ink
  - Text: [from CONTENT.md — three-path-headline]
- Subheadline: Manrope 400, 18px, centered, text-text-secondary, max-w-2xl mx-auto
  - Text: [from CONTENT.md — three-path-subheadline]

**Card 1 — "Am I eligible?"**
- Icon: Lucide `CheckCircle`, 32px, text-brand-primary
- Title: Manrope 700, 20px, text-brand-ink — [from CONTENT.md — path-eligible-title]
- Body: Manrope 400, 15px, text-text-secondary — [from CONTENT.md — path-eligible-body]
- CTA link: "Check eligibility requirements" with Lucide `ChevronRight` inline → /guides/eligibility-requirements
- Card style: `bg-white rounded-2xl p-8 border border-border-default shadow-sm hover:shadow-md transition-shadow`

**Card 2 — "I'm in. How do I earn more?"**
- Icon: Lucide `TrendingUp`, 32px, text-brand-primary
- Title: [from CONTENT.md — path-earn-title]
- Body: [from CONTENT.md — path-earn-body]
- CTA link: "Optimize your RPM" → /guides/optimize-rpm

**Card 3 — "Something's wrong"**
- Icon: Lucide `AlertTriangle`, 32px, text-brand-primary
- Title: [from CONTENT.md — path-troubleshoot-title]
- Body: [from CONTENT.md — path-troubleshoot-body]
- CTA link: "Troubleshoot your account" → /guides/qualified-views-not-counting

**Animation:** Cards stagger on scroll — Framer Motion, container variants with staggerChildren: 0.1s, each card opacity 0→1, y 20→0

---

### Section 6: Featured Guides

**Component:** 21st.dev Blog Cards
- Source: https://21st.dev/r/sumonadotwork/blog-cards
- Copy into `components/sections/guide-cards.tsx`
- Customize colors to brand tokens

**Background:** `bg-white`, `py-24`

**Section header:**
- H2: Manrope 700, 36px, text-brand-ink, centered — [from CONTENT.md — featured-guides-headline]
- shadcn Tabs below header: 4 tabs — "All", "Getting Started", "Maximize Earnings", "Troubleshooting"
  - Install: `npx shadcn@latest add tabs`
  - Tab active state: `bg-brand-primary text-brand-ink` (not default blue)
  - Tab inactive: text-text-secondary

**Guide cards grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8`

**Each card:**
- Thumbnail image: `public/images/guides/thumb-{slug}.webp` (400x300), `rounded-t-xl`, full width top of card, loading="lazy"
- Category badge: shadcn Badge, `bg-brand-primarySoft text-brand-primaryDeep`, text-xs
- Title: Manrope 700, 18px, text-brand-ink, 2-line clamp
- Excerpt: Manrope 400, 14px, text-text-secondary, 3-line clamp
- Read time: Lucide `Clock` (12px) + text, Manrope 500, text-xs, text-text-muted
- Card link: entire card is an `<a>` wrapping the content
- Hover: `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`
- Card border: `border border-border-default rounded-xl overflow-hidden bg-white`

**Show 6 guides by default.** "View all guides" shadcn Button (`variant="outline"`) centered below grid → /guides

---

### Section 7: Calculators Preview

**Component:** Custom section — 2-column split, no external library component needed

**Background:** `bg-brand-ink` (#111827), `py-24` — dark section for visual break

**Left — text (on dark bg):**
- Section label: Manrope 600, 12px, uppercase, tracking-widest, text-brand-primary
  - Text: [from CONTENT.md — calc-section-label]
- H2: Manrope 700, 36px, text-white
  - Text: [from CONTENT.md — calc-headline]
  - Must NOT imply any features are locked — all calculators are 100% free
- Body: Manrope 400, 16px, text-gray-300, max-w-md
  - Text: [from CONTENT.md — calc-body]
- 3 calculator links:
  - Each: flex items-center gap-3, `bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-colors cursor-pointer`
  - Lucide icon left (24px, text-brand-primary): `Calculator` / `BarChart2` / `Users`
  - Title: Manrope 600, 15px, text-white
  - "Free" badge: small `bg-brand-primarySoft text-brand-primaryDeep` text-xs badge right of title
  - Arrow: Lucide `ChevronRight` (16px, text-gray-500) right-justified

**Right — image:**
- Image: `public/images/brand/landpress-marketing-2.png`
- Render as: `<Image src="/images/brand/landpress-marketing-2.png" alt="TikTok earnings calculator on phone" width={400} height={440} className="rounded-2xl object-contain" loading="lazy" />`
- Placement: right column, vertically centered

---

### Section 8: Email Capture

**Component:** 21st.dev Newsletter Form
- Source: https://21st.dev/r/ruixenui/newsletter-form
- Copy into `components/sections/email-capture.tsx`
- Customize to brand tokens (orange CTA, warm background)

**Background:** `bg-background-warm` (#FFF7ED), `py-24`

**Layout:** Single-column centered, `max-w-2xl mx-auto text-center`

**Image above form (v4 — updated illustration):**
- Image: `public/images/brand/email-capture-illustration.webp`
- Render: `<Image src="/images/brand/email-capture-illustration.webp" alt="Creator checking inbox with checklist lead magnet" width={200} height={200} className="mx-auto rounded-2xl mb-8 object-contain" loading="lazy" />`
- Dimensions: 200x200 (cropped from 800x600 source)

**Headline:** Manrope 800, 36px, text-brand-ink — [from CONTENT.md — email-capture-headline]
**Subheadline:** Manrope 400, 18px, text-text-secondary — [from CONTENT.md — email-capture-subheadline]

**Form:**
- Email input: shadcn Input, full-width, rounded-full, border-border-strong, focus:border-brand-primary, h-12
- Submit button: shadcn Button, `bg-brand-primary text-brand-ink hover:bg-brand-primaryHover font-bold rounded-full px-8 h-12`
  - Text: [from CONTENT.md — email-capture-cta]
- Layout: flex gap-3 on desktop, stacked on mobile
- Privacy note: Manrope 400, 12px, text-text-muted, mt-3 — "No spam. Unsubscribe anytime. 100% free."
- ConvertKit form ID and API: [Devan connects to ConvertKit inline form — form ID from Brett]

---

### Section 9: Social Proof — Logo Strip

**Component:** Magic UI Marquee
- Install: `npx magicui-cli@latest add marquee`

**Background:** `bg-white border-y border-border-default`, `py-8`

**Content:** Publication/trust mentions (text-only logos or wordmarks, grayscale)
- Render as styled text spans if logos are unavailable (Manrope 700, text-gray-300)
- Label above marquee: Manrope 500, 12px, uppercase, tracking-widest, text-text-muted, centered — "Covering the Creator Rewards Program since 2024"
- Pause on hover: yes (Marquee default)
- Speed: default

---

## PAGE 2: Guide Article Page

### Section 1: Navigation
See SHARED: Navigation.

---

### Section 2: Breadcrumb

**Component:** shadcn Breadcrumb
- Install: `npx shadcn@latest add breadcrumb`
- Container: `max-w-content mx-auto px-6 pt-8`
- Example: Home > Guides > [Category] > [Article Title]
- Separator: Lucide `ChevronRight` (12px)
- Text: text-sm, text-text-muted, hover:text-text-primary

---

### Section 2b: Affiliate Disclosure — CONDITIONAL (v4 NEW)

**Renders only when:** `hasAffiliateLinks: true` in article MDX frontmatter.

**Component:** `<AffiliateDisclosure />` — see BRAND.md Component 6 spec
- Container: `max-w-content mx-auto px-6 mt-3 mb-2`
- Renders BETWEEN breadcrumb and article header
- Must appear before any affiliate content — do not skip this

---

### Section 3: Article Header

**Layout:** `max-w-content mx-auto px-6 pt-6 pb-8`

**Category badge:** shadcn Badge, `bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30`, text-xs, Manrope 600
- Text: article category slug → display label

**H1:** Manrope 800, 48px desktop / 32px mobile, text-brand-ink, line-height 1.15
- Text: article title from MDX frontmatter
- NO "Pro" badges or tier indicators near the H1

**Subtitle/description:** Manrope 400, 18px, text-text-secondary, line-height 1.7, mt-4
- Text: article description from MDX frontmatter

**Meta row:** flex items-center gap-4, mt-6, text-sm, text-text-muted
- Lucide `Clock` (14px) + read time
- Separator: "|"
- Lucide `BookOpen` (14px) + "Last updated [date from frontmatter]"

---

### Section 4: Hero Image

**Image:** `public/images/guides/hero-{slug}.webp` (1200x630)
- Every guide gets a UNIQUE hero image. Not recycled.
- Render: `<Image src="/images/guides/hero-{slug}.webp" alt="{descriptive alt from frontmatter}" width={1200} height={630} className="w-full rounded-2xl object-cover mt-8 mb-12" priority loading="eager" />`
- Container: `max-w-content mx-auto px-6`
- Generation prompt (per guide topic): "[Style prefix] + [topic-specific subject]"
  - See ILLUSTRATION_PROMPTS.md for per-guide prompts

---

### Section 5: Article Body + Sidebar

**Layout:** `max-w-container mx-auto px-6 pb-24`
- CSS grid: `grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12`

**Main column (prose):**
- Container: `prose prose-lg max-w-none`
- Custom prose overrides in Tailwind config:
  - `prose-headings:font-manrope prose-headings:font-bold prose-headings:text-brand-ink`
  - `prose-p:text-text-secondary prose-p:leading-relaxed`
  - `prose-a:text-brand-primaryDeep prose-a:no-underline hover:prose-a:underline`
  - `prose-strong:text-brand-ink`
  - `prose-code:font-mono prose-code:text-brand-primaryDeep prose-code:bg-brand-primarySoft prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded`

**Inline images (3-6 per article):**
- Frequency: every 300-500 words, between major sections
- Format: `public/images/guides/guide-inline-{slug}-{n}.webp` (800x600) or unDraw SVG
- Render: `<Image src="..." alt="{descriptive alt}" width={800} height={600} className="w-full rounded-xl my-8" loading="lazy" />`
- Max 80KB each

**Comparison tables (where relevant):**
- HTML table wrapped in `<div className="overflow-x-auto my-8">`
- First column sticky on mobile: `<td className="sticky left-0 bg-white font-semibold">`
- Table border: `border-collapse border border-border-default`
- Header row: `bg-surface`
- Cell padding: px-4 py-3, text-sm

**Callout boxes (info/warning/tip):**
- Info: `bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg`
- Warning: `bg-warningSoft border-l-4 border-warning p-4 rounded-r-lg`
- Tip: `bg-brand-primarySoft border-l-4 border-brand-primary p-4 rounded-r-lg`
- Icon left: Lucide `Info` / `AlertTriangle` / `Zap` (16px)

**Affiliate inline blocks — PLACEMENT RULE (v4):**
- Component: `<AffiliateRecommendationCard variant="inline" />` — see BRAND.md Component 1 spec
- Placement 1: After the 2nd major H2 section (natural tool-relevant moment)
- Placement 2: At end of article, before "Related Guides" — tool recommendation as article conclusion
- MAX 2 affiliate cards per guide article
- NEVER in first 3 paragraphs
- Only on guides where `hasAffiliateLinks: true` in frontmatter

**Email capture inline block — PLACEMENT RULE (v4 NEW):**
- Component: `<EmailCaptureInline />` — see BRAND.md Component 3 spec
- Placement: After the 3rd H2 section (reader is engaged, halfway through guide)
- MAX 1 email capture inline per guide article
- Lead magnet must be relevant to the guide topic (see BUSINESS_MODEL.md Section 2 for lead magnet map)
- Pass `leadMagnetTitle` and `leadMagnetDescription` as props matching the guide's topic

**Sidebar (desktop only, sticky):**
- Lucide `BookOpen` + "Table of Contents" heading
- shadcn ScrollArea wrapping anchor links to H2/H3
- Install: `npx shadcn@latest add scroll-area`
- Active section highlight: left border-2 border-brand-primary
- Below ToC: Email capture mini-widget (input + submit, compact) — ConvertKit form
- Below email: "Related Guides" — 3 cards, thumbnail (80x60) + title, text-sm

---

### Section 6: Article Footer

**Container:** `max-w-content mx-auto px-6 pb-24`

**"Was this helpful?" widget:**
- shadcn Button pair: Lucide `ThumbsUp` + "Yes, helpful" | Lucide `ThumbsDown` + "Needs improvement"
- variant="outline", `size="sm"`, on click → submits to simple API route (no external service needed)

**Related guides grid:**
- H3: "More guides you might need"
- 3 cards: `grid grid-cols-1 md:grid-cols-3 gap-4`
- Each card: thumbnail (400x300) + category badge + title
- Same card style as homepage featured guides

**Email capture (full):**
- Same component as homepage Section 8 but condensed
- Headline: [from CONTENT.md — article-footer-email-headline]

---

## PAGE 3: Calculator Page

### Section 1: Navigation
See SHARED: Navigation.

---

### Section 2: Calculator Header

**Layout:** `max-w-container mx-auto px-6 pt-12`
**Background:** `bg-background-warm` top section

**Breadcrumb:** Home > Calculators > [Calculator Name]

**H1:** Manrope 800, 48px, text-brand-ink — [calculator title from page config]
**Description:** Manrope 400, 18px, text-text-secondary, max-w-2xl — [calculator description]

**Free badge (v4):** Immediately after H1, small inline badge — `bg-brand-primarySoft text-brand-primaryDeep text-xs font-semibold` — "100% Free • No signup required"

---

### Section 3: Calculator Hero Image

**Image:** `public/images/calculators/hero-{slug}.webp` (1200x630)
- Placed full-width below header, above the calculator tool
- Render: `<Image src="/images/calculators/hero-{slug}.webp" alt="{descriptive alt}" width={1200} height={630} className="w-full rounded-2xl mb-8" priority loading="eager" />`
- Every calculator gets a UNIQUE hero. Not recycled.

---

### Section 4: Calculator Tool

**Component:** 21st.dev Pricing Slider (adapted for calculator input)
- Source: https://21st.dev/r/radu-activation-popescu/pricing-slider-loops
- Copy into `components/sections/calculator-panel.tsx`
- Adapt: rename "pricing" to "earnings" context, replace pricing tiers with slider inputs

**Layout:** `max-w-2xl mx-auto`

**v4 RULE — ALL FEATURES FREE:** No locked sections. No blurred outputs. No upgrade prompts. No "unlock with Pro" callouts. Every input, every result, fully visible and functional.

**Calculator panel styling:**
- Container: `bg-white rounded-2xl border border-border-default shadow-lg p-8`
- Input labels: Manrope 600, 14px, text-brand-ink
- Sliders: shadcn Slider, `npx shadcn@latest add slider`, accent color override to brand-primary
- Number inputs: shadcn Input, text-center, Manrope 700, JetBrains Mono for the value display
- Install shadcn Slider: `npx shadcn@latest add slider`

**Result display:**
- Large number: JetBrains Mono 700, 48px, text-brand-primary
- Label: Manrope 500, 14px, text-text-secondary
- Animated: Magic UI Number Ticker on result (animates when value changes)

---

### Section 4b: Calculator Results Actions (v4 NEW)

Renders IMMEDIATELY below the result number, inside the calculator panel.

**Layout:** `flex flex-col gap-4 mt-6 pt-6 border-t border-border-default`

**Email capture on results:**
- Compact `<EmailCaptureInline />` variant inside the panel
- Headline: "Get a detailed breakdown emailed to you"
- Description: "We'll send your results with context on what they mean and how to improve."
- ConvertKit form: use dedicated "calculator results" form ID
- Background: `bg-brand-primarySoft rounded-xl p-4` (slightly different to stand out from white panel bg)

**Share buttons:**
- Row: `flex items-center gap-3 mt-4`
- Label: Manrope 500, 13px, text-text-secondary — "Share your results:"
- Twitter/X share button: shadcn Button, `variant="outline"`, `size="sm"`, Lucide `Share2` icon left
  - Pre-filled tweet: "I just calculated my estimated TikTok Creator Rewards earnings using this free calculator → {url} #TikTokCreator #CreatorRewards"
- Copy link button: shadcn Button, `variant="outline"`, `size="sm"`, Lucide `Copy` icon left, on click copies current URL, shows "Copied!" confirmation for 2s

**Affiliate card on results:**
- `<AffiliateRecommendationCard variant="inline" />` — see BRAND.md Component 1 spec
- Appears BELOW the share buttons, with a divider above
- Recommendation logic: contextual based on results range
  - Low RPM results (< $0.02/view): recommend CapCut Pro, Epidemic Sound (content quality tools)
  - Medium/high RPM results (≥ $0.02/view): recommend Exolyt, Pentos (analytics tools to optimize)
  - All results: recommend Epidemic Sound (music licensing for qualified views)
- Heading above card: `H4` — "Tools that can help improve your results" — Manrope 600, 14px, text-text-secondary

---

### Section 5: Result Context Section

**Required on every calculator page:**
- H3: "What affects your results?" — Manrope 700, 20px, text-brand-ink
- 3 contextual explanation cards (shadcn Card, `bg-surface p-5 rounded-xl`)
  - Each: Lucide icon + title + 2-sentence explanation + link to relevant guide
- This section contextualizes the result and feeds into guide pages (conversion funnel)

---

### Section 6: Inline Explainer Image

**Image:** unDraw SVG illustration
- Topic: earnings/analytics/data concept
- Color-swap: `sed -i '' 's/#6C63FF/#F4A261/g' illustration.svg`
- Optimize: `svgo illustration.svg`
- Placement: `<img src="/images/illustrations/{slug}.svg" alt="{descriptive alt}" width={800} height={500} className="w-full max-h-[400px] object-contain my-12" loading="lazy" />`

---

### Section 7: FAQ Accordion

**Component:** shadcn Accordion
- Install: `npx shadcn@latest add accordion`
- 5-7 FAQs relevant to this calculator
- H3: "Frequently Asked Questions" — Manrope 700, 24px
- Accordion trigger: Manrope 600, 15px, text-brand-ink
- Accordion content: Manrope 400, 14px, text-text-secondary
- No affiliate links in FAQ answers

---

### Section 8: Related Guides

Same as article page footer section. 3 guide cards.

---

### EXIT INTENT POPUP (v4 NEW — mounts on calculator pages only)

**Component:** `<EmailCapturePopup />` — see BRAND.md Component 4 spec
- Mount in calculator page layout: `components/layouts/calculator-layout.tsx`
- Trigger: `mouseleave` on `document` where `event.clientY <= 0`
- Session check: `sessionStorage.getItem('tcp_popup_shown')` — skip if already shown
- Lead magnet: context-specific
  - Earnings calculator: "Earnings Calculator Results" — "Get a breakdown of what your numbers actually mean"
  - RPM calculator: "RPM Optimization Cheat Sheet"
  - Follower income: "First 30 Days Optimization Checklist"

---

## PAGE 4: Guides Listing Page

### Section 1: Navigation
See SHARED: Navigation.

---

### Section 2: Page Header

**Background:** `bg-background-warm`, `py-16`
**Layout:** `max-w-container mx-auto px-6 text-center`

**H1:** Manrope 800, 48px, text-brand-ink — "TikTok Creator Rewards Guides"
**Description:** Manrope 400, 18px, text-text-secondary, max-w-2xl mx-auto

**Category filter tabs:**
- shadcn Tabs component
- Categories: All | Getting Started | Maximize Earnings | Troubleshooting | Country Guides | Tools & Equipment | Niche Guides | Comparisons
- Active tab: `bg-brand-primary text-brand-ink`
- Layout: scrollable horizontal on mobile (overflow-x-auto, hide scrollbar)

---

### Section 3: Guide Cards Grid

**Layout:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`, `py-12`

**Each card:** Same spec as homepage featured guides (Section 6), plus:
- Full category filter: clicking tab filters cards client-side (Framer Motion AnimatePresence for enter/exit)

**Load more:** shadcn Button, `variant="outline"`, centered below grid — loads next 12 guides
- Implement via static props (all guides are static MDX)

---

### Section 4: Email Capture

Same component as homepage email capture.

---

## PAGE 5: Start Here Page

**CRITICAL:** Remove navigation. This is a conversion page. No nav = 2-4x higher email conversion.

### Section 1: Minimal header

**Component:** Custom — no Aceternity floating nav here
- Logo only: wordmark (Manrope 800, 22px, text-brand-ink, centered)
- Link back to homepage via logo
- No nav links, no CTA button
- `py-6 border-b border-border-default`

---

### Section 2: Hero — Conversion focused

**Layout:** Single-column centered, `max-w-2xl mx-auto px-6 pt-16 text-center`

**Pre-headline badge:** Lucide `Star` icon + "Start Here" text, `bg-brand-primarySoft text-brand-primaryDeep`, rounded-full px-4 py-1, text-sm, Manrope 600

**H1:** Manrope 800, 48px desktop / 32px mobile, text-brand-ink
- Text: [from CONTENT.md — starthere-headline]
- NO Pro badges, NO paid tier language, NO "unlock" language

**Subheadline:** Manrope 400, 18px, text-text-secondary — [from CONTENT.md — starthere-subheadline]

**Image:**
- `public/images/brand/landpress-marketing-4.png`
- Render: `<Image src="/images/brand/landpress-marketing-4.png" alt="TikTok creator getting started with Creator Rewards" width={600} height={400} className="mx-auto rounded-2xl my-8 object-contain" priority loading="eager" />`

---

### Section 3: Eligibility Checklist

**Component:** shadcn Accordion (interactive checklist)
- 5-6 eligibility requirements as expandable accordion items
- Each item: Lucide `CheckCircle` (pre-check visual) + requirement title + expanded explanation
- Styling: check icon is `text-success` when "eligible", `text-error` when "ineligible"
- H2: "Are you eligible?" — Manrope 700, 32px, text-brand-ink, centered
- NO Pro badges near checklist items

---

### Section 4: Email Capture — Primary CTA

**Component:** Same email capture as homepage (Section 8)
- This is the primary goal of this page
- Position immediately after eligibility checklist — capture them at peak intent
- Headline: [from CONTENT.md — starthere-email-headline]
- Remove nav-level distraction (already done in Section 1)

---

### Section 5: Next Steps

**Component:** 3-step numbered list using custom layout (no library)
- `bg-background-warm`, `py-16`
- H2: "What happens next?" — Manrope 700, 32px, centered
- 3 steps, each: large number (Manrope 800, 48px, text-brand-primary/20), step title (Manrope 700, 20px), step body (text-sm, text-secondary)
- Below: shadcn Button, `bg-brand-primary text-brand-ink`, → /guides

---

### Section 6: Minimal footer

- `bg-brand-ink`, `py-8`
- Single row: copyright + privacy policy + affiliate disclosure links
- No full footer (conversion page — minimize exit links)

---

## PAGE 6: 404 Page

### Layout: Centered, full viewport height, single column

**Background:** `bg-background-warm`, `min-h-screen`, flex center

**Illustration:**
- unDraw SVG: slug `page_not_found` → https://undraw.co/illustrations
- Color-swap: `sed -i '' 's/#6C63FF/#F4A261/g' page-not-found.svg`
- Optimize: `svgo page-not-found.min.svg`
- Render: `<img src="/images/illustrations/page-not-found.min.svg" alt="Page not found" width={400} height={300} className="mx-auto mb-8" />`
- Dimensions: 400x300, max-w-xs
- This MUST be an actual SVG file. Not a placeholder div. Not missing. Required.

**H1:** Manrope 800, 48px, text-brand-ink, centered — "Page Not Found"
**Body:** Manrope 400, 16px, text-text-secondary, centered — [from CONTENT.md — 404-body]

**Two buttons:**
- Primary: `bg-brand-primary text-brand-ink` → / (Home)
- Secondary: `variant="outline"` → /guides (Browse Guides)

**No navigation. No footer.** Clean 404, two exits only.

---

## PAGE 7: Tools/Resources Hub (v4 — Fully Rebuilt)

*This page is the affiliate conversion hub. It exists to rank for "[category] tools for TikTok creators" keywords and convert visitors to affiliate clicks. Design must feel editorial — not a link farm.*

### Section 1: Navigation
See SHARED: Navigation.

---

### Section 2: Affiliate Disclosure (v4 — REQUIRED)

**Renders at top of page, below nav, before any other content.**

**Component:** `<AffiliateDisclosure />` — see BRAND.md Component 6 spec
- Container: `max-w-container mx-auto px-6 pt-6`
- Must appear before any affiliate card content

---

### Section 3: Page Header

**Background:** `bg-background-warm`, `py-16`
**Layout:** 2-column grid `grid md:grid-cols-[1fr_1fr] gap-12 items-center max-w-container mx-auto px-6`

**Left — text:**
- Pre-headline badge: shadcn Badge, `bg-brand-primarySoft text-brand-primaryDeep`, text-xs
  - Lucide `Wrench` icon (12px) + "Curated Tools"
- H1: Manrope 800, 48px desktop / 36px mobile, text-brand-ink — "Tools for TikTok Creators"
- Description: Manrope 400, 18px, text-text-secondary, max-w-lg
  - "Every tool on this page has been researched and recommended by our team. Affiliate links marked clearly — we only recommend what we'd use ourselves."
- Stat row: `flex gap-6 mt-6`
  - Lucide `Package` + "[X] tools reviewed"
  - Lucide `Tag` + "Affiliate links disclosed"

**Right — hero illustration:**
- Image: `public/images/tools/hero-tools-resources.webp` (1200x630)
- Render: `<Image src="/images/tools/hero-tools-resources.webp" alt="Creator surrounded by recommended tools icons" width={600} height={315} className="rounded-2xl object-contain max-h-[420px]" loading="eager" priority />`
- Placement: right column, vertically centered, `max-h-[420px] rounded-2xl`

---

### Section 4: Category Navigation (Tabs)

**Component:** shadcn Tabs — horizontal scrollable
- Install: `npx shadcn@latest add tabs`
- Background: `bg-white border-b border-border-default`
- Container: `max-w-container mx-auto px-6`
- Tabs layout: `flex gap-1 overflow-x-auto pb-px hide-scrollbar`

**Tab list:**
1. Video Editing
2. Music & Audio
3. Analytics Tools
4. Equipment
5. Design & Graphics
6. Scheduling
7. Courses & Learning

- Active tab: `border-b-2 border-brand-primary text-brand-ink font-semibold`
- Inactive tab: `text-text-secondary hover:text-text-primary`
- Tab style: `px-4 py-3 text-sm font-manrope whitespace-nowrap`
- On mobile: tabs scroll horizontally with hidden scrollbar

---

### Section 5: Tool Category Sections

**Layout:** `max-w-container mx-auto px-6 py-12`

**Each category section:**

**Category header:**
- H2: category name — Manrope 700, 28px, text-brand-ink
- Category description: 2-3 sentences explaining what tools in this category do and why creators use them — Manrope 400, 16px, text-text-secondary, max-w-2xl, `mt-2 mb-8`

**Card grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**Each tool:** `<AffiliateRecommendationCard variant="grid" />` — see BRAND.md Component 2 spec
- 3-5 tools per category minimum
- Tool logo at `/images/tools/{slug}-logo.png` — 48x48, png or svg, fetched from tool's official site or Google Favicon API as fallback
  - Fallback: `https://www.google.com/s2/favicons?domain={toolDomain}&sz=64`
- isEditorsPick: true for 1 tool per category maximum

**Category separator:** `border-t border-border-default my-16` between categories

---

### Section 6: Second Affiliate Disclosure (bottom)

Same `<AffiliateDisclosure />` component, placed above email capture section.

---

### Section 7: Email Capture — "Monthly Tools Roundup"

**Component:** Same email capture as homepage (Section 8)

**Customization for Tools page:**
- Headline: "Get our monthly creator tools roundup"
- Subheadline: "New tools, deals, and honest reviews — straight to your inbox. Free."
- CTA button text: "Join Free"
- Lead magnet: no specific magnet — newsletter signup only

**Background:** `bg-background-warm`, `py-16`

---

## OG Image Route (all pages)

**File:** `app/og/route.tsx`

**Design:**
- Background: `linear-gradient(135deg, #111827 0%, #1F2937 100%)` (dark ink)
- Brand name: top-left, white, 20px
- Title: center, white, 56px bold (Manrope via Satori)
- Domain: bottom-right, text-brand-primary (#F4A261), 20px
- Dimensions: 1200x630

**Usage:**
```tsx
export const metadata = {
  openGraph: {
    images: [`/og?title=${encodeURIComponent(pageTitle)}`],
  },
};
```

---

## Image File Map

### Brand Images (existing, copy from assets)

| Source | Destination | Used On |
|---|---|---|
| `assets/brand-images/landpress-marketing-hero.png` | `public/images/brand/landpress-marketing-hero.png` | Homepage hero, right column |
| `assets/brand-images/landpress-marketing-2.png` | `public/images/brand/landpress-marketing-2.png` | Homepage calculators section, right column |
| `assets/brand-images/landpress-marketing-3.png` | `public/images/brand/landpress-marketing-3.png` | Start Here page hero (email-capture-illustration replaces on homepage) |
| `assets/brand-images/landpress-marketing-4.png` | `public/images/brand/landpress-marketing-4.png` | Start Here page hero |

### Generated Images (Gemini Imagen 4 — existing)

| Filename | Dimensions | Prompt Summary |
|---|---|---|
| `public/images/homepage-explainer.webp` | 800x600 | Creator at desk with phone, data charts |
| `public/images/calculators/hero-earnings.webp` | 1200x630 | Phone showing earnings dashboard, dollar symbol |
| `public/images/calculators/hero-rpm.webp` | 1200x630 | Bar chart growing, hand pointing |
| `public/images/calculators/hero-follower.webp` | 1200x630 | Stylized group with connection lines |

### Generated Images (Gemini Imagen 4 — NEW v4)

| Filename | Dimensions | Purpose |
|---|---|---|
| `public/images/tools/hero-tools-resources.webp` | 1200x630 | Tools/Resources page header, right column |
| `public/images/brand/email-capture-illustration.webp` | 800x600 | Homepage email section + guide inline email captures |

### Guide Images (per-guide generation)

**Guide hero images:** Each of the 57 guides requires a unique `public/images/guides/hero-{slug}.webp` at 1200x630. See `ILLUSTRATION_PROMPTS.md` for per-guide generation prompts. Devan generates these using the Gemini Imagen 4 API with the style prefix defined in BRAND.md.

**Guide thumbnails:** Each guide also requires `public/images/guides/thumb-{slug}.webp` at 400x300 (sharp resize from hero).

**unDraw illustrations:**
- `public/images/illustrations/page-not-found.min.svg` — 404 page (required, not optional)
- `public/images/illustrations/calculator-results.min.svg` — calculator inline section

All unDraw SVGs: color-swap `#6C63FF` → `#F4A261`, then optimize with `svgo`.

### Tool Logos (Tools/Resources page)

- Path pattern: `public/images/tools/{slug}-logo.png`
- Dimensions: 48x48 minimum, transparent background preferred
- Fallback: Google Favicon API `https://www.google.com/s2/favicons?domain={domain}&sz=64`
- Required for all tools on the Tools/Resources page
