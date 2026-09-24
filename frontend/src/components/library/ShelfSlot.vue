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
    @mouseenter="show"
    @mouseleave="hideSoon"
    @focus="show"
    @blur="hideSoon"
  >
    <slot />

    <!-- The card floats beside the book (teleported, fixed position) rather than reserving empty
         space under every shelf. It stays open while the pointer travels from the book onto it. -->
    <Teleport v-if="$slots.details" to="body">
      <div
        v-if="active"
        ref="card"
        class="shelf-slot-card"
        :style="cardStyle"
        @mouseenter="show"
        @mouseleave="hideSoon"
        @click.stop
      >
        <slot name="details" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue'

defineProps<{ label?: string }>()
const emit = defineEmits<{ open: [] }>()

const root = ref<HTMLElement | null>(null)
const card = ref<HTMLElement | null>(null)
const active = ref(false)
const cardStyle = ref<Record<string, string>>({})
let hideTimer: ReturnType<typeof setTimeout> | null = null

// Touch screens have no hover, so the first tap only pulls the book out (showing its cover and
// details) and a second tap opens it; with a mouse, hovering already did that, so one click opens.
const canHover = typeof window !== 'undefined' && !!window.matchMedia?.('(hover: hover)').matches

const CARD_WIDTH = 220
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

const show = () => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  if (!active.value) {
    active.value = true
    place()
    listen(true)
  }
}

const hide = () => {
  active.value = false
  listen(false)
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
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
  } else {
    document.removeEventListener('pointerdown', onOutsidePointer)
    window.removeEventListener('scroll', onScroll, true)
    window.removeEventListener('resize', onScroll)
  }
}

onBeforeUnmount(() => {
  if (hideTimer) clearTimeout(hideTimer)
  listen(false)
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
