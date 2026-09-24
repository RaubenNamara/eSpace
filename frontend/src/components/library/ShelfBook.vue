<template>
  <div
    class="shelf-book-scene"
    :class="{ 'is-small': size === 'sm', 'is-large': size === 'lg', 'is-real': variant === 'book', 'is-spine-out': spineOut, 'is-selected': selected }"
    :style="sceneStyle"
  >
    <div class="shelf-book" :style="coverStyle">
      <!-- The spine - the only face showing while a book stands spine-out on the shelf, so it
           carries the title the way a printed book's spine does. -->
      <div class="book-spine" aria-hidden="true">
        <span v-if="spineOut && label" class="spine-label">{{ label }}</span>
        <span v-if="spineOut || variant === 'book'" class="rb-spine-title">{{ coverTitle }}</span>
        <span v-if="spineOut" class="spine-foot" :class="variant === 'book' ? 'spine-foot--imprint' : 'spine-foot--notes'"></span>
      </div>
      <div class="book-side" aria-hidden="true"></div>
      <div class="book-top" aria-hidden="true"></div>

      <div class="book-front" :class="{ 'has-cover': cover }">
        <!-- Spine hinge: the crease where a hardcover bends open -->
        <div class="book-hinge" aria-hidden="true"></div>

        <!-- Teacher-designed cover (eNotes) - drawn edge to edge like a printed book -->
        <div v-if="cover" class="cv" :class="`cv-${cover.template}`">
          <template v-if="cover.template === 'portrait'">
            <div class="cv-art" :style="artStyle">
              <div class="cv-fade" aria-hidden="true"></div>
              <p class="cv-bold-title">{{ coverTitle }}</p>
            </div>
            <div class="cv-strip">
              <p class="cv-author">{{ cover.author }}</p>
              <p class="cv-meta">{{ metaLine }}</p>
            </div>
          </template>

          <template v-else-if="cover.template === 'classic'">
            <div v-if="label" class="book-band">{{ label }}</div>
            <div v-if="cover.image" class="cv-frame" :style="artStyle"></div>
            <div v-else class="book-rule cv-rule" aria-hidden="true"></div>
            <p class="book-title cv-serif-title">{{ coverTitle }}</p>
            <p class="cv-gold-author">{{ cover.author }}</p>
            <p v-if="cover.year" class="cv-gold-year">{{ cover.year }}</p>
          </template>

          <template v-else-if="cover.template === 'split'">
            <div class="cv-top">
              <p v-if="label" class="cv-kicker">{{ label }}</p>
              <p class="cv-bold-title">{{ coverTitle }}</p>
            </div>
            <div class="cv-bottom" :style="artStyle">
              <p class="cv-bar">{{ [cover.author, cover.year].filter(Boolean).join(' · ') }}</p>
            </div>
          </template>

          <template v-else>
            <div v-if="label" class="book-band">{{ label }}</div>
            <div class="notes-label">
              <p class="notes-title">{{ coverTitle }}</p>
              <div class="notes-lines" aria-hidden="true"></div>
              <p v-if="cover.author" class="notes-field">{{ cover.author }}</p>
              <p v-if="cover.year" class="notes-field">{{ cover.year }}</p>
            </div>
            <div v-if="cover.image" class="cv-sticker" :style="artStyle"></div>
          </template>
        </div>

        <template v-else-if="variant === 'notes'">
          <!-- Exercise-book look: coloured cover with a white name label, like a school notebook -->
          <div v-if="label" class="book-band">{{ label }}</div>
          <div class="notes-label">
            <p class="notes-title">{{ title }}</p>
            <div class="notes-lines" aria-hidden="true"></div>
          </div>
        </template>
        <!-- eLibrary: a real published book - its actual first page as the cover, or a printed
             dust-jacket design when there's no picture -->
        <template v-else>
          <img v-if="coverImage" class="rb-photo" :src="resolveAssetUrl(coverImage)" alt="" loading="lazy" draggable="false">
          <template v-else>
            <p v-if="label" class="rb-kicker">{{ label }}</p>
            <div class="rb-ornament" aria-hidden="true"></div>
            <p class="book-title rb-title">{{ title }}</p>
            <div class="rb-ornament" aria-hidden="true"></div>
            <p v-if="author" class="rb-author">{{ author }}</p>
            <p class="rb-imprint">St. Mark eLibrary</p>
          </template>
          <div class="rb-groove" aria-hidden="true"></div>
          <div class="rb-sheen" aria-hidden="true"></div>
        </template>

        <p v-if="footer && !cover && variant === 'notes'" class="book-footer">{{ footer }}</p>

        <!-- Corner overlays (status ribbon, checkbox, etc.) supplied by the page -->
        <slot />
      </div>
    </div>
    <div class="book-shadow" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type ENoteCoverDesign, shadeColor, hexToRgba } from '@/utils/enoteCover'
