'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, FileText, Calculator, Users, ArrowRight } from 'lucide-react'
import { track } from '@/lib/analytics'

type SearchEntry = {
  title: string
  description: string
  slug: string
  category: string
  keywords: string[]
  href: string
  type: 'guide' | 'calculator' | 'niche'
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'calculator':
      return <Calculator className="w-4 h-4 text-[#F97316] flex-shrink-0" />
    case 'niche':
      return <Users className="w-4 h-4 text-[#F97316] flex-shrink-0" />
    default:
      return <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case 'calculator':
      return 'Calculator'
    case 'niche':
      return 'Niche'
    default:
      return 'Guide'
  }
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Lazy-load search index on first open
  const loadIndex = useCallback(async () => {
    if (index) return
    try {
      const res = await fetch('/search-index.json')
      const data = await res.json()
      setIndex(data)
    } catch {
      // Silent fail -- search just won't work
    }
  }, [index])

  // Open/close handlers
  const open = useCallback(() => {
    setIsOpen(true)
    loadIndex()
  }, [loadIndex])

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setResults([])
    setActiveIndex(0)
  }, [])

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          close()
        } else {
          open()
        }
      }
      if (e.key === 'Escape' && isOpen) {
        close()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, open, close])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Search logic
  useEffect(() => {
    if (!index || !query.trim()) {
      setResults([])
      setActiveIndex(0)
      return
    }

    const q = query.toLowerCase().trim()
    const terms = q.split(/\s+/)

    const scored = index
      .map((entry) => {
        const titleLower = entry.title.toLowerCase()
        const descLower = entry.description.toLowerCase()
        const kwLower = entry.keywords.map((k) => k.toLowerCase())
        const catLower = entry.category.toLowerCase()

        let score = 0

        for (const term of terms) {
          // Title match (highest weight)
          if (titleLower.includes(term)) score += 10
          // Exact title start
          if (titleLower.startsWith(term)) score += 5
          // Description match
          if (descLower.includes(term)) score += 3
          // Keyword match
          if (kwLower.some((k) => k.includes(term))) score += 5
          // Category match
          if (catLower.includes(term)) score += 2
        }

        return { entry, score }
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((s) => s.entry)

    setResults(scored)
    setActiveIndex(0)
  }, [query, index])

  // Fire `search_performed` once per "finished typing" burst (600ms debounce).
  // Only when the user has at least 2 characters so we don't spam PostHog
  // for every single keystroke.
  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) return
    const timer = setTimeout(() => {
      track('search_performed', {
        search_query: q,
        results_count: results.length,
      })
    }, 600)
    return () => clearTimeout(timer)
  }, [query, results.length])

  // Navigate to result
  const navigateTo = useCallback(
    (href: string) => {
      close()
      router.push(href)
    },
    [close, router]
  )

  // Keyboard navigation within results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault()
        navigateTo(results[activeIndex].href)
      }
    },
    [results, activeIndex, navigateTo]
  )

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={open}
        className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Search guides"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline text-[13px]">Search</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-mono text-gray-500">
          <span className="text-[11px]">&#8984;</span>K
        </kbd>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Search modal */}
          <div className="relative w-full max-w-lg mx-4 rounded-xl bg-[#1A2332] border border-white/10 shadow-2xl overflow-hidden">
            {/* Input area */}
            <div className="flex items-center gap-3 px-4 border-b border-white/10">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search guides, calculators, niches..."
                className="flex-1 h-14 bg-transparent text-white text-[15px] placeholder:text-gray-500 outline-none"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                  className="text-gray-500 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}

              {results.length > 0 && (
                <ul className="py-2">
                  {results.map((result, i) => (
                    <li key={result.href}>
                      <button
                        onClick={() => navigateTo(result.href)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                          i === activeIndex ? 'bg-white/5' : ''
                        }`}
                      >
                        <div className="mt-0.5">{getTypeIcon(result.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-white truncate">
                            {result.title}
                          </p>
                          <p className="text-[12px] text-gray-500 truncate mt-0.5">
                            {result.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] uppercase tracking-wide text-gray-600 font-medium">
                            {getTypeLabel(result.type)}
                          </span>
                          {i === activeIndex && (
                            <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {!query.trim() && (
                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  Type to search across {index?.length ?? '100+'} pages
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/10 text-[11px] text-gray-600">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 px-1 py-0.5 font-mono text-[10px]">&#8593;&#8595;</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 px-1 py-0.5 font-mono text-[10px]">&#8629;</kbd>
                open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/10 px-1 py-0.5 font-mono text-[10px]">esc</kbd>
                close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
