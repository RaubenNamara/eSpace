import * as THREE from 'three'
import { canvasTexture } from './labRoom'

/**
 * A preserved frog for the dissection practical, built at 1.5 times life size (about 14 cm from
 * snout to vent) in metres.
 *
 * Frog-local axes: +X towards the snout, +Y towards the back (dorsal), +Z the frog's right side
 * (so its left is -Z). The body is one parametric surface; a window in the belly is cut out of it
 * and given to two skin flaps, with two muscle flaps (from a slightly smaller surface) beneath.
 * Each flap folds back about its own edge, row by row, so the hinge never comes apart from the body.
 * Beneath them sit the organs in their true positions, and against the back wall the kidneys,
 * which only show once the intestines are lifted aside.
 */

export type FrogPart =
  | 'body' | 'skin' | 'muscle' | 'eye' | 'tympanum' | 'nostril' | 'mouth' | 'hind_leg' | 'fore_leg'
  | 'hind_foot' | 'fore_foot' | 'heart' | 'lungs' | 'liver' | 'gall_bladder' | 'stomach'
  | 'small_intestine' | 'large_intestine' | 'fat_bodies' | 'kidneys' | 'cavity' | 'cloaca'
  | 'spleen' | 'pancreas' | 'bladder' | 'testes' | 'vocal_sac' | 'bone'

/** The organs lifted out in the deep dissection - each goes into its own box */
export type OrganKey = 'heart' | 'lungs' | 'liver' | 'gall_bladder' | 'stomach' | 'small_intestine' | 'large_intestine' | 'fat_bodies' | 'kidneys' | 'spleen' | 'pancreas' | 'bladder'
export const ORGAN_KEYS: OrganKey[] = ['heart', 'lungs', 'liver', 'gall_bladder', 'stomach', 'small_intestine', 'large_intestine', 'fat_bodies', 'kidneys', 'spleen', 'pancreas', 'bladder']
/** Which organ (box) a clicked part belongs to - the testes sit on the kidneys */
export const organOf = (p: FrogPart): OrganKey | null => (p === 'testes' ? 'kidneys' : (ORGAN_KEYS as string[]).includes(p) ? (p as OrganKey) : null)

export const PART_NAMES: Record<FrogPart, string> = {
  body: 'skin of the body', skin: 'skin', muscle: 'muscle wall', eye: 'eye', tympanum: 'tympanum (eardrum)',
  nostril: 'nostril', mouth: 'mouth', hind_leg: 'hind leg', fore_leg: 'fore limb', hind_foot: 'webbed hind foot',
  fore_foot: 'fore limb (hand)', heart: 'heart', lungs: 'lung', liver: 'liver', gall_bladder: 'gall bladder',
  stomach: 'stomach', small_intestine: 'small intestine', large_intestine: 'large intestine (rectum)',
  fat_bodies: 'fat bodies', kidneys: 'kidney', cavity: 'body cavity wall', cloaca: 'cloaca',
  spleen: 'spleen', pancreas: 'pancreas', bladder: 'urinary bladder', testes: 'testis', vocal_sac: 'vocal sac (throat)', bone: 'bone',
}

export type FootKey = 'fl' | 'fr' | 'hl' | 'hr'
export type FlapKey = 'skinR' | 'skinL' | 'muscleR' | 'muscleL'

export interface FrogFlap {
  key: FlapKey
  mesh: THREE.Mesh
  inner: THREE.Mesh
  /** 0 closed .. 1 folded right back */
  open: number
  /** Forceps lift (0..1) - tents the flap up at the lift point */
  lift: number
  update: () => void
}

export interface FrogModel {
  root: THREE.Group
  flaps: Record<FlapKey, FrogFlap>
  /** Small and large intestine - lifted aside to show the kidneys */
  gut: THREE.Group
  heart: THREE.Group
  /** 0 neutral, -1 sitting up (crouched on its legs), +1 lying on its back pinned out */
  setPose: (lift: number) => void
  /** See-through skin: the organs show inside the whole frog */
  setXray: (on: boolean) => void
  /** Cut the frog by a plane (world coordinates, kept up to date by the caller) - null to close it up */
  setClip: (plane: THREE.Plane | null) => void
  /** Show only these organs clearly (others faint) - null for all */
  setFocus: (keys: OrganKey[] | null) => void
  /** What covers the frog: its skin, the muscles under it, or just the skeleton */
  setLayer: (layer: 'skin' | 'muscle' | 'skeleton') => void
  /** Where a pin goes through each hand/foot, frog-local, in the on-its-back pose */
  footPinPoint: (k: FootKey) => THREE.Vector3
  /** The cut line on the skin or muscle, frog-local, posterior end first */
  cutLine: (layer: 'skin' | 'muscle', from?: number, to?: number) => THREE.Vector3[]
  /** Distance (m) from a frog-local point to the cut line, and how far along it the point is (local x) */
  cutLineDistance: (layer: 'skin' | 'muscle', p: THREE.Vector3) => { dist: number; x: number }
  /** Posterior and anterior ends of the window (local x) */
  windowX: { from: number; to: number }
  /** Where the forceps lift the layer (local), just in front of the hind legs */
  liftPoint: (layer: 'skin' | 'muscle') => THREE.Vector3
  /** A point on the open flap's free edge for each pin, frog-local */
  flapPinPoints: (k: FlapKey) => THREE.Vector3[]
  /** Centre of each organ (frog-local), for its label and the hand lens */
  partCentre: (p: FrogPart) => THREE.Vector3
  /** Height of the frog's centre above the surface it lies on, by pose */
  restHeight: { belly: number; back: number }
  partOf: (obj: THREE.Object3D | null) => { part: FrogPart; side: 'l' | 'r' | null; flap: FlapKey | null } | null
  /** Heart beat, breathing and peristalsis - only while `alive` */
  tick: (t: number, alive: boolean) => void
  /** Lift an organ up out of the body (0..1) - while it is held in the forceps */
  setOrganLift: (k: OrganKey, amount: number) => void
  /** Take an organ out of the body (into its box) */
  removeOrgan: (k: OrganKey) => void
  isRemoved: (k: OrganKey) => boolean
  /** The meshes of one organ (for the organ close-up, which shows copies of them on their own) */
  organObjects: (k: OrganKey) => THREE.Object3D[]
  dispose: () => void
}

// --- Shape -----------------------------------------------------------------------------------------
const L = 0.07 // half the snout-vent length
const NS = 150 // rings along the body
const NP = 160 // segments round it
const PHI_STEP = (Math.PI * 2) / NP
const J_MID = NP / 2 // phi = PI: the middle of the belly
const J_WIN = 25 // window half-width in segments (~0.98 rad either side of the midline)
const J_MUSCLE_SPLIT = J_MID + 3 // the muscle is cut just to the frog's left of the abdominal vein
const S_FROM = -0.74 // window: from just in front of the hind legs ...
const S_TO = 0.5 // ... to the throat
const sAt = (i: number) => -Math.cos((Math.PI * i) / NS)
const iFor = (s: number) => Math.round((Math.acos(-s) / Math.PI) * NS)
const I_FROM = iFor(S_FROM)
const I_TO = iFor(S_TO)

export function interp(s: number, pts: [number, number][]): number {
  if (s <= pts[0][0]) return pts[0][1]
  for (let k = 1; k < pts.length; k++) {
    if (s <= pts[k][0]) {
      const [s0, v0] = pts[k - 1]
      const [s1, v1] = pts[k]
      const t = (s - s0) / (s1 - s0)
      const e = t * t * (3 - 2 * t)
      return v0 + (v1 - v0) * e
    }
  }
  return pts[pts.length - 1][1]
}
const halfWidth = (s: number) => 0.036 * interp(s, [[-1, 0.75], [-0.6, 1.0], [-0.15, 1.1], [0.3, 0.9], [0.55, 0.98], [0.8, 0.9], [1, 0.7]])
const halfHeight = (s: number) => 0.022 * interp(s, [[-1, 0.9], [-0.55, 1.25], [-0.1, 1.0], [0.35, 0.82], [0.7, 0.68], [1, 0.5]])
const centreY = (s: number) => (s > 0.45 ? -0.003 * ((s - 0.45) / 0.55) : 0)
const ringR = (s: number) => Math.pow(Math.max(0, 1 - s * s), 0.42)

