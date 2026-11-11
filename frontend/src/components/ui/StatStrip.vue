<template>
  <!-- A row of compact stat tiles (e.g. Total / Draft / Published / Archived). A tile with a `key`
       is a filter: tapping it selects it (v-model), tapping it again clears it. Hidden when every
       value is zero and hideWhenEmpty is set - a row of zeros only adds noise to an empty page. -->
  <div v-if="!(hideWhenEmpty && allZero)" class="grid gap-1.5 sm:gap-2.5" :class="GRID[Math.min(items.length, 6)] || 'grid-cols-2 sm:grid-cols-4'">
    <component
      :is="item.key !== undefined ? 'button' : 'div'"
      v-for="item in items"
      :key="item.label"
      :type="item.key !== undefined ? 'button' : undefined"
      class="stat-card"
      :class="[isActive(item) && 'stat-card-on', item.key !== undefined && 'stat-card-action']"
      :aria-pressed="item.key !== undefined ? isActive(item) : undefined"
      @click="item.key !== undefined && toggle(item.key)"
    >
      <StatCrest :label="item.label" />
      <p class="stat-label">
        <span v-if="DOT[item.tone || 'indigo']" class="stat-dot" :class="DOT[item.tone || 'indigo']" aria-hidden="true"></span>
        <span class="stat-label-text">{{ item.label }}</span>
      </p>
      <p class="stat-num" :class="{ 'stat-num-zero': !nonZero(item.value) }">
        <CountUp :value="item.value" />
      </p>
      <p v-if="item.hint" class="stat-note hidden sm:block truncate">{{ item.hint }}</p>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CountUp from '@/components/common/CountUp.vue'
import StatCrest from '@/components/ui/StatCrest.vue'

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

// The figures stay navy; a dot before the label carries the meaning, and only these tones have one
const DOT: Partial<Record<StatTone, string>> = {
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
}
const GRID: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-3 sm:grid-cols-5',
  6: 'grid-cols-3 sm:grid-cols-6'
}

// "21%" or "1,204" count as numbers; "–" or 0 don't
const nonZero = (v: number | string) => !!parseFloat(String(v).replace(/,/g, ''))
const allZero = computed(() => props.items.every(i => !nonZero(i.value)))
const isActive = (item: StatItem) => item.key !== undefined && props.modelValue === item.key
const toggle = (key: string) => emit('update:modelValue', props.modelValue === key ? null : key)
</script>
