<template>
  <!-- One book standing spine-out on a Bookshelf (spines mode). Hover, keyboard focus, or a first
       tap on a touch screen pulls the book out to show its front cover plus a small details card;
       clicking the pulled-out book (or pressing Enter) opens it. -->
  <div
    ref="root"
    class="shelf-slot"
    :class="{ 'is-active': active }"
    role="button"
    tabindex="0"
    :aria-label="label"
    @click="onClick"
    @keydown.enter.prevent="emit('open')"
    @mouseenter="canHover && show()"
    @mouseleave="canHover && hideSoon()"
    @focus="canHover && show()"
    @blur="canHover && hideSoon()"
  >
    <slot />

    <!-- The card floats beside the book (teleported, fixed position) rather than reserving empty
         space under every shelf. It stays open while the pointer travels from the book onto it. -->
    <Teleport v-if="$slots.details" to="body">
      <div
        v-if="active"
        ref="card"
        class="shelf-slot-card"
        :class="{ 'is-sheet': !canHover }"
        :style="canHover ? cardStyle : undefined"
        @mouseenter="show"
        @mouseleave="hideSoon"
        @click.stop
      >
        <!-- Phones: a bottom sheet with a grab bar and a big Open button (no hover to lean on) -->
        <div v-if="!canHover" class="sheet-grab" aria-hidden="true"></div>
        <!-- The book's cover, large and face-on: always above everything on the page (this card is
             teleported to <body>), so it's readable however the shelf around it is laid out. Clicking
             it opens the book, same as clicking the book on the shelf. -->
        <div
          v-if="$slots.cover"
          class="card-cover"
          role="button"
          tabindex="0"
          :aria-label="label ? `Open ${label}` : 'Open'"
          :title="label ? `Open ${label}` : 'Open'"
          @click="openFromSheet"
          @keydown.enter.prevent="openFromSheet"
        >
          <slot name="cover" :size="coverSize" />
        </div>
        <slot name="details" />
        <button v-if="!canHover" type="button" class="sheet-open" @click="openFromSheet">{{ openLabel }}</button>
        <p v-else class="card-hint">Click the book or its cover to open</p>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue'

withDefaults(defineProps<{ label?: string; openLabel?: string }>(), { openLabel: 'Open' })
const emit = defineEmits<{ open: [] }>()

const root = ref<HTMLElement | null>(null)
const card = ref<HTMLElement | null>(null)
const active = ref(false)
const cardStyle = ref<Record<string, string>>({})
let hideTimer: ReturnType<typeof setTimeout> | null = null

// Touch screens have no hover, so the first tap only pulls the book out (showing its cover and
// details) and a second tap opens it; with a mouse, hovering already did that, so one click opens.
const canHover = typeof window !== 'undefined' && !!window.matchMedia?.('(hover: hover)').matches

// Large face-on cover in the desktop card, medium in the phone sheet
const coverSize: 'lg' | 'md' = canHover ? 'lg' : 'md'

const CARD_WIDTH = 228
// The pulled-out book's cover is about this wide (ShelfBook --book-w + the swing toward the reader)
const COVER_REACH = 150

const place = async () => {
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  // Beside the pulled-out cover when there's room on the right, otherwise on its left
  let left = r.left + COVER_REACH
  if (left + CARD_WIDTH > window.innerWidth - 8) left = Math.max(8, r.left - CARD_WIDTH - 12)
  cardStyle.value = { left: `${left}px`, top: `${Math.max(8, r.top + 12)}px`, width: `${CARD_WIDTH}px` }
  await nextTick()
  // Keep it on screen vertically
  const h = card.value?.offsetHeight ?? 0
  if (h && r.top + 12 + h > window.innerHeight - 8) {
    cardStyle.value = { ...cardStyle.value, top: `${Math.max(8, window.innerHeight - h - 8)}px` }
  }
}

