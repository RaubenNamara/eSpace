<template>
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Computer hardware</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Parts and devices showroom</h1>
      </div>
    </div>

    <!-- The groups: inside the computer, then the devices around it -->
    <div class="flex gap-1 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]" role="tablist">
      <button
        v-for="g in GROUPS"
        :key="g.key"
        type="button"
        role="tab"
        :aria-selected="group === g.key"
        class="flex-shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors"
        :class="group === g.key ? 'bg-indigo-800 text-white' : 'bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 text-gray-700 dark:text-gray-200 hover:ring-indigo-300'"
        @click="setGroup(g.key)"
      >{{ g.label }} <span class="text-xs opacity-70">{{ g.keys.length }}</span></button>
    </div>
    <!-- The items in this group -->
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
          <div v-if="isInside" class="absolute top-2 left-2 flex flex-wrap gap-1.5">
            <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm" :class="!inCase ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'" @click="inCase = false">On its own</button>
            <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm" :class="inCase ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800 hover:bg-white'" @click="inCase = true">Where it goes</button>
          </div>
          <span v-if="!inCase && sizeNote" class="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/50 text-white text-[11px]">{{ sizeNote }}</span>
          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
            <span class="px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">Drag to turn · pinch to zoom</span>
            <div class="flex gap-1.5 pointer-events-auto">
              <button type="button" class="px-2.5 py-1 rounded-lg bg-white/90 text-gray-800 text-xs font-semibold shadow-sm hover:bg-white" :disabled="index === 0" @click="index = Math.max(0, index - 1)">‹ Back</button>
              <button type="button" class="px-2.5 py-1 rounded-lg bg-white/90 text-gray-800 text-xs font-semibold shadow-sm hover:bg-white" :disabled="index === SHOWN.length - 1" @click="index = Math.min(SHOWN.length - 1, index + 1)">Next ›</button>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400 p-6 text-center">This device cannot show 3D - here is everything about it.</p>
      </section>

      <!-- All about it -->
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-3 lg:sticky lg:top-20">
        <div>
          <p class="text-[11px] font-bold uppercase tracking-wide text-gray-400">{{ index + 1 }} of {{ SHOWN.length }}</p>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ itemName }}</h2>
          <p v-if="!isInside" class="mt-0.5 inline-block px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200 text-xs font-semibold">{{ BADGE[group] || groupLabel }}</p>
        </div>
        <div v-for="row in rows" :key="row.label">
          <p class="text-xs font-bold text-indigo-600 dark:text-indigo-300 flex items-center gap-1"><AppIcon :name="row.icon" class="w-3.5 h-3.5" />{{ row.label }}</p>
          <p class="text-sm text-gray-700 dark:text-gray-200 mt-0.5">{{ row.text }}</p>
        </div>
        <p class="text-sm rounded-xl px-3 py-2 bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
          <AppIcon name="bulb" class="w-4 h-4 inline -mt-0.5" /> <span class="font-semibold">Did you know?</span> {{ fact }}
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
import { buildPc, setEmissive, fadeExcept, type PcRig, type PcPartKey } from '@/components/ictlab/three/pcModel'
import { PC_PARTS, PART_DETAILS } from '@/components/ictlab/activities'
import { DEVICES, DEVICE_GROUPS } from '@/components/ictlab/deviceInfo'
import { buildDevice, type DeviceKey } from '@/components/ictlab/three/devices'
import { labRoleOf } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

// The parts inside the computer, then the devices around it (input, output, storage, networking
// and power, other computers)
const INSIDE = ['motherboard', 'cpu', 'cooler', 'ram', 'psu', 'hdd', 'ssd', 'gpu', 'optical', 'casefan', 'cmos', 'sata', 'ports']
const GROUPS: { key: string; label: string; keys: string[] }[] = [{ key: 'inside', label: 'Inside the computer', keys: INSIDE }, ...DEVICE_GROUPS]
const group = ref('inside')
const BADGE: Record<string, string> = { input: 'Input device', output: 'Output device', storage: 'Storage device', network: 'Networking and power', computers: 'A computer' }
const isInside = computed(() => group.value === 'inside')
const groupLabel = computed(() => GROUPS.find(g => g.key === group.value)?.label || '')
const SHOWN = computed(() => GROUPS.find(g => g.key === group.value)?.keys || INSIDE)
const index = ref(0)
const inCase = ref(false)
const key = computed(() => SHOWN.value[index.value])
const device = computed(() => (isInside.value ? null : DEVICES[key.value as DeviceKey]))
const itemName = computed(() => device.value?.name || PC_PARTS[key.value].name)
const fact = computed(() => device.value?.fact || PART_DETAILS[key.value].fact)
const shortName = (k: string) => (DEVICES[k as DeviceKey]?.name || PC_PARTS[k].name).replace(/ \(.*\)$/, '')
const rows = computed(() => {
  const d = device.value
  if (d) {
    return [
      { label: 'What it looks like', icon: 'photo', text: d.looks },
      { label: 'What it does', icon: 'bolt', text: d.does },
      { label: 'How it connects', icon: 'paperclip', text: d.connects }
    ]
  }
  const part = PC_PARTS[key.value]
  const details = PART_DETAILS[key.value]
  return [
    { label: 'What it looks like', icon: 'photo', text: details.looks },
    { label: 'What it does', icon: 'bolt', text: part.does },
    { label: 'Where it goes', icon: 'map', text: details.where },
    { label: 'When it fails', icon: 'warning', text: part.fails }
  ]
})
function setGroup(g: string) {
  if (g === group.value) return
  inCase.value = false
  group.value = g
  index.value = 0
}

// ---------------------------------------------------------------- 3D
const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
let rig: PcRig | null = null
let stand: THREE.Group
let turntable: THREE.Group
let shown: THREE.Object3D | null = null
let computer: THREE.Group
// "Shown larger than real size" for a small part, "smaller" for a big device
const sizeNote = ref('')

// The one object for each part (some live on the motherboard, one is a cable)
const objectFor = (k: string): THREE.Object3D | null => {
  if (DEVICES[k as DeviceKey]) return buildDevice(k as DeviceKey)
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
  // everything in the part shows, but not the connector name tags
  copy.traverse(o => { o.visible = !(o as THREE.Sprite).isSprite })
  const box = new THREE.Box3().setFromObject(copy)
  const size = box.getSize(new THREE.Vector3())
  const largest = Math.max(size.x, size.y, size.z)
  // a flat thing (keyboard, cable, extension socket) lies across the whole turntable; a tall one stands
  // in the middle of it
  const flat = size.y < largest * 0.25
  const scale = Math.min(5, (flat ? 0.3 : 0.17) / largest)
  sizeNote.value = scale > 1.3 ? 'Shown larger than real size' : scale < 0.75 ? 'Shown smaller than real size' : ''
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
  fadeExcept([rig.shell, ...Object.values(rig.parts), rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel, rig.cables.mainsIn], target, 0.14)
}

watch(key, () => {
  for (const k of INSIDE) {
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
    for (const k of INSIDE) {
      const o = objectFor(k)
      if (o) setEmissive(o, 0, 0)
    }
  }
})
</script>
