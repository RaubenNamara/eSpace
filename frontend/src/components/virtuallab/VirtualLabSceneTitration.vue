<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F9EA}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Selection panel -->
    <div v-if="selectedKey" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-56 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{{ catalogFor(selectedType || '')?.display_name || selectedKey }}</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-2">
        <LabButton v-if="selectedKey === 'burette1'" size="sm" :disabled="readOnly" @click="inspectBurette">Inspect</LabButton>
        <LabButton v-if="selectedKey === 'burette1' && !pendingReading" size="sm" :disabled="readOnly" @click="armBuretteMeasure">Read Burette</LabButton>
        <LabButton v-if="selectedKey === 'pipette1' && !pendingReading" size="sm" :disabled="readOnly" @click="armPipetteMeasure">Measure</LabButton>
        <LabButton v-if="selectedKey === 'pipette1'" size="sm" variant="secondary" :disabled="readOnly || pipetteFilledMl <= 0 || !isPlaced('flask1')" @click="beginPourToFlask">Pour into Flask</LabButton>
        <LabButton v-if="selectedKey === 'flask1'" size="sm" :disabled="readOnly" @click="inspectFlask">Inspect</LabButton>
        <LabButton v-if="selectedKey === 'flask1'" size="sm" variant="secondary" :disabled="readOnly || totalFlaskVolume <= 0" @click="swirlFlask">Swirl</LabButton>
      </div>

      <p v-if="selectedKey === 'pipette1'" class="mb-2 text-[11px] text-gray-500 dark:text-gray-400">Filled: {{ pipetteFilledMl.toFixed(1) }} / {{ PIPETTE_CAPACITY_ML.toFixed(1) }} ml</p>

      <div v-if="measureSliderOpen" class="mb-2">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Fill to: {{ measureSliderValue.toFixed(1) }} ml</p>
        <input v-model.number="measureSliderValue" type="range" min="0" :max="PIPETTE_CAPACITY_ML" step="0.5" class="w-full accent-indigo-600">
        <LabButton size="sm" variant="success" class="mt-1.5 w-full" @click="confirmPipetteFill">Record</LabButton>
      </div>

      <div v-if="selectedKey === 'burette1'" class="space-y-2 mb-2">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Tap</p>
        <div class="grid grid-cols-4 gap-1">
          <LabButton size="sm" :variant="tapRate === 0 ? 'primary' : 'secondary'" :disabled="readOnly || !isPlaced('flask1')" @click="setTap(0)">Closed</LabButton>
          <LabButton size="sm" :variant="tapRate === TAP_SLOW ? 'primary' : 'secondary'" :disabled="readOnly || !isPlaced('flask1')" @click="setTap(TAP_SLOW)">Slight</LabButton>
          <LabButton size="sm" :variant="tapRate === TAP_MEDIUM ? 'primary' : 'secondary'" :disabled="readOnly || !isPlaced('flask1')" @click="setTap(TAP_MEDIUM)">Half</LabButton>
          <LabButton size="sm" :variant="tapRate === TAP_FAST ? 'primary' : 'secondary'" :disabled="readOnly || !isPlaced('flask1')" @click="setTap(TAP_FAST)">Full</LabButton>
        </div>
        <LabButton size="sm" variant="secondary" class="w-full" :disabled="readOnly || !isPlaced('flask1')" @click="addDrop">Add Drop (0.05ml)</LabButton>
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

    <!-- Pipette -> flask pour amount -->
    <div v-if="pourArmed" class="absolute left-1/2 -translate-x-1/2 bottom-14 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 text-center">
      <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Pour: {{ pourAmount.toFixed(1) }} ml</p>
      <input v-model.number="pourAmount" type="range" min="0" :max="pourMax" step="0.5" class="w-full accent-indigo-600">
      <button @click="confirmPour" class="mt-1 px-3 py-1 text-[11px] font-semibold rounded-lg bg-emerald-600 text-white">Pour</button>
    </div>

    <button @click="room?.resetView()" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>
    <p class="hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 bg-white/70 rounded px-2 py-1 pointer-events-none">Click apparatus to use it &middot; click the dropper bottle to add indicator</p>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="warning" class="absolute left-1/2 -translate-x-1/2 bottom-14 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ warning }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { canvasTexture, makeScreenLabel } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import { buildRetortStand, setHighlight } from './lab3d/apparatus'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import type { CameraView } from './VirtualLabScene.vue'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }]
}>()

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

