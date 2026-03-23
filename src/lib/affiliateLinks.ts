export const affiliateLinks: Record<string, string> = {
  // Existing
  amazonRingLight: 'https://www.amazon.com/s?k=ring+light&tag=tiktokcreatpr-20',
  amazonMic: 'https://www.amazon.com/s?k=lavalier+microphone&tag=tiktokcreatpr-20',
  mavely: 'https://www.joinmavely.com/',
  fiverr: 'https://www.fiverr.com/',
  canva: 'https://www.canva.com/',

  // Phase 3 additions — affiliate URLs TBD, placeholder direct links
  filmora: 'https://filmora.wondershare.com/',
  'adobe-cc': 'https://www.adobe.com/creativecloud.html',
  later: 'https://later.com/',
  buffer: 'https://buffer.com/',
  'sprout-social': 'https://sproutsocial.com/',
  'epidemic-sound': 'https://www.epidemicsound.com/',
  artlist: 'https://artlist.io/',

  // Amazon Associates — slug aliases used in resources page copy
  'amazon-ring-light': 'https://www.amazon.com/s?k=ring+light&tag=tiktokcreatpr-20',
  'amazon-mic': 'https://www.amazon.com/s?k=lavalier+microphone&tag=tiktokcreatpr-20',

  // Tools page slugs — all 22 CTAs. Placeholder direct URLs; swap for affiliate URLs when signed up.
  'capcut-pro': 'https://www.capcut.com/',
  'davinci-resolve': 'https://www.blackmagicdesign.com/products/davinciresolve',
  'premiere-rush': 'https://www.adobe.com/products/premiere-rush.html',
  exolyt: 'https://exolyt.com/',
  pentos: 'https://pentos.co/',
  analisa: 'https://analisa.io/',
  'ring-light': 'https://www.amazon.com/s?k=ring+light+for+tiktok&tag=tiktokcreatpr-20',
  microphone: 'https://www.amazon.com/s?k=lavalier+microphone+content+creator&tag=tiktokcreatpr-20',
  tripod: 'https://www.amazon.com/s?k=phone+tripod+content+creator&tag=tiktokcreatpr-20',
  'canva-pro': 'https://www.canva.com/canva-pro/',
  storyblocks: 'https://www.storyblocks.com/',
  'envato-elements-design': 'https://elements.envato.com/',
  'envato-elements': 'https://elements.envato.com/',
  'stan-store': 'https://stan.store/',
  'linktree-pro': 'https://linktr.ee/s/pro/',
  skillshare: 'https://www.skillshare.com/',
  udemy: 'https://www.udemy.com/',
  convertkit: 'https://kit.com/',
}

export function getAffiliateLink(slug: string) {
  return affiliateLinks[slug]
}
