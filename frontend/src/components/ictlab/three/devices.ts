import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/**
 * The everyday devices around a computer, built in 3D at their real sizes (metres) for the Parts
 * showroom: input, output, storage, networking and power, and other computers. Plain shapes and
 * painted canvases - nothing downloaded - in the colours devices really come in (black, grey,
 * white plastic, brushed metal).
 */
export type DeviceKey =
  | 'keyboard' | 'mouse' | 'scanner' | 'webcam' | 'microphone'
  | 'monitor' | 'printer' | 'projector' | 'speakers' | 'headphones'
  | 'flash' | 'exthdd' | 'sdcard' | 'disc'
  | 'router' | 'switch' | 'patch' | 'ups' | 'extension'
  | 'tower' | 'laptop' | 'tablet'

// ---------------------------------------------------------------- materials and shapes
const mat = (color: number, roughness = 0.5, metalness = 0.05, extra: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra })
const BLACK = () => mat(0x1c1f24, 0.45)
const DARK = () => mat(0x2a2f36, 0.5)
const GREY = () => mat(0x8b9199, 0.45, 0.2)
const WHITE = () => mat(0xeceef0, 0.4)
const METAL = () => mat(0xb9bec5, 0.3, 0.8)
const GLASS = () => mat(0x0b0f14, 0.15, 0.3)
const LED = (color: number) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.6 })

function shadowed<T extends THREE.Object3D>(o: T) {
  o.traverse(c => { c.castShadow = true; c.receiveShadow = true })
  return o
}
function rbox(w: number, h: number, d: number, m: THREE.Material, r = 0.004, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2.1, h / 2.1, d / 2.1)), m)
  mesh.position.set(x, y, z)
  return mesh
}
function box(w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
  mesh.position.set(x, y, z)
  return mesh
}
function cyl(r: number, h: number, m: THREE.Material, x = 0, y = 0, z = 0, seg = 32, rTop = r) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, r, h, seg), m)
  mesh.position.set(x, y, z)
  return mesh
}

// ---------------------------------------------------------------- painted surfaces
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
/** A desktop on a screen: wallpaper, a few icons and a taskbar */
function desktopTexture() {
  return canvasTex(512, 300, g => {
    const grad = g.createLinearGradient(0, 0, 512, 300)
    grad.addColorStop(0, '#0f5b33')
    grad.addColorStop(1, '#22a45d')
    g.fillStyle = grad
    g.fillRect(0, 0, 512, 300)
    g.fillStyle = 'rgba(255,255,255,0.85)'
    for (let i = 0; i < 4; i++) g.fillRect(16, 16 + i * 46, 26, 26)
    g.fillStyle = 'rgba(0,0,0,0.55)'
    g.fillRect(0, 280, 512, 20)
    g.fillStyle = '#fff'
    g.fillRect(8, 284, 12, 12)
    g.font = '11px sans-serif'
    g.fillText('10:24', 470, 294)
    g.font = 'bold 26px sans-serif'
    g.fillText('Tusome', 330, 160)
  })
}
/** A product label */
function label(title: string, lines: string[], bg = '#f8fafc', fg = '#111827') {
  return canvasTex(256, 128, g => {
    g.fillStyle = bg
    g.fillRect(0, 0, 256, 128)
    g.fillStyle = fg
    g.font = 'bold 26px sans-serif'
    g.fillText(title, 14, 38)
    g.font = '16px sans-serif'
    lines.forEach((l, i) => g.fillText(l, 14, 66 + i * 22))
  })
}
const pictured = (map: THREE.Texture, rough = 0.5) => new THREE.MeshStandardMaterial({ map, roughness: rough })

