# Brand Identity — TikTok Creativity Program
## v4 — Affiliate + Email Model

**LOCKED sections:** Color Palette, Typography, Animation Direction, Icon System, tokens.json — do NOT change.
**v4 additions:** New Components (affiliate cards, email capture, disclosure). Reference Analysis. Updated Image Manifest.

---

## Brand Personality

This site is the authority a TikTok creator actually trusts — not a corporate how-to page, not a tool company's blog, not a generic content farm. It feels like getting advice from someone who has figured out the Creator Rewards Program and wants to share exactly what they know. Warm, direct, confident without being smug. The visual energy is creator-native: dark ink with orange fire, the aesthetic of someone who takes their content seriously. A creator should land on this site and feel immediate recognition — "this is built for people like me."

The first-visit impression must answer three questions in under 3 seconds: What is this? (The free guide to TikTok Creator Rewards — tools, guides, resources.) Why should I care? (Real RPM data, accurate calculators, and 57 guides — all free.) What do I do next? (One clear CTA.) Everything else is noise.

**v4 framing:** This is a free resource, not a product. No Pro tiers, no paid features, no membership. Every tool, guide, and calculator is free. The conversion goals are email capture and affiliate click-through — both earned through genuine value, not gates.

---

## Color Palette — LOCKED

| Role | Hex | Usage |
|---|---|---|
| Primary | #F4A261 | CTA buttons, active states, highlights, icon accents |
| Primary Hover | #E8894A | Button hover, pressed states |
| Primary Soft | #FFF1E6 | Subtle backgrounds on callout cards, tag backgrounds |
| Ink | #111827 | All headings, primary body text, logo |
| Background Page | #FFFFFF | Page backgrounds |
| Background Warm | #FFF7ED | Hero section wash, email capture section, section alternates |
| Surface | #F9FAFB | Card backgrounds, sidebar backgrounds |
| Border Default | #E5E7EB | Card borders, dividers |
| Border Strong | #D1D5DB | Focused input borders, table borders |
| Text Primary | #111827 | Body text, headings |
| Text Secondary | #6B7280 | Captions, metadata, breadcrumbs |
| Text Muted | #9CA3AF | Placeholder text, disabled states |
| Text Inverse | #FFFFFF | Text on Ink backgrounds only |
| Success | #16A34A | Eligible checkmarks, positive stats |
| Warning | #D97706 | Caution callouts |
| Error | #DC2626 | Error states, rejection alerts |

