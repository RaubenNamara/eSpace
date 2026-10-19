<template>
  <section aria-labelledby="anatomy-details-title" aria-live="polite">
    <template v-if="info">
      <div class="flex items-start gap-2">
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
            {{ info.scope === 'group' ? 'Organ / structure' : 'Part' }}
          </p>
          <h2 id="anatomy-details-title" class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ info.title }}</h2>
        </div>
        <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Clear selection" title="Clear selection" @click="$emit('clear')">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <div class="flex flex-wrap gap-1 mt-1.5">
        <span v-for="s in info.systems" :key="s" class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[11px] text-gray-700 dark:text-gray-200">
          <span class="w-2 h-2 rounded-sm" :style="{ background: SYSTEM_BY_KEY[s]?.colour }" aria-hidden="true"></span>{{ SYSTEM_BY_KEY[s]?.name }}
        </span>
      </div>

      <p v-if="info.summary" class="mt-3 text-sm text-gray-800 dark:text-gray-100">{{ info.summary }}</p>
      <dl class="mt-3 space-y-2.5">
        <div v-if="info.function">
          <dt class="text-xs font-bold text-indigo-700 dark:text-indigo-300">Function</dt>
          <dd class="text-sm text-gray-700 dark:text-gray-200">{{ info.function }}</dd>
        </div>
        <div>
          <dt class="text-xs font-bold text-indigo-700 dark:text-indigo-300">Location</dt>
          <dd class="text-sm text-gray-700 dark:text-gray-200">{{ info.location }}</dd>
        </div>
        <div v-if="info.importance">
          <dt class="text-xs font-bold text-indigo-700 dark:text-indigo-300">Why it matters</dt>
          <dd class="text-sm text-gray-700 dark:text-gray-200">{{ info.importance }}</dd>
        </div>
      </dl>
      <div v-if="info.facts.length" class="mt-3 rounded-xl px-3 py-2 bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
        <p class="text-xs font-bold">Facts</p>
        <ul class="list-disc pl-4 text-sm space-y-0.5 mt-0.5">
          <li v-for="f in info.facts" :key="f">{{ f }}</li>
        </ul>
      </div>
      <p v-if="!info.function && !info.facts.length" class="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Only the name and position of this part come from the anatomical dataset; there is no checked school description for it yet.
      </p>
      <div v-if="info.curriculum.length" class="mt-3">
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Curriculum topics</p>
        <div class="flex flex-wrap gap-1 mt-1">
          <span v-for="c in info.curriculum" :key="c" class="px-1.5 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-800 dark:text-indigo-200">{{ c }}</span>
        </div>
      </div>
      <details v-if="info.advanced.length" class="mt-3 group" :open="level === 'advanced'">
        <summary class="text-xs font-bold text-gray-500 dark:text-gray-400 cursor-pointer select-none">Advanced details</summary>
        <dl class="mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
          <template v-for="a in info.advanced" :key="a.label">
            <dt class="text-gray-500 dark:text-gray-400">{{ a.label }}</dt>
            <dd class="text-gray-800 dark:text-gray-100 break-words">{{ a.value }}</dd>
          </template>
        </dl>
      </details>
      <div class="mt-4 flex flex-wrap gap-2">
        <button type="button" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" @click="$emit('focus')">Zoom to it</button>
        <button type="button" class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" @click="$emit('full-view')">Return to full view</button>
      </div>
    </template>
    <template v-else>
      <h2 id="anatomy-details-title" class="text-sm font-bold text-gray-900 dark:text-white">Nothing selected</h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">Click or tap any part of the body, or search for it by name, to see what it is and what it does.</p>
      <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span class="font-semibold">School</span> level selects whole organs (the liver, the right lung).
        <span class="font-semibold">Advanced</span> level selects each named part (a lobe, a segment, one head of a muscle).
      </p>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { DetailLevel, StructureInfo } from '@/anatomy/types'
import { SYSTEM_BY_KEY } from '@/anatomy/systems'

defineProps<{ info: StructureInfo | null; level: DetailLevel }>()
defineEmits<{ clear: []; focus: []; 'full-view': [] }>()
</script>
