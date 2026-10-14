import * as THREE from 'three'

/**
 * A desktop computer in 3D, built from simple shapes (no model files to download): an open tower
 * case standing on the desk with its side panel off, and every part. Sizes are real, in metres.
 * The case's open side faces the viewer (+z); its front is on the left (-x), its back on the right.
 *
 * Each part is its own group, built the way it sits in the case, so fitting it is just moving it
 * to its `anchor`. `desk` is where it lies on the desk before it is fitted.
 */
export type PcPartKey = 'motherboard' | 'cpu' | 'cooler' | 'ram' | 'psu' | 'hdd' | 'ssd' | 'gpu' | 'optical' | 'casefan'
export type ConnectorKey = 'cpu_fan' | 'atx24' | 'sata' | 'fpanel'
export interface Pose { pos: THREE.Vector3; quat: THREE.Quaternion }

export interface PcRig {
  /** The case shell (not a part) */
  shell: THREE.Group
  parts: Record<PcPartKey, THREE.Group>
  anchors: Record<PcPartKey, Pose>
  desk: Partial<Record<PcPartKey, Pose>>
  /** Pickable bits that are not whole parts: on the motherboard (they move with it) */
  cmos: THREE.Object3D
  ports: THREE.Object3D
  connectors: Record<ConnectorKey, THREE.Object3D>
  connectorLabels: Record<ConnectorKey, THREE.Sprite>
  /** Cables, shown once connected */
  cables: { sata: THREE.Object3D; atx24: THREE.Object3D; cpu_fan: THREE.Object3D; fpanel: THREE.Object3D; mainsIn: THREE.Object3D; mainsOut: THREE.Object3D; strap: THREE.Object3D }
  sidePanel: THREE.Object3D
  sidePanelOpen: Pose
  sidePanelClosed: Pose
  powerButton: THREE.Object3D
  powerLed: THREE.MeshStandardMaterial
  mainsPlug: THREE.Object3D
  strapCoil: THREE.Object3D
  pasteTube: THREE.Object3D
  pasteDot: THREE.Object3D
  /** Fan blades and how they turn */
  spinners: { obj: THREE.Object3D; axis: 'x' | 'y' | 'z'; speed: number; group: PcPartKey }[]
}

const Y0 = 0.012 // the case floor, above its feet

const std = (color: number, metal = 0.1, rough = 0.6) => new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough })

function box(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  m.position.set(x, y, z)
  m.castShadow = true
  m.receiveShadow = true
  return m
}
function cyl(r: number, h: number, mat: THREE.Material, axis: 'x' | 'y' | 'z', x = 0, y = 0, z = 0, seg = 28) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat)
  if (axis === 'x') m.rotation.z = Math.PI / 2
  if (axis === 'z') m.rotation.x = Math.PI / 2
  m.position.set(x, y, z)
  m.castShadow = true
  return m
}

/** Text drawn on a little plate (a label on a part's face) */
export function textTexture(text: string, opts: { bg?: string; fg?: string; w?: number; h?: number; font?: string } = {}) {
  const w = opts.w ?? 256
  const h = opts.h ?? 64
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')!
  if (opts.bg) {
    g.fillStyle = opts.bg
    g.fillRect(0, 0, w, h)
  }
  g.fillStyle = opts.fg ?? '#ffffff'
  g.font = opts.font ?? `bold ${Math.round(h * 0.5)}px system-ui, sans-serif`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(text, w / 2, h / 2 + 1)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}
function label(text: string, w: number, h: number, opts: Parameters<typeof textTexture>[1] = {}) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: textTexture(text, opts), transparent: !opts.bg }))
  return m
}
export function tagSprite(text: string, color = '#facc15') {
  const t = textTexture(text, { bg: 'rgba(15,23,42,0.85)', fg: color, w: 256, h: 64 })
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false }))
  s.scale.set(0.05, 0.0125, 1)
  s.renderOrder = 10
  return s
}

