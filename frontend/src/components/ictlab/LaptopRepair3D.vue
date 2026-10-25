<template>
  <!-- The laptop repair bench in 3D: a laptop upside down on an anti-static mat, with a screw tray,
       the wrist strap and the new SSD beside it. Tapping something reports it (`tap`); the page
       decides whether it is the right step. What is drawn - screws out, panel off, battery
       unplugged, the old SSD out, the new one in - follows `done` (step keys) and `screwsOut`. -->
  <div v-if="!unsupported" class="relative w-full h-[54vh] min-h-[320px] lg:h-[62vh] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
    <div ref="host" class="absolute inset-0" :class="hoverName ? 'cursor-pointer' : 'cursor-grab'"></div>
    <div v-if="hoverName" class="absolute pointer-events-none px-2 py-1 rounded-lg bg-gray-900/85 text-white text-xs font-semibold whitespace-nowrap -translate-x-1/2 -translate-y-full" :style="{ left: `${hoverAt.x}px`, top: `${hoverAt.y - 12}px` }">{{ hoverName }}</div>
    <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
      <span class="px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">Tap to work · drag to turn · pinch to zoom</span>
      <button type="button" class="pointer-events-auto px-2 py-1 rounded-lg bg-white/90 text-gray-800 text-[11px] font-semibold shadow-sm hover:bg-white" @click="look('all')">Whole bench</button>
    </div>
  </div>
  <p v-else class="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-sm text-center text-gray-500">This device cannot show 3D.</p>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { createWorkbench, type Workbench } from './three/workbench'
import { setEmissive } from './three/pcModel'

const props = defineProps<{
  /** Step keys done so far */
  done: string[]
  /** How many of the 9 visible screws are out */
  screwsOut: number
  /** The thing to tap now - it glows when `glow` */
  target: string | null
  glow: boolean
}>()
const emit = defineEmits<{ tap: [target: string] }>()

const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
const hoverName = ref('')
const hoverAt = ref({ x: 0, y: 0 })

// ------------------------------------------------------------------ building blocks
const mat = (color: number, rough = 0.55, metal = 0.05, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...extra })
function mesh(geo: THREE.BufferGeometry, m: THREE.Material | THREE.Material[], x = 0, y = 0, z = 0) {
  const o = new THREE.Mesh(geo, m)
  o.position.set(x, y, z)
  o.castShadow = true
  o.receiveShadow = true
  return o
}
const box = (w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0) => mesh(new THREE.BoxGeometry(w, h, d), m, x, y, z)
const rbox = (w: number, h: number, d: number, m: THREE.Material, r: number, x = 0, y = 0, z = 0) => mesh(new RoundedBoxGeometry(w, h, d, 3, r), m, x, y, z)
const cyl = (r: number, h: number, m: THREE.Material, x = 0, y = 0, z = 0, seg = 24) => mesh(new THREE.CylinderGeometry(r, r, h, seg), m, x, y, z)
function canvasTex(w: number, h: number, paint: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  paint(c.getContext('2d')!)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}
/** A tiny cross-head screw, head up */
function screw() {
  const g = new THREE.Group()
  g.add(cyl(0.0034, 0.0016, mat(0xc0c5cc, 0.3, 0.9)))
  g.add(box(0.0042, 0.0006, 0.0008, mat(0x3f4650, 0.6), 0, 0.0009, 0), box(0.0008, 0.0006, 0.0042, mat(0x3f4650, 0.6), 0, 0.0009, 0))
  return g
}
/** An SSD stick: green board, chips, a label - lying along x, its contacts at local x = 0 */
function ssdStick(label: string, burnt = false) {
  const g = new THREE.Group()
  g.add(box(0.08, 0.0012, 0.022, mat(0x0d5a34, 0.6), 0.04, 0, 0))
  g.add(box(0.006, 0.0013, 0.02, mat(0xd4a017, 0.3, 0.9), 0.003, 0, 0)) // gold contacts
  g.add(box(0.016, 0.0018, 0.014, mat(0x16181b, 0.4), 0.02, 0.0012, 0), box(0.016, 0.0018, 0.014, mat(0x16181b, 0.4), 0.044, 0.0012, 0))
  const lab = mesh(new THREE.PlaneGeometry(0.05, 0.018), new THREE.MeshStandardMaterial({ roughness: 0.6, map: canvasTex(400, 144, c => {
    c.fillStyle = '#f8fafc'; c.fillRect(0, 0, 400, 144)
    c.fillStyle = '#0f172a'; c.font = 'bold 30px sans-serif'; c.fillText(label, 16, 52)
    c.font = '22px sans-serif'; c.fillText('M.2 2280 PCIe NVMe', 16, 92); c.fillText('SN 7A21-0093', 16, 124)
  }) }), 0.052, 0.0022, 0)
  lab.rotation.x = -Math.PI / 2
  g.add(lab)
  if (burnt) {
    const scorch = mesh(new THREE.CircleGeometry(0.006, 20), mat(0x1a0f08, 1), 0.02, 0.0023, 0.002)
    scorch.rotation.x = -Math.PI / 2
    g.add(scorch)
  }
  g.add(mesh(new THREE.TorusGeometry(0.0022, 0.0007, 8, 20), mat(0xd4a017, 0.3, 0.9), 0.0785, 0.0007, 0)) // the screw notch
  return g
}

