<template>
  <!-- The network cable end in 3D, real size, close up on the desk: the jacket, the four twisted
       pairs (tap one to untwist it), the eight wires fanned out in order, the clear RJ45 connector,
       the crimper and the tester. It only shows the state it is given (the activity decides what
       is done); wires glide from one shape to the next. No WebGL: emits `unsupported`. -->
  <div class="relative w-full h-[38vh] min-h-[240px] lg:h-[44vh] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
    <div ref="host" class="absolute inset-0" :class="hoverPair ? 'cursor-pointer' : 'cursor-grab'"></div>
    <div v-if="hoverPair" class="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-gray-900/85 text-white text-xs font-semibold pointer-events-none">
      {{ hoverPair }} pair - tap to untwist
    </div>
    <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
      <span class="px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">Drag to turn · pinch to zoom</span>
      <button type="button" class="pointer-events-auto px-2 py-1 rounded-lg bg-white/90 text-gray-800 text-[11px] font-semibold shadow-sm hover:bg-white" @click="wb?.resetView()">Reset view</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as THREE from 'three'
import { createWorkbench, type Workbench } from './three/workbench'
import { WIRES, type WireKey } from './activities'

const props = defineProps<{
  stripped: boolean
  untwisted: boolean
  // Pairs untwisted so far (before all four are)
  opened: string[]
  // The wires from pin 1, as drawn
  order: WireKey[]
  trimmed: boolean
  inserted: boolean
  crimped: boolean
  // Tester lights lit (0-8), and whether it is a crossover cable
  lit: number
  crossover: boolean
}>()
const emit = defineEmits<{ untwist: [pair: string]; unsupported: [] }>()

const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const hoverPair = ref('')

const PAIRS: { key: string; label: string; a: WireKey; b: WireKey; y: number; z: number }[] = [
  { key: 'orange', label: 'Orange', a: 'wo', b: 'o', y: 0.0012, z: -0.0012 },
  { key: 'green', label: 'Green', a: 'wg', b: 'g', y: 0.0012, z: 0.0012 },
  { key: 'blue', label: 'Blue', a: 'wb', b: 'b', y: -0.0012, z: 0.0012 },
  { key: 'brown', label: 'Brown', a: 'wbr', b: 'br', y: -0.0012, z: -0.0012 }
]
const PAIR_OF: Record<WireKey, { pair: (typeof PAIRS)[number]; second: boolean }> = {} as never
for (const p of PAIRS) {
  PAIR_OF[p.a] = { pair: p, second: false }
  PAIR_OF[p.b] = { pair: p, second: true }
}
const ALL: WireKey[] = ['wo', 'o', 'wg', 'g', 'wb', 'b', 'wbr', 'br']

// Real size, in metres. The cable lies along x; its end points to +x.
const Y = 0.0042 // cable centre above the desk
const JACKET_END = -0.025 // where the jacket stops once stripped
const SAMPLES = 40
const WIRE_R = 0.00048

let wires: Record<WireKey, { mesh: THREE.Mesh; shown: THREE.Vector3[]; target: THREE.Vector3[] }> = {} as never
let jacket: THREE.Mesh
let offcut: THREE.Mesh
let connector: THREE.Group
let pins: THREE.Mesh[] = []
let crimperJaws: THREE.Group
let tester: THREE.Group
let leds: THREE.MeshStandardMaterial[] = []
let remoteLeds: THREE.MeshStandardMaterial[] = []
const pairHit: THREE.Mesh[] = []

// A white wire with a coloured stripe, or a plain one
function wireMaterial(w: WireKey) {
  const c = WIRES[w]
  if (!c.stripe) return new THREE.MeshStandardMaterial({ color: c.color, roughness: 0.45 })
  const cv = document.createElement('canvas')
  cv.width = 64
  cv.height = 8
  const g = cv.getContext('2d')!
  g.fillStyle = c.color
  g.fillRect(0, 0, 64, 8)
  g.fillStyle = c.stripe
  g.fillRect(0, 0, 22, 8)
  const t = new THREE.CanvasTexture(cv)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = THREE.RepeatWrapping
  t.repeat.set(14, 1)
  return new THREE.MeshStandardMaterial({ map: t, roughness: 0.45 })
}

