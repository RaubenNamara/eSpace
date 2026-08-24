<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
    <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="w-full h-full select-none" ref="svgEl" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointerleave="onPointerUp">
      <line :x1="0" :y1="BENCH_Y" :x2="VB_W" :y2="BENCH_Y" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2" />

      <LabRuler
        v-if="isPlaced(rulerCfg?.key ?? '')"
        orientation="horizontal" :x="rulerPos.x" :y="rulerPos.y" :max-value="RULER_MAX_M" :px-per-unit="PX_PER_M"
        :armed="measureArmed" clickable @click="selectRuler"
        @pointerdown="onRulerPointerDown"
      />

      <!-- Flight path of the current/most recent shot - a real sampled trajectory, not decoration. -->
      <path v-if="trajectoryPathD" :d="trajectoryPathD" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.8" />

      <!-- Launcher -->
      <g v-if="isPlaced(launcherCfg?.key ?? '')" class="cursor-grab active:cursor-grabbing" @pointerdown="onLauncherPointerDown">
        <rect :x="launcherPos.x - 22" :y="BENCH_Y - 8" width="44" height="10" rx="2" fill="#374151" />
        <rect :x="launcherPos.x - 6" :y="pivot.y" width="12" :height="BENCH_Y - 8 - pivot.y" fill="#4b5563" />
        <g :transform="`translate(${pivot.x} ${pivot.y}) rotate(${-angleDeg})`">
          <rect x="0" y="-5" :width="BARREL_LEN" height="10" rx="3" fill="#1f2937" />
          <circle :cx="BARREL_LEN" cy="0" r="8" fill="transparent" class="cursor-grab active:cursor-grabbing" @pointerdown.stop="onRotateHandlePointerDown" />
        </g>
        <text :x="launcherPos.x" :y="pivot.y - 14" text-anchor="middle" class="fill-sky-600 dark:fill-sky-400 text-[11px] font-bold">{{ Math.round(angleDeg) }}&deg;</text>
      </g>

      <!-- Ball - tracks the muzzle live while idle (so adjusting the angle previews where it's
           aiming), then the real simulated trajectory once fired. -->
      <circle v-if="isPlaced(ballCfg?.key ?? '')" :cx="displayBallPos.x" :cy="displayBallPos.y" r="7" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.5"
        :class="flightState === 'landed' && measureArmed ? 'cursor-pointer' : ''" @click="onBallClick" />
    </svg>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F3AF}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Launcher controls - always visible once placed, matching the "free realism control" status
         velocity/mass sliders already have elsewhere (Pendulum length/mass, Circuit battery voltage). -->
    <div v-if="isPlaced(launcherCfg?.key ?? '')" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-48">
      <LabScale label="Launch Velocity" :model-value="velocity" :min="6" :max="16" unit=" m/s" :disabled="props.readOnly || flightState === 'flying'" @update:model-value="v => velocity = v" />
      <button
        :disabled="props.readOnly || flightState === 'flying'"
        @click="fire"
        class="mt-2.5 w-full px-3 py-2 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
      >{{ flightState === 'flying' ? 'In flight...' : 'Fire' }}</button>
      <p class="mt-1.5 text-[10px] text-gray-400 dark:text-gray-500 text-center">Drag the barrel tip to set the launch angle.</p>
    </div>

    <!-- Measure panel -->
    <div v-if="selectedKey === (rulerCfg?.key ?? null)" class="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-44">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ruler</p>
        <button @click="selectedKey = null" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <LabButton v-if="!measureArmed && !pendingReading" size="sm" :disabled="props.readOnly" @click="armMeasure">Measure</LabButton>
      <div v-if="measureArmed" class="text-[11px] text-amber-600 dark:text-amber-400">Click the ball where it landed.</div>
      <div v-if="pendingReading" class="pt-1">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">m</span></span>
          <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
        </div>
      </div>
    </div>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import LabRuler from './lab2d/LabRuler.vue'
import LabButton from './lab2d/LabButton.vue'
import LabScale from './lab2d/LabScale.vue'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }]
}>()

