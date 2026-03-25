// Vale — Hero Image Batch Generator (Nano Banana Pro)
// Uses KIE Nano Banana Pro (Gemini 3 Pro Image) for image generation
// Replaces Imagen which hit quota limits

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT, 'public/images/guides');

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCltPluWUe42OykNuJVqhMRmxdoLCXyuQI';
const MODEL = 'nano-banana-pro-preview';

const STYLE_PREFIX = `Flat 2D editorial illustration. Warm palette: brand orange #F4A261, warm cream #FFF7ED, ink dark #111827, soft peach #FFE9D5. No text, no letterforms, no words. No gradients. No drop shadows. No photographs. Simple geometric shapes, clean lines, bold flat fills. Negative space used intentionally. Abstract conceptual composition. Aspect ratio 1.9:1 horizontal. Style: independent editorial publication, modern flat design, warm and calm.`;

// Only the 27 guides still missing hero images
const GUIDES = [
  {
    slug: 'additional-reward-criteria-2025',
    scene: 'Abstract bonus reward criteria composition: a stepped tier pyramid of layered flat rectangles in ascending sizes, orange accent on the top tier suggesting achievement, a checklist of horizontal lines with checkmark angles, a badge or seal shape made of geometric segments, ink dark and orange on cream, qualification and reward implied.'
  },
  {
    slug: 'creator-rewards-vs-youtube-shorts',
    scene: 'Abstract platform comparison composition: two tall vertical columns of equal width, one in ink dark with TikTok-implied vertical phone shape, one in orange with horizontal widescreen shape suggesting YouTube, a balance-beam scale between them, bar chart earnings shapes below each column at different heights, clean comparison on cream.'
  },
  {
    slug: 'effect-house-monetization',
    scene: 'Abstract creator tools and revenue composition: a large geometric AR-lens circle shape in orange suggesting augmented reality, filter-frame corners pointing inward, dollar-sign implied by stacked horizontal bars of varying heights in ink dark, a sparkle or star burst of triangular shapes at top, creative studio energy on cream background.'
  },
  {
    slug: 'monetize-tiktok-under-10k-followers',
    scene: 'Abstract small creator monetization path composition: a stepped staircase of ascending platforms with small circle figures representing follower milestones (1K, 5K, 10K), multiple income stream lines branching off each step in orange, a target or goal circle at the top, ink dark and orange on cream, growth journey feel.'
  },
  {
    slug: 'tiktok-analytics-metrics',
    scene: 'Abstract metrics dashboard composition: a set of four distinct flat panel shapes arranged in a 2x2 grid, each panel has a different chart type inside (bar, line, donut, number), key metric panels highlighted in orange, ink dark panel outlines, connecting arrows between panels, cream background, studio-dashboard feeling.'
  },
  {
    slug: 'tiktok-creator-health-rating',
    scene: 'Abstract creator health score composition: a large vertical gauge shape like a thermometer made of a rectangle with a rounded top, a fill level at 80 percent in orange indicating a high health score, small checkmark shapes stacked beside it, a score dial shape as a semicircle with a needle, ink dark and orange on cream, health and protection implied.'
  },
  {
    slug: 'tiktok-creator-rewards-payment-schedule',
    scene: 'Abstract payment schedule calendar composition: a clean monthly calendar grid with specific date squares highlighted in orange indicating payday, a bold arrow pointing from the calendar to a payment card shape, a minimum-threshold horizontal line with a fill bar just reaching it, ink dark calendar grid on cream background, reliable and scheduled.'
  },
  {
    slug: 'tiktok-creator-search-insights',
    scene: 'Abstract search discovery composition: a magnifying glass made of a circle and a rectangular handle in ink dark, trending keywords suggested by horizontal bars of varying widths in orange, a gap-indicator shape showing empty search demand, upward trend arrow, search results as stacked rectangles, cream background, keyword research mood.'
  },
  {
    slug: 'tiktok-creator-taxes-1099',
    scene: 'Abstract 1099 tax filing composition: a tax form rectangle with bold header lines and data rows in ink dark, a 1099 document badge shape in orange, quarterly calendar markers as four circles on a timeline, deduction subtraction symbol made from a horizontal rectangle, calculator grid shape, cream background, organized and informational.'
  },
  {
    slug: 'tiktok-crp-appeal-process',
    scene: 'Abstract appeal and recovery process composition: a stepped flowchart of connected rectangles moving downward with arrows suggesting sequential steps, a red-orange flagged step at the start suggesting the issue, a green-orange final rectangle at bottom suggesting resolution, a document submission shape, ink dark and orange on cream, process clarity.'
  },
  {
    slug: 'tiktok-minis-micro-dramas',
    scene: 'Abstract mini-app and serialized drama composition: a phone screen rectangle with a nested smaller app window shape in orange suggesting embedded mini-app, a film-reel strip of small rectangles suggesting episode series, a play button triangle, branching revenue shapes, ink dark and orange on cream, interactive and episodic energy.'
  },
  {
    slug: 'tiktok-oracle-deal-creators',
    scene: 'Abstract ownership deal and creator impact composition: two large overlapping circular shapes suggesting a corporate deal, a creator figure as a small circle with upward arrow inside one of the large circles, data flow lines between the two circles, a contract document rectangle below, ink dark and orange on cream, deal implications implied.'
  },
  {
    slug: 'tiktok-rpm-by-niche-2026',
    scene: 'Abstract RPM niche comparison composition: a horizontal bar chart with multiple bars of distinctly different heights each representing a different niche, top bars in orange and bottom bars in ink dark, a per-mille metric shape as a simple bracket and three circles, niche labels replaced by geometric icon shapes, cream background, ranking clear.'
  },
  {
    slug: 'tiktok-scaled-live-rewards',
    scene: 'Abstract LIVE rewards scaling composition: a vertical scale bar divided into percentage segments with the top third highlighted in orange suggesting the 53 percent maximum, a LIVE broadcast signal as radiating arc lines from a central point, mission-badge shapes as small circles, a weekly calendar timeline below, ink dark and orange on cream.'
  },
  {
    slug: 'tiktok-search-seo-optimize-views',
    scene: 'Abstract search SEO optimization composition: a magnifying glass circle over a video-frame rectangle, keyword rows as horizontal stacked bars with varying orange fill levels suggesting rank strength, an algorithm-node network in background, a 30-second clock marker on a progress bar, ink dark and orange on cream, SEO and discovery energy.'
  },
  {
    slug: 'tiktok-series-paywall-feature',
    scene: 'Abstract paid content series composition: a stack of four video-frame rectangles in a fanned arrangement suggesting a series collection, a padlock shape in orange overlaid on the top frame indicating paywall, a purchase-flow arrow from lock to an unlocked state, episode progress dots as small circles, ink dark and orange on cream.'
  },
  {
    slug: 'tiktok-shop-affiliate-creativity-program',
    scene: 'Abstract dual income stream composition: two income channels running side by side as parallel vertical bars, one labeled with a cart icon shape and one with a camera shape, both flowing upward into a combined larger bar at top in orange, a plus symbol connecting them mid-height, ink dark and orange on cream, additive income implied.'
  },
  {
    slug: 'tiktok-shop-vs-rewards',
    scene: 'Abstract shop versus rewards comparison composition: a flat shopping cart silhouette on the left in ink dark, a bar chart earnings shape on the right in orange, a central balance scale with beam showing the comparison, small product icon shapes on one side and view-count marks on the other, cream background, clear comparison.'
  },
  {
    slug: 'tiktok-vs-instagram-reels',
    scene: 'Abstract TikTok versus Instagram Reels comparison composition: a tall vertical phone-screen on the left with orange accent indicating TikTok, a square frame on the right in ink dark suggesting Reels, a central versus dividing line, earnings bar shapes below each platform showing different heights, cream background, head-to-head competition feel.'
  },
  {
    slug: 'tiktok-vs-youtube-shorts-vs-instagram-reels-2026',
    scene: 'Abstract three-platform comparison composition: three distinct vertical columns each representing a platform with a unique geometric icon at top, bar chart shapes of different heights at the bottom of each column showing earnings comparison, a winner-podium arrangement with varying heights, ink dark and orange on cream, clear three-way ranking layout.'
  },
  {
    slug: 'ultimate-artists-guide',
    scene: 'Abstract ultimate visual artist guide composition: a large open book shape with a paintbrush and palette as geometric forms on its pages, radiating from the book are six content-pillar tab shapes in orange, a star or crown shape at the top indicating completeness, layered depth of horizontal strategy lines, ink dark and orange on cream.'
  },
  {
    slug: 'ultimate-beauty-guide',
    scene: 'Abstract ultimate beauty creator guide composition: a simplified mirror frame as a large oval with a rectangular handle in orange, beauty tool icons as abstract geometric forms arranged around it, a content funnel shape, audience-growth arc, monetization stack bars, ink dark and orange on cream, polished and editorial.'
  },
  {
    slug: 'ultimate-coaches-guide',
    scene: 'Abstract ultimate coaching guide composition: an abstract coaching conversation as two rectangles suggesting speaker and listener connected by flowing curve, a client pipeline funnel in orange, authority content bars, revenue streams as branching lines, a large book shape as background anchor, ink dark and orange on cream.'
  },
  {
    slug: 'ultimate-comedy-guide',
    scene: 'Abstract ultimate comedy creator guide composition: a speech bubble with motion ripple lines around it suggesting laughter impact, a content-hooks pattern of angular shapes, retention challenge visual as a drop and rise curve, monetization stack in orange rectangles, a book-style tab structure, ink dark and orange on cream background.'
  },
  {
    slug: 'ultimate-educators-guide',
    scene: 'Abstract ultimate educators guide composition: a layered curriculum as stacked horizontal rectangles of varying widths suggesting knowledge tiers, an open book shape, student-audience shapes as small circles in a growing cluster, income streams branching in orange, a graduation cap as flat geometric shapes at top, ink dark and orange on cream.'
  },
  {
    slug: 'ultimate-fitness-guide',
    scene: 'Abstract ultimate fitness creator guide composition: a progress chart with an ascending staircase step pattern in orange, exercise motion implied by bold diagonal lines, production gear icons as simple geometric shapes, income projection bars, audience growth arc, all arranged as a complete playbook layout in ink dark and orange on cream.'
  },
  {
    slug: 'ultimate-music-guide',
    scene: 'Abstract ultimate music creator guide composition: a large circular vinyl record shape in ink dark with concentric ring grooves, a sound wave emanating outward, multiple income-stream shapes branching from the record in orange suggesting streaming, merch, and live, fan-growth dots multiplying outward, cream background, complete and authoritative.'
  }
];

