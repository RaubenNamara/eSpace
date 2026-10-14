<template>
  <!-- A network cable end being terminated, stage by stage. The tools along the bottom report an
       action to the step runner (using one too early counts as a mistake); untwisting and
       arranging the wires happen on the wires themselves. What is drawn follows the actions the
       runner has accepted, so the scene always matches the step list. -->
  <div class="w-full">
    <div class="flex items-center justify-between gap-2 mb-2">
      <p class="text-xs font-semibold text-gray-600 dark:text-gray-300">
        <template v-if="crossover || cableEnd === 2">End {{ cableEnd }} of 2 · </template>T568{{ standard }}
      </p>
      <p v-if="cableEnd === 2" class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">End 1 done - T568A</p>
    </div>

    <Rj45View3D
      v-if="!no3d"
      :stripped="stage.stripped"
      :untwisted="stage.untwisted"
      :opened="[...opened]"
      :order="drawnOrder"
      :trimmed="stage.trimmed"
      :inserted="stage.inserted"
      :crimped="stage.crimped"
      :lit="lit"
      :crossover="crossover && cableEnd === 2"
      @untwist="untwist"
      @unsupported="no3d = true"
    />
    <svg v-else viewBox="0 0 600 220" class="w-full rounded-xl bg-slate-100 dark:bg-slate-900 select-none" aria-label="Network cable end">
      <!-- the jacket -->
      <rect x="0" y="88" :width="stage.stripped ? 300 : 470" height="44" rx="10" fill="#94a3b8" />
      <text x="24" y="115" font-size="12" fill="#334155" font-weight="700">CAT6</text>
      <rect v-if="stage.crimped" x="286" y="82" width="34" height="56" rx="4" fill="#cbd5e1" opacity=".9" />

      <!-- four twisted pairs, tap to untwist -->
      <template v-if="stage.stripped && !stage.untwisted">
        <g
          v-for="(pair, i) in PAIRS"
          :key="pair.key"
          class="cursor-pointer"
          role="button"
          :aria-label="`${pair.label} pair - tap to untwist`"
          @click="untwist(pair.key)"
        >
          <rect x="300" :y="80 + i * 16" width="190" height="14" fill="transparent" />
          <template v-if="!opened.has(pair.key)">
            <path :d="twist(80 + i * 16 + 7, 0)" :stroke="WIRES[pair.a].stripe || WIRES[pair.a].color" stroke-width="5" fill="none" />
            <path :d="twist(80 + i * 16 + 7, Math.PI)" :stroke="WIRES[pair.b].color" stroke-width="5" fill="none" />
            <path :d="twist(80 + i * 16 + 7, 0)" stroke="#f8fafc" stroke-width="2" stroke-dasharray="6 10" fill="none" />
          </template>
          <template v-else>
            <line x1="300" :y1="80 + i * 16 + 3" x2="480" :y2="80 + i * 16 + 3" :stroke="WIRES[pair.a].stripe!" stroke-width="5" />
            <line x1="300" :y1="80 + i * 16 + 3" x2="480" :y2="80 + i * 16 + 3" stroke="#f8fafc" stroke-width="5" stroke-dasharray="7 7" />
            <line x1="300" :y1="80 + i * 16 + 10" x2="480" :y2="80 + i * 16 + 10" :stroke="WIRES[pair.b].color" stroke-width="5" />
          </template>
        </g>
      </template>

      <!-- eight straight wires: in pairs until arranged, then in the arranged order -->
      <template v-if="stage.untwisted">
        <g v-for="(w, i) in drawnOrder" :key="'w' + i">
          <line x1="300" :y1="74 + i * 10" :x2="wireEnd(i)" :y2="74 + i * 10" :stroke="WIRES[w].stripe || WIRES[w].color" stroke-width="7" />
          <line v-if="WIRES[w].stripe" x1="300" :y1="74 + i * 10" :x2="wireEnd(i)" :y2="74 + i * 10" stroke="#f8fafc" stroke-width="7" stroke-dasharray="8 8" />
        </g>
      </template>

      <!-- the RJ45 connector -->
      <g v-if="stage.inserted">
        <rect x="420" y="60" width="120" height="100" rx="8" fill="#e0f2fe" fill-opacity=".55" stroke="#7dd3fc" stroke-width="2" />
        <rect v-for="i in 8" :key="'pin' + i" x="528" :y="70 + (i - 1) * 10.6" width="10" height="6" :fill="stage.crimped ? '#ca8a04' : '#fde68a'" />
        <path d="M440 160 l40 22 h40 v-22" fill="#bae6fd" stroke="#7dd3fc" stroke-width="2" />
        <text x="480" y="56" font-size="10" fill="#0369a1" font-weight="700" text-anchor="middle">clip facing down</text>
      </g>
    </svg>

    <!-- Arranging: tap a wire, then a slot -->
    <div v-if="stage.untwisted && !stage.arranged" class="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
      <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">Pin 1 is on the left. Tap a wire, then the slot it goes in.</p>
      <div class="grid grid-cols-8 gap-1.5">
        <button
          v-for="(w, i) in slots"
          :key="'slot' + i"
          type="button"
          class="relative h-16 rounded-lg border-2 flex flex-col items-center justify-end pb-1 text-[10px] font-bold transition-colors"
          :class="selected ? 'border-indigo-400 border-dashed' : 'border-gray-300 dark:border-gray-600'"
          :aria-label="`Slot ${i + 1}${w ? ': ' + WIRES[w].name : ''}`"
          @click="place(i)"
        >
          <span v-if="w" class="absolute inset-x-1.5 top-1.5 bottom-5 rounded" :style="wireStyle(w)"></span>
          <span v-else-if="guide" class="absolute inset-x-1.5 top-1.5 bottom-5 rounded opacity-30" :style="wireStyle(STANDARD[standard][i])"></span>
          <span class="text-gray-500 dark:text-gray-400">{{ i + 1 }}</span>
        </button>
      </div>
      <p v-if="guide" class="mt-1.5 text-[10px] text-gray-500 dark:text-gray-400 text-center">The faint colours show T568{{ standard }} - match them.</p>
      <div class="mt-3 flex flex-wrap gap-1.5">
        <button
          v-for="w in pool"
          :key="'pool' + w"
          type="button"
          class="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-lg border text-[11px] font-semibold"
          :class="selected === w ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-100' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'"
          @click="selected = selected === w ? null : w"
        >
          <span class="w-5 h-5 rounded" :style="wireStyle(w)"></span>{{ WIRES[w].name }}
        </button>
        <p v-if="!pool.length" class="text-xs text-gray-500 dark:text-gray-400">All 8 wires are in place - tap a slot to take a wire back out.</p>
      </div>
      <div class="mt-3 flex justify-end">
        <button type="button" class="btn-primary !py-1.5 !text-sm" :disabled="pool.length > 0" @click="check">Check the order</button>
      </div>
    </div>

    <!-- The cable tester -->
    <div v-if="testing || tested" class="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 p-3">
      <p class="text-[11px] font-semibold text-gray-300 mb-2">Cable tester{{ crossover ? ' - crossover' : '' }}</p>
      <div class="grid grid-cols-[3rem_1fr] gap-y-1.5 items-center">
        <span class="text-[10px] text-gray-400">Main</span>
        <div class="grid grid-cols-8 gap-1.5">
          <span v-for="i in 8" :key="'m' + i" class="h-3 rounded-full transition-colors" :class="lit >= i ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-gray-700'"></span>
        </div>
        <span class="text-[10px] text-gray-400">Remote</span>
        <div class="grid grid-cols-8 gap-1.5">
          <span v-for="i in 8" :key="'r' + i" class="h-3 rounded-full transition-colors" :class="remoteLit(i) ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-gray-700'"></span>
        </div>
      </div>
      <p v-if="crossover && tested" class="mt-2 text-[11px] text-emerald-300">Pins 1 and 2 light up opposite 3 and 6 - a crossover cable.</p>
    </div>

    <!-- Choosing which way up the connector goes (not at Simple) -->
    <div v-if="choosingSide" class="mt-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 p-3">
      <p class="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Which way up do you hold the connector?</p>
      <div class="flex gap-2">
        <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="insert('up')">Clip facing up</button>
        <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="insert('down')">Clip facing down</button>
      </div>
    </div>

    <!-- Tools -->
    <div class="mt-3 grid grid-cols-5 gap-1.5">
      <button v-for="t in TOOLS" :key="t.key" type="button" class="relative overflow-hidden flex flex-col items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 text-[11px] font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-400 select-none"
        @click="t.key !== 'crimper' && useTool(t.key)"
        @pointerdown="t.key === 'crimper' && startCrimp()"
        @pointerup="t.key === 'crimper' && stopCrimp()"
        @pointerleave="t.key === 'crimper' && stopCrimp()"
      >
        <span v-if="t.key === 'crimper'" class="absolute inset-x-0 bottom-0 bg-indigo-500/25" :style="{ height: `${crimpFill}%` }"></span>
        <svg class="relative w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path :d="t.icon" /></svg>
        <span class="relative">{{ t.label }}</span>
      </button>
    </div>
    <p class="mt-1 text-[10px] text-gray-500 dark:text-gray-400 text-center">Crimper: press and hold.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import Rj45View3D from './Rj45View3D.vue'