// A fan: a dark ring, a hub and angled blades (in `blades`, which spins about the fan's axis)
function fan(r: number, depth: number, axis: 'x' | 'y' | 'z') {
  const g = new THREE.Group()
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r, r * 0.09, 10, 40), std(0x111827, 0.2, 0.5))
  const hub = cyl(r * 0.28, depth, std(0x1f2937, 0.3, 0.4), 'z')
  const blades = new THREE.Group()
  const bladeMat = std(0x334155, 0.2, 0.45)
  for (let i = 0; i < 7; i++) {
    const b = box(r * 0.75, r * 0.32, depth * 0.35, bladeMat)
    b.position.set(Math.cos((i / 7) * Math.PI * 2) * r * 0.55, Math.sin((i / 7) * Math.PI * 2) * r * 0.55, 0)
    b.rotation.z = (i / 7) * Math.PI * 2
    b.rotation.x = 0.45
    blades.add(b)
  }
  g.add(ring, hub, blades)
  if (axis === 'x') g.rotation.y = Math.PI / 2
  if (axis === 'y') g.rotation.x = Math.PI / 2
  return { group: g, blades }
}

function tube(points: THREE.Vector3Tuple[], radius: number, mat: THREE.Material) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)))
  const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, radius, 10, false), mat)
  m.castShadow = true
  return m
}

const Q = (x = 0, y = 0, z = 0) => new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z))
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

