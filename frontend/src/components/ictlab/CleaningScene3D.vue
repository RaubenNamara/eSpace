<template>
  <!-- A dusty computer to clean, in 3D. Choose a dust blower - a can of compressed air, or an
       electric blower (plugged into the wall and switched on) - then press and hold on a dusty part:
       it follows the pointer and the dust blows off in puffs until the part is clean. Choose
       Hold a fan and tap a fan to hold it still first. Everything reports an action to the step
       runner; what is drawn (panel off, fans held, parts clean) follows what it accepted. -->
  <div class="w-full">
    <div v-if="!unsupported" class="relative w-full h-[52vh] min-h-[320px] lg:h-[60vh] rounded-xl overflow-hidden" :class="has('outside') ? 'bg-sky-200' : 'bg-slate-200 dark:bg-slate-800'">
      <div ref="host" class="absolute inset-0" :class="isBlower(tool) ? 'cursor-crosshair' : tool === 'hand' ? 'cursor-pointer' : 'cursor-grab'"></div>

      <div class="absolute top-2 left-2 flex flex-wrap gap-1.5 text-[11px] font-semibold pointer-events-none">
        <span class="px-2 py-0.5 rounded-full shadow-sm" :class="powered ? 'bg-emerald-600 text-white' : pluggedIn ? 'bg-rose-600 text-white' : 'bg-white/90 text-gray-700'">
          {{ powered ? 'Switched on' : pluggedIn ? 'Mains: plugged in' : 'Mains: unplugged' }}
        </span>
        <span v-if="has('outside')" class="px-2 py-0.5 rounded-full shadow-sm bg-sky-600 text-white">Fresh air</span>
        <span v-if="has('mask')" class="px-2 py-0.5 rounded-full shadow-sm bg-emerald-600 text-white">Mask on</span>
        <span v-if="tool" class="px-2 py-0.5 rounded-full shadow-sm bg-indigo-600 text-white">{{ tool === 'can' ? 'Air can in hand' : tool === 'electric' ? 'Electric blower in hand' : 'Hand ready to hold a fan' }}</span>
        <span v-if="blowerKind === 'electric'" class="px-2 py-0.5 rounded-full shadow-sm" :class="elecOn ? 'bg-emerald-600 text-white' : elecPlugged ? 'bg-amber-500 text-white' : 'bg-white/90 text-gray-700'">
          Blower: {{ elecOn ? 'running' : elecPlugged ? 'plugged in, off' : 'not plugged in' }}
        </span>
      </div>

      <!-- How dusty is it -->
      <div class="absolute top-2 right-2 w-36 rounded-lg bg-white/90 dark:bg-gray-900/80 px-2 py-1.5 shadow-sm pointer-events-none">
        <p class="text-[10px] font-semibold text-gray-600 dark:text-gray-300 flex justify-between"><span>Dust left</span><span>{{ Math.round(dustLeft * 100) }}%</span></p>
        <div class="mt-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"><div class="h-full bg-amber-500 transition-all" :style="{ width: `${dustLeft * 100}%` }"></div></div>
      </div>

      <Transition name="note-fade">
        <p v-if="note" :key="note" class="absolute top-10 left-1/2 -translate-x-1/2 max-w-[90%] px-3 py-1.5 rounded-lg bg-gray-900/85 text-white text-xs font-semibold text-center pointer-events-none">{{ note }}</p>
      </Transition>

      <div v-if="hoverName" class="absolute pointer-events-none px-2 py-1 rounded-lg bg-gray-900/85 text-white text-xs font-semibold whitespace-nowrap -translate-x-1/2 -translate-y-full" :style="{ left: `${hoverAt.x}px`, top: `${hoverAt.y - 14}px` }">{{ hoverName }}</div>

      <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
        <span class="px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">{{ isBlower(tool) ? 'Press and hold on the dust' : 'Drag to turn · pinch to zoom' }}</span>
        <button type="button" class="pointer-events-auto px-2 py-1 rounded-lg bg-white/90 text-gray-800 text-[11px] font-semibold shadow-sm hover:bg-white" @click="wb?.resetView()">Reset view</button>
      </div>
    </div>
    <p v-else class="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-sm text-center text-gray-500 dark:text-gray-400">
      Cleaning needs 3D, which this device cannot show. Try it on another phone or a computer.
    </p>

    <div v-if="asking" class="mt-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 p-3">
      <p class="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-2">{{ QUESTION[asking].q }}</p>
      <div class="flex flex-col sm:flex-row gap-2">
        <button v-for="(o, i) in QUESTION[asking].options" :key="i" type="button" class="btn-secondary !py-1.5 !text-sm text-left" @click="answer(o.ok, o.why)">{{ o.text }}</button>
      </div>
    </div>

    <div class="mt-3 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-9 gap-1.5">
      <button
        v-for="t in tools"
        :key="t.key"
        type="button"
        class="flex flex-col items-center gap-1 rounded-xl border bg-white dark:bg-gray-800 py-2 text-[11px] font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-400"
        :class="[t.key === tool || (t.key === 'bswitch' && elecOn) || (t.key === 'bplug' && elecPlugged) ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-gray-200 dark:border-gray-700', glowTool === t.key ? 'ict-glow-btn' : '']"
        @click="useTool(t.key)"
      >
        <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path :d="t.icon" /></svg>
        <span class="text-center leading-tight">{{ t.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import * as THREE from 'three'
import { createWorkbench, type Workbench } from './three/workbench'
import { buildPc, setEmissive, type PcRig, type PcPartKey } from './three/pcModel'
import { DUSTY, type IctStep } from './activities'

const props = defineProps<{
  step: IctStep | null
  guide: boolean
  done: string[]
  level: string
}>()
const emit = defineEmits<{ act: [action: string, wrongMessage?: string]; mistake: [message: string] }>()

const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
let rig: PcRig | null = null

const has = (a: string) => props.done.includes(a)
const pluggedIn = computed(() => !has('unplug') || has('plug'))
const powered = computed(() => has('power'))
const panelOff = computed(() => has('open') && !has('close'))

// ---------------------------------------------------------------- dust
interface Dust { key: string; name: string; fan: boolean; level: number; zone: THREE.Mesh; specks: THREE.InstancedMesh; fuzz: THREE.Mesh; total: number }
const dust = new Map<string, Dust>()
const dustLeft = ref(1)
const updateDustLeft = () => {
  let sum = 0
  for (const d of dust.values()) sum += d.level
  dustLeft.value = dust.size ? sum / dust.size : 0
}

// The region each dusty thing covers (in the case, so it can be worked out once)
function regionOf(key: string): THREE.Box3 {
  if (key === 'floor') return new THREE.Box3(new THREE.Vector3(-0.19, 0.014, -0.08), new THREE.Vector3(0.19, 0.03, 0.09))
  const obj = rig!.parts[key as PcPartKey]
  return new THREE.Box3().setFromObject(obj)
}

function makeDust(key: string, name: string, fan: boolean) {
  const w = wb.value!
  const box = regionOf(key)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  // An invisible box to aim the blower at
  const zone = new THREE.Mesh(new THREE.BoxGeometry(size.x + 0.01, size.y + 0.01, size.z + 0.01), new THREE.MeshBasicMaterial({ visible: false }))
  zone.position.copy(center)
  w.scene.add(zone)
  // Fluffy grey specks on its top and front faces
  const total = key === 'floor' ? 160 : key === 'psu' ? 90 : 110
  const specks = new THREE.InstancedMesh(new THREE.SphereGeometry(0.0032, 6, 5), new THREE.MeshStandardMaterial({ color: 0x8b8f94, roughness: 1 }), total)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const color = new THREE.Color()
  for (let i = 0; i < total; i++) {
    const onTop = key === 'floor' || Math.random() < 0.55
    const p = new THREE.Vector3(
      box.min.x + Math.random() * size.x,
      onTop ? box.max.y + 0.0015 : box.min.y + Math.random() * size.y,
      onTop ? box.min.z + Math.random() * size.z : box.max.z + 0.0015
    )
    if (key === 'floor') p.y = 0.017
    q.setFromEuler(new THREE.Euler(Math.random() * 3, Math.random() * 3, Math.random() * 3))
    const s = 0.6 + Math.random() * 1.6
    m.compose(p, q, new THREE.Vector3(s, s * 0.5, s))
    specks.setMatrixAt(i, m)
    specks.setColorAt(i, color.setHSL(0.08, 0.04, 0.42 + Math.random() * 0.18))
  }
  specks.castShadow = true
  w.scene.add(specks)
  // A grey film over it, fading as it is cleaned
  const fuzz = new THREE.Mesh(new THREE.BoxGeometry(size.x + 0.004, size.y + 0.004, size.z + 0.004), new THREE.MeshStandardMaterial({ color: 0x9a9690, roughness: 1, transparent: true, opacity: 0.32, depthWrite: false }))
  fuzz.position.copy(center)
  if (key !== 'floor') w.scene.add(fuzz)
  dust.set(key, { key, name, fan, level: 1, zone, specks, fuzz, total })
}

function showDust(d: Dust) {
  d.specks.count = Math.round(d.total * d.level)
  ;(d.fuzz.material as THREE.MeshStandardMaterial).opacity = 0.32 * d.level
  d.fuzz.visible = d.level > 0.02
}

// ---------------------------------------------------------------- set up
const COOLER_HUB = new THREE.Vector3()
let blowerCan: THREE.Group
const fingers = new Map<string, THREE.Mesh>()

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  const narrow = host.value.clientWidth < 640
  try {
    wb.value = createWorkbench(host.value, { cameraPosition: narrow ? [0.3, 0.55, 1.2] : [0.2, 0.42, 0.8], target: [0, 0.2, 0], minDistance: 0.25, maxDistance: 1.8 })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  rig = buildPc()
  w.scene.add(rig.shell)
  for (const k of Object.keys(rig.parts) as PcPartKey[]) w.scene.add(rig.parts[k])
  for (const c of [rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel, rig.cables.mainsIn, rig.cables.mainsOut]) w.scene.add(c)
  w.scene.add(rig.sidePanel, rig.mainsPlug)
  rig.cables.cpu_fan.visible = true
  rig.cables.sata.visible = true
  rig.cables.atx24.visible = true

  // The dirt: dust on everything that collects it
  for (const d of DUSTY) {
    if (d.key === 'ram' && props.level !== 'advanced') continue
    if (d.key === 'gpu' && props.level === 'simple') continue
    if (d.key === 'floor' && props.level === 'simple') continue
    makeDust(d.key, d.name, d.fan)
  }

  // The can of compressed air, standing on the desk until it is picked up
  blowerCan = new THREE.Group()
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.13, 24), new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.6, roughness: 0.3 }))
  can.position.y = 0.065
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.02, 0.02, 20), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 }))
  cap.position.y = 0.14
  const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0018, 0.07, 8), new THREE.MeshStandardMaterial({ color: 0xdc2626 }))
  straw.rotation.z = Math.PI / 2
  straw.position.set(0.04, 0.145, 0)
  blowerCan.add(can, cap, straw)
  blowerCan.traverse(o => { o.castShadow = true })
  blowerCan.position.set(0.32, 0, 0.18)
  w.scene.add(blowerCan)

  buildElectricBlower()

  // A finger for each fan, shown while it is held
  for (const k of ['cooler', 'gpu', 'casefan']) {
    const f = new THREE.Mesh(new THREE.CapsuleGeometry(0.008, 0.05, 6, 12), new THREE.MeshStandardMaterial({ color: 0x8d5524, roughness: 0.7 }))
    f.visible = false
    w.scene.add(f)
    fingers.set(k, f)
  }
  const placeFinger = (k: string, at: THREE.Vector3, rot: THREE.Euler) => {
    const f = fingers.get(k)!
    f.position.copy(at)
    f.rotation.copy(rot)
  }
  rig.parts.cooler.localToWorld(COOLER_HUB.set(0, 0, 0.066))
  placeFinger('cooler', COOLER_HUB.clone().add(new THREE.Vector3(0.012, 0.02, 0.012)), new THREE.Euler(0.6, 0, -0.5))
  placeFinger('gpu', rig.parts.gpu.localToWorld(new THREE.Vector3(-0.05, -0.04, 0.08)), new THREE.Euler(0.3, 0, 0.2))
  placeFinger('casefan', rig.parts.casefan.localToWorld(new THREE.Vector3(-0.012, 0.01, 0.012)), new THREE.Euler(0, 0, 1.2))

  // Puffs of dust
  setUpPuffs()

  w.onFrame(dt => frame(dt))
  const c = w.canvas
  c.addEventListener('pointerdown', onDown)
  c.addEventListener('pointermove', onMove)
  c.addEventListener('pointerup', onUp)
  c.addEventListener('pointerleave', onUp)
  sync()
})

