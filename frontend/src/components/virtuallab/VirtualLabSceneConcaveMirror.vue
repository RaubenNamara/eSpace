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

    <!-- Live readout + record trial -->
    <div v-if="bothPlaced" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-48">
      <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Readings</p>
      <div class="flex items-center justify-between text-sm mb-1"><span class="text-gray-500 dark:text-gray-400">u</span><span class="font-bold text-gray-900 dark:text-white">{{ uCm.toFixed(1) }} cm</span></div>
      <div class="flex items-center justify-between text-sm mb-2"><span class="text-gray-500 dark:text-gray-400">v</span><span class="font-bold text-gray-900 dark:text-white">{{ vCm.toFixed(1) }} cm</span></div>
      <div class="flex items-center gap-1.5 mb-2">
        <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :class="focusDotClass"></span>
        <span class="text-xs font-medium text-gray-600 dark:text-gray-300">{{ focusLabel }}</span>
      </div>
      <LabButton size="sm" class="w-full" :disabled="readOnly || !canRecord" @click="recordTrial">Record This Trial</LabButton>
      <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5">Trials recorded: {{ trialsRecorded }}</p>
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
import { useLabScene } from './lab3d/useLabScene'
import { createObjectMesh } from './labObjectFactory'
import { canvasTexture } from './lab3d/labRoom'
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

const objectCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'illuminated_object'))
const mirrorCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'concave_mirror'))
const screenCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'focus_screen'))
const ruleCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'metre_rule'))
const objectKey = computed(() => objectCfg.value?.key ?? 'object1')
const mirrorKey = computed(() => mirrorCfg.value?.key ?? 'mirror1')
const screenKey = computed(() => screenCfg.value?.key ?? 'screen1')
const ruleKey = computed(() => ruleCfg.value?.key ?? 'rule1')

// --- Apparatus tray --------------------------------------------------------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => !placedKeys.has(o.key)))

function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Bench geometry (metres; bench top y = 0; rule runs along local x, 0 to 1 m = 0-100 cm) ----
// The object sits at the 30 cm mark rather than the very end - real images for a concave mirror
// can land closer to the mirror than the object (u > 2f) or further than it (u < 2f), and this
// gives room on the rule for the screen to land on either side without running off the end.
// Distances along the bench are drawn SPREAD times longer than the centimetres they stand for, so the
// object, mirror and screen aren't crowded together at small distances such as u = 15 cm. The metre
// rule is drawn to the same scale (still marked 0-100 cm) and every reading converts back, so u and v
// read exactly as in the real practical.
const SPREAD = 1.6
const RULE_LEN = 1.0
const BENCH_Z = 0
const TRUE_FOCAL_CM = 10.0
// How far the screen can roam across the tabletop (metres), with a small margin kept clear of
// the bench's actual edges (benchLength 3 x depth 0.75, both centred on the origin).
const TABLE_X_MIN = -1.4
const TABLE_X_MAX = 1.4
const TABLE_Z_MIN = -0.28
const TABLE_Z_MAX = 0.28
const objectX = ref(-0.75) // draggable along the bench; the rule's 0 cm mark goes with it
/** The object proper is the cross-wire in front of the lamp (object-local x = CROSS_LOCAL_X, the model
 *  being scaled 0.2) - u, the rule's 0 cm mark and the rays are all measured from it. */
const CROSS_LOCAL_X = 0.34
const CROSS_OFFSET = CROSS_LOCAL_X * 0.2
const crossX = computed(() => objectX.value + CROSS_OFFSET)
const mirrorX = ref(-0.75 + 0.34 * 0.2 + 0.35 * SPREAD) // u = 35 cm to start
// The screen isn't pinned to the rule's line like the object and mirror are - it's free to stand
// anywhere on the table, same as picking it up and setting it down wherever is convenient.
const screenPos = reactive({ x: -0.75 + 0.20 * SPREAD, z: 0 })

