import * as THREE from 'three'
import { createAnatomyScene, type AnatomyScene } from './scene'
import { SystemLoader, type LoadedSystem } from './loader'
import { MaterialLibrary, colourOf } from './materials'
import { focusPose, viewPose } from './camera'
import { disposeObject } from './dispose'
import { filesForSystem } from './systems'
import type { AnatomyIndex } from './metadata'
import type { ClipSpec, LoadState, ReproSex, Structure, SystemKey, ViewName } from './types'

export interface EngineOptions {
  /** folder holding manifest.json and the system GLBs */
  baseUrl: string
  /** called whenever a system file starts, progresses, finishes or fails */
  onLoadState?: (system: SystemKey, state: LoadState) => void
  /** a structure was clicked/tapped (null = empty space) */
  onPick?: (id: string | null) => void
  onHover?: (id: string | null) => void
}

const GENITAL_SKIN = /^Skin of the external genitalia$/

/**
 * The 3D side of the Anatomy Explorer, independent of Vue: which systems are visible, what is
 * selected, picking, camera moves and clean-up.
 */
export class AnatomyEngine {
  readonly view: AnatomyScene
  private loader: SystemLoader
  private mats = new MaterialLibrary()
  private loaded = new Map<SystemKey, LoadedSystem>()
  private meshes = new Map<string, THREE.Mesh>()
  private visible = new Set<SystemKey>()
  private selection = new Set<string>()
  private hover = new Set<string>()
  private isolate = false
  private seeThroughSkin = true
  private showSensitive = false
  private raycaster = new THREE.Raycaster()
  private disposed = false
  private bodyBox: THREE.Box3
  private down: { x: number; y: number; t: number } | null = null
  private hoverQueued = false
  private lastPointer = { x: 0, y: 0 }

  constructor(host: HTMLElement, private index: AnatomyIndex, private opts: EngineOptions) {
    this.view = createAnatomyScene(host)
    this.loader = new SystemLoader(opts.baseUrl)
    const h = index.manifest.height ?? 1.72
    this.bodyBox = new THREE.Box3(new THREE.Vector3(-0.34, 0, -0.16), new THREE.Vector3(0.34, h, 0.16))
    const c = this.view.canvas
    c.addEventListener('pointerdown', this.onPointerDown)
    c.addEventListener('pointerup', this.onPointerUp)
    c.addEventListener('pointermove', this.onPointerMove)
    c.addEventListener('pointerleave', this.onPointerLeave)
    this.setView('front', false)
  }

  // --- systems ---

  /** Shows exactly these systems, downloading any that are not loaded yet. Resolves when all have settled. */
  async setSystems(systems: SystemKey[]) {
    this.visible = new Set(systems)
    const needed = new Set<SystemKey>()
    for (const s of systems) for (const f of filesForSystem(this.index.manifest, s)) needed.add(f)
    this.applyAll()
    await Promise.allSettled([...needed].map(s => this.ensureLoaded(s)))
    this.applyAll()
  }

  private async ensureLoaded(system: SystemKey) {
    if (this.loaded.has(system)) return
    const asset = this.index.manifest.systems[system]
    if (!asset?.file) return
    const report = this.opts.onLoadState
    report?.(system, { status: 'loading', progress: 0 })
    try {
      const sys = await this.loader.load(system, asset.file, p => report?.(system, { status: 'loading', progress: p }))
      if (this.disposed) return
      if (!this.loaded.has(system)) {
        this.loaded.set(system, sys)
        for (const [id, mesh] of sys.meshes) {
          const s = this.index.structure(id)
          if (!s) { mesh.visible = false; continue }
          // the GLB carries one grey placeholder material; colours come from the library instead
          ;(mesh.material as THREE.Material).dispose()
          mesh.material = this.baseMaterialFor(s)
          this.meshes.set(id, mesh)
        }
        this.view.scene.add(sys.root)
      }
      report?.(system, { status: 'ready' })
    } catch (e) {
      if (this.disposed) return
      report?.(system, { status: 'error', message: e instanceof Error ? e.message : String(e) })
    }
  }

  // --- animation support (used by src/anatomy/effects.ts) ---