onBeforeUnmount(() => {
  if (bootTimer) clearInterval(bootTimer)
  if (noteTimer) clearTimeout(noteTimer)
  wb.value?.dispose()
})

// ---------------------------------------------------------------- state from accepted actions
const OPEN_POSE = { pos: new THREE.Vector3(-0.42, 0.234, 0.2), quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.95, 0.05)) }
function sync() {
  const r = rig
  const w = wb.value
  if (!r || !w) return
  const pose = panelOff.value ? OPEN_POSE : r.sidePanelClosed
  w.moveTo(r.sidePanel, pose.pos, pose.quat, 800, panelOff.value ? 0.05 : 0.08)
  r.cables.mainsIn.visible = pluggedIn.value
  r.cables.mainsOut.visible = !pluggedIn.value
  r.mainsPlug.visible = !pluggedIn.value
  r.powerLed.emissive.setHex(powered.value || pluggedIn.value && !has('unplug') ? 0x22c55e : 0)
  r.powerLed.emissiveIntensity = powered.value || !has('unplug') ? 2 : 0
  for (const [k, f] of fingers) f.visible = has('hold:' + k) && !has('clean:' + k)
  for (const d of dust.values()) {
    if (has('clean:' + d.key)) d.level = 0
    showDust(d)
  }
  updateDustLeft()
  if (has('blower') && !tool.value && !has('close')) tool.value = blowerKind.value || 'can'
}
watch(() => props.done.join('|'), sync)

