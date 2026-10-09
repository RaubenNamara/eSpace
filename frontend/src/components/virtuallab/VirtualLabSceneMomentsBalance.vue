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

    <!-- Rule: Measure, then the live reading/record flow -->
    <div v-if="selectedKey === ruleKey" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[15rem] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Metre Rule</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <LabButton v-if="!measureArmed && !pendingReading" size="sm" :disabled="readOnly || !ruleMounted" @click="armMeasure">Measure</LabButton>
      <p v-if="!ruleMounted" class="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Hang the rule on the stand first.</p>
      <div v-if="measureArmed" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-amber-600 dark:text-amber-400">Click the 50g hanger or the bottle to measure its distance from G.</div>
      <div v-if="pendingReading" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">{{ pendingReading.label }}</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">cm</span></span>
          <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
        </div>
      </div>
    </div>

    <!-- Qualitative balance feedback only - never the numbers, that's for the student to measure -->
    <div v-if="ruleMounted" class="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :class="isBalanced ? 'bg-emerald-500' : 'bg-amber-400'"></span>
      <span class="text-xs font-medium text-gray-600 dark:text-gray-300">{{ isBalanced ? 'Balanced - level' : 'Not balanced yet' }}</span>
    </div>

    <button @click="room?.resetView()" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { canvasTexture } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import { buildRetortStand } from './lab3d/apparatus'
import { createObjectMesh } from './labObjectFactory'
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
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null }]
}>()

function catalogFor(objectType: string) {
  return props.objectCatalog.find(o => o.object_type === objectType)
}
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

const standCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'retort_stand'))
const ruleCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'metre_rule'))
const hangerCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'mass_piece'))
const bottleCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'soda_bottle'))
const standKey = computed(() => standCfg.value?.key ?? 'stand1')
const ruleKey = computed(() => ruleCfg.value?.key ?? 'rule1')
const hangerKey = computed(() => hangerCfg.value?.key ?? 'hanger1')
const bottleKey = computed(() => bottleCfg.value?.key ?? 'bottle1')
const hangerMassG = computed(() => Number(mergedProps(hangerKey.value).mass_g ?? 50))
const bottleMassG = computed(() => Number(mergedProps(bottleKey.value).mass_g ?? 36))

// --- Apparatus tray: pick once and it's placed on the bench for good ---------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => !placedKeys.has(o.key)))

function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Moments physics: the rule pivots at its exact centre (G, the 50 cm mark) - net moment is the
// signed sum of mass x distance-from-G for whichever of the hanger/bottle are hung on it; it tilts
// towards the heavier moment and settles level only once they balance. ------------------------------
const CLAMP = new THREE.Vector3(0, 0.55, 0)
const RULE_HALF_M = 0.5 // metre rule, G at its centre: 0.5 m either side
const RULE_REST = new THREE.Vector3(0, 0.42, 0.35) // held up in clear view, below and in front of the clamp, before it's mounted
const THREAD_LEN = 0.09
const MAX_ANGLE = 0.32 // ~18 degrees at full imbalance - a clear tilt without looking absurd
const SENSITIVITY = 0.0003 // rad per (gram x cm) of net moment
const BALANCE_TOLERANCE_GCM = 20 // within this many gram-cm, the rule reads as "balanced"

const ruleMounted = ref(false)
/** Attachment offset from G in metres, signed (+ towards the 100 cm end); null = not hung yet. */
const hangerOffsetM = ref<number | null>(null)
const bottleOffsetM = ref<number | null>(null)

function liveOffset(key: string, stored: number | null): number | null {
  if (dragging?.kind === 'item' && dragging.key === key) return dragOffsetM.value
  return stored
}
/** Net moment in gram-centimetres - mass x distance-from-G, metres converted to cm so the
 *  sensitivity/tolerance constants above are in familiar, tunable gram-cm units. */
const netMomentGcm = computed(() => {
  let m = 0
  const h = liveOffset(hangerKey.value, hangerOffsetM.value)
  const b = liveOffset(bottleKey.value, bottleOffsetM.value)
  if (h !== null) m += hangerMassG.value * (h * 100)
  if (b !== null) m += bottleMassG.value * (b * 100)
  return m
})
const targetAngle = computed(() => Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, -netMomentGcm.value * SENSITIVITY)))
const isBalanced = computed(() => hangerOffsetM.value !== null && bottleOffsetM.value !== null && Math.abs(netMomentGcm.value) <= BALANCE_TOLERANCE_GCM)
const displayAngle = ref(0)

