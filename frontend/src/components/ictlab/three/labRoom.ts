import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/**
 * The computer lab the ICT Lab's activities happen in: a tiled floor, painted walls with a window,
 * a wooden bench against the wall (the work surface is its top, at y = 0), more workstations along
 * the wall like a school computer lab, and a lab-rules poster. Surfaces use real photo textures
 * (Poly Haven, CC0 - public/ictlab/tex); everything else is drawn here.
 */
const TEX = (name: string) => `${import.meta.env.BASE_URL}ictlab/tex/${name}`
const loader = new THREE.TextureLoader()

function photo(name: string, repeat: [number, number], srgb = true) {
  const t = loader.load(TEX(name))
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(...repeat)
  t.anisotropy = 8
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  return t
}
function surface(base: string, repeat: [number, number], extra: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({
    map: photo(`${base}_diff.jpg`, repeat),
    normalMap: photo(`${base}_nor.jpg`, repeat, false),
    roughness: 0.85,
    ...extra
  })
}

/** Where the back wall stands: the bench is pushed up against it */
export const WALL_Z = -0.47

/** A poster drawn on a canvas */
function posterTexture() {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 700
  const g = c.getContext('2d')!
  g.fillStyle = '#f8fafc'
  g.fillRect(0, 0, 512, 700)
  g.fillStyle = '#1d4ed8'
  g.fillRect(0, 0, 512, 110)
  g.fillStyle = '#ffffff'
  g.font = 'bold 54px system-ui, sans-serif'
  g.textAlign = 'center'
  g.fillText('COMPUTER LAB', 256, 72)
  g.fillStyle = '#0f172a'
  g.font = 'bold 34px system-ui, sans-serif'
  g.fillText('Lab rules', 256, 170)
  g.textAlign = 'left'
  g.font = '28px system-ui, sans-serif'
  const rules = ['1. No food or drinks', '2. Switch off at the socket', '    before opening a computer', '3. Wear the anti-static strap', '4. Handle parts by the edges', '5. Never open a power supply', '6. Report any fault to the', '    teacher']
  rules.forEach((r, i) => g.fillText(r, 40, 240 + i * 52))
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/** A plain workstation for the background: a tower, a monitor with a glowing screen, a keyboard */
function backgroundStation(screenColor: number) {
  const g = new THREE.Group()
  const dark = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 })
  const tower = new THREE.Mesh(new RoundedBoxGeometry(0.19, 0.42, 0.42, 3, 0.01), dark)
  tower.position.set(-0.32, 0.21, -0.18)
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.03), dark)
  stand.position.set(0.05, 0.07, -0.26)
  const screen = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.3, 0.03, 2, 0.008), dark)
  screen.position.set(0.05, 0.27, -0.27)
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(0.47, 0.27), new THREE.MeshBasicMaterial({ color: screenColor }))
  glow.position.set(0.05, 0.27, -0.2545)
  const kb = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.014, 0.12), dark)
  kb.position.set(0.05, 0.007, 0.05)
  g.add(tower, stand, screen, glow, kb)
  g.traverse(o => { o.castShadow = true; o.receiveShadow = true })
  return g
}