// Where every wire should be, from the state given
function targets() {
  const fanZ = (i: number) => (i - 3.5) * 0.00125
  const tipX = (i: number) => (props.trimmed ? -0.0015 : 0.004 + ((i * 37) % 5) * 0.0024)
  for (const w of ALL) {
    const pts: THREE.Vector3[] = []
    const { pair, second } = PAIR_OF[w]
    const twisted = !props.untwisted && !props.opened.includes(pair.key)
    const slot = props.order.indexOf(w)
    const i = slot >= 0 ? slot : ALL.indexOf(w)
    const end = tipX(i)
    for (let s = 0; s < SAMPLES; s++) {
      const f = s / (SAMPLES - 1)
      if (!props.stripped) {
        // still inside the jacket
        pts.push(new THREE.Vector3(-0.03 + f * 0.028, Y + pair.y * 0.6, pair.z * 0.6 + (second ? 0.0004 : -0.0004)))
        continue
      }
      const x = JACKET_END + f * (end - JACKET_END)
      if (twisted) {
        const a = (x - JACKET_END) / 0.0065 * Math.PI * 2 + (second ? Math.PI : 0)
        pts.push(new THREE.Vector3(x, Y + pair.y + Math.cos(a) * 0.00055, pair.z + Math.sin(a) * 0.00055))
      } else {
        // out of the jacket, then fanned flat side by side
        const k = Math.min(1, f / 0.35)
        const e = k * k * (3 - 2 * k)
        const y0 = Y + pair.y + (second ? -0.0004 : 0.0004)
        pts.push(new THREE.Vector3(x, y0 + (Y - y0) * e, pair.z + (fanZ(i) - pair.z) * e))
      }
    }
    wires[w].target = pts
  }
}

function rebuild(w: WireKey) {
  const m = wires[w].mesh
  m.geometry.dispose()
  m.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wires[w].shown), SAMPLES * 2, WIRE_R, 8, false)
}

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  try {
    const narrow = host.value.clientWidth < 640
    wb.value = createWorkbench(host.value, { cameraPosition: narrow ? [0.02, 0.06, 0.075] : [0.014, 0.04, 0.05], target: [-0.008, 0.004, 0], minDistance: 0.03, maxDistance: 0.35, near: 0.004 })
  } catch {
    emit('unsupported')
    return
  }
  const w = wb.value
  const scene = w.scene

  // the jacket, and the bit of it that comes off
  jacket = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 1, 32), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.55 }))
  jacket.rotation.z = Math.PI / 2
  jacket.castShadow = true
  scene.add(jacket)
  offcut = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.025, 32), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.55 }))
  offcut.rotation.z = Math.PI / 2
  offcut.castShadow = true
  offcut.visible = false
  scene.add(offcut)

  // the eight wires
  wires = {} as typeof wires
  for (const k of ALL) {
    const mesh = new THREE.Mesh(new THREE.BufferGeometry(), wireMaterial(k))
    mesh.castShadow = true
    scene.add(mesh)
    wires[k] = { mesh, shown: [], target: [] }
  }
  targets()
  for (const k of ALL) {
    wires[k].shown = wires[k].target.map(p => p.clone())
    rebuild(k)
  }

  // invisible fat targets over each twisted pair, to tap
  for (const p of PAIRS) {
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(0.0014, 0.0014, 0.026, 8), new THREE.MeshBasicMaterial({ visible: false }))
    hit.rotation.z = Math.PI / 2
    hit.position.set(JACKET_END + 0.013, Y + p.y, p.z)
    hit.userData.pair = p.key
    scene.add(hit)
    pairHit.push(hit)
  }

  // the clear RJ45 connector: body, clip underneath, gold pins along the top front
  connector = new THREE.Group()
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.0083, 0.0115), new THREE.MeshPhysicalMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0, transmission: 0.5 }))
  connector.add(body)
  const clip = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.0012, 0.004), new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.7 }))
  clip.position.set(-0.002, -0.0052, 0)
  clip.rotation.z = -0.25
  connector.add(clip)
  pins = []
  for (let i = 0; i < 8; i++) {
    const pin = new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.0016, 0.0004), new THREE.MeshStandardMaterial({ color: 0xd4a017, metalness: 0.9, roughness: 0.25 }))
    pin.position.set(0.007, 0.0046, (i - 3.5) * 0.00125)
    connector.add(pin)
    pins.push(pin)
  }
  connector.position.set(0.05, Y, 0.03)
  connector.visible = false
  scene.add(connector)

  // the crimping tool's jaws (only while crimping)
  crimperJaws = new THREE.Group()
  const jawMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.35 })
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.006, 0.02), jawMat)
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.006, 0.02), jawMat)
  top.name = 'top'
  bottom.name = 'bottom'
  crimperJaws.add(top, bottom)
  crimperJaws.position.set(-0.01, Y, 0)
  crimperJaws.visible = false
  scene.add(crimperJaws)

  // the cable tester, beside the cable: two rows of eight lights
  tester = new THREE.Group()
  tester.add(new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.01, 0.024), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 })))
  leds = []
  remoteLeds = []
  for (let i = 0; i < 8; i++) {
    for (const [row, list] of [[-0.006, leds], [0.006, remoteLeds]] as const) {
      const m = new THREE.MeshStandardMaterial({ color: 0x14532d, emissive: 0x000000, roughness: 0.3 })
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.0011, 10, 10), m)
      led.position.set(-0.0154 + i * 0.0044, 0.0055, row * 0.8)
      tester.add(led)
      list.push(m)
    }
  }
  tester.position.set(0.012, 0.005, -0.032)
  tester.rotation.y = -0.15
  tester.visible = false
  scene.add(tester)

  applyState(false)

  // wires glide to where they should be; the bits of animation run here too
  w.onFrame(dt => {
    const k = 1 - Math.exp(-dt * 9)
    for (const key of ALL) {
      const wire = wires[key]
      let moved = false
      for (let s = 0; s < SAMPLES; s++) {
        const a = wire.shown[s]
        const b = wire.target[s]
        if (a.distanceToSquared(b) > 1e-12) {
          a.lerp(b, k)
          moved = true
        }
      }
      if (moved) rebuild(key)
    }
    if (crimpT >= 0) animateCrimp(dt)
  })

  w.canvas.addEventListener('pointermove', onMove)
  w.canvas.addEventListener('pointerdown', onDown)
  w.canvas.addEventListener('pointerup', onUp)
})

