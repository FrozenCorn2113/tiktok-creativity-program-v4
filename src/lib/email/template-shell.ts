/**
 * Shared TCP email template shell.
 *
 * Every drip email and the weekly newsletter uses `renderEmailShell()`.
 * Welcome email refactors to this shell.
 *
 * Spec: Vale/tcp-email-template-spec.md
 *
 * Brand tokens (light mode):
 *   Page bg:       #FFF7ED
 *   Card bg:       #FFFFFF
 *   Card border:   #EADFD3
 *   Accent orange: #F4A261
 *   Ink strong:    #0B0F1A
 *   Ink body:      #111827
 *   Text muted:    #475467
 *   Text faint:    #9CA3AF
 *   Callout bg:    #FFF1E6
 *
 * Dark mode overrides are applied via <style> media query with !important.
 * Apple Mail (macOS/iOS) respects prefers-color-scheme; Gmail does its own
 * inversion, which we tolerate.
 */

export const SITE_URL = 'https://tiktokcreativityprogram.com'

export interface EmailShellHero {
  /** Absolute URL to the hero image. JPG preferred for widest support. */
  src: string
  /** Descriptive alt text, under 125 chars. Required, never empty. */
  alt: string
}

export interface EmailShellCTA {
  /** Button label text. */
  text: string
  /** Destination URL. */
  url: string
}

export interface EmailShellFooter {
  /** Subscriber email for unsubscribe link. If null/empty, link renders without the email param. */
  email: string | null
}

export interface EmailShellOptions {
  /** 85 to 100 chars. Shows in inbox preview. */
  preheader: string
  /** Optional hero image. Omit the row entirely when not provided. */
  hero?: EmailShellHero
  /** Pre-rendered HTML string of content modules. Compose via the helpers below. */
  body: string
  /** Optional primary CTA. Footer-only emails may skip. */
  cta?: EmailShellCTA
  /** Footer options. Required. */
  footer: EmailShellFooter
  /** Optional <title>. Defaults to "TikTok Creativity Program". */
  title?: string
}

/**
 * Module A: Single-column body paragraph.
 */
export function bodyText(p: string): string {
  return `<p class="card-text" style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">${p}</p>`
}

/**
 * Module B: Quick Tip / P.S. / Key insight callout box.
 */