  private overrides = new Map<string, THREE.Material>()
  /** a material that replaces a structure's normal one (selection still wins); null to restore */
  setOverride(id: string, m: THREE.Material | null) {
    if (m) this.overrides.set(id, m); else this.overrides.delete(id)
    this.applyAll()
  }
  /** many at once (null removes), with one update of the scene */
  setOverrides(changes: Map<string, THREE.Material | null>) {
    for (const [id, m] of changes) { if (m) this.overrides.set(id, m); else this.overrides.delete(id) }
    this.applyAll()
  }
  clearOverrides() { this.overrides.clear(); this.applyAll() }

  /** The named node holding a structure's mesh: transform this to move the structure */
  nodeOf(id: string): THREE.Object3D | null { return this.meshes.get(id)?.parent ?? null }
  meshOf(id: string): THREE.Mesh | null { return this.meshes.get(id) ?? null }
  isShown(id: string) { return !!this.meshes.get(id)?.visible }

  /** Extra objects (moving markers); removed and freed by the caller */
  addObject(o: THREE.Object3D) { this.view.scene.add(o); this.view.requestRender() }
  removeObject(o: THREE.Object3D) { o.removeFromParent(); this.view.requestRender() }

  setAutoRotate(on: boolean) {
    this.view.controls.autoRotate = on
    this.view.controls.autoRotateSpeed = 1.2
    this.view.setContinuous(on || this.animating)
  }
  private animating = false
  setAnimating(on: boolean) {
    this.animating = on
    this.view.setContinuous(on || this.view.controls.autoRotate)
  }

  /** Retry a system that failed */
  retry(system: SystemKey) { return this.ensureLoaded(system).then(() => this.applyAll()) }

  isLoaded(system: SystemKey) { return this.loaded.has(system) }

  // --- appearance ---

  setSelection(ids: string[]) { this.selection = new Set(ids); this.applyAll() }
  setIsolate(on: boolean) { this.isolate = on; this.applyAll() }
  setSeeThroughSkin(on: boolean) { this.seeThroughSkin = on; this.applyAll() }
  setShowSensitive(on: boolean) { this.showSensitive = on; this.applyAll() }
  private reproSex: ReproSex = 'female'
  /** male or female reproductive organs */
  setReproSex(sex: ReproSex) { this.reproSex = sex; this.applyAll() }

  /**
   * Cross-section: cut the whole body with a plane. `axis` x = sagittal (left/right), y = transverse
   * (top/bottom), z = frontal (front/back); `position` in metres; `keep` which side stays.
   */
  setClip(clip: ClipSpec | null) {
    const r = this.view.renderer
    if (!clip) {
      r.clippingPlanes = []
      this.mats.setDoubleSided(false)
    } else {
      const n = new THREE.Vector3(clip.axis === 'x' ? 1 : 0, clip.axis === 'y' ? 1 : 0, clip.axis === 'z' ? 1 : 0)
      // a plane keeps the side its normal points to
      if (clip.keep === 'below') n.negate()
      r.clippingPlanes = [new THREE.Plane(n, clip.keep === 'below' ? clip.position : -clip.position)]
      this.mats.setDoubleSided(true)
    }
    this.view.requestRender()
  }

  private onSystem(s: Structure) {
    return this.visible.has(s.system) || s.also.some(a => this.visible.has(a))
  }

  private skinIsSeeThrough() {
    if (!this.seeThroughSkin || !this.visible.has('integumentary')) return false
    return [...this.visible].some(v => v !== 'integumentary')
  }

  private baseMaterialFor(s: Structure): THREE.Material {
    if (s.kind === 'skin' && (s.system === 'integumentary' || GENITAL_SKIN.test(s.name))) {
      return this.skinIsSeeThrough() ? this.mats.skinSeeThrough : this.mats.skinSolid
    }
    return this.mats.solidFor(colourOf(s))
  }