// ---------------------------------------------------------------- input
function keyboard() {
  const g = new THREE.Group()
  g.add(rbox(0.44, 0.022, 0.14, DARK(), 0.006, 0, 0.011, 0))
  // the keys: four rows of letters, then the space bar
  const keyMat = BLACK()
  const keys = new THREE.InstancedMesh(new RoundedBoxGeometry(0.016, 0.008, 0.016, 2, 0.002), keyMat, 60)
  const m = new THREE.Matrix4()
  let n = 0
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 14 && n < 56; c++) {
      m.makeTranslation(-0.19 + c * 0.0195 + r * 0.004, 0.026, -0.045 + r * 0.02)
      keys.setMatrixAt(n++, m)
    }
  }
  keys.count = n
  g.add(keys)
  g.add(rbox(0.12, 0.008, 0.016, keyMat, 0.002, -0.02, 0.026, 0.037))
  // the number pad
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) g.add(rbox(0.016, 0.008, 0.016, keyMat, 0.002, 0.135 + c * 0.0195, 0.026, -0.045 + r * 0.02))
  // the cable leaving the back
  g.add(cyl(0.002, 0.08, BLACK(), 0, 0.01, -0.11, 8))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  return shadowed(g)
}
function mouse() {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.032, 32, 20), DARK())
  body.scale.set(0.95, 0.55, 1.55)
  body.position.y = 0.015
  g.add(body)
  g.add(box(0.0015, 0.004, 0.035, BLACK(), 0, 0.031, -0.02))
  g.add(cyl(0.004, 0.008, GREY(), 0, 0.031, -0.025, 16))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.01, -0.05), new THREE.Vector3(0, 0.006, -0.09), new THREE.Vector3(0.03, 0.004, -0.14)]), 20, 0.0018, 8), BLACK())
  g.add(cable)
  return shadowed(g)
}
function scanner() {
  const g = new THREE.Group()
  g.add(rbox(0.29, 0.045, 0.4, GREY(), 0.008, 0, 0.0225, 0))
  const glass = box(0.23, 0.002, 0.31, GLASS(), 0, 0.046, 0.01)
  g.add(glass)
  // the lid, open a little to show the glass
  const lid = new THREE.Group()
  lid.add(rbox(0.29, 0.018, 0.4, WHITE(), 0.006, 0, 0.009, 0.2))
  lid.position.set(0, 0.046, -0.2)
  lid.rotation.x = -0.55
  g.add(lid)
  g.add(box(0.06, 0.003, 0.012, LED(0x22c55e), 0.1, 0.03, 0.2))
  return shadowed(g)
}
function webcam() {
  const g = new THREE.Group()
  // the clip that hooks over a monitor
  g.add(rbox(0.03, 0.006, 0.04, BLACK(), 0.002, 0, 0.003, 0))
  g.add(rbox(0.03, 0.04, 0.006, BLACK(), 0.002, 0, 0.02, -0.017))
  const head = rbox(0.09, 0.03, 0.03, DARK(), 0.012, 0, 0.052, 0)
  g.add(head)
  g.add(cyl(0.009, 0.004, GLASS(), 0, 0.052, 0.016, 32))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  g.add(cyl(0.006, 0.0045, mat(0x1d4ed8, 0.1, 0.6), 0, 0.052, 0.017, 32))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  g.add(cyl(0.0015, 0.002, LED(0x22c55e), 0.025, 0.06, 0.016, 12))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  return shadowed(g)
}
function microphone() {
  const g = new THREE.Group()
  g.add(cyl(0.045, 0.012, BLACK(), 0, 0.006, 0, 40))
  g.add(cyl(0.005, 0.12, METAL(), 0, 0.072, 0, 16))
  const head = new THREE.Mesh(new THREE.CapsuleGeometry(0.022, 0.05, 8, 24), GREY())
  head.position.y = 0.17
  g.add(head)
  // the grille rings
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.0225, 0.0012, 6, 32), DARK())
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.155 + i * 0.012
    g.add(ring)
  }
  return shadowed(g)
}