// ---------------------------------------------------------------- tools
type Tool = 'can' | 'electric' | 'hand' | null
const tool = ref<Tool>(null)
const isBlower = (t: Tool) => t === 'can' || t === 'electric'
// The blower chosen, and the electric one's own plug and switch (it runs off the wall socket -
// the computer itself stays unplugged)
const blowerKind = ref<'can' | 'electric' | null>(null)
const elecPlugged = ref(false)
const elecOn = ref(false)
const note = ref('')
let noteTimer: ReturnType<typeof setTimeout> | null = null
const tell = (text: string) => {
  note.value = text
  if (noteTimer) clearTimeout(noteTimer)
  noteTimer = setTimeout(() => { note.value = '' }, 3500)
}
const tools = computed(() => [
  { key: 'mains', label: 'Mains cable', icon: 'M8 4v5M16 4v5M6 9h12v3a6 6 0 01-12 0zM12 18v3' },
  { key: 'outside', label: 'Fresh air', icon: 'M3 8h11a3 3 0 10-3-3M3 12h15a3 3 0 11-3 3M3 16h7' },
  ...(props.level === 'advanced' ? [{ key: 'mask', label: 'Dust mask', icon: 'M4 9c3-2 13-2 16 0v3c0 4-4 6-8 6s-8-2-8-6zM4 10l-2-1M20 10l2-1' }] : []),
  { key: 'panel', label: 'Side panel', icon: 'M5 3h14v18H5zM9 7h6M9 10h6M9 13h6' },
  { key: 'can', label: 'Air can', icon: 'M8 8h6v13H8zM9 8V5h4v3M14 5h6M18 3l2 2-2 2' },
  { key: 'electric', label: 'Electric blower', icon: 'M3 10h9l3-3h2v10h-2l-3-3H3zM17 12h4M7 14v5h4' },
  ...(blowerKind.value === 'electric'
    ? [
        { key: 'bplug', label: elecPlugged.value ? 'Unplug blower' : 'Plug in blower', icon: 'M8 4v5M16 4v5M6 9h12v3a6 6 0 01-12 0zM12 18v3' },
        { key: 'bswitch', label: elecOn.value ? 'Blower off' : 'Blower on', icon: 'M7 12h10M12 3a9 9 0 110 18 9 9 0 010-18z' }
      ]
    : []),
  { key: 'hand', label: 'Hold a fan', icon: 'M8 13V5a2 2 0 014 0v6M12 11V4a2 2 0 014 0v8M16 11a2 2 0 014 0v3a7 7 0 01-7 7h-1a7 7 0 01-6-3l-3-5a2 2 0 013-2l2 2' },
  { key: 'power', label: 'Power button', icon: 'M12 3v8M7.5 6.5a7 7 0 109 0' }
])
const glowTool = computed(() => {
  if (!props.guide || !props.step) return null
  const a = props.step.action
  if (a.startsWith('hold:')) return tool.value === 'hand' ? null : 'hand'
  if (a.startsWith('clean:')) {
    if (blowerKind.value === 'electric' && !elecPlugged.value) return 'bplug'
    if (blowerKind.value === 'electric' && !elecOn.value) return 'bswitch'
    return isBlower(tool.value) ? null : blowerKind.value || 'electric'
  }
  return ({ unplug: 'mains', plug: 'mains', outside: 'outside', mask: 'mask', open: 'panel', close: 'panel', blower: 'electric', power: 'power' } as Record<string, string>)[a] || null
})