  /** visible / material for every loaded mesh from the current state */
  private applyAll() {
    if (this.disposed) return
    const seeThrough = this.skinIsSeeThrough()
    const isolating = this.isolate && this.selection.size > 0
    for (const [id, mesh] of this.meshes) {
      const s = this.index.structure(id)!
      let show = this.onSystem(s)
      let material: THREE.Material = this.baseMaterialFor(s)
      // age-appropriate setting: with it off, the skin over the external genitalia is swapped for a
      // smooth cover (built from the same patch), and the reproductive organs stay hidden
      // with female organs chosen, the (male) genital skin stays covered: female external genitalia are not modelled
      const allowed = this.showSensitive && this.visible.has('reproductive') && this.reproSex === 'male'
      if (s.cover) show = this.visible.has('integumentary') && !allowed
      else if (GENITAL_SKIN.test(s.name)) show = this.visible.has('integumentary') && allowed
      // testes and ovaries also count as endocrine; only the chosen sex is shown
      else if (s.system === 'reproductive') show = show && this.showSensitive && (!s.sex || s.sex === this.reproSex)
      // hair belongs with the skin: shown only when the skin is
      if (/hair/i.test(s.name)) show = show && this.visible.has('integumentary')
      if (this.selection.has(id)) material = this.mats.selected
      else if (this.hover.has(id)) material = this.mats.hovered
      else if (this.overrides.has(id)) material = this.overrides.get(id)!
      else if (isolating) material = this.mats.ghostFor(colourOf(s))
      else if (seeThrough && s.system === 'integumentary') material = this.mats.skinSeeThrough
      mesh.visible = show
      mesh.material = material
      // see-through and faded parts are drawn after solid ones
      mesh.renderOrder = (material as THREE.Material).transparent ? 2 : 0
      this.syncOverlay(id, mesh, show && this.selection.has(id))
    }
    this.view.requestRender()
  }

  /** A faint copy of a selected mesh drawn on top of everything, so a selection behind the ribs
   *  (the heart, the lungs) still shows through what is in front of it. Shares the mesh's geometry. */
  private overlays = new Map<string, THREE.Mesh>()
  private syncOverlay(id: string, mesh: THREE.Mesh, on: boolean) {
    const existing = this.overlays.get(id)
    if (on && !existing) {
      const o = new THREE.Mesh(mesh.geometry, this.mats.selectedXray)
      o.renderOrder = 20
      o.raycast = () => {}
      mesh.add(o)
      this.overlays.set(id, o)
    } else if (!on && existing) {
      existing.removeFromParent()
      this.overlays.delete(id)
    }
  }

  // --- camera ---

  /** Box of the given structures (world space), from the loaded meshes or else the manifest */
  boxOf(ids: string[]): THREE.Box3 {
    const box = new THREE.Box3()
    for (const id of ids) {
      const mesh = this.meshes.get(id)
      if (mesh) { box.expandByObject(mesh); continue }
      const s = this.index.structure(id)
      if (s) {
        const c = new THREE.Vector3(...s.centre), half = new THREE.Vector3(...s.size).multiplyScalar(0.5)
        box.expandByPoint(c.clone().sub(half)).expandByPoint(c.clone().add(half))
      }
    }
    return box.isEmpty() ? this.bodyBox.clone() : box
  }

  /** close up on these structures, from the current direction or from a preset side */
  focus(ids: string[], from?: ViewName, margin?: number) {
    const pose = focusPose(this.boxOf(ids), this.view.camera, this.view.controls.target, from, margin)
    this.view.flyTo(pose)
  }

  setView(name: ViewName, animate = true) {
    const pose = viewPose(name, this.bodyBox, this.view.camera.fov, this.view.camera.aspect)
    if (animate) this.view.flyTo(pose)
    else {
      this.view.camera.position.copy(pose.position)
      this.view.controls.target.copy(pose.target)
      this.view.controls.update()
      this.view.requestRender()
    }
  }

  resetCamera() { this.setView('front') }

  /** Keyboard control: rotate by angles (radians) about the target */
  orbit(dTheta: number, dPhi: number) {
    const { camera, controls } = this.view
    const offset = camera.position.clone().sub(controls.target)
    const sph = new THREE.Spherical().setFromVector3(offset)
    sph.theta += dTheta
    sph.phi = THREE.MathUtils.clamp(sph.phi + dPhi, 0.05, Math.PI - 0.05)
    offset.setFromSpherical(sph)
    camera.position.copy(controls.target).add(offset)
    controls.update()
    this.view.requestRender()
  }

