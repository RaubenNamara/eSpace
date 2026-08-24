/**
 * Reusable 2D ray-optics geometry, shared so future optics apparatus (lenses, prisms) can extend
 * it rather than each renderer reinventing ray/surface math. Ported from VirtualLabScene.vue's
 * (3D engine) inline ray functions - same formulas, expressed in plain 2D vectors since the 2D
 * renderer has no THREE.js dependency at all. The 3D engine's own copy is left untouched, exactly
 * like circuitEngine.ts and microscopeEngine.ts before it.
 *
 * Deliberately generic: a "surface" is just a position + normal (+ optional refractive index),
 * not a mirror-specific or glass-specific concept, so a lens/prism can plug into computeRayHit()
 * and refract()/reflect() later without changing this module.
 */

export interface Vec2 { x: number; y: number }

export function dirFromAngle(rad: number): Vec2 {
  return { x: Math.cos(rad), y: Math.sin(rad) }
}

export function normalize(v: Vec2): Vec2 {
  const len = Math.max(1e-6, Math.hypot(v.x, v.y))
  return { x: v.x / len, y: v.y / len }
}

function dot(a: Vec2, b: Vec2): number { return a.x * b.x + a.y * b.y }
function sub(a: Vec2, b: Vec2): Vec2 { return { x: a.x - b.x, y: a.y - b.y } }
function add(a: Vec2, b: Vec2): Vec2 { return { x: a.x + b.x, y: a.y + b.y } }
function scale(v: Vec2, s: number): Vec2 { return { x: v.x * s, y: v.y * s } }

export function reflect(incident: Vec2, normal: Vec2): Vec2 {
  return sub(incident, scale(normal, 2 * dot(incident, normal)))
}

/** Standard vector refraction (Snell's Law), n1 -> n2 along `normal`. Returns null on total
 *  internal reflection - not expected at the teaching angles these practicals use. */
export function refract(incident: Vec2, normal: Vec2, n1: number, n2: number): Vec2 | null {
  let n = normal
  let cosI = -dot(n, incident)
  if (cosI < 0) { cosI = -cosI; n = scale(n, -1) }
  const eta = n1 / n2
  const sin2T = eta * eta * (1 - cosI * cosI)
  if (sin2T > 1) return null
  const cosT = Math.sqrt(1 - sin2T)
  return add(scale(incident, eta), scale(n, eta * cosI - cosT))
}

export interface RayHit { point: Vec2; normal: Vec2; incidentDir: Vec2 }

/**
 * Where a ray starting at `origin` travelling in `dir` actually strikes a flat surface (treated
 * as a finite segment of half-length `extent` centred on `surfacePos`, facing `surfaceNormal`) -
 * real geometry derived from wherever the student has actually positioned/rotated both objects,
 * never a scripted angle.
 */
export function computeRayHit(origin: Vec2, dir: Vec2, surfacePos: Vec2, surfaceNormal: Vec2, extent: number): RayHit | null {
  const denom = dot(dir, surfaceNormal)
  if (Math.abs(denom) < 0.001) return null // travelling parallel to the surface - never strikes it
  const t = dot(sub(surfacePos, origin), surfaceNormal) / denom
  if (t <= 4) return null // surface is behind the ray, or the box is touching it
  const point = add(origin, scale(dir, t))
  if (Math.hypot(point.x - surfacePos.x, point.y - surfacePos.y) > extent) return null // missed the physical object
  return { point, normal: surfaceNormal, incidentDir: dir }
}

/** Angle in degrees between a direction vector and a normal, 0-90 regardless of which way either
 *  points (matches how a protractor reads an angle from a reference line, not a signed vector). */
export function angleFromNormalDeg(vec: Vec2, normal: Vec2): number {
  const v = normalize(vec)
  const n = normalize(normal)
  const cos = Math.max(-1, Math.min(1, Math.abs(dot(v, n))))
  return (Math.acos(cos) * 180) / Math.PI
}