let stand: THREE.Group
let ruleGroup: THREE.Group
let ruleMesh: THREE.Mesh
let ruleGrabZone: THREE.Mesh
let gMarker: THREE.Mesh
let hangerGroup: THREE.Group
let bottleGroup: THREE.Group
const threadMeshes = { hanger: null as THREE.Mesh | null, bottle: null as THREE.Mesh | null }
const THREAD_RADIUS = 0.0012

/** Thin horizontal cm strip, 0 at the left end, G (50 cm) marked with a red tick. */
function rulerStripTexture() {
  return canvasTexture(2048, 160, (ctx, w, h) => {
    ctx.fillStyle = '#eab308'
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = '#111827'
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 26px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    for (let cm = 0; cm <= 100; cm++) {
      const x = (cm / 100) * w
      const tall = cm % 10 === 0
      const len = tall ? 56 : cm % 5 === 0 ? 38 : 22
      ctx.lineWidth = tall ? 3 : 1.5
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, len)
      ctx.stroke()
      if (tall) ctx.fillText(String(cm), x, len + 4)
    }
    // G at the 50 cm mark
    ctx.strokeStyle = '#dc2626'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(w / 2, 0)
    ctx.lineTo(w / 2, h)
    ctx.stroke()
  })
}

function buildApparatus(scene: THREE.Scene) {
  stand = buildRetortStand({ pivot: CLAMP, rodX: -0.15, armZ: -0.07, armEnd: 0.12 })
  scene.add(stand)

  // Rule group's origin sits at G (the clamp point) so rotating it tilts the rule about its centre
  ruleGroup = new THREE.Group()
  ruleGroup.position.copy(CLAMP)
  const face = new THREE.MeshStandardMaterial({ map: rulerStripTexture(), roughness: 0.6 })
  const edge = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.6 })
  ruleMesh = new THREE.Mesh(new THREE.BoxGeometry(RULE_HALF_M * 2, 0.012, 0.03), [edge, edge, face, edge, edge, edge])
  ruleMesh.position.y = -0.015
  ruleMesh.castShadow = true
  ruleGroup.add(ruleMesh)
  // Invisible but raycastable - the rule itself is only 1.2cm thick, far too thin to reliably
  // grab with a mouse or finger (same reason Hooke's Law's spring has its own grabZone).
  ruleGrabZone = new THREE.Mesh(new THREE.BoxGeometry(RULE_HALF_M * 2, 0.08, 0.1), new THREE.MeshBasicMaterial({ visible: false }))
  ruleGrabZone.position.y = -0.015
  ruleGroup.add(ruleGrabZone)
  // Thread loop at G, from the clamp down to the rule
  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.009, 0.0015, 8, 20), new THREE.MeshStandardMaterial({ color: 0x1f2937 }))
  loop.rotation.x = Math.PI / 2
  loop.position.y = -0.007
  ruleGroup.add(loop)
  gMarker = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.018, 16), new THREE.MeshStandardMaterial({ color: 0xdc2626 }))
  gMarker.position.y = 0.01
  gMarker.rotation.x = Math.PI
  ruleGroup.add(gMarker)
  scene.add(ruleGroup)

  const hangerProps = { ...mergedProps(hangerKey.value), mass_g: hangerMassG.value }
  hangerGroup = createObjectMesh('mass_piece', hangerKey.value, '50g hanger', hangerProps)
  hangerGroup.scale.setScalar(0.2)
  scene.add(hangerGroup)

  const bottleProps = mergedProps(bottleKey.value)
  bottleGroup = createObjectMesh('soda_bottle', bottleKey.value, 'Sample bottle', bottleProps)
  bottleGroup.scale.setScalar(0.2)
  scene.add(bottleGroup)

  // A real thread, not a flat line: a thin cotton-coloured cylinder. It's always hung straight
  // down from its attachment point (gravity), so it never needs rotating - only repositioning.
  const threadMat = new THREE.MeshStandardMaterial({ color: 0xd6d3c4, roughness: 0.85 })
  const threadGeo = new THREE.CylinderGeometry(THREAD_RADIUS, THREAD_RADIUS, THREAD_LEN, 8)
  threadMeshes.hanger = new THREE.Mesh(threadGeo, threadMat)
  threadMeshes.bottle = new THREE.Mesh(threadGeo.clone(), threadMat)
  threadMeshes.hanger.castShadow = threadMeshes.bottle.castShadow = true
  scene.add(threadMeshes.hanger, threadMeshes.bottle)
}

