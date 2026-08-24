<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
    <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="w-full h-full select-none" ref="svgEl" @pointermove="onSvgPointerMove" @pointerup="onSvgPointerUp" @pointerleave="onSvgPointerUp">
      <line :x1="0" :y1="BENCH_Y" :x2="VB_W" :y2="BENCH_Y" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2" />

      <!-- Burette stand -->
      <g v-if="isPlaced('burette1')" class="text-gray-500 dark:text-gray-400">
        <rect :x="BURETTE_X - 8" :y="BENCH_Y - 10" width="16" height="10" fill="currentColor" />
        <rect :x="BURETTE_X - 5" :y="BURETTE_TOP_Y" :height="BENCH_Y - BURETTE_TOP_Y" width="10" fill="currentColor" />
        <rect :x="BURETTE_X - 5" :y="BURETTE_TOP_Y - 4" width="34" height="10" rx="2" fill="currentColor" />
      </g>

      <!-- Burette -->
      <g v-if="isPlaced('burette1')" class="cursor-grab active:cursor-grabbing" @pointerdown="onItemPointerDown('burette1', $event)">
        <rect :x="BURETTE_X - 10" :y="BURETTE_TOP_Y" width="20" :height="BURETTE_BOTTOM_Y - BURETTE_TOP_Y" rx="3" fill="#eef6ff" fill-opacity="0.5" :stroke="selectedKey === 'burette1' ? '#4f46e5' : '#94a3b8'" :stroke-width="selectedKey === 'burette1' ? 3 : 1.5" />
        <!-- Liquid - fills from the tap upward, real tracked remaining volume -->
        <rect :x="BURETTE_X - 8" :y="BURETTE_TOP_Y + (currentPhysicalReadingMl / buretteCapacityMl) * (BURETTE_BOTTOM_Y - BURETTE_TOP_Y)" width="16" :height="(BURETTE_BOTTOM_Y - BURETTE_TOP_Y) * (1 - currentPhysicalReadingMl / buretteCapacityMl)" fill="#38bdf8" fill-opacity="0.65" />
        <!-- Graduation scale - 0.00ml at the top, increasing downward, a real fixed scale. -->
        <g v-for="t in buretteTicks" :key="t.ml">
          <line :x1="BURETTE_X + 10" :y1="BURETTE_TOP_Y + t.px" :x2="BURETTE_X + 10 + (t.major ? 9 : 5)" :y2="BURETTE_TOP_Y + t.px" stroke="#1e293b" stroke-width="1" />
          <text v-if="t.major" :x="BURETTE_X + 22" :y="BURETTE_TOP_Y + t.px + 3" class="fill-slate-700 text-[8px] font-semibold">{{ t.ml }}</text>
        </g>
        <!-- Meniscus marker -->
        <line :x1="BURETTE_X - 12" :y1="BURETTE_TOP_Y + (currentPhysicalReadingMl / buretteCapacityMl) * (BURETTE_BOTTOM_Y - BURETTE_TOP_Y)" :x2="BURETTE_X + 12" :y2="BURETTE_TOP_Y + (currentPhysicalReadingMl / buretteCapacityMl) * (BURETTE_BOTTOM_Y - BURETTE_TOP_Y)" stroke="#dc2626" stroke-width="1.5" />
        <!-- Tap -->
        <rect :x="BURETTE_X - 12" :y="BURETTE_BOTTOM_Y" width="24" height="10" rx="2" fill="#334155" />
        <line :x1="BURETTE_X" :y1="BURETTE_BOTTOM_Y + 5" :x2="BURETTE_X + (tapRate > 0 ? 16 : 0)" :y2="BURETTE_BOTTOM_Y + (tapRate > 0 ? -3 : -12)" stroke="#0f172a" stroke-width="3" stroke-linecap="round" />
        <!-- Drops falling while flowing -->
        <circle v-if="tapRate > 0" :cx="BURETTE_X" :cy="dropAnimY" r="2.5" fill="#38bdf8" />
      </g>

      <!-- White tile under the flask -->
      <rect v-if="isPlaced('flask1')" :x="FLASK_X - 45" :y="BENCH_Y - 8" width="90" height="8" rx="2" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />

      <!-- Conical flask -->
      <g v-if="isPlaced('flask1')" class="cursor-grab active:cursor-grabbing" @pointerdown="onItemPointerDown('flask1', $event)" :style="{ transform: swirlAngle ? `rotate(${swirlAngle}deg)` : undefined, transformOrigin: `${FLASK_X}px ${BENCH_Y - 6}px` }">
        <polygon :points="`${FLASK_X - 6},${FLASK_TOP_Y} ${FLASK_X + 6},${FLASK_TOP_Y} ${FLASK_X + 32},${BENCH_Y - 6} ${FLASK_X - 32},${BENCH_Y - 6}`" fill="#eef6ff" fill-opacity="0.4" :stroke="selectedKey === 'flask1' ? '#4f46e5' : '#94a3b8'" :stroke-width="selectedKey === 'flask1' ? 3 : 1.5" />
        <polygon v-if="totalFlaskVolume > 0" :points="flaskLiquidPoints" :fill="flaskColorFill" />
      </g>

      <!-- Indicator dropper - a free, real interaction; the flask's colour never responds until
           it's actually been used. -->
      <g v-if="isPlaced('flask1')" class="cursor-pointer" @click="addIndicator">
        <rect :x="FLASK_X + 55" :y="FLASK_TOP_Y + 10" width="10" height="26" rx="3" fill="#a78bfa" :stroke="indicatorAdded ? '#4f46e5' : '#7c3aed'" stroke-width="1.5" />
        <circle :cx="FLASK_X + 60" :cy="FLASK_TOP_Y + 44" r="4" fill="#a78bfa" />
        <text :x="FLASK_X + 60" :y="FLASK_TOP_Y + 60" text-anchor="middle" class="fill-gray-500 dark:fill-gray-400 text-[9px] font-semibold">Indicator</text>
      </g>

      <!-- Pipette -->
      <g v-if="isPlaced('pipette1')" class="cursor-grab active:cursor-grabbing" @pointerdown="onItemPointerDown('pipette1', $event)">
        <ellipse :cx="PIPETTE_X" :cy="PIPETTE_TOP_Y - 8" rx="9" ry="12" fill="#dc2626" fill-opacity="0.85" />
        <rect :x="PIPETTE_X - 4" :y="PIPETTE_TOP_Y" width="8" :height="PIPETTE_BOTTOM_Y - PIPETTE_TOP_Y" fill="#eef6ff" fill-opacity="0.4" :stroke="selectedKey === 'pipette1' ? '#4f46e5' : '#94a3b8'" :stroke-width="selectedKey === 'pipette1' ? 3 : 1.5" />
        <rect :x="PIPETTE_X - 3" :y="PIPETTE_TOP_Y + (PIPETTE_BOTTOM_Y - PIPETTE_TOP_Y) * (1 - pipetteFilledMl / PIPETTE_CAPACITY_ML)" width="6" :height="(PIPETTE_BOTTOM_Y - PIPETTE_TOP_Y) * (pipetteFilledMl / PIPETTE_CAPACITY_ML)" fill="#f9a8d4" />
        <text :x="PIPETTE_X" :y="PIPETTE_BOTTOM_Y + 16" text-anchor="middle" class="fill-gray-500 dark:fill-gray-400 text-[9px] font-semibold">{{ PIPETTE_CAPACITY_ML.toFixed(1) }}ml calibrated</text>
      </g>

      <!-- Live pour-amount slider (pipette -> flask) -->
      <foreignObject v-if="pourArmed" :x="FLASK_X - 90" :y="240" width="180" height="70">
        <div class="bg-white/95 dark:bg-gray-800/95 rounded-xl shadow p-2 text-center">
          <p class="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Pour: {{ pourAmount.toFixed(1) }} ml</p>
          <input v-model.number="pourAmount" type="range" min="0" :max="pourMax" step="0.5" class="w-full accent-indigo-600">
          <button @click="confirmPour" class="mt-1 px-2 py-1 text-[11px] font-semibold rounded-lg bg-emerald-600 text-white">Pour</button>
        </div>
      </foreignObject>
    </svg>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F9EA}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Selection panel -->
    <div v-if="selectedKey" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[14rem]">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{{ catalogFor(selectedType || '')?.display_name || selectedKey }}</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-2">
        <LabButton v-if="selectedType === 'burette'" size="sm" :disabled="props.readOnly" @click="inspectBurette">Inspect</LabButton>
        <LabButton v-if="selectedType === 'burette' && !pendingReading" size="sm" :disabled="props.readOnly" @click="armBuretteMeasure">Read Burette</LabButton>
        <LabButton v-if="selectedType === 'pipette' && !pendingReading" size="sm" :disabled="props.readOnly" @click="armPipetteMeasure">Measure</LabButton>
        <LabButton v-if="selectedType === 'pipette'" size="sm" variant="secondary" :disabled="props.readOnly || pipetteFilledMl <= 0 || !isPlaced('flask1')" @click="beginPourToFlask">Pour into Flask</LabButton>
        <LabButton v-if="selectedKey === 'flask1'" size="sm" :disabled="props.readOnly" @click="inspectFlask">Inspect</LabButton>
        <LabButton v-if="selectedKey === 'flask1'" size="sm" variant="secondary" :disabled="props.readOnly || totalFlaskVolume <= 0" @click="swirlFlask">Swirl</LabButton>
      </div>

      <div v-if="selectedKey === 'pipette1'" class="mb-2">
        <p class="text-[11px] text-gray-500 dark:text-gray-400">Filled: {{ pipetteFilledMl.toFixed(1) }} / {{ PIPETTE_CAPACITY_ML.toFixed(1) }} ml</p>
      </div>

      <div v-if="measureSliderOpen" class="mb-2">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Fill to: {{ measureSliderValue.toFixed(1) }} ml</p>
        <input v-model.number="measureSliderValue" type="range" min="0" :max="PIPETTE_CAPACITY_ML" step="0.5" class="w-full accent-indigo-600">
        <LabButton size="sm" variant="success" class="mt-1.5 w-full" @click="confirmPipetteFill">Record</LabButton>
      </div>

      <div v-if="selectedKey === 'burette1'" class="space-y-2 mb-2">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Tap</p>
        <div class="grid grid-cols-4 gap-1">
          <LabButton size="sm" :variant="tapRate === 0 ? 'primary' : 'secondary'" :disabled="props.readOnly || !isPlaced('flask1')" @click="setTap(0)">Closed</LabButton>
          <LabButton size="sm" :variant="tapRate === TAP_SLOW ? 'primary' : 'secondary'" :disabled="props.readOnly || !isPlaced('flask1')" @click="setTap(TAP_SLOW)">Slight</LabButton>
          <LabButton size="sm" :variant="tapRate === TAP_MEDIUM ? 'primary' : 'secondary'" :disabled="props.readOnly || !isPlaced('flask1')" @click="setTap(TAP_MEDIUM)">Half</LabButton>
          <LabButton size="sm" :variant="tapRate === TAP_FAST ? 'primary' : 'secondary'" :disabled="props.readOnly || !isPlaced('flask1')" @click="setTap(TAP_FAST)">Full</LabButton>
        </div>
        <LabButton size="sm" variant="secondary" class="w-full" :disabled="props.readOnly || !isPlaced('flask1')" @click="addDrop">Add Drop (0.05ml)</LabButton>
      </div>

      <div v-if="inspectText" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">{{ inspectText }}</div>

      <div v-if="pendingReading" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">ml</span></span>
          <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
        </div>
      </div>
    </div>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="warning" class="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ warning }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import LabButton from './lab2d/LabButton.vue'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }]
}>()

