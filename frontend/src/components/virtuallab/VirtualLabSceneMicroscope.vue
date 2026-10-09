<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- What the student sees through the eyepiece -->
    <div class="absolute right-2 top-2 sm:right-3 sm:top-3 flex flex-col items-center gap-1">
      <div class="rounded-full p-1.5 bg-slate-900 shadow-xl">
        <canvas ref="viewerCanvas" :width="VIEW_PX" :height="VIEW_PX" class="block rounded-full w-28 h-28 sm:w-44 sm:h-44" :style="{ filter: `blur(${showSpecimen ? blurPx * viewerCssScale : 0}px)` }"></canvas>
      </div>
      <span class="text-[10px] font-semibold text-slate-600 bg-white/80 rounded px-1.5">Eyepiece view &times;{{ objective }}</span>
    </div>

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
    <div v-if="isPlaced('microscope1')" class="absolute left-2 bottom-2 right-2 sm:left-3 sm:bottom-3 sm:right-auto sm:w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2.5 max-h-[55%] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Illumination</p>
        <LabToggle :model-value="lightOn" :disabled="readOnly" @update:model-value="toggleLight" />
      </div>
      <div v-if="lightOn">
        <LabSlider label="Brightness" v-model="lightLevel" :min="0" :max="100" :step="5" :disabled="readOnly" />
      </div>

      <div>
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Objective Lens</p>
        <div class="flex gap-1.5">
          <LabButton v-for="m in [40, 100, 400]" :key="m" size="sm" :variant="objective === m ? 'primary' : 'secondary'" :disabled="readOnly" @click="selectObjective(m)">&times;{{ m }}</LabButton>
        </div>
      </div>

      <div v-if="slideOnStage">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Coarse Focus: {{ Math.round(focusPosition) }}</p>
        <input :value="focusPosition" @change="setCoarseFocus(Number(($event.target as HTMLInputElement).value))" type="range" min="0" max="100" step="10" class="w-full accent-indigo-600" :disabled="readOnly">
      </div>
      <div v-if="slideOnStage" class="flex items-center justify-between">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Fine Focus</p>
        <div class="flex gap-1.5">
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="nudgeFineFocus(-1)">-</LabButton>
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="nudgeFineFocus(1)">+</LabButton>
        </div>
      </div>

      <div v-if="slideOnStage">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Stage Position</p>
        <div class="grid grid-cols-3 gap-1 w-28">
          <span></span>
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="moveStage(0, -8)">&uarr;</LabButton>
          <span></span>
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="moveStage(-8, 0)">&larr;</LabButton>
          <LabButton size="sm" variant="ghost" disabled>&#9679;</LabButton>
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="moveStage(8, 0)">&rarr;</LabButton>
          <span></span>
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="moveStage(0, 8)">&darr;</LabButton>
          <span></span>
        </div>
      </div>

      <div class="flex flex-wrap gap-1.5">
        <LabButton v-if="slideOnStage" size="sm" :disabled="readOnly" @click="observeSpecimen">Observe</LabButton>
        <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="resetMicroscope">Reset Microscope</LabButton>
        <LabButton size="sm" variant="secondary" @click="room?.resetView()">Reset View</LabButton>
      </div>
    </div>

    <div v-if="inspectText" class="absolute right-2 top-40 sm:right-3 sm:top-56 max-w-[13rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
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
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { labMaterials } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import LabSlider from './ui/LabSlider.vue'
import LabToggle from './ui/LabToggle.vue'
import { focusQuality, focusBlurPx } from './microscopeEngine'
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

const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
function isPlaced(key: string) { return placedKeys.has(key) }
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Illumination, objective, focus, stage (same rules as before) -----------------------------------
const lightOn = ref(false)
const lightLevel = ref(70)
function toggleLight(on: boolean) {
  if (props.readOnly) return
  lightOn.value = on
  emit('action', { objectKey: 'microscope1', action: on ? 'switch_on' : 'switch_off', value: null })
}

const objective = ref(40)
const hasObservedFocusedLowPower = ref(false)
const coarseFocusAtHighPowerCount = ref(0)
function selectObjective(mag: number) {
  if (props.readOnly) return
  objective.value = mag
  if (mag === 400 && !hasObservedFocusedLowPower.value) flash('Start with the low-power objective to locate the specimen before jumping to high power.')
  emit('action', { objectKey: 'microscope1', action: 'select_objective', value: String(mag) })
}

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

const stageX = ref(0)
const stageY = ref(0)
const specimenOffsetX = ref(0)
const specimenOffsetY = ref(0)
function moveStage(dx: number, dy: number) {
  if (props.readOnly) return
  stageX.value = Math.max(-70, Math.min(70, stageX.value + dx))
  stageY.value = Math.max(-70, Math.min(70, stageY.value + dy))
}

