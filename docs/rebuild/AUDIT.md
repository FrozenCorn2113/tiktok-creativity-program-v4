# Codebase Audit
> Branch: `rebuild/audit-and-stabilize` | Date: 2026-03-02

---

## A) Project Snapshot

**TikTok Creativity Program** — a content-marketing / SEO site for TikTok creators seeking monetization guidance. Revenue model: ConvertKit email list + affiliate commissions (Amazon, Canva, Fiverr, Mavely) + future premium newsletter/digital products (not yet live).

Stack: **Next.js 14 App Router + TypeScript + Tailwind CSS + MDX** hosted on Vercel.

The build passes (`npm run build` ✓) and TypeScript is error-free (`tsc --noEmit` ✓), but significant structural debt exists from a mid-migration state between a Vite SPA prototype and the current Next.js app.

---

## B) Architecture Map

```
/
├── content/guides/          # 57 MDX articles (the real content)
├── src/
│   ├── app/                 # [ACTIVE] Next.js 14 App Router
│   │   ├── layout.tsx       # Root layout: Navbar, Footer, GA4, OG metadata
│   │   ├── page.tsx         # Home page
│   │   ├── api/email/       # POST → ConvertKit subscribe
│   │   ├── go/[slug]/       # GET → affiliate redirect
│   │   ├── guides/[slug]/   # SSG guide pages from MDX
│   │   ├── calculators/     # Earnings, RPM, Follower Income calculators
│   │   ├── products/        # 3x placeholder product pages
│   │   ├── resources/       # 5x resource landing pages (placeholders)
│   │   ├── niche/[slug]/    # 4 niche pages (musicians, teachers, etc.)
│   │   ├── locations/[slug] # UK, Canada, Australia pages
│   │   └── robots.ts, sitemap.ts
│   ├── components/          # [MIXED] .tsx = active, .jsx = dead Vite remnants
│   │   ├── *.tsx            # Active Next.js components
│   │   ├── *.jsx            # Dead Vite-era components (react-router-dom imports)
│   │   └── ui/              # Also has .jsx/.tsx duplicates
│   ├── lib/
│   │   ├── mdx.ts           # Guide loading, ToC extraction, category mapping
│   │   ├── seo.ts           # buildMetadata() helper
│   │   ├── site.ts          # siteConfig + navigation config
│   │   ├── affiliateLinks.ts
│   │   └── analytics.ts     # gtag wrapper
│   ├── pages/               # [DEAD] Vite-era page components
│   ├── App.jsx              # [DEAD] Vite root
│   ├── main.jsx             # [DEAD] Vite entry
│   └── styles/              # tokens.css + global.css (imported by globals.css)
├── index.html               # [DEAD] Vite entry HTML
├── main.js                  # [DEAD] unknown
├── styles.css               # [DEAD] root-level CSS artifact
├── vite.config.js           # [DEAD] Vite config
└── dist/                    # [DEAD] Vite build output
```

**Key API surface:**
- `POST /api/email` — ConvertKit subscription (no rate limit, no server-side email validation)
- `GET /go/[slug]` — affiliate redirect (no analytics event, no rate limit)
- `GET /guides/[slug]` — SSG, 57 pre-built pages

---

## C) Known Broken / Fragile Areas