// value noise, for warts, blotches and mottling
export function hash(x: number, y: number, z: number) {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453
  return h - Math.floor(h)
}
export function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = x - xi, yf = y - yi, zf = z - zi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf)
  const l = (a: number, b: number, t: number) => a + (b - a) * t
  return l(
    l(l(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), l(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
    l(l(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), l(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v),
    w,
  )
}
export const fbm = (p: THREE.Vector3, f: number) => 0.6 * noise3(p.x * f, p.y * f, p.z * f) + 0.4 * noise3(p.x * f * 2.3 + 5, p.y * f * 2.3, p.z * f * 2.3)
export const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

/** A point on the body surface; `inset` < 1 shrinks it towards the body axis (muscle, cavity wall). */
function surface(s: number, phi: number, inset = 1, out = new THREE.Vector3()) {
  const r = ringR(s)
  const cy = Math.cos(phi), sz = Math.sin(phi)
  const h = cy > 0 ? halfHeight(s) : halfHeight(s) * 0.75
  const yc = centreY(s)
  out.set(L * s, yc + h * cy * r * inset, halfWidth(s) * sz * r * inset)
  if (inset === 1 && cy > -0.2) {
    // warts on the back and sides
    const d = (fbm(out, 260) - 0.5) * 0.0011 * smooth(-0.2, 0.4, cy)
    out.y += d * cy
    out.z += d * sz
  }
  return out
}
function surfaceNormal(s: number, phi: number) {
  const p = surface(s, phi)
  const a = surface(Math.min(1, s + 0.01), phi).sub(surface(Math.max(-1, s - 0.01), phi))
  const b = surface(s, phi + 0.01).sub(surface(s, phi - 0.01))
  const n = new THREE.Vector3().crossVectors(b, a).normalize()
  // outward: away from the axis
  const axis = new THREE.Vector3(p.x, centreY(s), 0)
  if (n.dot(p.clone().sub(axis)) < 0) n.negate()
  return n
}

// --- Colours ---------------------------------------------------------------------------------------
const C = (hex: number) => new THREE.Color(hex)
const OLIVE = C(0x41711a), BROWN = C(0x648a22), DARK = C(0x2f3a14), CREAM = C(0xf2efe2), THROAT = C(0xe7e3d2)
/** Round leopard spots: cells of a jittered grid, each with a dark spot and a paler rim */
function spots(p: THREE.Vector3, scale: number) {
  const q = p.clone().multiplyScalar(scale)
  const ix = Math.floor(q.x), iy = Math.floor(q.y), iz = Math.floor(q.z)
  let best = 9
  for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
    const cx = ix + dx, cy = iy + dy, cz = iz + dz
    if (hash(cx, cy, cz) > 0.62) continue // not every cell has a spot
    const fx = cx + hash(cx + 7, cy, cz), fy = cy + hash(cx, cy + 7, cz), fz = cz + hash(cx, cy, cz + 7)
    best = Math.min(best, Math.hypot(q.x - fx, q.y - fy, q.z - fz))
  }
  return best
}
function skinColour(p: THREE.Vector3, n: THREE.Vector3): THREE.Color {
  const dorsal = smooth(-0.6, 0.05, n.y)
  // green, yellower in patches
  const base = OLIVE.clone().lerp(BROWN, smooth(0.4, 0.75, fbm(p, 70)))
  // large, irregular blotches: rounded cells roughened by noise, with a softer mottled edge
  const d = spots(p, 115) + (fbm(p, 420) - 0.5) * 0.32
  base.lerp(C(0x33481a), smooth(0.6, 0.45, d) * 0.75)
  base.lerp(C(0x1f2410), smooth(0.45, 0.33, d) * 0.92)
  // brown at the edges of the blotches
  base.lerp(C(0x5b4a22), smooth(0.5, 0.42, d) * smooth(0.28, 0.36, d) * 0.5)
  // pale lichen-green mottling between them
  base.lerp(C(0x8aab3e), smooth(0.62, 0.72, fbm(p, 700)) * smooth(0.5, 0.65, d) * 0.3)
  // fine dark freckles
  base.lerp(DARK, smooth(0.72, 0.78, fbm(p, 900)) * 0.5)
  // the pale ridge (dorsolateral fold) along each side of the back
  const fold = Math.exp(-(((Math.abs(n.z) - 0.42) / 0.07) ** 2)) * smooth(0.3, 0.6, n.y) * (p.x < 0.045 ? 1 : 0)
  // a bronze ridge (dorsolateral fold) along each side of the back
  base.lerp(C(0x8c6c34), fold * 0.75)
  // the flanks are mottled where the green meets the pale belly
  const flank = smooth(-0.6, -0.1, n.y) * (1 - smooth(-0.1, 0.4, n.y))
  base.lerp(C(0xc9c79a), flank * smooth(0.45, 0.6, fbm(p, 300)) * 0.6)
  const belly = CREAM.clone().lerp(THROAT, smooth(0.02, 0.05, p.x) * 0.6)
  // grey speckles, thicker towards the sides and the throat
  belly.lerp(C(0x9a9784), smooth(0.68, 0.74, fbm(p, 520)) * (0.2 + 0.5 * smooth(-0.6, 0.1, n.y) + 0.25 * smooth(0.03, 0.06, p.x)))
  return belly.lerp(base, dorsal)
}

export function colourise(geo: THREE.BufferGeometry, fn: (p: THREE.Vector3, n: THREE.Vector3, i: number) => THREE.Color) {
  geo.computeVertexNormals()
  const pos = geo.getAttribute('position'), nor = geo.getAttribute('normal')
  const cols = new Float32Array(pos.count * 3)
  const p = new THREE.Vector3(), n = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    p.fromBufferAttribute(pos, i)
    n.fromBufferAttribute(nor, i)
    const c = fn(p, n, i)
    cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 3))
}

/** A tileable grey texture of warts and fine grain, used as the skin's bump map */
let wartImage: HTMLCanvasElement | null = null
function wartCanvas() {
  if (wartImage) return wartImage
  const N = 512
  const c = document.createElement('canvas')
  c.width = c.height = N
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, N, N)
  // fine grain
  const img = ctx.getImageData(0, 0, N, N)
  for (let i = 0; i < N * N; i++) {
    const x = i % N, y = Math.floor(i / N)
    const g = 128 + (hash(x * 0.37, y * 0.53, 1) - 0.5) * 26 + (noise3(x / 9, y / 9, 3) - 0.5) * 40
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = g
  }
  ctx.putImageData(img, 0, 0)
  // warts: soft raised bumps of mixed sizes (drawn wrapped, so the texture tiles)
  let seed = 7
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  for (let k = 0; k < 700; k++) {
    const x = rnd() * N, y = rnd() * N, r = 3 + rnd() * rnd() * 14
    for (const ox of [-N, 0, N]) for (const oy of [-N, 0, N]) {
      const gr = ctx.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r)
      gr.addColorStop(0, 'rgba(255,255,255,0.55)')
      gr.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gr
      ctx.beginPath(); ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2); ctx.fill()
    }
  }
  wartImage = c
  return c
}
const bumpTextures: THREE.Texture[] = []
function wartTexture(repeatU: number, repeatV: number) {
  const t = new THREE.CanvasTexture(wartCanvas())
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeatU, repeatV)
  t.anisotropy = 8
  bumpTextures.push(t)
  return t
}
/** Back faces (seen only where the frog is cut open by an anatomy plane) are drawn as pink flesh */
export function fleshInside(m: THREE.Material) {
  m.side = THREE.DoubleSide
  m.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', '#include <dithering_fragment>\n if (!gl_FrontFacing) gl_FragColor.rgb = vec3(0.62, 0.33, 0.31) * (0.55 + 0.45 * gl_FragColor.g * 2.0);')
  }
  return m
}
const skinMaterial = (repeatU = 7, repeatV = 5) => fleshInside(new THREE.MeshPhysicalMaterial({
  vertexColors: true, roughness: 0.55, clearcoat: 0.3, clearcoatRoughness: 0.45,
  bumpMap: wartTexture(repeatU, repeatV), bumpScale: 2.2,
}))
export const wetMaterial = (color: number, roughness = 0.38) => new THREE.MeshPhysicalMaterial({ color, roughness, clearcoat: 0.9, clearcoatRoughness: 0.25 })

// --- Surface patches -------------------------------------------------------------------------------
/** A grid patch of the body surface over rings [i0, i1] and segments [j0, j1]. */
function patch(i0: number, i1: number, j0: number, j1: number, inset: number) {
  const cols = j1 - j0 + 1
  const pos: number[] = []
  const params: [number, number][] = []
  for (let i = i0; i <= i1; i++) {
    for (let j = j0; j <= j1; j++) {
      const v = surface(sAt(i), j * PHI_STEP, inset)
      pos.push(v.x, v.y, v.z)
      params.push([i, j])
    }
  }
  const idx: number[] = []
  for (let i = 0; i < i1 - i0; i++) {
    for (let j = 0; j < j1 - j0; j++) {
      const a = i * cols + j, b = a + 1, c = a + cols, d = c + 1
      idx.push(a, b, c, b, d, c)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(params.flatMap(([i, j]) => [j / NP, i / NS]), 2))
  geo.setIndex(idx)
  return { geo, params, cols }
}

/** The whole body less the belly window. */
function bodyGeometry() {
  const { geo } = patch(0, NS, 0, NP, 1)
  const index = geo.getIndex()!.array
  const keep: number[] = []
  for (let t = 0; t < index.length; t += 3) {
    // two triangles per grid cell, in row order
    const cell = Math.floor(t / 6)
    const i = Math.floor(cell / NP), j = cell % NP
    const inWindow = i >= I_FROM && i < I_TO && j >= J_MID - J_WIN && j < J_MID + J_WIN
    if (!inWindow) keep.push(index[t], index[t + 1], index[t + 2])
  }
  geo.setIndex(keep)
  return geo
}

/** The body cavity: the inside of the body wall over the opened length, closed by a wall at each end
 *  (so nothing in the head or the hips shows through). Normals face outwards - it is drawn BackSide. */
function cavityGeometry() {
  const i0 = I_FROM - 2, i1 = I_TO + 1
  const { geo } = patch(i0, i1, 0, NP, 0.93)
  const pos = Array.from(geo.getAttribute('position').array as Float32Array)
  const idx = Array.from(geo.getIndex()!.array)
  const cols = NP + 1
  for (const [i, outward] of [[i0, -1], [i1, 1]] as const) {
    const s = sAt(i)
    const centre = pos.length / 3
    pos.push(L * s, centreY(s), 0)
    const row = (i - i0) * cols
    for (let j = 0; j < NP; j++) {
      const a = row + j, b = row + j + 1
      const pa = new THREE.Vector3(pos[a * 3], pos[a * 3 + 1], pos[a * 3 + 2])
      const pb = new THREE.Vector3(pos[b * 3], pos[b * 3 + 1], pos[b * 3 + 2])
      const pc = new THREE.Vector3(pos[centre * 3], pos[centre * 3 + 1], pos[centre * 3 + 2])
      const n = new THREE.Vector3().crossVectors(pb.clone().sub(pa), pc.clone().sub(pa))
      if (n.x * outward >= 0) idx.push(a, b, centre)
      else idx.push(a, centre, b)
    }
  }
  const out = new THREE.BufferGeometry()
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  out.setIndex(idx)
  return out
}

const PIN_HEAD_COLOURS = [0xdc2626, 0x2563eb, 0xf59e0b, 0x16a34a, 0xdb2777, 0x7c3aed]
/** A dissecting pin: steel shaft from the origin along -Y (into the board), coloured head above. */
export function makePin(colourIndex = 0): THREE.Group {
  const g = new THREE.Group()
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.00045, 0.00045, 0.03, 8), new THREE.MeshStandardMaterial({ color: 0xd6dade, metalness: 1, roughness: 0.2 }))
  shaft.position.y = -0.004
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.0022, 16, 12), new THREE.MeshPhysicalMaterial({ color: PIN_HEAD_COLOURS[colourIndex % PIN_HEAD_COLOURS.length], roughness: 0.25, clearcoat: 1 }))
  head.position.y = 0.011
  shaft.castShadow = head.castShadow = true
  g.add(shaft, head)
  return g
}