// Doing it right with each kind of blower
const QUESTION: Record<'can' | 'electric', { q: string; options: { text: string; ok: boolean; why?: string }[] }> = {
  can: {
    q: 'How do you hold the can of compressed air?',
    options: [
      { text: 'Any way - upside down sprays harder', ok: false, why: 'Never turn the can upside down - it sprays freezing liquid instead of air, which can damage the parts. Hold it upright and use short bursts.' },
      { text: 'Upright, with short bursts', ok: true }
    ]
  },
  electric: {
    q: 'Before you blow with an electric blower, what must be true?',
    options: [
      { text: 'The computer is unplugged; the blower is plugged into the wall socket and switched on', ok: true },
      { text: 'The computer is switched on, so its fans help blow the dust out', ok: false, why: 'Never - the computer must be switched off and unplugged. Only the blower is plugged in, into the wall socket.' }
    ]
  }
}
const asking = ref<'can' | 'electric' | null>(null)
function pickBlower(kind: 'can' | 'electric') {
  blowerKind.value = kind
  tool.value = kind
}
function useTool(key: string) {
  if (key === 'mains') emit('act', has('unplug') ? 'plug' : 'unplug')
  else if (key === 'outside') emit('act', 'outside')
  else if (key === 'mask') emit('act', 'mask')
  else if (key === 'panel') emit('act', has('open') ? 'close' : 'open')
  else if (key === 'power') switchOn()
  else if (key === 'hand') tool.value = tool.value === 'hand' ? null : 'hand'
  else if (key === 'can' || key === 'electric') {
    if (!has('blower')) {
      if (props.step?.action === 'blower' && props.step.data?.ask) asking.value = key
      else {
        pickBlower(key)
        emit('act', 'blower')
        if (key === 'electric') tell('Now plug the blower into the wall socket and switch it on.')
      }
    } else if (tool.value === key) tool.value = null
    else pickBlower(key)
  } else if (key === 'bplug') {
    elecPlugged.value = !elecPlugged.value
    if (!elecPlugged.value) elecOn.value = false
    tell(elecPlugged.value ? 'The blower is plugged into the wall socket - the computer stays unplugged.' : 'Blower unplugged.')
  } else if (key === 'bswitch') {
    if (!elecPlugged.value) tell('Plug the blower in first.')
    else {
      elecOn.value = !elecOn.value
      tell(elecOn.value ? 'The blower is running.' : 'Blower switched off.')
    }
  }
}
function answer(ok: boolean, why?: string) {
  const kind = asking.value
  asking.value = null
  if (!kind) return
  if (ok) {
    pickBlower(kind)
    emit('act', 'blower')
    if (kind === 'electric') tell('Now plug the blower into the wall socket and switch it on.')
  } else emit('mistake', why || 'Not the safe way - try again.')
}