### 1. `source.unsplash.com` is a dead API (HIGH)
**File:** `src/lib/mdx.ts:74`
```ts
image: `https://source.unsplash.com/1600x900/?${query}`
```
`source.unsplash.com` was **shut down in 2023**. Any guide without an explicit `image:` frontmatter field will generate a broken image URL. This affects OG images and article hero images for ~all guides (most don't set `image:`).

### 2. ToC regex is broken (MEDIUM)
**File:** `src/lib/mdx.ts:83`
```ts
const match = /^(#{2,3})\\s+(.*)/.exec(line)
```
The `\\s` in a regex literal means literal `\s` (backslash + s), not whitespace. This regex will **never match any heading**, so the Table of Contents always renders empty. The correct regex is `/^(#{2,3})\s+(.*)/`.

### 3. Dead Vite layer — 20+ dead files (MEDIUM)
`src/App.jsx`, `src/main.jsx`, `src/index.css`, `src/pages/` (7 files), `src/components/*.jsx` (11 files), `src/components/ui/*.jsx` (6 files), plus root `index.html`, `main.js`, `styles.css`, `vite.config.js`, and `dist/`. None are imported by Next.js. They import `react-router-dom` which is not a dependency in package.json. This is pure dead weight creating confusion for any new developer.

### 4. Duplicate components with `.jsx`/`.tsx` pairs (LOW-MEDIUM)
`Navbar`, `Footer`, `Button`, `Badge`, `Container` all exist in both `.jsx` (dead, Vite-era) and `.tsx` (active). Next.js uses the `.tsx` versions. Risk: someone edits the `.jsx` version and wonders why nothing changes.

### 5. `CommentSection` is fake (LOW)
`src/components/CommentSection.tsx` — form submits, clears the textarea, and does nothing else. No API call. Renders on every guide page promising "Comments coming soon."

### 6. Missing `og-default.png` (MEDIUM)
`src/lib/seo.ts:14` references `/og-default.png` as fallback OG image. This file doesn't exist in `/public/`. Social shares without explicit images will have broken preview images.

### 7. `getGuideBySlug` throws on unknown slug (LOW)
**File:** `src/lib/mdx.ts:57` — throws `Error` if slug not found. Since this runs at build time via `generateStaticParams`, it's safe now. But if someone hits a `/guides/bad-slug` URL, Next.js will 500 instead of 404.

### 8. ~~`creator-rewards-2026` guide missing~~ — FINDING INCORRECT
`content/guides/creator-rewards-2025.mdx` has `slug: "creator-rewards-2026"` in frontmatter. The MDX loader resolves by slug, not filename. `/guides/creator-rewards-2026` works correctly. The filename is just stale — not a bug.

---

## D) Security Findings

### D1. No server-side email validation (LOW-MEDIUM)
`src/app/api/email/route.ts` — only checks `if (!email)`. No format validation, no length limit. Accepts `"<script>alert(1)</script>"` as an email. ConvertKit will reject it but the server logs garbage.

### D2. No rate limiting on `/api/email` (MEDIUM)
The email subscribe endpoint has no rate limit. A bot can spam it thousands of times/minute. ConvertKit has its own limits but this will generate noisy failed requests and potential abuse.

### D3. ConvertKit API key sent in request body to external API (INFO)
`api_key` is passed in the JSON body to ConvertKit's v3 API — this is ConvertKit's documented approach for v3, so it's correct. Not a vulnerability, just worth noting; their v4 API uses Bearer tokens which is preferred.

### D4. No `Content-Security-Policy` headers (LOW)
No CSP, no `X-Frame-Options`, no `X-Content-Type-Options`. Vercel adds some defaults, but the `next.config.mjs` sets none.

### D5. No `.env.local` committed — good (INFO)
No secrets in the repo. The `.gitignore` now covers `.env*`. ConvertKit keys are server-side only (`CONVERTKIT_API_KEY`, not prefixed `NEXT_PUBLIC_`). Clean.

---

## E) Quality Gaps

| Gap | Severity | Location |
|-----|----------|----------|
| Zero test files | High | entire project |
| No ESLint config file | Medium | `.eslintrc` missing despite package installed |
| `tsconfig.json strict: false` | Medium | strictNullChecks on, but strict mode off = many silent any types |
| No `prettier.config.js` | Low | prettier in deps but unconfigured |
| JSX components with no types | Low | `src/components/*.jsx`, `src/pages/*.jsx` |
| `image` domain not configured in `next.config.mjs` | Low | Remote images will fail `<Image />` optimization |

---

## F) Quick Wins vs Deep Fixes

### Quick Wins (< 1 hour each)
1. Fix the ToC regex (`\\s` → `\s`) — 1 line
2. Add `.eslintrc.json` — 10 lines
3. Add `og-default.png` to `/public/` (or use a placeholder SVG)
4. Add `creator-rewards-2026.mdx` (copy/rename from 2025 file) OR update all links to point to 2025 slug
5. Add `"lint"` and `"typecheck"` to CI scripts in `package.json`
6. Hide or remove `CommentSection` from guide pages

### Deep Fixes (multi-hour)
1. Delete all dead Vite layer files (App.jsx, main.jsx, pages/, *.jsx components) — requires audit that nothing imports them
2. Replace `source.unsplash.com` with real OG images or a generative placeholder service
3. Add rate limiting to `/api/email` (Upstash Redis or `@vercel/kv`)
4. Add input validation library (zod) to the email API
5. Add `getGuideBySlug` 404 handling via `notFound()`
6. Add tests for the email API and MDX loading

---

## G) Do Not Break List

These are working and valuable — preserve them exactly:

1. **`POST /api/email` → ConvertKit** — the primary conversion path
2. **`GET /go/[slug]` affiliate redirects** — revenue-generating
3. **MDX guide rendering** — 57 pages SSG at build time, core content
4. **`generateStaticParams` + `generateMetadata`** — SEO-critical
5. **`src/styles/tokens.css`** — design token system; changing these breaks layout globally
6. **`src/lib/site.ts` navigation config** — Navbar and Footer both consume it
7. **`sitemap.ts` + `robots.ts`** — SEO; must keep generating correctly
8. **GA4 integration** — analytics tracking is live (when `NEXT_PUBLIC_GA_ID` is set)
9. **Vercel deployment config** (`vercel.json`) — minimal but correct
