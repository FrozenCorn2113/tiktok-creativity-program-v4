export const siteConfig = {
  name: 'TikTok Creativity Program',
  description:
    'Practical guidance, calculators, and monetization strategies for TikTok creators.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tiktokcreativityprogram.com',
  twitterHandle: '@tiktokcreativity',
}

export const navigation = {
  main: [
    {
      label: 'Guides',
      href: '/guides',
      sections: [
        {
          title: 'Start earning',
          links: [
            { label: 'Creator Rewards 2026', href: '/guides/creator-rewards-2026' },
            { label: 'Additional Reward Criteria', href: '/guides/additional-reward-criteria-2026' },
            { label: 'Monetization Hub', href: '/guides/monetization-resource-center' },
          ],
        },
        {
          title: 'Country-specific',
          links: [
            { label: 'Canada Alternatives', href: '/guides/canada-without-rewards' },
            { label: 'Australia Eligibility', href: '/guides/australia-eligibility' },
            { label: 'International Monetization', href: '/guides/monetization-outside-us' },
          ],
        },
      ],
    },
    {
      label: 'Calculators',
      href: '/calculators/earnings-calculator',
      sections: [
        {
          title: 'Earnings Tools',
          links: [
            { label: 'Earnings Calculator', href: '/calculators/earnings-calculator' },
            { label: 'RPM by Country', href: '/calculators/rpm-by-country' },
            { label: 'Follower Income Estimator', href: '/calculators/follower-income-estimator' },
          ],
        },
      ],
    },
    {
      label: 'Niches',
      href: '/niche',
      sections: [
        {
          title: 'Creator types',
          links: [
            { label: 'Musicians', href: '/niche/musicians' },
            { label: 'Teachers', href: '/niche/teachers' },
            { label: 'Fitness Creators', href: '/niche/fitness-creators' },
            { label: 'Artists', href: '/niche/artists' },
          ],
        },
      ],
    },
    {
      label: 'Tools',
      href: '/tools',
      sections: [
        {
          title: 'Creator Tools',
          links: [
            { label: 'All Tools & Resources', href: '/tools' },
            { label: 'Video Editing Tools', href: '/tools#video-editing' },
            { label: 'Analytics Tools', href: '/tools#analytics-tools' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Downloads', href: '/resources/index' },
            { label: 'Earnings Tracker', href: '/resources/earnings-tracker' },
            { label: 'Creator Rewards Checklist', href: '/resources/creator-rewards-checklist' },
          ],
        },
      ],
    },
  ],
}