// ------------------------------------------------------------------ the scene
const pick: Record<string, THREE.Object3D> = {}
const NAMES: Record<string, string> = {
  charger: 'Charger plug', strap: 'Anti-static wrist strap', screw: 'Panel screw', foot: 'Rubber foot', hidden: 'Screw under the foot', seam: 'Panel edge (by the hinges)',
  'battery-plug': 'Battery connector', 'old-ssd': 'Old SSD', 'ssd-screw': 'SSD screw', 'new-ssd': 'New SSD (512 GB NVMe)', fan: 'Fan', panel: 'Bottom panel', power: 'Power button',
  ram: 'Memory (RAM)', battery: 'Battery', wifi: 'Wi-Fi card', tray: 'Screw tray'
}
let screws: THREE.Group[] = []
let hiddenScrew: THREE.Group
let foot: THREE.Mesh
let panel: THREE.Group
let charger: THREE.Group
let strap: THREE.Group
let batteryPlug: THREE.Group
let oldSsd: THREE.Group
let newSsd: THREE.Group
let ssdScrew: THREE.Group
let dust: THREE.Group
let tray: THREE.Group
const TRAY = new THREE.Vector3(0.26, 0.012, -0.1)
const PANEL_ON = new THREE.Vector3(0, 0.0355, 0)
const PANEL_OFF = new THREE.Vector3(-0.02, 0.006, 0.32)
const M2 = new THREE.Vector3(0.04, 0.0185, -0.035) // the slot's mouth (SSD runs towards +x)

