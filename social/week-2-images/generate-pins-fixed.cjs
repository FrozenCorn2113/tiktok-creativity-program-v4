/**
 * TCP Week 2 — Pinterest pins FIXED regeneration
 * API constraint: 2:3 not supported, use 3:4 then crop to 1000x1500
 */

const { GoogleGenAI } = require('@google/genai');
const sharp = require('sharp');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('BLOCKER: GEMINI_API_KEY not set');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const OUT_DIR = path.join(__dirname);

// No hex codes anywhere. Colors described by name only.
const STYLE = 'Abstract modern flat digital illustration, no text, no words, no letters, no numbers, no labels, no captions, dark charcoal background, warm orange and coral accent shapes, clean geometric forms, high contrast, minimal, bold composition, social media graphic style, professional, 2D flat design';
const PIN_STYLE = `${STYLE}, vertical format composition, visually balanced for tall portrait orientation`;

const pins = [
  {
    filename: 'pin-01-eligibility.png',
    prompt: `${PIN_STYLE}. Three oversized checkmark icons arranged vertically, each inside a rounded rectangle panel in warm orange against dark charcoal. Small circular badge shapes suggesting criteria met. Abstract checkmarks with glowing orange fills. Clean stacked panel layout. Purely abstract, zero text, zero letters, zero numbers.`,
  },
  {
    filename: 'pin-02-tax-guide.png',
    prompt: `${PIN_STYLE}. Abstract flat calculator shape in dark charcoal and warm orange, a stylized bill silhouette as a horizontal bar, and a calendar grid icon with one date circled in orange. Geometric shapes suggesting financial deadline urgency. Bold orange geometric accents. Purely abstract icons only, zero text, zero letters, zero numbers.`,
  },
  {
    filename: 'pin-03-revenue-streams.png',
    prompt: `${PIN_STYLE}. Five horizontal layered bars stacked vertically, each a different shade transitioning from deep charcoal at bottom to bright warm orange at top, suggesting income stacking layers. Each bar slightly offset and wider than the last, creating a rising staircase metaphor. Clean flat geometric abstraction. No text, no numbers, no labels whatsoever.`,
  },
  {
    filename: 'pin-04-watch-time.png',
    prompt: `${PIN_STYLE}. An oversized stylized hourglass with orange sand flowing, a circular play button icon in coral orange below it, and an abstract curved retention graph line in bright orange swooping upward against dark background. Geometric composition. No text, no words, no labels of any kind.`,
  },
  {
    filename: 'pin-05-video-editing-apps.png',
    prompt: `${PIN_STYLE}. Abstract phone silhouette in dark charcoal outline with a horizontal editing timeline strip across the middle in warm orange, small colored clip segment squares, and a film strip sprocket pattern along the side. Clean flat geometric device abstraction. No screen content except orange editing timeline. No text, no letters, no numbers.`,
  },
  {
    filename: 'pin-06-rpm-by-niche.png',
    prompt: `${PIN_STYLE}. Six vertical cylindrical bar chart columns at different heights against dark charcoal, all in shades of orange and coral, the tallest bar glowing brightly at top, shorter bars progressively dimmer. Clean bar chart abstraction with rounded tops. Absolutely no text, no numbers, no axis labels, no captions.`,
  },
  {
    filename: 'pin-07-viral-psychology.png',
    prompt: `${PIN_STYLE}. Abstract side-profile brain silhouette in dark outline on dark charcoal, with eight orange arrow lines radiating outward from the brain shape like signal waves, each ending in a small circular share icon shape. Bold radiating orange glow effect. No text, no letters, no numbers, purely iconic.`,
  },
];

async function generatePin(pin) {
  console.log(`Generating: ${pin.filename}...`);

  // Use 3:4 (closest supported portrait ratio), then crop to 1000x1500 (2:3)
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: pin.prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: '3:4',
    },
  });

  const b64 = response.generatedImages[0].image.imageBytes;
  const buffer = Buffer.from(b64, 'base64');

  const outPath = path.join(OUT_DIR, pin.filename);

  // Get image metadata to crop from center to 2:3 ratio (1000x1500)
  const img = sharp(buffer);
  const meta = await img.metadata();
  const srcW = meta.width;
  const srcH = meta.height;

  // Crop to 2:3 aspect from center of 3:4 image
  // 3:4 native is e.g. 768x1024 — we want 2:3 equivalent, crop the sides
  // To get 2:3 from 3:4: keep full height, crop width to height * (2/3)
  const targetW = Math.floor(srcH * (2 / 3));
  const leftOffset = Math.floor((srcW - targetW) / 2);

  await sharp(buffer)
    .extract({ left: leftOffset, top: 0, width: targetW, height: srcH })
    .resize(1000, 1500, { fit: 'fill' })
    .png({ quality: 95 })
    .toFile(outPath);

  console.log(`  Saved: ${outPath} (src ${srcW}x${srcH} -> cropped ${targetW}x${srcH} -> 1000x1500)`);
}

async function main() {
  console.log(`Regenerating ${pins.length} Pinterest pins...\n`);
  const failed = [];

  for (const pin of pins) {
    try {
      await generatePin(pin);
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`  FAILED: ${pin.filename} — ${err.message}`);
      failed.push({ filename: pin.filename, error: err.message });
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\nDone. ${pins.length - failed.length} generated, ${failed.length} failed.`);
  if (failed.length > 0) {
    for (const f of failed) console.log(`  FAILED: ${f.filename}: ${f.error}`);
  }
}

main().catch(console.error);
