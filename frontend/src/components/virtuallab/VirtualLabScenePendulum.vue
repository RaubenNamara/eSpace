<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
    <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="w-full h-full select-none" ref="svgEl" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointerleave="onPointerUp">
      <!-- Bench line -->
      <line :x1="0" :y1="BENCH_Y" :x2="VB_W" :y2="BENCH_Y" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2" />

      <!-- Retort stand -->
      <g class="text-gray-500 dark:text-gray-400">
        <rect :x="pivot.x - 55" :y="20" width="110" height="12" rx="3" fill="currentColor" />
        <rect :x="pivot.x - 6" :y="20" width="12" height="18" fill="currentColor" />
        <rect :x="pivot.x - 8" :y="BENCH_Y - 6" width="16" height="10" fill="currentColor" />
      </g>

      <!-- Angle arc from vertical to the current string direction -->
      <path :d="angleArcPath" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" opacity="0.85" />
      <line :x1="pivot.x" :y1="pivot.y" :x2="pivot.x" :y2="pivot.y + 46" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 3" />
      <text :x="pivot.x + (angleDeg >= 0 ? 26 : -26)" :y="pivot.y + 60" text-anchor="middle" class="fill-sky-600 dark:fill-sky-400 text-[13px] font-bold">{{ Math.abs(Math.round(angleDeg)) }}&deg;</text>

      <!-- Ruler alongside the string - a fixed 0-50cm scale like a real ruler (it doesn't resize
           itself to whatever it's measuring); the student reads off wherever the bob's string
           actually reaches. -->
      <g v-if="showRuler" class="cursor-pointer" @click="selectObject('ruler1')">
        <rect :x="rulerX - 11" :y="pivot.y" width="22" :height="RULER_MAX_CM * PX_PER_CM" rx="3" fill="#fdf6e3" stroke="#cbb892" stroke-width="1.5" :class="selectedKey === 'ruler1' && measureArmed ? 'ruler-armed' : ''" />
        <g v-for="t in rulerTicks" :key="t.cm">
          <line :x1="rulerX - 11" :y1="pivot.y + t.px" :x2="rulerX - 11 + (t.major ? 10 : 6)" :y2="pivot.y + t.px" stroke="#1e293b" stroke-width="1" />
          <text v-if="t.major" :x="rulerX + 4" :y="pivot.y + t.px + 3" class="fill-slate-700 text-[9px] font-semibold">{{ t.cm }}</text>
        </g>
      </g>

      <!-- String -->
      <line :x1="pivot.x" :y1="pivot.y" :x2="bobPos.x" :y2="bobPos.y" stroke="#475569" stroke-width="2" />
      <circle :cx="pivot.x" :cy="pivot.y" r="5" fill="#1e293b" />

      <!-- Bob -->
      <g
        class="cursor-grab active:cursor-grabbing"
        @pointerdown="onBobPointerDown"
      >
        <circle :cx="bobPos.x" :cy="bobPos.y" :r="bobRadius" fill="url(#bobGradient)" :stroke="selectedKey === 'bob1' ? '#4f46e5' : '#312e81'" :stroke-width="selectedKey === 'bob1' ? 3 : 1.5" />
        <text :x="bobPos.x" :y="bobPos.y + bobRadius + 16" text-anchor="middle" class="fill-gray-700 dark:fill-gray-200 text-[11px] font-semibold">{{ massG }} g</text>
      </g>

      <defs>
        <radialGradient id="bobGradient" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#a5b4fc" />
          <stop offset="100%" stop-color="#4338ca" />
        </radialGradient>
      </defs>
    </svg>

    <!-- Apparatus name + available actions - shown only for the current selection, matching the
         rest of the app's "select then choose an action" convention rather than always-on clutter. -->
    <div v-if="selectedKey" class="absolute left-2 top-2 sm:left-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[13rem]">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{{ selectedDisplayName }}</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <button v-if="selectedKey === 'bob1'" @click="inspectBob" class="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Inspect</button>
        <button v-if="selectedKey === 'ruler1'" @click="armMeasure" class="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700" :disabled="props.readOnly">Measure</button>
      </div>

      <div v-if="measureArmed" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-amber-600 dark:text-amber-400">Click the pendulum bob or string to measure.</div>

      <div v-if="pendingReading" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">{{ pendingReading.unit }}</span></span>
          <button @click="confirmReading" class="flex-shrink-0 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Record</button>
        </div>
      </div>

      <div v-if="inspectText" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">{{ inspectText }}</div>
    </div>

    <!-- Stopwatch - a real, always-visible widget with direct handles rather than hidden behind
         select-then-toolbar, matching the brief's "interactive handles built into apparatus". -->
    <div class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-40">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">Stopwatch</p>
      <div class="bg-gray-900 rounded-lg px-2 py-1.5 text-center mb-2">
        <span class="font-mono text-lg text-emerald-400 tabular-nums">{{ stopwatchText }}</span>
      </div>
      <p class="text-[10px] text-gray-400 dark:text-gray-500 mb-2">Oscillations: <span class="font-semibold text-gray-600 dark:text-gray-300">{{ oscillationCount }}</span></p>
      <div class="grid grid-cols-2 gap-1.5">
        <button v-if="!stopwatchRunning" @click="startStopwatch" :disabled="props.readOnly" class="px-2 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">Start</button>
        <button v-else @click="stopStopwatch" class="px-2 py-1.5 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600">Stop</button>
        <button @click="resetStopwatch" :disabled="props.readOnly" class="px-2 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 disabled:opacity-50">Reset</button>
      </div>
      <button @click="readStopwatch" :disabled="props.readOnly" class="mt-1.5 w-full px-2 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50">Read Time</button>
    </div>

    <!-- Controls strip - length/mass/gravity are free, real adjustments (like the battery voltage
         picker elsewhere): they change the live simulation, but nothing here is graded directly. -->
    <div class="absolute left-2 right-2 bottom-2 sm:left-3 sm:right-3 sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-wrap items-center gap-x-5 gap-y-2">
      <div class="flex-1 min-w-[9rem]">
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">String Length: {{ lengthCm }} cm</p>
        <input v-model.number="lengthCm" type="range" min="10" max="50" step="1" class="w-full accent-indigo-600" :disabled="props.readOnly">
      </div>
      <div class="flex-1 min-w-[9rem]">
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Bob Mass: {{ massG }} g</p>
        <input v-model.number="massG" type="range" min="20" max="200" step="10" class="w-full accent-indigo-600" :disabled="props.readOnly">
      </div>
      <div>
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Gravity</p>
        <div class="flex gap-1">
          <button v-for="g in GRAVITY_OPTIONS" :key="g.label" @click="gravity = g.value" :disabled="props.readOnly"
            class="px-2 py-1 text-[11px] font-semibold rounded-lg border transition-colors disabled:opacity-50"
            :class="gravity === g.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'"
          >{{ g.label }}</button>
        </div>
      </div>
      <button @click="resetSwing" :disabled="props.readOnly" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">Reset Swing</button>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0"
    >
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }]
}>()