// --- Variable-radius tubes (limbs, gut, toes) --------------------------------------------------------
export interface Tube { geo: THREE.BufferGeometry; rebuild: (pts: THREE.Vector3[]) => void }
export function tube(points: THREE.Vector3[], radius: (t: number) => number, rings: number, segs: number, flatten = 1): Tube {
  const geo = new THREE.BufferGeometry()
  const n = (rings + 1) * (segs + 1)
  const idx: number[] = []
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < segs; j++) {
      const a = i * (segs + 1) + j, b = a + 1, c = a + segs + 1, d = c + 1
      idx.push(a, b, c, b, d, c)
    }
  }
  // close both ends
  const tipIndex = n
  const startIndex = n + 1
  const pos2 = new Float32Array((n + 2) * 3)
  geo.setAttribute('position', new THREE.BufferAttribute(pos2, 3))
  const uv = new Float32Array((n + 2) * 2)
  for (let i = 0; i <= rings; i++) for (let j = 0; j <= segs; j++) { const q = i * (segs + 1) + j; uv[q * 2] = j / segs; uv[q * 2 + 1] = i / rings }
  uv[n * 2] = 0.5; uv[n * 2 + 1] = 1
  uv[(n + 1) * 2] = 0.5; uv[(n + 1) * 2 + 1] = 0
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  for (let j = 0; j < segs; j++) idx.push(rings * (segs + 1) + j, rings * (segs + 1) + j + 1, tipIndex)
  for (let j = 0; j < segs; j++) idx.push(j + 1, j, startIndex)
  geo.setIndex(idx)
  const rebuild = (pts: THREE.Vector3[]) => {
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal')
    const frames = curve.computeFrenetFrames(rings, false)
    const arr = geo.getAttribute('position') as THREE.BufferAttribute
    const p = new THREE.Vector3(), v = new THREE.Vector3()
    for (let i = 0; i <= rings; i++) {
      const t = i / rings
      curve.getPointAt(t, p)
      const r = radius(t)
      const N = frames.normals[i], B = frames.binormals[i]
      for (let j = 0; j <= segs; j++) {
        const a = (j / segs) * Math.PI * 2
        v.copy(p).addScaledVector(N, Math.cos(a) * r * flatten).addScaledVector(B, Math.sin(a) * r)
        arr.setXYZ(i * (segs + 1) + j, v.x, v.y, v.z)
      }
    }
    curve.getPointAt(1, p)
    const tangent = curve.getTangentAt(1)
    p.addScaledVector(tangent, radius(1) * 0.8)
    arr.setXYZ(tipIndex, p.x, p.y, p.z)
    curve.getPointAt(0, p)
    p.addScaledVector(curve.getTangentAt(0), -radius(0) * 0.6)
    arr.setXYZ(startIndex, p.x, p.y, p.z)
    arr.needsUpdate = true
    geo.computeVertexNormals()
    geo.computeBoundingSphere()
  }
  rebuild(points)
  return { geo, rebuild }
}

// --- Limbs -----------------------------------------------------------------------------------------
interface LimbDef {
  part: 'hind_leg' | 'fore_leg'
  footPart: 'hind_foot' | 'fore_foot'
  /** Control points (right side), with how far each sinks to the surface (0 at the body, 1 at the foot) */
  pts: [number, number, number, number][]
  /** The same control points for the frog pinned out on its back */
  spread: [number, number, number][]
  /** How far the digits turn outwards when pinned out */
  spreadTurn: number
  /** Sitting: each control point's x and z (its height follows the ground by its sink factor) */
  sit: [number, number][]
  /** Direction the digits point while sitting */
  sitDigitDir: number
  radii: [number, number][]
  digits: { angle: number; len: number }[]
  /** Direction the digits point (in the xz plane) at angle 0 */
  digitDir: number
  digitR: number
  webbed: boolean
}
const HIND: LimbDef = {
  part: 'hind_leg', footPart: 'hind_foot',
  pts: [[-0.044, -0.003, 0.013, 0], [-0.06, -0.004, 0.045, 0.35], [-0.075, -0.004, 0.072, 0.7], [-0.1, -0.004, 0.071, 0.88], [-0.128, -0.004, 0.053, 1], [-0.158, -0.004, 0.058, 1]],
  spread: [[-0.044, -0.003, 0.013], [-0.054, -0.004, 0.05], [-0.064, -0.004, 0.077], [-0.088, -0.004, 0.064], [-0.113, -0.004, 0.036], [-0.143, -0.004, 0.05]],
  spreadTurn: 0.4,
  // the leg folded in a Z beside the body: thigh forward, shin back, foot forward
  // thigh forward and out to the knee, shin back under it, foot out to the side and back
  sit: [[-0.044, 0.015], [-0.028, 0.04], [-0.008, 0.054], [-0.03, 0.064], [-0.058, 0.062], [-0.078, 0.082]],
  sitDigitDir: 2.35,
  radii: [[0, 0.016], [0.18, 0.0165], [0.4, 0.0085], [0.6, 0.0098], [0.8, 0.005], [1, 0.0038]],
  digits: [{ angle: -0.62, len: 0.02 }, { angle: -0.3, len: 0.029 }, { angle: 0.0, len: 0.04 }, { angle: 0.28, len: 0.047 }, { angle: 0.56, len: 0.031 }],
  digitDir: Math.PI, // backwards (-x)
  digitR: 0.0015,
  webbed: true,
}
const FORE: LimbDef = {
  part: 'fore_leg', footPart: 'fore_foot',
  pts: [[0.02, -0.006, 0.016, 0], [0.021, -0.007, 0.036, 0.4], [0.024, -0.007, 0.047, 0.65], [0.037, -0.007, 0.05, 0.85], [0.048, -0.007, 0.051, 1]],
  spread: [[0.02, -0.006, 0.016], [0.026, -0.007, 0.037], [0.034, -0.007, 0.05], [0.05, -0.007, 0.058], [0.066, -0.007, 0.064]],
  spreadTurn: 0.45,
  // the arm straight down to the ground in front, propping the head up
  // the arms go straight down to the ground under the chest (backwards, in the tilted body)
  sit: [[0.02, 0.017], [0.018, 0.03], [0.015, 0.033], [0.011, 0.034], [0.008, 0.034]],
  sitDigitDir: 0.25,
  radii: [[0, 0.0068], [0.35, 0.0055], [0.5, 0.0046], [0.8, 0.0042], [1, 0.0032]],
  digits: [{ angle: -0.55, len: 0.011 }, { angle: -0.15, len: 0.016 }, { angle: 0.22, len: 0.015 }, { angle: 0.58, len: 0.01 }],
  digitDir: 0, // forwards (+x)
  digitR: 0.0012,
  webbed: false,
}
/** How far each limb drops to reach the surface the frog rests on, on its back */
const restY = (lift: number) => (lift >= 0 ? 0.019 : -0.0138)
/** Sitting: the body is tilted head-up by SIT_TILT about its side-to-side axis, its centre SIT_H above the ground */
export const SIT_TILT = 0.5
export const SIT_H = 0.037
/** Height (frog-local y) of the ground under local x, while sitting */
const sitGroundY = (x: number) => -(x * Math.sin(SIT_TILT) + SIT_H) / Math.cos(SIT_TILT)

function limbPoints(def: LimbDef, side: 1 | -1, lift: number) {
  if (lift < 0) {
    const w = -lift
    return def.pts.map(([x, y, z, k], i) => {
      const [sx, sz] = def.sit[i]
      const r = interp(i / (def.pts.length - 1), def.radii)
      const sy = y + (sitGroundY(sx) + r * 0.9 - y) * k
      return new THREE.Vector3(x + (sx - x) * w, y + (sy - y) * w, (z + (sz - z) * w) * side)
    })
  }
  const target = restY(lift)
  const w = Math.max(0, lift)
  return def.pts.map(([x, y, z, k], i) => {
    const [sx, , sz] = def.spread[i]
    return new THREE.Vector3(x + (sx - x) * w, y + (target - y) * k * Math.abs(lift), (z + (sz - z) * w) * side)
  })
}
function digitPoints(def: LimbDef, side: 1 | -1, lift: number, d: { angle: number; len: number }) {
  const base = limbPoints(def, side, lift)[def.pts.length - 1]
  const turn = def.spreadTurn * Math.max(0, lift) * (def.digitDir === 0 ? 1 : -1)
  const sitW = Math.max(0, -lift)
  const baseDir = def.digitDir + (def.sitDigitDir - def.digitDir) * sitW
  const sgn = baseDir < Math.PI / 2 ? 1 : -1
  const a = (baseDir + d.angle * sgn + turn) * side
  const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a))
  const pts: THREE.Vector3[] = []
  for (let k = 0; k <= 4; k++) {
    const t = k / 4
    // digits splay slightly as they go and curl down a touch at the tips
    const p = base.clone().addScaledVector(dir, d.len * t).add(new THREE.Vector3(0, -0.0008 * Math.sin(t * Math.PI) * (lift >= 0 ? -1 : 1), 0))
    // sitting: the toes lie along the (tilted) ground
    if (sitW > 0) p.y += (sitGroundY(p.x) + def.digitR - p.y) * sitW
    pts.push(p)
  }
  return pts
}
function radiusFn(radii: [number, number][]) {
  return (t: number) => interp(t, radii)
}

