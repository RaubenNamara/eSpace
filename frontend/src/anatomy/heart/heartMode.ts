import * as THREE from 'three'
import type { AnatomyEngine } from '../engine'
import type { AnatomyIndex } from '../metadata'
import { colourOf } from '../materials'
import type { CameraPose } from '../camera'
import { disposeMaterial } from '../dispose'
import { HEART_PARTS, HEART_PART_BY_KEY, ANCHORS, WALL_OF_VENTRICLE, partForName, type HeartPart, type RegionKey } from './heartParts'
import {
  phaseAt, atrialContraction, atrialFilling, ventricularContraction, avValveOpen, semilunarValveOpen, flowRate,
  type CyclePhase, type FlowSegment,
} from './heartCycle'

/**
 * The heart close-up on the real BodyParts3D heart: the heart and the roots of its great vessels on
 * their own, pumping through the cardiac cycle (heartCycle.ts), with blood shown as particles that
 * wait behind shut valves, and a four-chamber cutaway for the inside view.
 *
 * Everything is measured from the meshes when the close-up opens (chamber centres, valve hinges, the
 * long axis to the apex, the septum regions) and every transform and material is put back in dispose().
 */

export type HeartView = 'external' | 'internal'
export interface HeartLabel { key: string; name: string; ids: string[]; at: [number, number, number] }

type Role = 'wall' | 'cavity' | 'valve' | 'muscle' | 'vessel'
interface Item {
  id: string
  name: string
  mesh: THREE.Mesh
  node: THREE.Object3D
  role: Role
  part: HeartPart | null
  /** rest positions, world space */
  pts: Float32Array
  centroid: THREE.Vector3
  /** the world transform this structure follows each frame (identity = still) */
  motion: () => THREE.Matrix4 | null
  /** for vessels: the flow clock and direction (1 away from the heart, -1 towards it) */
  flow?: { clock: 'art' | 'vein' | 'cor'; dir: 1 | -1 }
}

/** oxygen-rich and oxygen-poor blood, as in the atlas colours of arteries and veins */
export const RICH = 0xd42a2a
export const POOR = 0x2f5fc4
const SELECT = 0x22c55e
const VALVE = 0xead9b4
const SPEED = 0.055 // metres of path per beat at flow rate 1
const PARTICLES = 130 // per side of the heart

// --- small geometry helpers (rest positions in world space) ---

function worldPoints(mesh: THREE.Mesh): Float32Array {
  mesh.updateWorldMatrix(true, false)
  const pos = mesh.geometry.attributes.position
  const out = new Float32Array(pos.count * 3)
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld)
    out[i * 3] = v.x; out[i * 3 + 1] = v.y; out[i * 3 + 2] = v.z
  }
  return out
}
function triangles(mesh: THREE.Mesh, pts: Float32Array): Uint32Array {
  const idx = mesh.geometry.index
  if (idx) return Uint32Array.from(idx.array as ArrayLike<number>)
  return Uint32Array.from({ length: pts.length / 3 }, (_, i) => i)
}
/** mean of the points (that pass `keep`; all of them if none do) */
function mean(pts: Float32Array, keep?: (x: number, y: number, z: number) => boolean): THREE.Vector3 {
  const c = new THREE.Vector3(); let n = 0
  for (let i = 0; i < pts.length; i += 3) {
    if (keep && !keep(pts[i], pts[i + 1], pts[i + 2])) continue
    c.x += pts[i]; c.y += pts[i + 1]; c.z += pts[i + 2]; n++
  }
  if (!n && keep) return mean(pts)
  return n ? c.multiplyScalar(1 / n) : c
}
function boxOfPts(pts: Float32Array) {
  const b = new THREE.Box3()
  for (let i = 0; i < pts.length; i += 3) b.expandByPoint(new THREE.Vector3(pts[i], pts[i + 1], pts[i + 2]))
  return b
}
/** the vertices plus triangle centres: a denser cloud for distance tests on low-poly cavities */
function denseCloud(pts: Float32Array, tris: Uint32Array) {
  const out = new Float32Array(pts.length + tris.length)
  out.set(pts)
  let o = pts.length
  for (let t = 0; t < tris.length; t += 3) {
    for (let k = 0; k < 3; k++) out[o + k] = (pts[tris[t] * 3 + k] + pts[tris[t + 1] * 3 + k] + pts[tris[t + 2] * 3 + k]) / 3
    o += 3
  }
  return out
}
function nearestSq(cloud: Float32Array, x: number, y: number, z: number) {
  let best = Infinity
  for (let i = 0; i < cloud.length; i += 3) {
    const dx = cloud[i] - x, dy = cloud[i + 1] - y, dz = cloud[i + 2] - z
    const d = dx * dx + dy * dy + dz * dz
    if (d < best) best = d
  }
  return best
}
/** mean of the points that are furthest along a direction (the given fraction of them) */
function extremeAlong(pts: Float32Array, dir: THREE.Vector3, fraction = 0.05) {
  const proj: number[] = []
  for (let i = 0; i < pts.length; i += 3) proj.push(pts[i] * dir.x + pts[i + 1] * dir.y + pts[i + 2] * dir.z)
  const sorted = [...proj].sort((a, b) => b - a)
  const cut = sorted[Math.max(0, Math.floor(sorted.length * fraction) - 1)]
  return mean(pts, (x, y, z) => x * dir.x + y * dir.y + z * dir.z >= cut)
}
/** linear map that scales by `along` on axis `a` and `across` perpendicular to it */
function axialScale(a: THREE.Vector3, along: number, across: number) {
  const d = along - across
  return new THREE.Matrix4().set(
    across + d * a.x * a.x, d * a.x * a.y, d * a.x * a.z, 0,
    d * a.y * a.x, across + d * a.y * a.y, d * a.y * a.z, 0,
    d * a.z * a.x, d * a.z * a.y, across + d * a.z * a.z, 0,
    0, 0, 0, 1)
}
/** six planes keeping what is inside a box */
function boxPlanes(b: THREE.Box3) {
  return [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), -b.min.x), new THREE.Plane(new THREE.Vector3(-1, 0, 0), b.max.x),
    new THREE.Plane(new THREE.Vector3(0, 1, 0), -b.min.y), new THREE.Plane(new THREE.Vector3(0, -1, 0), b.max.y),
    new THREE.Plane(new THREE.Vector3(0, 0, 1), -b.min.z), new THREE.Plane(new THREE.Vector3(0, 0, -1), b.max.z),
  ]
}
/** T(p) * L * T(-p) */
function about(p: THREE.Vector3, L: THREE.Matrix4) {
  return new THREE.Matrix4().makeTranslation(p.x, p.y, p.z).multiply(L).multiply(new THREE.Matrix4().makeTranslation(-p.x, -p.y, -p.z))
}
/** small deterministic random numbers, so the blood looks the same every time */
function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

