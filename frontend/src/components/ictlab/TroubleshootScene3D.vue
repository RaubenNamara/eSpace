<template>
  <!-- A faulty computer on a lab bench, in 3D, with its monitor, keyboard and the wall socket it is
       plugged into (a real switched socket: flip the switch, drag the plug in and out). Each step names
       the thing to check or fix; tapping it (or using the buttons below) reports the step's action
       to the runner, and tapping something else reports what was tapped, so the runner can say why
       not now. What the computer, screen and beeps do follows the case and the steps accepted. -->
  <div class="w-full">
    <div v-if="!unsupported" class="relative w-full h-[52vh] min-h-[320px] lg:h-[60vh] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
      <div ref="host" class="absolute inset-0" :class="hoverName ? 'cursor-pointer' : 'cursor-grab'"></div>

      <div class="absolute top-2 left-2 flex flex-wrap gap-1.5 text-[11px] font-semibold pointer-events-none">
        <span v-if="caseTitle" class="px-2 py-0.5 rounded-full shadow-sm bg-indigo-600 text-white">Case {{ caseNumber }}: {{ caseTitle }}</span>
        <span class="px-2 py-0.5 rounded-full shadow-sm" :class="state.on ? 'bg-emerald-600 text-white' : 'bg-white/90 text-gray-700'">{{ state.on ? 'Running' : 'Off' }}</span>
        <span class="px-2 py-0.5 rounded-full shadow-sm" :class="state.plugged ? 'bg-white/90 text-gray-700' : 'bg-amber-500 text-white'">{{ !state.plugIn ? 'Unplugged' : !state.switchOn ? 'Socket switched off' : 'Plugged in · on' }}</span>
      </div>

      <!-- What you see or hear -->
      <Transition name="say-fade">
        <p v-if="said" :key="said" class="absolute top-10 left-1/2 -translate-x-1/2 max-w-[92%] px-3 py-2 rounded-xl bg-gray-900/85 text-white text-sm font-semibold text-center pointer-events-none">{{ said }}</p>
      </Transition>

      <div v-if="hoverName" class="absolute pointer-events-none px-2 py-1 rounded-lg bg-gray-900/85 text-white text-xs font-semibold whitespace-nowrap -translate-x-1/2 -translate-y-full" :style="{ left: `${hoverAt.x}px`, top: `${hoverAt.y - 14}px` }">{{ hoverName }}</div>

      <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
        <span class="px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">Tap to check · drag to turn · pinch to zoom</span>
        <button type="button" class="pointer-events-auto px-2 py-1 rounded-lg bg-white/90 text-gray-800 text-[11px] font-semibold shadow-sm hover:bg-white" @click="wb?.resetView()">Reset view</button>
      </div>
    </div>
    <p v-else class="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-sm text-center text-gray-500 dark:text-gray-400">
      Troubleshooting needs 3D, which this device cannot show. Try it on another phone or a computer.
    </p>

    <!-- Working out the cause -->
    <div v-if="askKey" class="mt-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 p-3">
      <p class="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-2">{{ QUESTIONS[askKey].q }}</p>
      <div class="flex flex-col gap-2">
        <button v-for="(o, i) in QUESTIONS[askKey].options" :key="i" type="button" class="btn-secondary !py-1.5 !text-sm text-left" @click="answer(o.ok, o.why)">{{ o.text }}</button>
      </div>
    </div>

    <!-- The same checks as buttons -->
    <div class="mt-3 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-9 gap-1.5">
      <button
        v-for="t in TOOLS"
        :key="t.key"
        type="button"
        class="flex flex-col items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 text-[11px] font-semibold text-gray-700 dark:text-gray-200 hover:border-indigo-400"
        :class="guide && want === t.key ? 'ict-glow-btn' : ''"
        @click="tapObj(t.key)"
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
import { buildPowerKit, click, type PowerKit } from './three/power'
import { buildPc, setEmissive, type PcRig, type PcPartKey } from './three/pcModel'
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
let rig: PcRig | null = null

