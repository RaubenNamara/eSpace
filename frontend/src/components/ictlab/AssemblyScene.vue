<template>
  <!-- Building a computer in the open case. Parts come from the tray: pick one, then tap where it
       goes (a dashed outline). Cables are connected by tapping their connector on the board, and
       the tools along the bottom do everything else. Everything reports an action to the step
       runner, which decides whether it is right now - the drawing follows what it accepted. -->
  <div class="w-full">
    <!-- Safety state -->
    <div class="flex flex-wrap gap-1.5 mb-2 text-[11px] font-semibold">
      <span class="px-2 py-0.5 rounded-full" :class="powered ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : pluggedIn ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200'">
        {{ powered ? 'Switched on' : pluggedIn ? 'Mains: plugged in' : 'Mains: unplugged' }}
      </span>
      <span class="px-2 py-0.5 rounded-full" :class="has('strap') ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200'">
        Wrist strap: {{ has('strap') ? 'on' : 'off' }}
      </span>
    </div>

    <PcCase :show="inCase" :spinning="powered || booting">
      <!-- Mains cable into the power supply -->
      <path v-if="pluggedIn && placed('psu')" d="M452 72 C 470 72, 470 40, 478 34" stroke="#0f172a" stroke-width="7" fill="none" stroke-linecap="round" />

      <!-- Where the missing parts go -->
      <g
        v-for="z in emptyZones"
        :key="'zone-' + z.key"
        class="asm-zone"
        :class="{ 'asm-glow': glowZone === z.key, 'asm-ready': selected === z.key }"
        role="button"
        tabindex="0"
        :aria-label="`Place for the ${z.name}`"
        @click="placeAt(z.key)"
        @keydown.enter="placeAt(z.key)"
      >
        <rect :x="z.x" :y="z.y" :width="z.w" :height="z.h" rx="6" fill="#ffffff" fill-opacity=".04" stroke="#94a3b8" stroke-width="2" stroke-dasharray="7 6" />
        <text :x="z.x + z.w / 2" :y="z.y + z.h / 2 + 4" font-size="11" fill="#cbd5e1" font-weight="700" text-anchor="middle">{{ z.label }}</text>
      </g>

      <!-- Thermal paste on the processor, before the cooler -->
      <circle v-if="has('paste') && placed('cpu')" cx="225" cy="177" r="7" fill="#e5e7eb" stroke="#9ca3af" />

      <!-- Cables once connected -->
      <path v-if="has('connect:cpu_fan')" d="M300 208 C 300 216, 292 220, 283 226" stroke="#111827" stroke-width="3" fill="none" />
      <path v-if="has('connect:atx24')" d="M398 116 L399 290 C 400 330, 397 360, 392 378" stroke="#f59e0b" stroke-width="9" fill="none" stroke-dasharray="3 3" stroke-linecap="round" />
      <path v-if="has('connect:fpanel')" d="M24 452 C 120 470, 230 468, 290 452" stroke="#a855f7" stroke-width="3" fill="none" />

      <!-- Connectors to tap -->
      <g
        v-for="c in connectors"
        :key="'con-' + c.key"
        class="asm-zone"
        :class="{ 'asm-glow': glowConnector === c.key, 'asm-done': has('connect:' + c.key) }"
        role="button"
        tabindex="0"
        :aria-label="`${c.label} connector`"
        @click="connect(c.key)"
        @keydown.enter="connect(c.key)"
      >
        <rect :x="c.x - 4" :y="c.y - 4" :width="c.w + 8" :height="c.h + 8" fill="transparent" />
        <rect :x="c.x" :y="c.y" :width="c.w" :height="c.h" rx="2" :fill="has('connect:' + c.key) ? '#10b981' : '#facc15'" />
        <text :x="c.tx" :y="c.ty" font-size="8" fill="#fef9c3" font-weight="800" :text-anchor="c.anchor">{{ c.label }}</text>
      </g>

      <!-- The side panel back on -->
      <g v-if="has('close')" pointer-events="none">
        <rect x="18" y="18" width="444" height="484" rx="10" fill="#334155" fill-opacity=".93" />
        <path v-for="i in 6" :key="'vent' + i" :d="`M300 ${70 + i * 14}h120`" stroke="#1e293b" stroke-width="5" stroke-linecap="round" />
        <text x="240" y="270" font-size="16" fill="#cbd5e1" font-weight="700" text-anchor="middle">Side panel on</text>
      </g>
    </PcCase>

    <!-- The parts tray -->
    <div v-if="tray.length" class="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
      <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">
        {{ selected ? `Now tap where the ${nameOf(selected).toLowerCase()} goes.` : 'Parts tray - pick a part, then tap where it goes.' }}
      </p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="p in tray"
          :key="p.key"
          type="button"
          class="px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors"
          :class="[
            selected === p.key ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-100' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400',
            glowTray === p.key ? 'asm-glow-btn' : ''
          ]"
          @click="selected = selected === p.key ? null : p.key"
        >{{ p.name }}</button>
      </div>
      <p v-if="note" class="mt-2 text-[11px] text-gray-500 dark:text-gray-400">{{ note }}</p>
    </div>

    <!-- A question about doing it the right way -->
    <div v-if="asking" class="mt-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 p-3">
      <p class="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-2">{{ QUESTIONS[asking].q }}</p>
      <div class="flex flex-col sm:flex-row gap-2">
        <button v-for="(o, i) in QUESTIONS[asking].options" :key="i" type="button" class="btn-secondary !py-1.5 !text-sm text-left" @click="answer(o)">{{ o.text }}</button>
      </div>
    </div>

    <!-- Switching on -->
    <div v-if="booting || powered" class="mt-3 rounded-xl bg-black p-3 font-mono text-[11px] leading-relaxed text-emerald-300 min-h-[8rem]">
      <p v-for="(line, i) in bootLines.slice(0, bootShown)" :key="i">{{ line }}</p>
    </div>

    <!-- Tools -->
    <div class="mt-3 grid grid-cols-5 gap-1.5">
      <button
        v-for="t in TOOLS"
        :key="t.key"
        type="button"
        class="flex flex-col items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 text-[11px] font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-400"
        :class="glowTool === t.key ? 'asm-glow-btn' : ''"
        @click="useTool(t.key)"
      >
        <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path :d="t.icon" /></svg>
        <span class="text-center leading-tight">{{ t.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import PcCase from './PcCase.vue'
import { ASSEMBLY_PARTS, type IctStep } from './activities'

const props = defineProps<{
  step: IctStep | null
  guide: boolean
  // Actions accepted so far, including the level's preset ones
  done: string[]
  level: string
}>()
const emit = defineEmits<{ act: [action: string, wrongMessage?: string]; mistake: [message: string] }>()

const has = (a: string) => props.done.includes(a)
const placed = (part: string) => has('place:' + part)
const nameOf = (key: string) => ASSEMBLY_PARTS.find(p => p.key === key)?.name || key

// Plugged in at the start (it has to be unplugged first) and again once plugged back in
const pluggedIn = computed(() => !has('unplug') || has('plug'))
const powered = computed(() => has('power'))

// What is in the case: the fixed parts, and whatever has been fitted
const inCase = computed(() => {
  const list = ['optical', 'casefan']
  for (const p of ASSEMBLY_PARTS) if (placed(p.key)) list.push(p.key)
  if (placed('motherboard')) list.push('cmos', 'ports')
  if (has('connect:sata')) list.push('sata')
  return list
})

// Where each part goes - parts that sit on the motherboard only once it is in
const ZONES: Record<string, { x: number; y: number; w: number; h: number; label: string; onBoard?: boolean }> = {
  motherboard: { x: 176, y: 126, w: 222, h: 340, label: 'Motherboard' },
  psu: { x: 176, y: 28, w: 276, h: 88, label: 'Power supply' },
  hdd: { x: 36, y: 196, w: 118, h: 74, label: 'Drive bay' },
  cpu: { x: 194, y: 146, w: 62, h: 62, label: 'CPU', onBoard: true },
  cooler: { x: 264, y: 140, w: 76, h: 76, label: 'Cooler', onBoard: true },
  ram: { x: 348, y: 134, w: 36, h: 132, label: 'RAM', onBoard: true },
  gpu: { x: 186, y: 300, w: 214, h: 56, label: 'PCIe slot', onBoard: true }
}
const emptyZones = computed(() => {
  if (has('close')) return []
  return ASSEMBLY_PARTS
    .filter(p => !placed(p.key) && (!ZONES[p.key].onBoard || placed('motherboard')))
    .map(p => ({ key: p.key, name: p.name, ...ZONES[p.key] }))
})
const tray = computed(() => (has('close') ? [] : ASSEMBLY_PARTS.filter(p => !placed(p.key))))

// Connectors on the board, shown once what they belong to is in
const connectors = computed(() => {
  if (has('close') || !placed('motherboard')) return []
  const list: { key: string; label: string; x: number; y: number; w: number; h: number; tx: number; ty: number; anchor: string }[] = []
  if (placed('cooler')) list.push({ key: 'cpu_fan', label: 'CPU_FAN', x: 270, y: 222, w: 16, h: 8, tx: 290, ty: 230, anchor: 'start' })
  list.push({ key: 'atx24', label: '24-PIN', x: 384, y: 366, w: 10, h: 30, tx: 380, ty: 386, anchor: 'end' })
  list.push({ key: 'sata', label: 'SATA', x: 196, y: 262, w: 22, h: 12, tx: 222, ty: 284, anchor: 'start' })
  if (props.level === 'advanced') list.push({ key: 'fpanel', label: 'F_PANEL', x: 272, y: 444, w: 36, h: 8, tx: 312, ty: 452, anchor: 'start' })
  return list
})

// ---- what glows at Simple ----
const want = computed(() => props.step?.action || '')
const glowTray = computed(() => (props.guide && want.value.startsWith('place:') && !selected.value ? want.value.slice(6) : null))
const glowZone = computed(() => (props.guide && want.value.startsWith('place:') ? want.value.slice(6) : null))
const glowConnector = computed(() => (props.guide && want.value.startsWith('connect:') ? want.value.slice(8) : null))
const glowTool = computed(() => {
  if (!props.guide) return null
  const map: Record<string, string> = { unplug: 'mains', plug: 'mains', strap: 'strap', paste: 'paste', close: 'panel', power: 'power' }
  return map[want.value] || null
})

// ---- fitting parts ----
const selected = ref<string | null>(null)
const note = ref('')
const placeAt = (zone: string) => {
  if (!selected.value) {
    note.value = 'Pick a part from the tray first.'
    return
  }
  note.value = ''
  const part = selected.value
  if (part !== zone) {
    emit('mistake', `The ${nameOf(part).toLowerCase()} does not go there - that is the place for the ${nameOf(zone).toLowerCase()}.`)
    return
  }
  selected.value = null
  const ask = props.step?.action === 'place:' + part ? (props.step?.data?.ask as string | undefined) : undefined
  if (ask) asking.value = ask
  else emit('act', 'place:' + part)
}
const connect = (key: string) => emit('act', 'connect:' + key)

// ---- doing it the right way ----
interface Option { text: string; ok: boolean; why?: string }
const QUESTIONS: Record<string, { q: string; action: string; options: Option[] }> = {
  cpu: {
    q: 'How do you line the processor up in the socket?',
    action: 'place:cpu',
    options: [
      { text: 'Any way round - press it in firmly', ok: false, why: 'Forcing a processor in the wrong way bends the pins in the socket. Match the gold triangle on the processor to the one on the socket, and never press.' },
      { text: 'Gold triangle to the triangle on the socket, then lower it in', ok: true }
    ]
  },
  ram: {
    q: 'How do you fit the RAM stick?',
    action: 'place:ram',
    options: [
      { text: 'Line the notch up with the bump in the slot, press both ends until the clips click', ok: true },
      { text: 'Push it in hard either way round', ok: false, why: 'RAM only fits one way - if the notch does not line up, the stick and the slot get damaged.' }
    ]
  },
  paste: {
    q: 'How much thermal paste?',
    action: 'paste',
    options: [
      { text: 'Cover the whole processor in a thick layer', ok: false, why: 'Too much paste spills over the socket and makes cooling worse - a small pea-sized dot is enough, the cooler spreads it.' },
      { text: 'A small pea-sized dot in the middle', ok: true }
    ]
  }
}
const asking = ref<string | null>(null)
const answer = (o: Option) => {
  const q = asking.value ? QUESTIONS[asking.value] : null
  asking.value = null
  if (!q) return
  if (o.ok) emit('act', q.action)
  else emit('mistake', o.why || 'Not the right way - try again.')
}

// ---- tools ----
const TOOLS = [
  { key: 'mains', label: 'Mains cable', icon: 'M8 4v5M16 4v5M6 9h12v3a6 6 0 01-12 0zM12 18v3' },
  { key: 'strap', label: 'Wrist strap', icon: 'M7 7a5 5 0 1010 0M7 7v4a5 5 0 0010 0V7M12 16v5h6' },
  { key: 'paste', label: 'Thermal paste', icon: 'M9 3h6v4l2 3v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9l2-3zM10 13h4' },
  { key: 'panel', label: 'Side panel', icon: 'M5 3h14v18H5zM9 7h6M9 10h6M9 13h6' },
  { key: 'power', label: 'Power button', icon: 'M12 3v8M7.5 6.5a7 7 0 109 0' }
]
const useTool = (key: string) => {
  if (key === 'mains') emit('act', has('unplug') ? 'plug' : 'unplug')
  else if (key === 'strap') emit('act', 'strap')
  else if (key === 'panel') emit('act', 'close')
  else if (key === 'paste') {
    if (props.step?.action === 'paste' && props.step.data?.ask === 'paste') asking.value = 'paste'
    else emit('act', 'paste')
  } else if (key === 'power') switchOn()
}

// ---- switching on ----
const booting = ref(false)
const bootShown = ref(0)
const bootLines = computed(() => [
  'eSpace PC  BIOS v1.0',
  'Processor ........ OK',
  'Memory 8192 MB ... OK',
  'Graphics ......... OK',
  'Drive: HDD 1TB ... found',
  '* one short beep - all good *',
  'Starting the operating system...'
])
let bootTimer: ReturnType<typeof setInterval> | null = null
const switchOn = () => {
  // Only boot when switching on is the step; otherwise let the runner say why not
  if (props.step?.action !== 'power') {
    emit('act', 'power')
    return
  }
  booting.value = true
  bootShown.value = 0
  if (bootTimer) clearInterval(bootTimer)
  bootTimer = setInterval(() => {
    bootShown.value++
    if (bootShown.value >= bootLines.value.length) {
      if (bootTimer) clearInterval(bootTimer)
      setTimeout(() => {
        booting.value = false
        emit('act', 'power')
      }, 600)
    }
  }, 380)
}
onBeforeUnmount(() => { if (bootTimer) clearInterval(bootTimer) })
</script>

<style scoped>
.asm-zone {
  cursor: pointer;
  outline: none;
}
.asm-zone:hover rect,
.asm-zone:focus-visible rect {
  filter: brightness(1.4);
}
.asm-ready rect {
  stroke: #818cf8;
}
.asm-done {
  pointer-events: none;
}
.asm-glow {
  animation: asm-glow 1.4s ease-in-out infinite;
}
@keyframes asm-glow {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(250, 204, 21, 0.6)); }
  50% { filter: drop-shadow(0 0 12px rgba(250, 204, 21, 1)); }
}
.asm-glow-btn {
  box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.55);
  animation: asm-glow-btn 1.4s ease-in-out infinite;
}
@keyframes asm-glow-btn {
  50% { box-shadow: 0 0 0 5px rgba(250, 204, 21, 0.25); }
}
@media (prefers-reduced-motion: reduce) {
  .asm-glow, .asm-glow-btn { animation: none; }
}
</style>
