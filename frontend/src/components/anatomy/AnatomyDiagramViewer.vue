<template>
  <div class="relative w-full h-full overflow-hidden bg-[radial-gradient(ellipse_at_center,#eef1f5_0%,#d5dce4_60%,#b9c3ce_100%)] dark:bg-[radial-gradient(ellipse_at_center,#2b3442_0%,#161b24_100%)]">
    <div v-if="supported" ref="host" class="absolute inset-0 cursor-grab active:cursor-grabbing" role="img" aria-label="3D diagram of the female reproductive system. Drag to turn, scroll or pinch to zoom."></div>
    <p v-else class="absolute inset-0 flex items-center justify-center p-6 text-sm text-gray-600 text-center">This device cannot show 3D. The labelled parts are listed beside the model.</p>

    <!-- labels -->
    <div v-if="supported && labelsOn" class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div v-for="l in placed" :key="l.key + l.x" class="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center" :style="{ left: `${l.x}px`, top: `${l.y}px` }">
        <span class="px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap shadow-sm" :class="l.key === selected ? 'bg-indigo-600 text-white' : 'bg-white/95 text-gray-800'">{{ l.name }}</span>
        <span class="w-px h-3 bg-gray-600/70"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-gray-800 -mt-0.5"></span>
      </div>
    </div>

    <div class="absolute top-2 left-2 right-2 flex flex-wrap items-center gap-1.5">
      <slot name="toolbar-start" />
      <button type="button" :class="btn(playing)" :aria-pressed="playing" @click="playing = !playing">{{ playing ? '❚❚ Stop' : "▶ An egg's journey" }}</button>
      <button type="button" :class="btn(labelsOn)" :aria-pressed="labelsOn" @click="labelsOn = !labelsOn">Labels</button>
      <button type="button" :class="btn(turning)" :aria-pressed="turning" @click="turning = !turning">Turn</button>
      <button type="button" :class="btn(false)" @click="frame()">Reset view</button>
      <span class="inline-flex rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white/95">
        <button type="button" class="px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100 border-r border-gray-200" aria-label="Zoom in" @click="zoom(0.8)">＋</button>
        <button type="button" class="px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100" aria-label="Zoom out" @click="zoom(1.25)">−</button>
      </span>
      <slot name="toolbar-end" />
    </div>

    <span class="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/55 text-white text-[11px]">3D diagram (simplified, for teaching)</span>
    <div v-if="playing" class="absolute bottom-10 left-1/2 -translate-x-1/2 w-[min(32rem,calc(100%-1.5rem))] px-4 py-2.5 rounded-2xl bg-gray-900/85 text-white text-sm text-center shadow-lg" role="status" aria-live="polite">{{ caption }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { createAnatomyScene, webglAvailable, type AnatomyScene } from '@/anatomy/scene'
import { viewPose } from '@/anatomy/camera'
import { buildFemaleDiagram, diagramPartAt, type DiagramModel } from '@/anatomy/diagrams/femaleReproductive'

const props = defineProps<{ selected: string | null }>()
const emit = defineEmits<{ pick: [string | null] }>()

const host = ref<HTMLElement | null>(null)
const supported = ref(typeof window !== 'undefined' && webglAvailable())
const labelsOn = ref(true)
const playing = ref(false)
const turning = ref(false)
const caption = ref('')
const placed = ref<{ key: string; name: string; x: number; y: number }[]>([])

let view: AnatomyScene | null = null
let model: DiagramModel | null = null
let egg: THREE.Mesh | null = null
let offBefore: (() => void) | null = null
let offFrame: (() => void) | null = null
const highlight = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x15874a, emissiveIntensity: 0.4, roughness: 0.5, side: THREE.DoubleSide })

