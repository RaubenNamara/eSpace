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
  /** Build the bench cabinet as a real cupboard: hinged doors and shelves inside. */
  cupboard?: boolean
  /** Two glass-fronted apparatus cabinets on the wall behind the bench (left and right). */
  wallCabinets?: boolean
  /** Bench length in metres (default 1.8); the wall cabinets widen with it */
  benchLength?: number
  /** Two more benches of the same length against the left and right walls, plus a small
   *  table just beyond each end of the main bench (decor only) */
  sideBenches?: boolean
}

/** One wall cabinet's shelves, in scene units: where apparatus can stand. */
export interface WallCabinetShelves {
  minX: number
  maxX: number
  /** Shelf top heights, top shelf first */
  rows: number[]
  /** Usable height above each shelf and depth front-to-back */
  rowHeight: number
  depth: number
  /** Where an item stands (front-back centre) */
  z: number
  /** Front edge of the shelves, for their label strips */
  frontZ: number
  /** Number of door bays (an upright stands between neighbouring bays) */
  bays: number
  /** Top of the cornice and its front face, and the cabinet's centre - for its name plate */
  topY: number
  corniceFrontZ: number
  cx: number
  /** Where the cabinet hangs: its own coordinates turned by rotY about the vertical and moved by offset */
  rotY: number
  offset: THREE.Vector3
}

export interface LabWallCabinets {
  cabinets: WallCabinetShelves[]
  /** Glass door hinge groups (toggle with LabCupboard-style userData.open) */
  doors: THREE.Object3D[]
  blockers: THREE.Object3D[]
}

export interface FitOptions {
  /** Direction from the box towards the camera (default: the current viewing direction) */
  dir?: THREE.Vector3
  /** Glide the camera there instead of jumping */
  animate?: boolean
}

/** The bench cupboard (only with `cupboard: true`). Positions are in metres - see `unitScale`. */
export interface LabCupboard {
  /** Hinge groups, one per door; any mesh inside one belongs to that door */
  doors: THREE.Object3D[]
  /** Carcass panels - they stop clicks reaching anything behind them */
  blockers: THREE.Object3D[]
  /** Interior of each bay, in scene units: shelf top heights and x range */
  bays: { minX: number; maxX: number; levels: number[]; frontZ: number; backZ: number }[]
  toggleDoor: (door: THREE.Object3D) => void
  isOpen: (door: THREE.Object3D) => boolean
  /** The door (hinge group) a mesh belongs to, if any */
  doorOf: (obj: THREE.Object3D | null) => THREE.Object3D | null
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
  cupboard: LabCupboard | null
  wallCabinets: LabWallCabinets | null
  /** Cupboard doors and panels of the other benches in the room (empty, but they open) */
  furniture: { doors: THREE.Object3D[]; blockers: THREE.Object3D[] }
  /** Sink taps (rooms with wall cabinets): click one to turn its water on or off */
  taps: LabTaps | null
  /** Bench length in metres */
  benchLength: number
  /** Glide the camera to look from `pos` at `target` (both in metres); Reset View returns here */
  flyTo: (pos: THREE.Vector3, target: THREE.Vector3) => void
  /** Opens or closes any door built by the room (cupboard or wall cabinet) */
  toggleDoor: (door: THREE.Object3D) => void
  /** The door (hinge group) a mesh belongs to, if any */
  doorOf: (obj: THREE.Object3D | null) => THREE.Object3D | null
  /**
   * Like frameBox, but fits every corner of `box` on screen exactly, leaving `fill` (0-1) of the
   * view's width/height for it - used to keep a whole object such as the bench in view.
   */
  fitBox: (box: THREE.Box3, fill?: number, opts?: FitOptions) => void
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
  const benchLength = opts.benchLength ?? BENCH_W
  // Doors and panels of the other benches' cupboards (open and close like the main one's)
  const furnitureDoors: THREE.Object3D[] = []
  const furnitureBlockers: THREE.Object3D[] = []
  let fixtures: Fixtures | null = null
  let cctvLed: THREE.Mesh | null = null
  const stockCabinets: { c: WallParts['cabinets'][number]; rotY: number; offset: THREE.Vector3 }[] = []
  let cupboardParts: CupboardParts | null = null
  let wallParts: WallParts | null = null
  if (field) {
    buildFieldLighting(world)
    buildField(world)
  } else {
    buildLighting(world)
    // With the wall cabinets, a fabric wall covering replaces the tiled splashback below them
    cupboardParts = buildRoom(world, !!opts.cupboard, benchLength, s, !!opts.wallCabinets)
    if (opts.wallCabinets) {
      wallParts = buildWallCabinets(world, benchLength, s)
      fixtures = buildSinksAndClock(world)
      const entrance = buildEntrance(world)
      furnitureDoors.push(...entrance.doors)
      furnitureBlockers.push(...entrance.blockers)
      cctvLed = entrance.cctvLed
      // A whole room to look round: no limit on turning the view
      controls.minAzimuthAngle = -Infinity
      controls.maxAzimuthAngle = Infinity
      // One long cabinet either side of the middle pair, out to just short of the corner sinks;
      // empty for now, doors open like the others
      const innerEdge = benchLength / 2 + 0.1 + 0.08 + 0.16
      const outerEdge = 6.1
      const longW = outerEdge - innerEdge
      const longCx = (innerEdge + outerEdge) / 2
      const longs = buildWallCabinets(world, benchLength, s, { width: longW, centres: [-longCx, longCx], lit: false, covering: false, doorPairs: 3 })
      furnitureDoors.push(...longs.doors)
      furnitureBlockers.push(...longs.blockers)
      // Stocking order, left to right along the back wall: long, middle, middle, long
      stockCabinets.push(
        { c: longs.cabinets[0], rotY: 0, offset: new THREE.Vector3() },
        { c: wallParts.cabinets[0], rotY: 0, offset: new THREE.Vector3() },
        { c: wallParts.cabinets[1], rotY: 0, offset: new THREE.Vector3() },
        { c: longs.cabinets[1], rotY: 0, offset: new THREE.Vector3() },
      )
    }
    if (opts.sideBenches) {
      // Against the side walls (see buildWallCovering: walls at x = ±7 m), facing into the room
      const wallX = 7 - BENCH_D / 2 - 0.02
      for (const side of [-1, 1]) {
        const bench = buildPlainBench(benchLength, s)
        bench.group.position.set(side * wallX, 0, 1.6)
        bench.group.rotation.y = -side * Math.PI / 2
        world.add(bench.group)
        furnitureDoors.push(...bench.parts.doors)
        furnitureBlockers.push(...bench.parts.blockers)
        // Two glass cabinets on the wall above it, empty for now (their doors open like the others)
        if (opts.wallCabinets) {
          const wallRun = new THREE.Group()
          wallRun.position.set(side * 7, 0, 1.6)
          wallRun.rotation.y = -side * Math.PI / 2
          world.add(wallRun)
          const half = benchLength / 2 - 0.04
          const extra = buildWallCabinets(wallRun, benchLength, s, { wallZ: 0, width: half, centres: [-half / 2 - 0.02, half / 2 + 0.02], lit: false, covering: false })
          furnitureDoors.push(...extra.doors)
          furnitureBlockers.push(...extra.blockers)
          // The one nearer the back wall first
          for (const c of [...extra.cabinets].reverse()) stockCabinets.push({ c, rotY: wallRun.rotation.y, offset: wallRun.position.clone() })
        }
        // A small side table close to each end of the main bench
        const small = buildPlainBench(0.9, s)
        small.group.position.set(side * (benchLength / 2 + 0.5 + 0.45), 0, 0)
        world.add(small.group)
        furnitureDoors.push(...small.parts.doors)
        furnitureBlockers.push(...small.parts.blockers)
      }
    }
  }
  // A wider view of the room needs the fog pushed back
  if (!field && (opts.cupboard || opts.wallCabinets)) scene.fog = new THREE.Fog(0xdfe3e8, 11 * s, 26 * s)
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
    if (flight) {
      flight.t = Math.min(1, flight.t + dt / 0.7)
      const e = flight.t < 0.5 ? 2 * flight.t * flight.t : 1 - Math.pow(-2 * flight.t + 2, 2) / 2
      camera.position.lerpVectors(flight.fromPos, flight.toPos, e)
      controls.target.lerpVectors(flight.fromTarget, flight.toTarget, e)
      if (flight.t >= 1) flight = null
    }
    controls.update()
    updateScreenLabels(scene, camera, renderer.domElement.clientHeight)
    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(loop)