// ---------------------------------------------------------------- pointer: blowing and holding
const hoverName = ref('')
const hoverAt = ref({ x: 0, y: 0 })
let blowing: Dust | null = null
let blowFor = 0
let warnedLong = false
const aim = new THREE.Vector3()
let pointer: PointerEvent | null = null
const zones = () => [...dust.values()].filter(d => d.level > 0).map(d => d.zone)
const dustOf = (zone: THREE.Object3D) => [...dust.values()].find(d => d.zone === zone) || null
const fanParts = () => (['cooler', 'gpu', 'casefan'] as PcPartKey[]).filter(k => dust.has(k)).map(k => rig!.parts[k])

function onDown(ev: PointerEvent) {
  const w = wb.value
  if (!w || !rig) return
  pointer = ev
  if (tool.value === 'hand') {
    const hit = w.pick(ev, fanParts())
    if (hit) {
      w.controls.enabled = false
      emit('act', 'hold:' + hit.userData.part)
    }
    return
  }
  if (!isBlower(tool.value)) return
  const hit = w.pick(ev, zones())
  const d = hit ? dustOf(hit) : null
  if (!d) return
  w.controls.enabled = false
  if (props.step?.action !== 'clean:' + d.key) {
    // the runner says why not now (e.g. "hold the fan still first")
    emit('act', 'clean:' + d.key)
    return
  }
  if (!panelOff.value && d.key !== 'psu') {
    emit('mistake', 'Take the side panel off first - you cannot reach the dust through the glass.')
    return
  }
  if (tool.value === 'electric' && !(elecPlugged.value && elecOn.value)) {
    tell(elecPlugged.value ? 'The blower is off - switch it on first.' : 'The blower is not plugged in - plug it into the wall socket and switch it on.')
    w.controls.enabled = true
    return
  }
  blowing = d
  blowFor = 0
  warnedLong = false
}
function onMove(ev: PointerEvent) {
  const w = wb.value
  if (!w) return
  pointer = ev
  const r = w.canvas.getBoundingClientRect()
  hoverAt.value = { x: ev.clientX - r.left, y: ev.clientY - r.top }
  if (blowing) return
  const hit = tool.value === 'hand' ? w.pick(ev, fanParts()) : w.pick(ev, zones())
  if (!hit) {
    hoverName.value = ''
    return
  }
  hoverName.value = tool.value === 'hand' ? `Hold the ${({ cooler: 'CPU cooler', gpu: 'graphics card', casefan: 'case fan' } as Record<string, string>)[hit.userData.part]} fan` : `Dusty ${dustOf(hit)?.name}`
}
function onUp() {
  if (wb.value) wb.value.controls.enabled = true
  blowing = null
}