// ---------------------------------------------------------------- the case and its state
const caseId = computed(() => String(props.step?.data?.case || ''))
const caseSteps = computed(() => {
  const all = ACTIVITIES.find(a => a.key === 'troubleshoot')?.levels[props.level as 'simple']?.steps || []
  return all
})
const caseTitle = computed(() => String(caseSteps.value.find(s => s.data?.case === caseId.value && s.data?.caseTitle)?.data?.caseTitle || ''))
const caseNumber = computed(() => [...new Set(caseSteps.value.map(s => s.data?.case))].indexOf(caseId.value) + 1)
const did = (k: string) => props.done.includes(`${k}@${caseId.value}`)
const want = computed(() => String(props.step?.data?.obj || ''))

// What the computer is doing right now, from the case and the steps done in it
const state = computed(() => {
  const c = caseId.value
  const s = {
    plugged: true, switchOn: true, plugIn: true, on: false, panelOpen: false, video: true, fanPlugged: true, sata: true, newBattery: false,
    beeping: false, screen: 'off' as 'off' | 'desktop' | 'nosignal' | 'bios-hot' | 'bios-ok' | 'bios-nodrive' | 'bios-date' | 'noboot' | 'date2010' | 'dateok' | 'black'
  }
  const opened = did('open') && !did('close')
  s.panelOpen = opened
  // the wall socket: its switch, and the plug in it (off, then unplugged; plugged in, then on)
  s.switchOn = c === 'nopower' ? did('switchon') : !did('switchoff') || did('switchon')
  s.plugIn = !did('unplug') || did('plugin')
  s.plugged = s.switchOn && s.plugIn
  if (c === 'nopower') {
    s.on = did('test')
    s.screen = s.on ? 'desktop' : 'off'
  } else if (c === 'nodisplay') {
    s.on = did('start')
    s.video = did('reconnect')
    s.screen = !s.on ? 'off' : s.video ? 'desktop' : 'nosignal'
  } else if (c === 'beeps') {
    s.on = (did('start') && !did('switchoff')) || did('test')
    s.beeping = did('start') && !did('switchoff')
    s.screen = did('test') ? 'desktop' : s.on ? 'black' : 'off'
  } else if (c === 'heat') {
    s.fanPlugged = did('fan')
    s.on = did('test') || (did('bios') && !did('switchoff'))
    s.screen = did('test') ? 'bios-ok' : did('bios') && !did('switchoff') ? 'bios-hot' : 'off'
  } else if (c === 'boot') {
    s.sata = did('sata')
    s.on = (did('start') && !did('switchoff')) || did('test')
    s.screen = did('test') ? 'desktop' : did('bios') && !did('switchoff') ? 'bios-nodrive' : s.on ? 'noboot' : 'off'
  } else if (c === 'clock') {
    s.newBattery = did('battery')
    s.on = (did('start') && !did('switchoff')) || did('test')
    s.screen = did('setdate') ? 'dateok' : did('test') ? 'date2010' : did('bios') && !did('switchoff') ? 'bios-date' : s.on ? 'date2010' : 'off'
  }
  if (!s.plugged) s.on = false
  if (!s.on) s.screen = 'off'
  return s
})

// What was seen or heard after the last step, for a few seconds
const said = ref('')
let sayTimer: ReturnType<typeof setTimeout> | null = null
watch(() => props.done.length, (n, before) => {
  if (n <= (before ?? 0)) return
  const last = props.done[props.done.length - 1]
  const step = caseSteps.value.find(s => s.action === last)
  const text = step?.data?.say ? String(step.data.say) : ''
  if (text) {
    said.value = text
    if (sayTimer) clearTimeout(sayTimer)
    sayTimer = setTimeout(() => { said.value = '' }, 6000)
  }
  // the beeps the computer makes: long ones for a memory fault, one short one when all is well
  if (last === 'start@beeps') beep([0.6, 0.6, 0.6], 0.25)
  else if (last.startsWith('test@')) beep([0.12], 0)
  sync()
})

// ---------------------------------------------------------------- sound: the start-up beeps
let audio: AudioContext | null = null
function beep(lengths: number[], gap: number) {
  try {
    audio ??= new AudioContext()
    let t = audio.currentTime + 0.05
    for (const len of lengths) {
      const o = audio.createOscillator()
      const g = audio.createGain()
      o.type = 'square'
      o.frequency.value = 880
      g.gain.value = 0.04
      o.connect(g).connect(audio.destination)
      o.start(t)
      o.stop(t + len)
      t += len + gap
    }
  } catch {
    // no sound on this device - the words on screen say it
  }
}

