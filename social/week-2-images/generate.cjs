/**
 * TCP Week 2 Social Images — Vale generation script
 * 28 unique images: 7 Pinterest pins + 2 IG singles + 19 carousel slides
 * Brand: dark charcoal (#111827) background, orange/coral (#F4A261) accents, clean modern abstract
 * No text in images. No image reuse.
 */

const { GoogleGenAI } = require('@google/genai');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('BLOCKER: GEMINI_API_KEY not set');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const OUT_DIR = path.join(__dirname);

// Brand style prefix — applied to all images
// Dark charcoal bg, orange coral accents, clean modern, no text, abstract conceptual
const STYLE = 'Abstract modern flat digital illustration, no text, no words, no letters, no numbers, dark charcoal background (#111827), orange and coral accent shapes (#F4A261), clean geometric forms, high contrast, minimal, bold composition, social media graphic style, professional, 2D flat design';

// Pinterest style addendum (vertical)
const PIN_STYLE = `${STYLE}, vertical format composition, visually balanced for tall portrait orientation`;

// Instagram style addendum (square)
const IG_STYLE = `${STYLE}, square format composition, centered bold visual`;

const images = [
  // ── PINTEREST PINS (1000x1500) ─────────────────────────────────────────────
  {
    filename: 'pin-01-eligibility.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Visual concept: eligibility checklist. Three oversized checkmark icons arranged vertically in orange, each inside a rounded rectangle panel on dark background. Small circular badge shapes suggesting criteria being met. Abstract check marks with glowing orange fills. Clean stacked panel layout suggesting "do you qualify" verification flow. No text.`,
  },
  {
    filename: 'pin-02-tax-guide.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Visual concept: tax season urgency. Abstract flat calculator shape with orange buttons on dark background, a stylized dollar bill silhouette as a horizontal bar, and a calendar grid icon with one date circled in orange. Geometric shapes suggesting financial deadline. Bold orange geometric accents. No text.`,
  },
  {
    filename: 'pin-03-revenue-streams.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Visual concept: multiple stacked income streams. Five horizontal layered bars stacked vertically, each a different shade transitioning from deep charcoal to bright orange, suggesting income stacking. Each bar slightly offset and wider than the last, creating a rising staircase-like stacking metaphor. Clean flat geometric abstraction. No text.`,
  },
  {
    filename: 'pin-04-watch-time.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Visual concept: watch time and viewer retention. An oversized stylized hourglass with orange sand flowing, a circular play button icon in coral orange, and an abstract S-curve retention graph line in bright orange against dark background. Geometric composition. No text.`,
  },
  {
    filename: 'pin-05-video-editing-apps.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Visual concept: video editing on mobile. Abstract phone silhouette with a horizontal editing timeline bar across the screen, small colored clip segments in orange, a film strip pattern along the side of the phone. Clean flat geometric device mockup abstraction with no screen content except the orange editing timeline. No text.`,
  },
  {
    filename: 'pin-06-rpm-by-niche.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Visual concept: RPM varies by content niche. Six vertical bar chart columns at different heights, all in variations of orange and coral against dark background, the tallest bar glowing brightly, shorter bars progressively dimmer. Clean bar chart abstraction with rounded tops. No text, no labels.`,
  },
  {
    filename: 'pin-07-viral-psychology.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Visual concept: viral psychology and social sharing. Abstract side-profile brain silhouette in dark outline filled with charcoal, with six orange arrow lines radiating outward from the brain shape like signal waves, each ending in a small circular share/heart icon shape. Bold radiating orange glow effect. No text.`,
  },

  // ── INSTAGRAM SINGLES (1080x1080) ──────────────────────────────────────────
  {
    filename: 'ig-single-01-tax-guide.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: tax season energy. Stack of three stylized coin circles in warm gold-orange tones, each coin slightly offset and dropping, with an abstract calendar grid overlaid in the background using soft orange lines. Deep charcoal background. Composition feels weighty and urgent like a tax deadline. No text.`,
  },
  {
    filename: 'ig-single-02-watch-time.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: viewer retention curve. A smooth curved orange line swooping across the square canvas from upper-left to lower-right, with a small circular play button icon at the start and small time-marker tick marks along the curve. Abstract graph aesthetic, bold orange curve on dark charcoal. Minimalist. No text.`,
  },

  // ── INSTAGRAM CAROUSEL: ELIGIBILITY (6 slides, 1080x1080) ──────────────────
  {
    filename: 'ig-carousel-eligibility-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: eligibility requirements intro slide. Large bold orange checkmark icon centered on dark charcoal background. Six small circular dot indicators arranged in a row at the bottom suggesting a 6-slide carousel. Clean minimal composition. No text.`,
  },
  {
    filename: 'ig-carousel-eligibility-02-age.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: age requirement. Abstract calendar icon with a bold orange "18+" style symbol (age gates iconography — a person silhouette with a plus shape, no numbers). Rounded rectangle panel. Dark background. Single centered icon. No text.`,
  },
  {
    filename: 'ig-carousel-eligibility-03-followers.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: follower count requirement. Abstract cluster of five small person/user silhouette icons arranged in a gentle arc, with a star burst shape in orange behind them suggesting threshold reached. Dark charcoal background. No text.`,
  },
  {
    filename: 'ig-carousel-eligibility-04-views.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: video view count requirement. Abstract eye icon in coral orange with a play triangle overlaid inside it, surrounded by three radiating concentric arcs suggesting visibility and reach. Dark background. No text.`,
  },
  {
    filename: 'ig-carousel-eligibility-05-account-type.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: account type requirement. Abstract profile card shape with a small orange badge/shield icon in the corner suggesting verified creator status. Clean geometric card silhouette on dark background. No text.`,
  },
  {
    filename: 'ig-carousel-eligibility-06-region.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: geographic region eligibility. Abstract simplified globe or map outline with specific region highlighted in orange. Grid lines in muted charcoal. Clean flat world map abstraction with orange country/region highlight. No text.`,
  },

  // ── INSTAGRAM CAROUSEL: REVENUE STREAMS (7 slides, 1080x1080) ──────────────
  {
    filename: 'ig-carousel-revenue-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: multiple revenue streams intro slide. Five layered horizontal bar shapes stacked diagonally in the center, each progressively more orange toward the top, like a rising staircase of income layers. Bold geometric abstraction. Dark charcoal. No text.`,
  },
  {
    filename: 'ig-carousel-revenue-02-creator-rewards.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: TikTok Creator Rewards direct payment. Abstract play button triangle with a dollar coin shape orbiting it, suggesting platform payout for views. Orange and coral accents on dark background. No text.`,
  },
  {
    filename: 'ig-carousel-revenue-03-live-gifts.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: live stream gifting income. Abstract gift box silhouette with floating diamond/gem shapes radiating upward suggesting virtual gifts from viewers. Orange and coral shapes on dark charcoal. No text.`,
  },
  {
    filename: 'ig-carousel-revenue-04-brand-deals.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: brand partnership/sponsorship deals. Abstract handshake silhouette in minimal geometric style, with an orange badge shape suggesting a deal or contract. Clean flat composition. Dark background. No text.`,
  },
  {
    filename: 'ig-carousel-revenue-05-affiliate.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: affiliate marketing income. Abstract chain link icon or network node shapes connected by orange lines, suggesting referral/affiliate link connections. Minimal network diagram abstraction. Dark background. No text.`,
  },
  {
    filename: 'ig-carousel-revenue-06-merchandise.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: merchandise/product sales. Abstract shopping bag silhouette with a small store tag shape, orange handle, on dark charcoal background. Clean geometric product commerce abstraction. No text.`,
  },
  {
    filename: 'ig-carousel-revenue-07-tips.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: audience tips and direct support. Abstract hand silhouette offering a coin/gem upward, suggesting voluntary creator support from fans. Orange coin shape, geometric hand abstraction on dark background. No text.`,
  },

  // ── INSTAGRAM CAROUSEL: VIDEO EDITING APPS (6 slides, 1080x1080) ───────────
  {
    filename: 'ig-carousel-editing-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: video editing apps intro slide. Abstract horizontal film strip with 5 frame squares, alternating dark and orange, centered on dark background. Three small app icon placeholder shapes below, rounded squares in muted charcoal. No text.`,
  },
  {
    filename: 'ig-carousel-editing-02-capcut.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: abstract editing app icon (CapCut style). Geometric scissors or cut shape in orange, suggesting video cutting/editing tool. Clean geometric icon shape centered on dark charcoal. Bold single icon composition. No text.`,
  },
  {
    filename: 'ig-carousel-editing-03-inshot.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: abstract editing app icon (InShot style). Abstract star or sparkle shape with a play arrow through it, in orange and coral, centered on dark background. Suggests quick video polishing tool. No text.`,
  },
  {
    filename: 'ig-carousel-editing-04-splice.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: abstract editing app icon (Splice style). Abstract waveform / audio-visual bars shape with a thin orange vertical splice line cutting through the center. Suggests audio-sync editing. Dark background. No text.`,
  },
  {
    filename: 'ig-carousel-editing-05-premiere-rush.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: abstract editing app icon (Premiere Rush / professional style). Abstract layered timeline tracks in three horizontal orange bands of different opacity, suggesting multi-track professional editing. No text.`,
  },
  {
    filename: 'ig-carousel-editing-06-alight-motion.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Visual concept: abstract editing app icon (Alight Motion / effects style). Abstract motion blur swoosh shapes radiating from a central point in coral orange, suggesting motion graphics and visual effects. Dynamic circular energy. Dark background. No text.`,
  },
];

