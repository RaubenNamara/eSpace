<template>
  <div class="relative w-full h-full">
    <div ref="canvasHost" class="w-full h-full rounded-lg overflow-hidden bg-gradient-to-b from-sky-50 to-slate-200 dark:from-gray-900 dark:to-gray-950"></div>

    <p v-if="!objects.length" class="absolute inset-0 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 pointer-events-none px-6 text-center">
      Add an object above to see it on the bench and drag it into place.
    </p>

    <!-- Object picker - lets a teacher select something that's hidden behind another object or
         off-camera, without having to hunt for it in the 3D view. -->
    <div v-if="objects.length" class="absolute top-2 left-2 right-2 flex flex-wrap gap-1.5 pointer-events-none">
      <button
        v-for="o in objects"
        :key="o.key"
        type="button"
        class="pointer-events-auto px-2 py-1 rounded-md text-[11px] font-medium shadow-sm border transition-colors"
        :class="o.key === selectedKey
          ? 'bg-indigo-600 text-white border-indigo-600'
          : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-indigo-300'"
        @click="select(o.key)"
      >
        {{ catalogByType.get(o.object_type)?.icon }} {{ catalogByType.get(o.object_type)?.display_name || o.object_type }}
        <span v-if="o.in_tray" class="opacity-70">· tray</span>
      </button>
    </div>

    <!-- Selected object's position/rotation - dragging on the bench also updates these live. -->
    <div
      v-if="selectedConfig"
      class="absolute bottom-2 left-2 right-2 sm:right-auto sm:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2"
    >
      <div class="flex items-center justify-between">
        <p class="text-xs font-semibold text-gray-900 dark:text-white truncate">
          {{ catalogByType.get(selectedConfig.object_type)?.display_name || selectedConfig.object_type }}
        </p>
        <button type="button" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs leading-none" @click="deselect">✕</button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <label class="text-[11px] text-gray-500 dark:text-gray-400">
          X
          <input v-model.number="selectedConfig.position.x" type="number" step="0.1" class="input-field w-full text-xs mt-0.5" @input="syncFromInputs">
        </label>
        <label class="text-[11px] text-gray-500 dark:text-gray-400">
          Z
          <input v-model.number="selectedConfig.position.z" type="number" step="0.1" class="input-field w-full text-xs mt-0.5" @input="syncFromInputs">
        </label>
      </div>
      <label class="block text-[11px] text-gray-500 dark:text-gray-400">
        Rotation ({{ rotationDegrees }}°)
        <input type="range" min="0" max="359" step="1" :value="rotationDegrees" class="w-full" @input="onRotationInput">
      </label>
      <p class="text-[10px] text-gray-400 dark:text-gray-500">Drag it on the bench to reposition, or type exact values here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createObjectMesh } from './labObjectFactory'
import type { SceneObjectConfig, LabObjectDef } from '@/types/virtualLab'

// Not v-model: the parent's `scene_objects` array is already treated as directly-mutable local
// form state elsewhere in the teacher editor (e.g. `.splice()` on remove) - this component follows
// the same convention rather than adding an emit round-trip for continuous drag updates.
const props = defineProps<{
  objects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
}>()

const canvasHost = ref<HTMLElement | null>(null)
const selectedKey = ref<string | null>(null)

const catalogByType = computed(() => {
  const map = new Map<string, LabObjectDef>()
  props.objectCatalog.forEach(o => map.set(o.object_type, o))
  return map
})

const selectedConfig = computed(() => props.objects.find(o => o.key === selectedKey.value) || null)
const rotationDegrees = computed(() => Math.round((((selectedConfig.value?.rotation?.y || 0) * 180) / Math.PI + 360) % 360))

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let raf = 0
let resizeObserver: ResizeObserver | null = null
const groups = new Map<string, THREE.Group>()
const raycaster = new THREE.Raycaster()
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
const pointerNdc = new THREE.Vector2()
let dragging = false

function pointerToNdc(ev: PointerEvent) {
  const rect = renderer.domElement.getBoundingClientRect()
  pointerNdc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1
  pointerNdc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1
}

function raycastGroupKey(): string | null {
  raycaster.setFromCamera(pointerNdc, camera)
  const hits = raycaster.intersectObjects(Array.from(groups.values()), true)
  if (hits.length === 0) return null
  let obj: THREE.Object3D | null = hits[0].object
  while (obj && !obj.userData.objectKey) obj = obj.parent
  return obj ? (obj.userData.objectKey as string) : null
}

function highlight(key: string | null) {
  groups.forEach((g, k) => {
    g.traverse((child) => {
      if (child instanceof THREE.Mesh && child.userData.role !== 'label') {
        const mat = child.material as THREE.MeshStandardMaterial
        if (mat && 'emissive' in mat) {
          mat.emissive = new THREE.Color(k === key ? 0x22d3ee : 0x000000)
          mat.emissiveIntensity = k === key ? 0.35 : 0
        }
      }
    })
  })
}

function select(key: string) {
  selectedKey.value = key
  highlight(key)
}

function deselect() {
  selectedKey.value = null
  highlight(null)
}

