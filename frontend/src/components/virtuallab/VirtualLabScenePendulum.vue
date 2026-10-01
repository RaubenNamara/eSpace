<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- Selected apparatus + its actions -->
    <div v-if="selectedKey" class="absolute left-2 top-2 sm:left-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[13rem] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{{ selectedDisplayName }}</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <button v-if="selectedKey === bobKey" @click="inspectBob" class="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Inspect</button>
        <button v-if="selectedKey === rulerKey" @click="armMeasure" class="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700" :disabled="readOnly">Measure</button>
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

    <!-- Stopwatch -->
    <div class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 sm:p-3 w-32 sm:w-40 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="hidden sm:block text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">Stopwatch</p>
      <div class="bg-gray-900 rounded-lg px-2 py-1 sm:py-1.5 text-center mb-1.5 sm:mb-2">
        <span class="font-mono text-base sm:text-lg text-emerald-400 tabular-nums">{{ stopwatchText }}</span>
      </div>
      <p class="text-[10px] text-gray-400 dark:text-gray-500 mb-1.5 sm:mb-2">Oscillations: <span class="font-semibold text-gray-600 dark:text-gray-300">{{ oscillationCount }}</span></p>
      <div class="grid grid-cols-2 gap-1.5">
        <button v-if="!stopwatchRunning" @click="startStopwatch" :disabled="readOnly" class="px-2 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">Start</button>
        <button v-else @click="stopStopwatch" class="px-2 py-1.5 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600">Stop</button>
        <button @click="resetStopwatch" :disabled="readOnly" class="px-2 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 disabled:opacity-50">Reset</button>
      </div>
      <button @click="readStopwatch" :disabled="readOnly" class="mt-1.5 w-full px-2 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50">Read Time</button>
    </div>

    <!-- Controls strip - always shown from sm up; behind a toggle on phones, where the scene is
         too short to leave it permanently covering the apparatus. -->
    <button
      v-if="!showControls"
      @click="showControls = true"
      class="sm:hidden absolute left-2 bottom-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
    >Controls &middot; {{ lengthCm }} cm &middot; {{ Math.abs(Math.round(angleDeg)) }}&deg;</button>
    <div
      class="absolute left-2 right-2 bottom-2 sm:left-3 sm:right-3 sm:bottom-3 sm:mx-auto sm:max-w-5xl bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex-wrap items-center gap-x-5 gap-y-2 max-h-[calc(100%-1rem)] overflow-y-auto"
      :class="showControls ? 'flex' : 'hidden sm:flex'"
    >
      <button @click="showControls = false" class="sm:hidden absolute right-2 top-2 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      <div class="flex-1 min-w-[9rem]">
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">String Length: {{ lengthCm }} cm</p>
        <input v-model.number="lengthCm" type="range" min="10" max="50" step="1" class="w-full accent-indigo-600" :disabled="readOnly">
      </div>
      <div class="flex-1 min-w-[9rem]">
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Bob Mass: {{ massG }} g</p>
        <input v-model.number="massG" type="range" min="20" max="200" step="10" class="w-full accent-indigo-600" :disabled="readOnly">
      </div>
      <div>
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Gravity</p>
        <div class="flex gap-1">
          <button v-for="g in GRAVITY_OPTIONS" :key="g.label" @click="gravity = g.value" :disabled="readOnly"
            class="px-2 py-1 text-[11px] font-semibold rounded-lg border transition-colors disabled:opacity-50"
            :class="gravity === g.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'"
          >{{ g.label }}</button>
        </div>
      </div>
      <div class="text-center">
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Angle</p>
        <p class="text-sm font-bold text-sky-600 dark:text-sky-400 tabular-nums">{{ Math.abs(Math.round(angleDeg)) }}&deg;</p>
      </div>
      <div class="flex gap-1.5">
        <button @click="resetSwing" :disabled="readOnly" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">Reset Swing</button>
        <button @click="room?.resetView()" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>
      </div>
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
import * as THREE from 'three'
import { canvasTexture, labMaterials } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import { buildRetortStand, buildHangingRuler, type HangingRuler } from './lab3d/apparatus'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number; oscillations?: number }]
}>()

const showControls = ref(false)

const { room, unsupported, pick, pointOnPlane } = useLabScene(
  { cameraPosition: [0.3, 0.52, 1.5], target: [0, 0.3, 0], minDistance: 0.45, maxDistance: 2.2 },
  (r) => {
    buildApparatus(r.scene)
    r.onFrame((dt) => {
      physicsStep(dt)
      syncPendulum()
    })
    if (!props.readOnly) flash('Drag the brass bob sideways and let go. Drag empty space to look around.')
  },
)

