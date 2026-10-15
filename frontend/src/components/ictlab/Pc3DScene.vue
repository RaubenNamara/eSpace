<template>
  <!-- The ICT Lab's computer in 3D, on a desk you can walk round: drag to turn, pinch or wheel to
       zoom. In `parts` mode every part can be tapped. In `assembly` mode the parts lie on the desk:
       drag one into the case (or tap it, then tap where it goes), tap connectors to run cables,
       and use the tools. Everything reports an action to the step runner; what is drawn follows
       the actions it accepted. No WebGL on the device: the flat drawings instead. -->
  <div class="w-full">
    <template v-if="!unsupported">
      <div class="relative w-full h-[52vh] min-h-[320px] lg:h-[60vh] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
        <div ref="host" class="absolute inset-0" :class="cursor"></div>

        <!-- Safety state (assembly) -->
        <div v-if="mode === 'assembly'" class="absolute top-2 left-2 flex flex-wrap gap-1.5 text-[11px] font-semibold pointer-events-none">
          <span class="px-2 py-0.5 rounded-full shadow-sm" :class="powered ? 'bg-emerald-600 text-white' : pluggedIn && socketOn ? 'bg-rose-600 text-white' : pluggedIn ? 'bg-amber-500 text-white' : 'bg-white/90 text-gray-700'">
            {{ powered ? 'Switched on' : !pluggedIn ? 'Unplugged' : socketOn ? 'Plugged in · socket on' : 'Plugged in · socket off' }}
          </span>
          <span class="px-2 py-0.5 rounded-full shadow-sm" :class="has('strap') ? 'bg-emerald-600 text-white' : 'bg-white/90 text-gray-700'">
            Wrist strap: {{ has('strap') ? 'on' : 'off' }}
          </span>
        </div>

        <!-- What is under the pointer -->
        <div v-if="hoverName" class="absolute pointer-events-none px-2 py-1 rounded-lg bg-gray-900/85 text-white text-xs font-semibold whitespace-nowrap -translate-x-1/2 -translate-y-full" :style="{ left: `${hoverAt.x}px`, top: `${hoverAt.y - 12}px` }">
          {{ hoverName }}
        </div>

        <!-- One part on its own, with what it does (Parts of a computer) -->
        <Transition name="spot">
          <div v-if="spot" class="absolute inset-x-2 bottom-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[26rem] rounded-2xl bg-white/95 dark:bg-gray-900/95 shadow-xl p-3.5 z-10">
            <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ spot.phase === 'meet' ? 'Meet the part' : 'You found it' }}</p>
            <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ spotPart?.name }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-200 mt-1"><span class="font-semibold">Its job:</span> {{ spotPart?.does }}</p>
            <div class="mt-2.5 flex justify-end">
              <button type="button" class="btn-primary !py-1.5 !text-sm" @click="closeSpot">{{ spot.phase === 'meet' ? 'Now find it in the computer' : 'Continue' }}</button>
            </div>
          </div>
        </Transition>

        <div v-if="!spot" class="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
          <span class="px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">
            {{ mode === 'assembly' ? 'Drag a part into the case · drag the desk to turn' : 'Tap a part · drag to turn · pinch to zoom' }}
          </span>
          <button type="button" class="pointer-events-auto px-2 py-1 rounded-lg bg-white/90 text-gray-800 text-[11px] font-semibold shadow-sm hover:bg-white" @click="wb?.resetView()">Reset view</button>
        </div>
      </div>

      <!-- Parts mode: what the last part tapped is -->
      <div v-if="mode === 'parts'" class="mt-3 min-h-[5.5rem] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
        <template v-if="info">
          <p class="text-sm font-bold text-gray-900 dark:text-white">{{ info.name }}</p>
          <p class="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{{ info.does }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><span class="font-semibold">When it fails:</span> {{ info.fails }}</p>
        </template>
        <p v-else class="text-xs text-gray-500 dark:text-gray-400">Tap any part to see what it is and what it does. The CPU cooler has been lifted off and put on the desk, so you can see the processor.</p>
      </div>

      <template v-else>
        <!-- Parts still on the desk (a tap picks one up, same as tapping it on the desk) -->
        <div v-if="deskParts.length && !has('close')" class="mt-3 flex flex-wrap items-center gap-1.5">
          <span class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1">{{ selected ? `Now tap where the ${nameOf(selected).toLowerCase()} goes.` : 'On the desk:' }}</span>
          <button
            v-for="p in deskParts"
            :key="p.key"
            type="button"
            class="px-2.5 py-1 rounded-lg border text-xs font-semibold"
            :class="selected === p.key ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-100' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'"
            @click="select(selected === p.key ? null : p.key)"
          >{{ p.name }}</button>
        </div>
        <p v-if="note" class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{{ note }}</p>

        <div v-if="asking" class="mt-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 p-3">
          <p class="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-2">{{ QUESTIONS[asking].q }}</p>
          <div class="flex flex-col sm:flex-row gap-2">
            <button v-for="(o, i) in QUESTIONS[asking].options" :key="i" type="button" class="btn-secondary !py-1.5 !text-sm text-left" @click="answer(o)">{{ o.text }}</button>
          </div>
        </div>

        <div v-if="booting || powered" class="mt-3 rounded-xl bg-black p-3 font-mono text-[11px] leading-relaxed text-emerald-300 min-h-[7rem]">
          <p v-for="(line, i) in BOOT.slice(0, bootShown)" :key="i">{{ line }}</p>
        </div>

        <div class="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          <button
            v-for="t in TOOLS"
            :key="t.key"
            type="button"
            class="flex flex-col items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 text-[11px] font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-400"
            :class="glowTool === t.key ? 'ict-glow-btn' : ''"
            @click="useTool(t.key)"
          >
            <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path :d="t.icon" /></svg>
            <span class="text-center leading-tight">{{ t.label }}</span>
          </button>
        </div>
      </template>
    </template>

    <!-- No 3D on this device -->
    <template v-else>
      <PartsScene v-if="mode === 'parts'" :step="step" :guide="guide" :done="done" :hide-names="level === 'advanced'" @act="(a, w) => emit('act', a, w)" />
      <AssemblyScene v-else :step="step" :guide="guide" :done="done" :level="level" @act="(a, w) => emit('act', a, w)" @mistake="m => emit('mistake', m)" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import * as THREE from 'three'