// --- Apparatus tray ---------------------------------------------------------------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
function isPlaced(key: string) { return placedKeys.has(key) }
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Burette: real internal state on a fixed inverted scale (0.00 ml at the top) ---------------------
const buretteCapacityMl = computed(() => Number(mergedProps('burette1').capacity_ml ?? 50))
const buretteFillOffset = ref(0)
const dispensedMl = ref(0)
const currentPhysicalReadingMl = computed(() => Math.min(buretteCapacityMl.value, buretteFillOffset.value + dispensedMl.value))
const initialReadingMl = ref<number | null>(null)
const finalReadingMl = ref<number | null>(null)

const TAP_SLOW = 0.4, TAP_MEDIUM = 1.2, TAP_FAST = 3.5 // ml/s
const tapRate = ref(0)
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
  const drop = Math.min(0.05, 100 - totalFlaskVolume.value, buretteCapacityMl.value - currentPhysicalReadingMl.value)
  if (drop <= 0) return
  dispensedMl.value = Math.round((dispensedMl.value + drop) * 100) / 100
  singleDrop = 0
  recordPourIfChanged()
}

function flowStep(dt: number) {
  if (tapRate.value <= 0) return
  const room_ = 100 - totalFlaskVolume.value
  const remaining = buretteCapacityMl.value - currentPhysicalReadingMl.value
  const increment = Math.min(tapRate.value * dt, Math.max(0, room_), Math.max(0, remaining))
  if (increment <= 0) {
    tapRate.value = 0
    recordPourIfChanged()
    if (room_ <= 0) flashWarning('The flask is full - reagent has spilled. Stop and check your apparatus.')
    return
  }
  dispensedMl.value = Math.round((dispensedMl.value + increment) * 1000) / 1000
}

// --- Flask chemistry: simplified acid-base model driven by the configured concentrations ------------
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
/** Only updates when the flask is swirled - an unmixed flask keeps showing the last-seen colour. */
const displayedColorZone = ref<ColorZone>('colourless')
const ZONE_COLOR: Record<ColorZone, { color: number; opacity: number }> = {
  colourless: { color: 0xdbeafe, opacity: 0.35 },
  pink: { color: 0xf472b6, opacity: 0.75 },
  fading: { color: 0xf9a8d4, opacity: 0.6 },
  endpoint: { color: 0xfbcfe8, opacity: 0.5 },
  overshot: { color: 0xdb2777, opacity: 0.85 },
}

function addIndicator() {
  if (props.readOnly || indicatorAdded.value || !isPlaced('flask1')) return
  indicatorAdded.value = true
  displayedColorZone.value = trueColorZone.value
  flash('Two drops of phenolphthalein added.')
}

let swirlT = 0
function swirlFlask() {
  if (props.readOnly || totalFlaskVolume.value <= 0) return
  displayedColorZone.value = trueColorZone.value
  if (displayedColorZone.value === 'overshot') flashWarning('Overshot the endpoint - the colour is now strong and permanent.')
  swirlT = 0.8
}

// --- Pipette: fixed calibrated capacity, bounded fill, real transfer into the flask -----------------
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

// --- Scene (metres, bench top y = 0) -------------------------------------------------------------------
const BURETTE_X = 0
const GRAD_TOP_Y = 0.7
const GRAD_SPAN = 0.4
const TAP_Y = 0.25
const TIP_Y = 0.2
const TUBE_R = 0.0065
const FLASK = { rb: 0.042, rn: 0.013, hc: 0.1, neckH: 0.035 }
const PIPETTE_POS = new THREE.Vector3(0.24, 0, 0.02)
const PIPETTE = { tipY: 0.03, markY: 0.4, topY: 0.46, bulbY: 0.2 }
const INDICATOR_POS = new THREE.Vector3(0.12, 0, 0.1)

const groups: Record<'burette1' | 'flask1' | 'pipette1' | 'indicator', THREE.Group> = {} as any
let stand: THREE.Group
let buretteLiquid: THREE.Mesh
let tapHandle: THREE.Mesh
let drop: THREE.Mesh
let flaskBody: THREE.Group
let flaskLiquid: THREE.Mesh
const flaskLiquidMat = new THREE.MeshStandardMaterial({ color: ZONE_COLOR.colourless.color, transparent: true, opacity: ZONE_COLOR.colourless.opacity, roughness: 0.15, depthWrite: false, side: THREE.DoubleSide })
/** The flask and its white tile stand on the retort stand's base plate, as in a real titration. */
const STAND_BASE_TOP = 0.022
let pipetteStemLiquid: THREE.Mesh
let pipetteBulbLiquid: THREE.Mesh
let builtLiquidH = -1
let dropT = 0
let singleDrop = 1

