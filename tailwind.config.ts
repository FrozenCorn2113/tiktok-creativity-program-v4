import type { Config } from 'tailwindcss'
import tokens from './design/tokens.json'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ─── Colors — sourced directly from design/tokens.json ────────────────
      colors: {
        // Brand palette
        brand: {
          primary:      tokens.colors.brand.primary,      // #F4A261
          primaryHover: tokens.colors.brand.primaryHover, // #E8894A
          primarySoft:  tokens.colors.brand.primarySoft,  // #FFF1E6
          primaryDeep:  tokens.colors.brand.primaryDeep,  // #C2622A
          paper:        tokens.colors.brand.paper,        // #FBF6EC
          ink:          tokens.colors.brand.ink,           // #0F0E0C
          inkSoft:      tokens.colors.brand.inkSoft,      // #49443D
          inkLight:     tokens.colors.brand.inkLight,     // #1E293B
        },
        // TCP short-form aliases for new chrome
        paper: tokens.colors.brand.paper,                 // bg-paper
        soft:  tokens.colors.brand.primarySoft,           // bg-soft
        ink: {
          DEFAULT: tokens.colors.brand.ink,               // text-ink / bg-ink
          soft:    tokens.colors.brand.inkSoft,           // text-ink-soft / bg-ink-soft
          strong:  tokens.colors.brand.ink,
        },
        line: tokens.colors.border.default,               // border-line
        // Backgrounds
        background: {
          DEFAULT: tokens.colors.background.page,         // #FBF6EC
          page:     tokens.colors.background.page,
          warm:     tokens.colors.background.warm,        // #FFF1E6
          surface:  tokens.colors.background.surface,     // #F8FAFC
          elevated: tokens.colors.background.elevated,
        },
        // Text
        text: {
          DEFAULT:   tokens.colors.text.primary,          // #0F0E0C
          primary:   tokens.colors.text.primary,
          secondary: tokens.colors.text.secondary,        // #49443D
          muted:     tokens.colors.text.muted,            // #9CA3AF
          inverse:   tokens.colors.text.inverse,          // #FBF6EC
          onPrimary: tokens.colors.text.onPrimary,        // #0F0E0C
        },
        // Borders
        border: {
          DEFAULT: tokens.colors.border.default,          // rgba(15,14,12,0.08)
          default: tokens.colors.border.default,
          strong:  tokens.colors.border.strong,           // #CBD5E1
          focus:   tokens.colors.border.focus,            // #F97316
        },
        // Status
        status: {
          success:      tokens.colors.status.success,     // #16A34A
          successSoft:  tokens.colors.status.successSoft, // #DCFCE7
          warning:      tokens.colors.status.warning,     // #D97706
          warningSoft:  tokens.colors.status.warningSoft, // #FEF3C7
          error:        tokens.colors.status.error,       // #DC2626
          errorSoft:    tokens.colors.status.errorSoft,   // #FEE2E2
        },
        // shadcn/ui semantic tokens (needed for shadcn component classes)
        foreground:   'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',

        // Legacy aliases — keep so existing components don't break
        primary: {
          DEFAULT: tokens.colors.brand.primary,
          hover:   tokens.colors.brand.primaryHover,
          soft:    tokens.colors.brand.primarySoft,
        },
        surface: tokens.colors.background.surface,
        'surface-warm':   tokens.colors.background.warm,
        'surface-muted':  tokens.colors.brand.primarySoft,
        success: tokens.colors.status.success,
        warning: tokens.colors.status.warning,
        error:   tokens.colors.status.error,
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        sans:    ['var(--font-sans)', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-sans)', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['var(--font-mono)', 'JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
        serif:   ['var(--font-serif)', 'Instrument Serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // tokens.json sizes
        h1:         [tokens.typography.sizes.h1,        { lineHeight: tokens.typography.lineHeights.h1,       fontWeight: tokens.typography.heading.fontWeightBold }],
        h2:         [tokens.typography.sizes.h2,        { lineHeight: tokens.typography.lineHeights.h2,       fontWeight: tokens.typography.heading.fontWeightBold }],
        h3:         [tokens.typography.sizes.h3,        { lineHeight: tokens.typography.lineHeights.h3,       fontWeight: tokens.typography.heading.fontWeightBold }],
        h4:         [tokens.typography.sizes.h4,        { lineHeight: tokens.typography.lineHeights.h4,       fontWeight: tokens.typography.heading.fontWeightSemibold }],
        'body-lg':  [tokens.typography.sizes.bodyLarge, { lineHeight: tokens.typography.lineHeights.bodyLarge }],
        body:       [tokens.typography.sizes.body,      { lineHeight: tokens.typography.lineHeights.body }],
        small:      [tokens.typography.sizes.small,     { lineHeight: '1.5' }],
        caption:    [tokens.typography.sizes.caption,   { lineHeight: '1.5' }],
        // Keep legacy aliases
        display:    ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '800' }],
        btn:        ['0.9375rem', { lineHeight: '1', fontWeight: '600' }],
      },

      // ─── Border Radius — from tokens.json ────────────────────────────────
      borderRadius: {
        sm:   tokens.borderRadius.sm,   // 6px
        md:   tokens.borderRadius.md,   // 8px
        lg:   tokens.borderRadius.lg,   // 12px
        xl:   tokens.borderRadius.xl,   // 16px
        '2xl': tokens.borderRadius['2xl'], // 20px
        full: tokens.borderRadius.full, // 9999px
      },

      // ─── Spacing — from tokens.json gap values ────────────────────────────
      spacing: {
        xs:  tokens.spacing.gap.xs,  // 4px
        sm:  tokens.spacing.gap.sm,  // 8px
        md:  tokens.spacing.gap.md,  // 16px
        lg:  tokens.spacing.gap.lg,  // 24px
        xl:  tokens.spacing.gap.xl,  // 32px
        '2xl': tokens.spacing.gap['2xl'], // 48px
        '3xl': tokens.spacing.gap['3xl'], // 64px
      },

      // ─── Shadows — from tokens.json ───────────────────────────────────────
      boxShadow: {
        sm:     tokens.shadows.sm,
        md:     tokens.shadows.md,
        lg:     tokens.shadows.lg,
        xl:     tokens.shadows.xl,
        orange: tokens.shadows.orange, // 0 4px 16px rgba(244,162,97,0.35)
        // Focus rings
        'focus-primary': '0 0 0 3px rgba(249, 115, 22, 0.12)',
        'focus-input':   '0 0 0 2px rgba(249, 115, 22, 0.2)',
      },

      // ─── Max Width ────────────────────────────────────────────────────────
      maxWidth: {
        container: tokens.spacing.containerMaxWidth, // 1200px
        content:   tokens.spacing.contentMaxWidth,   // 720px
        prose:     '65ch',
        narrow:    '52rem',
      },

      // ─── Z-Index — from tokens.json ───────────────────────────────────────
      zIndex: {
        navbar: tokens.zIndex.navbar,
        modal:  tokens.zIndex.modal,
        toast:  tokens.zIndex.toast,
      },

      // ─── Keyframes ────────────────────────────────────────────────────────
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeSlideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        popIn: {
          '0%':   { opacity: '0', transform: 'scale(0)' },
          '70%':  { transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.015)' },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(6px)' },
        },
        // Magic UI Marquee
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        // Magic UI Marquee
        marquee:          'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'fade-in':      `fadeIn ${tokens.animation.durationBase} ${tokens.animation.easingDefault} forwards`,
        'slide-up':     `slideUp ${tokens.animation.durationSlow} ${tokens.animation.easingDefault} forwards`,
        'fade-slide-up': `fadeSlideUp ${tokens.animation.durationSlow} ${tokens.animation.easingDefault} forwards`,
        'scale-in':     `scaleIn ${tokens.animation.durationBase} ${tokens.animation.easingDefault} forwards`,
        'pop-in':       `popIn ${tokens.animation.durationBase} ${tokens.animation.easingBounce} forwards`,
        'breathe':      'breathe 4s ease-in-out infinite',
        'slide-in-right': `slideInRight ${tokens.animation.durationBase} ${tokens.animation.easingDefault} forwards`,
        'bounce-y':     'bounceY 1.5s ease-in-out infinite',
        'reveal':       `fadeSlideUp ${tokens.animation.durationSlow} ${tokens.animation.easingDefault} forwards`,
      },
      transitionDuration: {
        fast: tokens.animation.durationFast,   // 150ms
        base: tokens.animation.durationBase,   // 300ms
        slow: tokens.animation.durationSlow,   // 500ms
      },
      transitionTimingFunction: {
        smooth: tokens.animation.easingDefault,
        bounce: tokens.animation.easingBounce,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}

export default config