// ---------------------------------------------------------------- output
function monitor() {
  const g = new THREE.Group()
  g.add(rbox(0.2, 0.012, 0.15, BLACK(), 0.004, 0, 0.006, 0))
  g.add(rbox(0.04, 0.2, 0.025, BLACK(), 0.006, 0, 0.11, -0.03))
  const frame = rbox(0.54, 0.32, 0.03, BLACK(), 0.006, 0, 0.27, -0.01)
  g.add(frame)
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.515, 0.295), new THREE.MeshBasicMaterial({ map: desktopTexture() }))
  screen.position.set(0, 0.275, 0.0055)
  g.add(screen)
  g.add(cyl(0.0025, 0.002, LED(0x22c55e), 0.24, 0.115, 0.006, 12))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  return shadowed(g)
}
function printer() {
  const g = new THREE.Group()
  g.add(rbox(0.42, 0.16, 0.3, WHITE(), 0.012, 0, 0.08, 0))
  // the paper tray at the back with a sheet, and the output slot at the front with a printed page
  const tray = rbox(0.3, 0.008, 0.12, GREY(), 0.003, 0, 0.17, -0.18)
  tray.rotation.x = 0.5
  g.add(tray)
  const paper = box(0.21, 0.001, 0.15, mat(0xffffff, 0.9), 0, 0.2, -0.2)
  paper.rotation.x = 0.5
  g.add(paper)
  g.add(box(0.3, 0.01, 0.006, BLACK(), 0, 0.06, 0.151))
  const page = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.12), pictured(label('Report', ['S.1 - Term 3', '..........', '..........'], '#ffffff')))
  page.rotation.x = -Math.PI / 2 + 0.15
  page.position.set(0, 0.058, 0.2)
  g.add(page)
  // the control panel
  g.add(box(0.08, 0.002, 0.04, GLASS(), 0.14, 0.161, 0.08))
  g.add(cyl(0.004, 0.003, LED(0x22c55e), 0.17, 0.162, 0.12, 12))
  return shadowed(g)
}
function projector() {
  const g = new THREE.Group()
  g.add(rbox(0.3, 0.09, 0.23, WHITE(), 0.02, 0, 0.05, 0))
  g.add(cyl(0.035, 0.03, BLACK(), -0.07, 0.05, 0.12, 32))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  g.add(cyl(0.026, 0.01, mat(0x60a5fa, 0.05, 0.6, { emissive: 0x93c5fd, emissiveIntensity: 0.5 }), -0.07, 0.05, 0.135, 32))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  for (let i = 0; i < 6; i++) g.add(box(0.06, 0.004, 0.003, GREY(), 0.08, 0.03 + i * 0.008, 0.116))
  for (const [x, z] of [[-0.11, -0.08], [0.11, -0.08], [-0.11, 0.08], [0.11, 0.08]]) g.add(cyl(0.008, 0.01, BLACK(), x, 0.003, z, 12))
  return shadowed(g)
}
function speakers() {
  const g = new THREE.Group()
  for (const x of [-0.08, 0.08]) {
    const s = new THREE.Group()
    s.add(rbox(0.1, 0.17, 0.11, DARK(), 0.01, 0, 0.085, 0))
    const woofer = cyl(0.035, 0.01, BLACK(), 0, 0.06, 0.056, 32)
    woofer.rotation.x = Math.PI / 2
    s.add(woofer)
    const cone = cyl(0.015, 0.012, GREY(), 0, 0.06, 0.058, 24)
    cone.rotation.x = Math.PI / 2
    s.add(cone)
    const tweeter = cyl(0.014, 0.008, BLACK(), 0, 0.13, 0.056, 24)
    tweeter.rotation.x = Math.PI / 2
    s.add(tweeter)
    s.position.x = x
    g.add(s)
  }
  return shadowed(g)
}
function headphones() {
  const g = new THREE.Group()
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.009, 12, 48, Math.PI), DARK())
  band.position.y = 0.06
  g.add(band)
  for (const x of [-0.085, 0.085]) {
    const cup = cyl(0.04, 0.03, BLACK(), x, 0.05, 0, 32)
    cup.rotation.z = Math.PI / 2
    g.add(cup)
    const pad = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.01, 10, 32), mat(0x3a3f47, 0.9))
    pad.rotation.y = Math.PI / 2
    pad.position.set(x * 0.82, 0.05, 0)
    g.add(pad)
  }
  return shadowed(g)
}