onBeforeUnmount(() => wb.value?.dispose())

// ---- what the state looks like ----
function applyState(animate: boolean) {
  const w = wb.value
  if (!w) return
  const jacketEnd = props.stripped ? JACKET_END : 0
  jacket.scale.y = jacketEnd + 0.3
  jacket.position.set((jacketEnd - 0.3) / 2, Y, 0)
  // Inserted: the connector sits over the wires, its back gripping the jacket
  const at = new THREE.Vector3(-0.0098, Y, 0)
  if (props.inserted) {
    if (!connector.visible) {
      connector.visible = true
      if (animate) {
        connector.position.set(0.04, Y, 0)
        w.moveTo(connector, at, undefined, 600)
      } else connector.position.copy(at)
    }
  } else connector.visible = false
  for (const p of pins) p.position.y = props.crimped ? 0.0034 : 0.0046
  tester.visible = props.lit > 0 || props.crimped
  for (let i = 0; i < 8; i++) {
    const on = props.lit >= i + 1
    leds[i].emissive.setHex(on ? 0x22c55e : 0)
    leds[i].emissiveIntensity = on ? 2.5 : 0
    const CROSS: Record<number, number> = { 1: 3, 2: 6, 3: 1, 6: 2 }
    const from = props.crossover ? Number(Object.entries(CROSS).find(([, to]) => to === i + 1)?.[0] ?? i + 1) : i + 1
    const ron = props.lit >= from
    remoteLeds[i].emissive.setHex(ron ? 0x22c55e : 0)
    remoteLeds[i].emissiveIntensity = ron ? 2.5 : 0
  }
  pairHit.forEach(h => { h.visible = props.stripped && !props.untwisted && !props.opened.includes(h.userData.pair) })
}

watch(() => [props.stripped, props.untwisted, props.opened.join(), props.order.join(), props.trimmed, props.inserted, props.crimped, props.lit, props.crossover], (_now, before) => {
  if (!wb.value) return
  // the jacket slides off as it is stripped
  if (props.stripped && before && !before[0]) stripOff()
  if (props.crimped && before && !before[6]) crimpT = 0
  // a new cable end (crossover, end 2): start the wires from inside the jacket again
  targets()
  applyState(true)
})

function stripOff() {
  const w = wb.value
  if (!w) return
  offcut.visible = true
  offcut.position.set(JACKET_END + 0.0125, Y, 0)
  w.moveTo(offcut, new THREE.Vector3(0.045, 0.003, 0.02), undefined, 700, 0.012).then(() => {
    setTimeout(() => { offcut.visible = false }, 900)
  })
}

// The crimper closes and opens over 1.1 s of real time (not frames - a slow device skips frames)
let crimpT = -1
let crimpStart = 0
function animateCrimp(_dt: number) {
  if (crimpT === 0) crimpStart = performance.now()
  crimpT = Math.max(1e-6, (performance.now() - crimpStart) / 1000)
  crimperJaws.visible = crimpT < 1.1
  const close = Math.sin(Math.min(1, crimpT / 1.1) * Math.PI)
  const gap = 0.012 - close * 0.006
  crimperJaws.getObjectByName('top')!.position.y = gap
  crimperJaws.getObjectByName('bottom')!.position.y = -gap
  if (crimpT >= 1.1) crimpT = -1
}

// ---- tapping a twisted pair ----
let down: { x: number; y: number } | null = null
function onMove(ev: PointerEvent) {
  const hit = wb.value?.pick(ev, pairHit)
  hoverPair.value = hit ? PAIRS.find(p => p.key === hit.userData.pair)?.label || '' : ''
}
function onDown(ev: PointerEvent) {
  down = { x: ev.clientX, y: ev.clientY }
}
function onUp(ev: PointerEvent) {
  if (!down || Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 6) return
  down = null
  const hit = wb.value?.pick(ev, pairHit)
  if (hit) emit('untwist', hit.userData.pair)
}
</script>
