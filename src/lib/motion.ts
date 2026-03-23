/**
 * Framer Motion animation utilities with prefers-reduced-motion support.
 * Use `useReducedMotion()` from framer-motion directly in components.
 * This file exports shared animation variants that respect the reduced motion preference.
 */

import type { Variants } from 'framer-motion'

export type MotionVariants = Variants

/** Fade + slide up — used for scroll reveals */
export const fadeUp: MotionVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

/** Fade only — for sections where y movement feels too heavy */
export const fadeIn: MotionVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

/** Container for stagger children — 0.1s between each child */
export const staggerContainer: MotionVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

/** Single staggered child item */
export const staggerItem: MotionVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

/** Word-by-word stagger for hero headline */
export const wordRevealContainer: MotionVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
}

export const wordRevealItem: MotionVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

/** Viewport settings for scroll-triggered animations */
export const viewportOnce = { once: true, margin: '-50px' }
