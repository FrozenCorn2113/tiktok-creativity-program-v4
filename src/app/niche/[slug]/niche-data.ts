// Shared niche data used by both the server page (metadata) and client component (rendering)
// This file has no 'use client' directive so it can be imported anywhere.

export type Creator = {
  name: string
  handle: string
  followers: string
  description: string
  lesson: string
}

export type Tool = {
  name: string
  description: string
  href: string
}

// ---- Phase 4 NicheContent shape (see /tmp/tcp-zip/directions/content-shapes.js) ----
export type NicheSnapshotCell = { label: string; value: string; note: string }
export type NicheLever = {
  title: string
  tag: string
  body: string
  typical: string
  effort: number
}
export type NicheToolRow = {
  name: string
  desc: string
  cat: string
  price: string
  take: 'Must-have' | 'Solid' | 'Optional' | 'Skip'
}
export type NichePlanWeek = { title: string; tasks: string[] }
export type NicheFaqItem = { q: string; a: string }
export type NicheRelated = { slug: string; name: string; tag: string }

export type NicheData = {
  title: string
  headline: string
  description: string
  icon: string
  rpmRange: string
  bestFormat: string
  difficulty: string
  focus: string[]
  creators: Creator[]
  strategy: { heading: string; body: string }[]
  rpmNote: string
  tools: Tool[]
  ultimateGuide: { slug: string; label: string }
  relatedGuides: { label: string; href: string }[]

  // ---- Phase 4 template fields ----
  /** Hero italic-serif word (singular or plural per heading) */
  titleItalic: string
  /** Singular, used in body copy */
  titleLower: string
  /** Category pill, matches categories on /niche */
  category: string
  /** Last-updated display text */
  updated: string
  /** Hero intro paragraph (~40 words) */
  intro: string
  /** Hero / card illustration asset */
  heroImage: string
  /** Card tagline on /niche */
  tagline: string
  /** 4-cell snapshot strip */
  snapshot: [NicheSnapshotCell, NicheSnapshotCell, NicheSnapshotCell, NicheSnapshotCell]
  /** Reality check dark callout */
  reality: {
    title: string
    italic: string
    body: string[]
  }
  /** Monetization paths (4-6 lever cards) */
  levers: NicheLever[]
  /** Tools table (replaces legacy tools[]) */
  toolRows: NicheToolRow[]
  /** Month-one action plan — exactly 4 weeks */
  plan: [NichePlanWeek, NichePlanWeek, NichePlanWeek, NichePlanWeek]
  /** FAQ */
  faq: NicheFaqItem[]
  /** Related niches (3 entries, other slugs) */
  related: [NicheRelated, NicheRelated, NicheRelated]
}