const slideOnStage = ref(false)
function mountSlide() {
  slideOnStage.value = true
  // A freshly mounted slide is never already centred or focused - both need real correction
  const optimal = Number(mergedProps('slide1').optimal_focus ?? 50)
  const tolerance = Number(mergedProps('slide1').focus_tolerance ?? 6)
  const sign = Math.random() < 0.5 ? -1 : 1
  focusPosition.value = Math.max(0, Math.min(100, optimal + tolerance * (3 + Math.random() * 3) * sign))
  const offAngle = Math.random() * Math.PI * 2
  const offMag = 30 + Math.random() * 20
  specimenOffsetX.value = Math.cos(offAngle) * offMag
  specimenOffsetY.value = Math.sin(offAngle) * offMag
  emit('action', { objectKey: 'slide1', action: 'move', value: 'microscope1' })
}

// --- Eyepiece view (2D canvas) ---------------------------------------------------------------------
const VIEW_PX = 240
const CELL_SPACING = 34
const viewerCanvas = useTemplateRef<HTMLCanvasElement>('viewerCanvas')
/** The blur model is in "view pixels" of a 220px viewer; scale to the displayed viewer size. */
const viewerCssScale = ref(0.8)
const fieldOfViewRadius = (mag: number) => (mag === 40 ? 140 : mag === 100 ? 70 : 25)
const showSpecimen = computed(() => lightOn.value && slideOnStage.value)
const cellColor = computed(() => mergedProps('slide1').cell_color ?? '#86efac')
const nucleusColor = computed(() => mergedProps('slide1').nucleus_color ?? '#166534')
const viewCenter = computed(() => ({ x: specimenOffsetX.value - stageX.value, y: specimenOffsetY.value - stageY.value }))
const isSpecimenVisible = computed(() => Math.hypot(viewCenter.value.x, viewCenter.value.y) <= fieldOfViewRadius(objective.value))
const blurPx = computed(() => focusBlurPx(focusPosition.value, Number(mergedProps('slide1').optimal_focus ?? 50), Number(mergedProps('slide1').focus_tolerance ?? 6), objective.value))