  zoom(factor: number) {
    const { camera, controls } = this.view
    const offset = camera.position.clone().sub(controls.target)
    const len = THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance)
    camera.position.copy(controls.target).add(offset.setLength(len))
    controls.update()
    this.view.requestRender()
  }

  /** Screen position (CSS px within the canvas) of a world point; null when behind the camera */
  project(p: THREE.Vector3): { x: number; y: number } | null {
    const v = p.clone().project(this.view.camera)
    if (v.z > 1 || v.z < -1) return null
    const r = this.view.canvas.getBoundingClientRect()
    return { x: (v.x * 0.5 + 0.5) * r.width, y: (-v.y * 0.5 + 0.5) * r.height }
  }

  /** Centre of a group/structures in world space */
  centreOf(ids: string[]) { return this.boxOf(ids).getCenter(new THREE.Vector3()) }

  // --- picking ---

  /** The structure under a screen point (client coordinates), or null */
  pickAt(clientX: number, clientY: number): string | null {
    const r = this.view.canvas.getBoundingClientRect()
    const ndc = new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1)
    this.raycaster.setFromCamera(ndc, this.view.camera)
    const seeThrough = this.skinIsSeeThrough()
    const isolating = this.isolate && this.selection.size > 0
    const solid: THREE.Object3D[] = [], faded: THREE.Object3D[] = []
    for (const [id, mesh] of this.meshes) {
      if (!mesh.visible) continue
      const s = this.index.structure(id)!
      // clicks go through see-through skin and the grey cover to what is inside
      if (seeThrough && s.kind === 'skin') continue
      ;(isolating && !this.selection.has(id) ? faded : solid).push(mesh)
    }
    // in a cross-section, hits on the cut-away side do not count
    const planes = this.view.renderer.clippingPlanes
    const kept = (h: THREE.Intersection) => planes.every(p => p.distanceToPoint(h.point) >= 0)
    const hit = this.raycaster.intersectObjects(solid, false).find(kept) ?? this.raycaster.intersectObjects(faded, false).find(kept)
    return (hit?.object.userData.structureId as string | undefined) ?? null
  }

  private onPointerDown = (e: PointerEvent) => { this.down = { x: e.clientX, y: e.clientY, t: performance.now() } }
  private onPointerUp = (e: PointerEvent) => {
    const d = this.down
    this.down = null
    if (!d) return
    // a tap or click, not the end of a drag
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6 || performance.now() - d.t > 600) return
    this.opts.onPick?.(this.pickAt(e.clientX, e.clientY))
  }
  private onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || e.buttons) return
    this.lastPointer = { x: e.clientX, y: e.clientY }
    if (this.hoverQueued) return
    this.hoverQueued = true
    requestAnimationFrame(() => {
      this.hoverQueued = false
      if (this.disposed) return
      const id = this.pickAt(this.lastPointer.x, this.lastPointer.y)
      this.setHover(id)
    })
  }
  private onPointerLeave = () => this.setHover(null)

  private setHover(id: string | null) {
    const ids = id ? this.index.selectionFor(id, 'school')?.ids ?? [id] : []
    const same = ids.length === this.hover.size && ids.every(i => this.hover.has(i))
    if (same) return
    this.hover = new Set(ids)
    this.view.canvas.style.cursor = id ? 'pointer' : ''
    this.opts.onHover?.(id)
    this.applyAll()
  }

  /** Number of WebGL geometries/textures alive - used by tests to confirm clean-up */
  memory() { return { ...this.view.renderer.info.memory } }

  dispose() {
    if (this.disposed) return
    this.disposed = true
    const c = this.view.canvas
    c.removeEventListener('pointerdown', this.onPointerDown)
    c.removeEventListener('pointerup', this.onPointerUp)
    c.removeEventListener('pointermove', this.onPointerMove)
    c.removeEventListener('pointerleave', this.onPointerLeave)
    this.loader.dispose()
    const shared = new Set(this.mats.all())
    for (const sys of this.loaded.values()) disposeObject(sys.root, shared)
    this.loaded.clear()
    this.meshes.clear()
    this.overlays.clear()
    this.mats.dispose()
    this.view.dispose()
  }
}
