<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
    <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="w-full h-full select-none" ref="svgEl" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointerleave="onPointerUp">
      <line :x1="0" :y1="BENCH_Y" :x2="VB_W" :y2="BENCH_Y" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2" />

      <!-- Normal line - always perpendicular to the surface at the point of incidence, a
           reference guide only (the student still has to align the protractor to it themselves). -->
      <line v-if="rayHit" :x1="rayHit.point.x - rayHit.normal.x * 70" :y1="rayHit.point.y - rayHit.normal.y * 70" :x2="rayHit.point.x + rayHit.normal.x * 70" :y2="rayHit.point.y + rayHit.normal.y * 70" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />

      <!-- Rays -->
      <line v-if="rayHit" :x1="rayBoxPos.x" :y1="rayBoxPos.y" :x2="rayHit.point.x" :y2="rayHit.point.y" stroke="#f59e0b" stroke-width="2.5" />
      <line v-if="rayHit && targetType === 'mirror'" :x1="rayHit.point.x" :y1="rayHit.point.y" :x2="rayHit.point.x + reflectedDir!.x * 140" :y2="rayHit.point.y + reflectedDir!.y * 140" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="0" />
      <template v-if="rayHit && targetType === 'glass_block' && refractedDir">
        <line :x1="rayHit.point.x" :y1="rayHit.point.y" :x2="exitPoint!.x" :y2="exitPoint!.y" stroke="#60a5fa" stroke-width="2.5" />
        <line :x1="exitPoint!.x" :y1="exitPoint!.y" :x2="exitPoint!.x + rayHit.incidentDir.x * 120" :y2="exitPoint!.y + rayHit.incidentDir.y * 120" stroke="#f59e0b" stroke-width="2.5" />
      </template>

      <!-- Ray box -->
      <g v-if="isPlaced('ray_box1')">
        <g :transform="`translate(${rayBoxPos.x} ${rayBoxPos.y}) rotate(${rayBoxRotDeg})`">
          <rect x="-28" y="-16" width="42" height="32" rx="4" fill="#1f2937" class="cursor-grab active:cursor-grabbing" @pointerdown="onBodyPointerDown('raybox', $event)" />
          <circle :cx="16" :cy="0" r="7" :fill="rayBoxOn ? '#fde68a' : '#4b5563'" />
          <circle :cx="30" :cy="0" r="7" fill="transparent" class="cursor-grab active:cursor-grabbing" @pointerdown.stop="onRotateHandlePointerDown('raybox', $event)" />
        </g>
        <text :x="rayBoxPos.x" :y="rayBoxPos.y + 34" text-anchor="middle" class="fill-gray-500 dark:fill-gray-400 text-[9px] font-semibold">Ray Box</text>
      </g>

      <!-- Mirror -->
      <g v-if="targetType === 'mirror' && isPlaced(targetKey!)">
        <g :transform="`translate(${targetPos.x} ${targetPos.y}) rotate(${targetRotDeg})`">
          <rect x="-3" y="-55" width="6" height="110" fill="#94a3b8" class="cursor-grab active:cursor-grabbing" @pointerdown="onBodyPointerDown('target', $event)" />
          <circle :cx="0" :cy="-70" r="7" fill="transparent" class="cursor-grab active:cursor-grabbing" @pointerdown.stop="onRotateHandlePointerDown('target', $event)" />
        </g>
      </g>
      <!-- Glass block -->
      <g v-else-if="targetType === 'glass_block' && isPlaced(targetKey!)">
        <g :transform="`translate(${targetPos.x} ${targetPos.y}) rotate(${targetRotDeg})`">
          <rect :x="-blockWidthPx" y="-55" :width="blockWidthPx" height="110" fill="#eef6ff" fill-opacity="0.45" stroke="#94a3b8" stroke-width="1.5" class="cursor-grab active:cursor-grabbing" @pointerdown="onBodyPointerDown('target', $event)" />
          <circle :cx="0" :cy="-70" r="7" fill="transparent" class="cursor-grab active:cursor-grabbing" @pointerdown.stop="onRotateHandlePointerDown('target', $event)" />
        </g>
      </g>

      <!-- Protractor -->
      <LabProtractor v-if="isPlaced('protractor1')" :x="protractorPos.x" :y="protractorPos.y" :rotation-deg="protractorRotDeg" :armed="!!rayHit"
        @body-pointer-down="onBodyPointerDown('protractor', $event)" @rotate-handle-pointer-down="onRotateHandlePointerDown('protractor', $event)" />
    </svg>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F526}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Ray box power + protractor controls -->
    <div class="absolute right-2 top-2 sm:right-3 sm:top-3 max-w-[13rem] flex flex-col gap-2 items-end">
      <div v-if="isPlaced('ray_box1')" class="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 w-full">
        <div class="flex items-center justify-between">
          <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Ray Box Power</p>
          <LabToggle :model-value="rayBoxOn" :disabled="props.readOnly" @update:model-value="toggleRayBox" />
        </div>
      </div>

      <div v-if="isPlaced('protractor1')" class="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 w-full">
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">Measure</p>
        <div class="flex flex-col gap-1.5">
          <LabButton size="sm" :disabled="props.readOnly" @click="measureAngle('incidence')">Angle of Incidence</LabButton>
          <LabButton size="sm" variant="secondary" :disabled="props.readOnly" @click="measureAngle('outgoing')">Angle of {{ targetType === 'glass_block' ? 'Refraction' : 'Reflection' }}</LabButton>
        </div>
        <div v-if="pendingReading" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
          <div class="flex items-center gap-2">
            <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">&deg;</span></span>
            <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
          </div>
        </div>
      </div>
    </div>

    <button v-if="hasMoved" @click="resetOptics" :disabled="props.readOnly" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800/95 backdrop-blur text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 shadow-lg">Reset Optics Bench</button>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import { dirFromAngle, reflect, refract, computeRayHit, angleFromNormalDeg, type Vec2 } from './opticsEngine'