interface BuiltLimb { meshes: THREE.Mesh[]; update: (lift: number) => void; pinPoint: (lift: number) => THREE.Vector3 }
function buildLimb(def: LimbDef, side: 1 | -1): BuiltLimb {
  const legMat = skinMaterial(3, def.part === 'hind_leg' ? 9 : 4)
  const leg = tube(limbPoints(def, side, 0), radiusFn(def.radii), 80, 18, 0.85)
  colourise(leg.geo, (p, n, i) => {
    const t = Math.floor(i / 19) / 80
    // the legs are spotted all round (only a little paler underneath)
    const c = skinColour(p, new THREE.Vector3(n.x, 0.65 + 0.35 * n.y, n.z))
    // dark cross-bands on the upper side of the legs
    if (n.y > -0.1 && def.part === 'hind_leg') c.lerp(DARK, smooth(0.55, 0.8, Math.sin(t * 34) * 0.5 + 0.5) * 0.55 * smooth(-0.1, 0.4, n.y))
    return c
  })
  const legMesh = new THREE.Mesh(leg.geo, legMat)
  legMesh.userData.part = def.part
  legMesh.userData.side = side > 0 ? 'r' : 'l'
  const meshes: THREE.Mesh[] = [legMesh]

  const digitMat = skinMaterial(1, 2)
  const digits = def.digits.map((d) => {
    const tb = tube(digitPoints(def, side, 0, d), (t) => def.digitR * (1 - 0.35 * t) + (t > 0.9 ? 0.0004 : 0), 16, 10, 0.8)
    colourise(tb.geo, (p, n) => skinColour(p, new THREE.Vector3(n.x, 0.65 + 0.35 * n.y, n.z)).lerp(C(def.webbed ? 0xa8936a : 0xb08a6a), 0.5))
    const m = new THREE.Mesh(tb.geo, digitMat)
    m.userData.part = def.footPart
    m.userData.side = side > 0 ? 'r' : 'l'
    meshes.push(m)
    return { d, tb }
  })

  // webs between the hind toes, notched between the tips
  let web: THREE.Mesh | null = null
  const WU = 6, WV = 6
  const webVerts = () => {
    const out: number[] = []
    for (let k = 0; k < def.digits.length - 1; k++) {
      for (let u = 0; u <= WU; u++) {
        for (let v = 0; v <= WV; v++) {
          const fu = u / WU
          const depth = 0.82 - 0.42 * Math.sin(Math.PI * fu)
          out.push(k, fu, (v / WV) * depth)
        }
      }
    }
    return out
  }
  const webParams = def.webbed ? webVerts() : []
  const webGeo = new THREE.BufferGeometry()
  if (def.webbed) {
    const count = webParams.length / 3
    webGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    const idx: number[] = []
    const per = (WU + 1) * (WV + 1)
    for (let k = 0; k < def.digits.length - 1; k++) {
      for (let u = 0; u < WU; u++) {
        for (let v = 0; v < WV; v++) {
          const a = k * per + u * (WV + 1) + v, b = a + 1, c = a + WV + 1, d = c + 1
          idx.push(a, c, b, b, c, d)
        }
      }
    }
    webGeo.setIndex(idx)
    web = new THREE.Mesh(webGeo, new THREE.MeshPhysicalMaterial({ color: 0x9c8a5a, roughness: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 0.88, clearcoat: 0.4 }))
    web.userData.part = def.footPart
    web.userData.side = side > 0 ? 'r' : 'l'
    meshes.push(web)
  }

  const update = (lift: number) => {
    leg.rebuild(limbPoints(def, side, lift))
    const curves = digits.map(({ d, tb }) => {
      const pts = digitPoints(def, side, lift, d)
      tb.rebuild(pts)
      return new THREE.CatmullRomCurve3(pts)
    })
    if (web) {
      const arr = webGeo.getAttribute('position') as THREE.BufferAttribute
      const a = new THREE.Vector3(), b = new THREE.Vector3()
      for (let q = 0; q < webParams.length / 3; q++) {
        const k = webParams[q * 3], fu = webParams[q * 3 + 1], fv = webParams[q * 3 + 2]
        curves[k].getPointAt(fv, a)
        curves[k + 1].getPointAt(fv, b)
        a.lerp(b, fu)
        arr.setXYZ(q, a.x, a.y, a.z)
      }
      arr.needsUpdate = true
      webGeo.computeVertexNormals()
      webGeo.computeBoundingSphere()
    }
  }
  update(0)
  const pinPoint = (lift: number) => {
    const base = limbPoints(def, side, lift)[def.pts.length - 1]
    const turn = def.spreadTurn * Math.max(0, lift) * (def.digitDir === 0 ? 1 : -1) * side
    const a = def.digitDir + turn
    return base.add(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)).multiplyScalar(def.webbed ? 0.014 : 0.005))
  }
  return { meshes, update, pinPoint }
}

