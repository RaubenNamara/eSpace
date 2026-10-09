import * as THREE from 'three'
import type { LabObjectDef } from '@/types/virtualLab'
import type { LabWallCabinets, WallCabinetShelves } from './labRoom'
import { createObjectMesh } from '../labObjectFactory'

/**
 * Stocks the room's glass wall cabinets with every apparatus in the catalogue, grouped by subject,
 * with a brass name plate on each cabinet and a label strip on the front edge of every shelf.
 * Shared by the free-layout engine (which lets students pick a shelf item onto the bench) and the
 * guided experiments (where the shelves are the lab's backdrop).
 *
 * Subjects: one cabinet each when the room has enough (the free-layout engine's side benches add
 * more); in the standard four-cabinet room the last cabinet is shared, Agriculture on its upper
 * shelves and General on its lower ones - the shelf strips say which is which.
 */

export const SHELF_SUBJECTS = [
  { key: 'physics', label: 'Physics' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'biology', label: 'Biology' },
  { key: 'agriculture', label: 'Agriculture' },
  { key: 'general', label: 'General' },
] as const
const KNOWN_SECTIONS = ['physics', 'chemistry', 'biology', 'agriculture']

export interface StockedShelves {
  /** One model per apparatus type, tagged with userData.shelfType */
  items: Map<string, THREE.Group>
  /** Removes and frees everything this added to the scene */
  dispose: () => void
}

interface Section { cabinet: number; subject: (typeof SHELF_SUBJECTS)[number]; rows: number[] }

function sectionsFor(cabinets: WallCabinetShelves[]): Section[] {
  const n = cabinets.length
  if (n === 0) return []
  if (n >= SHELF_SUBJECTS.length) {
    return SHELF_SUBJECTS.map((subject, i) => ({ cabinet: i, subject, rows: cabinets[i].rows.map((_, r) => r) }))
  }
  // Fewer cabinets than subjects: one each until the last cabinet, which shares out its shelves
  // (top to bottom) between the subjects that are left.
  const out: Section[] = []
  SHELF_SUBJECTS.slice(0, n - 1).forEach((subject, i) => out.push({ cabinet: i, subject, rows: cabinets[i].rows.map((_, r) => r) }))
  const rest = SHELF_SUBJECTS.slice(n - 1)
  const rowCount = cabinets[n - 1].rows.length
  rest.forEach((subject, k) => {
    const from = Math.floor((k * rowCount) / rest.length)
    const to = Math.floor(((k + 1) * rowCount) / rest.length)
    out.push({ cabinet: n - 1, subject, rows: Array.from({ length: Math.max(1, to - from) }, (_, r) => Math.min(rowCount - 1, from + r)) })
  })
  return out
}

/** `unitsPerMetre`: 5 for the free-layout engine, 1 for the guided experiments (built in metres). */
export function stockWallShelves(scene: THREE.Scene, wc: LabWallCabinets, catalog: LabObjectDef[], unitsPerMetre: number): StockedShelves {
  const u = unitsPerMetre
  const added: THREE.Object3D[] = []
  const items = new Map<string, THREE.Group>()
  const stripTextures = new Map<string, THREE.Texture>()
  const up = new THREE.Vector3(0, 1, 0)
  // Cabinet coordinates -> scene (the side-wall cabinets are turned to face into the room)
  const place = (cab: WallCabinetShelves, x: number, y: number, z: number) =>
    new THREE.Vector3(x, y, z).applyAxisAngle(up, cab.rotY).add(cab.offset)
  const add = (o: THREE.Object3D) => { scene.add(o); added.push(o) }

  const defs = catalog.filter(d => d.id > 0 && d.is_active !== false)
  const sectionOf = (d: LabObjectDef) => (KNOWN_SECTIONS.includes(d.category) ? d.category : 'general')
  const sections = sectionsFor(wc.cabinets)

  // Name plate on each cabinet's cornice - shared cabinets list every subject on them
  wc.cabinets.forEach((cab, ci) => {
    const names = sections.filter(s => s.cabinet === ci).map(s => s.subject.label)
    if (!names.length) return
    const plate = subjectPlate(names.join(' & '), Math.min(0.75 * u, (cab.maxX - cab.minX) * 0.7), u)
    plate.position.copy(place(cab, cab.cx, cab.topY, cab.corniceFrontZ))
    plate.rotation.y = cab.rotY
    add(plate)
  })

  for (const section of sections) {
    const cab = wc.cabinets[section.cabinet]
    const bays = Math.max(1, cab.bays)
    const bayW = (cab.maxX - cab.minX) / bays
    // A label strip along the front edge of each of this subject's shelves - in the middle of the
    // first bay's left-hand door, clear of the frames where the doors meet and the bay uprights
    section.rows.forEach((ri) => {
      const strip = shelfStrip(section.subject.label, stripTextures, u)
      strip.position.copy(place(cab, cab.minX + bayW * 0.25, cab.rows[ri] - 0.017 * u, cab.frontZ + 0.002 * u))
      strip.rotation.y = cab.rotY
      add(strip)
    })

    const subjectItems = defs.filter(d => sectionOf(d) === section.subject.key).sort((a, b) => a.display_name.localeCompare(b.display_name))
    if (!subjectItems.length) continue
    // Fewest items per bay that still fits everything on this subject's shelves; slots never
    // straddle the uprights between the door bays
    let perBay = Math.max(1, Math.ceil(4 / bays))
    while (Math.ceil(subjectItems.length / (perBay * bays)) > section.rows.length) perBay++
    const perRow = perBay * bays
    const inset = bays > 1 ? 0.03 * u : 0
    const slotW = (bayW - inset * 2) / perBay

    subjectItems.forEach((def, idx) => {
      const ri = section.rows[Math.floor(idx / perRow)]
      const j = idx % perRow
      const bay = Math.floor(j / perBay)
      const y = cab.rows[ri]
      const g = createObjectMesh(def.object_type, `shelf:${def.object_type}`, def.display_name, def.default_props || {})
      // createObjectMesh builds at 5 units per metre; the guided experiments work in metres
      const base = 5 / u
      const box = new THREE.Box3()
      g.children.forEach((c) => { if (!(c instanceof THREE.Sprite)) box.expandByObject(c) })
      const size = box.getSize(new THREE.Vector3()).divideScalar(base)
      const center = box.getCenter(new THREE.Vector3()).divideScalar(base)
      const k = Math.min(1, (slotW * 0.84) / Math.max(size.x, 0.01), (cab.rowHeight * 0.8) / Math.max(size.y, 0.01), (cab.depth * 0.9) / Math.max(size.z, 0.01))
      g.scale.setScalar(k / base)
      const sx = cab.minX + bay * bayW + inset + slotW * ((j % perBay) + 0.5)
      // Centre the model on its slot (in the cabinet's own frame), then hang it in the room
      const local = new THREE.Vector3(sx, y - (box.min.y / base) * k, cab.z).sub(new THREE.Vector3(center.x * k, 0, center.z * k))
      g.position.copy(place(cab, local.x, local.y, local.z))
      g.rotation.y = cab.rotY
      g.children.forEach((c) => {
        if (c.userData.role !== 'label') return
        c.scale.set(0.72 / k, 0.158 / k, 1)
        c.position.y = box.max.y + 0.2 / k
        c.visible = false
      })
      g.traverse((c) => { if (c instanceof THREE.Mesh) c.castShadow = false })
      g.userData.shelfType = def.object_type
      add(g)
      items.set(def.object_type, g)
    })
  }

  return {
    items,
    dispose: () => {
      added.forEach((o) => {
        scene.remove(o)
        o.traverse((c) => {
          if (c instanceof THREE.Mesh || c instanceof THREE.Sprite) {
            c.geometry?.dispose()
            const mats = Array.isArray(c.material) ? c.material : [c.material]
            mats.forEach((m: THREE.Material & { map?: THREE.Texture | null }) => { if (!stripTextures.has(m.name)) m.map?.dispose(); m.dispose() })
          }
        })
      })
      stripTextures.forEach(t => t.dispose())
      added.length = 0
      items.clear()
    },
  }
}

