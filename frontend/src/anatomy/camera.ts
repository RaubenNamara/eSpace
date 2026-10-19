import * as THREE from 'three'
import type { ViewName } from './types'

/** Directions the camera looks FROM for each preset (the body faces +z, y is up) */
const DIRECTIONS: Record<ViewName, THREE.Vector3> = {
  front: new THREE.Vector3(0, 0.08, 1),
  back: new THREE.Vector3(0, 0.08, -1),
  left: new THREE.Vector3(1, 0.08, 0), // the body's own left side (+x)
  right: new THREE.Vector3(-1, 0.08, 0),
  top: new THREE.Vector3(0, 1, 0.0001),
}

/** Distance at which a sphere of `radius` fills the view (vertical fov in degrees) */
export function fitDistance(radius: number, fovDeg: number, aspect: number, margin = 1.15) {
  const vFov = THREE.MathUtils.degToRad(fovDeg)
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
  const fov = Math.min(vFov, hFov)
  return (radius * margin) / Math.sin(fov / 2)
}

export interface CameraPose { position: THREE.Vector3; target: THREE.Vector3 }

/** Distance at which a w x h rectangle (facing the camera) fits the view, with depth d in front of it */
export function fitRectDistance(w: number, h: number, d: number, fovDeg: number, aspect: number, margin = 1.08) {
  const vFov = THREE.MathUtils.degToRad(fovDeg)
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
  const byHeight = (h * margin) / 2 / Math.tan(vFov / 2)
  const byWidth = (w * margin) / 2 / Math.tan(hFov / 2)
  return Math.max(byHeight, byWidth) + d / 2
}

/** Camera pose for a preset view framing the given box */
export function viewPose(view: ViewName, box: THREE.Box3, fovDeg: number, aspect: number): CameraPose {
  const size = box.getSize(new THREE.Vector3())
  const target = box.getCenter(new THREE.Vector3())
  const dir = DIRECTIONS[view].clone().normalize()
  // the box's extent as seen from this side
  const [w, h, d] = view === 'top' ? [size.x, size.z, size.y] : view === 'left' || view === 'right' ? [size.z, size.y, size.x] : [size.x, size.y, size.z]
  const dist = fitRectDistance(Math.max(w, 0.05), Math.max(h, 0.05), d, fovDeg, aspect)
  return { position: target.clone().addScaledVector(dir, dist), target }
}

/** Camera pose that brings a box into view from the current viewing direction */
export function focusPose(box: THREE.Box3, camera: THREE.PerspectiveCamera, currentTarget: THREE.Vector3, from?: ViewName, margin = 2.4): CameraPose {
  const sphere = box.getBoundingSphere(new THREE.Sphere())
  const dir = from ? DIRECTIONS[from].clone().normalize() : camera.position.clone().sub(currentTarget).normalize()
  if (!Number.isFinite(dir.x) || dir.lengthSq() === 0) dir.set(0, 0, 1)
  // small organs still get a sensible close-up rather than filling the screen with one triangle
  const dist = Math.max(fitDistance(Math.max(sphere.radius, 0.02), camera.fov, camera.aspect, margin), 0.3)
  return { position: sphere.center.clone().addScaledVector(dir, dist), target: sphere.center.clone() }
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Smoothly moves camera + orbit target; advance it from the render loop with `step(now)` */
export class CameraTween {
  private from: CameraPose | null = null
  private to: CameraPose | null = null
  private start = 0
  private duration = 0

  begin(from: CameraPose, to: CameraPose, now: number, duration = 650) {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    this.from = { position: from.position.clone(), target: from.target.clone() }
    this.to = { position: to.position.clone(), target: to.target.clone() }
    this.start = now
    this.duration = reduce ? 0 : duration
  }

  get active() { return this.to !== null }

  /** Writes the in-between pose; returns false once finished */
  step(now: number, position: THREE.Vector3, target: THREE.Vector3): boolean {
    if (!this.from || !this.to) return false
    const t = this.duration <= 0 ? 1 : Math.min(1, (now - this.start) / this.duration)
    const k = ease(t)
    position.lerpVectors(this.from.position, this.to.position, k)
    target.lerpVectors(this.from.target, this.to.target, k)
    if (t >= 1) { this.from = this.to = null; return false }
    return true
  }

  cancel() { this.from = this.to = null }
}
