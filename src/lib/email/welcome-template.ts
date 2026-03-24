/**
 * Branded welcome email template for TCP.
 * All CSS is inline for email client compatibility.
 * Uses Manrope with Arial/Helvetica/sans-serif fallback.
 *
 * Brand tokens:
 *   Orange CTA:   #F4A261 bg, #0B0F1A text (NEVER white text on orange)
 *   Orange hover:  #E58B3A
 *   Ink:           #111827
 *   Ink Strong:    #0B0F1A
 *   Warm White bg: #FFF7ED
 *   Surface Muted: #FFF1E6
 *   Text Muted:    #475467
 *   Border:        #EADFD3
 */

const SITE_URL = 'https://tiktokcreativityprogram.com'

interface WelcomeEmailOptions {
  /** Which lead magnet they signed up for */
  leadMagnet?: string | null
  /** Direct download URL or guide URL */
  downloadUrl?: string | null
}

/** Map lead magnet names to their guide/resource URLs */
const LEAD_MAGNET_URLS: Record<string, string> = {
  // Guide inline captures
  'Get the Free Creator Rewards Checklist': '/guides/tiktok-creativity-program-beta-requirements',
  'RPM Optimization Guide': '/guides/tiktok-rpm-rates-by-country',
  'Follower Income Guide': '/guides/tiktok-money-per-follower',
  'Earnings Calculator Results Guide': '/guides/tiktok-earnings-calculator',
  'Eligibility Checklist': '/guides/tiktok-creativity-program-beta-requirements',
  // Resource page lead magnets
  'Earnings Tracker': '/resources/earnings-tracker',
  'Creator Rewards Checklist': '/resources/creator-rewards-checklist',
  'Content Planning Template': '/resources/content-planning-template',
  'Viral Video Worksheet': '/resources/viral-video-worksheet',
}

function getDownloadUrl(leadMagnet?: string | null, downloadUrl?: string | null): string {
  if (downloadUrl) return downloadUrl.startsWith('http') ? downloadUrl : `${SITE_URL}${downloadUrl}`
  if (leadMagnet && LEAD_MAGNET_URLS[leadMagnet]) return `${SITE_URL}${LEAD_MAGNET_URLS[leadMagnet]}`
  return `${SITE_URL}/guides`
}

function getCtaText(leadMagnet?: string | null): string {
  if (leadMagnet) return 'Access Your Free Guide'
  return 'Explore All Guides'
}

function getSubjectLine(leadMagnet?: string | null): string {
  if (leadMagnet) return `Your free guide is ready`
  return `Welcome to TikTok Creativity Program`
}

export function buildWelcomeEmail(options: WelcomeEmailOptions = {}): {
  subject: string
  html: string
} {
  const { leadMagnet, downloadUrl } = options
  const ctaUrl = getDownloadUrl(leadMagnet, downloadUrl)
  const ctaText = getCtaText(leadMagnet)
  const subject = getSubjectLine(leadMagnet)

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${subject}</title>
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
  </style>
</head>
<body style="margin:0;padding:0;background-color:#FFF7ED;font-family:'Manrope',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">

  <!-- Preheader text (hidden) -->
  <div style="display:none;font-size:1px;color:#FFF7ED;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${leadMagnet ? `Your free guide is ready to download.` : `Welcome — free guides, calculators, and tips to grow your TikTok earnings.`}
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFF7ED;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;background-color:#FFFFFF;border:1px solid #EADFD3;border-radius:16px;">

          <!-- Logo / Brand header -->
          <tr>
            <td style="padding:32px 32px 0 32px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#FFF1E6;border-radius:12px;padding:12px 20px;">
                    <span style="font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:18px;font-weight:800;color:#0B0F1A;letter-spacing:-0.3px;">TikTok Creativity Program</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:28px 32px 0 32px;">
              <h1 style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:#0B0F1A;line-height:1.3;text-align:center;">
                ${leadMagnet ? `Your guide is ready` : `Welcome aboard`}
              </h1>
              <p style="margin:0 0 20px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;text-align:center;">
                ${leadMagnet
                  ? `Thanks for downloading <strong style="color:#0B0F1A;">${leadMagnet}</strong>. Click below to access it right away.`
                  : `You just joined thousands of creators using free guides, earnings calculators, and data-backed strategies to maximize their TikTok Creativity Program earnings.`
                }
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:4px 32px 0 32px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="background-color:#F4A261;border-radius:999px;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${ctaUrl}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="50%" fillcolor="#F4A261" stroke="f">
                      <w:anchorlock/>
                      <center style="color:#0B0F1A;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;">${ctaText}</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${ctaUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#0B0F1A;text-decoration:none;border-radius:999px;background-color:#F4A261;line-height:1;">
                      ${ctaText}
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Value props -->
          <tr>
            <td style="padding:28px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFF1E6;border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#0B0F1A;">What you get as a subscriber:</p>
                    <p style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:13px;color:#475467;line-height:1.7;">
                      &bull;&nbsp; 100+ in-depth guides on TikTok monetization<br>
                      &bull;&nbsp; Free earnings calculators and RPM data<br>
                      &bull;&nbsp; Strategy updates when TikTok changes the rules<br>
                      &bull;&nbsp; No spam, ever. Only useful stuff.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer before footer -->
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
            <td style="padding:20px 32px 28px 32px;text-align:center;">
              <p style="margin:0 0 8px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:12px;color:#475467;line-height:1.6;">
                <a href="${SITE_URL}" style="color:#475467;text-decoration:underline;" target="_blank">tiktokcreativityprogram.com</a>
              </p>
              <p style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:11px;color:#9CA3AF;line-height:1.5;">
                You received this because you signed up on our site.<br>
                <a href="${SITE_URL}/unsubscribe?email={{email}}" style="color:#9CA3AF;text-decoration:underline;">Unsubscribe</a>
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

  return { subject, html }
}
