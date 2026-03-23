// Tools/Resources Hub — v4 Affiliate + Email Model
// PAGE_SPECS.md PAGE 7 — editorial affiliate hub with category tabs
// CONTENT.md tool data — 25 tools across 7 categories

import type { Metadata } from "next";
import { Wrench, Package, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AffiliateDisclosure } from "@/components/affiliate/affiliate-disclosure";
import { EmailCapture } from "@/components/sections/email-capture";
import { ToolsTabs } from "./ToolsTabs";

export const metadata: Metadata = {
  title: "Tools for TikTok Creators — Reviewed & Recommended",
  description:
    "Every tool on this page has been researched by our team. Honest reviews, affiliate links disclosed. Video editing, analytics, music licensing, and more.",
  openGraph: {
    images: [{ url: `/og?title=${encodeURIComponent("Tools for TikTok Creators")}`, width: 1200, height: 630 }],
  },
};

// Tool data from CONTENT.md
const videoEditingTools = [
  {
    toolName: "CapCut Pro",
    slug: "capcut-pro",
    domain: "capcut.com",
    review:
      "CapCut is already the most popular editing app among TikTok creators — the Pro version adds AI-powered features, expanded cloud storage, and access to a broader template library. If you're already editing in the free version, the upgrade is worth considering once you're consistently posting long-form content. The learning curve is minimal because the interface doesn't change between tiers.",
    bestFor: "Creators who edit on mobile and want to skip the desktop workflow",
    priceRange: "Free • Pro from ~$7.99/mo",
    ctaText: "Try CapCut Pro",
    isEditorsPick: true,
  },
  {
    toolName: "Filmora",
    slug: "filmora",
    domain: "filmora.wondershare.com",
    review:
      "Filmora sits in the middle ground between beginner apps and professional software — capable enough for polished TikTok content, simple enough that you're not learning a new skill every session. The timeline-based editor works well for creators who want more control than CapCut offers without jumping to DaVinci or Premiere. Annual pricing makes it cheaper than a monthly subscription for anyone serious about sticking with it.",
    bestFor: "Creators moving from mobile editing to a desktop workflow for the first time",
    priceRange: "~$40–50/year",
    ctaText: "Try Filmora Free",
    isEditorsPick: false,
  },
  {
    toolName: "DaVinci Resolve",
    slug: "davinci-resolve",
    domain: "blackmagicdesign.com",
    review:
      "DaVinci Resolve's free version is genuinely professional-grade — the same tool used on major film productions, free to download and use indefinitely. The color grading tools are best-in-class. The trade-off is the learning curve: if you're new to desktop editing, expect a few hours before the workflow feels natural. Worth it if you're serious about quality; overkill if you're posting casual content.",
    bestFor: "Creators who want professional color grading and have the patience to learn it",
    priceRange: "Free (Resolve) • ~$300 one-time (Studio)",
    ctaText: "Download Free",
    isEditorsPick: false,
  },
  {
    toolName: "Adobe Premiere Rush",
    slug: "premiere-rush",
    domain: "adobe.com",
    review:
      "Premiere Rush is Adobe's simplified video editor, designed for creators who want Premiere-quality output without the full complexity of the Professional suite. It syncs across devices, which makes starting a video on mobile and finishing on desktop practical. It's included in some Creative Cloud plans, so check before buying separately.",
    bestFor: "Creators already in the Adobe ecosystem who want a lighter editing option",
    priceRange: "~$9.99/mo standalone • included in CC plans",
    ctaText: "Try Adobe Rush",
    isEditorsPick: false,
  },
];