  // Last box framed by frameBox(); re-framed when the canvas changes shape (full screen, device
  // rotation) unless the student has since moved the camera themselves.
  let framedBox: THREE.Box3 | null = null
  let fittedFill: number | null = null
  let fittedDir: THREE.Vector3 | null = null
  let userMovedCamera = false
  let flight: { fromPos: THREE.Vector3; toPos: THREE.Vector3; fromTarget: THREE.Vector3; toTarget: THREE.Vector3; t: number } | null = null
  controls.addEventListener('start', () => { userMovedCamera = true; flight = null })

  const resizeObserver = new ResizeObserver(() => {
    const w = host.clientWidth
    const h = host.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    if (framedBox && !userMovedCamera) {
      if (fittedFill !== null) fitBox(framedBox, fittedFill, { dir: fittedDir || undefined })
      else frameBox(framedBox)
    }
  })
  resizeObserver.observe(host)

  function fitBox(box: THREE.Box3, fill = 0.7, fitOpts: FitOptions = {}) {
    if (box.isEmpty()) return
    framedBox = box.clone()
    fittedFill = fill
    userMovedCamera = false
    const center = box.getCenter(new THREE.Vector3())
    const dir = (fitOpts.dir ? fitOpts.dir.clone() : initialPos.clone().sub(initialTarget)).normalize()
    fittedDir = dir.clone()
    const startPos = camera.position.clone()
    const startTarget = controls.target.clone()
    const corners = [0, 1, 2, 3, 4, 5, 6, 7].map(i => new THREE.Vector3(
      i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z))
    const fits = (d: number) => {
      camera.position.copy(center).addScaledVector(dir, d)
      camera.lookAt(center)
      camera.updateMatrixWorld(true)
      return corners.every((c) => {
        const p = c.clone().project(camera)
        return p.z < 1 && Math.abs(p.x) <= fill && Math.abs(p.y) <= fill
      })
    }
    // Smallest distance at which every corner is on screen (binary search)
    let lo = 0.01, hi = controls.maxDistance * 4
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2
      if (fits(mid)) hi = mid
      else lo = mid
    }
    controls.maxDistance = Math.max(controls.maxDistance, hi * 1.5)
    initialTarget.copy(center)
    initialPos.copy(center).addScaledVector(dir, hi)
    if (fitOpts.animate) {
      camera.position.copy(startPos)
      camera.lookAt(startTarget)
      flight = { fromPos: startPos, toPos: initialPos.clone(), fromTarget: startTarget, toTarget: initialTarget.clone(), t: 0 }
      return
    }
    flight = null
    camera.position.copy(initialPos)
    controls.target.copy(initialTarget)
    controls.update()
  }

  function frameBox(box: THREE.Box3) {
    if (box.isEmpty()) return
    framedBox = box.clone()
    fittedFill = null
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

  // Doors swing smoothly towards their target angle
  // The CCTV camera's recording light blinks
  if (cctvLed) {
    const led = cctvLed
    let t = 0
    frameCallbacks.push((dt) => { t += dt; led.visible = (t % 1.2) < 0.7 })
  }
  // Taps: handles turn, water streams flicker while on; the clock follows the real time
  let taps: LabTaps | null = null
  if (fixtures) {
    const fx = fixtures
    let flow = 0
    frameCallbacks.push((dt) => {
      flow += dt
      fx.taps.forEach((tap) => {
        const on = !!tap.userData.on
        const handle = tap.userData.handle as THREE.Object3D
        handle.rotation.y += ((on ? -Math.PI / 2 : 0) - handle.rotation.y) * Math.min(1, dt * 10)
        const stream = tap.userData.stream as THREE.Mesh
        stream.visible = on
        if (on) {
          const tex = (stream.material as THREE.MeshStandardMaterial).map!
          tex.offset.y = (tex.offset.y - dt * 3) % 1
          stream.scale.x = stream.scale.z = 1 + Math.sin(flow * 40) * 0.08
        }
        ;(tap.userData.splash as THREE.Object3D).visible = on
      })
      const now = new Date()
      const sec = now.getSeconds() + now.getMilliseconds() / 1000
      const min = now.getMinutes() + sec / 60
      const hr = (now.getHours() % 12) + min / 60
      fx.clock.second.rotation.z = -(Math.floor(sec) / 60) * Math.PI * 2
      fx.clock.minute.rotation.z = -(min / 60) * Math.PI * 2
      fx.clock.hour.rotation.z = -(hr / 12) * Math.PI * 2
    })
    taps = {
      taps: fx.taps,
      tapOf: (obj) => {
        let o: THREE.Object3D | null = obj
        while (o && !o.userData.isTap) o = o.parent
        return o
      },
      toggle: (tap) => { tap.userData.on = !tap.userData.on },
      isOn: tap => !!tap.userData.on,
      anyOn: () => fx.taps.filter(t => t.userData.on).length,
    }
  }
  const allDoors = [...(cupboardParts?.doors || []), ...(wallParts?.doors || []), ...furnitureDoors]
  if (allDoors.length) {
    frameCallbacks.push((dt) => {
      allDoors.forEach((d) => {
        const target = d.userData.open ? d.userData.openAngle : 0
        d.rotation.y += (target - d.rotation.y) * Math.min(1, dt * 7)
      })
    })
  }
  const doorOf = (obj: THREE.Object3D | null) => {
    let o: THREE.Object3D | null = obj
    while (o && !o.userData.cupboardDoor) o = o.parent
    return o
  }
  const toggleDoor = (door: THREE.Object3D) => { door.userData.open = !door.userData.open }
  const wallCabinets: LabWallCabinets | null = wallParts
    ? {
        doors: wallParts.doors,
        blockers: wallParts.blockers,
        cabinets: stockCabinets.map(({ c, rotY, offset }) => ({
          minX: c.minX * s, maxX: c.maxX * s, rows: c.rows.map(y => y * s), rowHeight: c.rowHeight * s,
          depth: c.depth * s, z: c.z * s, frontZ: c.frontZ * s, bays: c.bays,
          topY: c.topY * s, corniceFrontZ: c.corniceFrontZ * s, cx: c.cx * s,
          rotY, offset: offset.clone().multiplyScalar(s),
        })),
      }
    : null
  let cupboard: LabCupboard | null = null
  if (cupboardParts) {
    const parts = cupboardParts
    cupboard = {
      doors: parts.doors,
      blockers: parts.blockers,
      bays: parts.bays.map(b => ({
        minX: b.minX * s, maxX: b.maxX * s, levels: b.levels.map(y => y * s), frontZ: b.frontZ * s, backZ: b.backZ * s,
      })),
      toggleDoor,
      isOpen: door => !!door.userData.open,
      doorOf,
    }
  }

  return {
    cupboard,
    wallCabinets,
    furniture: { doors: furnitureDoors, blockers: furnitureBlockers },
    taps,
    benchLength,
    flyTo: (pos, target) => {
      framedBox = null
      fittedFill = null
      userMovedCamera = false
      initialPos.copy(pos).multiplyScalar(s)
      initialTarget.copy(target).multiplyScalar(s)
      controls.maxDistance = Math.max(controls.maxDistance, initialPos.distanceTo(initialTarget) * 1.5)
      flight = { fromPos: camera.position.clone(), toPos: initialPos.clone(), fromTarget: controls.target.clone(), toTarget: initialTarget.clone(), t: 0 }
    },
    toggleDoor,
    doorOf,
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
    fitBox,
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

interface WallParts {
  doors: THREE.Object3D[]
  blockers: THREE.Object3D[]
  cabinets: { bays: number; topY: number; corniceFrontZ: number; cx: number; minX: number; maxX: number; rows: number[]; rowHeight: number; depth: number; z: number; frontZ: number }[]
}

const WALL_Z = -BENCH_D / 2 - 0.25

export interface LabTaps {
  /** One group per tap (click anything in it to turn it on or off) */
  taps: THREE.Object3D[]
  tapOf: (obj: THREE.Object3D | null) => THREE.Object3D | null
  toggle: (tap: THREE.Object3D) => void
  isOn: (tap: THREE.Object3D) => boolean
  /** How many taps are running */
  anyOn: () => number
}

interface Fixtures {
  taps: THREE.Object3D[]
  clock: { hour: THREE.Object3D; minute: THREE.Object3D; second: THREE.Object3D }
}

/**
 * Two sink units in the back corners of the room - wooden cupboard, black worktop, stainless
 * basin and a swan-neck tap whose lever turns the water on - and a wall clock above the cabinets.
 */
function buildSinksAndClock(scene: THREE.Object3D): Fixtures {
  const steel = labMaterials.steel()
  const basinMat = new THREE.MeshStandardMaterial({ color: 0xc9ced4, roughness: 0.25, metalness: 0.9, side: THREE.DoubleSide })
  const woodMat = new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.7 })
  const topMat = new THREE.MeshPhysicalMaterial({ color: 0x1f2328, roughness: 0.42, clearcoat: 0.4 })
  const W = 0.8, D = 0.6
  const taps: THREE.Object3D[] = []
  for (const side of [-1, 1]) {
    const unit = new THREE.Group()
    unit.position.set(side * (7 - W / 2 - 0.02), 0, WALL_Z + D / 2 + 0.01)
    scene.add(unit)
    // Cupboard with two doors and handles - its top stops below the basin, with an apron of
    // wooden panels round the edges up to the worktop so the basin sits inside it
    const apronH = 0.2
    const cabH = BENCH_H - 0.035 - apronH
    const cab = new THREE.Mesh(new THREE.BoxGeometry(W - 0.04, cabH, D - 0.04), woodMat)
    cab.position.y = -BENCH_H + cabH / 2
    cab.castShadow = cab.receiveShadow = true
    unit.add(cab)
    const apron = (w: number, d: number, x: number, z: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, apronH, d), woodMat)
      m.position.set(x, -0.035 - apronH / 2, z)
      unit.add(m)
    }
    apron(W - 0.04, 0.02, 0, (D - 0.04) / 2 - 0.01)
    apron(W - 0.04, 0.02, 0, -(D - 0.04) / 2 + 0.01)
    apron(0.02, D - 0.04, (W - 0.04) / 2 - 0.01, 0)
    apron(0.02, D - 0.04, -(W - 0.04) / 2 + 0.01, 0)
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.004, BENCH_H - 0.12, 0.002), new THREE.MeshStandardMaterial({ color: 0x3b2a1c }))
    seam.position.set(0, -BENCH_H / 2 - 0.02, (D - 0.04) / 2 + 0.001)
    unit.add(seam)
    for (const dx of [-0.04, 0.04]) {
      const h = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.1, 12), steel)
      h.position.set(dx, -0.2, (D - 0.04) / 2 + 0.015)
      unit.add(h)
    }
    // Worktop with a hole for the basin (four strips round it)
    const bw = 0.5, bd = 0.36, bz = 0.03, depth = 0.2
    const strip = (w: number, d: number, x: number, z: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.035, d), topMat)
      m.position.set(x, -0.0175, z)
      m.receiveShadow = true
      unit.add(m)
    }
    strip(W, (D / 2 + bz) - bd / 2, 0, -D / 2 + ((D / 2 + bz) - bd / 2) / 2)
    strip(W, D / 2 - bz - bd / 2, 0, bz + bd / 2 + (D / 2 - bz - bd / 2) / 2)
    strip((W - bw) / 2, bd, -(bw / 2 + (W - bw) / 4), bz)
    strip((W - bw) / 2, bd, bw / 2 + (W - bw) / 4, bz)
    // Stainless basin: open box sunk into the top, with a plughole
    const basin = new THREE.Mesh(new THREE.BoxGeometry(bw, depth, bd), [basinMat, basinMat, basinMat, basinMat, basinMat, basinMat])
    ;(basin.geometry as THREE.BoxGeometry).groups.splice(2, 1) // no lid
    basin.position.set(0, -depth / 2, bz)
    unit.add(basin)
    const plug = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.004, 20), new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.8, roughness: 0.4 }))
    plug.position.set(0, -depth + 0.003, bz)
    unit.add(plug)

    // Swan-neck tap at the back of the basin
    const tap = new THREE.Group()
    tap.userData.isTap = true
    tap.userData.on = false
    const tz = bz - bd / 2 - 0.06, R = 0.09, riser = 0.3
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, riser, 16), steel)
    pipe.position.set(0, riser / 2, tz)
    const neck = new THREE.Mesh(new THREE.TorusGeometry(R, 0.014, 10, 24, Math.PI), steel)
    neck.position.set(0, riser, tz + R)
    neck.rotation.y = -Math.PI / 2
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.013, 0.04, 14), steel)
    nozzle.position.set(0, riser - 0.02, tz + 2 * R)
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.02, 20), steel)
    base.position.set(0, 0.01, tz)
    // Lever handle on the side of the riser - turns a quarter round when on
    const handle = new THREE.Group()
    handle.position.set(0, 0.16, tz)
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.04, 16), steel)
    const lever = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.11), steel)
    lever.position.set(0, 0.01, 0.06)
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.014, 12, 8), new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 }))
    tip.position.set(0, 0.01, 0.115)
    handle.add(hub, lever, tip)
    // Running water: a slightly rippled transparent column from the nozzle to the basin floor
    const fall = riser - 0.04 + depth
    const ripples = canvasTexture(32, 128, (ctx, w, h) => {
      ctx.fillStyle = '#dbeafe'
      ctx.fillRect(0, 0, w, h)
      for (let y = 0; y < h; y += 6) {
        ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.5})`
        ctx.fillRect(0, y, w, 2)
      }
    })
    ripples.wrapS = ripples.wrapT = THREE.RepeatWrapping
    ripples.repeat.set(1, 3)
    const stream = new THREE.Mesh(
      new THREE.CylinderGeometry(0.009, 0.012, fall, 12, 1, true),
      new THREE.MeshStandardMaterial({ map: ripples, color: 0xbfe3ff, transparent: true, opacity: 0.75, roughness: 0.05, metalness: 0.1, depthWrite: false }),
    )
    stream.position.set(0, riser - 0.04 - fall / 2, tz + 2 * R)
    stream.visible = false
    // Splash: a thin pool of water on the basin floor
    const splash = new THREE.Mesh(new THREE.CircleGeometry(0.07, 24), new THREE.MeshStandardMaterial({ color: 0xbfe3ff, transparent: true, opacity: 0.6, roughness: 0.05 }))
    splash.rotation.x = -Math.PI / 2
    splash.position.set(0, -depth + 0.006, tz + 2 * R)
    splash.visible = false
    // Invisible click target over the tap and basin, so the thin pipe is easy to hit
    const hit = new THREE.Mesh(
      new THREE.BoxGeometry(bw + 0.06, riser + 0.05 + depth, bd + 0.16),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false }),
    )
    hit.position.set(0, (riser + 0.05 - depth) / 2, bz - 0.06)
    tap.add(pipe, neck, nozzle, base, handle, stream, splash, hit)
    tap.userData.handle = handle
    tap.userData.stream = stream
    tap.userData.splash = splash
    unit.add(tap)
    taps.push(tap)
  }

  // Wall clock centred above the wall cabinets
  const clock = new THREE.Group()
  clock.position.set(0, 1.68, WALL_Z + 0.02)
  scene.add(clock)
  const r = 0.12
  const face = canvasTexture(512, 512, (ctx, w) => {
    const c = w / 2
    ctx.fillStyle = '#fffdf7'
    ctx.beginPath(); ctx.arc(c, c, c, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#111827'
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2
      const big = i % 5 === 0
      ctx.save(); ctx.translate(c, c); ctx.rotate(a)
      ctx.fillRect(big ? -5 : -2, -c + 14, big ? 10 : 4, big ? 34 : 16)
      ctx.restore()
    }
    ctx.font = 'bold 54px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let n = 1; n <= 12; n++) {
      const a = (n / 12) * Math.PI * 2
      ctx.fillText(String(n), c + Math.sin(a) * (c - 92), c - Math.cos(a) * (c - 92))
    }
    ctx.font = 'bold 22px Arial'
    ctx.fillStyle = '#4b5563'
    ctx.fillText('LABORATORY', c, c + 110)
  })
  const rimMesh = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.02, r + 0.02, 0.05, 48), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.4, metalness: 0.5 }))
  rimMesh.rotation.x = Math.PI / 2
  const faceMesh = new THREE.Mesh(new THREE.CircleGeometry(r, 48), new THREE.MeshStandardMaterial({ map: face, roughness: 0.6 }))
  faceMesh.position.z = 0.026
  const glassMesh = new THREE.Mesh(new THREE.CircleGeometry(r, 48), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, roughness: 0.05, clearcoat: 1, depthWrite: false }))
  glassMesh.position.z = 0.05
  clock.add(rimMesh, faceMesh, glassMesh)
  const hand = (len: number, width: number, color: number, z: number) => {
    const pivot = new THREE.Group()
    pivot.position.z = z
    const m = new THREE.Mesh(new THREE.BoxGeometry(width, len, 0.004), new THREE.MeshStandardMaterial({ color, roughness: 0.5 }))
    m.position.y = len / 2 - len * 0.12
    pivot.add(m)
    clock.add(pivot)
    return pivot
  }
  const hour = hand(r * 0.55, 0.014, 0x111827, 0.03)
  const minute = hand(r * 0.8, 0.009, 0x111827, 0.034)
  const second = hand(r * 0.88, 0.004, 0xdc2626, 0.038)
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.012, 16), new THREE.MeshStandardMaterial({ color: 0xdc2626 }))
  cap.rotation.x = Math.PI / 2
  cap.position.z = 0.042
  clock.add(cap)
  return { taps, clock: { hour, minute, second } }
}

/**
 * Two wall-mounted apparatus cabinets behind the bench, top left and top right: four shelves each
 * behind a pair of light, aluminium-framed glass doors that swing open.
 */
/**
 * Display interiors: a dark backing so glassware, white plastic and clear liquids stand out
 * against it, pale maple shelves, and a soft light inside each compartment.
 */
const displayBacking = () => new THREE.MeshStandardMaterial({ color: 0x1e2a3a, roughness: 0.95 })
const displayShelf = () => new THREE.MeshStandardMaterial({ color: 0xe3c89c, roughness: 0.55 })

/** A warm light inside a cabinet, plus the LED strip it seems to come from. `s` = scene units per metre. */
function interiorLight(scene: THREE.Object3D, x: number, y: number, z: number, width: number, s: number, intensity = 9) {
  const strip = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.008, 0.012),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff1d6, emissiveIntensity: 2 }),
  )
  strip.position.set(x, y, z)
  scene.add(strip)
  const light = new THREE.PointLight(0xfff1d6, intensity, 1.4 * s, 2)
  light.position.set(x, y - 0.05, z + 0.05)
  scene.add(light)
}

/**
 * A woven teal wall covering pinned all round the room - back, side and front walls - from the
 * floor up to where the wall cabinets begin (`top`), finished with a wooden rail on top, a row
 * of brass pins under it and a skirting board at the floor. Adds the side and front walls.
 */
function buildWallCovering(scene: THREE.Object3D, top: number) {
  const bottom = -BENCH_H
  const height = top - bottom
  const fabric = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#1f5a63'
    ctx.fillRect(0, 0, w, h)
    // Woven texture: fine light and dark threads both ways
    for (let i = 0; i < w; i += 4) {
      ctx.fillStyle = i % 8 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)'
      ctx.fillRect(i, 0, 2, h)
      ctx.fillRect(0, i, w, 2)
    }
    for (let k = 0; k < 900; k++) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '0,0,0'},${Math.random() * 0.06})`
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2)
    }
    // A faint diamond pattern pressed into the fabric
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(w / 2, 0); ctx.lineTo(w, h / 2); ctx.lineTo(w / 2, h); ctx.lineTo(0, h / 2); ctx.closePath()
    ctx.stroke()
  })
  fabric.wrapS = fabric.wrapT = THREE.RepeatWrapping
  const woodMat = new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.55 })
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xd4a84b, roughness: 0.25, metalness: 1 })
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xeef0f2, roughness: 0.95 })

  // The room: the back wall already exists; add the two side walls and the front wall
  const half = 7
  const frontZ = 7
  const sideLength = frontZ - WALL_Z
  const sideMidZ = (frontZ + WALL_Z) / 2
  const wallH = 5
  // The front wall has the entrance in the middle: a gap the doors fill (see buildEntrance)
  const walls: { x: number; z: number; rotY: number; length: number; newWall: boolean; gap?: number }[] = [
    { x: 0, z: WALL_Z, rotY: 0, length: 2 * half, newWall: false },
    { x: -half, z: sideMidZ, rotY: Math.PI / 2, length: sideLength, newWall: true },
    { x: half, z: sideMidZ, rotY: -Math.PI / 2, length: sideLength, newWall: true },
    { x: 0, z: frontZ, rotY: Math.PI, length: 2 * half, newWall: true, gap: ENTRANCE_W + 0.2 },
  ]
  walls.forEach(({ x, z, rotY, length, newWall, gap }) => {
    // Everything for one wall is built facing +z at the origin, then turned into place
    const run = new THREE.Group()
    run.position.set(x, 0, z)
    run.rotation.y = rotY
    scene.add(run)
    // Stretches of wall either side of the doorway (or the whole wall)
    const segments: [number, number][] = gap ? [[-length / 2, -gap / 2], [gap / 2, length / 2]] : [[-length / 2, length / 2]]
    if (newWall && gap) {
      // Wall above the doorway
      const lintelH = wallH - ENTRANCE_H
      const lintel = new THREE.Mesh(new THREE.PlaneGeometry(gap, lintelH), wallMat)
      lintel.position.y = bottom + ENTRANCE_H + lintelH / 2
      run.add(lintel)
    }
    segments.forEach(([x0, x1]) => {
      const len = x1 - x0
      const mid = (x0 + x1) / 2
      if (newWall) {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(len, wallH), wallMat)
        wall.position.set(mid, bottom + wallH / 2, 0)
        wall.receiveShadow = true
        run.add(wall)
      }
      const tex = fabric.clone()
      tex.needsUpdate = true
      tex.repeat.set(len / 0.35, height / 0.35)
      const cover = new THREE.Mesh(new THREE.PlaneGeometry(len, height), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95 }))
      cover.position.set(mid, bottom + height / 2, 0.004)
      cover.receiveShadow = true
      run.add(cover)
      const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.045, 0.022), woodMat)
      rail.position.set(mid, top - 0.0225, 0.015)
      rail.castShadow = true
      rail.receiveShadow = true
      run.add(rail)
      const skirting = new THREE.Mesh(new THREE.BoxGeometry(len, 0.1, 0.018), woodMat)
      skirting.position.set(mid, bottom + 0.05, 0.013)
      run.add(skirting)
      // Brass pins holding the covering, every 15 cm just under the rail
      const pinCount = Math.floor(len / 0.15)
      const pins = new THREE.InstancedMesh(new THREE.SphereGeometry(0.007, 10, 8), pinMat, pinCount)
      const m = new THREE.Matrix4()
      for (let i = 0; i < pinCount; i++) {
        m.makeTranslation(x0 + 0.075 + i * 0.15, top - 0.075, 0.007)
        pins.setMatrixAt(i, m)
      }
      run.add(pins)
    })
  })
}

