<template>
  <!-- The standard page header: an icon, the title and a one-line description, the page's main
       actions, and its filters. On a phone the filters fold into a "Filters" button that opens
       them in a bottom sheet (the filters are rendered once - the same controls, just placed
       differently), so a row of pickers never runs off the screen. -->
  <header class="mb-4 sm:mb-5">
    <div class="flex flex-wrap items-start gap-x-3 gap-y-2">
      <div v-if="icon" class="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center flex-shrink-0 shadow-sm" :class="ACCENT[accent].icon">
        <AppIcon :name="icon" class="w-5 h-5" />
      </div>
      <div class="min-w-[11rem] flex-1">
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight truncate">{{ title }}</h1>
        <p v-if="description" class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{{ description }}</p>
      </div>

      <div class="flex items-center gap-2 flex-shrink-0 ml-auto">
        <!-- Phone: one button for all the filters -->
        <button
          v-if="$slots.filters"
          type="button"
          class="md:hidden relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200"
          :aria-expanded="sheetOpen"
          @click="sheetOpen = true"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          Filters
          <span v-if="activeFilters" class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold leading-[18px] text-center text-white" :class="ACCENT[accent].badge">{{ activeFilters }}</span>
        </button>
        <slot name="actions" />
      </div>
    </div>

    <!-- Filters: inline on tablet and up; a bottom sheet on a phone -->
    <div v-if="$slots.filters" class="md:mt-3">
      <div v-if="sheetOpen" class="md:hidden fixed inset-0 z-40 bg-black/40" @click="sheetOpen = false"></div>
      <div
        class="ph-filters"
        :class="{ 'ph-filters--open': sheetOpen }"
        role="group"
        aria-label="Filters"
      >
        <div class="md:hidden flex items-center justify-between mb-3">
          <p class="text-sm font-bold text-gray-900 dark:text-white">Filters</p>
          <button type="button" class="text-sm font-semibold" :class="ACCENT[accent].text" @click="sheetOpen = false">Done</button>
        </div>
        <div class="flex flex-col md:flex-row md:flex-wrap md:items-center gap-2 [&>*]:w-full md:[&>*]:w-auto">
          <slot name="filters" />
        </div>
      </div>
    </div>

    <!-- Below the title: tabs, a stat strip... -->
    <div v-if="$slots.default" class="mt-3">
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'

export type Accent = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose' | 'sky'

withDefaults(defineProps<{
  title: string
  description?: string
  // An AppIcon name
  icon?: string
  accent?: Accent
  // How many filters differ from their default - shown on the phone's Filters button
  activeFilters?: number
}>(), { accent: 'indigo', activeFilters: 0 })

const ACCENT: Record<Accent, { icon: string; badge: string; text: string }> = {
  indigo: { icon: 'bg-indigo-600 text-white', badge: 'bg-indigo-600', text: 'text-indigo-600 dark:text-indigo-300' },
  emerald: { icon: 'bg-emerald-600 text-white', badge: 'bg-emerald-600', text: 'text-emerald-600 dark:text-emerald-300' },
  violet: { icon: 'bg-violet-600 text-white', badge: 'bg-violet-600', text: 'text-violet-600 dark:text-violet-300' },
  amber: { icon: 'bg-amber-500 text-white', badge: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-300' },
  rose: { icon: 'bg-rose-600 text-white', badge: 'bg-rose-600', text: 'text-rose-600 dark:text-rose-300' },
  sky: { icon: 'bg-sky-600 text-white', badge: 'bg-sky-600', text: 'text-sky-600 dark:text-sky-300' }
}

const sheetOpen = ref(false)
// The sheet never stays open behind a wider layout
const onResize = () => { if (window.innerWidth >= 768) sheetOpen.value = false }
watch(sheetOpen, (open) => {
  if (open) window.addEventListener('resize', onResize)
  else window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
/* Phone: a bottom sheet (hidden until opened) */
.ph-filters {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  max-height: 80vh;
  overflow-y: auto;
  padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
  border-radius: 1.25rem 1.25rem 0 0;
  background: #fff;
  box-shadow: 0 -12px 32px -12px rgba(0, 0, 0, 0.3);
  transform: translateY(105%);
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dark .ph-filters {
  background: #1f2937;
}
.ph-filters--open {
  transform: translateY(0);
}
/* Tablet and up: inline, like any other row */
@media (min-width: 768px) {
  .ph-filters {
    position: static;
    max-height: none;
    overflow: visible;
    padding: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    transform: none;
    transition: none;
  }
  .dark .ph-filters {
    background: transparent;
  }
}
</style>