// ---------------------------------------------------------------- the 3D desk
let monitorScreen: THREE.Mesh
let screenTex: THREE.CanvasTexture
let screenCanvas: HTMLCanvasElement
let monitorLed: THREE.MeshStandardMaterial
let monitor: THREE.Group
let keyboard: THREE.Group
let videoIn: THREE.Mesh
let videoOut: THREE.Mesh
let power: PowerKit
let ramGroup: THREE.Group
let cmosNew: THREE.Mesh
const pickables: THREE.Object3D[] = []
const keyOf = new Map<THREE.Object3D, string>()
const add = (o: THREE.Object3D, k: string) => { pickables.push(o); keyOf.set(o, k) }

const tube = (pts: THREE.Vector3Tuple[], r: number, color: number) => {
  const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), 48, r, 8, false), new THREE.MeshStandardMaterial({ color, roughness: 0.6 }))
  m.castShadow = true
  return m
}

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  const narrow = host.value.clientWidth < 640
  try {
    wb.value = createWorkbench(host.value, { cameraPosition: narrow ? [0.55, 0.85, 1.8] : [0.5, 0.56, 1.22], target: [0.36, 0.2, 0.0], minDistance: 0.3, maxDistance: 2.2 })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  rig = buildPc()
  w.scene.add(rig.shell)
  for (const k of Object.keys(rig.parts) as PcPartKey[]) w.scene.add(rig.parts[k])
  for (const c of [rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel]) {
    c.visible = true
    w.scene.add(c)
  }
  w.scene.add(rig.sidePanel)
  rig.parts.ssd.visible = false
  ramGroup = rig.parts.ram

  // a new CMOS battery, beside the old one's place until it goes in
  cmosNew = rig.cmos.clone() as THREE.Mesh
  cmosNew.material = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.95, roughness: 0.15 })
  cmosNew.visible = false
  w.scene.add(cmosNew)

  // the monitor: stand, frame, screen (drawn on a canvas), power light
  monitor = new THREE.Group()
  const dark = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 })
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.012, 0.12), dark)
  base.position.y = 0.006
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.12, 0.02), dark)
  neck.position.set(0, 0.07, -0.02)
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.28, 0.025), dark)
  bezel.position.set(0, 0.26, 0)
  screenCanvas = document.createElement('canvas')
  screenCanvas.width = 512
  screenCanvas.height = 300
  screenTex = new THREE.CanvasTexture(screenCanvas)
  screenTex.colorSpace = THREE.SRGBColorSpace
  monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.43, 0.25), new THREE.MeshBasicMaterial({ map: screenTex }))
  monitorScreen.position.set(0, 0.26, 0.0131)
  monitorLed = new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x000000 })
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.003, 8, 8), monitorLed)
  led.position.set(0.2, 0.128, 0.014)
  monitor.add(base, neck, bezel, monitorScreen, led)
  monitor.traverse(o => { o.castShadow = true })
  monitor.position.set(0.52, 0, -0.12)
  monitor.rotation.y = -0.25
  w.scene.add(monitor)
  add(monitor, 'monitor')

  // keyboard in front of the monitor
  keyboard = new THREE.Group()
  keyboard.add(new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.014, 0.12), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 })))
  for (let r = 0; r < 4; r++) for (let c = 0; c < 14; c++) {
    const key = new THREE.Mesh(new THREE.BoxGeometry(0.019, 0.006, 0.019), new THREE.MeshStandardMaterial({ color: 0x374151 }))
    key.position.set(-0.155 + c * 0.024, 0.01, -0.038 + r * 0.025)
    keyboard.add(key)
  }
  keyboard.position.set(0.5, 0.007, 0.16)
  keyboard.rotation.y = -0.2
  keyboard.traverse(o => { o.castShadow = true })
  w.scene.add(keyboard)
  add(keyboard, 'keyboard')

  // the wall socket behind the bench, and the computer's plug - its cable runs to the power supply
  power = buildPowerKit(w, {
    socketX: 0.95,
    plugs: [{ deviceEnd: () => new THREE.Vector3(0.214, 0.41, 0.03), rest: new THREE.Vector3(0.86, 0.013, -0.28), startIn: 0 }],
    switchesOn: [true, false]
  })
  add(power.outlets[0].rocker, 'switch')
  add(power.plugs[0].group, 'plug')

  // the video cable from the monitor to the back of the computer (or hanging loose)
  videoIn = tube([[0.48, 0.12, -0.15], [0.4, 0.05, -0.16], [0.28, 0.2, -0.1], [0.23, 0.28, -0.075]], 0.0035, 0x1e3a8a)
  videoOut = tube([[0.48, 0.12, -0.15], [0.4, 0.05, -0.16], [0.3, 0.06, -0.12], [0.27, 0.11, -0.09]], 0.0035, 0x1e3a8a)
  w.scene.add(videoIn, videoOut)
  add(videoIn, 'video')
  add(videoOut, 'video')

  // the things inside, and the case
  add(rig.powerButton, 'power')
  add(rig.sidePanel, 'panel')
  add(rig.parts.ram, 'ram')
  add(rig.connectors.cpu_fan, 'cpu_fan')
  add(rig.connectorLabels.cpu_fan, 'cpu_fan')
  add(rig.connectors.sata, 'sata')
  add(rig.connectorLabels.sata, 'sata')
  add(rig.cmos, 'cmos')
  add(rig.parts.cooler, 'cooler')
  add(rig.parts.hdd, 'hdd')

  w.onFrame(dt => frame(dt))
  w.canvas.addEventListener('pointerdown', onDown)
  w.canvas.addEventListener('pointermove', onMove)
  w.canvas.addEventListener('pointerup', onUp)
  sync()
})