import PartsScene from './PartsScene.vue'
import AssemblyScene from './AssemblyScene.vue'
import { createWorkbench, type Workbench } from './three/workbench'
import { buildPowerKit, attachPlugDragging, type PowerKit } from './three/power'
import { buildPc, setEmissive, tagSprite, fadeExcept, type PcRig, type PcPartKey, type ConnectorKey } from './three/pcModel'
import { PC_PARTS, ASSEMBLY_PARTS, type IctStep, type PcPart } from './activities'

const props = defineProps<{
  mode: 'parts' | 'assembly'
  step: IctStep | null
  guide: boolean
  // Actions accepted so far (assembly: including the level's preset ones)
  done: string[]
  level: string
}>()
const emit = defineEmits<{ act: [action: string, wrongMessage?: string]; mistake: [message: string] }>()

const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
let rig: PcRig | null = null
// Assembly: the wall socket behind the bench and the computer's plug
let power: PowerKit | null = null
let plugDrag: { busy: () => boolean } | null = null

const has = (a: string) => props.done.includes(a)
const placed = (k: string) => has('place:' + k)
const nameOf = (k: string) => ASSEMBLY_PARTS.find(p => p.key === k)?.name || PC_PARTS[k]?.name || k
const pluggedIn = computed(() => !has('unplug') || has('plug'))
// The wall socket's switch: on at the start, off before unplugging, on again after plugging in
const socketOn = computed(() => !has('socket-off') || has('socket-on'))
const powered = computed(() => has('power'))

// ---------------------------------------------------------------- setting up
const COOLER_ASIDE = { pos: new THREE.Vector3(-0.1, 0, 0.22), quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0.3)) }
const ASM_KEYS = ASSEMBLY_PARTS.map(p => p.key) as PcPartKey[]
const ON_BOARD = new Set(['cpu', 'cooler', 'ram', 'gpu'])