import { resolveAssetUrl } from '@/utils/url'

const props = withDefaults(defineProps<{
  title: string
  // Short tag across the top of the cover, e.g. the subject code
  label?: string
  // Small line at the foot of the cover, e.g. "PDF" or "12 pages"
  footer?: string
  // Any stable number (the record id) - picks the cover colour so a book keeps its colour
  seed: number
  variant?: 'book' | 'notes'
  size?: 'sm' | 'md' | 'lg'
  // A teacher-designed cover (eNotes) - replaces the default look when set
  cover?: ENoteCoverDesign | null
  // eLibrary: cover picture (root-relative upload path), author, and page count (thickness)
  coverImage?: string | null
  author?: string | null
  pages?: number | null
  // Stand spine-out on the shelf (only the spine shows); hovering/activating the surrounding
  // ShelfSlot pulls it out and turns it to show the front cover
  spineOut?: boolean
  // Highlights the spine (teacher bulk selection)
  selected?: boolean
}>(), {
  label: '',
  footer: '',
  variant: 'book',
  size: 'md',
  cover: null,
  coverImage: null,
  author: null,
  pages: null,
  spineOut: false,
  selected: false
})

// Book-cloth colours: [light, dark] ends of the cover gradient
const cloths: [string, string][] = [
  ['#9b2c2c', '#6b1d1d'], // oxblood
  ['#2c4a7c', '#1b2f52'], // navy
  ['#2f6b4f', '#1d4633'], // forest
  ['#8a5a1f', '#5e3c12'], // tan leather
  ['#5b3a7a', '#3b2451'], // plum
  ['#1f6b73', '#13464c'], // teal
  ['#a8452a', '#72301c'], // rust
  ['#3d4a5c', '#262f3b'], // slate
  ['#7a2f55', '#521f39'], // mulberry
  ['#566b2a', '#3a481b']  // olive
]

const coverTitle = computed(() => props.cover?.title || props.title)
const metaLine = computed(() => [props.cover?.year, props.label].filter(Boolean).join(' · '))

// Longest single word in the title - the title font shrinks just enough for that word to fit on
// one line, rather than being split mid-word ("Measureme/nts") on a narrow cover.
const longestWord = computed(() => Math.max(6, ...coverTitle.value.split(/\s+/).map(w => w.length)))

const coverStyle = computed(() => {
  const [light, dark] = props.cover
    ? [props.cover.color, shadeColor(props.cover.color, -0.4)]
    : cloths[Math.abs(props.seed) % cloths.length]
  const style: Record<string, string> = {
    '--cloth-light': light,
    '--cloth-dark': dark,
    '--cloth-fade': hexToRgba(light, 0.92),
    '--longest': String(longestWord.value)
  }
  return style
})

const sceneStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.spineOut) {
    // Spines are drawn wider than a real book's thickness so the title is readable: eNotes are
    // uniform exercise books; library books get thicker with page count (unknown = middling)
    if (props.variant === 'book') {
      const depth = props.pages ? 28 + Math.min(props.pages, 600) / 600 * 20 : 36
      style['--book-depth'] = `${Math.round(depth)}px`
      // Real books on a shelf are never all the same height
      style['--h-factor'] = String(0.86 + (Math.abs(props.seed * 37) % 15) / 100)
    }
  } else if (props.variant === 'book' && props.size !== 'sm') {
    // A library book is as thick as it is long: ~8px for a handout up to ~26px for a 600+ page
    // textbook (16px when the page count isn't known yet)
    const depth = props.pages ? 8 + Math.min(props.pages, 600) / 600 * 18 : 16
    style['--book-depth'] = `${Math.round(depth)}px`
  }
  return style
})