// --- materials ---

interface MatOpts { colour: number; clip: THREE.Plane[]; cutTint?: boolean; double?: boolean; opacity?: number; emissive?: number
  flow?: { time: { value: number }; dir: number; origin: THREE.Vector3; glow: number } }

function heartMaterial(o: MatOpts) {
  const opacity = o.opacity ?? 1
  const m = new THREE.MeshStandardMaterial({
    color: o.colour, roughness: 0.5, metalness: 0,
    side: o.double ? THREE.DoubleSide : THREE.FrontSide,
    clippingPlanes: o.clip, transparent: opacity < 1, opacity, depthWrite: opacity >= 1,
    emissive: o.emissive ?? 0x000000, emissiveIntensity: o.emissive ? 0.55 : 0,
  })
  if (o.cutTint || o.flow) {
    m.onBeforeCompile = (shader) => {
      if (o.flow) {
        shader.uniforms.uTime = o.flow.time
        shader.uniforms.uOrigin = { value: o.flow.origin }
        shader.uniforms.uDir = { value: o.flow.dir }
        shader.uniforms.uGlow = { value: new THREE.Color(o.flow.glow) }
        shader.vertexShader = 'varying vec3 vFlowPos;\n' + shader.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\n  vFlowPos = (modelMatrix * vec4(transformed, 1.0)).xyz;')
        shader.fragmentShader = 'uniform float uTime;\nuniform vec3 uOrigin;\nuniform float uDir;\nuniform vec3 uGlow;\nvarying vec3 vFlowPos;\n' + shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
  float flowW = 0.5 + 0.5 * sin(distance(vFlowPos, uOrigin) * 170.0 - uDir * uTime * 9.5);
  totalEmissiveRadiance += uGlow * pow(flowW, 6.0) * 0.9;`)
      }
      // seen through the cut, the inside of the wall is the deeper red of cut muscle
      if (o.cutTint) shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n  if (!gl_FrontFacing) diffuseColor.rgb = vec3(0.55, 0.16, 0.17);')
    }
    m.customProgramCacheKey = () => `heart-${o.cutTint ? 1 : 0}${o.flow ? 1 : 0}`
  }
  return m
}

// --- blood paths ---

type Gate = 'av' | 'sl' | null
interface Waypoint { p: THREE.Vector3; seg: FlowSegment; gate?: Gate; r: number }
interface Route { pts: THREE.Vector3[]; seg: FlowSegment[]; gate: Gate[]; rad: number[]; cum: number[]; len: number }
interface Particle { route: number; s: number; q: number; jitter: THREE.Vector3 }

function makeRoute(w: Waypoint[]): Route {
  const cum = [0]
  for (let i = 1; i < w.length; i++) cum.push(cum[i - 1] + w[i].p.distanceTo(w[i - 1].p))
  return { pts: w.map(x => x.p), seg: w.map(x => x.seg), gate: w.map(x => x.gate ?? null), rad: w.map(x => x.r), cum, len: cum[cum.length - 1] }
}

export interface HeartModeOptions {
  /** the phase changed (for the caption and the phase strip) */
  onPhase?: (phase: CyclePhase) => void
}

export class HeartMode {
  private items: Item[] = []
  private byId = new Map<string, Item>()
  private view: HeartView = 'external'
  private playing = true
  private bpm = 20
  private cycle = 0.6
  private last = -1
  private offFrame: () => void
  private mats: THREE.Material[] = []
  private clocks = { art: { value: 0 }, vein: { value: 0 }, cor: { value: 0 } }
  private selected: string | null = null
  private phaseKey: CyclePhase | null = null
  private savedMinDistance: number

  // measured anatomy
  private base = new THREE.Vector3()
  private apex = new THREE.Vector3()
  private axis = new THREE.Vector3()
  private cutPlane = new THREE.Plane()
  private trimPlanes: THREE.Plane[] = []
  private innerBox = new THREE.Box3()
  private innerTrimPlanes: THREE.Plane[] = []
  private valveCutPlane = new THREE.Plane()
  /** the heart with its vessel stumps (what is drawn) and the heart alone (what the camera frames) */
  readonly frameBox = new THREE.Box3()
  readonly heartBox = new THREE.Box3()
  private valveCentre: Record<string, THREE.Vector3> = {}
  private leaflet = new Map<string, { hinge: THREE.Vector3; axis: THREE.Vector3; angle: number; gate: 'av' | 'sl' }>()
  private atrium: Record<'right' | 'left', THREE.Vector3> = { right: new THREE.Vector3(), left: new THREE.Vector3() }
  private matrices = { wall: new THREE.Matrix4(), cavity: new THREE.Matrix4(), ra: new THREE.Matrix4(), la: new THREE.Matrix4() }

  // the septa and the ventricles' own walls, cut out of the shared wall meshes
  private regionOf = new Map<string, { centroids: Float32Array; region: (RegionKey | null)[] }>()
  private regionMeshes: { key: RegionKey; mesh: THREE.Mesh; item: Item }[] = []
  private regionCentre: Partial<Record<RegionKey, THREE.Vector3>> = {}

  // blood
  private routes: { rich: Route[]; poor: Route[] } = { rich: [], poor: [] }
  private particles: { rich: Particle[]; poor: Particle[] } = { rich: [], poor: [] }
  private blood: { rich: THREE.InstancedMesh; poor: THREE.InstancedMesh } | null = null

  constructor(private engine: AnatomyEngine, private index: AnatomyIndex, private opts: HeartModeOptions = {}) {
    this.collect()
    this.measure()
    this.findRegions()
    this.buildRoutes()
    this.buildBlood()
    const controls = engine.view.controls
    this.savedMinDistance = controls.minDistance
    controls.minDistance = 0.05
    engine.setHoverHighlight(false)
    this.applyVisibility()
    this.applyMaterials()
    this.offFrame = engine.view.onBeforeFrame(t => this.tick(t))
    this.pose()
    engine.setAnimating(true)
  }

  // --- what is shown ---

  private collect() {
    const heartBox = new THREE.Box3()
    const heart = this.index.manifest.structures.filter(s => s.system === 'circulatory' && s.group === 'heart')
    for (const s of heart) heartBox.union(new THREE.Box3(new THREE.Vector3(...s.centre).addScaledVector(new THREE.Vector3(...s.size), -0.5), new THREE.Vector3(...s.centre).addScaledVector(new THREE.Vector3(...s.size), 0.5)))
    const near = heartBox.clone().expandByScalar(0.02)
    for (const s of this.index.manifest.structures) {
      if (s.system !== 'circulatory') continue
      const part = partForName(s.name)
      const inHeart = s.group === 'heart'
      // great vessels by name; the heart's own vessels only where they lie on the heart
      if (!inHeart && !part) continue
      if (part && (part.key === 'coronary-arteries' || part.key === 'cardiac-veins') && !near.containsPoint(new THREE.Vector3(...s.centre))) continue
      const mesh = this.engine.meshOf(s.id)
      const node = this.engine.nodeOf(s.id)
      if (!mesh || !node) continue
      // start from the rest pose
      node.matrixAutoUpdate = true
      node.position.set(0, 0, 0); node.quaternion.identity(); node.scale.set(1, 1, 1)
      node.updateMatrixWorld(true)
      const role: Role = /^Cavity of/.test(s.name) ? 'cavity' : /^Wall of/.test(s.name) ? 'wall' : /(leaflet|cusp) of/.test(s.name) ? 'valve' : /papillary/.test(s.name) ? 'muscle' : inHeart ? 'wall' : 'vessel'
      const pts = worldPoints(mesh)
      const item: Item = { id: s.id, name: s.name, mesh, node, role, part, pts, centroid: mean(pts), motion: () => null }
      if (role === 'vessel' && part) {
        const coronary = part.key === 'coronary-arteries'
        item.flow = { clock: coronary ? 'cor' : s.kind === 'artery' ? 'art' : 'vein', dir: s.kind === 'artery' ? 1 : -1 }
      }
      this.items.push(item)
      this.byId.set(s.id, item)
    }
  }

  private named(name: string) { return this.items.find(i => i.name === name) ?? null }
  private ofPart(key: string) { return this.items.filter(i => i.part?.key === key) }
  private pointsOf(items: Item[]) {
    const n = items.reduce((a, i) => a + i.pts.length, 0)
    const out = new Float32Array(n)
    let o = 0
    for (const i of items) { out.set(i.pts, o); o += i.pts.length }
    return out
  }

  private measure() {
    for (const k of ['tricuspid-valve', 'mitral-valve', 'pulmonary-valve', 'aortic-valve']) this.valveCentre[k] = mean(this.pointsOf(this.ofPart(k)))
    const T = this.valveCentre['tricuspid-valve'], M = this.valveCentre['mitral-valve']
    // the base of the ventricles is the plane of the AV valves; the apex is the point of the ventricles furthest from it
    this.base.copy(T).add(M).multiplyScalar(0.5)
    const wall = this.named(ANCHORS.ventricleWall)
    if (wall) {
      let best = -1
      for (let i = 0; i < wall.pts.length; i += 3) {
        const d = this.base.distanceToSquared(new THREE.Vector3(wall.pts[i], wall.pts[i + 1], wall.pts[i + 2]))
        if (d > best) { best = d; this.apex.set(wall.pts[i], wall.pts[i + 1], wall.pts[i + 2]) }
      }
    }
    this.axis.copy(this.apex).sub(this.base).normalize()

    // the four-chamber plane: through both AV valves and the apex (in this body it lies close to the
    // horizontal, like the CT slice that shows all four chambers). Keep the half that, seen square on to
    // the cut, has the heart's right side on the viewer's left - the way textbook diagrams show it.
    const n = new THREE.Vector3().subVectors(M, T).cross(new THREE.Vector3().subVectors(this.apex, T)).normalize()
    const lvC = this.named(ANCHORS.lvCavity)?.centroid, rvC = this.named(ANCHORS.rvCavity)?.centroid
    const screenRight = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), n.clone().negate())
    if (lvC && rvC && screenRight.dot(new THREE.Vector3().subVectors(lvC, rvC)) < 0) n.negate()
    // the same orientation, moved to pass through the middle of the four chambers (their widest outline)
    const cavities = [ANCHORS.raCavity, ANCHORS.rvCavity, ANCHORS.laCavity, ANCHORS.lvCavity].map(c => this.named(c)?.centroid).filter((v): v is THREE.Vector3 => !!v)
    const middle = cavities.length ? cavities.reduce((a, v) => a.add(v), new THREE.Vector3()).multiplyScalar(1 / cavities.length) : T
    this.cutPlane.setFromNormalAndCoplanarPoint(n, middle)

    // the close-up shows the heart with short stumps of its vessels, like a specimen
    const heart = this.items.filter(i => i.role !== 'vessel')
    const box = boxOfPts(this.pointsOf(heart))
    this.heartBox.copy(box)
    const arch = this.named(ANCHORS.arch)
    const top = arch ? boxOfPts(arch.pts).max.y + 0.004 : box.max.y + 0.03
    box.min.x -= 0.016; box.max.x += 0.016; box.min.z -= 0.012; box.max.z += 0.012; box.min.y -= 0.012; box.max.y = Math.max(box.max.y, top)
    this.frameBox.copy(box)
    this.trimPlanes = boxPlanes(box)
    // cut open, the vessels are trimmed close to the heart so their cut ends do not float around it
    this.innerBox.copy(this.heartBox).expandByScalar(0.004)
    this.innerTrimPlanes = boxPlanes(this.innerBox)
    // the AV leaflets and papillary muscles are cut a little in front of the walls, so their sections stand out
    this.valveCutPlane.copy(this.cutPlane)
    this.valveCutPlane.constant += 0.005

    for (const side of ['right', 'left'] as const) {
      const cav = this.named(side === 'right' ? ANCHORS.raCavity : ANCHORS.laCavity)
      if (cav) this.atrium[side] = cav.centroid.clone()
    }

    // valve leaflets swing on a hinge where they attach: the outer, upstream edge of each leaflet.
    // BodyParts3D models the AV leaflets open (hanging into the ventricles) and the semilunar cusps shut,
    // so the AV leaflets swing up into the valve ring to close, and the cusps swing out to open.
    const valves: [string, 'av' | 'sl', THREE.Vector3, number][] = [
      ['tricuspid-valve', 'av', this.axis.clone(), 0], ['mitral-valve', 'av', this.axis.clone(), 0],
      ['pulmonary-valve', 'sl', this.flowOut('pulmonary-valve', ANCHORS.trunk), 32], ['aortic-valve', 'sl', this.flowOut('aortic-valve', ANCHORS.ascending), 32],
    ]
    for (const [key, gate, normal, degrees] of valves) {
      const C = this.valveCentre[key]
      for (const it of this.ofPart(key)) {
        const L = it.centroid
        const radial = L.clone().sub(C)
        radial.addScaledVector(normal, -radial.dot(normal))
        if (radial.lengthSq() < 1e-10) continue
        radial.normalize()
        let rMax = -Infinity, nMin = Infinity
        for (let i = 0; i < it.pts.length; i += 3) {
          const d = new THREE.Vector3(it.pts[i], it.pts[i + 1], it.pts[i + 2]).sub(C)
          rMax = Math.max(rMax, d.dot(radial)); nMin = Math.min(nMin, d.dot(normal))
        }
        const rel = L.clone().sub(C)
        const hinge = L.clone().addScaledVector(radial, rMax - rel.dot(radial)).addScaledVector(normal, nMin - rel.dot(normal))
        // turning about normal x radial by a positive angle moves the free edge downstream and outwards
        let angle = THREE.MathUtils.degToRad(degrees)
        if (gate === 'av') {
          // closing: turn back by the angle the leaflet hangs below the ring, so it lies across the opening
          const arm = L.clone().sub(hinge)
          const hang = Math.atan2(arm.dot(normal), -arm.dot(radial))
          angle = -THREE.MathUtils.clamp(hang * 0.85, 0, THREE.MathUtils.degToRad(70))
        }
        this.leaflet.set(it.id, { hinge, axis: new THREE.Vector3().crossVectors(normal, radial).normalize(), angle, gate })
      }
    }

    // who moves with what
    const ventricleParts = new Set(['papillary-muscles', 'coronary-arteries', 'cardiac-veins'])
    for (const it of this.items) {
      if (this.leaflet.has(it.id)) { const id = it.id; it.motion = () => this.leafletMatrix(id); continue }
      if (it.name === WALL_OF_VENTRICLE || (it.part && ventricleParts.has(it.part.key))) it.motion = () => this.matrices.wall
      else if (it.name === ANCHORS.lvCavity || it.name === ANCHORS.rvCavity) it.motion = () => this.matrices.cavity
      else if (it.part?.key === 'right-atrium') it.motion = () => this.matrices.ra
      else if (it.part?.key === 'left-atrium') it.motion = () => this.matrices.la
    }
  }

  /** direction blood leaves a semilunar valve: towards its artery */
  private flowOut(valve: string, artery: string) {
    const a = this.named(artery)
    const C = this.valveCentre[valve]
    return a ? a.centroid.clone().sub(C).normalize() : this.axis.clone().negate()
  }

  /**
   * The septa are found from the real walls: the part of the ventricle wall lying between both
   * ventricular cavities is the interventricular septum; where an atrial wall lies against the other
   * atrium's cavity is the interatrial septum.
   */
  private findRegions() {
    const cloudOf = (name: string) => { const it = this.named(name); return it ? denseCloud(it.pts, triangles(it.mesh, it.pts)) : null }
    const lv = cloudOf(ANCHORS.lvCavity), rv = cloudOf(ANCHORS.rvCavity), la = cloudOf(ANCHORS.laCavity), ra = cloudOf(ANCHORS.raCavity)
    const split = (wallName: string, classify: (x: number, y: number, z: number) => RegionKey | null) => {
      const it = this.named(wallName)
      if (!it) return
      const tris = triangles(it.mesh, it.pts)
      const centroids = new Float32Array(tris.length)
      const region: (RegionKey | null)[] = []
      const byRegion = new Map<RegionKey, number[]>()
      for (let t = 0; t < tris.length; t += 3) {
        const a = tris[t] * 3, b = tris[t + 1] * 3, c = tris[t + 2] * 3
        const x = (it.pts[a] + it.pts[b] + it.pts[c]) / 3, y = (it.pts[a + 1] + it.pts[b + 1] + it.pts[c + 1]) / 3, z = (it.pts[a + 2] + it.pts[b + 2] + it.pts[c + 2]) / 3
        centroids[t] = x; centroids[t + 1] = y; centroids[t + 2] = z
        const r = classify(x, y, z)
        region.push(r)
        if (r) { if (!byRegion.has(r)) byRegion.set(r, []); byRegion.get(r)!.push(a, b, c) }
      }
      this.regionOf.set(it.id, { centroids, region })
      for (const [key, corners] of byRegion) this.addRegionMesh(key, it, corners)
    }
    const SEPTUM = 0.013 ** 2, ATRIAL = 0.009 ** 2
    if (lv && rv) split(ANCHORS.ventricleWall, (x, y, z) => {
      const dl = nearestSq(lv, x, y, z), dr = nearestSq(rv, x, y, z)
      if (dl < SEPTUM && dr < SEPTUM) return 'ivs'
      return dl < dr ? 'lv-wall' : 'rv-wall'
    })
    if (la) split(ANCHORS.raWall, (x, y, z) => nearestSq(la, x, y, z) < ATRIAL ? 'ias' : null)
    if (ra) split(ANCHORS.laWall, (x, y, z) => nearestSq(ra, x, y, z) < ATRIAL ? 'ias' : null)
    for (const key of ['ivs', 'ias', 'lv-wall', 'rv-wall'] as RegionKey[]) {
      const ms = this.regionMeshes.filter(r => r.key === key)
      if (!ms.length) continue
      const c = new THREE.Vector3(); let n = 0
      for (const r of ms) { const p = r.mesh.geometry.attributes.position; for (let i = 0; i < p.count; i++) { c.x += p.getX(i); c.y += p.getY(i); c.z += p.getZ(i); n++ } }
      this.regionCentre[key] = c.multiplyScalar(1 / n)
    }
  }

  /** a highlight skin over part of a wall, moving with it */
  private addRegionMesh(key: RegionKey, it: Item, corners: number[]) {
    const pos = new Float32Array(corners.length * 3)
    corners.forEach((c, i) => { pos[i * 3] = it.pts[c]; pos[i * 3 + 1] = it.pts[c + 1]; pos[i * 3 + 2] = it.pts[c + 2] })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.computeVertexNormals()
    const mesh = new THREE.Mesh(g)
    mesh.visible = false
    mesh.raycast = () => {}
    mesh.renderOrder = 3
    // geometry is in world space; cancel the node's rest transform so it follows the node's motion only
    mesh.matrixAutoUpdate = false
    mesh.matrix.copy(it.node.matrixWorld).invert()
    it.node.add(mesh)
    this.regionMeshes.push({ key, mesh, item: it })
  }

  // --- blood ---

  private buildRoutes() {
    const it = (n: string) => this.named(n)
    const radius = (i: Item | null, k = 0.45) => { if (!i) return 0.004; const s = boxOfPts(i.pts).getSize(new THREE.Vector3()); return Math.min(s.x, s.y, s.z) / 2 * k }
    const top = (i: Item, dy = 0.006) => { const b = boxOfPts(i.pts); return mean(i.pts, (_x, y) => y > b.max.y - dy) }
    const box = this.frameBox
    const ra = it(ANCHORS.raCavity), rv = it(ANCHORS.rvCavity), la = it(ANCHORS.laCavity), lv = it(ANCHORS.lvCavity)
    const svc = it(ANCHORS.svc), ivc = it(ANCHORS.ivc), trunk = it(ANCHORS.trunk), asc = it(ANCHORS.ascending), arch = it(ANCHORS.arch), desc = it(ANCHORS.descending)
    if (!ra || !rv || !la || !lv) return
    const V = this.valveCentre
    // a point deep in a ventricle, towards the apex
    const deep = (cav: Item) => cav.centroid.clone().lerp(extremeAlong(cav.pts, this.axis, 0.08), 0.55)
    const raR = radius(ra, 0.35), rvR = radius(rv, 0.3), laR = radius(la, 0.35), lvR = radius(lv, 0.35)

    const rightHeart: Waypoint[] = [
      { p: ra.centroid, seg: 'atrium', r: raR },
      { p: V['tricuspid-valve'], seg: 'ventricle-in', gate: 'av', r: 0.005 },
      { p: rv.centroid, seg: 'ventricle-in', r: rvR },
      { p: deep(rv), seg: 'ventricle-out', r: rvR * 0.8 },
      { p: V['pulmonary-valve'], seg: 'artery', gate: 'sl', r: 0.004 },
    ]
    const inflowsPoor: Waypoint[][] = []
    if (svc) inflowsPoor.push([{ p: top(svc), seg: 'vein', r: radius(svc) }, { p: svc.centroid, seg: 'vein', r: radius(svc) }])
    if (ivc) {
      const b = boxOfPts(ivc.pts)
      inflowsPoor.push([{ p: mean(ivc.pts, (_x, y) => y < box.min.y + 0.004 && y > box.min.y - 0.004), seg: 'vein', r: radius(ivc) }, { p: mean(ivc.pts, (_x, y) => y > b.max.y - 0.008), seg: 'vein', r: radius(ivc) }])
    }
    const outflowsPoor: Waypoint[][] = []
    if (trunk) {
      const fork = top(trunk, 0.008)
      for (const name of [ANCHORS.lpa, ANCHORS.rpa]) {
        const pa = it(name)
        if (!pa) continue
        // the far end of the artery's stump inside the close-up
        const inside = (x: number, y: number, z: number) => box.containsPoint(new THREE.Vector3(x, y, z))
        const dir = pa.centroid.clone().sub(fork).setY(0).normalize()
        const end = mean(pa.pts, (x, y, z) => inside(x, y, z) && (x - fork.x) * dir.x + (z - fork.z) * dir.z > 0.03)
        outflowsPoor.push([{ p: trunk.centroid, seg: 'artery', r: radius(trunk) }, { p: fork, seg: 'artery', r: radius(trunk) }, { p: end, seg: 'artery', r: radius(pa) }])
      }
    }
    for (const a of inflowsPoor) for (const b of outflowsPoor) this.routes.poor.push(makeRoute([...a, ...rightHeart, ...b]))

    const leftHeart: Waypoint[] = [
      { p: la.centroid, seg: 'atrium', r: laR },
      { p: V['mitral-valve'], seg: 'ventricle-in', gate: 'av', r: 0.005 },
      { p: lv.centroid, seg: 'ventricle-in', r: lvR },
      { p: deep(lv), seg: 'ventricle-out', r: lvR * 0.8 },
      { p: V['aortic-valve'], seg: 'artery', gate: 'sl', r: 0.004 },
    ]
    const aortic: Waypoint[] = []
    if (asc) aortic.push({ p: asc.centroid, seg: 'artery', r: radius(asc) }, { p: top(asc), seg: 'artery', r: radius(asc) })
    if (arch && asc) {
      const start = top(asc)
      const far = arch.pts.length ? (() => {
        // the end of the arch furthest from where it starts, then down the descending aorta
        let best = -1; const p = new THREE.Vector3()
        for (let i = 0; i < arch.pts.length; i += 3) { const v = new THREE.Vector3(arch.pts[i], arch.pts[i + 1], arch.pts[i + 2]); const d = v.distanceToSquared(start); if (d > best) { best = d; p.copy(v) } }
        return p
      })() : start
      aortic.push({ p: top(arch, 0.01), seg: 'artery', r: radius(arch) }, { p: far.clone().lerp(top(arch, 0.01), 0.25), seg: 'artery', r: radius(arch) })
      if (desc) aortic.push({ p: mean(desc.pts, (_x, y) => Math.abs(y - (box.min.y + 0.02)) < 0.005), seg: 'artery', r: radius(desc) })
    }
    for (const name of ANCHORS.pulmonaryVeins) {
      const pv = it(name)
      if (!pv) continue
      // from the lung end of the vein to the atrium
      const away = pv.centroid.clone().sub(la.centroid).normalize()
      const start = extremeAlong(pv.pts, away, 0.15)
      this.routes.rich.push(makeRoute([{ p: start, seg: 'vein', r: radius(pv) }, { p: pv.centroid, seg: 'vein', r: radius(pv) }, ...leftHeart, ...aortic]))
    }
  }

  private buildBlood() {
    const geo = new THREE.SphereGeometry(0.0017, 10, 8)
    const make = (colour: number) => {
      const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: colour, emissive: colour, emissiveIntensity: 0.35, roughness: 0.4 }), PARTICLES)
      m.frustumCulled = false
      m.raycast = () => {}
      m.renderOrder = 1
      this.engine.addObject(m)
      return m
    }
    this.blood = { rich: make(RICH), poor: make(POOR) }
    const rand = rng(7)
    for (const side of ['rich', 'poor'] as const) {
      const routes = this.routes[side]
      if (!routes.length) { this.blood[side].count = 0; continue }
      for (let i = 0; i < PARTICLES; i++) {
        const route = Math.floor(rand() * routes.length)
        const j = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1)
        if (j.lengthSq() > 1) j.normalize()
        this.particles[side].push({ route, s: rand() * routes[route].len, q: rand(), jitter: j })
      }
    }
    // let the blood settle into its rhythm before it is shown
    for (let k = 0; k < 6 * 120; k++) this.moveBlood((k % 120) / 120, 1 / 120)
  }

  private moveBlood(c: number, dc: number) {
    const avOpen = avValveOpen(c) > 0.3, slOpen = semilunarValveOpen(c) > 0.3
    const rand = Math.random
    for (const side of ['rich', 'poor'] as const) {
      const routes = this.routes[side]
      if (!routes.length) continue
      for (const p of this.particles[side]) {
        const r = routes[p.route]
        let i = 0
        while (i < r.cum.length - 2 && p.s >= r.cum[i + 1]) i++
        let s = p.s + SPEED * flowRate(c, r.seg[i]) * dc
        // blood waits behind a shut valve, spread back into the chamber
        const gate = r.gate[i + 1]
        if (gate && !(gate === 'av' ? avOpen : slOpen)) {
          const lim = r.cum[i + 1] - p.q * 0.75 * (r.cum[i + 1] - r.cum[i]) - 0.001
          s = p.s <= lim ? Math.min(s, lim) : p.s
        }
        if (s >= r.len) {
          // back to the start of a vein: a new drop arriving
          p.route = Math.floor(rand() * routes.length)
          s = rand() * 0.01
        }
        p.s = s
      }
    }
  }

  private placeBlood() {
    if (!this.blood) return
    const m = new THREE.Matrix4(), v = new THREE.Vector3()
    for (const side of ['rich', 'poor'] as const) {
      const routes = this.routes[side]
      const inst = this.blood[side]
      this.particles[side].forEach((p, n) => {
        const r = routes[p.route]
        let i = 0
        while (i < r.cum.length - 2 && p.s >= r.cum[i + 1]) i++
        const k = (p.s - r.cum[i]) / Math.max(1e-6, r.cum[i + 1] - r.cum[i])
        v.lerpVectors(r.pts[i], r.pts[i + 1], k).addScaledVector(p.jitter, r.rad[i] + (r.rad[i + 1] - r.rad[i]) * k)
        inst.setMatrixAt(n, m.makeTranslation(v.x, v.y, v.z))
      })
      inst.instanceMatrix.needsUpdate = true
    }
  }

  // --- the beat ---

  private leafletMatrix(id: string) {
    const l = this.leaflet.get(id)!
    // AV leaflets rest open and turn to close; semilunar cusps rest shut and turn to open
    const k = l.gate === 'av' ? 1 - avValveOpen(this.cycle) : semilunarValveOpen(this.cycle)
    return about(l.hinge, new THREE.Matrix4().makeRotationAxis(l.axis, l.angle * k))
  }

  /** puts every structure where it is at this moment of the beat */
  private pose() {
    const c = this.cycle
    const a = atrialContraction(c), fill = atrialFilling(c)
    // the ventricles swell a little as the atria push blood in, then squeeze
    const v = ventricularContraction(c) - 0.3 * a
    const twist = new THREE.Matrix4().makeRotationAxis(this.axis, THREE.MathUtils.degToRad(5) * Math.max(0, v))
    this.matrices.wall = about(this.base, twist.clone().multiply(axialScale(this.axis, 1 - 0.08 * v, 1 - 0.065 * v)))
    // the blood space shrinks more than the outline: the wall thickens as it contracts
    this.matrices.cavity = about(this.base, twist.clone().multiply(axialScale(this.axis, 1 - 0.16 * v, 1 - 0.2 * v)))
    const atrialScale = 1 - 0.1 * a + 0.04 * fill
    this.matrices.ra = about(this.atrium.right, new THREE.Matrix4().makeScale(atrialScale, atrialScale, atrialScale))
    this.matrices.la = about(this.atrium.left, new THREE.Matrix4().makeScale(atrialScale, atrialScale, atrialScale))
    for (const it of this.items) {
      const M = it.motion()
      if (!M) continue
      const node = it.node
      node.matrixAutoUpdate = false
      // the node's parent may itself have a transform: express the world motion in its space
      const P = node.parent?.matrixWorld ?? new THREE.Matrix4()
      node.matrix.copy(P).invert().multiply(M).multiply(P)
      node.matrixWorldNeedsUpdate = true
    }
    this.placeBlood()
    const ph = phaseAt(c).key
    if (ph !== this.phaseKey) { this.phaseKey = ph; this.opts.onPhase?.(ph) }
  }

  private tick(t: number) {
    const dt = this.last < 0 ? 0 : Math.min(0.1, t - this.last)
    this.last = t
    if (!this.playing || dt === 0) return
    const dc = dt * this.bpm / 60
    // the vessels' flow bands advance with the blood: the arteries surge with each ejection
    this.clocks.art.value += dc * flowRate(this.cycle, 'artery')
    this.clocks.vein.value += dc * flowRate(this.cycle, 'vein')
    // coronary arteries fill mostly while the heart muscle relaxes
    this.clocks.cor.value += dc * (1.2 - ventricularContraction(this.cycle))
    // small steps so blood never jumps a valve
    const steps = Math.max(1, Math.ceil(dc / 0.01))
    for (let k = 0; k < steps; k++) { this.moveBlood(this.cycle, dc / steps); this.cycle = (this.cycle + dc / steps) % 1 }
    this.pose()
  }

  // --- appearance ---

  private applyVisibility() {
    // from outside, what is inside the walls (blood spaces, valves, papillary muscles) is hidden;
    // inside, the blood spaces show as tinted blood
    const ids = this.items.filter(i => this.view === 'internal' || (i.role !== 'cavity' && i.role !== 'valve' && i.role !== 'muscle')).map(i => i.id)
    this.engine.setOnly(ids)
  }

  private applyMaterials() {
    for (const m of this.mats) disposeMaterial(m)
    this.mats = []
    const internal = this.view === 'internal'
    const cut = internal ? [...this.innerTrimPlanes, this.cutPlane] : this.trimPlanes
    // the tricuspid and mitral valves lie in the cut and are sectioned with it; the pulmonary and aortic
    // valves lie outside it and stay whole
    const valveCut = internal ? [...this.innerTrimPlanes, this.valveCutPlane] : this.trimPlanes
    const cache = new Map<string, THREE.Material>()
    const get = (key: string, make: () => THREE.Material) => { let m = cache.get(key); if (!m) { m = make(); cache.set(key, m); this.mats.push(m) } return m }
    const sel = this.selected ? HEART_PART_BY_KEY[this.selected] : null
    const overrides = new Map<string, THREE.Material | null>()
    for (const it of this.items) {
      const picked = !!sel && it.part?.key === sel.key
      const colour = picked ? SELECT : it.role === 'valve' ? VALVE : colourOf({ name: it.name, kind: it.role === 'vessel' ? (this.index.structure(it.id)?.kind ?? 'artery') : 'heart' })
      const emissive = picked ? 0x15874a : undefined
      let m: THREE.Material
      if (it.role === 'cavity') {
        // the blood inside each chamber: oxygen-poor on the right, oxygen-rich on the left
        const rich = it.part?.blood === 'rich'
        m = get(`cav-${picked}-${rich}`, () => heartMaterial({ colour: picked ? SELECT : rich ? RICH : POOR, clip: cut, opacity: picked ? 0.42 : 0.2, emissive }))
      } else if (it.role === 'valve' || it.role === 'muscle') {
        // sectioned with the cut; a selected pulmonary or aortic valve (which lie outside the plane) is shown whole
        const sectioned = it.role === 'muscle' || this.leaflet.get(it.id)?.gate === 'av' || !picked
        m = get(`solid-${colour}-${sectioned}`, () => heartMaterial({ colour, clip: sectioned ? valveCut : this.trimPlanes, emissive, double: true }))
      } else if (it.flow && !picked) {
        const glow = it.part?.blood === 'poor' ? 0xcfe0ff : 0xffd2c6
        m = get(`flow-${colour}-${it.flow.clock}-${it.flow.dir}`, () => heartMaterial({ colour, clip: cut, cutTint: internal, double: internal, flow: { time: this.clocks[it.flow!.clock], dir: it.flow!.dir, origin: this.base, glow } }))
      } else {
        m = get(`wall-${colour}`, () => heartMaterial({ colour, clip: cut, cutTint: internal, double: internal, emissive }))
      }
      overrides.set(it.id, m)
    }
    this.engine.setOverrides(overrides)
    // septum or one ventricle's wall: a highlight skin over that part of the shared wall
    const hl = heartMaterial({ colour: SELECT, clip: cut, emissive: 0x15874a, double: true })
    hl.polygonOffset = true; hl.polygonOffsetFactor = -2; hl.polygonOffsetUnits = -4
    this.mats.push(hl)
    for (const r of this.regionMeshes) {
      r.mesh.material = hl
      r.mesh.visible = !!sel?.regions?.includes(r.key)
    }
    // blood is cut with the heart
    if (this.blood) for (const inst of [this.blood.rich, this.blood.poor]) {
      const mat = inst.material as THREE.MeshStandardMaterial
      mat.clippingPlanes = cut
      mat.needsUpdate = true
    }
    this.engine.view.requestRender()
  }

  // --- public ---

  get currentView() { return this.view }
  get isPlaying() { return this.playing }
  get phase() { return phaseAt(this.cycle) }
  get speed() { return this.bpm }

  setView(v: HeartView) {
    if (v === this.view) return
    this.view = v
    this.applyVisibility()
    this.applyMaterials()
  }

  setPlaying(on: boolean) {
    this.playing = on
    this.last = -1
    this.engine.setAnimating(on)
    this.engine.view.requestRender()
  }

  setSpeed(bpm: number) { this.bpm = bpm }

  /** jump to a moment of the beat (0..1), e.g. a phase chosen while paused */
  setCycle(c: number) {
    this.cycle = ((c % 1) + 1) % 1
    this.pose()
    this.engine.view.requestRender()
  }

  select(key: string | null) {
    this.selected = key && HEART_PART_BY_KEY[key] ? key : null
    this.applyMaterials()
  }

  /** the part under a click: the ventricle wall is split into septum / left / right from where it was hit */
  partAt(id: string, point?: THREE.Vector3): string | null {
    const it = this.byId.get(id)
    if (!it) return null
    const split = this.regionOf.get(id)
    if (split && point) {
      // back to the rest pose, where the regions were measured
      const rest = point.clone().applyMatrix4(it.node.matrixWorld.clone().invert()).applyMatrix4(it.node.parent?.matrixWorld ?? new THREE.Matrix4())
      let best = Infinity, region: RegionKey | null = null
      const { centroids } = split
      for (let t = 0; t < centroids.length; t += 3) {
        const d = (centroids[t] - rest.x) ** 2 + (centroids[t + 1] - rest.y) ** 2 + (centroids[t + 2] - rest.z) ** 2
        if (d < best) { best = d; region = split.region[t / 3] }
      }
      if (region === 'ivs') return 'interventricular-septum'
      if (region === 'ias') return 'interatrial-septum'
      if (region === 'lv-wall') return 'left-ventricle'
      if (region === 'rv-wall') return 'right-ventricle'
    }
    if (it.name === WALL_OF_VENTRICLE) return 'left-ventricle'
    return it.part?.key ?? null
  }

  /** what the pointer is over, by the name of its part */
  nameOf(id: string): string | null {
    const it = this.byId.get(id)
    if (!it) return null
    if (it.name === WALL_OF_VENTRICLE) return 'Wall of the ventricles (myocardium)'
    return it.part?.name ?? it.name
  }

  /** every shown structure */
  get ids() { return this.items.map(i => i.id) }

  /** ids that make up a part (for zooming to it) */
  idsOf(key: string) {
    const part = HEART_PART_BY_KEY[key]
    if (!part) return []
    const ids = this.ofPart(key).map(i => i.id)
    if (part.regions?.some(r => r === 'ivs' || r === 'lv-wall' || r === 'rv-wall')) { const w = this.named(WALL_OF_VENTRICLE); if (w) ids.push(w.id) }
    return ids
  }

  /** labels for the main parts, placed on the parts themselves */
  labels(): HeartLabel[] {
    const internal = this.view === 'internal'
    const out: HeartLabel[] = []
    const add = (key: string, at: THREE.Vector3 | undefined, ids: string[] = []) => {
      const p = HEART_PART_BY_KEY[key]
      if (!p || !at) return
      // inside view: chambers and septa are labelled on the cut face; vessels cut away get no label
      if (internal && p.kind !== 'valve' && this.cutPlane.distanceToPoint(at) < -0.002) {
        if (p.kind !== 'chamber' && p.kind !== 'septum') return
        at = this.cutPlane.projectPoint(at, new THREE.Vector3()).addScaledVector(this.cutPlane.normal, 0.003)
      }
      if (!internal && p.inside) return
      out.push({ key, name: p.name, ids, at: [at.x, at.y, at.z] })
    }
    // a vessel's label sits on the part of it that is still drawn
    const insideBox = (it: Item) => {
      const v = new THREE.Vector3(), c = new THREE.Vector3()
      let n = 0
      for (let i = 0; i < it.pts.length; i += 3) {
        v.set(it.pts[i], it.pts[i + 1], it.pts[i + 2])
        const drawn = internal ? this.innerBox.containsPoint(v) && this.cutPlane.distanceToPoint(v) >= 0 : this.frameBox.containsPoint(v)
        if (drawn) { c.add(v); n++ }
      }
      return n > 20 ? c.multiplyScalar(1 / n) : undefined
    }
    for (const [key, name] of [['right-atrium', ANCHORS.raCavity], ['right-ventricle', ANCHORS.rvCavity], ['left-atrium', ANCHORS.laCavity], ['left-ventricle', ANCHORS.lvCavity]] as const) {
      const it = this.named(name)
      if (!it) continue
      // from outside, the label sits on the chamber's front surface rather than deep inside it
      add(key, internal ? it.centroid : extremeAlong(it.pts, new THREE.Vector3(0, 0, 1), 0.1).lerp(it.centroid, 0.3))
    }
    for (const k of ['tricuspid-valve', 'mitral-valve', 'pulmonary-valve', 'aortic-valve']) add(k, this.valveCentre[k])
    add('interventricular-septum', this.regionCentre.ivs)
    for (const [key, name] of [['superior-vena-cava', ANCHORS.svc], ['inferior-vena-cava', ANCHORS.ivc], ['pulmonary-trunk', ANCHORS.trunk], ['aorta', ANCHORS.arch]] as const) {
      const it = this.named(name)
      if (it) add(key, insideBox(it))
    }
    // the pulmonary veins run behind the heart: from the front a label would point at the right atrium
    const pv = this.named(ANCHORS.pulmonaryVeins[0])
    if (pv && internal) add('pulmonary-veins', insideBox(pv))
    return out
  }

  /** the camera pose that shows the whole heart, centred and never cropped, for the current view */
  framePose(): CameraPose {
    const camera = this.engine.view.camera
    // from the front for the outside; square on to the cut for the inside
    const dir = this.view === 'internal' ? this.cutPlane.normal.clone().negate() : new THREE.Vector3(0, 0.08, 1).normalize()
    // the heart itself is centred and fits; the vessel stumps may run off the edge
    const sphere = this.heartBox.getBoundingSphere(new THREE.Sphere())
    // fit the box as seen from that side (tighter than its bounding sphere, still never cropped)
    const up = new THREE.Vector3(0, 1, 0)
    const right = new THREE.Vector3().crossVectors(up, dir).normalize()
    const trueUp = new THREE.Vector3().crossVectors(dir, right)
    let w = 0, h = 0, d = 0
    const b = this.heartBox
    for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) {
      const p = new THREE.Vector3(x, y, z).sub(sphere.center)
      w = Math.max(w, Math.abs(p.dot(right))); h = Math.max(h, Math.abs(p.dot(trueUp))); d = Math.max(d, Math.abs(p.dot(dir)))
    }
    const vFov = THREE.MathUtils.degToRad(camera.fov)
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect)
    // every corner of the box is inside the view: its near face is d in front of the centre
    // more room top and bottom: the toolbar sits over the top of the view and the caption over the bottom
    const dist = Math.max((h * 1.45) / Math.tan(vFov / 2), (w * 1.15) / Math.tan(hFov / 2)) + d
    // the caption is taller than the toolbar: aim a little below the heart's centre so it sits just above the middle
    const target = sphere.center.clone().addScaledVector(trueUp, -0.08 * (dist - d) * Math.tan(vFov / 2))
    return { position: target.clone().addScaledVector(dir, dist), target }
  }

  resetCamera(duration = 900) { this.engine.view.flyTo(this.framePose(), duration) }

  dispose() {
    this.offFrame()
    for (const it of this.items) {
      const n = it.node
      n.matrix.identity(); n.matrixAutoUpdate = true
      n.position.set(0, 0, 0); n.quaternion.identity(); n.scale.set(1, 1, 1)
      n.updateMatrix(); n.matrixWorldNeedsUpdate = true
    }
    for (const r of this.regionMeshes) { r.mesh.removeFromParent(); r.mesh.geometry.dispose() }
    this.regionMeshes = []
    if (this.blood) {
      for (const inst of [this.blood.rich, this.blood.poor]) { this.engine.removeObject(inst); (inst.material as THREE.Material).dispose(); inst.dispose() }
      this.blood.rich.geometry.dispose()
      this.blood = null
    }
    this.engine.setOverrides(new Map(this.items.map(i => [i.id, null])))
    for (const m of this.mats) disposeMaterial(m)
    this.mats = []
    this.engine.setOnly(null)
    this.engine.setHoverHighlight(true)
    this.engine.setAnimating(false)
    this.engine.view.controls.minDistance = this.savedMinDistance
    this.engine.view.requestRender()
  }
}

/** all parts in panel order, grouped */
export const HEART_PART_GROUPS: { title: string; keys: string[] }[] = [
  { title: 'Chambers', keys: HEART_PARTS.filter(p => p.kind === 'chamber').map(p => p.key) },
  { title: 'Walls between the chambers', keys: HEART_PARTS.filter(p => p.kind === 'septum').map(p => p.key) },
  { title: 'Valves', keys: HEART_PARTS.filter(p => p.kind === 'valve' || p.kind === 'muscle').map(p => p.key) },
  { title: 'Blood vessels', keys: HEART_PARTS.filter(p => p.kind === 'vessel').map(p => p.key) },
]
