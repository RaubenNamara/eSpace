<template>
  <!-- Connect a computer, in 3D: a system unit turned round so its back faces you, with the monitor,
       keyboard, mouse, speakers (and at Advanced a microphone) on the bench, each with its cable
       lying loose, a network point and a switched socket on the wall. Tap a cable's plug to pick
       it up, then tap the port it belongs in; plug in at the wall, switch on, press the power
       button - and the computer starts. Each move is reported to the step runner, which says why
       a wrong one is wrong. -->
  <div class="w-full">
    <div v-if="!unsupported" class="relative w-full h-[52vh] min-h-[320px] lg:h-[60vh] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
      <div ref="host" class="absolute inset-0" :class="hoverName ? 'cursor-pointer' : 'cursor-grab'"></div>

      <div class="absolute top-2 left-2 flex flex-wrap gap-1.5 text-[11px] font-semibold pointer-events-none">
        <span class="px-2 py-0.5 rounded-full shadow-sm bg-white/90 text-gray-700">Connected {{ connectedCount }} of {{ cables.length }}</span>
        <span class="px-2 py-0.5 rounded-full shadow-sm" :class="running ? 'bg-emerald-600 text-white' : powered ? 'bg-amber-500 text-white' : 'bg-white/90 text-gray-700'">{{ running ? 'Running' : powered ? 'Power on - press the button' : 'Off' }}</span>
        <span v-if="selected" class="px-2 py-0.5 rounded-full shadow-sm bg-indigo-600 text-white">In your hand: {{ cableOf(selected)?.short }}</span>
      </div>

      <Transition name="say-fade">
        <p v-if="said" :key="said" class="absolute top-10 left-1/2 -translate-x-1/2 max-w-[92%] px-3 py-2 rounded-xl bg-gray-900/85 text-white text-sm font-semibold text-center pointer-events-none">{{ said }}</p>
      </Transition>

      <div v-if="hoverName" class="absolute pointer-events-none px-2 py-1 rounded-lg bg-gray-900/85 text-white text-xs font-semibold whitespace-nowrap -translate-x-1/2 -translate-y-full" :style="{ left: `${hoverAt.x}px`, top: `${hoverAt.y - 14}px` }">{{ hoverName }}</div>

      <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
        <span class="px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">{{ selected ? 'Now tap the port it goes in' : 'Tap a plug to pick it up · drag to turn · pinch to zoom' }}</span>
        <div class="flex gap-1.5 pointer-events-auto">
          <button type="button" class="px-2 py-1 rounded-lg bg-white/90 text-gray-800 text-[11px] font-semibold shadow-sm hover:bg-white" @click="lookAtPorts">Close-up of the ports</button>
          <button type="button" class="px-2 py-1 rounded-lg bg-white/90 text-gray-800 text-[11px] font-semibold shadow-sm hover:bg-white" @click="wb?.resetView()">Reset view</button>
        </div>
      </div>
    </div>
    <p v-else class="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-sm text-center text-gray-500 dark:text-gray-400">
      Connecting a computer needs 3D, which this device cannot show. Try it on another phone or a computer.
    </p>

    <!-- The cables and switches as buttons too (easier on a small screen) -->
    <div class="mt-3 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-1.5">
      <button
        v-for="c in cables"
        :key="c.dev"
        type="button"
        class="flex flex-col items-center gap-1 rounded-xl border bg-white dark:bg-gray-800 py-2 px-1 text-[11px] font-semibold transition"
        :class="[isConnected(c.dev) ? 'border-emerald-300 text-emerald-700 dark:text-emerald-300' : selected === c.dev ? 'border-indigo-500 ring-2 ring-indigo-500/30 text-gray-800 dark:text-gray-100' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-indigo-400', guide && wantDev === c.dev && !selected ? 'ict-glow-btn' : '']"
        :disabled="isConnected(c.dev)"
        @click="pickUp(c.dev)"
      >
        <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" :style="{ background: c.color }">{{ c.badge }}</span>
        <span class="text-center leading-tight">{{ c.button }}</span>
        <span v-if="isConnected(c.dev)" class="text-[10px]">Connected</span>
      </button>
      <button v-if="hasStep('psu-on')" type="button" class="tool-btn" :class="guide && want === 'psu-on' ? 'ict-glow-btn' : ''" @click="tapPsu"><span class="text-lg leading-none">I/O</span><span>PSU switch</span></button>
      <button type="button" class="tool-btn" :class="guide && want === 'socket-on' ? 'ict-glow-btn' : ''" @click="switchBoth"><span class="text-lg leading-none">⏻</span><span>Wall switches</span></button>
      <button type="button" class="tool-btn" :class="guide && want === 'power' ? 'ict-glow-btn' : ''" @click="pressPower"><span class="text-lg leading-none">⏼</span><span>Power button</span></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import * as THREE from 'three'
