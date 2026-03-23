'use client'

import { useState, useEffect, useRef } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackGuideScrollDepth } from '@/lib/analytics'

interface GuideArticleClientProps {
  articleUrl: string
  title: string
  slug?: string
}

export default function GuideArticleClient({ articleUrl, title, slug }: GuideArticleClientProps) {
  const [voted, setVoted] = useState<'up' | 'down' | null>(null)
  const milestonesFired = useRef<Set<number>>(new Set())

  // Scroll depth tracking — 25/50/75/100% milestones
  useEffect(() => {
    if (!slug || process.env.NODE_ENV !== 'production') return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const pct = Math.round((scrollTop / docHeight) * 100)

      const milestones = [25, 50, 75, 100] as const
      for (const m of milestones) {
        if (pct >= m && !milestonesFired.current.has(m)) {
          milestonesFired.current.add(m)
          trackGuideScrollDepth(slug, m)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  const handleVote = async (vote: 'up' | 'down') => {
    setVoted(vote)
    // Simple feedback — fire and forget, no external service
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: articleUrl, title, vote }),
      })
    } catch {
      // Silent fail — UX feedback already shown
    }
  }

  if (voted) {
    return (
      <div className="text-sm text-text-secondary py-2">
        {voted === 'up' ? 'Thanks — glad it helped.' : "Thanks for the feedback. We'll keep improving."}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-secondary font-medium">Was this helpful?</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleVote('up')}
        className="flex items-center gap-1.5 text-text-secondary hover:text-brand-ink min-h-[44px]"
        aria-label="Yes, this was helpful"
      >
        <ThumbsUp className="h-3.5 w-3.5" aria-hidden />
        Yes, helpful
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleVote('down')}
        className="flex items-center gap-1.5 text-text-secondary hover:text-brand-ink min-h-[44px]"
        aria-label="No, needs improvement"
      >
        <ThumbsDown className="h-3.5 w-3.5" aria-hidden />
        Needs improvement
      </Button>
    </div>
  )
}