// --- Fixed educational layout --------------------------------------------------------------
const VB_W = 600, VB_H = 420
const BENCH_Y = 390
const BURETTE_HEIGHT = 160
const PIPETTE_HEIGHT = 150

// --- Free repositioning - each apparatus item starts at its default spot but can be dragged
// anywhere on the bench afterward; purely visual/organizational (see Circuit renderer for the
// same pattern). The pour/tap mechanics and drop animation are keyed to the burette itself, not
// to the flask's position, so dragging either one independently never looks disconnected. -------
const positions = reactive<Record<string, { x: number; y: number }>>({
  burette1: { x: 140, y: 70 },
  flask1: { x: 140, y: 300 },
  pipette1: { x: 380, y: 110 },
})
const BURETTE_X = computed(() => positions.burette1.x)
const BURETTE_TOP_Y = computed(() => positions.burette1.y)
const BURETTE_BOTTOM_Y = computed(() => BURETTE_TOP_Y.value + BURETTE_HEIGHT)
const FLASK_X = computed(() => positions.flask1.x)
const FLASK_TOP_Y = computed(() => positions.flask1.y)
const PIPETTE_X = computed(() => positions.pipette1.x)
const PIPETTE_TOP_Y = computed(() => positions.pipette1.y)
const PIPETTE_BOTTOM_Y = computed(() => PIPETTE_TOP_Y.value + PIPETTE_HEIGHT)

