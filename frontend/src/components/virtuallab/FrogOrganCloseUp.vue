<template>
  <div class="absolute inset-0 z-30 flex bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" role="dialog" :aria-label="`${title} close-up`">
    <!-- side panel -->
    <aside v-show="panelOpen" class="w-[17rem] flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto p-3 space-y-3 text-sm">
      <div>
        <p class="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Organ close-up</p>
        <h2 class="text-base font-extrabold">{{ title }}</h2>
      </div>

      <template v-if="isHeart">
        <p class="text-gray-600 dark:text-gray-300 text-[13px]">The frog's heart has <strong>three chambers</strong>: two atria and one ventricle. Click any part to find out what it does.</p>
        <ul class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-300" aria-label="Colour key">
          <li class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full" :style="{ background: hex(RICH) }"></span>Oxygen-rich</li>
          <li class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full" :style="{ background: hex(POOR) }"></span>Oxygen-poor</li>
          <li class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full" :style="{ background: hex(MIXED) }"></span>Mixed</li>
        </ul>

        <section>
          <h3 class="text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">One heartbeat</h3>
          <ol class="mt-1.5 space-y-1">
            <li v-for="(p, i) in FROG_PHASES" :key="p.key">
              <button type="button" class="w-full text-left flex items-center gap-2 rounded-lg border px-2 py-1.5 text-xs"
                :class="p.key === phase ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 font-semibold' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-emerald-300'"
                :aria-current="p.key === phase ? 'step' : undefined" @click="showPhase(p.key)">
                <span class="w-4 h-4 rounded-full text-[10px] flex items-center justify-center flex-shrink-0" :class="p.key === phase ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700'">{{ i + 1 }}</span>{{ p.name }}
              </button>
            </li>
          </ol>
          <div class="mt-2 flex items-center gap-1.5 text-xs">
            <span class="text-gray-500">Speed</span>
            <button v-for="s in SPEEDS" :key="s.bpm" type="button" class="px-2 py-1 rounded-md border font-semibold"
              :class="bpm === s.bpm ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 dark:border-gray-600'" :aria-pressed="bpm === s.bpm" @click="bpm = s.bpm">{{ s.l }}</button>
          </div>
        </section>

        <section v-if="part" class="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-900/20 p-2.5" aria-live="polite">
          <div class="flex items-start gap-2">
            <h3 class="font-bold flex-1">{{ part.name }}</h3>
            <span v-if="part.blood !== 'none'" class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-white" :style="{ background: part.blood === 'rich' ? hex(RICH) : part.blood === 'poor' ? hex(POOR) : hex(MIXED) }">{{ part.blood === 'rich' ? 'Oxygen-rich' : part.blood === 'poor' ? 'Oxygen-poor' : 'Mixed blood' }}</span>
          </div>
          <p class="text-[13px] text-gray-700 dark:text-gray-200 mt-1">{{ part.summary }}</p>
          <p class="text-[13px] mt-1"><strong>Job:</strong> {{ part.fn }}</p>
          <ul class="mt-1 list-disc pl-4 space-y-0.5 text-[13px] text-gray-700 dark:text-gray-200">
            <li v-for="(m, i) in part.more" :key="i"><template v-for="(seg, k) in bold(m)" :key="k"><strong v-if="seg.b">{{ seg.t }}</strong><template v-else>{{ seg.t }}</template></template></li>
          </ul>
        </section>

        <section>
          <h3 class="text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Parts of the heart</h3>
          <ul class="mt-1.5 flex flex-wrap gap-1">
            <li v-for="k in PART_ORDER" :key="k">
              <button type="button" class="px-2 py-1 rounded-md border text-xs" :aria-pressed="selected === k"
                :class="selected === k ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400'"
                @click="selectPart(selected === k ? null : k)">{{ FROG_HEART_PARTS[k].name }}</button>
            </li>
          </ul>
        </section>
        <p class="text-[11px] text-gray-500 dark:text-gray-400">A model of a frog's heart, drawn from textbook anatomy (not a scan). The motion follows the frog's heartbeat, slowed down.</p>
      </template>

      <template v-else>
        <p v-if="info" class="text-[13px]"><strong>What it does:</strong> {{ info.fn }}</p>
        <p v-if="info" class="text-[13px] text-gray-700 dark:text-gray-200"><strong>In the living frog:</strong> {{ info.life }}</p>
        <p class="text-[11px] text-gray-500 dark:text-gray-400">This is the {{ title.toLowerCase() }} from the frog you are dissecting, shown on its own with the head end at the top. Drag to turn it; scroll or pinch to zoom.</p>
      </template>
    </aside>

    <!-- 3D -->
    <div class="relative flex-1 min-w-0">
      <div ref="host" class="absolute inset-0" :style="{ cursor: hovering ? 'pointer' : 'grab' }" @pointerdown="onDown" @pointerup="onUp" @pointermove="onMove"></div>

      <div class="absolute top-2 left-2 right-2 flex flex-wrap gap-1.5">
        <button type="button" :class="btn(false)" @click="panelOpen = !panelOpen">{{ panelOpen ? 'Hide panel' : 'Show panel' }}</button>
        <button type="button" :class="btn(false)" @click="$emit('close')">← Back to the frog</button>
        <button v-if="animated" type="button" :class="btn(playing)" :aria-pressed="playing" @click="playing = !playing">{{ playing ? '❚❚ Pause' : '▶ Play' }}</button>
        <span v-if="isHeart" class="inline-flex rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden bg-white/95 dark:bg-gray-900/95" role="radiogroup" aria-label="Heart view">
          <button v-for="o in VIEWS" :key="o.k" type="button" role="radio" :aria-checked="view === o.k" class="px-2.5 py-1.5 text-xs font-semibold"
            :class="view === o.k ? 'bg-emerald-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'" @click="setView(o.k)">{{ o.l }}</button>
        </span>
        <button v-if="isHeart" type="button" :class="btn(labelsOn)" :aria-pressed="labelsOn" @click="labelsOn = !labelsOn">Labels</button>
        <button type="button" :class="btn(false)" @click="resetView()">Reset view</button>
        <span class="inline-flex rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden bg-white/95 dark:bg-gray-900/95">
          <button type="button" class="px-2.5 py-1.5 text-xs font-bold border-r border-gray-200 dark:border-gray-700" aria-label="Zoom in" @click="zoom(0.8)">＋</button>
          <button type="button" class="px-2.5 py-1.5 text-xs font-bold" aria-label="Zoom out" @click="zoom(1.25)">−</button>
        </span>
      </div>

      <!-- labels follow the model -->
      <div v-if="labelsOn" class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div v-for="l in placed" :key="l.key" class="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center" :style="{ left: l.x + 'px', top: l.y + 'px' }">
          <span class="px-1.5 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap shadow-sm" :class="l.key === selected ? 'bg-emerald-600 text-white' : 'bg-white/90 text-gray-800 dark:bg-gray-800/90 dark:text-gray-100'">{{ l.name }}</span>
          <span class="w-px h-2 bg-gray-500/70"></span><span class="w-1.5 h-1.5 rounded-full bg-gray-700 -mt-0.5"></span>
        </div>
      </div>

      <div v-if="hoverName" class="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/60 text-white text-xs pointer-events-none">{{ hoverName }}</div>
      <div v-if="caption" class="absolute bottom-3 left-1/2 -translate-x-1/2 w-[min(34rem,calc(100%-1.5rem))] px-4 py-2 rounded-2xl bg-gray-900/85 text-white text-sm text-center shadow-lg" role="status" aria-live="polite">
        <span v-if="isHeart" class="block text-[10px] font-bold uppercase tracking-wide text-emerald-200">{{ phaseLabel }}</span>{{ caption }}
      </div>
      <LabUnsupported v-if="unsupported" />
    </div>
  </div>