// Pickable objects and what they are
const pickables: THREE.Object3D[] = []
const keyOf = new Map<THREE.Object3D, string>()
const ghosts = new Map<string, THREE.Mesh>()
const ticks = new Map<string, THREE.Sprite>()

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  try {
    // A phone's tall, narrow view needs the camera further back to fit the case (and the desk)
    const narrow = host.value.clientWidth < 640
    wb.value = props.mode === 'parts'
      ? createWorkbench(host.value, { cameraPosition: narrow ? [0.32, 0.55, 1.2] : [0.22, 0.42, 0.78], target: [0, 0.2, 0], minDistance: 0.3, maxDistance: 1.8 })
      : createWorkbench(host.value, { cameraPosition: narrow ? [0.42, 0.95, 1.75] : [0.32, 0.62, 1.12], target: narrow ? [0.15, 0.12, 0.04] : [0.17, 0.14, 0.05], minDistance: 0.35, maxDistance: 2.4 })
  } catch (err) {
    console.error('ICT Lab: no WebGL', err)
    unsupported.value = true
    return
  }
  const w = wb.value
  rig = buildPc()
  w.scene.add(rig.shell)
  for (const k of Object.keys(rig.parts) as PcPartKey[]) w.scene.add(rig.parts[k])
  for (const [k, c] of Object.entries(rig.cables)) if (props.mode === 'parts' || (k !== 'mainsIn' && k !== 'mainsOut')) w.scene.add(c)
  w.scene.add(rig.sidePanel, rig.strapCoil, rig.pasteTube, rig.pasteDot)

  if (props.mode === 'parts') {
    setUpParts()
    const first = props.step?.data?.target as string | undefined
    if (props.level === 'simple' && first && !has('tap:' + first)) setTimeout(() => openSpot(first, 'meet'), 400)
  } else setUpAssembly()

  // Fans turn when there is power (parts mode: always, it is a running computer)
  w.onFrame(dt => {
    const spin = props.mode === 'parts' || powered.value || booting.value
    if (spin && rig) for (const s of rig.spinners) s.obj.rotation[s.axis] += dt * s.speed
    pulse(dt)
    power?.update()
    frameCamera(dt)
  })

  const c = w.canvas
  c.addEventListener('pointerdown', onDown)
  c.addEventListener('pointermove', onMove)
  c.addEventListener('pointerup', onUp)
  c.addEventListener('pointerleave', onLeave)
})

onBeforeUnmount(() => {
  if (bootTimer) clearInterval(bootTimer)
  wb.value?.dispose()
})

function addPickable(obj: THREE.Object3D, key: string) {
  pickables.push(obj)
  keyOf.set(obj, key)
}

// ---------------------------------------------------------------- parts mode
function setUpParts() {
  const r = rig!
  r.parts.cooler.position.copy(COOLER_ASIDE.pos)
  r.parts.cooler.quaternion.copy(COOLER_ASIDE.quat)
  r.sidePanel.visible = false
  r.cables.cpu_fan.visible = false
  r.cables.mainsOut.visible = false
  r.mainsPlug.visible = false
  r.cables.strap.visible = false
  r.pasteDot.visible = false
  r.pasteTube.visible = false
  r.strapCoil.visible = false
  r.cables.fpanel.visible = true
  for (const k of ['psu', 'motherboard', 'cpu', 'cooler', 'ram', 'gpu', 'hdd', 'ssd', 'optical', 'casefan'] as PcPartKey[]) addPickable(r.parts[k], k)
  addPickable(r.cmos, 'cmos')
  addPickable(r.ports, 'ports')
  addPickable(r.cables.sata, 'sata')
  syncTicks()
}

// A green tick over each part found
function syncTicks() {
  if (!rig || props.mode !== 'parts') return
  const found = new Set(props.done.filter(a => a.startsWith('tap:')).map(a => a.slice(4)))
  for (const k of found) {
    if (ticks.has(k)) continue
    const obj = pickables.find(o => keyOf.get(o) === k)
    if (!obj) continue
    const b = new THREE.Box3().setFromObject(obj)
    const s = tagSprite('✓', '#34d399')
    s.scale.set(0.04, 0.01, 1)
    s.position.set((b.min.x + b.max.x) / 2, b.max.y + 0.012, b.max.z + 0.01)
    wb.value!.scene.add(s)
    ticks.set(k, s)
  }
}

const lastTapped = ref<string | null>(null)
const info = computed<PcPart | null>(() => (lastTapped.value ? PC_PARTS[lastTapped.value] : null))

// ---------------------------------------------------------------- one part on its own
// Everything else fades away and the camera moves in, with the part's job beside it: at Simple
// before each part is looked for ("meet it, now find it"), at the other levels once it is found
// (showing it first would give the answer away).
const spot = ref<{ key: string; phase: 'meet' | 'found' } | null>(null)
const spotPart = computed<PcPart | null>(() => (spot.value ? PC_PARTS[spot.value.key] : null))
let camGoal: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null
let camBack: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null
const fadeRoots = () => (rig ? [rig.shell, ...Object.values(rig.parts), ...Object.values(rig.cables)] : [])