const svgEl = ref<SVGSVGElement | null>(null)
function svgPoint(ev: PointerEvent): { x: number; y: number } {
  const svg = svgEl.value
  if (!svg) return { x: 0, y: 0 }
  const pt = svg.createSVGPoint()
  pt.x = ev.clientX
  pt.y = ev.clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const local = pt.matrixTransform(ctm.inverse())
  return { x: local.x, y: local.y }
}

const POSITION_BOUNDS = { minX: 70, maxX: VB_W - 70, minY: 50, maxY: BENCH_Y - 10 }
let draggingKey: string | null = null
let itemDragStart: { x: number; y: number } | null = null

function onItemPointerDown(key: string, ev: PointerEvent) {
  if (props.readOnly) return
  ev.stopPropagation()
  draggingKey = key
  itemDragStart = svgPoint(ev)
}
function onSvgPointerMove(ev: PointerEvent) {
  if (!draggingKey) return
  const p = svgPoint(ev)
  positions[draggingKey] = {
    x: Math.min(POSITION_BOUNDS.maxX, Math.max(POSITION_BOUNDS.minX, p.x)),
    y: Math.min(POSITION_BOUNDS.maxY, Math.max(POSITION_BOUNDS.minY, p.y)),
  }
}
function onSvgPointerUp(ev: PointerEvent) {
  if (!draggingKey) return
  const key = draggingKey
  const p = svgPoint(ev)
  const moved = !!itemDragStart && Math.hypot(p.x - itemDragStart.x, p.y - itemDragStart.y) > 6
  draggingKey = null
  itemDragStart = null
  if (!moved) selectObject(key) // a plain click - preserves the existing selection panel behaviour
}

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