export function buildPc(): PcRig {
  // ---- the case shell ----
  const shell = new THREE.Group()
  const caseMat = std(0x1f2937, 0.55, 0.45)
  const innerMat = std(0x2b3542, 0.5, 0.55)
  shell.add(box(0.42, 0.44, 0.004, innerMat, 0, Y0 + 0.22, -0.098)) // motherboard tray (far side)
  shell.add(box(0.42, 0.004, 0.2, caseMat, 0, Y0 + 0.438, 0)) // top
  shell.add(box(0.42, 0.004, 0.2, caseMat, 0, Y0 + 0.002, 0)) // bottom
  shell.add(box(0.006, 0.44, 0.2, std(0x111827, 0.3, 0.5), -0.207, Y0 + 0.22, 0)) // front
  shell.add(box(0.004, 0.44, 0.2, caseMat, 0.208, Y0 + 0.22, 0)) // back
  // front: a mesh strip and a badge
  const frontMesh = box(0.002, 0.3, 0.16, std(0x0b1220, 0.2, 0.8), -0.211, Y0 + 0.2, 0)
  shell.add(frontMesh)
  // back: the I/O cut-out and expansion slot covers
  shell.add(box(0.002, 0.16, 0.044, std(0x0b1220), 0.211, Y0 + 0.26, -0.074))
  for (let i = 0; i < 5; i++) shell.add(box(0.002, 0.012, 0.11, std(0x6b7280, 0.7, 0.4), 0.211, Y0 + 0.17 - i * 0.02, -0.02))
  for (const [x, z] of [[-0.18, -0.08], [0.18, -0.08], [-0.18, 0.08], [0.18, 0.08]]) shell.add(cyl(0.012, 0.012, std(0x0f172a), 'y', x, 0.006, z))
  // drive cage at the front
  shell.add(box(0.16, 0.32, 0.002, std(0x475569, 0.6, 0.4), -0.128, Y0 + 0.24, -0.075))
  for (const y of [0.105, 0.175, 0.355]) shell.add(box(0.15, 0.003, 0.006, std(0x94a3b8, 0.8, 0.3), -0.13, Y0 + y, 0.07))
  // the power button and its light, on the front
  const powerButton = cyl(0.009, 0.005, std(0x9ca3af, 0.8, 0.3), 'x', -0.212, Y0 + 0.405, 0.035)
  shell.add(powerButton)
  const powerLed = new THREE.MeshStandardMaterial({ color: 0x14532d, emissive: 0x000000, roughness: 0.3 })
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.003, 12, 12), powerLed)
  led.position.set(-0.212, Y0 + 0.405, 0.058)
  shell.add(led)

  const parts = {} as Record<PcPartKey, THREE.Group>
  const anchors = {} as Record<PcPartKey, Pose>
  const spinners: PcRig['spinners'] = []

  // ---- motherboard (with what is soldered on it) ----
  const BOARD = V(0.068, Y0 + 0.1875, -0.093)
  const mb = new THREE.Group()
  mb.add(box(0.244, 0.305, 0.004, std(0x14532d, 0.2, 0.7)))
  mb.add(box(0.05, 0.05, 0.004, std(0xd1d5db, 0.5, 0.4), -0.047, 0.078, 0.004)) // CPU socket
  mb.add(box(0.034, 0.002, 0.003, std(0x9ca3af, 0.8, 0.3), -0.047, 0.106, 0.004)) // socket lever
  for (const x of [0.035, 0.05]) mb.add(box(0.007, 0.135, 0.009, std(0x0f172a), x, 0.06, 0.006)) // RAM slots
  mb.add(box(0.09, 0.008, 0.011, std(0x0f172a), 0.02, -0.035, 0.007)) // PCIe x16
  mb.add(box(0.05, 0.007, 0.009, std(0x0f172a), 0.0, -0.075, 0.006)) // PCIe x1
  mb.add(box(0.04, 0.04, 0.012, std(0x9ca3af, 0.8, 0.3), 0.04, -0.105, 0.008)) // chipset heat sink
  mb.add(box(0.012, 0.06, 0.016, std(0x64748b, 0.8, 0.35), -0.088, 0.085, 0.009)) // power-stage heat sinks
  mb.add(box(0.06, 0.012, 0.016, std(0x64748b, 0.8, 0.35), -0.045, 0.133, 0.009))
  for (let i = 0; i < 6; i++) mb.add(cyl(0.003, 0.008, std(0x111827, 0.6, 0.3), 'z', -0.07 + i * 0.008, 0.032, 0.006)) // capacitors
  const atx24 = box(0.008, 0.052, 0.014, std(0xf8fafc, 0, 0.6), 0.112, 0.02, 0.008)
  const sata = new THREE.Group()
  sata.add(box(0.012, 0.006, 0.008, std(0x0f172a), -0.112, -0.05, 0.005), box(0.012, 0.006, 0.008, std(0x0f172a), -0.112, -0.062, 0.005))
  const cpuFanHeader = box(0.012, 0.006, 0.008, std(0xf8fafc, 0, 0.6), 0.02, 0.13, 0.005)
  const fpanel = box(0.022, 0.006, 0.008, std(0x0f172a), -0.06, -0.142, 0.005)
  mb.add(atx24, sata, cpuFanHeader, fpanel)
  const cmos = cyl(0.01, 0.0032, std(0xe5e7eb, 0.9, 0.25), 'z', -0.07, -0.1, 0.004)
  mb.add(cmos)
  const ports = new THREE.Group()
  ports.add(box(0.02, 0.16, 0.035, std(0x9ca3af, 0.7, 0.35), 0, 0, 0))
  ports.add(box(0.002, 0.014, 0.012, std(0x2563eb), 0.011, 0.05, 0), box(0.002, 0.014, 0.012, std(0x2563eb), 0.011, 0.03, 0))
  ports.add(box(0.002, 0.016, 0.016, std(0xfde68a), 0.011, 0.005, 0)) // RJ45
  ports.add(box(0.002, 0.012, 0.022, std(0x1e3a8a), 0.011, -0.025, 0)) // VGA
  ports.add(cyl(0.004, 0.003, std(0x22c55e), 'x', 0.011, -0.055, -0.008), cyl(0.004, 0.003, std(0xec4899), 'x', 0.011, -0.055, 0.008))
  ports.position.set(0.112, 0.07, 0.02)
  mb.add(ports)
  parts.motherboard = mb
  anchors.motherboard = { pos: BOARD.clone(), quat: Q() }
  const onBoard = (x: number, y: number, z: number) => BOARD.clone().add(V(x, y, z))

  // ---- processor ----
  const cpu = new THREE.Group()
  cpu.add(box(0.0375, 0.0375, 0.0015, std(0x065f46, 0.2, 0.6), 0, 0, 0.00075))
  cpu.add(box(0.03, 0.03, 0.003, std(0xcbd5e1, 0.9, 0.25), 0, 0, 0.003))
  const tri = new THREE.Mesh(new THREE.CircleGeometry(0.003, 3), new THREE.MeshBasicMaterial({ color: 0xfacc15 }))
  tri.position.set(-0.016, -0.016, 0.0016)
  cpu.add(tri)
  parts.cpu = cpu
  anchors.cpu = { pos: onBoard(-0.047, 0.078, 0.006), quat: Q() }

  // ---- CPU cooler: a finned heat sink with a fan on the front ----
  const cooler = new THREE.Group()
  cooler.add(box(0.08, 0.08, 0.006, std(0xb45309, 0.9, 0.3), 0, 0, 0.003)) // copper base
  const finMat = std(0xd1d5db, 0.85, 0.3)
  for (let i = 0; i < 13; i++) cooler.add(box(0.08, 0.0012, 0.044, finMat, 0, -0.036 + i * 0.006, 0.028))
  const cf = fan(0.038, 0.012, 'z')
  cf.group.position.set(0, 0, 0.058)
  cooler.add(cf.group)
  spinners.push({ obj: cf.blades, axis: 'z', speed: 14, group: 'cooler' })
  parts.cooler = cooler
  anchors.cooler = { pos: onBoard(-0.047, 0.078, 0.0095), quat: Q() }

  // ---- memory: two sticks ----
  const ram = new THREE.Group()
  for (const x of [0, 0.015]) {
    ram.add(box(0.0015, 0.133, 0.031, std(0x064e3b, 0.2, 0.6), x, 0, 0.0155))
    ram.add(box(0.004, 0.13, 0.026, std(0x1d4ed8, 0.6, 0.35), x, 0, 0.016))
    ram.add(box(0.0045, 0.126, 0.003, std(0xfacc15, 0.9, 0.3), x, 0, 0.0015))
  }
  parts.ram = ram
  anchors.ram = { pos: onBoard(0.035, 0.06, 0.009), quat: Q() }

  // ---- graphics card: board flat, fans facing down, bracket at the back ----
  const gpu = new THREE.Group()
  gpu.add(box(0.22, 0.002, 0.11, std(0x064e3b, 0.2, 0.6), 0, 0, 0.055))
  gpu.add(box(0.22, 0.004, 0.11, std(0x111827, 0.6, 0.4), 0, 0.003, 0.055)) // backplate
  gpu.add(box(0.22, 0.03, 0.11, std(0x1f2937, 0.4, 0.45), 0, -0.016, 0.055)) // shroud
  for (const x of [-0.05, 0.05]) {
    const gf = fan(0.035, 0.006, 'y')
    gf.group.position.set(x, -0.032, 0.058)
    gpu.add(gf.group)
    spinners.push({ obj: gf.blades, axis: 'z', speed: 9, group: 'gpu' })
  }
  gpu.add(box(0.07, 0.003, 0.008, std(0xfacc15, 0.9, 0.3), -0.01, 0, 0.002)) // gold contacts
  gpu.add(box(0.002, 0.04, 0.02, std(0x9ca3af, 0.8, 0.3), 0.11, -0.012, 0.03)) // bracket
  const gpuStripe = box(0.2, 0.002, 0.004, new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x4338ca, emissiveIntensity: 0.6 }), 0, -0.016, 0.111)
  gpu.add(gpuStripe)
  parts.gpu = gpu
  anchors.gpu = { pos: onBoard(0.03, -0.035, 0.012), quat: Q() }

  // ---- power supply at the top ----
  const psu = new THREE.Group()
  psu.add(box(0.15, 0.086, 0.14, std(0x374151, 0.6, 0.4)))
  const psuLabel = label('ATX 500W', 0.09, 0.024, { bg: '#111827', fg: '#e5e7eb' })
  psuLabel.position.set(-0.02, 0.01, 0.0705)
  psu.add(psuLabel)
  const pf = fan(0.05, 0.004, 'y')
  pf.group.position.set(0, -0.0435, 0)
  psu.add(pf.group)
  spinners.push({ obj: pf.blades, axis: 'z', speed: 7, group: 'psu' })
  psu.add(box(0.003, 0.02, 0.026, std(0x0f172a), 0.0755, 0.012, 0.03)) // mains socket
  psu.add(box(0.003, 0.012, 0.016, std(0xef4444), 0.0755, -0.02, 0.03)) // switch
  parts.psu = psu
  anchors.psu = { pos: V(0.13, Y0 + 0.388, 0.0), quat: Q() }

  // ---- drives ----
  const hdd = new THREE.Group()
  hdd.add(box(0.146, 0.026, 0.102, std(0x9ca3af, 0.8, 0.35)))
  const hddLabel = label('HDD 1TB', 0.08, 0.02, { bg: '#f8fafc', fg: '#334155' })
  hddLabel.position.set(0, 0, 0.0515)
  hdd.add(hddLabel)
  hdd.add(box(0.004, 0.008, 0.03, std(0x0f172a), 0.074, 0, -0.02))
  parts.hdd = hdd
  anchors.hdd = { pos: V(-0.137, Y0 + 0.19, -0.02), quat: Q() }

  const ssd = new THREE.Group()
  ssd.add(box(0.1, 0.007, 0.07, std(0x1e3a8a, 0.4, 0.4)))
  const ssdLabel = label('SSD', 0.05, 0.0065, { bg: '#1e3a8a', fg: '#bfdbfe', w: 256, h: 40 })
  ssdLabel.position.set(0, 0, 0.0352)
  ssd.add(ssdLabel)
  parts.ssd = ssd
  anchors.ssd = { pos: V(-0.15, Y0 + 0.12, -0.02), quat: Q() }

  const optical = new THREE.Group()
  optical.add(box(0.17, 0.042, 0.146, std(0x111827, 0.4, 0.5)))
  optical.add(box(0.003, 0.036, 0.14, std(0x1f2937, 0.3, 0.4), -0.0865, 0, 0))
  optical.add(box(0.001, 0.004, 0.08, std(0x475569), -0.0885, 0.004, 0))
  parts.optical = optical
  anchors.optical = { pos: V(-0.122, Y0 + 0.375, -0.02), quat: Q() }

  // ---- rear case fan ----
  const casefan = new THREE.Group()
  casefan.add(box(0.012, 0.092, 0.092, std(0x0f172a, 0.2, 0.6)))
  const rf = fan(0.042, 0.01, 'x')
  rf.group.position.set(-0.002, 0, 0)
  casefan.add(rf.group)
  spinners.push({ obj: rf.blades, axis: 'z', speed: 8, group: 'casefan' })
  parts.casefan = casefan
  anchors.casefan = { pos: V(0.198, Y0 + 0.27, 0.035), quat: Q() }

  // Everything starts fitted; an activity moves parts to the desk as it needs
  for (const k of Object.keys(parts) as PcPartKey[]) {
    parts[k].position.copy(anchors[k].pos)
    parts[k].quaternion.copy(anchors[k].quat)
    parts[k].userData.part = k
  }

  // Where parts lie on the desk before they are fitted (to the right of the case)
  const desk: PcRig['desk'] = {
    motherboard: { pos: V(0.6, 0.004, -0.09), quat: Q(-Math.PI / 2) },
    psu: { pos: V(0.35, 0.044, -0.17), quat: Q() },
    hdd: { pos: V(0.34, 0.014, 0.02), quat: Q() },
    gpu: { pos: V(0.58, 0.037, 0.2), quat: Q() },
    ram: { pos: V(0.33, 0.004, 0.16), quat: Q(0, 0, Math.PI / 2) },
    cpu: { pos: V(0.26, 0.002, 0.32), quat: Q(-Math.PI / 2) },
    cooler: { pos: V(0.38, 0.0, 0.33), quat: Q(-Math.PI / 2) }
  }

  // ---- connectors and their labels ----
  const connectors: PcRig['connectors'] = { cpu_fan: cpuFanHeader, atx24, sata, fpanel }
  // A connector is a few millimetres across - far too small to tap. Each gets a generous invisible
  // touch area in front of it (it stays clear of the parts around it).
  const touchSize: Record<ConnectorKey, THREE.Vector3Tuple> = { cpu_fan: [0.028, 0.022, 0.03], atx24: [0.024, 0.06, 0.03], sata: [0.028, 0.03, 0.03], fpanel: [0.04, 0.02, 0.03] }
  for (const k of Object.keys(connectors) as ConnectorKey[]) {
    const pad = new THREE.Mesh(new THREE.BoxGeometry(...touchSize[k]), new THREE.MeshBasicMaterial({ visible: false }))
    pad.position.z = 0.012
    pad.name = 'touch'
    connectors[k].add(pad)
  }
  const connectorLabels = {} as Record<ConnectorKey, THREE.Sprite>
  const labelAt: Record<ConnectorKey, [string, THREE.Vector3Tuple]> = {
    cpu_fan: ['CPU_FAN', [0.032, 0.148, 0.03]],
    atx24: ['24-PIN', [0.085, 0.06, 0.03]],
    sata: ['SATA', [-0.085, -0.072, 0.02]],
    fpanel: ['F_PANEL', [-0.06, -0.128, 0.02]]
  }
  for (const k of Object.keys(labelAt) as ConnectorKey[]) {
    const s = tagSprite(labelAt[k][0])
    s.position.set(...labelAt[k][1])
    s.visible = false
    mb.add(s)
    connectorLabels[k] = s
  }

  // ---- cables (in the case's frame, for when everything is fitted) ----
  const B = (x: number, y: number, z: number): THREE.Vector3Tuple => [BOARD.x + x, BOARD.y + y, BOARD.z + z]
  const cables: PcRig['cables'] = {
    sata: tube([[-0.064, Y0 + 0.19, -0.035], [-0.05, Y0 + 0.17, -0.03], [-0.052, Y0 + 0.14, -0.06], B(-0.112, -0.056, 0.01)], 0.0035, std(0xdc2626, 0.1, 0.5)),
    atx24: tube([[0.16, Y0 + 0.345, 0.03], [0.2, Y0 + 0.31, 0.04], [0.195, Y0 + 0.24, -0.02], B(0.112, 0.02, 0.016)], 0.007, std(0x111827, 0.1, 0.7)),
    cpu_fan: tube([B(-0.01, 0.11, 0.062), B(0.012, 0.128, 0.045), B(0.02, 0.13, 0.01)], 0.0013, std(0x0f172a)),
    fpanel: tube([[-0.203, Y0 + 0.05, 0.05], [-0.12, Y0 + 0.03, 0.0], B(-0.06, -0.142, 0.01)], 0.0016, std(0x6b7280)),
    mainsIn: tube([[0.214, Y0 + 0.4, 0.03], [0.26, Y0 + 0.38, -0.02], [0.26, 0.06, -0.08], [0.3, 0.006, -0.3], [0.9, 0.006, -0.38]], 0.004, std(0x0f172a, 0.1, 0.6)),
    mainsOut: tube([[0.25, 0.008, -0.27], [0.32, 0.006, -0.32], [0.9, 0.006, -0.38]], 0.004, std(0x0f172a, 0.1, 0.6)),
    strap: tube([[-0.06, 0.01, 0.3], [-0.14, 0.06, 0.2], [-0.205, Y0 + 0.05, 0.09]], 0.0015, std(0x16a34a))
  }

  // The mains plug (tap it to unplug / plug in), drawn where it lies when unplugged
  const mainsPlug = new THREE.Group()
  mainsPlug.add(box(0.03, 0.02, 0.024, std(0x0f172a, 0.2, 0.5)))
  mainsPlug.position.set(0.25, 0.011, -0.27)

  // Side panel: tinted glass in a frame; lying on the desk until it is put back
  const sidePanel = new THREE.Group()
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.42, 0.003), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.2, roughness: 0.05, transparent: true, opacity: 0.38 }))
  sidePanel.add(glass)
  // the metal frame round the glass, and its thumb screws
  const frameMat = std(0x1f2937, 0.6, 0.4)
  sidePanel.add(box(0.42, 0.012, 0.006, frameMat, 0, 0.214, 0), box(0.42, 0.012, 0.006, frameMat, 0, -0.214, 0))
  sidePanel.add(box(0.012, 0.44, 0.006, frameMat, -0.204, 0, 0), box(0.012, 0.44, 0.006, frameMat, 0.204, 0, 0))
  for (const y of [0.17, -0.17]) sidePanel.add(cyl(0.006, 0.006, std(0x9ca3af, 0.8, 0.3), 'z', 0.204, y, 0.004))
  const sidePanelClosed: Pose = { pos: V(0, Y0 + 0.22, 0.102), quat: Q() }
  const sidePanelOpen: Pose = { pos: V(-0.4, Y0 + 0.22, 0.2), quat: Q(0, 0.95, 0.05) }

  // The anti-static wrist strap coiled on the desk, and the thermal paste
  const strapCoil = new THREE.Group()
  const strapRing = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.006, 10, 30), std(0x16a34a, 0.1, 0.6))
  strapRing.rotation.x = Math.PI / 2
  strapCoil.add(strapRing)
  strapCoil.add(box(0.014, 0.008, 0.02, std(0x9ca3af, 0.8, 0.3), 0.035, 0, 0))
  strapCoil.position.set(-0.06, 0.007, 0.3)

  const pasteTube = new THREE.Group()
  const syr = cyl(0.008, 0.08, std(0xe5e7eb, 0.2, 0.3), 'x')
  pasteTube.add(syr, cyl(0.003, 0.02, std(0x9ca3af, 0.6, 0.3), 'x', -0.05, 0, 0))
  pasteTube.position.set(0.1, 0.009, 0.3)
  pasteTube.rotation.y = 0.5

  const pasteDot = new THREE.Mesh(new THREE.SphereGeometry(0.006, 16, 12), std(0xd1d5db, 0.3, 0.5))
  pasteDot.scale.set(1, 1, 0.35)
  pasteDot.position.copy(anchors.cpu.pos).add(V(0, 0, 0.0055))

  return {
    shell, parts, anchors, desk, cmos, ports, connectors, connectorLabels, cables,
    sidePanel, sidePanelOpen, sidePanelClosed, powerButton, powerLed, mainsPlug, strapCoil, pasteTube, pasteDot, spinners
  }
}

