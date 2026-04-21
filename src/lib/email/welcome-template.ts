/**
 * Welcome email template — single welcome email.
 * Delivers lead magnet link and introduces the site.
 * All CSS is inline for email client compatibility.
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
  /** Subscriber email address (used for unsubscribe link) */
  email?: string | null
  /** Which lead magnet they signed up for */
  leadMagnet?: string | null
  /** Direct download URL or guide URL */
  downloadUrl?: string | null
}

/** Map lead magnet identifiers to their direct PDF download URLs */
const LEAD_MAGNET_PDF_URLS: Record<string, string> = {
  'rpm-cheat-sheet': '/downloads/tcp-creator-rewards-playbook-2026.pdf',
  'RPM Cheat Sheet': '/downloads/tcp-creator-rewards-playbook-2026.pdf',
  'Get the Free RPM Cheat Sheet': '/downloads/tcp-creator-rewards-playbook-2026.pdf',
  'eligibility-checklist': '/downloads/tcp-eligibility-checklist-2026.pdf',
  'Eligibility Checklist': '/downloads/tcp-eligibility-checklist-2026.pdf',
  'Get the Free Creator Rewards Checklist': '/downloads/tcp-eligibility-checklist-2026.pdf',
  'Creator Rewards Checklist': '/downloads/tcp-eligibility-checklist-2026.pdf',
}

/** Map lead magnet identifiers to their landing page URLs (fallback) */
const LEAD_MAGNET_URLS: Record<string, string> = {
  'rpm-cheat-sheet': '/lead-magnets/rpm-cheat-sheet',
  'RPM Cheat Sheet': '/lead-magnets/rpm-cheat-sheet',
  'Get the Free RPM Cheat Sheet': '/lead-magnets/rpm-cheat-sheet',
  'eligibility-checklist': '/lead-magnets/eligibility-checklist',
  'Eligibility Checklist': '/lead-magnets/eligibility-checklist',
  'Get the Free Creator Rewards Checklist': '/lead-magnets/eligibility-checklist',
  // Legacy mappings
  'RPM Optimization Guide': '/calculators/rpm-by-country',
  'Follower Income Guide': '/calculators/follower-income-estimator',
  'Earnings Calculator Results Guide': '/calculators/earnings-calculator',
  'Earnings Tracker': '/resources/earnings-tracker',
  'Creator Rewards Checklist': '/lead-magnets/eligibility-checklist',
  'Content Planning Template': '/resources/content-planning-template',
  'Viral Video Worksheet': '/resources/viral-video-worksheet',
}

function getPdfUrl(leadMagnet?: string | null): string {
  if (leadMagnet && LEAD_MAGNET_PDF_URLS[leadMagnet]) return `${SITE_URL}${LEAD_MAGNET_PDF_URLS[leadMagnet]}`
  // Default to the playbook PDF
  return `${SITE_URL}/downloads/tcp-creator-rewards-playbook-2026.pdf`
}

function getDownloadUrl(leadMagnet?: string | null, downloadUrl?: string | null): string {
  if (downloadUrl) return downloadUrl.startsWith('http') ? downloadUrl : `${SITE_URL}${downloadUrl}`
  // Prefer direct PDF link
  if (leadMagnet && LEAD_MAGNET_PDF_URLS[leadMagnet]) return `${SITE_URL}${LEAD_MAGNET_PDF_URLS[leadMagnet]}`
  if (leadMagnet && LEAD_MAGNET_URLS[leadMagnet]) return `${SITE_URL}${LEAD_MAGNET_URLS[leadMagnet]}`
  return `${SITE_URL}/guides`
}

function isRpmCheatSheet(leadMagnet?: string | null): boolean {
  if (!leadMagnet) return false
  return leadMagnet.toLowerCase().includes('rpm')
}

function isEligibilityChecklist(leadMagnet?: string | null): boolean {
  if (!leadMagnet) return false
  return leadMagnet.toLowerCase().includes('eligibility') || leadMagnet.toLowerCase().includes('checklist')
}