// --- Fixed educational layout - ground level doubles as the physics origin (launch height and
// landing height are both treated as 0m); the launcher's small stand is a cosmetic few pixels only,
// the same kind of simplification the Pendulum renderer already makes (undamped, no air resistance
// there either). -----------------------------------------------------------------------------
const VB_W = 600, VB_H = 420
const BENCH_Y = 380
const PIVOT_HEIGHT = 18
const BARREL_LEN = 45
const GRAVITY = 9.8
const PX_PER_M = 15
const RULER_MAX_M = 30

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

const launcherCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'projectile_launcher'))
const ballCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'projectile'))
const rulerCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'ruler'))

// --- Apparatus tray - the ball is never tray-picked itself, it's always rendered at the launcher's
// muzzle (idle) or animating along the real trajectory (in flight), matching the plan's "not
// independently placed" apparatus. -------------------------------------------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
function isPlaced(key: string) { return placedKeys.has(key) }
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Launcher position (x only - it sits on the ground) + angle -------------------------------
const launcherPos = reactive({ x: 90 })
const pivot = computed(() => ({ x: launcherPos.x, y: BENCH_Y - PIVOT_HEIGHT }))
const angleDeg = ref(45)
const velocity = ref<number>(Number(mergedProps(launcherCfg.value?.key || '').launch_velocity_ms ?? 12))

const muzzle = computed(() => {
  const rad = (angleDeg.value * Math.PI) / 180
  return { x: pivot.value.x + BARREL_LEN * Math.cos(rad), y: pivot.value.y - BARREL_LEN * Math.sin(rad) }
})

// --- Ruler position - free-draggable like other apparatus; its own drawn position is thematic
// (matches how Pendulum's ruler doesn't have to intersect the swing pixel-for-pixel either) - the
// actual reading always comes from the real simulated ball position, never from where the ruler
// happens to be drawn. ---------------------------------------------------------------------------
const rulerPos = reactive({ x: 60, y: BENCH_Y + 25 })

// --- Flight simulation - a real parametric trajectory (x = v*cos(theta)*t, height = v*sin(theta)*t
// - 0.5*g*t^2), sampled once per shot for the dashed path and driven live via requestAnimationFrame
// for the ball itself - not a canned/expected-value animation. ----------------------------------
const flightState = ref<'idle' | 'flying' | 'landed'>('idle')
const ballPos = reactive({ x: 0, y: BENCH_Y })
const displayBallPos = computed(() => (flightState.value === 'idle' ? muzzle.value : ballPos))
const trajectoryPoints = ref<{ x: number; y: number }[]>([])
const trajectoryPathD = computed(() => trajectoryPoints.value.length
  ? 'M ' + trajectoryPoints.value.map(p => `${p.x},${p.y}`).join(' L ')
  : '')

let shotBaseX = 0
let shotOriginX = 0
let shotAngleRad = 0
let shotVel = 0
let flightRaf = 0
let flightStartTs = 0
const flightTimeS = () => (2 * shotVel * Math.sin(shotAngleRad)) / GRAVITY

function positionAt(t: number): { x: number; y: number } {
  const x = shotOriginX + shotVel * Math.cos(shotAngleRad) * t * PX_PER_M
  const heightM = shotVel * Math.sin(shotAngleRad) * t - 0.5 * GRAVITY * t * t
  return { x, y: BENCH_Y - heightM * PX_PER_M }
}

function fire() {
  if (props.readOnly || flightState.value === 'flying' || !isPlaced(launcherCfg.value?.key ?? '')) return
  shotBaseX = launcherPos.x
  shotOriginX = muzzle.value.x
  shotAngleRad = (angleDeg.value * Math.PI) / 180
  shotVel = velocity.value
  measureArmed.value = false
  pendingReading.value = null

  const T = flightTimeS()
  const steps = 24
  trajectoryPoints.value = Array.from({ length: steps + 1 }, (_, i) => positionAt((T * i) / steps))

  flightState.value = 'flying'
  flightStartTs = 0
  emit('action', { objectKey: launcherCfg.value?.key ?? null, action: 'switch_on', value: null })
  flightRaf = requestAnimationFrame(flightLoop)
}

