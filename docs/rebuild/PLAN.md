# Rebuild Plan
> Branch: `rebuild/audit-and-stabilize` | See AUDIT.md for findings

**Guiding principle:** Stability > Clarity > Growth > Polish. No big-bang rewrites. Every change is a small, reversible commit.

---

## Phase 1 — Stabilize
**Goal:** Build passes, runtime bugs fixed, lint/typecheck enforced, critical link fixed, minimal tests added.

### Objectives
- Every PR CI gate: `typecheck` + `lint` + `build` must pass
- Fix the two highest-severity runtime bugs (broken guide link, broken ToC)
- Add basic server-side validation to the email API
- Establish test infrastructure

### Tasks

| # | Task | Risk | Files |
|---|------|------|-------|
| 1.1 | Add `.eslintrc.json`, `prettier.config.js`, add `lint`/`typecheck`/`format` scripts | Low | `package.json`, `.eslintrc.json`, `prettier.config.js` |
| 1.2 | Fix creator-rewards-2026: add MDX file (copy 2025 with updated slug) OR rename all references | Low | `content/guides/`, `src/lib/site.ts`, `src/components/Navbar.tsx` |
| 1.3 | Fix ToC regex: `\\s` → `\s` | Low | `src/lib/mdx.ts:83` |
| 1.4 | Add 404 handling to `getGuideBySlug` | Low | `src/lib/mdx.ts`, `src/app/guides/[slug]/page.tsx` |
| 1.5 | Add `og-default.png` placeholder to `/public/` | Low | `/public/og-default.png` |
| 1.6 | Replace `source.unsplash.com` with a working placeholder | Low-Med | `src/lib/mdx.ts:74` |
| 1.7 | Add Zod validation to `POST /api/email` | Low | `src/app/api/email/route.ts` |
| 1.8 | Add tests: email API route + MDX loader | Med | `src/__tests__/` |
| 1.9 | Hide `CommentSection` (render null with a feature flag comment) | Low | `src/components/CommentSection.tsx`, guide page |

**Acceptance criteria:**
- `npm run typecheck` exits 0
- `npm run lint` exits 0
- `npm run build` exits 0 (already passing, must stay passing)
- `/guides/creator-rewards-2026` resolves correctly
- Table of Contents renders on guide pages
- `POST /api/email` with invalid email body returns 400

**Rollback strategy:** Each task is a separate commit. `git revert <sha>` is safe for any individual task.

---

## Phase 2 — Restructure
**Goal:** Remove dead code, normalize component patterns, clean up imports.

### Objectives
- Delete all dead Vite-era files
- Resolve `.jsx`/`.tsx` duplicates — all components in `src/components/` become `.tsx`
- Standardize import paths and component structure

### Tasks

| # | Task | Risk | Files |
|---|------|------|-------|
| 2.1 | Delete `src/App.jsx`, `src/main.jsx`, `src/index.css` | Low | 3 files |
| 2.2 | Delete `src/pages/` directory (7 dead JSX page components) | Low | `src/pages/` |
| 2.3 | Audit each `src/components/*.jsx` — confirm no Next.js import, then delete | Low | 11 JSX component files |
| 2.4 | Audit each `src/components/ui/*.jsx` — confirm no Next.js import, then delete | Low | 6 JSX UI files |
| 2.5 | Delete root-level `index.html`, `main.js`, `styles.css`, `vite.config.js`, `dist/` | Low | 5 root files |
| 2.6 | Consolidate CSS: merge `src/index.css` content into `globals.css` if needed, remove orphan | Low | CSS files |
| 2.7 | Add `security headers` to `next.config.mjs` (CSP lite, X-Frame-Options, etc.) | Low | `next.config.mjs` |
| 2.8 | Enable `strict: true` in tsconfig, fix resulting type errors | Med | `tsconfig.json`, any files with type errors |
| 2.9 | Add `images.remotePatterns` to `next.config.mjs` for any external image domains | Low | `next.config.mjs` |

**Acceptance criteria:**
- `src/` contains zero `.jsx` files
- `npm run build` still passes
- `npm run typecheck` still passes (with `strict: true`)
- No `react-router-dom` imports anywhere in `src/`

**Rollback strategy:** Deletes are committed atomically by category. `git revert` or `git checkout <sha> -- <file>` restores any file.

---

## Phase 3 — Productize
**Goal:** SEO polish, content gaps filled, analytics complete, performance optimized, products/resources pages ready.

### Objectives
- All pages have unique, accurate metadata
- Schema markup on guide pages
- Rate limiting on API endpoints
- Products and resources pages converted from placeholders to real landing pages (or gated appropriately)
- Core Web Vitals measured and addressed

### Tasks

| # | Task | Risk | Files |
|---|------|------|-------|
| 3.1 | Add `Article` JSON-LD schema to guide pages | Low | `src/app/guides/[slug]/page.tsx` |
| 3.2 | Add rate limiting to `/api/email` (Upstash or Vercel KV) | Med | `src/app/api/email/route.ts` |
| 3.3 | Audit all static pages for missing/generic metadata | Low | All `src/app/*/page.tsx` |
| 3.4 | Add affiliate redirect analytics event (GA4 + server log) | Low | `src/app/go/[slug]/route.ts` |
| 3.5 | Replace placeholder product pages with real waitlist/early-access pages | Low-Med | `src/app/products/*/page.tsx` |
| 3.6 | Add `<link rel="preconnect">` for Google Fonts in layout | Low | `src/app/layout.tsx` |
| 3.7 | Audit sitemap.ts — ensure all real routes are listed, remove phantom routes | Low | `src/app/sitemap.ts` |
| 3.8 | Replace ConvertKit v3 API with v4 (Bearer auth) when ready | Med | `src/app/api/email/route.ts` |
| 3.9 | Add Zod schemas to all API routes | Low | `src/app/api/` |
| 3.10 | Add E2E test for email signup flow | Med | `tests/` |

**Acceptance criteria:**
- Lighthouse SEO score ≥ 95 on guide pages
- All product pages have a real CTA with working email capture
- Affiliate redirect logs GA4 event
- Rate limit in place on email endpoint
- 0 broken internal links (run `next build` linkcheck)

**Rollback strategy:** Each task is isolated. Phase 3 changes are additive; rollback is git revert per task.

---

## Commit Sequence for Phase 1 Execution

```
commit 1: docs — AUDIT.md, PLAN.md, PROJECT_INTENT.md, .gitignore
commit 2: tooling — .eslintrc.json, prettier.config.js, package.json scripts
commit 3: fix(link) — add creator-rewards-2026.mdx alias guide
commit 4: fix(toc) — correct regex in lib/mdx.ts
commit 5: fix(api) — add zod validation to POST /api/email
commit 6: fix(seo) — add og-default.png, fix unsplash fallback
commit 7: fix(ux) — hide CommentSection, add notFound() to guide slug handler
commit 8: test — add vitest, test email route and MDX loader
```