// The cover picture, or (no picture chosen) a soft tint of the cover colour so the layout still
// reads as a designed cover rather than an empty box.
const artStyle = computed(() => {
  if (props.cover?.image) {
    return { backgroundImage: `url("${resolveAssetUrl(props.cover.image)}")` }
  }
  return {
    backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.28), transparent 55%), repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 6px, transparent 6px 12px)',
    backgroundColor: 'var(--cloth-dark)'
  }
})
</script>

<style scoped>
.shelf-book-scene {
  --book-w: 104px;
  --book-h: 140px;
  --book-depth: 12px;
  position: relative;
  width: var(--book-w);
  height: var(--book-h);
  perspective: 700px;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .shelf-book-scene {
    --book-w: 122px;
    --book-h: 164px;
    --book-depth: 14px;
  }
}

.shelf-book-scene.is-small {
  --book-w: 92px;
  --book-h: 124px;
  --book-depth: 10px;
}

/* Big preview (cover designer) - every cover text size is a fraction of --book-w, so this stays
   crisp instead of being a blurry scaled-up small book */
.shelf-book-scene.is-large {
  --book-w: 180px;
  --book-h: 242px;
  --book-depth: 18px;
}

.shelf-book {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform-origin: center bottom;
  transform: rotateY(-14deg);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Pulled forward off the shelf on hover, the way you'd tip a book out to look at it */
.group:hover .shelf-book,
.group:focus-visible .shelf-book {
  transform: rotateY(-4deg) translateY(-10px) translateZ(18px);
}

.book-front {
  position: absolute;
  inset: 0;
  border-radius: 2px 5px 5px 2px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10% 9% 8% 16%;
  color: #fff;
  background:
    /* soft light falling from the upper left */
    radial-gradient(120% 90% at 20% 0%, rgba(255, 255, 255, 0.18), transparent 60%),
    /* faint woven-cloth texture */
    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.025) 0 2px, transparent 2px 4px),
    linear-gradient(160deg, var(--cloth-light), var(--cloth-dark));
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.25),
    inset -2px 0 3px rgba(0, 0, 0, 0.25);
  transform: translateZ(calc(var(--book-depth) / 2));
}

.book-hinge {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 11%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.1) 70%, rgba(255, 255, 255, 0.12) 85%, rgba(0, 0, 0, 0.2));
  pointer-events: none;
}

/* The cloth-covered spine, visible because the book is turned slightly on the shelf */
.book-spine {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--book-depth);
  transform-origin: left center;
  /* folds back from the left edge, facing outward (-x) so its lettering reads correctly */
  transform: translateZ(calc(var(--book-depth) / -2)) rotateY(-90deg);
  border-radius: 3px 0 0 3px;
  background:
    linear-gradient(to bottom, transparent 8%, rgba(246, 223, 168, 0.6) 8%, rgba(246, 223, 168, 0.6) 9.5%, transparent 9.5%, transparent 90.5%, rgba(246, 223, 168, 0.6) 90.5%, rgba(246, 223, 168, 0.6) 92%, transparent 92%),
    linear-gradient(to right, rgba(0, 0, 0, 0.45), rgba(255, 255, 255, 0.08) 50%, rgba(0, 0, 0, 0.3)),
    var(--cloth-dark);
}