const VIEWS: Record<string, { pos: THREE.Vector3Tuple; target: THREE.Vector3Tuple }> = {
  all: { pos: [0.05, 0.5, 0.5], target: [0.02, 0, 0.05] },
  bottom: { pos: [0, 0.34, 0.3], target: [0, 0.01, 0.02] },
  inside: { pos: [0.02, 0.28, 0.2], target: [0.02, 0.01, -0.01] },
  ssd: { pos: [0.1, 0.17, 0.08], target: [0.08, 0.015, -0.03] },
  battery: { pos: [-0.05, 0.2, 0.16], target: [-0.06, 0.015, 0.02] },
  fan: { pos: [-0.12, 0.18, 0.06], target: [-0.1, 0.015, -0.05] }
}
let camGoal: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null
function look(view: string) {
  const v = VIEWS[view] || VIEWS.all
  camGoal = { pos: new THREE.Vector3(...v.pos), target: new THREE.Vector3(...v.target) }
}

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  try {
    wb.value = createWorkbench(host.value, { cameraPosition: VIEWS.all.pos, target: VIEWS.all.target, minDistance: 0.06, maxDistance: 1.2, near: 0.004, hd: true })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  const s = w.scene

  // the anti-static mat
  const esd = rbox(0.7, 0.003, 0.5, mat(0x2f6f9f, 0.95), 0.004, 0.03, 0.0015, 0.1)
  s.add(esd)

  // ---- the laptop, upside down: the chassis, then what is inside
  const lap = new THREE.Group()
  s.add(lap)
  lap.add(rbox(0.32, 0.018, 0.22, mat(0x2b2f36, 0.45, 0.4), 0.004, 0, 0.012, 0))
  // side walls, so the parts sit in a tray and the bottom panel closes over them
  const wMat = mat(0x2b2f36, 0.45, 0.4)
  lap.add(box(0.32, 0.013, 0.005, wMat, 0, 0.0275, -0.1075), box(0.32, 0.013, 0.005, wMat, 0, 0.0275, 0.1075), box(0.005, 0.013, 0.22, wMat, -0.1575, 0.0275, 0), box(0.005, 0.013, 0.22, wMat, 0.1575, 0.0275, 0))
  lap.add(box(0.31, 0.0008, 0.21, mat(0x111418, 0.8), 0, 0.0212, 0)) // the dark floor inside
  lap.add(box(0.2, 0.0012, 0.12, mat(0x0d4a2c, 0.65), 0.02, 0.0218, -0.04)) // motherboard
  // battery (front half) with its label
  const battery = rbox(0.24, 0.007, 0.075, mat(0x1c1f24, 0.5), 0.003, -0.01, 0.025, 0.058)
  lap.add(battery)
  const bLab = mesh(new THREE.PlaneGeometry(0.12, 0.04), new THREE.MeshStandardMaterial({ map: canvasTex(480, 160, c => {
    c.fillStyle = '#e5e7eb'; c.fillRect(0, 0, 480, 160); c.fillStyle = '#111827'; c.font = 'bold 34px sans-serif'; c.fillText('Li-ion BATTERY', 20, 54)
    c.font = '24px sans-serif'; c.fillText('11.4V  45Wh  3-cell', 20, 98); c.fillStyle = '#b91c1c'; c.fillText('Do not puncture or short', 20, 136)
  }) }), -0.01, 0.0287, 0.058)
  bLab.rotation.x = -Math.PI / 2
  lap.add(bLab)
  pick.battery = battery
  // the battery cable and its connector on the board
  lap.add(box(0.03, 0.0015, 0.008, mat(0x111827, 0.7), -0.075, 0.0225, 0.016))
  batteryPlug = new THREE.Group()
  batteryPlug.add(box(0.014, 0.004, 0.008, mat(0xf1f5f9, 0.5), 0, 0, 0))
  batteryPlug.add(box(0.004, 0.0012, 0.006, mat(0xdc2626, 0.5), -0.008, 0, -0.001), box(0.004, 0.0012, 0.006, mat(0x111827, 0.5), -0.008, 0, 0.0015))
  batteryPlug.position.set(-0.055, 0.0245, 0.011)
  lap.add(batteryPlug)
  pick['battery-plug'] = batteryPlug
  // fan and heat pipe
  const fanG = new THREE.Group()
  fanG.add(cyl(0.032, 0.006, mat(0x1f2937, 0.6), 0, 0, 0, 40))
  const blades = new THREE.Group()
  for (let i = 0; i < 9; i++) {
    const b = box(0.022, 0.002, 0.006, mat(0x374151, 0.5), Math.cos((i / 9) * Math.PI * 2) * 0.014, 0.004, Math.sin((i / 9) * Math.PI * 2) * 0.014)
    b.rotation.y = -(i / 9) * Math.PI * 2
    blades.add(b)
  }
  fanG.add(blades)
  fanG.position.set(-0.1, 0.0255, -0.05)
  lap.add(fanG)
  pick.fan = fanG
  lap.add(box(0.11, 0.003, 0.008, mat(0xb87333, 0.35, 0.8), -0.03, 0.0235, -0.06)) // heat pipe
  lap.add(box(0.03, 0.003, 0.03, mat(0x9ca3af, 0.3, 0.8), 0.02, 0.0235, -0.065)) // CPU heat plate
  // dust in the fan
  dust = new THREE.Group()
  for (let i = 0; i < 26; i++) dust.add(mesh(new THREE.SphereGeometry(0.0015 + Math.random() * 0.0015, 6, 5), mat(0x57534e, 1), -0.1 + (Math.random() - 0.5) * 0.05, 0.03, -0.05 + (Math.random() - 0.5) * 0.05))
  lap.add(dust)
  // RAM and Wi-Fi card
  const ram = box(0.067, 0.003, 0.03, mat(0x0d5a34, 0.6), -0.005, 0.025, -0.02)
  for (let i = 0; i < 4; i++) ram.add(box(0.012, 0.0015, 0.012, mat(0x16181b, 0.4), -0.024 + i * 0.016, 0.002, 0))
  lap.add(ram)
  pick.ram = ram
  const wifi = box(0.022, 0.0015, 0.03, mat(0x0d5a34, 0.6), 0.12, 0.024, 0.0)
  wifi.add(box(0.012, 0.0012, 0.012, mat(0xc0c5cc, 0.3, 0.9), 0, 0.0012, 0))
  lap.add(wifi)
  pick.wifi = wifi
  // the M.2 slot, its screw post, the old SSD and its screw
  lap.add(box(0.006, 0.004, 0.024, mat(0x111827, 0.5), M2.x - 0.002, 0.0235, M2.z))
  lap.add(cyl(0.0025, 0.004, mat(0xd4a017, 0.3, 0.9), M2.x + 0.0785, 0.0235, M2.z))
  oldSsd = ssdStick('256GB  SSD', true)
  oldSsd.position.set(M2.x, 0.025, M2.z)
  lap.add(oldSsd)
  pick['old-ssd'] = oldSsd
  ssdScrew = screw()
  ssdScrew.position.set(M2.x + 0.0785, 0.0265, M2.z)
  lap.add(ssdScrew)
  pick['ssd-screw'] = ssdScrew

  // ---- the bottom panel, with vents, screws and rubber feet
  panel = new THREE.Group()
  const pMat = mat(0x3a3f47, 0.5, 0.35)
  panel.add(rbox(0.318, 0.0025, 0.218, pMat, 0.0012, 0, 0, 0))
  for (let i = 0; i < 12; i++) panel.add(box(0.004, 0.0008, 0.04, mat(0x15181d, 0.8), -0.13 + i * 0.008, 0.0016, -0.05))
  const sticker = mesh(new THREE.PlaneGeometry(0.07, 0.035), new THREE.MeshStandardMaterial({ map: canvasTex(420, 210, c => {
    c.fillStyle = '#f8fafc'; c.fillRect(0, 0, 420, 210); c.fillStyle = '#111827'; c.font = 'bold 26px sans-serif'; c.fillText('TUSOME BOOK 14', 16, 40)
    c.font = '19px sans-serif'; ['Storage: M.2 2280 NVMe', 'Memory: 8GB DDR4', 'Input: 19V 2.37A', 'Made in 2024'].forEach((l, i) => c.fillText(l, 16, 80 + i * 32))
  }) }), 0.07, 0.0016, 0.045)
  sticker.rotation.x = -Math.PI / 2
  panel.add(sticker)
  // the seam to pry at, along the hinge edge
  const seam = box(0.3, 0.004, 0.006, new THREE.MeshBasicMaterial({ color: 0x0b0d10 }), 0, -0.0005, -0.109)
  panel.add(seam)
  pick.seam = seam
  const footPos: THREE.Vector3Tuple[] = [[-0.145, 0.002, -0.095], [0.145, 0.002, -0.095], [-0.145, 0.002, 0.095], [0.145, 0.002, 0.095]]
  footPos.forEach((p, i) => {
    const f = mesh(new THREE.CylinderGeometry(0.008, 0.009, 0.004, 24), mat(0x0b0b0b, 0.95), ...p)
    panel.add(f)
    if (i === 3) foot = f
  })
  pick.foot = foot
  const screwPos: [number, number][] = [[-0.12, -0.09], [0, -0.095], [0.12, -0.09], [-0.15, 0], [0.15, 0], [-0.12, 0.092], [0, 0.098], [-0.06, 0.04], [0.06, -0.02]]
  screws = screwPos.map(([x, z]) => {
    const sc = screw()
    sc.position.set(x, 0.0018, z)
    sc.userData.home = sc.position.clone()
    panel.add(sc)
    return sc
  })
  hiddenScrew = screw()
  hiddenScrew.position.set(0.145, 0.0018, 0.095)
  hiddenScrew.userData.home = hiddenScrew.position.clone()
  panel.add(hiddenScrew)
  panel.position.copy(PANEL_ON)
  s.add(panel)
  pick.panel = panel

  // ---- around the laptop: charger, strap, tray, new SSD, power button
  charger = new THREE.Group()
  charger.add(cyl(0.004, 0.03, mat(0x111827, 0.5), 0, 0, 0))
  charger.children[0].rotation.z = Math.PI / 2
  charger.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-0.015, 0, 0), new THREE.Vector3(-0.08, -0.004, 0.03), new THREE.Vector3(-0.15, -0.006, 0.12)]), 30, 0.0025, 8), mat(0x111827, 0.6)))
  charger.position.set(-0.176, 0.012, 0.05)
  s.add(charger)
  pick.charger = charger
  strap = new THREE.Group()
  const ring = mesh(new THREE.TorusGeometry(0.03, 0.006, 10, 30), mat(0x16a34a, 0.6))
  ring.rotation.x = Math.PI / 2
  strap.add(ring, box(0.014, 0.008, 0.02, mat(0x9ca3af, 0.3, 0.8), 0.035, 0, 0))
  strap.position.set(0.25, 0.008, 0.2)
  s.add(strap)
  pick.strap = strap
  tray = new THREE.Group()
  tray.add(rbox(0.09, 0.008, 0.06, mat(0x111827, 0.6, 0.3), 0.004, 0, 0.004, 0))
  tray.add(rbox(0.082, 0.004, 0.052, mat(0x2b2f36, 0.4, 0.6), 0.003, 0, 0.007, 0))
  tray.position.copy(TRAY).setY(0.003)
  s.add(tray)
  pick.tray = tray
  newSsd = ssdStick('512GB  NVMe')
  newSsd.position.set(0.2, 0.0045, 0.05)
  newSsd.rotation.y = 0.3
  s.add(newSsd)
  pick['new-ssd'] = newSsd
  const power = cyl(0.004, 0.003, mat(0x9ca3af, 0.3, 0.8), 0.162, 0.012, -0.06)
  power.rotation.z = Math.PI / 2
  s.add(power)
  pick.power = power

  // ---- tapping and hovering
  const targets = () => [...Object.values(pick), ...screws.filter(sc => sc.parent === panel), hiddenScrew]
  const nameOf = (o: THREE.Object3D | null) => {
    if (!o) return ''
    if (screws.includes(o as THREE.Group)) return NAMES.screw
    if (o === hiddenScrew) return NAMES.hidden
    return NAMES[Object.keys(pick).find(k => pick[k] === o) || ''] || ''
  }
  const keyOf = (o: THREE.Object3D): string => {
    if (screws.includes(o as THREE.Group)) return `screw:${screws.indexOf(o as THREE.Group)}`
    if (o === hiddenScrew) return 'hidden'
    return Object.keys(pick).find(k => pick[k] === o) || ''
  }
  let down: { x: number; y: number } | null = null
  w.canvas.addEventListener('pointerdown', e => (down = { x: e.clientX, y: e.clientY }))
  w.canvas.addEventListener('pointerup', e => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return
    const hit = w.pick(e, targets())
    if (hit) emit('tap', keyOf(hit))
  })
  w.canvas.addEventListener('pointermove', e => {
    const hit = w.pick(e, targets())
    hoverName.value = nameOf(hit)
    const r = w.canvas.getBoundingClientRect()
    hoverAt.value = { x: e.clientX - r.left, y: e.clientY - r.top }
  })

  w.onFrame(dt => {
    // the fan turns while the laptop is running (the test)
    if (props.done.includes('test')) blades.rotation.y += dt * 25
    // what to tap glows
    const t = props.glow ? glowTarget() : null
    for (const o of [...Object.values(pick), ...screws, hiddenScrew]) setEmissive(o, 0, 0)
    if (t) for (const o of t) setEmissive(o, 0xfacc15, 0.35 + 0.3 * Math.sin(performance.now() / 200))
    if (camGoal) {
      const k = 1 - Math.exp(-dt * 3.5)
      w.camera.position.lerp(camGoal.pos, k)
      w.controls.target.lerp(camGoal.target, k)
      if (w.camera.position.distanceTo(camGoal.pos) < 0.002) camGoal = null
    }
  })
  apply(true)
})

