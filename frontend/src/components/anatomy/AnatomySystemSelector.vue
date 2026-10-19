<template>
  <!-- min-w-0: a fieldset otherwise refuses to shrink below its content and spills sideways -->
  <fieldset class="min-w-0">
    <legend class="sr-only">Body systems</legend>
    <p class="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400" aria-hidden="true">Body systems</p>
    <!-- quick views -->
    <div class="grid grid-cols-4 gap-1 mb-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-900/60" role="group" aria-label="Quick views">
      <button
        v-for="p in PRESETS"
        :key="p.label"
        type="button"
        class="py-1 rounded-md text-[11px] font-semibold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        @click="applyPreset(p.systems)"
      >{{ p.label }}</button>
    </div>

    <ul class="divide-y divide-gray-100 dark:divide-gray-700/60">
      <li v-for="s in SYSTEMS" :key="s.key" class="py-0.5">
        <div
          class="flex items-center gap-1 rounded-lg pl-2 pr-1 min-h-[2.25rem]"
          :class="[availability(s.key) === 'missing' ? 'opacity-50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40', modelValue.includes(s.key) ? 'bg-indigo-50/70 dark:bg-indigo-900/20' : '']"
        >
          <label class="flex items-center gap-2 flex-1 min-w-0 cursor-pointer py-1.5" :title="s.name">
            <input
              type="checkbox"
              class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              :checked="modelValue.includes(s.key)"
              :disabled="availability(s.key) === 'missing'"
              :aria-describedby="`sys-note-${s.key}`"
              @change="toggle(s.key, ($event.target as HTMLInputElement).checked)"
            />
            <span class="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-black/10" :style="{ background: s.colour }" aria-hidden="true"></span>
            <span class="truncate text-sm text-gray-800 dark:text-gray-100" :class="modelValue.includes(s.key) ? 'font-semibold' : ''">{{ SHORT[s.key] }}</span>
            <span v-if="state(s.key) === 'loading'" class="flex-shrink-0 w-3 h-3 rounded-full border-2 border-indigo-300 border-t-indigo-600 animate-spin" aria-label="loading"></span>
            <span v-else-if="state(s.key) === 'error'" class="flex-shrink-0 text-[10px] font-semibold text-red-600">failed</span>
          </label>
          <button
            v-if="state(s.key) === 'error'"
            type="button"
            class="flex-shrink-0 px-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 underline"
            @click="$emit('retry', s.key)"
          >Retry</button>
          <template v-if="availability(s.key) === 'available'">
            <button
              v-if="s.gaps"
              type="button"
              class="flex-shrink-0 w-7 h-7 rounded-md text-gray-400 hover:text-indigo-700 hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              :aria-expanded="openNote === s.key"
              :aria-label="`What the ${SHORT[s.key].toLowerCase()} model includes`"
              title="What this model includes"
              @click="openNote = openNote === s.key ? null : s.key"
            >
              <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke-width="2" /><path stroke-linecap="round" stroke-width="2" d="M12 11v5M12 8h.01" /></svg>
            </button>
            <button
              v-if="!s.sensitive"
              type="button"
              class="flex-shrink-0 w-7 h-7 rounded-md text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              :aria-label="`See the ${SHORT[s.key].toLowerCase()} working`"
              title="See it working"
              @click="$emit('watch', s.key)"
            >
              <svg class="w-3.5 h-3.5 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
            </button>
            <RouterLink
              :to="`/${role}/anatomy/systems/${s.key}`"
              class="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-indigo-700 hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              :aria-label="`${s.name} on its own, step by step`"
              title="Open on its own, step by step"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5h5v5M19 5l-8 8M10 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-4" /></svg>
            </RouterLink>
          </template>
        </div>
        <p
          :id="`sys-note-${s.key}`"
          class="text-[11px] leading-snug text-gray-500 dark:text-gray-400"
          :class="(availability(s.key) === 'missing' || openNote === s.key) ? 'pl-8 pr-2 pb-1.5' : 'sr-only'"
        >
          <template v-if="availability(s.key) === 'missing'">Not available: no anatomical model for this system is installed.</template>
          <template v-else-if="s.gaps">{{ s.gaps }}</template>
        </p>
        <!-- age-appropriate content: reproductive organs stay hidden until this is ticked -->
        <label v-if="s.sensitive && modelValue.includes(s.key)" class="ml-8 mb-1.5 flex items-start gap-2 text-[11px] text-gray-600 dark:text-gray-300">
          <input type="checkbox" class="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="showSensitive" @change="$emit('update:showSensitive', ($event.target as HTMLInputElement).checked)" />
          <span>Show the reproductive organs (reproduction lessons, upper secondary).</span>
        </label>
        <div v-if="s.sensitive && modelValue.includes(s.key) && showSensitive" class="ml-8 mb-2 mr-1">
          <div class="grid grid-cols-2 gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-900/60" role="radiogroup" aria-label="Which reproductive organs">
            <button
              v-for="o in SEXES"
              :key="o.key"
              type="button"
              role="radio"
              :aria-checked="reproSex === o.key"
              class="py-1 rounded-md text-[11px] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              :class="reproSex === o.key ? 'bg-white dark:bg-gray-700 text-indigo-700 dark:text-indigo-200 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-white/60'"
              @click="$emit('update:reproSex', o.key)"
            >{{ o.label }}</button>
          </div>
          <p v-if="reproSex === 'female'" class="mt-1 text-[10px] leading-snug text-gray-500 dark:text-gray-400">
            Female organs from a female body (Human Reference Atlas), placed in this model's pelvis - positions are approximate.
          </p>
        </div>
      </li>
    </ul>
  </fieldset>