const ENTRANCE_W = 1.8
const ENTRANCE_H = 2.1
const FRONT_Z = 7

/**
 * The lab entrance in the middle of the front wall: a pair of wooden doors with glass vision
 * panels and push plates that swing into the room when clicked, an oak frame, a lit green EXIT
 * sign and a SCIENCE LABORATORY plate above, and a short corridor outside. Also a CCTV camera
 * high on the back wall watching the doors. Returns the doors and their panels for clicking.
 */
function buildEntrance(scene: THREE.Object3D): { doors: THREE.Object3D[]; blockers: THREE.Object3D[]; cctvLed: THREE.Mesh } {
  const floorY = -BENCH_H
  const doors: THREE.Object3D[] = []
  const blockers: THREE.Object3D[] = []
  const oak = new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.55 })
  const leafMat = new THREE.MeshStandardMaterial({ map: woodTexture(), color: 0xe0b98a, roughness: 0.5 })
  const steel = labMaterials.steel()
  const z = FRONT_Z
  // Frame (architrave) round the opening, on the room side
  const frame = (w: number, h: number, x: number, y: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.08), oak)
    m.position.set(x, y, z - 0.03)
    m.castShadow = true
    scene.add(m)
    blockers.push(m)
  }
  frame(0.1, ENTRANCE_H + 0.1, -ENTRANCE_W / 2 - 0.05, floorY + (ENTRANCE_H + 0.1) / 2)
  frame(0.1, ENTRANCE_H + 0.1, ENTRANCE_W / 2 + 0.05, floorY + (ENTRANCE_H + 0.1) / 2)
  frame(ENTRANCE_W + 0.2, 0.1, 0, floorY + ENTRANCE_H + 0.05)
  // Two leaves hinged at the sides, opening into the room
  const leafW = ENTRANCE_W / 2 - 0.005
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0.35, roughness: 0.05, depthWrite: false })
  for (const dirX of [1, -1] as const) {
    const pivot = new THREE.Group()
    pivot.position.set(-dirX * ENTRANCE_W / 2, floorY + ENTRANCE_H / 2, z - 0.02)
    // Leaf with a window cut-out: built from rails and stiles round a glass pane
    const w = leafW, h = ENTRANCE_H - 0.01, th = 0.045
    const part = (pw: number, ph: number, px: number, py: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(pw, ph, th), leafMat)
      m.position.set(dirX * px, py, 0)
      m.castShadow = true
      pivot.add(m)
    }
    const winBottom = 0.15, winTop = 0.75, winL = 0.18, winR = w - 0.18
    part(w, h / 2 + winBottom, w / 2, -h / 2 + (h / 2 + winBottom) / 2) // lower panel
    part(w, h / 2 - winTop, w / 2, h / 2 - (h / 2 - winTop) / 2) // top rail
    part(winL, winTop - winBottom, winL / 2, (winTop + winBottom) / 2) // stiles beside the window
    part(w - winR, winTop - winBottom, (w + winR) / 2, (winTop + winBottom) / 2)
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(winR - winL, winTop - winBottom), glassMat)
    pane.position.set(dirX * (winL + winR) / 2, (winTop + winBottom) / 2, 0)
    pane.renderOrder = 2
    pivot.add(pane)
    // Push plate and pull handle on the room side, kick plate at the bottom
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.004), steel)
    plate.position.set(dirX * (w - 0.1), 0.05, -th / 2 - 0.003)
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 12), steel)
    handle.position.set(dirX * (w - 0.1), 0.05, -th / 2 - 0.05)
    const kick = new THREE.Mesh(new THREE.BoxGeometry(w - 0.04, 0.2, 0.004), steel)
    kick.position.set(dirX * w / 2, -h / 2 + 0.12, -th / 2 - 0.003)
    for (const hy of [-0.1, 0.2]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.05, 8), steel)
      post.rotation.x = Math.PI / 2
      post.position.set(dirX * (w - 0.1), hy, -th / 2 - 0.025)
      pivot.add(post)
    }
    pivot.add(plate, handle, kick)
    pivot.userData.cupboardDoor = true
    pivot.userData.open = false
    pivot.userData.openAngle = dirX * 1.45
    scene.add(pivot)
    doors.push(pivot)
  }
  // Lit EXIT sign and the lab's name plate above the doors
  const sign = (w: number, h: number, y: number, draw: (ctx: CanvasRenderingContext2D, cw: number, ch: number) => void, glow: boolean) => {
    const tex = canvasTexture(512, Math.round((512 * h) / w), draw)
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, 0.03),
      // The -z face looks into the room
      [oak, oak, oak, oak, oak, new THREE.MeshStandardMaterial({ map: tex, emissive: glow ? 0xffffff : 0x000000, emissiveMap: glow ? tex : null, emissiveIntensity: glow ? 0.8 : 0, roughness: 0.4 })],
    )
    m.position.set(0, y, z - 0.04)
    scene.add(m)
  }
  sign(0.42, 0.15, floorY + ENTRANCE_H + 0.25, (ctx, w, h) => {
    ctx.fillStyle = '#15803d'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 110px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('EXIT', w / 2 + 40, h / 2 + 6)
    // Running figure, simplified to an arrow and a door
    ctx.fillRect(40, h * 0.3, 70, 16)
    ctx.beginPath(); ctx.moveTo(110, h * 0.3 - 22); ctx.lineTo(150, h * 0.3 + 8); ctx.lineTo(110, h * 0.3 + 38); ctx.fill()
  }, true)
  sign(1.3, 0.18, floorY + ENTRANCE_H + 0.5, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, '#f8e3a1'); g.addColorStop(0.5, '#d9a842'); g.addColorStop(1, '#a8781f')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = '#5a3f0c'
    ctx.lineWidth = 4
    ctx.strokeRect(6, 6, w - 12, h - 12)
    ctx.fillStyle = '#3b2606'
    ctx.font = 'bold 34px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('SCIENCE  LABORATORY', w / 2, h / 2 + 2)
  }, false)

  // A short corridor outside, seen through the open doors
  const corridorFloor = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), new THREE.MeshStandardMaterial({ color: 0xc8ccd2, roughness: 0.8 }))
  corridorFloor.rotation.x = -Math.PI / 2
  corridorFloor.position.set(0, floorY + 0.001, z + 2)
  scene.add(corridorFloor)
  const farWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), new THREE.MeshStandardMaterial({ color: 0xdfe6ec, roughness: 0.9 }))
  farWall.rotation.y = Math.PI
  farWall.position.set(0, floorY + 2.5, z + 4)
  scene.add(farWall)
  for (const sx of [-3, 3]) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(4, 5), new THREE.MeshStandardMaterial({ color: 0xe8edf1, roughness: 0.9 }))
    side.rotation.y = sx < 0 ? Math.PI / 2 : -Math.PI / 2
    side.position.set(sx, floorY + 2.5, z + 2)
    scene.add(side)
  }

  // CCTV camera high on the back wall, right-hand side, aimed at the doors
  const cctv = new THREE.Group()
  cctv.position.set(4.2, 2.35, WALL_Z + 0.02)
  scene.add(cctv)
  const white = new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.4 })
  const mount = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.02), white)
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.16, 12), white)
  arm.rotation.x = Math.PI / 2
  arm.position.z = 0.08
  cctv.add(mount, arm)
  const head = new THREE.Group()
  head.position.z = 0.17
  // Aim at the middle of the doorway
  const aim = new THREE.Vector3(0, floorY + 1.1, z).sub(cctv.position).sub(head.position)
  head.rotation.order = 'YXZ'
  head.rotation.y = Math.atan2(aim.x, aim.z)
  head.rotation.x = -Math.atan2(aim.y, Math.hypot(aim.x, aim.z))
  cctv.add(head)
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.24), white)
  body.position.z = 0.06
  const hood = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.012, 0.28), white)
  hood.position.set(0, 0.046, 0.08)
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.02, 20), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.6 }))
  lens.rotation.x = Math.PI / 2
  lens.position.z = 0.185
  const cctvLed = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 6), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 2 }))
  cctvLed.position.set(0.03, -0.025, 0.182)
  head.add(body, hood, lens, cctvLed)
  return { doors, blockers, cctvLed }
}

