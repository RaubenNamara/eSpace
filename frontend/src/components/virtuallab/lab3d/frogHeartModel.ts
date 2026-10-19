import * as THREE from 'three'
import { tube } from './frogModel'

/**
 * The frog's three-chambered heart for the organ close-up, built to the textbook anatomy of an
 * anuran heart (e.g. Rana): a thin-walled sinus venosus on the dorsal side collecting the three
 * venae cavae; a right atrium (larger) and a left atrium (smaller) divided by a complete
 * interatrial septum; one thick, spongy ventricle; and the truncus arteriosus leaving the right side
 * of the ventricle's base, with its spiral valve, dividing into three pairs of arches - carotid,
 * systemic and pulmocutaneous. Pulmonary veins bring blood from the lungs into the left atrium.
 *
 * Display axes (as a textbook ventral view): +Y towards the head, +Z towards the viewer (the frog's
 * belly), +X the viewer's right = the frog's LEFT side. About 1 unit = 2.5 mm of a real heart.
 */

export type FrogHeartPart =
  | 'sinus_venosus' | 'venae_cavae' | 'right_atrium' | 'left_atrium' | 'interatrial_septum' | 'av_valve'
  | 'ventricle' | 'truncus' | 'spiral_valve' | 'carotid_arch' | 'systemic_arch' | 'pulmocutaneous_arch' | 'pulmonary_veins'

export interface FrogHeartPartInfo {
  name: string
  blood: 'rich' | 'poor' | 'mixed' | 'none'
  /** shown only in the inside view */
  inside?: boolean
  summary: string
  fn: string
  more: string[]
}

