<template>
  <!-- An open system unit, side panel off: every part can be tapped. Tapping reports `tap:<part>`
       to the step runner, which decides whether it was the one asked for. With `guide` on, the
       part the step asks for glows. Parts already found carry a green tick. -->
  <div class="w-full">
    <PcCase :attrs="partAttrs" @tap="tap">
      <!-- Ticks on parts already found -->
      <g v-for="k in foundList" :key="'tick-' + k" pointer-events="none">
        <circle :cx="TICK[k][0]" :cy="TICK[k][1]" r="10" fill="#10b981" stroke="#fff" stroke-width="2" />
        <path :d="`M${TICK[k][0] - 4} ${TICK[k][1]}l3 3 5-6`" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </PcCase>

    <!-- What the last part tapped is, and what it does -->
    <div class="mt-3 min-h-[5.5rem] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
      <template v-if="info">
        <p class="text-sm font-bold text-gray-900 dark:text-white">{{ info.name }}</p>
        <p class="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{{ info.does }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><span class="font-semibold">When it fails:</span> {{ info.fails }}</p>
      </template>
      <p v-else class="text-xs text-gray-500 dark:text-gray-400">Tap any part to see what it is and what it does.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PcCase from './PcCase.vue'
import { PC_PARTS, type IctStep, type PcPart } from './activities'

const props = defineProps<{
  step: IctStep | null
  guide: boolean
  // Actions the runner has accepted so far (e.g. 'tap:ram')
  done: string[]
  // Advanced: don't name a part until it has been found (or tapped wrongly)
  hideNames?: boolean
}>()
const emit = defineEmits<{ act: [action: string, wrongMessage?: string] }>()

// Where each part's "found" tick sits
const TICK: Record<string, [number, number]> = {
  optical: [150, 44], hdd: [150, 200], ssd: [140, 296], psu: [446, 34], motherboard: [392, 452], cpu: [252, 150],
  cooler: [336, 144], ram: [384, 140], gpu: [394, 304], cmos: [236, 392], sata: [184, 254], ports: [444, 132], casefan: [450, 274]
}

const found = computed(() => new Set(props.done.filter(a => a.startsWith('tap:')).map(a => a.slice(4))))
const foundList = computed(() => [...found.value].filter(k => TICK[k]))
const target = computed(() => (props.step?.data?.target as string | undefined) || null)

const last = ref<string | null>(null)
const info = computed<PcPart | null>(() => (last.value ? PC_PARTS[last.value] : null))

const partAttrs = (key: string) => ({
  class: ['pc-part', { 'pc-glow': props.guide && target.value === key, 'pc-found': found.value.has(key) }],
  role: 'button',
  tabindex: 0,
  'aria-label': props.hideNames && !found.value.has(key) ? 'A part' : PC_PARTS[key].name
})

const tap = (key: string) => {
  last.value = key
  const part = PC_PARTS[key]
  emit('act', `tap:${key}`, `That is the ${part.name.replace(/ \(.*\)$/, '').toLowerCase()} - not the one asked for.`)
}
</script>