function openSpot(key: string, phase: 'meet' | 'found') {
  const w = wb.value
  const obj = pickables.find(o => keyOf.get(o) === key)
  if (!w || !obj) return
  if (!spot.value) camBack = { pos: w.camera.position.clone(), target: w.controls.target.clone() }
  spot.value = { key, phase }
  fadeExcept(fadeRoots(), obj)
  const box = new THREE.Box3().setFromObject(obj)
  const centre = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3()).length()
  const dir = w.camera.position.clone().sub(w.controls.target).normalize()
  // aim a little below the part, so it sits in the top half - clear of the card over the bottom
  const target = centre.clone().add(new THREE.Vector3(0, -Math.max(0.05, size * 0.45), 0))
  camGoal = { pos: target.clone().addScaledVector(dir, Math.max(0.22, size * 2.4)), target }
}
function closeSpot() {
  spot.value = null
  fadeExcept(fadeRoots(), null)
  if (camBack) camGoal = camBack
  camBack = null
}
function frameCamera(dt: number) {
  const w = wb.value
  if (!w || !camGoal) return
  const k = 1 - Math.exp(-dt * 4)
  w.camera.position.lerp(camGoal.pos, k)
  w.controls.target.lerp(camGoal.target, k)
  if (w.camera.position.distanceTo(camGoal.pos) < 0.002) camGoal = null
}
// Simple: meet each part before looking for it
watch(() => props.step?.key, () => {
  if (props.mode !== 'parts' || props.level !== 'simple') return
  const target = props.step?.data?.target as string | undefined
  if (target && !has('tap:' + target)) openSpot(target, 'meet')
})

// ---------------------------------------------------------------- assembly mode
function setUpAssembly() {
  const r = rig!
  r.parts.ssd.visible = false
  for (const k of ASM_KEYS) addPickable(r.parts[k], k)
  for (const k of Object.keys(r.connectors) as ConnectorKey[]) {
    addPickable(r.connectors[k], 'connect:' + k)
    // its label can be tapped too
    addPickable(r.connectorLabels[k], 'connect:' + k)
  }
  // the wall socket: its switch can be tapped, the plug dragged in and out
  const w = wb.value!
  power = buildPowerKit(w, {
    socketX: 0.46,
    plugs: [{ deviceEnd: () => new THREE.Vector3(0.214, 0.412, 0.03), rest: new THREE.Vector3(0.38, 0.013, -0.27), startIn: pluggedIn.value ? 0 : null }],
    switchesOn: [socketOn.value, false]
  })
  addPickable(power.outlets[0].rocker, 'tool:wall')
  addPickable(power.plugs[0].group, 'tool:mains')
  plugDrag = attachPlugDragging(w, power, (_i, outlet) => plugTo(outlet === 0), () => plugTo(!pluggedIn.value))
  addPickable(r.powerButton, 'tool:power')
  addPickable(r.sidePanel, 'tool:panel')
  addPickable(r.strapCoil, 'tool:strap')
  addPickable(r.pasteTube, 'tool:paste')

  // A see-through outline of each part where it goes
  for (const k of ASM_KEYS) {
    const part = r.parts[k]
    const saved = { p: part.position.clone(), q: part.quaternion.clone() }
    part.position.set(0, 0, 0)
    part.quaternion.identity()
    part.updateMatrixWorld(true)
    const b = new THREE.Box3().setFromObject(part)
    part.position.copy(saved.p)
    part.quaternion.copy(saved.q)
    const size = b.getSize(new THREE.Vector3())
    const center = b.getCenter(new THREE.Vector3())
    const ghost = new THREE.Mesh(
      new THREE.BoxGeometry(size.x + 0.004, size.y + 0.004, size.z + 0.004),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.16, depthWrite: false })
    )
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(ghost.geometry), new THREE.LineBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0.9 }))
    ghost.add(edges)
    ghost.position.copy(r.anchors[k].pos).add(center)
    ghost.visible = false
    wb.value!.scene.add(ghost)
    ghosts.set(k, ghost)
    addPickable(ghost, 'ghost:' + k)
  }
  sync(false)
}