// --- Apparatus tray ---------------------------------------------------------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
function isPlaced(key: string) { return placedKeys.has(key) }
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Burette - real internal state, a fixed inverted scale (0.00ml at the top) ----------------
const buretteCapacityMl = computed(() => Number(mergedProps('burette1').capacity_ml ?? 50))
const buretteFillOffset = ref(0) // where it was actually filled to - never exactly 0, like real lab prep
const dispensedMl = ref(0) // cumulative real volume released through the tap
const currentPhysicalReadingMl = computed(() => Math.min(buretteCapacityMl.value, buretteFillOffset.value + dispensedMl.value))
const initialReadingMl = ref<number | null>(null)
const finalReadingMl = ref<number | null>(null)

const buretteTicks = computed(() => {
  const ticks: { ml: number; px: number; major: boolean }[] = []
  for (let ml = 0; ml <= buretteCapacityMl.value; ml += 1) {
    ticks.push({ ml, px: (ml / buretteCapacityMl.value) * BURETTE_HEIGHT, major: ml % 5 === 0 })
  }
  return ticks
})

const TAP_SLOW = 0.4, TAP_MEDIUM = 1.2, TAP_FAST = 3.5 // ml/sec
const tapRate = ref(0)
const dropAnimY = ref(BURETTE_BOTTOM_Y.value + 15)
let lastEmittedPourMl = 0

function recordPourIfChanged() {
  if (dispensedMl.value === lastEmittedPourMl) return
  lastEmittedPourMl = dispensedMl.value
  emit('action', { objectKey: 'flask1', action: 'pour', value: String(Math.round(dispensedMl.value * 100) / 100) })
}

function setTap(rate: number) {
  if (props.readOnly || !isPlaced('flask1')) {
    if (!isPlaced('flask1')) flash('Place the conical flask under the burette first.')
    return
  }
  const wasFlowing = tapRate.value > 0
  tapRate.value = rate
  if (wasFlowing && rate === 0) recordPourIfChanged()
}

function addDrop() {
  if (props.readOnly || !isPlaced('flask1')) return
  const room = 100 - totalFlaskVolume.value
  const remaining = buretteCapacityMl.value - currentPhysicalReadingMl.value
  const drop = Math.min(0.05, room, remaining)
  if (drop <= 0) return
  dispensedMl.value = Math.round((dispensedMl.value + drop) * 100) / 100
  recordPourIfChanged()
}

