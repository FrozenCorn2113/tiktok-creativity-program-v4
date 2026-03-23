# Implementation Checklist — TikTok Creativity Program
## v4 — Affiliate + Email Model

**How this works:**
- Devan checks off every item before submitting to Bernard
- Bernard verifies every item — screenshot evidence required
- Unchecked items at review = automatic REVISION NEEDED
- Items marked [WCAG] are accessibility requirements. Failing these blocks ship.

**v4 Delta:** Items marked (NEW v4) are additions. Item 76 (old "no affiliate CTAs on calculator pages") is REMOVED — replaced by new items 76a–76d below. No pricing/Pro items exist in this checklist. If you find one, it's a bug.

---

## Foundation

- [ ] 1. `tokens.json` values loaded into `tailwind.config.ts` — all color, typography, spacing, shadow, and border-radius tokens available as Tailwind classes
- [ ] 2. Manrope font loaded via `next/font/google` with weights 400, 500, 600, 700, 800
- [ ] 3. JetBrains Mono font loaded via `next/font/google` with weight 400
- [ ] 4. Brand color classes work: `bg-brand-primary`, `text-brand-ink`, `bg-background-warm`, `bg-brand-primarySoft` all render correctly in browser
- [ ] 5. Container max-width set to 1200px (`max-w-container`)
- [ ] 6. Content max-width set to 720px (`max-w-content`) — used for article prose and centered layouts
- [ ] 7. [WCAG] Orange buttons (`bg-brand-primary`) always use `text-brand-ink` (#111827) — never white text on orange. Contrast ratio verified: #111827 on #F4A261 = 4.56:1 (passes AA). Verify in browser DevTools accessibility panel.
- [ ] 8. Framer Motion installed: `npm install framer-motion`
- [ ] 9. shadcn/ui initialized: `npx shadcn@latest init` complete, `components/ui/` directory exists
- [ ] 10. Core shadcn components installed: button, card, navigation-menu, tabs, accordion, badge, breadcrumb, sheet, slider, scroll-area, input
- [ ] 11. Magic UI CLI installed: `npx magicui-cli@latest` can resolve
- [ ] 12. `prefers-reduced-motion` handled: all Framer Motion animations wrapped with `useReducedMotion()` check — static render when true
- [ ] 13. Brand images copied: all 4 files from `assets/brand-images/` exist at `public/images/brand/` with correct filenames (landpress-marketing-hero.png, landpress-marketing-2.png, landpress-marketing-3.png, landpress-marketing-4.png)

---

## Navigation (all pages)

- [ ] 14. Aceternity Floating Navbar installed — source URL visited: https://ui.aceternity.com/components/floating-navbar — code copied to `components/aceternity/floating-navbar.tsx` — source URL documented in file comment
- [ ] 15. Navbar renders as floating pill with blur background on scroll (not a static top bar)
- [ ] 16. Logo: "TikTok Creativity Program" — Manrope 800, #111827 — visually distinct from nav links (heavier, larger)
- [ ] 17. Nav links render at correct weight (Manrope 500, not bold)
- [ ] 18. Navbar CTA button: `bg-brand-primary text-brand-ink font-semibold` — orange with ink text, not white text
- [ ] 19. Mobile: hamburger (Lucide `Menu`) visible at 375px — tap opens shadcn Sheet drawer
- [ ] 20. Mobile sheet contains all nav links stacked + full-width CTA button at bottom
- [ ] 21. [WCAG] Navbar CTA keyboard-accessible: Tab reaches button, Enter/Space activates it
- [ ] 22. No emojis in navigation. Lucide icons only.
- [ ] 23. (NEW v4) Nav links are: Guides | Calculators | Tools | Start Here — NO "Pricing" link, NO "Pro" link — screenshot confirms

---

## Homepage

- [ ] 24. Aceternity UI Spotlight installed — source URL visited: https://ui.aceternity.com/components/spotlight — code copied to `components/aceternity/spotlight.tsx` — source URL documented in file comment
- [ ] 25. Hero section uses Spotlight component as the animated background layer (mouse-following light beam effect renders in browser)
- [ ] 26. Hero background is `bg-background-warm` (#FFF7ED) — NOT white, NOT orange
- [ ] 27. Hero layout is 2-column grid (`md:grid-cols-[3fr_2fr]`) — text left, image right. NOT single column.
- [ ] 28. `landpress-marketing-hero.png` renders in hero RIGHT column at correct dimensions (max-h 440px, object-contain, rounded-2xl)
- [ ] 29. Hero H1 headline text communicates "free resource" framing — NO mention of Pro, Premium, or paid tiers — screenshot confirms
- [ ] 30. Hero headline animates on page load: staggered word reveal via Framer Motion (each word opacity 0→1, y 10→0, stagger 0.08s)
- [ ] 31. (NEW v4) Hero PRIMARY CTA is "Try the Calculator Free" (or equivalent calculator CTA) with Lucide `Calculator` icon LEFT — this is the first/prominent button
- [ ] 32. (NEW v4) Hero SECONDARY CTA is "Start the Learning Path" with Lucide `ChevronRight` icon RIGHT — ghost variant, secondary prominence
- [ ] 33. Hero primary CTA has `bg-brand-primary text-brand-ink font-bold shadow-orange hover:scale-[1.02]` — visually pops, not flat
- [ ] 34. Scroll indicator: Lucide `ChevronDown` visible at bottom-center of hero, animated bounce (y oscillates 0→6→0)
- [ ] 35. (NEW v4) Trust bar renders with 4 stats: guide count, calculator count, creators count, "100% Free Forever" — screenshot of trust bar showing all 4 stats
- [ ] 36. Magic UI Number Ticker installed: `npx magicui-cli@latest add number-ticker` — stats count up when scrolled into view
- [ ] 37. Trust bar numbers do NOT flash "0" on initial render — target value renders server-side, animation fires after IntersectionObserver
- [ ] 38. Three-path section: Magic UI Bento Grid installed (`npx magicui-cli@latest add bento-grid`) — 3 cards render: "Am I eligible?" / "I'm in. How do I earn more?" / "Something's wrong"
- [ ] 39. Three-path cards each have: Lucide icon (CheckCircle / TrendingUp / AlertTriangle), title, body, CTA link — NO Pro badges or paid tier indicators on any card
- [ ] 40. Three-path cards stagger on scroll (Framer Motion, 0.1s between cards)
- [ ] 41. Featured Guides section: 21st.dev blog cards installed — source URL visited: https://21st.dev/r/sumonadotwork/blog-cards — code in `components/sections/guide-cards.tsx` — source URL documented
- [ ] 42. Featured Guides: 6 guide cards visible with category badge, thumbnail image, title, excerpt, read time
- [ ] 43. Featured Guides: every card has a unique thumbnail image (400x300 WebP) — no recycled thumbnails
- [ ] 44. Guide card thumbnails are NOT missing/placeholder — actual generated images
- [ ] 45. shadcn Tabs installed and working as category filter on Guides listing section
- [ ] 46. Calculators section: `bg-brand-ink` dark background — visually breaks up the page
- [ ] 47. `landpress-marketing-2.png` renders in calculators section RIGHT column (400x440, rounded-2xl, object-contain)
- [ ] 48. (NEW v4) Calculator links in dark section each have a "Free" badge — NO "Pro" or "Locked" badges anywhere
- [ ] 49. Email capture section: 21st.dev newsletter form installed — source URL visited: https://21st.dev/r/ruixenui/newsletter-form — code in `components/sections/email-capture.tsx` — source URL documented
- [ ] 50. (NEW v4) `email-capture-illustration.webp` renders ABOVE the email form (200x200, centered, rounded-2xl) — NOT the old landpress-marketing-3 image
- [ ] 51. Email form submit button: `bg-brand-primary text-brand-ink font-bold rounded-full` — orange, ink text
- [ ] 52. Magic UI Marquee installed: `npx magicui-cli@latest add marquee` — logo strip section renders with scrolling content
- [ ] 53. Marquee pauses on hover

---

## New v4 Components — Full Visual Verification

### AffiliateRecommendationCard — Inline Variant
- [ ] 54. (NEW v4) `components/affiliate/affiliate-card-inline.tsx` exists — file comment line 1: `// Designed by Vale v4 — Editorial affiliate card, inline guide variant`
- [ ] 55. (NEW v4) AffiliateCard inline renders in at least one guide article — screenshot shows card inside article prose
- [ ] 56. (NEW v4) AffiliateCard inline has: tool logo (48x48, rounded-lg), tool name (H4), 2–3 sentence review text, "Best for:" badge, price range text, CTA button — ALL visible in screenshot
- [ ] 57. (NEW v4) "Affiliate" label (Info icon + text) visible in top-right corner of card — screenshot
- [ ] 58. (NEW v4) Card CTA button links to `/go/{slug}` — verify in browser Network tab that click navigates to affiliate redirect route
- [ ] 59. (NEW v4) Card does NOT appear in first 3 paragraphs of any guide — screenshot showing card position (after content body has begun)
- [ ] 60. (NEW v4) Max 2 AffiliateCards per guide article — screenshot of longest guide shows no more than 2

### AffiliateRecommendationCard — Grid Variant
- [ ] 61. (NEW v4) `components/affiliate/affiliate-card-grid.tsx` exists — file comment line 1: `// Designed by Vale v4 — Editorial affiliate card, grid/tools page variant`
- [ ] 62. (NEW v4) AffiliateCard grid renders on Tools/Resources page — screenshot of Tools page showing grid of cards
- [ ] 63. (NEW v4) AffiliateCard grid has: tool logo, tool name (H3), price range, review text (3–5 sentences), "Best for:" badge, CTA button full-width, "We may earn a commission" note — ALL visible in screenshot
- [ ] 64. (NEW v4) Grid renders 3 columns desktop, 2 columns tablet, 1 column mobile — screenshot at all 3 breakpoints
- [ ] 65. (NEW v4) "Editor's Pick" badge renders on exactly 1 card per category (not on all cards) — screenshot of a category section showing mixed badge/no-badge cards

### EmailCaptureInline
- [ ] 66. (NEW v4) `components/email/email-capture-inline.tsx` exists — file comment line 1: `// Designed by Vale v4 — Inline email capture for guide content`
- [ ] 67. (NEW v4) EmailCaptureInline renders inside at least one guide article — screenshot shows orange-tinted background (`bg-brand-primarySoft`) inside article prose
- [ ] 68. (NEW v4) EmailCaptureInline has: `Download` Lucide icon, headline, description, email input, "Get It Free" orange button — ALL visible
- [ ] 69. (NEW v4) EmailCaptureInline is visually distinct from article body (different background) but does not break reading flow — screenshot shows it at natural section break
- [ ] 70. (NEW v4) EmailCaptureInline positioned after 3rd H2 or at natural section break — NOT interrupting early in article — screenshot confirms position

### EmailCapturePopup (Exit Intent)
- [ ] 71. (NEW v4) `components/email/email-capture-popup.tsx` exists — file comment line 1: `// Designed by Vale v4 — Exit intent popup, calculator pages only`
- [ ] 72. (NEW v4) Popup mounts ONLY on calculator pages — visiting a guide page and triggering exit intent does NOT show popup — verified by testing on both page types
- [ ] 73. (NEW v4) Popup shows on calculator page exit intent (mouse leaves viewport top) — screenshot of popup with dark backdrop visible
- [ ] 74. (NEW v4) Popup has: LeadMagnetPreviewCard (80x60 thumbnail), headline, description, email input, "Get It Free" button, X close button, "No thanks" dismiss link — ALL visible in screenshot
- [ ] 75. (NEW v4) Popup is max-w-[480px] centered — NOT full-screen takeover — screenshot confirms sizing
- [ ] 76. (NEW v4) Popup shows ONCE per session: trigger popup, dismiss, trigger exit intent again → popup does NOT reappear. Verified via: check `sessionStorage.getItem('tcp_popup_shown')` in DevTools after dismissal — key exists.
- [ ] 77. (NEW v4) Popup does NOT show on second calculator page visit in same session — navigate to different calculator → popup does NOT reappear

### LeadMagnetPreviewCard
- [ ] 78. (NEW v4) `components/email/lead-magnet-preview.tsx` exists — file comment line 1: `// Designed by Vale v4 — Lead magnet preview card for email capture`
- [ ] 79. (NEW v4) LeadMagnetPreviewCard renders inside EmailCapturePopup — screenshot of popup showing preview card with thumbnail (80x60), title, item count, "FREE" badge — ALL visible

### AffiliateDisclosure
- [ ] 80. (NEW v4) `components/affiliate/affiliate-disclosure.tsx` exists — file comment line 1: `// Designed by Vale v4 — FTC-compliant affiliate disclosure banner`
- [ ] 81. (NEW v4) AffiliateDisclosure banner renders on guide pages with `hasAffiliateLinks: true` — screenshot of guide page showing gray disclosure bar BELOW breadcrumb, ABOVE article H1
- [ ] 82. (NEW v4) AffiliateDisclosure has: Info icon (Lucide), disclosure text, "Learn more" link — ALL visible and readable — screenshot
- [ ] 83. (NEW v4) AffiliateDisclosure renders at TOP of Tools/Resources page — screenshot of Tools page top showing disclosure banner before any tool cards
- [ ] 84. (NEW v4) AffiliateDisclosure does NOT render on pages without affiliate content (homepage, Start Here, 404) — verify by checking these pages for the gray disclosure bar — it should be absent

---

## Guide Article Pages

- [ ] 85. shadcn Breadcrumb renders above article header with correct path (Home > Guides > Category > Title)
- [ ] 86. Article H1 renders at Manrope 800, 48px desktop — not generic body text weight
- [ ] 87. Hero image renders for EVERY guide: `public/images/guides/hero-{slug}.webp` at 1200x630
- [ ] 88. Every guide has a UNIQUE hero image — not the same image reused across guides
- [ ] 89. Hero images load with `priority` and `loading="eager"` (above fold)
- [ ] 90. At least 3 inline images per article between sections — `public/images/guides/guide-inline-{slug}-{n}.webp` at 800x600
- [ ] 91. All inline images have descriptive alt text (not "image" or filename)
- [ ] 92. All below-fold images use `loading="lazy"`
- [ ] 93. Prose styles applied: Manrope body, correct heading weights, link colors, code styling
- [ ] 94. Comparison tables: `overflow-x-auto` wrapper + sticky first column on mobile — no horizontal scroll issues at 375px
- [ ] 95. Callout boxes (info/warning/tip) render with left border, correct background tint, Lucide icon
- [ ] 96. Sidebar Table of Contents visible on desktop (hidden on mobile)
- [ ] 97. shadcn ScrollArea wrapping ToC links
- [ ] 98. Sidebar sticky behavior: ToC scrolls with user, highlights active section
- [ ] 99. Related guides section at article footer: 3 cards with thumbnails
- [ ] 100. [WCAG] Article body text: Manrope 400 at minimum 16px, line-height 1.75 — verify readable at 375px mobile
- [ ] 101. (NEW v4) AffiliateDisclosure banner appears on guide pages with affiliate content — ABOVE article H1, BELOW breadcrumb — screenshot confirms
- [ ] 102. (NEW v4) AffiliateRecommendationCard (inline) appears in at least 3 different guide articles — screenshot of each showing card within prose
- [ ] 103. (NEW v4) EmailCaptureInline appears in at least 3 different guide articles — screenshot of each showing inline form
- [ ] 104. (NEW v4) NO Pro badges, NO upgrade prompts, NO locked content indicators on ANY guide page — screenshot of each guide page confirms absence

---

## Calculator Pages

- [ ] 105. Calculator hero image renders at top: `public/images/calculators/hero-{slug}.webp` at 1200x630
- [ ] 106. Each calculator has a UNIQUE hero — not recycled from guides or other calculators
- [ ] 107. 21st.dev pricing slider adapted for calculator input — source URL visited: https://21st.dev/r/radu-activation-popescu/pricing-slider-loops — code in `components/sections/calculator-panel.tsx` — source URL documented
- [ ] 108. shadcn Slider installed: `npx shadcn@latest add slider` — input sliders render and function
- [ ] 109. Calculator result number renders in JetBrains Mono 700, 48px, text-brand-primary (#F4A261)
- [ ] 110. Magic UI Number Ticker on calculator result — number animates when value changes
- [ ] 111. "What affects your results?" section renders below calculator with 3 explanation cards and guide links
- [ ] 112. (NEW v4) ALL calculator features are UNLOCKED and fully visible — zero blurred sections, zero locked inputs, zero "upgrade to see results" prompts — screenshot of calculator at results state confirms
- [ ] 113. shadcn Accordion for calculator FAQ — 5-7 FAQs render and expand correctly
- [ ] 114. unDraw illustration renders inline: `public/images/illustrations/calculator-results.min.svg` — color is orange (#F4A261), NOT purple (#6C63FF)
- [ ] 115. (NEW v4) Calculator results section has EmailCaptureInline: headline "Get a detailed breakdown emailed to you" visible below result number — screenshot of calculator at results state
- [ ] 116. (NEW v4) Share buttons visible below calculator results: "Share2" or Twitter icon + "Copy link" button — screenshot confirms buttons render
- [ ] 117. (NEW v4) Share button opens pre-filled tweet when clicked — verify: clicking Twitter share button opens twitter.com/intent/tweet with pre-filled text — screenshot of share intent page
- [ ] 118. (NEW v4) Copy link button copies URL and shows "Copied!" confirmation for 2 seconds — verify by clicking: confirm URL in clipboard, confirm visual feedback
- [ ] 119. (NEW v4) AffiliateRecommendationCard (inline or grid) appears below share buttons on calculator results — screenshot confirms card visible when results are shown
- [ ] 120. (NEW v4) "100% Free • No signup required" badge renders near calculator H1 — screenshot confirms
- [ ] 121. (NEW v4) EmailCapturePopup fires on calculator page exit intent — screenshot of popup appearing on calculator page
- [ ] 122. (NEW v4) Popup shows ONCE per session on calculator pages — second trigger in same session does NOT show popup

---

## Tools/Resources Page — Full Verification (NEW v4)

- [ ] 123. (NEW v4) Tools/Resources page accessible at `/tools` — clicking "Tools" in nav navigates correctly — screenshot of nav and resulting page
- [ ] 124. (NEW v4) AffiliateDisclosure banner renders at TOP of page, below nav, before any tool cards — screenshot confirms position
- [ ] 125. (NEW v4) `public/images/tools/hero-tools-resources.webp` (1200x630) renders in page header RIGHT column — max-h-[420px] rounded-2xl — screenshot confirms image loads (not broken)
- [ ] 126. (NEW v4) Page header shows 2-column layout: left (H1 + description + stat row), right (hero illustration) — screenshot at 1280px
- [ ] 127. (NEW v4) shadcn Tabs render with all 7 category labels: Video Editing | Music & Audio | Analytics Tools | Equipment | Design & Graphics | Scheduling | Courses & Learning — screenshot shows all tabs
- [ ] 128. (NEW v4) Clicking each tab shows the correct category section — verify all 7 tabs are functional — screenshot of at least 2 different tab states
- [ ] 129. (NEW v4) AffiliateRecommendationCard grid renders in 3 columns desktop — screenshot at 1280px width
- [ ] 130. (NEW v4) AffiliateRecommendationCard grid renders in 2 columns tablet — screenshot at 768px width
- [ ] 131. (NEW v4) AffiliateRecommendationCard grid renders in 1 column mobile — screenshot at 375px width
- [ ] 132. (NEW v4) Minimum 3 tool cards visible per category — all cards have: logo (48x48), name, review text, "Best for:" badge, CTA button — screenshot of Video Editing category (as example)
- [ ] 133. (NEW v4) Tool logos load without 404 errors — check Network tab: no broken logo images — use Google Favicon API fallback if needed
- [ ] 134. (NEW v4) Email capture section at BOTTOM of Tools page — "Get our monthly creator tools roundup" heading visible, email input and CTA button visible — screenshot

---

## Start Here Page

- [ ] 135. Navigation is REMOVED from Start Here page — no floating navbar, no nav links
- [ ] 136. Only the logo wordmark appears as a header, centered, linking to homepage
- [ ] 137. `landpress-marketing-4.png` renders in Start Here hero (600x400, rounded-2xl, centered)
- [ ] 138. Eligibility checklist renders as shadcn Accordion with expandable items
- [ ] 139. Email capture is the primary CTA — positioned immediately after eligibility checklist
- [ ] 140. Footer on Start Here page is minimal (single-row dark bar) — NOT the full 4-column footer
- [ ] 141. (NEW v4) NO Pro badges or paid tier indicators anywhere on Start Here page — screenshot of full page confirms

---

## 404 Page

- [ ] 142. unDraw page-not-found SVG exists at `public/images/illustrations/page-not-found.min.svg`
- [ ] 143. SVG color is orange (#F4A261), NOT the default purple (#6C63FF) — sed color swap was applied
- [ ] 144. SVG is optimized with svgo — file size under 20KB
- [ ] 145. SVG renders at 400x300 centered on the 404 page
- [ ] 146. This is NOT a placeholder div. NOT a missing image. An actual SVG file is present.
- [ ] 147. Two exit buttons render: "Go Home" (primary, orange) and "Browse Guides" (outline)
- [ ] 148. No full navigation on 404 page

---

## Global / All Pages

- [ ] 149. No emoji icons anywhere in rendered output — Lucide icons only. Screenshot every page and verify.
- [ ] 150. All pages responsive at 375px — no horizontal scroll, no content cut off, no overlapping elements
- [ ] 151. All pages responsive at 768px — tablet layout correct (2-column where specified)
- [ ] 152. All pages responsive at 1280px — desktop layout correct, no excessive whitespace
- [ ] 153. Touch targets at 375px: all buttons and links >= 44px tall (WCAG requirement)
- [ ] 154. Footer renders on all pages (except Start Here and 404) with 4 columns desktop, 2 columns tablet, 1 column mobile
- [ ] 155. Footer background is `bg-brand-ink` (#111827) — dark
- [ ] 156. (NEW v4) Footer bottom bar includes "All tools and guides are 100% free." center text — screenshot confirms
- [ ] 157. (NEW v4) Footer bottom includes affiliate disclosure text linking to /affiliate-disclosure — screenshot confirms
- [ ] 158. [WCAG] Run axe-core on homepage, 1 guide page, 1 calculator page, Tools/Resources page — zero critical violations
- [ ] 159. OG image route exists at `app/og/route.tsx` — visiting `/og?title=Test+Title` renders a 1200x630 image with dark ink background and orange accent
- [ ] 160. All page metadata includes `openGraph.images` pointing to `/og?title=...`
- [ ] 161. Lighthouse Performance >= 85 on homepage (run `npx lighthouse http://localhost:3000 --output=json`)
- [ ] 162. Lighthouse SEO >= 95 on homepage
- [ ] 163. Lighthouse Accessibility >= 90 on homepage
- [ ] 164. Lighthouse Best Practices >= 90 on homepage
- [ ] 165. Run Lighthouse on 1 guide page — same thresholds
- [ ] 166. Run Lighthouse on 1 calculator page — same thresholds
- [ ] 167. (NEW v4) Run Lighthouse on Tools/Resources page — same thresholds
- [ ] 168. CLS (Cumulative Layout Shift) < 0.1 — all images have explicit width/height attributes

---

## No Pro/Pricing Audit — Full Site (NEW v4)

**Run this audit on every page type before submitting for review. Zero tolerance.**

- [ ] 169. Homepage: search rendered HTML for "Pro", "Premium", "Upgrade", "Pricing", "Membership", "$" (with context) — zero instances — DevTools > Ctrl+F confirms
- [ ] 170. Guide article page: same audit — zero Pro/pricing language — screenshot of full page
- [ ] 171. Calculator page: same audit — zero locked features, zero upgrade prompts — screenshot of calculator at results state (all results fully visible)
- [ ] 172. Tools/Resources page: same audit — zero "unlock with Pro" language — screenshot
- [ ] 173. Start Here page: same audit — screenshot
- [ ] 174. 404 page: same audit — screenshot
- [ ] 175. Navigation (all breakpoints): no Pricing link, no Pro badge — screenshot at 375px and 1280px

---

## Image Completeness Check

- [ ] 176. `public/images/brand/landpress-marketing-hero.png` — exists, loads in browser, not broken
- [ ] 177. `public/images/brand/landpress-marketing-2.png` — exists, loads in browser
- [ ] 178. `public/images/brand/landpress-marketing-3.png` — exists, loads in browser
- [ ] 179. `public/images/brand/landpress-marketing-4.png` — exists, loads in browser
- [ ] 180. (NEW v4) `public/images/brand/email-capture-illustration.webp` — exists, loads in browser, renders in homepage email section — screenshot confirms
- [ ] 181. `public/images/homepage-explainer.webp` — generated, exists, loads in browser
- [ ] 182. `public/images/calculators/hero-earnings.webp` — generated, exists
- [ ] 183. `public/images/calculators/hero-rpm.webp` — generated, exists
- [ ] 184. `public/images/calculators/hero-follower.webp` — generated, exists
- [ ] 185. (NEW v4) `public/images/tools/hero-tools-resources.webp` — generated, exists, loads in Tools/Resources page header right column — screenshot confirms
- [ ] 186. All 57 guide hero images exist at `public/images/guides/hero-{slug}.webp` — each is unique
- [ ] 187. All 57 guide thumbnails exist at `public/images/guides/thumb-{slug}.webp` — 400x300
- [ ] 188. `public/images/illustrations/page-not-found.min.svg` — exists, is orange not purple
- [ ] 189. `public/images/illustrations/calculator-results.min.svg` — exists, is orange not purple
- [ ] 190. (NEW v4) Tool logos exist or fallback to Google Favicon API — at least 3 tool logos load without 404 in Network tab on Tools page — screenshot of Network tab showing successful logo loads

---

## Component Source Documentation

Each installed component must have the source URL or designer credit documented in a comment at the top of the file.

- [ ] 191. `components/aceternity/floating-navbar.tsx` — first line comment: `// Source: https://ui.aceternity.com/components/floating-navbar`
- [ ] 192. `components/aceternity/spotlight.tsx` — first line comment: `// Source: https://ui.aceternity.com/components/spotlight`
- [ ] 193. `components/sections/guide-cards.tsx` — first line comment: `// Source: https://21st.dev/r/sumonadotwork/blog-cards`
- [ ] 194. `components/sections/email-capture.tsx` — first line comment: `// Source: https://21st.dev/r/ruixenui/newsletter-form`
- [ ] 195. `components/sections/calculator-panel.tsx` — first line comment: `// Source: https://21st.dev/r/radu-activation-popescu/pricing-slider-loops`
- [ ] 196. (NEW v4) `components/affiliate/affiliate-card-inline.tsx` — first line comment: `// Designed by Vale v4 — Editorial affiliate card, inline guide variant`
- [ ] 197. (NEW v4) `components/affiliate/affiliate-card-grid.tsx` — first line comment: `// Designed by Vale v4 — Editorial affiliate card, grid/tools page variant`
- [ ] 198. (NEW v4) `components/email/email-capture-inline.tsx` — first line comment: `// Designed by Vale v4 — Inline email capture for guide content`
- [ ] 199. (NEW v4) `components/email/email-capture-popup.tsx` — first line comment: `// Designed by Vale v4 — Exit intent popup, calculator pages only`
- [ ] 200. (NEW v4) `components/email/lead-magnet-preview.tsx` — first line comment: `// Designed by Vale v4 — Lead magnet preview card for email capture`
- [ ] 201. (NEW v4) `components/affiliate/affiliate-disclosure.tsx` — first line comment: `// Designed by Vale v4 — FTC-compliant affiliate disclosure banner`

---

## Pre-Delivery Final Check (Devan runs before any Bernard submission)

- [ ] 202. Dev server runs without errors: `npm run dev` — zero console errors
- [ ] 203. Build succeeds: `npm run build` — zero build errors
- [ ] 204. Desktop screenshot taken at 1280px: `npx playwright screenshot http://localhost:3000 --viewport-width=1280 --viewport-height=900 -o review-desktop.png`
- [ ] 205. Mobile screenshot taken at 375px: `npx playwright screenshot http://localhost:3000 --viewport-width=375 --viewport-height=812 -o review-mobile.png`
- [ ] 206. Full-page screenshot taken: `npx playwright screenshot http://localhost:3000 --viewport-width=1280 --full-page -o review-full.png`
- [ ] 207. (NEW v4) Tools/Resources page screenshot: `npx playwright screenshot http://localhost:3000/tools --viewport-width=1280 --full-page -o review-tools-full.png`
- [ ] 208. (NEW v4) Guide page screenshot (with affiliate card visible): `npx playwright screenshot http://localhost:3000/guides/[any-guide-with-affiliates] --viewport-width=1280 --full-page -o review-guide-full.png`
- [ ] 209. (NEW v4) Calculator page screenshot (with results visible): fill in calculator inputs → take screenshot showing results section with email capture + share buttons + affiliate card
- [ ] 210. Screenshots visually reviewed by Devan before submitting — if anything looks broken, fix it first — NEVER submit broken screenshots for Bernard review
- [ ] 211. IMPLEMENTATION_CHECKLIST.md submitted alongside screenshots — every checked item has been manually verified

**Total items: 211**

Bernard's review gate: Devan submits screenshots + checklist. Bernard walks every checked item visually. Items that are checked but visually wrong = immediate REVISION NEEDED. No exceptions.

**Bernard's v4 focus areas at G2:** New component renders (items 54–84), Tools page (123–134), calculator results section (115–122), no-Pro audit (169–175), image completeness for new images (180, 185, 190).
