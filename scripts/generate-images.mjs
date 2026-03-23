/**
 * Image generation script for TikTok Creativity Program
 * Generates category hero images, thumbnails, calculator heroes, and homepage explainer
 * Uses Gemini Imagen 4 (fast tier) + sharp for optimization
 */

import { createRequire } from 'module';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const require = createRequire(import.meta.url);
const sharp = require('sharp');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error('GEMINI_API_KEY environment variable is required');
const MODEL = 'imagen-4.0-fast-generate-001';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;

// Base style prefix from ILLUSTRATION_PROMPTS.md
const BASE_PROMPT = `Flat line-art illustration. Thin uniform black outlines, consistent 1.5-2px weight throughout — no tapered strokes, no brush variation. Flat color fills only — absolutely no gradients, no shading, no drop shadows, no inner glow. Pure white background. Orange accent color #F4A261 used sparingly: one clothing item per figure maximum, and one UI element in the scene. All other clothing is black or white. Hair is solid black fill or solid orange fill, simple shapes, no detail. Character proportions: slightly stylized with head approximately 1/6 body height, simplified limbs, minimal facial detail — eyes are simple dots or small arcs, small simple smile. All objects share the same thin outline and flat fill treatment. Background props drawn in same line style but filled light gray (#F2F2F2) to recede behind foreground. Clean modern vector illustration style, similar to Blush Design or unDraw.`;

// Images to generate
// Heroes: 1200x630 -> use 16:9 aspect ratio, then crop to exact dims via sharp
// Thumbnails: derive from heroes via sharp resize (400x300)
// Calculator: 1200x630 -> 16:9
// Explainer: 800x600 -> 4:3