const uCm = computed(() => Math.max(0.1, ((mirrorX.value - crossX.value) / SPREAD) * 100))
const vCm = computed(() => {
  const dx = screenPos.x - mirrorX.value
  const dz = screenPos.z - BENCH_Z
  return (Math.sqrt(dx * dx + dz * dz) / SPREAD) * 100
})
const idealVCm = computed(() => {
  const u = uCm.value
  if (u <= TRUE_FOCAL_CM) return null
  return (TRUE_FOCAL_CM * u) / (u - TRUE_FOCAL_CM)
})
/** A concave mirror only reflects light back to the object's side - a screen standing behind the
 *  mirror (on the far side from the object) gets no light at all, so no image can form on it. */
const screenInFront = computed(() => (screenPos.x - mirrorX.value) * (objectX.value - mirrorX.value) > 0)
const focusDiff = computed(() => (idealVCm.value === null || !screenInFront.value ? Infinity : Math.abs(vCm.value - idealVCm.value)))
const focusLabel = computed(() => {
  if (bothPlaced.value && !screenInFront.value) return 'No image - the screen is behind the mirror'
  const d = focusDiff.value
  if (d <= 1.0) return 'Sharp image'
  if (d <= 3.0) return 'Almost sharp'
  if (d <= 6.0) return 'Blurred'
  return 'Very blurred'
})
const focusDotClass = computed(() => (focusDiff.value <= 1.0 ? 'bg-emerald-500' : focusDiff.value <= 3.0 ? 'bg-amber-400' : 'bg-red-400'))
const bothPlaced = computed(() => placedKeys.has(mirrorKey.value) && placedKeys.has(screenKey.value))
const canRecord = computed(() => bothPlaced.value && focusDiff.value <= 1.5)

let stand_rule: THREE.Group
let objectGroup: THREE.Group
let objectGlowMat: THREE.MeshStandardMaterial | null = null
let mirrorGroup: THREE.Group
let screenGroup: THREE.Group
let lightOn = false
let ruleLabel: THREE.Object3D | null = null
let objectLabel: THREE.Object3D | null = null
let mirrorLabel: THREE.Object3D | null = null
let screenLabel: THREE.Object3D | null = null

/** The name-tag sprite createObjectMesh attaches to every group - hidden by default, shown only
 *  on hover (same behaviour as the free-layout engine's apparatus). */
function findLabel(group: THREE.Group): THREE.Object3D | null {
  const label = group.children.find(c => c.userData?.role === 'label') ?? null
  if (label) label.visible = false
  return label
}

// --- Ray diagram: two rays from the lit arrow to the centre of the mirror, reflected to the screen.
// They meet exactly at the centre of the screen only when the screen is at the true (hidden) image
// distance - the same point the student is hunting for with the screen.
let axisLine: THREE.Line
let focusMarker: THREE.Mesh
let rayParallelIn: THREE.ArrowHelper
let rayParallelOut: THREE.ArrowHelper
let rayFocalIn: THREE.ArrowHelper
let rayFocalOut: THREE.ArrowHelper

/** A metre rule marked 0-100 cm in mm, built with its 0 cm mark at the group's origin. It lies just in
 *  front of the object/mirror line and slides with the object, so the object always sits at 0 cm and
 *  the mirror's position on the scale is the object distance u. */