// Everything drawn from the accepted actions
function sync(animate: boolean) {
  const r = rig
  const w = wb.value
  if (!r || !w || props.mode !== 'assembly') return
  for (const k of ASM_KEYS) {
    const part = r.parts[k]
    const target = placed(k) ? r.anchors[k] : r.desk[k]
    if (!target) continue
    if (dragging.value === k || selected.value === k) continue
    if (part.position.distanceTo(target.pos) < 1e-4) continue
    if (animate) w.moveTo(part, target.pos, target.quat, 700, placed(k) ? 0.06 : 0.03)
    else {
      part.position.copy(target.pos)
      part.quaternion.copy(target.quat)
    }
  }
  r.cables.sata.visible = has('connect:sata')
  r.cables.atx24.visible = has('connect:atx24')
  r.cables.cpu_fan.visible = has('connect:cpu_fan')
  r.cables.fpanel.visible = has('connect:fpanel')
  r.cables.strap.visible = has('strap')
  if (power) {
    if (power.outlets[0].on !== socketOn.value) power.setSwitch(0, socketOn.value, animate)
    const at = pluggedIn.value ? 0 : null
    if (power.plugs[0].inOutlet !== at && !plugDrag?.busy()) power.setPlug(0, at, animate)
  }
  r.pasteDot.visible = has('paste') && placed('cpu')
  r.powerLed.emissive.setHex(powered.value ? 0x22c55e : 0x000000)
  r.powerLed.emissiveIntensity = powered.value ? 2 : 0
  const panel = has('close') ? r.sidePanelClosed : r.sidePanelOpen
  if (animate) w.moveTo(r.sidePanel, panel.pos, panel.quat, 900, has('close') ? 0.12 : 0)
  else {
    r.sidePanel.position.copy(panel.pos)
    r.sidePanel.quaternion.copy(panel.quat)
  }
  // Connector labels once their part of the board is in
  const board = placed('motherboard')
  r.connectorLabels.cpu_fan.visible = board && placed('cooler') && !has('close')
  r.connectorLabels.atx24.visible = board && !has('close')
  r.connectorLabels.sata.visible = board && !has('close')
  r.connectorLabels.fpanel.visible = board && props.level === 'advanced' && !has('close')
  r.connectors.fpanel.visible = props.level === 'advanced'
  syncGhosts()
}
watch(() => props.done.join('|'), (now, before) => {
  if (props.mode === 'assembly') {
    sync(true)
    return
  }
  syncTicks()
  if (props.level === 'simple') return
  const had = new Set((before || '').split('|'))
  const found = now.split('|').find(a => a.startsWith('tap:') && !had.has(a))
  if (found) openSpot(found.slice(4), 'found')
})

// Where parts go: always at Simple; otherwise while a part is being moved
function syncGhosts() {
  if (!rig) return
  const moving = selected.value || dragging.value
  for (const [k, g] of ghosts) {
    const free = !placed(k) && (!ON_BOARD.has(k) || placed('motherboard')) && !has('close')
    g.visible = free && (props.guide || !!moving)
  }
}

// ---------------------------------------------------------------- glow and hover
const hoverKey = ref<string | null>(null)
const hoverAt = ref({ x: 0, y: 0 })
const hoverName = computed(() => {
  const k = hoverKey.value
  if (!k || dragging.value) return ''
  if (k.startsWith('ghost:')) return `Place for the ${nameOf(k.slice(6)).toLowerCase()}`
  if (k.startsWith('connect:')) return ({ cpu_fan: 'CPU_FAN connector', atx24: '24-pin power connector', sata: 'SATA port', fpanel: 'Front panel pins' } as Record<string, string>)[k.slice(8)]
  if (k.startsWith('tool:')) return ({ wall: 'Wall socket switch', mains: 'Mains plug (drag it)', power: 'Power button', panel: 'Side panel', strap: 'Anti-static wrist strap', paste: 'Thermal paste' } as Record<string, string>)[k.slice(5)]
  // Parts mode at Advanced: no names until found
  if (props.mode === 'parts' && props.level !== 'simple' && !has('tap:' + k)) return ''
  return nameOf(k)
})
const cursor = computed(() => (dragging.value ? 'cursor-grabbing' : hoverKey.value ? 'cursor-pointer' : 'cursor-grab'))

// The object a step wants, lit up at Simple
const glowKey = computed(() => {
  if (!props.guide || !props.step) return null
  const a = props.step.action
  if (a.startsWith('tap:')) return a.slice(4)
  if (a.startsWith('place:')) return selected.value === a.slice(6) ? 'ghost:' + a.slice(6) : a.slice(6)
  if (a.startsWith('connect:')) return a
  return ({ 'socket-off': 'tool:wall', 'socket-on': 'tool:wall', unplug: 'tool:mains', plug: 'tool:mains', strap: 'tool:strap', paste: 'tool:paste', close: 'tool:panel', power: 'tool:power' } as Record<string, string>)[a] || null
})
const glowTool = computed(() => (glowKey.value?.startsWith('tool:') ? glowKey.value.slice(5) : null))