// --- Organs ----------------------------------------------------------------------------------------
export function blob(radii: THREE.Vector3, bump: number, bumpFreq: number, color: (p: THREE.Vector3) => THREE.Color, segs = 32) {
  const geo = new THREE.SphereGeometry(1, segs, Math.round(segs * 0.75))
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    const k = 1 + (noise3(v.x * bumpFreq, v.y * bumpFreq, v.z * bumpFreq) - 0.5) * bump
    v.multiplyScalar(k).multiply(radii)
    pos.setXYZ(i, v.x, v.y, v.z)
  }
  colourise(geo, p => color(p))
  return geo
}
/** A fine, tileable texture for the surface of the organs (bump map) */
let organBumpImage: HTMLCanvasElement | null = null
function organBumpCanvas() {
  if (organBumpImage) return organBumpImage
  const N = 256
  const c = document.createElement('canvas')
  c.width = c.height = N
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(N, N)
  for (let i = 0; i < N * N; i++) {
    const x = i % N, y = Math.floor(i / N)
    // soft cells (spongy / glandular tissue) with fine grain
    const v = 128 + (noise3(x / 6, y / 6, 2) - 0.5) * 120 + (hash(x, y, 9) - 0.5) * 30
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v
    img.data[i * 4 + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  organBumpImage = c
  return c
}
export function organBump(repeat: number) {
  const t = new THREE.CanvasTexture(organBumpCanvas())
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeat, repeat)
  bumpTextures.push(t)
  return t
}
/** Wet, glistening organ surface; `texture` sets how rough it looks (lungs spongy, liver smooth) */
export const organMat = (texture = 1) => new THREE.MeshPhysicalMaterial({
  vertexColors: true, roughness: 0.35, clearcoat: 0.85, clearcoatRoughness: 0.2, side: THREE.DoubleSide,
  bumpMap: organBump(3 + texture * 3), bumpScale: 0.6 * texture,
})

function tag(o: THREE.Object3D, part: FrogPart, side: 'l' | 'r' | null = null) {
  o.traverse((c) => { c.userData.part = part; if (side) c.userData.side = side })
  return o
}

/** Ring centres and offsets of a tube, so it can swell and narrow in a wave (peristalsis) */
export function peristalsis(geo: THREE.BufferGeometry, rings: number, segs: number, amount: number, waves: number) {
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const base = (pos.array as Float32Array).slice()
  const centres = new Float32Array((rings + 1) * 3)
  for (let i = 0; i <= rings; i++) {
    let x = 0, y = 0, z = 0
    for (let j = 0; j < segs; j++) { const q = (i * (segs + 1) + j) * 3; x += base[q]; y += base[q + 1]; z += base[q + 2] }
    centres[i * 3] = x / segs; centres[i * 3 + 1] = y / segs; centres[i * 3 + 2] = z / segs
  }
  return (t: number) => {
    for (let i = 0; i <= rings; i++) {
      const k = 1 + amount * Math.sin((i / rings) * waves * Math.PI * 2 - t * 2.2)
      const cx = centres[i * 3], cy = centres[i * 3 + 1], cz = centres[i * 3 + 2]
      for (let j = 0; j <= segs; j++) {
        const q = i * (segs + 1) + j
        pos.setXYZ(q, cx + (base[q * 3] - cx) * k, cy + (base[q * 3 + 1] - cy) * k, cz + (base[q * 3 + 2] - cz) * k)
      }
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  }
}

function buildOrgans(root: THREE.Group) {
  const centres: Partial<Record<FrogPart, THREE.Vector3>> = {}
  const organs: Record<OrganKey, THREE.Object3D[]> = { heart: [], lungs: [], liver: [], gall_bladder: [], stomach: [], small_intestine: [], large_intestine: [], fat_bodies: [], kidneys: [], spleen: [], pancreas: [], bladder: [] }
  const reg = <T extends THREE.Object3D>(k: OrganKey, o: T) => { organs[k].push(o); return o }

  // Heart: a conical ventricle, two darker atria in front of it and the pale truncus arteriosus
  const heart = new THREE.Group()
  heart.position.set(0.0245, -0.0056, 0.0005)
  const vGeo = new THREE.SphereGeometry(0.0052, 32, 24)
  const vp = vGeo.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < vp.count; i++) {
    const x = vp.getX(i)
    const k = x < 0 ? 1 + (x / 0.0052) * 0.5 : 1
    vp.setXYZ(i, x * 1.35, vp.getY(i) * k * 0.85, vp.getZ(i) * k)
  }
  colourise(vGeo, p => C(0x9a1f1f).lerp(C(0x6e1212), smooth(0.4, 0.7, fbm(p, 900)) * 0.6))
  const ventricle = new THREE.Mesh(vGeo, organMat())
  ventricle.position.x = -0.0022
  ventricle.name = 'ventricle'
  const atrium = (z: number, hex: number) => {
    const g = blob(new THREE.Vector3(0.0034, 0.0029, 0.0031), 0.12, 600, () => C(hex))
    const m = new THREE.Mesh(g, organMat())
    m.position.set(0.0036, 0.0006, z)
    m.name = 'atrium'
    return m
  }
  const truncus = new THREE.Mesh(tube([new THREE.Vector3(0.001, -0.0028, 0.0005), new THREE.Vector3(0.006, -0.0032, 0), new THREE.Vector3(0.0095, -0.0024, 0)], () => 0.0012, 16, 10).geo, wetMaterial(0xd9b3a6))
  const arch = (z: number) => new THREE.Mesh(tube([new THREE.Vector3(0.009, -0.0024, 0), new THREE.Vector3(0.0115, -0.0018, z * 0.5), new THREE.Vector3(0.0128, -0.0006, z)], () => 0.0009, 12, 8).geo, wetMaterial(0xd2a59a))
  heart.add(ventricle, atrium(0.0032, 0x5d1620), atrium(-0.0032, 0x6b1a1a), truncus, arch(0.006), arch(-0.006))
  // coronary vessels running down the ventricle
  for (const z of [-0.0016, 0.0018]) {
    const vessel = new THREE.Mesh(tube([new THREE.Vector3(0.0005, -0.0042, z), new THREE.Vector3(-0.003, -0.0044, z * 1.2), new THREE.Vector3(-0.0065, -0.0028, z * 0.6)], () => 0.00028, 16, 6).geo, wetMaterial(0x7c1020, 0.3))
    heart.add(vessel)
  }
  tag(heart, 'heart')
  root.add(reg('heart', heart))
  centres.heart = heart.position.clone()

  // Lungs: pink, spongy sacs beside the heart, running back under the liver
  for (const side of [1, -1] as const) {
    const g = blob(new THREE.Vector3(0.009, 0.0045, 0.006), 0.22, 1400, p => C(0xe59c9c).lerp(C(0xbf5f6c), smooth(0.45, 0.75, fbm(p, 2400)) * 0.7))
    const m = new THREE.Mesh(g, organMat(3))
    m.position.set(0.0205, -0.0045, 0.0158 * side)
    m.rotation.y = -0.45 * side
    root.add(reg('lungs', tag(m, 'lungs', side > 0 ? 'r' : 'l')))
  }
  centres.lungs = new THREE.Vector3(0.0225, -0.0075, 0.017)

  // Liver: three glossy dark lobes behind the heart, the gall bladder tucked between them
  const liverColour = (p: THREE.Vector3) => C(0x6d2116).lerp(C(0x4f150f), smooth(0.4, 0.75, fbm(p, 700)) * 0.6)
  const lobe = (pos: [number, number, number], radii: [number, number, number], rotY: number) => {
    const m = new THREE.Mesh(blob(new THREE.Vector3(...radii), 0.08, 350, liverColour, 40), organMat(0.3))
    m.position.set(...pos)
    m.rotation.y = rotY
    return reg('liver', tag(m, 'liver'))
  }
  root.add(
    lobe([0.0072, -0.0083, 0.0108], [0.0128, 0.0027, 0.0106], 0.3),
    lobe([0.0092, -0.0083, -0.0098], [0.0118, 0.0027, 0.0095], -0.25),
    lobe([0.0005, -0.0082, -0.0125], [0.0092, 0.0026, 0.0068], -0.6),
  )
  centres.liver = new THREE.Vector3(0.008, -0.0095, 0.009)
  const gall = new THREE.Mesh(blob(new THREE.Vector3(0.0022, 0.0019, 0.0021), 0.05, 400, () => C(0x4e7d2a)), wetMaterial(0x4e7d2a, 0.25))
  gall.position.set(0.0025, -0.0092, 0.0012)
  root.add(reg('gall_bladder', tag(gall, 'gall_bladder')))
  centres.gall_bladder = gall.position.clone()

  // Stomach: the creamy J-shaped tube on the frog's left, from the gullet back to the pylorus
  const stomachPts = [[0.027, -0.0015, -0.004], [0.02, -0.003, -0.012], [0.008, -0.0062, -0.021], [-0.006, -0.0078, -0.0212], [-0.0145, -0.0078, -0.0128], [-0.0158, -0.0075, -0.0038]].map(a => new THREE.Vector3(...(a as [number, number, number])))
  const stomach = tube(stomachPts, t => 0.0034 + 0.0019 * Math.sin(Math.min(1, t * 1.25) * Math.PI) - 0.0008 * t, 60, 18)
  colourise(stomach.geo, p => C(0xe9d6c6).lerp(C(0xd4a99a), smooth(0.55, 0.62, fbm(p, 1500)) * 0.5))
  const stomachMesh = new THREE.Mesh(stomach.geo, organMat(1.6))
  root.add(reg('stomach', tag(stomachMesh, 'stomach')))
  // blood vessels branching over the stomach wall
  for (let k = 0; k < 5; k++) {
    const t0 = 0.2 + k * 0.13
    const c = new THREE.CatmullRomCurve3(stomachPts).getPointAt(t0)
    const v = new THREE.Mesh(tube([c.clone().add(new THREE.Vector3(0.0012, -0.0046, 0.0028)), c.clone().add(new THREE.Vector3(0, -0.0052, 0)), c.clone().add(new THREE.Vector3(-0.0012, -0.0046, -0.0028))], () => 0.00022, 12, 5).geo, wetMaterial(0xa3243a, 0.3))
    root.add(reg('stomach', tag(v, 'stomach')))
  }
  // pancreas: a pale, flattened strip in the loop between the stomach and the duodenum
  const panc = new THREE.Mesh(blob(new THREE.Vector3(0.0065, 0.0012, 0.0024), 0.25, 900, p => C(0xf0d8b0).lerp(C(0xe2bf8e), smooth(0.4, 0.7, fbm(p, 1600)) * 0.6)), organMat())
  panc.position.set(-0.0105, -0.0052, -0.0085)
  panc.rotation.y = 0.7
  root.add(reg('pancreas', tag(panc, 'pancreas')))
  centres.pancreas = panc.position.clone().add(new THREE.Vector3(0, -0.002, 0))
  centres.stomach = new THREE.Vector3(-0.007, -0.0085, -0.0205)

  // Gut: the coiled small intestine (from the pylorus) and the short, wide large intestine
  const gut = new THREE.Group()
  const coil: THREE.Vector3[] = [new THREE.Vector3(-0.0155, -0.0072, -0.0035), new THREE.Vector3(-0.0138, -0.0074, 0.006), new THREE.Vector3(-0.015, -0.007, 0.0155)]
  for (let row = 0; row < 4; row++) {
    const x = -0.0185 - row * 0.0045
    const dir = row % 2 === 0 ? -1 : 1
    for (let k = 0; k <= 6; k++) {
      const z = dir * (0.016 - (k / 6) * 0.032) * (row === 3 ? 0.8 : 1)
      coil.push(new THREE.Vector3(x + Math.sin(k * 1.9 + row) * 0.0016, -0.0074 + 0.0016 * Math.sin(k * 1.3 + row * 2.1), z))
    }
  }
  coil.push(new THREE.Vector3(-0.034, -0.0052, 0.0075))
  const small = tube(coil, () => 0.0024, 420, 10)
  colourise(small.geo, p => C(0xe2b09c).lerp(C(0xc4806f), smooth(0.5, 0.65, fbm(p, 1800)) * 0.6).lerp(C(0xa8323a), smooth(0.7, 0.74, fbm(p, 4200)) * 0.5))
  gut.add(reg('small_intestine', tag(new THREE.Mesh(small.geo, organMat(1.4)), 'small_intestine')))
  const smallWave = peristalsis(small.geo, 420, 10, 0.16, 9)
  centres.small_intestine = new THREE.Vector3(-0.024, -0.0085, 0.004)
  const large = tube([new THREE.Vector3(-0.034, -0.0052, 0.0075), new THREE.Vector3(-0.041, -0.0052, 0.004), new THREE.Vector3(-0.049, -0.0042, 0.0012), new THREE.Vector3(-0.06, -0.0022, 0)], t => 0.0043 - 0.0012 * t, 40, 16)
  colourise(large.geo, p => C(0xb88f80).lerp(C(0x8f6a5e), smooth(0.5, 0.7, fbm(p, 1000)) * 0.6))
  gut.add(reg('large_intestine', tag(new THREE.Mesh(large.geo, organMat()), 'large_intestine')))
  centres.large_intestine = new THREE.Vector3(-0.045, -0.0085, 0.003)
  root.add(gut)

  // Fat bodies: yellow finger-like bodies either side, towards the back
  for (const side of [1, -1] as const) {
    const fb = new THREE.Group()
    for (let k = 0; k < 4; k++) {
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.0013, 0.006, 6, 10), wetMaterial(0xf0c445, 0.4))
      m.rotation.z = Math.PI / 2
      m.rotation.y = (k - 1.5) * 0.35 * side
      m.position.set(-0.012 - k * 0.0006, -0.0015 + k * 0.0004, (0.0175 + k * 0.0012) * side)
      fb.add(m)
    }
    root.add(reg('fat_bodies', tag(fb, 'fat_bodies', side > 0 ? 'r' : 'l')))
  }
  centres.fat_bodies = new THREE.Vector3(-0.013, -0.003, 0.018)

  // Kidneys: long and dark red, flat against the back wall either side of the midline
  for (const side of [1, -1] as const) {
    const m = new THREE.Mesh(blob(new THREE.Vector3(0.0085, 0.0021, 0.0034), 0.1, 500, p => C(0x6a1c1c).lerp(C(0x4a1010), smooth(0.4, 0.7, fbm(p, 900)) * 0.5)), new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.55, clearcoat: 0.35, clearcoatRoughness: 0.4 }))
    m.position.set(-0.0255, 0.0068, 0.0066 * side)
    m.rotation.y = 0.08 * side
    root.add(reg('kidneys', tag(m, 'kidneys', side > 0 ? 'r' : 'l')))
    // a testis on the front of each kidney (this is a male)
    const t = new THREE.Mesh(blob(new THREE.Vector3(0.0036, 0.0017, 0.0022), 0.08, 600, () => C(0xf0d27a)), organMat())
    t.position.set(-0.0215, 0.0045, 0.0068 * side)
    root.add(reg('kidneys', tag(t, 'testes', side > 0 ? 'r' : 'l')))
  }
  centres.kidneys = new THREE.Vector3(-0.0255, 0.0048, 0.0066)
  centres.testes = new THREE.Vector3(-0.0215, 0.0028, 0.0068)

  // spleen: a small dark-red ball in the mesentery, under the coils
  const spleen = new THREE.Mesh(blob(new THREE.Vector3(0.0024, 0.0021, 0.0023), 0.1, 700, () => C(0x7a1c24)), organMat())
  spleen.position.set(-0.02, -0.0025, 0.0035)
  root.add(reg('spleen', tag(spleen, 'spleen')))
  centres.spleen = spleen.position.clone().add(new THREE.Vector3(0, -0.002, 0))

  // urinary bladder: a thin, two-lobed sac under the large intestine
  for (const side of [1, -1] as const) {
    const m = new THREE.Mesh(blob(new THREE.Vector3(0.0062, 0.0028, 0.0048), 0.06, 400, () => C(0xe8c9c0)), new THREE.MeshPhysicalMaterial({ color: 0xead2c8, roughness: 0.25, clearcoat: 1, transparent: true, opacity: 0.72 }))
    m.position.set(-0.036, -0.004, 0.0058 * side)
    root.add(reg('bladder', tag(m, 'bladder', side > 0 ? 'r' : 'l')))
  }
  centres.bladder = new THREE.Vector3(-0.036, -0.0068, 0.0058)

  // what moves in the living frog
  const lungs = organs.lungs
  const atria: THREE.Object3D[] = [], ventricles: THREE.Object3D[] = []
  heart.traverse((o) => { if (o.name === 'atrium') atria.push(o); if (o.name === 'ventricle') ventricles.push(o) })
  const pulse = (ph: number) => (ph > 0 && ph < 0.22 ? Math.sin((ph / 0.22) * Math.PI) : 0)
  let lastWave = -1
  const animate = (t: number) => {
    // heart: about 45 beats a minute - the atria contract, then the ventricle
    const ph = (t / 1.33) % 1
    atria.forEach(a => a.scale.setScalar(1 - 0.16 * pulse(ph)))
    ventricles.forEach(v => v.scale.setScalar(1 - 0.13 * pulse(ph - 0.2)))
    // lungs: fill and empty about 20 times a minute
    const b = 0.5 - 0.5 * Math.cos((t / 3) * Math.PI * 2)
    lungs.forEach(l => l.scale.set(1 + 0.1 * b, 1 + 0.3 * b, 1 + 0.08 * b))
    // small intestine: slow waves of peristalsis (refreshed about 15 times a second)
    if (t - lastWave > 0.066 || t < lastWave) { lastWave = t; smallWave(t) }
  }
  const rest = () => {
    atria.forEach(a => a.scale.setScalar(1))
    ventricles.forEach(v => v.scale.setScalar(1))
    lungs.forEach(l => l.scale.setScalar(1))
  }

  return { heart, gut, centres, organs, animate, rest }
}