// ---------------------------------------------------------------- storage
function flash() {
  const g = new THREE.Group()
  g.add(rbox(0.018, 0.008, 0.045, mat(0x15874a, 0.35), 0.003, 0, 0.004, 0))
  g.add(box(0.012, 0.0045, 0.012, METAL(), 0, 0.004, 0.028))
  g.add(box(0.008, 0.001, 0.008, BLACK(), 0, 0.0063, 0.028))
  const top = new THREE.Mesh(new THREE.PlaneGeometry(0.015, 0.024), pictured(label('32GB', ['USB 3.0'], '#115633', '#ffffff')))
  top.rotation.x = -Math.PI / 2
  top.position.set(0, 0.0082, -0.004)
  g.add(top)
  return shadowed(g)
}
function exthdd() {
  const g = new THREE.Group()
  g.add(rbox(0.08, 0.016, 0.115, BLACK(), 0.006, 0, 0.008, 0))
  const lbl = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.03), pictured(label('1TB', ['Portable drive'], '#1f2937', '#e5e7eb')))
  lbl.rotation.x = -Math.PI / 2
  lbl.position.set(0, 0.0162, 0.02)
  g.add(lbl)
  g.add(cyl(0.0015, 0.002, LED(0x60a5fa), 0.03, 0.0162, -0.045, 12))
  g.add(box(0.012, 0.005, 0.002, GREY(), 0, 0.008, -0.058))
  return shadowed(g)
}
function sdcard() {
  const g = new THREE.Group()
  const shape = new THREE.Shape()
  shape.moveTo(-0.012, -0.016)
  shape.lineTo(0.012, -0.016)
  shape.lineTo(0.012, 0.012)
  shape.lineTo(0.008, 0.016)
  shape.lineTo(-0.012, 0.016)
  shape.closePath()
  const body = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.0021, bevelEnabled: false }), mat(0x1f2937, 0.4))
  body.rotation.x = -Math.PI / 2
  g.add(body)
  const lbl = new THREE.Mesh(new THREE.PlaneGeometry(0.022, 0.02), pictured(label('SD', ['64GB'], '#15874a', '#ffffff')))
  lbl.rotation.x = -Math.PI / 2
  lbl.position.set(0, 0.0022, 0.002)
  g.add(lbl)
  for (let i = 0; i < 8; i++) g.add(box(0.0018, 0.0002, 0.004, mat(0xd4a017, 0.3, 0.8), -0.009 + i * 0.0025, 0.0001, -0.013))
  return shadowed(g)
}
function disc() {
  const g = new THREE.Group()
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.0075, 0.06, 64), new THREE.MeshStandardMaterial({ color: 0xdfe6ee, metalness: 0.95, roughness: 0.12, side: THREE.DoubleSide, iridescence: 1 } as THREE.MeshStandardMaterialParameters))
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.002
  g.add(ring)
  const top = new THREE.Mesh(new THREE.RingGeometry(0.02, 0.058, 64), pictured(canvasTex(256, 256, c => {
    c.fillStyle = '#f8fafc'
    c.fillRect(0, 0, 256, 256)
    c.fillStyle = '#115633'
    c.font = 'bold 30px sans-serif'
    c.fillText('DVD-R', 80, 70)
    c.font = '18px sans-serif'
    c.fillText('4.7 GB', 100, 200)
  })))
  top.rotation.x = -Math.PI / 2
  top.position.y = 0.0025
  g.add(top)
  return shadowed(g)
}