function glowTarget(): THREE.Object3D[] | null {
  const t = props.target
  if (!t) return null
  if (t === 'screw') return screws.filter(sc => sc.parent === panel)
  if (t === 'foot') return foot.visible ? [foot] : [hiddenScrew]
  return pick[t] ? [pick[t]] : null
}

// ------------------------------------------------------------------ follow the steps
const has = (k: string) => props.done.includes(k)
const Q = (x = 0, y = 0, z = 0) => new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z))
const trayPos = (i: number) => new THREE.Vector3(TRAY.x - 0.03 + (i % 5) * 0.014, 0.012, TRAY.z - 0.012 + Math.floor(i / 5) * 0.022)

function apply(instant = false) {
  const w = wb.value
  if (!w || !panel) return
  const ms = instant ? 1 : 650
  // charger out
  w.moveTo(charger, new THREE.Vector3(has('charger') ? -0.24 : -0.176, 0.012, has('charger') ? 0.09 : 0.05), undefined, ms)
  // strap on (it moves to the edge of the mat, clipped)
  w.moveTo(strap, has('strap') ? new THREE.Vector3(0.32, 0.008, 0.3) : new THREE.Vector3(0.25, 0.008, 0.2), undefined, ms)
  // panel screws: out into the tray, or home in the panel
  const closed = has('close')
  screws.forEach((sc, i) => {
    const out = !closed && i < props.screwsOut
    if (out && sc.parent === panel) {
      panel.updateMatrixWorld(true)
      const wp = sc.getWorldPosition(new THREE.Vector3())
      panel.remove(sc)
      w.scene.add(sc)
      sc.position.copy(wp)
      w.moveTo(sc, trayPos(i), undefined, ms, 0.04)
    } else if (!out && sc.parent !== panel) {
      w.scene.remove(sc)
      panel.add(sc)
      sc.position.copy(sc.userData.home)
    }
  })
  // the rubber foot, and the screw hiding under it
  foot.visible = !(has('foot') || hiddenFootUp.value) || closed
  const hiddenOut = has('foot') && !closed
  if (hiddenOut && hiddenScrew.parent === panel) {
    panel.updateMatrixWorld(true)
    const wp = hiddenScrew.getWorldPosition(new THREE.Vector3())
    panel.remove(hiddenScrew)
    w.scene.add(hiddenScrew)
    hiddenScrew.position.copy(wp)
    w.moveTo(hiddenScrew, trayPos(9), undefined, ms, 0.04)
  } else if (!hiddenOut && hiddenScrew.parent !== panel) {
    w.scene.remove(hiddenScrew)
    panel.add(hiddenScrew)
    hiddenScrew.position.copy(hiddenScrew.userData.home)
  }
  // the panel: off once pried, back on when closed
  const off = has('pry') && !closed
  w.moveTo(panel, off ? PANEL_OFF : PANEL_ON, off ? Q(0, 0.2, 0) : Q(), ms, off ? 0.08 : 0.05)
  // battery connector
  const unplugged = has('battery') && !has('reconnect')
  w.moveTo(batteryPlug, new THREE.Vector3(unplugged ? -0.072 : -0.055, unplugged ? 0.03 : 0.0245, 0.011), undefined, ms, 0.01)
  // SSD screw: out to the tray, and back on the new drive
  const screwOut = has('ssd-screw') && !has('ssd-fix')
  w.moveTo(ssdScrew, screwOut ? trayPos(11) : new THREE.Vector3(M2.x + 0.0785, has('ssd-in') ? 0.0265 : 0.0265, M2.z), undefined, ms, 0.03)
  // old SSD: out onto the mat (it springs up first)
  if (has('ssd-out')) {
    oldSsd.parent !== w.scene && (() => {
      const wp = oldSsd.getWorldPosition(new THREE.Vector3())
      oldSsd.parent?.remove(oldSsd)
      w.scene.add(oldSsd)
      oldSsd.position.copy(wp)
    })()
    w.moveTo(oldSsd, new THREE.Vector3(-0.27, 0.0045, 0.22), Q(0, -0.4, 0), ms, 0.06)
  }
  // new SSD: in the slot, at an angle then pressed flat
  if (has('ssd-in')) {
    if (!instant && newSsd.userData.state !== 'in') {
      w.moveTo(newSsd, new THREE.Vector3(M2.x, 0.032, M2.z), Q(0, 0, 0.5), 500, 0.05).then(() => w.moveTo(newSsd, new THREE.Vector3(M2.x, 0.025, M2.z), Q(), 350))
    } else w.moveTo(newSsd, new THREE.Vector3(M2.x, 0.025, M2.z), Q(), ms)
    newSsd.userData.state = 'in'
  }
  // dust blown away
  dust.visible = !has('fan')
  // views that follow the work
  if (!instant) {
    if (has('ssd-in') && !has('ssd-fix')) look('ssd')
  }
}
const hiddenFootUp = ref(false)
/** The page tells the scene the foot was peeled back (the first half of the hidden-screw step) */
function peelFoot() {
  hiddenFootUp.value = true
  if (foot) foot.visible = false
}
defineExpose({ look, peelFoot })

watch(() => [props.done.length, props.screwsOut], () => apply())

onBeforeUnmount(() => wb.value?.dispose())
</script>