function buildMetreRule(): THREE.Group {
  const len = 1.04 * SPREAD // 2 cm of plain wood beyond each end of the scale, drawn to the bench's scale
  const tex = canvasTexture(4096, 160, (ctx, w, h) => {
    ctx.fillStyle = '#f2d39a'; ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = '#1f2937'; ctx.fillStyle = '#1f2937'; ctx.textAlign = 'center'; ctx.font = 'bold 34px Arial'
    for (let mm = 0; mm <= 1000; mm += 5) {
      // Tick positions as a fraction of the rule's length: 2 cm margin + 100 cm scale + 2 cm margin,
      // independent of how long the rule is drawn - so the marks stretch exactly with SPREAD
      const x = ((0.02 + mm / 1000) / 1.04) * w
      const tick = mm % 100 === 0 ? 70 : mm % 50 === 0 ? 52 : mm % 10 === 0 ? 38 : 20
      ctx.lineWidth = mm % 100 === 0 ? 4 : 2
      ctx.beginPath(); ctx.moveTo(x, h); ctx.lineTo(x, h - tick); ctx.stroke()
      if (mm % 100 === 0) ctx.fillText(String(mm / 10), x, h - 84)
    }
    ctx.font = 'bold 26px Arial'; ctx.fillText('cm', w - 70, 34)
  })
  tex.anisotropy = 8
  const edge = new THREE.MeshStandardMaterial({ color: 0xc8955a, roughness: 0.6 })
  const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55 })
  const rule = new THREE.Mesh(new THREE.BoxGeometry(len, 0.008, 0.045), [edge, edge, face, edge, edge, edge])
  rule.position.set(len / 2 - 0.02 * SPREAD, 0.004, 0)
  rule.castShadow = rule.receiveShadow = true
  const g = new THREE.Group()
  g.add(rule)
  g.userData.objectKey = ruleKey.value
  return g
}
const RULE_Z = BENCH_Z + 0.075

function buildApparatus(scene: THREE.Scene) {
  stand_rule = buildMetreRule()
  scene.add(stand_rule)
  ruleLabel = null

  objectGroup = createObjectMesh('illuminated_object', objectKey.value, 'Illuminated Object', { state: 'off' })
  objectGroup.scale.setScalar(0.2)
  // Left facing the camera on purpose (not rotated to face the mirror along the bench) - the
  // camera views this bench side-on, along Z, so a face aimed along X would be edge-on and its
  // glow invisible. The experiment only needs the object's position for u, not ray-tracing.
  const glow = objectGroup.children.find(c => c.userData?.role === 'led') as THREE.Mesh | undefined
  objectGlowMat = (glow?.material as THREE.MeshStandardMaterial) ?? null
  buildLamp(objectGroup)
  scene.add(objectGroup)
  objectLabel = findLabel(objectGroup)

  mirrorGroup = createObjectMesh('concave_mirror', mirrorKey.value, 'Concave Mirror', {})
  mirrorGroup.scale.setScalar(0.2)
  mirrorGroup.rotation.y = Math.PI / 2
  scene.add(mirrorGroup)
  mirrorLabel = findLabel(mirrorGroup)

  screenGroup = createObjectMesh('focus_screen', screenKey.value, 'Focus Screen', {})
  screenGroup.scale.setScalar(0.2)
  buildScreenImage(screenGroup)
  scene.add(screenGroup)
  screenLabel = findLabel(screenGroup)

  axisLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.02, gapSize: 0.012 }),
  )
  scene.add(axisLine)
  focusMarker = new THREE.Mesh(new THREE.SphereGeometry(0.007, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 }))
  scene.add(focusMarker)
  const mkArrow = (color: number) => new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, color, 0.03, 0.018)
  rayParallelIn = mkArrow(0xdc2626)
  rayParallelOut = mkArrow(0xdc2626)
  rayFocalIn = mkArrow(0x2563eb)
  rayFocalOut = mkArrow(0x2563eb)
  scene.add(rayParallelIn, rayParallelOut, rayFocalIn, rayFocalOut)
  scene.add(lampBeam)
}

