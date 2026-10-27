<template>
  <!-- A taste of the ICT Lab on the public site: the lab's own 3D computer, with its side open.
       It turns slowly by itself; drag to turn it, scroll or pinch to zoom, and tap a part (or a
       name below) to light it up and read what it does. Loaded only when scrolled to. -->
  <div class="relative rounded-3xl overflow-hidden ring-1 ring-slate-200 dark:ring-white/10 shadow-2xl shadow-indigo-950/10 bg-white">
    <div ref="host" class="relative h-[22rem] sm:h-[28rem] cursor-grab active:cursor-grabbing" @pointerdown="spin = false" @click="onClick"></div>
    <div v-if="unsupported" class="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-slate-500">This browser can't show 3D - open Tusome's ICT Lab on a newer browser to try it.</div>

    <!-- what the part is -->
    <Transition name="part">
      <div v-if="part" :key="part.key" class="m-3 sm:m-0 sm:absolute sm:left-4 sm:bottom-[4.25rem] sm:max-w-xs rounded-2xl bg-white/95 backdrop-blur p-4 shadow-xl ring-1 ring-slate-200">
        <p class="text-[11px] font-bold uppercase tracking-widest text-indigo-600">Inside the computer</p>
        <p class="mt-1 font-jakarta text-lg font-bold text-slate-900 leading-snug">{{ part.name }}</p>
        <p class="mt-1 text-sm text-slate-600 leading-relaxed">{{ part.does }}</p>
      </div>
    </Transition>
    <span v-if="!part && !unsupported" class="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow">Drag to turn · tap a part</span>

    <!-- the parts by name -->
    <div class="border-t border-slate-200 bg-slate-50 px-3 py-3 flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
      <button
        v-for="k in KEYS"
        :key="k"
        type="button"
        class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition"
        :class="selected === k ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-indigo-300'"
        @click="select(k)"
      >{{ SHORT[k] }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import * as THREE from 'three'
import { createWorkbench, type Workbench } from '@/components/ictlab/three/workbench'
import { buildPc, setEmissive, type PcRig, type PcPartKey } from '@/components/ictlab/three/pcModel'
import { PC_PARTS } from '@/components/ictlab/activities'

const KEYS: PcPartKey[] = ['cpu', 'cooler', 'ram', 'gpu', 'motherboard', 'psu', 'ssd', 'hdd', 'casefan']
const SHORT: Record<string, string> = { cpu: 'Processor', cooler: 'CPU cooler', ram: 'Memory', gpu: 'Graphics card', motherboard: 'Motherboard', psu: 'Power supply', ssd: 'SSD', hdd: 'Hard disk', casefan: 'Case fan', optical: 'Optical drive' }

const host = ref<HTMLElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
const spin = ref(true)
const selected = ref<PcPartKey | null>(null)
const part = computed(() => (selected.value ? PC_PARTS[selected.value] : null))
let rig: PcRig | null = null
let computer: THREE.Group | null = null

const select = (k: PcPartKey) => {
  spin.value = false
  if (rig && selected.value) setEmissive(rig.parts[selected.value], 0x000000, 0)
  selected.value = selected.value === k ? null : k
}

// a tap (not a drag) on a part picks it
let downAt = { x: 0, y: 0 }
const onClick = (e: MouseEvent) => {
  const w = wb.value
  if (!w || !rig || Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 6) return
  const groups = KEYS.map(k => rig!.parts[k])
  const hit = w.pick(e, groups)
  if (!hit) return
  const k = KEYS.find(key => rig!.parts[key] === hit)
  if (k) select(k)
}
const onDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY } }

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  try {
    // a narrow box (a phone) needs the camera further back to fit the whole computer
    const far = host.value.clientWidth / Math.max(1, host.value.clientHeight) < 1.3 ? 1.65 : 1
    wb.value = createWorkbench(host.value, { cameraPosition: [0.5 * far, 0.2 + 0.24 * far, 0.72 * far], target: [0, 0.2, 0], minDistance: 0.35, maxDistance: 2, near: 0.01, studio: true, hd: window.innerWidth >= 1024 })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  host.value.addEventListener('pointerdown', onDown)
  rig = buildPc()
  computer = new THREE.Group()
  computer.add(rig.shell)
  for (const k of Object.keys(rig.parts) as PcPartKey[]) computer.add(rig.parts[k])
  computer.add(rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel)
  // the open side towards the visitor
  computer.rotation.y = 0.5
  w.scene.add(computer)

  w.onFrame(() => {
    if (spin.value && computer) computer.rotation.y = 0.5 + Math.sin(performance.now() / 4000) * 0.3
    if (rig && selected.value) setEmissive(rig.parts[selected.value], 0xfacc15, 0.3 + 0.25 * Math.sin(performance.now() / 260))
  })
})
onBeforeUnmount(() => {
  host.value?.removeEventListener('pointerdown', onDown)
  wb.value?.dispose()
})
</script>

<style scoped>
.part-enter-active, .part-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.part-enter-from, .part-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