// On a phone the book is pulled out on the shelf and the sheet covers the bottom of the screen -
// nudge the shelf sideways (so the swung-out cover isn't clipped) and the page up (so the book
// isn't hidden behind the sheet).
const revealOnPhone = async () => {
  await nextTick()
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const scroller = el.closest('.shelf-scroller') as HTMLElement | null
  if (scroller) {
    const overflow = r.left + COVER_REACH - scroller.getBoundingClientRect().right
    if (overflow > 0) scroller.scrollBy({ left: overflow + 12, behavior: 'smooth' })
  }
  // Measured by height, not position: the sheet is still sliding up from off-screen right now
  const sheetHeight = card.value?.offsetHeight ?? 0
  // Room to scroll a book on the page's last shelf above the sheet (removed when it closes)
  document.body.style.paddingBottom = `${sheetHeight}px`
  const hidden = r.bottom + 16 - (window.innerHeight - sheetHeight)
  if (hidden > 0) window.scrollBy({ top: hidden, behavior: 'smooth' })
}

const show = () => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  if (!active.value) {
    active.value = true
    if (canHover) place()
    else revealOnPhone()
    listen(true)
  }
}

const openFromSheet = () => {
  hide()
  emit('open')
}

const hide = () => {
  active.value = false
  listen(false)
  if (!canHover) document.body.style.paddingBottom = ''
}

const hideSoon = () => {
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(hide, 180)
}

const onClick = () => {
  if (!canHover && !active.value) {
    show()
    return
  }
  emit('open')
}

const onOutsidePointer = (e: PointerEvent) => {
  const t = e.target as Node
  if (root.value?.contains(t) || card.value?.contains(t)) return
  hide()
}

// The card is position:fixed, so it would drift away from its book on scroll - just close it
const onScroll = () => hide()

const listen = (on: boolean) => {
  if (on) {
    document.addEventListener('pointerdown', onOutsidePointer)
    if (canHover) {
      window.addEventListener('scroll', onScroll, true)
      window.addEventListener('resize', onScroll)
    }
  } else {
    document.removeEventListener('pointerdown', onOutsidePointer)
    window.removeEventListener('scroll', onScroll, true)
    window.removeEventListener('resize', onScroll)
  }
}

onBeforeUnmount(() => {
  if (hideTimer) clearTimeout(hideTimer)
  listen(false)
  if (active.value && !canHover) document.body.style.paddingBottom = ''
})
</script>

<style scoped>
.shelf-slot {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
  outline: none;
}

.shelf-slot.is-active,
.shelf-slot:focus-visible {
  z-index: 20;
}

.shelf-slot-card {
  position: fixed;
  z-index: 60;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06);
  cursor: default;
  animation: shelf-card-in 0.18s ease-out;
}

.dark .shelf-slot-card {
  background: #1f2937;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.card-cover {
  display: flex;
  justify-content: center;
  margin: 2px 0 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.card-cover:hover {
  transform: translateY(-2px) scale(1.02);
  filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.25));
}

.card-cover:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 3px;
}

.card-hint {
  margin-top: 6px;
  font-size: 11px;
  font-weight: 500;
  color: #4f46e5;
}

.dark .card-hint {
  color: #818cf8;
}

/* Phones: bottom sheet */
.shelf-slot-card.is-sheet {
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 60vh;
  overflow-y: auto;
  padding: 8px 18px calc(16px + env(safe-area-inset-bottom));
  border-radius: 18px 18px 0 0;
  animation-name: shelf-sheet-in;
  animation-duration: 0.22s;
}

.sheet-grab {
  width: 40px;
  height: 4px;
  margin: 0 auto 12px;
  border-radius: 999px;
  background: #d1d5db;
}

.sheet-open {
  display: block;
  width: 100%;
  margin-top: 14px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: #4f46e5;
}

.sheet-open:active {
  background: #4338ca;
}

@keyframes shelf-sheet-in {
  from {
    transform: translateY(100%);
  }
}

@keyframes shelf-card-in {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .shelf-slot-card {
    animation: none;
  }
}
</style>