// --- Skeleton -------------------------------------------------------------------------------------
export const BONE = () => new THREE.MeshPhysicalMaterial({ color: 0xeee8d8, roughness: 0.5, clearcoat: 0.25, clearcoatRoughness: 0.5 })
export const nameBone = (o: THREE.Object3D, name: string) => { o.traverse((c) => { c.userData.part = 'bone'; c.userData.boneName = name }); return o }
/** A long bone from a to b: a slim shaft that flares into knobbly ends (turned on a lathe) */
export function boneBetween(a: THREE.Vector3, b: THREE.Vector3, r: number, name: string, mat: THREE.Material) {
  const len = a.distanceTo(b)
  const prof: THREE.Vector2[] = []
  const n = 18
  for (let k = 0; k <= n; k++) {
    const t = k / n
    // wide at each end (the joint), narrowing to a waist in the middle
    const end = Math.max(Math.exp(-((t / 0.12) ** 2)), Math.exp(-(((1 - t) / 0.12) ** 2)))
    const w = r * (0.7 + 1.1 * end + 0.1 * Math.sin(t * Math.PI))
    prof.push(new THREE.Vector2(Math.max(0.00005, k === 0 || k === n ? w * 0.55 : w), t * len))
  }
  const geo = new THREE.LatheGeometry(prof, 12)
  const m = new THREE.Mesh(geo, mat)
  m.position.copy(a)
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize())
  return nameBone(m, name)
}
/** A small knuckle at a joint */
export function knuckle(p: THREE.Vector3, r: number, name: string, mat: THREE.Material) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), mat)
  m.position.copy(p)
  return nameBone(m, name)
}
/** The flat, broad frog skull: a rounded plate with two big eye sockets, in the body's own plane */
function skullPlate(mat: THREE.Material) {
  const shape = new THREE.Shape()
  // outline in (x = forward, y = side), rounded snout in front
  shape.moveTo(0.03, -0.021)
  shape.bezierCurveTo(0.042, -0.025, 0.062, -0.021, 0.07, -0.007)
  shape.bezierCurveTo(0.073, 0, 0.073, 0, 0.07, 0.007)
  shape.bezierCurveTo(0.062, 0.021, 0.042, 0.025, 0.03, 0.021)
  shape.bezierCurveTo(0.025, 0.01, 0.025, -0.01, 0.03, -0.021)
  for (const side of [1, -1]) {
    const hole = new THREE.Path()
    hole.absellipse(0.046, 0.012 * side, 0.0085, 0.0068, 0, Math.PI * 2, false, 0)
    shape.holes.push(hole)
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.0018, bevelEnabled: true, bevelThickness: 0.0006, bevelSize: 0.0006, bevelSegments: 2, curveSegments: 24 })
  // shape x,y -> frog x,z; extrude along frog y
  geo.rotateX(Math.PI / 2)
  const m = new THREE.Mesh(geo, mat)
  m.position.y = 0.006
  return nameBone(m, 'skull')
}
function buildSkeleton(pose: number) {
  const g = new THREE.Group()
  const mat = BONE()
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
  const add = (o: THREE.Object3D) => { g.add(o); return o }

  // skull: plate, braincase ridge down the middle, the jaws round the edge, eye-socket rims
  add(skullPlate(mat))
  add(boneBetween(V(0.024, 0.007, 0), V(0.066, 0.006, 0), 0.0034, 'skull (braincase)', mat))
  const jaw = (y: number, name: string, r: number) => {
    const pts = [V(0.028, y, 0.023), V(0.045, y, 0.025), V(0.063, y, 0.017), V(0.071, y, 0), V(0.063, y, -0.017), V(0.045, y, -0.025), V(0.028, y, -0.023)]
    return nameBone(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, r, 8), mat), name)
  }
  add(jaw(0.004, 'upper jaw (maxilla)', 0.0011))
  for (const side of [1, -1]) add(boneBetween(V(0.03, 0.007, 0.012 * side), V(0.027, -0.003, 0.023 * side), 0.0013, 'skull (squamosal - jaw hinge)', mat))
  add(jaw(-0.003, 'lower jaw (mandible)', 0.0013))
  for (const side of [1, -1]) {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.008, 0.0012, 10, 36), mat)
    rim.position.set(0.046, 0.009, 0.014 * side)
    rim.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0.55, 0.85 * side).normalize())
    add(nameBone(rim, 'skull (eye socket)'))
  }

  // backbone: nine vertebrae, each a body with a spine on top and transverse processes; the sacral
  // one with long processes out to the hip bones
  for (let k = 0; k < 9; k++) {
    const x = 0.022 - k * 0.0058
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.0021, 0.0021, 0.0048, 10), mat)
    body.rotation.z = Math.PI / 2
    body.position.set(x, 0.008, 0)
    add(nameBone(body, k === 8 ? 'sacral vertebra' : 'vertebra'))
    add(boneBetween(V(x, 0.009, 0), V(x - 0.001, 0.0125, 0), 0.0007, k === 8 ? 'sacral vertebra' : 'vertebra', mat))
    const reach = k === 8 ? 0.0115 : k < 3 ? 0.0095 : 0.0075
    for (const side of [1, -1]) add(boneBetween(V(x, 0.0085, 0.0018 * side), V(x - (k === 8 ? 0.003 : 0), 0.0085, reach * side), k === 8 ? 0.0011 : 0.0006, k === 8 ? 'sacral vertebra' : 'vertebra', mat))
  }
  // urostyle: the long rod behind the backbone
  add(boneBetween(V(-0.031, 0.008, 0), V(-0.064, 0.006, 0), 0.0017, 'urostyle', mat))

  const hindPts = (side: 1 | -1) => limbPoints(HIND, side, pose)
  const forePts = (side: 1 | -1) => limbPoints(FORE, side, pose)
  for (const side of [1, -1] as const) {
    const h = hindPts(side)
    // hip: the long ilium from the sacrum back to the hip socket
    add(boneBetween(V(0.022 - 8 * 0.0058 - 0.003, 0.0085, 0.0115 * side), h[0], 0.0017, 'pelvic girdle (ilium)', mat))
    add(knuckle(h[0], 0.0034, 'pelvic girdle (hip socket)', mat))
    add(boneBetween(h[0], h[2], 0.003, 'femur', mat))
    // tibiofibula: one bone, grooved where the tibia and fibula fused - drawn as a pair
    const off = new THREE.Vector3(0, 0.0009, 0)
    add(boneBetween(h[2].clone().add(off), h[4].clone().add(off), 0.002, 'tibiofibula', mat))
    add(boneBetween(h[2].clone().sub(off), h[4].clone().sub(off), 0.002, 'tibiofibula', mat))
    // the two long ankle bones (astragalus and calcaneum), side by side
    const ank = new THREE.Vector3(0, 0, 0.0016 * side)
    add(boneBetween(h[4].clone().add(ank), h[5].clone().add(ank), 0.0012, 'tarsals (astragalus and calcaneum)', mat))
    add(boneBetween(h[4].clone().sub(ank), h[5].clone().sub(ank), 0.0012, 'tarsals (astragalus and calcaneum)', mat))
    HIND.digits.forEach((d) => {
      const p = digitPoints(HIND, side, pose, d)
      for (let k = 0; k < 4; k++) {
        add(boneBetween(p[k], p[k + 1], k === 0 ? 0.0008 : 0.0006, k === 0 ? 'metatarsal' : 'phalanx (toe bone)', mat))
        add(knuckle(p[k + 1], k === 3 ? 0.0006 : 0.0009, k === 3 ? 'phalanx (toe tip)' : 'phalanx (toe bone)', mat))
      }
    })
    const fl = forePts(side)
    // shoulder girdle: scapula up over the back, coracoid and clavicle across to the sternum
    add(boneBetween(fl[0], V(0.02, 0.014, 0.012 * side), 0.0016, 'pectoral girdle (scapula)', mat))
    add(boneBetween(V(0.02, 0.014, 0.012 * side), V(0.016, 0.017, 0.006 * side), 0.0022, 'pectoral girdle (suprascapula)', mat))
    add(boneBetween(fl[0], V(0.025, -0.012, 0.002 * side), 0.0013, 'pectoral girdle (coracoid)', mat))
    add(boneBetween(fl[0], V(0.03, -0.011, 0.002 * side), 0.0009, 'pectoral girdle (clavicle)', mat))
    add(knuckle(fl[0], 0.0026, 'pectoral girdle (shoulder joint)', mat))
    add(boneBetween(fl[0], fl[2], 0.0025, 'humerus', mat))
    add(boneBetween(fl[2], fl[4], 0.0021, 'radioulna', mat))
    add(knuckle(fl[4], 0.0016, 'carpals (wrist bones)', mat))
    FORE.digits.forEach((d) => {
      const p = digitPoints(FORE, side, pose, d)
      for (let k = 0; k < 4; k++) {
        add(boneBetween(p[k], p[k + 1], k === 0 ? 0.0007 : 0.0005, k === 0 ? 'metacarpal' : 'phalanx (finger bone)', mat))
        add(knuckle(p[k + 1], k === 3 ? 0.0005 : 0.0007, k === 3 ? 'phalanx (finger tip)' : 'phalanx (finger bone)', mat))
      }
    })
  }
  const sternum = new THREE.Mesh(new THREE.CapsuleGeometry(0.0018, 0.008, 4, 10), mat)
  sternum.rotation.z = Math.PI / 2
  sternum.position.set(0.03, -0.012, 0)
  add(nameBone(sternum, 'sternum'))
  g.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true } })
  return g
}