// ---------------------------------------------------------------- every frame
const spinFans = () => powered.value || (!has('unplug'))
function frame(dt: number) {
  const w = wb.value
  const r = rig
  if (!w || !r) return
  // fans: turning while the computer runs; spun by the air while being blown (unless held)
  for (const s of r.spinners) {
    const held = has('hold:' + s.group) && !has('clean:' + s.group)
    const blown = blowing?.key === s.group && !held
    if (spinFans() || blown) s.obj.rotation[s.axis] += dt * s.speed * (blown ? 3 : 1)
  }
  // blowing: the can follows the pointer, dust comes off in puffs
  if (blowing && pointer) {
    const hit = w.pick(pointer, [blowing.zone])
    const ray = new THREE.Vector3()
    w.camera.getWorldDirection(ray)
    aim.copy(hit ? hit.position : blowing.zone.position)
    if (hit) {
      const rc = new THREE.Raycaster()
      const rect = w.canvas.getBoundingClientRect()
      rc.setFromCamera(new THREE.Vector2(((pointer.clientX - rect.left) / rect.width) * 2 - 1, -((pointer.clientY - rect.top) / rect.height) * 2 + 1), w.camera)
      const hits = rc.intersectObject(blowing.zone)
      if (hits[0]) aim.copy(hits[0].point)
    }
    // the can stands off to the side and below, its straw aimed at the dust - never hiding it
    const right = new THREE.Vector3().crossVectors(ray, new THREE.Vector3(0, 1, 0)).normalize()
    if (tool.value === 'electric') {
      // the electric blower points its nozzle straight at the dust, from a hand's length away
      elecBlower.position.copy(aim).addScaledVector(ray, -0.12).addScaledVector(right, 0.17).add(new THREE.Vector3(0, 0.05, 0))
      elecBlower.lookAt(aim)
    } else {
      blowerCan.position.copy(aim).addScaledVector(ray, -0.06).addScaledVector(right, 0.1).add(new THREE.Vector3(0, -0.15, 0))
      blowerCan.lookAt(aim.x, blowerCan.position.y, aim.z)
      blowerCan.rotateY(-Math.PI / 2)
    }
    spawnPuffs(aim, ray, dt)
    // an electric blower moves more air than a can
    blowing.level = Math.max(0, blowing.level - dt * (tool.value === 'electric' ? 0.62 : 0.42))
    showDust(blowing)
    updateDustLeft()
    blowFor += dt
    if (props.level === 'advanced' && tool.value === 'can' && blowFor > 3.5 && !warnedLong) {
      warnedLong = true
      emit('mistake', 'Short bursts only - a long blast makes the can freezing cold and can spray liquid onto the parts.')
      onUp()
      return
    }
    if (blowing.level <= 0) {
      const done = blowing
      onUp()
      emit('act', 'clean:' + done.key)
    }
  }
  if (blowerCan && (!blowing || tool.value !== 'can')) {
    // back on the desk when not in use
    blowerCan.position.lerp(new THREE.Vector3(0.3, 0, 0.2), 1 - Math.exp(-dt * 6))
    blowerCan.quaternion.slerp(new THREE.Quaternion(), 1 - Math.exp(-dt * 6))
  }
  if (elecBlower) {
    if (!blowing || tool.value !== 'electric') {
      elecBlower.position.lerp(ELEC_REST.pos, 1 - Math.exp(-dt * 6))
      elecBlower.quaternion.slerp(ELEC_REST.quat, 1 - Math.exp(-dt * 6))
    }
    // its motor: the intake fan turns and the body hums while it runs
    if (elecOn.value) {
      elecFan.rotation.x += dt * 40
      elecBody.position.x = Math.sin(performance.now() / 18) * 0.0004
    }
    elecLed.emissive.setHex(elecOn.value ? 0x22c55e : elecPlugged.value ? 0xf59e0b : 0)
    elecLed.emissiveIntensity = elecPlugged.value ? 2 : 0
    updateElecCable()
  }
  updatePuffs(dt)
  // what the step wants, glowing
  const want = props.guide ? props.step?.action || '' : ''
  for (const k of ['cooler', 'gpu', 'casefan', 'psu'] as PcPartKey[]) setEmissive(r.parts[k], 0, 0)
  const m = /^(hold|clean):(\w+)$/.exec(want)
  if (m && m[2] !== 'floor' && m[2] !== 'ram') setEmissive(r.parts[m[2] as PcPartKey], 0xfacc15, 0.2 + 0.2 * Math.sin(performance.now() / 220))
}