export const nicheContent: Record<string, NicheData> = {
  musicians: {
    title: 'Monetization for Musicians on TikTok',
    headline: 'Turn your music into a TikTok revenue machine',
    description:
      'Grow plays, drive streams, and stack revenue beyond Creator Rewards with music-friendly income streams.',
    icon: '/images/niches/icon-musicians.svg',
    rpmRange: '$0.20 - $0.80',
    bestFormat: '60s+ music tutorials',
    difficulty: 'Medium',
    focus: ['Promote music links', 'Sync licensing', 'Live gifts + tips', 'Brand deals'],
    creators: [
      {
        name: 'Venbee',
        handle: 'venbee.music',
        followers: '130K',
        description:
          'UK-based independent drum and bass singer whose single "Low Down" went viral on TikTok and hit #1 on the Spotify Viral chart.',
        lesson: 'Mid-tier musicians can monetize original music directly through the platform without a label',
      },
      {
        name: 'Mae Stephens',
        handle: 'maestephens_',
        followers: '373K',
        description:
          'UK singer-songwriter who built her audience entirely on original songwriting content. "If We Ever Broke Up" went viral on TikTok, earning 9.3M+ likes while she remains fully independent with no label deal.',
        lesson: 'Independent artists can build a viable music career through TikTok without signing away rights to a label',
      },
      {
        name: 'Nicky Youre',
        handle: 'nickyyoure',
        followers: '245K',
        description:
          'Independent pop artist who built his TikTok following by previewing unreleased tracks and showing his bedroom production process. His single "Sunroof" grew organically on the platform before charting.',
        lesson: 'Previewing music in a casual, behind-the-scenes format builds genuine fan investment before a track even releases',
      },
      {
        name: 'Adam Melchor',
        handle: 'adammelchor',
        followers: '225K',
        description:
          'New Jersey singer-songwriter who built his TikTok audience through acoustic sessions and songwriting breakdowns. His warm, storytelling approach to music content turns casual viewers into dedicated fans who follow him to streaming platforms.',
        lesson: 'Showing the messy creative process builds a more loyal audience than polished final performances alone',
      },
    ],
    strategy: [
      {
        heading: 'Creator Rewards as a base, not a ceiling',
        body: 'Creator Rewards pays per qualified view. For musicians, longer-form music content (60 seconds plus) outperforms quick clips. Tutorial-style videos about your process, songwriting behind-the-scenes, and equipment walkthroughs hit qualified view thresholds better than 15-second track previews.',
      },
      {
        heading: 'Drive streams, not just views',
        body: 'The link-in-bio is your most underused asset. Every video should have a purpose beyond the view count. Use Stan Store or a simple Linktree to send fans to your streaming profiles, music merch, or a "name your price" digital download. Even 0.1% of your monthly TikTok views converting to Spotify saves adds up fast.',
      },
      {
        heading: 'Live gifts as a real income stream',
        body: 'TikTok Live gifts are underrated for musicians. A live performance session with genuine audience interaction can generate more per hour than Creator Rewards on a similar-sized audience. Combine live gifts with Creator Rewards to diversify.',
      },
    ],
    rpmNote:
      'Music content RPMs typically range from $0.20 to $0.80 depending on audience region and video length. Tutorial-style music content (songwriting breakdowns, production walkthroughs, instrument lessons) consistently outperforms 15-second performance clips because watch time per view is 3-4x higher. US-based audiences watching 60-second-plus music tutorial content trend toward the $0.60-$0.80 range.',
    tools: [
      { name: 'DistroKid', description: 'Distribute music to all streaming platforms', href: '/guides/best-monetization-methods' },
      { name: 'Stan Store', description: 'Sell music, merch, and digital downloads', href: '/guides/best-monetization-methods' },
      { name: 'Splice', description: 'Royalty-free samples and sounds for production', href: '/guides/best-monetization-methods' },
    ],
    ultimateGuide: {
      slug: 'ultimate-music-guide',
      label: 'Ultimate TikTok Monetization Guide for Musicians',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Growing from 5K to 10K Followers', href: '/guides/grow-5k-to-10k' },
      { label: 'Best Monetization Methods for Creators', href: '/guides/best-monetization-methods' },
    ],
    titleItalic: 'musicians',
    titleLower: 'musician',
    category: 'Creative',
    updated: 'Apr 2026', // TODO(content): confirm updated date
    intro:
      'Grow plays, drive streams, and stack revenue beyond Creator Rewards with music-friendly income streams.',
    heroImage: '/images/guides/hero-ultimate-music-guide.webp',
    tagline: 'Promote music, drive streams, stack income beyond Creator Rewards.',
    snapshot: [
      { label: 'Typical RPM', value: '$0.20 – $0.80', note: 'Music sits below the platform median on ad rate.' },
      { label: 'Best format', value: '60s+ tutorials', note: 'Songwriting breakdowns, production walkthroughs, instrument lessons.' }, // TODO(content): confirm
      { label: 'Difficulty', value: 'Medium', note: 'High competition niche; stream-driving lever is strong.' }, // TODO(content): confirm
      { label: 'Top lever', value: 'Drive streams', note: 'Spotify royalties and follows outpace Rewards for most musicians.' }, // TODO(content): confirm
    ],
    reality: {
      title: 'You are not a TikTok creator. You are a',
      italic: 'musician using TikTok.',
      body: [
        'Creator Rewards alone will not pay the bills. Music RPMs sit below the platform median, so treat Rewards as one line in a bigger plan rather than the main event.',
        'Every post should make it trivially easy for a new listener to find you on a platform that actually pays: streaming, live gifts, merch, or sync.',
      ],
    }, // TODO(content): confirm reality-check copy
    levers: [
      {
        title: 'Creator Rewards as a base',
        tag: 'FOUNDATION',
        body: 'Creator Rewards pays per qualified view. For musicians, longer-form content (60s+) outperforms quick clips. Tutorial-style videos hit qualified view thresholds better than 15-second previews.',
        typical: '$0.20 – $0.80 RPM',
        effort: 2,
      },
      {
        title: 'Drive streams to DSPs',
        tag: 'HIGH LEVERAGE',
        body: 'The link-in-bio is your most underused asset. Use Stan Store or Linktree to send fans to streaming profiles. Even 0.1% of monthly TikTok views converting to Spotify saves adds up fast.',
        typical: '$600 – 3k / mo', // TODO(content): confirm
        effort: 2,
      },
      {
        title: 'TikTok LIVE + gifts',
        tag: 'REPEATABLE',
        body: 'A live performance session with genuine audience interaction can generate more per hour than Creator Rewards on a similar-sized audience. Combine live gifts with Rewards to diversify.',
        typical: '$400 – 2k / mo', // TODO(content): confirm
        effort: 4,
      },
      {
        title: 'Sync licensing',
        tag: 'ASYMMETRIC',
        body: 'Register with a sync agency or pitch directly. One placement in a national ad beats a year of Rewards payouts.',
        typical: '$500 – 8k / placement', // TODO(content): confirm
        effort: 3,
      },
    ],
    toolRows: [
      { name: 'DistroKid', desc: 'Distribute music to all streaming platforms', cat: 'Distribution', price: '$23/year', take: 'Must-have' },
      { name: 'Stan Store', desc: 'Sell music, merch, and digital downloads', cat: 'Fan routing', price: 'Free / $29mo', take: 'Must-have' }, // TODO(content): confirm price
      { name: 'Splice', desc: 'Royalty-free samples and sounds for production', cat: 'Production', price: '$10/mo+', take: 'Optional' },
    ],
    plan: [
      {
        title: 'Audit and route', // TODO(content): confirm
        tasks: [
          'Set up a smart link (Linkfire / Feature.fm) in bio',
          'Make sure music is distributed via DistroKid or equivalent',
          'Post 1 song snippet with a clear stream CTA',
          'Audit top 5 existing videos and add a pinned comment',
        ],
      },
      {
        title: 'Consistency first', // TODO(content): confirm
        tasks: [
          'Post 5 snippets this week across different songs',
          'Respond to every comment on the top 3 videos',
          'Run a first LIVE for 30 minutes',
          'Pin the best-performing snippet',
        ],
      },
      {
        title: 'Test monetization', // TODO(content): confirm
        tasks: [
          'Schedule 2 LIVEs and announce them in advance',
          'Email 3 sync agencies with your catalog',
          'Open a Bandcamp or Stan Store and upload 1 release',
          'Track revenue per channel in a simple sheet',
        ],
      },
      {
        title: 'Double down', // TODO(content): confirm
        tasks: [
          'Double the winning post format',
          'Plan the next single with a 3-week TikTok rollout',
          'Reach out to 5 brands you genuinely use',
          'Review numbers and cut the weakest channel',
        ],
      },
    ],
    faq: [ // TODO(content): confirm FAQ copy
      {
        q: 'Can I qualify for Creator Rewards as a musician?',
        a: 'Yes. The program has no niche exclusions. The issue is that music RPM sits below the platform median, so Rewards should be a supplement rather than the main revenue line.',
      },
      {
        q: 'Does TikTok pay royalties when my song goes viral in other creators’ videos?',
        a: 'If you are distributed through a DSP-aware distributor, you will receive commercial sound recording royalties from TikTok’s licensing pool. Rates per use are low but can add up on viral sounds.',
      },
      {
        q: 'Should I release snippets or full songs on TikTok first?',
        a: 'Snippets. Drop a 15-20 second hook 2-4 weeks before release, let the algorithm pick the winner, and release the version people are already singing along to.',
      },
      {
        q: 'Is TikTok LIVE worth it for musicians?',
        a: 'Yes, once you can hold an audience for 30+ minutes. Take requests, show process, and treat gifts like tips at a real show.',
      },
    ],
    related: [
      { slug: 'artists', name: 'Artists', tag: 'Process content · prints' },
      { slug: 'comedy', name: 'Comedians', tag: 'Skits · superfans' },
      { slug: 'teachers', name: 'Teachers & Educators', tag: 'Lessons · courses' },
    ],
  },
  'fitness-creators': {
    title: 'Monetization for Fitness Creators on TikTok',
    headline: 'Build a fitness brand that pays beyond views',
    description:
      'Earn from high-retention workout content, programs, and affiliate tools built for creators.',
    icon: '/images/niches/icon-fitness-creators.svg',
    rpmRange: '$0.25 - $0.70',
    bestFormat: '3min+ workout tutorials',
    difficulty: 'Medium',
    focus: ['Workout plans', 'Affiliate supplements', 'Program upsells', 'Live sessions'],
    creators: [
      {
        name: 'Natacha Oceane',
        handle: 'natachaoceane',
        followers: '74.6K',
        description:
          'Science-based fitness creator with a biophysics background who creates detailed workout tutorials grounded in exercise science. Her evidence-based approach to training sets her apart from trend-chasing fitness content.',
        lesson: 'A science-backed approach to fitness content builds authority and attracts a highly engaged, education-hungry audience',
      },
      {
        name: 'Ryan Humiston',
        handle: 'ryanhumiston',
        followers: '207.9K',
        description:
          'No-nonsense gym coach who creates short, actionable workout tutorials with a focus on practical hypertrophy training. His direct teaching style keeps viewers watching through the full routine.',
        lesson: 'Technical fitness education content converts directly to program sales even at sub-200K followings',
      },
      {
        name: 'Jordan Shrinks',
        handle: 'jordanshrinks',
        followers: '152.7K',
        description:
          'Fitness transformation creator who documents her ongoing health journey with transparent progress updates, workout routines, and meal prep content. Her authenticity resonates with viewers starting their own fitness journeys.',
        lesson: 'Transparency about real progress, including setbacks, builds deep audience trust and long-term retention',
      },
      {
        name: 'Hanna Oberg',
        handle: 'hannaoeberg',
        followers: '420K',
        description:
          'Swedish fitness creator and certified PT who shares full workout routines with detailed form cues. Built a six-figure business selling training programs directly to her TikTok audience.',
        lesson: 'International fitness creators can build US-heavy audiences and monetize through digital product sales',
      },
    ],
    strategy: [
      {
        heading: 'Workout content earns strong retention',
        body: 'Follow-along workout videos have naturally high watch times because viewers stay to actively participate. This is one of the cleanest paths to qualified views. A 3-minute workout tutorial with clear instruction retains far better than a transformation clip.',
      },
      {
        heading: 'Supplements and gear have real affiliate potential',
        body: 'Fitness is one of the highest-commission affiliate categories available. Supplement brands, fitness equipment, and apparel all run affiliate programs. A single genuine recommendation in a well-viewed video can outperform weeks of Creator Rewards.',
      },
      {
        heading: 'Sell a program, not individual advice',
        body: 'Fitness creators who earn consistently from TikTok have a product: a 4-week plan, a challenge, a recipe + workout bundle. Stan Store makes it easy to sell digital products without a website. Your TikTok content becomes the top of funnel for your program sales.',
      },
    ],
    rpmNote:
      'Fitness content RPMs typically range from $0.25 to $0.70. Long-form workout tutorials (3+ minutes) with US audiences trend toward the higher end.',
    tools: [
      { name: 'Stan Store', description: 'Sell workout plans and digital products', href: '/guides/best-monetization-methods' },
      { name: 'Amazon Associates', description: 'Earn commissions on fitness gear recommendations', href: '/guides/best-monetization-methods' },
      { name: 'Kit (ConvertKit)', description: 'Build an email list and sell programs', href: '/guides/best-email-marketing-tiktok-creators' },
    ],
    ultimateGuide: {
      slug: 'ultimate-fitness-guide',
      label: 'Ultimate TikTok Monetization Guide for Fitness Creators',
    },
    relatedGuides: [
      { label: 'Growing from 5K to 10K Followers', href: '/guides/grow-5k-to-10k' },
      { label: 'Additional Reward Criteria', href: '/guides/additional-reward-criteria-2026' },
      { label: 'Best Monetization Methods', href: '/guides/best-monetization-methods' },
    ],
    titleItalic: 'fitness creators',
    titleLower: 'fitness creator',
    category: 'Health',
    updated: 'Apr 2026', // TODO(content): confirm updated date
    intro:
      'Earn from high-retention workout content, programs, and affiliate tools built for creators.',
    heroImage: '/images/guides/hero-ultimate-fitness-guide.webp',
    tagline: 'Earn from workout content, programs, and affiliate tools built for creators.',
    snapshot: [
      { label: 'Typical RPM', value: '$0.25 – $0.70', note: 'Long-form workout tutorials trend toward the higher end.' },
      { label: 'Best format', value: '3min+ tutorials', note: 'Follow-along workouts earn naturally high retention.' },
      { label: 'Difficulty', value: 'Medium', note: 'Consistency matters more than production value.' }, // TODO(content): confirm
      { label: 'Top lever', value: 'Sell a program', note: 'A 4-week plan or challenge compounds better than Rewards alone.' }, // TODO(content): confirm
    ],
    reality: {
      title: 'Creator Rewards is the warmup. The',
      italic: 'real revenue is your program.',
      body: [
        'Fitness creators who earn consistently from TikTok have a product: a 4-week plan, a challenge, a recipe + workout bundle. Your TikTok content is the top of funnel.',
        'Supplements and gear are among the highest-commission affiliate categories. One genuine recommendation in a well-viewed video can outperform weeks of Rewards.',
      ],
    }, // TODO(content): confirm reality-check copy
    levers: [
      {
        title: 'Workout content earns strong retention',
        tag: 'FOUNDATION',
        body: 'Follow-along workout videos have naturally high watch times because viewers stay to actively participate. A 3-minute workout tutorial retains far better than a transformation clip.',
        typical: '$0.25 – $0.70 RPM',
        effort: 2,
      },
      {
        title: 'Affiliate supplements and gear',
        tag: 'HIGH MARGIN',
        body: 'Fitness is one of the highest-commission affiliate categories. A single genuine recommendation in a well-viewed video can outperform weeks of Creator Rewards.',
        typical: '$200 – 2k / mo', // TODO(content): confirm
        effort: 2,
      },
      {
        title: 'Sell a program, not individual advice',
        tag: 'COMPOUNDING',
        body: 'Fitness creators who earn consistently have a product: a 4-week plan, a challenge, a recipe + workout bundle. Stan Store makes selling digital products simple.',
        typical: '$500 – 5k / mo', // TODO(content): confirm
        effort: 4,
      },
      {
        title: 'Live sessions and coaching',
        tag: 'REPEATABLE',
        body: 'Group live workouts and 1-on-1 coaching let you monetize the audience you already have. Start as a premium tier above your existing programs.', // TODO(content): confirm
        typical: '$400 – 3k / mo', // TODO(content): confirm
        effort: 4,
      },
    ],
    toolRows: [
      { name: 'Stan Store', desc: 'Sell workout plans and digital products', cat: 'Commerce', price: 'Free / $29mo', take: 'Must-have' }, // TODO(content): confirm price
      { name: 'Amazon Associates', desc: 'Earn commissions on fitness gear recommendations', cat: 'Affiliate', price: 'Free', take: 'Solid' },
      { name: 'Kit (ConvertKit)', desc: 'Build an email list and sell programs', cat: 'Email', price: 'Free / $15mo', take: 'Solid' }, // TODO(content): confirm price
    ],
    plan: [
      {
        title: 'Audit content mix', // TODO(content): confirm
        tasks: [
          'Pick 1 signature workout format and commit to it',
          'Film 5 follow-along workouts this week',
          'Add affiliate gear links to your bio',
          'Write a one-sentence pitch for a future program',
        ],
      },
      {
        title: 'Ship consistently', // TODO(content): confirm
        tasks: [
          'Post 5 follow-along workouts',
          'Reply to every comment on top 3 videos',
          'Research 3 supplement / gear affiliate programs',
          'Test 1 live workout session',
        ],
      },
      {
        title: 'Launch a mini-offer', // TODO(content): confirm
        tasks: [
          'Scope a 2-week starter plan ($19-$29)',
          'Build the plan in a PDF or Notion doc',
          'Set up Stan Store with the offer',
          'Drive attention with 3 videos linking to it',
        ],
      },
      {
        title: 'Double down on what worked', // TODO(content): confirm
        tasks: [
          'Identify the highest-converting video format',
          'Plan 4 weeks of content around that format',
          'Upsell past buyers into a 4-week program',
          'Reinvest affiliate earnings in better gear or production',
        ],
      },
    ],
    faq: [ // TODO(content): confirm FAQ copy
      {
        q: 'Do I need to be a certified trainer to monetize fitness content on TikTok?',
        a: 'Not required to post, but credibility helps conversion. If you make specific program or nutrition claims, a cert (NASM, ACE) protects you and lets you charge more.',
      },
      {
        q: 'How long should workout videos be for Creator Rewards?',
        a: 'Aim for 3+ minute follow-alongs. Retention is typically strong because viewers stay to complete the workout, which pushes qualified view rates up.',
      },
      {
        q: 'What sells better: gear affiliate links or my own program?',
        a: 'Your own program. Affiliates are a fine starting line but a $49 plan at 2% conversion on a 10K-view video beats most gear commissions.',
      },
    ],
    related: [
      { slug: 'coaches', name: 'Coaches & Consultants', tag: 'High-ticket offers' },
      { slug: 'teachers', name: 'Teachers & Educators', tag: 'Lessons · courses' },
      { slug: 'beauty', name: 'Beauty Creators', tag: 'Reviews · affiliate' },
    ],
  },
  artists: {
    title: 'Monetization for Artists on TikTok',
    headline: 'Sell your art through the content you already love making',
    description:
      'Showcase process videos, sell prints, and turn engagement into predictable income.',
    icon: '/images/niches/icon-artists.svg',
    rpmRange: '$0.15 - $0.55',
    bestFormat: '60-90s process videos',
    difficulty: 'Low-Medium',
    focus: ['Print sales', 'Commissions', 'Process content', 'Behind-the-scenes'],
    creators: [
      {
        name: 'Art with Flo',
        handle: 'artwithflo',
        followers: '182.2K',
        description:
          'Procreate tutorial creator who teaches step-by-step digital illustration techniques in approachable, beginner-friendly videos. Her brush packs and course content convert TikTok viewers into paying students.',
        lesson: 'Structured tutorial content that teaches a specific technique in each video builds a loyal audience that buys your digital products',
      },
      {
        name: 'Noor Ahmad',
        handle: 'noorahmad_art',
        followers: '324K+',
        description:
          'Canadian acrylic painting creator who built a TikTok-native audience through nature-themed painting tutorials and launched Ahmad Art Academy.',
        lesson: 'Traditional media art (not just digital) can thrive on TikTok with the right tutorial approach',
      },
      {
        name: 'Jess Karp',
        handle: 'jessicakarp',
        followers: '26K',
        description:
          'Mixed media and collage artist who shares her creative process from concept to finished piece. Sells original work and prints directly through TikTok traffic to her online shop.',
        lesson: 'Showing the full creative journey from idea to finished sale converts viewers into buyers at any follower count',
      },
      {
        name: 'Kasey Golden',
        handle: 'kaseythegolden',
        followers: '29.4K',
        description:
          'Digital illustrator and Procreate tutorial creator who teaches character design and digital painting techniques. Her brush packs and course content convert TikTok tutorial viewers into paying students at high rates.',
        lesson: 'Tutorial content that teaches a transferable skill builds an audience primed to buy your digital products',
      },
      {
        name: 'Sam Does Arts',
        handle: 'samdoesarts',
        followers: '416.2K',
        description:
          'Digital art creator known for stylized portrait illustrations and speed-paint process videos. His distinctive style and engaging narration keep viewers watching through full illustrations, and he monetizes through print sales and Patreon.',
        lesson: 'Artists can build a monetizable audience through consistent process content that showcases a recognizable personal style',
      },
    ],
    strategy: [
      {
        heading: 'Process content is your best Creator Rewards asset',
        body: 'Time-lapse and real-time drawing or painting videos have strong watch-time retention. A 60-90 second process video showing a full illustration from sketch to final piece hits qualified view thresholds consistently. This is one of the most reliable content formats for artist creators.',
      },
      {
        heading: 'Prints and digital files are the easiest first product',
        body: 'Etsy, Gumroad, and Stan Store all support digital file sales. A $10 print or $5 desktop wallpaper sold to 1% of your monthly unique viewers can exceed your Creator Rewards income. The content creates the demand.',
      },
      {
        heading: 'Commission funnels work at any follower count',
        body: 'Dedicated commission content (videos showing the commission process, client reveals, before-and-afters) builds a waiting list organically. Even 1K-follower artists regularly book commissions from TikTok when the content clearly shows what they create.',
      },
    ],
    rpmNote:
      'Art and illustration content RPMs range from $0.15 to $0.55. Process videos with tutorial-style narration trend higher than silent time-lapses.',
    tools: [
      { name: 'Etsy', description: 'Sell prints, originals, and digital files', href: '/guides/best-monetization-methods' },
      { name: 'Gumroad', description: 'Sell digital art, brushes, and tutorials', href: '/guides/best-monetization-methods' },
      { name: 'Procreate', description: 'Industry-standard digital illustration tool', href: '/guides/best-monetization-methods' },
    ],
    ultimateGuide: {
      slug: 'ultimate-artists-guide',
      label: 'Ultimate TikTok Monetization Guide for Artists',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Canada Monetization Without Rewards', href: '/guides/canada-without-rewards' },
      { label: 'Multiple Revenue Streams', href: '/guides/multiple-revenue-streams' },
    ],
    titleItalic: 'artists',
    titleLower: 'artist',
    category: 'Creative',
    updated: 'Apr 2026', // TODO(content): confirm updated date
    intro:
      'Showcase process videos, sell prints, and turn engagement into predictable income.',
    heroImage: '/images/guides/hero-ultimate-artists-guide.webp',
    tagline: 'Showcase process content, sell prints, turn engagement into income.',
    snapshot: [
      { label: 'Typical RPM', value: '$0.15 – $0.55', note: 'Tutorial narration trends higher than silent time-lapses.' },
      { label: 'Best format', value: '60-90s process', note: 'Sketch-to-final process hits qualified view thresholds consistently.' },
      { label: 'Difficulty', value: 'Low – Medium', note: 'Process content is easy to produce from work you already make.' },
      { label: 'Top lever', value: 'Prints + files', note: '$5-$10 digital files scale with your view count.' }, // TODO(content): confirm
    ],
    reality: {
      title: 'Views are cheap. What pays is',
      italic: 'what you sell at the end.',
      body: [
        'Process videos are a reliable Creator Rewards format, but a $10 print sold to 1% of monthly unique viewers can exceed your Rewards income.',
        'Dedicated commission content builds a waiting list even at 1K followers. The content creates the demand; the product captures it.',
      ],
    }, // TODO(content): confirm reality-check copy
    levers: [
      {
        title: 'Process content for Creator Rewards',
        tag: 'FOUNDATION',
        body: 'Time-lapse and real-time drawing videos have strong watch-time retention. 60-90 second process videos showing a full illustration from sketch to final hit qualified view thresholds consistently.',
        typical: '$0.15 – $0.55 RPM',
        effort: 2,
      },
      {
        title: 'Prints and digital files',
        tag: 'LOW FRICTION',
        body: 'Etsy, Gumroad, and Stan Store all support digital file sales. A $10 print or $5 wallpaper sold to 1% of your monthly unique viewers can exceed Creator Rewards income.',
        typical: '$200 – 1.5k / mo', // TODO(content): confirm
        effort: 2,
      },
      {
        title: 'Commissions',
        tag: 'HIGH MARGIN',
        body: 'Dedicated commission content (client reveals, before-and-afters) builds a waiting list organically. Even 1K-follower artists regularly book commissions from TikTok.',
        typical: '$150 – 2k / commission', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'Courses, brushes, and tutorials',
        tag: 'COMPOUNDING',
        body: 'Teach a specific technique, then sell the brush pack or the structured course. Tutorial audiences convert to paying students at strong rates.', // TODO(content): confirm
        typical: '$300 – 3k / mo', // TODO(content): confirm
        effort: 4,
      },
    ],
    toolRows: [
      { name: 'Etsy', desc: 'Sell prints, originals, and digital files', cat: 'Commerce', price: 'Listing fees', take: 'Solid' },
      { name: 'Gumroad', desc: 'Sell digital art, brushes, and tutorials', cat: 'Commerce', price: '10% fee', take: 'Must-have' }, // TODO(content): confirm take
      { name: 'Procreate', desc: 'Industry-standard digital illustration tool', cat: 'Production', price: '$12.99 one-time', take: 'Must-have' }, // TODO(content): confirm price
    ],
    plan: [ // TODO(content): confirm plan copy
      {
        title: 'Set up the shop',
        tasks: [
          'Open an Etsy or Gumroad store',
          'List 3 prints or digital files',
          'Add the store link to bio',
          'Film 2 process videos with the finished piece for sale',
        ],
      },
      {
        title: 'Publish consistently',
        tasks: [
          'Post 5 process videos this week',
          'Reply to every comment on top 3 videos',
          'Announce commission slots (even if limited)',
          'Share a behind-the-scenes of your studio or setup',
        ],
      },
      {
        title: 'Test offers',
        tasks: [
          'Create a brush pack or tutorial PDF',
          'Price it at $5-$15',
          'Drive 3 videos toward it',
          'Open 2 commission slots and close them by week end',
        ],
      },
      {
        title: 'Double down',
        tasks: [
          'Identify which format converted to sales',
          'Plan 4 weeks of that format',
          'Introduce a higher-tier commission',
          'Save best pieces for a quarterly print drop',
        ],
      },
    ],
    faq: [ // TODO(content): confirm FAQ copy
      {
        q: 'Do I need a big following to sell prints on TikTok?',
        a: 'No. Artists with 1K-5K followers regularly book commissions and sell prints. Clear commission CTAs and a good link-in-bio matter more than follower count.',
      },
      {
        q: 'Time-lapse or real-time process videos?',
        a: 'Both work. Time-lapses travel better but real-time tutorials with narration typically earn higher RPMs because watch time is longer.',
      },
      {
        q: 'Etsy or my own site?',
        a: 'Start with Etsy or Gumroad to validate demand. Move to your own Shopify once you are consistently selling more than platform fees eat.',
      },
    ],
    related: [
      { slug: 'musicians', name: 'Musicians', tag: 'Streams · sync · gifts' },
      { slug: 'teachers', name: 'Teachers & Educators', tag: 'Lessons · courses' },
      { slug: 'coaches', name: 'Coaches & Consultants', tag: 'High-ticket offers' },
    ],
  },
  teachers: {
    title: 'Monetization for Teachers and Educators on TikTok',
    headline: 'Your expertise is worth more than a salary alone',
    description:
      'Build authority, sell lesson resources, and keep your account compliant with Creator Rewards.',
    icon: '/images/niches/icon-teachers.svg',
    rpmRange: '$0.40 - $1.20',
    bestFormat: '60s+ explainer videos',
    difficulty: 'Low',
    focus: ['Course funnels', 'Affiliate tools', 'Community memberships', 'Lead magnets'],
    creators: [
      {
        name: 'Science with Mr. J',
        handle: 'sciencewithmrj',
        followers: '16.9K',
        description:
          'Working science teacher who films engaging experiment demonstrations and explains concepts in 60-second explainer videos. His practical classroom content proves you do not need a massive following to build authority.',
        lesson: 'Classroom experiment content has naturally high retention and directly converts to digital resource sales',
      },
      {
        name: 'Math with Menno',
        handle: 'mathwithmenno',
        followers: '49.6K',
        description:
          'Math educator who breaks down algebra and calculus concepts using visual explanations and real-world examples. His clear, step-by-step teaching style makes abstract math tangible for students at every level.',
        lesson: 'Practical application content in education drives both watch time and trust, leading to tutoring and course sales',
      },
      {
        name: 'Mrs. English Class',
        handle: 'mrsenglishclass',
        followers: '31.2K',
        description:
          'English teacher who creates grammar tips and vocabulary lessons for Thai speakers learning English. Her bilingual content serves a specific audience segment that converts well to digital resource sales.',
        lesson: 'Language education content attracts a broad audience beyond just students, opening up diverse monetization paths',
      },
      {
        name: 'English with Kayla',
        handle: 'englishwithkayla',
        followers: '180.7K',
        description:
          'English language educator who creates vocabulary and grammar content for learners worldwide. Her clear teaching style and engaging format have built a dedicated following of students and self-learners.',
        lesson: 'The pure educator model monetizes through Creator Rewards, digital products, and lesson plan sales at any follower count',
      },
    ],
    strategy: [
      {
        heading: 'Education content is high-RPM',
        body: 'Education niches consistently rank among the highest-RPM categories on TikTok. Advertiser demand for engaged, trust-forward audiences is strong. The key is content that answers specific, searchable questions. "How to memorize vocabulary" outperforms "study tips" in both qualified views and RPM.',
      },
      {
        heading: 'Sell the resource, not just the lesson',
        body: 'Teachers who monetize well on TikTok use the platform as top-of-funnel content and convert viewers into buyers of digital resources: templates, lesson packs, worksheets, mini-courses. Platforms like Stan Store and Gumroad make this technically simple.',
      },
      {
        heading: 'Email list as your real asset',
        body: 'TikTok accounts get suspended, algorithms change. An email list of students or parents who trust you is the most durable asset a teacher creator can build. Use every video to offer a free resource in exchange for an email. Kit (formerly ConvertKit) handles this well at the free tier.',
      },
    ],
    rpmNote:
      'Education content RPMs often range from $0.40 to $1.20 in US markets, making it one of the higher-value niches for Creator Rewards.',
    tools: [
      { name: 'Kit (ConvertKit)', description: 'Email list building and digital product delivery', href: '/guides/best-email-marketing-tiktok-creators' },
      { name: 'Gumroad', description: 'Sell lesson plans, worksheets, and mini-courses', href: '/guides/best-monetization-methods' },
      { name: 'Canva', description: 'Create professional worksheets and visual resources', href: '/guides/best-monetization-methods' },
    ],
    ultimateGuide: {
      slug: 'ultimate-educators-guide',
      label: 'Ultimate TikTok Monetization Guide for Educators',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Additional Reward Criteria', href: '/guides/additional-reward-criteria-2026' },
      { label: 'Multiple Revenue Streams', href: '/guides/multiple-revenue-streams' },
    ],
    titleItalic: 'educators',
    titleLower: 'educator',
    category: 'Education',
    updated: 'Apr 2026', // TODO(content): confirm updated date
    intro:
      'Build authority, sell lesson resources, and keep your account compliant with Creator Rewards.',
    heroImage: '/images/guides/hero-ultimate-educators-guide.webp',
    tagline: 'Build authority, sell lesson resources, keep your account compliant.',
    snapshot: [
      { label: 'Typical RPM', value: '$0.40 – $1.20', note: 'Education is one of the higher-value niches on TikTok.' },
      { label: 'Best format', value: '60s+ explainers', note: 'Specific, searchable questions beat vague study tips.' },
      { label: 'Difficulty', value: 'Low', note: 'You already have expertise; the platform just needs consistency.' },
      { label: 'Top lever', value: 'Sell resources', note: 'Lesson packs, worksheets, and mini-courses convert reliably.' }, // TODO(content): confirm
    ],
    reality: {
      title: 'Education is one of the highest-RPM niches. But the',
      italic: 'real money lives off-platform.',
      body: [
        'TikTok accounts get suspended, algorithms shift. An email list of students or parents who trust you is the most durable asset a teacher creator can build.',
        'Use every video to offer a free resource in exchange for an email. The compounding value of that list outpaces any single video.',
      ],
    }, // TODO(content): confirm reality-check copy
    levers: [
      {
        title: 'Education is high-RPM',
        tag: 'HIGH RPM',
        body: 'Education niches consistently rank among the highest-RPM categories. Advertiser demand for engaged, trust-forward audiences is strong. Videos answering specific, searchable questions outperform vague study tips.',
        typical: '$0.40 – $1.20 RPM',
        effort: 2,
      },
      {
        title: 'Sell the resource, not just the lesson',
        tag: 'COMPOUNDING',
        body: 'Teachers who monetize well use TikTok as top-of-funnel content and convert viewers into buyers of digital resources: templates, lesson packs, worksheets, mini-courses.',
        typical: '$500 – 5k / mo', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'Email list as your real asset',
        tag: 'DURABLE',
        body: 'TikTok accounts get suspended and reach drops. An email list of students or parents who trust you is the most durable asset a teacher creator can build.',
        typical: 'Compounds over time', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'Memberships and community',
        tag: 'RECURRING',
        body: 'A paid community or monthly resource drop turns one-time viewers into predictable income. Works best once you have 5K+ followers and a clear topic.', // TODO(content): confirm
        typical: '$300 – 3k / mo', // TODO(content): confirm
        effort: 4,
      },
    ],
    toolRows: [
      { name: 'Kit (ConvertKit)', desc: 'Email list building and digital product delivery', cat: 'Email', price: 'Free / $15mo', take: 'Must-have' }, // TODO(content): confirm price
      { name: 'Gumroad', desc: 'Sell lesson plans, worksheets, and mini-courses', cat: 'Commerce', price: '10% fee', take: 'Must-have' },
      { name: 'Canva', desc: 'Create professional worksheets and visual resources', cat: 'Production', price: 'Free / $15mo', take: 'Solid' }, // TODO(content): confirm price
    ],
    plan: [ // TODO(content): confirm plan copy
      {
        title: 'Set the foundation',
        tasks: [
          'Pick one subject or grade to focus on',
          'Create a free resource (cheat sheet or PDF)',
          'Set up a Kit account and the opt-in form',
          'Add the free resource link to your bio',
        ],
      },
      {
        title: 'Publish explainers',
        tasks: [
          'Post 5 explainer videos answering specific student questions',
          'Drive each video toward the free resource',
          'Respond to every comment on top 3 videos',
          'Track email signups daily',
        ],
      },
      {
        title: 'Launch a paid resource',
        tasks: [
          'Scope a $9-$19 lesson pack or worksheet bundle',
          'Build it in Canva or Google Docs',
          'List on Gumroad with a clear checkout',
          'Promote through 3 short explainer videos',
        ],
      },
      {
        title: 'Double down',
        tasks: [
          'Identify which topic converted',
          'Plan 4 weeks around that topic',
          'Introduce a larger mini-course ($29-$79)',
          'Email your list every time a new video lands',
        ],
      },
    ],
    faq: [ // TODO(content): confirm FAQ copy
      {
        q: 'Do I need to be a currently employed teacher to monetize education content?',
        a: 'No. Many top education creators are former teachers, tutors, or subject-matter experts. Being current gives you fresh student pain points; not being current gives you more time.',
      },
      {
        q: 'How do I stay compliant with my school district while posting?',
        a: 'Avoid filming students, district materials, or specific incidents. Keep content general and your own IP. Check your district’s social media policy before posting.',
      },
      {
        q: 'Is a paid community better than one-off resources?',
        a: 'Paid communities are more durable once you pass 5K engaged followers. Start with one-off resources to validate what sells, then bundle into a membership.',
      },
    ],
    related: [
      { slug: 'coaches', name: 'Coaches & Consultants', tag: 'High-ticket offers' },
      { slug: 'artists', name: 'Artists', tag: 'Process · tutorials' },
      { slug: 'fitness-creators', name: 'Fitness Creators', tag: 'Programs · live' },
    ],
  },
  beauty: {
    title: 'Monetization for Beauty Creators on TikTok',
    headline: 'Transform tutorials and reviews into real revenue',
    description:
      'Monetize tutorials, reviews, and affiliate deals in the beauty space.',
    icon: '/images/niches/icon-beauty.svg',
    rpmRange: '$0.20 - $0.90',
    bestFormat: 'GRWM + review videos',
    difficulty: 'Medium',
    focus: ['Affiliate reviews', 'Creator Rewards', 'Brand partnerships', 'Product launches'],
    creators: [
      {
        name: 'Rowi Singh',
        handle: 'rowisingh',
        followers: '452K',
        description:
          'Indian-Australian makeup artist known for bold, editorial looks that blend traditional South Asian beauty techniques with modern editorial styles. Her GRWM videos consistently earn strong watch times through storytelling paired with step-by-step application.',
        lesson: 'Culturally specific beauty content reaches an underserved audience and commands stronger engagement than generic tutorials',
      },
      {
        name: 'Ava Lee',
        handle: 'glowwithava',
        followers: '198K',
        description:
          'Skincare and minimal makeup creator who focuses on achievable everyday routines and drugstore product reviews. Her "get ready with me" morning routine videos consistently hit 60-second-plus watch times.',
        lesson: 'Accessible, budget-friendly beauty content converts viewers into affiliate buyers at higher rates than luxury-focused content',
      },
      {
        name: 'Christen Dominique',
        handle: 'christendominique',
        followers: '340K',
        description:
          'Makeup artist and beauty entrepreneur who shares professional-level tutorials and product reviews on TikTok. She built a dedicated following through detailed technique breakdowns and honest first impressions of trending products.',
        lesson: 'Combining tutorial expertise with genuine product opinions builds a monetizable audience that trusts your affiliate recommendations',
      },
      {
        name: 'Kelli Anne Sewell',
        handle: 'makeupxka',
        followers: '213K',
        description:
          'NYC-based makeup artist sharing makeup tutorials, product reviews, and skin prep tips. Her professional MUA background gives her content a polished, technique-focused edge that keeps viewers watching through full application routines.',
        lesson: 'Professional credentials paired with accessible tutorial content build trust that converts directly into affiliate sales and brand partnerships',
      },
      {
        name: 'Tamar',
        handle: 'glowbytamar',
        followers: '122K',
        description:
          'Licensed esthetician posting honest skincare product reviews with a focus on TikTok Shop products. Her clinical background lends credibility to her recommendations, and her straightforward review style builds audience trust.',
        lesson: 'Licensed professionals who review products honestly build a highly trusting audience that converts at above-average rates on affiliate and shop links',
      },
    ],
    strategy: [
      {
        heading: 'Honest reviews build affiliate income',
        body: 'Beauty creators who review products honestly (including negative reviews) earn higher affiliate conversion rates than those who only promote. Audiences learn to trust your recommendations, which means higher click-through rates on affiliate links. One well-received review can outperform dozens of promotional posts.',
      },
      {
        heading: 'GRWM content drives watch time',
        body: 'Get Ready With Me videos are among the highest-retention formats in beauty TikTok. The narrative structure (start to finish transformation) keeps viewers watching. Pair these with product links and Creator Rewards optimization (60+ second videos) for compounding returns.',
      },
      {
        heading: 'Build toward your own product',
        body: 'The most profitable beauty creators eventually launch their own line. TikTok gives you direct audience feedback on what products your followers actually want. Start by testing with affiliate products, then use those insights to develop your own.',
      },
    ],
    rpmNote:
      'Beauty content RPMs typically range from $0.20 to $0.90. Tutorial and review content with US audiences trend higher than haul or unboxing content.',
    tools: [
      { name: 'Amazon Associates', description: 'Earn commissions on beauty product recommendations', href: '/guides/best-monetization-methods' },
      { name: 'Stan Store', description: 'Create a storefront for your recommended products', href: '/guides/best-monetization-methods' },
      { name: 'Kit (ConvertKit)', description: 'Build an email list for product launch announcements', href: '/guides/best-email-marketing-tiktok-creators' },
    ],
    ultimateGuide: {
      slug: 'ultimate-beauty-guide',
      label: 'Ultimate TikTok Monetization Guide for Beauty Creators',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Best Monetization Methods', href: '/guides/best-monetization-methods' },
      { label: 'Multiple Revenue Streams', href: '/guides/multiple-revenue-streams' },
    ],
    titleItalic: 'beauty creators',
    titleLower: 'beauty creator',
    category: 'Beauty',
    updated: 'Apr 2026', // TODO(content): confirm updated date
    intro:
      'Monetize tutorials, reviews, and affiliate deals in the beauty space.',
    heroImage: '/images/guides/hero-ultimate-beauty-guide.webp',
    tagline: 'Monetize tutorials, reviews, and affiliate deals in the beauty space.',
    snapshot: [
      { label: 'Typical RPM', value: '$0.20 – $0.90', note: 'Tutorials and reviews trend higher than haul or unboxing content.' },
      { label: 'Best format', value: 'GRWM + reviews', note: 'Narrative transformation keeps viewers watching end-to-end.' },
      { label: 'Difficulty', value: 'Medium', note: 'Saturated niche; trust-building beats production value.' }, // TODO(content): confirm
      { label: 'Top lever', value: 'Honest reviews', note: 'Trust-earned affiliate conversions outpace promo-only accounts.' }, // TODO(content): confirm
    ],
    reality: {
      title: 'Anyone can post a haul. What pays is',
      italic: 'trust you earn one review at a time.',
      body: [
        'Beauty creators who review products honestly (including negative reviews) earn higher affiliate conversion rates than those who only promote.',
        'Audiences learn to trust your recommendations, which drives higher click-through on affiliate links. One well-received review can outperform dozens of promotional posts.',
      ],
    }, // TODO(content): confirm reality-check copy
    levers: [
      {
        title: 'Honest reviews build affiliate income',
        tag: 'TRUST-LED',
        body: 'Beauty creators who review products honestly earn higher affiliate conversion rates. Audiences trust your recommendations, which raises click-through rates on affiliate links.',
        typical: '$300 – 3k / mo', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'GRWM drives watch time',
        tag: 'FOUNDATION',
        body: 'Get Ready With Me videos are among the highest-retention formats in beauty TikTok. The narrative structure keeps viewers watching, which compounds Creator Rewards payouts.',
        typical: '$0.20 – $0.90 RPM',
        effort: 2,
      },
      {
        title: 'Brand partnerships',
        tag: 'HIGH VALUE',
        body: 'Beauty brands pay for trust-adjacent audiences. Rates start around $500 per post at 25K followers; real deals open up at 100K.',
        typical: '$500 – 5k / deal', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'Build toward your own product',
        tag: 'COMPOUNDING',
        body: 'The most profitable beauty creators launch their own line. TikTok gives direct feedback on what your audience wants. Test with affiliates, then develop your own.',
        typical: 'Varies wildly', // TODO(content): confirm
        effort: 5,
      },
    ],
    toolRows: [
      { name: 'Amazon Associates', desc: 'Earn commissions on beauty product recommendations', cat: 'Affiliate', price: 'Free', take: 'Must-have' },
      { name: 'Stan Store', desc: 'Create a storefront for your recommended products', cat: 'Commerce', price: 'Free / $29mo', take: 'Solid' }, // TODO(content): confirm price
      { name: 'Kit (ConvertKit)', desc: 'Build an email list for product launch announcements', cat: 'Email', price: 'Free / $15mo', take: 'Solid' }, // TODO(content): confirm price
    ],
    plan: [ // TODO(content): confirm plan copy
      {
        title: 'Set up affiliate rails',
        tasks: [
          'Apply for Amazon Associates and TikTok Shop affiliate',
          'Pick 5 products you already use and trust',
          'Add affiliate links to bio and pinned comments',
          'Film 2 honest review videos',
        ],
      },
      {
        title: 'Ship GRWM consistently',
        tasks: [
          'Post 5 GRWM or review videos this week',
          'Reply to every comment on top 3 videos',
          'Test a "drugstore dupe" comparison',
          'Pin the best-performing review',
        ],
      },
      {
        title: 'Pitch brands',
        tasks: [
          'Build a simple one-page media kit',
          'Pitch 5 brands you already love',
          'Track pitch responses in a sheet',
          'Deliver one paid or gifted collaboration',
        ],
      },
      {
        title: 'Scale the winner',
        tasks: [
          'Identify the format that drove the most affiliate clicks',
          'Plan 4 weeks around that format',
          'Bundle favorites into a curated Amazon storefront',
          'Sketch the first version of your own product',
        ],
      },
    ],
    faq: [ // TODO(content): confirm FAQ copy
      {
        q: 'Do I need professional makeup skills to monetize beauty content?',
        a: 'No. Relatable, accessible beauty content often outperforms pro-level tutorials because viewers see themselves in it. Skill helps at higher tiers.',
      },
      {
        q: 'TikTok Shop or Amazon affiliates?',
        a: 'Both. TikTok Shop converts natively in-app; Amazon captures off-platform purchases later. Running both covers more buying intent.',
      },
      {
        q: 'Are negative reviews safe to post?',
        a: 'Yes, and they often perform better than positive ones. Keep the tone fair and specific. Avoid personal attacks on brands or founders.',
      },
    ],
    related: [
      { slug: 'fitness-creators', name: 'Fitness Creators', tag: 'Programs · affiliates' },
      { slug: 'artists', name: 'Artists', tag: 'Process content · prints' },
      { slug: 'coaches', name: 'Coaches & Consultants', tag: 'High-ticket offers' },
    ],
  },
  comedy: {
    title: 'Monetization for Comedians on TikTok',
    headline: 'Comedy is high-RPM if you play it right',
    description:
      'Monetize skits, series, and superfans. Comedy content earns strong Creator Rewards when optimized for watch time.',
    icon: '/images/niches/icon-comedy.svg',
    rpmRange: '$0.30 - $1.00',
    bestFormat: '60s+ skits and series',
    difficulty: 'Medium-High',
    focus: ['Skits and series', 'Creator Rewards', 'Superfan monetization', 'Brand comedy deals'],
    creators: [
      {
        name: 'Brandon Caleb',
        handle: 'brandoncaleb',
        followers: '420K',
        description:
          'Character-based comedy creator whose recurring office and family characters keep viewers coming back. His consistent posting schedule and recognizable format drive high return viewership rates.',
        lesson: 'Character-based comedy builds retention and return viewership, critical for Creator Rewards qualification',
      },
      {
        name: 'Hulk The Comedian',
        handle: 'hulkthecomedian',
        followers: '396K',
        description:
          'Character-based skit creator who performs as "Cousin Hulk" in the Kountry Wayne comedy universe. Built a dedicated following through consistent character work and relatable Southern humor.',
        lesson: 'Joining an existing comedy universe (collaborations with bigger creators) accelerates growth while you build your own brand',
      },
      {
        name: 'Trey da Comedian',
        handle: 'trey_da_comedian1',
        followers: '317K',
        description:
          'Texas-based comedy creator focused on parody and relatable everyday skit content. His "laughter is good for the soul" approach keeps content brand-safe while staying genuinely funny.',
        lesson: 'Relatable, everyday humor with a clean tone attracts both audiences and brand deal opportunities at any follower count',
      },
      {
        name: 'Dave Fein',
        handle: 'davefeincomedian',
        followers: '276K',
        description:
          'Stand-up comedian building his touring career through TikTok. Uses short clips of crowd work and original bits to drive ticket sales and grow his live audience.',
        lesson: 'TikTok comedy clips work as free advertising for live shows, turning views into ticket sales even at sub-500K followings',
      },
    ],
    strategy: [
      {
        heading: 'Series and recurring characters drive retention',
        body: 'One-off jokes get views but series content gets followers. Recurring characters or comedy formats create anticipation. Viewers come back, which signals to the algorithm that your content has long-term value. Series content also pushes watch time above the qualified view threshold.',
      },
      {
        heading: 'Brand deals pay more than Creator Rewards',
        body: 'Comedy creators who can integrate brand messages naturally command some of the highest rates for sponsored content. A single brand-safe comedy skit can earn $5K-$50K depending on your audience size. The key is maintaining your voice while delivering the brand message.',
      },
      {
        heading: 'Superfan monetization is underexplored',
        body: 'TikTok superfan features let your most engaged followers support you directly. Comedy creators often have the most dedicated fan bases. Combine this with merchandise, live shows, or a Patreon for behind-the-scenes content to build recurring revenue.',
      },
    ],
    rpmNote:
      'Comedy content RPMs typically range from $0.30 to $1.00. Longer skits (60s+) with strong watch-through rates earn significantly more than short punchline clips.',
    tools: [
      { name: 'CapCut', description: 'Edit skits and add effects optimized for TikTok', href: '/guides/best-monetization-methods' },
      { name: 'Stan Store', description: 'Sell merchandise and digital products to fans', href: '/guides/best-monetization-methods' },
      { name: 'Patreon', description: 'Offer behind-the-scenes content to superfans', href: '/guides/best-monetization-methods' },
    ],
    ultimateGuide: {
      slug: 'ultimate-comedy-guide',
      label: 'Ultimate TikTok Monetization Guide for Comedians',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Best Monetization Methods', href: '/guides/best-monetization-methods' },
      { label: 'Growing from 5K to 10K Followers', href: '/guides/grow-5k-to-10k' },
    ],
    titleItalic: 'comedians',
    titleLower: 'comedian',
    category: 'Entertainment',
    updated: 'Apr 2026', // TODO(content): confirm updated date
    intro:
      'Monetize skits, series, and superfans. Comedy content earns strong Creator Rewards when optimized for watch time.',
    heroImage: '/images/guides/hero-ultimate-comedy-guide.webp',
    tagline: 'Monetize skits, series, and superfans — comedy is high-RPM if done right.',
    snapshot: [
      { label: 'Typical RPM', value: '$0.30 – $1.00', note: 'Longer skits with strong watch-through earn significantly more.' },
      { label: 'Best format', value: '60s+ skits', note: 'Series and recurring characters compound retention.' },
      { label: 'Difficulty', value: 'Medium – High', note: 'Tone, timing, and consistent cadence are the hard parts.' }, // TODO(content): confirm
      { label: 'Top lever', value: 'Brand deals', note: 'Brand-safe comedy commands some of the highest sponsored rates.' }, // TODO(content): confirm
    ],
    reality: {
      title: 'One-off jokes get views. What pays is',
      italic: 'a world people come back to.',
      body: [
        'Recurring characters or comedy formats create anticipation. Viewers come back, the algorithm notices, and watch time sits above the qualified view threshold.',
        'Comedy creators who can integrate brand messages naturally command the highest rates for sponsored content. Your voice is the product.',
      ],
    }, // TODO(content): confirm reality-check copy
    levers: [
      {
        title: 'Series and recurring characters',
        tag: 'RETENTION',
        body: 'Series content gets followers, not just views. Recurring characters create anticipation. Viewers come back, signaling to the algorithm that your content has long-term value.',
        typical: '$0.30 – $1.00 RPM',
        effort: 4,
      },
      {
        title: 'Brand deals',
        tag: 'HIGH VALUE',
        body: 'A single brand-safe comedy skit can earn $5k-$50k depending on audience size. The key is maintaining your voice while delivering the brand message.',
        typical: '$2k – 25k / deal', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'Superfan monetization',
        tag: 'UNDEREXPLORED',
        body: 'TikTok superfan features let your most engaged followers support you directly. Comedy creators often have the most dedicated fan bases.',
        typical: '$200 – 2k / mo', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'Merch and live shows',
        tag: 'COMPOUNDING',
        body: 'Merchandise, live shows, and a Patreon for behind-the-scenes content build recurring revenue on top of viral moments.',
        typical: '$500 – 5k / mo', // TODO(content): confirm
        effort: 4,
      },
    ],
    toolRows: [
      { name: 'CapCut', desc: 'Edit skits and add effects optimized for TikTok', cat: 'Production', price: 'Free / Pro', take: 'Must-have' },
      { name: 'Stan Store', desc: 'Sell merchandise and digital products to fans', cat: 'Commerce', price: 'Free / $29mo', take: 'Solid' }, // TODO(content): confirm price
      { name: 'Patreon', desc: 'Offer behind-the-scenes content to superfans', cat: 'Membership', price: '5-12% fee', take: 'Optional' }, // TODO(content): confirm
    ],
    plan: [ // TODO(content): confirm plan copy
      {
        title: 'Nail one format',
        tasks: [
          'Pick one character or comedy format',
          'Write and film 3 episodes this week',
          'Post them on a predictable schedule',
          'Pin the first episode as a series entry-point',
        ],
      },
      {
        title: 'Build anticipation',
        tasks: [
          'Continue the series with 3 more episodes',
          'Reply to every top-performing comment',
          'Tease episode 7 in the last frame of episode 6',
          'Track average watch-through per episode',
        ],
      },
      {
        title: 'Monetize the fans',
        tasks: [
          'Open a Stan Store or merch drop',
          'Announce a signed postcard or quote shirt',
          'Test a live Q&A with your characters',
          'Set up superfan support',
        ],
      },
      {
        title: 'Pitch brand deals',
        tasks: [
          'Build a media kit with your top 3 series',
          'Pitch 5 brand-safe advertisers directly',
          'Deliver one paid integration keeping your voice',
          'Review numbers and double down on the winning series',
        ],
      },
    ],
    faq: [ // TODO(content): confirm FAQ copy
      {
        q: 'Does comedy content get demoted on TikTok?',
        a: 'Not categorically. What gets demoted is content flagged as unoriginal, hateful, or sensitive. Clean, original comedy with strong watch time performs as well as any niche.',
      },
      {
        q: 'Do I need to shoot skits with other creators?',
        a: 'Not at the start. Solo character work is easier to produce and often more memorable. Collaborations speed growth once you have a format that works.',
      },
      {
        q: 'How do I land brand deals as a comedian?',
        a: 'Build a portfolio of brand-safe episodes first. Pitch brands you already reference or could parody gently. Rates start around $500-$2k at 50K followers.',
      },
    ],
    related: [
      { slug: 'musicians', name: 'Musicians', tag: 'Streams · sync · gifts' },
      { slug: 'artists', name: 'Artists', tag: 'Process · prints' },
      { slug: 'travel', name: 'Travel Creators', tag: 'Partnerships · affiliate' },
    ],
  },
  coaches: {
    title: 'Monetization for Coaches and Consultants on TikTok',
    headline: 'Turn authority content into clients and courses',
    description:
      'Build a content-to-client funnel that converts TikTok views into high-ticket coaching revenue.',
    icon: '/images/niches/icon-coaches.svg',
    rpmRange: '$0.30 - $0.90',
    bestFormat: '60s+ actionable tips',
    difficulty: 'Medium',
    focus: ['High-ticket offers', 'Content-to-client funnel', 'Creator Rewards', 'Email list building'],
    creators: [
      {
        name: 'Vanessa Lau',
        handle: 'vanessalauco',
        followers: '92K',
        description:
          'Online business coach who teaches content creators how to build sustainable income through social media. Her "build a business, not just an audience" messaging resonates with aspiring creator-entrepreneurs.',
        lesson: 'Short clips demonstrating a specific framework or method drive course sales and coaching inquiries',
      },
      {
        name: 'Tiffany Carter',
        handle: 'projectme_with_tiffany',
        followers: '426K',
        description:
          'Business and online income coach who teaches women to monetize online. Millionaire entrepreneur with 5.3M+ likes, proving that coaching content in the 400K range can drive real client revenue through TikTok funnels.',
        lesson: 'A content-to-client funnel on TikTok can replace traditional marketing for coaching businesses',
      },
      {
        name: 'Charity Rogers',
        handle: 'charityrogers_',
        followers: '363K',
        description:
          'TikTok-specific business coach who teaches entrepreneurs how to grow and monetize on the platform. 5.3M likes. Meta-example: a TikTok coach who uses TikTok to prove her own methods work.',
        lesson: 'Teaching what you practice on the same platform creates instant credibility and a self-reinforcing growth loop',
      },
      {
        name: 'Natalie Bacon',
        handle: 'nataliebacon',
        followers: '142K',
        description:
          'Life and mindset coach who teaches productivity, goal-setting, and intentional living. Her structured framework-based content walks viewers through a specific concept in each video, building trust before pitching her coaching program.',
        lesson: 'Framework-first coaching content builds credibility faster than motivational content and converts better to paid offers',
      },
      {
        name: 'Marc Chinkoun',
        handle: 'marcchinkoun',
        followers: '459.8K',
        description:
          'E-commerce coaching specialist who built a mid-tier TikTok audience through practical, actionable business advice focused on online selling.',
        lesson: 'Mid-tier coaching creators can build sustainable audiences at sub-500K and monetize through their own coaching packages',
      },
    ],
    strategy: [
      {
        heading: 'Content-to-client funnel is your primary strategy',
        body: 'Every TikTok you post should move viewers toward your offer. Free value builds trust, specific advice demonstrates competence, and a clear call-to-action (link in bio, free call booking, email list) converts attention into clients. The funnel is: discovery video, profile visit, link click, email capture, sales conversation.',
      },
      {
        heading: 'High-ticket offers outperform Creator Rewards',
        body: 'A single coaching client at $2K-$10K can equal months of Creator Rewards income. The best coaching creators on TikTok view Rewards as supplemental income while using the platform primarily as a client acquisition tool.',
      },
      {
        heading: 'Email list is your insurance policy',
        body: 'TikTok accounts get suspended, reach drops, algorithms shift. An email list of potential clients is the asset that survives platform changes. Offer a free resource (checklist, template, mini-course) in exchange for an email on every video.',
      },
    ],
    rpmNote:
      'Coaching and consulting content RPMs typically range from $0.30 to $0.90. Business advice content with US audiences tends toward the higher end due to advertiser demand.',
    tools: [
      { name: 'Calendly', description: 'Book discovery calls directly from your link in bio', href: '/guides/best-monetization-methods' },
      { name: 'Kit (ConvertKit)', description: 'Email list building and nurture sequences', href: '/guides/best-email-marketing-tiktok-creators' },
      { name: 'Stan Store', description: 'Sell courses, templates, and coaching packages', href: '/guides/best-monetization-methods' },
    ],
    ultimateGuide: {
      slug: 'ultimate-coaches-guide',
      label: 'Ultimate TikTok Monetization Guide for Coaches and Consultants',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Best Monetization Methods', href: '/guides/best-monetization-methods' },
      { label: 'Multiple Revenue Streams', href: '/guides/multiple-revenue-streams' },
    ],
    titleItalic: 'coaches and consultants',
    titleLower: 'coach',
    category: 'Business',
    updated: 'Apr 2026', // TODO(content): confirm updated date
    intro:
      'Build a content-to-client funnel that converts TikTok views into high-ticket coaching revenue.',
    heroImage: '/images/guides/hero-ultimate-coaches-guide.webp',
    tagline: 'Turn authority content into clients, courses, and recurring revenue.',
    snapshot: [
      { label: 'Typical RPM', value: '$0.30 – $0.90', note: 'Business advice with US audiences trends higher.' },
      { label: 'Best format', value: '60s+ tips', note: 'Framework-first videos beat motivational content.' },
      { label: 'Difficulty', value: 'Medium', note: 'Authority compounds fast once a framework clicks.' }, // TODO(content): confirm
      { label: 'Top lever', value: 'High-ticket', note: 'One client at $2k-$10k equals months of Creator Rewards.' }, // TODO(content): confirm
    ],
    reality: {
      title: 'Views are vanity. Clients are',
      italic: 'where coaching money lives.',
      body: [
        'A single coaching client at $2k-$10k can equal months of Creator Rewards income. Treat Rewards as supplemental and TikTok as a client acquisition channel.',
        'Every video should move viewers toward your offer: free value builds trust, specific advice demonstrates competence, a clear CTA converts attention into clients.',
      ],
    }, // TODO(content): confirm reality-check copy
    levers: [
      {
        title: 'Content-to-client funnel',
        tag: 'PRIMARY',
        body: 'Every TikTok you post should move viewers toward your offer. Free value builds trust, specific advice demonstrates competence, a clear CTA converts attention into clients.',
        typical: '1 – 5 clients / mo', // TODO(content): confirm
        effort: 4,
      },
      {
        title: 'High-ticket offers',
        tag: 'HIGH VALUE',
        body: 'A single coaching client at $2k-$10k can equal months of Creator Rewards income. The best coaching creators treat Rewards as supplemental.',
        typical: '$2k – 10k / client', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'Email list',
        tag: 'DURABLE',
        body: 'TikTok accounts get suspended, reach drops, algorithms shift. An email list of potential clients is the asset that survives platform changes.',
        typical: 'Compounds over time', // TODO(content): confirm
        effort: 3,
      },
      {
        title: 'Productized courses and templates',
        tag: 'SCALABLE',
        body: 'Turn the most repeatable parts of your coaching into a course or template pack. Your 1:1 time is the ceiling; productization lifts it.', // TODO(content): confirm
        typical: '$500 – 5k / mo', // TODO(content): confirm
        effort: 4,
      },
    ],
    toolRows: [
      { name: 'Calendly', desc: 'Book discovery calls directly from your link in bio', cat: 'Booking', price: 'Free / $12mo', take: 'Must-have' }, // TODO(content): confirm price
      { name: 'Kit (ConvertKit)', desc: 'Email list building and nurture sequences', cat: 'Email', price: 'Free / $15mo', take: 'Must-have' }, // TODO(content): confirm price
      { name: 'Stan Store', desc: 'Sell courses, templates, and coaching packages', cat: 'Commerce', price: 'Free / $29mo', take: 'Solid' }, // TODO(content): confirm price
    ],
    plan: [ // TODO(content): confirm plan copy
      {
        title: 'Define the offer',
        tasks: [
          'Pick one high-ticket offer ($1k-$5k)',
          'Write a one-sentence pitch for it',
          'Build a Calendly link for discovery calls',
          'Add the link to your bio',
        ],
      },
      {
        title: 'Post the framework',
        tasks: [
          'Post 5 videos teaching a specific piece of your method',
          'Drive each video toward the free resource or call link',
          'Reply to every comment on top 3 videos',
          'Track call bookings daily',
        ],
      },
      {
        title: 'Close first clients',
        tasks: [
          'Take every discovery call that books',
          'Close 2-3 first clients at a friendly rate',
          'Collect testimonials and case studies',
          'Feature one testimonial in a new video',
        ],
      },
      {
        title: 'Scale what converts',
        tasks: [
          'Identify the topic that converted best',
          'Plan 4 weeks around that topic',
          'Raise your rate',
          'Productize one repeatable deliverable',
        ],
      },
    ],
    faq: [ // TODO(content): confirm FAQ copy
      {
        q: 'Do I need a certification to coach on TikTok?',
        a: 'Not legally for most categories, but specific domains (therapy, finance, medical) do. Credentials raise conversion rates even when not required.',
      },
      {
        q: 'How many followers before I can sell coaching?',
        a: 'You can sell coaching at any follower count if your content matches a real pain. Many coaches close $2k-$5k clients below 5K followers through specific niche content.',
      },
      {
        q: 'Is TikTok a good channel for high-ticket offers?',
        a: 'Yes, if you route viewers off-platform fast. TikTok builds trust at scale; email, calls, and longer-form content close the sale.',
      },
    ],
    related: [
      { slug: 'teachers', name: 'Teachers & Educators', tag: 'Lessons · courses' },
      { slug: 'fitness-creators', name: 'Fitness Creators', tag: 'Programs · live' },
      { slug: 'beauty', name: 'Beauty Creators', tag: 'Reviews · affiliate' },
    ],
  },
  travel: {
    title: 'Monetization for Travel Creators on TikTok',
    headline: 'Get paid to explore the world through short-form content',
    description:
      'Earn from travel content with partnerships, affiliates, and Creator Rewards.',
    icon: '/images/niches/icon-travel.svg',
    rpmRange: '$0.20 - $0.75',
    bestFormat: '60s+ destination guides',
    difficulty: 'Medium-High',
    focus: ['Travel partnerships', 'Affiliate hotels + gear', 'Creator Rewards', 'Brand campaigns'],
    creators: [
      {
        name: 'Helene in Between',
        handle: 'heleneinbetween',
        followers: '366.4K',
        description:
          'Solo female travel creator and blogger who shares practical destination guides, packing tips, and travel hacks. Her content bridges the gap between aspirational travel content and actionable planning advice.',
        lesson: 'Niche positioning (solo female adventure travel) creates deeper audience loyalty and stronger brand deal appeal',
      },
      {
        name: 'Trent + Sarah',
        handle: 'riotravelers',
        followers: '495K',
        description:
          'Budget travel couple specializing in off-the-beaten-track destinations. Their "how we afford to travel" content directly addresses the #1 question aspiring travel creators have, making it highly shareable.',
        lesson: 'Budget travel content is more relatable and actionable than luxury travel, driving higher engagement per follower',
      },
      {
        name: 'Em',
        handle: 'emsbudgettravel',
        followers: '103K',
        description:
          'Visited 17 countries in 2024 while working a 9-to-5 job. Her content proves travel creation is accessible to anyone with PTO and a plan, making her relatable to viewers who are not full-time creators.',
        lesson: 'You do not need to quit your job to build a travel audience. Part-time creators at 100K can monetize through gear affiliates and tourism partnerships.',
      },
    ],
    strategy: [
      {
        heading: 'Destination guides earn strong watch time',
        body: 'Travel content that answers "what is this place actually like?" earns higher retention than aspirational montages. Structure your videos as mini-guides: where to go, what it costs, what to avoid. These hit qualified view thresholds and have perennial search value.',
      },
      {
        heading: 'Tourism boards and hotels pay for visibility',
        body: 'Travel creators have access to some of the highest-value brand partnerships available on TikTok. Tourism boards, hotel chains, airlines, and travel gear brands actively seek creators with engaged audiences. Even at 50K followers, you can negotiate free stays and paid partnerships.',
      },
      {
        heading: 'Gear affiliate links compound over time',
        body: 'Travel gear (backpacks, cameras, packing cubes, travel adapters) has strong affiliate potential because viewers trust recommendations from creators who actually use the gear. Amazon Associates links in your bio, updated for each trip, create passive income that compounds with your content library.',
      },
    ],
    rpmNote:
      'Travel content RPMs typically range from $0.20 to $0.75. Destination guide content with practical advice trends higher than montage-style content.',
    tools: [
      { name: 'Amazon Associates', description: 'Earn commissions on travel gear recommendations', href: '/guides/best-monetization-methods' },
      { name: 'Booking.com Affiliate', description: 'Earn from hotel and accommodation bookings', href: '/guides/best-monetization-methods' },
      { name: 'CapCut', description: 'Edit cinematic travel content optimized for TikTok', href: '/guides/best-monetization-methods' },
    ],
    ultimateGuide: {
      slug: 'ultimate-travel-guide',
      label: 'Ultimate TikTok Monetization Guide for Travel Creators',
    },
    relatedGuides: [
      { label: 'TikTok Creator Rewards 2026 Guide', href: '/guides/creator-rewards-2026' },
      { label: 'Best Monetization Methods', href: '/guides/best-monetization-methods' },
      { label: 'Growing from 5K to 10K Followers', href: '/guides/grow-5k-to-10k' },
    ],
    titleItalic: 'travel creators',
    titleLower: 'travel creator',
    category: 'Travel',
    updated: 'Apr 2026', // TODO(content): confirm updated date
    intro:
      'Earn from travel content with partnerships, affiliates, and Creator Rewards.',
    heroImage: '/images/guides/hero-ultimate-travel-guide.webp',
    tagline: 'Earn from travel content with partnerships, affiliates, and Creator Rewards.',
    snapshot: [
      { label: 'Typical RPM', value: '$0.20 – $0.75', note: 'Destination guide content with practical advice trends higher.' },
      { label: 'Best format', value: '60s+ guides', note: 'Practical mini-guides beat aspirational montages.' },
      { label: 'Difficulty', value: 'Medium – High', note: 'Travel cost and logistics raise the bar; partnerships offset it.' }, // TODO(content): confirm
      { label: 'Top lever', value: 'Partnerships', note: 'Tourism boards and hotels pay for visibility at 50K+ followers.' }, // TODO(content): confirm
    ],
    reality: {
      title: 'Montages travel. What pays is',
      italic: 'what you tell people to actually do.',
      body: [
        'Travel content that answers "what is this place actually like?" earns higher retention than aspirational montages. Structure videos as mini-guides: where to go, what it costs, what to avoid.',
        'Tourism boards, hotels, airlines, and travel gear brands actively seek creators with engaged audiences. Even at 50K followers, free stays and paid partnerships are within reach.',
      ],
    }, // TODO(content): confirm reality-check copy
    levers: [
      {
        title: 'Destination guides',
        tag: 'FOUNDATION',
        body: 'Structure videos as mini-guides: where to go, what it costs, what to avoid. These hit qualified view thresholds and have perennial search value.',
        typical: '$0.20 – $0.75 RPM',
        effort: 3,
      },
      {
        title: 'Tourism boards and hotel partnerships',
        tag: 'HIGH VALUE',
        body: 'Travel creators have access to some of the highest-value brand partnerships available. Even at 50K followers, you can negotiate free stays and paid partnerships.',
        typical: '$500 – 5k / deal', // TODO(content): confirm
        effort: 4,
      },
      {
        title: 'Gear affiliates',
        tag: 'COMPOUNDING',
        body: 'Travel gear (backpacks, cameras, packing cubes, adapters) has strong affiliate potential. Amazon Associates links in bio, refreshed per trip, create passive income.',
        typical: '$100 – 1.5k / mo', // TODO(content): confirm
        effort: 2,
      },
      {
        title: 'Booking affiliates',
        tag: 'RECURRING',
        body: 'Booking.com and hotel affiliate programs pay per booking. Works well when your content is destination-specific with a clear call to action.', // TODO(content): confirm
        typical: '$200 – 2k / mo', // TODO(content): confirm
        effort: 3,
      },
    ],
    toolRows: [
      { name: 'Amazon Associates', desc: 'Earn commissions on travel gear recommendations', cat: 'Affiliate', price: 'Free', take: 'Must-have' },
      { name: 'Booking.com Affiliate', desc: 'Earn from hotel and accommodation bookings', cat: 'Affiliate', price: 'Free', take: 'Solid' },
      { name: 'CapCut', desc: 'Edit cinematic travel content optimized for TikTok', cat: 'Production', price: 'Free / Pro', take: 'Must-have' },
    ],
    plan: [ // TODO(content): confirm plan copy
      {
        title: 'Plan the first trip as content',
        tasks: [
          'Pick one destination with clear content angles',
          'Draft 5 specific video ideas (not montages)',
          'Line up 3 gear affiliate links in bio',
          'Write a one-line pitch for tourism boards',
        ],
      },
      {
        title: 'Film and post guides',
        tasks: [
          'Post 5 destination mini-guides',
          'Reply to every comment on top 3 videos',
          'Test a cost-breakdown video format',
          'Pin the best-performing guide',
        ],
      },
      {
        title: 'Pitch partnerships',
        tasks: [
          'Build a simple one-page media kit',
          'Pitch 5 hotels or tourism boards directly',
          'Deliver one paid or comped collaboration',
          'Track every pitch reply in a sheet',
        ],
      },
      {
        title: 'Scale the winner',
        tasks: [
          'Identify the destination or format that worked',
          'Plan 4 weeks of content around it',
          'Batch-film evergreen "how to" videos',
          'Upsell past viewers onto an email list',
        ],
      },
    ],
    faq: [ // TODO(content): confirm FAQ copy
      {
        q: 'Do I need to travel full-time to monetize travel content?',
        a: 'No. Part-time creators at 100K followers regularly monetize through gear affiliates and tourism partnerships. Many top travel creators travel 3-6 times per year with strong evergreen content.',
      },
      {
        q: 'Luxury travel or budget travel?',
        a: 'Budget and mid-tier travel generally earn higher engagement and conversion. Luxury attracts bigger brand deals but a smaller audience.',
      },
      {
        q: 'How do tourism boards pay creators?',
        a: 'A mix of free stays, flight or experience comps, and cash fees. Cash fees usually start at $1k-$5k per creator campaign for 50K-200K follower accounts.',
      },
    ],
    related: [
      { slug: 'comedy', name: 'Comedians', tag: 'Skits · superfans' },
      { slug: 'coaches', name: 'Coaches & Consultants', tag: 'High-ticket offers' },
      { slug: 'fitness-creators', name: 'Fitness Creators', tag: 'Programs · affiliates' },
    ],
  },
}

export const nicheSlugs = Object.keys(nicheContent)

// Compact index view used by /niche (Phase 4 redesign)
export type NicheIndexEntry = {
  slug: string
  label: string
  category: string
  heroImage: string
  tagline: string
  focus: string[]
  guideSlug: string
}

const NICHE_LABEL_OVERRIDES: Record<string, string> = {
  musicians: 'Musicians',
  'fitness-creators': 'Fitness Creators',
  artists: 'Artists',
  teachers: 'Teachers & Educators',
  beauty: 'Beauty Creators',
  comedy: 'Comedians',
  coaches: 'Coaches & Consultants',
  travel: 'Travel Creators',
}

export const nicheIndex: NicheIndexEntry[] = nicheSlugs.map((slug) => {
  const n = nicheContent[slug]
  return {
    slug,
    label: NICHE_LABEL_OVERRIDES[slug] ?? n.title.replace('Monetization for ', '').replace(' on TikTok', ''),
    category: n.category,
    heroImage: n.heroImage,
    tagline: n.tagline,
    focus: n.focus,
    guideSlug: n.ultimateGuide.slug,
  }
})

export function getNicheMetadata(slug: string) {
  const content = nicheContent[slug]
  if (!content) return null
  return { title: content.title, description: content.description }
}