// --- The lamp: where the light actually comes from ------------------------------------------------
// A small bulb in a brass socket on the mirror-facing side of the illuminated object (object-local
// units, the object being scaled 0.2). Switched on, it glows with a soft halo, lights the bench around
// it and sends a faint beam of light to the mirror - and the ray arrows start from it.
const LAMP_LOCAL = new THREE.Vector3(0.25, 0.22, 0)
let lampBulbMat: THREE.MeshStandardMaterial
let lampHalo: THREE.Sprite
let lampLight: THREE.PointLight
let lampBeam: THREE.Mesh
function buildLamp(group: THREE.Group) {
  const brass = new THREE.MeshStandardMaterial({ color: 0xd4a84b, metalness: 1, roughness: 0.25 })
  const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.07, 20), brass)
  socket.rotation.z = Math.PI / 2
  socket.position.set(0.19, LAMP_LOCAL.y, 0)
  lampBulbMat = new THREE.MeshStandardMaterial({ color: 0xfffbeb, emissive: 0xffd27a, emissiveIntensity: 0, roughness: 0.1, transparent: true, opacity: 0.9 })
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 24, 16), lampBulbMat)
  bulb.scale.x = 1.25
  bulb.position.copy(LAMP_LOCAL)
  const filament = new THREE.Mesh(new THREE.TorusGeometry(0.015, 0.003, 6, 16, Math.PI), new THREE.MeshBasicMaterial({ color: 0xfff3c4 }))
  filament.position.copy(LAMP_LOCAL)
  // Soft halo around the bulb: a radial glow, added on top of whatever is behind it
  const haloTex = canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2)
    g.addColorStop(0, 'rgba(255,244,200,1)'); g.addColorStop(0.25, 'rgba(255,214,120,0.75)'); g.addColorStop(1, 'rgba(255,190,80,0)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)
  })
  lampHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
  lampHalo.scale.setScalar(0.55)
  lampHalo.position.copy(LAMP_LOCAL)
  lampHalo.visible = false
  lampLight = new THREE.PointLight(0xffd27a, 0, 0.5, 2)
  lampLight.position.copy(LAMP_LOCAL)
  // The cross-wire: two fine wires crossed inside a small brass ring, standing in the light just in
  // front of the bulb - this is the object whose image the mirror forms
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.007, 8, 40), brass)
  ring.rotation.y = Math.PI / 2
  ring.position.set(CROSS_LOCAL_X, LAMP_LOCAL.y, 0)
  const wireMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 })
  const wireV = new THREE.Mesh(new THREE.CylinderGeometry(0.0028, 0.0028, 0.14, 6), wireMat)
  wireV.position.copy(ring.position)
  const wireH = wireV.clone()
  wireH.rotation.x = Math.PI / 2
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, LAMP_LOCAL.y - 0.07, 8), brass)
  stem.position.set(CROSS_LOCAL_X, (LAMP_LOCAL.y - 0.07) / 2, 0)
  group.add(socket, bulb, filament, lampHalo, lampLight, ring, wireV, wireH, stem)
  // Faint beam of light from the bulb towards the mirror (world space, re-aimed every frame)
  lampBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 0.15, 1, 32, 1, true).translate(0, 0.5, 0),
    new THREE.MeshBasicMaterial({ color: 0xffe7a3, transparent: true, opacity: 0.13, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }),
  )
  lampBeam.visible = false
}
function applyLamp() {
  if (objectGlowMat) objectGlowMat.emissiveIntensity = lightOn ? 1.2 : 0
  lampBulbMat.emissiveIntensity = lightOn ? 2.4 : 0
  lampHalo.visible = lightOn
  lampLight.intensity = lightOn ? 0.35 : 0
}
/** World position of the glowing bulb - where the light, and the ray arrows, start. */
function lampWorld(): THREE.Vector3 {
  objectGroup.updateMatrixWorld(true)
  return objectGroup.localToWorld(LAMP_LOCAL.clone())
}
function syncBeam(mirrorCentre: THREE.Vector3 | null) {
  lampBeam.visible = !!mirrorCentre && lightOn
  if (!mirrorCentre || !lightOn) return
  const from = lampWorld()
  const dir = mirrorCentre.clone().sub(from)
  const len = dir.length()
  // Narrow at the bulb, opening out to about the mirror's size where it arrives
  lampBeam.position.copy(from)
  lampBeam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
  lampBeam.scale.set(0.055, len, 0.055)
}

