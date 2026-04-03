#!/usr/bin/env node
/**
 * Send Brett the TCP Visual Overhaul task email via Resend.
 * Usage: node scripts/send-brett-tasks-email.mjs
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY
if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY not set. Run: export RESEND_API_KEY=...')
  process.exit(1)
}
const FROM = 'TikTok Creativity Program <hello@tiktokcreativityprogram.com>'
const TO = 'theyellowbirdcompany@gmail.com'
const SUBJECT = 'TCP Visual Overhaul - Your Tasks for Today'

const HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 640px; margin: 0 auto; padding: 20px; }
  h3 { color: #111; margin-top: 24px; margin-bottom: 8px; }
  .section { margin-bottom: 20px; }
  .category { margin-bottom: 12px; }
  .category strong { color: #333; }
  .handles { color: #555; font-family: monospace; font-size: 14px; }
  .verify { background: #fff3cd; padding: 12px; border-radius: 6px; margin-top: 12px; }
  .done { background: #d4edda; padding: 12px; border-radius: 6px; }
  .auto { background: #d1ecf1; padding: 12px; border-radius: 6px; }
  ul { margin: 4px 0; padding-left: 20px; }
  li { margin-bottom: 4px; }
  .sig { color: #888; margin-top: 32px; border-top: 1px solid #eee; padding-top: 12px; }
</style>
</head>
<body>

<p>Hey Brett,</p>

<p>Here's what needs your attention today for the TCP visual overhaul:</p>

<div class="section">
<h3>Screenshot 27 TikTok Profiles</h3>
<p>Visit each profile in your browser and screenshot just the header area (avatar, name, followers, bio). Save as <code>{handle}.webp</code> in <code>projects/tiktok-creativity-program/public/images/creators/</code></p>

<div class="category">
<strong>Comedy (6):</strong><br>
<span class="handles">@khaby.lame, @mattrife (try @matt.rife too), @druski, @brittany_broski, @johncristcomedian, @shellybellycomedy</span>
</div>

<div class="category">
<strong>Coaches (6):</strong><br>
<span class="handles">@melrobbins, @ahormozi, @tonyrobbins, @robdial, @theambitious.christian, @marcchinkoun</span>
</div>

<div class="category">
<strong>Travel (6):</strong><br>
<span class="handles">@alexojeda, @nasdaily, @florina_toma, @drewbinsky, @jordentually, @sightsofsara</span>
</div>

<div class="category">
<strong>New Replacements (7):</strong><br>
<span class="handles">@hindash (beauty), @sivan.tm (fitness), @noorahmad_art (artists), @venbee.music (musician), @lolayounggg (musician), @the_mrskelly (teacher), @nikkietutorials (beauty)</span>
</div>

<div class="verify">
<strong>Also verify these handles exist</strong> (they weren't found):<br>
<ul>
<li>berrystrawnana (artist, ~59K)</li>
<li>gabedannenbring (teacher, ~1.6M)</li>
<li>hyramhair / hyram (beauty/skincare, ~7M)</li>
</ul>
</div>
</div>

<div class="section">
<div class="auto">
<h3 style="margin-top:0">Auto-Running Today:</h3>
<ul>
<li>Hero image cron fires at 6 AM PT (65 of 71 remaining guides)</li>
<li>Check <code>scripts/hero-gen.log</code> for progress</li>
</ul>
</div>
</div>

<div class="section">
<div class="done">
<h3 style="margin-top:0">Already Done:</h3>
<ul>
<li>8 SVG niche icons created</li>
<li>20 creator profile screenshots captured</li>
<li>Creator research complete (48 creators, 8 niches)</li>
<li>Hero image style locked and approved</li>
<li>Niche page redesign in progress (Devan building)</li>
</ul>
</div>
</div>

<p class="sig">-- Claude</p>

</body>
</html>
`

async function send() {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: SUBJECT,
      html: HTML,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error('Failed to send email:', data)
    process.exit(1)
  }

  console.log('Email sent successfully:', data.id)
}

send()
