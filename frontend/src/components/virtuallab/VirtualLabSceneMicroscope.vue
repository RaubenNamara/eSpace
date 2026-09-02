<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
    <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="w-full h-full select-none" ref="svgEl" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointerleave="onPointerUp">
      <line :x1="0" :y1="BENCH_Y" :x2="VB_W" :y2="BENCH_Y" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2" />

      <!-- Microscope illustration -->
      <g v-if="isPlaced('microscope1')" class="text-gray-500 dark:text-gray-400">
        <rect :x="80" :y="345" width="140" height="16" rx="4" fill="currentColor" />
        <rect :x="105" :y="150" width="14" height="195" rx="4" fill="currentColor" />
        <!-- Stage -->
        <rect :x="70" :y="215" width="100" height="14" rx="2" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5" />
        <rect :x="90" :y="203" width="14" height="10" fill="#64748b" />
        <rect :x="146" :y="203" width="14" height="10" fill="#64748b" />
        <!-- Light source under the stage -->
        <circle :cx="120" :cy="235" r="9" :fill="lightOn ? '#fde047' : '#94a3b8'" :opacity="lightOn ? 0.5 + (lightLevel / 200) : 1" />
        <!-- Arm up to the head -->
        <path d="M 119 150 C 119 100 150 90 150 60" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" />
        <!-- Nosepiece / objectives -->
        <circle cx="128" cy="168" r="16" fill="#475569" />
        <rect v-for="o in OBJECTIVES" :key="o.mag" :x="128 + o.dx - 4" :y="168 + o.dy" width="8" :height="o.len" rx="2" :fill="objective === o.mag ? '#4f46e5' : '#71717a'" :transform="`rotate(${o.angle} ${128 + o.dx} ${168 + o.dy})`" />
        <!-- Body tube + eyepiece -->
        <rect :x="144" :y="65" width="12" height="60" fill="#334155" />
        <rect :x="140" :y="45" width="20" height="22" rx="3" fill="#1e293b" />
        <!-- Coarse + fine focus knobs (visual only - the real controls live in the panel below,
             matching the brief's "controls must be directly visible", not hidden behind selection) -->
        <circle cx="82" cy="185" r="15" fill="#3730a3" />
        <circle cx="82" cy="185" r="15" fill="none" stroke="#c7d2fe" stroke-width="2" stroke-dasharray="3 3" />
        <text x="82" y="189" text-anchor="middle" class="fill-white text-[8px] font-bold pointer-events-none">C</text>
        <circle cx="82" cy="212" r="9" fill="#0f766e" />
        <text x="82" y="215" text-anchor="middle" class="fill-white text-[7px] font-bold pointer-events-none">F</text>
      </g>

      <!-- Slide - starts at a holding spot once picked, dragged onto the stage to mount it -->
      <g v-if="isPlaced('slide1')" class="cursor-grab active:cursor-grabbing" @pointerdown="onSlidePointerDown">
        <rect :x="slidePos.x - 26" :y="slidePos.y - 6" width="52" height="12" rx="2" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5" />
      </g>

      <!-- Circular viewer -->
      <g>
        <circle :cx="VIEWER_CX" :cy="VIEWER_CY" :r="VIEWER_R + 10" fill="#0f172a" />
        <clipPath id="viewerClip"><circle :cx="VIEWER_CX" :cy="VIEWER_CY" :r="VIEWER_R" /></clipPath>
        <circle :cx="VIEWER_CX" :cy="VIEWER_CY" :r="VIEWER_R" :fill="viewerFieldColor" />
        <g clip-path="url(#viewerClip)">
          <g v-if="showSpecimen" :style="{ filter: `blur(${blurPx}px)` }">
            <g v-for="(c, i) in visibleCells" :key="i">
              <rect :x="c.x - c.size / 2" :y="c.y - c.size / 2" :width="c.size" :height="c.size * 0.72" rx="2" :fill="cellColor" :fill-opacity="cellOpacity" :stroke="nucleusColor" stroke-opacity="0.35" stroke-width="1" />
              <circle :cx="c.x + c.size * 0.12" :cy="c.y" :r="c.size * 0.16" :fill="nucleusColor" :fill-opacity="cellOpacity" />
            </g>
          </g>
        </g>
        <circle :cx="VIEWER_CX" :cy="VIEWER_CY" :r="VIEWER_R" fill="none" stroke="#1e293b" stroke-width="10" />
      </g>
    </svg>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F52C}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Microscope controls -->
    <div v-if="isPlaced('microscope1')" class="absolute left-2 bottom-2 right-2 sm:left-3 sm:bottom-3 sm:right-auto sm:w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Illumination</p>
        <LabToggle :model-value="lightOn" :disabled="props.readOnly" @update:model-value="toggleLight" />
      </div>
      <div v-if="lightOn">
        <LabSlider label="Brightness" v-model="lightLevel" :min="0" :max="100" :step="5" :disabled="props.readOnly" />
      </div>

      <div>
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Objective Lens</p>
        <div class="flex gap-1.5">
          <LabButton v-for="m in [40, 100, 400]" :key="m" size="sm" :variant="objective === m ? 'primary' : 'secondary'" :disabled="props.readOnly" @click="selectObjective(m)">&times;{{ m }}</LabButton>
        </div>
      </div>

      <div v-if="slideOnStage">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Coarse Focus: {{ Math.round(focusPosition) }}</p>
        <input :value="focusPosition" @change="setCoarseFocus(Number(($event.target as HTMLInputElement).value))" type="range" min="0" max="100" step="10" class="w-full accent-indigo-600" :disabled="props.readOnly">
      </div>
      <div v-if="slideOnStage" class="flex items-center justify-between">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Fine Focus</p>
        <div class="flex gap-1.5">
          <LabButton size="sm" variant="secondary" :disabled="props.readOnly" @click="nudgeFineFocus(-1)">-</LabButton>
          <LabButton size="sm" variant="secondary" :disabled="props.readOnly" @click="nudgeFineFocus(1)">+</LabButton>
        </div>
      </div>

      <div v-if="slideOnStage">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Stage Position</p>
        <div class="grid grid-cols-3 gap-1 w-28">
          <span></span>
          <LabButton size="sm" variant="secondary" :disabled="props.readOnly" @click="moveStage(0, -8)">&uarr;</LabButton>
          <span></span>
          <LabButton size="sm" variant="secondary" :disabled="props.readOnly" @click="moveStage(-8, 0)">&larr;</LabButton>
          <LabButton size="sm" variant="ghost" disabled>&#9679;</LabButton>
          <LabButton size="sm" variant="secondary" :disabled="props.readOnly" @click="moveStage(8, 0)">&rarr;</LabButton>
          <span></span>
          <LabButton size="sm" variant="secondary" :disabled="props.readOnly" @click="moveStage(0, 8)">&darr;</LabButton>
          <span></span>
        </div>
      </div>

      <LabButton v-if="slideOnStage" size="sm" :disabled="props.readOnly" @click="observeSpecimen">Observe</LabButton>
      <LabButton size="sm" variant="secondary" :disabled="props.readOnly" @click="resetMicroscope">Reset Microscope</LabButton>
    </div>

    <div v-if="inspectText" class="absolute right-2 top-2 sm:right-3 sm:top-3 max-w-[13rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
      <div class="flex items-start justify-between gap-2">
        <p class="text-xs text-gray-700 dark:text-gray-200">{{ inspectText }}</p>
        <button @click="inspectText = null" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
    </div>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import { focusQuality, focusBlurPx } from './microscopeEngine'