function httpsPost(postData) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve({ statusCode: res.statusCode, body });
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function generateImage(prompt) {
  const postData = JSON.stringify({
    contents: [{ parts: [{ text: `Generate an image: ${prompt}` }] }],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
  });

  const { statusCode, body } = await httpsPost(postData);

  let data;
  try {
    data = JSON.parse(body);
  } catch {
    throw new Error(`API ${statusCode}: unparseable response (${body.length} bytes)`);
  }

  if (data.error) {
    throw new Error(`API ${statusCode}: ${data.error.message || JSON.stringify(data.error).slice(0, 200)}`);
  }

  if (statusCode !== 200) {
    throw new Error(`API ${statusCode}: ${body.slice(0, 200)}`);
  }

  const candidates = data.candidates || [];
  for (const cand of candidates) {
    for (const part of (cand.content?.parts || [])) {
      if (part.inlineData?.data) {
        return {
          base64: part.inlineData.data,
          mimeType: part.inlineData.mimeType || 'image/jpeg'
        };
      }
    }
  }

  throw new Error('No image data in response');
}

async function saveHeroAndThumb(slug, base64Data) {
  const buffer = Buffer.from(base64Data, 'base64');

  const heroPath = path.join(OUTPUT_DIR, `hero-${slug}.webp`);
  const thumbPath = path.join(OUTPUT_DIR, `thumb-${slug}.webp`);

  await sharp(buffer)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .webp({ quality: 85 })
    .toFile(heroPath);

  await sharp(buffer)
    .resize(400, 300, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(thumbPath);

  return { heroPath, thumbPath };
}

async function run() {
  console.log(`Starting batch generation for ${GUIDES.length} guides using ${MODEL}...`);
  console.log(`Output dir: ${OUTPUT_DIR}\n`);

  const results = { success: [], failed: [] };

  for (let i = 0; i < GUIDES.length; i++) {
    const { slug, scene } = GUIDES[i];
    const heroPath = path.join(OUTPUT_DIR, `hero-${slug}.webp`);

    // Skip if already exists
    if (fs.existsSync(heroPath)) {
      console.log(`[${i + 1}/${GUIDES.length}] SKIP (exists): ${slug}`);
      continue;
    }

    const prompt = `${STYLE_PREFIX} ${scene}`;
    console.log(`[${i + 1}/${GUIDES.length}] Generating: ${slug}`);

    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      try {
        const { base64 } = await generateImage(prompt);
        await saveHeroAndThumb(slug, base64);
        results.success.push(slug);
        console.log(`  -> OK: hero-${slug}.webp + thumb-${slug}.webp`);

        // Delay between requests to be respectful of rate limits
        if (i < GUIDES.length - 1) {
          await new Promise(r => setTimeout(r, 2000));
        }
        break;
      } catch (err) {
        retries++;
        console.error(`  -> ATTEMPT ${retries} FAILED: ${err.message}`);

        if (err.message?.includes('429') || err.message?.toLowerCase().includes('quota') || err.message?.toLowerCase().includes('resource_exhausted')) {
          console.log('  Rate limited — waiting 60 seconds...');
          await new Promise(r => setTimeout(r, 60000));
        } else if (retries <= maxRetries) {
          console.log(`  Retrying in 5 seconds...`);
          await new Promise(r => setTimeout(r, 5000));
        }

        if (retries > maxRetries) {
          results.failed.push({ slug, error: err.message });
        }
      }
    }
  }

  console.log('\n=== BATCH COMPLETE ===');
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  if (results.failed.length > 0) {
    console.log('\nFailed slugs:');
    results.failed.forEach(f => console.log(`  - ${f.slug}: ${f.error}`));
  }

  // Write manifest
  const manifest = {
    generated: new Date().toISOString(),
    model: MODEL,
    success: results.success,
    failed: results.failed
  };
  fs.writeFileSync(
    path.join(__dirname, 'hero-generation-nano-results.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('\nManifest saved to Vale/hero-generation-nano-results.json');
}

run().catch(console.error);