.book-side {
  position: absolute;
  top: 2px;
  bottom: 2px;
  right: 0;
  width: var(--book-depth);
  transform-origin: right center;
  transform: translateZ(calc(var(--book-depth) / -2)) rotateY(90deg);
  background:
    linear-gradient(to right, rgba(0, 0, 0, 0.25), transparent 40%),
    repeating-linear-gradient(to right, #f4efe2 0 1px, #d9d1bd 1px 2px);
}

.book-top {
  position: absolute;
  top: 0;
  left: 2px;
  right: 2px;
  height: var(--book-depth);
  transform-origin: center top;
  transform: translateZ(calc(var(--book-depth) / -2)) rotateX(90deg);
  background: repeating-linear-gradient(to bottom, #f4efe2 0 1px, #d9d1bd 1px 2px);
}

.book-shadow {
  position: absolute;
  left: 4%;
  right: -10%;
  bottom: -5px;
  height: 10px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45), transparent 70%);
  filter: blur(2px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.group:hover .book-shadow {
  opacity: 0.55;
  transform: scaleX(1.1);
}

.book-band {
  align-self: stretch;
  text-align: center;
  font-size: calc(var(--book-w) * 0.08);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 2px 4px;
  border-top: 1px solid rgba(255, 215, 140, 0.55);
  border-bottom: 1px solid rgba(255, 215, 140, 0.55);
  color: #f6dfa8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-rule {
  width: 60%;
  height: 1px;
  margin-top: auto;
  margin-bottom: 6px;
  background: linear-gradient(to right, transparent, rgba(246, 223, 168, 0.8), transparent);
}

.book-rule--bottom {
  margin-top: 6px;
  margin-bottom: auto;
}

.book-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: min(calc(var(--book-w) * 0.105), calc(var(--book-w) * 0.72 / (var(--longest) * 0.6)));
  line-height: 1.25;
  text-align: center;
  color: #fbf3de;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: break-word;
  hyphens: auto;
}

.notes-label {
  margin: auto 0;
  align-self: stretch;
  background: #fbf8ef;
  border-radius: 3px;
  padding: 6px 6px 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.notes-title {
  font-size: min(calc(var(--book-w) * 0.095), calc((var(--book-w) * 0.75 - 14px) / (var(--longest) * 0.62)));
  font-weight: 700;
  line-height: 1.25;
  color: #1f2937;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: break-word;
  hyphens: auto;
}

.notes-lines {
  margin-top: 4px;
  height: 9px;
  background: repeating-linear-gradient(to bottom, #9fb6d6 0 1px, transparent 1px 4px);
  opacity: 0.8;
}

.book-footer {
  margin-top: 6px;
  font-size: calc(var(--book-w) * 0.075);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
}

@media (min-width: 640px) {
}

.is-small .book-title { -webkit-line-clamp: 3; }

/* ---------- eLibrary: real published books ----------
   Turned the other way from eNotes so the reader sees a rounded, banded spine carrying the title
   (a printed book on a library shelf) instead of an exercise book's page edges. */
.is-real .shelf-book {
  transform: rotateX(7deg) rotateY(24deg);
}

.group:hover .is-real .shelf-book,
.group:focus-visible .is-real .shelf-book {
  transform: rotateX(4deg) rotateY(8deg) translateY(-10px) translateZ(18px);
}

.is-real .book-spine {
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    /* raised bands near the head and tail, like a sewn hardcover */
    linear-gradient(to bottom,
      transparent 7%, rgba(246, 223, 168, 0.75) 7%, rgba(246, 223, 168, 0.75) 8.2%, transparent 8.2%,
      transparent 10%, rgba(246, 223, 168, 0.75) 10%, rgba(246, 223, 168, 0.75) 11.2%, transparent 11.2%,
      transparent 88.8%, rgba(246, 223, 168, 0.75) 88.8%, rgba(246, 223, 168, 0.75) 90%, transparent 90%,
      transparent 91.8%, rgba(246, 223, 168, 0.75) 91.8%, rgba(246, 223, 168, 0.75) 93%, transparent 93%),
    /* rounded spine: dark at the edges, lit along the middle */
    linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.16) 45%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.45)),
    var(--cloth-light);
}

.rb-spine-title {
  writing-mode: vertical-rl;
  max-height: 72%;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: min(9px, calc(var(--book-depth) * 0.58));
  letter-spacing: 0.04em;
  color: #f6dfa8;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.is-real .book-front {
  border-radius: 1px 4px 4px 1px;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.3),
    inset -3px 0 4px rgba(0, 0, 0, 0.2);
}

/* The cover board overhangs the page block by a hair at head and tail */
.is-real .book-side {
  top: 3px;
  bottom: 3px;
}

.rb-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

/* Crease where the jacket folds around the front board */
.rb-groove {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 6%;
  width: 3px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.28), rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.12));
  pointer-events: none;
}

/* Glossy dust-jacket highlight */
.rb-sheen {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.22) 42%, rgba(255, 255, 255, 0.05) 50%, transparent 58%),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.12), transparent 25%, transparent 80%, rgba(0, 0, 0, 0.15));
  pointer-events: none;
}

/* The shelf-book's own hinge strip reads as a jacket flap edge on real books - hide it */
.is-real .book-hinge {
  display: none;
}

