# Affiliate Activation Checklist

When approved, update the URL in `src/lib/affiliateLinks.ts` for the matching key. Each swap is one line change. Total time: ~5 minutes for all programs.

---

## Priority 1: Apply Now (Easy Approval)

### 1. Later
- **Apply:** https://later.com/affiliate-program/
- **Network:** PartnerStack
- **Commission:** 30% for 1 year
- **Key in affiliateLinks.ts:** `later`
- **Guides using this link:**
  - best-analytics-tools-tiktok (analytics review)
  - best-scheduling-apps-tiktok (scheduling review)
  - best-tiktok-tools-2026 (tools roundup)
  - resources-page-copy (resources page x2)

### 2. Kit (ConvertKit)
- **Apply:** https://kit.com/affiliate
- **Network:** Direct
- **Commission:** 50% first 12 months, then 10-20% recurring
- **Key in affiliateLinks.ts:** `kit`
- **Guides using this link:**
  - ultimate-educators-guide
  - ultimate-beauty-guide
  - ultimate-fitness-guide
  - ultimate-coaches-guide
  - monetize-beauty
  - monetize-musician
  - monetize-comedians
  - monetize-fitness
  - monetize-travel
  - coaching-consulting-offers

### 3. Buffer
- **Apply:** https://buffer.com/partners
- **Network:** Direct
- **Commission:** 25% monthly for 12 months
- **Key in affiliateLinks.ts:** `buffer`
- **Guides using this link:**
  - best-scheduling-apps-tiktok
  - best-tiktok-tools-2026
  - resources-page-copy

### 4. Filmora (Wondershare)
- **Apply:** https://filmora.wondershare.com/filmora-affiliate-program.html
- **Network:** ShareASale or CJ (Impact denied us)
- **Commission:** 30-50% tiered by volume
- **Key in affiliateLinks.ts:** `filmora`
- **Guides using this link:**
  - ultimate-music-guide
  - ultimate-beauty-guide
  - monetize-beauty
  - monetize-musician
  - monetize-comedians
  - resources-page-copy
  - roundup-template (example)

### 5. Kajabi
- **Apply:** https://kajabi.com/partnerprogram
- **Network:** Direct
- **Commission:** Up to $399 one-time + up to 20% recurring
- **Key in affiliateLinks.ts:** `kajabi`
- **Guides using this link:** (not yet referenced in guides -- add to coaching/course guides when approved)

### 6. Gumroad
- **Apply:** https://help.gumroad.com/article/249-affiliate-faq
- **Network:** Direct
- **Commission:** 10% platform referrals
- **Key in affiliateLinks.ts:** `gumroad`
- **Guides using this link:** (not yet referenced in guides -- add to digital products guides when approved)

---

## Priority 2: Apply Soon (Manual Review)

### 7. Stan Store
- **Apply:** Via Stan Store account (requires active subscription)
- **Network:** Direct
- **Commission:** 20% recurring
- **Key in affiliateLinks.ts:** `stan-store`
- **Guides using this link:**
  - tools page (tools/page.tsx)

### 8. Epidemic Sound
- **Apply:** https://www.epidemicsound.com/community-program/
- **Network:** Direct (3-tier: Referrer > Ambassador > Brand Ambassador)
- **Commission:** Subscription discounts initially, 50/50 revenue split at Ambassador (12 referrals)
- **Key in affiliateLinks.ts:** `epidemic-sound`
- **Guides using this link:**
  - ultimate-music-guide
  - monetize-musician
  - monetize-travel
  - resources-page-copy

---

## Priority 3: Apply After Traffic

### 9. Artlist
- **Apply:** https://artlist.io/lp/ambassador-program/
- **Network:** Direct
- **Commission:** $30 per signup
- **Key in affiliateLinks.ts:** `artlist`
- **Guides using this link:**
  - ultimate-music-guide
  - monetize-musician
  - monetize-travel
  - resources-page-copy

### 10. Descript
- **Apply:** Check https://www.descript.com for partner/affiliate program
- **Network:** Unknown
- **Commission:** Unknown
- **Key in affiliateLinks.ts:** `descript`
- **Guides using this link:** (entry exists but not yet referenced in guides)

---

## No Affiliate Program Available

These tools are in affiliateLinks.ts as direct links. No action needed unless a program opens.

| Tool | Key | Reason |
|------|-----|--------|
| CapCut Pro | `capcut-pro` | No affiliate program exists |
| DaVinci Resolve | `davinci-resolve` | Free software, no program |
| Canva | `canva` | Canvassador program currently CLOSED |
| Sprout Social | `sprout-social` | No confirmed program |
| Linktree Pro | `linktree-pro` | No confirmed program |
| OBS Studio | `obs-studio` | Free/open-source |
| OpusClip | `opusclip` | No confirmed program |
| Vizard | `vizard` | No confirmed program |
| Submagic | `submagic` | No confirmed program |
| Kapwing | `kapwing` | No confirmed program |
| Pictory | `pictory` | No confirmed program |
| Klap | `klap` | No confirmed program |
| Fillout | `fillout` | No confirmed program |

---

## How to Activate a Link

1. Get approved and copy your affiliate URL
2. Open `src/lib/affiliateLinks.ts`
3. Find the key (e.g., `later`)
4. Replace the direct URL with your affiliate URL
5. Push to git -- Vercel auto-deploys
6. All guides referencing that slug update automatically