</template>

<script setup lang="ts">
/*
 * The organ close-up for the frog dissection: one organ on its own, centred and enlarged, turned and
 * zoomed freely. The heart is a detailed model of the frog's three-chambered heart (frogHeartModel.ts)
 * with outside and cut-open views, the heartbeat and the two bloodstreams; every other organ is shown
 * as copies of its meshes from the frog being dissected (the lungs keep breathing). It is only a view:
 * it never changes the dissection or its record.
 */
import { ref, computed, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import * as THREE from 'three'
import { createStudio, type Studio } from './lab3d/studio'
import type { FrogModel, OrganKey } from './lab3d/frogModel'
import { buildFrogHeart, FROG_HEART_PARTS, FROG_PHASES, frogPhaseAt, RICH, POOR, MIXED, type FrogHeart, type FrogHeartPart, type FrogPhase } from './lab3d/frogHeartModel'
import LabUnsupported from './lab3d/LabUnsupported.vue'

const props = defineProps<{ organ: OrganKey; frog: FrogModel; title: string; info: { fn: string; life: string } | null }>()
defineEmits<{ close: [] }>()

const isHeart = computed(() => props.organ === 'heart')
const animated = computed(() => isHeart.value || props.organ === 'lungs')
const VIEWS = [{ k: 'outside', l: 'Outside' }, { k: 'inside', l: 'Inside (cut open)' }] as const
const SPEEDS = [{ bpm: 6, l: 'Very slow' }, { bpm: 15, l: 'Slow' }, { bpm: 45, l: 'Real speed' }]
const PART_ORDER: FrogHeartPart[] = ['sinus_venosus', 'venae_cavae', 'right_atrium', 'left_atrium', 'interatrial_septum', 'av_valve', 'ventricle', 'truncus', 'spiral_valve', 'carotid_arch', 'systemic_arch', 'pulmocutaneous_arch', 'pulmonary_veins']
const hex = (n: number) => `#${n.toString(16).padStart(6, '0')}`
const bold = (t: string) => t.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(x => x.startsWith('**') ? { t: x.slice(2, -2), b: true } : { t: x, b: false })
const btn = (on: boolean) => ['px-2.5 py-1.5 rounded-lg shadow-sm border text-xs font-semibold',
  on ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800']

const host = ref<HTMLDivElement | null>(null)
const studio = shallowRef<Studio | null>(null)
const unsupported = ref(false)
const panelOpen = ref(typeof window === 'undefined' || window.innerWidth >= 900)
const playing = ref(true)
const bpm = ref(15)
const view = ref<'outside' | 'inside'>('outside')
const labelsOn = ref(true)
const selected = ref<FrogHeartPart | null>(null)
const phase = ref<FrogPhase | null>(null)
const part = computed(() => (selected.value ? FROG_HEART_PARTS[selected.value] : null))
const phaseInfo = computed(() => FROG_PHASES.find(p => p.key === phase.value) ?? null)
const phaseLabel = computed(() => (phaseInfo.value ? `${FROG_PHASES.indexOf(phaseInfo.value) + 1}. ${phaseInfo.value.name}` : ''))
const caption = computed(() => (isHeart.value ? phaseInfo.value?.caption ?? null : props.organ === 'lungs' && playing.value ? 'The floor of the mouth pumps air in and the lungs fill, then the air is pushed out again - about 20 times a minute.' : null))

/** what is shown: the frog heart model, or copies of the organ's meshes */
const content = new THREE.Group()
let heart: FrogHeart | null = null
const ownMaterials: THREE.Material[] = []
const lungClones: { o: THREE.Object3D; s: THREE.Vector3 }[] = []

/** frog-local axes (+X snout, +Y back, +Z right) to a ventral view with the head up */
const FROG_TO_VIEW = new THREE.Matrix4().set(0, 0, -1, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 1)

function buildContent() {
  if (isHeart.value) {
    heart = buildFrogHeart()
    content.add(heart.root)
    return
  }
  const holder = new THREE.Group()
  holder.applyMatrix4(FROG_TO_VIEW)
  const rootInv = props.frog.root.matrixWorld.clone().invert()
  for (const o of props.frog.organObjects(props.organ)) {
    o.updateWorldMatrix(true, true)
    const c = o.clone(true)
    new THREE.Matrix4().multiplyMatrices(rootInv, o.matrixWorld).decompose(c.position, c.quaternion, c.scale)
    c.traverse((x) => {
      x.visible = true
      const mesh = x as THREE.Mesh
      if (!mesh.isMesh) return
      // own copies of the materials: never clipped or faded like the frog's may be
      const mats = (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).map((m) => {
        const k = m.clone()
        k.clippingPlanes = null
        k.transparent = false
        k.opacity = 1
        k.depthWrite = true
        ownMaterials.push(k)
        return k
      })
      mesh.material = Array.isArray(mesh.material) ? mats : mats[0]
      mesh.castShadow = true
    })
    holder.add(c)
    if (props.organ === 'lungs') lungClones.push({ o: c, s: c.scale.clone() })
  }
  // centred and enlarged so the organ is about 3 units across
  const box = new THREE.Box3().setFromObject(holder)
  const size = box.getSize(new THREE.Vector3())
  const k = 3 / Math.max(size.x, size.y, size.z, 1e-6)
  const wrapper = new THREE.Group()
  wrapper.add(holder)
  holder.position.sub(box.getCenter(new THREE.Vector3()))
  wrapper.scale.setScalar(k)
  content.add(wrapper)
}

/** frames the whole organ, centred, never cropped */
function fitPose() {
  const s = studio.value!
  content.updateWorldMatrix(true, true)
  const box = new THREE.Box3().setFromObject(content)
  const centre = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3())
  const cam = s.camera
  const vFov = THREE.MathUtils.degToRad(cam.fov)
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * cam.aspect)
  // room for the toolbar above and the caption below
  const dist = Math.max((size.y / 2) * 1.4 / Math.tan(vFov / 2), (size.x / 2) * 1.15 / Math.tan(hFov / 2)) + size.z / 2
  const dir = view.value === 'inside' ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0.25, 0.12, 1).normalize()
  const target = centre.clone().add(new THREE.Vector3(0, -size.y * 0.05, 0))
  return { pos: target.clone().addScaledVector(dir, dist), target }
}
function resetView(instant = false) {
  const s = studio.value
  if (!s) return
  const p = fitPose()
  if (instant) { s.camera.position.copy(p.pos); s.controls.target.copy(p.target); s.controls.update() }
  else s.flyTo(p.pos, p.target)
}
function zoom(f: number) {
  const s = studio.value
  if (!s) return
  const off = s.camera.position.clone().sub(s.controls.target).multiplyScalar(f)
  s.camera.position.copy(s.controls.target).add(off)
}