interface CabinetOptions {
  /** Where the wall is (cabinet backs stand on it), in the parent's coordinates */
  wallZ?: number
  /** Cabinet width; default just over half the bench */
  width?: number
  /** Cabinet centres along the wall; default one either side of the middle */
  centres?: number[]
  /** Interior lights (off for the extra cabinets, to keep the room quick to render) */
  lit?: boolean
  /** Also pin the fabric covering round the room */
  covering?: boolean
  /** Pairs of glass doors across each cabinet (a long cabinet gets several, with dividers) */
  doorPairs?: number
}

function buildWallCabinets(scene: THREE.Object3D, benchLength: number, s = 1, o: CabinetOptions = {}): WallParts {
  // Each cabinet spans just over half the bench, with a narrow gap between the two
  const W = o.width ?? benchLength / 2 + 0.1, H = 0.86, D = 0.3, t = 0.016
  const bottom = 0.5
  const backZ = (o.wallZ ?? WALL_Z) + 0.002
  const front = backZ + D
  const shelfLevels = 4
  const woodTex = woodTexture()
  const outer = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.6 })
  const backing = displayBacking()
  const inner = displayShelf()
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xd7dbe0, roughness: 0.3, metalness: 0.85 })
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf6ff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.16, depthWrite: false,
  })
  const doors: THREE.Object3D[] = []
  const blockers: THREE.Object3D[] = []
  const cabinets: WallParts['cabinets'] = []

  if (o.covering !== false) buildWallCovering(scene, bottom)
  const offset = 0.08 + W / 2
  for (const cx of o.centres ?? [-offset, offset]) {
    const minX = cx - W / 2, maxX = cx + W / 2
    const panel = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
      m.position.set(x, y, z)
      m.castShadow = true
      m.receiveShadow = true
      scene.add(m)
      blockers.push(m)
    }
    panel(W, H, t, cx, bottom + H / 2, backZ + t / 2, backing) // back
    panel(t, H, D, minX + t / 2, bottom + H / 2, backZ + D / 2, outer) // sides
    panel(t, H, D, maxX - t / 2, bottom + H / 2, backZ + D / 2, outer)
    panel(W, t * 1.5, D, cx, bottom + H - t * 0.75, backZ + D / 2, outer) // top
    panel(W, t * 1.5, D, cx, bottom + t * 0.75, backZ + D / 2, outer) // bottom
    // Cornice along the top
    panel(W + 0.03, 0.03, D + 0.02, cx, bottom + H + 0.015, backZ + D / 2 + 0.01, outer)

    const innerBottom = bottom + t * 1.5, innerTop = bottom + H - t * 1.5
    const gap = (innerTop - innerBottom) / shelfLevels
    const rows: number[] = []
    for (let i = 0; i < shelfLevels; i++) {
      const y = innerBottom + i * gap
      if (i > 0) panel(W - 2 * t, t, D - t - 0.03, cx, y - t / 2, backZ + t + (D - t - 0.03) / 2, inner)
      rows.unshift(y)
    }
    // A light along the top of each half of the cabinet
    if (o.lit !== false) for (const lx of [cx - W / 4, cx + W / 4]) interiorLight(scene, lx, innerTop - 0.006, backZ + D * 0.72, W / 2 - 0.08, s)
    cabinets.push({ bays: o.doorPairs ?? 1, topY: bottom + H + 0.03, corniceFrontZ: backZ + D + 0.02, cx, minX: minX + t, maxX: maxX - t, rows, rowHeight: gap - t, depth: D - t - 0.05, z: backZ + t + (D - t - 0.03) / 2, frontZ: backZ + D - 0.03 })

    // Glass doors, a pair per bay: hinged on the bay's outer sides and meeting in its middle,
    // with an upright between neighbouring bays for them to close against
    const pairs = o.doorPairs ?? 1
    const bayW = W / pairs
    for (let k = 1; k < pairs; k++) panel(t, H, D, minX + k * bayW, bottom + H / 2, backZ + D / 2, outer)
    const doorW = bayW / 2 - 0.004, doorH = H - 0.01
    const bar = 0.018
    const hinges: [number, 1 | -1][] = []
    for (let k = 0; k < pairs; k++) hinges.push([minX + k * bayW, 1], [minX + (k + 1) * bayW, -1])
    for (const [hx, dirX] of hinges) {
      const pivot = new THREE.Group()
      pivot.position.set(hx + dirX * 0.002, bottom + H / 2, front + 0.008)
      const pane = new THREE.Mesh(new THREE.BoxGeometry(doorW - bar, doorH - bar, 0.004), glassMat)
      pane.position.x = dirX * doorW / 2
      pane.renderOrder = 2
      pivot.add(pane)
      const frame = (w: number, h: number, x: number, y: number) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.014), frameMat)
        m.position.set(x, y, 0)
        pivot.add(m)
      }
      frame(doorW, bar, dirX * doorW / 2, doorH / 2 - bar / 2)
      frame(doorW, bar, dirX * doorW / 2, -doorH / 2 + bar / 2)
      frame(bar, doorH, dirX * bar / 2, 0)
      frame(bar, doorH, dirX * (doorW - bar / 2), 0)
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.07, 12), labMaterials.steel())
      knob.position.set(dirX * (doorW - 0.04), -0.12, 0.02)
      pivot.add(knob)
      pivot.userData.cupboardDoor = true
      pivot.userData.open = false
      pivot.userData.openAngle = -dirX * 1.7
      scene.add(pivot)
      doors.push(pivot)
    }
  }
  return { doors, blockers, cabinets }
}

