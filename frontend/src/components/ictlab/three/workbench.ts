import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * The ICT Lab's 3D workbench: a renderer, a lit room with a desk, a camera you can turn around
 * the desk (drag) and zoom (wheel / pinch), and the helpers the activities need - what is under
 * the pointer, where the pointer meets a plane, smooth moves of an object, and a frame loop.
 * One per activity; dispose() frees everything.
 */
export interface Workbench {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  canvas: HTMLCanvasElement
  /** Called every frame with the seconds since the last one */
  onFrame: (cb: (dt: number) => void) => void
  /** Which of `targets` (matched by itself or any descendant) is under the pointer */
  pick: <T extends THREE.Object3D>(ev: PointerEvent | MouseEvent, targets: T[]) => T | null
  /** Where the pointer ray meets `plane`, written into `out`; false when it runs parallel */
  pointOnPlane: (ev: PointerEvent, plane: THREE.Plane, out: THREE.Vector3) => boolean
  /** Screen position (CSS pixels, relative to the canvas) of a world point */
  toScreen: (p: THREE.Vector3) => { x: number; y: number }
  /** Glide an object to a position (and rotation), lifting it over `arc` metres on the way */
  moveTo: (obj: THREE.Object3D, pos: THREE.Vector3, quat?: THREE.Quaternion, ms?: number, arc?: number) => Promise<void>
  resetView: () => void
  dispose: () => void
}

export interface WorkbenchOptions {
  cameraPosition: THREE.Vector3Tuple
  target: THREE.Vector3Tuple
  minDistance?: number
  maxDistance?: number
  /** Camera near plane - small for close-up work like a cable end */
  near?: number
}

