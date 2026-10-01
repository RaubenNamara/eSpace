import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/**
 * Shared 3D laboratory room for the realistic per-experiment renderers. Units are metres, with
 * the bench top at y = 0, so apparatus can be built at real-world sizes.
 */

export interface LabRoomOptions {
  cameraPosition?: THREE.Vector3Tuple
  target?: THREE.Vector3Tuple
  minDistance?: number
  maxDistance?: number
  /** 'bench' (default): indoor lab bench at y = 0. 'field': open school field, ground at y = 0. */
  setting?: 'bench' | 'field'
  /** Scene units per metre (default 1). The free-layout engine works at 5 (1 unit = 20 cm). */
  unitScale?: number
}

export interface LabRoom {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  canvas: HTMLCanvasElement
  onFrame: (cb: (dt: number) => void) => void
  resetView: () => void
  /** Moves the camera to frame `box` from the current viewing direction; Reset View returns here. */
  frameBox: (box: THREE.Box3) => void
  /** Normalised device coordinates for a pointer event over the canvas. */
  toNdc: (ev: PointerEvent) => THREE.Vector2
  dispose: () => void
}

const BENCH_W = 1.8
const BENCH_D = 0.75
const BENCH_H = 0.9

/** Throws if the device can't provide a WebGL context - callers then show LabUnsupported. */
export function createLabRoom(host: HTMLElement, opts: LabRoomOptions = {}): LabRoom {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(host.clientWidth || 1, host.clientHeight || 1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.touchAction = 'none'
  host.appendChild(renderer.domElement)

  const field = opts.setting === 'field'
  const s = opts.unitScale ?? 1
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(field ? 0xbcdcf5 : 0xdfe3e8)
  scene.fog = field ? new THREE.Fog(0xbcdcf5, 60 * s, 160 * s) : new THREE.Fog(0xdfe3e8, 4 * s, 9 * s)

  // Image-based lighting so metal, brass and glass pick up believable reflections.
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTexture
  scene.environmentIntensity = 0.55
  pmrem.dispose()

  const camera = new THREE.PerspectiveCamera(40, (host.clientWidth || 1) / (host.clientHeight || 1), 0.01 * s, (field ? 300 : 30) * s)
  const initialPos = new THREE.Vector3(...(opts.cameraPosition ?? [0, 0.5, 1.45]))
  const initialTarget = new THREE.Vector3(...(opts.target ?? [0, 0.3, 0]))
  camera.position.copy(initialPos)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.copy(initialTarget)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enablePan = false
  controls.minDistance = opts.minDistance ?? 0.5
  controls.maxDistance = opts.maxDistance ?? 3
  controls.maxPolarAngle = Math.PI / 2.05
  controls.minAzimuthAngle = -Math.PI / 2.2
  controls.maxAzimuthAngle = Math.PI / 2.2
  controls.update()

  // Room and lights are built in metres inside a group scaled to the caller's units; shadow
  // cameras aren't affected by parent scale, so their extents are scaled by hand.
  const world = new THREE.Group()
  world.scale.setScalar(s)
  scene.add(world)
  if (field) {
    buildFieldLighting(world)
    buildField(world)
  } else {
    buildLighting(world)
    buildRoom(world)
  }
  if (s !== 1) {
    world.traverse((o) => {
      if (!(o instanceof THREE.DirectionalLight) || !o.castShadow) return
      const c = o.shadow.camera
      c.left *= s; c.right *= s; c.top *= s; c.bottom *= s; c.near *= s; c.far *= s
      c.updateProjectionMatrix()
      o.shadow.normalBias *= s
    })
  }

  const frameCallbacks: ((dt: number) => void)[] = []
  const timer = new THREE.Timer()
  let raf = 0
  const loop = (ts: number) => {
    raf = requestAnimationFrame(loop)
    timer.update(ts)
    // Real elapsed time (capped only against tab-switch jumps) - simulations must substep with
    // it rather than clamp it, or they run slower than real time on low-FPS devices and students
    // timing them with the stopwatch get wrong results.
    const dt = Math.min(1, timer.getDelta())
    frameCallbacks.forEach(cb => cb(dt))
    controls.update()
    updateScreenLabels(scene, camera, renderer.domElement.clientHeight)
    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(loop)

  // Last box framed by frameBox(); re-framed when the canvas changes shape (full screen, device
  // rotation) unless the student has since moved the camera themselves.
  let framedBox: THREE.Box3 | null = null
  let userMovedCamera = false
  controls.addEventListener('start', () => { userMovedCamera = true })

  const resizeObserver = new ResizeObserver(() => {
    const w = host.clientWidth
    const h = host.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    if (framedBox && !userMovedCamera) frameBox(framedBox)
  })
  resizeObserver.observe(host)

  function frameBox(box: THREE.Box3) {
    if (box.isEmpty()) return
    framedBox = box.clone()
    userMovedCamera = false
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const vFov = (camera.fov * Math.PI) / 180
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect)
    // Distance at which both the width and the depth/height of the box fit, with a margin
    const dist = Math.max((size.x / 2) / Math.tan(hFov / 2), (Math.max(size.y, size.z * 0.6) / 2) / Math.tan(vFov / 2)) * 1.12 + size.z * 0.25
    const dir = initialPos.clone().sub(initialTarget).normalize()
    const d = Math.min(controls.maxDistance, Math.max(controls.minDistance, dist))
    initialTarget.copy(center)
    initialPos.copy(center).addScaledVector(dir, d)
    camera.position.copy(initialPos)
    controls.target.copy(initialTarget)
    controls.update()
  }

  const ndc = new THREE.Vector2()

  return {
    renderer,
    scene,
    camera,
    controls,
    canvas: renderer.domElement,
    onFrame: cb => { frameCallbacks.push(cb) },
    resetView: () => {
      camera.position.copy(initialPos)
      controls.target.copy(initialTarget)
      controls.update()
    },
    frameBox,
    toNdc: (ev) => {
      const rect = renderer.domElement.getBoundingClientRect()
      ndc.set(((ev.clientX - rect.left) / rect.width) * 2 - 1, -((ev.clientY - rect.top) / rect.height) * 2 + 1)
      return ndc
    },
    dispose: () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      controls.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Sprite) {
          obj.geometry?.dispose()
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m: THREE.Material & { map?: THREE.Texture | null }) => { m.map?.dispose(); m.dispose() })
        }
      })
      envTexture.dispose()
      renderer.dispose()
      // dispose() alone doesn't release the WebGL context; mobile browsers cap live contexts low.
      renderer.forceContextLoss()
      renderer.domElement.remove()
    },
  }
}

