import * as THREE from 'three'

/**
 * A 3D textbook DIAGRAM of the female reproductive system (our own drawing, not anatomical data):
 * front view, uterus and vagina cut open from the front to show the wall and cavity, fallopian tubes
 * with fimbriae and ovaries with follicles. Sizes are roughly life-size (metres); shapes are simplified
 * the way a textbook diagram is. The UI labels it as a diagram.
 *
 * Axes as the anatomy model: y up, +x the body's left, +z towards the viewer.
 */

export interface DiagramPart { key: string; name: string; anchor: THREE.Vector3 }
export interface DiagramModel {
  root: THREE.Group
  parts: DiagramPart[]
  /** the path an egg takes, ovary -> tube -> uterus (left side) */
  eggPath: THREE.CatmullRomCurve3
  dispose(): void
}

const COL = {
  outer: 0xd9707c, // uterus and tubes, outside
  wall: 0xe0808b, // cut muscle wall (myometrium)
  lining: 0xb33a4f, // lining (endometrium) and vaginal lining
  vaginaWall: 0xdc8090,
  ovary: 0xf2cfc3,
  follicle: 0xfff0d2,
  ligament: 0xe3a1a1,
}

/** smooth value through (y, w) points (piecewise cubic Hermite) */
function profile(points: [number, number][]) {
  return (y: number) => {
    if (y <= points[0][0]) return points[0][1]
    for (let i = 0; i < points.length - 1; i++) {
      const [y0, w0] = points[i], [y1, w1] = points[i + 1]
      if (y <= y1) {
        const t = (y - y0) / (y1 - y0)
        const s = t * t * (3 - 2 * t)
        return w0 + (w1 - w0) * s
      }
    }
    return points[points.length - 1][1]
  }
}