function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? props.objectCatalog.find(o => o.object_type === cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}
const bobCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'specimen'))
const rulerCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'ruler'))
const stopwatchCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'stopwatch'))
const bobKey = computed(() => bobCfg.value?.key ?? 'bob1')
const rulerKey = computed(() => rulerCfg.value?.key ?? 'ruler1')

const lengthCm = ref<number>(Number(mergedProps(bobCfg.value?.key || '').length_cm ?? 25))
const massG = ref<number>(Number(mergedProps(bobCfg.value?.key || '').mass_g ?? 50))
const GRAVITY_OPTIONS = [{ label: 'Earth', value: 9.8 }, { label: 'Moon', value: 1.6 }, { label: 'Mars', value: 3.7 }]
const gravity = ref(9.8)

// --- Physics: theta'' = -(g/L) sin(theta) - damping * omega, real-time, independent of frame rate ---
const angleRad = ref(0)
const angularVelocity = ref(0)
const swinging = ref(false)
const zeroCrossings = ref(0)
const MAX_ANGLE_RAD = (60 * Math.PI) / 180
const angleDeg = computed(() => (angleRad.value * 180) / Math.PI)
const oscillationCount = computed(() => Math.floor(zeroCrossings.value / 2))

const PHYSICS_STEP = 1 / 240

/** Fixed substeps keep the simulated swing in real time whatever the frame rate. */
function physicsStep(dt: number) {
  if (!swinging.value) return
  const L = Math.max(0.05, lengthCm.value / 100)
  const damping = 0.03 * (50 / massG.value)
  let theta = angleRad.value
  let omega = angularVelocity.value
  let crossings = 0
  for (let remaining = dt; remaining > 1e-6; remaining -= PHYSICS_STEP) {
    const h = Math.min(PHYSICS_STEP, remaining)
    omega += (-(gravity.value / L) * Math.sin(theta) - damping * omega) * h
    const prev = theta
    theta += omega * h
    if (Math.sign(prev) !== Math.sign(theta) && prev !== 0) crossings++
  }
  angleRad.value = theta
  angularVelocity.value = omega
  zeroCrossings.value += crossings
}

// --- Scene (metres; bench top at y = 0; pendulum swings in the z = 0 plane) -----------------
const PIVOT = new THREE.Vector3(0, 0.72, 0)
const RULER_MAX_CM = 50
let bob: THREE.Mesh
let bobHook: THREE.Mesh
let stringMesh: THREE.Mesh
let ruler: HangingRuler | null = null
let angleArc: THREE.Line
const bobMaterial = labMaterials.brass()

/** Brass (8.5 g/cm^3) sphere of the chosen mass, enlarged 1.4x so it reads clearly on screen. */
const bobRadiusM = computed(() => Math.cbrt((3 * massG.value) / (4 * Math.PI * 8.5)) / 100 * 1.4)

function buildApparatus(scene: THREE.Scene) {
  // Stand rod sits to the left and behind the swing plane, so the bob can pass in front of it
  scene.add(buildRetortStand({ pivot: PIVOT, rodX: -0.17, armZ: -0.07, armEnd: 0.13 }))

  // Clear protractor behind the swing plane, centred on the pivot
  const protractorTex = canvasTexture(512, 512, (ctx, w, h) => {
    const cx = w / 2, cy = h / 2, R = w / 2 - 4
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(251,146,60,0.96)'
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI)
    ctx.fill()
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 18px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let a = -90; a <= 90; a += 1) {
      const rad = (a * Math.PI) / 180
      const len = a % 10 === 0 ? 26 : a % 5 === 0 ? 17 : 9
      ctx.lineWidth = a % 10 === 0 ? 2 : 1
      ctx.beginPath()
      ctx.moveTo(cx + R * Math.sin(rad), cy + R * Math.cos(rad))
      ctx.lineTo(cx + (R - len) * Math.sin(rad), cy + (R - len) * Math.cos(rad))
      ctx.stroke()
      if (a % 10 === 0 && Math.abs(a) < 90) {
        ctx.fillText(String(Math.abs(a)), cx + (R - 42) * Math.sin(rad), cy + (R - 42) * Math.cos(rad))
      }
    }
  })
  const protractor = new THREE.Mesh(
    new THREE.CircleGeometry(0.1, 64, Math.PI, Math.PI),
    new THREE.MeshBasicMaterial({ map: protractorTex, transparent: true, depthWrite: false, side: THREE.DoubleSide }),
  )
  protractor.position.set(PIVOT.x, PIVOT.y, -0.012)
  scene.add(protractor)

  // Vertical reference and live angle arc
  const refLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([PIVOT.clone(), PIVOT.clone().add(new THREE.Vector3(0, -0.11, 0))]),
    new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.006, gapSize: 0.005 }),
  )
  refLine.computeLineDistances()
  refLine.position.z = -0.006
  scene.add(refLine)

  angleArc = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(new Array(33).fill(0).map(() => new THREE.Vector3())),
    new THREE.LineBasicMaterial({ color: 0x0ea5e9 }),
  )
  angleArc.position.z = -0.005
  scene.add(angleArc)

  // String
  stringMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0011, 0.0011, 1, 8),
    new THREE.MeshStandardMaterial({ color: 0x5b5246, roughness: 0.9 }),
  )
  stringMesh.castShadow = true
  scene.add(stringMesh)

  // Bob with a small hook eye on top
  bob = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), bobMaterial)
  bob.castShadow = true
  scene.add(bob)
  bobHook = new THREE.Mesh(new THREE.TorusGeometry(0.004, 0.0011, 8, 20), labMaterials.steel())
  bobHook.castShadow = true
  scene.add(bobHook)

  // Wooden half-metre rule hanging beside the string, behind the swing plane
  if (rulerCfg.value) {
    ruler = buildHangingRuler(RULER_MAX_CM, new THREE.Vector3(0.115, PIVOT.y, -0.045), -0.07)
    scene.add(ruler.group)
  }
}