function buildLighting(scene: THREE.Object3D) {
  scene.add(new THREE.HemisphereLight(0xf5f7ff, 0x8a8f99, 0.55))

  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(1.2, 2.4, 1.6)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.left = -1
  key.shadow.camera.right = 1
  key.shadow.camera.top = 1
  key.shadow.camera.bottom = -1
  key.shadow.camera.near = 0.5
  key.shadow.camera.far = 6
  key.shadow.bias = -0.0005
  key.shadow.normalBias = 0.02
  key.shadow.radius = 4
  scene.add(key)

  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.45)
  fill.position.set(-1.6, 1.2, 0.8)
  scene.add(fill)
}

function buildRoom(scene: THREE.Object3D) {
  // Floor - vinyl tiles
  const floorTex = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#b9bec6'
    ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 1200; i++) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '60,64,72'},${Math.random() * 0.06})`
      ctx.fillRect(Math.random() * w, Math.random() * h, 3, 3)
    }
    ctx.strokeStyle = 'rgba(70,74,82,0.35)'
    ctx.lineWidth = 3
    ctx.strokeRect(0, 0, w, h)
  })
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping
  floorTex.repeat.set(12, 12)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 14),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.85 }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -BENCH_H
  floor.receiveShadow = true
  scene.add(floor)

  // Back wall with a tiled splashback band, as in a school lab
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 5),
    new THREE.MeshStandardMaterial({ color: 0xeef0f2, roughness: 0.95 }),
  )
  wall.position.set(0, 1.6, -BENCH_D / 2 - 0.25)
  wall.receiveShadow = true
  scene.add(wall)

  const tileTex = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#f7f8f9'
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = '#c9ced4'
    ctx.lineWidth = 4
    ctx.strokeRect(0, 0, w, h)
  })
  tileTex.wrapS = tileTex.wrapT = THREE.RepeatWrapping
  tileTex.repeat.set(40, 4)
  const splash = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 0.6),
    new THREE.MeshStandardMaterial({ map: tileTex, roughness: 0.3, metalness: 0 }),
  )
  splash.position.set(0, 0.3, -BENCH_D / 2 - 0.249)
  scene.add(splash)

  // Bench: black chemical-resistant resin top on a wooden cabinet
  const top = new THREE.Mesh(
    new RoundedBoxGeometry(BENCH_W, 0.035, BENCH_D, 3, 0.008),
    new THREE.MeshPhysicalMaterial({ color: 0x1f2328, roughness: 0.42, clearcoat: 0.4, clearcoatRoughness: 0.35 }),
  )
  top.position.y = -0.0175
  top.receiveShadow = true
  top.castShadow = true
  scene.add(top)

  const woodTex = woodTexture()
  const cabinet = new THREE.Mesh(
    new THREE.BoxGeometry(BENCH_W - 0.06, BENCH_H - 0.035, BENCH_D - 0.06),
    new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.7 }),
  )
  cabinet.position.y = -BENCH_H / 2 - 0.0175
  cabinet.receiveShadow = true
  scene.add(cabinet)

  // Cabinet door seams and handles
  const seamMat = new THREE.MeshStandardMaterial({ color: 0x3b2a1c, roughness: 0.8 })
  const handleMat = labMaterials.steel()
  for (const x of [-0.6, 0, 0.6]) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.004, BENCH_H - 0.12, 0.002), seamMat)
    seam.position.set(x, -BENCH_H / 2 - 0.02, (BENCH_D - 0.06) / 2 + 0.001)
    scene.add(seam)
  }
  for (const x of [-0.66, -0.54, -0.06, 0.06, 0.54, 0.66]) {
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.1, 12), handleMat)
    handle.position.set(x, -0.2, (BENCH_D - 0.06) / 2 + 0.015)
    scene.add(handle)
  }
}

function buildFieldLighting(scene: THREE.Object3D) {
  scene.add(new THREE.HemisphereLight(0xdfefff, 0x5d7a3a, 0.8))
  const sun = new THREE.DirectionalLight(0xfff4e0, 2.2)
  sun.position.set(8, 30, 18)
  sun.target.position.set(12, 0, 0)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  Object.assign(sun.shadow.camera, { left: -20, right: 20, top: 20, bottom: -20, near: 1, far: 80 })
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.03
  scene.add(sun, sun.target)
}

function buildField(scene: THREE.Object3D) {
  const grass = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#5f8f3e'
    ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 6000; i++) {
      const shade = 60 + Math.random() * 70
      ctx.fillStyle = `rgba(${shade * 0.6},${shade + 40},${shade * 0.4},0.35)`
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 5)
    }
  })
  grass.wrapS = grass.wrapT = THREE.RepeatWrapping
  grass.repeat.set(80, 80)
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({ map: grass, roughness: 1 }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  // White boundary line and distant trees for a sense of scale
  const line = new THREE.Mesh(new THREE.PlaneGeometry(80, 0.1), new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.9 }))
  line.rotation.x = -Math.PI / 2
  line.position.set(20, 0.003, -6)
  scene.add(line)

  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5b4330, roughness: 0.9 })
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x3f6b2a, roughness: 0.9 })
  for (let i = 0; i < 14; i++) {
    const x = -20 + i * 6 + (i % 3) * 1.5
    const z = -30 - (i % 4) * 4
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 3, 8), trunkMat)
    trunk.position.set(x, 1.5, z)
    const crown = new THREE.Mesh(new THREE.SphereGeometry(2.2 + (i % 3) * 0.5, 12, 10), leafMat)
    crown.position.set(x, 4.2 + (i % 2), z)
    scene.add(trunk, crown)
  }
}

function woodTexture(): THREE.CanvasTexture {
  return canvasTexture(512, 512, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, w, 0)
    grad.addColorStop(0, '#8a5a36')
    grad.addColorStop(0.5, '#9a6841')
    grad.addColorStop(1, '#84552f')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 90; i++) {
      const y = Math.random() * h
      ctx.strokeStyle = `rgba(${Math.random() > 0.5 ? '60,35,18' : '170,120,80'},${0.08 + Math.random() * 0.12})`
      ctx.lineWidth = 1 + Math.random() * 2
      ctx.beginPath()
      ctx.moveTo(0, y)
      for (let x = 0; x <= w; x += 32) ctx.lineTo(x, y + Math.sin(x / 60 + i) * 4)
      ctx.stroke()
    }
  })
}

export function canvasTexture(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  draw(canvas.getContext('2d')!, w, h)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  // Maximum anisotropic filtering (Three.js clamps to what the GPU supports) - keeps printed
  // scales sharp when seen at an angle or from across the bench instead of blurring out.
  tex.anisotropy = 16
  return tex
}

/**
 * A scale number that keeps the same on-screen size at any camera distance (tagged with
 * userData.screenPx; createLabRoom resizes these every frame). `pairWith` is the neighbouring
 * label: when the two would overlap on screen (zoomed far out) this one hides, keeping the
 * coarser set of numbers readable.
 */
export function makeScreenLabel(text: string, px = 15, pairWith?: THREE.Object3D): THREE.Sprite {
  const fontPx = 64
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  ctx.font = `800 ${fontPx}px Arial, sans-serif`
  const textW = Math.ceil(ctx.measureText(text).width)
  canvas.width = textW + 36
  canvas.height = fontPx + 24
  const c = canvas.getContext('2d')!
  c.fillStyle = 'rgba(255,255,255,0.92)'
  c.beginPath(); c.roundRect(0, 0, canvas.width, canvas.height, 18); c.fill()
  c.strokeStyle = 'rgba(15,23,42,0.35)'
  c.lineWidth = 3
  c.stroke()
  c.fillStyle = '#0f172a'
  c.font = `800 ${fontPx}px Arial, sans-serif`
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.fillText(text, canvas.width / 2, canvas.height / 2 + 2)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, sizeAttenuation: false, depthWrite: false, transparent: true, toneMapped: false }))
  sprite.userData.screenPx = px
  sprite.userData.aspect = canvas.width / canvas.height
  sprite.userData.pairWith = pairWith ?? null
  sprite.userData.role = 'scale_label'
  sprite.renderOrder = 6
  sprite.raycast = () => {}
  // Sensible size even where nothing updates it (e.g. an editor view): assumes a ~700px tall view
  const h = (px / 700) * 0.73
  sprite.scale.set(h * sprite.userData.aspect, h, 1)
  return sprite
}

const _a = new THREE.Vector3()
const _b = new THREE.Vector3()
/** Keeps screen labels at their pixel size and hides the in-between ones that would overlap. */
export function updateScreenLabels(scene: THREE.Scene, camera: THREE.PerspectiveCamera, viewportH: number) {
  const unitsPerPx = (2 * Math.tan(((camera.fov * Math.PI) / 180) / 2)) / Math.max(1, viewportH)
  scene.traverse((o) => {
    const px = o.userData.screenPx as number | undefined
    if (!px) return
    const h = px * unitsPerPx
    o.scale.set(h * (o.userData.aspect as number), h, 1)
    const pair = o.userData.pairWith as THREE.Object3D | null
    if (!pair) return
    o.getWorldPosition(_a).project(camera)
    pair.getWorldPosition(_b).project(camera)
    const gapPx = Math.abs(_a.y - _b.y) * viewportH / 2 + Math.abs(_a.x - _b.x) * viewportH / 2
    o.visible = gapPx > px * 1.25
  })
}

/** Physically-based materials for common lab apparatus. Each call returns a fresh material. */
export const labMaterials = {
  steel: () => new THREE.MeshStandardMaterial({ color: 0xc7ccd1, metalness: 1, roughness: 0.28 }),
  chrome: () => new THREE.MeshStandardMaterial({ color: 0xe6e9ec, metalness: 1, roughness: 0.12 }),
  brass: () => new THREE.MeshStandardMaterial({ color: 0xd4a84b, metalness: 1, roughness: 0.22 }),
  castIron: () => new THREE.MeshStandardMaterial({ color: 0x2f4b63, metalness: 0.4, roughness: 0.55 }),
  blackPlastic: () => new THREE.MeshStandardMaterial({ color: 0x1b1d20, roughness: 0.5 }),
  /** Plain transparent glass - transmission materials re-render the whole scene every frame, too slow for school laptops. */
  glass: () => new THREE.MeshStandardMaterial({ color: 0xf4faff, metalness: 0, roughness: 0.05, transparent: true, opacity: 0.3, depthWrite: false }),
}