let flowRaf = 0
let lastFlowTs = 0
function flowLoop(ts: number) {
  flowRaf = requestAnimationFrame(flowLoop)
  if (!lastFlowTs) lastFlowTs = ts
  const dt = Math.min(0.05, (ts - lastFlowTs) / 1000)
  lastFlowTs = ts
  if (tapRate.value <= 0) return

  const room = 100 - totalFlaskVolume.value
  const remaining = buretteCapacityMl.value - currentPhysicalReadingMl.value
  const increment = Math.min(tapRate.value * dt, Math.max(0, room), Math.max(0, remaining))
  if (increment <= 0) {
    tapRate.value = 0
    recordPourIfChanged()
    if (room <= 0) flashWarning('The flask is full - reagent has spilled. Stop and check your apparatus.')
    return
  }
  dispensedMl.value = Math.round((dispensedMl.value + increment) * 1000) / 1000
  dropAnimY.value = ((dropAnimY.value - BURETTE_BOTTOM_Y.value + 3) % 25) + BURETTE_BOTTOM_Y.value
}

// --- Flask chemistry - a simplified but real acid-base model, driven only by configurable
// concentration props (never by step/grading data, which this renderer never sees). -----------
const flaskNaohMl = ref(0)
const indicatorAdded = ref(false)
const totalFlaskVolume = computed(() => flaskNaohMl.value + dispensedMl.value)

const analyteMmol = computed(() => flaskNaohMl.value * Number(mergedProps('flask1').analyte_concentration_m ?? 0.0992))
const titrantMmol = computed(() => dispensedMl.value * Number(mergedProps('burette1').titrant_concentration_m ?? 0.1))
const deficitPct = computed(() => (analyteMmol.value > 0 ? (analyteMmol.value - titrantMmol.value) / analyteMmol.value : 1))

type ColorZone = 'colourless' | 'pink' | 'fading' | 'endpoint' | 'overshot'
const trueColorZone = computed<ColorZone>(() => {
  if (!indicatorAdded.value || flaskNaohMl.value <= 0) return 'colourless'
  const p = deficitPct.value
  if (p > 0.05) return 'pink'
  if (p > 0.01) return 'fading'
  if (p >= -0.01) return 'endpoint'
  return 'overshot'
})
// The displayed colour only updates when the flask is actually swirled - "ignoring mixing" means
// the student keeps seeing whatever colour was last observed, exactly matching real practice.
const displayedColorZone = ref<ColorZone>('colourless')

const ZONE_FILL: Record<ColorZone, string> = {
  colourless: '#e0f2fe', pink: '#f472b6', fading: '#fbcfe8', endpoint: '#fce7f3', overshot: '#db2777',
}
const flaskColorFill = computed(() => ZONE_FILL[displayedColorZone.value])
const flaskLiquidPoints = computed(() => {
  const frac = Math.min(1, totalFlaskVolume.value / 60)
  const topY = (BENCH_Y - 6) - frac * (BENCH_Y - 6 - FLASK_TOP_Y.value - 10)
  const halfW = 6 + frac * 26
  const fx = FLASK_X.value
  return `${fx - halfW},${topY} ${fx + halfW},${topY} ${fx + 32},${BENCH_Y - 6} ${fx - 32},${BENCH_Y - 6}`
})

function addIndicator() {
  if (props.readOnly || indicatorAdded.value) return
  indicatorAdded.value = true
  displayedColorZone.value = trueColorZone.value
}

let swirlTimeoutA = 0
let swirlTimeoutB = 0
const swirlAngle = ref(0)
function swirlFlask() {
  if (props.readOnly || totalFlaskVolume.value <= 0) return
  displayedColorZone.value = trueColorZone.value
  if (displayedColorZone.value === 'overshot') {
    flashWarning('Overshot the endpoint - the colour is now strong and permanent.')
  }
  swirlAngle.value = -6
  window.clearTimeout(swirlTimeoutA)
  window.clearTimeout(swirlTimeoutB)
  swirlTimeoutA = window.setTimeout(() => { swirlAngle.value = 6 }, 150)
  swirlTimeoutB = window.setTimeout(() => { swirlAngle.value = 0 }, 400)
}

// --- Pipette - fixed calibrated capacity, bounded fill, real transfer into the flask ----------
const PIPETTE_CAPACITY_ML = 25.0
const pipetteFilledMl = ref(0)
const measureSliderOpen = ref(false)
const measureSliderValue = ref(0)
const pourArmed = ref(false)
const pourAmount = ref(0)
const pourMax = computed(() => Math.min(pipetteFilledMl.value, 100 - totalFlaskVolume.value))