export function calloutBox(label: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="callout-box" style="background-color:#FFF1E6;border-radius:10px;margin:8px 0 20px 0;">
  <tr>
    <td style="padding:16px 20px;">
      <p class="card-text-muted" style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:13px;color:#475467;line-height:1.7;">
        <strong style="color:#0B0F1A;">${label}</strong> ${text}
      </p>
    </td>
  </tr>
</table>`
}

/**
 * Module C: Bullet list. Uses real <ul> for a11y.
 */
export function bulletList(items: string[]): string {
  const lis = items.map((item) => `    <li style="margin-bottom:6px;">${item}</li>`).join('\n')
  return `<ul class="card-text" style="margin:0 0 16px 0;padding-left:20px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.8;">
${lis}
  </ul>`
}

/**
 * Module D: Image with caption.
 */
export function imageCaption(src: string, alt: string, caption: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:16px 0 20px 0;">
  <tr>
    <td style="padding:0;">
      <img src="${src}" alt="${escapeAttr(alt)}" width="536" style="display:block;width:100%;max-width:536px;height:auto;border-radius:8px;" />
    </td>
  </tr>
  <tr>
    <td class="card-text-muted" style="padding:8px 0 0 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:12px;color:#9CA3AF;line-height:1.5;">
      ${caption}
    </td>
  </tr>
</table>`
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Build unsubscribe URL.
 * If email is null/empty, render the link without the email param so list-based
 * lookup can still resolve the subscriber.
 */
function buildUnsubscribeUrl(email: string | null): string {
  if (!email) return `${SITE_URL}/unsubscribe`
  return `${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}`
}

/**
 * Render the CTA block: VML ghost table for Outlook, gradient <a> for everyone else.
 * Width auto-bumps for longer labels to keep Outlook VML readable.
 */
function renderCTA(cta: EmailShellCTA): string {
  const vmlWidth = cta.text.length > 18 ? 300 : 240
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
  <tr>
    <td align="center" style="padding:0;">
      <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
                   xmlns:w="urn:schemas-microsoft-com:office:word"
                   href="${cta.url}"
                   style="height:48px;v-text-anchor:middle;width:${vmlWidth}px;"
                   arcsize="50%"
                   fillcolor="#F4A261"
                   stroke="f">
        <w:anchorlock/>
        <center style="color:#0B0F1A;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;">
          ${cta.text}
        </center>
      </v:roundrect>
      <![endif]-->
      <!--[if !mso]><!-->
      <a href="${cta.url}" class="cta-link" style="display:inline-block;padding:14px 32px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#0B0F1A;text-decoration:none;border-radius:999px;background:linear-gradient(135deg,#F4A261 0%,#E8894A 100%);background-color:#F4A261;box-shadow:inset 0 -2px 0 rgba(0,0,0,0.15),0 1px 3px rgba(0,0,0,0.12);line-height:1;mso-hide:all;">
        ${cta.text}
      </a>
      <!--<![endif]-->
    </td>
  </tr>
</table>`
}

/**
 * Render the hero image row. Returns empty string if no hero provided.
 */
function renderHero(hero?: EmailShellHero): string {
  if (!hero) return ''
  return `<tr>
  <td style="padding:24px 32px 0 32px;">
    <img src="${hero.src}" alt="${escapeAttr(hero.alt)}" width="536" style="display:block;width:100%;max-width:536px;height:auto;border-radius:10px;" />
  </td>
</tr>
`
}

/**
 * Full TCP email shell. Returns a complete `<!DOCTYPE html> ... </html>` string.
 */
export function renderEmailShell(options: EmailShellOptions): string {
  const { preheader, hero, body, cta, footer, title } = options
  const docTitle = title || 'TikTok Creativity Program'
  const unsubscribeUrl = buildUnsubscribeUrl(footer.email)

  // Body content cell: padding-top differs based on whether hero exists.
  const bodyPaddingTop = hero ? '28px' : '32px'

  // Optional CTA row.
  const ctaRow = cta
    ? `<tr>
  <td style="padding:8px 32px 0 32px;" align="center">
    ${renderCTA(cta)}
  </td>
</tr>
`
    : ''

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${escapeAttr(docTitle)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap');

    /* Dark mode overrides. Apple Mail (macOS/iOS) honors these. */
    @media (prefers-color-scheme: dark) {
      body, .outer-wrapper { background-color: #1A1310 !important; }
      .card { background-color: #211C18 !important; border-color: #3A3028 !important; }
      .card-text { color: #EDE8E3 !important; }
      .card-text a { color: #F4A261 !important; text-decoration: underline !important; }
      .card-text-muted { color: #A89E96 !important; }
      .callout-box { background-color: #2A2218 !important; }
      .wordmark-pill { background-color: #2A2218 !important; }
      .footer-text { color: #6B6560 !important; }
      .footer-text a { color: #A89E96 !important; }
      .wordmark-text { color: #EDE8E3 !important; }
    }

    /* Apple Mail macOS hover state. Silent no-op in Gmail and Outlook. */
    .cta-link:hover {
      background: linear-gradient(135deg, #E8894A 0%, #D97040 100%) !important;
      transform: scale(1.02);
    }
  </style>
</head>
<body class="outer-wrapper" style="margin:0;padding:0;background-color:#FFF7ED;font-family:'Manrope',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">

  <!-- Preheader (hidden from render, visible to inbox preview) -->
  <div style="display:none;font-size:1px;color:#FFF7ED;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${preheader}
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="outer-wrapper" style="background-color:#FFF7ED;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="card" style="max-width:600px;width:100%;background-color:#FFFFFF;border:1px solid #EADFD3;border-radius:16px;">

          <!-- Header: wordmark pill -->
          <tr>
            <td style="padding:28px 0 0 0;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td class="wordmark-pill" style="background-color:#FFF1E6;border-radius:10px;padding:10px 20px;">
                    <span class="wordmark-text" style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:17px;font-weight:800;color:#0B0F1A;letter-spacing:-0.3px;">TikTok Creativity Program</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Header: orange accent bar -->
          <tr>
            <td style="padding:14px 0 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td height="3" style="height:3px;font-size:0;line-height:0;background-color:#F4A261;">&#8202;</td>
                </tr>
              </table>
            </td>
          </tr>

          ${renderHero(hero)}<!-- Body content -->
          <tr>
            <td style="padding:${bodyPaddingTop} 32px 0 32px;">
              ${body}
            </td>
          </tr>

          ${ctaRow}<!-- Footer spacer -->
          <tr>
            <td style="padding:28px 0 0 0;"></td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <div style="border-top:1px solid #EADFD3;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer-text" style="padding:20px 32px 28px 32px;text-align:center;">
              <p style="margin:0 0 6px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:12px;color:#475467;line-height:1.6;">
                <a href="${SITE_URL}" style="color:#475467;text-decoration:underline;" target="_blank">tiktokcreativityprogram.com</a>
              </p>
              <p style="margin:0 0 6px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:11px;color:#9CA3AF;line-height:1.5;">
                Reply to this email anytime. It goes directly to a human.
              </p>
              <p style="margin:0 0 8px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:11px;color:#9CA3AF;line-height:1.5;">
                Some links in our emails are affiliate links. If you buy through them, we may earn a small commission at no extra cost to you.
              </p>
              <p style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:11px;color:#9CA3AF;line-height:1.5;">
                You received this because you signed up at tiktokcreativityprogram.com.<br>
                <a href="${unsubscribeUrl}" style="color:#9CA3AF;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card container -->

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>`
}