import { createWorkbench, type Workbench } from './three/workbench'
import { buildPowerKit, attachPlugDragging, click, type PowerKit } from './three/power'
import { buildConnectTower, buildPlug, type ConnectTower, type Port, type PortKind, type PlugKind, type PlugModel } from './three/connectKit'
import { buildDevice } from './three/devices'
import { setEmissive } from './three/pcModel'
import { WALL_Z } from './three/labRoom'
import { ACTIVITIES, type IctStep } from './activities'

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

// ---------------------------------------------------------------- the cables
interface Cable {
  dev: string
  plug: PlugKind
  fits: PortKind[]
  short: string
  button: string
  badge: string
  color: string
  shape: string
  rest: [number, number, number]
}
const ALL_CABLES: Cable[] = [
  { dev: 'monitor', plug: 'hdmi', fits: ['hdmi'], short: 'monitor cable (HDMI)', button: 'Monitor cable', badge: 'HD', color: '#1f2937', shape: 'a wide, flat HDMI plug with two slanted corners', rest: [-0.25, 0.4, 0.17] },
  { dev: 'keyboard', plug: 'usb', fits: ['usb', 'usb3'], short: 'keyboard cable (USB)', button: 'Keyboard', badge: 'USB', color: '#374151', shape: 'a flat, rectangular USB plug', rest: [-0.19, -0.3, 0.27] },
  { dev: 'mouse', plug: 'usb', fits: ['usb', 'usb3'], short: 'mouse cable (USB)', button: 'Mouse', badge: 'USB', color: '#374151', shape: 'a flat, rectangular USB plug', rest: [-0.07, 0.2, 0.33] },
  { dev: 'speakers', plug: 'audio-green', fits: ['audio-green'], short: 'speaker cable (green jack)', button: 'Speakers', badge: '🔊', color: '#16a34a', shape: 'a round green 3.5 mm jack', rest: [0.19, 0.5, 0.25] },
  { dev: 'mic', plug: 'audio-pink', fits: ['audio-pink'], short: 'microphone cable (pink jack)', button: 'Microphone', badge: '🎤', color: '#ec4899', shape: 'a round pink 3.5 mm jack', rest: [0.27, -0.4, 0.34] },
  { dev: 'network', plug: 'rj45', fits: ['rj45'], short: 'network cable (RJ45)', button: 'Network cable', badge: 'LAN', color: '#1d4ed8', shape: 'a clear RJ45 plug with a clip on top', rest: [0.13, 0.3, 0.15] },
  { dev: 'power', plug: 'c13', fits: ['c14'], short: 'power cable', button: 'Power cable', badge: '⚡', color: '#111827', shape: 'a big three-hole power plug', rest: [0.3, -0.5, 0.1] }
]
// Only the cables this level uses
const levelSteps = computed<IctStep[]>(() => ACTIVITIES.find(a => a.key === 'connect')?.levels[props.level as 'simple']?.steps || [])
const hasStep = (action: string) => levelSteps.value.some(s => s.action === action)
const cables = computed(() => ALL_CABLES.filter(c => hasStep(`plug:${c.dev}`)))
const cableOf = (dev: string | null) => ALL_CABLES.find(c => c.dev === dev) || null

const has = (a: string) => props.done.includes(a)
const isConnected = (dev: string) => has(`plug:${dev}`)
const connectedCount = computed(() => cables.value.filter(c => isConnected(c.dev)).length)
const psuOn = computed(() => !hasStep('psu-on') || has('psu-on'))
const powered = computed(() => has('socket-on') && has('wall:computer') && psuOn.value)
const running = computed(() => has('power'))
const want = computed(() => props.step?.action || '')
const wantDev = computed(() => (want.value.startsWith('plug:') ? want.value.slice(5) : ''))