import { WIRES, STANDARD, type IctStep, type WireKey } from './activities'

const props = defineProps<{
  step: IctStep | null
  guide: boolean
  done: string[]
  level: string
}>()
const emit = defineEmits<{ act: [action: string, wrongMessage?: string]; mistake: [message: string] }>()

const PAIRS: { key: string; label: string; a: WireKey; b: WireKey }[] = [
  { key: 'orange', label: 'Orange', a: 'wo', b: 'o' },
  { key: 'green', label: 'Green', a: 'wg', b: 'g' },
  { key: 'blue', label: 'Blue', a: 'wb', b: 'b' },
  { key: 'brown', label: 'Brown', a: 'wbr', b: 'br' }
]
// Each tool's little drawing (24x24 stroke paths)
const TOOLS = [
  { key: 'stripper', label: 'Stripper', icon: 'M6 6a2.5 2.5 0 1 0 0 .01M6 18a2.5 2.5 0 1 0 0 .01M8 7.5L20 16M8 16.5L20 8' },
  { key: 'cutter', label: 'Cutter', icon: 'M4 20l7-7M11 13l2-2 7-7-3 9-4 2zM9 9l2 2' },
  { key: 'connector', label: 'Connector', icon: 'M5 6h14v9H5zM8 6v3M10 6v3M12 6v3M14 6v3M16 6v3M9 15l1.5 3h3L15 15' },
  { key: 'crimper', label: 'Crimper', icon: 'M4 18l6-6M10 12l3-7 6 2-2 5zM14 13l6 6' },
  { key: 'tester', label: 'Tester', icon: 'M4 6h16v12H4zM7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 14h10' }
]

