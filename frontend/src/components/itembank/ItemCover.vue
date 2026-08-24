<template>
  <div class="relative book-scene" :class="size === 'sm' ? 'pr-1.5' : 'pr-2'">
    <!-- Page edges: a stack of thin cream lines peeking out from behind the cover's right side,
         like the fanned pages of a closed book. Sits in the wrapper's own pr-1.5/pr-2 gutter, so
         it's visible without being clipped by a parent grid/flex track. -->
    <div class="absolute inset-y-1 right-0 w-1.5 sm:w-2 rounded-r-sm page-edges"></div>

    <!-- Cover -->
    <div
      class="book-cover relative aspect-[3/4] rounded-l-md rounded-r-[3px] bg-gradient-to-br shadow-md group-hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex items-center justify-center"
      :class="palette"
    >
      <!-- Spine: a darker strip down the left edge, like the book's binding -->
      <div class="absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none"></div>
      <div class="absolute inset-y-0 left-[14%] w-px bg-white/25 pointer-events-none"></div>
      <!-- Sheen: a soft diagonal highlight across the cover, like light catching a glossy jacket -->
      <div class="absolute -inset-y-4 -left-1/4 w-1/2 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rotate-12 pointer-events-none"></div>

      <!-- Ghost document icon watermark -->
      <svg class="w-1/2 h-1/2 text-white/20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5z"></path>
      </svg>

      <!-- Corner chips -->
      <div class="absolute top-0 left-0 right-0 p-2 pl-3.5 flex items-start justify-between gap-1">
        <span
          v-if="subjectLabel"
          class="px-1.5 py-0.5 rounded text-white bg-white/20 backdrop-blur-sm font-bold tracking-wide truncate"
          :class="size === 'sm' ? 'text-[8px]' : 'text-[9px]'"
        >
          {{ subjectLabel }}
        </span>
        <span
          class="px-1.5 py-0.5 rounded text-white bg-white/20 backdrop-blur-sm font-bold tracking-wide flex-shrink-0"
          :class="size === 'sm' ? 'text-[8px]' : 'text-[9px]'"
        >
          PDF
        </span>
      </div>

      <!-- Title stamp -->
      <div class="absolute bottom-0 left-0 right-0 p-2.5 pl-3.5 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
        <p
          class="text-white font-semibold leading-snug drop-shadow-sm"
          :class="size === 'sm' ? 'text-[11px] line-clamp-2' : 'text-xs sm:text-sm line-clamp-3'"
        >
          {{ resource.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ItemBankResource } from '@/types/itembank'

const props = withDefaults(defineProps<{ resource: ItemBankResource; size?: 'sm' | 'md' }>(), {
  size: 'md'
})

const gradients = [
  'from-indigo-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-fuchsia-600',
  'from-sky-500 to-blue-600',
  'from-teal-500 to-cyan-600',
  'from-fuchsia-500 to-pink-600',
  'from-lime-500 to-emerald-600'
]
const palette = computed(() => gradients[Math.abs(props.resource.id) % gradients.length])

const subjectLabel = computed(() => {
  if (props.resource.subject_code) return props.resource.subject_code.slice(0, 6).toUpperCase()
  return (props.resource.subject_name || '').slice(0, 8).toUpperCase()
})
</script>

<style scoped>
.book-scene {
  perspective: 1000px;
}

.page-edges {
  background: repeating-linear-gradient(
    to bottom,
    #f8f6f0 0px,
    #f8f6f0 2px,
    #ddd8c8 2px,
    #ddd8c8 3px
  );
  box-shadow: 1px 0 1px rgba(0, 0, 0, 0.15), 2px 1px 4px rgba(0, 0, 0, 0.2);
}

.dark .page-edges {
  background: repeating-linear-gradient(
    to bottom,
    #9a978c 0px,
    #9a978c 2px,
    #6b6858 2px,
    #6b6858 3px
  );
}

/* The resource "opens" toward the viewer on hover - a gentle 3D tilt around its spine, grounded
   by a matching shadow beneath so it reads as lifting off the shelf rather than just skewing flat. */
.book-cover {
  transform-style: preserve-3d;
  transform-origin: left center;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
}

.group:hover .book-cover {
  transform: rotateY(-18deg) translateX(1px) translateY(-2px);
}
</style>