function setView(v: 'outside' | 'inside') {
  view.value = v
  heart?.setView(v)
  resetView()
}
function selectPart(k: FrogHeartPart | null) {
  selected.value = k
  heart?.select(k)
  if (k && FROG_HEART_PARTS[k].inside && view.value === 'outside') setView('inside')
}
function showPhase(k: FrogPhase) {
  const p = FROG_PHASES.find(x => x.key === k)
  if (!p || !heart) return
  playing.value = false
  heart.setCycle((p.start + p.end) / 2)
  phase.value = k
}

// --- picking ---
const raycaster = new THREE.Raycaster()
const hovering = ref(false)
const hoverName = ref<string | null>(null)
function hitPart(ev: PointerEvent): FrogHeartPart | null {
  const s = studio.value
  if (!s || !heart) return null
  raycaster.setFromCamera(s.toNdc(ev), s.camera)
  for (const h of raycaster.intersectObject(heart.root, true)) {
    if (!h.object.visible) continue
    const clip = ((h.object as THREE.Mesh).material as THREE.Material)?.clippingPlanes ?? []
    if (clip.some(p => p.distanceToPoint(h.point) < 0)) continue
    const p = heart.partOf(h.object)
    if (p) return p
  }
  return null
}
let down: { x: number; y: number } | null = null
function onDown(ev: PointerEvent) { down = { x: ev.clientX, y: ev.clientY } }
function onUp(ev: PointerEvent) {
  const d = down
  down = null
  if (!d || Math.hypot(ev.clientX - d.x, ev.clientY - d.y) > 6 || !isHeart.value) return
  selectPart(hitPart(ev))
}
function onMove(ev: PointerEvent) {
  if (!isHeart.value || ev.buttons) return
  const p = hitPart(ev)
  hovering.value = !!p
  hoverName.value = p ? FROG_HEART_PARTS[p].name : null
}