// ---------------------------------------------------------------- what was said
const said = ref('')
let sayTimer: ReturnType<typeof setTimeout> | null = null
const say = (text: string) => {
  said.value = text
  if (sayTimer) clearTimeout(sayTimer)
  sayTimer = setTimeout(() => { said.value = '' }, 4500)
}

// ---------------------------------------------------------------- the 3D bench
let tower: ConnectTower
let power: PowerKit
let plugDrag: { busy: () => boolean } | null = null
const plugs = new Map<string, PlugModel>()
const cableMesh = new Map<string, THREE.Mesh>()
const anchors = new Map<string, () => THREE.Vector3>()
const portOf = new Map<string, Port>()
let screenMesh: THREE.Mesh | null = null
let screenOn: THREE.Material | null = null
const screenOff = new THREE.MeshBasicMaterial({ color: 0x050608 })
let monitorLed: THREE.MeshStandardMaterial
let targetRing: THREE.Mesh
let monitorPowerAnchor = () => new THREE.Vector3()
const pickables: THREE.Object3D[] = []
const keyOf = new Map<THREE.Object3D, string>()
const addPick = (o: THREE.Object3D, k: string) => { pickables.push(o); keyOf.set(o, k) }

const restPose = (c: Cable) => {
  const m = plugs.get(c.dev)!
  return {
    pos: new THREE.Vector3(c.rest[0], m.halfH, c.rest[2]),
    quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, c.rest[1], 0))
  }
}
const portPose = (p: Port) => ({ pos: new THREE.Vector3(p.pos.x, p.pos.y, p.pos.z - 0.006), quat: new THREE.Quaternion() })

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  const narrow = host.value.clientWidth < 640
  try {
    wb.value = createWorkbench(host.value, { cameraPosition: narrow ? [0.35, 0.62, 1.25] : [0.26, 0.46, 0.82], target: narrow ? [0, 0.18, 0.1] : [-0.02, 0.2, 0.08], minDistance: 0.12, maxDistance: 2.2, near: 0.01 })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  tower = buildConnectTower()
  w.scene.add(tower.group)
  for (const p of tower.ports) addPick(p.hit, `port:${p.key}`)
  addPick(tower.psuSwitch, 'psu')
  addPick(tower.powerButton, 'powerbtn')

  // the devices on the bench, each with the point its cable leaves from
  const place = (key: Parameters<typeof buildDevice>[0], x: number, z: number, rotY: number) => {
    const g = buildDevice(key).clone(true)
    g.position.set(x, 0, z)
    g.rotation.y = rotY
    w.scene.add(g)
    g.updateMatrixWorld(true)
    return g
  }
  const monitor = place('monitor', -0.5, -0.13, 0.5)
  monitor.traverse(o => {
    const m = o as THREE.Mesh
    if (m.isMesh && (m.material as THREE.MeshBasicMaterial).isMeshBasicMaterial && (m.material as THREE.MeshBasicMaterial).map) {
      screenMesh = m
      screenOn = m.material as THREE.Material
      m.material = screenOff
    }
  })
  monitorLed = new THREE.MeshStandardMaterial({ color: 0x1f2937, emissive: 0x000000, emissiveIntensity: 2 })
  const mLed = new THREE.Mesh(new THREE.SphereGeometry(0.0028, 8, 8), monitorLed)
  mLed.position.set(0.25, 0.118, 0.008)
  monitor.add(mLed)
  anchors.set('monitor', () => monitor.localToWorld(new THREE.Vector3(0.04, 0.12, -0.045)))
  monitorPowerAnchor = () => monitor.localToWorld(new THREE.Vector3(-0.04, 0.12, -0.045))
  if (hasStep('plug:keyboard')) {
    const kb = place('keyboard', -0.42, 0.29, 0.25)
    anchors.set('keyboard', () => kb.localToWorld(new THREE.Vector3(0, 0.012, -0.09)))
  }
  if (hasStep('plug:mouse')) {
    const ms = place('mouse', -0.17, 0.37, 0.1)
    anchors.set('mouse', () => ms.localToWorld(new THREE.Vector3(0.03, 0.004, -0.14)))
  }
  if (hasStep('plug:speakers')) {
    const sp = place('speakers', 0.44, -0.2, -0.35)
    anchors.set('speakers', () => sp.localToWorld(new THREE.Vector3(-0.08, 0.03, -0.06)))
  }
  if (hasStep('plug:mic')) {
    const mic = place('microphone', 0.42, 0.3, -0.3)
    anchors.set('mic', () => mic.localToWorld(new THREE.Vector3(0, 0.006, -0.045)))
  }
  if (hasStep('plug:network')) {
    // the network point on the wall: a white plate with one socket
    const plate = new THREE.Group()
    plate.add(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.008), new THREE.MeshStandardMaterial({ color: 0xf4f4f0, roughness: 0.4 })))
    const sock = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.012, 0.002), new THREE.MeshStandardMaterial({ color: 0x111111 }))
    sock.position.z = 0.0045
    plate.add(sock)
    plate.position.set(0.24, 0.13, WALL_Z + 0.005)
    plate.traverse(o => { o.castShadow = true })
    w.scene.add(plate)
    anchors.set('network', () => new THREE.Vector3(0.24, 0.13, WALL_Z + 0.015))
  }

  // the plugs, lying loose
  for (const c of cables.value) {
    const m = buildPlug(c.plug)
    plugs.set(c.dev, m)
    m.group.traverse(o => { o.castShadow = true })
    const r = restPose(c)
    m.group.position.copy(r.pos)
    m.group.quaternion.copy(r.quat)
    w.scene.add(m.group)
    addPick(m.group, `plug:${c.dev}`)
    if (c.dev !== 'power') {
      const tube = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ color: c.dev === 'network' ? 0x1d4ed8 : 0x16181c, roughness: 0.55 }))
      tube.castShadow = true
      w.scene.add(tube)
      cableMesh.set(c.dev, tube)
    }
  }

  // the wall socket: the computer's power cable and the monitor's own
  const c13Tail = () => {
    const m = plugs.get('power')
    return m ? m.group.localToWorld(m.tail.clone()) : new THREE.Vector3(0.3, 0.01, 0.1)
  }
  power = buildPowerKit(w, {
    socketX: 0.66,
    plugs: [
      { deviceEnd: c13Tail, rest: new THREE.Vector3(0.56, 0.013, -0.3), startIn: null },
      { deviceEnd: () => monitorPowerAnchor(), rest: new THREE.Vector3(0.48, 0.013, -0.36), startIn: null, color: 0xf4f4f0 }
    ],
    switchesOn: [false, false]
  })
  power.outlets.forEach((o, i) => addPick(o.rocker, `rocker:${i}`))
  plugDrag = attachPlugDragging(w, power, onWallDrop, i => onWallDrop(i, power.plugs[i].inOutlet === null ? i : null))

  // a pulsing ring over the port a guided step wants
  targetRing = new THREE.Mesh(new THREE.RingGeometry(0.011, 0.014, 32), new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.9, depthTest: false }))
  targetRing.renderOrder = 11
  targetRing.visible = false
  w.scene.add(targetRing)

  w.onFrame(dt => frame(dt))
  w.canvas.addEventListener('pointerdown', onDown)
  w.canvas.addEventListener('pointermove', onMove)
  w.canvas.addEventListener('pointerup', onUp)
  sync(false)
})

