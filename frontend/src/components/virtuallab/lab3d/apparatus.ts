import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { canvasTexture, labMaterials } from './labRoom'

/** Reusable real-size apparatus (metres, bench top at y = 0). */

export interface RetortStandOptions {
  /** Where the clamp holds whatever hangs from it (string, spring...). */
  pivot: THREE.Vector3
  rodX: number
  /** z of the rod and arm - behind the hanging apparatus so it can pass in front. */
  armZ: number
  /** How far along +x the arm reaches (it may also carry a ruler clip). */
  armEnd: number
}

export function buildRetortStand({ pivot, rodX, armZ, armEnd }: RetortStandOptions): THREE.Group {
  const g = new THREE.Group()
  const castIron = labMaterials.castIron()
  const steel = labMaterials.steel()
  const add = (m: THREE.Mesh) => { m.castShadow = true; g.add(m); return m }

  const base = add(new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.022, 0.2, 3, 0.006), castIron))
  base.position.set(rodX + 0.09, 0.011, armZ + 0.04)
  base.receiveShadow = true

  const rodH = pivot.y + 0.1
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.0065, rodH, 24), steel)).position.set(rodX, rodH / 2, armZ)
  add(new THREE.Mesh(new RoundedBoxGeometry(0.036, 0.042, 0.032, 2, 0.004), castIron)).position.set(rodX, pivot.y, armZ)
  const screw = add(new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.03, 12), steel))
  screw.rotation.x = Math.PI / 2
  screw.position.set(rodX, pivot.y, armZ + 0.028)

  const arm = add(new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, armEnd - rodX, 20), steel))
  arm.rotation.z = Math.PI / 2
  arm.position.set((rodX + armEnd) / 2, pivot.y, armZ)

  // Clamp jaw reaching forward from the arm to the pivot point
  add(new THREE.Mesh(new RoundedBoxGeometry(0.018, 0.024, pivot.z - armZ + 0.012, 2, 0.003), labMaterials.brass()))
    .position.set(pivot.x, pivot.y, (pivot.z + armZ) / 2)

  return g
}

export interface HangingRuler {
  group: THREE.Group
  /** The pickable face (emissive highlight while a measurement is armed). */
  mesh: THREE.Mesh
  setArmed: (armed: boolean) => void
}

/**
 * Wooden rule hanging from a clip, 0 cm at `top` and reading downward to `maxCm`.
 * `clipZ` is where the clip grips (normally the stand's arm).
 */
export function buildHangingRuler(maxCm: number, top: THREE.Vector3, clipZ: number): HangingRuler {
  const group = new THREE.Group()
  const margin = 0.02
  const heightM = maxCm / 100 + margin
  const face = new THREE.MeshStandardMaterial({ roughness: 0.6 })
  face.map = canvasTexture(128, 2048, (ctx, w, h) => {
    ctx.fillStyle = '#facc15'
    ctx.fillRect(0, 0, w, h)
    const pxPerMm = (h * (maxCm / 100 / heightM)) / (maxCm * 10)
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 30px sans-serif'
    ctx.textBaseline = 'middle'
    for (let mm = 0; mm <= maxCm * 10; mm++) {
      const y = mm * pxPerMm
      const len = mm % 50 === 0 ? 56 : mm % 10 === 0 ? 38 : 18
      ctx.lineWidth = mm % 10 === 0 ? 3 : 1.5
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(len, y)
      ctx.stroke()
      if (mm % 50 === 0 && mm > 0) ctx.fillText(String(mm / 10), 64, y)
    }
  })
  const edge = () => new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.6 })
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.03, heightM, 0.004), [edge(), edge(), edge(), edge(), face, edge()])
  mesh.position.set(top.x, top.y - heightM / 2, top.z)
  mesh.castShadow = true
  group.add(mesh)

  const clip = new THREE.Mesh(new RoundedBoxGeometry(0.036, 0.018, Math.abs(clipZ - top.z) + 0.02, 2, 0.003), labMaterials.blackPlastic())
  clip.position.set(top.x, top.y + 0.002, (top.z + clipZ) / 2)
  clip.castShadow = true
  group.add(clip)

  return {
    group,
    mesh,
    setArmed: (armed) => {
      face.emissive.setHex(armed ? 0x4f46e5 : 0x000000)
      face.emissiveIntensity = armed ? 0.25 : 0
    },
  }
}

/** Sets an indigo emissive glow on every standard material under `obj` (selection highlight). */
export function setHighlight(obj: THREE.Object3D, on: boolean) {
  obj.traverse((o) => {
    if (!(o instanceof THREE.Mesh)) return
    const mats = Array.isArray(o.material) ? o.material : [o.material]
    mats.forEach((m) => {
      if (m instanceof THREE.MeshStandardMaterial) {
        m.emissive.setHex(on ? 0x3730a3 : 0x000000)
        m.emissiveIntensity = on ? 0.45 : 0
      }
    })
  })
}