function flightLoop(ts: number) {
  if (!flightStartTs) flightStartTs = ts
  const t = (ts - flightStartTs) / 1000
  const T = flightTimeS()
  if (t >= T) {
    const p = positionAt(T)
    ballPos.x = p.x
    ballPos.y = BENCH_Y
    flightState.value = 'landed'
    return
  }
  const p = positionAt(t)
  ballPos.x = p.x
  ballPos.y = p.y
  flightRaf = requestAnimationFrame(flightLoop)
}

// --- Drag interaction - launcher (x only) and ruler (free) move; the barrel's rotate handle sets
// the launch angle, emitting on release exactly like the optics ray box's rotate (see
// VirtualLabSceneOptics.vue) so it's gradeable via a normal step with expected_value/tolerance. ---
type DragTarget = 'launcher' | 'ruler' | 'rotate'
let dragging: DragTarget | null = null
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
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }

function onLauncherPointerDown(ev: PointerEvent) {
  if (props.readOnly || flightState.value === 'flying') return
  dragging = 'launcher'
  ev.stopPropagation()
}
function onRulerPointerDown(ev: PointerEvent) {
  if (props.readOnly) return
  dragging = 'ruler'
  ev.stopPropagation()
}
function onRotateHandlePointerDown(ev: PointerEvent) {
  if (props.readOnly || flightState.value === 'flying') return
  dragging = 'rotate'
  ev.stopPropagation()
}
function onPointerMove(ev: PointerEvent) {
  if (!dragging) return
  const p = svgPoint(ev)
  if (dragging === 'launcher') {
    launcherPos.x = clamp(p.x, 40, VB_W - 40)
  } else if (dragging === 'ruler') {
    rulerPos.x = clamp(p.x, 20, VB_W - RULER_MAX_M * PX_PER_M - 20)
    rulerPos.y = clamp(p.y, 60, VB_H - 20)
  } else if (dragging === 'rotate') {
    const dx = p.x - pivot.value.x
    const dy = p.y - pivot.value.y
    angleDeg.value = clamp((-Math.atan2(dy, dx) * 180) / Math.PI, 5, 85)
  }
}
function onPointerUp() {
  if (dragging === 'rotate') {
    emit('action', { objectKey: launcherCfg.value?.key ?? null, action: 'rotate', label: 'Launch Angle', value: String(Math.round(angleDeg.value)), unit: '°' })
  }
  dragging = null
}

// --- Ruler measurement - range is always the real simulated landing distance from the launcher's
// base (where a ruler laid along the ground would actually read from), never a value typed in. ---
const selectedKey = ref<string | null>(null)
const measureArmed = ref(false)
const pendingReading = ref<{ value: string } | null>(null)
const hint = ref<string | null>(null)
function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 3500) }

function selectRuler() {
  if (props.readOnly) return
  selectedKey.value = rulerCfg.value?.key ?? null
}
function armMeasure() {
  if (props.readOnly) return
  if (flightState.value !== 'landed') { flash('Fire the projectile first, then measure where it landed.'); return }
  measureArmed.value = true
}
function onBallClick() {
  if (!measureArmed.value || flightState.value !== 'landed') return
  const noise = (Math.random() - 0.5) * 0.1
  const rangeM = Math.round(((ballPos.x - shotBaseX) / PX_PER_M + noise) * 100) / 100
  pendingReading.value = { value: String(rangeM) }
  measureArmed.value = false
}
function confirmReading() {
  if (!pendingReading.value) return
  emit('action', { objectKey: rulerCfg.value?.key ?? null, action: 'measure', value: pendingReading.value.value, unit: 'm', label: 'Range', targetObjectKey: ballCfg.value?.key ?? null })
  pendingReading.value = null
}

onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) placedKeys.add(o.key) })
  if (!props.readOnly) flash('Pick up the launcher, drag the barrel tip to set an angle, then fire.')
})
onBeforeUnmount(() => cancelAnimationFrame(flightRaf))

function setObjectState() {
  // No apparatus in this experiment resumes mid-flight - kept for interface parity.
}
defineExpose({ setObjectState })
</script>
