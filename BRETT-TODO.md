# TCP Launch — Brett's Action Checklist

**Timeline:** ~1-2 hours spread across 2 days
**Status:** Ready to execute
**Email for all signups:** theyellowbirdcompany@gmail.com

---

## 1. Domain & DNS

- [ ] **Transfer or confirm domain ownership** — tiktokcreativityprogram.com (5 min)
  - Where: Namecheap, Cloudflare, or Google Domains
  - If already purchased: skip this

- [ ] **Point DNS to Vercel** (15 min)
  - Where: Your domain registrar's DNS settings
  - Vercel will provide exact A record + CNAME records when you add the domain to the project
  - Bernard will send the exact records once Devan creates the Vercel project

---

## 2. Affiliate Signups — Do Now (Before Site is Live)

These can be started before the site goes live. Most allow account creation + later review.

### Impact (Unlocks 4+ Programs)
- [ ] **Create Impact account** (15 min)
  - URL: https://impact.com/partners/affiliate-partners/ → Click "Get started today"
  - Form info: First name, last name, email, password, company (The Yellow Bird Company), country (Canada), phone, website (tiktokcreativityprogram.com), description (Free guides and calculators for TikTok creators monetizing through Creator Rewards Program), monthly traffic estimate, payment (PayPal)
  - After account is created, complete W-8BEN form (Canadian address + SIN required for tax treaty 0% withholding)
  - **Then apply to these 4 programs:**
    - [ ] Skillshare: https://app.impact.com/campaign-promo-signup/Skillshare.brand (auto-approves)
    - [ ] Canva Pro: https://app.impact.com/campaign-promo-signup/Canva.brand (auto-approves)
    - [ ] Envato Elements: https://app.impact.com/campaign-promo-signup/Envato-Elements.brand (auto-approves)
    - [ ] Envato Placeit: https://app.impact.com/campaign-promo-signup/Envato-Placeit.brand (auto-approves)

### Kit via PartnerStack (Highest Revenue)
- [ ] **Create PartnerStack account + apply to Kit** (15 min)
  - URL: https://dash.partnerstack.com/application?company=kit&group=kitaffiliates
  - Form info: Email, first name, last name, password, website (tiktokcreativityprogram.com), how you plan to promote Kit (tell them the site is an SEO guide site for TikTok creators, you recommend Kit for email list building)
  - Commission: 50% recurring for 12 months. Highest-value program in the stack.
  - Status: Manual review, ~1-5 business days

### Filmora via PartnerStack
- [ ] **Apply to Filmora** (5 min)
  - URL: https://wondershare.partnerstack.com → Click "Join now"
  - Uses your existing PartnerStack account from Kit signup if already created
  - Commission: ~30-40% on subscriptions

### Amazon Associates (Equipment)
- [ ] **Create Amazon Associates account** (10 min)
  - URL: https://affiliate-program.amazon.com/signup
  - Log in with your existing Amazon account (any Amazon account works)
  - Form steps: BC mailing address, phone (for PIN verification), website (tiktokcreativityprogram.com), Associates Store ID (suggest `tcreator-20` or `tiktokcreativity-20`), primary topic (Social Media / Online Communities), products (Electronics, software), traffic source (SEO / organic), monthly visitors estimate
  - Payment: Direct deposit (USD account) or Amazon gift card (easier for Canadian banks)
  - Tax: W-8BEN (Individual, Canadian address, SIN)
  - **Critical:** Must generate 3 qualifying sales within 180 days or account closes

---

## 3. Affiliate Signups — After Site is Live

Wait until tiktokcreativityprogram.com is publicly accessible on Vercel. These networks require a live site review during approval.

### CJ Affiliate (Backup for Artlist)
- [ ] **Create CJ Affiliate account** (15 min)
  - URL: https://signup.cj.com/member/signup/publisher/ or https://public.cj.com/signup/publisher
  - Form info: First name, last name, email, password, company (The Yellow Bird Company), website (tiktokcreativityprogram.com), description (Creator education platform with guides and tool recommendations for TikTok creators), category (Blogs / Online Content / Social Media), monthly visitors, promotion method (SEO / organic content), payment (PayPal), tax (W-8BEN)
  - Status: Manual review, ~1-3 business days
  - After approval: Search "Artlist" in CJ marketplace and apply to that program

### Artlist (Direct)
- [ ] **Apply to Artlist directly** (5 min)
  - URL: https://artlist.io/affiliates
  - If that page redirects to CJ: Complete CJ signup first (above), then apply to Artlist through CJ marketplace
  - If it loads directly: Fill out form with email, website, description, social profiles
  - Status: Manual review, ~5-10 business days

### Partnerize / Adobe (Selective)
- [ ] **Create Partnerize account + apply to Adobe** (15 min)
  - URL: https://join.partnerize.com/adobe/en or https://signup.partnerize.com/signup/en/adobe
  - Form info: Full name, email, company (The Yellow Bird Company), website (tiktokcreativityprogram.com), description (Creator education site with tool guides and recommendations for TikTok creators, including video editing and design tools), country (Canada), phone, promotion methods (Organic SEO content, tool comparison guides), payment (PayPal or bank transfer), tax (W-8BEN)
  - After account: Separately apply to Adobe's program in the Partnerize dashboard
  - Commission: 85% of first month (monthly plans) or 8.33% (annual)
  - Status: Manual review, ~5-14 business days. Adobe is selective — live site helps.

---

## 4. Email Setup

- [ ] **Approve or choose email provider** (2 min)
  - Recommendation: ConvertKit (free tier, up to 10K subscribers)
  - Alternative: Buttondown ($0 free) or Resend ($0 free, 100 emails/day) + Supabase table
  - **Action:** Email Bernard with approval

- [ ] **Set up custom domain email routing** (15 min)
  - Once DNS is live, configure: hello@tiktokcreativityprogram.com
  - If using Cloudflare: Email routing is free, 100 emails/day per forwarding address
  - If using another provider: Follow their MX record setup
  - Atlas will create the ConvertKit account + forms once you approve

---

## 5. Analytics

- [ ] **Create Plausible Analytics account** (5 min)
  - URL: https://plausible.io/pricing
  - Cost: $9/month (or free self-hosted, but cloud is easier)
  - Setup: Create account, add domain (tiktokcreativityprogram.com), get script tag
  - Share the script tag with Bernard/Devan for integration
  - What it does: Tracks pageviews, traffic overview, user behavior (privacy-friendly, no cookie banner needed)

- [ ] **Create PostHog account** (5 min)
  - URL: https://posthog.com
  - Cost: Free tier (1M events/month)
  - Setup: Create account, create project, get API key
  - Share the API key with Bernard/Devan for integration
  - What it does: Funnels, event tracking (where visitors drop off), conversion tracking

---

## Summary

**Before Deploy (same day):**
- Approve/acquire domain
- Approve email provider
- Create Plausible account + share script tag
- Create PostHog account + share API key
- Start Impact, Kit, Filmora, Amazon Associates signups

**Deploy Day:**
- Configure DNS to point to Vercel
- Share tracking URLs from affiliate signups as they're approved

**After Deploy (within 1 week):**
- Complete CJ, Artlist, Partnerize signups (these require live site)
- Test email capture (submit test email to each form)
- Verify analytics dashboards are receiving data
- Collect affiliate tracking URLs from approved accounts
- Share tracking URLs with Bernard so Devan can update `affiliateLinks.ts`

---

**Questions?** → Brett reaches out to Bernard
**Ready to execute?** → Slack Bernard approval for Phase 0
