<template>
  <div class="shelf-book-scene" :class="{ 'is-small': size === 'sm' }">
    <div class="shelf-book" :style="coverStyle">
      <!-- Page block seen past the right edge of the cover and along the top - the book is
           turned a few degrees on the shelf, so its thickness shows like a real standing book. -->
      <div class="book-spine" aria-hidden="true"></div>
      <div class="book-side" aria-hidden="true"></div>
      <div class="book-top" aria-hidden="true"></div>

      <div class="book-front">
        <!-- Spine hinge: the crease where a hardcover bends open -->
        <div class="book-hinge" aria-hidden="true"></div>

        <template v-if="variant === 'notes'">
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

        <p v-if="footer" class="book-footer">{{ footer }}</p>

        <!-- Corner overlays (status ribbon, checkbox, etc.) supplied by the page -->
        <slot />
      </div>
    </div>
    <div class="book-shadow" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  // Short tag across the top of the cover, e.g. the subject code
  label?: string
  // Small line at the foot of the cover, e.g. "PDF" or "12 pages"
  footer?: string
  // Any stable number (the record id) - picks the cover colour so a book keeps its colour
  seed: number
  variant?: 'book' | 'notes'
  size?: 'sm' | 'md'
}>(), {
  label: '',
  footer: '',
  variant: 'book',
  size: 'md'
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

// Longest single word in the title - the title font shrinks just enough for that word to fit on
// one line, rather than being split mid-word ("Measureme/nts") on a narrow cover.
const longestWord = computed(() => Math.max(6, ...props.title.split(/\s+/).map(w => w.length)))

const coverStyle = computed(() => {
  const [light, dark] = cloths[Math.abs(props.seed) % cloths.length]
  return { '--cloth-light': light, '--cloth-dark': dark, '--longest': String(longestWord.value) } as Record<string, string>
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
  font-size: 9px;
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
  font-size: min(12px, calc(var(--book-w) * 0.72 / (var(--longest) * 0.6)));
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
  font-size: min(11px, calc((var(--book-w) * 0.75 - 14px) / (var(--longest) * 0.62)));
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
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
}

@media (min-width: 640px) {
  .book-title { font-size: min(13px, calc(var(--book-w) * 0.72 / (var(--longest) * 0.6))); }
  .book-band { font-size: 10px; }
}

.is-small .book-title { -webkit-line-clamp: 3; }

@media (prefers-reduced-motion: reduce) {
  .shelf-book,
  .book-shadow {
    transition: none;
  }
}
</style>