// --- Layout constants (a fixed, stable educational view - no free camera to fight with) --------
const VB_W = 600, VB_H = 420
const BENCH_Y = 400
const pivot = { x: VB_W / 2, y: 60 }
const PX_PER_CM = 6

function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? props.objectCatalog.find(o => o.object_type === cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}
const bobCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'specimen'))
const rulerCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'ruler'))
const stopwatchCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'stopwatch'))
const showRuler = computed(() => !!rulerCfg.value)

// --- Real, live-adjustable state (not graded by themselves - free realism controls) ------------
const lengthCm = ref<number>(Number(mergedProps(bobCfg.value?.key || '').length_cm ?? 25))
const massG = ref<number>(Number(mergedProps(bobCfg.value?.key || '').mass_g ?? 50))
const GRAVITY_OPTIONS = [{ label: 'Earth', value: 9.8 }, { label: 'Moon', value: 1.6 }, { label: 'Mars', value: 3.7 }]
const gravity = ref(9.8)

const bobRadius = computed(() => Math.max(12, Math.min(30, 12 + massG.value / 8)))
const stringLenPx = computed(() => lengthCm.value * PX_PER_CM)
const rulerX = computed(() => pivot.x + 70)

// --- Pendulum physics: real numerical integration of theta'' = -(g/L)sin(theta) - damping*omega,
// not a scripted animation - the motion genuinely depends on the length/mass/gravity the student
// has set, and the bob is released from wherever they actually dragged it. --------------------
const angleRad = ref(0)
const angularVelocity = ref(0)
const swinging = ref(false)
const zeroCrossings = ref(0)
const MAX_ANGLE_RAD = (60 * Math.PI) / 180
let rafId = 0
let lastTs = 0