onBeforeUnmount(() => {
  if (sayTimer) clearTimeout(sayTimer)
  if (bootTimer) clearTimeout(bootTimer)
  audio?.close().catch(() => undefined)
  wb.value?.dispose()
})

// ---------------------------------------------------------------- drawing what was accepted
function freePortFor(c: Cable) {
  return tower.ports.find(p => c.fits.includes(p.kind) && ![...portOf.values()].includes(p)) || null
}
function sync(animate = true) {
  const w = wb.value
  if (!w || !tower) return
  for (const c of cables.value) {
    const m = plugs.get(c.dev)!
    if (isConnected(c.dev)) {
      if (!portOf.has(c.dev)) {
        const p = freePortFor(c)
        if (p) portOf.set(c.dev, p)
      }
      const p = portOf.get(c.dev)
      if (p) {
        const pose = portPose(p)
        if (m.group.position.distanceTo(pose.pos) > 1e-4) {
          if (animate) w.moveTo(m.group, pose.pos, pose.quat, 450, 0.03)
          else { m.group.position.copy(pose.pos); m.group.quaternion.copy(pose.quat) }
        }
      }
    } else if (selected.value !== c.dev) {
      portOf.delete(c.dev)
      const r = restPose(c)
      if (m.group.position.distanceTo(r.pos) > 1e-4) {
        if (animate) w.moveTo(m.group, r.pos, r.quat, 350, 0.02)
        else { m.group.position.copy(r.pos); m.group.quaternion.copy(r.quat) }
      }
    }
  }
  // the wall: plugs and switches
  const wallAt = [has('wall:computer') ? 0 : null, has('wall:monitor') ? 1 : null]
  wallAt.forEach((o, i) => { if (power.plugs[i].inOutlet !== o && !plugDrag?.busy()) power.setPlug(i, o, animate) })
  const on = has('socket-on')
  power.outlets.forEach((o, i) => { if (on && !o.on) power.setSwitch(i, true, animate); else if (!on && o.on && !sockOn.value[i]) power.setSwitch(i, false, false) })
  tower.setPsuSwitch(psuOn.value)
  // running
  tower.powerLed.emissive.setHex(running.value ? 0x22c55e : 0)
  monitorLed.emissive.setHex(running.value ? 0x22c55e : has('wall:monitor') && on ? 0xf59e0b : 0)
  const showTags = props.level === 'simple' || props.guide
  for (const p of tower.ports) p.tag.visible = showTags && !portIsUsed(p)
}
const portIsUsed = (p: Port) => [...portOf.values()].includes(p)
watch(() => props.done.join('|'), () => sync())
watch(() => props.guide, () => sync(false))