/**
 * A bench like the main one - black resin top on a working cupboard whose doors open (two doors
 * on a short table, four on a long one) - built at the origin, front facing +z. Its cupboard is
 * empty and unlit to keep the room light to render.
 */
function buildPlainBench(length: number, s: number): { group: THREE.Group; parts: CupboardParts } {
  const group = new THREE.Group()
  const top = new THREE.Mesh(
    new RoundedBoxGeometry(length, 0.035, BENCH_D, 3, 0.008),
    new THREE.MeshPhysicalMaterial({ color: 0x1f2328, roughness: 0.42, clearcoat: 0.4, clearcoatRoughness: 0.35 }),
  )
  top.position.y = -0.0175
  top.castShadow = true
  top.receiveShadow = true
  group.add(top)
  const parts = buildCupboard(group, woodTexture(), length, s, false)
  return { group, parts }
}

interface CupboardParts {
  doors: THREE.Object3D[]
  blockers: THREE.Object3D[]
  bays: { minX: number; maxX: number; levels: number[]; frontZ: number; backZ: number }[]
}

function buildRoom(scene: THREE.Object3D, withCupboard = false, BENCH_W = 1.8, s = 1, wallCovering = false): CupboardParts | null {
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
  if (!wallCovering) scene.add(splash)

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
  if (withCupboard) return buildCupboard(scene, woodTex, BENCH_W, s)
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
  return null
}