onBeforeUnmount(() => {
  if (sayTimer) clearTimeout(sayTimer)
  audio?.close().catch(() => undefined)
  wb.value?.dispose()
})

// ---------------------------------------------------------------- drawing the state
const PANEL_ASIDE = { pos: new THREE.Vector3(-0.4, 0.232, 0.2), quat: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.95, 0.05)) }
function sync() {
  const r = rig
  const w = wb.value
  if (!r || !w) return
  const s = state.value
  const pose = s.panelOpen ? PANEL_ASIDE : r.sidePanelClosed
  w.moveTo(r.sidePanel, pose.pos, pose.quat, 700, 0.06)
  if (power.outlets[0].on !== s.switchOn) power.setSwitch(0, s.switchOn)
  const plugAt = s.plugIn ? 0 : null
  if (power.plugs[0].inOutlet !== plugAt && !dragging) power.setPlug(0, plugAt)
  videoIn.visible = s.video
  videoOut.visible = !s.video
  r.cables.cpu_fan.visible = s.fanPlugged
  r.cables.sata.visible = s.sata
  const panelLabels = s.panelOpen
  r.connectorLabels.cpu_fan.visible = panelLabels && caseId.value === 'heat'
  r.connectorLabels.sata.visible = panelLabels && caseId.value === 'boot'
  r.powerLed.emissive.setHex(s.on ? 0x22c55e : 0)
  r.powerLed.emissiveIntensity = s.on ? 2 : 0
  monitorLed.emissive.setHex(s.on || caseId.value === 'nodisplay' ? 0x3b82f6 : 0)
  monitorLed.emissiveIntensity = 2
  // the new battery takes the old one's place
  r.cmos.visible = !s.newBattery
  cmosNew.visible = s.newBattery
  if (s.newBattery) {
    r.cmos.updateMatrixWorld(true)
    r.cmos.getWorldPosition(cmosNew.position)
    r.cmos.getWorldQuaternion(cmosNew.quaternion)
  }
  drawScreen(s.screen)
}
watch(() => [caseId.value, props.done.join('|')], () => sync())

