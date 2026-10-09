<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F526}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Ray box power + protractor measuring -->
    <div class="absolute right-2 top-2 sm:right-3 sm:top-3 max-w-[13rem] flex flex-col gap-2 items-end max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div v-if="isPlaced(rayBoxKey)" class="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 w-full">
        <div class="flex items-center justify-between gap-3">
          <p class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Ray Box Power</p>
          <LabToggle :model-value="rayBoxOn" :disabled="readOnly" @update:model-value="toggleRayBox" />
        </div>
      </div>

      <div v-if="isPlaced(protractorKey)" class="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 w-full">
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">Measure</p>
        <div class="flex flex-col gap-1.5">
          <LabButton size="sm" :disabled="readOnly" @click="measureAngle('incidence')">Angle of Incidence</LabButton>
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="measureAngle('outgoing')">Angle of {{ targetType === 'glass_block' ? 'Refraction' : 'Reflection' }}</LabButton>
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

    <div class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 flex gap-1.5">
      <button v-if="hasMoved" @click="resetOptics" :disabled="readOnly" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">Reset Bench</button>
      <button @click="room?.resetView()" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>
    </div>
    <p class="hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 bg-white/70 rounded px-2 py-1 pointer-events-none">Drag apparatus to move &middot; drag a white knob to rotate</p>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { canvasTexture } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import LabToggle from './ui/LabToggle.vue'
import { dirFromAngle, reflect, refract, computeRayHit, angleFromNormalDeg, type Vec2 } from './opticsEngine'
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

/*
 * Optics runs on a sheet of paper on the bench, in centimetres: engine (x, y) = world (x, z) * 100.
 * Angles are measured from +x towards +z (towards the viewer), matching the original 2D layout.
 */
const TARGET_EXTENT = 7.5
const ALIGN_RADIUS = 2
const ALIGN_ANGLE_TOL = 12
const PAPER_Y = 0.0005
const RAY_Y = 0.0025
const cm = (v: number) => v / 100

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

const rayBoxKey = computed(() => props.sceneObjects.find(o => o.object_type === 'ray_box')?.key ?? 'ray_box1')
const protractorKey = computed(() => props.sceneObjects.find(o => o.object_type === 'protractor')?.key ?? 'protractor1')
const targetCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'mirror' || o.object_type === 'glass_block'))
const targetType = computed(() => targetCfg.value?.object_type ?? null)
const targetKey = computed(() => targetCfg.value?.key ?? null)
const blockWidthCm = computed(() => Number(mergedProps(targetKey.value ?? '').width_cm ?? 5))
const refractiveIndex = computed(() => Number(mergedProps(targetKey.value ?? '').refractive_index ?? 1.5))

const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
function isPlaced(key: string | null) { return !!key && placedKeys.has(key) }
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Apparatus state (cm on the paper) ----------------------------------------------------------
const HOME = { raybox: { x: -15, y: 0, rot: 0 }, target: { x: 5, y: 0, rot: 180 }, protractor: { x: 12, y: 9, rot: 180 } }
const rayBoxPos = reactive<Vec2>({ x: HOME.raybox.x, y: HOME.raybox.y })
const rayBoxRotDeg = ref(HOME.raybox.rot)
const rayBoxOn = ref(false)
const targetPos = reactive<Vec2>({ x: HOME.target.x, y: HOME.target.y })
const targetRotDeg = ref(HOME.target.rot)
const protractorPos = reactive<Vec2>({ x: HOME.protractor.x, y: HOME.protractor.y })
const protractorRotDeg = ref(HOME.protractor.rot)
const hasMoved = ref(false)

function toggleRayBox(on: boolean) {
  if (props.readOnly) return
  rayBoxOn.value = on
  emit('action', { objectKey: rayBoxKey.value, action: on ? 'switch_on' : 'switch_off', value: null })
}