const IMAGES = [
  // ── Category heroes ──────────────────────────────────────────────────────────
  {
    id: 'hero-getting-started',
    outputPath: 'public/images/guides/hero-getting-started.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: true,
    thumbPath: 'public/images/guides/thumb-getting-started.webp',
    prompt: `${BASE_PROMPT} Scene: Person sitting in a simple chair, holding a clipboard with an oversized checklist. Four checklist items — two with black checkmarks filled, one currently being checked in orange #F4A261, one empty. Character has black hair, wears an orange #F4A261 jacket over a white shirt and black pants. Simple white background, light-gray side table background prop. Mood: methodical, optimistic — working through requirements carefully.`,
  },
  {
    id: 'hero-maximize-earnings',
    outputPath: 'public/images/guides/hero-maximize-earnings.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: true,
    thumbPath: 'public/images/guides/thumb-maximize-earnings.webp',
    prompt: `${BASE_PROMPT} Scene: A young person standing with one fist slightly raised in a calm earned-success gesture. To their right, an oversized phone shows a simplified earnings dashboard: a large dollar amount in bold and a small upward-trending bar chart with the rightmost bar filled in orange #F4A261. Character has black hair, wears an orange #F4A261 top and black pants. Background: two small light-gray props — a simple desk and a small plant. Mood: confident, calm celebration.`,
  },
  {
    id: 'hero-troubleshooting',
    outputPath: 'public/images/guides/hero-troubleshooting.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: true,
    thumbPath: 'public/images/guides/thumb-troubleshooting.webp',
    prompt: `${BASE_PROMPT} Scene: Person seated at a desk, leaning toward a monitor. One hand raised with palm facing up — "what is happening?" gesture. The monitor shows an error state: a bold outlined exclamation mark inside a triangle and simplified text lines. Chair filled in orange #F4A261 — the single orange element. Character has black hair, black top, black pants. Desk and monitor white with black outlines. Background prop (light gray): small cactus plant on a shelf. Mood: mild puzzlement, problem-solving mode.`,
  },
  {
    id: 'hero-country-guides',
    outputPath: 'public/images/guides/hero-country-guides.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: true,
    thumbPath: 'public/images/guides/thumb-country-guides.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing at a desk looking at a large monitor showing a simplified world map outline with a few location pin markers. One pin on the map is filled orange #F4A261 — the single orange accent. Character has black hair, wears a white shirt and black pants. One hand points toward the map screen. Background props (light gray): small globe on desk, simple bookshelf. Mood: research, exploration, planning international reach.`,
  },
  {
    id: 'hero-tools-equipment',
    outputPath: 'public/images/guides/hero-tools-equipment.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: true,
    thumbPath: 'public/images/guides/thumb-tools-equipment.webp',
    prompt: `${BASE_PROMPT} Scene: Person sitting at a desk working on a large open laptop. The laptop screen shows a simplified video timeline interface — horizontal strip of video frames, playhead line, colored track rows. Active track row filled in orange #F4A261. One hand on keyboard, the other on mouse. Character has black hair, wears a white hoodie and black pants. On desk: flat headphones (outlined, black fill). Background prop (light gray): simple wide desk with small external monitor. Mood: focused, in creative flow.`,
  },
  {
    id: 'hero-niche-guides',
    outputPath: 'public/images/guides/hero-niche-guides.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: true,
    thumbPath: 'public/images/guides/thumb-niche-guides.webp',
    prompt: `${BASE_PROMPT} Scene: Person sitting on a stool holding an acoustic guitar (simplified flat shapes, black outline). A phone on a small tripod stand positioned in front of them — they are being filmed. Phone screen shows a simple recording indicator. Guitar strap filled in orange #F4A261 — the single orange element. Character has black hair, wears a white shirt and black jeans. Background prop (light gray): simple floor lamp to one side. Mood: relaxed creative, mid-performance, natural.`,
  },
  {
    id: 'hero-comparisons',
    outputPath: 'public/images/guides/hero-comparisons.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: true,
    thumbPath: 'public/images/guides/thumb-comparisons.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing between two large side-by-side tablet screens. Left tablet shows a simplified bar chart. Right tablet shows a different bar chart. Person looks left-to-right comparing both, one hand raised with index finger pointing. The taller bar on the right chart is filled orange #F4A261 — the single orange accent. Character has black hair, wears a white shirt and black pants. Background props (light gray): simple desk, small plant. Mood: analytical, making an informed comparison.`,
  },
  {
    id: 'hero-strategy',
    outputPath: 'public/images/guides/hero-strategy.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: true,
    thumbPath: 'public/images/guides/thumb-strategy.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing beside a large presentation board. The board shows a simplified upward-trending bar chart — five bars increasing left to right, the tallest rightmost bar filled in orange #F4A261. Small upward arrow above tallest bar. Person stands to the left, one hand gesturing loosely toward it. Character has black hair, wears orange #F4A261 wide-leg pants and a white shirt. Background (light gray): simple shelving unit to one side with a vase. Mood: earned success, data-backed confidence.`,
  },

  // ── Calculator heroes ─────────────────────────────────────────────────────────
  {
    id: 'hero-calculator-earnings',
    outputPath: 'public/images/calculators/hero-earnings.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: false,
    prompt: `${BASE_PROMPT} Scene: Person seated at a clean desk, leaning forward with forearms on desk, looking at a large open laptop. Laptop screen shows a simplified spreadsheet grid with a few cells and a small bar chart — one bar filled in orange #F4A261. On desk beside laptop: a simple flat calculator icon (outlined). Character has black hair, white shirt, black pants. Background (light gray): simple bookshelf. Mood: focused, analytical, in the zone.`,
  },
  {
    id: 'hero-calculator-rpm',
    outputPath: 'public/images/calculators/hero-rpm.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: false,
    prompt: `${BASE_PROMPT} Scene: Person standing next to an oversized bar chart display (freestanding panel). The chart shows bars growing progressively taller left to right — the tallest bar on the right is filled orange #F4A261 with a bold upward arrow above it. Person points at the tallest bar with one finger, the other hand on hip. Character has black hair, wears an orange #F4A261 jacket and black pants. Background (light gray): simple desk and plant. Mood: growth, optimization, measurable progress.`,
  },
  {
    id: 'hero-calculator-follower',
    outputPath: 'public/images/calculators/hero-follower.webp',
    width: 1200,
    height: 630,
    aspectRatio: '16:9',
    makeThumbnail: false,
    prompt: `${BASE_PROMPT} Scene: Three people standing in a loose group. Center person stands slightly forward and holds a phone showing a simplified follower count number with an upward arrow. Connection lines link the three figures in a simple network diagram style. Center person wears an orange #F4A261 top — the single orange clothing element. Left and right figures wear white shirts and black pants, have black hair. Center figure has orange hair (solid fill). Background (light gray): simple rounded shapes representing more people in the distance. Mood: community, growth, connection.`,
  },

  // ── Homepage explainer ────────────────────────────────────────────────────────
  {
    id: 'homepage-explainer',
    outputPath: 'public/images/homepage-explainer.webp',
    width: 800,
    height: 600,
    aspectRatio: '4:3',
    makeThumbnail: false,
    prompt: `${BASE_PROMPT} Scene: Stylized creator at a clean desk reviewing a phone they hold in one hand, the other hand resting on the desk. The phone screen shows a simplified TikTok-style interface: a vertical video frame outline, a simplified progress bar at the bottom, and a small analytics readout in the corner with an upward arrow filled orange #F4A261. Character has black hair, wears an orange #F4A261 crewneck and black pants. Background props (light gray): simple desk with a mug, a small succulent plant on a shelf behind. Mood: creator in control, reviewing their own performance data.`,
  },
];