.rb-kicker {
  font-size: calc(var(--book-w) * 0.062);
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #f6dfa8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.rb-ornament {
  position: relative;
  width: 52%;
  height: 7px;
  margin: 5px 0;
  flex-shrink: 0;
  background: linear-gradient(to right, transparent, rgba(246, 223, 168, 0.85), transparent) center / 100% 1px no-repeat;
}

.rb-ornament::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5px;
  height: 5px;
  background: #f6dfa8;
  transform: translate(-50%, -50%) rotate(45deg);
}

.rb-title {
  margin: auto 0;
  font-size: min(calc(var(--book-w) * 0.12), calc(var(--book-w) * 0.72 / (var(--longest) * 0.6)));
  -webkit-line-clamp: 5;
}

.rb-author {
  margin-top: auto;
  max-width: 100%;
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: calc(var(--book-w) * 0.075);
  color: #fbf3de;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rb-imprint {
  margin-top: 2px;
  font-size: calc(var(--book-w) * 0.045);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(246, 223, 168, 0.7);
  white-space: nowrap;
}

/* ---------- Spine-out on the shelf ----------
   The scene is only as wide as the spine. The 3D book (full cover width) is turned 90deg about
   its left edge so just the spine faces the reader; hovering/activating its ShelfSlot swings it
   back round to show the front cover, pulled toward the reader and over its neighbours. */
.shelf-book-scene.is-spine-out {
  --book-depth: 30px;
  --h-factor: 1;
  width: var(--book-depth);
  height: calc(var(--book-h) * var(--h-factor));
  margin-top: calc(var(--book-h) * (1 - var(--h-factor)));
  perspective: 900px;
  perspective-origin: 50% 40%;
}

@media (min-width: 640px) {
  .shelf-book-scene.is-spine-out {
    --book-depth: 34px;
  }
}

.is-spine-out .shelf-book,
.is-spine-out.is-real .shelf-book {
  inset: 0 auto 0 0;
  width: var(--book-w);
  transform-origin: 0 50%;
  transform: translateX(calc(var(--book-depth) / 2)) rotateY(90deg);
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.shelf-slot:hover .is-spine-out .shelf-book,
.shelf-slot.is-active .is-spine-out .shelf-book,
.shelf-slot:focus-visible .is-spine-out .shelf-book {
  transform: translateY(-12px) translateZ(70px) rotateY(-10deg);
}

.is-spine-out .book-shadow {
  left: -2px;
  right: -2px;
}

.is-spine-out .book-spine {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 0 8px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
}

/* eNotes: a school exercise book's cloth spine in the cover colour */
.is-spine-out:not(.is-real) .book-spine {
  background:
    linear-gradient(to right, rgba(0, 0, 0, 0.35), rgba(255, 255, 255, 0.14) 45%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.35)),
    var(--cloth-light);
}

.is-spine-out .rb-spine-title {
  flex: 1 1 auto;
  min-height: 0;
  max-height: none;
  font-size: min(12px, calc(var(--book-depth) * 0.36));
  line-height: 1.1;
}

.is-spine-out:not(.is-real) .rb-spine-title {
  font-family: Poppins, Inter, system-ui, sans-serif;
  font-weight: 700;
  color: #fff;
}

.spine-label {
  flex-shrink: 0;
  max-width: calc(100% - 4px);
  padding: 1px 3px;
  border-radius: 2px;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.2;
  color: #3b2a10;
  background: #f1dea6;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
}

.spine-foot {
  flex-shrink: 0;
  width: 55%;
  aspect-ratio: 1;
  border-radius: 50%;
}

/* Library books: a small publisher's roundel at the foot of the spine */
.spine-foot--imprint {
  border: 1.5px solid rgba(246, 223, 168, 0.85);
  background: radial-gradient(circle, rgba(246, 223, 168, 0.85) 0 22%, transparent 24%);
}