// --- Real ray geometry ---------------------------------------------------------------------------
const rayOrigin = computed<Vec2>(() => {
  const d = dirFromAngle((rayBoxRotDeg.value * Math.PI) / 180)
  return { x: rayBoxPos.x + d.x * 5, y: rayBoxPos.y + d.y * 5 }
})
const rayHit = computed(() => {
  if (!rayBoxOn.value || !isPlaced(rayBoxKey.value) || !isPlaced(targetKey.value)) return null
  const dir = dirFromAngle((rayBoxRotDeg.value * Math.PI) / 180)
  const normal = dirFromAngle((targetRotDeg.value * Math.PI) / 180)
  return computeRayHit(rayOrigin.value, dir, targetPos, normal, TARGET_EXTENT)
})
const reflectedDir = computed(() => (rayHit.value && targetType.value === 'mirror' ? reflect(rayHit.value.incidentDir, rayHit.value.normal) : null))
const refractedDir = computed(() => (rayHit.value && targetType.value === 'glass_block' ? refract(rayHit.value.incidentDir, rayHit.value.normal, 1.0, refractiveIndex.value) : null))
const exitPoint = computed<Vec2 | null>(() => {
  const hit = rayHit.value
  const r = refractedDir.value
  if (!hit || !r) return null
  const back = { x: targetPos.x - hit.normal.x * blockWidthCm.value, y: targetPos.y - hit.normal.y * blockWidthCm.value }
  const denom = r.x * hit.normal.x + r.y * hit.normal.y
  if (Math.abs(denom) < 0.001) return null
  const t = ((back.x - hit.point.x) * hit.normal.x + (back.y - hit.point.y) * hit.normal.y) / denom
  return { x: hit.point.x + r.x * t, y: hit.point.y + r.y * t }
})

// --- Scene ----------------------------------------------------------------------------------------
type Kind = 'raybox' | 'target' | 'protractor'
const groups = {} as Record<Kind, THREE.Group>
const handles = {} as Record<Kind, THREE.Mesh>
let lampMat: THREE.MeshStandardMaterial
let normalLine: THREE.Line
const beams: THREE.Group[] = []

function knob(): THREE.Mesh {
  const k = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.012, 24), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 }))
  k.castShadow = true
  const grip = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 8), new THREE.MeshBasicMaterial({ visible: false }))
  k.add(grip)
  return k
}

function buildRayBox(): THREE.Group {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.045, 0.06, 3, 0.006), new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.3, roughness: 0.5 }))
  body.position.set(-0.025, 0.0225, 0)
  body.castShadow = true
  const slitPlate = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.035, 0.05), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 }))
  slitPlate.position.set(0.022, 0.02, 0)
  lampMat = new THREE.MeshStandardMaterial({ color: 0x4b5563, emissive: 0x000000, roughness: 0.3 })
  const slit = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.03, 0.003), lampMat)
  slit.position.set(0.023, 0.02, 0)
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.08, 8), new THREE.MeshStandardMaterial({ color: 0x111827 }))
  cable.rotation.z = Math.PI / 2
  cable.position.set(-0.11, 0.008, 0)
  g.add(body, slitPlate, slit, cable)
  handles.raybox = knob()
  handles.raybox.position.set(-0.1, 0.006, 0.045)
  g.add(handles.raybox)
  return g
}

function buildMirror(): THREE.Group {
  const g = new THREE.Group()
  const len = cm(TARGET_EXTENT * 2)
  // Silvered face towards local +x (the surface normal), wooden holder behind
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.06, len), [
    new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.03 }),
    new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 }),
    ...new Array(4).fill(0).map(() => new THREE.MeshStandardMaterial({ color: 0xa7b4c2, roughness: 0.3 })),
  ])
  glass.position.set(-0.002, 0.03, 0)
  glass.castShadow = true
  const holder = new THREE.Mesh(new RoundedBoxGeometry(0.03, 0.014, len * 0.9, 2, 0.003), new THREE.MeshStandardMaterial({ color: 0x8a5a36, roughness: 0.7 }))
  holder.position.set(-0.014, 0.007, 0)
  holder.castShadow = true
  g.add(glass, holder)
  handles.target = knob()
  handles.target.position.set(-0.05, 0.006, 0)
  g.add(handles.target)
  return g
}

