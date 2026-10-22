import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/**
 * "Connect a computer": a system unit turned round so its back faces you, with the real ports a
 * desktop has (the motherboard's I/O shield, the power supply's inlet and switch, a rear fan and
 * the expansion slots), and the plugs that go in them - each shaped and coloured like the real one,
 * so a learner matches plug to port the way they would in the lab.
 *
 * Coordinates: the unit stands at the origin, 19 x 42 x 42 cm, its back face at z = +0.21 and its
 * front (with the power button on the top edge) towards the wall. A plug's origin is the tip of its
 * metal end; it points along -z, and its cable leaves from `tail`.
 */
export type PortKind = 'usb' | 'usb3' | 'hdmi' | 'vga' | 'rj45' | 'audio-blue' | 'audio-green' | 'audio-pink' | 'c14'
export type PlugKind = 'usb' | 'hdmi' | 'rj45' | 'audio-green' | 'audio-pink' | 'c13'

export interface Port {
  key: string
  kind: PortKind
  label: string
  /** world position of the port's mouth */
  pos: THREE.Vector3
  /** an invisible pad over it, easy to tap */
  hit: THREE.Mesh
  /** its label tag (shown at Simple) */
  tag: THREE.Sprite
}
export interface ConnectTower {
  group: THREE.Group
  ports: Port[]
  powerButton: THREE.Mesh
  powerLed: THREE.MeshStandardMaterial
  psuSwitch: THREE.Group
  setPsuSwitch: (on: boolean) => void
  lanLeds: THREE.MeshStandardMaterial[]
  fan: THREE.Group
}

const mat = (color: number, roughness = 0.5, metalness = 0.05, extra: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra })
const BACK_Z = 0.21

function rbox(w: number, h: number, d: number, m: THREE.Material, r = 0.003) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2.1, h / 2.1, d / 2.1)), m)
}
function box(w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0) {
  const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
  b.position.set(x, y, z)
  return b
}

function placed<T extends THREE.Object3D>(o: T, x: number, y: number, z: number) {
  o.position.set(x, y, z)
  return o
}

/** A small name tag over a port */
export function tagSprite(text: string, bg = '#115633') {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 64
  const g = c.getContext('2d')!
  g.fillStyle = bg
  g.beginPath()
  g.roundRect(4, 8, 248, 48, 14)
  g.fill()
  g.fillStyle = '#fff'
  g.font = '600 28px Inter, sans-serif'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(text, 128, 33)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }))
  s.scale.set(0.042, 0.0105, 1)
  s.renderOrder = 10
  return s
}

