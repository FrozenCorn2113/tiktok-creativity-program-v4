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

  // Later — direct link (no affiliate yet)
  later: 'https://later.com/',
  // Buffer — 25% monthly for 12 months
  buffer: 'https://join.buffer.com/tik-tok-creativity-program',
  // Filmora — direct link (no affiliate yet)
  filmora: 'https://filmora.wondershare.com/',
  // Kit (formerly ConvertKit) — 50% recurring first 12 months; Bronze tier (10+ customers) = ongoing
  kit: 'https://partners.kit.com/o474ub5e1gtu',
  // Kit Mailchimp switcher campaign — dedicated link from Kit affiliate team (Zoe)
  'kit-mailchimp': 'https://partners.kit.com/21jzv',
  // Kajabi — direct link (no affiliate yet)
  kajabi: 'https://kajabi.com/',
  // Gumroad — direct link (no affiliate program exists)
  gumroad: 'https://gumroad.com/',
  // No affiliate program available — direct link only
  canva: 'https://www.canva.com/',

  // ── TIER 2: Manual review — apply soon ──

  // Stan Store — direct link (no affiliate yet)
  'stan-store': 'https://www.stanstore.com/',
  // Epidemic Sound — direct link (no affiliate yet)
  'epidemic-sound': 'https://www.epidemicsound.com/',

  // ── TIER 3: Need traffic first ──

  // Artlist — direct link (no affiliate yet)
  artlist: 'https://artlist.io/',
  // Canva Pro — direct link (affiliate program currently closed)
  'canva-pro': 'https://www.canva.com/pro/',
  // No affiliate program — Adobe has Impact.com program (we were denied)
  'adobe-cc': 'https://www.adobe.com/creativecloud.html',

  // ── Scheduling & Analytics (no affiliate program or TBD) ──

  // No confirmed affiliate program
  'sprout-social': 'https://sproutsocial.com/',

  // ── Clipping Tools ──

  // OpusClip — direct link (no affiliate yet)
  opusclip: 'https://www.opus.pro',
  // Vizard — direct link (no affiliate yet)
  vizard: 'https://vizard.ai',
  // Submagic — direct link (no affiliate yet)
  submagic: 'https://www.submagic.co',
  // Kapwing — direct link (no affiliate yet)
  kapwing: 'https://www.kapwing.com',
  // Descript — direct link (no affiliate yet)
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
  // Fillout — affiliate link via PartnerStack
  fillout: 'https://try.fillout.com/tik-tok-creativity-program-zbzs',
  // Wispr Flow — voice dictation affiliate link
  'wispr-flow': 'https://ref.wisprflow.ai/tik-tok-creativity-program',
  // Interact — quiz builder affiliate link
  interact: 'https://get.tryinteract.com/tik-tok-creativity-program',

  // ── MDX content slug aliases ──
  // Beehiiv — no affiliate program yet, direct link
  beehiiv: 'https://www.beehiiv.com/',
  // FLORA — AI creative tool
  flora: 'https://www.flora.ai/',
  // UBeesize 12" Ring Light (ASIN B07GDC39Y2)
  'ubeesize-ring-light': amz('B07GDC39Y2'),
  // Neewer RP19H 19" Ring Light (ASIN B0CHRNFZC3)
  'neewer-rp19h': amz('B0CHRNFZC3'),
  // Neewer RL-18 18" Ring Light (ASIN B01LXDNNBW)
  'neewer-rl18': amz('B01LXDNNBW'),
  // Neewer RL45B Wireless Ring Light (ASIN B0D3TVGQWZ)
  'neewer-rl45b': amz('B0D3TVGQWZ'),

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