/** Where an item hung at `offsetM` from G ends up: the thread's attachment point rotates with the
 *  tilting rule, but the item itself still hangs straight down from there (gravity). */
function attachWorldPoint(offsetM: number, angle: number): THREE.Vector3 {
  const c = Math.cos(angle), s = Math.sin(angle)
  return new THREE.Vector3(CLAMP.x + offsetM * c, CLAMP.y + offsetM * s - 0.015, CLAMP.z)
}

function benchSlot(which: 'hanger' | 'bottle'): THREE.Vector3 {
  return which === 'hanger' ? new THREE.Vector3(0.22, 0.03, 0.12) : new THREE.Vector3(-0.22, 0.05, 0.12)
}

function syncScene(dt: number) {
  const diff = targetAngle.value - displayAngle.value
  displayAngle.value = Math.abs(diff) < 0.0005 ? targetAngle.value : displayAngle.value + diff * (1 - Math.exp(-dt * 6))

  stand.visible = placedKeys.has(standKey.value)
  ruleGroup.visible = placedKeys.has(ruleKey.value)
  // pick()'s own visibility filter only checks the target object itself, not its ancestors - keep
  // the (always-visible-by-default) grab zone in sync with the group so it isn't clickable before
  // the rule has actually been placed.
  ruleGrabZone.visible = ruleGroup.visible
  if (ruleMounted.value) {
    ruleGroup.position.copy(CLAMP)
    ruleGroup.rotation.z = displayAngle.value
  } else if (dragging?.kind === 'rule') {
    ruleGroup.position.copy(dragPoint)
    ruleGroup.rotation.z = 0
  } else {
    ruleGroup.position.copy(RULE_REST)
    ruleGroup.rotation.z = 0
  }

  hangerGroup.visible = placedKeys.has(hangerKey.value)
  bottleGroup.visible = placedKeys.has(bottleKey.value)

  const place = (group: THREE.Group, thread: THREE.Mesh | null, offset: number | null, draggingThis: boolean, rest: THREE.Vector3) => {
    if (draggingThis) {
      group.position.copy(dragPoint)
      if (thread) thread.visible = false
      return
    }
    if (offset !== null && ruleMounted.value) {
      const top = attachWorldPoint(offset, displayAngle.value)
      const bottom = top.clone().add(new THREE.Vector3(0, -THREAD_LEN, 0))
      group.position.copy(bottom)
      if (thread) {
        thread.visible = true
        // Always hangs straight down (gravity) - only its midpoint moves as the rule tilts, no
        // rotation needed since top-to-bottom is a fixed-length vertical segment by construction.
        thread.position.set(top.x, top.y - THREAD_LEN / 2, top.z)
      }
    } else {
      group.position.copy(rest)
      if (thread) thread.visible = false
    }
  }

  const draggingHanger = dragging?.kind === 'item' && dragging.key === hangerKey.value
  const draggingBottle = dragging?.kind === 'item' && dragging.key === bottleKey.value
  place(hangerGroup, threadMeshes.hanger, hangerOffsetM.value, draggingHanger, benchSlot('hanger'))
  place(bottleGroup, threadMeshes.bottle, bottleOffsetM.value, draggingBottle, benchSlot('bottle'))
}

// --- Dragging --------------------------------------------------------------------------------------
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const dragPoint = new THREE.Vector3()
const dragOffsetM = ref(0)
const hoverCursor = ref('grab')
type Target = { kind: 'rule' } | { kind: 'item'; key: string }
let dragging: Target | null = null

function pickTarget(ev: PointerEvent): Target | null {
  if (!ruleGrabZone) return null
  const targets: THREE.Object3D[] = [ruleGrabZone]
  if (placedKeys.has(hangerKey.value)) targets.push(hangerGroup)
  if (placedKeys.has(bottleKey.value)) targets.push(bottleGroup)
  const hit = pick(ev, targets)
  if (!hit) return null
  if (hit === ruleGrabZone) return { kind: 'rule' }
  if (hit === hangerGroup) return { kind: 'item', key: hangerKey.value }
  if (hit === bottleGroup) return { kind: 'item', key: bottleKey.value }
  return null
}

function onHover(ev: PointerEvent) {
  if (dragging) return
  hoverCursor.value = pickTarget(ev) ? 'pointer' : 'grab'
}

