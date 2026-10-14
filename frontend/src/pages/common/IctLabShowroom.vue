<template>
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Computer hardware</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Parts showroom</h1>
      </div>
    </div>

    <!-- The parts -->
    <div class="flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      <button
        v-for="(k, i) in SHOWN"
        :key="k"
        type="button"
        class="flex-shrink-0 px-3 py-1.5 rounded-xl border text-sm font-semibold transition-colors"
        :class="index === i ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'"
        @click="index = i"
      >{{ shortName(k) }}</button>
    </div>

    <div class="mt-3 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4">
        <div v-if="!unsupported" class="relative w-full h-[46vh] min-h-[300px] lg:h-[58vh] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
          <div ref="host" class="absolute inset-0 cursor-grab"></div>
          <div class="absolute top-2 left-2 flex flex-wrap gap-1.5">
            <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm" :class="!inCase ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'" @click="inCase = false">On its own</button>
            <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm" :class="inCase ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'" @click="inCase = true">Where it goes</button>
          </div>
          <span v-if="!inCase && enlarged" class="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/50 text-white text-[11px]">Shown larger than real size</span>
          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
            <span class="px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">Drag to turn · pinch to zoom</span>
            <div class="flex gap-1.5 pointer-events-auto">
              <button type="button" class="px-2.5 py-1 rounded-lg bg-white/90 text-gray-800 text-xs font-semibold shadow-sm hover:bg-white" :disabled="index === 0" @click="index = Math.max(0, index - 1)">‹ Back</button>
              <button type="button" class="px-2.5 py-1 rounded-lg bg-white/90 text-gray-800 text-xs font-semibold shadow-sm hover:bg-white" :disabled="index === SHOWN.length - 1" @click="index = Math.min(SHOWN.length - 1, index + 1)">Next ›</button>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400 p-6 text-center">This device cannot show 3D - here is everything about the part.</p>
      </section>

      <!-- All about it -->
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3 lg:sticky lg:top-20">
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400">{{ index + 1 }} of {{ SHOWN.length }}</p>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ part.name }}</h2>
        </div>
        <div v-for="row in rows" :key="row.label">
          <p class="text-xs font-bold text-indigo-600 dark:text-indigo-300 flex items-center gap-1"><AppIcon :name="row.icon" class="w-3.5 h-3.5" />{{ row.label }}</p>
          <p class="text-sm text-gray-700 dark:text-gray-200 mt-0.5">{{ row.text }}</p>
        </div>
        <p class="text-sm rounded-xl px-3 py-2 bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
          <AppIcon name="bulb" class="w-4 h-4 inline -mt-0.5" /> <span class="font-semibold">Did you know?</span> {{ details.fact }}
        </p>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import * as THREE from 'three'
import AppIcon from '@/components/common/AppIcon.vue'
import { createWorkbench, type Workbench } from '@/components/ictlab/three/workbench'
import { buildPc, setEmissive, type PcRig, type PcPartKey } from '@/components/ictlab/three/pcModel'
import { PC_PARTS, PART_DETAILS } from '@/components/ictlab/activities'
import { labRoleOf } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

const SHOWN = ['motherboard', 'cpu', 'cooler', 'ram', 'psu', 'hdd', 'ssd', 'gpu', 'optical', 'casefan', 'cmos', 'sata', 'ports']
const index = ref(0)
const inCase = ref(false)
const key = computed(() => SHOWN[index.value])
const part = computed(() => PC_PARTS[key.value])
const details = computed(() => PART_DETAILS[key.value])
const shortName = (k: string) => PC_PARTS[k].name.replace(/ \(.*\)$/, '')
const rows = computed(() => [
  { label: 'What it looks like', icon: 'photo', text: details.value.looks },
  { label: 'What it does', icon: 'bolt', text: part.value.does },
  { label: 'Where it goes', icon: 'map', text: details.value.where },
  { label: 'When it fails', icon: 'warning', text: part.value.fails }
])

// ---------------------------------------------------------------- 3D
const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
let rig: PcRig | null = null
let stand: THREE.Group
let turntable: THREE.Group
let shown: THREE.Object3D | null = null
let computer: THREE.Group
const enlarged = ref(false)

// The one object for each part (some live on the motherboard, one is a cable)
const objectFor = (k: string): THREE.Object3D | null => {
  if (!rig) return null
  if (k === 'cmos') return rig.cmos
  if (k === 'ports') return rig.ports
  if (k === 'sata') return rig.cables.sata
  return rig.parts[k as PcPartKey] || null
}

