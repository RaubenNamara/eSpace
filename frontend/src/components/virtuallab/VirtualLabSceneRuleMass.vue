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
          <span class="truncate">{{ trayLabel(item) }}</span>
        </button>
      </div>
    </div>

    <!-- Controls once the rule hangs from the clamp -->
    <div v-if="ruleMounted" class="absolute right-2 top-2 sm:right-3 sm:top-3 w-[13rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-4rem)] overflow-y-auto space-y-2 text-xs">
      <div>
        <p class="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-[10px] mb-1" title="Slide the rule through the loop - or drag the rule sideways">Thread loop (pivot)</p>
        <div class="grid grid-cols-4 gap-1">
          <LabButton v-for="b in NUDGES" :key="'p' + b.d" size="sm" :disabled="readOnly" @click="nudgePivot(b.d)">{{ b.label }}</LabButton>
        </div>
      </div>
      <div class="pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-[10px] mb-1">100 g mass</p>
        <template v-if="massMarkCm !== null">
          <p class="text-[11px] text-gray-600 dark:text-gray-300 mb-1.5">Hanging at the <strong>{{ massMarkCm.toFixed(1) }} cm</strong> mark</p>
          <div class="grid grid-cols-4 gap-1 mb-1.5">
            <LabButton v-for="b in NUDGES" :key="'m' + b.d" size="sm" :disabled="readOnly" @click="nudgeMass(b.d)">{{ b.label }}</LabButton>
          </div>
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="takeOffMass">Take the mass off</LabButton>
        </template>
        <p v-else-if="placedKeys.has(massKey)" class="text-[11px] text-gray-500 dark:text-gray-400">Drag the mass under the rule to hang it from a thread.</p>
        <p v-else class="text-[11px] text-gray-500 dark:text-gray-400">Take the mass from the tray first.</p>
      </div>
      <div class="pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-[10px] mb-1">Position of the thread loop</p>
        <LabButton v-if="!pendingReading" size="sm" :disabled="readOnly" @click="measurePivot">Measure</LabButton>
        <div v-else>
          <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{{ pendingReading.label }}</p>
          <div class="flex items-center gap-2">
            <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">cm</span></span>
            <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Qualitative balance feedback only - the numbers are for the student to read -->
    <div v-if="ruleMounted" class="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :class="isBalanced ? 'bg-emerald-500' : 'bg-amber-400'"></span>
      <span class="text-xs font-medium text-gray-600 dark:text-gray-300">{{ isBalanced ? 'Balanced - level' : tiltText }}</span>
    </div>

    <button @click="room?.resetView()" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
/*
 * Mass of a metre rule by the principle of moments (render_component 'metre_rule_mass').
 *
 * The rule hangs from the retort stand's clamp by a thread loop at the pivot P, which the student
 * slides along it. Its own weight acts at its centre of gravity C (hidden: rule props cg_cm, mass_g);
 * the 100 g mass hangs from a thread at mark a. About P, the net moment is
 *     M (C - P) + 100 (a - P)   [g cm, + towards the 100 cm end]
 * and the rule tilts towards the larger side until the student finds P where it is level:
 * P = (100 a + M C) / (100 + M). Readings of P are only taken when the rule is level.
 * Then x = P - a, z = C - P and 100 x = M z (the student's graph of x against z has gradient M/100).
 */
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { canvasTexture } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import { buildRetortStand } from './lab3d/apparatus'
import { createObjectMesh } from './labObjectFactory'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import type { CameraView } from './VirtualLabScene.vue'

/** One recorded balance, kept with the attempt for the analysis and its marking. */
export interface RuleMassTrial {
  kind: 'c' | 'pivot'
  /** Mark the 100 g mass hung at (null when the rule balanced alone, i.e. finding C) */
  mass_cm: number | null
  /** The reading the student recorded */
  pivot_cm: number
  /** Where the rule truly balances for this set-up */
  true_pivot_cm: number
  rule_mass_g: number
  cg_cm: number
}
export interface RuleMassRecord {
  /** Tried to take a reading while the rule was still tilted */
  unbalanced_attempts: number
  /** Hung the mass on a different mark from the one the step asked for */
  wrong_mark_attempts: number
}

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
  currentStep?: { required_action: string; target_object_key: string | null; expected_value: string | null } | null
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; targetObjectKey?: string | null; ruleTrial?: RuleMassTrial; ruleRecord?: RuleMassRecord }]
}>()