let t = 0
let lit: THREE.Object3D[] = []
function pulse(dt: number) {
  t += dt
  for (const o of lit) setEmissive(o, 0, 0)
  lit = []
  const objOf = (k: string) => pickables.find(o => keyOf.get(o) === k)
  const glow = glowKey.value ? objOf(glowKey.value) : null
  if (glow && !glow.name.startsWith('ghost')) {
    setEmissive(glow, 0xfacc15, 0.25 + 0.25 * Math.sin(t * 4))
    lit.push(glow)
  }
  const hov = hoverKey.value ? objOf(hoverKey.value) : null
  if (hov && hov !== glow) {
    setEmissive(hov, 0x60a5fa, 0.35)
    lit.push(hov)
  }
  const sel = selected.value ? rig?.parts[selected.value as PcPartKey] : null
  if (sel) {
    setEmissive(sel, 0x818cf8, 0.35)
    lit.push(sel)
  }
  // a breathing ghost for the place the step wants
  for (const [k, g] of ghosts) {
    const m = g.material as THREE.MeshBasicMaterial
    m.opacity = glowKey.value === 'ghost:' + k || nearGhost.value === k ? 0.22 + 0.14 * Math.sin(t * 5) : 0.13
  }
}

// ---------------------------------------------------------------- pointer
const selected = ref<string | null>(null)
const dragging = ref<string | null>(null)
const nearGhost = ref<string | null>(null)
const note = ref('')
let downAt: { x: number; y: number; key: string | null } | null = null
const dragPlane = new THREE.Plane()
const tmp = new THREE.Vector3()

const deskParts = computed(() => (props.mode === 'assembly' ? ASSEMBLY_PARTS.filter(p => !placed(p.key)) : []))

// What is under the pointer. The wall switch is small and the see-through outlines can lie in
// front of it, so a direct hit on it wins.
function pickAt(ev: PointerEvent) {
  const w = wb.value!
  return (power && w.pick(ev, [power.outlets[0].rocker])) || w.pick(ev, pickables)
}

function onDown(ev: PointerEvent) {
  const w = wb.value
  if (!w) return
  const hit = pickAt(ev)
  let key = hit ? keyOf.get(hit) || null : null
  // the board's connectors while it still lies on the desk: that is grabbing the board
  if (key?.startsWith('connect:') && props.mode === 'assembly' && !placed('motherboard')) key = 'motherboard'
  downAt = { x: ev.clientX, y: ev.clientY, key }
  // Grabbing a part on the desk: the camera holds still while it is dragged
  if (props.mode === 'assembly' && key && ASM_KEYS.includes(key as PcPartKey) && !placed(key) && !has('close')) {
    w.controls.enabled = false
    const part = rig!.parts[key as PcPartKey]
    w.camera.getWorldDirection(tmp)
    dragPlane.setFromNormalAndCoplanarPoint(tmp.clone().negate(), part.position.clone().add(new THREE.Vector3(0, 0.06, 0)))
  }
}

function onMove(ev: PointerEvent) {
  const w = wb.value
  if (!w) return
  const r = w.canvas.getBoundingClientRect()
  hoverAt.value = { x: ev.clientX - r.left, y: ev.clientY - r.top }
  if (downAt?.key && !w.controls.enabled) {
    const moved = Math.hypot(ev.clientX - downAt.x, ev.clientY - downAt.y)
    if (!dragging.value && moved > 6) {
      dragging.value = downAt.key
      selected.value = null
      syncGhosts()
    }
    if (dragging.value) {
      const part = rig!.parts[dragging.value as PcPartKey]
      if (w.pointOnPlane(ev, dragPlane, tmp)) part.position.copy(tmp)
      nearGhost.value = ghostNear(ev.clientX - r.left, ev.clientY - r.top)
      return
    }
  }
  const hit = pickAt(ev)
  hoverKey.value = hit ? keyOf.get(hit) || null : null
}

function onUp(ev: PointerEvent) {
  const w = wb.value
  if (!w) return
  w.controls.enabled = true
  const start = downAt
  downAt = null
  if (dragging.value) {
    const part = dragging.value
    const r = w.canvas.getBoundingClientRect()
    const zone = ghostNear(ev.clientX - r.left, ev.clientY - r.top)
    dragging.value = null
    nearGhost.value = null
    if (zone) dropOn(part, zone)
    else returnToDesk(part)
    syncGhosts()
    return
  }
  if (!start || Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 6) return
  tap(start.key)
}