function onPointerDown(ev: PointerEvent) {
  pointerToNdc(ev)
  const key = raycastGroupKey()
  if (!key) {
    deselect()
    return
  }
  select(key)
  dragging = true
  controls.enabled = false
}

function onPointerMove(ev: PointerEvent) {
  if (!dragging || !selectedKey.value) return
  pointerToNdc(ev)
  raycaster.setFromCamera(pointerNdc, camera)
  const point = new THREE.Vector3()
  const hit = raycaster.ray.intersectPlane(groundPlane, point)
  if (!hit) return
  const group = groups.get(selectedKey.value)
  const cfg = props.objects.find(o => o.key === selectedKey.value)
  if (group) { group.position.x = point.x; group.position.z = point.z }
  if (cfg) { cfg.position.x = Math.round(point.x * 100) / 100; cfg.position.z = Math.round(point.z * 100) / 100 }
}

function onPointerUp() {
  dragging = false
  controls.enabled = true
}

/** The number inputs edit the same config object the drag handler does - this just pushes their
 *  value onto the live mesh so typing a number moves the object without waiting for a rebuild. */
function syncFromInputs() {
  if (!selectedConfig.value) return
  const group = groups.get(selectedConfig.value.key)
  if (group) {
    group.position.x = selectedConfig.value.position.x
    group.position.z = selectedConfig.value.position.z
  }
}

function onRotationInput(ev: Event) {
  if (!selectedConfig.value) return
  const deg = Number((ev.target as HTMLInputElement).value)
  const rad = (deg * Math.PI) / 180
  selectedConfig.value.rotation = { y: rad }
  const group = groups.get(selectedConfig.value.key)
  if (group) group.rotation.y = rad
}

function placeObject(cfg: SceneObjectConfig) {
  const def = catalogByType.value.get(cfg.object_type)
  const merged = { ...(def?.default_props || {}), ...(cfg.props || {}) }
  const group = createObjectMesh(cfg.object_type, cfg.key, def?.display_name || cfg.object_type, merged)
  group.position.set(cfg.position.x, cfg.position.y || 0, cfg.position.z)
  if (cfg.rotation) group.rotation.y = cfg.rotation.y
  scene.add(group)
  groups.set(cfg.key, group)
}

function disposeGroup(g: THREE.Group) {
  scene.remove(g)
  g.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose()
      if (Array.isArray(child.material)) child.material.forEach(m => m.dispose())
      else child.material.dispose()
    }
  })
}

/** Rebuilds every object's mesh - only called when the *set* of objects changes (add/remove/type
 *  swap), not on every drag frame, since disposing and recreating geometry per pointer-move would
 *  be wasteful and would fight with the live position already being dragged. */
function rebuildObjects() {
  groups.forEach(disposeGroup)
  groups.clear()
  props.objects.forEach(placeObject)
  if (selectedKey.value && !props.objects.some(o => o.key === selectedKey.value)) deselect()
  else if (selectedKey.value) highlight(selectedKey.value)
}

// A cheap fingerprint of key+type per object - changes exactly when something is added, removed,
// or its apparatus type is swapped, and nothing else (position/rotation edits don't touch it).
const structureFingerprint = () => props.objects.map(o => `${o.key}:${o.object_type}`).join('|')
watch(structureFingerprint, () => { if (scene) rebuildObjects() })

function buildScene() {
  const host = canvasHost.value
  if (!host) return
  scene = new THREE.Scene()
  scene.background = null

  camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 100)
  camera.position.set(2.8, 3.2, 3.6)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(host.clientWidth, host.clientHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  host.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.3, 0)
  controls.enableDamping = true
  controls.maxPolarAngle = Math.PI / 2.1
  controls.minDistance = 1.5
  controls.maxDistance = 8

  const hemi = new THREE.HemisphereLight(0xe8f0ff, 0xb8b0a0, 0.7)
  const key = new THREE.DirectionalLight(0xffffff, 1.4)
  key.position.set(3, 5, 2)
  const fill = new THREE.DirectionalLight(0xdbe8ff, 0.35)
  fill.position.set(-3, 2, -2)
  scene.add(hemi, key, fill)

  const bench = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 4, 0.1, 64),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.85, metalness: 0.05 })
  )
  bench.position.y = -0.05
  scene.add(bench)

  props.objects.forEach(placeObject)

  renderer.domElement.addEventListener('pointerdown', onPointerDown)
  renderer.domElement.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)

  const animate = () => {
    raf = requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  resizeObserver = new ResizeObserver(() => {
    if (!host.clientWidth || !host.clientHeight) return
    camera.aspect = host.clientWidth / host.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(host.clientWidth, host.clientHeight)
  })
  resizeObserver.observe(host)
}

onMounted(buildScene)

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  renderer?.domElement.removeEventListener('pointerdown', onPointerDown)
  renderer?.domElement.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  controls?.dispose()
  groups.forEach(disposeGroup)
  renderer?.dispose()
  // See VirtualLabScene.vue's onBeforeUnmount for why this matters - without it, mobile browsers
  // can silently run out of concurrent WebGL contexts after a teacher edits a few experiments.
  renderer?.forceContextLoss()
  renderer?.domElement.remove()
})
</script>