/** Light a part up (hover, the part a step asks for) - every material in it, remembering the original */
export function setEmissive(obj: THREE.Object3D, color: number, intensity: number) {
  obj.traverse(o => {
    const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined
    if (!m || !('emissive' in m) || (o as THREE.Sprite).isSprite) return
    if (m.userData.baseEmissive === undefined) {
      m.userData.baseEmissive = m.emissive.getHex()
      m.userData.baseIntensity = m.emissiveIntensity
    }
    if (intensity <= 0) {
      m.emissive.setHex(m.userData.baseEmissive)
      m.emissiveIntensity = m.userData.baseIntensity
    } else {
      m.emissive.setHex(color)
      m.emissiveIntensity = intensity
    }
  })
}

/**
 * Fade everything in `roots` except `keep` (and what is inside it), so one part stands out on its
 * own; `keep` null brings everything back. Remembers each material's own see-through settings.
 */
export function fadeExcept(roots: THREE.Object3D[], keep: THREE.Object3D | null, opacity = 0.12) {
  const kept = new Set<THREE.Object3D>()
  keep?.traverse(o => kept.add(o))
  for (const root of roots) {
    root.traverse(o => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined
      if (!m || Array.isArray(m) || (o as THREE.Sprite).isSprite) return
      const fade = keep !== null && !kept.has(o)
      if (m.userData.baseOpacity === undefined) {
        m.userData.baseOpacity = m.opacity
        m.userData.baseTransparent = m.transparent
        m.userData.baseDepthWrite = m.depthWrite
      }
      m.transparent = fade ? true : m.userData.baseTransparent
      m.opacity = fade ? Math.min(opacity, m.userData.baseOpacity) : m.userData.baseOpacity
      m.depthWrite = fade ? false : m.userData.baseDepthWrite
      m.needsUpdate = true
    })
  }
}