const readingToY = (ml: number) => GRAD_TOP_Y - (ml / buretteCapacityMl.value) * GRAD_SPAN

function glassMat(opacity = 0.22) {
  return new THREE.MeshStandardMaterial({ color: 0xf0f8ff, metalness: 0, roughness: 0.04, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide })
}

function buildBurette(): THREE.Group {
  const g = new THREE.Group()
  const tubeH = GRAD_TOP_Y + 0.04 - TAP_Y
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(TUBE_R, TUBE_R, tubeH, 24, 1, true), glassMat(0.25))
  tube.position.set(BURETTE_X, TAP_Y + tubeH / 2, 0)
  const titrantColor = new THREE.Color(mergedProps('burette1').color || '#7dd3fc')
  buretteLiquid = new THREE.Mesh(new THREE.CylinderGeometry(TUBE_R * 0.86, TUBE_R * 0.86, 1, 20), new THREE.MeshStandardMaterial({ color: titrantColor, transparent: true, opacity: 0.8, roughness: 0.1, depthWrite: false }))

  // Graduations printed on the front of the tube: 0 at the top, increasing downwards
  const cap = buretteCapacityMl.value
  // A number at every millilitre (bold every 5 ml) and 0.1 ml ticks, on a faint white backing
  const SCALE_W = 0.036
  const scaleH = GRAD_SPAN + 0.02
  const texH = 4096
  const texW = Math.round((texH * SCALE_W) / scaleH)
  const scale = new THREE.Mesh(
    new THREE.PlaneGeometry(SCALE_W, scaleH),
    new THREE.MeshBasicMaterial({
      transparent: true, depthWrite: false, toneMapped: false,
      map: canvasTexture(texW, texH, (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h)
        ctx.fillStyle = 'rgba(255,255,255,0.55)'
        ctx.fillRect(0, 0, w, h)
        const top = h * (0.01 / scaleH)
        const pxPerMl = (h * (GRAD_SPAN / scaleH)) / cap
        ctx.fillStyle = '#0f172a'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'right'
        for (let t = 0; t <= cap * 10; t++) {
          const y = top + (t / 10) * pxPerMl
          const ml = t % 10 === 0, half = t % 5 === 0, five = t % 50 === 0
          const len = w * (five ? 0.5 : ml ? 0.4 : half ? 0.26 : 0.16)
          const thick = Math.max(1.5, pxPerMl * (five ? 0.06 : ml ? 0.045 : 0.022))
          ctx.fillRect(0, y - thick / 2, len, thick)
          if (ml) {
            ctx.font = `${five ? 900 : 700} ${Math.round(pxPerMl * (five ? 0.62 : 0.46))}px Arial, sans-serif`
            ctx.fillText(String(t / 10), w - w * 0.05, y)
          }
        }
      }),
    }),
  )
  scale.position.set(BURETTE_X - TUBE_R + SCALE_W / 2, GRAD_TOP_Y - GRAD_SPAN / 2, TUBE_R + 0.0006)
  // Screen-size ml numbers beside the scale every 5 ml, legible from any distance
  let last10: THREE.Sprite | undefined
  for (let ml = 0; ml <= cap; ml += 5) {
    const label = makeScreenLabel(String(ml), 13, ml % 10 === 0 ? undefined : last10)
    label.center.set(0, 0.5)
    label.position.set(BURETTE_X - TUBE_R + SCALE_W + 0.003, GRAD_TOP_Y - (ml / cap) * GRAD_SPAN, TUBE_R + 0.001)
    g.add(label)
    if (ml % 10 === 0) last10 = label
  }

  // Stopcock and tip
  const tapBody = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.024, 16), glassMat(0.5))
  tapBody.rotation.z = Math.PI / 2
  tapBody.position.set(BURETTE_X, TAP_Y - 0.008, 0)
  tapHandle = new THREE.Mesh(new RoundedBoxGeometry(0.004, 0.022, 0.006, 1, 0.0015), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 }))
  tapHandle.position.set(BURETTE_X + 0.015, TAP_Y - 0.008, 0)
  const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.0035, 0.0012, TAP_Y - 0.016 - TIP_Y, 12, 1, true), glassMat(0.4))
  tip.position.set(BURETTE_X, (TAP_Y - 0.016 + TIP_Y) / 2, 0)

  drop = new THREE.Mesh(new THREE.SphereGeometry(0.0022, 10, 8), new THREE.MeshStandardMaterial({ color: 0xbfdbfe, transparent: true, opacity: 0.8, roughness: 0.05 }))
  drop.visible = false
  g.add(tube, buretteLiquid, scale, tapBody, tapHandle, tip, drop, grabZone(TIP_Y, GRAD_TOP_Y + 0.04, 0.02))
  return g
}