// ---------------------------------------------------------------- networking and power
function router() {
  const g = new THREE.Group()
  g.add(rbox(0.2, 0.035, 0.13, WHITE(), 0.01, 0, 0.0175, 0))
  // the aerials
  for (const x of [-0.08, 0, 0.08]) {
    const a = rbox(0.012, 0.16, 0.008, BLACK(), 0.004, x, 0.11, -0.06)
    a.rotation.x = -0.12
    g.add(a)
  }
  // lights along the front
  for (let i = 0; i < 6; i++) g.add(cyl(0.0018, 0.002, LED(i < 4 ? 0x22c55e : 0xf59e0b), -0.06 + i * 0.024, 0.0355, 0.05, 10))
  // network sockets at the back
  for (let i = 0; i < 4; i++) g.add(box(0.016, 0.013, 0.004, BLACK(), -0.05 + i * 0.025, 0.017, -0.066))
  return shadowed(g)
}
function netswitch() {
  const g = new THREE.Group()
  g.add(rbox(0.26, 0.03, 0.1, METAL(), 0.004, 0, 0.015, 0))
  for (let i = 0; i < 8; i++) {
    g.add(box(0.016, 0.013, 0.004, BLACK(), -0.09 + i * 0.022, 0.015, 0.051))
    g.add(cyl(0.0014, 0.002, LED(0x22c55e), -0.09 + i * 0.022, 0.026, 0.051, 8))
    g.children[g.children.length - 1].rotation.x = Math.PI / 2
  }
  const lbl = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.02), pictured(label('SWITCH', ['8-port'], '#1f2937', '#e5e7eb')))
  lbl.rotation.x = -Math.PI / 2
  lbl.position.set(0.08, 0.0302, 0)
  g.add(lbl)
  return shadowed(g)
}
function patch() {
  const g = new THREE.Group()
  const blue = mat(0x1d4ed8, 0.5)
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.12, 0.006, 0), new THREE.Vector3(-0.06, 0.006, 0.06), new THREE.Vector3(0.02, 0.006, -0.05),
    new THREE.Vector3(0.08, 0.006, 0.04), new THREE.Vector3(0.12, 0.006, 0)
  ])
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.003, 10), blue))
  // the clear RJ45 plugs at both ends
  for (const [x, rot] of [[-0.135, Math.PI / 2], [0.135, -Math.PI / 2]] as const) {
    const plug = new THREE.Group()
    plug.add(box(0.012, 0.009, 0.022, mat(0xdbeafe, 0.1, 0, { transparent: true, opacity: 0.6 }), 0, 0.006, 0))
    for (let i = 0; i < 8; i++) plug.add(box(0.0008, 0.002, 0.008, mat(0xd4a017, 0.3, 0.8), -0.0042 + i * 0.0012, 0.009, 0.005))
    plug.add(box(0.004, 0.002, 0.01, mat(0xdbeafe, 0.1), 0, 0.0115, -0.002))
    plug.position.x = x
    plug.rotation.y = rot
    g.add(plug)
  }
  return shadowed(g)
}
function ups() {
  const g = new THREE.Group()
  g.add(rbox(0.1, 0.16, 0.3, BLACK(), 0.008, 0, 0.08, 0))
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.15), pictured(canvasTex(128, 220, c => {
    c.fillStyle = '#1c1f24'
    c.fillRect(0, 0, 128, 220)
    c.fillStyle = '#111827'
    c.fillRect(14, 30, 100, 44)
    c.fillStyle = '#22c55e'
    c.font = 'bold 24px monospace'
    c.fillText('230V', 30, 62)
    c.fillStyle = '#e5e7eb'
    c.font = 'bold 16px sans-serif'
    c.fillText('UPS 650VA', 18, 120)
    c.beginPath()
    c.arc(64, 170, 18, 0, Math.PI * 2)
    c.strokeStyle = '#e5e7eb'
    c.lineWidth = 3
    c.stroke()
  })))
  face.position.set(0, 0.08, 0.1505)
  g.add(face)
  return shadowed(g)
}
function extension() {
  const g = new THREE.Group()
  g.add(rbox(0.32, 0.04, 0.07, WHITE(), 0.008, 0, 0.02, 0))
  for (let i = 0; i < 4; i++) {
    const x = -0.11 + i * 0.065
    g.add(box(0.004, 0.009, 0.002, BLACK(), x, 0.041, -0.012))
    g.add(box(0.008, 0.005, 0.002, BLACK(), x - 0.012, 0.041, 0.008))
    g.add(box(0.008, 0.005, 0.002, BLACK(), x + 0.012, 0.041, 0.008))
    g.children.slice(-3).forEach(c => { c.rotation.x = -Math.PI / 2 })
  }
  g.add(rbox(0.022, 0.012, 0.02, mat(0xdc2626, 0.4, 0, { emissive: 0x7f1d1d, emissiveIntensity: 0.6 }), 0.003, 0.15, 0.045, 0))
  g.add(cyl(0.004, 0.12, WHITE(), -0.21, 0.02, 0, 10))
  g.children[g.children.length - 1].rotation.z = Math.PI / 2
  return shadowed(g)
}