// --- labels ---
const placed = ref<{ key: FrogHeartPart; name: string; x: number; y: number }[]>([])
const sightRay = new THREE.Raycaster()
/** something else of the heart lies between the camera and this point */
function hiddenBehind(point: THREE.Vector3, part: FrogHeartPart) {
  const s = studio.value
  if (!s || !heart) return false
  const from = s.camera.position
  const dist = from.distanceTo(point)
  sightRay.set(from, point.clone().sub(from).normalize())
  sightRay.far = dist - 0.12
  for (const h of sightRay.intersectObject(heart.root, true)) {
    if (!h.object.visible || (h.object as THREE.InstancedMesh).isInstancedMesh) continue
    const clip = ((h.object as THREE.Mesh).material as THREE.Material)?.clippingPlanes ?? []
    if (clip.some(p => p.distanceToPoint(h.point) < 0)) continue
    return heart.partOf(h.object) !== part
  }
  return false
}
let labelFrame = 0
function placeLabels() {
  const s = studio.value
  if (!s || !heart || !labelsOn.value) { if (placed.value.length) placed.value = []; return }
  const rect = s.renderer.domElement.getBoundingClientRect()
  const out: typeof placed.value = []
  const boxes: { x0: number; x1: number; y0: number; y1: number }[] = []
  const list = heart.labels().sort((a, b) => Number(b.part === selected.value) - Number(a.part === selected.value))
  for (const l of list) {
    const world = heart.root.localToWorld(l.at.clone())
    // only label what can be seen from here: a part behind the heart gets its label once you turn it round
    if (hiddenBehind(world, l.part)) continue
    const w = world.clone().project(s.camera)
    if (w.z > 1) continue
    const x = (w.x * 0.5 + 0.5) * rect.width, y = (-w.y * 0.5 + 0.5) * rect.height
    const name = FROG_HEART_PARTS[l.part].name
    const bw = name.length * 6.2 + 14
    const b = { x0: x - bw / 2, x1: x + bw / 2, y0: y - 28, y1: y - 10 }
    if (boxes.some(o => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0)) continue
    boxes.push(b)
    out.push({ key: l.part, name, x, y })
  }
  placed.value = out
}