/** Invisible, raycastable cylinder - thin glassware is otherwise too hard to click. */
function grabZone(y0: number, y1: number, r: number) {
  const z = new THREE.Mesh(new THREE.CylinderGeometry(r, r, y1 - y0, 10), new THREE.MeshBasicMaterial({ visible: false }))
  z.position.y = (y0 + y1) / 2
  return z
}

function flaskProfile(inset = 0): THREE.Vector2[] {
  const { rb, rn, hc, neckH } = FLASK
  return [
    new THREE.Vector2(0, 0.001),
    new THREE.Vector2(rb - 0.004 - inset, 0.001),
    new THREE.Vector2(rb - inset, 0.006),
    new THREE.Vector2(rn - inset, hc),
    new THREE.Vector2(rn - inset, hc + neckH),
    new THREE.Vector2(rn + 0.002 - inset, hc + neckH + 0.002),
  ]
}

/** Liquid height in a truncated cone for a volume in ml (bisection on the frustum formula). */
function flaskLiquidHeight(ml: number): number {
  const { rb, rn, hc } = FLASK
  const r = (h: number) => rb - (rb - rn) * (h / hc)
  const vol = (h: number) => (Math.PI * h / 3) * (rb * rb + rb * r(h) + r(h) * r(h)) * 1e6
  let lo = 0, hi = hc
  for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; if (vol(mid) < ml) lo = mid; else hi = mid }
  return lo
}

function rebuildFlaskLiquid(h: number) {
  if (Math.abs(h - builtLiquidH) < 0.0004) return
  builtLiquidH = h
  flaskLiquid.visible = h > 0.0008
  if (!flaskLiquid.visible) return
  const { rb, rn, hc } = FLASK
  const rTop = rb - (rb - rn) * (h / hc) - 0.0015
  flaskLiquid.geometry.dispose()
  flaskLiquid.geometry = new THREE.LatheGeometry([
    new THREE.Vector2(0, 0.0015), new THREE.Vector2(rb - 0.0055, 0.0015), new THREE.Vector2(rTop, h), new THREE.Vector2(0, h),
  ], 40)
}

function buildFlask(): THREE.Group {
  const g = new THREE.Group()
  const tile = new THREE.Mesh(new RoundedBoxGeometry(0.15, 0.006, 0.15, 2, 0.002), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 }))
  tile.position.y = 0.003
  tile.receiveShadow = true
  flaskBody = new THREE.Group()
  flaskBody.position.y = 0.006
  const glass = new THREE.Mesh(new THREE.LatheGeometry(flaskProfile(), 48), glassMat(0.2))
  flaskLiquid = new THREE.Mesh(new THREE.BufferGeometry(), flaskLiquidMat)
  flaskLiquid.visible = false
  flaskBody.add(glass, flaskLiquid)
  g.add(tile, flaskBody)
  g.position.set(BURETTE_X, STAND_BASE_TOP, 0)
  return g
}