// --- The image of the cross-wire on the screen ---------------------------------------------------------
// A round spot of light with the cross-wire's shadow across it, on the face of the card turned to the
// mirror. Its size follows the real magnification (v/u); it's crisp only when the screen is at the
// image distance, and spreads into a bigger, dimmer, blurred patch the further it is from there.
const CROSS_WORLD_DIAMETER = 0.14 * 0.2 // the ring's inner diameter in metres
let imagePlane: THREE.Mesh
let imageMat: THREE.MeshBasicMaterial
let imageTexKey = ''
function buildScreenImage(group: THREE.Group) {
  imageMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide })
  imagePlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), imageMat)
  imagePlane.position.set(0, 0.26, 0.0095) // just in front of the card's face
  imagePlane.visible = false
  group.add(imagePlane)
}
function imageTexture(blurPx: number, brightness: number) {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    ctx.filter = blurPx > 0 ? `blur(${blurPx}px)` : 'none'
    const r = w * 0.3
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, r)
    g.addColorStop(0, `rgba(255,246,205,${brightness})`)
    g.addColorStop(0.8, `rgba(255,221,130,${brightness})`)
    g.addColorStop(1, `rgba(255,200,90,${brightness * 0.85})`)
    ctx.fillStyle = g
    ctx.beginPath(); ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2); ctx.fill()
    // The cross-wire's shadow (the image is inverted, but a cross looks the same either way up)
    ctx.strokeStyle = `rgba(30,22,12,${0.9 * brightness})`
    ctx.lineWidth = 7
    ctx.beginPath(); ctx.moveTo(w / 2, h / 2 - r); ctx.lineTo(w / 2, h / 2 + r); ctx.moveTo(w / 2 - r, h / 2); ctx.lineTo(w / 2 + r, h / 2); ctx.stroke()
    // The brass ring's shadow round the edge
    ctx.lineWidth = 5
    ctx.beginPath(); ctx.arc(w / 2, h / 2, r - 2, 0, Math.PI * 2); ctx.stroke()
  })
}
function syncScreenImage() {
  const show = lightOn && bothPlaced.value && placedKeys.has(objectKey.value) && screenInFront.value && idealVCm.value !== null
  imagePlane.visible = show
  if (!show) return
  const d = focusDiff.value // cm away from the sharp position
  const blurPx = d <= 1.0 ? 0 : Math.min(28, Math.round(d * 3))
  const brightness = Math.round(Math.max(0.25, Math.min(1, 1.1 - d / 12)) * 10) / 10
  const key = `${blurPx}|${brightness}`
  if (key !== imageTexKey) {
    imageTexKey = key
    imageMat.map?.dispose()
    imageMat.map = imageTexture(blurPx, brightness)
    imageMat.needsUpdate = true
  }
  // Real image size = magnification x object size; out of focus the patch of light spreads wider
  const magnification = idealVCm.value! / uCm.value
  const diameter = CROSS_WORLD_DIAMETER * magnification + Math.min(0.03, d * 0.0015)
  // The disc fills 60% of the texture; keep it within the card (about 6 cm across)
  const planeSize = Math.min(0.28, (diameter / 0.6) / 0.2)
  imagePlane.scale.set(planeSize, planeSize, 1)
}

/** Points an ArrowHelper from `a` to `b`. */
function aimArrow(arrow: THREE.ArrowHelper, a: THREE.Vector3, b: THREE.Vector3) {
  const dir = b.clone().sub(a)
  const len = dir.length()
  if (len < 0.001) { arrow.visible = false; return }
  arrow.visible = true
  dir.normalize()
  arrow.position.copy(a)
  arrow.setDirection(dir)
  arrow.setLength(len, Math.min(0.035, len * 0.3), Math.min(0.02, len * 0.18))
}