function buildGlassBlock(): THREE.Group {
  const g = new THREE.Group()
  const w = cm(blockWidthCm.value)
  const block = new THREE.Mesh(
    new RoundedBoxGeometry(w, 0.02, cm(TARGET_EXTENT * 2), 2, 0.0015),
    new THREE.MeshStandardMaterial({ color: 0xdff0ff, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.45, depthWrite: false }),
  )
  block.position.set(-w / 2, 0.01, 0)
  block.castShadow = true
  g.add(block)
  handles.target = knob()
  handles.target.position.set(-w - 0.03, 0.006, 0)
  g.add(handles.target)
  return g
}

function buildProtractor(): THREE.Group {
  const g = new THREE.Group()
  const tex = canvasTexture(512, 512, (ctx, w, h) => {
    const cx = w / 2, cy = h / 2, R = w / 2 - 6
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(251,146,60,0.96)'
    ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = '#000000'; ctx.fillStyle = '#000000'; ctx.font = 'bold 20px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    // 0 along the baseline (+x), counting 0-90 either side of it
    for (let a = -90; a <= 90; a++) {
      const r = (a * Math.PI) / 180
      const len = a % 10 === 0 ? 30 : a % 5 === 0 ? 20 : 10
      ctx.lineWidth = a % 10 === 0 ? 2.5 : 1
      ctx.beginPath()
      ctx.moveTo(cx + R * Math.cos(r), cy + R * Math.sin(r))
      ctx.lineTo(cx + (R - len) * Math.cos(r), cy + (R - len) * Math.sin(r))
      ctx.stroke()
      if (a % 10 === 0) ctx.fillText(String(Math.abs(a)), cx + (R - 48) * Math.cos(r), cy + (R - 48) * Math.sin(r))
    }
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R, cy); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.stroke()
  })
  const disc = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.16), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }))
  disc.rotation.x = -Math.PI / 2
  disc.position.y = 0.0012
  g.add(disc)
  handles.protractor = knob()
  handles.protractor.position.set(0.09, 0.006, 0)
  g.add(handles.protractor)
  return g
}

/** A ray of light drawn on the paper: bright core plus a soft glow, stretched between two points. */
function makeBeam(color: number): THREE.Group {
  const g = new THREE.Group()
  const core = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.002), new THREE.MeshBasicMaterial({ color, toneMapped: false }))
  // Warm halo under the core - normal blending, since additive light vanishes on white paper
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.008), new THREE.MeshBasicMaterial({ color: 0xff9f1c, transparent: true, opacity: 0.22, depthWrite: false }))
  core.rotation.x = glow.rotation.x = -Math.PI / 2
  core.position.x = glow.position.x = 0.5
  core.position.y = 0.0004
  g.add(glow, core)
  g.visible = false
  return g
}
function setBeam(b: THREE.Group, from: Vec2, to: Vec2) {
  const dx = to.x - from.x, dy = to.y - from.y
  b.position.set(cm(from.x), RAY_Y, cm(from.y))
  b.rotation.y = -Math.atan2(dy, dx)
  b.scale.set(cm(Math.hypot(dx, dy)), 1, 1)
  b.visible = true
}

function buildScene(scene: THREE.Scene) {
  const paperTex = canvasTexture(512, 360, (ctx, w, h) => {
    ctx.fillStyle = '#fbfbf8'; ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(120,140,170,0.18)'; ctx.lineWidth = 1
    for (let x = 0; x < w; x += 12) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
    for (let y = 0; y < h; y += 12) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }
  })
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.32), new THREE.MeshStandardMaterial({ map: paperTex, roughness: 0.95 }))
  paper.rotation.x = -Math.PI / 2
  paper.position.y = PAPER_Y
  paper.receiveShadow = true
  scene.add(paper)

  groups.raybox = buildRayBox()
  groups.target = targetType.value === 'glass_block' ? buildGlassBlock() : buildMirror()
  groups.protractor = buildProtractor()
  Object.values(groups).forEach(g => scene.add(g))

  for (let i = 0; i < 3; i++) { const b = makeBeam(0xffc53d); beams.push(b); scene.add(b) }

  normalLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.004, gapSize: 0.003 }),
  )
  scene.add(normalLine)
}

function place(g: THREE.Group, pos: Vec2, rotDeg: number) {
  g.position.set(cm(pos.x), 0, cm(pos.y))
  g.rotation.y = -(rotDeg * Math.PI) / 180
}