export const FROG_HEART_PARTS: Record<FrogHeartPart, FrogHeartPartInfo> = {
  sinus_venosus: { name: 'Sinus venosus', blood: 'poor', summary: 'A thin-walled sac on the back (dorsal side) of the heart.',
    fn: 'Collects blood returning from the body in the three venae cavae and passes it into the right atrium.',
    more: ['Its wall starts every heartbeat: it is the frog\'s **pacemaker**. (In humans it has become the SA node in the right atrium.)', 'Turn the heart round to see it - it lies behind the right atrium.'] },
  venae_cavae: { name: 'Venae cavae', blood: 'poor', summary: 'Two precavals (from the head and fore limbs) and one postcaval (from the body and hind limbs).',
    fn: 'Bring deoxygenated blood from the body back to the sinus venosus.',
    more: ['The precavals also carry the **cutaneous veins** from the skin, so some oxygen-rich blood (from breathing through the skin) returns this way too.'] },
  right_atrium: { name: 'Right atrium', blood: 'poor', summary: 'The larger of the two atria.',
    fn: 'Receives mostly deoxygenated blood from the sinus venosus and pushes it into the ventricle.',
    more: ['It is larger than the left atrium because it receives blood from the whole body.'] },
  left_atrium: { name: 'Left atrium', blood: 'rich', summary: 'The smaller atrium, on the frog\'s left.',
    fn: 'Receives oxygenated blood from the lungs through the pulmonary veins and pushes it into the ventricle.',
    more: ['Both atria contract together and empty into the single ventricle.'] },
  interatrial_septum: { name: 'Interatrial septum', blood: 'none', inside: true, summary: 'A complete wall between the two atria.',
    fn: 'Keeps the deoxygenated blood of the right atrium apart from the oxygenated blood of the left atrium.',
    more: ['The two kinds of blood only meet in the ventricle, because the frog has **no septum in its ventricle**.'] },
  av_valve: { name: 'Atrioventricular valves', blood: 'none', inside: true, summary: 'Flaps where the atria open into the ventricle.',
    fn: 'Let blood pass from the atria into the ventricle and close when the ventricle contracts, so blood cannot flow back.',
    more: ['They are held by fine tendons to the wall of the ventricle.'] },
  ventricle: { name: 'Ventricle', blood: 'mixed', summary: 'The single, thick-walled pumping chamber.',
    fn: 'Receives blood from both atria and pumps it out through the truncus arteriosus.',
    more: ['There is **only one ventricle**, so oxygenated and deoxygenated blood can mix - this is why the frog heart is called **three-chambered** (two atria + one ventricle).', 'Its inner wall is **spongy**, full of ridges and pockets (trabeculae) that keep the two bloodstreams partly apart.', 'Deoxygenated blood from the right atrium leaves the ventricle first; oxygenated blood from the left atrium leaves last.'] },
  truncus: { name: 'Truncus arteriosus (conus)', blood: 'mixed', summary: 'The pale, muscular tube leaving the right side of the ventricle\'s base.',
    fn: 'Carries blood out of the ventricle and divides into the left and right arches.',
    more: ['Valves at its base stop blood falling back into the ventricle.', 'Inside it is the **spiral valve**, which sorts the blood into the different arches.'] },
  spiral_valve: { name: 'Spiral valve', blood: 'none', inside: true, summary: 'A twisted fold running along the inside of the truncus arteriosus.',
    fn: 'Steers the blood: the deoxygenated blood (out first) goes to the pulmocutaneous arches; the oxygenated blood (out last) goes to the carotid arches; mixed blood goes to the systemic arches.',
    more: ['This is how the frog keeps its oxygen-rich blood mostly separate even with one ventricle.'] },
  carotid_arch: { name: 'Carotid arches', blood: 'rich', summary: 'The front (anterior) pair of arches.',
    fn: 'Take the most oxygenated blood to the head and brain.',
    more: ['At the base of each is a small swelling, the **carotid labyrinth**, that senses blood pressure.'] },
  systemic_arch: { name: 'Systemic arches', blood: 'mixed', summary: 'The middle pair of arches.',
    fn: 'Curve round to the back and join to form the dorsal aorta, which carries mixed blood to the body and limbs.',
    more: ['Each also sends branches to the fore limbs (subclavian arteries).'] },
  pulmocutaneous_arch: { name: 'Pulmocutaneous arches', blood: 'poor', summary: 'The back (posterior) pair of arches.',
    fn: 'Take deoxygenated blood to the lungs and the skin to pick up oxygen.',
    more: ['Each divides into a **pulmonary artery** (to the lung) and a **cutaneous artery** (to the skin) - the frog breathes through both.'] },
  pulmonary_veins: { name: 'Pulmonary veins', blood: 'rich', summary: 'Veins from the two lungs that join before reaching the heart.',
    fn: 'Bring oxygenated blood from the lungs into the left atrium.',
    more: ['They enter the left atrium from the dorsal side.'] },
}

// --- the heartbeat ---------------------------------------------------------------------------------

export type FrogPhase = 'sinus' | 'atria' | 'ventricle' | 'truncus' | 'filling'
export const FROG_PHASES: { key: FrogPhase; name: string; start: number; end: number; caption: string }[] = [
  { key: 'sinus', name: 'Sinus venosus contracts', start: 0, end: 0.1, caption: 'The sinus venosus contracts and starts the beat, pushing blood from the body into the right atrium.' },
  { key: 'atria', name: 'Atria contract', start: 0.1, end: 0.3, caption: 'Both atria contract: deoxygenated blood from the right atrium and oxygenated blood from the left atrium enter the single ventricle.' },
  { key: 'ventricle', name: 'Ventricle contracts', start: 0.3, end: 0.58, caption: 'The ventricle contracts. The valves to the atria shut and blood is forced into the truncus arteriosus - deoxygenated blood first.' },
  { key: 'truncus', name: 'Truncus sorts the blood', start: 0.58, end: 0.74, caption: 'The spiral valve steers the blood: deoxygenated to the lungs and skin, mixed to the body, the most oxygenated to the head.' },
  { key: 'filling', name: 'Heart fills', start: 0.74, end: 1, caption: 'The heart relaxes. Blood from the body fills the sinus venosus and right atrium; blood from the lungs fills the left atrium.' },
]
const sm = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
const bump = (a: number, b: number, x: number) => (x > a && x < b ? Math.sin(((x - a) / (b - a)) * Math.PI) : 0)
const wrap = (c: number) => ((c % 1) + 1) % 1
export const frogPhaseAt = (c: number) => { const x = wrap(c); return FROG_PHASES.find(p => x >= p.start && x < p.end) ?? FROG_PHASES[4] }
export const sinusContraction = (c: number) => bump(0, 0.12, wrap(c))
export const atrialContraction = (c: number) => bump(0.1, 0.3, wrap(c))
export const ventricularContraction = (c: number) => { const x = wrap(c); return sm(0.28, 0.4, x) * (1 - sm(0.55, 0.7, x)) }
export const truncusContraction = (c: number) => bump(0.5, 0.74, wrap(c))
/** atrioventricular valves: 1 open (filling and atrial systole), 0 shut (while the ventricle contracts) */
export const avOpen = (c: number) => { const x = wrap(c); return Math.max(1 - sm(0.29, 0.33, x), sm(0.65, 0.71, x)) }
/** the valves at the base of the truncus: open only while the ventricle ejects */
export const conusOpen = (c: number) => { const x = wrap(c); return sm(0.33, 0.37, x) * (1 - sm(0.6, 0.64, x)) }

