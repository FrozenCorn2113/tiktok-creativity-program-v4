import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') ?? 'TikTok Creator Rewards Program'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Brand name top-left */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '80px',
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            opacity: 0.7,
          }}
        >
          TikTok Creativity Program
        </div>

        {/* Orange accent bar */}
        <div
          style={{
            width: '64px',
            height: '6px',
            background: '#F97316',
            borderRadius: '3px',
            marginBottom: '32px',
          }}
        />

        {/* Title */}
        <div
          style={{
            color: 'white',
            fontSize: '56px',
            fontWeight: '800',
            lineHeight: '1.15',
            maxWidth: '900px',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>

        {/* Domain bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            color: '#F97316',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          tiktokcreativityprogram.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