import LabProtractor from './lab2d/LabProtractor.vue'
import LabButton from './lab2d/LabButton.vue'
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

const VB_W = 600, VB_H = 420
const BENCH_Y = 400
// The ray box and target are kept close enough together (relative to the target's extent) that a
// realistic teaching angle (~20-25 degrees) still actually lands on the surface - at the original
// wider spacing even a modest rotation sent the ray sailing past the mirror entirely.
const TARGET_EXTENT = 75
const ALIGN_RADIUS = 26
const ALIGN_ANGLE_TOL = 12 // degrees

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

const targetCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'mirror' || o.object_type === 'glass_block'))
const targetType = computed(() => targetCfg.value?.object_type ?? null)
const targetKey = computed(() => targetCfg.value?.key ?? null)
const blockWidthPx = computed(() => (Number(mergedProps(targetKey.value ?? '').width_cm ?? 5)) * 8)
const refractiveIndex = computed(() => Number(mergedProps(targetKey.value ?? '').refractive_index ?? 1.5))

const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
function isPlaced(key: string) { return placedKeys.has(key) }
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Apparatus state - moving/rotating the mirror/block/protractor is a free, real adjustment
// (no step grades a specific position); only the ray box's rotate is graded, matching the one
// existing 'rotate' step. ------------------------------------------------------------------
const rayBoxPos = reactive<Vec2>({ x: 100, y: 210 })
const rayBoxRotDeg = ref(0)
const rayBoxOn = ref(false)
const targetPos = reactive<Vec2>({ x: 260, y: 210 })
const targetRotDeg = ref(180)
const protractorPos = reactive<Vec2>({ x: 430, y: 330 })
const protractorRotDeg = ref(180)
const hasMoved = ref(false)

function toggleRayBox(on: boolean) {
  if (props.readOnly) return
  rayBoxOn.value = on
  emit('action', { objectKey: 'ray_box1', action: on ? 'switch_on' : 'switch_off', value: null })
}

// --- Real ray geometry - fully reactive, so it updates the instant anything moves/rotates -----
const rayHit = computed(() => {
  if (!rayBoxOn.value || !isPlaced('ray_box1') || !targetKey.value || !isPlaced(targetKey.value)) return null
  const dir = dirFromAngle((rayBoxRotDeg.value * Math.PI) / 180)
  const normal = dirFromAngle((targetRotDeg.value * Math.PI) / 180)
  return computeRayHit(rayBoxPos, dir, targetPos, normal, TARGET_EXTENT)
})
const reflectedDir = computed(() => (rayHit.value && targetType.value === 'mirror' ? reflect(rayHit.value.incidentDir, rayHit.value.normal) : null))
const refractedDir = computed(() => (rayHit.value && targetType.value === 'glass_block' ? refract(rayHit.value.incidentDir, rayHit.value.normal, 1.0, refractiveIndex.value) : null))
const exitPoint = computed(() => {
  if (!rayHit.value || !refractedDir.value) return null
  const backFace = { x: targetPos.x - rayHit.value.normal.x * blockWidthPx.value, y: targetPos.y - rayHit.value.normal.y * blockWidthPx.value }
  const denom = refractedDir.value.x * rayHit.value.normal.x + refractedDir.value.y * rayHit.value.normal.y
  if (Math.abs(denom) < 0.001) return null
  const t = ((backFace.x - rayHit.value.point.x) * rayHit.value.normal.x + (backFace.y - rayHit.value.point.y) * rayHit.value.normal.y) / denom
  return { x: rayHit.value.point.x + refractedDir.value.x * t, y: rayHit.value.point.y + refractedDir.value.y * t }
})