export function buildWelcomeEmail(options: WelcomeEmailOptions = {}): {
  subject: string
  html: string
} {
  const { email, leadMagnet, downloadUrl } = options
  const mainDownloadUrl = getDownloadUrl(leadMagnet, downloadUrl)
  const unsubscribeUrl = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(email || '')}`

  // Subject line from sequence: "Here's your TikTok cheat sheet"
  const subject = leadMagnet ? "Here's your TikTok cheat sheet" : 'Welcome to TikTok Creativity Program'
  const previewText = leadMagnet
    ? 'Plus what to check before you apply for Creator Rewards.'
    : 'Free guides, calculators, and tips to grow your TikTok earnings.'

  // Build the lead magnet delivery section based on what they signed up for
  let leadMagnetSection = ''
  const playbookPdfUrl = `${SITE_URL}/downloads/tcp-creator-rewards-playbook-2026.pdf`
  const checklistPdfUrl = `${SITE_URL}/downloads/tcp-eligibility-checklist-2026.pdf`

  if (isRpmCheatSheet(leadMagnet)) {
    leadMagnetSection = `
      <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
        Your download is ready:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
        <tr>
          <td style="background-color:#F4A261;border-radius:999px;">
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${playbookPdfUrl}" style="height:48px;v-text-anchor:middle;width:320px;" arcsize="50%" fillcolor="#F4A261" stroke="f">
              <w:anchorlock/>
              <center style="color:#0B0F1A;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;">Download: Creator Rewards Playbook (PDF)</center>
            </v:roundrect>
            <![endif]-->
            <!--[if !mso]><!-->
            <a href="${playbookPdfUrl}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#0B0F1A;text-decoration:none;border-radius:999px;background-color:#F4A261;line-height:1;">
              Download: Creator Rewards Playbook (PDF)
            </a>
            <!--<![endif]-->
          </td>
        </tr>
      </table>
      <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
        It covers RPM ranges for 18 niches, the 4 factors TikTok uses to calculate your rate, and the quickest ways to push that number higher.
      </p>
      <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
        You might also find the eligibility checklist useful:
      </p>
      <p style="margin:0 0 20px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">
        <a href="${checklistPdfUrl}" style="color:#0B0F1A;font-weight:700;text-decoration:underline;">Download: Eligibility Checklist (PDF)</a>
      </p>`
  } else if (isEligibilityChecklist(leadMagnet)) {
    leadMagnetSection = `
      <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
        Your download is ready:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
        <tr>
          <td style="background-color:#F4A261;border-radius:999px;">
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${checklistPdfUrl}" style="height:48px;v-text-anchor:middle;width:320px;" arcsize="50%" fillcolor="#F4A261" stroke="f">
              <w:anchorlock/>
              <center style="color:#0B0F1A;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;">Download: Eligibility Checklist (PDF)</center>
            </v:roundrect>
            <![endif]-->
            <!--[if !mso]><!-->
            <a href="${checklistPdfUrl}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#0B0F1A;text-decoration:none;border-radius:999px;background-color:#F4A261;line-height:1;">
              Download: Eligibility Checklist (PDF)
            </a>
            <!--<![endif]-->
          </td>
        </tr>
      </table>
      <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
        Every requirement, the most common rejection reasons, and what to do if your application is denied.
      </p>
      <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
        You might also find the Creator Rewards Playbook useful:
      </p>
      <p style="margin:0 0 20px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">
        <a href="${playbookPdfUrl}" style="color:#0B0F1A;font-weight:700;text-decoration:underline;">Download: Creator Rewards Playbook (PDF)</a>
      </p>`
  } else {
    // Generic signup — link both PDFs
    leadMagnetSection = `
      <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
        Here are two free resources to get you started:
      </p>
      <p style="margin:0 0 8px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">
        <a href="${playbookPdfUrl}" style="color:#0B0F1A;font-weight:700;text-decoration:underline;">Download: Creator Rewards Playbook (PDF)</a>
      </p>
      <p style="margin:0 0 20px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">
        <a href="${checklistPdfUrl}" style="color:#0B0F1A;font-weight:700;text-decoration:underline;">Download: Eligibility Checklist (PDF)</a>
      </p>`
  }

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
    ${previewText}
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

          <!-- Hero image -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              <img src="${SITE_URL}/images/email/lead-magnet-preview.webp" alt="Free PDF downloads" width="496" style="display:block;width:100%;max-width:496px;height:auto;border-radius:12px;" />
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:28px 32px 0 32px;">
              ${leadMagnetSection}

              <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
                Quick intro: TikTok Creativity Program is a free resource site with 100+ guides on everything from Creator Rewards eligibility to RPM optimization to building income beyond the program itself. No course to sell, no membership gate.
              </p>

              <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
                Here are the most popular starting points:
              </p>

              <ul style="margin:0 0 16px 0;padding-left:20px;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.8;">
                <li><a href="${SITE_URL}/guides/eligibility-requirements" style="color:#0B0F1A;font-weight:600;text-decoration:underline;">Eligibility requirements explained</a></li>
                <li><a href="${SITE_URL}/guides/optimize-rpm" style="color:#0B0F1A;font-weight:600;text-decoration:underline;">How to optimize your RPM</a></li>
                <li><a href="${SITE_URL}/calculators/earnings-calculator" style="color:#0B0F1A;font-weight:600;text-decoration:underline;">Earnings calculator</a></li>
              </ul>

              <p style="margin:0 0 16px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
                Reply to this email if you have a question. I read them.
              </p>

              <p style="margin:0 0 4px 0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:15px;color:#111827;line-height:1.65;">
                Talk soon.
              </p>
            </td>
          </tr>

          <!-- P.S. tip -->
          <tr>
            <td style="padding:16px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFF1E6;border-radius:12px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-family:'Manrope',Arial,Helvetica,sans-serif;font-size:13px;color:#475467;line-height:1.7;">
                      <strong style="color:#0B0F1A;">P.S.</strong> The single most common reason applications get rejected has nothing to do with follower count. It's account type. Business accounts get auto-rejected, and TikTok doesn't always make the reason obvious. Check yours: Settings &gt; Account &gt; Account type.
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

  return { subject, html }
}