function syncScene() {
  groups.raybox.visible = isPlaced(rayBoxKey.value)
  groups.target.visible = isPlaced(targetKey.value)
  groups.protractor.visible = isPlaced(protractorKey.value)
  place(groups.raybox, rayBoxPos, rayBoxRotDeg.value)
  place(groups.target, targetPos, targetRotDeg.value)
  place(groups.protractor, protractorPos, protractorRotDeg.value)

  lampMat.emissive.setHex(rayBoxOn.value ? 0xffd166 : 0x000000)
  lampMat.emissiveIntensity = rayBoxOn.value ? 2 : 0

  beams.forEach(b => { b.visible = false })
  normalLine.visible = false
  if (rayBoxOn.value && groups.raybox.visible) {
    const hit = rayHit.value
    const dir = dirFromAngle((rayBoxRotDeg.value * Math.PI) / 180)
    if (!hit) {
      setBeam(beams[0], rayOrigin.value, { x: rayOrigin.value.x + dir.x * 30, y: rayOrigin.value.y + dir.y * 30 })
    } else {
      setBeam(beams[0], rayOrigin.value, hit.point)
      if (reflectedDir.value) {
        setBeam(beams[1], hit.point, { x: hit.point.x + reflectedDir.value.x * 22, y: hit.point.y + reflectedDir.value.y * 22 })
      } else if (exitPoint.value) {
        setBeam(beams[1], hit.point, exitPoint.value)
        setBeam(beams[2], exitPoint.value, { x: exitPoint.value.x + hit.incidentDir.x * 20, y: exitPoint.value.y + hit.incidentDir.y * 20 })
      }
      const pos = normalLine.geometry.attributes.position as THREE.BufferAttribute
      pos.setXYZ(0, cm(hit.point.x - hit.normal.x * 8), RAY_Y, cm(hit.point.y - hit.normal.y * 8))
      pos.setXYZ(1, cm(hit.point.x + hit.normal.x * 8), RAY_Y, cm(hit.point.y + hit.normal.y * 8))
      pos.needsUpdate = true
      normalLine.computeLineDistances()
      normalLine.visible = true
    }
  }
}

// --- Drag to move, drag a knob to rotate ----------------------------------------------------------
const benchPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
const hitPt = new THREE.Vector3()
const hoverCursor = ref('grab')
let dragging: { kind: Kind; mode: 'move' | 'rotate'; offset: Vec2 } | null = null

const posFor = (k: Kind) => (k === 'raybox' ? rayBoxPos : k === 'target' ? targetPos : protractorPos)
const rotFor = (k: Kind) => (k === 'raybox' ? rayBoxRotDeg : k === 'target' ? targetRotDeg : protractorRotDeg)

function pickTarget(ev: PointerEvent): { kind: Kind; mode: 'move' | 'rotate' } | null {
  if (!groups.raybox) return null
  const kinds = (Object.keys(groups) as Kind[]).filter(k => groups[k].visible)
  const handleTargets = kinds.map(k => handles[k])
  const h = pick(ev, handleTargets)
  if (h) return { kind: kinds[handleTargets.indexOf(h)], mode: 'rotate' }
  const g = pick(ev, kinds.map(k => groups[k]))
  return g ? { kind: kinds.find(k => groups[k] === g)!, mode: 'move' } : null
}

function onHover(ev: PointerEvent) {
  if (dragging) return
  const t = pickTarget(ev)
  hoverCursor.value = t ? (t.mode === 'rotate' ? 'alias' : 'move') : 'grab'
}

function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  if (props.readOnly) return
  const t = pickTarget(ev)
  if (!t || !room.value || !pointOnPlane(ev, benchPlane, hitPt)) return
  room.value.controls.enabled = false
  const pos = posFor(t.kind)
  dragging = { ...t, offset: { x: pos.x - hitPt.x * 100, y: pos.y - hitPt.z * 100 } }
  hasMoved.value = true
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onPointerUp, { once: true })
}