export function buildLabRoom(scene: THREE.Scene) {
  const FLOOR_Y = -0.76
  const room = new THREE.Group()

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), surface('floor_tiles_06', [6, 6], { roughness: 0.6 }))
  floor.rotation.x = -Math.PI / 2
  floor.position.set(0.2, FLOOR_Y, 2.5)
  floor.receiveShadow = true
  room.add(floor)

  const wallMat = surface('beige_wall_001', [4, 1.5], { roughness: 0.95 })
  const back = new THREE.Mesh(new THREE.PlaneGeometry(9, 3.2), wallMat)
  back.position.set(0.2, FLOOR_Y + 1.6, WALL_Z)
  back.receiveShadow = true
  room.add(back)
  const left = new THREE.Mesh(new THREE.PlaneGeometry(9, 3.2), surface('beige_wall_001', [4, 1.5], { roughness: 0.95 }))
  left.rotation.y = Math.PI / 2
  left.position.set(-3.6, FLOOR_Y + 1.6, 4)
  room.add(left)
  // a skirting board along the wall
  const skirting = new THREE.Mesh(new THREE.BoxGeometry(9, 0.1, 0.015), new THREE.MeshStandardMaterial({ color: 0x5b4636, roughness: 0.7 }))
  skirting.position.set(0.2, FLOOR_Y + 0.05, WALL_Z + 0.008)
  room.add(skirting)

  // a window in the back wall, with daylight coming through
  const win = new THREE.Group()
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.8), new THREE.MeshBasicMaterial({ color: 0xcfe8ff }))
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 })
  win.add(sky)
  for (const [w, h, x, y] of [[1.16, 0.04, 0, 0.42], [1.16, 0.04, 0, -0.42], [0.04, 0.88, -0.56, 0], [0.04, 0.88, 0.56, 0], [0.03, 0.8, 0, 0], [1.1, 0.025, 0, 0.12]] as const) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.03), frameMat)
    bar.position.set(x, y, 0.015)
    win.add(bar)
  }
  win.position.set(-1.55, 0.75, WALL_Z + 0.002)
  room.add(win)
  const daylight = new THREE.PointLight(0xdbeafe, 1.2, 4, 1.5)
  daylight.position.set(-1.55, 0.75, WALL_Z + 0.5)
  room.add(daylight)

  // the lab-rules poster
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.49), new THREE.MeshStandardMaterial({ map: posterTexture(), roughness: 0.7 }))
  poster.position.set(-0.55, 0.62, WALL_Z + 0.003)
  room.add(poster)

  // the bench: a wooden top, a front apron and a metal frame, running along the wall
  const benchTop = new THREE.Mesh(new RoundedBoxGeometry(4.4, 0.04, 0.95, 2, 0.008), surface('wood_table_001', [5, 1.1], { roughness: 0.55 }))
  benchTop.position.set(0.25, -0.02, 0.0)
  benchTop.receiveShadow = true
  benchTop.castShadow = true
  room.add(benchTop)
  const frameDark = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45, metalness: 0.6 })
  const apron = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.08, 0.02), frameDark)
  apron.position.set(0.25, -0.08, 0.46)
  room.add(apron)
  for (const x of [-1.9, -0.6, 0.85, 2.4]) {
    for (const z of [-0.4, 0.42]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.72, 0.04), frameDark)
      leg.position.set(x, FLOOR_Y + 0.36, z)
      room.add(leg)
    }
  }

  // neighbouring workstations along the same bench, and a second bench behind the camera's side
  const left1 = backgroundStation(0x1e40af)
  left1.position.set(-1.25, 0, 0)
  const right1 = backgroundStation(0x0f766e)
  right1.position.set(1.65, 0, 0)
  room.add(left1, right1)

  // a chair in front of the bench
  const chair = new THREE.Group()
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.8 })
  const seat = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.05, 0.42, 3, 0.02), seatMat)
  seat.position.y = -0.3
  const backrest = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.36, 0.04, 3, 0.02), seatMat)
  backrest.position.set(0, -0.08, 0.2)
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 12), frameDark)
  post.position.y = -0.53
  chair.add(seat, backrest, post)
  chair.position.set(1.65, 0, 0.75)
  chair.rotation.y = 0.3
  chair.traverse(o => { o.castShadow = true })
  room.add(chair)

  // the mat on the bench, where the work happens
  const mat = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.003, 0.46, 2, 0.001), new THREE.MeshStandardMaterial({ color: 0x3f5f7a, roughness: 0.95 }))
  mat.position.set(0.02, 0.0015, 0.12)
  mat.receiveShadow = true
  room.add(mat)

  scene.add(room)
  return room
}