// Camera spots: close to the stand, or standing back to see the whole computer
const STAND_VIEW = { pos: new THREE.Vector3(0.0, 0.2, 0.42), target: new THREE.Vector3(0, 0.09, 0) }
const CASE_VIEW = { pos: new THREE.Vector3(0.26, 0.46, 0.85), target: new THREE.Vector3(0, 0.22, -0.4) }
let camGoal: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  try {
    wb.value = createWorkbench(host.value, { cameraPosition: STAND_VIEW.pos.toArray(), target: STAND_VIEW.target.toArray(), minDistance: 0.15, maxDistance: 1.6 })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  // The stand: a dark turntable in the middle of the desk
  stand = new THREE.Group()
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.18, 0.016, 64), new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.5, roughness: 0.35 }))
  base.position.y = 0.008
  base.receiveShadow = true
  stand.add(base)
  turntable = new THREE.Group()
  turntable.position.y = 0.016
  stand.add(turntable)
  w.scene.add(stand)

  // The whole computer, further back on the desk, for "where it goes"
  rig = buildPc()
  computer = new THREE.Group()
  computer.add(rig.shell)
  for (const k of Object.keys(rig.parts) as PcPartKey[]) computer.add(rig.parts[k])
  computer.add(rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel, rig.cables.mainsIn)
  computer.position.set(0, 0, -0.4)
  computer.visible = false
  w.scene.add(computer)

  w.onFrame(dt => {
    if (!inCase.value) turntable.rotation.y += dt * 0.45
    if (camGoal) {
      const k = 1 - Math.exp(-dt * 4)
      w.camera.position.lerp(camGoal.pos, k)
      w.controls.target.lerp(camGoal.target, k)
      if (w.camera.position.distanceTo(camGoal.pos) < 0.002) camGoal = null
    }
    if (inCase.value) {
      const o = objectFor(key.value)
      if (o) setEmissive(o, 0xfacc15, 0.25 + 0.25 * Math.sin(performance.now() / 250))
    }
  })
  show()
})

onBeforeUnmount(() => wb.value?.dispose())

// A copy of the part on the stand, sized to be seen, turned to show its best side
function show() {
  if (!wb.value || !rig) return
  if (shown) {
    turntable.remove(shown)
    shown = null
  }
  const src = objectFor(key.value)
  if (!src) return
  const copy = src.clone(true)
  copy.position.set(0, 0, 0)
  copy.quaternion.identity()
  copy.scale.set(1, 1, 1)
  copy.visible = true
  copy.traverse(o => { o.visible = true })
  const box = new THREE.Box3().setFromObject(copy)
  const size = box.getSize(new THREE.Vector3())
  const largest = Math.max(size.x, size.y, size.z)
  const scale = Math.min(5, 0.17 / largest)
  enlarged.value = scale > 1.3
  const holder = new THREE.Group()
  holder.add(copy)
  holder.scale.setScalar(scale)
  // centre it over the turntable, sitting on it
  const b2 = new THREE.Box3().setFromObject(holder)
  const c = b2.getCenter(new THREE.Vector3())
  holder.position.set(-c.x, -b2.min.y + 0.002, -c.z)
  const spin = new THREE.Group()
  spin.add(holder)
  turntable.add(spin)
  shown = spin
  turntable.rotation.y = -0.5
}

// "Where it goes": the computer with everything faded but this part, which glows
function fadeAllBut(target: THREE.Object3D | null) {
  if (!rig) return
  const keep = new Set<THREE.Object3D>()
  target?.traverse(o => keep.add(o))
  const groups: THREE.Object3D[] = [rig.shell, ...Object.values(rig.parts), rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel, rig.cables.mainsIn]
  for (const g of groups) {
    g.traverse(o => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined
      if (!m || (o as THREE.Sprite).isSprite) return
      const fade = target !== null && !keep.has(o)
      if (m.userData.baseOpacity === undefined) {
        m.userData.baseOpacity = m.opacity
        m.userData.baseTransparent = m.transparent
      }
      m.transparent = fade ? true : m.userData.baseTransparent
      m.opacity = fade ? 0.14 : m.userData.baseOpacity
      m.depthWrite = !fade
      m.needsUpdate = true
    })
  }
}

watch(key, () => {
  for (const k of SHOWN) {
    const o = objectFor(k)
    if (o) setEmissive(o, 0, 0)
  }
  show()
  if (inCase.value) fadeAllBut(objectFor(key.value))
})
watch(inCase, on => {
  const w = wb.value
  if (!w) return
  camGoal = on ? { pos: CASE_VIEW.pos.clone(), target: CASE_VIEW.target.clone() } : { pos: STAND_VIEW.pos.clone(), target: STAND_VIEW.target.clone() }
  stand.visible = !on
  computer.visible = on
  if (on) fadeAllBut(objectFor(key.value))
  else {
    fadeAllBut(null)
    for (const k of SHOWN) {
      const o = objectFor(k)
      if (o) setEmissive(o, 0, 0)
    }
  }
})
</script>