function armPipetteMeasure() {
  if (props.readOnly) return
  measureSliderOpen.value = true
  measureSliderValue.value = Math.min(PIPETTE_CAPACITY_ML, pipetteFilledMl.value || PIPETTE_CAPACITY_ML)
}
function confirmPipetteFill() {
  pipetteFilledMl.value = Math.round(measureSliderValue.value * 10) / 10
  measureSliderOpen.value = false
  emit('action', { objectKey: 'pipette1', action: 'measure', value: String(pipetteFilledMl.value), unit: 'ml', label: 'Pipette' })
}
function beginPourToFlask() {
  if (props.readOnly || pipetteFilledMl.value <= 0 || !isPlaced('flask1')) return
  pourArmed.value = true
  pourAmount.value = pourMax.value
}
function confirmPour() {
  const amount = Math.round(pourAmount.value * 10) / 10
  pipetteFilledMl.value = Math.max(0, Math.round((pipetteFilledMl.value - amount) * 10) / 10)
  flaskNaohMl.value = Math.round((flaskNaohMl.value + amount) * 10) / 10
  pourArmed.value = false
  emit('action', { objectKey: 'flask1', action: 'pour', value: String(amount) })
}

// --- Selection / inspect / measure -------------------------------------------------------------
const selectedKey = ref<string | null>(null)
const selectedType = computed(() => props.sceneObjects.find(o => o.key === selectedKey.value)?.object_type ?? null)
const inspectText = ref<string | null>(null)
const pendingReading = ref<{ value: string } | null>(null)
const hint = ref<string | null>(null)
const warning = ref<string | null>(null)

function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 3000) }
function flashWarning(text: string) { warning.value = text; setTimeout(() => { if (warning.value === text) warning.value = null }, 4500) }

function selectObject(key: string) {
  selectedKey.value = key
  inspectText.value = null
  pendingReading.value = null
  measureSliderOpen.value = false
}
function deselect() {
  selectedKey.value = null
  inspectText.value = null
  pendingReading.value = null
  measureSliderOpen.value = false
}

function inspectBurette() {
  inspectText.value = catalogFor('burette')?.description
    ? `${catalogFor('burette')!.description} Currently filled with ${mergedProps('burette1').liquid || 'a titrant'}.`
    : 'A graduated tube with a tap, used to dispense precise liquid volumes.'
  emit('action', { objectKey: 'burette1', action: 'inspect', value: null })
}

function inspectFlask() {
  if (!indicatorAdded.value) {
    inspectText.value = 'The solution is colourless - no indicator has been added yet.'
  } else if (displayedColorZone.value === 'pink') {
    inspectText.value = 'The solution is now pink in the alkaline flask.'
  } else if (displayedColorZone.value === 'fading' || displayedColorZone.value === 'endpoint') {
    inspectText.value = 'The pink colour is very pale - you are close to the endpoint.'
  } else if (displayedColorZone.value === 'overshot') {
    inspectText.value = 'The colour is strong and permanent - the endpoint has been overshot.'
  } else {
    inspectText.value = 'Add the indicator, then swirl the flask to see its true colour.'
  }
  emit('action', { objectKey: 'flask1', action: 'inspect', value: null })
}

function armBuretteMeasure() {
  if (props.readOnly) return
  const noise = (Math.random() - 0.5) * 0.04
  const value = Math.round((currentPhysicalReadingMl.value + noise) * 100) / 100
  pendingReading.value = { value: String(value) }
}
function confirmReading() {
  if (!pendingReading.value) return
  const value = pendingReading.value.value
  const isInitial = initialReadingMl.value === null
  if (isInitial) initialReadingMl.value = Number(value)
  else finalReadingMl.value = Number(value)
  emit('action', {
    objectKey: 'burette1', action: 'measure', value, unit: 'ml',
    label: isInitial ? 'Initial Burette Reading' : 'Final Burette Reading', targetObjectKey: 'burette1',
  })
  pendingReading.value = null
}

onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) placedKeys.add(o.key) })
  buretteFillOffset.value = Math.round(Math.random() * 40) / 100 // a fresh burette starts just above 0.00ml
  flowRaf = requestAnimationFrame(flowLoop)
  if (!props.readOnly) flash('Pick up the apparatus, then set up the burette and flask to begin titrating.')
})
onBeforeUnmount(() => {
  cancelAnimationFrame(flowRaf)
  window.clearTimeout(swirlTimeoutA)
  window.clearTimeout(swirlTimeoutB)
})

function setObjectState() {
  // No switch_on/off apparatus in this experiment - kept for interface parity.
}
defineExpose({ setObjectState })
</script>