const angleDeg = computed(() => (angleRad.value * 180) / Math.PI)
const bobPos = computed(() => ({
  x: pivot.x + stringLenPx.value * Math.sin(angleRad.value),
  y: pivot.y + stringLenPx.value * Math.cos(angleRad.value),
}))
const angleArcPath = computed(() => {
  const r = 46
  const end = { x: pivot.x + r * Math.sin(angleRad.value), y: pivot.y + r * Math.cos(angleRad.value) }
  const start = { x: pivot.x, y: pivot.y + r }
  const largeArc = Math.abs(angleDeg.value) > 180 ? 1 : 0
  const sweep = angleRad.value >= 0 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`
})

const oscillationCount = computed(() => Math.floor(zeroCrossings.value / 2))

function physicsStep(ts: number) {
  rafId = requestAnimationFrame(physicsStep)
  if (!lastTs) lastTs = ts
  const dt = Math.min(0.04, (ts - lastTs) / 1000)
  lastTs = ts
  if (!swinging.value) return

  const L = Math.max(0.05, lengthCm.value / 100)
  // A heavier bob carries relatively more of its own momentum against air resistance - a small,
  // physically-reasonable touch; it does not change the (mass-independent) period itself.
  const damping = 0.03 * (50 / massG.value)
  const alpha = -(gravity.value / L) * Math.sin(angleRad.value) - damping * angularVelocity.value
  angularVelocity.value += alpha * dt
  const prev = angleRad.value
  angleRad.value += angularVelocity.value * dt

  if (Math.sign(prev) !== Math.sign(angleRad.value) && prev !== 0) {
    zeroCrossings.value++
  }
}

// --- Bob drag-to-set-angle-and-release --------------------------------------------------------
const svgEl = ref<SVGSVGElement | null>(null)
let draggingBob = false
let dragMoved = false

function svgPoint(ev: PointerEvent): { x: number; y: number } {
  const svg = svgEl.value!
  const pt = svg.createSVGPoint()
  pt.x = ev.clientX
  pt.y = ev.clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const local = pt.matrixTransform(ctm.inverse())
  return { x: local.x, y: local.y }
}

function onBobPointerDown(ev: PointerEvent) {
  if (props.readOnly) return
  if (measureArmed.value) {
    tryMeasureLength()
    ev.stopPropagation()
    return
  }
  draggingBob = true
  dragMoved = false
  swinging.value = false
  angularVelocity.value = 0
  ev.stopPropagation()
}

function onPointerMove(ev: PointerEvent) {
  if (!draggingBob) return
  const p = svgPoint(ev)
  const dx = p.x - pivot.x
  const dy = p.y - pivot.y
  if (Math.hypot(dx, dy) > 4) dragMoved = true
  let angle = Math.atan2(dx, dy)
  angle = Math.max(-MAX_ANGLE_RAD, Math.min(MAX_ANGLE_RAD, angle))
  angleRad.value = angle
}

function onPointerUp() {
  if (!draggingBob) return
  draggingBob = false
  if (dragMoved) {
    // Released - the pendulum swings naturally from wherever it was let go.
    swinging.value = true
    zeroCrossings.value = 0
    lastTs = 0
  } else {
    selectObject('bob1')
  }
}

// --- Selection / inspect / measure - same emitted action shape as the 3D engine, so grading,
// the notebook, and the teacher review all work completely unchanged. -----------------------
const selectedKey = ref<string | null>(null)
const measureArmed = ref(false)
const inspectText = ref<string | null>(null)
const pendingReading = ref<{ value: string; unit: string; objectKey: string; targetKey: string; label: string } | null>(null)
const hint = ref<string | null>(null)

function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3000)
}

const selectedDisplayName = computed(() => {
  const cfg = props.sceneObjects.find(o => o.key === selectedKey.value)
  return props.objectCatalog.find(o => o.object_type === cfg?.object_type)?.display_name ?? selectedKey.value ?? ''
})

function selectObject(key: string) {
  selectedKey.value = key
  measureArmed.value = false
  inspectText.value = null
  pendingReading.value = null
}
function deselect() {
  selectedKey.value = null
  measureArmed.value = false
  inspectText.value = null
  pendingReading.value = null
}

function inspectBob() {
  inspectText.value = props.objectCatalog.find(o => o.object_type === 'specimen')?.description || 'A pendulum bob - a mass suspended by a string, free to swing about the pivot.'
  emit('action', { objectKey: bobCfg.value?.key ?? 'bob1', action: 'inspect', value: null })
}

function armMeasure() {
  if (props.readOnly) return
  measureArmed.value = true
  pendingReading.value = null
}

/** Clicking the bob/string while the ruler's measure is armed - reads the real, live length. */
function tryMeasureLength() {
  if (!measureArmed.value || !rulerCfg.value || !bobCfg.value) return
  const noise = (Math.random() - 0.5) * 0.2
  const value = Math.round((lengthCm.value + noise) * 10) / 10
  pendingReading.value = { value: String(value), unit: 'cm', objectKey: rulerCfg.value.key, targetKey: bobCfg.value.key, label: 'Ruler' }
  measureArmed.value = false
}

function confirmReading() {
  if (!pendingReading.value) return
  const r = pendingReading.value
  emit('action', { objectKey: r.objectKey, action: 'measure', value: r.value, unit: r.unit, label: r.label, targetObjectKey: r.targetKey })
  pendingReading.value = null
}

// --- Stopwatch - real elapsed wall-clock time, same switch_on/off/measure vocabulary the 3D
// engine's stopwatch already uses. ------------------------------------------------------------
const stopwatchRunning = ref(false)
const stopwatchElapsedMs = ref(0)
let stopwatchStartedAt = 0
const stopwatchTick = ref(0)

const currentStopwatchMs = computed(() => {
  void stopwatchTick.value
  return stopwatchRunning.value ? stopwatchElapsedMs.value + (Date.now() - stopwatchStartedAt) : stopwatchElapsedMs.value
})
const stopwatchText = computed(() => {
  const totalSec = Math.max(0, currentStopwatchMs.value) / 1000
  const mm = Math.floor(totalSec / 60).toString().padStart(2, '0')
  const ss = (totalSec % 60).toFixed(1).padStart(4, '0')
  return `${mm}:${ss}`
})

function startStopwatch() {
  if (props.readOnly || stopwatchRunning.value || !stopwatchCfg.value) return
  stopwatchRunning.value = true
  stopwatchStartedAt = Date.now()
  emit('action', { objectKey: stopwatchCfg.value.key, action: 'switch_on', value: null })
}
function stopStopwatch() {
  if (!stopwatchRunning.value || !stopwatchCfg.value) return
  stopwatchElapsedMs.value = currentStopwatchMs.value
  stopwatchRunning.value = false
  emit('action', { objectKey: stopwatchCfg.value.key, action: 'switch_off', value: null })
}
function resetStopwatch() {
  stopwatchRunning.value = false
  stopwatchElapsedMs.value = 0
  zeroCrossings.value = 0
}
function readStopwatch() {
  if (props.readOnly || !stopwatchCfg.value) return
  const value = String(Math.round(currentStopwatchMs.value / 100) / 10)
  pendingReading.value = { value, unit: 's', objectKey: stopwatchCfg.value.key, targetKey: stopwatchCfg.value.key, label: 'Stopwatch' }
  selectedKey.value = stopwatchCfg.value.key
}

function resetSwing() {
  swinging.value = false
  angleRad.value = 0
  angularVelocity.value = 0
  zeroCrossings.value = 0
}

watch(() => selectedKey.value, () => { measureArmed.value = false })

let tickTimer = 0
onMounted(() => {
  rafId = requestAnimationFrame(physicsStep)
  tickTimer = window.setInterval(() => { stopwatchTick.value++ }, 100)
  if (!props.readOnly) flash('Drag the bob sideways and let go to release the pendulum.')
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.clearInterval(tickTimer)
})

const RULER_MAX_CM = 50
const rulerTicks = computed(() => {
  const ticks: { cm: number; px: number; major: boolean }[] = []
  for (let cm = 0; cm <= RULER_MAX_CM; cm++) {
    ticks.push({ cm, px: cm * PX_PER_CM, major: cm % 5 === 0 })
  }
  return ticks
})

function setObjectState(key: string, patch: Record<string, any>) {
  if (key === stopwatchCfg.value?.key && 'state' in patch) {
    stopwatchRunning.value = patch.state === 'on'
    if (patch.state === 'on') stopwatchStartedAt = Date.now()
  }
}
defineExpose({ setObjectState })
</script>

<style scoped>
.ruler-armed {
  filter: drop-shadow(0 0 6px #6366f1);
}
</style>