// ---------------------------------------------------------------- the system unit
export function buildConnectTower(): ConnectTower {
  const group = new THREE.Group()
  const caseMat = mat(0x22262c, 0.45, 0.35)
  const body = rbox(0.19, 0.42, 0.42, caseMat, 0.006)
  body.position.y = 0.21
  group.add(body)
  // feet
  for (const [x, z] of [[-0.075, -0.18], [0.075, -0.18], [-0.075, 0.18], [0.075, 0.18]]) {
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.012, 0.008, 16), mat(0x111111, 0.8))
    f.position.set(x, -0.002, z)
    group.add(f)
  }
  // the power button and its light, on the top front edge
  const powerButton = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.006, 32), mat(0xc0c5cc, 0.25, 0.8))
  powerButton.position.set(0, 0.423, -0.17)
  group.add(powerButton)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.0125, 0.0015, 8, 32), mat(0x111111, 0.4))
  ring.rotation.x = Math.PI / 2
  ring.position.set(0, 0.4232, -0.17)
  group.add(ring)
  const powerLed = new THREE.MeshStandardMaterial({ color: 0x1f2937, emissive: 0x000000, emissiveIntensity: 2 })
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.0025, 10, 10), powerLed)
  led.position.set(0.03, 0.4222, -0.17)
  group.add(led)
  // two USB ports and a headphone jack on the top front, as most cases have
  for (const x of [-0.045, -0.03]) group.add(box(0.012, 0.002, 0.005, mat(0x0a0a0a), x, 0.4205, -0.17))

  const ports: Port[] = []
  const at = (x: number, y: number) => new THREE.Vector3(x, y, BACK_Z + 0.0005)
  // Name tags sit in a column just left of the case, one per kind of port, level with it (the three
  // sound jacks get their own colour, stepped down so they don't overlap)
  const TAG_X = -0.13
  const addPort = (key: string, kind: PortKind, label: string, x: number, y: number, w: number, h: number, visual: THREE.Object3D, tagText: string, tagY = y, tagBg = '#115633') => {
    visual.position.set(x, y, BACK_Z + 0.0006)
    group.add(visual)
    const hit = new THREE.Mesh(new THREE.BoxGeometry(Math.max(w + 0.006, 0.016), Math.max(h + 0.006, 0.011), 0.006), new THREE.MeshBasicMaterial({ visible: false }))
    hit.position.set(x, y, BACK_Z + 0.003)
    group.add(hit)
    const tag = tagSprite(tagText, tagBg)
    tag.position.set(TAG_X, tagY, BACK_Z + 0.004)
    tag.visible = false
    // two ports of the same kind share one tag
    if (!tagText) tag.scale.set(0, 0, 0)
    group.add(tag)
    ports.push({ key, kind, label, pos: at(x, y), hit, tag })
  }

  // ---- the power supply, at the top: the inlet, its switch, its fan grille
  const psuPlate = box(0.18, 0.08, 0.002, mat(0x3a3f47, 0.4, 0.6), 0, 0.37, BACK_Z + 0.001)
  group.add(psuPlate)
  {
    const inlet = new THREE.Group()
    inlet.add(box(0.03, 0.022, 0.003, mat(0x111111, 0.7)))
    inlet.add(box(0.024, 0.016, 0.002, mat(0x050505, 0.9), 0, 0, -0.0012))
    for (const px of [-0.0065, 0, 0.0065]) inlet.add(box(0.0022, 0.005, 0.004, mat(0xc0c5cc, 0.3, 0.9), px, px === 0 ? 0.004 : -0.002, 0.0008))
    addPort('c14', 'c14', 'Power inlet (to the power supply)', -0.05, 0.372, 0.03, 0.022, inlet, 'POWER IN')
  }
  const psuSwitch = new THREE.Group()
  psuSwitch.add(box(0.016, 0.022, 0.004, mat(0x0a0a0a, 0.6)))
  const rocker = rbox(0.011, 0.016, 0.006, mat(0x1c1f24, 0.5), 0.0015)
  rocker.position.z = 0.003
  psuSwitch.add(rocker)
  // "I" on the top half, "O" on the bottom
  psuSwitch.add(box(0.0012, 0.004, 0.0005, mat(0xe5e7eb), 0, 0.004, 0.0063))
  const o = new THREE.Mesh(new THREE.TorusGeometry(0.0018, 0.0005, 6, 16), mat(0xe5e7eb))
  o.position.set(0, -0.004, 0.0063)
  psuSwitch.add(o)
  psuSwitch.position.set(-0.017, 0.372, BACK_Z + 0.002)
  group.add(psuSwitch)
  const setPsuSwitch = (on: boolean) => { rocker.rotation.x = on ? -0.3 : 0.3 }
  setPsuSwitch(false)
  // honeycomb grille
  const grille = new THREE.Group()
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
    const hex = new THREE.Mesh(new THREE.CircleGeometry(0.0035, 6), mat(0x0a0a0a, 0.9))
    hex.position.set(c * 0.008 + (r % 2) * 0.004, r * 0.007, 0)
    grille.add(hex)
  }
  grille.position.set(0.03, 0.355, BACK_Z + 0.0025)
  group.add(grille)

  // ---- the motherboard's I/O shield
  const shieldX = -0.06
  group.add(box(0.05, 0.15, 0.0015, mat(0xb8bcc3, 0.35, 0.85), shieldX, 0.24, BACK_Z + 0.001))
  const usbPort = (blue: boolean) => {
    const g = new THREE.Group()
    g.add(box(0.0135, 0.006, 0.002, mat(0xc0c5cc, 0.25, 0.9)))
    g.add(box(0.011, 0.002, 0.0025, mat(blue ? 0x1d4ed8 : 0x0a0a0a, 0.5), 0, 0.0008, 0.0002))
    return g
  }
  addPort('usb1', 'usb', 'USB port', shieldX - 0.0095, 0.3, 0.0135, 0.006, usbPort(false), 'USB')
  addPort('usb2', 'usb', 'USB port', shieldX + 0.0095, 0.3, 0.0135, 0.006, usbPort(false), '')
  addPort('usb3', 'usb3', 'USB 3.0 port (blue)', shieldX - 0.0095, 0.286, 0.0135, 0.006, usbPort(true), 'USB 3.0')
  addPort('usb4', 'usb3', 'USB 3.0 port (blue)', shieldX + 0.0095, 0.286, 0.0135, 0.006, usbPort(true), '')
  {
    // HDMI: wide and flat, its two lower corners cut off
    const shape = new THREE.Shape()
    shape.moveTo(-0.0075, 0.0028)
    shape.lineTo(0.0075, 0.0028)
    shape.lineTo(0.0075, -0.0005)
    shape.lineTo(0.0055, -0.0028)
    shape.lineTo(-0.0055, -0.0028)
    shape.lineTo(-0.0075, -0.0005)
    shape.closePath()
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.002, bevelEnabled: false }), mat(0xc0c5cc, 0.25, 0.9)))
    const inner = new THREE.Mesh(new THREE.ShapeGeometry(shape), mat(0x050505, 0.9))
    inner.scale.setScalar(0.8)
    inner.position.z = 0.0021
    g.add(inner)
    addPort('hdmi', 'hdmi', 'HDMI port (picture and sound)', shieldX, 0.264, 0.015, 0.0056, g, 'HDMI')
  }
  {
    // VGA: a blue D-shaped socket with 15 holes
    const g = new THREE.Group()
    const shape = new THREE.Shape()
    shape.moveTo(-0.0095, 0.004)
    shape.lineTo(0.0095, 0.004)
    shape.lineTo(0.0078, -0.004)
    shape.lineTo(-0.0078, -0.004)
    shape.closePath()
    g.add(new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.002, bevelEnabled: false }), mat(0x1e40af, 0.4)))
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.0006, 8), mat(0x050505))
      hole.position.set(-0.0052 + c * 0.0026 + (r === 1 ? 0.0013 : 0), 0.0024 - r * 0.0024, 0.0021)
      g.add(hole)
    }
    addPort('vga', 'vga', 'VGA port (older monitors)', shieldX, 0.244, 0.019, 0.008, g, 'VGA')
  }
  // RJ45 with its two lights
  const lanLeds = [new THREE.MeshStandardMaterial({ color: 0x14532d, emissive: 0x000000, emissiveIntensity: 2 }), new THREE.MeshStandardMaterial({ color: 0x713f12, emissive: 0x000000, emissiveIntensity: 2 })]
  {
    const g = new THREE.Group()
    g.add(box(0.016, 0.014, 0.002, mat(0xc0c5cc, 0.25, 0.9)))
    g.add(box(0.012, 0.01, 0.0025, mat(0x050505, 0.9), 0, -0.0005, 0.0002))
    g.add(box(0.004, 0.003, 0.0026, mat(0x050505, 0.9), 0, -0.0062, 0.0002))
    const l1 = box(0.0025, 0.0018, 0.003, lanLeds[0], -0.0055, 0.0055, 0.0002)
    const l2 = box(0.0025, 0.0018, 0.003, lanLeds[1], 0.0055, 0.0055, 0.0002)
    g.add(l1, l2)
    addPort('rj45', 'rj45', 'Network (LAN) port', shieldX, 0.221, 0.016, 0.014, g, 'LAN')
  }
  // the three sound jacks: blue line in, green speakers, pink microphone
  const jack = (color: number) => {
    const g = new THREE.Group()
    const ringM = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0042, 0.002, 24), mat(color, 0.45))
    ringM.rotation.x = Math.PI / 2
    g.add(ringM)
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.0019, 20), mat(0x050505))
    hole.position.z = 0.0011
    g.add(hole)
    return g
  }
  addPort('audio-blue', 'audio-blue', 'Line in (blue)', shieldX - 0.013, 0.195, 0.0084, 0.0084, jack(0x2563eb), 'LINE IN', 0.203, '#2563eb')
  addPort('audio-green', 'audio-green', 'Speakers / headphones (green)', shieldX, 0.195, 0.0084, 0.0084, jack(0x16a34a), 'SPEAKERS', 0.19, '#15803d')
  addPort('audio-pink', 'audio-pink', 'Microphone (pink)', shieldX + 0.013, 0.195, 0.0084, 0.0084, jack(0xec4899), 'MIC', 0.177, '#db2777')

  // ---- the rear fan
  const fan = new THREE.Group()
  const fanFrame = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.036, 40), mat(0x0a0a0a, 0.8))
  fan.add(fanFrame)
  for (let i = 0; i < 7; i++) {
    const blade = box(0.004, 0.026, 0.001, mat(0x1c1f24, 0.6), 0, 0.014, 0)
    const pivot = new THREE.Group()
    pivot.add(blade)
    pivot.rotation.z = (i / 7) * Math.PI * 2
    fan.add(pivot)
  }
  for (const r of [0.012, 0.022, 0.032]) {
    const g = new THREE.Mesh(new THREE.TorusGeometry(r, 0.0006, 4, 40), mat(0x9ca3af, 0.3, 0.8))
    g.position.z = 0.002
    fan.add(g)
  }
  fan.position.set(0.035, 0.255, BACK_Z + 0.0015)
  group.add(fan)

  // ---- the expansion slot covers
  for (let i = 0; i < 6; i++) group.add(box(0.012, 0.11, 0.0015, mat(0x9ca3af, 0.35, 0.8), -0.04 + i * 0.016, 0.09, BACK_Z + 0.001))

  group.traverse(c => {
    if ((c as THREE.Mesh).isMesh && (c as THREE.Mesh).material && ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).visible !== false) {
      c.castShadow = true
      c.receiveShadow = true
    }
  })
  return { group, ports, powerButton, powerLed, psuSwitch, setPsuSwitch, lanLeds, fan }
}