/** Muscle: red-pink with fibres running along the body and limbs */
let muscleImage: HTMLCanvasElement | null = null
export function muscleTexture(repeatU: number, repeatV: number) {
  if (!muscleImage) {
    const N = 256
    const c = document.createElement('canvas')
    c.width = c.height = N
    const ctx = c.getContext('2d')!
    for (let x = 0; x < N; x++) {
      const v = noise3(x / 3, 0, 1)
      const l = 52 + v * 14 + (hash(x, 1, 2) - 0.5) * 8
      ctx.fillStyle = `hsl(${2 + v * 6}, ${48 + v * 10}%, ${l}%)`
      ctx.fillRect(x, 0, 1, N)
    }
    // pale sheaths and tendons here and there
    ctx.fillStyle = 'rgba(240, 220, 210, 0.35)'
    for (let k = 0; k < 6; k++) ctx.fillRect((k * 47 + 13) % N, 0, 2, N)
    muscleImage = c
  }
  const t = new THREE.CanvasTexture(muscleImage)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(repeatU, repeatV)
  bumpTextures.push(t)
  return t
}
export const muscleMaterial = (repeatU: number, repeatV: number) => fleshInside(new THREE.MeshPhysicalMaterial({
  map: muscleTexture(repeatU, repeatV), bumpMap: muscleTexture(repeatU, repeatV), bumpScale: 1.4,
  roughness: 0.45, clearcoat: 0.65, clearcoatRoughness: 0.3,
}))