const musicAudioTools = [
  {
    toolName: "Epidemic Sound",
    slug: "epidemic-sound",
    domain: "epidemicsound.com",
    review:
      "Epidemic Sound is the most creator-friendly music licensing service we've found. The personal plan covers TikTok use, and you get access to a large catalog of tracks specifically designed for short-form video — meaning they're structured to hit at the right moments. The catalog skews toward contemporary and trending sounds rather than generic background music. If music licensing is something you've been ignoring, this is the clearest starting point.",
    bestFor: "Creators who post frequently and can't afford to have videos muted after the fact",
    priceRange: "~$9/mo personal plan",
    ctaText: "Try Epidemic Sound",
    isEditorsPick: true,
  },
  {
    toolName: "Artlist",
    slug: "artlist",
    domain: "artlist.io",
    review:
      "Artlist uses an annual subscription model that covers commercial use across platforms, including TikTok. The catalog is smaller than Epidemic Sound but is well-curated — you spend less time searching. One subscription covers music and sound effects, which helps if you're building content that needs both. Better option for creators who want a clean, simple library over the largest possible selection.",
    bestFor: "Creators who prioritize quality over catalog size and prefer annual billing",
    priceRange: "~$100–200/year",
    ctaText: "Explore Artlist",
    isEditorsPick: false,
  },
  {
    toolName: "Envato Elements (Audio)",
    slug: "envato-elements",
    domain: "elements.envato.com",
    review:
      "Envato Elements is a broad creative subscription that includes music, sound effects, stock footage, templates, and graphics. If you already use it for design assets, the audio library is a useful bonus. As a standalone music solution, it's less targeted than Epidemic Sound or Artlist — the catalog is large but takes more time to search through. Best value if you need creative assets across categories.",
    bestFor: "Creators who need music, graphics, and templates under one subscription",
    priceRange: "~$16.50/mo",
    ctaText: "Try Envato Elements",
    isEditorsPick: false,
  },
];

const analyticsTools = [
  {
    toolName: "Exolyt",
    slug: "exolyt",
    domain: "exolyt.com",
    review:
      "Exolyt gives you detailed TikTok analytics with a focus on growth tracking and competitor benchmarking. The free tier offers meaningful data, and paid plans unlock deeper historical analysis and tracking across more accounts. If you're trying to understand how your content compares to similar creators in your niche — particularly for RPM optimization — competitor benchmarking is where Exolyt stands out. Simple interface, doesn't require significant setup time.",
    bestFor: "Creators actively comparing their content performance against similar accounts in their niche",
    priceRange: "Free plan • Paid plans for advanced features",
    ctaText: "Try Exolyt Free",
    isEditorsPick: true,
  },
  {
    toolName: "Pentos",
    slug: "pentos",
    domain: "pentos.co",
    review:
      "Pentos is one of the few analytics tools built specifically for TikTok — it tracks creator performance over time, monitors trends, and gives you access to data that TikTok's native analytics don't surface. Particularly useful if you're trying to understand why your RPM fluctuates: tracking view patterns across multiple accounts or time periods requires a tool like this. Not necessary for new creators, but worth it once you have a consistent posting schedule.",
    bestFor: "Established creators who want to track performance trends and optimize systematically",
    priceRange: "See site for current pricing",
    ctaText: "Try Pentos",
    isEditorsPick: false,
  },
  {
    toolName: "Analisa.io",
    slug: "analisa",
    domain: "analisa.io",
    review:
      "Analisa covers both TikTok and Instagram analytics, which makes it useful if you're posting on both platforms. The audience analysis and hashtag reporting are solid, though the TikTok-specific depth is less detailed than Pentos or Exolyt. Worth trying if you're managing a cross-platform content strategy and want one tool handling both — less compelling if TikTok is your only focus.",
    bestFor: "Creators managing both TikTok and Instagram who want a single analytics view",
    priceRange: "Free reports • Paid plans for full access",
    ctaText: "Try Analisa Free",
    isEditorsPick: false,
  },
];