/** striped texture: muscle fibres on the cut wall */
function fibreTexture(base: number, line: number) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  // no 2D canvas (tests, very old browsers): plain wall colour
  if (!g) return new THREE.Texture()
  g.fillStyle = `#${base.toString(16).padStart(6, '0')}`
  g.fillRect(0, 0, 128, 128)
  g.strokeStyle = `#${line.toString(16).padStart(6, '0')}`
  g.globalAlpha = 0.35
  for (let i = 0; i < 26; i++) {
    g.lineWidth = 1 + (i % 3)
    g.beginPath()
    const y = (i / 26) * 128 + Math.sin(i) * 3
    g.moveTo(0, y)
    g.bezierCurveTo(40, y + 6, 88, y - 6, 128, y)
    g.stroke()
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(18, 18)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/** back half (z <= 0) of a surface of revolution with radius w(y), flattened front-to-back by `depth` */
function halfLathe(w: (y: number) => number, y0: number, y1: number, steps: number, depth: number, closeTop: boolean) {
  const pts: THREE.Vector2[] = []
  for (let i = 0; i <= steps; i++) {
    const y = y0 + (i / steps) * (y1 - y0)
    pts.push(new THREE.Vector2(Math.max(0.0001, w(y)), y))
  }
  if (closeTop) pts.push(new THREE.Vector2(0.0001, y1 + 0.0005))
  const geo = new THREE.LatheGeometry(pts, 48, Math.PI / 2, Math.PI)
  geo.scale(1, 1, depth)
  geo.computeVertexNormals()
  return geo
}

/** the flat cut face between an outer and an inner profile, both sides of the midline */
function cutFace(outer: (y: number) => number, inner: (y: number) => number, y0: number, y1: number, steps = 60) {
  const shapes: THREE.Shape[] = []
  for (const side of [1, -1]) {
    const s = new THREE.Shape()
    for (let i = 0; i <= steps; i++) { const y = y0 + (i / steps) * (y1 - y0); const x = side * inner(y); i ? s.lineTo(x, y) : s.moveTo(x, y) }
    for (let i = steps; i >= 0; i--) { const y = y0 + (i / steps) * (y1 - y0); s.lineTo(side * outer(y), y) }
    s.closePath()
    shapes.push(s)
  }
  return new THREE.ShapeGeometry(shapes)
}

/** a tube whose radius changes along its length */
function varTube(curve: THREE.Curve<THREE.Vector3>, radius: (t: number) => number, segs = 90, radial = 14) {
  const frames = curve.computeFrenetFrames(segs, false)
  const pos: number[] = [], idx: number[] = []
  for (let i = 0; i <= segs; i++) {
    const t = i / segs, p = curve.getPointAt(t), r = radius(t)
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2
      const n = frames.normals[i].clone().multiplyScalar(Math.cos(a)).add(frames.binormals[i].clone().multiplyScalar(Math.sin(a)))
      pos.push(p.x + n.x * r, p.y + n.y * r, p.z + n.z * r)
    }
  }
  for (let i = 0; i < segs; i++) for (let j = 0; j < radial; j++) {
    const a = i * (radial + 1) + j, b = a + radial + 1
    idx.push(a, b, a + 1, b, b + 1, a + 1)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  geo.setIndex(idx)
  geo.computeVertexNormals()
  return geo
}

export function buildFemaleDiagram(): DiagramModel {
  const root = new THREE.Group()
  root.name = 'female-reproductive-diagram'
  const disposables: { dispose(): void }[] = []
  const mat = (o: THREE.MeshStandardMaterialParameters) => { const m = new THREE.MeshStandardMaterial({ roughness: 0.55, ...o }); disposables.push(m); return m }
  const add = (geo: THREE.BufferGeometry, m: THREE.Material, part: string) => {
    disposables.push(geo)
    const mesh = new THREE.Mesh(geo, m)
    mesh.userData.part = part
    root.add(mesh)
    return mesh
  }

  const wallTex = fibreTexture(COL.wall, 0xb94d5c); disposables.push(wallTex)
  const outerMat = mat({ color: COL.outer, side: THREE.DoubleSide })
  const wallMat = mat({ color: 0xffffff, map: wallTex, side: THREE.DoubleSide })
  const liningMat = mat({ color: COL.lining, roughness: 0.4, side: THREE.DoubleSide })

  // --- uterus + cervix: y from 0 (external os) to 0.078 (top of the fundus) ---
  const uOuter = profile([[0, 0.0105], [0.008, 0.0115], [0.018, 0.0125], [0.026, 0.014], [0.034, 0.021], [0.045, 0.027], [0.056, 0.030], [0.066, 0.029], [0.072, 0.024], [0.0765, 0.014], [0.078, 0.004]])
  // cavity: the cervical canal, the internal os, then the triangular cavity up to the cornua
  const uInner = profile([[0.001, 0.0016], [0.018, 0.0019], [0.027, 0.0016], [0.035, 0.005], [0.046, 0.0105], [0.056, 0.0155], [0.062, 0.018], [0.0645, 0.0165], [0.066, 0.004]])
  add(halfLathe(uOuter, 0, 0.078, 90, 0.6, true), outerMat, 'uterus')
  add(halfLathe(uInner, 0.001, 0.066, 90, 0.6, true), liningMat, 'uterus')
  // cut face: the muscular wall (striped) with a thin red lining drawn along the cavity edge
  // above the cavity the wall is solid (no slot through the fundus)
  const uInnerCut = (y: number) => (y > 0.0652 ? 0 : uInner(y))
  const wall = add(cutFace(uOuter, uInnerCut, 0.0005, 0.0775), wallMat, 'uterus')
  wall.position.z = 0.0002
  const liningEdge = add(cutFace(y => (y > 0.0652 ? 0 : uInner(y) + 0.0022), uInnerCut, 0.0015, 0.0652), liningMat, 'uterus')
  liningEdge.position.z = 0.0004
  // the cervix (lower part) is its own clickable part: same geometry, but tagged by height
  for (const m of root.children) if (m instanceof THREE.Mesh) m.userData.splitCervixBelow = 0.024

  // --- vagina: a ridged tube below the cervix, cut open ---
  const vOuter = profile([[-0.085, 0.0155], [-0.05, 0.016], [-0.01, 0.0165], [0.006, 0.0175], [0.012, 0.0165]])
  const vInner = (y: number) => 0.0118 + 0.0011 * Math.sin(y * 420) * (y < 0.002 ? 1 : 0.3) + (y > 0.0 ? 0.002 : 0)
  const vaginaWall = mat({ color: COL.vaginaWall, side: THREE.DoubleSide })
  add(halfLathe(vOuter, -0.085, 0.012, 80, 0.6, false), vaginaWall, 'vagina')
  add(halfLathe(vInner, -0.085, 0.012, 160, 0.6, false), liningMat, 'vagina')
  const vCut = add(cutFace(vOuter, vInner, -0.085, 0.012, 160), mat({ color: COL.vaginaWall, map: wallTex, side: THREE.DoubleSide }), 'vagina')
  vCut.position.z = 0.0002

  // --- fallopian tubes, ovaries, ligaments (both sides) ---
  const tubeMat = mat({ color: COL.outer })
  const ovaryMat = mat({ color: COL.ovary, roughness: 0.7 })
  const follicleMat = mat({ color: COL.follicle, roughness: 0.35 })
  const ligMat = mat({ color: COL.ligament })
  let eggPath: THREE.CatmullRomCurve3 | null = null
  for (const s of [1, -1]) {
    const side = s === 1 ? 'left' : 'right'
    const tubePts = [
      new THREE.Vector3(s * 0.024, 0.067, -0.002), new THREE.Vector3(s * 0.04, 0.074, -0.002), new THREE.Vector3(s * 0.06, 0.079, -0.002),
      new THREE.Vector3(s * 0.08, 0.077, -0.002), new THREE.Vector3(s * 0.094, 0.067, -0.002), new THREE.Vector3(s * 0.098, 0.055, -0.001),
    ]
    const tube = new THREE.CatmullRomCurve3(tubePts)
    // isthmus thin, ampulla wider, opening into the funnel-shaped infundibulum
    add(varTube(tube, t => 0.0026 + 0.0032 * Math.min(1, t * 1.6) + (t > 0.85 ? (t - 0.85) * 0.045 : 0)), tubeMat, `${side}-uterine-tube`)
    // fimbriae: fingers from the open end, reaching towards the ovary
    const end = tube.getPointAt(1)
    for (let f = 0; f < 7; f++) {
      const a = -0.9 + (f / 6) * 1.8
      const dir = new THREE.Vector3(s * 0.25 * Math.sin(a), -1, 0.4 * Math.cos(a * 1.3)).normalize()
      const tip = end.clone().addScaledVector(dir, 0.011 + 0.003 * Math.sin(f * 2.1))
      const mid = end.clone().lerp(tip, 0.5).add(new THREE.Vector3(s * 0.002 * Math.cos(f), 0, 0.002 * Math.sin(f)))
      add(varTube(new THREE.CatmullRomCurve3([end.clone().add(dir.clone().multiplyScalar(0.003)), mid, tip]), t => 0.0013 * (1 - 0.6 * t), 16, 8), tubeMat, `${side}-uterine-tube`)
    }
    // ovary with follicles
    const ovaryCentre = new THREE.Vector3(s * 0.083, 0.043, -0.004)
    const ovGeo = new THREE.SphereGeometry(1, 40, 28)
    ovGeo.scale(0.0165, 0.0105, 0.009)
    ovGeo.rotateZ(s * 0.35)
    const ov = add(ovGeo, ovaryMat, `${side}-ovary`)
    ov.position.copy(ovaryCentre)
    for (let k = 0; k < 9; k++) {
      const u = (k * 2.39996) % (Math.PI * 2), v = 0.35 + ((k * 0.618) % 1) * 1.4
      const n = new THREE.Vector3(Math.cos(u) * Math.sin(v), Math.cos(v), Math.sin(u) * Math.sin(v))
      const p = new THREE.Vector3(n.x * 0.0158, n.y * 0.0098, Math.abs(n.z) * 0.0086).applyAxisAngle(new THREE.Vector3(0, 0, 1), s * 0.35)
      const fol = add(new THREE.SphereGeometry(0.0016 + (k % 3) * 0.0007, 14, 10), follicleMat, `${side}-ovary`)
      fol.position.copy(ovaryCentre).add(p)
    }
    // ovarian ligament: ovary to the side of the uterus
    add(varTube(new THREE.CatmullRomCurve3([ovaryCentre.clone().add(new THREE.Vector3(-s * 0.014, 0.002, 0)), new THREE.Vector3(s * 0.045, 0.052, -0.004), new THREE.Vector3(s * 0.027, 0.058, -0.004)]), () => 0.0016, 30, 8), ligMat, `${side}-ovary`)

    if (s === 1) {
      // the egg: released from the ovary, caught by the fimbriae, along the tube into the uterus
      const back = [...tubePts].reverse()
      eggPath = new THREE.CatmullRomCurve3([
        ovaryCentre.clone().add(new THREE.Vector3(0.006, 0.009, 0.004)), end.clone().add(new THREE.Vector3(0, -0.006, 0.003)),
        ...back.map(p => p.clone().setZ(0.001)), new THREE.Vector3(0.012, 0.06, 0.001), new THREE.Vector3(0.004, 0.052, 0.001),
      ])
    }
  }

  const parts: DiagramPart[] = [
    { key: 'left-uterine-tube', name: 'Fallopian tube', anchor: new THREE.Vector3(0.06, 0.081, 0) },
    { key: 'right-uterine-tube', name: 'Fallopian tube', anchor: new THREE.Vector3(-0.06, 0.081, 0) },
    { key: 'left-ovary', name: 'Ovary', anchor: new THREE.Vector3(0.083, 0.043, 0.006) },
    { key: 'right-ovary', name: 'Ovary', anchor: new THREE.Vector3(-0.083, 0.043, 0.006) },
    { key: 'uterus', name: 'Uterus', anchor: new THREE.Vector3(0.022, 0.05, 0.001) },
    { key: 'cervix', name: 'Cervix', anchor: new THREE.Vector3(0.011, 0.012, 0.001) },
    { key: 'vagina', name: 'Vagina', anchor: new THREE.Vector3(0.015, -0.04, 0.001) },
  ]

  return {
    root,
    parts,
    eggPath: eggPath!,
    dispose() {
      for (const d of disposables) d.dispose()
      root.removeFromParent()
    },
  }
}

/** which part was hit: the uterus mesh below the internal os counts as the cervix */
export function diagramPartAt(hit: THREE.Intersection): string | null {
  const part = hit.object.userData.part as string | undefined
  if (!part) return null
  if (part === 'uterus' && hit.point.y < (hit.object.userData.splitCervixBelow ?? -1)) return 'cervix'
  return part
}