// ---------------------------------------------------------------- the plugs
export interface PlugModel {
  group: THREE.Group
  /** where its cable leaves, in its own frame */
  tail: THREE.Vector3
  /** half its height - it lies this far above the desk */
  halfH: number
}
export function buildPlug(kind: PlugKind): PlugModel {
  const g = new THREE.Group()
  const black = mat(0x16181c, 0.55)
  const metal = mat(0xc0c5cc, 0.25, 0.9)
  if (kind === 'hdmi') {
    g.add(box(0.014, 0.0045, 0.01, metal, 0, 0, -0.005))
    g.add(placed(rbox(0.02, 0.009, 0.03, black, 0.003), 0, 0, 0.015))
    g.add(box(0.008, 0.001, 0.014, mat(0x2a2f36), 0, 0.0048, 0.015))
    return { group: g, tail: new THREE.Vector3(0, 0, 0.032), halfH: 0.0045 }
  }
  if (kind === 'usb') {
    const shell = box(0.012, 0.0045, 0.012, metal, 0, 0, -0.006)
    g.add(shell)
    g.add(box(0.008, 0.0015, 0.008, mat(0xf8fafc, 0.5), 0, 0.0008, -0.006))
    g.add(placed(rbox(0.016, 0.008, 0.024, black, 0.0025), 0, 0, 0.012))
    // the USB symbol, a small raised mark
    g.add(box(0.004, 0.0005, 0.006, mat(0x9ca3af), 0, 0.0042, 0.012))
    return { group: g, tail: new THREE.Vector3(0, 0, 0.025), halfH: 0.004 }
  }
  if (kind === 'audio-green' || kind === 'audio-pink') {
    const color = kind === 'audio-green' ? 0x16a34a : 0xec4899
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0018, 0.014, 16), metal)
    pin.rotation.x = Math.PI / 2
    pin.position.z = -0.007
    g.add(pin)
    for (const z of [-0.004, -0.009]) {
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.00185, 0.00185, 0.0008, 16), mat(0x0a0a0a))
      band.rotation.x = Math.PI / 2
      band.position.z = z
      g.add(band)
    }
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0035, 0.022, 20), mat(color, 0.45))
    body.rotation.x = Math.PI / 2
    body.position.z = 0.011
    g.add(body)
    return { group: g, tail: new THREE.Vector3(0, 0, 0.023), halfH: 0.0042 }
  }
  if (kind === 'rj45') {
    const clear = mat(0xdbeafe, 0.1, 0, { transparent: true, opacity: 0.65 })
    g.add(box(0.012, 0.009, 0.02, clear, 0, 0, 0.002))
    for (let i = 0; i < 8; i++) g.add(box(0.0008, 0.002, 0.007, mat(0xd4a017, 0.3, 0.8), -0.0042 + i * 0.0012, 0.0035, -0.004))
    g.add(box(0.004, 0.0015, 0.012, clear, 0, -0.0055, 0.004))
    g.add(placed(rbox(0.013, 0.01, 0.014, mat(0x1d4ed8, 0.5), 0.003), 0, 0, 0.018))
    return { group: g, tail: new THREE.Vector3(0, 0, 0.025), halfH: 0.0055 }
  }
  // c13 - the kettle-style plug for the power supply
  g.add(placed(rbox(0.03, 0.022, 0.04, black, 0.004), 0, 0, 0.02))
  g.add(box(0.024, 0.016, 0.004, mat(0x0a0a0a, 0.9), 0, 0, -0.001))
  for (let i = 0; i < 5; i++) g.add(box(0.026, 0.0012, 0.004, mat(0x2a2f36), 0, 0.0115, 0.01 + i * 0.006))
  return { group: g, tail: new THREE.Vector3(0, 0, 0.041), halfH: 0.011 }
}