const equipmentTools = [
  {
    toolName: "Ring Light (Amazon)",
    slug: "ring-light",
    domain: "amazon.com",
    review:
      "A ring light is the single cheapest way to improve video quality. Flat, natural-looking light removes the main reason people skip a video in the first two seconds: a dark or weirdly lit frame. Most affordable ring lights are under $30 and attach to a phone or desk. You don't need a studio — you need consistent, even lighting for the 10-second hook that keeps someone from scrolling past.",
    bestFor: "Creators filming at home who want better lighting without complex setup",
    priceRange: "Typically $20–60 via Amazon",
    ctaText: "Browse Ring Lights on Amazon",
    isEditorsPick: false,
  },
  {
    toolName: "Lavalier Microphone (Amazon)",
    slug: "microphone",
    domain: "amazon.com",
    review:
      "Built-in phone microphones pick up room noise and put the speaker too far from the source. A lavalier (clip-on) mic solves both problems for around $20–30. For creators doing voiceover or talking-head content, the audio upgrade has a larger impact on watch time than any lighting change. Better audio signals production quality even to viewers who can't articulate why — they just watch longer.",
    bestFor: "Creators doing talking-head or voiceover content who want to improve retention",
    priceRange: "Lavalier mics $20–40 • USB desktop mics $50–150",
    ctaText: "Browse Microphones on Amazon",
    isEditorsPick: true,
  },
  {
    toolName: "Phone Tripod (Amazon)",
    slug: "tripod",
    domain: "amazon.com",
    review:
      "Shaky footage reads as low-effort, regardless of content quality. A basic phone tripod gives you stable, hands-free recording, which is necessary for any content longer than a quick clip. Mini tripods and flexible gorilla-grip stands are inexpensive and compact — there's no reason to be holding the phone yourself if you're posting content regularly.",
    bestFor: "Creators filming solo who want stable footage without an extra person on set",
    priceRange: "Typically $15–40 via Amazon",
    ctaText: "Browse Tripods on Amazon",
    isEditorsPick: false,
  },
];

const designTools = [
  {
    toolName: "Canva Pro",
    slug: "canva-pro",
    domain: "canva.com",
    review:
      "Canva Pro is the most practical design tool for creators who aren't designers. The free version is usable; the Pro version adds a larger template library, background removal, brand kit (consistent fonts and colors), and bulk creation tools. If you're creating thumbnails, cover images, or promotional graphics regularly, the Pro upgrade pays for itself in time saved. The template library specifically for TikTok and short-form content is well-stocked.",
    bestFor: "Creators who want professional-looking graphics without design experience",
    priceRange: "~$12–15/mo or ~$120/year",
    ctaText: "Try Canva Pro",
    isEditorsPick: true,
  },
  {
    toolName: "Storyblocks",
    slug: "storyblocks",
    domain: "storyblocks.com",
    review:
      "Storyblocks gives you access to stock video footage, backgrounds, motion graphics, and audio under a single subscription. The video library is particularly strong for B-roll — if your content regularly uses footage to illustrate points rather than just talking-head framing, Storyblocks fills that gap without per-clip licensing fees. Less useful if you're creating entirely original content.",
    bestFor: "Creators who use B-roll, stock footage, or motion graphics backgrounds in their videos",
    priceRange: "~$15–20/mo",
    ctaText: "Try Storyblocks",
    isEditorsPick: false,
  },
  {
    toolName: "Envato Elements (Design)",
    slug: "envato-elements-design",
    domain: "elements.envato.com",
    review:
      "Envato Elements covers a broad range of creative assets — templates, fonts, graphics, presentations, and more. The TikTok template selection is solid and regularly updated. If you need a wide variety of design assets across categories and don't want to pay per-item, the subscription model makes financial sense for creators producing content at volume.",
    bestFor: "High-volume creators who need diverse design assets across multiple formats",
    priceRange: "~$16.50/mo",
    ctaText: "Browse Envato Elements",
    isEditorsPick: false,
  },
];