// The monitor's picture
function drawScreen(kind: string) {
  const g = screenCanvas.getContext('2d')!
  const W = screenCanvas.width
  const H = screenCanvas.height
  g.fillStyle = '#000'
  g.fillRect(0, 0, W, H)
  const text = (t: string, x: number, y: number, size = 22, color = '#e5e7eb', align: CanvasTextAlign = 'left') => {
    g.fillStyle = color
    g.font = `bold ${size}px monospace`
    g.textAlign = align
    g.fillText(t, x, y)
  }
  if (kind === 'desktop' || kind === 'dateok' || kind === 'date2010') {
    const grad = g.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, '#1d4ed8')
    grad.addColorStop(1, '#0ea5e9')
    g.fillStyle = grad
    g.fillRect(0, 0, W, H)
    for (let i = 0; i < 4; i++) {
      g.fillStyle = 'rgba(255,255,255,0.85)'
      g.fillRect(24, 24 + i * 56, 36, 36)
    }
    g.fillStyle = 'rgba(15,23,42,0.8)'
    g.fillRect(0, H - 34, W, 34)
    const date = kind === 'date2010' ? '01/01/2010  00:03' : kind === 'dateok' ? '14/10/2026  10:42' : '10:42'
    text(date, W - 14, H - 11, 18, kind === 'date2010' ? '#fca5a5' : '#f8fafc', 'right')
  } else if (kind === 'nosignal') {
    g.fillStyle = '#111827'
    g.fillRect(W / 2 - 130, H / 2 - 40, 260, 80)
    g.strokeStyle = '#6b7280'
    g.strokeRect(W / 2 - 130, H / 2 - 40, 260, 80)
    text('No signal', W / 2, H / 2 + 8, 30, '#f8fafc', 'center')
  } else if (kind === 'noboot') {
    text('No boot device found.', 20, 60, 22)
    text('Press any key to restart_', 20, 95, 22)
  } else if (kind.startsWith('bios')) {
    g.fillStyle = '#1e3a8a'
    g.fillRect(0, 0, W, H)
    g.fillStyle = '#93c5fd'
    g.fillRect(0, 0, W, 34)
    text('BIOS SETUP UTILITY', W / 2, 24, 20, '#1e3a8a', 'center')
    if (kind === 'bios-hot' || kind === 'bios-ok') {
      const hot = kind === 'bios-hot'
      text('Hardware monitor', 24, 80, 20, '#f8fafc')
      text(`CPU temperature   ${hot ? '96' : '45'} C`, 24, 130, 20, hot ? '#fca5a5' : '#86efac')
      text(`CPU fan speed     ${hot ? '   0' : '1450'} RPM`, 24, 170, 20, hot ? '#fca5a5' : '#86efac')
      text('System fan        1100 RPM', 24, 210, 20, '#e5e7eb')
    } else if (kind === 'bios-nodrive') {
      text('Boot priority', 24, 80, 20, '#f8fafc')
      text('1st boot device   [ None ]', 24, 130, 20, '#fca5a5')
      text('SATA port 1       Not detected', 24, 170, 20, '#fca5a5')
      text('SATA port 2       Not detected', 24, 210, 20, '#fca5a5')
    } else if (kind === 'bios-date') {
      text('Main', 24, 80, 20, '#f8fafc')
      text('System date   01/01/2010', 24, 130, 20, '#fca5a5')
      text('System time   00:01:12', 24, 170, 20, '#fca5a5')
      text('Settings      Factory defaults loaded', 24, 210, 18, '#fde68a')
    }
  } else if (kind === 'black') {
    // on, but nothing on the screen
  }
  screenTex.needsUpdate = true
}

// ---------------------------------------------------------------- every frame
let t = 0
let lit: THREE.Object3D | null = null
function frame(dt: number) {
  t += dt
  const r = rig
  if (!r) return
  const s = state.value
  power?.update()
  for (const sp of r.spinners) {
    const turning = s.on && !(sp.group === 'cooler' && !s.fanPlugged)
    if (turning) sp.obj.rotation[sp.axis] += dt * sp.speed
  }
  // what to check, glowing (at Simple, or after two tries)
  if (lit) setEmissive(lit, 0, 0)
  lit = null
  if (props.guide && want.value) {
    const target = pickables.find(o => keyOf.get(o) === want.value && o.visible)
    if (target && !(target as THREE.Sprite).isSprite) {
      setEmissive(target, 0xfacc15, 0.25 + 0.25 * Math.sin(t * 4))
      lit = target
    }
  }
}