import LabButton from './lab2d/LabButton.vue'
import LabSlider from './lab2d/LabSlider.vue'
import LabToggle from './lab2d/LabToggle.vue'

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
const VIEWER_CX = 440, VIEWER_CY = 190, VIEWER_R = 110
const SLIDE_HOLD_POS = { x: 260, y: 350 }
const STAGE_ZONE = { x: 70, y: 203, w: 100, h: 26 } // hit-test box for "dropped on the stage"

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
function isPlaced(key: string) { return placedKeys.has(key) }
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
  if (key === 'slide1') { slidePos.x = SLIDE_HOLD_POS.x; slidePos.y = SLIDE_HOLD_POS.y }
}

// --- Nosepiece illustration - three fixed objective barrels, the active one highlighted --------
const OBJECTIVES = [
  { mag: 40, angle: -40, dx: -14, dy: 4, len: 20 },
  { mag: 100, angle: 0, dx: 0, dy: 8, len: 26 },
  { mag: 400, angle: 40, dx: 14, dy: 4, len: 32 },
]

// --- Slide placement - drag from its holding spot onto the stage to mount it ------------------
const slidePos = reactive({ x: SLIDE_HOLD_POS.x, y: SLIDE_HOLD_POS.y })
const slideOnStage = ref(false)
let draggingSlide = false
const svgEl = ref<SVGSVGElement | null>(null)