function syncScene() {
  stand_rule.visible = placedKeys.has(ruleKey.value)
  // The rule's 0 cm mark stays at the object (the rule moves with it)
  stand_rule.position.set(placedKeys.has(objectKey.value) ? crossX.value : 0.1, 0, RULE_Z)

  objectGroup.visible = placedKeys.has(objectKey.value)
  // Same Z as the mirror and screen now (not offset either side) - the ray diagram needs to
  // actually start and end at the real apparatus, which only reads cleanly along one straight line.
  // objectX is kept current during a drag too (set in onDragMove), same as mirrorX/screenPos.
  objectGroup.position.set(placedKeys.has(objectKey.value) ? objectX.value : 0.1, 0.02, BENCH_Z)

  // mirrorX is kept current during a drag too (set in onDragMove), so this is the same
  // position whether or not that item is the one currently being dragged.
  mirrorGroup.visible = placedKeys.has(mirrorKey.value)
  mirrorGroup.position.set(mirrorX.value, 0.02, BENCH_Z)

  screenGroup.visible = placedKeys.has(screenKey.value)
  screenGroup.position.set(screenPos.x, 0.02, screenPos.z)
  // The screen is free to stand anywhere on the table now, so it turns to keep facing the mirror
  // - the direction the reflected rays actually travel in - instead of always facing the camera.
  screenGroup.rotation.y = Math.atan2(mirrorX.value - screenPos.x, BENCH_Z - screenPos.z)

  if (ruleLabel) ruleLabel.visible = hoveredKey.value === ruleKey.value
  if (objectLabel) objectLabel.visible = hoveredKey.value === objectKey.value
  if (mirrorLabel) mirrorLabel.visible = hoveredKey.value === mirrorKey.value
  if (screenLabel) screenLabel.visible = hoveredKey.value === screenKey.value

  syncRayDiagram()
  syncScreenImage()
  mirrorGroup.updateMatrixWorld(true)
  syncBeam(placedKeys.has(objectKey.value) && placedKeys.has(mirrorKey.value) ? mirrorGroup.localToWorld(new THREE.Vector3(0, 0.45, 0)) : null)
}