function catalogFor(objectType: string) {
  return props.objectCatalog.find(o => o.object_type === objectType)
}
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}
function trayLabel(item: SceneObjectConfig) {
  if (item.object_type === 'mass_piece') return `${massG.value} g mass`
  return catalogFor(item.object_type)?.display_name || item.object_type
}

const standKey = computed(() => props.sceneObjects.find(o => o.object_type === 'retort_stand')?.key ?? 'stand1')
const ruleKey = computed(() => props.sceneObjects.find(o => o.object_type === 'metre_rule')?.key ?? 'rule1')
const massKey = props.sceneObjects.find(o => o.object_type === 'mass_piece')?.key ?? 'mass1'
const massG = computed(() => Number(mergedProps(massKey).mass_g ?? 100))
/** The rule's own (hidden) mass and centre of gravity - what the practical finds */
const ruleMassG = computed(() => Number(mergedProps(ruleKey.value).mass_g ?? 86))
const cgCm = computed(() => Number(mergedProps(ruleKey.value).cg_cm ?? 49.6))

const NUDGES = [{ d: -1, label: '-1 cm' }, { d: -0.1, label: '-1 mm' }, { d: 0.1, label: '+1 mm' }, { d: 1, label: '+1 cm' }]

// --- Apparatus tray ------------------------------------------------------------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => !placedKeys.has(o.key)))
let readySent = false
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  if (!readySent && trayItems.value.length === 0) {
    readySent = true
    emit('action', { objectKey: null, action: 'move', value: 'apparatus_ready', ruleRecord: { ...record } })
  }
}

// --- Physics --------------------------------------------------------------------------------------
const CLAMP = new THREE.Vector3(0, 0.6, 0)
const RULE_REST = new THREE.Vector3(0, 0.42, 0.35)
const THREAD_LEN = 0.1
const MAX_ANGLE = 0.3
const SENSITIVITY = 0.00035 // rad per g cm of net moment
const BALANCE_TOLERANCE_GCM = 20 // within this many g cm the rule reads as level

const ruleMounted = ref(false)
/** Mark on the rule where the thread loop (pivot) is, cm */
const pivotCm = ref(30)
/** Mark the 100 g mass hangs from, cm (null = not hung) */
const massMarkCm = ref<number | null>(null)
const record = reactive<RuleMassRecord>({ unbalanced_attempts: 0, wrong_mark_attempts: 0 })

const round1 = (n: number) => Math.round(n * 10) / 10
const netMomentGcm = computed(() => {
  let m = ruleMassG.value * (cgCm.value - pivotCm.value)
  if (massMarkCm.value !== null) m += massG.value * (massMarkCm.value - pivotCm.value)
  return m
})
const targetAngle = computed(() => Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, -netMomentGcm.value * SENSITIVITY)))
const isBalanced = computed(() => Math.abs(netMomentGcm.value) <= BALANCE_TOLERANCE_GCM)
const tiltText = computed(() => (netMomentGcm.value > 0 ? 'Tilting down on the 100 cm side' : 'Tilting down on the 0 cm side'))
const displayAngle = ref(0)

let stand: THREE.Group
let ruleGroup: THREE.Group
let ruleBody: THREE.Group
let ruleGrabZone: THREE.Mesh
let massGroup: THREE.Group
let massThread: THREE.Mesh
let pivotThread: THREE.Mesh

/** Plain cm scale, 0 at the left end - C is not marked: finding it is part of the practical. */
function rulerStripTexture() {
  return canvasTexture(2048, 160, (ctx, w) => {
    ctx.fillStyle = '#eab308'
    ctx.fillRect(0, 0, w, 160)
    ctx.strokeStyle = '#111827'
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 26px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    for (let mm = 0; mm <= 1000; mm += 5) {
      const cm = mm / 10
      const x = (cm / 100) * w
      const tall = mm % 100 === 0
      const len = tall ? 56 : mm % 50 === 0 ? 40 : mm % 10 === 0 ? 26 : 12
      ctx.lineWidth = tall ? 3 : mm % 10 === 0 ? 1.5 : 1
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, len)
      ctx.stroke()
      if (tall) ctx.fillText(String(cm), Math.min(w - 18, Math.max(18, x)), len + 4)
    }
  })
}