function drawViewer() {
  const c = viewerCanvas.value
  const ctx = c?.getContext('2d')
  if (!c || !ctx) return
  const R = VIEW_PX / 2
  ctx.clearRect(0, 0, VIEW_PX, VIEW_PX)
  ctx.save()
  ctx.beginPath(); ctx.arc(R, R, R, 0, Math.PI * 2); ctx.clip()
  ctx.fillStyle = !lightOn.value ? '#020617' : lightLevel.value < 25 ? '#334155' : lightLevel.value > 88 ? '#fefefe' : '#f8fafc'
  ctx.fillRect(0, 0, VIEW_PX, VIEW_PX)
  if (showSpecimen.value) {
    const fov = fieldOfViewRadius(objective.value)
    const scale = R / fov
    const { x: cx, y: cy } = viewCenter.value
    const alpha = lightLevel.value > 88 ? 0.35 : 0.85
    ctx.globalAlpha = alpha
    for (let gx = Math.floor((cx - fov) / CELL_SPACING) * CELL_SPACING; gx <= cx + fov; gx += CELL_SPACING) {
      for (let gy = Math.floor((cy - fov) / CELL_SPACING) * CELL_SPACING; gy <= cy + fov; gy += CELL_SPACING) {
        if (Math.hypot(gx - cx, gy - cy) > fov * 1.05) continue
        const x = R + (gx - cx) * scale, y = R + (gy - cy) * scale, s = CELL_SPACING * scale * 0.85
        ctx.fillStyle = cellColor.value
        ctx.strokeStyle = nucleusColor.value
        ctx.lineWidth = Math.max(1, s * 0.03)
        ctx.beginPath(); ctx.roundRect(x - s / 2, y - s / 2, s, s * 0.72, s * 0.06); ctx.fill(); ctx.stroke()
        ctx.fillStyle = nucleusColor.value
        ctx.beginPath(); ctx.arc(x + s * 0.12, y, s * 0.16, 0, Math.PI * 2); ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  }
  ctx.restore()
}
watch([showSpecimen, lightLevel, objective, viewCenter, cellColor, nucleusColor], drawViewer, { deep: true })

// --- 3D microscope (metres, bench top y = 0) -----------------------------------------------------------
const STAGE_Y = 0.115
const SLIDE_REST = new THREE.Vector3(0.13, 0.002, 0.09)
const OBJECTIVE_ANGLE: Record<number, number> = { 40: 0, 100: (2 * Math.PI) / 3, 400: (4 * Math.PI) / 3 }

let scopeGroup: THREE.Group
let stageGroup: THREE.Group
let slide: THREE.Group
let lampMat: THREE.MeshStandardMaterial
let lampLight: THREE.PointLight
let nosepiece: THREE.Group
let coarseKnobs: THREE.Object3D[] = []
let fineKnobs: THREE.Object3D[] = []

function buildMicroscope(): THREE.Group {
  const g = new THREE.Group()
  const enamel = new THREE.MeshStandardMaterial({ color: 0xeef0f2, roughness: 0.35, metalness: 0.1 })
  const black = new THREE.MeshStandardMaterial({ color: 0x1f2328, roughness: 0.4, metalness: 0.3 })
  const add = (m: THREE.Mesh, parent: THREE.Object3D = g) => { m.castShadow = true; parent.add(m); return m }

  add(new THREE.Mesh(new RoundedBoxGeometry(0.13, 0.022, 0.17, 3, 0.006), enamel)).position.set(0, 0.011, -0.02)
  add(new THREE.Mesh(new RoundedBoxGeometry(0.035, 0.1, 0.035, 2, 0.006), enamel)).position.set(0, 0.07, -0.08)
  const armCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.1, -0.085), new THREE.Vector3(0, 0.2, -0.085), new THREE.Vector3(0, 0.27, -0.05), new THREE.Vector3(0, 0.29, -0.012)])
  add(new THREE.Mesh(new THREE.TubeGeometry(armCurve, 24, 0.016, 12, false), enamel))

  // Lamp in the base, condenser under the stage
  const lamp = add(new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.02, 24), black))
  lamp.position.set(0, 0.032, 0)
  lampMat = new THREE.MeshStandardMaterial({ color: 0xfff7d6, emissive: 0xfff1b0, emissiveIntensity: 0, roughness: 0.2 })
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.003, 24), lampMat)
  lens.position.set(0, 0.043, 0)
  g.add(lens)
  // Short range so it lights the slide from below without spilling onto the bench
  lampLight = new THREE.PointLight(0xfff1c0, 0, 0.06, 2)
  lampLight.position.set(0, STAGE_Y - 0.03, 0)
  g.add(lampLight)
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.018, 20), black)).position.set(0, STAGE_Y - 0.014, 0)

  // Stage (moves with the stage controls) with two chrome clips
  stageGroup = new THREE.Group()
  stageGroup.position.y = STAGE_Y
  add(new THREE.Mesh(new RoundedBoxGeometry(0.11, 0.008, 0.1, 2, 0.002), black), stageGroup)
  for (const x of [-0.03, 0.03]) {
    const clip = add(new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.0015, 0.04), labMaterials.chrome()), stageGroup)
    clip.position.set(x, 0.0055, 0.01)
  }
  g.add(stageGroup)

  // Body tube and eyepiece
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.09, 24), black)).position.set(0, 0.255, 0)
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.011, 0.04, 24), black)).position.set(0, 0.32, 0)
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.0095, 0.0095, 0.004, 24), labMaterials.chrome())).position.set(0, 0.341, 0)

  // Revolving nosepiece with three objectives (red x4, yellow x10, blue x40 bands)
  nosepiece = new THREE.Group()
  nosepiece.position.set(0, 0.205, 0)
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.022, 0.012, 32), labMaterials.chrome()), nosepiece)
  const bands = [0xdc2626, 0xeab308, 0x2563eb]
  const lengths = [0.022, 0.028, 0.034]
  ;[0, 1, 2].forEach((i) => {
    const holder = new THREE.Group()
    holder.rotation.y = -(2 * Math.PI * i) / 3
    const obj = new THREE.Group()
    obj.position.set(0, -0.006, 0.011)
    obj.rotation.x = 0.35
    const barrel = add(new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0045, lengths[i], 20), labMaterials.chrome()), obj)
    barrel.position.y = -lengths[i] / 2
    const band = add(new THREE.Mesh(new THREE.CylinderGeometry(0.0058, 0.0058, 0.003, 20), new THREE.MeshStandardMaterial({ color: bands[i], roughness: 0.4 })), obj)
    band.position.y = -lengths[i] * 0.35
    holder.add(obj)
    nosepiece.add(holder)
  })
  g.add(nosepiece)

  // Coarse (large) and fine (small) focus knobs on both sides
  for (const s of [-1, 1]) {
    const coarse = add(new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.01, 24), black))
    coarse.rotation.z = Math.PI / 2
    coarse.position.set(s * 0.03, 0.09, -0.08)
    const fine = add(new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.01, 20), black))
    fine.rotation.z = Math.PI / 2
    fine.position.set(s * 0.041, 0.09, -0.08)
    coarseKnobs.push(coarse)
    fineKnobs.push(fine)
  }
  return g
}