function syncRayDiagram() {
  const showRays = lightOn && bothPlaced.value && placedKeys.has(objectKey.value) && idealVCm.value !== null
  axisLine.visible = showRays
  focusMarker.visible = showRays
  rayParallelIn.visible = rayParallelOut.visible = rayFocalIn.visible = rayFocalOut.visible = showRays
  if (!showRays) return

  // Anchor every ray to the real apparatus: the lit arrow on the object, the centre (pole) of the
  // concave mirror and the centre of the screen card, wherever each one currently stands.
  const at = (g: THREE.Object3D, x: number, y: number, z: number) => { g.updateMatrixWorld(true); return g.localToWorld(new THREE.Vector3(x, y, z)) }
  // Two rays leave the glowing bulb (from just above and just below its centre)
  const objTop = at(objectGroup, CROSS_LOCAL_X, LAMP_LOCAL.y + 0.05, 0)
  const objBottom = at(objectGroup, CROSS_LOCAL_X, LAMP_LOCAL.y - 0.05, 0)
  const objMid = at(objectGroup, CROSS_LOCAL_X, LAMP_LOCAL.y, 0)
  const mirrorCentre = at(mirrorGroup, 0, 0.45, 0)
  const screenCentre = at(screenGroup, 0, 0.26, 0)

  // Axis from the object to the mirror's centre, with F one focal length out from the mirror
  const towardObject = objMid.clone().sub(mirrorCentre).normalize()
  const pos = axisLine.geometry.attributes.position as THREE.BufferAttribute
  const axisStart = objMid.clone().addScaledVector(towardObject, 0.05)
  const axisEnd = mirrorCentre.clone().addScaledVector(towardObject, -0.03)
  pos.setXYZ(0, axisStart.x, axisStart.y, axisStart.z)
  pos.setXYZ(1, axisEnd.x, axisEnd.y, axisEnd.z)
  pos.needsUpdate = true
  axisLine.computeLineDistances()
  focusMarker.position.copy(mirrorCentre.clone().addScaledVector(towardObject, (TRUE_FOCAL_CM / 100) * SPREAD))

  // Both incident rays (from the top and the bottom of the lit arrow) aim exactly at the mirror's
  // centre, and both reflected rays leave from there towards the screen's centre. With the image
  // sharp they meet exactly at the middle of the screen; otherwise they land apart, further apart
  // the more out of focus it is - and once the screen is past the image the rays have already
  // crossed, so they land the other way round.
  const diffCm = idealVCm.value === null ? 0 : vCm.value - idealVCm.value
  const spread = focusDiff.value <= 1.0 ? 0 : Math.min(0.045, Math.abs(diffCm) * 0.004)
  const sign = diffCm > 0 ? -1 : 1
  const up = new THREE.Vector3(0, 1, 0)
  aimArrow(rayParallelIn, objTop, mirrorCentre)
  aimArrow(rayFocalIn, objBottom, mirrorCentre)
  if (!screenInFront.value) {
    // The screen is behind the mirror: the reflected light still goes back towards the object's side
    // (to where the image really forms) and never reaches the screen
    const image = mirrorCentre.clone().addScaledVector(towardObject, (idealVCm.value! / 100) * SPREAD)
    aimArrow(rayParallelOut, mirrorCentre, image.clone().addScaledVector(up, 0.004))
    aimArrow(rayFocalOut, mirrorCentre, image.clone().addScaledVector(up, -0.004))
    return
  }
  aimArrow(rayParallelOut, mirrorCentre, screenCentre.clone().addScaledVector(up, sign * spread))
  aimArrow(rayFocalOut, mirrorCentre, screenCentre.clone().addScaledVector(up, -sign * spread))
}

// --- Dragging ---------------------------------------------------------------------------------
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.02)
const dragPoint = new THREE.Vector3()
const hoverCursor = ref('grab')
const hoveredKey = ref<string | null>(null)
let dragging: 'mirror' | 'screen' | 'object' | null = null
// The object doubles as its own lamp switch, so a pointer-down on it starts out as a potential
// toggle; it only turns into a drag (and the toggle is cancelled) once the pointer actually moves.
let pointerDownAt: { x: number; y: number } | null = null
let pendingToggle = false

function pickTarget(ev: PointerEvent): 'mirror' | 'screen' | 'object' | null {
  const targets: THREE.Object3D[] = []
  if (placedKeys.has(objectKey.value)) targets.push(objectGroup)
  if (placedKeys.has(mirrorKey.value)) targets.push(mirrorGroup)
  if (placedKeys.has(screenKey.value)) targets.push(screenGroup)
  if (!targets.length) return null
  const hit = pick(ev, targets)
  if (hit === objectGroup) return 'object'
  if (hit === mirrorGroup) return 'mirror'
  if (hit === screenGroup) return 'screen'
  return null
}

/** Any placed apparatus under the pointer, draggable or not - just for the hover name tag. */
function pickAnyApparatus(ev: PointerEvent): string | null {
  const targets: THREE.Object3D[] = []
  if (placedKeys.has(objectKey.value)) targets.push(objectGroup)
  if (placedKeys.has(mirrorKey.value)) targets.push(mirrorGroup)
  if (placedKeys.has(screenKey.value)) targets.push(screenGroup)
  if (placedKeys.has(ruleKey.value)) targets.push(stand_rule)
  if (!targets.length) return null
  const hit = pick(ev, targets)
  if (hit === objectGroup) return objectKey.value
  if (hit === mirrorGroup) return mirrorKey.value
  if (hit === screenGroup) return screenKey.value
  if (hit === stand_rule) return ruleKey.value
  return null
}