// ---------------------------------------------------------------- the electric blower
// A hand-held electric blower: a motor body with a handle, a long nozzle, an intake fan at the back,
// a cable to a power strip on the desk. Its nozzle points along +z, so lookAt aims it.
let elecBlower: THREE.Group
let elecBody: THREE.Group
let elecFan: THREE.Group
let elecLed: THREE.MeshStandardMaterial
let elecCable: THREE.Mesh
let strip: THREE.Group
const ELEC_REST = { pos: new THREE.Vector3(0.02, 0.058, 0.2), quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -1.35, 0)) }
const STRIP_SOCKET = new THREE.Vector3(0.2, 0.022, 0.36)
const LOOSE_PLUG = new THREE.Vector3(0.14, 0.01, 0.32)
function buildElectricBlower() {
  const w = wb.value!
  elecBlower = new THREE.Group()
  elecBody = new THREE.Group()
  const blue = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.38, metalness: 0.05 })
  const black = new THREE.MeshStandardMaterial({ color: 0x1f2328, roughness: 0.55 })
  const grey = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })

  // the round "snail shell" fan housing, its flat sides facing left and right
  const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.052, 40), blue)
  housing.rotation.z = Math.PI / 2
  housing.position.set(0, 0, -0.03)
  elecBody.add(housing)
  // a rounded rim so it is not a hard-edged drum
  for (const x of [-0.026, 0.026]) {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.005, 10, 40), blue)
    rim.rotation.y = Math.PI / 2
    rim.position.set(x, 0, -0.03)
    elecBody.add(rim)
  }
  // the outlet leaving the top of the shell towards the front
  const outlet = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.034, 0.075, 28), blue)
  outlet.rotation.x = Math.PI / 2
  outlet.position.set(0, 0.024, 0.035)
  elecBody.add(outlet)
  // the long black nozzle, narrowing to the tip
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 28), black)
  collar.rotation.x = Math.PI / 2
  collar.position.set(0, 0.024, 0.08)
  elecBody.add(collar)
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.027, 0.2, 28), black)
  nozzle.rotation.x = Math.PI / 2
  nozzle.position.set(0, 0.024, 0.19)
  elecBody.add(nozzle)
  const tip = new THREE.Mesh(new THREE.TorusGeometry(0.013, 0.0025, 8, 24), black)
  tip.position.set(0, 0.024, 0.29)
  elecBody.add(tip)

  // the air intake on the side: a dark round grille, the fan turning behind it
  const intake = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.004, 28), grey)
  intake.rotation.z = Math.PI / 2
  intake.position.set(0.028, -0.004, -0.03)
  elecBody.add(intake)
  const intakeRing = new THREE.Mesh(new THREE.TorusGeometry(0.02, 0.003, 8, 28), blue)
  intakeRing.rotation.y = Math.PI / 2
  intakeRing.position.set(0.03, -0.004, -0.03)
  elecBody.add(intakeRing)
  elecFan = new THREE.Group()
  for (let i = 0; i < 6; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.002, 0.016, 0.005), new THREE.MeshStandardMaterial({ color: 0x64748b }))
    blade.position.set(0, Math.cos((i / 6) * Math.PI * 2) * 0.009, Math.sin((i / 6) * Math.PI * 2) * 0.009)
    blade.rotation.x = (i / 6) * Math.PI * 2
    elecFan.add(blade)
  }
  elecFan.position.set(0.031, -0.004, -0.03)
  elecBody.add(elecFan)
  for (let i = 0; i < 4; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.002, 0.038, 0.003), grey)
    bar.position.set(0.033, -0.004, -0.03)
    bar.rotation.x = (i / 4) * Math.PI
    elecBody.add(bar)
  }

  // the loop handle on top, with the trigger underneath it
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.011, 12, 30, Math.PI), blue)
  handle.rotation.y = Math.PI / 2
  handle.position.set(0, 0.045, -0.035)
  elecBody.add(handle)
  const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.016, 0.02), black)
  trigger.position.set(0, 0.062, 0.0)
  trigger.rotation.x = -0.4
  elecBody.add(trigger)
  // screws, and the speed switch
  for (const [y, z] of [[0.04, -0.07], [-0.045, -0.06], [-0.045, 0.0], [0.03, 0.01]]) {
    const screw = new THREE.Mesh(new THREE.SphereGeometry(0.003, 8, 8), black)
    screw.position.set(0.028, y, z)
    elecBody.add(screw)
  }
  elecLed = new THREE.MeshStandardMaterial({ color: 0x334155, emissive: 0x000000 })
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.0035, 10, 10), elecLed)
  led.position.set(0, 0.088, -0.035)
  elecBody.add(led)

  elecBody.traverse(o => { o.castShadow = true })
  elecBlower.add(elecBody)
  elecBlower.position.copy(ELEC_REST.pos)
  elecBlower.quaternion.copy(ELEC_REST.quat)
  w.scene.add(elecBlower)

  // a power strip on the desk - the wall socket for the blower
  strip = new THREE.Group()
  strip.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.03, 0.06), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 })))
  for (let i = 0; i < 4; i++) {
    const sock = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.002, 0.03), new THREE.MeshStandardMaterial({ color: 0x334155 }))
    sock.position.set(-0.07 + i * 0.045, 0.016, 0)
    strip.add(sock)
  }
  const sw = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.006, 0.02), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x7f1d1d }))
  sw.position.set(0.09, 0.017, 0)
  strip.add(sw)
  strip.position.set(0.27, 0.015, 0.36)
  strip.traverse(o => { o.castShadow = true })
  w.scene.add(strip)

  elecCable = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.6 }))
  elecCable.castShadow = true
  w.scene.add(elecCable)
}