// --- Drag/rotate interaction - same generic pattern for every apparatus on this bench ----------
type DragKind = 'raybox' | 'target' | 'protractor'
const dragging = ref<{ kind: DragKind; mode: 'move' | 'rotate' } | null>(null)
const svgEl = ref<SVGSVGElement | null>(null)

function svgPoint(ev: PointerEvent): Vec2 {
  const svg = svgEl.value!
  const pt = svg.createSVGPoint()
  pt.x = ev.clientX; pt.y = ev.clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const local = pt.matrixTransform(ctm.inverse())
  return { x: local.x, y: local.y }
}
function posFor(kind: DragKind) { return kind === 'raybox' ? rayBoxPos : kind === 'target' ? targetPos : protractorPos }

function onBodyPointerDown(kind: DragKind, ev: PointerEvent) {
  if (props.readOnly) return
  dragging.value = { kind, mode: 'move' }
  hasMoved.value = true
  ev.stopPropagation()
}
function onRotateHandlePointerDown(kind: DragKind, ev: PointerEvent) {
  if (props.readOnly) return
  dragging.value = { kind, mode: 'rotate' }
  hasMoved.value = true
  ev.stopPropagation()
}
function onPointerMove(ev: PointerEvent) {
  if (!dragging.value) return
  const p = svgPoint(ev)
  const { kind, mode } = dragging.value
  if (mode === 'move') {
    const pos = posFor(kind)
    pos.x = p.x; pos.y = p.y
  } else {
    const pos = posFor(kind)
    const deg = (Math.atan2(p.y - pos.y, p.x - pos.x) * 180) / Math.PI
    if (kind === 'raybox') rayBoxRotDeg.value = deg
    else if (kind === 'target') targetRotDeg.value = deg
    else protractorRotDeg.value = deg
  }
}
function onPointerUp() {
  if (!dragging.value) return
  const { kind, mode } = dragging.value
  if (kind === 'raybox' && mode === 'rotate') {
    emit('action', { objectKey: 'ray_box1', action: 'rotate', value: String(Math.round(rayBoxRotDeg.value)) })
  }
  dragging.value = null
}

// --- Protractor measurement - only valid when genuinely aligned on the real point of incidence -
const pendingReading = ref<{ value: string; mode: 'incidence' | 'outgoing' } | null>(null)
const hint = ref<string | null>(null)
function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 3500) }

function measureAngle(mode: 'incidence' | 'outgoing') {
  if (props.readOnly) return
  const hit = rayHit.value
  if (!hit) { flash('No ray is striking the surface - check the ray box and target positions.'); return }
  const centerDist = Math.hypot(protractorPos.x - hit.point.x, protractorPos.y - hit.point.y)
  if (centerDist > ALIGN_RADIUS) { flash('Position the centre of the protractor at the point where the ray meets the surface.'); return }
  const baselineDir = dirFromAngle((protractorRotDeg.value * Math.PI) / 180)
  const baselineOffAxis = angleFromNormalDeg(baselineDir, hit.normal)
  if (baselineOffAxis > ALIGN_ANGLE_TOL) { flash('Align the baseline with the normal before reading the angle.'); return }

  let vec: Vec2
  if (mode === 'incidence') {
    vec = { x: -hit.incidentDir.x, y: -hit.incidentDir.y }
  } else if (targetType.value === 'mirror') {
    vec = reflectedDir.value!
  } else {
    if (!refractedDir.value) { flash('The ray does not refract at this angle - try a smaller incident angle.'); return }
    vec = refractedDir.value
  }
  const angle = angleFromNormalDeg(vec, hit.normal)
  pendingReading.value = { value: String(Math.round(angle * 10) / 10), mode }
}

function confirmReading() {
  if (!pendingReading.value || !targetKey.value) return
  const isReflection = targetType.value === 'mirror'
  const label = pendingReading.value.mode === 'incidence' ? 'Angle of Incidence' : (isReflection ? 'Angle of Reflection' : 'Angle of Refraction')
  emit('action', { objectKey: 'protractor1', action: 'measure', value: pendingReading.value.value, unit: '°', label, targetObjectKey: targetKey.value })
  pendingReading.value = null
}

function resetOptics() {
  if (props.readOnly) return
  rayBoxPos.x = 100; rayBoxPos.y = 210; rayBoxRotDeg.value = 0; rayBoxOn.value = false
  targetPos.x = 260; targetPos.y = 210; targetRotDeg.value = 180
  protractorPos.x = 430; protractorPos.y = 330; protractorRotDeg.value = 180
  pendingReading.value = null
  hasMoved.value = false
}

onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) placedKeys.add(o.key) })
  if (!props.readOnly) flash('Pick up the apparatus, then arrange the ray box and mirror/block so the ray strikes it.')
})

function setObjectState(key: string, patch: Record<string, any>) {
  if (key === 'ray_box1' && 'state' in patch) rayBoxOn.value = patch.state === 'on'
}
defineExpose({ setObjectState })
</script>