const tmpDir = new THREE.Vector3()
const UP = new THREE.Vector3(0, 1, 0)
function syncPendulum() {
  const L = lengthCm.value / 100
  const r = bobRadiusM.value
  tmpDir.set(Math.sin(angleRad.value), -Math.cos(angleRad.value), 0)

  bob.scale.setScalar(r)
  bob.position.copy(PIVOT).addScaledVector(tmpDir, L)

  const stringLen = Math.max(0.001, L - r - 0.004)
  stringMesh.scale.y = stringLen
  stringMesh.position.copy(PIVOT).addScaledVector(tmpDir, stringLen / 2)
  stringMesh.quaternion.setFromUnitVectors(UP, tmpDir.clone().negate())

  bobHook.position.copy(PIVOT).addScaledVector(tmpDir, L - r - 0.003)
  bobHook.rotation.set(0, Math.PI / 2, angleRad.value)

  const pos = angleArc.geometry.attributes.position as THREE.BufferAttribute
  const n = pos.count
  for (let i = 0; i < n; i++) {
    const a = (angleRad.value * i) / (n - 1)
    pos.setXYZ(i, PIVOT.x + 0.08 * Math.sin(a), PIVOT.y - 0.08 * Math.cos(a), 0)
  }
  pos.needsUpdate = true

  const highlight = selectedKey.value === bobKey.value
  bobMaterial.emissive.setHex(highlight ? 0x3730a3 : 0x000000)
  bobMaterial.emissiveIntensity = highlight ? 0.45 : 0
  ruler?.setArmed(measureArmed.value)
}

// --- Pointer interaction -----------------------------------------------------------------------
const swingPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const hitPoint = new THREE.Vector3()
const hoverCursor = ref('grab')
let draggingBob = false
let dragMoved = false

function pickTarget(ev: PointerEvent): 'bob' | 'string' | 'ruler' | null {
  if (!bob) return null
  const targets: THREE.Object3D[] = [bob, stringMesh]
  if (ruler) targets.push(ruler.mesh)
  const hit = pick(ev, targets)
  if (!hit) return null
  if (hit === bob) return 'bob'
  if (hit === stringMesh) return 'string'
  return 'ruler'
}

function onHover(ev: PointerEvent) {
  if (draggingBob) return
  const target = pickTarget(ev)
  hoverCursor.value = target === 'bob' || (target === 'string' && measureArmed.value) ? 'pointer' : target === 'ruler' ? 'pointer' : 'grab'
}

function onPointerDown(ev: PointerEvent) {
  const target = pickTarget(ev)
  if (!target || !room.value) return

  // Capture phase: disabling controls here stops OrbitControls from starting a camera orbit.
  room.value.controls.enabled = false
  window.addEventListener('pointerup', onPointerUp, { once: true })

  if (target === 'ruler') {
    selectObject(rulerKey.value)
    return
  }
  if (props.readOnly) {
    if (target === 'bob') selectObject(bobKey.value)
    return
  }
  if (measureArmed.value) {
    tryMeasureLength()
    return
  }
  if (target === 'bob') {
    draggingBob = true
    dragMoved = false
    swinging.value = false
    angularVelocity.value = 0
    hoverCursor.value = 'grabbing'
    window.addEventListener('pointermove', onDragMove)
  }
}

