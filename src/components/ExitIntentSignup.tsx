'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import EmailSignupForm from '@/components/EmailSignupForm'

export default function ExitIntentSignup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let triggered = false
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && !triggered) {
        triggered = true
        setOpen(true)
      }
    }

    window.addEventListener('mouseout', handleMouseLeave)
    return () => window.removeEventListener('mouseout', handleMouseLeave)
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div
        className="relative w-full max-w-md rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-lg)]"
        role="dialog"
        aria-modal="true"
        aria-label="Before you go"
      >
        <button
          type="button"
          className="absolute right-4 top-4 cursor-pointer rounded-[var(--radius-sm)] p-1.5 text-[var(--color-text-subtle)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)]"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
        <div className="p-6 pt-5">
          <EmailSignupForm variant="exit-intent" />
        </div>
      </div>
    </div>
  )
}