// ---------------------------------------------------------------- picking up and plugging in
const selected = ref<string | null>(null)
function pickUp(dev: string) {
  const w = wb.value
  if (!w || isConnected(dev)) return
  if (selected.value && selected.value !== dev) dropBack(selected.value)
  if (selected.value === dev) {
    dropBack(dev)
    return
  }
  selected.value = dev
  const m = plugs.get(dev)
  if (m) {
    const r = restPose(cableOf(dev)!)
    w.moveTo(m.group, r.pos.clone().add(new THREE.Vector3(0, 0.045, 0)), r.quat, 250)
  }
  click(1.3)
}
function dropBack(dev: string) {
  const w = wb.value
  selected.value = null
  const c = cableOf(dev)
  const m = plugs.get(dev)
  if (w && c && m && !isConnected(dev)) {
    const r = restPose(c)
    w.moveTo(m.group, r.pos, r.quat, 300, 0.02)
  }
}
function tryPort(p: Port) {
  const dev = selected.value
  const c = cableOf(dev)
  if (!dev || !c) {
    say(`That is the ${p.label}. Pick up a cable first, then tap the port it goes in.`)
    return
  }
  if (portIsUsed(p)) {
    emit('mistake', `That ${p.label.split(' (')[0]} is already in use - try another one.`)
    dropBack(dev)
    return
  }
  if (!c.fits.includes(p.kind)) {
    const right = tower.ports.find(q => c.fits.includes(q.kind))
    const where = props.level === 'advanced' && !props.guide ? 'Look at the shape and colour of the plug, then find the port that matches.' : `It goes in the ${right?.label.split(' (')[0]}.`
    emit('mistake', `That is the ${p.label}. The ${c.short} has ${c.shape} - it does not fit there. ${where}`)
    dropBack(dev)
    return
  }
  const action = `plug:${dev}`
  if (want.value !== action) {
    // the right port, but not now: the runner says why
    dropBack(dev)
    emit('act', action)
    return
  }
  portOf.set(dev, p)
  selected.value = null
  const w = wb.value
  const m = plugs.get(dev)
  if (w && m) {
    const pose = portPose(p)
    w.moveTo(m.group, pose.pos, pose.quat, 450, 0.03).then(() => click(1))
  }
  emit('act', action)
}