async function generateImage(item) {
  console.log(`Generating: ${item.filename}...`);

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: item.prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: item.width === item.height ? '1:1' : (item.width < item.height ? '2:3' : '16:9'),
    },
  });

  const b64 = response.generatedImages[0].image.imageBytes;
  const buffer = Buffer.from(b64, 'base64');

  const outPath = path.join(OUT_DIR, item.filename);
  await sharp(buffer)
    .resize(item.width, item.height, { fit: 'cover', withoutEnlargement: false })
    .png({ quality: 95 })
    .toFile(outPath);

  console.log(`  Saved: ${outPath}`);
  return { filename: item.filename, width: item.width, height: item.height, purpose: item.filename.replace(/-/g, ' ').replace('.png', '') };
}

async function main() {
  console.log(`TCP Week 2 — generating ${images.length} images...\n`);
  const manifest = [];
  const failed = [];

  for (const item of images) {
    try {
      const result = await generateImage(item);
      manifest.push(result);
      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`  FAILED: ${item.filename} — ${err.message}`);
      failed.push({ filename: item.filename, error: err.message });
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  // Write manifest
  const manifestPath = path.join(OUT_DIR, 'MANIFEST.md');
  const lines = [
    '# TCP Week 2 Image Manifest',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Total: ${manifest.length} images`,
    '',
    '## Images',
    '',
    '| Filename | Dimensions | Platform | Purpose |',
    '|---|---|---|---|',
  ];

  for (const m of manifest) {
    const platform = m.filename.startsWith('pin-') ? 'Pinterest' : (m.filename.includes('carousel') ? 'Instagram Carousel' : 'Instagram Single');
    lines.push(`| ${m.filename} | ${m.width}x${m.height} | ${platform} | ${m.purpose} |`);
  }

  if (failed.length > 0) {
    lines.push('', '## Failed', '');
    for (const f of failed) {
      lines.push(`- ${f.filename}: ${f.error}`);
    }
  }

  fs.writeFileSync(manifestPath, lines.join('\n') + '\n');
  console.log(`\nDone. ${manifest.length} generated, ${failed.length} failed.`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch(console.error);
