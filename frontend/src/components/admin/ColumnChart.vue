<template>
  <!-- One series as columns: thin bars on a recessive grid, a tooltip on hover or focus, the peak
       labelled, and the same numbers as a table for screen readers and anyone who prefers it. -->
  <figure class="min-w-0">
    <div class="relative" :style="{ height: `${height}px` }" @mouseleave="hover = null">
      <!-- grid: 0, half, top -->
      <div class="absolute inset-0 flex flex-col justify-between pointer-events-none" aria-hidden="true">
        <div v-for="g in 3" :key="g" class="border-t border-gray-100 dark:border-gray-700/70"></div>
      </div>
      <span class="absolute -top-0.5 left-0 text-[10px] text-gray-400 tabular-nums pointer-events-none" aria-hidden="true">{{ max.toLocaleString() }}</span>
      <!-- many bars in a narrow chart: a 1px gap so the bars keep some width -->
      <div class="absolute inset-0 pt-3 flex items-end" :class="items.length > 14 ? 'gap-px sm:gap-[2px]' : 'gap-[2px]'" role="list" :aria-label="label">
        <button
          v-for="(it, i) in items"
          :key="it.key ?? it.label"
          type="button"
          role="listitem"
          class="group relative flex-1 h-full flex items-end focus:outline-none"
          :aria-label="`${it.label}: ${it.value.toLocaleString()} ${unit}`"
          @mouseenter="hover = i"
          @focus="hover = i"
          @blur="hover = null"
        >
          <span
            class="block w-full rounded-t-[4px] transition-colors"
            :class="hover === i ? 'bg-indigo-800 dark:bg-indigo-300' : 'bg-indigo-600 dark:bg-indigo-500'"
            :style="{ height: it.value ? `max(3px, ${(it.value / max) * 100}%)` : '0' }"
          ></span>
          <span v-if="!it.value" class="absolute bottom-0 left-0 right-0 h-px bg-gray-200 dark:bg-gray-600" aria-hidden="true"></span>
        </button>
      </div>
      <!-- tooltip -->
      <div
        v-if="hover !== null && items[hover]"
        class="absolute z-10 -translate-x-1/2 -translate-y-full px-2 py-1 rounded-md bg-gray-900 text-white text-[11px] whitespace-nowrap shadow pointer-events-none"
        :style="{ left: `${((hover + 0.5) / items.length) * 100}%`, top: '0px' }"
        role="status"
      >
        <b>{{ items[hover].value.toLocaleString() }}</b> {{ unit }} · {{ items[hover].title ?? items[hover].label }}
      </div>
    </div>
    <!-- axis: first, middle, last -->
    <div class="mt-1 flex justify-between gap-1 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden" aria-hidden="true">
      <span>{{ items[0]?.short ?? items[0]?.label }}</span>
      <span v-if="items.length > 2" class="hidden md:inline">{{ items[Math.floor(items.length / 2)]?.short ?? items[Math.floor(items.length / 2)]?.label }}</span>
      <span>{{ items[items.length - 1]?.short ?? items[items.length - 1]?.label }}</span>
    </div>
    <figcaption v-if="peak" class="mt-1 text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-300 leading-tight">
      Busiest: <b class="text-gray-900 dark:text-white">{{ peak.title ?? peak.label }}</b> · {{ peak.value.toLocaleString() }} {{ unit }}
    </figcaption>
    <details class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
      <summary class="cursor-pointer select-none">Table</summary>
      <table class="mt-1 w-full text-left">
        <thead><tr><th class="font-semibold py-0.5">{{ axisName }}</th><th class="font-semibold py-0.5 text-right">{{ unit }}</th></tr></thead>
        <tbody>
          <tr v-for="it in items" :key="it.key ?? it.label" class="border-t border-gray-100 dark:border-gray-700/60">
            <td class="py-0.5">{{ it.title ?? it.label }}</td><td class="py-0.5 text-right tabular-nums">{{ it.value.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </details>
  </figure>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface ColumnItem { key?: string; label: string; value: number; title?: string; short?: string }

const props = withDefaults(defineProps<{ items: ColumnItem[]; label: string; unit?: string; axisName?: string; height?: number }>(), {
  unit: 'sign-ins',
  axisName: 'When',
  height: 120,
})
const hover = ref<number | null>(null)
const max = computed(() => Math.max(1, ...props.items.map(i => i.value)))
const peak = computed(() => props.items.reduce<ColumnItem | null>((best, it) => (it.value > (best?.value ?? 0) ? it : best), null))
</script>