// The blower's cable, from its tail to the power strip (or to its plug lying on the desk)
const lastTail = new THREE.Vector3(9, 9, 9)
let lastPlugged = false
function updateElecCable() {
  // the cable leaves the back of the handle
  const tail = elecBlower.localToWorld(new THREE.Vector3(0, 0.05, -0.08))
  if (tail.distanceTo(lastTail) < 0.001 && lastPlugged === elecPlugged.value) return
  lastTail.copy(tail)
  lastPlugged = elecPlugged.value
  const end = elecPlugged.value ? STRIP_SOCKET : LOOSE_PLUG
  const mid = tail.clone().lerp(end, 0.5)
  mid.y = 0.004
  const curve = new THREE.CatmullRomCurve3([tail, tail.clone().add(new THREE.Vector3(0, -0.04, 0)), mid, end.clone().add(new THREE.Vector3(-0.03, 0, 0)), end])
  elecCable.geometry.dispose()
  elecCable.geometry = new THREE.TubeGeometry(curve, 40, 0.003, 8, false)
}

// ---------------------------------------------------------------- dust puffs
const PUFFS = 400
let puffGeo: THREE.BufferGeometry
const puffVel: THREE.Vector3[] = []
const puffLife = new Float32Array(PUFFS)
let puffNext = 0
function setUpPuffs() {
  puffGeo = new THREE.BufferGeometry()
  puffGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PUFFS * 3), 3))
  for (let i = 0; i < PUFFS; i++) {
    puffVel.push(new THREE.Vector3())
    puffLife[i] = 0
  }
  const pts = new THREE.Points(puffGeo, new THREE.PointsMaterial({ color: 0x9ca3af, size: 0.006, transparent: true, opacity: 0.8, depthWrite: false }))
  pts.frustumCulled = false
  wb.value!.scene.add(pts)
}
function spawnPuffs(at: THREE.Vector3, ray: THREE.Vector3, dt: number) {
  const pos = puffGeo.getAttribute('position') as THREE.BufferAttribute
  const n = Math.ceil(dt * 160)
  for (let j = 0; j < n; j++) {
    const i = puffNext
    puffNext = (puffNext + 1) % PUFFS
    pos.setXYZ(i, at.x + (Math.random() - 0.5) * 0.02, at.y + (Math.random() - 0.5) * 0.02, at.z + (Math.random() - 0.5) * 0.02)
    // the air pushes the dust on, away from the can, spreading out and drifting up
    puffVel[i].copy(ray).multiplyScalar(-0.15).add(new THREE.Vector3((Math.random() - 0.5) * 0.4, 0.15 + Math.random() * 0.25, (Math.random() - 0.2) * 0.4))
    puffLife[i] = 1.2
  }
  pos.needsUpdate = true
}
function updatePuffs(dt: number) {
  if (!puffGeo) return
  const pos = puffGeo.getAttribute('position') as THREE.BufferAttribute
  let any = false
  for (let i = 0; i < PUFFS; i++) {
    if (puffLife[i] <= 0) continue
    any = true
    puffLife[i] -= dt
    puffVel[i].multiplyScalar(1 - dt * 1.5)
    puffVel[i].y -= dt * 0.05
    pos.setXYZ(i, pos.getX(i) + puffVel[i].x * dt, pos.getY(i) + puffVel[i].y * dt, pos.getZ(i) + puffVel[i].z * dt)
    if (puffLife[i] <= 0) pos.setXYZ(i, 0, -5, 0)
  }
  if (any) pos.needsUpdate = true
}

// ---------------------------------------------------------------- switching on
const booting = ref(false)
let bootTimer: ReturnType<typeof setTimeout> | null = null
function switchOn() {
  if (props.step?.action !== 'power') {
    emit('act', 'power')
    return
  }
  booting.value = true
  if (rig) {
    rig.powerLed.emissive.setHex(0x22c55e)
    rig.powerLed.emissiveIntensity = 2
  }
  bootTimer = setTimeout(() => {
    booting.value = false
    emit('act', 'power')
  }, 900)
}
</script>

<style scoped>
.ict-glow-btn {
  box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.55);
  animation: ict-glow-btn 1.4s ease-in-out infinite;
}
@keyframes ict-glow-btn {
  50% { box-shadow: 0 0 0 5px rgba(250, 204, 21, 0.25); }
}
@media (prefers-reduced-motion: reduce) {
  .ict-glow-btn { animation: none; }
}
.note-fade-enter-active, .note-fade-leave-active { transition: opacity 0.25s ease; }
.note-fade-enter-from, .note-fade-leave-to { opacity: 0; }
</style>