function onDragMove(ev: PointerEvent) {
  if (!draggingBob || !pointOnPlane(ev, swingPlane, hitPoint)) return
  const dx = hitPoint.x - PIVOT.x
  const dy = PIVOT.y - hitPoint.y
  const angle = Math.max(-MAX_ANGLE_RAD, Math.min(MAX_ANGLE_RAD, Math.atan2(dx, Math.max(0.001, dy))))
  if (Math.abs(angle - angleRad.value) > 0.01) dragMoved = true
  angleRad.value = angle
}

function onPointerUp() {
  if (room.value) room.value.controls.enabled = true
  window.removeEventListener('pointermove', onDragMove)
  if (!draggingBob) return
  draggingBob = false
  hoverCursor.value = 'grab'
  if (dragMoved) {
    swinging.value = true
    zeroCrossings.value = 0
  } else {
    selectObject(bobKey.value)
  }
}

// --- Selection / inspect / measure - graded via emitted actions ---------------------
const selectedKey = ref<string | null>(null)
const measureArmed = ref(false)
const inspectText = ref<string | null>(null)
const pendingReading = ref<{ value: string; unit: string; objectKey: string; targetKey: string; label: string; oscillations?: number } | null>(null)
const hint = ref<string | null>(null)

function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3500)
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
  emit('action', { objectKey: bobKey.value, action: 'inspect', value: null })
}

function armMeasure() {
  if (props.readOnly) return
  measureArmed.value = true
  pendingReading.value = null
}

function tryMeasureLength() {
  if (!rulerCfg.value || !bobCfg.value) return
  const noise = (Math.random() - 0.5) * 0.2
  const value = Math.round((lengthCm.value + noise) * 10) / 10
  pendingReading.value = { value: String(value), unit: 'cm', objectKey: rulerCfg.value.key, targetKey: bobCfg.value.key, label: 'Ruler' }
  measureArmed.value = false
}

function confirmReading() {
  if (!pendingReading.value) return
  const r = pendingReading.value
  emit('action', { objectKey: r.objectKey, action: 'measure', value: r.value, unit: r.unit, label: r.label, targetObjectKey: r.targetKey, oscillations: r.oscillations })
  pendingReading.value = null
}

// --- Stopwatch ---------------------------------------------------------------------------------
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

// Oscillations completed while the stopwatch was running (the counter keeps going between trials),
// sent with the time reading so the page can work out the period T = time / oscillations.
let oscillationsAtStart = 0
const timedOscillations = ref(0)
function startStopwatch() {
  if (props.readOnly || stopwatchRunning.value || !stopwatchCfg.value) return
  oscillationsAtStart = oscillationCount.value
  stopwatchRunning.value = true
  stopwatchStartedAt = Date.now()
  emit('action', { objectKey: stopwatchCfg.value.key, action: 'switch_on', value: null })
}
function stopStopwatch() {
  if (!stopwatchRunning.value || !stopwatchCfg.value) return
  stopwatchElapsedMs.value = currentStopwatchMs.value
  timedOscillations.value += Math.max(0, oscillationCount.value - oscillationsAtStart)
  stopwatchRunning.value = false
  emit('action', { objectKey: stopwatchCfg.value.key, action: 'switch_off', value: null })
}
function resetStopwatch() {
  stopwatchRunning.value = false
  stopwatchElapsedMs.value = 0
  zeroCrossings.value = 0
  timedOscillations.value = 0
}
function readStopwatch() {
  if (props.readOnly || !stopwatchCfg.value) return
  const value = String(Math.round(currentStopwatchMs.value / 100) / 10)
  pendingReading.value = { value, unit: 's', objectKey: stopwatchCfg.value.key, targetKey: stopwatchCfg.value.key, label: 'Stopwatch', oscillations: timedOscillations.value || undefined }
  selectedKey.value = stopwatchCfg.value.key
}

function resetSwing() {
  swinging.value = false
  angleRad.value = 0
  angularVelocity.value = 0
  zeroCrossings.value = 0
}

watch(() => selectedKey.value, () => { measureArmed.value = false })

// --- Lifecycle ---------------------------------------------------------------------------------
let tickTimer = 0
onMounted(() => {
  tickTimer = window.setInterval(() => { stopwatchTick.value++ }, 100)
})

onBeforeUnmount(() => {
  window.clearInterval(tickTimer)
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
})

function setObjectState(key: string, patch: Record<string, any>) {
  if (key === stopwatchCfg.value?.key && 'state' in patch) {
    stopwatchRunning.value = patch.state === 'on'
    if (patch.state === 'on') stopwatchStartedAt = Date.now()
  }
}
defineExpose({ setObjectState })
</script>