function buildApparatus(scene: THREE.Scene) {
  stand = buildRetortStand({ pivot: CLAMP, rodX: -0.15, armZ: -0.07, armEnd: 0.12 })
  scene.add(stand)

  // ruleGroup sits at the pivot and rotates about it; ruleBody inside it is shifted so the mark
  // under the thread loop is at the group's origin
  ruleGroup = new THREE.Group()
  ruleBody = new THREE.Group()
  const face = new THREE.MeshStandardMaterial({ map: rulerStripTexture(), roughness: 0.6 })
  const edge = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.6 })
  const ruleMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 0.012, 0.03), [edge, edge, face, edge, edge, edge])
  ruleMesh.position.y = -0.015
  ruleMesh.castShadow = true
  ruleBody.add(ruleMesh)
  ruleGrabZone = new THREE.Mesh(new THREE.BoxGeometry(1, 0.08, 0.1), new THREE.MeshBasicMaterial({ visible: false }))
  ruleGrabZone.position.y = -0.015
  ruleBody.add(ruleGrabZone)
  ruleGroup.add(ruleBody)
  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.01, 0.0016, 8, 20), new THREE.MeshStandardMaterial({ color: 0x1f2937 }))
  loop.rotation.y = Math.PI / 2
  loop.position.y = -0.015
  ruleGroup.add(loop)
  scene.add(ruleGroup)

  const threadMat = new THREE.MeshStandardMaterial({ color: 0xd6d3c4, roughness: 0.85 })
  pivotThread = new THREE.Mesh(new THREE.CylinderGeometry(0.0012, 0.0012, 1, 8), threadMat)
  scene.add(pivotThread)
  massThread = new THREE.Mesh(new THREE.CylinderGeometry(0.0012, 0.0012, THREAD_LEN, 8), threadMat)
  massThread.castShadow = true
  scene.add(massThread)

  massGroup = createObjectMesh('mass_piece', massKey, `${massG.value} g mass`, { ...mergedProps(massKey), mass_g: massG.value })
  massGroup.scale.setScalar(0.22)
  scene.add(massGroup)
}

/** World point of mark `cm` on the rule, as it tilts about the pivot. */
function markWorldPoint(cm: number, angle: number): THREE.Vector3 {
  const d = (cm - pivotCm.value) / 100
  return new THREE.Vector3(CLAMP.x + d * Math.cos(angle), CLAMP.y - 0.06 + d * Math.sin(angle) - 0.015, CLAMP.z)
}

function syncScene(dt: number) {
  const diff = targetAngle.value - displayAngle.value
  displayAngle.value = Math.abs(diff) < 0.0005 ? targetAngle.value : displayAngle.value + diff * (1 - Math.exp(-dt * 6))

  stand.visible = placedKeys.has(standKey.value)
  ruleGroup.visible = placedKeys.has(ruleKey.value)
  ruleGrabZone.visible = ruleGroup.visible
  ruleBody.position.x = (50 - pivotCm.value) / 100
  if (ruleMounted.value) {
    // the loop hangs 6 cm below the clamp on its thread
    ruleGroup.position.set(CLAMP.x, CLAMP.y - 0.06, CLAMP.z)
    ruleGroup.rotation.z = displayAngle.value
    pivotThread.visible = true
    pivotThread.scale.y = 0.06 - 0.015
    pivotThread.position.set(CLAMP.x, CLAMP.y - (0.06 - 0.015) / 2, CLAMP.z)
  } else {
    pivotThread.visible = false
    ruleGroup.rotation.z = 0
    ruleGroup.position.copy(dragging?.kind === 'rule' ? dragPoint : RULE_REST)
  }

  massGroup.visible = placedKeys.has(massKey)
  const draggingMass = dragging?.kind === 'mass'
  if (draggingMass) {
    massGroup.position.copy(dragPoint)
    massThread.visible = false
  } else if (massMarkCm.value !== null && ruleMounted.value) {
    const top = markWorldPoint(massMarkCm.value, displayAngle.value)
    massGroup.position.set(top.x, top.y - THREAD_LEN, top.z)
    massThread.visible = true
    massThread.position.set(top.x, top.y - THREAD_LEN / 2, top.z)
  } else {
    massGroup.position.set(0.25, 0.03, 0.15)
    massThread.visible = false
  }
}