function buildSlide(): THREE.Group {
  const g = new THREE.Group()
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.0012, 0.025), new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.55, roughness: 0.05, depthWrite: false }))
  const cover = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.0003, 0.02), new THREE.MeshStandardMaterial({ color: 0xf0f9ff, transparent: true, opacity: 0.5, roughness: 0.05, depthWrite: false }))
  cover.position.y = 0.0008
  const stain = new THREE.Mesh(new THREE.CircleGeometry(0.006, 24), new THREE.MeshStandardMaterial({ color: new THREE.Color(mergedProps('slide1').cell_color ?? '#86efac'), transparent: true, opacity: 0.7 }))
  stain.rotation.x = -Math.PI / 2
  stain.position.y = 0.00065
  const label = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.0014, 0.024), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 }))
  label.position.x = -0.027
  const zone = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.02, 0.04), new THREE.MeshBasicMaterial({ visible: false }))
  g.add(glass, cover, stain, label, zone)
  return g
}

function buildScene(scene: THREE.Scene) {
  scopeGroup = buildMicroscope()
  slide = buildSlide()
  scene.add(scopeGroup, slide)
}

function syncScene() {
  scopeGroup.visible = isPlaced('microscope1')
  slide.visible = isPlaced('slide1')

  const k = lightOn.value ? 0.3 + lightLevel.value / 100 : 0
  lampMat.emissiveIntensity = k * 2.5
  lampLight.intensity = k * 0.25

  // Nosepiece turns to put the selected objective in the light path (front of the revolver)
  const target = OBJECTIVE_ANGLE[objective.value] ?? 0
  nosepiece.rotation.y += (target - nosepiece.rotation.y) * 0.2
  coarseKnobs.forEach(kn => { kn.rotation.x = focusPosition.value * 0.12 })
  fineKnobs.forEach(kn => { kn.rotation.x = focusPosition.value * 0.6 })

  // Stage moves with the stage controls and rises slightly with focus
  stageGroup.position.set(stageX.value * 0.0003, STAGE_Y + (focusPosition.value - 50) * 0.00006, stageY.value * 0.0003)

  if (dragging) {
    slide.position.copy(dragPoint)
  } else if (slideOnStage.value) {
    slide.position.set(stageGroup.position.x, stageGroup.position.y + 0.0046, stageGroup.position.z)
  } else {
    slide.position.copy(SLIDE_REST)
  }
}

// --- Dragging the slide onto the stage ------------------------------------------------------------------
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.02)
const dragPoint = new THREE.Vector3()
const hoverCursor = ref('grab')
let dragging = false

function onHover(ev: PointerEvent) {
  if (dragging) return
  hoverCursor.value = slide && !slideOnStage.value && slide.visible && pick(ev, [slide]) ? 'grab' : 'default'
}

function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  if (props.readOnly || slideOnStage.value || !slide?.visible || !pick(ev, [slide]) || !room.value) return
  room.value.controls.enabled = false
  dragging = true
  hoverCursor.value = 'grabbing'
  pointOnPlane(ev, dragPlane, dragPoint)
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onPointerUp, { once: true })
}
function onDragMove(ev: PointerEvent) {
  if (!dragging) return
  pointOnPlane(ev, dragPlane, dragPoint)
  dragPoint.y = Math.max(0.002, dragPoint.y)
}
function onPointerUp() {
  window.removeEventListener('pointermove', onDragMove)
  if (room.value) room.value.controls.enabled = true
  if (!dragging) return
  dragging = false
  hoverCursor.value = 'grab'
  const nearStage = Math.abs(dragPoint.x) < 0.06 && Math.abs(dragPoint.y - STAGE_Y) < 0.05
  if (nearStage && isPlaced('microscope1')) mountSlide()
  else flash(isPlaced('microscope1') ? 'Drag the slide onto the microscope stage.' : 'Place the microscope from the tray first.')
}

// --- Observe / record -------------------------------------------------------------------------------------
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

  emit('action', { objectKey: 'slide1', action: 'inspect', value, label: `Observation at ×${objective.value} (${value.replace('_', ' ')})` })
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

const HOME_POS: THREE.Vector3Tuple = [0.2, 0.34, 0.55]
const HOME_TARGET: THREE.Vector3Tuple = [0.02, 0.15, 0]
const { room, unsupported, pick, pointOnPlane, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.2, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildScene(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the microscope and slide from the tray, then drag the slide onto the stage.')
  },
)

let resizeObs: ResizeObserver | null = null
onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) placedKeys.add(o.key) })
  drawViewer()
  if (viewerCanvas.value) {
    resizeObs = new ResizeObserver(() => { viewerCssScale.value = (viewerCanvas.value?.clientWidth ?? 176) / 220 })
    resizeObs.observe(viewerCanvas.value)
  }
})
onBeforeUnmount(() => {
  resizeObs?.disconnect()
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
})

function setObjectState(key: string, patch: Record<string, any>) {
  if (key === 'microscope1' && 'state' in patch) lightOn.value = patch.state === 'on'
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
