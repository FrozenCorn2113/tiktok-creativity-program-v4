# Affiliate Tracking

Master tracker for all affiliate programs. Updated 2026-03-24.

See also: `research/affiliate-activation-checklist.md` for application links and approval steps.

---

## Active Affiliate Links (earning commissions)

| Program | Affiliate URL | Commission | Status | Key in affiliateLinks.ts | # Guides Using | Notes |
|---------|--------------|------------|--------|--------------------------|----------------|-------|
| Kit (ConvertKit) | https://partners.kit.com/o474ub5e1gtu | 50% recurring 12 months | Active | `kit` | 20 | LIVE on site. Bronze tier (10+ customers) = ongoing beyond year 1 |
| Amazon Associates | tag `tiktokcreatpr-20` | ~4-8% product category | Active | `amazonRingLight`, `amazonMic`, `ring-light`, `microphone`, `tripod`, + 20 product ASINs | 18 | LIVE on site. Ring lights, mics, tripods, cameras guides |
| Fillout | https://try.fillout.com/tik-tok-creativity-program-zbzs | TBD | Active | `fillout` | 2 | LIVE on site (coaches guide, coaching-consulting-offers) |
| Wispr Flow | https://ref.wisprflow.ai/tik-tok-creativity-program | TBD | Active | `wispr-flow` | 1 | LIVE on site (best-ai-creative-tools guide) |
| Buffer | https://join.buffer.com/tik-tok-creativity-program | 25% monthly for 12 months | Active | `buffer` | 4 | LIVE on site (scheduling apps, tools roundup, resources page, AI tools) |
| Interact | https://get.tryinteract.com/tik-tok-creativity-program | TBD | Active | `interact` | 0 | Not yet on site. Quiz builder -- add to lead gen / coaching guides |

---

## Pending Approval (TODO placeholders in code)

| Program | Affiliate URL | Commission | Status | Key in affiliateLinks.ts | # Guides Using | Notes |
|---------|--------------|------------|--------|--------------------------|----------------|-------|
| Later | direct link (TODO) | 30% for 1 year | Pending | `later` | 5 | PartnerStack. Apply: https://later.com/affiliate-program/ |
| Filmora | direct link (TODO) | 30-50% tiered | Pending | `filmora` | 12 | ShareASale or CJ. Apply: https://filmora.wondershare.com/filmora-affiliate-program.html |
| Kajabi | direct link (TODO) | up to $399 + 20% recurring | Pending | `kajabi` | 0 | Not yet referenced in guides. Apply: https://kajabi.com/partnerprogram |
| Gumroad | direct link (TODO) | 10% platform referrals | Pending | `gumroad` | 0 | Not yet referenced in guides. Apply: https://help.gumroad.com/article/249-affiliate-faq |
| Stan Store | direct link (TODO) | 20% recurring | Pending | `stan-store` | 0 | Requires active subscription. Tools page only |
| Epidemic Sound | direct link (TODO) | 50/50 at Ambassador tier | Pending | `epidemic-sound` | 0 | 3-tier system. Apply: https://www.epidemicsound.com/community-program/ |
| Artlist | direct link (TODO) | $30 per signup | Pending | `artlist` | 0 | Selective, 60-day review. Apply: https://artlist.io/lp/ambassador-program/ |
| Descript | direct link (TODO) | Unknown | Pending | `descript` | 0 | Check for partner program |

---

## No Affiliate Program Available

| Program | Key in affiliateLinks.ts | Notes |
|---------|--------------------------|-------|
| Canva | `canva` | Canvassador program CLOSED |
| Canva Pro | `canva-pro` | Currently CLOSED |
| CapCut Pro | `capcut-pro` | No program exists |
| DaVinci Resolve | `davinci-resolve` | Free software |
| Sprout Social | `sprout-social` | No confirmed program |
| Linktree Pro | `linktree-pro` | No confirmed program |
| OBS Studio | `obs-studio` | Free/open-source |
| OpusClip | `opusclip` | No confirmed program |
| Vizard | `vizard` | No confirmed program |
| Submagic | `submagic` | No confirmed program |
| Kapwing | `kapwing` | No confirmed program |
| Pictory | `pictory` | No confirmed program |
| Klap | `klap` | No confirmed program |
| Skillshare | `skillshare` | No confirmed program |
| Adobe CC | `adobe-cc` | Impact.com denied us |

---

## Non-Affiliate Links (direct traffic, no commission)

| Program | Key in affiliateLinks.ts | Notes |
|---------|--------------------------|-------|
| Mavely | `mavely` | Direct link, no affiliate |
| Fiverr | `fiverr` | Direct link, no affiliate |
| Elgato Stream Deck | `elgato-stream-deck` | Hardware, no program (use Amazon) |

---

## Revenue Priority

Top earners by commission potential (active links):
1. **Kit** -- 50% recurring x 20 guides = highest volume opportunity
2. **Amazon Associates** -- 18 guides with product links, consistent passive income
3. **Buffer** -- 25% recurring x 4 guides, room to add to more scheduling content
4. **Fillout** -- 2 guides, commission TBD
5. **Wispr Flow** -- 1 guide, commission TBD

Next to activate (highest impact pending):
1. **Later** -- 30% for 1 year, already in 5 guides
2. **Filmora** -- 30-50% tiered, already in 12 guides (highest guide count of any pending)
3. **Epidemic Sound** -- referenced in multiple music/travel guides in checklist

---

## How It Works

All affiliate links route through `/go/[slug]` which looks up the URL in `src/lib/affiliateLinks.ts`. To activate a new affiliate:

1. Get approved and copy the affiliate URL
2. Update the URL in `affiliateLinks.ts` for that key
3. Push to git -- Vercel auto-deploys
4. All guides using that slug update automatically