export function createWorkbench(host: HTMLElement, opts: WorkbenchOptions): Workbench {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  const canvas = renderer.domElement
  canvas.style.display = 'block'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.touchAction = 'none'
  host.appendChild(canvas)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xdfe6ee)
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = env

  // Light: soft sky fill, and a key light from above-front casting the shadows
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7a66, 0.55))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(0.8, 1.6, 1.2)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.left = -1
  key.shadow.camera.right = 1
  key.shadow.camera.top = 1
  key.shadow.camera.bottom = -1
  key.shadow.camera.near = 0.2
  key.shadow.camera.far = 4
  key.shadow.bias = -0.0005
  scene.add(key)

  // The room: a floor far below and a back wall, so the desk is not floating in grey
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshStandardMaterial({ color: 0xc9b9a3, roughness: 0.95 }))
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -0.76
  floor.receiveShadow = true
  scene.add(floor)
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), new THREE.MeshStandardMaterial({ color: 0xe8edf2, roughness: 1 }))
  wall.position.set(0, 1, -0.9)
  scene.add(wall)

  // The desk: a wooden top on a dark frame, with a grey anti-static mat
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.04, 0.95), new THREE.MeshStandardMaterial({ color: 0xa0764d, roughness: 0.7 }))
  deskTop.position.set(0.15, -0.02, 0.05)
  deskTop.receiveShadow = true
  deskTop.castShadow = true
  scene.add(deskTop)
  const mat = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.003, 0.7), new THREE.MeshStandardMaterial({ color: 0x5b6b7a, roughness: 0.9 }))
  mat.position.set(0.2, 0.0015, 0.05)
  mat.receiveShadow = true
  scene.add(mat)
  for (const [x, z] of [[-0.65, -0.38], [0.95, -0.38], [-0.65, 0.48], [0.95, 0.48]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.72, 0.05), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.4 }))
    leg.position.set(x, -0.4, z)
    scene.add(leg)
  }

  const camera = new THREE.PerspectiveCamera(42, 1, opts.near ?? 0.02, 20)
  const startPos = new THREE.Vector3(...opts.cameraPosition)
  const startTarget = new THREE.Vector3(...opts.target)
  camera.position.copy(startPos)

  const controls = new OrbitControls(camera, canvas)
  controls.target.copy(startTarget)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enablePan = false
  controls.minDistance = opts.minDistance ?? 0.35
  controls.maxDistance = opts.maxDistance ?? 1.8
  controls.minPolarAngle = 0.15
  controls.maxPolarAngle = Math.PI / 2 - 0.04
  controls.update()

  // Size to the host
  const resize = () => {
    const w = host.clientWidth || 1
    const h = host.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(host)

  // Frame loop
  const frameCbs: ((dt: number) => void)[] = []
  const clock = new THREE.Clock()
  let raf = 0
  const loop = () => {
    raf = requestAnimationFrame(loop)
    const dt = Math.min(clock.getDelta(), 0.05)
    for (const cb of frameCbs) cb(dt)
    controls.update()
    renderer.render(scene, camera)
  }
  loop()

  const raycaster = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  const toNdc = (ev: PointerEvent | MouseEvent) => {
    const r = canvas.getBoundingClientRect()
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1)
    return ndc
  }

  const pick = <T extends THREE.Object3D>(ev: PointerEvent | MouseEvent, targets: T[]): T | null => {
    raycaster.setFromCamera(toNdc(ev), camera)
    const visible = targets.filter(t => t.visible)
    const hits = raycaster.intersectObjects(visible, true)
    for (const hit of hits) {
      if (!hit.object.visible) continue
      for (let o: THREE.Object3D | null = hit.object; o; o = o.parent) {
        const match = visible.find(t => t === o)
        if (match) return match
      }
    }
    return null
  }

  const pointOnPlane = (ev: PointerEvent, plane: THREE.Plane, out: THREE.Vector3) => {
    raycaster.setFromCamera(toNdc(ev), camera)
    return raycaster.ray.intersectPlane(plane, out) !== null
  }

  const toScreen = (p: THREE.Vector3) => {
    const v = p.clone().project(camera)
    const r = canvas.getBoundingClientRect()
    return { x: ((v.x + 1) / 2) * r.width, y: ((1 - v.y) / 2) * r.height }
  }

  // Smooth moves, eased, with an optional lift in the middle
  const moves = new Map<THREE.Object3D, { from: THREE.Vector3; to: THREE.Vector3; q0: THREE.Quaternion; q1: THREE.Quaternion; t: number; ms: number; arc: number; done: () => void }>()
  frameCbs.push(dt => {
    for (const [obj, m] of moves) {
      m.t = Math.min(1, m.t + (dt * 1000) / m.ms)
      const e = m.t < 0.5 ? 4 * m.t ** 3 : 1 - (-2 * m.t + 2) ** 3 / 2
      obj.position.lerpVectors(m.from, m.to, e)
      obj.position.y += Math.sin(Math.PI * e) * m.arc
      obj.quaternion.slerpQuaternions(m.q0, m.q1, e)
      if (m.t >= 1) {
        moves.delete(obj)
        m.done()
      }
    }
  })
  const moveTo = (obj: THREE.Object3D, pos: THREE.Vector3, quat?: THREE.Quaternion, ms = 650, arc = 0) =>
    new Promise<void>(done => {
      moves.get(obj)?.done()
      moves.set(obj, { from: obj.position.clone(), to: pos.clone(), q0: obj.quaternion.clone(), q1: (quat ?? obj.quaternion).clone(), t: 0, ms, arc, done })
    })

  const resetView = () => {
    camera.position.copy(startPos)
    controls.target.copy(startTarget)
    controls.update()
  }

  const dispose = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    controls.dispose()
    scene.traverse(o => {
      const mesh = o as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const m = mesh.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(m)) m.forEach(x => { (x as THREE.MeshStandardMaterial).map?.dispose(); x.dispose() })
      else if (m) { (m as THREE.MeshStandardMaterial).map?.dispose(); m.dispose() }
    })
    env.dispose()
    pmrem.dispose()
    renderer.dispose()
    canvas.remove()
  }

  return { scene, camera, controls, canvas, onFrame: cb => frameCbs.push(cb), pick, pointOnPlane, toScreen, moveTo, resetView, dispose }
}