// ---------------------------------------------------------------- the wall socket, the PSU switch, the power button
const sockOn = ref([false, false])
function onWallDrop(i: number, outlet: number | null) {
  const which = i === 0 ? 'computer' : 'monitor'
  const action = `wall:${which}`
  const isIn = has(action)
  const wantIn = outlet !== null && !power.plugs.some((pl, k) => k !== i && pl.inOutlet === outlet)
  if (wantIn === isIn) {
    power.setPlug(i, isIn ? i : null)
    return
  }
  if (!wantIn) {
    // pulling a plug out again: put it back
    power.setPlug(i, isIn ? i : null)
    return
  }
  if (want.value !== action) {
    power.setPlug(i, null)
    emit('act', action)
    return
  }
  power.setPlug(i, outlet)
  emit('act', action)
}
function flipRocker(i: number) {
  if (want.value !== 'socket-on') {
    power.setSwitch(i, true)
    setTimeout(() => power.setSwitch(i, has('socket-on')), 450)
    emit('act', 'socket-on')
    return
  }
  sockOn.value = sockOn.value.map((v, k) => (k === i ? !v : v))
  power.setSwitch(i, sockOn.value[i])
  if (sockOn.value.every(Boolean)) emit('act', 'socket-on')
  else if (sockOn.value[i]) say('One on - now the other switch, for the monitor.')
}
function switchBoth() {
  if (want.value !== 'socket-on') {
    emit('act', 'socket-on')
    return
  }
  sockOn.value = [true, true]
  power.setSwitch(0, true)
  power.setSwitch(1, true)
  emit('act', 'socket-on')
}
function tapPsu() {
  if (!hasStep('psu-on')) return
  if (want.value !== 'psu-on') {
    emit('act', 'psu-on')
    return
  }
  click(0.9)
  emit('act', 'psu-on')
}
let bootTimer: ReturnType<typeof setTimeout> | null = null
function pressPower() {
  const b = tower?.powerButton
  if (b) {
    b.position.y -= 0.002
    setTimeout(() => { b.position.y += 0.002 }, 140)
  }
  click(1.4)
  if (want.value !== 'power') {
    emit('act', 'power')
    return
  }
  emit('act', 'power')
  // the computer starts: a light, the fan, the screen, a sound, the network lights
  bootTimer = setTimeout(() => {
    if (screenMesh && screenOn) screenMesh.material = screenOn
    chime()
    say('It starts - the screen comes on, the speakers play the start-up sound and the network lights flicker.')
  }, 1200)
}

// ---------------------------------------------------------------- sound
let audio: AudioContext | null = null
function chime() {
  try {
    audio ??= new AudioContext()
    const t0 = audio.currentTime + 0.05
    ;[523.25, 659.25, 783.99].forEach((f, i) => {
      const o = audio!.createOscillator()
      const g = audio!.createGain()
      o.type = 'sine'
      o.frequency.value = f
      g.gain.setValueAtTime(0.0001, t0 + i * 0.12)
      g.gain.exponentialRampToValueAtTime(0.08, t0 + i * 0.12 + 0.03)
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.12 + 0.6)
      o.connect(g).connect(audio!.destination)
      o.start(t0 + i * 0.12)
      o.stop(t0 + i * 0.12 + 0.65)
    })
  } catch {
    // no sound on this device
  }
}

// ---------------------------------------------------------------- pointer
const hoverName = ref('')
const hoverAt = ref({ x: 0, y: 0 })
let down: { x: number; y: number; key: string | null } | null = null
function keyAt(ev: PointerEvent) {
  const w = wb.value
  if (!w) return null
  // a direct hit on a small thing (port, switch) wins over what is around it
  const hit = w.pick(ev, pickables)
  return hit ? keyOf.get(hit) || null : null
}
function nameOf(key: string): string {
  if (key.startsWith('plug:')) return cableOf(key.slice(5))?.short.replace(/^./, s => s.toUpperCase()) || ''
  if (key.startsWith('port:')) {
    const p = tower.ports.find(q => `port:${q.key}` === key)
    if (!p) return ''
    return props.level === 'advanced' && !props.guide ? 'A port' : p.label
  }
  if (key === 'psu') return 'Power supply switch (I = on, O = off)'
  if (key === 'powerbtn') return 'Power button'
  if (key.startsWith('rocker:')) return key.endsWith('0') ? 'Wall switch (computer)' : 'Wall switch (monitor)'
  return ''
}
function onDown(ev: PointerEvent) {
  down = { x: ev.clientX, y: ev.clientY, key: keyAt(ev) }
}
function onMove(ev: PointerEvent) {
  const w = wb.value
  if (!w) return
  const r = w.canvas.getBoundingClientRect()
  hoverAt.value = { x: ev.clientX - r.left, y: ev.clientY - r.top }
  const k = keyAt(ev)
  hoverName.value = k ? nameOf(k) : ''
}
function onUp(ev: PointerEvent) {
  const d = down
  down = null
  if (!d || Math.hypot(ev.clientX - d.x, ev.clientY - d.y) > 6) return
  const key = d.key
  if (!key) {
    if (selected.value) dropBack(selected.value)
    return
  }
  if (key.startsWith('plug:')) pickUp(key.slice(5))
  else if (key.startsWith('port:')) {
    const p = tower.ports.find(q => `port:${q.key}` === key)
    if (p) tryPort(p)
  } else if (key === 'psu') tapPsu()
  else if (key === 'powerbtn') pressPower()
  else if (key.startsWith('rocker:')) flipRocker(Number(key.slice(7)))
}