const creatorPlatformTools = [
  {
    toolName: "Stan Store",
    slug: "stan-store",
    domain: "stan.store",
    review:
      "Stan Store is a simple creator storefront — you get a link-in-bio page that can sell digital products, coaching bookings, or memberships directly. No coding needed, setup is quick, and it integrates with the platforms creators already use. For creators who want to monetize beyond Creator Rewards without building a full website, Stan Store removes most of the technical friction.",
    bestFor: "Creators ready to sell a digital product or coaching offer without building a website",
    priceRange: "Free plan • Paid plans ~$29–99/mo",
    ctaText: "Try Stan Store",
    isEditorsPick: true,
  },
  {
    toolName: "Linktree Pro",
    slug: "linktree-pro",
    domain: "linktr.ee",
    review:
      "Linktree is the most recognized link-in-bio tool, and the Pro version adds analytics, custom domains, affiliate link management, and email capture. The free version covers basic link organization; Pro is worth it if you want to understand where clicks are coming from and capture emails directly from your bio. For Creator Rewards creators who are also building an email list, the email capture feature alone makes the upgrade worth considering.",
    bestFor: "Creators who want analytics and email capture from their bio link",
    priceRange: "Free plan • Pro ~$9/mo",
    ctaText: "Try Linktree Pro",
    isEditorsPick: false,
  },
  {
    toolName: "Mavely",
    slug: "mavely",
    domain: "joinavenly.com",
    review:
      "Mavely is an affiliate marketing platform designed for creators — you share product links and earn commissions when your audience buys. The catalog covers a wide range of brands, and the payout structure is transparent. Worth exploring if you're already mentioning products in your content and not currently monetizing those mentions. Complements Creator Rewards income without requiring a separate audience to build.",
    bestFor: "Creators who regularly mention products and want to earn commissions on those recommendations",
    priceRange: "Free to join • Revenue-share model",
    ctaText: "Join Mavely",
    isEditorsPick: false,
  },
];

const coursesTools = [
  {
    toolName: "Skillshare",
    slug: "skillshare",
    domain: "skillshare.com",
    review:
      "Skillshare has a strong library of short-form video and content creation courses, and the platform structure (short lessons, project-based learning) fits the way creators actually consume educational content. Free trial available. Worth going through specific courses on hook writing, video editing, and TikTok strategy rather than browsing broadly — the platform has a lot of courses and varying quality.",
    bestFor: "Creators who learn by watching and want structured short-form video skills",
    priceRange: "~$15–17/mo or ~$100/year • Free trial",
    ctaText: "Try Skillshare Free",
    isEditorsPick: true,
  },
  {
    toolName: "Udemy (Creator Courses)",
    slug: "udemy",
    domain: "udemy.com",
    review:
      "Udemy operates differently than Skillshare — you buy individual courses outright rather than subscribing. This means you can pick a specific, well-reviewed course on TikTok content strategy and pay once. Prices fluctuate significantly with frequent sales. If you want to learn one specific skill and don't need an ongoing subscription, Udemy's one-time purchase model makes sense.",
    bestFor: "Creators who want to learn one specific skill without a subscription commitment",
    priceRange: "Individual courses $15–200 • Frequent sales",
    ctaText: "Browse Creator Courses on Udemy",
    isEditorsPick: false,
  },
  {
    toolName: "Kit (formerly ConvertKit)",
    slug: "convertkit",
    domain: "kit.com",
    review:
      "Kit is the email marketing platform this site runs on, so we can speak to it directly: the subscriber management, automation, and form builder are well-designed for creators. The free plan supports up to 1,000 subscribers, which is enough to start. For creators building an email list alongside Creator Rewards, Kit is the clearest path — the tag-based subscriber system makes it easy to send different content to different audience segments without getting complicated.",
    bestFor: "Creators who want to build an email list and automate welcome sequences",
    priceRange: "Free up to 1,000 subscribers • Paid from ~$9/mo",
    ctaText: "Try Kit Free",
    isEditorsPick: false,
  },
];

