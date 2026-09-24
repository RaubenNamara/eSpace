<template>
  <!-- One book standing spine-out on a Bookshelf (spines mode). Hover, keyboard focus, or a first
       tap on a touch screen pulls the book out to show its front cover plus the details card under
       the plank; clicking the pulled-out book (or pressing Enter) opens it. -->
  <div
    ref="root"
    class="shelf-slot"
    :class="{ 'is-active': active }"
    role="button"
    tabindex="0"
    :aria-label="label"
    @click="onClick"
    @keydown.enter.prevent="emit('open')"
    @mouseleave="active = false"
  >
    <slot />
    <div class="slot-card" @click.stop>
      <slot name="details" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

defineProps<{ label?: string }>()
const emit = defineEmits<{ open: [] }>()

const root = ref<HTMLElement | null>(null)
const active = ref(false)

// Touch screens have no hover, so the first tap only pulls the book out (showing its cover and
// details) and a second tap opens it; with a mouse, hovering already did that, so one click opens.
const canHover = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches

const onClick = () => {
  if (!canHover && !active.value) {
    active.value = true
    return
  }
  emit('open')
}

const onOutsidePointer = (e: PointerEvent) => {
  if (root.value && !root.value.contains(e.target as Node)) active.value = false
}

watch(active, (isActive) => {
  if (isActive) document.addEventListener('pointerdown', onOutsidePointer)
  else document.removeEventListener('pointerdown', onOutsidePointer)
})

onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutsidePointer))
</script>

<style scoped>
.shelf-slot {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  scroll-snap-align: start;
  cursor: pointer;
  outline: none;
  /* Reaches down over the plank to where the details card sits, so moving the pointer from the
     book to the card never leaves the slot (which would hide the card mid-way) */
  min-height: calc(var(--shelf-book-h) + var(--plank-h) + 8px);
}

.shelf-slot:hover,
.shelf-slot.is-active,
.shelf-slot:focus-visible,
.shelf-slot:focus-within {
  z-index: 20;
}

.slot-card {
  position: absolute;
  top: calc(var(--shelf-book-h) + var(--plank-h) + 8px);
  left: -8px;
  width: 210px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06);
  cursor: default;
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dark .slot-card {
  background: #1f2937;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.shelf-slot:hover .slot-card,
.shelf-slot.is-active .slot-card,
.shelf-slot:focus-within .slot-card {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

@media (prefers-reduced-motion: reduce) {
  .slot-card {
    transition: none;
  }
}
</style>