function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  const target = pickTarget(ev)
  if (!target || !room.value) return
  room.value.controls.enabled = false
  window.addEventListener('pointerup', onPointerUp, { once: true })

  if (target.kind === 'rule') {
    if (measureArmed.value) return // the rule itself isn't a measurable target
    selectObject(ruleKey.value)
    if (props.readOnly || ruleMounted.value) return
    dragging = { kind: 'rule' }
    hoverCursor.value = 'grabbing'
    onDragMove(ev)
    window.addEventListener('pointermove', onDragMove)
    return
  }

  // target.kind === 'item'
  if (measureArmed.value && ruleMounted.value) {
    const offset = target.key === hangerKey.value ? hangerOffsetM.value : bottleOffsetM.value
    if (offset === null) return
    const noise = (Math.random() - 0.5) * 0.3
    const label = target.key === hangerKey.value ? 'Distance from G to the 50g hanger' : 'Distance from G to the bottle'
    pendingReading.value = { value: String(Math.round((Math.abs(offset) * 100 + noise) * 10) / 10), label, targetKey: target.key }
    measureArmed.value = false
    return
  }
  if (props.readOnly) return
  dragging = target
  hoverCursor.value = 'grabbing'
  onDragMove(ev)
  window.addEventListener('pointermove', onDragMove)
}

function onDragMove(ev: PointerEvent) {
  if (!dragging) return
  pointOnPlane(ev, dragPlane, dragPoint)
  dragPoint.y = Math.max(0.02, dragPoint.y)
  if (dragging.kind === 'item') dragOffsetM.value = Math.max(-RULE_HALF_M + 0.03, Math.min(RULE_HALF_M - 0.03, dragPoint.x - CLAMP.x))
}

function onPointerUp() {
  window.removeEventListener('pointermove', onDragMove)
  if (room.value) room.value.controls.enabled = true
  if (!dragging) return
  const was = dragging
  dragging = null
  hoverCursor.value = 'grab'

  if (was.kind === 'rule') {
    const nearClamp = dragPoint.distanceTo(CLAMP) < 0.1
    if (nearClamp && placedKeys.has(standKey.value)) {
      ruleMounted.value = true
      emit('action', { objectKey: ruleKey.value, action: 'move', value: standKey.value })
    } else {
      flash(placedKeys.has(standKey.value) ? 'Drag the rule up to the retort stand’s clamp.' : 'Place the retort stand from the tray first.')
    }
    return
  }

  const key = was.key
  const isHanger = key === hangerKey.value
  const wasAttached = (isHanger ? hangerOffsetM.value : bottleOffsetM.value) !== null
  const nearRule = ruleMounted.value && Math.abs(dragPoint.x - CLAMP.x) <= RULE_HALF_M - 0.02 && dragPoint.y > CLAMP.y - 0.4 && dragPoint.y < CLAMP.y + 0.1

  if (nearRule) {
    if (isHanger) hangerOffsetM.value = dragOffsetM.value
    else bottleOffsetM.value = dragOffsetM.value
    if (!wasAttached) emit('action', { objectKey: key, action: 'move', value: ruleKey.value })
  } else if (wasAttached) {
    if (isHanger) hangerOffsetM.value = null
    else bottleOffsetM.value = null
  } else if (ruleMounted.value) {
    flash('Drag it under the rule to hang it from a thread.')
  }
}

// --- Measurement ---------------------------------------------------------------------------------
const selectedKey = ref<string | null>(null)
const measureArmed = ref(false)
const pendingReading = ref<{ value: string; label: string; targetKey: string } | null>(null)
const hint = ref<string | null>(null)

function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3500)
}
function selectObject(key: string) {
  selectedKey.value = key
  measureArmed.value = false
  pendingReading.value = null
}
function deselect() {
  selectedKey.value = null
  measureArmed.value = false
  pendingReading.value = null
}
function armMeasure() {
  if (props.readOnly || !ruleMounted.value) return
  measureArmed.value = true
  pendingReading.value = null
}
function confirmReading() {
  if (!pendingReading.value) return
  emit('action', { objectKey: ruleKey.value, action: 'measure', value: pendingReading.value.value, unit: 'cm', label: 'Metre rule', targetObjectKey: pendingReading.value.targetKey })
  pendingReading.value = null
}

const HOME_POS: THREE.Vector3Tuple = [0.35, 0.5, 1.4]
const HOME_TARGET: THREE.Vector3Tuple = [0, 0.3, 0]
const { room, unsupported, pick, pointOnPlane, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.45, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildApparatus(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the apparatus from the tray, hang the rule on the clamp, then slide the hanger and bottle until it balances.')
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
})

function setObjectState() {
  // No switchable apparatus in this experiment - kept for the renderer interface.
}

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