function onLeave() {
  hoverKey.value = null
}

// The outline nearest the pointer, if it is close enough to drop on
function ghostNear(x: number, y: number): string | null {
  const w = wb.value
  if (!w) return null
  let best: string | null = null
  let bestD = 80
  for (const [k, g] of ghosts) {
    if (!g.visible && !(dragging.value || selected.value)) continue
    if (placed(k) || (ON_BOARD.has(k) && !placed('motherboard'))) continue
    const s = w.toScreen(g.getWorldPosition(new THREE.Vector3()))
    const d = Math.hypot(s.x - x, s.y - y)
    if (d < bestD) {
      bestD = d
      best = k
    }
  }
  return best
}

function tap(key: string | null) {
  if (spot.value) return
  if (props.mode === 'parts') {
    if (!key) return
    lastTapped.value = key
    emit('act', `tap:${key}`, `That is the ${PC_PARTS[key].name.replace(/ \(.*\)$/, '').toLowerCase()} - not the one asked for.`)
    return
  }
  if (!key) {
    if (selected.value) select(null)
    return
  }
  if (key.startsWith('ghost:')) placeAt(key.slice(6))
  else if (key.startsWith('connect:')) emit('act', key)
  else if (key.startsWith('tool:')) useTool(key.slice(5))
  else if (ASM_KEYS.includes(key as PcPartKey)) {
    if (!placed(key)) select(selected.value === key ? null : key)
  }
}

// Picking a part up (it lifts off the desk) or putting it down again
function select(key: string | null) {
  const w = wb.value
  if (!w || !rig) return
  const prev = selected.value
  selected.value = key
  note.value = ''
  if (prev && prev !== key && !placed(prev)) returnToDesk(prev)
  if (key) {
    const d = rig.desk[key as PcPartKey]
    if (d) w.moveTo(rig.parts[key as PcPartKey], d.pos.clone().add(new THREE.Vector3(0, 0.05, 0)), d.quat, 250)
  }
  syncGhosts()
}

function returnToDesk(key: string) {
  const d = rig?.desk[key as PcPartKey]
  if (d && wb.value) wb.value.moveTo(rig!.parts[key as PcPartKey], d.pos, d.quat, 500, 0.03)
}

function placeAt(zone: string) {
  if (!selected.value) {
    note.value = 'Pick a part up first - drag it, or tap it on the desk.'
    return
  }
  dropOn(selected.value, zone)
  selected.value = null
  syncGhosts()
}

// A part let go over a place: right place and right time, it goes in; otherwise back to the desk
async function dropOn(part: string, zone: string) {
  if (part !== zone) {
    emit('mistake', `The ${nameOf(part).toLowerCase()} does not go there - that is the place for the ${nameOf(zone).toLowerCase()}.`)
    returnToDesk(part)
    return
  }
  const ask = props.step?.action === 'place:' + part ? (props.step?.data?.ask as string | undefined) : undefined
  if (ask) {
    // Hold it over its place while the question is answered
    const a = rig!.anchors[part as PcPartKey]
    wb.value?.moveTo(rig!.parts[part as PcPartKey], a.pos.clone().add(new THREE.Vector3(0, 0, 0.06)), a.quat, 400)
    pendingPart = part
    asking.value = ask
    return
  }
  emit('act', 'place:' + part)
  await nextTick()
  if (!placed(part)) returnToDesk(part)
  else sync(true)
}

