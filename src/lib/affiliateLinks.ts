const AMAZON_TAG = 'tiktokcreatpr-20'
const amz = (asin: string) => `https://www.amazon.com/dp/${asin}/?tag=${AMAZON_TAG}`

export const affiliateLinks: Record<string, string> = {
  // ── ACTIVE affiliate links (do not change) ──
  // Neewer 10" Ring Light Kit (ASIN B01LZKIBUK) — top-rated creator ring light ~$42
  amazonRingLight: amz('B01LZKIBUK'),
  // Blue Yeti Nano USB Mic (ASIN B07DTTGP7V) — compact USB condenser, creator standard
  amazonMic: amz('B07DTTGP7V'),
  mavely: 'https://www.joinmavely.com/',
  fiverr: 'https://www.fiverr.com/',

  // ── TIER 1: Easy approval — apply now ──

  // TODO: Replace with affiliate link after approval — Expected: 30% for 1 year
  later: 'https://later.com/',
  // TODO: Replace with affiliate link after approval — Expected: 25% monthly for 12 months
  buffer: 'https://buffer.com/',
  // TODO: Replace with affiliate link after approval (via ShareASale/CJ) — Expected: 30-50% tiered
  filmora: 'https://filmora.wondershare.com/',
  // Kit (formerly ConvertKit) — 50% recurring first 12 months; Bronze tier (10+ customers) = ongoing
  kit: 'https://partners.kit.com/o474ub5e1gtu',
  // TODO: Replace with affiliate link after approval — Expected: up to $399 one-time + up to 20% recurring
  kajabi: 'https://kajabi.com/',
  // TODO: Replace with affiliate link after approval — Expected: 10% platform referrals
  gumroad: 'https://gumroad.com/',
  // No affiliate program available — direct link only
  canva: 'https://www.canva.com/',

  // ── TIER 2: Manual review — apply soon ──

  // TODO: Replace with affiliate link after approval — Expected: 20% recurring (requires Stan subscription)
  'stan-store': 'https://stan.store/',
  // TODO: Replace with affiliate link after approval — Expected: subscription discounts, then 50/50 at Ambassador
  'epidemic-sound': 'https://www.epidemicsound.com/',

  // ── TIER 3: Need traffic first ──

  // TODO: Replace with affiliate link after approval — Expected: $30 per signup (selective, 60-day review)
  artlist: 'https://artlist.io/',
  // TODO: Replace with affiliate link after approval — Expected: up to $36/new Pro subscriber (currently CLOSED)
  'canva-pro': 'https://www.canva.com/pro/',
  // No affiliate program — Adobe has Impact.com program (we were denied)
  'adobe-cc': 'https://www.adobe.com/creativecloud.html',

  // ── Scheduling & Analytics (no affiliate program or TBD) ──

  // No confirmed affiliate program
  'sprout-social': 'https://sproutsocial.com/',

  // ── Clipping Tools — placeholder direct links ──

  // No confirmed affiliate program — check PartnerStack
  opusclip: 'https://www.opus.pro',
  // No confirmed affiliate program
  vizard: 'https://vizard.ai',
  // No confirmed affiliate program
  submagic: 'https://www.submagic.co',
  // No confirmed affiliate program
  kapwing: 'https://www.kapwing.com',
  // TODO: Replace with affiliate link after approval — check Descript partner program
  descript: 'https://www.descript.com',
  // No confirmed affiliate program
  pictory: 'https://pictory.ai',
  // No confirmed affiliate program
  klap: 'https://klap.app',

  // ── Amazon Associates — slug aliases used in resources page copy ──
  // Neewer 10" Ring Light Kit (ASIN B01LZKIBUK)
  'amazon-ring-light': amz('B01LZKIBUK'),
  // Blue Yeti Nano USB Mic (ASIN B07DTTGP7V)
  'amazon-mic': amz('B07DTTGP7V'),

  // ── Niche page tools ──

  // No affiliate program — free tool
  'capcut-pro': 'https://www.capcut.com/',
  // No affiliate program — free software
  'davinci-resolve': 'https://www.blackmagicdesign.com/products/davinciresolve',
  // Neewer 10" Ring Light Kit (ASIN B01LZKIBUK)
  'ring-light': amz('B01LZKIBUK'),
  // Blue Yeti Nano USB Mic (ASIN B07DTTGP7V)
  microphone: amz('B07DTTGP7V'),
  // AmazonBasics 60" Lightweight Tripod (ASIN B00XI87KV8)
  tripod: amz('B00XI87KV8'),
  // No confirmed affiliate program
  'linktree-pro': 'https://linktr.ee/s/pricing',
  // No confirmed affiliate program — check for partner program
  skillshare: 'https://www.skillshare.com/',
  // No affiliate program — free/open-source
  'obs-studio': 'https://obsproject.com/',
  // No affiliate program — hardware (use Amazon link instead)
  'elgato-stream-deck': 'https://www.elgato.com/stream-deck',
  // No confirmed affiliate program
  fillout: 'https://www.fillout.com/',

  // ── Ring Lights (Phase 1.5 Amazon product guides) ──
  'amazon-neewer-10-ring-light-b089nn7ks6': amz('B089NN7KS6'),
  'amazon-emart-10-rgb-ring-light-b081mxv9ft': amz('B081MXV9FT'),
  'amazon-neewer-18-ring-light-rl18-b01lxdnnbw': amz('B01LXDNNBW'),
  'amazon-neewer-rp18b-pro-ring-light-b0chrnfzc3': amz('B0CHRNFZC3'),
  'amazon-elgato-ring-light-b08gmdq87t': amz('B08GMDQ87T'),
  'amazon-lume-cube-ring-light-pro-b0btmx8wq7': amz('B0BTMX8WQ7'),

  // ── Microphones (Phase 1.5 Amazon product guides) ──
  'amazon-hollyland-lark-m2-b0cp7qxwpn': amz('B0CP7QXWPN'),
  'amazon-hollyland-lark-m2s-b0dnq8clxr': amz('B0DNQ8CLXR'),
  'amazon-dji-mic-2-1tx-b0cfzy1m8m': amz('B0CFZY1M8M'),
  'amazon-dji-mic-2-2tx-b0cfzx734j': amz('B0CFZX734J'),
  'amazon-rode-wireless-go-ii-single-b09pxcz247': amz('B09PXCZ247'),
  'amazon-rode-wireless-go-ii-dual-b08xfq6kp9': amz('B08XFQ6KP9'),
  'amazon-rode-videomicro-ii-b0bm8hql6l': amz('B0BM8HQL6L'),
  'amazon-rode-videomic-me-b018kijgu8': amz('B018KIJGU8'),
  'amazon-blue-yeti-b002va464s': amz('B002VA464S'),
  'amazon-blue-yeti-nano-b07x5jnt3f': amz('B07X5JNT3F'),

  // ── Tripods & Stands (Phase 1.5 Amazon product guides) ──
  'amazon-sensyne-62-tripod-b09tqy66nh': amz('B09TQY66NH'),
  'amazon-sensyne-72-tripod-b0cwqx4frw': amz('B0CWQX4FRW'),
  'amazon-emart-62-tripod-b0d172j4zl': amz('B0D172J4ZL'),
  'amazon-joby-gorillapod-mobile-mini-b075mmfpmv': amz('B075MMFPMV'),
  'amazon-joby-griptight-pro-3-b0bp2w631d': amz('B0BP2W631D'),
  'amazon-ulanzi-ma30-magsafe-b0ddtkhx31': amz('B0DDTKHX31'),
  'amazon-ulanzi-ma26-desk-tripod-b0cscwtfp3': amz('B0CSCWTFP3'),

  // ── Cameras (Phase 1.5 Amazon product guides) ──
  'amazon-gopro-hero13-black-b0dcm34gxx': amz('B0DCM34GXX'),
  'amazon-dji-osmo-pocket-3-b0cg19qxwd': amz('B0CG19QXWD'),
  'amazon-sony-zv-e10-ii-body-b0d92w8gYV': amz('B0D92W8GYV'),
  'amazon-sony-zv-e10-original-b09bbgn298': amz('B09BBGN298'),
  'amazon-canon-eos-r50-kit-b0bttv6ct1': amz('B0BTTV6CT1'),
}

export function getAffiliateLink(slug: string) {
  return affiliateLinks[slug]
}