function svgPoint(ev: PointerEvent): { x: number; y: number } {
  const svg = svgEl.value!
  const pt = svg.createSVGPoint()
  pt.x = ev.clientX; pt.y = ev.clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const local = pt.matrixTransform(ctm.inverse())
  return { x: local.x, y: local.y }
}
function onSlidePointerDown(ev: PointerEvent) {
  if (props.readOnly || slideOnStage.value) return
  draggingSlide = true
  ev.stopPropagation()
}
function onPointerMove(ev: PointerEvent) {
  if (!draggingSlide) return
  const p = svgPoint(ev)
  slidePos.x = p.x; slidePos.y = p.y
}
function onPointerUp(ev: PointerEvent) {
  if (!draggingSlide) return
  draggingSlide = false
  const p = svgPoint(ev)
  const onStage = p.x > STAGE_ZONE.x && p.x < STAGE_ZONE.x + STAGE_ZONE.w && p.y > STAGE_ZONE.y - 15 && p.y < STAGE_ZONE.y + STAGE_ZONE.h
  if (onStage) {
    slideOnStage.value = true
    slidePos.x = 120; slidePos.y = 214
    // A fresh slide is never already centred or focused - both need real correction, exactly
    // like the 3D engine's "not already correct" placement.
    const optimal = Number(mergedProps('slide1').optimal_focus ?? 50)
    const tolerance = Number(mergedProps('slide1').focus_tolerance ?? 6)
    const sign = Math.random() < 0.5 ? -1 : 1
    focusPosition.value = Math.max(0, Math.min(100, optimal + tolerance * (3 + Math.random() * 3) * sign))
    const offAngle = Math.random() * Math.PI * 2
    const offMag = 30 + Math.random() * 20
    specimenOffsetX.value = Math.cos(offAngle) * offMag
    specimenOffsetY.value = Math.sin(offAngle) * offMag
    emit('action', { objectKey: 'slide1', action: 'move', value: 'microscope1' })
  } else {
    slidePos.x = SLIDE_HOLD_POS.x; slidePos.y = SLIDE_HOLD_POS.y
  }
}

// --- Illumination --------------------------------------------------------------------------
const lightOn = ref(false)
const lightLevel = ref(70)
function toggleLight(on: boolean) {
  if (props.readOnly) return
  lightOn.value = on
  emit('action', { objectKey: 'microscope1', action: on ? 'switch_on' : 'switch_off', value: null })
}

// --- Objective / magnification -----------------------------------------------------------------
const objective = ref(40)
const hasObservedFocusedLowPower = ref(false)
const coarseFocusAtHighPowerCount = ref(0)
function selectObjective(mag: number) {
  if (props.readOnly) return
  objective.value = mag
  if (mag === 400 && !hasObservedFocusedLowPower.value) {
    flash('Start with the low-power objective to locate the specimen before jumping to high power.')
  }
  emit('action', { objectKey: 'microscope1', action: 'select_objective', value: String(mag) })
}

// --- Focus -----------------------------------------------------------------------------------
const focusPosition = ref(50)
function setCoarseFocus(value: number) {
  if (props.readOnly) return
  focusPosition.value = value
  if (objective.value === 400) {
    coarseFocusAtHighPowerCount.value++
    if (coarseFocusAtHighPowerCount.value > 2) flash('Use the fine-focus control at high magnification - coarse focus can lose the specimen entirely.')
  }
  emit('action', { objectKey: 'microscope1', action: 'focus_coarse', value: String(Math.round(value)) })
}
function nudgeFineFocus(delta: number) {
  if (props.readOnly) return
  focusPosition.value = Math.max(0, Math.min(100, focusPosition.value + delta))
  emit('action', { objectKey: 'microscope1', action: 'focus_fine', value: String(focusPosition.value) })
}

// --- Stage X/Y - free, local positioning; the consequence (an off-screen specimen) is what
// actually teaches centring, not a graded step of its own. ----------------------------------
const stageX = ref(0)
const stageY = ref(0)
const specimenOffsetX = ref(0)
const specimenOffsetY = ref(0)
function moveStage(dx: number, dy: number) {
  if (props.readOnly) return
  stageX.value = Math.max(-70, Math.min(70, stageX.value + dx))
  stageY.value = Math.max(-70, Math.min(70, stageY.value + dy))
}

