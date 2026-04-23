/**
 * TCP Week 3 Social Images — Generation Script
 * 28 unique images: 7 Pinterest pins + 2 IG singles + 19 carousel slides
 * Guides: sell-digital-products, no-qualified-views, search-seo, monetize-fitness, analytics-tools, repurpose-roi, brand-deals
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

const images = [
  // ── PINTEREST PINS (1000x1500) ─────────────────────────────────────────────

  // Pin 1: sell-digital-products — Shopping bag + digital file + dollar stack
  {
    filename: 'pin-01-sell-digital-products.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract shopping bag silhouette in dark charcoal outline with a glowing warm orange digital document icon inside it, and a stack of three coin circles below suggesting layered income. The document inside the bag has a simple file corner fold shape suggesting a digital product. Bold high-contrast composition. No text, no letters, no numbers, no dollar signs.`,
  },

  // Pin 2: no-qualified-views — Cracked view counter + zero earnings indicator
  {
    filename: 'pin-02-no-qualified-views.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract large eye icon in warm orange with a crack or fracture running through it diagonally, and a flat circular earnings badge below showing empty/hollow suggesting zero payout. Geometric fracture lines across the eye shape in charcoal. Warning energy, bold contrast. Dark charcoal background. No text, no numbers, no dollar signs, no words.`,
  },

  // Pin 3: tiktok-search-seo — Magnifying glass + search bar + keyword tags
  {
    filename: 'pin-03-search-seo.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Large abstract magnifying glass icon in warm orange centered, with a horizontal rounded search bar shape below it in muted charcoal, and five small rounded pill/tag shapes radiating outward from the bar in orange and coral suggesting keyword tags. Clean flat icon composition. Dark charcoal background. No text, no letters, no words in any element.`,
  },

  // Pin 4: monetize-fitness — Stacked bars + dumbbell icon
  {
    filename: 'pin-04-monetize-fitness.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract dumbbell icon at the bottom in muted charcoal outline, with four horizontal bar segments stacked above it like a bar chart, each segment progressively taller and brighter orange moving upward, forming a rising income stack visual. Flat geometric composition suggesting layered earnings. Dark background. No text, no labels, no numbers.`,
  },

  // Pin 5: analytics-tools — Dashboard screen + bar chart + qualified view metric
  {
    filename: 'pin-05-analytics-tools.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract dashboard panel in dark charcoal with five vertical bar chart columns in the center, the second-to-tallest column glowing warm orange while others are muted coral, and a small rounded metric badge in orange at the top suggesting a highlighted qualified view number. Clean UI abstraction. No text, no numbers, no labels, no letters.`,
  },

  // Pin 6: repurpose-content-roi — Single video splitting into multiple clips
  {
    filename: 'pin-06-repurpose-content.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract large rectangle representing a video at the top in dark charcoal, with three branching arrow lines flowing downward to three smaller clip rectangles in warm orange and coral, suggesting content multiplication. Tree-branch split diagram showing one source becoming many. Bold geometric arrows. Dark background. No text, no numbers, no labels.`,
  },

  // Pin 7: brand-deals — Handshake + media kit document + rate card
  {
    filename: 'pin-07-brand-deals.png',
    width: 1000,
    height: 1500,
    prompt: `${PIN_STYLE}. Abstract geometric handshake silhouette in warm orange at center, with a flat document/page shape in charcoal to the left representing a media kit, and a small rectangular card outline in coral to the right representing a rate card. Three-element composition suggesting brand partnership. Dark charcoal background. No text, no words, no letters on any element.`,
  },

  // ── INSTAGRAM SINGLES (1080x1080) ──────────────────────────────────────────

  // IG Single 1: no-qualified-views — Zero earnings diagnostic
  {
    filename: 'ig-single-01-no-qualified-views.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract counter/gauge interface shape in dark charcoal showing a large circular arc dial nearly full in muted coral suggesting high view count, with a small flat empty bar below it in orange outline suggesting near-zero earnings — fractured diagonal crack line crossing from one element to the other. Diagnostic energy, diagnostic gap between the two metrics. No text, no numbers, no words.`,
  },

  // IG Single 2: monetize-fitness — Stacked income layers with dumbbell
  {
    filename: 'ig-single-02-monetize-fitness.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Centered composition: abstract dumbbell silhouette in muted charcoal at the bottom, with four stacked horizontal bars rising above it — each bar in progressively taller and more orange moving upward — the topmost bar glowing bright warm orange. Geometric stacked income layer visual with fitness anchor. Dark charcoal background. No text, no labels, no numbers.`,
  },

  // ── INSTAGRAM CAROUSEL: DIGITAL PRODUCTS (7 slides, 1080x1080) ─────────────

  // Slide 1: Cover — split icon (play button + shopping bag)
  {
    filename: 'ig-carousel-digital-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Bold centered composition: abstract play button triangle in warm orange on the left half and abstract shopping bag silhouette in coral on the right half, separated by a thin vertical line through the center, suggesting dual income streams from one piece of content. Seven small carousel dot indicators at bottom in muted charcoal and orange. Dark background. No text, no letters.`,
  },

  // Slide 2: Two-column comparison — views×RPM vs product×sales
  {
    filename: 'ig-carousel-digital-02-comparison.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract two-column layout with a thin vertical divider. Left column: abstract play button with multiplication symbol shape and downward arrow suggesting low value. Right column: abstract shopping bag with upward arrow suggesting high value. Coral and orange accent on the right column, muted charcoal on the left. Comparison chart energy. No text, no numbers, no symbols, no letters.`,
  },

  // Slide 3: Four product type icons
  {
    filename: 'ig-carousel-digital-03-product-types.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Four abstract product icons arranged in a 2x2 grid on dark charcoal, each in a rounded card panel. Top-left: abstract template/grid shape in orange. Top-right: abstract open book or document pages shape in coral. Bottom-left: abstract film strip suggesting mini-course in orange. Bottom-right: stacked layers suggesting comprehensive course in warm orange. Clean grid card layout. No text, no letters.`,
  },

  // Slide 4: Funnel diagram with bio link
  {
    filename: 'ig-carousel-digital-04-funnel.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract funnel diagram: single chain link icon at top in orange suggesting bio link, pointing downward through a narrowing funnel shape in charcoal, ending at a single landing page rectangle at the bottom in warm orange. Clean vertical funnel flow. Single entry, single exit metaphor. Dark background. No text, no letters, no URL shapes with characters.`,
  },

  // Slide 5: Platform icons — abstract shapes
  {
    filename: 'ig-carousel-digital-05-platforms.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Four abstract platform/hosting icons arranged in a row, each in a rounded rectangle card panel in muted charcoal. One: simple G shape outline suggesting Gumroad. Two: star icon suggesting Stan Store. Three: checkmark shield suggesting Teachable. Four: circuit/connected dots suggesting Kajabi. Warm orange accent on one card. Dark background. No text, no letters, no brand names.`,
  },

  // Slide 6: Content flywheel — circular diagram
  {
    filename: 'ig-carousel-digital-06-flywheel.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract circular flywheel diagram with four rounded rectangle segments arranged in a ring, connected by curved orange arrow lines forming a continuous cycle. Each segment in alternating dark charcoal and warm orange, with directional arrows between them suggesting an infinite loop. Rotational momentum energy. No text, no labels, no letters, no numbers.`,
  },

  // Slide 7: CTA — bookmark icon
  {
    filename: 'ig-carousel-digital-07-cta.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Single bold abstract bookmark ribbon shape in warm orange centered on dark charcoal, with a simple upward arrow below it in coral orange pointing toward the bookmark suggesting saving/bookmarking. Clean minimal single-icon CTA energy. High contrast. No text, no letters, no words.`,
  },

  // ── INSTAGRAM CAROUSEL: SEARCH SEO (6 slides, 1080x1080) ───────────────────

  // Slide 1: Cover — search bar + clock icon
  {
    filename: 'ig-carousel-search-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Bold abstract search bar shape in warm orange centered, with a magnifying glass icon at the left edge and a small circular clock icon to the right edge in coral, suggesting longevity over time. Six small carousel dot indicators at bottom. Dark charcoal background. No text, no letters, no words in search bar.`,
  },

  // Slide 2: FYP vs Search two-column comparison
  {
    filename: 'ig-carousel-search-02-fyp-vs-search.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract two-column comparison layout. Left column in muted charcoal: abstract spike graph line that peaks then drops sharply suggesting 48-hour viral decay. Right column in warm orange: abstract steady upward line suggesting sustained long-term traffic. Thin vertical divider between them. Contrast between short-lived and evergreen. No text, no letters.`,
  },

  // Slide 3: Four indexing signals — speech, eye, hashtag, text block
  {
    filename: 'ig-carousel-search-03-indexing.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Four abstract icons in a 2x2 grid, each in a rounded card panel. Top-left: speech bubble silhouette in orange (spoken audio). Top-right: eye outline in coral (on-screen text/OCR). Bottom-left: hashtag symbol shape in orange. Bottom-right: lined text block rectangle suggesting captions. Each card on dark charcoal with orange accent. No letters, no text.`,
  },

  // Slide 4: Search bar with autocomplete tags
  {
    filename: 'ig-carousel-search-04-keyword-research.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract search bar shape with a magnifying glass at the left in dark charcoal, with five rounded pill/tag shapes cascading downward below it like autocomplete dropdown suggestions, alternating orange and coral colors, each slightly offset to suggest a list. Keyword discovery visual. No text, no letters, no words in any element.`,
  },

  // Slide 5: Video timeline with 30-second marker
  {
    filename: 'ig-carousel-search-05-structure.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract horizontal video timeline bar across center of canvas in dark charcoal, with a thin bright orange vertical tick mark positioned early in the timeline (one-sixth from left) and a small circular badge above it suggesting the qualification threshold marker. Small play button triangle at the far left start of timeline. Clean timeline composition. No text, no numbers, no labels.`,
  },

  // Slide 6: CTA — arrow + bookmark
  {
    filename: 'ig-carousel-search-06-cta.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract composition: an upward diagonal orange arrow pointing toward a bookmark ribbon shape in warm orange at top-right corner, suggesting saving and revisiting. Below the arrow, a small bar chart icon in coral suggesting analytics growth. Minimal high-contrast CTA energy on dark charcoal. No text, no letters.`,
  },

  // ── INSTAGRAM CAROUSEL: ANALYTICS TOOLS (6 slides, 1080x1080) ─────────────

  // Slide 1: Cover — dashboard/analytics icon
  {
    filename: 'ig-carousel-analytics-01-cover.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract dashboard screen panel in dark charcoal with three horizontal metric bars at varying lengths in warm orange and coral suggesting a live analytics interface, a small circular graph arc in the upper right in orange, and six small carousel dot indicators at the bottom. Clean professional UI abstraction. No text, no numbers, no labels.`,
  },

  // Slide 2: Phone screen with native analytics — qualified view metric highlighted
  {
    filename: 'ig-carousel-analytics-02-native.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract phone silhouette in dark charcoal with an inner screen area showing three abstract metric rows, the top row highlighted with a bright orange bar standing taller than the others suggesting the qualified view metric being spotlighted. Flat 2D phone with inner UI abstraction. No text, no numbers, no letters on screen.`,
  },

  // Slide 3: Four metric icons — view counter, completion bar, globe, waveform
  {
    filename: 'ig-carousel-analytics-03-metrics.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Four abstract metric icons in a 2x2 grid, each in a rounded card panel on dark charcoal. Top-left: abstract eye icon in orange (view counter). Top-right: horizontal progress bar with orange fill (completion rate). Bottom-left: globe outline with one region highlighted in orange (geography). Bottom-right: abstract sound waveform bars in coral (watch time curve). No text, no labels, no numbers.`,
  },

  // Slide 4: Four third-party tool use cases as card icons
  {
    filename: 'ig-carousel-analytics-04-tools.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Four abstract icon cards in a 2x2 grid on dark charcoal, each representing a tool use case. Top-left: two overlapping profile silhouettes in muted charcoal suggesting competitive research. Top-right: abstract demographic bar chart in coral suggesting audience analytics. Bottom-left: trending arrow with music note suggesting sound trends in orange. Bottom-right: combined calendar and bar chart icon suggesting scheduling with analytics. Warm orange accent on one card. No text.`,
  },

  // Slide 5: Search bar with "Creator Search Insights" and content gap callout
  {
    filename: 'ig-carousel-analytics-05-search-insights.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract search bar shape in dark charcoal at top with a magnifying glass icon in orange, below it a gap diagram showing two overlapping circles — one in muted charcoal for demand and one in orange for content supply — with the non-overlapping segment highlighted brighter orange suggesting the content gap opportunity. Clean Venn diagram with search bar above. No text, no labels.`,
  },

  // Slide 6: CTA — chart + bookmark
  {
    filename: 'ig-carousel-analytics-06-cta.png',
    width: 1080,
    height: 1080,
    prompt: `${IG_STYLE}. Abstract rising bar chart with three bars increasing left to right, the tallest bar in bright warm orange, with a bookmark ribbon shape overlaid at the top-right corner in coral orange suggesting saving the resource. High-contrast minimal CTA composition on dark charcoal. No text, no letters, no numbers on any element.`,
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
  console.log(`TCP Week 3 — generating ${images.length} images...\n`);

  const done = [];
  const failed = [];

  for (const item of images) {
    try {
      await generateImage(item);
      done.push(item.filename);
      // Rate limit buffer between requests
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