**WCAG Rule — Hard Stop:** Primary orange (#F4A261) on white achieves only 2.43:1 contrast. Never use white text on orange. All orange buttons use Ink (#111827) text. Verified with WCAG AA calculator. No exceptions.

---

## Typography — LOCKED

| Role | Font | Weight | Size | Line Height |
|---|---|---|---|---|
| H1 | Manrope | 800 | 3.5rem (56px) | 1.1 |
| H2 | Manrope | 700 | 2.25rem (36px) | 1.2 |
| H3 | Manrope | 700 | 1.5rem (24px) | 1.3 |
| H4 | Manrope | 600 | 1.25rem (20px) | 1.4 |
| Body | Manrope | 400 | 1rem (16px) | 1.75 |
| Body Large | Manrope | 400 | 1.125rem (18px) | 1.7 |
| Caption | Manrope | 500 | 0.75rem (12px) | 1.5 |
| Label | Manrope | 600 | 0.875rem (14px) | 1.4 |
| Mono | JetBrains Mono | 400 | 0.875rem (14px) | 1.6 |

Single-family approach: Manrope handles everything. Weight variance creates hierarchy without font-switching visual complexity. JetBrains Mono only for calculator outputs and data values.

Load Manrope from Google Fonts (weights: 400, 500, 600, 700, 800). Load JetBrains Mono from Google Fonts (weight: 400 only). Both via next/font/google for optimal performance.

---

## Image Style — LOCKED

Style prompt prefix for all AI-generated images:

"Flat design illustration, warm orange (#F4A261) and ink black (#111827) on white or warm white (#FFF7ED) background, clean geometric shapes, bold outlines, minimal detail, no text overlay, no gradients, creator/smartphone/content theme"

Rules:
- Orange appears on ONE element per illustration (clothing piece OR device accent OR single UI highlight)
- Ink black for outlines, secondary elements, devices
- White or #FFF7ED for backgrounds — never orange backgrounds
- Characters are stylized, not photorealistic — flat limbs, geometric heads, bold shapes
- Every guide gets a unique illustration. Recycling is not acceptable.
- unDraw SVGs: color-swap default purple (#6C63FF) to #F4A261 using sed

---

## Animation Direction — LOCKED

Creator-native energy through purposeful motion. The hero has a signature animated effect (Aceternity UI Spotlight) that signals this site was designed, not templated. Below the fold: scroll-reveal on all major sections using Framer Motion (opacity 0 to 1, y 20 to 0, duration 0.5s, viewport once: true). Cards stagger at 0.1s intervals. No parallax. No auto-playing video. No infinite looping animations that compete with reading.

CTAs animate on hover (scale 1.02, shadow deepens). Numbers in stat blocks count up when scrolled into view (Magic UI Number Ticker). The hero headline uses a staggered word reveal on first load (Framer Motion, words animate in sequence at 0.08s stagger).

prefers-reduced-motion: all scroll reveals and entrance animations are disabled when set. Static renders only. This is a hard requirement — not optional.

---

## Icon System — LOCKED

Lucide React exclusively. No emojis anywhere in rendered output. No decorative emoji in headings, cards, or body text. Zero exceptions. If a design idea requires an emoji, replace it with the nearest Lucide icon.

Key icons for this project: `TrendingUp`, `DollarSign`, `Video`, `BarChart2`, `CheckCircle`, `XCircle`, `AlertTriangle`, `Clock`, `Globe`, `ChevronRight`, `ExternalLink`, `Calculator`, `BookOpen`, `Users`, `Zap`, `Star`.

New icons for v4 components: `Download`, `Mail`, `Share2`, `Info`, `X`, `Tag`, `Wrench`, `Package`.

---

## New Components — v4 (Affiliate + Email Model)

These components are NEW in v4. They do not exist in the current codebase. Devan builds them from these specs exactly.

---

### Component 1: AffiliateRecommendationCard — Inline Variant

**File:** `components/affiliate/affiliate-card-inline.tsx`
**Source inspiration:** NerdWallet inline recommendation cards, Wirecutter editorial card style
**Install:** No new dependencies (uses existing shadcn Button, Badge)

**When used:** Inside guide prose, after H2 section breaks. Never in first 3 paragraphs. Max 2 per guide article. Used where the tool solves the specific problem the section addresses.

**Visual intent:** Feels editorial — like a knowledgeable friend saying "by the way, this tool helps here." Not a banner ad. Subtle card, not a garish callout.

**Tailwind spec:**
```tsx
<div className="bg-surface border border-border-default rounded-xl p-5 flex items-start gap-4 my-8 relative not-prose">
  {/* Affiliate disclosure label — top right, always visible */}
  <div className="absolute top-3 right-3 flex items-center gap-1 text-text-muted">
    <Info className="w-3 h-3" />
    <span className="text-[11px] font-manrope font-medium">Affiliate</span>
  </div>

  {/* Tool logo */}
  <img
    src="/images/tools/{slug}-logo.png"
    alt="{toolName} logo"
    className="w-12 h-12 rounded-lg object-contain flex-shrink-0 border border-border-default bg-white p-1"
  />

  {/* Content */}
  <div className="flex-1 pr-12">
    <h4 className="font-manrope font-semibold text-brand-ink text-base mb-1">{toolName}</h4>
    <p className="text-text-secondary text-sm leading-relaxed mb-3">{2–3 sentence editorial review}</p>
    <div className="flex items-center gap-2 flex-wrap mb-3">
      <Badge className="bg-surface text-text-secondary border-border-default text-xs font-manrope">
        <Tag className="w-3 h-3 mr-1" />Best for: {persona}
      </Badge>
      <span className="text-text-muted text-xs">{priceRange}</span>
    </div>
    <Button variant="outline" size="sm" asChild
      className="border-brand-primary text-brand-ink hover:bg-brand-primarySoft font-semibold">
      <a href="/go/{slug}" target="_blank" rel="noopener sponsored">
        {ctaText} <ExternalLink className="w-3 h-3 ml-1" />
      </a>
    </Button>
  </div>
</div>
```

**Props:** `toolName`, `slug`, `review` (string, 2–3 sentences), `bestFor` (string), `priceRange` (string), `ctaText` (string, e.g. "Try Free" / "See Pricing")

---

### Component 2: AffiliateRecommendationCard — Grid Variant

**File:** `components/affiliate/affiliate-card-grid.tsx`
**Source inspiration:** NerdWallet "Best of" roundup card format, Smart Passive Income resource page cards
**When used:** Tools/Resources page, organized in 3-column grid per category. Also usable on calculator results page for tool recommendation.

**Visual intent:** Slightly more complete than inline variant — has full mini-review, a visual prominence, and a clear CTA. Still editorial, not promotional. The "Editor's Pick" badge is optional — only for genuinely recommended tools, not all tools.

**Tailwind spec:**
```tsx
<div className="bg-white border border-border-default rounded-xl p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
  {/* Header row */}
  <div className="flex items-start gap-3 mb-4">
    <img
      src="/images/tools/{slug}-logo.png"
      alt="{toolName} logo"
      className="w-12 h-12 rounded-lg object-contain border border-border-default bg-white p-1 flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <h3 className="font-manrope font-bold text-brand-ink text-base leading-tight">{toolName}</h3>
      <span className="text-text-muted text-xs">{priceRange}</span>
    </div>
    {/* Optional: editor's pick badge */}
    {isEditorsPick && (
      <Badge className="bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-manrope font-semibold flex-shrink-0">
        <Star className="w-3 h-3 mr-1" />Editor's Pick
      </Badge>
    )}
  </div>

  {/* Review */}
  <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">{3–5 sentence editorial review}</p>

  {/* Best for tag */}
  <div className="mb-4">
    <Badge className="bg-surface text-text-secondary border-border-default text-xs font-manrope">
      <Tag className="w-3 h-3 mr-1" />Best for: {persona}
    </Badge>
  </div>

  {/* CTA */}
  <Button variant="outline" size="sm" className="w-full border-brand-primary text-brand-ink hover:bg-brand-primarySoft font-semibold" asChild>
    <a href="/go/{slug}" target="_blank" rel="noopener sponsored">
      {ctaText} <ExternalLink className="w-3 h-3 ml-1" />
    </a>
  </Button>

  {/* Disclosure */}
  <p className="text-text-muted text-[11px] font-manrope text-center mt-2 flex items-center justify-center gap-1">
    <Info className="w-3 h-3" />We may earn a commission
  </p>
</div>
```

**Props:** `toolName`, `slug`, `review`, `bestFor`, `priceRange`, `ctaText`, `isEditorsPick` (boolean)

---

### Component 3: EmailCaptureInline

**File:** `components/email/email-capture-inline.tsx`
**Source inspiration:** Backlinko inline content upgrades, Ahrefs blog mid-article email forms
**When used:** Inside guide content — placed after the 3rd H2 section or at a natural "now you know X, get Y" moment. Also at end of article before Related Guides. Max 1 per guide article.

**Visual intent:** Stands out from prose without interrupting reading flow. Uses brand-primarySoft background to visually differentiate from article background. Feels like a bonus offer, not a gate.

**Tailwind spec:**
```tsx
<div className="bg-brand-primarySoft border border-brand-primary/20 rounded-xl p-6 my-8 not-prose">
  <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
    {/* Lead magnet text */}
    <div className="flex-1">
      <h4 className="font-manrope font-bold text-brand-ink text-lg mb-1 flex items-center gap-2">
        <Download className="w-4 h-4 text-brand-primary flex-shrink-0" />
        {leadMagnetTitle}
      </h4>
      <p className="text-text-secondary text-sm leading-snug">{leadMagnetDescription}</p>
    </div>

    {/* Form */}
    <div className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0">
      <Input
        type="email"
        placeholder="Your email"
        className="rounded-full h-10 border-border-strong focus:border-brand-primary text-sm flex-1 sm:w-[220px]"
      />
      <Button className="bg-brand-primary text-brand-ink font-semibold rounded-full px-5 h-10 whitespace-nowrap hover:bg-brand-primaryHover">
        Get It Free
      </Button>
    </div>
  </div>
  <p className="text-text-muted text-[11px] font-manrope mt-2">No spam. Unsubscribe anytime.</p>
</div>
```

**Props:** `leadMagnetTitle` (string), `leadMagnetDescription` (string), `convertKitFormId` (string)

---

### Component 4: EmailCapturePopup (Exit Intent)

**File:** `components/email/email-capture-popup.tsx`
**When used:** Calculator pages ONLY. Triggered when cursor leaves the viewport top edge (exit intent). ONE popup per session (sessionStorage key `tcp_popup_shown`). Never on guide pages (inline form handles those). Never auto-shown after time delay — only on exit intent.

**Visual intent:** Dismissible, not obnoxious. Shows the lead magnet preview to build perceived value before email submission. Dark backdrop dims the calculator without covering it permanently. Max 480px wide.

**Tailwind spec:**
```tsx
{/* Backdrop */}
<div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200">
  {/* Modal */}
  <div className="bg-white rounded-2xl shadow-xl max-w-[480px] w-full p-8 relative animate-in zoom-in-95 duration-200">
    {/* Close button */}
    <button
      onClick={handleDismiss}
      aria-label="Close"
      className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
    >
      <X className="w-5 h-5" />
    </button>

    {/* Lead magnet preview */}
    <LeadMagnetPreviewCard
      title={leadMagnetTitle}
      previewSrc={previewImageSrc}
      itemCount={itemCount}
    />

    {/* Headline + description */}
    <h3 className="font-manrope font-bold text-brand-ink text-xl mt-4 mb-2">{headline}</h3>
    <p className="text-text-secondary text-sm leading-relaxed mb-5">{description}</p>

    {/* Form */}
    <div className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        className="flex-1 h-11 rounded-full border-border-strong focus:border-brand-primary"
      />
      <Button className="bg-brand-primary text-brand-ink font-bold rounded-full px-6 h-11 hover:bg-brand-primaryHover">
        Get It Free
      </Button>
    </div>
    <p className="text-text-muted text-[11px] font-manrope text-center mt-2">No spam. Free forever. Unsubscribe anytime.</p>

    {/* Dismiss link */}
    <button
      onClick={handleDismiss}
      className="block text-center text-text-muted text-xs mt-3 underline hover:text-text-secondary w-full"
    >
      No thanks, I'll figure it out myself
    </button>
  </div>
</div>
```

**Behavior:**
- Mounted in `_app.tsx` or calculator page layout — listens for `mouseleave` on `document` where `event.clientY <= 0`
- Checks `sessionStorage.getItem('tcp_popup_shown')` before showing — if truthy, do not show
- On show: sets `sessionStorage.setItem('tcp_popup_shown', '1')`
- On dismiss (close button OR "No thanks" link): removes backdrop from DOM, sets sessionStorage flag

---

### Component 5: LeadMagnetPreviewCard

**File:** `components/email/lead-magnet-preview.tsx`
**When used:** Inside EmailCapturePopup and optionally inside EmailCaptureInline for high-value lead magnets.

**Visual intent:** Shows a visual thumbnail of what the visitor will receive. Builds perceived value before email submission. Feels like a mini product preview, not a generic "free download" placeholder.

**Tailwind spec:**
```tsx
<div className="bg-surface border border-border-default rounded-lg p-3 flex items-center gap-3">
  {/* Preview thumbnail */}
  <div className="w-[80px] h-[60px] bg-brand-primarySoft rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
    <img
      src={previewSrc}
      alt={`Preview of ${title}`}
      className="w-full h-full object-cover rounded-md"
      onError={(e) => {
        /* fallback: show Download icon if image missing */
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
    <Download className="w-6 h-6 text-brand-primary hidden" />
  </div>
  {/* Details */}
  <div>
    <p className="font-manrope font-semibold text-brand-ink text-sm leading-tight">{title}</p>
    <p className="text-text-muted text-[11px] mt-0.5">{itemCount} • Free instant download</p>
  </div>
  {/* Free badge */}
  <Badge className="ml-auto bg-brand-primarySoft text-brand-primaryDeep text-xs font-manrope font-semibold flex-shrink-0">
    FREE
  </Badge>
</div>
```

**Props:** `title` (string), `previewSrc` (string — image path), `itemCount` (string, e.g. "12-point checklist")

---

### Component 6: AffiliateDisclosure

**File:** `components/affiliate/affiliate-disclosure.tsx`
**When used:** Below breadcrumb/page header on every guide page and the Tools/Resources page that contains affiliate links. Per-page placement, not just the footer. Renders conditionally — only on pages where `hasAffiliateLinks: true` in frontmatter.

**Visual intent:** Honest, unobtrusive. Meets FTC requirements. Text-secondary color, small font. Should not distract from content but must be visible before any affiliate links appear.

**Tailwind spec:**
```tsx
<div className="flex items-start gap-2 bg-surface border border-border-default rounded-md px-4 py-2.5 text-text-muted mb-6 not-prose">
  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
  <span className="text-[12px] font-manrope leading-relaxed">
    This page contains affiliate links. If you click through and make a purchase, we may earn a small commission at no extra cost to you. We only recommend tools we've researched and genuinely think are useful.{' '}
    <a href="/affiliate-disclosure" className="underline hover:text-text-secondary transition-colors">
      Learn more about our affiliate policy
    </a>.
  </span>
</div>
```

---

## Reference Analysis — v4 Affiliate + Email Patterns

*Synthesized from Christopher's RESEARCH_V2.md (10 sites studied) and brief reference list.*

### NerdWallet
**Pattern adopted:** Per-page affiliate disclosure above the fold (before any affiliate content). Comparison card format with "Best for:" sub-segmentation. "NerdWallet Pick" badge → adapted as "Editor's Pick" badge on grid cards.
**Why it works:** Trust through transparency + specific targeting. Creators see "best for beginner creators" and immediately know if it's relevant.
**Applied in:** AffiliateRecommendationCard (both variants), AffiliateDisclosure component.

### Wirecutter (Editorial Affiliate Standard)
**Pattern adopted:** Editorial framing — recommendations feel journalistic, not promotional. Subtle affiliate label (not a banner). Short, specific review copy (2–5 sentences). Clean card with logo + mini-review + single CTA.
**Why it works:** Feels like advice, not advertising. The affiliate disclosure being present (but unobtrusive) actually builds trust rather than eroding it.
**Applied in:** AffiliateRecommendationCard inline variant — the `not-prose` container prevents it from looking like an ad disrupting the article.

### Backlinko / Ahrefs Blog
**Pattern adopted:** Inline email capture positioned at natural content break points. Lead magnet is specific to the guide topic (not a generic newsletter). Form embedded in content, not just in sidebar or footer.
**Why it works:** Captures email when the visitor is at peak engagement (they've read 60% of the guide and want more). Generic newsletter offers convert poorly; topic-specific lead magnets convert 3–5x better.
**Applied in:** EmailCaptureInline component — triggered after 3rd H2 section where the reader is engaged.

### Smart Passive Income (Pat Flynn)
**Pattern adopted:** Resource/tools page organized by category with editorial mini-reviews. Page feels like a trusted friend's bookmarks, not a link farm. Email capture at page bottom with category-specific angle ("monthly tools roundup").
**Why it works:** The category organization reduces decision fatigue. Visitors looking for analytics tools go straight to that section without browsing unrelated categories.
**Applied in:** Tools/Resources page layout with shadcn Tabs by category. EmailCaptureInline at page bottom.

### The Points Guy
**Pattern adopted:** Exit-intent popup on high-conversion pages (calculator pages in our case). Shows the value exchange clearly before asking for email. Dismissible with a human "no thanks" link (less aggressive than an "X" button alone).
**Why it works:** Exit intent captures visitors who would otherwise bounce without converting. The human dismiss copy ("No thanks, I'll figure it out myself") reduces anxiety and actually improves conversion vs a cold close button.
**Applied in:** EmailCapturePopup behavior and dismiss copy.

### Social Blade / NerdWallet on Calculator Pages
**Pattern adopted:** Calculator results are shareable. "I just found out my estimated TikTok earnings" is inherently social. Share buttons on results pages drive organic discovery.
**Why it works:** Calculator results are personalized — creators want to share their number. Each share is free distribution.
**Applied in:** Calculator results section with Share2 button and pre-filled share text.

---

## Generated Image Manifest — v4

These images were generated by Vale using Gemini Imagen 4 and are READY for Devan to use. Do not re-generate unless file is corrupted or missing.

| Image | Dimensions | Path | Used On | Placement |
|---|---|---|---|---|
| Homepage Hero | 480x440 | `public/images/brand/landpress-marketing-hero.png` | Homepage hero | Right column, vertically centered, max-h-[440px] |
| Calculator Section | 400x440 | `public/images/brand/landpress-marketing-2.png` | Homepage calculators section | Right column, vertically centered |
| Email Capture (old) | 200x200 | `public/images/brand/landpress-marketing-3.png` | Homepage email section | Above email form, centered, 200x200 |
| Start Here | 600x400 | `public/images/brand/landpress-marketing-4.png` | Start Here page hero | Below H1, centered, 600x400 |
| Homepage Explainer | 800x600 | `public/images/homepage-explainer.webp` | Homepage "What is CR?" section | Right column, rounded-2xl, max-h-[420px] |
| Earnings Calc Hero | 1200x630 | `public/images/calculators/hero-earnings.webp` | Earnings Calculator header | Full-width below header, above calculator tool |
| RPM Calc Hero | 1200x630 | `public/images/calculators/hero-rpm.webp` | RPM Calculator header | Full-width below header, above calculator tool |
| Follower Calc Hero | 1200x630 | `public/images/calculators/hero-follower.webp` | Follower Income Calculator header | Full-width below header, above calculator tool |
| **Tools/Resources Hero** *(NEW v4)* | 1200x630 | `public/images/tools/hero-tools-resources.webp` | Tools/Resources page header | Right column in 2-col header layout, max-h-[420px] object-contain rounded-2xl |
| **Email Capture Illustration** *(NEW v4)* | 800x600 | `public/images/brand/email-capture-illustration.webp` | Homepage email section (replaces landpress-3), inline guide email captures | Above form in full email capture section, centered, 200x200 cropped; in popup preview at 80x60 |

---

## Mandatory Implementation Checklist

**Bernard uses this at G2 review. Every item must be screenshot-verifiable. "It's in the code" is not sufficient — it must be visible in a rendered screenshot.**

### Foundation (Unchanged from v3)
1. `tokens.json` values loaded into `tailwind.config.ts` — all brand color classes resolve in browser
2. Manrope font loaded at weights 400, 500, 600, 700, 800 — visible in rendered headings
3. JetBrains Mono loaded weight 400 — visible in calculator outputs
4. No orange buttons with white text anywhere — all orange CTAs use `text-brand-ink` (#111827)
5. `prefers-reduced-motion` respected — Framer Motion animations disabled when set

### New v4 Components — Visual Verification Required
6. `AffiliateRecommendationCard` (inline) renders inside at least one guide article: tool logo (48x48) visible, review text visible, "Best for:" badge visible, "Affiliate" label top-right, CTA button with `ExternalLink` icon links to `/go/{slug}` — screenshot of a guide with card in prose
7. `AffiliateRecommendationCard` (grid) renders on Tools/Resources page in 3-column grid — logo, review, "Best for:" badge, CTA button all visible — screenshot of Tools page grid section
8. `EmailCaptureInline` renders inside at least one guide article — orange-tinted background (`bg-brand-primarySoft`) visible, distinct from article prose, email input + "Get It Free" button visible — screenshot of guide with inline form
9. `EmailCapturePopup` triggers on calculator page exit intent — modal appears with dark backdrop, lead magnet preview card visible, email input + CTA visible, close button (X) visible — screenshot of popup on calculator page
10. `LeadMagnetPreviewCard` renders inside the popup — thumbnail (80x60), title, item count, "FREE" badge all visible — screenshot of popup with preview card
11. `AffiliateDisclosure` banner renders below breadcrumb on guide pages with `hasAffiliateLinks: true` — small gray bar with Info icon and disclosure text visible BEFORE any affiliate content — screenshot of guide page top section

### Image Placements — Exact Positions Required
12. `public/images/tools/hero-tools-resources.webp` (1200x630) exists, loads at Tools/Resources page header RIGHT column, max-h-[420px] rounded-2xl — screenshot confirms image renders (not broken placeholder)
13. `public/images/brand/email-capture-illustration.webp` (800x600) exists, loads in homepage email capture section ABOVE the email form, 200x200 centered — screenshot confirms image renders
14. All 4 `landpress-marketing-*.png` files exist at `public/images/brand/` and load without error — check Network tab in DevTools (no 404s)
15. All 3 calculator hero images exist at `public/images/calculators/hero-{slug}.webp` — visible in browser on respective calc pages

### Homepage v4 Changes
16. Homepage hero communicates "free resource" — no mention of Pro, premium, or paid tiers anywhere in hero section — screenshot confirms no Pro language
17. Homepage hero primary CTA is "Try the Calculator" (or equivalent) and secondary CTA is "Start the Learning Path" — CTA order matches brief (calculator is primary)
18. Trust bar includes a "100% Free" trust signal alongside guide count and calculator count — screenshot of trust bar
19. No pricing link in navigation — screenshot of nav confirms no "Pricing" or "Pro" or "Upgrade" link

### Guide Pages v4 Changes
20. `AffiliateDisclosure` banner appears on guide pages with affiliate content — appears BELOW breadcrumb, ABOVE article H1 — screenshot of guide page showing banner placement
21. `AffiliateRecommendationCard` inline appears after content break (not in first 3 paragraphs) — screenshot of guide showing card position within prose
22. `EmailCaptureInline` appears at natural break point within guide (after 3rd H2 section or before conclusion) — screenshot of guide showing inline form

### Calculator Pages v4 Changes
23. Calculator pages have NO locked features, NO blurred outputs, NO upgrade prompts — screenshot of calculator page confirms all inputs and results are fully functional and visible
24. Calculator results section includes email capture: "Get a detailed breakdown emailed to you" — email input visible below result number — screenshot
25. Calculator results section includes share buttons (Lucide `Share2` icon) — share button visible below result — screenshot
26. Calculator results section includes 1 `AffiliateRecommendationCard` (inline variant or grid variant) — appears after result, based on earnings context — screenshot
27. `EmailCapturePopup` fires on calculator page when mouse exits top of viewport — screenshot of popup appearing (trigger manually via DevTools: `document.dispatchEvent(new Event('tcp_show_popup'))` or similar test hook)
28. Popup only shows ONCE per session — second visit to calc page in same session does NOT show popup — verified via sessionStorage check

### Tools/Resources Page — Full Visual Verification
29. Tools/Resources page renders at `/tools` or `/resources` — accessible from nav "Tools" link — screenshot of full page
30. `AffiliateDisclosure` banner renders at TOP of Tools page, below nav — screenshot confirms banner placement
31. `public/images/tools/hero-tools-resources.webp` renders in page header RIGHT column at max-h-[420px] rounded-2xl — screenshot
32. shadcn Tabs render with category labels: Video Editing | Music & Audio | Analytics | Equipment | Design & Graphics | Scheduling | Courses — all tabs clickable, correct category shown on tab click — screenshot
33. AffiliateRecommendationCard grid renders in 3 columns desktop, 2 columns tablet, 1 column mobile — screenshot at all 3 breakpoints
34. Minimum 3 affiliate cards visible per category — 21+ cards total across all categories — screenshot of filled-out Tools page
35. Email capture section at bottom of Tools page with "Get our monthly tools roundup" heading — form and CTA visible — screenshot

### No Pro/Pricing Elements — Full Site Audit
36. Homepage: zero instances of "Pro", "Premium", "Upgrade", "Pricing", "Membership", or "Subscribe for $X" — screenshot of full homepage, search DevTools for these strings
37. Guide pages: zero Pro badges, zero upgrade prompts, zero locked feature callouts — screenshot of guide page at 100% scroll
38. Calculator pages: zero locked/blurred sections, zero "Unlock with Pro" messaging — screenshot of calculator at results state
39. Start Here page: zero Pro badges or paid tier indicators — screenshot
40. Navigation: no "Pricing" link, no "Pro" CTA — screenshot of nav at 375px and 1280px

### Component Source Documentation
41. `components/affiliate/affiliate-card-inline.tsx` — comment line 1: `// Designed by Vale v4 — Editorial affiliate card, inline guide variant`
42. `components/affiliate/affiliate-card-grid.tsx` — comment line 1: `// Designed by Vale v4 — Editorial affiliate card, grid/tools page variant`
43. `components/email/email-capture-inline.tsx` — comment line 1: `// Designed by Vale v4 — Inline email capture for guide content`
44. `components/email/email-capture-popup.tsx` — comment line 1: `// Designed by Vale v4 — Exit intent popup, calculator pages only`
45. `components/email/lead-magnet-preview.tsx` — comment line 1: `// Designed by Vale v4 — Lead magnet preview card for email capture`
46. `components/affiliate/affiliate-disclosure.tsx` — comment line 1: `// Designed by Vale v4 — FTC-compliant affiliate disclosure banner`