// --- each frame ---
let t = 0
function frame(dt: number) {
  t += dt
  if (heart) {
    if (playing.value) heart.step(dt * bpm.value / 60)
    const ph = frogPhaseAt(heart.cycle).key
    if (ph !== phase.value) phase.value = ph
    // the labels are re-measured a few times a second (each one checks it is not hidden behind the heart)
    if (labelFrame++ % 4 === 0) placeLabels()
  } else if (lungClones.length && playing.value) {
    const b = 0.5 - 0.5 * Math.cos((t / 3) * Math.PI * 2)
    for (const l of lungClones) l.o.scale.set(l.s.x * (1 + 0.1 * b), l.s.y * (1 + 0.3 * b), l.s.z * (1 + 0.08 * b))
  }
}

onMounted(() => {
  if (!host.value) return
  try {
    studio.value = createStudio(host.value, { cameraPosition: new THREE.Vector3(0, 3, 9), target: new THREE.Vector3(0, 2.6, 0), size: 4 })
  } catch {
    unsupported.value = true
    return
  }
  const s = studio.value
  s.controls.enableRotate = true
  s.controls.enablePan = true
  s.controls.minDistance = 1.2
  s.controls.maxDistance = 30
  buildContent()
  // float the organ above the studio floor so its shadow falls beneath it
  content.updateWorldMatrix(true, true)
  const box = new THREE.Box3().setFromObject(content)
  content.position.y = -box.min.y + 0.35
  s.scene.add(content)
  resetView(true)
  s.onFrame(frame)
})
onBeforeUnmount(() => {
  heart?.dispose()
  ownMaterials.forEach(m => m.dispose())
  studio.value?.dispose()
})

defineExpose({ selectPart, setView, showPhase, studio, heart: () => heart, fitPose })
</script>
