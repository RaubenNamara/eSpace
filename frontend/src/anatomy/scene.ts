import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { CameraTween, type CameraPose } from './camera'

export interface AnatomyScene {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  /** asks for one new frame; safe to call any number of times */
  requestRender(): void
  /** animate the camera to a pose */
  flyTo(pose: CameraPose, duration?: number): void
  /** called after every rendered frame (labels follow the model with this) */
  onFrame(cb: () => void): () => void
  /** called before each frame with the time in seconds - animations move things here */
  onBeforeFrame(cb: (t: number) => void): () => void
  /** keep drawing every frame (while something animates or the model turns) */
  setContinuous(on: boolean): void
  readonly canvas: HTMLCanvasElement
  readonly frames: number
  dispose(): void
}

/** Is WebGL available at all on this device/browser? */
export function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

/**
 * Renderer, camera, lights and orbit controls in `host`. Renders on demand: a frame is drawn only
 * when something changes (camera moved, model loaded, selection changed), so an idle viewer uses no
 * GPU time. There is exactly one requestAnimationFrame chain, never more.
 */
export function createAnatomyScene(host: HTMLElement): AnatomyScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  // lets one organ be cut open (a clipping plane on its material only)
  renderer.localClippingEnabled = true
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  // transparent: the page draws a grey-blue gradient behind the model, which makes pale bone stand out
  renderer.setClearColor(0x000000, 0)
  const canvas = renderer.domElement
  canvas.style.display = 'block'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.touchAction = 'none' // the controls handle pinch and drag
  canvas.setAttribute('aria-label', '3D anatomy model. Drag to rotate, scroll or pinch to zoom, right-drag or two-finger drag to pan.')
  canvas.setAttribute('role', 'img')
  host.appendChild(canvas)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
  scene.environment = envRT.texture
  scene.environmentIntensity = 0.35
  pmrem.dispose()

  const hemi = new THREE.HemisphereLight(0xffffff, 0xb8c0cc, 0.5)
  const key = new THREE.DirectionalLight(0xffffff, 2.4)
  key.position.set(1.2, 2.6, 2.2)
  const rim = new THREE.DirectionalLight(0xffffff, 0.6)
  rim.position.set(-1.6, 1.4, -2)
  const fill = new THREE.DirectionalLight(0xfff4ea, 0.7)
  fill.position.set(-2, 0.8, 1.5)
  scene.add(hemi, key, rim, fill)

  const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 50)
  camera.position.set(0, 0.95, 4)
  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 0.9, 0)
  controls.enableDamping = true
  controls.dampingFactor = 0.12
  controls.minDistance = 0.12
  controls.maxDistance = 8
  controls.screenSpacePanning = true
  // zoom straight towards the centre of what is in view, so the structure stays centred on screen
  controls.zoomToCursor = false
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }
  controls.update()

  const tween = new CameraTween()
  const frameCallbacks = new Set<() => void>()
  const beforeCallbacks = new Set<(t: number) => void>()
  let continuous = false
  let raf = 0
  let frames = 0
  let disposed = false

  const loop = () => {
    raf = 0
    if (disposed) return
    let again = continuous
    const now = performance.now()
    for (const cb of beforeCallbacks) cb(now / 1000)
    if (tween.active) {
      again = tween.step(now, camera.position, controls.target) || again
    }
    // with damping, update() keeps returning true until the motion settles
    if (controls.update()) again = true
    renderer.render(scene, camera)
    frames++
    for (const cb of frameCallbacks) cb()
    if (again) requestRender()
  }
  function requestRender() {
    if (!raf && !disposed) raf = requestAnimationFrame(loop)
  }
  controls.addEventListener('change', requestRender)
  // a drag cancels a camera flight in progress
  controls.addEventListener('start', () => tween.cancel())

  const resize = () => {
    const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight)
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    requestRender()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(host)
  resize()

  const onContextLost = (e: Event) => { e.preventDefault() }
  const onContextRestored = () => requestRender()
  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)

  return {
    renderer, scene, camera, controls, canvas,
    get frames() { return frames },
    requestRender,
    flyTo(pose, duration) {
      tween.begin({ position: camera.position, target: controls.target }, pose, performance.now(), duration)
      requestRender()
    },
    onFrame(cb) { frameCallbacks.add(cb); return () => frameCallbacks.delete(cb) },
    onBeforeFrame(cb) { beforeCallbacks.add(cb); return () => beforeCallbacks.delete(cb) },
    setContinuous(on) { continuous = on; requestRender() },
    dispose() {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      ro.disconnect()
      controls.dispose()
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      frameCallbacks.clear()
      beforeCallbacks.clear()
      continuous = false
      envRT.dispose()
      renderer.renderLists.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      canvas.remove()
    },
  }
}
