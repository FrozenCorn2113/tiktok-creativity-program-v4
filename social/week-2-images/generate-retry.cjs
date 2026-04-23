/**
 * TCP Week 2 — Retry script for failed images
 * Fixes:
 * - Pinterest pins: use 3:4 aspect ratio (closest to 2:3), resize to 1000x1500 with sharp
 * - ig-carousel-eligibility-02-age: revised prompt (age gate silhouette blocked safety filter)
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

const STYLE = 'Abstract modern flat digital illustration, no text, no words, no letters, no numbers, dark charcoal background (#111827), orange and coral accent shapes (#F4A261), clean geometric forms, high contrast, minimal, bold composition, social media graphic style, professional, 2D flat design';
const PIN_STYLE = `${STYLE}, vertical format composition, visually balanced for tall portrait orientation`;

const images = [
  // Pinterest pins — use 3:4 ratio, resize to 1000x1500
  {
    filename: 'pin-01-eligibility.png',
    width: 1000,
    height: 1500,
    aspectRatio: '3:4',
    prompt: `${PIN_STYLE}. Visual concept: eligibility checklist. Three oversized checkmark icons arranged vertically in orange, each inside a rounded rectangle panel on dark background. Small circular badge shapes suggesting criteria being met. Abstract check marks with glowing orange fills. Clean stacked panel layout suggesting verification flow. No text.`,
  },
  {
    filename: 'pin-02-tax-guide.png',
    width: 1000,
    height: 1500,
    aspectRatio: '3:4',
    prompt: `${PIN_STYLE}. Visual concept: tax season urgency. Abstract flat calculator shape with orange buttons on dark background, a stylized dollar bill silhouette as a horizontal bar, and a calendar grid icon with one date circled in orange. Geometric shapes suggesting financial deadline. Bold orange geometric accents. No text.`,
  },
  {
    filename: 'pin-03-revenue-streams.png',
    width: 1000,
    height: 1500,
    aspectRatio: '3:4',
    prompt: `${PIN_STYLE}. Visual concept: multiple stacked income streams. Five horizontal layered bars stacked vertically, each a different shade transitioning from deep charcoal to bright orange, suggesting income stacking. Each bar slightly offset and wider than the last, creating a rising staircase-like stacking metaphor. Clean flat geometric abstraction. No text.`,
  },
  {
    filename: 'pin-04-watch-time.png',
    width: 1000,
    height: 1500,
    aspectRatio: '3:4',
    prompt: `${PIN_STYLE}. Visual concept: watch time and viewer retention. An oversized stylized hourglass with orange sand flowing, a circular play button icon in coral orange, and an abstract S-curve retention graph line in bright orange against dark background. Geometric composition. No text.`,
  },
  {
    filename: 'pin-05-video-editing-apps.png',
    width: 1000,
    height: 1500,
    aspectRatio: '3:4',
    prompt: `${PIN_STYLE}. Visual concept: video editing on mobile. Abstract phone silhouette with a horizontal editing timeline bar across the screen, small colored clip segments in orange, a film strip pattern along the side of the phone. Clean flat geometric device mockup abstraction with orange editing timeline. No text.`,
  },
  {
    filename: 'pin-06-rpm-by-niche.png',
    width: 1000,
    height: 1500,
    aspectRatio: '3:4',
    prompt: `${PIN_STYLE}. Visual concept: RPM varies by content niche. Six vertical bar chart columns at different heights, all in variations of orange and coral against dark background, the tallest bar glowing brightly, shorter bars progressively dimmer. Clean bar chart abstraction with rounded tops. No text, no labels.`,
  },
  {
    filename: 'pin-07-viral-psychology.png',
    width: 1000,
    height: 1500,
    aspectRatio: '3:4',
    prompt: `${PIN_STYLE}. Visual concept: viral psychology and social sharing. Abstract side-profile brain silhouette in dark outline filled with charcoal, with six orange arrow lines radiating outward from the brain shape like signal waves, each ending in a small circular share icon shape. Bold radiating orange glow effect. No text.`,
  },
  // Retry: eligibility slide 02 — revised prompt avoiding age-gate icon
  {
    filename: 'ig-carousel-eligibility-02-age.png',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    prompt: `Abstract modern flat digital illustration, no text, no words, no letters, no numbers, dark charcoal background, orange and coral accent shapes, clean geometric forms, high contrast, minimal, bold composition, 2D flat design. Visual concept: minimum age requirement for a platform. Abstract calendar icon with a small orange star badge overlay, suggesting a milestone or coming-of-age marker. Clean rounded rectangle calendar shape on dark background. No people, no numbers. No text.`,
  },
];

async function generateImage(item) {
  console.log(`Generating: ${item.filename} (${item.aspectRatio})...`);

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: item.prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: item.aspectRatio,
    },
  });

  const b64 = response.generatedImages[0].image.imageBytes;
  const buffer = Buffer.from(b64, 'base64');

  const outPath = path.join(OUT_DIR, item.filename);
  await sharp(buffer)
    .resize(item.width, item.height, { fit: 'cover', position: 'center' })
    .png({ quality: 95 })
    .toFile(outPath);

  console.log(`  Saved: ${outPath}`);
  return item.filename;
}

async function main() {
  console.log(`Retrying ${images.length} images...\n`);
  const done = [];
  const failed = [];

  for (const item of images) {
    try {
      await generateImage(item);
      done.push(item.filename);
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      console.error(`  FAILED: ${item.filename} — ${err.message}`);
      failed.push({ filename: item.filename, error: err.message });
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\nRetry complete. ${done.length} generated, ${failed.length} failed.`);
  if (failed.length) {
    for (const f of failed) console.log(`  FAILED: ${f.filename} — ${f.error}`);
  }
}

main().catch(console.error);