/* eNotes: a white label patch like the one on an exercise book's spine */
.spine-foot--notes {
  border-radius: 2px;
  aspect-ratio: 1 / 1.4;
  background: repeating-linear-gradient(to bottom, #fbf8ef 0 3px, #9fb6d6 3px 4px);
  opacity: 0.9;
}

/* Teacher bulk selection: a clear ring and tick on the spine */
.is-selected .book-spine {
  box-shadow: inset 0 0 0 2px #6366f1, 0 0 0 2px #6366f1;
}

.is-selected .spine-label {
  background: #6366f1;
  color: #fff;
}

/* ---------- Teacher-designed covers ---------- */
.book-front.has-cover {
  padding: 0;
  display: block;
}

.has-cover .book-hinge {
  z-index: 3;
}

.cv {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.cv-art,
.cv-bottom,
.cv-frame,
.cv-sticker {
  background-size: cover;
  background-position: center;
}

.cv-bold-title {
  font-family: Poppins, Inter, system-ui, sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.02;
  letter-spacing: 0.01em;
  color: #fff;
  font-size: min(calc(var(--book-w) * 0.14), calc(var(--book-w) * 0.66 / (var(--longest) * 0.8)));
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: break-word;
}

/* Portrait: photo fills the cover, title set bold on the left over a colour fade, white strip
   along the bottom for the author - the classic modern paperback layout. */
.cv-portrait .cv-art {
  position: relative;
  flex: 1 1 auto;
}

.cv-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--cloth-fade) 0%, var(--cloth-fade) 22%, transparent 72%);
}

.cv-portrait .cv-bold-title {
  position: absolute;
  top: 11%;
  left: 15%;
  right: 16%;
}

.cv-strip {
  flex: 0 0 22%;
  background: #f7f6f2;
  padding: 0 7% 0 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
  min-width: 0;
}

.cv-author {
  font-family: Poppins, Inter, system-ui, sans-serif;
  font-weight: 800;
  font-size: calc(var(--book-w) * 0.074);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cv-meta {
  font-weight: 700;
  font-size: calc(var(--book-w) * 0.062);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--cloth-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Classic: cloth hardcover, gold lettering, picture in a round gilt frame */
.cv-classic,
.cv-exercise {
  align-items: center;
  padding: 10% 9% 8% 16%;
}

.cv-frame {
  width: 46%;
  aspect-ratio: 1;
  border-radius: 50%;
  margin: 7px 0 5px;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(246, 223, 168, 0.85), 0 0 0 4px rgba(0, 0, 0, 0.25);
}

.cv-rule {
  margin-top: 14px;
}

.cv-serif-title {
  -webkit-line-clamp: 3;
}

.cv-frame + .cv-serif-title {
  -webkit-line-clamp: 2;
}

.cv-gold-author {
  margin-top: auto;
  max-width: 100%;
  font-weight: 700;
  font-size: calc(var(--book-w) * 0.066);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f6dfa8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cv-gold-year {
  font-size: calc(var(--book-w) * 0.058);
  color: rgba(246, 223, 168, 0.8);
}

/* Split: solid colour block with the title on top, picture filling the lower half */
.cv-top {
  /* grows for a long title; the picture below takes whatever is left (at least 28%) */
  flex: 0 0 auto;
  min-height: 50%;
  max-height: 72%;
  overflow: hidden;
  padding: 10% 8% 7% 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 0;
}

.cv-kicker {
  font-weight: 700;
  font-size: calc(var(--book-w) * 0.058);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 3px;
}

.cv-split .cv-bold-title {
  -webkit-line-clamp: 4;
}

.cv-bottom {
  position: relative;
  flex: 1 1 auto;
  min-height: 28%;
  border-top: 2px solid rgba(255, 255, 255, 0.85);
}

.cv-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 3px 6px 3px 15%;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-weight: 700;
  font-size: calc(var(--book-w) * 0.064);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Exercise book: the name label gets filled-in author/year lines, plus an optional photo sticker */
.cv-exercise .notes-label {
  margin: 8% 0 auto;
}

.notes-field {
  margin-top: 3px;
  padding-bottom: 1px;
  border-bottom: 1px solid #9fb6d6;
  font-family: 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive;
  font-size: calc(var(--book-w) * 0.068);
  line-height: 1.2;
  color: #1e3a8a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cv-sticker {
  position: absolute;
  right: 9%;
  bottom: 6%;
  width: 30%;
  aspect-ratio: 1;
  border-radius: 3px;
  border: 2px solid #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  transform: rotate(-4deg);
  flex-shrink: 0;
}

@media (prefers-reduced-motion: reduce) {
  .shelf-book,
  .book-shadow {
    transition: none;
  }
}
</style>
