# TikTok Creativity Program

A Next.js 14 App Router site for TikTok Creator Rewards guidance, calculators, and monetization strategy.

## Overview

This project delivers a fast, mobile-first content hub with MDX articles, interactive calculators, and an email capture system. It includes SEO tooling, analytics hooks, and affiliate link management.

## Architecture

### Core features

- Next.js 14 App Router + TypeScript
- Tailwind CSS + design tokens
- MDX content system with syntax highlighting
- Responsive mega menu navigation
- Shared component library (article cards, callouts, tables, email forms)
- GA4 + Search Console setup
- Affiliate link redirect system

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run start
```

## Environment variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION=
NEXT_PUBLIC_EARNINGS_TRACKER_URL=
CONVERTKIT_API_KEY=
CONVERTKIT_FORM_ID=
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column layouts)
- **Tablet**: 640px - 1024px (2-3 column layouts)
- **Desktop**: > 1024px (4-5 column layouts)

## 🧩 Key Features

✅ Fully responsive layout
✅ Interactive dropdowns (Knowledge Base, User menu)
✅ Hover states and transitions
✅ Semantic HTML5 structure
✅ Accessible navigation
✅ Clean component separation
✅ Tailwind utility-first CSS
✅ Placeholder images and content

## File structure (key)

```
src/
  app/                # App Router pages, layout, metadata
  components/         # Shared UI and calculator components
  lib/                # MDX, SEO, analytics, affiliate utilities
content/
  guides/             # MDX articles
```

## 🎓 Technical Decisions

### React + Vite
- Fast development with HMR (Hot Module Replacement)
- Optimized production builds
- Modern ES modules

### Tailwind CSS
- Utility-first approach for rapid development
- Consistent spacing and sizing
- Easy responsive design with breakpoint prefixes
- Small production bundle (unused styles purged)

### Component Structure
- Self-contained, reusable components
- Props-based data flow (articles, categories)
- Clean separation of concerns
- Easy to extend and customize

## Deployment

This project is designed for Vercel. Configure staging and production environments with the variables above, then deploy.

## License

Educational and informational use only.
