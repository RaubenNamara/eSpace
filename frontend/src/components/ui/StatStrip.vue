<template>
  <!-- A row of compact stat tiles (e.g. Total / Draft / Published / Archived). A tile with a `key`
       is a filter: tapping it selects it (v-model), tapping it again clears it. Hidden when every
       value is zero and hideWhenEmpty is set - a row of zeros only adds noise to an empty page. -->
  <div v-if="!(hideWhenEmpty && allZero)" class="grid gap-2 sm:gap-3" :class="GRID[Math.min(items.length, 6)] || 'grid-cols-2 sm:grid-cols-4'">
    <component
      :is="item.key !== undefined ? 'button' : 'div'"
      v-for="item in items"
      :key="item.label"
      :type="item.key !== undefined ? 'button' : undefined"
      class="text-left rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3 transition-all"
      :class="[
        isActive(item) ? ['ring-2', TONE[item.tone || 'indigo'].ring, 'border-transparent bg-white dark:bg-gray-800'] : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
        item.key !== undefined ? 'hover:-translate-y-0.5 hover:shadow-md cursor-pointer' : ''
      ]"
      :aria-pressed="item.key !== undefined ? isActive(item) : undefined"
      @click="item.key !== undefined && toggle(item.key)"
    >
      <p class="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 truncate">{{ item.label }}</p>
      <p class="text-lg sm:text-2xl font-bold leading-tight mt-0.5" :class="nonZero(item.value) ? TONE[item.tone || 'indigo'].value : 'text-gray-300 dark:text-gray-600'">
        <CountUp :value="item.value" />
      </p>
      <p v-if="item.hint" class="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 truncate">{{ item.hint }}</p>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CountUp from '@/components/common/CountUp.vue'

export type StatTone = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose' | 'sky' | 'gray'
export interface StatItem {
  label: string
  value: number | string
  tone?: StatTone
  hint?: string
  // Makes the tile a filter; '' is typically "All"
  key?: string
}

const props = withDefaults(defineProps<{
  items: StatItem[]
  modelValue?: string | null
  hideWhenEmpty?: boolean
}>(), { modelValue: null, hideWhenEmpty: false })
const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

const TONE: Record<StatTone, { value: string; ring: string }> = {
  indigo: { value: 'text-indigo-700 dark:text-indigo-300', ring: 'ring-indigo-400' },
  emerald: { value: 'text-emerald-700 dark:text-emerald-300', ring: 'ring-emerald-400' },
  violet: { value: 'text-violet-700 dark:text-violet-300', ring: 'ring-violet-400' },
  amber: { value: 'text-amber-600 dark:text-amber-300', ring: 'ring-amber-400' },
  rose: { value: 'text-rose-600 dark:text-rose-300', ring: 'ring-rose-400' },
  sky: { value: 'text-sky-700 dark:text-sky-300', ring: 'ring-sky-400' },
  gray: { value: 'text-gray-700 dark:text-gray-200', ring: 'ring-gray-400' }
}
const GRID: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
}

// "21%" or "1,204" count as numbers; "–" or 0 don't
const nonZero = (v: number | string) => !!parseFloat(String(v).replace(/,/g, ''))
const allZero = computed(() => props.items.every(i => !nonZero(i.value)))
const isActive = (item: StatItem) => item.key !== undefined && props.modelValue === item.key
const toggle = (key: string) => emit('update:modelValue', props.modelValue === key ? null : key)
</script>
