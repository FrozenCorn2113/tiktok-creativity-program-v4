/**
 * Guide hero image generator — TCP Variant B4
 * Generates 15 unique per-guide hero images + thumbnails + 10 inline images
 * Does NOT touch the 8 existing category images in public/images/guides/hero-*.webp
 *
 * Usage: node scripts/generate-guide-heroes.mjs
 * Requires: GEMINI_API_KEY env var, @google/genai, sharp
 *
 * Author: Vale (image-generation.md workflow)
 * Spec: projects/tcp-variant-b4/design/IMAGE_SPECS.md
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const require = createRequire(import.meta.url);
const sharp = require('sharp');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error('GEMINI_API_KEY environment variable is required. Run: source ~/.zshrc');

const MODEL = 'imagen-4.0-fast-generate-001';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;

// Brand style anchor — do not modify
const BASE_PROMPT = `Flat line-art illustration. Thin uniform black outlines, consistent 1.5-2px weight throughout — no tapered strokes, no brush variation. Flat color fills only — absolutely no gradients, no shading, no drop shadows, no inner glow. Pure white background. Orange accent color #F4A261 used sparingly: one clothing item per figure maximum, and one UI element in the scene. All other clothing is black or white. Hair is solid black fill or solid orange fill, simple shapes, no detail. Character proportions: slightly stylized with head approximately 1/6 body height, simplified limbs, minimal facial detail — eyes are simple dots or small arcs, small simple smile. All objects share the same thin outline and flat fill treatment. Background props drawn in same line style but filled light gray (#F2F2F2) to recede behind foreground. Clean modern vector illustration style, similar to Blush Design or unDraw.`;

// ── Images to generate ─────────────────────────────────────────────────────────
// Priority 1: Top 5 by traffic
// Priority 2: Troubleshooting guides
// Priority 3: Strategy guides
// Priority 4: Niche + case study
// Priority 5: Inline images

const GUIDE_HEROES = [
  // ── Priority 1 ───────────────────────────────────────────────────────────────
  {
    id: 'creator-rewards-2026',
    heroPath: 'public/images/guides/hero-creator-rewards-2026.webp',
    thumbPath: 'public/images/guides/thumb-creator-rewards-2026.webp',
    prompt: `${BASE_PROMPT} Scene: Person seated at a clean desk, holding a phone showing a simplified TikTok earnings dashboard — a large dollar amount displayed prominently, a small upward-trending line chart below it, and an orange #F4A261 "Creator Rewards" label badge at the top of the screen. Character has black hair, wears an orange #F4A261 crewneck sweatshirt and black pants. The phone screen is the focal point — oversized relative to the character to be readable. Background props (light gray): a simple desk lamp to one side, a small notebook. Mood: excited but focused — first payout moment.`,
  },
  {
    id: 'qualified-views-not-counting',
    heroPath: 'public/images/guides/hero-qualified-views-not-counting.webp',
    thumbPath: 'public/images/guides/thumb-qualified-views-not-counting.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing, holding a phone in both hands with a confused-but-focused expression. The phone screen shows a simplified analytics view: a bar chart where several bars are visible but one prominent bar is crossed out with a bold X mark — views that don't count. An orange #F4A261 question mark icon floats beside the screen as a graphic element (not text). Character has black hair, wears a white t-shirt and black pants. Background props (light gray): simple floating diagnostic checklist card to the right of the figure showing three checkboxes. Mood: methodical problem-solving, not panicked.`,
  },
  {
    id: 'optimize-rpm',
    heroPath: 'public/images/guides/hero-optimize-rpm.webp',
    thumbPath: 'public/images/guides/thumb-optimize-rpm.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing beside a large freestanding display panel showing an RPM trend chart. The chart has five data points on a line — the line trends upward dramatically on the right side, ending at a peak point filled orange #F4A261 with a small upward arrow above it. Person points confidently at the peak with one finger, other hand on hip. Character has black hair, wears an orange #F4A261 blazer and black pants. Background props (light gray): a small side table with a laptop showing the same chart mirrored, small plant. Mood: confident, strategic — showing others the path to higher earnings.`,
  },
  {
    id: 'grow-5k-to-10k',
    heroPath: 'public/images/guides/hero-grow-5k-to-10k.webp',
    thumbPath: 'public/images/guides/thumb-grow-5k-to-10k.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing and looking at a large phone display (oversized, freestanding). The phone screen shows a follower count interface: "5,000" on the left side with an arrow pointing right to "10,000" in bold larger text. A simple progress bar below the numbers is half-filled in orange #F4A261. Person raises one fist slightly — quiet celebration. Character has black hair, wears a white hoodie and black pants. Background props (light gray): two small simplified person-silhouette icons floating to the right, representing new followers. Mood: milestone energy — halfway there, the finish line is visible.`,
  },
  {
    id: 'best-ring-lights',
    heroPath: 'public/images/guides/hero-best-ring-lights.webp',
    thumbPath: 'public/images/guides/thumb-best-ring-lights.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing in front of a large ring light (circular, outlined in bold black strokes, inner circle glowing with orange #F4A261 fill — the single orange accent). Person holds a phone toward the ring light, recording themselves. Simple recording indicator visible on phone screen. Character has black hair, wears a black turtleneck. Ring light is on a tall tripod stand. Background props (light gray): simplified desk to the side with a small monitor. Mood: creator setup, professional home studio feel, controlled and intentional.`,
  },

  // ── Priority 2: Troubleshooting ───────────────────────────────────────────────
  {
    id: 'no-qualified-views',
    heroPath: 'public/images/guides/hero-no-qualified-views.webp',
    thumbPath: 'public/images/guides/thumb-no-qualified-views.webp',
    prompt: `${BASE_PROMPT} Scene: Person seated at a desk, holding their head in one hand in a mild "what is happening" gesture — not distressed, just puzzled. Open laptop on desk shows a simplified analytics dashboard where the "qualified views" metric displays zero (bold "0" on screen). A magnifying glass icon overlays the screen edge, outlined in black — one of the lens elements filled orange #F4A261. Character has black hair, wears a white shirt and black pants. Background props (light gray): desk lamp, small potted plant. Mood: puzzled but ready to investigate — problem-solving start.`,
  },
  {
    id: 'rpm-dropping',
    heroPath: 'public/images/guides/hero-rpm-dropping.webp',
    thumbPath: 'public/images/guides/thumb-rpm-dropping.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing and looking at a wall-mounted chart panel. The chart shows a line graph that rises, peaks, then drops sharply on the right side — the downward portion of the line is colored orange #F4A261 (the single orange UI element). Person tilts their head slightly, one hand raised with palm up — "why is this happening?" posture. Character has black hair, wears a white button-down and black pants. Background props (light gray): simple desk below the chart, small notebook. Mood: analytical curiosity, investigating a metric, not alarmed.`,
  },
  {
    id: 'creativity-program-not-showing',
    heroPath: 'public/images/guides/hero-creativity-program-not-showing.webp',
    thumbPath: 'public/images/guides/thumb-creativity-program-not-showing.webp',
    prompt: `${BASE_PROMPT} Scene: Person holding a phone in both hands, scrolling through a simplified TikTok-style settings menu. A "Creator Rewards" menu item is visible but grayed out — a lock icon beside it. Orange #F4A261 fills one checkmark icon on a separate floating checklist card beside the figure, representing one diagnostic step completed. Character has black hair, wears an orange #F4A261 cap and a white t-shirt and black pants. Background props (light gray): simple chair, side table. Mood: systematic — working through a checklist to find the cause.`,
  },

  // ── Priority 3: Strategy ───────────────────────────────────────────────────────
  {
    id: 'tiktok-hook-formulas',
    heroPath: 'public/images/guides/hero-tiktok-hook-formulas.webp',
    thumbPath: 'public/images/guides/thumb-tiktok-hook-formulas.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing in front of a large cue card or teleprompter-style board. The board shows three rows of simplified text lines — each row labeled with a formula label (just abstract lines representing text, not actual words). The top formula has a star or highlight shape beside it in orange #F4A261 — the winning hook. Person holds a marker, about to underline the top formula. Character has black hair, wears an orange #F4A261 lanyard over a white shirt and black pants. Background props (light gray): filmmaking clapperboard to the side, simple tripod. Mood: workshop energy — teaching, systematizing creativity.`,
  },
  {
    id: 'tiktok-viral-formula',
    heroPath: 'public/images/guides/hero-tiktok-viral-formula.webp',
    thumbPath: 'public/images/guides/thumb-tiktok-viral-formula.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing with arms slightly out — a "I figured it out" open gesture. Around them: four floating simplified card elements arranged in a loose arc — Hook, Story, Payoff, CTA (abstract lines of text, no actual words). Connecting arrows between each card show the sequence. The arrow between "Story" and "Payoff" cards is filled orange #F4A261 — the critical link. Character has black hair, wears a white t-shirt and black pants. Background props (light gray): faint chart grid behind the cards. Mood: formula revealed — structured but exciting.`,
  },
  {
    id: 'viral-psychology',
    heroPath: 'public/images/guides/hero-viral-psychology.webp',
    thumbPath: 'public/images/guides/thumb-viral-psychology.webp',
    prompt: `${BASE_PROMPT} Scene: Person sitting cross-legged on a simple chair, one finger on chin in a thinking pose. Above their head: three floating thought bubble icons arranged in a triangle — a heart shape, a repeat/loop arrow, and a share arrow. The share arrow is filled orange #F4A261 — the orange accent. Character has black hair, wears a white sweater and black pants. Background props (light gray): a simple bookshelf to one side. Mood: introspective, thoughtful — understanding what makes content spread, not surface-level.`,
  },

  // ── Priority 4: Niche + Case Study ────────────────────────────────────────────
  {
    id: 'monetize-beauty',
    heroPath: 'public/images/guides/hero-monetize-beauty.webp',
    thumbPath: 'public/images/guides/thumb-monetize-beauty.webp',
    prompt: `${BASE_PROMPT} Scene: Person seated at a vanity-style desk with a ring light behind them (simplified circular outline). They hold a lipstick or makeup brush in one hand and a phone in the other — phone shows a simplified recording indicator. The ring light inner circle is filled orange #F4A261. Character has black hair pulled back, wears a white blouse and black pants. On the desk: simplified makeup items (compact, brush) as flat outlined shapes. Background props (light gray): simple vanity mirror frame, small plant. Mood: creator-as-professional — beauty content as a legitimate business.`,
  },
  {
    id: 'monetize-fitness',
    heroPath: 'public/images/guides/hero-monetize-fitness.webp',
    thumbPath: 'public/images/guides/thumb-monetize-fitness.webp',
    prompt: `${BASE_PROMPT} Scene: Person in a slight forward lunge pose (exercise position) while holding a phone showing a simplified view counter with upward arrow — recording their workout. Phone screen has a live indicator in orange #F4A261. Character has black hair pulled back, wears an orange #F4A261 sports tank top and black leggings. Background props (light gray): simplified dumbbell on the floor, yoga mat outline. Mood: fitness creator at work — movement plus content creation, not posing for a stock photo.`,
  },
  {
    id: 'case-study-0-to-100k',
    heroPath: 'public/images/guides/hero-case-study-0-to-100k.webp',
    thumbPath: 'public/images/guides/thumb-case-study-0-to-100k.webp',
    prompt: `${BASE_PROMPT} Scene: Person standing next to a large timeline chart — a horizontal bar divided into milestones. Left end labeled with a simplified "0" badge, right end labeled with "100K" badge in bolder text. The 100K badge and the arrow connecting to it are filled orange #F4A261. Above the timeline, small icons mark key moments: phone icon, chart icon, dollar icon — abstract milestone markers. Character has black hair, stands tall with a relaxed smile, wears a white shirt and black pants. Background props (light gray): simple desk below the timeline. Mood: retrospective pride — looking back at a journey completed.`,
  },
  {
    id: 'creator-rewards-uk',
    heroPath: 'public/images/guides/hero-creator-rewards-uk.webp',
    thumbPath: 'public/images/guides/thumb-creator-rewards-uk.webp',
    prompt: `${BASE_PROMPT} Scene: Person sitting at a desk with a laptop. The laptop screen shows a simplified map of the United Kingdom outline — just the coast shape, no detail — with a single location pin marker on it filled orange #F4A261. One hand on keyboard. Character has black hair, wears a white shirt and black pants. Background props (light gray): small bookshelf, coffee mug on desk. Mood: research-focused, informational — helping a specific geographic audience.`,
  },
];

// ── Inline images ──────────────────────────────────────────────────────────────
const INLINE_IMAGES = [
  {
    id: 'creator-rewards-2026-qualified-views',
    path: 'public/images/guides/inline/creator-rewards-2026-qualified-views.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: Two side-by-side phone screens. Left phone labeled "Qualified" (text as abstract label lines) — a simplified video plays, viewer watches past 5-second mark shown by a progress bar reaching the midpoint, filled orange #F4A261. Right phone labeled "Not Qualified" — video progress bar barely started, viewer icon with an X mark above. Simple black outlines, flat fills. Mood: clear comparison, teaching a concept.`,
  },
  {
    id: 'creator-rewards-2026-rpm-chart',
    path: 'public/images/guides/inline/creator-rewards-2026-rpm-chart.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: A horizontal bar chart showing 5 niche categories (abstract label lines, no actual text — just consistent line lengths suggesting category names). Bars vary in length — shortest on left, longest on right. The longest bar filled orange #F4A261 represents highest-earning niche. A dollar sign icon above the chart. Clean data visualization style — no people, just the chart on white background with light gray axis lines.`,
  },
  {
    id: 'qualified-views-diagnostic-checklist',
    path: 'public/images/guides/inline/qualified-views-diagnostic-checklist.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: A vertical checklist card (tall rectangle, black outline). Seven checklist rows — each with a checkbox on left and a short text-line placeholder on right. Top two checkboxes are filled (checked) in solid black. Third checkbox is filled orange #F4A261 (currently being checked). Remaining checkboxes are empty circles. Simple, clean, no character — just the diagnostic checklist card centered on white background.`,
  },
  {
    id: 'qualified-views-common-cause',
    path: 'public/images/guides/inline/qualified-views-common-cause.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: An oversized phone showing a TikTok-style video interface. The video duration bar runs 0 to 1:00. A shaded zone from 0 to :05 is filled light gray labeled "skip zone" (abstract). A shaded zone from :05 to end is white. A viewer icon appears in the skip zone with an arrow pointing left (bouncing). Orange #F4A261 accent fills a small "5 sec" marker badge. No character, just the phone and diagram elements.`,
  },
  {
    id: 'optimize-rpm-niche-comparison',
    path: 'public/images/guides/inline/optimize-rpm-niche-comparison.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: Two columns side by side. Left column: a simplified phone showing entertainment-style content (music note icon on screen). Right column: a phone showing finance/education content (dollar sign plus upward arrow on screen). Below each phone: a simple dollar-per-thousand-views label (abstract text lines). The right column's RPM indicator bar is clearly taller — filled orange #F4A261. A simple "vs" separator between columns. No character.`,
  },
  {
    id: 'optimize-rpm-search-bonus',
    path: 'public/images/guides/inline/optimize-rpm-search-bonus.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: A magnifying glass icon (large, centered) with a simplified search bar below it. Inside the magnifying glass lens: a small bar chart with one bar filled orange #F4A261 — the search-boosted RPM bar. To the right: a simple before/after comparison — two small dollar amount labels, the right one (after) is larger. Clean icon-and-chart style, no character.`,
  },
  {
    id: 'grow-5k-post-strategy',
    path: 'public/images/guides/inline/grow-5k-post-strategy.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: A 2x2 grid (quadrant chart). Axes labeled with abstract lines (no text). Top-right quadrant shaded orange #F4A261 — the "High Quality, Consistent Frequency" zone. A small star icon in the top-right quadrant. Three other quadrants are white with light gray dashed borders. Simple axis arrows pointing right (frequency) and up (quality). Clean data visualization.`,
  },
  {
    id: 'grow-5k-hook-anatomy',
    path: 'public/images/guides/inline/grow-5k-hook-anatomy.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: A horizontal video timeline strip. Three labeled zones marked by vertical dividers: Zone 1 (0-3 sec) filled orange #F4A261 — the hook, Zone 2 (3-30 sec) white — the story, Zone 3 (30+ sec) light gray — the payoff. A viewer retention line runs above the timeline, starting high, dipping slightly, then either rising or falling on the right. Simple, flat diagram. No character.`,
  },
  {
    id: 'hooks-formula-table',
    path: 'public/images/guides/inline/hooks-formula-table.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: A structured card showing 5 rows, each representing a hook formula type. Each row has a small icon on the left (question mark, number, arrow, magnifying glass, exclamation mark — simple outlined icons) and two short abstract text lines on the right. The top row (question hook) has its icon and row border filled orange #F4A261. Clean list-card layout, no character, white background.`,
  },
  {
    id: 'viral-psychology-share-triggers',
    path: 'public/images/guides/inline/viral-psychology-share-triggers.webp',
    prompt: `${BASE_PROMPT} Diagram illustration: Three circle elements (not overlapping — arranged in a triangle connected by arrows). Each circle contains a simple icon: heart (emotion), repeat arrows (identity), share arrow (social currency). Orange #F4A261 fills the share arrow circle — the primary trigger. Connecting arrows between all three circles. Clean, icon-based concept diagram. No character.`,
  },
];

// ── Calculator hero ────────────────────────────────────────────────────────────
const CALCULATOR_IMAGES = [
  {
    id: 'calculator-index-hero',
    heroPath: 'public/images/calculators/hero-calculator-index.webp',
    thumbPath: null,
    prompt: `${BASE_PROMPT} Scene: Person seated at a large clean desk, facing an oversized desktop monitor. The monitor screen shows three distinct calculator interface cards side by side — each with a different icon: a dollar sign, a bar chart, and a group of people icons. The active card (center) has an orange #F4A261 highlight border. Person's hands are on a keyboard. Character has black hair, wears a white shirt and black pants. Background props (light gray): clean desk surface, small plant, notebook. Mood: analytical tools at your disposal — purposeful and focused.`,
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

async function generateImage(prompt, aspectRatio = '16:9') {
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
  if (!b64) {
    const errorDetail = data.error || data.predictions?.[0] || 'unknown';
    throw new Error(`No image bytes in response: ${JSON.stringify(errorDetail)}`);
  }
  return Buffer.from(b64, 'base64');
}

async function saveImage(buffer, outputPath, width, height, quality = 85) {
  const fullPath = join(projectRoot, outputPath);
  const dir = dirname(fullPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  await sharp(buffer)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .webp({ quality })
    .toFile(fullPath);

  const { statSync } = await import('fs');
  return Math.round(statSync(fullPath).size / 1024);
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const results = [];
  const failures = [];
  const skipped = [];

  // Helper: process one image entry with hero + optional thumb
  async function processHero(img, heroW, heroH, thumbW, thumbH) {
    const heroExists = existsSync(join(projectRoot, img.heroPath));
    const thumbExists = img.thumbPath ? existsSync(join(projectRoot, img.thumbPath)) : true;

    if (heroExists && thumbExists) {
      skipped.push(img.id);
      process.stdout.write(`  SKIP ${img.id} (already exists)\n`);
      return;
    }

    process.stdout.write(`  GEN  ${img.id}... `);
    const startTime = Date.now();
    try {
      const buffer = await generateImage(img.prompt, '16:9');

      const heroKB = await saveImage(buffer, img.heroPath, heroW, heroH, 85);
      results.push({ id: img.id, path: img.heroPath, sizeKB: heroKB });

      if (img.thumbPath) {
        const thumbKB = await saveImage(buffer, img.thumbPath, thumbW, thumbH, 80);
        results.push({ id: `${img.id}-thumb`, path: img.thumbPath, sizeKB: thumbKB });
      }

      console.log(`${heroKB}KB [${Date.now() - startTime}ms]`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failures.push({ id: img.id, error: err.message });
    }

    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n── Guide Heroes (15 images + thumbs) ────────────────────────');
  for (const img of GUIDE_HEROES) {
    await processHero(img, 1200, 630, 400, 300);
  }

  console.log('\n── Calculator Heroes ─────────────────────────────────────────');
  for (const img of CALCULATOR_IMAGES) {
    await processHero(img, 1200, 630, 400, 300);
  }

  console.log('\n── Inline Images (10 images) ─────────────────────────────────');
  for (const img of INLINE_IMAGES) {
    const exists = existsSync(join(projectRoot, img.path));
    if (exists) {
      skipped.push(img.id);
      process.stdout.write(`  SKIP ${img.id} (already exists)\n`);
      continue;
    }

    process.stdout.write(`  GEN  ${img.id}... `);
    const startTime = Date.now();
    try {
      const buffer = await generateImage(img.prompt, '16:9');
      const sizeKB = await saveImage(buffer, img.path, 800, 450, 80);
      results.push({ id: img.id, path: img.path, sizeKB });
      console.log(`${sizeKB}KB [${Date.now() - startTime}ms]`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failures.push({ id: img.id, error: err.message });
    }

    await new Promise(r => setTimeout(r, 500));
  }

  // Summary
  console.log('\n── Results ───────────────────────────────────────────────────');
  results.forEach(r => console.log(`  ${r.path.padEnd(65)} ${r.sizeKB}KB`));

  if (skipped.length > 0) {
    console.log(`\n── Skipped (${skipped.length}) ──────────────────────────────────────────`);
    skipped.forEach(id => console.log(`  ${id}`));
  }

  if (failures.length > 0) {
    console.log(`\n── Failures (${failures.length}) ──────────────────────────────────────────`);
    failures.forEach(f => console.log(`  ${f.id}: ${f.error}`));
  }

  console.log(`\n${results.length} images generated, ${skipped.length} skipped, ${failures.length} failures`);

  if (failures.length > 0) {
    console.log('\nRe-run this script to retry failed images (skips already-generated files)');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