// A close look at the back of the computer
function lookAtPorts() {
  const w = wb.value
  if (!w) return
  w.controls.target.set(-0.03, 0.27, 0.21)
  w.camera.position.set(0.06, 0.33, 0.5)
  w.controls.update()
}

// ---------------------------------------------------------------- every frame
let lanBlink = 0
const lastTail = new Map<string, THREE.Vector3>()
function frame(dt: number) {
  const w = wb.value
  if (!w || !tower) return
  power?.update()
  // the cables follow their plugs
  for (const [dev, tube] of cableMesh) {
    const m = plugs.get(dev)
    const a = anchors.get(dev)
    if (!m || !a) continue
    const tail = m.group.localToWorld(m.tail.clone())
    const prev = lastTail.get(dev)
    if (prev && prev.distanceTo(tail) < 0.0008) continue
    lastTail.set(dev, tail.clone())
    const start = a()
    const back = m.group.localToWorld(m.tail.clone().add(new THREE.Vector3(0, 0, 0.05)))
    const drop = start.clone()
    drop.y = Math.max(0.004, start.y - 0.05)
    const mid = drop.clone().lerp(back, 0.5)
    mid.y = 0.004
    const pts = [start, drop, mid, back, tail]
    tube.geometry.dispose()
    tube.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, dev === 'network' ? 0.0028 : 0.0024, 8, false)
  }
  // running: the fan turns, the network lights flicker
  if (running.value) {
    tower.fan.rotation.z += dt * 18
    lanBlink += dt
    tower.lanLeds[0].emissive.setHex(isConnected('network') ? 0x22c55e : 0)
    tower.lanLeds[1].emissive.setHex(isConnected('network') && Math.sin(lanBlink * 17) > 0.2 ? 0xf59e0b : 0)
  }
  // what the step wants, glowing (Simple, or after a hint)
  for (const m of plugs.values()) setEmissive(m.group, 0, 0)
  const t = performance.now() / 220
  if (props.guide && wantDev.value && !selected.value) {
    const m = plugs.get(wantDev.value)
    if (m) setEmissive(m.group, 0xfacc15, 0.3 + 0.3 * Math.sin(t))
  }
  if (selected.value) {
    const m = plugs.get(selected.value)
    if (m) setEmissive(m.group, 0x60a5fa, 0.35)
  }
  const c = cableOf(selected.value)
  const target = props.guide && c ? freePortFor(c) : null
  targetRing.visible = !!target
  if (target) {
    targetRing.position.set(target.pos.x, target.pos.y, target.pos.z + 0.004)
    targetRing.scale.setScalar(1 + 0.15 * Math.sin(t))
  }
  power?.outlets.forEach(o => setEmissive(o.rocker, 0, 0))
  if (props.guide && want.value === 'socket-on') power.outlets.forEach((o, i) => { if (!sockOn.value[i]) setEmissive(o.rocker, 0xfacc15, 0.3 + 0.3 * Math.sin(t)) })
  setEmissive(tower.psuSwitch, props.guide && want.value === 'psu-on' ? 0xfacc15 : 0, props.guide && want.value === 'psu-on' ? 0.3 + 0.3 * Math.sin(t) : 0)
  setEmissive(tower.powerButton, props.guide && want.value === 'power' ? 0xfacc15 : 0, props.guide && want.value === 'power' ? 0.3 + 0.3 * Math.sin(t) : 0)
  power?.plugs.forEach((pl, i) => setEmissive(pl.group, props.guide && want.value === (i === 0 ? 'wall:computer' : 'wall:monitor') ? 0xfacc15 : 0, props.guide && want.value === (i === 0 ? 'wall:computer' : 'wall:monitor') ? 0.3 + 0.3 * Math.sin(t) : 0))
}
</script>

<style scoped>
.tool-btn {
  @apply flex flex-col items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-1 text-[11px] font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-400;
}
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
.say-fade-enter-active, .say-fade-leave-active { transition: opacity 0.25s ease; }
.say-fade-enter-from, .say-fade-leave-to { opacity: 0; }
</style>