// ---------------------------------------------------------------- tapping things
const NAMES: Record<string, string> = {
  power: 'Power button', switch: 'Wall socket switch', plug: 'Mains plug (drag it)', monitor: 'Monitor', video: 'Video cable', keyboard: 'Keyboard',
  panel: 'Side panel', ram: 'Memory (RAM)', cpu_fan: 'CPU_FAN connector', sata: 'SATA port', cmos: 'CMOS battery', cooler: 'CPU cooler', hdd: 'Hard disk'
}
const hoverName = ref('')
const hoverAt = ref({ x: 0, y: 0 })
let down: { x: number; y: number; key: string | null } | null = null
let dragging = false
const dragPlane = new THREE.Plane()
const tmpV = new THREE.Vector3()
function onDown(ev: PointerEvent) {
  const w = wb.value
  if (!w) return
  const hit = w.pick(ev, pickables)
  const key = hit ? keyOf.get(hit) || null : null
  down = { x: ev.clientX, y: ev.clientY, key }
  if (key === 'plug') {
    // hold the camera still: the plug follows the pointer
    w.controls.enabled = false
    w.camera.getWorldDirection(tmpV)
    dragPlane.setFromNormalAndCoplanarPoint(tmpV.clone().negate(), power.plugs[0].group.position.clone())
  }
}
function onMove(ev: PointerEvent) {
  const w = wb.value
  if (!w) return
  const r = w.canvas.getBoundingClientRect()
  hoverAt.value = { x: ev.clientX - r.left, y: ev.clientY - r.top }
  if (down?.key === 'plug' && Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 6) {
    dragging = true
    if (w.pointOnPlane(ev, dragPlane, tmpV)) power.plugs[0].group.position.copy(tmpV)
    hoverName.value = ''
    return
  }
  const hit = w.pick(ev, pickables)
  hoverName.value = hit ? NAMES[keyOf.get(hit) || ''] || '' : ''
}
function onUp(ev: PointerEvent) {
  const w = wb.value
  if (!w) return
  w.controls.enabled = true
  if (dragging) {
    // let go near the socket: it goes in; anywhere else: it is out
    dragging = false
    down = null
    const r = w.canvas.getBoundingClientRect()
    const at = w.toScreen(power.outlets[0].pose.pos)
    const near = Math.hypot(at.x - (ev.clientX - r.left), at.y - (ev.clientY - r.top)) < 70
    plugTo(near)
    return
  }
  if (!down || Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 6) return
  down = null
  const hit = w.pick(ev, pickables)
  if (hit) tapObj(keyOf.get(hit)!)
}

// The thing the step wants: its action. Anything else: what was tapped, for the runner to explain.
// The switch rocks over; the plug goes in or out. If that is what the step wants, it counts;
// otherwise it springs back, and the runner says why not now.
function flipSwitch() {
  const want = !state.value.switchOn
  const step = props.step
  if (step?.data?.obj === 'switch' && step.action.startsWith(want ? 'switchon@' : 'switchoff@')) {
    emit('act', step.action)
    return
  }
  power.setSwitch(0, want)
  setTimeout(() => power.setSwitch(0, state.value.switchOn), 450)
  emit('act', `tap:switch@${caseId.value}`, want ? 'Leave it switched off while you work on it.' : undefined)
}
function plugTo(inSocket: boolean) {
  const step = props.step
  if (inSocket !== state.value.plugIn && step?.data?.obj === 'plug' && step.action.startsWith(inSocket ? 'plugin@' : 'unplug@')) {
    power.setPlug(0, inSocket ? 0 : null)
    emit('act', step.action)
    return
  }
  // not now: back where it was
  power.setPlug(0, state.value.plugIn ? 0 : null)
  if (inSocket !== state.value.plugIn) emit('act', `tap:plug@${caseId.value}`, inSocket ? 'Leave it unplugged while you work on it.' : 'Switch off at the socket before you pull the plug out.')
}

function tapObj(key: string) {
  if (!props.step || askKey.value) return
  if (key === 'switch') return flipSwitch()
  if (key === 'plug') return plugTo(!state.value.plugIn)
  if (key === 'power') pressPowerButton()
  if (key === want.value) {
    if (key === 'ram') reseatAnimation()
    emit('act', props.step.action)
  } else {
    emit('act', `tap:${key}@${caseId.value}`, wrongFor(key))
  }
}
function wrongFor(key: string) {
  if (key === 'panel' && state.value.plugged && !state.value.panelOpen) return 'Switch it off and unplug it before you open it up - and check the simple things first.'
  if (['ram', 'cpu_fan', 'sata', 'cmos', 'cooler', 'hdd'].includes(key) && !state.value.panelOpen) return 'The case is closed - you cannot reach that yet.'
  return undefined
}

