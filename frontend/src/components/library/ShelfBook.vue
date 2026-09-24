<template>
  <div class="shelf-book-scene" :class="{ 'is-small': size === 'sm', 'is-large': size === 'lg' }">
    <div class="shelf-book" :style="coverStyle">
      <!-- Page block seen past the right edge of the cover and along the top - the book is
           turned a few degrees on the shelf, so its thickness shows like a real standing book. -->
      <div class="book-spine" aria-hidden="true"></div>
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
        <template v-else>
          <div v-if="label" class="book-band">{{ label }}</div>
          <div class="book-rule" aria-hidden="true"></div>
          <p class="book-title">{{ title }}</p>
          <div class="book-rule book-rule--bottom" aria-hidden="true"></div>
        </template>

        <p v-if="footer && !cover" class="book-footer">{{ footer }}</p>

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
}>(), {
  label: '',
  footer: '',
  variant: 'book',
  size: 'md',
  cover: null
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
  return {
    '--cloth-light': light,
    '--cloth-dark': dark,
    '--cloth-fade': hexToRgba(light, 0.92),
    '--longest': String(longestWord.value)
  } as Record<string, string>
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
  transform: translateZ(calc(var(--book-depth) / 2)) rotateY(90deg); /* folds back from the left edge */
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
  transform: translateZ(calc(var(--book-depth) / 2)) rotateY(-90deg);
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
  transform: translateZ(calc(var(--book-depth) / 2)) rotateX(-90deg);
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
