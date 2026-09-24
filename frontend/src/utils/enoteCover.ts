// Teacher-designed eNote "book covers" - stored on enote_topics.cover_design as JSON and
// validated server-side by Teacher\ENoteController::normalizeCoverDesign().

export type CoverTemplate = 'portrait' | 'classic' | 'split' | 'exercise'

export interface ENoteCoverDesign {
  template: CoverTemplate
  color: string
  // Root-relative upload path ('/uploads/enotes/...'), or null for a plain colour cover
  image: string | null
  title: string
  author: string
  year: string
  // Show a small "title · author" footer at the bottom of every page in the reader
  page_footer?: boolean
}

export const COVER_TEMPLATES: { id: CoverTemplate; label: string; hint: string }[] = [
  { id: 'portrait', label: 'Portrait', hint: 'Big photo, bold title, author strip' },
  { id: 'classic', label: 'Classic', hint: 'Hardcover with a framed picture' },
  { id: 'split', label: 'Split', hint: 'Colour block on top, picture below' },
  { id: 'exercise', label: 'Exercise book', hint: 'School notebook with a name label' }
]

export const COVER_COLORS = [
  '#2c4a7c', // navy
  '#2563eb', // blue
  '#1f6b73', // teal
  '#2f6b4f', // forest
  '#9b2c2c', // oxblood
  '#a8452a', // rust
  '#8a5a1f', // tan
  '#5b3a7a', // plum
  '#7a2f55', // mulberry
  '#3d4a5c'  // slate
]

export function parseCoverDesign(raw: unknown): ENoteCoverDesign | null {
  if (!raw) return null
  try {
    const value = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (!value || typeof value !== 'object' || !value.template || !value.color) return null
    return {
      template: value.template,
      color: value.color,
      image: value.image || null,
      title: value.title || '',
      author: value.author || '',
      year: value.year || '',
      page_footer: !!value.page_footer
    }
  } catch {
    return null
  }
}

/** Darkens (negative) or lightens (positive) a #rrggbb colour by `amount` (-1..1). */
export function shadeColor(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const channel = (c: number) => {
    const v = amount < 0 ? c * (1 + amount) : c + (255 - c) * amount
    return Math.max(0, Math.min(255, Math.round(v)))
  }
  const r = channel((n >> 16) & 255)
  const g = channel((n >> 8) & 255)
  const b = channel(n & 255)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export function hexToRgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}