const cableEnd = computed(() => Number(props.step?.data?.end ?? 1))
const standard = computed<'A' | 'B'>(() => ((props.step?.data?.standard as 'A' | 'B') || 'B'))
const crossover = computed(() => !!props.step?.data?.crossover || props.done.includes('crimp-2') || props.level === 'advanced')
const sfx = computed(() => (cableEnd.value === 2 ? '-2' : ''))
const has = (a: string) => props.done.includes(a + sfx.value)
const stage = computed(() => ({
  stripped: has('strip'),
  untwisted: has('untwist'),
  arranged: has('arrange'),
  trimmed: has('trim'),
  inserted: has('insert'),
  crimped: has('crimp')
}))

// ---- untwisting ----
// No WebGL on this device: the flat drawing
const no3d = ref(false)
const opened = ref(new Set<string>())
const untwist = (key: string) => {
  if (opened.value.has(key)) return
  opened.value = new Set([...opened.value, key])
  if (opened.value.size === 4) emit('act', 'untwist' + sfx.value)
}
const twist = (y: number, phase: number) => {
  let d = `M300 ${y + Math.sin(phase) * 4}`
  for (let x = 300; x <= 490; x += 5) d += ` L${x} ${(y + Math.sin(phase + (x - 300) / 9) * 4).toFixed(1)}`
  return d
}

