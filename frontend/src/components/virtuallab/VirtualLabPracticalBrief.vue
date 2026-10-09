<template>
  <!-- A practical's written brief - scenario, aim, hypothesis, variables, apparatus, set-up diagram
       (slot "diagram") and procedure - in the same card style as the apparatus strip below it. -->
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3.5 mb-4">
    <div class="flex flex-wrap items-center justify-between gap-2" :class="open ? 'mb-3' : ''">
      <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Practical Brief</p>
      <button type="button" @click="open = !open" class="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">{{ open ? 'Hide brief' : 'Show brief' }}</button>
    </div>

    <template v-if="open">
      <div class="flex flex-wrap gap-1 mb-3">
        <button
          v-for="t in TABS"
          :key="t.key"
          type="button"
          @click="tab = t.key"
          class="px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors"
          :class="tab === t.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >{{ t.label }}</button>
      </div>

      <div class="text-sm text-gray-700 dark:text-gray-200">
        <div v-if="tab === 'scenario'" class="space-y-2">
          <p v-for="(para, i) in scenarioParas" :key="i">{{ para }}</p>
          <div v-if="task" class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-3 mt-1">
            <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-500 dark:text-indigo-400 mb-1">Task</p>
            <p>{{ task }}</p>
          </div>
        </div>

        <div v-else-if="tab === 'aim'" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-3">
            <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-500 dark:text-indigo-400 mb-1">Aim</p>
            <p>{{ aim }}</p>
          </div>
          <div class="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <p class="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">Hypothesis</p>
            <p>{{ hypothesis }}</p>
            <p v-if="hypothesisNote" class="text-xs text-amber-800 dark:text-amber-200 mt-1.5">{{ hypothesisNote }}</p>
          </div>
          <div v-if="theory?.length" class="md:col-span-2 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-3">
            <p class="text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Theory</p>
            <p v-for="(line, i) in theory" :key="i" class="text-sm">{{ line }}</p>
          </div>
        </div>

        <div v-else-if="tab === 'variables'" class="space-y-2">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3"><p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Independent</p><p>{{ variables.independent }}</p></div>
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3"><p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Dependent</p><p>{{ variables.dependent }}</p></div>
            <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3"><p class="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Controlled</p><p>{{ variables.controlled }}</p></div>
          </div>
          <p v-if="variables.note" class="text-xs text-gray-500 dark:text-gray-400">{{ variables.note }}</p>
        </div>

        <ol v-else-if="tab === 'apparatus'" class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 list-decimal list-inside">
          <li v-for="a in apparatus" :key="a">{{ a }}</li>
        </ol>

        <div v-else-if="tab === 'setup'" class="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <div class="lg:col-span-3"><slot name="diagram" /></div>
          <ul class="lg:col-span-2 space-y-1.5 text-sm list-disc list-inside">
            <li v-for="p in setupPoints" :key="p">{{ p }}</li>
          </ul>
        </div>

        <ol v-else-if="tab === 'procedure'" class="space-y-1 list-decimal list-inside">
          <li v-for="p in procedure" :key="p">{{ p }}</li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  introduction?: string | null
  aim: string
  hypothesis: string
  hypothesisNote?: string
  task?: string
  theory?: string[]
  variables: { independent: string; dependent: string; controlled: string; note?: string }
  apparatus: string[]
  setupPoints: string[]
  procedure: string[]
}>()

const TABS = [
  { key: 'scenario', label: 'Scenario' },
  { key: 'aim', label: 'Aim & Hypothesis' },
  { key: 'variables', label: 'Variables' },
  { key: 'apparatus', label: 'Apparatus' },
  { key: 'setup', label: 'Experimental Setup' },
  { key: 'procedure', label: 'Procedure' },
] as const
const tab = ref<(typeof TABS)[number]['key']>('scenario')
const open = ref(true)
const scenarioParas = computed(() => (props.introduction || '').split(/\n+/).map(p => p.trim()).filter(Boolean))
</script>
