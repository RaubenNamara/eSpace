// PowerPoint's transitions (between slides) and animations (of things on a slide), played by
// SlideShow.vue with the CSS keyframes in slideFx.css. Each is kept with the slide or object it
// belongs to (SlideEditor.vue) and survives saving; a .pptx export leaves them out.

export type Dir = 'left' | 'right' | 'top' | 'bottom'

export interface TransitionDef { key: string; label: string; dirs?: Dir[]; /** the old slide moves away, rather than the new one coming in */ out?: boolean }
export const TRANSITIONS: TransitionDef[] = [
  { key: 'none', label: 'None' },
  { key: 'fade', label: 'Fade' },
  { key: 'push', label: 'Push', dirs: ['bottom', 'left', 'right', 'top'] },
  { key: 'wipe', label: 'Wipe', dirs: ['right', 'left', 'top', 'bottom'] },
  { key: 'split', label: 'Split' },
  { key: 'reveal', label: 'Reveal', out: true, dirs: ['left', 'right'] },
  { key: 'cut', label: 'Cut' },
  { key: 'bars', label: 'Random Bars' },
  { key: 'shape', label: 'Shape' },
  { key: 'uncover', label: 'Uncover', out: true, dirs: ['left', 'right', 'top', 'bottom'] },
  { key: 'cover', label: 'Cover', dirs: ['left', 'right', 'top', 'bottom'] },
  { key: 'flash', label: 'Flash' },
  { key: 'fall', label: 'Fall Over', out: true },
  { key: 'drape', label: 'Drape', out: true },
  { key: 'curtains', label: 'Curtains', out: true },
  { key: 'wind', label: 'Wind', out: true },
  { key: 'prestige', label: 'Prestige', out: true },
  { key: 'zoom', label: 'Zoom' }
]

export type AnimKind = 'entrance' | 'emphasis'
export interface AnimationDef { key: string; label: string; kind: AnimKind; dirs?: Dir[] }
export const ANIMATIONS: AnimationDef[] = [
  { key: 'appear', label: 'Appear', kind: 'entrance' },
  { key: 'fade', label: 'Fade', kind: 'entrance' },
  { key: 'fly', label: 'Fly In', kind: 'entrance', dirs: ['bottom', 'left', 'right', 'top'] },
  { key: 'float', label: 'Float In', kind: 'entrance', dirs: ['bottom', 'top'] },
  { key: 'split', label: 'Split', kind: 'entrance' },
  { key: 'wipe', label: 'Wipe', kind: 'entrance', dirs: ['left', 'right', 'top', 'bottom'] },
  { key: 'shape', label: 'Shape', kind: 'entrance' },
  { key: 'wheel', label: 'Wheel', kind: 'entrance' },
  { key: 'bars', label: 'Random Bars', kind: 'entrance' },
  { key: 'grow', label: 'Grow & Turn', kind: 'entrance' },
  { key: 'zoom', label: 'Zoom', kind: 'entrance' },
  { key: 'swivel', label: 'Swivel', kind: 'entrance' },
  { key: 'bounce', label: 'Bounce', kind: 'entrance' },
  { key: 'pulse', label: 'Pulse', kind: 'emphasis' },
  { key: 'spin', label: 'Spin', kind: 'emphasis' },
  { key: 'teeter', label: 'Teeter', kind: 'emphasis' }
]

export const DIR_LABEL: Record<Dir, string> = { left: 'From Left', right: 'From Right', top: 'From Top', bottom: 'From Bottom' }

/** A slide's transition, as saved */
export interface SlideTransition { type: string; dir?: Dir; duration: number }
/** How a slide moves on: on a click, and/or after some seconds */
export interface SlideAdvance { click: boolean; after: number | null }
/** An object's animation, as saved on it (tusomeAnim) */
export interface ObjectAnim { effect: string; dir?: Dir; start: 'click' | 'with' | 'after'; duration: number; delay: number; order: number }

export const animDef = (key?: string) => ANIMATIONS.find(a => a.key === key)
export const transitionDef = (key?: string) => TRANSITIONS.find(t => t.key === key)

/** where something comes in from, as a CSS translate */
export const fromOffset = (dir: Dir | undefined, far: string) => {
  switch (dir) {
    case 'left': return { x: `-${far}`, y: '0' }
    case 'right': return { x: far, y: '0' }
    case 'top': return { x: '0', y: `-${far}` }
    default: return { x: '0', y: far }
  }
}
