/**
 * TCP Week 2 Social Images — FIXED regeneration script
 * Fixes: hex codes as visible text, descriptive text labels
 * Solution: describe colors by name only, no hex codes anywhere in prompts
 * 28 unique images: 7 Pinterest pins + 2 IG singles + 19 carousel slides
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

// CRITICAL: No hex codes in style prefix. Describe colors by name only.
const STYLE = 'Abstract modern flat digital illustration, no text, no words, no letters, no numbers, no labels, no captions, dark charcoal background, warm orange and coral accent shapes, clean geometric forms, high contrast, minimal, bold composition, social media graphic style, professional, 2D flat design';

const PIN_STYLE = `${STYLE}, vertical format composition, visually balanced for tall portrait orientation`;
const IG_STYLE = `${STYLE}, square format composition, centered bold visual`;

// Only regenerate images that need fixing — all 28 have hex artifacts
// Exception: ig-carousel-editing-03-inshot.png is acceptable (app name text is allowed)
const images = [
  // ── PINTEREST PINS (1000x1500) ─────────────────────────────────────────────
  {
    filename: 'pin-01-eligibility.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Three oversized checkmark icons arranged vertically, each inside a rounded rectangle panel in warm orange against dark charcoal. Small circular badge shapes suggesting criteria met. Abstract checkmarks with glowing orange fills. Clean stacked panel layout. Purely abstract, zero text, zero letters, zero numbers.`,
  },
  {
    filename: 'pin-02-tax-guide.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract flat calculator shape in dark charcoal and warm orange, a stylized bill silhouette as a horizontal bar, and a calendar grid icon with one date circled in orange. Geometric shapes suggesting financial deadline urgency. Bold orange geometric accents. Purely abstract icons only, zero text, zero letters, zero numbers.`,
  },
  {
    filename: 'pin-03-revenue-streams.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Five horizontal layered bars stacked vertically, each a different shade transitioning from deep charcoal at bottom to bright warm orange at top, suggesting income stacking layers. Each bar slightly offset and wider than the last, creating a rising staircase metaphor. Clean flat geometric abstraction. No text, no numbers, no labels whatsoever.`,
  },
  {
    filename: 'pin-04-watch-time.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. An oversized stylized hourglass with orange sand flowing, a circular play button icon in coral orange below it, and an abstract curved retention graph line in bright orange swooping upward against dark background. Geometric composition. No text, no words, no labels of any kind.`,
  },
  {
    filename: 'pin-05-video-editing-apps.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract phone silhouette in dark charcoal outline with a horizontal editing timeline strip across the middle in warm orange, small colored clip segment squares, and a film strip sprocket pattern along the side. Clean flat geometric device abstraction. No screen content except orange editing timeline. No text, no letters, no numbers.`,
  },
  {
    filename: 'pin-06-rpm-by-niche.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Six vertical cylindrical bar chart columns at different heights against dark charcoal, all in shades of orange and coral, the tallest bar glowing brightly at top, shorter bars progressively dimmer. Clean bar chart abstraction with rounded tops. Absolutely no text, no numbers, no axis labels, no captions.`,
  },
  {
    filename: 'pin-07-viral-psychology.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract side-profile brain silhouette in dark outline on dark charcoal, with eight orange arrow lines radiating outward from the brain shape like signal waves, each ending in a small circular share icon shape. Bold radiating orange glow effect. No text, no letters, no numbers, purely iconic.`,
  },

  // ── INSTAGRAM SINGLES (1080x1080) ──────────────────────────────────────────
  {
    filename: 'ig-single-01-tax-guide.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Stack of three stylized coin circles in warm gold-orange tones, each coin slightly offset and dropping, with an abstract calendar grid overlaid in background using soft orange grid lines. Deep charcoal background. Composition feels weighty like a financial deadline. No text, no words, no labels, no numbers, no date numerals.`,
  },
  {
    filename: 'ig-single-02-watch-time.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. A smooth curved orange line swooping across the square canvas from lower-left rising to upper-right, with a small circular play button icon at the start and small tick marks along the curve like a graph. Abstract retention curve aesthetic, bold orange line on dark charcoal. Minimalist. No text, no numbers, no labels of any kind.`,
  },

  // ── INSTAGRAM CAROUSEL: ELIGIBILITY (6 slides, 1080x1080) ──────────────────
  {
    filename: 'ig-carousel-eligibility-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Large bold orange checkmark icon centered on dark charcoal background. Six small circular dot indicators arranged in a row at the bottom in muted charcoal and orange suggesting a carousel sequence. Clean minimal composition. No text, no words, no letters whatsoever.`,
  },
  {
    filename: 'ig-carousel-eligibility-02-age.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract calendar icon with orange header band and grid squares, with an orange star badge overlaid at the corner suggesting milestone or requirement. Rounded rectangle panel. Dark charcoal background. Single centered icon composition. No text, no numbers, no letters.`,
  },
  {
    filename: 'ig-carousel-eligibility-03-followers.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract cluster of five small person silhouette icons arranged in a gentle arc, with an orange starburst shape behind them suggesting a crowd threshold reached. Dark charcoal background. No text, no numbers, no letters.`,
  },
  {
    filename: 'ig-carousel-eligibility-04-views.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract eye icon in coral orange with a play triangle overlaid inside the pupil area, surrounded by three concentric radiating arc lines suggesting broadcast reach and visibility. Dark charcoal background. No text, no numbers, no letters.`,
  },
  {
    filename: 'ig-carousel-eligibility-05-account-type.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract profile card shape in dark charcoal with a small orange shield badge icon in the corner suggesting verified creator status. Clean geometric card silhouette with diagonal orange accent lines. Dark background. No text, no words, no letters.`,
  },
  {
    filename: 'ig-carousel-eligibility-06-region.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract simplified globe outline with latitude and longitude grid lines in muted charcoal, with a specific continent region filled in solid orange. Clean flat world map abstraction with orange geographic highlight. No text, no words, no country names, no labels.`,
  },

  // ── INSTAGRAM CAROUSEL: REVENUE STREAMS (7 slides, 1080x1080) ──────────────
  {
    filename: 'ig-carousel-revenue-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Five layered horizontal bar shapes arranged diagonally from lower-left to upper-right in the center, each progressively more orange toward the top like a rising staircase of income layers. Bold geometric abstraction. Dark charcoal background. No text, no labels, no numbers.`,
  },
  {
    filename: 'ig-carousel-revenue-02-creator-rewards.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract play button triangle in coral orange with a coin circle shape orbiting around it connected by a curved dotted path, suggesting platform payout for video views. Orange and coral accents on dark charcoal. No text, no words, no currency symbols, no labels.`,
  },
  {
    filename: 'ig-carousel-revenue-03-live-gifts.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract gift box silhouette in orange and coral with floating diamond gem shapes radiating upward above it suggesting virtual gifts from viewers. Orange accent shapes on dark charcoal. No text, no words, no letters.`,
  },
  {
    filename: 'ig-carousel-revenue-04-brand-deals.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract geometric handshake silhouette in minimal flat style, two interlocking shapes in warm orange suggesting a partnership deal. Clean flat composition on dark charcoal background. No text, no words, no badge labels, no letters.`,
  },
  {
    filename: 'ig-carousel-revenue-05-affiliate.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract chain link or network node shapes connected by orange curved lines forming a diamond pattern, suggesting referral link connections between points. Minimal network diagram in orange on dark charcoal. No text, no words, no letters, no labels on nodes.`,
  },
  {
    filename: 'ig-carousel-revenue-06-merchandise.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract shopping bag silhouette in dark charcoal with a bright orange handle and a small diamond tag shape hanging from it, no writing on the tag. Clean geometric product commerce icon on dark background. No text, no words, no letters on any surface.`,
  },
  {
    filename: 'ig-carousel-revenue-07-tips.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract open hand silhouette in coral orange offering a glowing coin circle upward, with a small upward arrow above the coin suggesting voluntary creator support. Orange geometric hand and coin abstraction on dark charcoal. No text, no words, no letters.`,
  },

  // ── INSTAGRAM CAROUSEL: VIDEO EDITING APPS (6 slides, 1080x1080) ───────────
  // NOTE: ig-carousel-editing-03-inshot.png is SKIPPED — app name text is acceptable
  {
    filename: 'ig-carousel-editing-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract horizontal film strip with five frame squares alternating dark charcoal and warm orange, centered on dark background. Three small rounded-square app icon placeholder shapes below in muted charcoal. No text, no words, no letters, no numbers in any frame.`,
  },
  {
    filename: 'ig-carousel-editing-02-capcut.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Geometric scissors shape in warm orange and coral, two diagonal blade forms crossing at center suggesting a video cutting tool. Clean geometric icon centered on dark charcoal background. Bold single icon composition. No text, no words, no brand name, no letters.`,
  },
  {
    filename: 'ig-carousel-editing-04-splice.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract audio waveform bars shape — multiple vertical rectangles of varying heights in orange and coral — with a single thin bright orange vertical line cutting through the center like an edit splice point. Suggests audio-sync editing. Dark charcoal background. No text, no words, no letters.`,
  },
  {
    filename: 'ig-carousel-editing-05-premiere-rush.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract layered timeline with three horizontal track bands in warm orange, coral, and deep orange of different opacities stacked on each other, with a thin vertical orange playhead line crossing all tracks. Suggests multi-track professional editing. Dark charcoal background. No text, no words, no letters.`,
  },
  {
    filename: 'ig-carousel-editing-06-alight-motion.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract motion blur swoosh shapes radiating outward from a central glowing point in coral orange, suggesting motion graphics and visual effects with dynamic energy. Circular radial composition on dark charcoal. No text, no words, no letters.`,
  },
];

async function generateImage(item) {
  console.log(`Generating: ${item.filename}...`);

  const aspectRatio = item.width === item.height ? '1:1' : (item.width < item.height ? '2:3' : '16:9');

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: item.prompt,
    config: {
      numberOfImages: 1,
      aspectRatio,
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
  return item.filename;
}

async function main() {
  console.log(`TCP Week 2 — regenerating ${images.length} images (fixed prompts, no hex codes)...\n`);
  console.log('NOTE: ig-carousel-editing-03-inshot.png is skipped (app name text acceptable)\n');

  const done = [];
  const failed = [];

  for (const item of images) {
    try {
      await generateImage(item);
      done.push(item.filename);
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`  FAILED: ${item.filename} — ${err.message}`);
      failed.push({ filename: item.filename, error: err.message });
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\nDone. ${done.length} regenerated, ${failed.length} failed.`);
  if (failed.length > 0) {
    console.log('Failed:');
    for (const f of failed) console.log(`  - ${f.filename}: ${f.error}`);
  }
}

main().catch(console.error);