// ---------------------------------------------------------------- right way questions
interface Option { text: string; ok: boolean; why?: string }
const QUESTIONS: Record<string, { q: string; action: string; options: Option[] }> = {
  cpu: {
    q: 'How do you line the processor up in the socket?',
    action: 'place:cpu',
    options: [
      { text: 'Any way round - press it in firmly', ok: false, why: 'Forcing a processor in the wrong way bends the pins in the socket. Match the gold triangle on the processor to the one on the socket, and never press.' },
      { text: 'Gold triangle to the triangle on the socket, then lower it in', ok: true }
    ]
  },
  ram: {
    q: 'How do you fit the RAM stick?',
    action: 'place:ram',
    options: [
      { text: 'Line the notch up with the bump in the slot, press both ends until the clips click', ok: true },
      { text: 'Push it in hard either way round', ok: false, why: 'RAM only fits one way - if the notch does not line up, the stick and the slot get damaged.' }
    ]
  },
  paste: {
    q: 'How much thermal paste?',
    action: 'paste',
    options: [
      { text: 'Cover the whole processor in a thick layer', ok: false, why: 'Too much paste spills over the socket and makes cooling worse - a small pea-sized dot is enough, the cooler spreads it.' },
      { text: 'A small pea-sized dot in the middle', ok: true }
    ]
  }
}
const asking = ref<string | null>(null)
let pendingPart: string | null = null
async function answer(o: Option) {
  const q = asking.value ? QUESTIONS[asking.value] : null
  asking.value = null
  const part = pendingPart
  pendingPart = null
  if (!q) return
  if (o.ok) {
    emit('act', q.action)
    await nextTick()
    if (part && !placed(part)) returnToDesk(part)
    else sync(true)
  } else {
    emit('mistake', o.why || 'Not the right way - try again.')
    if (part) returnToDesk(part)
  }
}

// ---------------------------------------------------------------- tools
const TOOLS = [
  { key: 'wall', label: 'Wall switch', icon: 'M7 4h10v16H7zM10 8h4v4h-4z' },
  { key: 'mains', label: 'Mains plug', icon: 'M8 4v5M16 4v5M6 9h12v3a6 6 0 01-12 0zM12 18v3' },
  { key: 'strap', label: 'Wrist strap', icon: 'M7 7a5 5 0 1010 0M7 7v4a5 5 0 0010 0V7M12 16v5h6' },
  { key: 'paste', label: 'Thermal paste', icon: 'M9 3h6v4l2 3v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9l2-3zM10 13h4' },
  { key: 'panel', label: 'Side panel', icon: 'M5 3h14v18H5zM9 7h6M9 10h6M9 13h6' },
  { key: 'power', label: 'Power button', icon: 'M12 3v8M7.5 6.5a7 7 0 109 0' }
]
function useTool(key: string) {
  if (key === 'wall') flipSwitch()
  else if (key === 'mains') plugTo(!pluggedIn.value)
  else if (key === 'strap') emit('act', 'strap')
  else if (key === 'panel') emit('act', 'close')
  else if (key === 'paste') {
    if (props.step?.action === 'paste' && props.step.data?.ask === 'paste') asking.value = 'paste'
    else emit('act', 'paste')
  } else if (key === 'power') switchOn()
}

// ---------------------------------------------------------------- the wall socket
// The switch rocks over and the plug goes in or out; if that is not what the step wants, it
// springs back and the runner says why.
function flipSwitch() {
  const want = !socketOn.value
  const action = want ? 'socket-on' : 'socket-off'
  if (props.step?.action !== action) {
    power?.setSwitch(0, want)
    setTimeout(() => power?.setSwitch(0, socketOn.value), 450)
  }
  emit('act', action)
}
function plugTo(inSocket: boolean) {
  if (!power) return
  if (inSocket === pluggedIn.value) {
    power.setPlug(0, pluggedIn.value ? 0 : null)
    return
  }
  const action = inSocket ? 'plug' : 'unplug'
  if (props.step?.action === action) power.setPlug(0, inSocket ? 0 : null)
  else power.setPlug(0, pluggedIn.value ? 0 : null)
  emit('act', action)
}

// ---------------------------------------------------------------- switching on
const BOOT = ['eSpace PC  BIOS v1.0', 'Processor ........ OK', 'Memory 8192 MB ... OK', 'Graphics ......... OK', 'Drive: HDD 1TB ... found', '* one short beep - all good *', 'Starting the operating system...']
const booting = ref(false)
const bootShown = ref(0)
let bootTimer: ReturnType<typeof setInterval> | null = null
function switchOn() {
  if (props.step?.action !== 'power') {
    emit('act', 'power')
    return
  }
  booting.value = true
  bootShown.value = 0
  rig?.powerLed.emissive.setHex(0x22c55e)
  if (rig) rig.powerLed.emissiveIntensity = 2
  if (bootTimer) clearInterval(bootTimer)
  bootTimer = setInterval(() => {
    bootShown.value++
    if (bootShown.value >= BOOT.length) {
      if (bootTimer) clearInterval(bootTimer)
      setTimeout(() => {
        booting.value = false
        emit('act', 'power')
      }, 600)
    }
  }, 380)
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
.spot-enter-active, .spot-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.spot-enter-from, .spot-leave-to { opacity: 0; transform: translateY(8px); }
</style>