async function generateImage(prompt, aspectRatio) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 1, aspectRatio },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const b64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error('No image bytes in response');
  return Buffer.from(b64, 'base64');
}

async function processAndSave(pngBuffer, outputPath, width, height, quality = 85) {
  const fullPath = join(projectRoot, outputPath);
  const dir = dirname(fullPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  await sharp(pngBuffer)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .webp({ quality })
    .toFile(fullPath);

  return fullPath;
}

async function main() {
  const results = [];
  const failures = [];

  for (const img of IMAGES) {
    const startTime = Date.now();
    try {
      process.stdout.write(`Generating ${img.id}... `);
      const pngBuffer = await generateImage(img.prompt, img.aspectRatio);

      // Save hero/main image
      const heroPath = await processAndSave(pngBuffer, img.outputPath, img.width, img.height);
      const heroStats = (await import('fs')).statSync(heroPath);
      const heroKB = Math.round(heroStats.size / 1024);

      console.log(`${heroKB}KB [${Date.now() - startTime}ms]`);
      results.push({ id: img.id, path: img.outputPath, sizeKB: heroKB });

      // Generate thumbnail from same buffer
      if (img.makeThumbnail && img.thumbPath) {
        await processAndSave(pngBuffer, img.thumbPath, 400, 300, 80);
        const thumbStats = (await import('fs')).statSync(join(projectRoot, img.thumbPath));
        const thumbKB = Math.round(thumbStats.size / 1024);
        results.push({ id: `${img.id}-thumb`, path: img.thumbPath, sizeKB: thumbKB });
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failures.push({ id: img.id, error: err.message });
    }
  }

  console.log('\n── Results ─────────────────────────────────────────────');
  results.forEach(r => console.log(`  ${r.path.padEnd(60)} ${r.sizeKB}KB`));

  if (failures.length > 0) {
    console.log('\n── Failures ────────────────────────────────────────────');
    failures.forEach(f => console.log(`  ${f.id}: ${f.error}`));
  }

  console.log(`\n${results.length} images generated, ${failures.length} failures`);
  return failures.length === 0 ? 0 : 1;
}

main().then(process.exit).catch(err => {
  console.error(err);
  process.exit(1);
});
