/**
 * TCP Week 2 — Retry single images with number/text issues
 */

const { GoogleGenAI } = require('@google/genai');
const sharp = require('sharp');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) { console.error('No key'); process.exit(1); }

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const OUT_DIR = path.join(__dirname);

const STYLE = 'Abstract modern flat digital illustration, no text, no words, no letters, no numbers, no labels, no captions, dark charcoal background, warm orange and coral accent shapes, clean geometric forms, high contrast, minimal, bold composition, social media graphic style, professional, 2D flat design';
const IG_STYLE = `${STYLE}, square format composition, centered bold visual`;
const PIN_STYLE = `${STYLE}, vertical format composition, visually balanced for tall portrait orientation`;

const images = [
  {
    filename: 'ig-single-01-tax-guide.png',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    prompt: `${IG_STYLE}. Stack of three large gold-orange coin circles, slightly offset from each other creating a pile effect, glowing warm orange light beneath them. Surrounded by abstract geometric diamond shapes and angular decorative elements on dark charcoal background. No calendar, no grid, no numbers, no letters, no financial symbols. Pure abstract coin pile composition.`,
  },
  {
    filename: 'pin-02-tax-guide.png',
    width: 1000,
    height: 1500,
    aspectRatio: '3:4',
    prompt: `${PIN_STYLE}. Abstract flat tax-and-finance concept: a bold orange calculator body with blank display screen (no digits, no numbers), a simplified bill silhouette as a horizontal orange rectangle bar, and a calendar icon with plain empty grid squares (no dates, no numbers). All geometric abstract icons on dark charcoal. No text, no numbers, no digits, no financial symbols on any element.`,
  },
];

async function generate(item) {
  console.log(`Generating: ${item.filename}...`);

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: item.prompt,
    config: { numberOfImages: 1, aspectRatio: item.aspectRatio },
  });

  const b64 = response.generatedImages[0].image.imageBytes;
  const buffer = Buffer.from(b64, 'base64');
  const outPath = path.join(OUT_DIR, item.filename);

  if (item.aspectRatio === '3:4') {
    // Crop from center to 2:3 for Pinterest
    const img = sharp(buffer);
    const meta = await img.metadata();
    const targetW = Math.floor(meta.height * (2 / 3));
    const leftOffset = Math.floor((meta.width - targetW) / 2);
    await sharp(buffer)
      .extract({ left: leftOffset, top: 0, width: targetW, height: meta.height })
      .resize(item.width, item.height, { fit: 'fill' })
      .png({ quality: 95 })
      .toFile(outPath);
  } else {
    await sharp(buffer)
      .resize(item.width, item.height, { fit: 'cover' })
      .png({ quality: 95 })
      .toFile(outPath);
  }

  console.log(`  Saved: ${outPath}`);
}

async function main() {
  for (const item of images) {
    try {
      await generate(item);
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.error(`  FAILED: ${item.filename} — ${err.message}`);
    }
  }
  console.log('Done.');
}

main().catch(console.error);