const categories = [
  {
    id: "video-editing",
    label: "Video Editing",
    description:
      "The videos that get qualified views are almost never raw footage. Good editing keeps viewers watching longer, which is the primary factor in whether a view counts as qualified. These are the tools we'd recommend to someone starting or upgrading their editing setup.",
    tools: videoEditingTools,
  },
  {
    id: "music-audio",
    label: "Music & Audio",
    description:
      "Music licensing is one of the most common ways creators accidentally lose qualified views. Using a trending sound isn't the same as having a license — if TikTok removes the audio, those views stop counting. These tools give you a library of licensed tracks you can use without worrying about takedowns.",
    tools: musicAudioTools,
  },
  {
    id: "analytics-tools",
    label: "Analytics Tools",
    description:
      "TikTok's built-in analytics tell you total views and engagement rates. They don't tell you your RPM trend, how your content performs against similar creators, or which specific factors are pulling your qualified views down. These tools fill that gap.",
    tools: analyticsTools,
  },
  {
    id: "equipment",
    label: "Equipment",
    description:
      "The Creator Rewards Program pays based on qualified views, and qualified views require viewers to watch long enough for the view to count. Bad audio is the fastest way to lose viewers in the first five seconds. These are the equipment upgrades that make a noticeable difference in watch time.",
    tools: equipmentTools,
  },
  {
    id: "design-graphics",
    label: "Design & Graphics",
    description:
      "Thumbnails and cover images determine whether people tap on your profile or scroll past. Consistent visual design builds recognition. These tools cover everything from quick thumbnail edits to full template libraries.",
    tools: designTools,
  },
  {
    id: "creator-platforms",
    label: "Creator Platforms",
    description:
      "The Creator Rewards Program is one income stream. These platforms help creators build the infrastructure for additional income — affiliate marketing, digital products, or a centralized link hub that works across their whole profile.",
    tools: creatorPlatformTools,
  },
  {
    id: "courses-learning",
    label: "Courses & Learning",
    description:
      "The best way to improve Creator Rewards earnings is to improve the content — watch time, hooks, editing pace, niche clarity. These platforms have courses specifically targeting short-form video skills.",
    tools: coursesTools,
  },
];

export default function ToolsPage() {
  const totalTools = categories.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <>
      {/* Affiliate Disclosure — required at top before any affiliate content */}
      <div className="max-w-container mx-auto px-6 pt-24">
        <AffiliateDisclosure />
      </div>

      {/* Page Header — 2-column with hero image */}
      <section className="bg-background-warm py-16">
        <div className="max-w-container mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-center">
            {/* Left — text */}
            <div>
              <Badge className="mb-4 bg-brand-primarySoft text-brand-primaryDeep border-brand-primary/30 text-xs font-semibold">
                <Wrench className="w-3 h-3 mr-1" aria-hidden />
                Curated Tools
              </Badge>
              <h1
                className="text-[2.25rem] md:text-[3rem] font-extrabold text-brand-ink leading-tight"
                style={{ fontWeight: 800 }}
              >
                Tools for TikTok Creators
              </h1>
              <p className="mt-4 text-[1.125rem] text-text-secondary leading-[1.7] max-w-lg">
                Every tool on this page has been researched and recommended by our team. Affiliate links marked clearly — we only recommend what we&apos;d use ourselves.
              </p>
              <div className="flex gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Package className="w-4 h-4 text-brand-primary" aria-hidden />
                  <span>{totalTools} tools reviewed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Tag className="w-4 h-4 text-brand-primary" aria-hidden />
                  <span>Affiliate links disclosed</span>
                </div>
              </div>
            </div>

            {/* Right — hero illustration */}
            <div className="flex justify-center md:justify-end">
              <Image
                src="/images/tools/hero-tools-resources.webp"
                alt="Creator surrounded by recommended tools icons"
                width={600}
                height={315}
                className="rounded-2xl object-contain max-h-[420px]"
                loading="eager"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs + Tool Grids — client component handles interactive tabs */}
      <section className="bg-white">
        <ToolsTabs categories={categories} />
      </section>

      {/* Second Affiliate Disclosure */}
      <div className="max-w-container mx-auto px-6">
        <AffiliateDisclosure />
      </div>

      {/* Email Capture — Monthly Tools Roundup */}
      <EmailCapture
        headline="Get our monthly creator tools roundup"
        subheadline="New tools, deals, and honest reviews — straight to your inbox. Free."
        cta="Join Free"
        showImage={false}
      />
    </>
  );
}