const btn = (on: boolean) => ['px-2.5 py-1.5 rounded-lg shadow-sm border text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
  on ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white/95 border-gray-200 text-gray-700']

const STAGES: [number, string][] = [
  [0.12, 'Ovulation: about once a month an ovary releases an egg.'],
  [0.26, 'The fimbriae sweep the egg into the fallopian tube.'],
  [0.82, 'Cilia move the egg along the tube - this is where fertilisation usually happens.'],
  [1.01, 'A fertilised egg moves into the uterus and implants in its lining.'],
]

/** front view with room around the diagram (and below the toolbar) */
function framedPose() {
  const box = new THREE.Box3().setFromObject(model!.root)
  const pose = viewPose('front', box, view!.camera.fov, view!.camera.aspect)
  pose.position.sub(pose.target).multiplyScalar(1.3).add(pose.target)
  return pose
}
function frame() {
  if (!view || !model) return
  view.flyTo(framedPose())
}
function zoom(f: number) {
  if (!view) return
  const off = view.camera.position.clone().sub(view.controls.target).multiplyScalar(f)
  view.camera.position.copy(view.controls.target).add(off)
  view.controls.update()
  view.requestRender()
}

function updateLabels() {
  if (!view || !model || !labelsOn.value) { placed.value = []; return }
  const r = view.canvas.getBoundingClientRect()
  placed.value = model.parts.map(p => {
    const v = p.anchor.clone().project(view!.camera)
    return { key: p.key, name: p.name, x: (v.x * 0.5 + 0.5) * r.width, y: (-v.y * 0.5 + 0.5) * r.height, z: v.z }
  }).filter(p => p.z < 1)
}

function applyHighlight() {
  if (!model) return
  model.root.traverse((o) => {
    const m = o as THREE.Mesh
    if (!m.isMesh || !m.userData.part) return
    m.userData.base ??= m.material
    const part = m.userData.part as string
    const on = props.selected && (part === props.selected || (props.selected === 'cervix' && part === 'uterus'))
    m.material = on && props.selected !== 'cervix' ? highlight : m.userData.base
  })
  view?.requestRender()
}

onMounted(() => {
  if (!supported.value || !host.value) return
  try {
    view = createAnatomyScene(host.value)
  } catch {
    supported.value = false
    return
  }
  model = buildFemaleDiagram()
  view.scene.add(model.root)
  view.controls.minDistance = 0.05
  const pose = framedPose()
  view.camera.position.copy(pose.position)
  view.controls.target.copy(pose.target)
  view.controls.update()
  offFrame = view.onFrame(updateLabels)
  egg = new THREE.Mesh(new THREE.SphereGeometry(0.0028, 16, 12), new THREE.MeshBasicMaterial({ color: 0xfff7c2, depthTest: false }))
  egg.renderOrder = 30
  egg.visible = false
  view.scene.add(egg)
  let t0 = -1
  offBefore = view.onBeforeFrame((t) => {
    if (!playing.value || !egg || !model) return
    if (t0 < 0) t0 = t
    const u = ((t - t0) % 10) / 10
    egg.position.copy(model.eggPath.getPointAt(u))
    caption.value = STAGES.find(([end]) => u < end)![1]
  })
  // click / tap = pick a part
  let down: { x: number; y: number } | null = null
  const c = view.canvas
  c.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY } })
  c.addEventListener('pointerup', (e) => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6 || !view || !model) return
    const r = c.getBoundingClientRect()
    const ray = new THREE.Raycaster()
    ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), view.camera)
    const hit = ray.intersectObject(model.root, true)[0]
    emit('pick', hit ? diagramPartAt(hit) : null)
  })
  view.requestRender()
})

watch(playing, (on) => {
  if (egg) egg.visible = on
  view?.setContinuous(on || turning.value)
})
watch(turning, (on) => {
  if (!view) return
  view.controls.autoRotate = on
  view.controls.autoRotateSpeed = 1.5
  view.setContinuous(on || playing.value)
})
watch(labelsOn, () => { updateLabels(); view?.requestRender() })
watch(() => props.selected, applyHighlight)

onBeforeUnmount(() => {
  offBefore?.(); offFrame?.()
  if (egg) { egg.geometry.dispose(); (egg.material as THREE.Material).dispose() }
  highlight.dispose()
  model?.dispose()
  view?.dispose()
})
</script>