</template>

<script setup lang="ts">
import type { AnatomyManifest, LoadState, ReproSex, SystemKey } from '@/anatomy/types'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { SYSTEMS, systemAvailability } from '@/anatomy/systems'
import { labRoleOf } from '@/components/ictlab/types'

const props = defineProps<{
  modelValue: SystemKey[]
  manifest: AnatomyManifest | null
  states: Partial<Record<SystemKey, LoadState>>
  showSensitive: boolean
  reproSex?: ReproSex
}>()
const emit = defineEmits<{ 'update:modelValue': [SystemKey[]]; 'update:showSensitive': [boolean]; 'update:reproSex': [ReproSex]; retry: [SystemKey]; watch: [SystemKey] }>()
const SEXES: { key: ReproSex; label: string }[] = [{ key: 'female', label: 'Female' }, { key: 'male', label: 'Male' }]

const route = useRoute()
// outside a router (unit tests) the link falls back to the student path
const role = computed(() => labRoleOf(route?.path ?? '/student'))

const PRESETS: { label: string; systems: SystemKey[] }[] = [
  { label: 'Skin', systems: ['integumentary'] },
  { label: 'Skeleton', systems: ['skeletal'] },
  { label: 'Muscles', systems: ['skeletal', 'muscular'] },
  { label: 'Organs', systems: ['skeletal', 'circulatory', 'respiratory', 'digestive', 'urinary', 'nervous'] },
]

/** short, everyday names for the list (the full name is in the tooltip) */
const SHORT: Record<SystemKey, string> = {
  integumentary: 'Skin', skeletal: 'Skeleton', muscular: 'Muscles', circulatory: 'Heart & blood', respiratory: 'Lungs & airways',
  digestive: 'Digestion', nervous: 'Brain & nerves', urinary: 'Kidneys & bladder', reproductive: 'Reproductive organs', endocrine: 'Hormone glands',
}
const openNote = ref<SystemKey | null>(null)

const availability = (k: SystemKey) => systemAvailability(props.manifest, k)
const state = (k: SystemKey) => props.states[k]?.status ?? 'idle'

function toggle(k: SystemKey, on: boolean) {
  const next = props.modelValue.filter(s => s !== k)
  if (on) next.push(k)
  emit('update:modelValue', next)
}
function applyPreset(systems: SystemKey[]) {
  emit('update:modelValue', systems.filter(s => availability(s) === 'available'))
}
</script>
