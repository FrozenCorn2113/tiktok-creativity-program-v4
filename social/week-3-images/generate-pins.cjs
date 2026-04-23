/**
 * TCP Week 3 — Pinterest Pins (retry with 3:4 ratio + crop to 1000x1500)
 * API does not support 2:3. Use 3:4 and resize/crop with sharp.
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

const STYLE = 'Abstract modern flat digital illustration, no text, no words, no letters, no numbers, no labels, no captions, dark charcoal background, warm orange and coral accent shapes, clean geometric forms, high contrast, minimal, bold composition, social media graphic style, professional, 2D flat design';
const PIN_STYLE = `${STYLE}, vertical format composition, visually balanced for tall portrait orientation`;

const pins = [
  {
    filename: 'pin-01-sell-digital-products.png',
    prompt: `${PIN_STYLE}. Abstract shopping bag silhouette in dark charcoal outline with a glowing warm orange digital document icon inside it, and a stack of three coin circles below suggesting layered income. The document inside the bag has a simple file corner fold shape suggesting a digital product. Bold high-contrast composition. No text, no letters, no numbers, no dollar signs.`,
  },
  {
    filename: 'pin-02-no-qualified-views.png',
    prompt: `${PIN_STYLE}. Abstract large eye icon in warm orange with a crack or fracture running through it diagonally, and a flat circular earnings badge below showing empty/hollow suggesting zero payout. Geometric fracture lines across the eye shape in charcoal. Warning energy, bold contrast. Dark charcoal background. No text, no numbers, no dollar signs, no words.`,
  },
  {
    filename: 'pin-03-search-seo.png',
    prompt: `${PIN_STYLE}. Large abstract magnifying glass icon in warm orange centered, with a horizontal rounded search bar shape below it in muted charcoal, and five small rounded pill/tag shapes radiating outward from the bar in orange and coral suggesting keyword tags. Clean flat icon composition. Dark charcoal background. No text, no letters, no words in any element.`,
  },
  {
    filename: 'pin-04-monetize-fitness.png',
    prompt: `${PIN_STYLE}. Abstract dumbbell icon at the bottom in muted charcoal outline, with four horizontal bar segments stacked above it like a bar chart, each segment progressively taller and brighter orange moving upward, forming a rising income stack visual. Flat geometric composition suggesting layered earnings. Dark background. No text, no labels, no numbers.`,
  },
  {
    filename: 'pin-05-analytics-tools.png',
    prompt: `${PIN_STYLE}. Abstract dashboard panel in dark charcoal with five vertical bar chart columns in the center, the second-to-tallest column glowing warm orange while others are muted coral, and a small rounded metric badge in orange at the top suggesting a highlighted qualified view number. Clean UI abstraction. No text, no numbers, no labels, no letters.`,
  },
  {
    filename: 'pin-06-repurpose-content.png',
    prompt: `${PIN_STYLE}. Abstract large rectangle representing a video at the top in dark charcoal, with three branching arrow lines flowing downward to three smaller clip rectangles in warm orange and coral, suggesting content multiplication. Tree-branch split diagram showing one source becoming many. Bold geometric arrows. Dark background. No text, no numbers, no labels.`,
  },
  {
    filename: 'pin-07-brand-deals.png',
    prompt: `${PIN_STYLE}. Abstract geometric handshake silhouette in warm orange at center, with a flat document/page shape in charcoal to the left representing a media kit, and a small rectangular card outline in coral to the right representing a rate card. Three-element composition suggesting brand partnership. Dark charcoal background. No text, no words, no letters on any element.`,
  },
];

async function generatePin(item) {
  console.log(`Generating: ${item.filename}...`);

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: item.prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: '3:4', // Closest supported ratio to 2:3; crop to 1000x1500 after
    },
  });

  const b64 = response.generatedImages[0].image.imageBytes;
  const buffer = Buffer.from(b64, 'base64');

  const outPath = path.join(OUT_DIR, item.filename);
  await sharp(buffer)
    .resize(1000, 1500, { fit: 'cover', position: 'centre', withoutEnlargement: false })
    .png({ quality: 95 })
    .toFile(outPath);

  console.log(`  Saved: ${outPath}`);
  return item.filename;
}

async function main() {
  console.log(`TCP Week 3 Pins — generating ${pins.length} Pinterest pins (3:4 -> cropped to 1000x1500)...\n`);

  const done = [];
  const failed = [];

  for (const item of pins) {
    try {
      await generatePin(item);
      done.push(item.filename);
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`  FAILED: ${item.filename} — ${err.message}`);
      failed.push({ filename: item.filename, error: err.message });
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\nDone. ${done.length} generated, ${failed.length} failed.`);
  if (failed.length > 0) {
    console.log('Failed:');
    for (const f of failed) console.log(`  - ${f.filename}: ${f.error}`);
  }
}

main().catch(console.error);