// --- Dragging ---------------------------------------------------------------------------------------
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const dragPoint = new THREE.Vector3()
const hoverCursor = ref('grab')
type Target = { kind: 'rule' } | { kind: 'mass' }
let dragging: (Target & { startX?: number; startPivot?: number }) | null = null

function pickTarget(ev: PointerEvent): Target | null {
  if (!ruleGrabZone) return null
  const targets: THREE.Object3D[] = []
  if (placedKeys.has(ruleKey.value)) targets.push(ruleGrabZone)
  if (placedKeys.has(massKey)) targets.push(massGroup)
  const hit = pick(ev, targets)
  if (!hit) return null
  return hit === massGroup ? { kind: 'mass' } : { kind: 'rule' }
}
function onHover(ev: PointerEvent) {
  if (dragging) return
  hoverCursor.value = pickTarget(ev) ? 'pointer' : 'grab'
}
function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  const target = pickTarget(ev)
  if (!target || !room.value || props.readOnly) return
  room.value.controls.enabled = false
  window.addEventListener('pointerup', onPointerUp, { once: true })
  pointOnPlane(ev, dragPlane, dragPoint)
  dragging = target.kind === 'rule' && ruleMounted.value ? { ...target, startX: dragPoint.x, startPivot: pivotCm.value } : target
  hoverCursor.value = 'grabbing'
  window.addEventListener('pointermove', onDragMove)
}
function onDragMove(ev: PointerEvent) {
  if (!dragging) return
  pointOnPlane(ev, dragPlane, dragPoint)
  dragPoint.y = Math.max(0.02, dragPoint.y)
  if (dragging.kind === 'rule' && ruleMounted.value && dragging.startX !== undefined) {
    // sliding the rule right moves the loop towards its 0 cm end
    setPivot(dragging.startPivot! - (dragPoint.x - dragging.startX) * 100)
  }
}
function onPointerUp() {
  window.removeEventListener('pointermove', onDragMove)
  if (room.value) room.value.controls.enabled = true
  if (!dragging) return
  const was = dragging
  dragging = null
  hoverCursor.value = 'grab'

  if (was.kind === 'rule') {
    if (ruleMounted.value) return
    if (dragPoint.distanceTo(CLAMP) < 0.12 && placedKeys.has(standKey.value)) {
      ruleMounted.value = true
      emit('action', { objectKey: ruleKey.value, action: 'move', value: standKey.value, ruleRecord: { ...record } })
    } else {
      flash(placedKeys.has(standKey.value) ? 'Drag the rule up to the retort stand’s clamp.' : 'Place the retort stand from the tray first.')
    }
    return
  }
  // the mass: hang it where it was dropped under the rule, to the nearest half centimetre
  if (!ruleMounted.value) { flash('Hang the metre rule on the stand first.'); return }
  const mark = Math.round((pivotCm.value + (dragPoint.x - CLAMP.x) * 100) * 2) / 2
  const underRule = mark >= 1 && mark <= 99 && dragPoint.y > CLAMP.y - 0.5 && dragPoint.y < CLAMP.y + 0.05
  if (underRule) setMassMark(mark)
  else if (massMarkCm.value !== null) takeOffMass()
  else flash('Drag the mass just under the rule to hang it from a thread.')
}

// --- Controls ------------------------------------------------------------------------------------
function setPivot(cm: number) {
  pivotCm.value = Math.min(95, Math.max(5, round1(cm)))
  pendingReading.value = null
}
function nudgePivot(d: number) {
  if (props.readOnly) return
  setPivot(pivotCm.value + d)
}
function setMassMark(cm: number) {
  massMarkCm.value = Math.min(99, Math.max(1, round1(cm)))
  pendingReading.value = null
  checkMassStep()
}
function nudgeMass(d: number) {
  if (props.readOnly || massMarkCm.value === null) return
  setMassMark(massMarkCm.value + d)
}
function takeOffMass() {
  massMarkCm.value = null
  pendingReading.value = null
}

