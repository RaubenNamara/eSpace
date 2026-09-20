<template>
  <div class="relative book-scene" :class="size === 'sm' ? 'pr-1.5' : 'pr-2'">
    <!-- Page edges: a stack of thin cream lines peeking out from behind the cover's right side,
         like the fanned pages of a closed book. Sits in the wrapper's own pr-1.5/pr-2 gutter, so
         it's visible without being clipped by a parent grid/flex track. -->
    <div class="absolute inset-y-1 right-0 w-1.5 sm:w-2 rounded-r-sm page-edges"></div>

    <!-- 3D stage: the cover and the page beneath it share this perspective space, so the cover
         can swing open on its spine and actually reveal the page behind it, like a real book. -->
    <div class="book-stage relative aspect-[3/4]">
      <!-- Inner page: sits underneath the cover, only seen once the cover opens -->
      <div class="absolute inset-0 rounded-l-md rounded-r-[3px] book-page overflow-hidden">
        <div class="absolute inset-y-0 left-0 w-[14%] bg-black/10 pointer-events-none"></div>
      </div>

      <!-- Cover: hinged on its left edge (the spine), rotates open toward the viewer on hover -->
      <div
        class="book-cover absolute inset-0 rounded-l-md rounded-r-[3px] shadow-md group-hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex items-center justify-center"
        :class="palette"
      >
        <!-- Spine: a darker strip down the left edge, like the book's binding -->
        <div class="absolute inset-y-0 left-0 w-[14%] bg-black/25 pointer-events-none"></div>
        <div class="absolute inset-y-0 left-[14%] w-px bg-white/25 pointer-events-none"></div>

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
            {{ formatLabel }}
          </span>
        </div>

        <!-- Title stamp -->
        <div class="absolute bottom-0 left-0 right-0 p-2.5 pl-3.5 bg-black/40">
          <p
            class="text-white font-semibold leading-snug drop-shadow-sm"
            :class="size === 'sm' ? 'text-[11px] line-clamp-2' : 'text-xs sm:text-sm line-clamp-3'"
          >
            {{ book.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LibraryBook } from '@/types/library'

const props = withDefaults(defineProps<{ book: LibraryBook; size?: 'sm' | 'md' }>(), {
  size: 'md'
})

const coverColors = [
  'bg-emerald-600',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-violet-600',
  'bg-sky-600',
  'bg-teal-600',
  'bg-fuchsia-600',
  'bg-lime-600'
]
const palette = computed(() => coverColors[Math.abs(props.book.id) % coverColors.length])

const subjectLabel = computed(() => {
  if (props.book.subject_code) return props.book.subject_code.slice(0, 6).toUpperCase()
  return (props.book.subject_name || '').slice(0, 8).toUpperCase()
})

const formatLabel = computed(() => (props.book.file_type || 'pdf').toUpperCase())
</script>

<style scoped>
.book-scene {
  perspective: 900px;
}

.book-stage {
  transform-style: preserve-3d;
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

/* The paper page that lives under the cover. It never moves - it's only ever revealed once the
   cover has rotated far enough for its front face to turn away from the viewer. */
.book-page {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.15), transparent 14%), #f5f1e6;
  transform: translateZ(-1px);
}

.book-page::before {
  content: '';
  position: absolute;
  inset: 12% 10% 12% 20%;
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0,
    rgba(0, 0, 0, 0.1) 2px,
    transparent 2px,
    transparent 11px
  );
}

.dark .book-page {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent 14%), #3f3b32;
}

.dark .book-page::before {
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.12) 0,
    rgba(255, 255, 255, 0.12) 2px,
    transparent 2px,
    transparent 11px
  );
}

/* The cover is hinged on its left edge (the spine) and swings open toward the viewer on hover,
   like an actual front cover being turned - past the halfway point its front face turns away
   from us and backface-visibility hides it, revealing the page sitting underneath. */
.book-cover {
  transform-style: preserve-3d;
  transform-origin: left center;
  backface-visibility: hidden;
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
}

.group:hover .book-cover {
  transform: rotateY(-130deg);
}
</style>
