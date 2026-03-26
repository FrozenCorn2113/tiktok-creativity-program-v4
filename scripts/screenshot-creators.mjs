#!/usr/bin/env node
/**
 * Screenshot TikTok creator profiles for niche pages.
 * Captures the profile header area (avatar, name, follower count).
 * Outputs as .webp to public/images/creators/{handle}.webp
 *
 * Usage:
 *   node scripts/screenshot-creators.mjs          # capture all missing
 *   node scripts/screenshot-creators.mjs --force   # re-capture all
 *   node scripts/screenshot-creators.mjs --handles melrobbins,ahormozi  # specific handles
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const OUTPUT_DIR = path.resolve('public/images/creators');

// All creator handles from niche-data.ts that need screenshots
const ALL_CREATORS = [
  // Musicians
  'chinchilla_music',
  'venbee.music',
  'maestephens_',
  'nickyyoure',
  'adammelchor',
  // Fitness
  'natachaoceane',
  'ryanhumiston',
  'jordanshrinks',
  'hannaoeberg',
  'sivan.tm',
  // Artists
  'artwithflo',
  'dinanorlund',
  'noorahmad_art',
  'jesskarp',
  'mysweetchubs',
  'samdoesarts',
  // Teachers
  'mr.terry_',
  'sciencewithmrj',
  'mathwithmenno',
  'mrsenglishclass',
  'thehistoryplug',
  'englishwithkayla',
  // Beauty
  'glowwithava',
  'mimielita',
  'marimariamakeup',
  'hindash',
  // Comedy
  'brandoncaleb',
  'zacklugo',
  'hulkthecomedian',
  'trey_da_comedian1',
  'davefeincomedian',
  // Coaches
  'vanessalau.co',
  'codiesanchez',
  'projectme_with_tiffany',
  'charityrogers_',
  'keenyakelly',
  'theambitious.christian',
  'marcchinkoun',
  // Travel
  'heleneinbetween',
  'tylerginter',
  'riotravelers',
  'theworldpursuit',
  'emsbudgettravel',
];

const args = process.argv.slice(2);
const forceAll = args.includes('--force');
const handlesArg = args.find(a => a.startsWith('--handles'));
let targetCreators = ALL_CREATORS;

if (handlesArg) {
  const idx = args.indexOf('--handles');
  if (args[idx + 1]) {
    targetCreators = args[idx + 1].split(',').map(h => h.trim());
  }
}

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function screenshotProfile(page, handle) {
  const webpPath = path.join(OUTPUT_DIR, `${handle}.webp`);
  const pngPath = path.join(OUTPUT_DIR, `${handle}.png`);

  if (!forceAll && existsSync(webpPath)) {
    console.log(`SKIP ${handle} -- .webp already exists`);
    return { handle, status: 'skipped' };
  }

  const url = `https://www.tiktok.com/@${handle}`;

  try {
    console.log(`  ${handle}: navigating...`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Remove CAPTCHA/modal overlays
    await page.evaluate(() => {
      document.querySelectorAll(
        '[class*="captcha"], [class*="Captcha"], [class*="verify"], [class*="Verify"], ' +
        '[class*="modal"], [class*="Modal"], [class*="overlay"], [class*="Overlay"], ' +
        '[class*="backdrop"], [class*="Backdrop"]'
      ).forEach(el => el.remove());
      document.querySelectorAll('div').forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.position === 'fixed' && parseInt(style.zIndex) > 100) {
          el.remove();
        }
      });
    });

    await page.waitForTimeout(500);

    // Check if profile actually loaded (not a 404 or empty page)
    const hasProfile = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('Followers') && text.includes('Following');
    });

    if (!hasProfile) {
      console.log(`  ${handle}: FAIL -- profile not found or didn't load`);
      return { handle, status: 'fail', error: 'Profile not found' };
    }

    // Try to find the header element for a clean crop
    const headerElement = await page.$('[data-e2e="user-page"] header')
      || await page.$('[class*="ShareLayoutHeader"]')
      || await page.$('[class*="UserInfoHeader"]');

    if (headerElement) {
      await headerElement.screenshot({ path: pngPath, type: 'png' });
    } else {
      // Fallback: clip the top portion
      await page.screenshot({
        path: pngPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 1280, height: 280 },
      });
    }

    // Convert PNG to WebP using sips (macOS native)
    try {
      execSync(`sips -s format webp "${pngPath}" --out "${webpPath}" 2>/dev/null`);
      unlinkSync(pngPath); // Clean up PNG
    } catch {
      // If sips webp fails, try cwebp
      try {
        execSync(`cwebp -q 85 "${pngPath}" -o "${webpPath}" 2>/dev/null`);
        unlinkSync(pngPath);
      } catch {
        // Keep the PNG, rename to webp (browsers handle it)
        console.log(`  ${handle}: WARNING -- could not convert to webp, keeping png`);
        // Just rename for now
        execSync(`mv "${pngPath}" "${webpPath}"`);
      }
    }

    console.log(`  ${handle}: OK`);
    return { handle, status: 'ok' };
  } catch (err) {
    console.error(`  ${handle}: FAIL -- ${err.message}`);
    // Clean up any partial files
    if (existsSync(pngPath)) unlinkSync(pngPath);
    return { handle, status: 'fail', error: err.message };
  }
}

async function main() {
  const toCapture = forceAll
    ? targetCreators
    : targetCreators.filter(h => !existsSync(path.join(OUTPUT_DIR, `${h}.webp`)));

  console.log(`\nTikTok Creator Profile Screenshots`);
  console.log(`===================================`);
  console.log(`Total creators: ${targetCreators.length}`);
  console.log(`To capture: ${toCapture.length}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  if (toCapture.length === 0) {
    console.log('All screenshots already exist. Use --force to re-capture.');
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'en-US',
  });

  const page = await context.newPage();

  const results = { ok: [], fail: [], skipped: [] };

  for (let i = 0; i < toCapture.length; i++) {
    const handle = toCapture[i];
    console.log(`[${i + 1}/${toCapture.length}]`);
    const result = await screenshotProfile(page, handle);
    results[result.status].push(result.handle);

    // Delay between requests to avoid rate limiting
    if (i < toCapture.length - 1) {
      const delay = 2000 + Math.random() * 2000; // 2-4 seconds
      await page.waitForTimeout(delay);
    }
  }

  await browser.close();

  console.log(`\n=== RESULTS ===`);
  console.log(`OK:      ${results.ok.length} -- ${results.ok.join(', ') || 'none'}`);
  console.log(`FAIL:    ${results.fail.length} -- ${results.fail.join(', ') || 'none'}`);
  console.log(`SKIPPED: ${results.skipped.length}`);

  if (results.fail.length > 0) {
    console.log(`\nTo retry failures: node scripts/screenshot-creators.mjs --handles ${results.fail.join(',')}`);
  }
}

main().catch(console.error);