/** The mark the current step wants the mass on, if it is a "hang the mass" step. */
const stepMark = computed(() => {
  const st = props.currentStep
  if (!st || st.required_action !== 'move' || st.target_object_key !== massKey || st.expected_value === null) return null
  const n = Number(st.expected_value)
  return Number.isFinite(n) ? n : null
})
let lastMassEmit: string | null = null
function checkMassStep() {
  if (massMarkCm.value === null || stepMark.value === null) return
  if (Math.abs(massMarkCm.value - stepMark.value) <= 0.05) {
    const v = stepMark.value.toFixed(1)
    if (lastMassEmit === v) return
    lastMassEmit = v
    emit('action', { objectKey: massKey, action: 'move', value: v, unit: 'cm', ruleRecord: { ...record } })
  }
}
// The step may move on to "hang at 15 cm" while the mass already sits there
watch(stepMark, () => checkMassStep())

// --- Measuring the pivot ----------------------------------------------------------------------------
const pendingReading = ref<{ value: string; label: string; trial: RuleMassTrial } | null>(null)
const hint = ref<string | null>(null)
function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3800)
}
function measurePivot() {
  if (props.readOnly) return
  const st = props.currentStep
  if (st && (st.required_action !== 'measure' || (st.target_object_key && st.target_object_key !== ruleKey.value))) {
    flash('Follow the steps - a reading is taken once the rule has been balanced for this step.')
    return
  }
  if (!isBalanced.value) {
    record.unbalanced_attempts++
    flash('The rule is not level yet - move the thread loop until it balances, then measure.')
    return
  }
  const withMass = massMarkCm.value !== null
  const M = ruleMassG.value, C = cgCm.value
  const truePivot = withMass ? (massG.value * massMarkCm.value! + M * C) / (massG.value + M) : C
  pendingReading.value = {
    value: pivotCm.value.toFixed(1),
    label: withMass ? 'Balance point (pivot) P' : 'Balance point of the rule alone, C',
    trial: { kind: withMass ? 'pivot' : 'c', mass_cm: withMass ? massMarkCm.value : null, pivot_cm: pivotCm.value, true_pivot_cm: Math.round(truePivot * 100) / 100, rule_mass_g: M, cg_cm: C },
  }
}
function confirmReading() {
  const p = pendingReading.value
  if (!p) return
  pendingReading.value = null
  emit('action', { objectKey: ruleKey.value, action: 'measure', value: p.value, unit: 'cm', label: p.label, targetObjectKey: ruleKey.value, ruleTrial: p.trial, ruleRecord: { ...record } })
}
// Hanging the mass on a mark the step didn't ask for is noted (sent with the next step action)
watch(massMarkCm, (m) => {
  if (m === null || stepMark.value === null) return
  if (Math.abs(m - stepMark.value) > 0.05 && Math.round(m * 2) / 2 === m) {
    record.wrong_mark_attempts++
    flash(`This step asks for the mass at the ${stepMark.value.toFixed(1)} cm mark.`)
  }
})

// Framed on the hanging rule (which reaches 0.7 m to the right of the pivot), with the rule below
// the controls panel
const HOME_POS: THREE.Vector3Tuple = [0.12, 0.78, 1.55]
const HOME_TARGET: THREE.Vector3Tuple = [0.12, 0.62, 0]
const { room, unsupported, pick, pointOnPlane, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.45, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildApparatus(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the apparatus from the tray, then drag the metre rule up to the clamp. Slide it through the thread loop (buttons or drag) to balance it.')
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
})

function setObjectState() {
  // Nothing switchable in this practical - kept for the renderer interface.
}
function goToView(view: CameraView) {
  const r = room.value
  if (!r) return
  if (view === 'bench') r.flyTo(new THREE.Vector3(...HOME_POS), new THREE.Vector3(...HOME_TARGET))
  else if (view === 'entrance') r.flyTo(new THREE.Vector3(2.4, 0.95, 2.4), new THREE.Vector3(0, 0.25, 7))
  else if (view === 'left') r.flyTo(new THREE.Vector3(-1.2, 1.0, 1.6), new THREE.Vector3(-7, 0.45, 1.6))
  else r.flyTo(new THREE.Vector3(1.2, 1.0, 1.6), new THREE.Vector3(7, 0.45, 1.6))
}

defineExpose({ setObjectState, goToView, pivotCm, massMarkCm, isBalanced, placedKeys, ruleMounted, pickFromTray, setPivot, setMassMark, measurePivot, confirmReading, pendingReading, record })
</script>