// The power button goes in and springs back, with a click
function pressPowerButton() {
  const b = rig?.powerButton
  if (!b) return
  click(1.4)
  const home = b.position.x
  b.position.x = home + 0.003
  setTimeout(() => { b.position.x = home }, 140)
}

// Pressing the memory out and back in
function reseatAnimation() {
  const w = wb.value
  if (!w || !rig) return
  const home = rig.anchors.ram.pos.clone()
  w.moveTo(ramGroup, home.clone().add(new THREE.Vector3(0, 0, 0.05)), undefined, 350).then(() => w.moveTo(ramGroup, home, undefined, 450))
}

// ---------------------------------------------------------------- working out the cause
const QUESTIONS: Record<string, { q: string; options: { text: string; ok: boolean; why?: string }[] }> = {
  beeps: {
    q: 'Long beeps, again and again, and a black screen. What is the most likely cause?',
    options: [
      { text: 'The power supply is dead', ok: false, why: 'With a dead power supply there would be no beeps at all - and no fans.' },
      { text: 'The memory (RAM) is loose or faulty', ok: true },
      { text: 'The keyboard is unplugged', ok: false, why: 'A missing keyboard gives a message on the screen, not repeated long beeps.' }
    ]
  }
}
const askKey = computed(() => (props.step?.data?.ask ? String(props.step.data.ask) : null))
function answer(ok: boolean, why?: string) {
  if (!props.step) return
  if (ok) emit('act', props.step.action)
  else emit('mistake', why || 'Not quite - think again.')
}

// ---------------------------------------------------------------- the buttons
const BASE_TOOLS = [
  { key: 'power', label: 'Power button', icon: 'M12 3v8M7.5 6.5a7 7 0 109 0' },
  { key: 'switch', label: 'Wall switch', icon: 'M7 4h10v16H7zM10 8h4v4h-4z' },
  { key: 'plug', label: 'Mains plug', icon: 'M8 4v5M16 4v5M6 9h12v3a6 6 0 01-12 0zM12 18v3' },
  { key: 'monitor', label: 'Monitor', icon: 'M3 5h18v11H3zM8 21h8M12 16v5' },
  { key: 'video', label: 'Video cable', icon: 'M4 7h6v6H4zM10 10h6a4 4 0 014 4v3' },
  { key: 'keyboard', label: 'Keyboard (BIOS)', icon: 'M3 7h18v10H3zM7 11h.01M11 11h.01M15 11h.01M8 14h8' },
  { key: 'panel', label: 'Side panel', icon: 'M5 3h14v18H5zM9 7h6M9 10h6M9 13h6' },
  { key: 'ram', label: 'Memory', icon: 'M4 8h16v8H4zM7 8v8M11 8v8M15 8v8M6 16v3M18 16v3' }
]
// Small things inside get a button only when helping (Simple, or after two tries) - otherwise
// finding them in the computer is the point
const EXTRA: Record<string, { key: string; label: string; icon: string }> = {
  cpu_fan: { key: 'cpu_fan', label: 'CPU_FAN', icon: 'M12 12m-7 0a7 7 0 1014 0 7 7 0 10-14 0M12 5v7l5 3' },
  sata: { key: 'sata', label: 'SATA port', icon: 'M4 9h16v6H4zM8 9V6M16 9V6' },
  cmos: { key: 'cmos', label: 'CMOS battery', icon: 'M12 12m-7 0a7 7 0 1014 0 7 7 0 10-14 0M10 12h4M12 10v4' }
}
const TOOLS = computed(() => (props.guide && EXTRA[want.value] ? [...BASE_TOOLS, EXTRA[want.value]] : BASE_TOOLS))
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
.say-fade-enter-active, .say-fade-leave-active { transition: opacity 0.3s ease; }
.say-fade-enter-from, .say-fade-leave-to { opacity: 0; }
</style>