/**
 * The bench cabinet as a working cupboard: two bays, each with a shelf, behind a pair of hinged
 * doors that meet in the middle, so students can open it and take out what is stored inside.
 */
function buildCupboard(scene: THREE.Object3D, woodTex: THREE.Texture, BENCH_W: number, s = 1, lit = true): CupboardParts {
  const W = BENCH_W - 0.06, D = BENCH_D - 0.06
  const t = 0.018
  const top = -0.035, bottom = -BENCH_H
  const H = top - bottom
  const front = D / 2, back = -D / 2
  const outer = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.7 })
  // Seen from above, the shelves are what the bottles stand out against - so they're dark here
  const inner = new THREE.MeshStandardMaterial({ color: 0x2c3a4d, roughness: 0.7 })
  const backing = displayBacking()
  const blockers: THREE.Object3D[] = []
  const panel = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    m.position.set(x, y, z)
    m.castShadow = true
    scene.add(m)
    blockers.push(m)
    return m
  }
  const floorY = bottom + 0.06
  panel(t, H, D, -W / 2 + t / 2, bottom + H / 2, 0, outer) // left side
  panel(t, H, D, W / 2 - t / 2, bottom + H / 2, 0, outer) // right side
  panel(W, H, t, 0, bottom + H / 2, back + t / 2, backing) // back
  panel(t, H, D - t, 0, bottom + H / 2, t / 2, backing) // middle divider
  panel(W, t, D, 0, floorY - t / 2, 0, inner) // floor
  panel(W, 0.06, t, 0, bottom + 0.03, front - 0.03, outer) // kick plinth
  panel(W, 0.04, t, 0, top - 0.02, front - t / 2, outer) // top rail under the bench top
  const shelfY = -0.46
  const bayW = W / 2 - t * 1.5
  panel(bayW, t, D - t, -W / 4, shelfY - t / 2, t / 2, inner)
  panel(bayW, t, D - t, W / 4, shelfY - t / 2, t / 2, inner)
  // A light under the bench top and under the shelf of each bay, so nothing sits in the dark
  if (lit) for (const bx of [-W / 4, W / 4]) {
    interiorLight(scene, bx, top - 0.05, front - 0.12, bayW - 0.1, s, 10)
    interiorLight(scene, bx, shelfY - t - 0.006, front - 0.12, bayW - 0.1, s, 10)
  }

  // A pair of doors hinged on the outer sides, meeting in the middle (one door per bay)
  const doorTop = top - 0.04, doorBottom = floorY - t
  const doorH = doorTop - doorBottom - 0.002
  // A long bench gets a pair of doors per bay; a short one a single door per bay
  const fourDoors = W > 2.2
  const doorW = (fourDoors ? W / 4 : W / 2) - 0.0025
  const doorMat = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.65 })
  const handleMat = labMaterials.steel()
  const doors: THREE.Object3D[] = []
  // [hinge x, which way the door extends, opening angle] - doors hinged on the middle divider
  // stop just short of square so they stand side by side without swinging into each other
  const hinges: [number, 1 | -1, number][] = fourDoors
    ? [[-W / 2, 1, 1.95], [0, -1, 1.5], [0, 1, 1.5], [W / 2, -1, 1.95]]
    : [[-W / 2, 1, 1.95], [W / 2, -1, 1.95]]
  hinges.forEach(([hx, dirX, angle], i) => {
    const pivot = new THREE.Group()
    pivot.position.set(hx + dirX * 0.001, (doorTop + doorBottom) / 2, front + t / 2)
    const door = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, t), doorMat)
    door.position.x = dirX * doorW / 2
    door.castShadow = true
    pivot.add(door)
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.1, 12), handleMat)
    handle.position.set(dirX * (doorW - 0.045), -0.2 - pivot.position.y, t / 2 + 0.015)
    pivot.add(handle)
    for (const hy of [handle.position.y - 0.05, handle.position.y + 0.05]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.016, 8), handleMat)
      post.rotation.x = Math.PI / 2
      post.position.set(handle.position.x, hy, t / 2 + 0.008)
      pivot.add(post)
    }
    pivot.userData.cupboardDoor = true
    pivot.userData.bay = fourDoors ? (i < 2 ? 0 : 1) : i
    pivot.userData.open = false
    pivot.userData.openAngle = -dirX * angle
    scene.add(pivot)
    doors.push(pivot)
  })

  const bay = (minX: number, maxX: number) => ({ minX, maxX, levels: [floorY, shelfY], frontZ: front - 0.02, backZ: back + t })
  return { doors, blockers, bays: [bay(-W / 2 + t, -t / 2), bay(t / 2, W / 2 - t)] }
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