function onHover(ev: PointerEvent) {
  if (dragging) return
  hoverCursor.value = pickTarget(ev) ? 'pointer' : 'grab'
  hoveredKey.value = pickAnyApparatus(ev)
}

function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  const target = pickTarget(ev)
  if (!target || !room.value || props.readOnly) return
  room.value.controls.enabled = false
  dragging = target
  hoverCursor.value = 'grabbing'
  pointerDownAt = { x: ev.clientX, y: ev.clientY }
  pendingToggle = target === 'object'
  onDragMove(ev)
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onPointerUp, { once: true })
}

function onDragMove(ev: PointerEvent) {
  if (!dragging) return
  if (pendingToggle && pointerDownAt) {
    const moved = Math.hypot(ev.clientX - pointerDownAt.x, ev.clientY - pointerDownAt.y)
    if (moved > 6) pendingToggle = false // real drag now, not a click - don't toggle the lamp on release
  }
  if (!pointOnPlane(ev, dragPlane, dragPoint)) return
  if (dragging === 'screen') {
    // Free-roaming over the whole tabletop, not pinned to the object/mirror line.
    screenPos.x = Math.max(TABLE_X_MIN, Math.min(TABLE_X_MAX, dragPoint.x))
    screenPos.z = Math.max(TABLE_Z_MIN, Math.min(TABLE_Z_MAX, dragPoint.z))
    return
  }
  if (dragging === 'mirror') {
    mirrorX.value = Math.max(crossX.value + 0.1 * SPREAD, Math.min(crossX.value + RULE_LEN * SPREAD, TABLE_X_MAX, dragPoint.x))
  } else {
    // Moving the object carries the rule with it; the mirror stays put unless it would fall off the rule
    objectX.value = Math.max(TABLE_X_MIN, Math.min(mirrorX.value - CROSS_OFFSET - 0.1 * SPREAD, dragPoint.x))
    if (mirrorX.value > crossX.value + RULE_LEN * SPREAD) mirrorX.value = crossX.value + RULE_LEN * SPREAD
  }
}

function onPointerUp() {
  window.removeEventListener('pointermove', onDragMove)
  if (room.value) room.value.controls.enabled = true
  // A plain click on the object (no real drag in between) still toggles its lamp.
  if (pendingToggle && dragging === 'object' && !props.readOnly) {
    lightOn = !lightOn
    applyLamp()
    emit('action', { objectKey: objectKey.value, action: lightOn ? 'switch_on' : 'switch_off', value: null })
  }
  dragging = null
  pendingToggle = false
  pointerDownAt = null
  hoverCursor.value = 'grab'
}

// --- Recording a trial -------------------------------------------------------------------------
const trialsRecorded = ref(0)
function recordTrial() {
  if (!canRecord.value) return
  const noise = () => (Math.random() - 0.5) * 0.3
  const u = Math.round((uCm.value + noise()) * 10) / 10
  const v = Math.round((vCm.value + noise()) * 10) / 10
  emit('action', { objectKey: mirrorKey.value, action: 'measure', value: String(u), unit: 'cm', label: 'Metre Rule (object to mirror)', targetObjectKey: objectKey.value })
  emit('action', { objectKey: screenKey.value, action: 'measure', value: String(v), unit: 'cm', label: 'Metre Rule (screen to mirror)', targetObjectKey: mirrorKey.value })
  trialsRecorded.value++
}

const hint = ref<string | null>(null)
function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3500)
}

function setObjectState(key: string, patch: Record<string, any>) {
  if (key === objectKey.value && 'state' in patch) {
    lightOn = patch.state === 'on'
    applyLamp()
  }
}

const HOME_POS: THREE.Vector3Tuple = [-0.5, 0.6, 1.1]
const HOME_TARGET: THREE.Vector3Tuple = [-0.5, 0.04, -0.02]
const { room, unsupported, pick, pointOnPlane, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.4, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildApparatus(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the apparatus from the tray, switch on the lamp, then drag the mirror and screen along the rule.')
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
})

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