function onDragMove(ev: PointerEvent) {
  if (!dragging || !pointOnPlane(ev, benchPlane, hitPt)) return
  const p = { x: hitPt.x * 100, y: hitPt.z * 100 }
  const pos = posFor(dragging.kind)
  if (dragging.mode === 'move') {
    pos.x = Math.max(-21, Math.min(21, p.x + dragging.offset.x))
    pos.y = Math.max(-14, Math.min(14, p.y + dragging.offset.y))
    return
  }
  // Ray box and mirror/block knobs sit behind the object, so the object faces away from the knob;
  // the protractor's knob is on its 0-degree baseline
  const deg = (Math.atan2(p.y - pos.y, p.x - pos.x) * 180) / Math.PI
  rotFor(dragging.kind).value = dragging.kind === 'protractor' ? deg : deg + 180
}

function onPointerUp() {
  window.removeEventListener('pointermove', onDragMove)
  if (room.value) room.value.controls.enabled = true
  if (dragging?.kind === 'raybox' && dragging.mode === 'rotate') {
    const deg = ((Math.round(rayBoxRotDeg.value) % 360) + 540) % 360 - 180
    emit('action', { objectKey: rayBoxKey.value, action: 'rotate', value: String(deg) })
  }
  dragging = null
}

// --- Protractor measurement: only valid when centred on the real point of incidence and aligned
// with the normal ------------------------------------------------------------------------------------
const pendingReading = ref<{ value: string; mode: 'incidence' | 'outgoing' } | null>(null)
const hint = ref<string | null>(null)
function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 3500) }

function measureAngle(mode: 'incidence' | 'outgoing') {
  if (props.readOnly) return
  const hit = rayHit.value
  if (!hit) { flash('No ray is striking the surface - check the ray box and target positions.'); return }
  if (Math.hypot(protractorPos.x - hit.point.x, protractorPos.y - hit.point.y) > ALIGN_RADIUS) { flash('Position the centre of the protractor at the point where the ray meets the surface.'); return }
  if (angleFromNormalDeg(dirFromAngle((protractorRotDeg.value * Math.PI) / 180), hit.normal) > ALIGN_ANGLE_TOL) { flash('Align the protractor’s 0° line with the normal before reading the angle.'); return }

  let vec: Vec2
  if (mode === 'incidence') vec = { x: -hit.incidentDir.x, y: -hit.incidentDir.y }
  else if (targetType.value === 'mirror') vec = reflectedDir.value!
  else {
    if (!refractedDir.value) { flash('The ray does not refract at this angle - try a smaller incident angle.'); return }
    vec = refractedDir.value
  }
  pendingReading.value = { value: String(Math.round(angleFromNormalDeg(vec, hit.normal) * 10) / 10), mode }
}

function confirmReading() {
  if (!pendingReading.value || !targetKey.value) return
  const label = pendingReading.value.mode === 'incidence' ? 'Angle of Incidence' : (targetType.value === 'mirror' ? 'Angle of Reflection' : 'Angle of Refraction')
  emit('action', { objectKey: protractorKey.value, action: 'measure', value: pendingReading.value.value, unit: '°', label, targetObjectKey: targetKey.value })
  pendingReading.value = null
}

function resetOptics() {
  if (props.readOnly) return
  Object.assign(rayBoxPos, { x: HOME.raybox.x, y: HOME.raybox.y }); rayBoxRotDeg.value = HOME.raybox.rot; rayBoxOn.value = false
  Object.assign(targetPos, { x: HOME.target.x, y: HOME.target.y }); targetRotDeg.value = HOME.target.rot
  Object.assign(protractorPos, { x: HOME.protractor.x, y: HOME.protractor.y }); protractorRotDeg.value = HOME.protractor.rot
  pendingReading.value = null
  hasMoved.value = false
}

const HOME_POS: THREE.Vector3Tuple = [0, 0.36, 0.34]
const HOME_TARGET: THREE.Vector3Tuple = [0, 0, 0.01]
const { room, unsupported, pick, pointOnPlane, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.2, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildScene(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the apparatus from the tray, then arrange the ray box and mirror/block so the ray strikes it.')
  },
)

onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) placedKeys.add(o.key) })
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
})

function setObjectState(key: string, patch: Record<string, any>) {
  if (key === rayBoxKey.value && 'state' in patch) rayBoxOn.value = patch.state === 'on'
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