/** A white printed label along a shelf's front edge, the subject in dark capitals. One texture per subject. */
function shelfStrip(label: string, textures: Map<string, THREE.Texture>, u: number): THREE.Mesh {
  let tex = textures.get(label)
  if (!tex) {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, 512, 64)
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 4
    ctx.strokeRect(2, 2, 508, 60)
    ctx.fillStyle = '#1e293b'
    ctx.font = 'bold 46px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label.toUpperCase().split('').join(' '), 256, 35)
    tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    textures.set(label, tex)
  }
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 })
  mat.name = label // so dispose() leaves the shared texture to be freed once
  return new THREE.Mesh(new THREE.PlaneGeometry(0.26 * u, 0.034 * u), mat)
}

/**
 * A subject name plate fixed to the front of a cabinet's top timber: a walnut board standing on
 * the cornice with a brass plate on it, the subject engraved in dark serif capitals between two
 * screws. `width` is in scene units.
 */
function subjectPlate(label: string, width: number, u: number): THREE.Group {
  const h = 0.13 * u
  const g = new THREE.Group()
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(width, h, 0.02 * u),
    new THREE.MeshStandardMaterial({ color: 0x5b3418, roughness: 0.55 }),
  )
  board.position.set(0, h / 2, -0.008 * u)
  g.add(board)
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 200
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createLinearGradient(0, 0, 0, 200)
  grad.addColorStop(0, '#f8e3a1')
  grad.addColorStop(0.45, '#d9a842')
  grad.addColorStop(1, '#a8781f')
  ctx.fillStyle = grad
  ctx.beginPath(); ctx.roundRect(4, 4, 1016, 192, 22); ctx.fill()
  ctx.strokeStyle = 'rgba(70,45,5,0.85)'
  ctx.lineWidth = 6
  ctx.beginPath(); ctx.roundRect(18, 18, 988, 164, 14); ctx.stroke()
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.roundRect(30, 30, 964, 140, 10); ctx.stroke()
  // Screws
  for (const x of [62, 962]) {
    const sg = ctx.createRadialGradient(x - 4, 96, 2, x, 100, 16)
    sg.addColorStop(0, '#fff7d6'); sg.addColorStop(1, '#7a5a17')
    ctx.fillStyle = sg
    ctx.beginPath(); ctx.arc(x, 100, 15, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = '#5a3f0c'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(x - 9, 100); ctx.lineTo(x + 9, 100); ctx.stroke()
  }
  // Engraved lettering: a light highlight under dark text
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  let size = 96
  ctx.font = `bold ${size}px Georgia, serif`
  const text = label.toUpperCase().split('').join(' ')
  while (ctx.measureText(text).width > 820 && size > 40) { size -= 4; ctx.font = `bold ${size}px Georgia, serif` }
  ctx.fillStyle = 'rgba(255,248,220,0.7)'
  ctx.fillText(text, 512, 104)
  ctx.fillStyle = '#3b2606'
  ctx.fillText(text, 512, 101)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 0.94, h * 0.8),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.55, transparent: true }),
  )
  face.position.set(0, h / 2, 0.0035 * u)
  g.add(face)
  return g
}
