import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { updateScreenLabels } from './labRoom'

/**
 * A plain white "photo studio" for looking at one specimen on its own (the frog dissection): white
 * background, soft studio lights and a soft shadow on an invisible floor at y = 0. Units are metres.
 * It offers the part of the LabRoom interface the specimen scenes use.
 */
export interface Studio {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  onFrame: (cb: (dt: number) => void) => void
  /** Glide the camera to look from `pos` at `target` */
  flyTo: (pos: THREE.Vector3, target: THREE.Vector3) => void
  toNdc: (ev: PointerEvent) => THREE.Vector2
  dispose: () => void
}

/** Throws if the device can't provide a WebGL context - callers then show LabUnsupported. */
/** `size`: roughly how far the specimen reaches from the middle, in metres (default 0.35 - a frog) */
export function createStudio(host: HTMLElement, opts: { cameraPosition: THREE.Vector3; target: THREE.Vector3; size?: number }): Studio {
  const size = opts.size ?? 0.35
  const k = size / 0.35
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(host.clientWidth || 1, host.clientHeight || 1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.9
  // anatomy planes cut the specimen with clipping planes
  renderer.localClippingEnabled = true
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex
  scene.environmentIntensity = 0.3

  // studio lighting: a soft key light from above-left (casting the shadow), a fill and a rim
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b4aa, 0.55))
  const key = new THREE.DirectionalLight(0xffffff, 1.9)
  key.position.set(-0.6 * k, 1.4 * k, 0.9 * k)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  key.shadow.camera.left = -size
  key.shadow.camera.right = size
  key.shadow.camera.top = size
  key.shadow.camera.bottom = -size
  key.shadow.camera.near = 0.2 * k
  key.shadow.camera.far = 4 * k
  key.shadow.radius = 6
  key.shadow.bias = -0.0004
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xfff4e6, 0.6)
  fill.position.set(0.9, 0.5, 0.6)
  scene.add(fill)
  const rim = new THREE.DirectionalLight(0xffffff, 0.7)
  rim.position.set(0.2, 0.8, -1.2)
  scene.add(rim)

  // an invisible floor that only shows the shadow
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(4 * k, 4 * k), new THREE.ShadowMaterial({ opacity: 0.16 }))
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  floor.raycast = () => {}
  scene.add(floor)

  const camera = new THREE.PerspectiveCamera(35, (host.clientWidth || 1) / (host.clientHeight || 1), 0.005, 30)
  camera.position.copy(opts.cameraPosition)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.copy(opts.target)
  controls.enableDamping = true
  controls.dampingFactor = 0.12
  controls.minDistance = 0.06
  controls.maxDistance = 2.5 * k
  controls.minPolarAngle = 0.01
  controls.maxPolarAngle = Math.PI - 0.01
  controls.update()

  let fly: { fromPos: THREE.Vector3; fromTarget: THREE.Vector3; toPos: THREE.Vector3; toTarget: THREE.Vector3; t: number } | null = null
  const flyTo = (pos: THREE.Vector3, target: THREE.Vector3) => {
    fly = { fromPos: camera.position.clone(), fromTarget: controls.target.clone(), toPos: pos.clone(), toTarget: target.clone(), t: 0 }
  }

  const callbacks: ((dt: number) => void)[] = []
  const clock = new THREE.Clock()
  let raf = 0
  const loop = () => {
    raf = requestAnimationFrame(loop)
    const dt = Math.min(clock.getDelta(), 0.1)
    if (fly) {
      fly.t = Math.min(1, fly.t + dt / 0.7)
      const e = fly.t * fly.t * (3 - 2 * fly.t)
      camera.position.lerpVectors(fly.fromPos, fly.toPos, e)
      controls.target.lerpVectors(fly.fromTarget, fly.toTarget, e)
      if (fly.t >= 1) fly = null
    }
    callbacks.forEach(cb => cb(dt))
    controls.update()
    updateScreenLabels(scene, camera, renderer.domElement.clientHeight)
    renderer.render(scene, camera)
  }
  loop()

  const resize = () => {
    const w = host.clientWidth || 1, h = host.clientHeight || 1
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)

  const toNdc = (ev: PointerEvent) => {
    const r = renderer.domElement.getBoundingClientRect()
    return new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1)
  }

  return {
    renderer, scene, camera, controls, flyTo, toNdc,
    onFrame: cb => { callbacks.push(cb) },
    dispose: () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      controls.dispose()
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