function buildPipette(): THREE.Group {
  const g = new THREE.Group()
  const { tipY, markY, topY, bulbY } = PIPETTE
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, topY - tipY, 12, 1, true), glassMat(0.45))
  stem.position.y = (topY + tipY) / 2
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.012, 24, 16), glassMat(0.35))
  bulb.scale.y = 2.4
  bulb.position.y = bulbY
  const mark = new THREE.Mesh(new THREE.TorusGeometry(0.0032, 0.0004, 6, 20), new THREE.MeshBasicMaterial({ color: 0x0f172a }))
  mark.rotation.x = Math.PI / 2
  mark.position.y = markY
  const filler = new THREE.Mesh(new THREE.SphereGeometry(0.014, 20, 14), new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.55 }))
  filler.scale.y = 1.3
  filler.position.y = topY + 0.012
  const liquidMat = new THREE.MeshStandardMaterial({ color: 0xfbcfe8, transparent: true, opacity: 0.6, roughness: 0.1, depthWrite: false })
  pipetteStemLiquid = new THREE.Mesh(new THREE.CylinderGeometry(0.0024, 0.0024, 1, 10), liquidMat)
  pipetteBulbLiquid = new THREE.Mesh(new THREE.SphereGeometry(0.0105, 20, 14), liquidMat)
  pipetteBulbLiquid.scale.y = 2.4
  pipetteBulbLiquid.position.y = bulbY
  const rack = new THREE.Mesh(new RoundedBoxGeometry(0.05, 0.02, 0.04, 2, 0.003), new THREE.MeshStandardMaterial({ color: 0x8a5a36, roughness: 0.7 }))
  rack.position.y = 0.01
  rack.castShadow = filler.castShadow = true
  g.add(stem, bulb, mark, filler, pipetteStemLiquid, pipetteBulbLiquid, rack, grabZone(tipY, topY + 0.03, 0.018))
  g.position.copy(PIPETTE_POS)
  return g
}

function buildIndicator(): THREE.Group {
  const g = new THREE.Group()
  const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.05, 24), new THREE.MeshStandardMaterial({ color: 0x7c3f12, transparent: true, opacity: 0.85, roughness: 0.15 }))
  bottle.position.y = 0.025
  const label = new THREE.Mesh(new THREE.CylinderGeometry(0.0142, 0.0142, 0.022, 24, 1, true), new THREE.MeshStandardMaterial({
    roughness: 0.7,
    map: canvasTexture(256, 64, (ctx, w, h) => {
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#111827'; ctx.font = 'bold 20px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('Phenolphthalein', w / 4, h / 2)
    }),
  }))
  label.position.y = 0.025
  const capM = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.009, 0.012, 16), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 }))
  capM.position.y = 0.056
  const teat = new THREE.Mesh(new THREE.SphereGeometry(0.007, 16, 12), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 }))
  teat.scale.y = 1.4
  teat.position.y = 0.068
  bottle.castShadow = teat.castShadow = true
  g.add(bottle, label, capM, teat)
  g.position.copy(INDICATOR_POS)
  return g
}

function buildScene(scene: THREE.Scene) {
  stand = buildRetortStand({ pivot: new THREE.Vector3(BURETTE_X, 0.58, 0), rodX: -0.14, armZ: -0.05, armEnd: 0.02 })
  scene.add(stand)
  groups.burette1 = buildBurette()
  groups.flask1 = buildFlask()
  groups.pipette1 = buildPipette()
  groups.indicator = buildIndicator()
  Object.values(groups).forEach(g => scene.add(g))
}

function syncScene(dt: number) {
  flowStep(dt)

  const buretteOn = isPlaced('burette1')
  stand.visible = groups.burette1.visible = buretteOn
  groups.flask1.visible = groups.indicator.visible = isPlaced('flask1')
  groups.pipette1.visible = isPlaced('pipette1')

  // Burette liquid from the meniscus down to the tap
  const topY = readingToY(currentPhysicalReadingMl.value)
  buretteLiquid.scale.y = Math.max(0.0001, topY - TAP_Y)
  buretteLiquid.position.set(BURETTE_X, (topY + TAP_Y) / 2, 0)
  tapHandle.rotation.z = tapRate.value > 0 ? Math.PI / 2 : 0

  // Falling drops while the tap is open (or one after "Add Drop")
  const liquidTop = STAND_BASE_TOP + 0.006 + builtLiquidH
  const flowing = tapRate.value > 0
  if (flowing || singleDrop < 1) {
    if (flowing) dropT = (dropT + dt * (1.5 + tapRate.value)) % 1
    else { singleDrop = Math.min(1, singleDrop + dt * 2.5); dropT = singleDrop }
    drop.visible = singleDrop < 1 || flowing
    drop.position.set(BURETTE_X, TIP_Y - dropT * dropT * (TIP_Y - Math.max(liquidTop, 0.02)), 0)
  } else {
    drop.visible = false
  }

  rebuildFlaskLiquid(flaskLiquidHeight(totalFlaskVolume.value))
  const zc = ZONE_COLOR[displayedColorZone.value]
  flaskLiquidMat.color.lerp(new THREE.Color(zc.color), 1 - Math.exp(-dt * 6))
  flaskLiquidMat.opacity += (zc.opacity - flaskLiquidMat.opacity) * (1 - Math.exp(-dt * 6))

  if (swirlT > 0) {
    swirlT = Math.max(0, swirlT - dt)
    flaskBody.rotation.x = Math.sin(swirlT * 18) * 0.08 * swirlT
    flaskBody.rotation.z = Math.cos(swirlT * 18) * 0.08 * swirlT
  }

  // Pipette liquid up to the filled volume (the calibration mark = full capacity)
  const frac = pipetteFilledMl.value / PIPETTE_CAPACITY_ML
  const level = PIPETTE.tipY + frac * (PIPETTE.markY - PIPETTE.tipY)
  pipetteStemLiquid.visible = frac > 0
  pipetteStemLiquid.scale.y = Math.max(0.0001, level - PIPETTE.tipY)
  pipetteStemLiquid.position.y = (level + PIPETTE.tipY) / 2
  pipetteBulbLiquid.visible = level > PIPETTE.bulbY

  ;(['burette1', 'flask1', 'pipette1'] as const).forEach(k => setHighlight(groups[k], selectedKey.value === k))
}

