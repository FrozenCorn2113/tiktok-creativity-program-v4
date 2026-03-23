import { NextResponse } from 'next/server'
import { getAffiliateLink } from '@/lib/affiliateLinks'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const url = getAffiliateLink(params.slug)

  if (!url) {
    console.warn(`[affiliate] unknown slug: ${params.slug}`)
    return NextResponse.redirect(new URL('/resources', request.url))
  }

  // Server-side audit log — visible in Vercel Function logs
  console.log(`[affiliate] click slug=${params.slug} dest=${url}`)

  // Pass a custom header so client-side GA4 can pick up the event via
  // the Measurement Protocol or a redirect page if needed in future.
  const response = NextResponse.redirect(url)
  response.headers.set('x-affiliate-slug', params.slug)
  return response
}