// ---------------------------------------------------------------- other computers
function tower() {
  const g = new THREE.Group()
  g.add(rbox(0.19, 0.42, 0.42, BLACK(), 0.008, 0, 0.21, 0))
  g.add(box(0.15, 0.08, 0.004, GREY(), 0, 0.33, 0.21))
  g.add(cyl(0.012, 0.004, METAL(), 0, 0.37, 0.212, 24))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  g.add(cyl(0.0025, 0.002, LED(0x22c55e), 0.03, 0.37, 0.213, 12))
  g.children[g.children.length - 1].rotation.x = Math.PI / 2
  for (let i = 0; i < 2; i++) g.add(box(0.012, 0.005, 0.003, BLACK(), -0.04 + i * 0.02, 0.37, 0.212))
  for (let i = 0; i < 10; i++) g.add(box(0.16, 0.004, 0.003, DARK(), 0, 0.05 + i * 0.022, 0.211))
  return shadowed(g)
}
function laptop() {
  const g = new THREE.Group()
  const base = rbox(0.33, 0.018, 0.23, GREY(), 0.006, 0, 0.009, 0)
  g.add(base)
  g.add(box(0.29, 0.002, 0.1, DARK(), 0, 0.0185, -0.035))
  g.add(box(0.1, 0.001, 0.06, mat(0x6b7280, 0.3), 0, 0.0182, 0.07))
  const lid = new THREE.Group()
  lid.add(rbox(0.33, 0.22, 0.008, GREY(), 0.006, 0, 0.11, 0))
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.19), new THREE.MeshBasicMaterial({ map: desktopTexture() }))
  scr.position.set(0, 0.11, 0.0042)
  lid.add(scr)
  lid.position.set(0, 0.018, -0.112)
  lid.rotation.x = -0.25
  g.add(lid)
  return shadowed(g)
}
function tablet() {
  const g = new THREE.Group()
  const holder = new THREE.Group()
  holder.add(rbox(0.25, 0.17, 0.008, BLACK(), 0.012, 0, 0, 0))
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.23, 0.15), new THREE.MeshBasicMaterial({ map: desktopTexture() }))
  scr.position.z = 0.0042
  holder.add(scr)
  holder.position.set(0, 0.085, 0)
  holder.rotation.x = -0.3
  g.add(holder)
  const stand = rbox(0.06, 0.09, 0.006, GREY(), 0.002, 0, 0.045, -0.04)
  stand.rotation.x = 0.4
  g.add(stand)
  return shadowed(g)
}

const BUILD: Record<DeviceKey, () => THREE.Group> = {
  keyboard, mouse, scanner, webcam, microphone,
  monitor, printer, projector, speakers, headphones,
  flash, exthdd, sdcard, disc,
  router, switch: netswitch, patch, ups, extension,
  tower, laptop, tablet
}
const cache = new Map<DeviceKey, THREE.Group>()
/** The device, built once and reused */
export function buildDevice(key: DeviceKey): THREE.Group {
  let g = cache.get(key)
  if (!g) {
    g = BUILD[key]()
    g.name = key
    cache.set(key, g)
  }
  return g
}