// --- The frog --------------------------------------------------------------------------------------
export function buildFrog(): FrogModel {
  const root = new THREE.Group()
  root.name = 'frog'
  const disposables: { dispose: () => void }[] = []
  const add = <T extends THREE.Object3D>(o: T) => { root.add(o); return o }

  // body
  const bodyGeo = bodyGeometry()
  colourise(bodyGeo, skinColour)
  const body = add(new THREE.Mesh(bodyGeo, skinMaterial()))
  body.userData.part = 'body'

  // the body cavity wall - seen from inside once the belly is opened
  const cav = cavityGeometry()
  // the peritoneum lining the cavity: pale pink with dark pigment flecks
  colourise(cav, p => C(0x8a3f3a).lerp(C(0x5e2626), smooth(0.35, 0.7, fbm(p, 500)) * 0.7).lerp(C(0x2a1a18), smooth(0.7, 0.76, fbm(p, 1800)) * 0.45))
  const cavity = add(new THREE.Mesh(cav, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, side: THREE.BackSide })))
  cavity.userData.part = 'cavity'

  // flaps
  const makeFlap = (key: FlapKey, layer: 'skin' | 'muscle', j0: number, j1: number, hingeJ: number): FrogFlap => {
    const inset = layer === 'skin' ? 1 : 0.972
    const { geo, params } = patch(I_FROM, I_TO, j0, j1, inset)
    const base = (geo.getAttribute('position').array as Float32Array).slice()
    if (layer === 'skin') colourise(geo, skinColour)
    else {
      colourise(geo, (p) => {
        const c = C(0xc9787a).lerp(C(0xa95560), smooth(0.4, 0.6, Math.sin(p.x * 900 + fbm(p, 300) * 3) * 0.5 + 0.5) * 0.35)
        // the ventral abdominal vein, just to the frog's right of the midline
        const vein = Math.exp(-(((p.z - 0.0016) / 0.0007) ** 2))
        return c.lerp(C(0x5a1020), vein * 0.9)
      })
    }
    const front = new THREE.Mesh(geo, layer === 'skin' ? skinMaterial() : new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.3 }))
    const inner = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: layer === 'skin' ? 0xe8c7bf : 0xb15a5f, roughness: 0.55, side: THREE.BackSide }))
    // the flap has its own inner side - draw only the outer face here
    ;(front.material as THREE.Material).side = THREE.FrontSide
    front.userData.part = inner.userData.part = layer
    front.userData.flap = inner.userData.flap = key
    root.add(front, inner)
    const hinge = params.map(([i]) => surface(sAt(i), hingeJ * PHI_STEP, inset))
    const sign = hingeJ < J_MID || (layer === 'muscle' && hingeJ < J_MUSCLE_SPLIT) ? -1 : 1
    const liftAt = layer === 'skin' ? liftPoint('skin') : liftPoint('muscle')
    const flap: FrogFlap = {
      key, mesh: front, inner, open: 0, lift: 0,
      update: () => {
        const arr = geo.getAttribute('position') as THREE.BufferAttribute
        const a = sign * flap.open * 2.75
        const ca = Math.cos(a), sa = Math.sin(a)
        for (let q = 0; q < params.length; q++) {
          let x = base[q * 3], y = base[q * 3 + 1], z = base[q * 3 + 2]
          if (flap.lift > 0) {
            const d2 = (x - liftAt.x) ** 2 + (z - liftAt.z) ** 2
            y -= flap.lift * 0.0035 * Math.exp(-d2 / 0.00012)
          }
          if (flap.open > 0) {
            const h = hinge[q]
            const dy = y - h.y, dz = z - h.z
            y = h.y + dy * ca - dz * sa
            z = h.z + dy * sa + dz * ca
          }
          arr.setXYZ(q, x, y, z)
        }
        arr.needsUpdate = true
        geo.computeVertexNormals()
        geo.computeBoundingSphere()
      },
    }
    return flap
  }
  // the frog's right is +Z, i.e. phi < PI
  const flaps: Record<FlapKey, FrogFlap> = {
    skinR: makeFlap('skinR', 'skin', J_MID - J_WIN, J_MID, J_MID - J_WIN),
    skinL: makeFlap('skinL', 'skin', J_MID, J_MID + J_WIN, J_MID + J_WIN),
    muscleR: makeFlap('muscleR', 'muscle', J_MID - J_WIN, J_MUSCLE_SPLIT, J_MID - J_WIN),
    muscleL: makeFlap('muscleL', 'muscle', J_MUSCLE_SPLIT, J_MID + J_WIN, J_MID + J_WIN),
  }

  // eyes, tympana, nostrils, mouth, cloaca
  // Sphere UVs: u runs round the eyeball, v from the front pole (v = 0) backwards - so the pupil is
  // a small ellipse round the pole and the iris a band around it
  const irisTex = canvasTexture(256, 128, (ctx, w, h) => {
    const img = ctx.createImageData(w, h)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const th = (x / w) * Math.PI * 2, r = y / h
        const a = 0.15, b = 0.075
        const pupil = (a * b) / Math.sqrt((b * Math.cos(th)) ** 2 + (a * Math.sin(th)) ** 2)
        let c: [number, number, number]
        if (r < pupil) c = [6, 6, 6]
        else if (r < 0.36) {
          const t = (r - pupil) / (0.36 - pupil)
          const fleck = Math.sin(th * 40) * 0.5 + 0.5
          c = [205 - t * 90 - fleck * 30, 150 - t * 70 - fleck * 25, 45 - t * 25]
        } else c = [32, 24, 12]
        const i = (y * w + x) * 4
        img.data[i] = c[0]; img.data[i + 1] = c[1]; img.data[i + 2] = c[2]; img.data[i + 3] = 255
      }
    }
    ctx.putImageData(img, 0, 0)
  })
  const tympTex = canvasTexture(128, 128, (ctx) => {
    const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64)
    g.addColorStop(0, '#8c6a3c'); g.addColorStop(0.75, '#6a4c26'); g.addColorStop(0.9, '#3e2c14'); g.addColorStop(1, '#5b4a24')
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(64, 64, 64, 0, Math.PI * 2); ctx.fill()
  })
  disposables.push(irisTex, tympTex)
  for (const side of [1, -1] as const) {
    const sd = side > 0 ? 'r' : 'l'
    const ePhi = side * 0.62
    const ep = surface(0.63, ePhi), en = surfaceNormal(0.63, ePhi)
    const eye = new THREE.Group()
    eye.position.copy(ep).addScaledVector(en, 0.0018).add(new THREE.Vector3(0, 0.0012, 0))
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.0062, 40, 30), new THREE.MeshPhysicalMaterial({ map: irisTex, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.04 }))
    // the sphere's pole (+Y) looks out sideways, forwards and up
    const look = en.clone().add(new THREE.Vector3(0.25, 0.35, 0)).normalize()
    ball.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), look)
    eye.add(ball)
    root.add(tag(eye, 'eye', sd))

    const tPhi = side * 1.28
    const tp = surface(0.47, tPhi), tn = surfaceNormal(0.47, tPhi)
    const tymp = new THREE.Mesh(new THREE.CircleGeometry(0.0049, 40), new THREE.MeshPhysicalMaterial({ map: tympTex, roughness: 0.35, clearcoat: 0.6 }))
    tymp.position.copy(tp).addScaledVector(tn, 0.0004)
    tymp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tn)
    root.add(tag(tymp, 'tympanum', sd))

    const nos = new THREE.Group()
    nos.position.copy(surface(0.92, side * 0.42))
    const hole = new THREE.Mesh(new THREE.SphereGeometry(0.0011, 12, 8), new THREE.MeshStandardMaterial({ color: 0x0b0b07, roughness: 0.6 }))
    hole.scale.set(1.3, 0.6, 1)
    // a larger, invisible area round it, so the small nostril is easy to click
    const hit = new THREE.Mesh(new THREE.SphereGeometry(0.0032, 8, 6), new THREE.MeshBasicMaterial({ visible: false }))
    nos.add(hole, hit)
    root.add(tag(nos, 'nostril', sd))
  }
  const mouthPts: THREE.Vector3[] = []
  for (let k = 0; k <= 10; k++) { const s = 0.5 + k * 0.048; mouthPts.push(surface(s, Math.PI / 2 + 0.42)) }
  mouthPts.push(surface(1, 0).add(new THREE.Vector3(0.0004, -0.0008, 0)))
  for (let k = 10; k >= 0; k--) { const s = 0.5 + k * 0.048; mouthPts.push(surface(s, -(Math.PI / 2 + 0.42))) }
  const mouth = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(mouthPts), 120, 0.00045, 6), new THREE.MeshStandardMaterial({ color: 0x2b2412, roughness: 0.6 }))
  const mouthHit = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(mouthPts), 60, 0.0022, 6), new THREE.MeshBasicMaterial({ visible: false }))
  root.add(tag(mouth, 'mouth'), tag(mouthHit, 'mouth'))
  const cloaca = new THREE.Mesh(new THREE.SphereGeometry(0.0018, 14, 10), new THREE.MeshStandardMaterial({ color: 0x4a3b22, roughness: 0.7 }))
  cloaca.position.set(-L - 0.0002, 0.0005, 0)
  cloaca.scale.set(0.5, 1, 1)
  root.add(tag(cloaca, 'cloaca'))

  // limbs
  const limbs = {
    hr: buildLimb(HIND, 1), hl: buildLimb(HIND, -1), fr: buildLimb(FORE, 1), fl: buildLimb(FORE, -1),
  }
  Object.values(limbs).forEach(l => l.meshes.forEach(m => root.add(m)))
  let pose = 0
  const setPose = (lift: number) => {
    if (Math.abs(lift - pose) < 1e-4) return
    pose = lift
    Object.values(limbs).forEach(l => l.update(lift))
  }

  const { heart, gut, centres, organs, animate, rest } = buildOrgans(root)
  const organBase = new Map<THREE.Object3D, THREE.Vector3>()
  ;(Object.values(organs) as THREE.Object3D[][]).flat().forEach(o => organBase.set(o, o.position.clone()))
  const removed = new Set<OrganKey>()

  root.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true } })
  cavity.castShadow = false
  disposables.push(...bumpTextures.splice(0))

  // --- geometry helpers for the scene ---
  function cutJ(layer: 'skin' | 'muscle') { return layer === 'skin' ? J_MID : J_MUSCLE_SPLIT }
  function cutLine(layer: 'skin' | 'muscle', from = S_FROM, to = S_TO) {
    const inset = layer === 'skin' ? 1 : 0.972
    const pts: THREE.Vector3[] = []
    const n = 40
    for (let k = 0; k <= n; k++) {
      const s = from + ((to - from) * k) / n
      pts.push(surface(s, cutJ(layer) * PHI_STEP, inset).add(new THREE.Vector3(0, -0.00035, 0)))
    }
    return pts
  }
  function cutLineDistance(layer: 'skin' | 'muscle', p: THREE.Vector3) {
    const s = Math.max(-1, Math.min(1, p.x / L))
    const q = surface(s, cutJ(layer) * PHI_STEP, layer === 'skin' ? 1 : 0.972)
    return { dist: Math.hypot(p.z - q.z, p.y - q.y), x: p.x }
  }
  function liftPoint(layer: 'skin' | 'muscle') {
    const s = S_FROM + 0.09
    return surface(s, cutJ(layer) * PHI_STEP, layer === 'skin' ? 1 : 0.972)
  }
  function flapPinPoints(k: FlapKey) {
    const f = flaps[k]
    const pos = f.mesh.geometry.getAttribute('position') as THREE.BufferAttribute
    // the free edge is the last (or first) column of the patch - pin it at a third and two thirds
    const isRight = k === 'skinR' || k === 'muscleR'
    const cols = k === 'muscleR' ? J_MUSCLE_SPLIT - (J_MID - J_WIN) + 1 : k === 'muscleL' ? J_MID + J_WIN - J_MUSCLE_SPLIT + 1 : J_WIN + 1
    const col = isRight ? cols - 1 : 0
    const rows = I_TO - I_FROM + 1
    return [0.3, 0.72].map((t) => {
      const q = Math.round(t * (rows - 1)) * cols + col
      return new THREE.Vector3().fromBufferAttribute(pos, q)
    })
  }
  function partOf(obj: THREE.Object3D | null) {
    for (let o = obj; o; o = o.parent) {
      if (o.userData.part) return { part: o.userData.part as FrogPart, side: (o.userData.side as 'l' | 'r') ?? null, flap: (o.userData.flap as FlapKey) ?? null }
      if (o === root) break
    }
    return null
  }
  function partCentre(p: FrogPart) {
    return (centres[p] ?? new THREE.Vector3()).clone()
  }
  let wasAlive = false
  function tick(t: number, alive: boolean) {
    if (alive) animate(t)
    else if (wasAlive) rest()
    wasAlive = alive
  }
  function setOrganLift(k: OrganKey, amount: number) {
    // ventral is -Y: lift it up out of the body, towards the viewer
    organs[k].forEach((o) => { const b = organBase.get(o)!; o.position.set(b.x, b.y - 0.022 * amount, b.z) })
  }
  function removeOrgan(k: OrganKey) {
    removed.add(k)
    organs[k].forEach((o) => { o.visible = false; o.traverse(c => { c.visible = false }) })
  }

  let currentLayer: 'skin' | 'muscle' | 'skeleton' = 'skin'
  const bodyMat = body.material as THREE.MeshPhysicalMaterial
  const layerMeshes = (Object.values(flaps) as FrogFlap[]).flatMap(fl => [fl.mesh, fl.inner])
  function setXray(on: boolean) {
    bodyMat.transparent = on
    bodyMat.opacity = on ? 0.2 : 1
    bodyMat.depthWrite = !on
    bodyMat.needsUpdate = true
    body.castShadow = !on
    layerMeshes.forEach((m) => { m.visible = !on && currentLayer !== 'skeleton' })
    cavity.visible = !on && currentLayer !== 'skeleton'
  }

  function setClip(plane: THREE.Plane | null) {
    root.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return
      const mats = Array.isArray(o.material) ? o.material : [o.material]
      mats.forEach((m: THREE.Material) => { m.clippingPlanes = plane ? [plane] : null; m.clipShadows = true; m.needsUpdate = true })
    })
  }
  let skeleton: THREE.Group | null = null
  let skeletonPose = NaN
  const muscleMats = new Map<THREE.Mesh, THREE.Material>()
  const EXTERNAL_BITS = ['eye', 'tympanum', 'nostril', 'mouth', 'cloaca']
  const COVER = ['body', 'skin', 'hind_leg', 'fore_leg', 'hind_foot', 'fore_foot']
  function setLayer(layer: 'skin' | 'muscle' | 'skeleton') {
    currentLayer = layer
    if (layer === 'skeleton' && (!skeleton || skeletonPose !== pose)) {
      if (skeleton) { root.remove(skeleton); skeleton.traverse((o) => { if (o instanceof THREE.Mesh) o.geometry.dispose() }) }
      skeleton = buildSkeleton(pose)
      skeletonPose = pose
      root.add(skeleton)
    }
    if (skeleton) skeleton.visible = layer === 'skeleton'
    root.traverse((o) => {
      if (!(o instanceof THREE.Mesh)) return
      const p = o.userData.part as string | undefined
      if (!p || p === 'bone') return
      if (layer === 'skeleton') { o.visible = false; return }
      o.visible = !(layer === 'muscle' && EXTERNAL_BITS.includes(p))
      if (COVER.includes(p)) {
        if (!o.userData.skinMat) o.userData.skinMat = o.material
        if (layer === 'muscle') {
          if (!muscleMats.has(o)) {
            const limb = p !== 'body'
            muscleMats.set(o, muscleMaterial(limb ? 4 : 14, limb ? 2 : 1))
          }
          o.material = muscleMats.get(o)!
        } else o.material = o.userData.skinMat
      }
    })
  }
  function setFocus(keys: OrganKey[] | null) {
    ;(Object.keys(organs) as OrganKey[]).forEach((k) => {
      const faint = !!keys && !keys.includes(k)
      organs[k].forEach(g => g.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return
        const m = o.material as THREE.MeshPhysicalMaterial
        if (m.userData.baseOpacity === undefined) m.userData.baseOpacity = m.opacity
        if (m.userData.baseTransparent === undefined) m.userData.baseTransparent = m.transparent
        m.transparent = faint || m.userData.baseTransparent
        m.opacity = faint ? 0.12 : m.userData.baseOpacity
        m.depthWrite = !faint
        m.needsUpdate = true
      }))
    })
  }

  return {
    root,
    flaps,
    setXray,
    setClip,
    setFocus,
    setLayer,
    gut,
    heart,
    setPose,
    footPinPoint: (k: FootKey) => limbs[k].pinPoint(1),
    cutLine,
    cutLineDistance,
    windowX: { from: L * S_FROM, to: L * S_TO },
    liftPoint,
    flapPinPoints,
    partCentre,
    restHeight: { belly: 0.0185, back: 0.0244 },
    partOf,
    tick,
    setOrganLift,
    removeOrgan,
    isRemoved: (k: OrganKey) => removed.has(k),
    organObjects: (k: OrganKey) => organs[k].slice(),
    dispose: () => {
      root.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          const m = o.material as THREE.Material | THREE.Material[]
          ;(Array.isArray(m) ? m : [m]).forEach(x => x.dispose())
        }
      })
      disposables.forEach(d => d.dispose())
    },
  }
}