// ---- arranging ----
const slots = ref<(WireKey | null)[]>(Array(8).fill(null))
const selected = ref<WireKey | null>(null)
const ALL: WireKey[] = ['o', 'wbr', 'g', 'wo', 'b', 'br', 'wg', 'wb']
const pool = computed(() => ALL.filter(w => !slots.value.includes(w)))
const place = (i: number) => {
  const there = slots.value[i]
  const next = [...slots.value]
  if (selected.value) {
    next[i] = selected.value
    selected.value = null
  } else if (there) {
    next[i] = null
  }
  slots.value = next
}
const check = () => {
  const want = STANDARD[standard.value]
  const wrong = slots.value.map((w, i) => (w === want[i] ? 0 : i + 1)).filter(Boolean)
  if (!wrong.length) emit('act', 'arrange' + sfx.value)
  else emit('mistake', `Not quite - ${wrong.length === 1 ? 'slot' : 'slots'} ${wrong.join(', ')} ${wrong.length === 1 ? 'is' : 'are'} wrong for T568${standard.value}.`)
}
const wireStyle = (w: WireKey) => {
  const c = WIRES[w]
  return c.stripe
    ? { background: `repeating-linear-gradient(135deg, ${c.color} 0 5px, ${c.stripe} 5px 10px)` }
    : { background: c.color }
}
const drawnOrder = computed<WireKey[]>(() => (stage.value.arranged ? STANDARD[standard.value] : ['wo', 'o', 'wg', 'g', 'wb', 'b', 'wbr', 'br']))
const wireEnd = (i: number) => (stage.value.trimmed ? 528 : 540 + ((i * 37) % 5) * 9)

// Each end starts afresh
watch(cableEnd, () => {
  opened.value = new Set()
  slots.value = Array(8).fill(null)
  selected.value = null
  tested.value = false
})

// ---- tools ----
const choosingSide = ref(false)
const useTool = (key: string) => {
  if (key === 'stripper') emit('act', 'strip' + sfx.value)
  else if (key === 'cutter') emit('act', 'trim' + sfx.value)
  else if (key === 'connector') {
    // At Simple the connector goes on the right way up by itself
    if (props.level === 'simple' || props.step?.action !== 'insert' + sfx.value) emit('act', 'insert' + sfx.value)
    else choosingSide.value = true
  } else if (key === 'tester') runTest()
}
const insert = (side: 'up' | 'down') => {
  choosingSide.value = false
  if (side === 'up') emit('mistake', 'With the clip facing up the colours come out reversed - hold it with the clip facing down, so pin 1 is on the left.')
  else emit('act', 'insert' + sfx.value)
}

let crimpTimer: ReturnType<typeof setInterval> | null = null
const crimpFill = ref(0)
const startCrimp = () => {
  stopCrimp()
  crimpTimer = setInterval(() => {
    crimpFill.value = Math.min(100, crimpFill.value + 10)
    if (crimpFill.value >= 100) {
      stopCrimp()
      emit('act', 'crimp' + sfx.value)
    }
  }, 80)
}
const stopCrimp = () => {
  if (crimpTimer) clearInterval(crimpTimer)
  crimpTimer = null
  crimpFill.value = 0
}

const testing = ref(false)
const tested = ref(false)
const lit = ref(0)
const CROSS: Record<number, number> = { 1: 3, 2: 6, 3: 1, 6: 2 }
const remoteLit = (i: number) => {
  if (!crossover.value) return lit.value >= i
  // pin i on the far end lights when its partner on the near end has lit
  const from = Object.entries(CROSS).find(([, to]) => to === i)?.[0]
  return lit.value >= Number(from ?? i)
}
let testTimer: ReturnType<typeof setInterval> | null = null
const runTest = () => {
  // Only run the lights when testing is the step; otherwise let the runner say "not yet"
  if (props.step?.action !== 'test') {
    emit('act', 'test')
    return
  }
  testing.value = true
  lit.value = 0
  if (testTimer) clearInterval(testTimer)
  testTimer = setInterval(() => {
    lit.value++
    if (lit.value >= 8) {
      if (testTimer) clearInterval(testTimer)
      testing.value = false
      tested.value = true
      setTimeout(() => emit('act', 'test'), 500)
    }
  }, 260)
}

onBeforeUnmount(() => {
  stopCrimp()
  if (testTimer) clearInterval(testTimer)
})
</script>