// --- Viewer / specimen rendering ---------------------------------------------------------------
const CELL_SPACING = 34
function fieldOfViewRadius(mag: number): number {
  return mag === 40 ? 140 : mag === 100 ? 70 : 25
}
const showSpecimen = computed(() => lightOn.value && slideOnStage.value)
const viewerFieldColor = computed(() => {
  if (!lightOn.value) return '#020617'
  if (lightLevel.value < 25) return '#334155'
  if (lightLevel.value > 88) return '#fefefe'
  return '#f8fafc'
})
const cellColor = computed(() => mergedProps('slide1').cell_color ?? '#86efac')
const nucleusColor = computed(() => mergedProps('slide1').nucleus_color ?? '#166534')
const cellOpacity = computed(() => (lightLevel.value > 88 ? 0.35 : 0.85))

const viewCenter = computed(() => ({ x: specimenOffsetX.value - stageX.value, y: specimenOffsetY.value - stageY.value }))
const isSpecimenVisible = computed(() => Math.hypot(viewCenter.value.x, viewCenter.value.y) <= fieldOfViewRadius(objective.value))

const visibleCells = computed(() => {
  if (!showSpecimen.value) return []
  const fov = fieldOfViewRadius(objective.value)
  const scale = VIEWER_R / fov
  const cx = viewCenter.value.x, cy = viewCenter.value.y
  const startX = Math.floor((cx - fov) / CELL_SPACING) * CELL_SPACING
  const startY = Math.floor((cy - fov) / CELL_SPACING) * CELL_SPACING
  const cells: { x: number; y: number; size: number }[] = []
  for (let gx = startX; gx <= cx + fov; gx += CELL_SPACING) {
    for (let gy = startY; gy <= cy + fov; gy += CELL_SPACING) {
      if (Math.hypot(gx - cx, gy - cy) > fov * 1.05) continue
      cells.push({ x: VIEWER_CX + (gx - cx) * scale, y: VIEWER_CY + (gy - cy) * scale, size: CELL_SPACING * scale * 0.85 })
    }
  }
  return cells
})

const blurPx = computed(() => focusBlurPx(focusPosition.value, Number(mergedProps('slide1').optimal_focus ?? 50), Number(mergedProps('slide1').focus_tolerance ?? 6), objective.value))

// --- Observe / record ---------------------------------------------------------------------------
const inspectText = ref<string | null>(null)
const hint = ref<string | null>(null)
function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 3500) }

function observeSpecimen() {
  if (props.readOnly) return
  const optimal = Number(mergedProps('slide1').optimal_focus ?? 50)
  const tolerance = Number(mergedProps('slide1').focus_tolerance ?? 6)
  const quality = focusQuality(focusPosition.value, optimal, tolerance, objective.value)
  const structures = mergedProps('slide1').expected_structures || 'the specimen'

  let value: string
  if (!lightOn.value) { inspectText.value = 'Switch on the illumination to see anything through the eyepiece.'; value = 'no_light' }
  else if (!isSpecimenVisible.value) { inspectText.value = 'The specimen is not in view - use the stage controls to recentre it.'; value = 'not_visible' }
  else if (quality === 'focused') {
    inspectText.value = `At ×${objective.value}, clearly focused - you can see ${structures}.`
    value = 'focused'
    if (objective.value === 40 || objective.value === 100) hasObservedFocusedLowPower.value = true
  } else if (quality === 'almost_focused') { inspectText.value = `At ×${objective.value}, almost in focus - fine-tune the focus a little more.`; value = quality }
  else if (quality === 'blurred') { inspectText.value = `At ×${objective.value}, blurred - adjust the coarse and fine focus.`; value = quality }
  else { inspectText.value = `At ×${objective.value}, very blurred - use the focus knobs before observing.`; value = quality }

  emit('action', {
    objectKey: 'slide1', action: 'inspect', value,
    label: `Observation at ×${objective.value} (${value.replace('_', ' ')})`,
  })
}

function resetMicroscope() {
  if (props.readOnly) return
  objective.value = 40
  focusPosition.value = 50
  stageX.value = 0
  stageY.value = 0
  lightOn.value = false
  lightLevel.value = 70
  coarseFocusAtHighPowerCount.value = 0
  inspectText.value = null
}

onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) placedKeys.add(o.key) })
  if (!props.readOnly) flash('Pick up the microscope and slide, then place the slide on the stage to begin.')
})

function setObjectState(key: string, patch: Record<string, any>) {
  if (key === 'microscope1' && 'state' in patch) lightOn.value = patch.state === 'on'
}
defineExpose({ setObjectState })
</script>