export type Segment = 'vein' | 'sinus' | 'atrium' | 'ventricle-in' | 'ventricle-out' | 'artery'
export function flowRate(c: number, s: Segment) {
  const av = avOpen(c), co = conusOpen(c), a = atrialContraction(c), v = ventricularContraction(c), sv = sinusContraction(c)
  switch (s) {
    case 'vein': return 0.9
    case 'sinus': return 0.4 + 2.2 * sv
    case 'atrium': return 0.4 + av * (0.8 + 2.4 * a)
    case 'ventricle-in': return 0.3 + av * (0.8 + a)
    case 'ventricle-out': return 0.2 + 2.6 * Math.max(co, 0.3 * v)
    case 'artery': return 0.3 + 2.8 * co + 1.2 * truncusContraction(c)
  }
}

// --- the model -------------------------------------------------------------------------------------

export const RICH = 0xd42a2a
export const POOR = 0x2f5fc4
export const MIXED = 0x8e3f8f
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

/** an ellipsoid shell (outer) and its lining (inner, facing into the chamber) */
function shell(radii: THREE.Vector3, shape: (p: THREE.Vector3) => void, thickness: number, roughInside = 0) {
  const make = (k: number, inward: boolean) => {
    const g = new THREE.SphereGeometry(1, 56, 40)
    const p = g.attributes.position as THREE.BufferAttribute
    const v = new THREE.Vector3()
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i)
      const n = v.clone()
      v.multiply(radii).multiplyScalar(k)
      shape(v)
      // the spongy lining of the ventricle: ridges and pockets
      if (inward && roughInside) {
        const r = Math.sin(n.y * 23 + Math.sin(n.x * 9) * 2) * Math.sin(n.x * 17 + n.z * 13) * roughInside
        v.addScaledVector(n, -Math.abs(r))
      }
      p.setXYZ(i, v.x, v.y, v.z)
    }
    if (inward) { const idx = g.index!; for (let i = 0; i < idx.count; i += 3) { const t = idx.getX(i); idx.setX(i, idx.getX(i + 2)); idx.setX(i + 2, t) } }
    g.computeVertexNormals()
    return g
  }
  return { outer: make(1, false), inner: make(1 - thickness, true) }
}

