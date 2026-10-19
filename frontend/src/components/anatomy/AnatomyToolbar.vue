<template>
  <div class="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Camera and display controls">
    <div class="flex rounded-lg bg-white/95 dark:bg-gray-900/95 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden" role="group" aria-label="Views">
      <button
        v-for="v in VIEWS"
        :key="v.key"
        type="button"
        class="px-2.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 border-r last:border-r-0 border-gray-200 dark:border-gray-700"
        :aria-label="`${v.label} view`"
        @click="$emit('view', v.key)"
      >{{ v.label }}</button>
    </div>
    <div class="flex rounded-lg bg-white/95 dark:bg-gray-900/95 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden" role="group" aria-label="Zoom">
      <button type="button" :class="iconBtn" aria-label="Zoom in" title="Zoom in (+)" @click="$emit('zoom', 0.8)">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M12 5v14M5 12h14" /></svg>
      </button>
      <button type="button" :class="iconBtn" aria-label="Zoom out" title="Zoom out (-)" @click="$emit('zoom', 1.25)">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M5 12h14" /></svg>
      </button>
      <button type="button" :class="iconBtn" aria-label="Reset camera" title="Reset camera" @click="$emit('reset')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M5.5 15a7 7 0 0012.4 2.5M18.5 9A7 7 0 006.1 6.5" /></svg>
      </button>
    </div>
    <div class="flex rounded-lg bg-white/95 dark:bg-gray-900/95 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden" role="group" aria-label="Display">
      <button type="button" :class="toggle(labels)" :aria-pressed="labels" title="Show or hide labels" @click="$emit('update:labels', !labels)">Labels</button>
      <button type="button" :class="toggle(seeThrough)" :aria-pressed="seeThrough" title="See-through skin when other systems are shown" @click="$emit('update:seeThrough', !seeThrough)">See-through skin</button>
      <button type="button" :class="toggle(isolate)" :aria-pressed="isolate" :disabled="!hasSelection" title="Fade everything except the selection" @click="$emit('update:isolate', !isolate)">Isolate</button>
      <button type="button" :class="toggle(living)" :aria-pressed="living" title="Organs working: heartbeat, blood flow, breathing, digestion…" @click="$emit('update:living', !living)">Living body</button>
    </div>
    <button
      type="button"
      class="ml-auto px-2.5 py-1.5 rounded-lg bg-white/95 dark:bg-gray-900/95 shadow-sm border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 flex items-center gap-1"
      :aria-label="fullscreen ? 'Exit full screen' : 'Full screen'"
      @click="$emit('fullscreen')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path v-if="!fullscreen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
      </svg>
      <span class="hidden sm:inline">{{ fullscreen ? 'Exit full screen' : 'Full screen' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ViewName } from '@/anatomy/types'

withDefaults(defineProps<{ labels: boolean; seeThrough: boolean; isolate: boolean; hasSelection: boolean; fullscreen: boolean; living?: boolean }>(), { living: false })
defineEmits<{
  view: [ViewName]
  zoom: [number]
  reset: []
  fullscreen: []
  'update:labels': [boolean]
  'update:seeThrough': [boolean]
  'update:isolate': [boolean]
  'update:living': [boolean]
}>()

const VIEWS: { key: ViewName; label: string }[] = [
  { key: 'front', label: 'Front' }, { key: 'back', label: 'Back' }, { key: 'left', label: 'Left' }, { key: 'right', label: 'Right' }, { key: 'top', label: 'Top' },
]
const iconBtn = 'px-2 py-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 border-r last:border-r-0 border-gray-200 dark:border-gray-700'
const toggle = (on: boolean) => [
  'px-2.5 py-1.5 text-xs font-semibold border-r last:border-r-0 border-gray-200 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed',
  on ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
]
</script>
