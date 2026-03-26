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
        name: 'CHINCHILLA',
        handle: 'chinchilla_music',
        followers: '389K',
        description:
          'UK indie pop artist whose track "Little Girl Gone" grew her from 16K to 250K followers in a single week after she previewed it organically on TikTok. Featured in the TikTok Elevate programme for emerging artists.',
        lesson: 'Previewing original music directly on TikTok can trigger explosive organic growth without a label or ad spend',
      },
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
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
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
      {
        name: 'Maddie Lymburner',
        handle: 'maddielymburner',
        followers: '462K',
        description:
          'Canadian fitness creator and certified personal trainer who posts full-length follow-along workouts targeting women. Her structured programs and no-equipment home workout content drive consistent qualified views through strong watch-time retention.',
        lesson: 'Full-length follow-along workouts earn premium watch times that push well above Creator Rewards qualification thresholds',
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
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
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
        name: 'Dina Norlund',
        handle: 'dinanorlund',
        followers: '215K',
        description:
          'Watercolor and gouache artist who films satisfying real-time painting sessions. Her content proves that traditional media process videos hold attention just as well as digital art on TikTok.',
        lesson: 'Traditional media artists can build engaged audiences by leaning into the tactile, ASMR-like quality of real paint on paper',
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
        handle: 'jesskarp',
        followers: '178K',
        description:
          'Mixed media and collage artist who shares her creative process from concept to finished piece. Sells original work and prints directly through TikTok traffic to her online shop.',
        lesson: 'Showing the full creative journey from idea to finished sale converts viewers into buyers at any follower count',
      },
      {
        name: 'Kasey Golden',
        handle: 'kaseygolden',
        followers: '358K',
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
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
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
        name: 'Mr. Terry',
        handle: 'mr.terry_',
        followers: '385K',
        description:
          'Working high school English teacher who shares grammar tips, book recommendations, and classroom moments. His "words you are using wrong" series makes language education entertaining and shareable.',
        lesson: 'Solving specific, everyday pain points with personality builds a loyal audience that trusts your product recommendations',
      },
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
          'Working English teacher sharing grammar tips, vocabulary lessons, and writing advice in bite-sized TikTok videos. Her content serves both students and adult learners looking to improve their language skills.',
        lesson: 'Language education content attracts a broad audience beyond just students, opening up diverse monetization paths',
      },
      {
        name: 'The History Plug',
        handle: 'thehistoryplug',
        followers: '290K',
        description:
          'History teacher who turns obscure historical events into engaging storytelling content. His "history they did not teach you" series consistently earns high watch times through narrative-driven education.',
        lesson: 'Storytelling-first education content earns higher RPMs than lecture-style videos because retention is dramatically better',
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
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
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
        name: 'Ava Lee',
        handle: 'glowwithava',
        followers: '345K',
        description:
          'Skincare-focused beauty creator who does ingredient-level product analysis and budget-friendly routine builds. Her "drugstore dupes" series consistently earns high engagement by helping viewers save money without sacrificing quality.',
        lesson: 'Honest, budget-conscious beauty reviews build trust that converts to strong affiliate click-through rates',
      },
      {
        name: 'Mimi Choi',
        handle: 'mimielita',
        followers: '490K',
        description:
          'Optical illusion makeup artist whose transformation videos showcase genuinely unique artistry. Her skill-based content stands apart from standard beauty tutorials and earns premium brand partnerships.',
        lesson: 'Skill-based content that is genuinely hard to replicate commands premium brand deals even at mid-tier followings',
      },
      {
        name: 'Mari Maria',
        handle: 'marimariamakeup',
        followers: '470K',
        description:
          'Brazilian-American makeup artist known for bold, colorful technique tutorials. Her step-by-step approach makes advanced techniques accessible while maintaining a distinctive visual brand.',
        lesson: 'A distinctive visual style paired with clear instruction creates a content moat that retains viewers long-term',
      },
      {
        name: 'Hindash',
        handle: 'hindash',
        followers: '380K',
        description:
          'Dubai-based makeup artist and founder of Hindash Cosmetics. Technique-focused tutorials that break down advanced application methods in step-by-step format, teaching skills rather than just showcasing products.',
        lesson: 'Technique over trends differentiates you in the beauty space and builds a loyal audience invested in improving their skills',
      },
      {
        name: 'Rowi Singh',
        handle: 'rowisingh',
        followers: '452K',
        description:
          'Indian-Australian makeup artist known for bold, editorial looks that blend traditional South Asian beauty techniques with modern editorial styles. Her GRWM videos consistently earn strong watch times through storytelling paired with step-by-step application.',
        lesson: 'Culturally specific beauty content reaches an underserved audience and commands stronger engagement than generic tutorials',
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
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
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
        name: 'Zack Lugo',
        handle: 'zacklugo',
        followers: '350K',
        description:
          'Observational comedy creator who turns everyday situations into relatable skit content. His clean, brand-safe humor attracts sponsors aligned with his audience demographics without alienating viewers.',
        lesson: 'Niche audience alignment and brand-safe content drive higher conversion rates and sponsor deals than edgy broad comedy',
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
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
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
        handle: 'vanessalau.co',
        followers: '380K',
        description:
          'Online business coach who teaches content creators how to build sustainable income through social media. Her "build a business, not just an audience" messaging resonates with aspiring creator-entrepreneurs.',
        lesson: 'Short clips demonstrating a specific framework or method drive course sales and coaching inquiries',
      },
      {
        name: 'Codie Sanchez',
        handle: 'codiesanchez',
        followers: '490K',
        description:
          'Business acquisition coach who teaches "boring businesses" investing through TikTok. Her dense, no-fluff business content earns high engagement-to-follower ratios by delivering immediately actionable frameworks.',
        lesson: 'Dense, no-fluff business advice rewards viewers who want actionable frameworks and converts to high-ticket offers',
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
        name: 'Keenya Kelly',
        handle: 'keenyakelly',
        followers: '275K',
        description:
          'Brand and video marketing coach who teaches entrepreneurs to grow through short-form video. Her own TikTok growth serves as proof of concept for her coaching methods.',
        lesson: 'Podcast + coaching program + courses is a proven multi-stream revenue model even at sub-300K followings',
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
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
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
        name: 'Tyler Ginter',
        handle: 'tylerginter',
        followers: '265K',
        description:
          'Cultural immersion travel creator who focuses on local food, traditions, and off-the-beaten-path experiences rather than tourist highlights. His curiosity-driven storytelling consistently earns strong watch times.',
        lesson: 'Authentic cultural storytelling outperforms generic "beautiful places" content in both retention and RPM',
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
        name: 'Natasha Danielle',
        handle: 'theworldpursuit',
        followers: '229K',
        description:
          'Solo female travel tips and encouragement creator with a specific focus on safety, budgeting, and first-time solo travel. Serves an underrepresented audience that converts well to affiliate and course revenue.',
        lesson: 'A clearly defined sub-niche (solo female travel tips) attracts a highly targeted audience that trusts product recommendations',
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
      { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
    ],
  },
}

export const nicheSlugs = Object.keys(nicheContent)

export function getNicheMetadata(slug: string) {
  const content = nicheContent[slug]
  if (!content) return null
  return { title: content.title, description: content.description }
}