export interface HeartMaterialOpts { colour: number; clip: THREE.Plane[]; cut?: boolean; emissive?: number }
/** wet tissue; a cut wall shows the deeper red of cut muscle on its inside */
export function tissue(o: HeartMaterialOpts) {
  const m = new THREE.MeshPhysicalMaterial({ color: o.colour, roughness: 0.42, clearcoat: 0.7, clearcoatRoughness: 0.3, side: THREE.DoubleSide, clippingPlanes: o.clip, emissive: o.emissive ?? 0, emissiveIntensity: o.emissive ? 0.5 : 0 })
  if (o.cut) {
    m.onBeforeCompile = (s) => { s.fragmentShader = s.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n  if (!gl_FrontFacing) diffuseColor.rgb = vec3(0.5, 0.13, 0.15);') }
    m.customProgramCacheKey = () => 'frog-heart-cut'
  }
  return m
}

interface Piece { mesh: THREE.Mesh; part: FrogHeartPart; colour: number; group: 'wall' | 'vessel' | 'inner' | 'truncus' }
type Gate = 'av' | 'conus' | null
interface Way { p: THREE.Vector3; seg: Segment; gate?: Gate; r: number }
interface Route { pts: THREE.Vector3[]; seg: Segment[]; gate: Gate[]; rad: number[]; cum: number[]; len: number }
const route = (w: Way[]): Route => {
  const cum = [0]
  for (let i = 1; i < w.length; i++) cum.push(cum[i - 1] + w[i].p.distanceTo(w[i - 1].p))
  return { pts: w.map(x => x.p), seg: w.map(x => x.seg), gate: w.map(x => x.gate ?? null), rad: w.map(x => x.r), cum, len: cum[cum.length - 1] }
}
function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

export interface FrogHeart {
  root: THREE.Group
  /** the part a clicked object belongs to */
  partOf: (o: THREE.Object3D) => FrogHeartPart | null
  setView: (v: 'outside' | 'inside') => void
  select: (p: FrogHeartPart | null) => void
  /** moves the beat on by dc of a cycle (0 = just place everything) */
  step: (dc: number) => void
  setCycle: (c: number) => void
  readonly cycle: number
  /** label anchors for the current view */
  labels: () => { part: FrogHeartPart; at: THREE.Vector3 }[]
  /** the planes cutting the heart in the inside view (empty outside) */
  clipPlanes: () => THREE.Plane[]
  dispose: () => void
}

export function buildFrogHeart(): FrogHeart {
  const root = new THREE.Group()
  const pieces: Piece[] = []
  const add = (geo: THREE.BufferGeometry, part: FrogHeartPart, colour: number, group: Piece['group'], at?: THREE.Vector3) => {
    const mesh = new THREE.Mesh(geo)
    if (at) mesh.position.copy(at)
    mesh.userData.heartPart = part
    mesh.castShadow = true
    root.add(mesh)
    pieces.push({ mesh, part, colour, group })
    return mesh
  }

  // ventricle: a blunt cone, apex down; thick spongy wall
  const vCentre = V(0, -0.95, -0.05)
  const ventShape = (p: THREE.Vector3) => { if (p.y < 0) { const k = 1 + (p.y / 1.25) * 0.55; p.x *= k; p.z *= k } }
  const vent = shell(V(1.05, 1.25, 0.85), ventShape, 0.3, 0.06)
  add(vent.outer, 'ventricle', 0x9a2424, 'wall', vCentre)
  add(vent.inner, 'ventricle', 0xa33a35, 'inner', vCentre)

  // atria above it: the right (viewer's left, larger) and the left (smaller)
  const raC = V(-0.5, 0.42, -0.12), laC = V(0.52, 0.38, -0.2)
  const ra = shell(V(0.66, 0.58, 0.58), () => {}, 0.12)
  const la = shell(V(0.48, 0.48, 0.48), () => {}, 0.12)
  add(ra.outer, 'right_atrium', 0x6a1d2c, 'wall', raC)
  add(ra.inner, 'right_atrium', 0x7c2a35, 'inner', raC)
  add(la.outer, 'left_atrium', 0x7a1f22, 'wall', laC)
  add(la.inner, 'left_atrium', 0x8a2a2c, 'inner', laC)

  // interatrial septum: a thin sheet between them
  const sep = new THREE.CircleGeometry(0.5, 40)
  sep.rotateY(Math.PI / 2)
  sep.scale(1, 1.05, 1)
  add(sep, 'interatrial_septum', 0xc0716c, 'inner', V(0.06, 0.42, -0.14))

  // the atrioventricular valve flaps at the opening into the ventricle
  for (const s of [-1, 1]) {
    const leaf = new THREE.SphereGeometry(0.22, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2)
    leaf.scale(1.2, 0.9, 0.35)
    leaf.rotateX(Math.PI)
    const m = add(leaf, 'av_valve', 0xead6b6, 'inner', V(s * 0.2, -0.08, -0.1))
    m.rotation.z = s * 0.35
  }

  // sinus venosus on the dorsal side, behind the right atrium, and the three venae cavae
  const sv = new THREE.SphereGeometry(1, 40, 24)
  sv.scale(0.62, 0.34, 0.24)
  add(sv, 'sinus_venosus', 0x5b3b78, 'vessel', V(-0.25, 0.45, -0.82))
  const svC = V(-0.25, 0.45, -0.82)
  const veins: THREE.Vector3[][] = [
    [V(-1.6, 1.7, -0.95), V(-0.9, 1.0, -0.9), svC.clone().add(V(-0.35, 0.1, 0))], // right precaval
    [V(1.3, 1.75, -0.95), V(0.6, 1.05, -0.95), svC.clone().add(V(0.4, 0.12, 0))], // left precaval
    [V(-0.15, -2.4, -0.95), V(-0.2, -1.2, -0.95), svC.clone().add(V(0.05, -0.25, 0))], // postcaval
  ]
  for (const pts of veins) add(tube(pts, () => 0.13, 24, 12).geo, 'venae_cavae', 0x3462b5, 'vessel')

  // pulmonary veins from the two lungs, joining and entering the left atrium from behind
  const pvJoin = V(0.45, 0.2, -0.78)
  add(tube([V(-1.7, -0.35, -0.75), V(-0.6, 0.0, -0.9), pvJoin], () => 0.085, 24, 10).geo, 'pulmonary_veins', 0xc8302d, 'vessel')
  add(tube([V(1.9, -0.3, -0.75), V(1.1, 0.0, -0.85), pvJoin], () => 0.085, 24, 10).geo, 'pulmonary_veins', 0xc8302d, 'vessel')
  add(tube([pvJoin, V(0.5, 0.3, -0.55)], () => 0.1, 8, 10).geo, 'pulmonary_veins', 0xc8302d, 'vessel')

  // truncus arteriosus: from the right of the ventricle's base, up across the front of the atria
  const truncusPts = [V(-0.42, -0.45, 0.5), V(-0.38, 0.05, 0.78), V(-0.12, 0.7, 0.82), V(0, 1.12, 0.66)]
  const truncusCurve = new THREE.CatmullRomCurve3(truncusPts)
  add(tube(truncusPts, t => 0.27 - 0.07 * t, 40, 20).geo, 'truncus', 0xe1b2a6, 'truncus')
  // the spiral valve inside it: a twisted ribbon
  {
    const n = 90, pos: number[] = [], idx: number[] = []
    const frames = truncusCurve.computeFrenetFrames(n, false)
    for (let i = 0; i <= n; i++) {
      const t = i / n, c = truncusCurve.getPointAt(t), a = t * Math.PI * 2.2
      const r = 0.2 - 0.06 * t
      const d = frames.normals[i].clone().multiplyScalar(Math.cos(a)).addScaledVector(frames.binormals[i], Math.sin(a))
      const p1 = c.clone().addScaledVector(d, r), p2 = c.clone().addScaledVector(d, -r)
      pos.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z)
      if (i < n) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2) }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setIndex(idx)
    g.computeVertexNormals()
    add(g, 'spiral_valve', 0xf2e2c4, 'inner')
  }

  // three pairs of arches from the fork; coloured by the blood they carry
  const fork = V(0, 1.12, 0.66)
  const arches: Record<'carotid_arch' | 'systemic_arch' | 'pulmocutaneous_arch', (s: number) => THREE.Vector3[]> = {
    carotid_arch: s => [fork, V(s * 0.45, 1.55, 0.6), V(s * 0.75, 2.25, 0.5), V(s * 0.85, 2.7, 0.4)],
    systemic_arch: s => [fork, V(s * 0.8, 1.45, 0.4), V(s * 1.35, 1.05, -0.4), V(s * 0.85, 0.05, -1.05)],
    pulmocutaneous_arch: s => [fork, V(s * 0.85, 1.25, 0.5), V(s * 1.6, 0.85, 0.15), V(s * 2.15, 0.2, -0.15)],
  }
  const archColour = { carotid_arch: 0xd04a3a, systemic_arch: 0xa8508a, pulmocutaneous_arch: 0x5a6fc6 }
  const archEnds: Record<string, THREE.Vector3[]> = {}
  for (const k of Object.keys(arches) as (keyof typeof arches)[]) {
    for (const s of [-1, 1]) {
      const pts = arches[k](s)
      add(tube(pts, () => 0.11, 30, 12).geo, k, archColour[k], 'vessel')
      ;(archEnds[k] ??= []).push(pts[pts.length - 1])
    }
  }
  // carotid labyrinth: a small swelling at the base of each carotid arch
  for (const s of [-1, 1]) {
    const g = new THREE.SphereGeometry(0.15, 16, 12)
    add(g, 'carotid_arch', 0xc85a4a, 'vessel', V(s * 0.5, 1.6, 0.6))
  }

  // the whole heart sits upright, centred
  root.position.set(0, 0, 0)

  // --- appearance ------------------------------------------------------------------------------------
  let view: 'outside' | 'inside' = 'outside'
  let selected: FrogHeartPart | null = null
  // inside: a cut through the heart (coronal, the front half removed), and through the truncus along its middle
  const wallCut = new THREE.Plane(V(0, 0, -1), 0.0)
  const truncusCut = new THREE.Plane(V(0, 0, -1), 0.72)
  const mats: THREE.Material[] = []
  function applyLook() {
    mats.forEach(m => m.dispose())
    mats.length = 0
    const inside = view === 'inside'
    for (const pc of pieces) {
      const picked = selected === pc.part
      const colour = picked ? 0x22c55e : pc.colour
      const clip = !inside ? [] : pc.group === 'truncus' || pc.part === 'spiral_valve' ? [truncusCut] : pc.group === 'vessel' && pc.part !== 'sinus_venosus' ? [] : [wallCut]
      const m = tissue({ colour, clip, cut: inside && (pc.group === 'wall' || pc.group === 'truncus'), emissive: picked ? 0x15874a : undefined })
      mats.push(m)
      pc.mesh.material = m
      // the linings and the inner parts are only seen once the heart is opened
      pc.mesh.visible = inside || pc.group !== 'inner'
    }
    if (blood) for (const inst of Object.values(blood)) { const bm = inst.material as THREE.MeshStandardMaterial; bm.clippingPlanes = inside ? [wallCut, truncusCut] : []; bm.needsUpdate = true; inst.visible = inside }
  }

  // --- the beat ----------------------------------------------------------------------------------------
  let cycle = 0.8
  const byPart = (p: FrogHeartPart) => pieces.filter(x => x.part === p).map(x => x.mesh)
  const ventricleMeshes = byPart('ventricle'), raMeshes = byPart('right_atrium'), laMeshes = byPart('left_atrium'), svMeshes = byPart('sinus_venosus')
  const avLeaves = byPart('av_valve'), truncusMeshes = [...byPart('truncus'), ...byPart('spiral_valve')]
  const apexDir = V(0, -1, 0)
  function pose() {
    const v = ventricularContraction(cycle), a = atrialContraction(cycle), s = sinusContraction(cycle), tr = truncusContraction(cycle)
    // the ventricle shortens towards its base and narrows
    const base = V(0, -0.1, -0.05)
    for (const m of ventricleMeshes) {
      m.scale.set(1 - 0.1 * v, 1 - 0.12 * v, 1 - 0.1 * v)
      m.position.copy(vCentre).sub(base).multiply(m.scale).add(base)
    }
    const as = 1 - 0.12 * a + 0.04 * (1 - avOpen(cycle))
    for (const m of raMeshes) { m.scale.setScalar(as); m.position.copy(raC) }
    for (const m of laMeshes) { m.scale.setScalar(as); m.position.copy(laC) }
    for (const m of svMeshes) m.scale.setScalar(1 - 0.2 * s)
    // the valve flaps swing down into the ventricle when open, up across the opening when shut
    avLeaves.forEach((m, i) => { const sgn = i === 0 ? -1 : 1; m.rotation.z = sgn * (0.35 + 0.6 * avOpen(cycle)) })
    for (const m of truncusMeshes) m.scale.setScalar(1 - 0.05 * tr)
    void apexDir
    placeBlood()
  }

  // --- blood --------------------------------------------------------------------------------------------
  const vIn = (x: number) => V(x, -0.75, -0.1), vOut = V(-0.3, -0.35, 0.15), tBase = truncusPts[0].clone()
  const tMid = truncusCurve.getPointAt(0.5)
  const poorStarts = veins.map(v => v[0])
  const routes = { rich: [] as Route[], poor: [] as Route[], mixed: [] as Route[] }
  for (const st of poorStarts) {
    for (const end of [...archEnds.pulmocutaneous_arch, ...archEnds.systemic_arch.slice(0, 1)]) {
      routes.poor.push(route([
        { p: st, seg: 'vein', r: 0.05 }, { p: svC, seg: 'sinus', r: 0.12 }, { p: raC, seg: 'atrium', r: 0.25 },
        { p: V(-0.2, -0.12, -0.1), seg: 'ventricle-in', gate: 'av', r: 0.06 }, { p: vIn(-0.35), seg: 'ventricle-in', r: 0.3 },
        { p: vOut, seg: 'ventricle-out', r: 0.15 }, { p: tBase, seg: 'artery', gate: 'conus', r: 0.06 }, { p: tMid, seg: 'artery', r: 0.08 },
        { p: fork, seg: 'artery', r: 0.06 }, { p: end, seg: 'artery', r: 0.05 },
      ]))
    }
  }
  for (const st of [V(-1.7, -0.35, -0.75), V(1.9, -0.3, -0.75)]) {
    for (const end of [...archEnds.carotid_arch, ...archEnds.systemic_arch]) {
      routes.rich.push(route([
        { p: st, seg: 'vein', r: 0.04 }, { p: pvJoin, seg: 'vein', r: 0.06 }, { p: laC, seg: 'atrium', r: 0.2 },
        { p: V(0.2, -0.12, -0.1), seg: 'ventricle-in', gate: 'av', r: 0.06 }, { p: vIn(0.35), seg: 'ventricle-in', r: 0.3 },
        { p: vOut, seg: 'ventricle-out', r: 0.15 }, { p: tBase, seg: 'artery', gate: 'conus', r: 0.06 }, { p: tMid, seg: 'artery', r: 0.08 },
        { p: fork, seg: 'artery', r: 0.06 }, { p: end, seg: 'artery', r: 0.05 },
      ]))
    }
  }
  interface Drop { r: number; s: number; q: number; j: THREE.Vector3 }
  const drops = { rich: [] as Drop[], poor: [] as Drop[] }
  const rand = rng(11)
  const N = 90
  const geo = new THREE.SphereGeometry(0.045, 10, 8)
  const mk = (c: number) => { const m = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.35, roughness: 0.4 }), N); m.raycast = () => {}; m.frustumCulled = false; root.add(m); return m }
  const blood: Record<'rich' | 'poor', THREE.InstancedMesh> = { rich: mk(RICH), poor: mk(POOR) }
  for (const side of ['rich', 'poor'] as const) {
    for (let i = 0; i < N; i++) {
      const r = Math.floor(rand() * routes[side].length)
      const j = V(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1); if (j.lengthSq() > 1) j.normalize()
      drops[side].push({ r, s: rand() * routes[side][r].len, q: rand(), j })
    }
  }
  const SPEED = 2.4
  function moveBlood(dc: number) {
    const av = avOpen(cycle) > 0.3, co = conusOpen(cycle) > 0.3
    for (const side of ['rich', 'poor'] as const) {
      for (const d of drops[side]) {
        const rt = routes[side][d.r]
        let i = 0
        while (i < rt.cum.length - 2 && d.s >= rt.cum[i + 1]) i++
        let s = d.s + SPEED * flowRate(cycle, rt.seg[i]) * dc
        const g = rt.gate[i + 1]
        if (g && !(g === 'av' ? av : co)) {
          const lim = rt.cum[i + 1] - d.q * 0.7 * (rt.cum[i + 1] - rt.cum[i]) - 0.01
          s = d.s <= lim ? Math.min(s, lim) : d.s
        }
        if (s >= rt.len) { d.r = Math.floor(rand() * routes[side].length); s = rand() * 0.05 }
        d.s = s
      }
    }
  }
  function placeBlood() {
    const m = new THREE.Matrix4(), p = new THREE.Vector3()
    for (const side of ['rich', 'poor'] as const) {
      drops[side].forEach((d, n) => {
        const rt = routes[side][d.r]
        let i = 0
        while (i < rt.cum.length - 2 && d.s >= rt.cum[i + 1]) i++
        const k = (d.s - rt.cum[i]) / Math.max(1e-6, rt.cum[i + 1] - rt.cum[i])
        p.lerpVectors(rt.pts[i], rt.pts[i + 1], k).addScaledVector(d.j, rt.rad[i] + (rt.rad[i + 1] - rt.rad[i]) * k)
        blood[side].setMatrixAt(n, m.makeTranslation(p.x, p.y, p.z))
      })
      blood[side].instanceMatrix.needsUpdate = true
    }
  }
  // settle the blood into its rhythm
  for (let k = 0; k < 5 * 100; k++) { moveBlood(0.01); cycle = wrap(cycle + 0.01) }
  applyLook()
  pose()

  return {
    root,
    partOf: (o) => { for (let x: THREE.Object3D | null = o; x; x = x.parent) if (x.userData.heartPart) return x.userData.heartPart as FrogHeartPart; return null },
    setView: (v) => { view = v; applyLook() },
    select: (p) => { selected = p; applyLook() },
    step: (dc) => {
      const n = Math.max(1, Math.ceil(dc / 0.01))
      for (let k = 0; k < n; k++) { moveBlood(dc / n); cycle = wrap(cycle + dc / n) }
      pose()
    },
    setCycle: (c) => { cycle = wrap(c); pose() },
    get cycle() { return cycle },
    labels: () => {
      const inside = view === 'inside'
      const out: { part: FrogHeartPart; at: THREE.Vector3 }[] = [
        { part: 'right_atrium', at: inside ? raC.clone().setZ(0.02) : raC.clone().add(V(-0.1, 0.1, 0.5)) },
        { part: 'left_atrium', at: inside ? laC.clone().setZ(0.02) : laC.clone().add(V(0.1, 0.1, 0.4)) },
        { part: 'ventricle', at: inside ? V(0.1, -1.3, 0.02) : V(0.3, -1.2, 0.7) },
        { part: 'truncus', at: tMid.clone() },
        { part: 'carotid_arch', at: arches.carotid_arch(1)[2] },
        { part: 'systemic_arch', at: arches.systemic_arch(1)[1] },
        { part: 'pulmocutaneous_arch', at: arches.pulmocutaneous_arch(-1)[2] },
      ]
      if (inside) out.push({ part: 'interatrial_septum', at: V(0.06, 0.7, 0.02) }, { part: 'spiral_valve', at: truncusCurve.getPointAt(0.65).clone().setZ(0.72) }, { part: 'av_valve', at: V(0, -0.15, 0.02) })
      else out.push({ part: 'sinus_venosus', at: svC.clone() }, { part: 'pulmonary_veins', at: V(1.1, 0.0, -0.85) }, { part: 'venae_cavae', at: veins[2][1] })
      return out
    },
    clipPlanes: () => (view === 'inside' ? [wallCut, truncusCut] : []),
    dispose: () => {
      pieces.forEach(pc => pc.mesh.geometry.dispose())
      mats.forEach(m => m.dispose())
      geo.dispose()
      Object.values(blood).forEach(b => { (b.material as THREE.Material).dispose(); b.dispose() })
    },
  }
}