// --- Pointer: click apparatus to select it; click the bottle to add indicator ----------------------------
const hoverCursor = ref('grab')
type Pickable = 'burette1' | 'flask1' | 'pipette1' | 'indicator'
function pickTarget(ev: PointerEvent): Pickable | null {
  if (!groups.burette1) return null
  const keys = Object.keys(groups) as Pickable[]
  const hit = pick(ev, keys.map(k => groups[k]))
  return hit ? keys.find(k => groups[k] === hit)! : null
}
function onHover(ev: PointerEvent) { hoverCursor.value = pickTarget(ev) ? 'pointer' : 'grab' }
function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  const t = pickTarget(ev)
  if (!t || !room.value) return
  room.value.controls.enabled = false
  window.addEventListener('pointerup', onPointerUp, { once: true })
  if (t === 'indicator') addIndicator()
  else selectObject(t)
}
function onPointerUp() { if (room.value) room.value.controls.enabled = true }

// --- Selection / inspect / measure ---------------------------------------------------------------------
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
  if (!indicatorAdded.value) inspectText.value = 'The solution is colourless - no indicator has been added yet.'
  else if (displayedColorZone.value === 'pink') inspectText.value = 'The solution is now pink in the alkaline flask.'
  else if (displayedColorZone.value === 'fading' || displayedColorZone.value === 'endpoint') inspectText.value = 'The pink colour is very pale - you are close to the endpoint.'
  else if (displayedColorZone.value === 'overshot') inspectText.value = 'The colour is strong and permanent - the endpoint has been overshot.'
  else inspectText.value = 'Add the indicator, then swirl the flask to see its true colour.'
  emit('action', { objectKey: 'flask1', action: 'inspect', value: null })
}

function armBuretteMeasure() {
  if (props.readOnly) return
  const noise = (Math.random() - 0.5) * 0.04
  pendingReading.value = { value: String(Math.round((currentPhysicalReadingMl.value + noise) * 100) / 100) }
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

const HOME_POS: THREE.Vector3Tuple = [0.32, 0.56, 1.12]
const HOME_TARGET: THREE.Vector3Tuple = [0.06, 0.36, 0]
const { room, unsupported, pick, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.3, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildScene(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the apparatus from the tray, then set up the burette and flask to begin titrating.')
  },
)

onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) placedKeys.add(o.key) })
  buretteFillOffset.value = Math.round(Math.random() * 40) / 100 // a fresh burette starts just below 0.00 ml
})
onBeforeUnmount(() => window.removeEventListener('pointerup', onPointerUp))

function setObjectState() {
  // No switchable apparatus in this experiment - kept for the renderer interface.
}

// Same room-navigation views as the Apparatus Playground / free-layout engine.
function goToView(view: CameraView) {
  const r = room.value
  if (!r) return
  if (view === 'bench') r.flyTo(new THREE.Vector3(...HOME_POS), new THREE.Vector3(...HOME_TARGET))
  else if (view === 'entrance') r.flyTo(new THREE.Vector3(2.4, 0.95, 2.4), new THREE.Vector3(0, 0.25, 7))
  else if (view === 'left') r.flyTo(new THREE.Vector3(-1.2, 1.0, 1.6), new THREE.Vector3(-7, 0.45, 1.6))
  else r.flyTo(new THREE.Vector3(1.2, 1.0, 1.6), new THREE.Vector3(7, 0.45, 1.6))
}

defineExpose({ setObjectState, goToView })
</script>
