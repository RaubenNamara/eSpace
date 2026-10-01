import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { makeScreenLabel } from './lab3d/labRoom'

/**
 * Builds one piece of lab apparatus for the free-layout engine (VirtualLabScene) and the teacher
 * layout editor. Scale: 1 scene unit = 20 cm, bench top at y = 0. Models are procedural, using
 * physically-based materials that pick up the lab room's environment reflections.
 *
 * Sub-meshes that the engine animates are tagged with `userData.role` (liquid, flame, led, lever,
 * needle, spring_body, spring_hanger, voltage, balance_display, stopwatch_display, label) - their
 * positions and pivots are part of that contract, so keep them when changing a model.
 */

// Plain alpha transparency rather than `transmission`: transmission re-renders the whole scene every
// frame, far too slow on school laptops.
const glass = (color = 0xf1f6f5) => new THREE.MeshPhysicalMaterial({
  color, transparent: true, opacity: 0.28, roughness: 0.05, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08,
  side: THREE.DoubleSide, depthWrite: false,
})
const solid = (color: number) => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.15 })
const metal = (color = 0xc7ccd1) => new THREE.MeshStandardMaterial({ color, roughness: 0.28, metalness: 1 })
const chrome = () => new THREE.MeshStandardMaterial({ color: 0xe6e9ec, roughness: 0.12, metalness: 1 })
const brass = () => new THREE.MeshStandardMaterial({ color: 0xd4a84b, roughness: 0.22, metalness: 1 })
const plastic = (color: number) => new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.05 })
const enamel = (color: number) => new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.1 })
const wood = () => new THREE.MeshStandardMaterial({ color: 0x9a6841, roughness: 0.7 })

const rbox = (w: number, h: number, d: number, r = Math.min(w, h, d) * 0.12) => new RoundedBoxGeometry(w, h, d, 3, r)

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material | THREE.Material[], x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(x, y, z)
  return m
}

function canvasTex(w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  draw(canvas.getContext('2d')!, w, h)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 16
  return texture
}

/** Brass terminal post with a coloured insulating cap (red +, black -). */
function terminal(x: number, y: number, z: number, cap: number): THREE.Group {
  const g = new THREE.Group()
  g.add(mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.05, 16), brass(), 0, 0.025, 0))
  g.add(mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.03, 16), plastic(cap), 0, 0.06, 0))
  g.position.set(x, y, z)
  return g
}

// Built once at a fixed max height, then shown/hidden by scaling Y - this is what lets
// VirtualLabScene rescale it live as the student actually pours (real volume tracking).
function liquidMesh(radius: number, height: number, color: string, fillRatio = 0.55): THREE.Mesh {
  const maxFillHeight = height * 0.85
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.9, radius * 0.9, maxFillHeight, 40),
    new THREE.MeshStandardMaterial({ color, roughness: 0.1, metalness: 0, transparent: true, opacity: 0.8 }),
  )
  const f = Math.max(0.001, fillRatio)
  m.scale.y = f
  m.position.y = (maxFillHeight * f) / 2
  m.userData.role = 'liquid'
  m.userData.maxFillHeight = maxFillHeight
  return m
}

/** Printed white graduations on a glass wall (major/minor ticks facing the viewer). */
function graduations(radius: number, bottom: number, height: number, majors: number): THREE.Mesh {
  const tex = canvasTex(64, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#ffffff'
    const steps = majors * 5
    for (let i = 1; i <= steps; i++) {
      const y = h - (i / (steps + 1)) * h
      ctx.fillRect(0, y, i % 5 === 0 ? 44 : 24, i % 5 === 0 ? 4 : 2)
    }
  })
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 1.004, radius * 1.004, height, 32, 1, true, -0.35, 0.7),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.85 }),
  )
  m.position.y = bottom + height / 2
  return m
}

function labelSprite(text: string): THREE.Sprite {
  const tex = canvasTex(512, 112, (ctx) => {
    ctx.fillStyle = 'rgba(15,23,42,0.82)'
    ctx.beginPath(); ctx.roundRect(4, 12, 504, 88, 44); ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 46px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 256, 58)
  })
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }))
  sprite.scale.set(0.72, 0.158, 1)
  sprite.renderOrder = 10
  sprite.userData.role = 'label'
  // Name tags are display only - never let one catch a click meant for the apparatus behind it
  sprite.raycast = () => {}
  return sprite
}

/** A real analogue meter face: tick marks around a sweep, a couple of numbers, and the unit letter. */
function gaugeTexture(unitLabel: string, accent: string): THREE.CanvasTexture {
  return canvasTex(512, 512, (ctx, size) => {
    const cx = size / 2, cy = size / 2, r = size / 2 - 6
    ctx.fillStyle = '#f8fafc'
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()
    const startAngle = Math.PI * 0.72
    const sweep = Math.PI * 1.56
    ctx.strokeStyle = '#334155'
    for (let i = 0; i <= 50; i++) {
      const a = startAngle + (i / 50) * sweep
      const major = i % 10 === 0
      ctx.lineWidth = major ? 4 : 1.5
      const inner = major ? r - 48 : i % 5 === 0 ? r - 36 : r - 28
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner)
      ctx.lineTo(cx + Math.cos(a) * (r - 16), cy + Math.sin(a) * (r - 16))
      ctx.stroke()
    }
    ctx.fillStyle = '#0f172a'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = 0; i <= 10; i++) {
      const a = startAngle + (i / 10) * sweep
      ctx.font = `900 ${i % 5 === 0 ? 50 : 36}px Arial, sans-serif`
      ctx.fillText(String(i), cx + Math.cos(a) * (r - 82), cy + Math.sin(a) * (r - 82))
    }
    ctx.fillStyle = accent
    ctx.font = 'bold 84px serif'
    ctx.fillText(unitLabel, cx, cy + r * 0.42)
  })
}

/** A small pill sprite showing the battery's chosen voltage, regenerated whenever it changes. */
export function voltageSpriteTexture(volts: number): THREE.CanvasTexture {
  return canvasTex(480, 192, (ctx) => {
    ctx.scale(3, 3)
    ctx.fillStyle = 'rgba(21,128,61,0.92)'
    ctx.beginPath(); ctx.roundRect(0, 8, 160, 48, 12); ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 26px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${volts}V`, 80, 32)
  })
}

/** A small LCD-style readout, reused for the balance's mass display and the stopwatch's clock face. */
export function digitalDisplayTexture(text: string, accent = '#22c55e'): THREE.CanvasTexture {
  return canvasTex(600, 270, (ctx) => {
    ctx.scale(3, 3)
    ctx.fillStyle = '#0f172a'
    ctx.beginPath(); ctx.roundRect(0, 0, 200, 90, 10); ctx.fill()
    ctx.fillStyle = accent
    ctx.font = 'bold 34px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 100, 47)
  })
}

/** A linear ruler face - tick marks every cm with numbers every 5cm, printed on a canvas texture. */
function rulerTexture(): THREE.CanvasTexture {
  return canvasTex(1024, 160, (ctx, w, h) => {
    ctx.fillStyle = '#facc15'
    ctx.fillRect(0, 0, w, h)
    const marginX = 20
    const usable = w - marginX * 2
    const cm = 30
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#000000'
    ctx.lineWidth = 2
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    for (let i = 0; i <= cm; i++) {
      const x = marginX + (i / cm) * usable
      const major = i % 5 === 0
      const tickH = major ? 55 : 30
      ctx.lineWidth = major ? 3 : 1.5
      ctx.beginPath()
      ctx.moveTo(x, 10)
      ctx.lineTo(x, 10 + tickH)
      ctx.stroke()
      if (major) ctx.fillText(String(i), x, 100)
    }
    ctx.strokeStyle = '#a16207'
    ctx.lineWidth = 2
    ctx.strokeRect(4, 4, w - 8, h - 8)
  })
}

/** A protractor face - degree ticks every 10deg (numbered every 30deg) around a semicircle, plus a
 *  crosshair at the centre so the student can see exactly what has to align with the ray. */
function protractorTexture(): THREE.CanvasTexture {
  return canvasTex(512, 276, (ctx, size) => {
    const cx = size / 2, cy = size / 2 + 10, r = size / 2 - 10
    ctx.fillStyle = 'rgba(251,146,60,0.96)'
    ctx.beginPath()
    ctx.arc(cx, cy, r, Math.PI, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.stroke()
    for (let deg = 0; deg <= 180; deg += 10) {
      const a = Math.PI + (deg / 180) * Math.PI
      const major = deg % 30 === 0
      const inner = major ? r - 26 : r - 14
      ctx.lineWidth = major ? 3 : 1.5
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner)
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
      ctx.stroke()
      if (major) {
        ctx.fillStyle = '#000000'
        ctx.font = 'bold 16px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(String(deg), cx + Math.cos(a) * (r - 42), cy + Math.sin(a) * (r - 42))
      }
    }
    ctx.strokeStyle = '#1d4ed8'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(cx - 10, cy); ctx.lineTo(cx + 10, cy)
    ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy + 2)
    ctx.stroke()
  })
}

// Standard 4-band resistor colour code derived from the actual resistance value.
const RESISTOR_DIGIT_COLORS = ['#1a1a1a', '#7c4a1e', '#dc2626', '#f97316', '#eab308', '#16a34a', '#2563eb', '#7c3aed', '#6b7280', '#f8fafc']
function resistorBandColors(ohms: number): string[] {
  const value = Math.max(1, Math.round(ohms || 10))
  const digits = String(value)
  const d1 = parseInt(digits[0] ?? '1', 10)
  const d2 = parseInt(digits[1] ?? '0', 10)
  const multiplier = Math.min(9, Math.max(0, digits.length - 2))
  return [RESISTOR_DIGIT_COLORS[d1], RESISTOR_DIGIT_COLORS[d2], RESISTOR_DIGIT_COLORS[multiplier], '#d4af37']
}

class Helix extends THREE.Curve<THREE.Vector3> {
  constructor(private length: number, private radius: number, private turns: number) { super() }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = t * this.turns * Math.PI * 2
    return target.set(this.radius * Math.cos(a), (t - 0.5) * this.length, this.radius * Math.sin(a))
  }
}

export function createObjectMesh(objectType: string, key: string, displayName: string, props: Record<string, any> = {}): THREE.Group {
  const group = new THREE.Group()
  group.userData.objectKey = key
  group.userData.objectType = objectType
  const add = (...objs: THREE.Object3D[]) => group.add(...objs)

  switch (objectType) {
    case 'beaker': {
      const r = 0.35, h = 0.6
      const profile = [
        new THREE.Vector2(0, 0.004), new THREE.Vector2(r * 0.86, 0.004), new THREE.Vector2(r * 0.9, 0.03),
        new THREE.Vector2(r * 0.97, h - 0.02), new THREE.Vector2(r * 1.02, h), new THREE.Vector2(r * 1.04, h + 0.012),
      ]
      add(new THREE.Mesh(new THREE.LatheGeometry(profile, 48), glass()))
      const spout = mesh(new THREE.ConeGeometry(0.045, 0.07, 3), glass(), r * 1.0, h - 0.015, 0)
      spout.rotation.z = -Math.PI / 2
      add(spout, graduations(r * 0.95, 0.06, h * 0.72, 4), liquidMesh(r, h, props.color || '#a9d6e5'))
      break
    }
    case 'test_tube': {
      const r = 0.12, h = 0.55
      const wall = mesh(new THREE.CylinderGeometry(r, r, h, 32, 1, true), glass(), 0, h / 2 + 0.1)
      const bottom = mesh(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), glass(), 0, 0.1)
      bottom.rotation.x = Math.PI
      const lip = mesh(new THREE.TorusGeometry(r * 1.02, 0.012, 10, 32), glass(), 0, h + 0.1)
      lip.rotation.x = Math.PI / 2
      // Small wooden foot so a lone tube stands upright on the bench
      const foot = mesh(rbox(0.34, 0.08, 0.34, 0.02), wood(), 0, 0.04)
      add(wall, bottom, lip, foot, liquidMesh(r, h, props.color || '#cfe8f3', 0.4))
      break
    }
    case 'burette': {
      const r = 0.06, h = 1.1
      const wall = mesh(new THREE.CylinderGeometry(r, r, h, 32, 1, true), glass(), 0, h / 2 + 0.15)
      const stopcock = mesh(new THREE.CylinderGeometry(r * 1.25, r * 1.25, 0.1, 24), glass(0xeef6ff), 0, 0.1)
      const key_ = mesh(rbox(0.16, 0.03, 0.035, 0.012), plastic(0x1d4ed8), 0.09, 0.1)
      const tip = mesh(new THREE.CylinderGeometry(0.03, 0.01, 0.1, 16, 1, true), glass(), 0, 0.02)
      const foot = mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.04, 32), enamel(0x2f4b63), 0, 0.02)
      add(wall, stopcock, key_, tip, foot, graduations(r, 0.2, h * 0.85, 10), liquidMesh(r, h, props.color || '#eaf6ff', 0.7))
      break
    }
    case 'pipette': {
      const stemLower = mesh(new THREE.CylinderGeometry(0.018, 0.008, 0.3, 16), glass(), 0, 0.2)
      const bulb = mesh(new THREE.SphereGeometry(0.055, 24, 16), glass(), 0, 0.42)
      bulb.scale.y = 1.8
      const stemUpper = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.3, 16), glass(), 0, 0.68)
      const mark = mesh(new THREE.TorusGeometry(0.02, 0.003, 6, 20), new THREE.MeshBasicMaterial({ color: 0x111827 }), 0, 0.74)
      mark.rotation.x = Math.PI / 2
      const filler = mesh(new THREE.SphereGeometry(0.075, 24, 16), plastic(0xb91c1c), 0, 0.9)
      filler.scale.y = 1.25
      const rack = mesh(rbox(0.22, 0.07, 0.18, 0.02), wood(), 0, 0.035)
      add(stemLower, bulb, stemUpper, mark, filler, rack)
      break
    }
    case 'measuring_cylinder': {
      const r = 0.18, h = 0.8
      const wall = mesh(new THREE.CylinderGeometry(r, r * 0.95, h, 40, 1, true), glass(), 0, h / 2 + 0.04)
      const base = mesh(new THREE.CylinderGeometry(r * 1.6, r * 1.7, 0.05, 6), glass(0xe8f1f5), 0, 0.025)
      const spout = mesh(new THREE.ConeGeometry(0.035, 0.06, 3), glass(), r, h + 0.03, 0)
      spout.rotation.z = -Math.PI / 2
      add(wall, base, spout, graduations(r * 0.97, 0.12, h * 0.8, 5), liquidMesh(r, h, props.color || '#cfe8f3', 0.5))
      break
    }
    case 'bunsen_burner': {
      // Blue cast cone base, knurled air-regulator collar, chrome chimney, side gas inlet
      const blue = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.45, metalness: 0.2 })
      const baseProfile = [
        new THREE.Vector2(0, 0.005), new THREE.Vector2(0.27, 0.005), new THREE.Vector2(0.272, 0.018),
        new THREE.Vector2(0.2, 0.05), new THREE.Vector2(0.11, 0.1), new THREE.Vector2(0.075, 0.13), new THREE.Vector2(0, 0.13),
      ]
      const base = new THREE.Mesh(new THREE.LatheGeometry(baseProfile, 56), blue)
      const neck = mesh(new THREE.CylinderGeometry(0.068, 0.07, 0.11, 36), blue, 0, 0.175)
      const knurlTex = canvasTex(128, 16, (ctx, w, h) => {
        ctx.fillStyle = '#d4d4d8'; ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = '#71717a'
        for (let x = 0; x < w; x += 4) ctx.fillRect(x, 0, 1.5, h)
      })
      knurlTex.wrapS = THREE.RepeatWrapping
      knurlTex.repeat.set(3, 1)
      const collar = mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.075, 40), new THREE.MeshStandardMaterial({ map: knurlTex, roughness: 0.3, metalness: 1 }), 0, 0.268)
      const nut = mesh(new THREE.CylinderGeometry(0.066, 0.066, 0.03, 6), chrome(), 0, 0.32)
      const ring = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.012, 40), chrome(), 0, 0.341)
      const barrel = mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.28, 36, 1, true), chrome(), 0, 0.485)
      const bore = mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.004, 28), new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.8 }), 0, 0.6)
      const lip = mesh(new THREE.TorusGeometry(0.046, 0.004, 8, 32), chrome(), 0, 0.625)
      lip.rotation.x = Math.PI / 2
      // Gas inlet: chrome tube from the neck, ridged hose barb at the end
      const inlet = new THREE.Group()
      const tube = mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.2, 24), chrome(), 0, 0.1)
      inlet.add(tube)
      for (let i = 0; i < 3; i++) inlet.add(mesh(new THREE.CylinderGeometry(0.03, 0.036, 0.025, 24), chrome(), 0, 0.215 + i * 0.03))
      inlet.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.004, 20), new THREE.MeshStandardMaterial({ color: 0x27272a }), 0, 0.29))
      inlet.rotation.z = Math.PI / 2 + 0.12
      inlet.position.set(-0.05, 0.16, 0)
      add(base, neck, collar, nut, ring, barrel, bore, lip, inlet)
      const on = props.flame === 'on'
      const outerFlame = mesh(
        new THREE.ConeGeometry(0.09, 0.3, 24),
        new THREE.MeshStandardMaterial({ color: 0xff9d3d, emissive: 0xff6a00, emissiveIntensity: on ? 1 : 0, transparent: true, opacity: on ? 0.75 : 0, depthWrite: false }),
        0, 0.77,
      )
      outerFlame.userData.role = 'flame'
      const innerFlame = mesh(
        new THREE.ConeGeometry(0.045, 0.16, 16),
        new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x2563eb, emissiveIntensity: on ? 1.3 : 0, transparent: true, opacity: on ? 0.85 : 0, depthWrite: false }),
        0, 0.7,
      )
      innerFlame.userData.role = 'flame'
      add(outerFlame, innerFlame)
      break
    }
    case 'thermometer': {
      // 0-100 °C scale: a tick every 2 °C, numbers every 10 °C
      const scale = canvasTex(256, 1690, (ctx, w, h) => {
        ctx.fillStyle = '#fbfbf8'; ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = '#0f172a'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        const bottom = h - 250, span = h - 400
        for (let c = 0; c <= 100; c += 2) {
          const y = bottom - (c / 100) * span
          const ten = c % 10 === 0
          ctx.fillRect(w - (ten ? 90 : 50), y - (ten ? 3 : 1.5), ten ? 90 : 50, ten ? 6 : 3)
          if (ten) {
            ctx.font = `900 ${c % 50 === 0 ? 62 : 52}px Arial, sans-serif`
            ctx.fillText(String(c), 10, y)
          }
        }
        ctx.font = '700 44px Arial, sans-serif'
        ctx.fillText('°C', 14, bottom - span - 70)
      })
      const backing = mesh(rbox(0.1, 0.66, 0.02, 0.008), new THREE.MeshStandardMaterial({ map: scale, roughness: 0.5 }), 0, 0.45, -0.025)
      const stem = mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.62, 24), glass(0xffffff), 0, 0.45)
      const mercury = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.45, 12), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2 }), 0, 0.32)
      const bulb = mesh(new THREE.SphereGeometry(0.05, 24, 24), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2 }), 0, 0.1)
      const bulbGlass = mesh(new THREE.SphereGeometry(0.065, 24, 24), glass(0xffffff), 0, 0.1)
      const stand = mesh(rbox(0.26, 0.04, 0.2, 0.015), enamel(0x2f4b63), 0, 0.02)
      add(backing, stem, mercury, bulb, bulbGlass, stand)
      // Screen-size °C numbers beside the scale (0, 50, 100 always; 25 and 75 when there's room)
      const tempY = (c: number) => 0.78 - ((1440 - c * 12.9) / 1690) * 0.66
      let lastMajor: THREE.Sprite | undefined
      for (const c of [0, 25, 50, 75, 100]) {
        const label = makeScreenLabel(`${c}°`, 12, c % 50 === 0 ? undefined : lastMajor)
        label.center.set(0, 0.5)
        label.position.set(0.065, tempY(c), -0.02)
        add(label)
        if (c % 50 === 0) lastMajor = label
      }
      break
    }
    case 'battery': {
      const label = canvasTex(512, 256, (ctx, w, h) => {
        ctx.fillStyle = '#111827'; ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = '#dc2626'; ctx.fillRect(0, h * 0.62, w, h * 0.18)
        ctx.fillStyle = '#fde68a'; ctx.font = 'bold 96px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(`${props.voltage || 6} V`, w / 2, h * 0.34)
        ctx.fillStyle = '#e5e7eb'; ctx.font = 'bold 30px Arial'; ctx.fillText('DC SUPPLY', w / 2, h * 0.9)
      })
      const sideMat = plastic(0x1f2937)
      const body = mesh(rbox(0.6, 0.3, 0.3, 0.035), [sideMat, sideMat, sideMat, sideMat, new THREE.MeshStandardMaterial({ map: label, roughness: 0.5 }), sideMat], 0, 0.15)
      const plus = terminal(0.2, 0.3, 0, 0xdc2626)
      const minus = terminal(-0.2, 0.3, 0, 0x111111)
      const voltage = new THREE.Sprite(new THREE.SpriteMaterial({ map: voltageSpriteTexture(props.voltage || 6), depthTest: false, transparent: true }))
      voltage.scale.set(0.34, 0.136, 1)
      voltage.position.set(0, 0.58, 0)
      voltage.renderOrder = 9
      voltage.userData.role = 'voltage'
      add(body, plus, minus, voltage)
      break
    }
    case 'ruler': {
      const w = 1.5, d = 0.16
      const edge = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.6 })
      const face = new THREE.MeshStandardMaterial({ map: rulerTexture(), roughness: 0.55 })
      add(mesh(new THREE.BoxGeometry(w, 0.015, d), [edge, edge, face, edge, edge, edge], 0, 0.0075))
      break
    }
    case 'bulb': {
      const on = props.state === 'on'
      const glassBulb = mesh(
        new THREE.SphereGeometry(0.18, 32, 32),
        new THREE.MeshPhysicalMaterial({ color: 0xfff9e8, transparent: true, opacity: 0.35, roughness: 0.05, clearcoat: 0.8, emissive: on ? 0xffe066 : 0x000000, emissiveIntensity: on ? 1.3 : 0, depthWrite: false }),
        0, 0.37,
      )
      glassBulb.userData.role = 'led'
      const filament = mesh(
        new THREE.TorusGeometry(0.05, 0.006, 8, 24, Math.PI * 1.7),
        new THREE.MeshStandardMaterial({ color: 0x44403c, emissive: on ? 0xffcc55 : 0x000000, emissiveIntensity: on ? 2 : 0 }),
        0, 0.34,
      )
      filament.rotation.x = Math.PI / 2
      filament.userData.role = 'led'
      const socket = mesh(new THREE.CylinderGeometry(0.095, 0.11, 0.16, 24), brass(), 0, 0.12)
      const threads = new THREE.Group()
      for (let i = 0; i < 5; i++) {
        const thread = mesh(new THREE.TorusGeometry(0.1, 0.006, 6, 24), brass(), 0, 0.06 + i * 0.028)
        thread.rotation.x = Math.PI / 2
        threads.add(thread)
      }
      const holder = mesh(rbox(0.4, 0.04, 0.26, 0.015), wood(), 0, 0.02)
      add(glassBulb, filament, socket, threads, holder, terminal(-0.15, 0.04, 0.07, 0xdc2626), terminal(0.15, 0.04, 0.07, 0x111111))
      break
    }
    case 'switch': {
      const base = mesh(rbox(0.4, 0.06, 0.2, 0.012), wood(), 0, 0.03)
      const postA = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 16), brass(), -0.12, 0.11)
      const postB = mesh(rbox(0.05, 0.06, 0.05, 0.008), brass(), 0.12, 0.09)
      const lever = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.24, 16), chrome())
      const closed = props.state === 'closed'
      lever.position.set(closed ? 0 : -0.06, 0.16, 0)
      lever.rotation.z = closed ? Math.PI / 2 - 0.35 : Math.PI / 2 - 0.9
      lever.userData.role = 'lever'
      // Insulated handle rides on the lever's free end
      lever.add(mesh(new THREE.SphereGeometry(0.028, 16, 12), plastic(0x111111), 0, -0.13, 0))
      add(base, postA, postB, lever)
      break
    }
    case 'resistor': {
      const bandsTex = canvasTex(256, 64, (ctx, w, h) => {
        ctx.fillStyle = '#d9c6a1'; ctx.fillRect(0, 0, w, h)
        resistorBandColors(props.resistance_ohm).forEach((c, i) => {
          ctx.fillStyle = c
          ctx.fillRect(60 + i * 34 + (i === 3 ? 22 : 0), 0, 16, h)
        })
      })
      const body = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.32, 32), new THREE.MeshStandardMaterial({ map: bandsTex, roughness: 0.45 }), 0, 0.2)
      body.rotation.z = Math.PI / 2
      const lead = mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.52, 10), metal(0xd4d4d8), 0, 0.2)
      lead.rotation.z = Math.PI / 2
      const base = mesh(rbox(0.6, 0.04, 0.2, 0.012), plastic(0xe7dcc4), 0, 0.02)
      const post1 = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.16, 10), metal(0xd4d4d8), -0.26, 0.12)
      const post2 = post1.clone()
      post2.position.x = 0.26
      add(body, lead, base, post1, post2)
      break
    }
    case 'ammeter':
    case 'voltmeter': {
      const isAmmeter = objectType === 'ammeter'
      const box = mesh(rbox(0.42, 0.4, 0.18, 0.03), enamel(isAmmeter ? 0x1e3a8a : 0x7f1d1d), 0, 0.2)
      const bezel = mesh(new THREE.TorusGeometry(0.155, 0.015, 12, 48), chrome(), 0, 0.2, 0.091)
      const dial = mesh(
        new THREE.CircleGeometry(0.15, 48),
        new THREE.MeshStandardMaterial({ map: gaugeTexture(isAmmeter ? 'A' : 'V', isAmmeter ? '#1d4ed8' : '#b91c1c'), roughness: 0.4 }),
        0, 0.2, 0.092,
      )
      const needle = mesh(new THREE.ConeGeometry(0.012, 0.13, 8), solid(0xdc2626), 0.02, 0.2, 0.1)
      needle.rotation.z = -Math.PI / 2 + 0.6
      needle.userData.role = 'needle'
      const pivot = mesh(new THREE.SphereGeometry(0.014, 12, 12), metal(0x27272a), 0, 0.2, 0.1)
      add(box, bezel, dial, needle, pivot, terminal(-0.12, 0.4, 0, 0xdc2626), terminal(0.12, 0.4, 0, 0x111111))
      break
    }
    case 'microscope': {
      const white = enamel(0xeef0f2)
      const black = enamel(0x1f2328)
      add(mesh(rbox(0.36, 0.06, 0.47, 0.02), white, 0, 0.03, -0.05))
      add(mesh(rbox(0.1, 0.28, 0.1, 0.02), white, 0, 0.19, -0.22))
      const armCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.27, -0.23), new THREE.Vector3(0, 0.55, -0.23), new THREE.Vector3(0, 0.74, -0.14), new THREE.Vector3(0, 0.8, -0.03),
      ])
      add(new THREE.Mesh(new THREE.TubeGeometry(armCurve, 24, 0.044, 12, false), white))
      const lamp = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.01, 24), new THREE.MeshStandardMaterial({ color: 0xfff7d6, emissive: 0xfacc15, emissiveIntensity: 0 }), 0, 0.105)
      lamp.userData.role = 'led'
      add(mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.05, 24), black, 0, 0.085), lamp)
      add(mesh(rbox(0.3, 0.022, 0.28, 0.006), black, 0, 0.32))
      for (const x of [-0.08, 0.08]) add(mesh(new THREE.BoxGeometry(0.016, 0.004, 0.11), chrome(), x, 0.333, 0.03))
      add(mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.25, 24), black, 0, 0.7))
      add(mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.11, 24), black, 0, 0.88))
      add(mesh(new THREE.CylinderGeometry(0.056, 0.06, 0.033, 32), chrome(), 0, 0.565))
      ;[0xdc2626, 0xeab308, 0x2563eb].forEach((c, i) => {
        const holder = new THREE.Group()
        holder.position.y = 0.55
        holder.rotation.y = (2 * Math.PI * i) / 3
        const obj = new THREE.Group()
        obj.position.z = 0.03
        obj.rotation.x = 0.35
        obj.add(mesh(new THREE.CylinderGeometry(0.015, 0.012, 0.07 + i * 0.015, 16), chrome(), 0, -0.04 - i * 0.008))
        obj.add(mesh(new THREE.CylinderGeometry(0.0158, 0.0158, 0.008, 16), plastic(c), 0, -0.03))
        holder.add(obj)
        add(holder)
      })
      for (const s of [-1, 1]) {
        const coarse = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.028, 24), black, s * 0.08, 0.25, -0.22)
        coarse.rotation.z = Math.PI / 2
        const fine = mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.028, 20), black, s * 0.11, 0.25, -0.22)
        fine.rotation.z = Math.PI / 2
        add(coarse, fine)
      }
      break
    }
    case 'lens': {
      const lens = mesh(new THREE.SphereGeometry(0.22, 40, 40), glass(0xf3f8ff), 0, 0.42)
      lens.scale.set(1, 1, 0.22)
      const rim = mesh(new THREE.TorusGeometry(0.22, 0.02, 16, 48), metal(0x9ca3af), 0, 0.42)
      const rod = mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2, 12), metal(), 0, 0.1)
      const base = mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.03, 32), enamel(0x2f4b63), 0, 0.015)
      add(lens, rim, rod, base)
      break
    }
    case 'mirror': {
      const face = mesh(rbox(0.4, 0.5, 0.02, 0.006), [
        metal(0x475569), metal(0x475569), metal(0x475569), metal(0x475569),
        new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.03 }), metal(0x475569),
      ], 0, 0.3, 0)
      const holder = mesh(rbox(0.36, 0.06, 0.12, 0.012), wood(), 0, 0.03, -0.02)
      add(face, holder)
      break
    }
    case 'biological_model': {
      const slide = mesh(new THREE.BoxGeometry(0.5, 0.012, 0.18), glass(0xe0f2fe), 0, 0.006)
      const coverslip = mesh(new THREE.BoxGeometry(0.14, 0.003, 0.14), glass(0xf1f6f5), 0, 0.014)
      const specimen = mesh(new THREE.CircleGeometry(0.045, 32), new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.5, transparent: true, opacity: 0.8 }), 0, 0.0135)
      specimen.rotation.x = -Math.PI / 2
      const labelM = mesh(new THREE.BoxGeometry(0.12, 0.014, 0.17), plastic(0xf8fafc), -0.18, 0.007)
      add(slide, coverslip, specimen, labelM)
      break
    }
    case 'wire': {
      const coil = new THREE.Mesh(new THREE.TubeGeometry(new Helix(0.12, 0.15, 5), 240, 0.012, 8, false), new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.3, metalness: 1 }))
      coil.position.y = 0.08
      const spool = mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.14, 24), plastic(0x374151), 0, 0.08)
      add(spool, coil)
      break
    }
    case 'water_container': {
      const r = 0.3, h = 0.75
      const wall = mesh(new THREE.CylinderGeometry(r * 0.85, r, h, 48, 1, true), glass(), 0, h / 2)
      const bottom = mesh(new THREE.CircleGeometry(r, 48), glass(), 0, 0.003)
      bottom.rotation.x = -Math.PI / 2
      const handle = mesh(new THREE.TorusGeometry(0.14, 0.02, 12, 32, Math.PI * 1.3), glass(), r * 0.85, h * 0.6)
      handle.rotation.z = Math.PI / 2
      add(wall, bottom, handle, liquidMesh(r * 0.9, h, props.color || '#a5d8ff', 0.8))
      break
    }
    // A generic measurable object - its real length drives what a ruler reads, at the ruler's own
    // scale (1.5 units = 30 cm), so the two are always visually consistent.
    case 'specimen': {
      const lengthCm = props.length_cm ?? 12
      const lengthUnits = Math.max(0.15, lengthCm * 0.05)
      const rod = mesh(new THREE.CylinderGeometry(0.025, 0.025, lengthUnits, 24), metal(0x9ca3af), 0, 0.025)
      rod.rotation.z = Math.PI / 2
      const capA = mesh(new THREE.SphereGeometry(0.025, 16, 16), metal(0x71717a), -lengthUnits / 2, 0.025)
      const capB = capA.clone()
      capB.position.x = lengthUnits / 2
      add(rod, capA, capB)
      break
    }
    case 'balance': {
      const body = mesh(rbox(0.55, 0.1, 0.42, 0.03), enamel(0xe5e7eb), 0, 0.05)
      const pan = mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.015, 40), chrome(), 0, 0.11, 0.02)
      const panPost = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16), metal(), 0, 0.1, 0.02)
      const panel = mesh(rbox(0.3, 0.07, 0.05, 0.012), plastic(0x1f2937), 0, 0.07, 0.2)
      const display = new THREE.Sprite(new THREE.SpriteMaterial({ map: digitalDisplayTexture('0.0 g'), depthTest: false, transparent: true }))
      display.scale.set(0.3, 0.135, 1)
      display.position.set(0, 0.24, 0.2)
      display.renderOrder = 9
      display.userData.role = 'balance_display'
      add(body, pan, panPost, panel, display)
      break
    }
    case 'stopwatch': {
      const body = mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.045, 48), enamel(0x1f2937), 0, 0.16)
      body.rotation.x = Math.PI / 2
      const rim = mesh(new THREE.TorusGeometry(0.13, 0.01, 10, 48), chrome(), 0, 0.16)
      const crown = mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.04, 16), chrome(), 0, 0.305)
      const ring = mesh(new THREE.TorusGeometry(0.025, 0.006, 8, 20), chrome(), 0, 0.34)
      const stand = mesh(rbox(0.18, 0.03, 0.12, 0.01), plastic(0x374151), 0, 0.015)
      const display = new THREE.Sprite(new THREE.SpriteMaterial({ map: digitalDisplayTexture('00:00.0'), depthTest: false, transparent: true }))
      display.scale.set(0.2, 0.09, 1)
      display.position.set(0, 0.16, 0.03)
      display.renderOrder = 9
      display.userData.role = 'stopwatch_display'
      add(body, rim, crown, ring, stand, display)
      break
    }
    // The coil is built at its maximum stretch and scaled by the engine as the real load changes;
    // the geometry is centred so the hook-at-0.85 positioning stays exact.
    case 'spring': {
      const naturalCm = props.natural_length_cm ?? 15
      const maxSafeCm = props.max_safe_extension_cm ?? 12
      const naturalUnits = naturalCm * 0.05
      const maxUnits = (naturalCm + maxSafeCm * 1.6) * 0.05
      const coil = new THREE.Mesh(
        new THREE.TubeGeometry(new Helix(maxUnits, 0.05, 22), 440, 0.007, 6, false),
        new THREE.MeshStandardMaterial({ color: 0xc7ccd1, roughness: 0.25, metalness: 1 }),
      )
      coil.userData.role = 'spring_body'
      coil.userData.naturalLengthUnits = naturalUnits
      coil.userData.maxLengthUnits = maxUnits
      coil.scale.y = naturalUnits / maxUnits
      coil.position.y = 0.85 - (maxUnits * coil.scale.y) / 2
      const hook = mesh(new THREE.TorusGeometry(0.03, 0.008, 8, 20), metal(0x71717a), 0, 0.85)
      const hanger = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 24), metal(0x52525b))
      hanger.userData.role = 'spring_hanger'
      hanger.position.y = 0.85 - maxUnits * coil.scale.y
      add(coil, hook, hanger)
      break
    }
    case 'retort_stand': {
      const castIron = enamel(0x2f4b63)
      add(mesh(rbox(0.36, 0.035, 0.24, 0.012), castIron, 0, 0.0175))
      add(mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.95, 20), metal(), -0.13, 0.5))
      add(mesh(rbox(0.07, 0.07, 0.07, 0.01), castIron, -0.13, 0.9))
      const screw = mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.07, 10), metal(), -0.13, 0.9, 0.06)
      screw.rotation.x = Math.PI / 2
      const arm = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 16), metal(), 0.03, 0.9)
      arm.rotation.z = Math.PI / 2
      add(screw, arm, mesh(rbox(0.04, 0.05, 0.05, 0.008), brass(), 0.17, 0.9))
      break
    }
    case 'mass_piece': {
      const massG = props.mass_g ?? 50
      const r = 0.05 + Math.min(0.05, massG / 4000)
      const h = 0.04 + Math.min(0.06, massG / 3000)
      const top = canvasTex(256, 256, (ctx, w) => {
        ctx.fillStyle = '#4a525c'; ctx.fillRect(0, 0, w, w)
        ctx.fillStyle = '#1f2328'
        ctx.beginPath(); ctx.arc(w / 2, w / 2, 22, 0, Math.PI * 2); ctx.fill()
        ctx.fillRect(w / 2 - 9, w / 2, 18, w / 2)
        ctx.fillStyle = '#f1f5f9'; ctx.font = 'bold 58px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(`${massG}g`, w / 2, w / 2 - 62)
      })
      const side = enamel(0x4a525c)
      side.metalness = 0.5
      add(mesh(new THREE.CylinderGeometry(r, r, h, 36), [side, new THREE.MeshStandardMaterial({ map: top, metalness: 0.4, roughness: 0.5 }), side], 0, h / 2))
      break
    }
    case 'ray_box': {
      const on = props.state === 'on'
      const body = mesh(rbox(0.35, 0.22, 0.28, 0.03), enamel(0x1f2937), 0, 0.11)
      const plate = mesh(new THREE.BoxGeometry(0.2, 0.16, 0.012), plastic(0x0f172a), 0, 0.11, 0.145)
      const emitter = mesh(
        new THREE.BoxGeometry(0.02, 0.12, 0.02),
        new THREE.MeshStandardMaterial({ color: 0xfde68a, emissive: 0xf59e0b, emissiveIntensity: on ? 1.4 : 0 }),
        0, 0.11, 0.152,
      )
      emitter.userData.role = 'led'
      const cable = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 10), plastic(0x111827), 0, 0.03, -0.29)
      cable.rotation.x = Math.PI / 2
      add(body, plate, emitter, cable)
      break
    }
    case 'glass_block': {
      const widthUnits = (props.width_cm ?? 5) * 0.05
      add(mesh(rbox(widthUnits, 0.1, 0.55, 0.01), glass(0xdff0ff), 0, 0.05))
      break
    }
    case 'projectile_launcher': {
      const dark = new THREE.MeshStandardMaterial({ color: 0x2d333b, metalness: 0.6, roughness: 0.4 })
      add(mesh(rbox(0.5, 0.05, 0.36, 0.015), dark, 0, 0.025))
      for (const z of [-0.09, 0.09]) add(mesh(rbox(0.1, 0.22, 0.02, 0.006), dark, 0, 0.14, z))
      const pivot = new THREE.Group()
      pivot.position.y = 0.22
      pivot.rotation.z = Math.PI / 4
      const barrel = mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.45, 28), new THREE.MeshStandardMaterial({ color: 0x1d4ed8, metalness: 0.5, roughness: 0.35 }), 0.17, 0)
      barrel.rotation.z = -Math.PI / 2
      const muzzle = mesh(new THREE.TorusGeometry(0.053, 0.011, 12, 28), chrome(), 0.39, 0)
      muzzle.rotation.y = Math.PI / 2
      const axle = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.22, 16), metal())
      axle.rotation.x = Math.PI / 2
      pivot.add(barrel, muzzle, axle)
      add(pivot)
      break
    }
    case 'projectile': {
      add(mesh(new THREE.TorusGeometry(0.05, 0.012, 10, 28), plastic(0x374151), 0, 0.012))
      add(mesh(new THREE.SphereGeometry(0.07, 32, 20), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 }), 0, 0.07))
      ;(group.children[0] as THREE.Mesh).rotation.x = Math.PI / 2
      break
    }
    case 'protractor': {
      const disc = mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 0.008, 48, 1, false, Math.PI, Math.PI),
        new THREE.MeshStandardMaterial({ map: protractorTexture(), transparent: true, opacity: 0.92, roughness: 0.3, side: THREE.DoubleSide }),
        0, 0.004,
      )
      disc.rotation.x = Math.PI / 2
      add(disc)
      break
    }
    // ---------------- Chemistry ----------------
    case 'conical_flask': {
      const r = 0.3, h = 0.6
      const profile = [
        new THREE.Vector2(0, 0.004), new THREE.Vector2(r, 0.004), new THREE.Vector2(r * 1.02, 0.04),
        new THREE.Vector2(0.09, h * 0.72), new THREE.Vector2(0.08, h), new THREE.Vector2(0.095, h + 0.015),
      ]
      add(new THREE.Mesh(new THREE.LatheGeometry(profile, 48), glass()))
      const liquid = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, r * 0.95, h * 0.85, 40),
        new THREE.MeshStandardMaterial({ color: props.color || '#e0f2fe', roughness: 0.1, transparent: true, opacity: 0.8 }),
      )
      liquid.userData.role = 'liquid'
      liquid.userData.maxFillHeight = h * 0.85
      liquid.scale.y = 0.001
      add(liquid)
      break
    }
    case 'round_bottom_flask': {
      const bulb = mesh(new THREE.SphereGeometry(0.28, 40, 28), glass(), 0, 0.36)
      const neck = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.34, 28, 1, true), glass(), 0, 0.78)
      const ring = mesh(new THREE.TorusGeometry(0.2, 0.025, 12, 40), plastic(0x374151), 0, 0.05)
      ring.rotation.x = Math.PI / 2
      // Offset holder: setLiquidLevel() positions the liquid from its parent's origin, so lift it into the bulb
      const holder = new THREE.Group()
      holder.position.y = 0.14
      holder.add(liquidMesh(0.19, 0.5, props.color || '#e0f2fe', 0.001))
      add(bulb, neck, ring, holder)
      break
    }
    case 'evaporating_dish': {
      const profile = [new THREE.Vector2(0, 0.01), new THREE.Vector2(0.12, 0.012), new THREE.Vector2(0.26, 0.09), new THREE.Vector2(0.3, 0.13)]
      add(new THREE.Mesh(new THREE.LatheGeometry(profile, 48), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25, side: THREE.DoubleSide })))
      const holder = new THREE.Group()
      holder.position.y = 0.012
      holder.add(liquidMesh(0.2, 0.13, props.color || '#bae6fd', 0.001))
      add(holder)
      break
    }
    case 'tripod_stand': {
      const ring = mesh(new THREE.TorusGeometry(0.3, 0.02, 12, 48), metal(0x52525b), 0, 0.8)
      ring.rotation.x = Math.PI / 2
      add(ring)
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2
        const leg = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.82, 12), metal(0x52525b), Math.cos(a) * 0.34, 0.4, Math.sin(a) * 0.34)
        leg.rotation.z = Math.cos(a) * -0.08
        leg.rotation.x = Math.sin(a) * 0.08
        add(leg)
      }
      break
    }
    case 'wire_gauze': {
      const tex = canvasTex(256, 256, (ctx, w, h) => {
        ctx.fillStyle = '#9ca3af'; ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 2
        for (let i = 0; i < w; i += 10) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke() }
        ctx.fillStyle = '#f5f5f4'; ctx.beginPath(); ctx.arc(w / 2, h / 2, w * 0.28, 0, Math.PI * 2); ctx.fill()
      })
      add(mesh(new THREE.BoxGeometry(0.62, 0.008, 0.62), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6, metalness: 0.4 }), 0, 0.004))
      break
    }
    case 'filter_funnel': {
      const cone = mesh(new THREE.CylinderGeometry(0.26, 0.03, 0.32, 40, 1, true), glass(), 0, 0.52)
      const stem = mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.32, 20, 1, true), glass(), 0, 0.2)
      const paper = mesh(new THREE.ConeGeometry(0.22, 0.27, 32, 1, true), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, side: THREE.DoubleSide }), 0, 0.53)
      paper.rotation.x = Math.PI
      add(cone, stem, paper)
      break
    }
    case 'test_tube_rack': {
      const top = mesh(rbox(0.9, 0.04, 0.24, 0.01), wood(), 0, 0.3)
      const base = mesh(rbox(0.9, 0.04, 0.24, 0.01), wood(), 0, 0.02)
      const sideA = mesh(rbox(0.04, 0.3, 0.24, 0.01), wood(), -0.43, 0.16)
      const sideB = sideA.clone(); sideB.position.x = 0.43
      add(top, base, sideA, sideB)
      const colors = ['#fca5a5', '#bae6fd', '#bbf7d0', '#fde68a']
      for (let i = 0; i < 4; i++) {
        const x = -0.3 + i * 0.2
        add(mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.42, 20, 1, true), glass(), x, 0.25))
        add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.12, 20), new THREE.MeshStandardMaterial({ color: colors[i], transparent: true, opacity: 0.8 }), x, 0.12))
      }
      break
    }
    case 'spatula': {
      const blade = mesh(rbox(0.32, 0.008, 0.05, 0.003), chrome(), 0.16, 0.006)
      const spoon = mesh(new THREE.SphereGeometry(0.04, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), chrome(), -0.18, 0.04)
      spoon.rotation.x = Math.PI
      const handle = mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.18, 12), chrome(), -0.06, 0.008)
      handle.rotation.z = Math.PI / 2
      add(blade, spoon, handle)
      break
    }
    case 'wash_bottle': {
      const body = mesh(new THREE.CylinderGeometry(0.17, 0.18, 0.5, 36), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, transparent: true, opacity: 0.55 }), 0, 0.25)
      const cap = mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.08, 24), plastic(0x2563eb), 0, 0.54)
      const nozzle = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 10), plastic(0x2563eb), 0.08, 0.66)
      nozzle.rotation.z = -0.9
      add(body, cap, nozzle, liquidMesh(0.16, 0.5, props.color || '#e0f2fe', 0.8))
      break
    }
    case 'dropper': {
      const tube = mesh(new THREE.CylinderGeometry(0.02, 0.008, 0.36, 16), glass(), 0, 0.24)
      const teat = mesh(new THREE.SphereGeometry(0.045, 20, 14), plastic(0x111827), 0, 0.46)
      teat.scale.y = 1.6
      const bottle = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 28), new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.2, transparent: true, opacity: 0.75 }), 0.22, 0.11)
      add(tube, teat, bottle)
      break
    }
    case 'crucible': {
      const profile = [new THREE.Vector2(0, 0.005), new THREE.Vector2(0.08, 0.005), new THREE.Vector2(0.13, 0.2), new THREE.Vector2(0.14, 0.21)]
      const porcelain = new THREE.MeshStandardMaterial({ color: 0xf5f5f4, roughness: 0.3, side: THREE.DoubleSide })
      add(new THREE.Mesh(new THREE.LatheGeometry(profile, 40), porcelain))
      const lid = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.015, 40), porcelain, 0.32, 0.008)
      const knob = mesh(new THREE.SphereGeometry(0.025, 16, 12), porcelain, 0.32, 0.025)
      add(lid, knob)
      break
    }

    // ---------------- Physics ----------------
    case 'bar_magnet': {
      add(mesh(rbox(0.3, 0.08, 0.1, 0.01), enamel(0xdc2626), -0.15, 0.04), mesh(rbox(0.3, 0.08, 0.1, 0.01), enamel(0x1d4ed8), 0.15, 0.04))
      const n = labelSprite('N'); n.scale.set(0.2, 0.044, 1); n.position.set(-0.22, 0.16, 0)
      const s = labelSprite('S'); s.scale.set(0.2, 0.044, 1); s.position.set(0.22, 0.16, 0)
      add(n, s)
      break
    }
    case 'plotting_compass': {
      add(mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 40), brass(), 0, 0.02))
      add(mesh(new THREE.CylinderGeometry(0.105, 0.105, 0.002, 40), new THREE.MeshStandardMaterial({ color: 0xffffff }), 0, 0.041))
      const needle = new THREE.Group()
      const north = mesh(new THREE.ConeGeometry(0.018, 0.09, 4), solid(0xdc2626), 0, 0, -0.045)
      north.rotation.x = -Math.PI / 2
      const south = mesh(new THREE.ConeGeometry(0.018, 0.09, 4), solid(0x1f2937), 0, 0, 0.045)
      south.rotation.x = Math.PI / 2
      needle.add(north, south)
      needle.position.y = 0.05
      needle.userData.role = 'needle'
      add(needle, mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.012, 40), glass(), 0, 0.06))
      break
    }
    case 'prism': {
      const shape = new THREE.Shape()
      shape.moveTo(-0.22, 0); shape.lineTo(0.22, 0); shape.lineTo(0, 0.38); shape.closePath()
      const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: false })
      geo.translate(0, 0, -0.11)
      add(new THREE.Mesh(geo, glass(0xe0f2fe)))
      break
    }
    case 'rheostat': {
      // Classic school sliding rheostat: wire wound on a ceramic tube between two cast-iron end
      // plates, with a square slider bar above carrying the sliding contact.
      const castIron = new THREE.MeshStandardMaterial({ color: 0x5c6159, roughness: 0.75, metalness: 0.45 })
      const ceramic = new THREE.MeshStandardMaterial({ color: 0xe3bf94, roughness: 0.6 })
      const blackPlastic = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.35 })
      const axisY = 0.2, plateX = 0.79

      // Fine black enamelled wire: a stripe texture repeated along the tube
      const coilTex = canvasTex(64, 64, (ctx, w, h) => {
        ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 0, w, h)
        for (let y = 0; y < h; y += 4) {
          ctx.fillStyle = '#3a3a3a'; ctx.fillRect(0, y, w, 1)
          ctx.fillStyle = '#050505'; ctx.fillRect(0, y + 2, w, 1)
        }
      })
      coilTex.wrapS = coilTex.wrapT = THREE.RepeatWrapping
      coilTex.repeat.set(1, 18)
      const coil = mesh(new THREE.CylinderGeometry(0.125, 0.125, 1.24, 48), new THREE.MeshStandardMaterial({ map: coilTex, roughness: 0.4, metalness: 0.6 }), 0, axisY)
      coil.rotation.z = Math.PI / 2
      add(coil)

      for (const side of [-1, 1]) {
        // Ceramic end of the tube, chrome band, and the boss it sits in
        const cap = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 40), ceramic, side * 0.67, axisY)
        const band = mesh(new THREE.CylinderGeometry(0.129, 0.129, 0.035, 40), chrome(), side * 0.635, axisY)
        const boss = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 32), castIron, side * 0.745, axisY)
        for (const m of [cap, band, boss]) m.rotation.z = Math.PI / 2
        add(cap, band, boss)

        // End plate: tapered upright with feet, cast iron
        const shape = new THREE.Shape()
        shape.moveTo(-0.17, 0); shape.lineTo(0.17, 0); shape.lineTo(0.09, 0.42); shape.lineTo(-0.09, 0.42); shape.closePath()
        const plateGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 2 })
        plateGeo.translate(0, 0, -0.015)
        const plate = new THREE.Mesh(plateGeo, castIron)
        plate.rotation.y = Math.PI / 2
        plate.position.x = side * plateX
        add(plate)
        for (const z of [-0.2, 0.2]) {
          const foot = mesh(rbox(0.1, 0.025, 0.09, 0.008), castIron, side * (plateX - side * 0.04), 0.0125, z)
          const hole = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.027, 16), new THREE.MeshStandardMaterial({ color: 0x1f2937 }), side * (plateX - side * 0.04), 0.0125, z)
          add(foot, hole)
        }
        // Screw lug under each end of the coil
        add(mesh(rbox(0.05, 0.03, 0.06, 0.006), chrome(), side * 0.6, axisY - 0.15, 0.06))
        add(mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.02, 12), metal(0x9ca3af), side * 0.6, axisY - 0.125, 0.06))
      }

      // Black knurled terminal posts on the end plates (two on the right, one on the left) and a brass stud
      const terminalPost = (x: number, y: number, z: number, dir: number) => {
        const g = new THREE.Group()
        const stem = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.04, 12), brass(), dir * 0.02, 0, 0)
        stem.rotation.z = Math.PI / 2
        const knob = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 18), blackPlastic, dir * 0.065, 0, 0)
        knob.rotation.z = Math.PI / 2
        for (let i = 0; i < 9; i++) {
          const rib = mesh(new THREE.BoxGeometry(0.06, 0.006, 0.006), blackPlastic, dir * 0.065, Math.cos(i * 0.7) * 0.03, Math.sin(i * 0.7) * 0.03)
          g.add(rib)
        }
        g.add(stem, knob)
        g.position.set(x, y, z)
        return g
      }
      add(terminalPost(plateX + 0.02, 0.32, 0.03, 1), terminalPost(plateX + 0.02, 0.1, 0.03, 1), terminalPost(-plateX - 0.02, 0.2, 0.06, -1))
      const stud = mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.05, 12), brass(), plateX + 0.04, 0.21, -0.03)
      stud.rotation.z = Math.PI / 2
      add(stud)

      // Square slider bar across the top of the plates
      add(mesh(new THREE.BoxGeometry(plateX * 2, 0.035, 0.035), chrome(), 0, 0.395, -0.02))

      // Sliding contact: black block on the bar with two screws and its rating
      const slider = new THREE.Group()
      const labelTex = canvasTex(128, 128, (ctx, w, h) => {
        ctx.fillStyle = '#111111'; ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = '#e5e7eb'; ctx.font = 'bold 26px Arial'; ctx.textAlign = 'center'
        ctx.save(); ctx.translate(30, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('11', 0, -4); ctx.fillText('5', 0, 22); ctx.restore()
      })
      slider.add(mesh(rbox(0.13, 0.08, 0.13, 0.015), [blackPlastic, blackPlastic, new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.35 }), blackPlastic, blackPlastic, blackPlastic], 0, 0.41, -0.01))
      slider.add(mesh(rbox(0.12, 0.09, 0.05, 0.012), blackPlastic, 0, 0.34, 0.05))
      for (const z of [-0.035, 0.025]) slider.add(mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.006, 20), chrome(), 0.02, 0.453, z))
      slider.position.x = 0.05
      slider.userData.role = 'slider'
      add(slider)
      break
    }
    case 'metre_rule': {
      const edge = new THREE.MeshStandardMaterial({ color: 0xd6a35c, roughness: 0.6 })
      const face = new THREE.MeshStandardMaterial({ map: rulerTexture(), color: 0xf5deb3, roughness: 0.55 })
      add(mesh(new THREE.BoxGeometry(5, 0.02, 0.2), [edge, edge, face, edge, edge, edge], 0, 0.01))
      break
    }
    case 'galvanometer': {
      const body = mesh(rbox(0.42, 0.3, 0.2, 0.03), enamel(0x1e293b), 0, 0.15)
      const face = mesh(new THREE.CircleGeometry(0.13, 40, 0, Math.PI), new THREE.MeshStandardMaterial({ map: gaugeTexture('G', '#1d4ed8') }), 0, 0.12, 0.101)
      const needle = mesh(new THREE.BoxGeometry(0.006, 0.12, 0.004), solid(0xdc2626), 0, 0.18, 0.105)
      needle.userData.role = 'needle'
      add(body, face, needle, terminal(-0.12, 0.3, 0, 0xdc2626), terminal(0.12, 0.3, 0, 0x111827))
      break
    }
    case 'tuning_fork': {
      const prongA = mesh(new THREE.BoxGeometry(0.03, 0.4, 0.03), chrome(), -0.04, 0.42)
      const prongB = prongA.clone(); prongB.position.x = 0.04
      const bend = mesh(new THREE.TorusGeometry(0.04, 0.015, 10, 20, Math.PI), chrome(), 0, 0.22)
      bend.rotation.z = Math.PI
      const stem = mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.14, 12), chrome(), 0, 0.12)
      const block = mesh(rbox(0.24, 0.05, 0.14, 0.01), wood(), 0, 0.025)
      add(prongA, prongB, bend, stem, block)
      break
    }
    case 'pulley': {
      const wheel = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 40), metal(0x9ca3af), 0, 0.9)
      wheel.rotation.x = Math.PI / 2
      const groove = mesh(new THREE.TorusGeometry(0.15, 0.015, 10, 40), plastic(0x374151), 0, 0.9)
      const clamp = mesh(rbox(0.06, 0.12, 0.08, 0.01), metal(0x52525b), 0, 1.08)
      const rod = mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.1, 12), metal(), -0.3, 0.55)
      const arm = mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.3, 12), metal(), -0.15, 1.08)
      arm.rotation.z = Math.PI / 2
      const base = mesh(rbox(0.36, 0.03, 0.24, 0.01), enamel(0x1f2937), -0.3, 0.015)
      const string = mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.6, 6), plastic(0xf5f5f4), 0.15, 0.6)
      add(wheel, groove, clamp, rod, arm, base, string, mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 20), brass(), 0.15, 0.25))
      break
    }

    // ---------------- Biology ----------------
    case 'petri_dish': {
      add(mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 48, 1, true), glass(), 0, 0.025))
      add(mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.004, 48), glass(), 0, 0.002))
      add(mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.02, 48), new THREE.MeshStandardMaterial({ color: props.color || '#fde68a', transparent: true, opacity: 0.7, roughness: 0.3 }), 0, 0.012))
      for (let i = 0; i < 5; i++) {
        const a = i * 1.3, rr = 0.05 + (i % 3) * 0.04
        add(mesh(new THREE.CylinderGeometry(0.02 + (i % 2) * 0.01, 0.02, 0.006, 16), solid(0xf8fafc), Math.cos(a) * rr, 0.025, Math.sin(a) * rr))
      }
      break
    }
    case 'hand_lens': {
      const lens = mesh(new THREE.SphereGeometry(0.14, 32, 32), glass(0xf3f8ff), 0, 0.03)
      lens.scale.set(1, 0.16, 1)
      const rim = mesh(new THREE.TorusGeometry(0.14, 0.018, 12, 48), plastic(0x111827), 0, 0.03)
      rim.rotation.x = Math.PI / 2
      const handle = mesh(rbox(0.3, 0.035, 0.05, 0.012), plastic(0x111827), 0.29, 0.03)
      add(lens, rim, handle)
      break
    }
    case 'scalpel': {
      const handle = mesh(rbox(0.32, 0.02, 0.035, 0.006), chrome(), 0, 0.012)
      const blade = new THREE.Shape()
      blade.moveTo(0, 0); blade.lineTo(0.14, 0); blade.quadraticCurveTo(0.12, 0.05, 0, 0.04); blade.closePath()
      const bladeMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(blade, { depth: 0.003, bevelEnabled: false }), chrome())
      bladeMesh.rotation.x = -Math.PI / 2
      bladeMesh.position.set(0.16, 0.02, 0.02)
      add(handle, bladeMesh)
      break
    }
    case 'forceps': {
      for (const side of [-1, 1]) {
        const arm = mesh(rbox(0.36, 0.012, 0.03, 0.004), chrome(), 0, 0.012, side * 0.025)
        arm.rotation.y = side * 0.07
        add(arm)
      }
      add(mesh(rbox(0.05, 0.016, 0.08, 0.006), chrome(), -0.18, 0.012))
      break
    }
    case 'dissecting_tray': {
      add(mesh(rbox(0.9, 0.08, 0.6, 0.03), enamel(0x1f2937), 0, 0.04))
      add(mesh(new THREE.BoxGeometry(0.82, 0.01, 0.52), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.95 }), 0, 0.082))
      for (let i = 0; i < 4; i++) add(mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.06, 8), chrome(), -0.3 + i * 0.2, 0.11, i % 2 ? 0.18 : -0.18))
      break
    }
    case 'specimen_bottle': {
      add(mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.5, 36, 1, true), glass(), 0, 0.25))
      add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 36), plastic(0x0f766e), 0, 0.53))
      add(mesh(new THREE.CylinderGeometry(0.161, 0.161, 0.18, 36, 1, true, -0.6, 1.2), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, side: THREE.DoubleSide }), 0, 0.3))
      add(liquidMesh(0.16, 0.5, props.color || '#fef3c7', 0.6))
      break
    }
    case 'potted_plant': {
      const pot = mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.3, 32), enamel(0xb45309), 0, 0.15)
      const soil = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32), solid(0x3f2a1d), 0, 0.29)
      const stem = mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.5, 10), solid(0x15803d), 0, 0.54)
      add(pot, soil, stem)
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.5, side: THREE.DoubleSide })
      for (let i = 0; i < 6; i++) {
        const leaf = mesh(new THREE.SphereGeometry(0.09, 16, 10), leafMat, 0, 0.42 + i * 0.07)
        leaf.scale.set(1.4, 0.15, 0.6)
        leaf.rotation.y = i * 2.1
        leaf.position.x = Math.cos(i * 2.1) * 0.08
        leaf.position.z = -Math.sin(i * 2.1) * 0.08
        add(leaf)
      }
      break
    }

    // ---------------- Agriculture ----------------
    case 'soil_sieve': {
      const rim = mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.14, 48, 1, true), new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.6, side: THREE.DoubleSide }), 0, 0.07)
      const meshTex = canvasTex(256, 256, (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h)
        ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 2
        for (let i = 0; i < w; i += 8) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke() }
      })
      const screen = mesh(new THREE.CircleGeometry(0.39, 48), new THREE.MeshStandardMaterial({ map: meshTex, transparent: true, metalness: 0.6, side: THREE.DoubleSide }), 0, 0.03)
      screen.rotation.x = -Math.PI / 2
      add(rim, screen)
      for (let i = 0; i < 14; i++) {
        const a = i * 2.4, rr = (i % 4) * 0.08
        add(mesh(new THREE.DodecahedronGeometry(0.025 + (i % 3) * 0.01), solid(0x78716c), Math.cos(a) * rr, 0.05, Math.sin(a) * rr))
      }
      break
    }
    case 'rain_gauge': {
      const funnel = mesh(new THREE.CylinderGeometry(0.2, 0.06, 0.16, 36, 1, true), metal(0xcbd5e1), 0, 1.0)
      const collar = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.08, 36, 1, true), metal(0xcbd5e1), 0, 1.12)
      const cylinder = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.9, 32, 1, true), glass(), 0, 0.47)
      const peg = mesh(new THREE.CylinderGeometry(0.03, 0.01, 0.1, 12), metal(0x52525b), 0, 0.01)
      add(funnel, collar, cylinder, peg, graduations(0.1, 0.1, 0.75, 5), liquidMesh(0.1, 0.9, props.color || '#bfdbfe', 0.001))
      break
    }
    case 'watering_can': {
      const body = mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.42, 36), enamel(0x16a34a), 0, 0.21)
      const spout = mesh(new THREE.CylinderGeometry(0.025, 0.04, 0.6, 16), enamel(0x16a34a), 0.4, 0.4)
      spout.rotation.z = -0.95
      const rose = mesh(new THREE.CylinderGeometry(0.07, 0.04, 0.06, 20), metal(0x9ca3af), 0.64, 0.58)
      rose.rotation.z = -0.95
      const handle = mesh(new THREE.TorusGeometry(0.18, 0.022, 10, 32, Math.PI), enamel(0x15803d), 0, 0.42)
      add(body, spout, rose, handle, liquidMesh(0.21, 0.42, props.color || '#bfdbfe', 0.8))
      break
    }
    case 'seed_tray': {
      add(mesh(rbox(0.9, 0.12, 0.55, 0.02), plastic(0x111827), 0, 0.06))
      add(mesh(new THREE.BoxGeometry(0.84, 0.02, 0.49), solid(0x3f2a1d), 0, 0.115))
      for (let x = 0; x < 6; x++) for (let z = 0; z < 3; z++) {
        const px = -0.35 + x * 0.14, pz = -0.15 + z * 0.15
        add(mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.08, 6), solid(0x16a34a), px, 0.16, pz))
        const leaf = mesh(new THREE.SphereGeometry(0.022, 10, 8), solid(0x22c55e), px, 0.2, pz)
        leaf.scale.set(1.6, 0.3, 0.8)
        add(leaf)
      }
      break
    }
    case 'garden_trowel': {
      const blade = mesh(new THREE.SphereGeometry(0.12, 24, 12, 0, Math.PI, 0, Math.PI / 2), metal(0x9ca3af), 0.16, 0.03)
      blade.scale.set(1.6, 0.5, 1)
      blade.rotation.z = Math.PI / 2
      const shaft = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 10), metal(), 0, 0.03)
      shaft.rotation.z = Math.PI / 2
      const handle = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.24, 16), wood(), -0.17, 0.03)
      handle.rotation.z = Math.PI / 2
      add(blade, shaft, handle)
      break
    }
    case 'hand_hoe': {
      // Flat-bladed hoe resting on its cutting edge, handle rising away (as it lies on the ground)
      const tool = new THREE.Group()
      const ash = new THREE.MeshStandardMaterial({ color: 0xc9a06a, roughness: 0.6 })
      const black = new THREE.MeshStandardMaterial({ color: 0x1c1f24, roughness: 0.45, metalness: 0.6 })
      const handle = mesh(new THREE.CylinderGeometry(0.03, 0.034, 1.6, 20), ash, 0.85, 0)
      handle.rotation.z = Math.PI / 2
      const socket = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.14, 24), black, 0.05, 0)
      socket.rotation.z = Math.PI / 2
      const neck = mesh(rbox(0.05, 0.14, 0.05, 0.01), black, 0, -0.09)
      const shape = new THREE.Shape()
      shape.moveTo(-0.07, 0); shape.lineTo(0.07, 0); shape.lineTo(0.14, -0.34); shape.lineTo(-0.14, -0.34); shape.closePath()
      const bladeGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.014, bevelEnabled: false })
      const blade = new THREE.Mesh(bladeGeo, new THREE.MeshStandardMaterial({ color: 0x5b6b80, roughness: 0.3, metalness: 0.8 }))
      blade.rotation.y = Math.PI / 2
      blade.position.set(-0.007, -0.14, 0)
      const edge = mesh(new THREE.BoxGeometry(0.016, 0.04, 0.28), new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.2, metalness: 1 }), 0, -0.46)
      tool.add(handle, socket, neck, blade, edge)
      tool.rotation.z = 0.4
      tool.position.set(-0.55, 0.44, 0)
      add(tool)
      break
    }
    case 'fork_hoe': {
      // Three-pronged hand fork hoe: tines lying on the bench, short handle rising from the socket
      const tool = new THREE.Group()
      const beech = new THREE.MeshStandardMaterial({ color: 0xe0bf8f, roughness: 0.55 })
      const black = new THREE.MeshStandardMaterial({ color: 0x23262b, roughness: 0.5, metalness: 0.6 })
      const handle = mesh(new THREE.CylinderGeometry(0.045, 0.036, 1.3, 20), beech, 0.72, 0)
      handle.rotation.z = Math.PI / 2
      const socket = mesh(rbox(0.16, 0.11, 0.11, 0.012), black, 0.06, 0)
      const ferrule = mesh(rbox(0.03, 0.09, 0.08, 0.006), chrome(), 0.16, 0)
      const bridge = mesh(rbox(0.05, 0.05, 0.24, 0.01), black, 0, -0.07)
      tool.add(handle, socket, ferrule, bridge)
      for (const z of [-0.09, 0, 0.09]) {
        const tine = mesh(rbox(0.04, 0.5, 0.025, 0.008), black, 0, -0.33, z)
        const tip = mesh(new THREE.ConeGeometry(0.016, 0.07, 4), new THREE.MeshStandardMaterial({ color: 0xb4b9c0, roughness: 0.25, metalness: 1 }), 0, -0.61, z)
        tip.rotation.z = Math.PI
        tool.add(tine, tip)
      }
      tool.rotation.z = Math.PI / 2 + 0.22
      tool.position.set(-0.2, 0.08, 0)
      add(tool)
      break
    }
    case 'soil_auger': {
      const shaft = mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 12), metal(0x6b7280), 0, 0.75)
      const tbar = mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 12), metal(0x6b7280), 0, 1.35)
      tbar.rotation.z = Math.PI / 2
      const bit = new THREE.Mesh(new THREE.TubeGeometry(new Helix(0.3, 0.05, 4), 200, 0.012, 6, false), metal(0x9ca3af))
      bit.position.y = 0.15
      add(shaft, tbar, bit, mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.04, 32), solid(0x5b3a24), 0, 0.02))
      break
    }
    case 'soil_sample': {
      add(mesh(rbox(0.7, 0.08, 0.45, 0.02), plastic(0xd4d4d8), 0, 0.04))
      const colors = [0x5b3a24, 0x9a6b3f, 0xc2a26b]
      colors.forEach((c, i) => {
        const pile = mesh(new THREE.SphereGeometry(0.11, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: c, roughness: 1 }), -0.22 + i * 0.22, 0.08)
        pile.scale.y = 0.55
        add(pile)
      })
      break
    }

    // ---------------- General ----------------
    case 'safety_goggles': {
      for (const side of [-1, 1]) {
        const eye = mesh(new THREE.SphereGeometry(0.085, 24, 16), new THREE.MeshStandardMaterial({ color: 0xbfdbfe, transparent: true, opacity: 0.45, roughness: 0.05 }), side * 0.1, 0.08)
        eye.scale.z = 0.5
        const frame = mesh(new THREE.TorusGeometry(0.085, 0.014, 10, 32), plastic(0x0f766e), side * 0.1, 0.08)
        add(eye, frame)
      }
      add(mesh(new THREE.TorusGeometry(0.2, 0.012, 8, 40, Math.PI), plastic(0x111827), 0, 0.08, -0.08))
      ;(group.children[group.children.length - 1] as THREE.Mesh).rotation.x = Math.PI / 2
      break
    }
    case 'crucible_tongs': {
      for (const side of [-1, 1]) {
        const arm = mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.5, 10), metal(0x6b7280), 0, 0.015, side * 0.03)
        arm.rotation.z = Math.PI / 2
        arm.rotation.y = side * 0.08
        add(arm)
      }
      add(mesh(new THREE.TorusGeometry(0.03, 0.008, 8, 20), metal(0x6b7280), 0.26, 0.015))
      break
    }
    case 'heat_proof_mat': {
      add(mesh(rbox(0.8, 0.03, 0.8, 0.01), new THREE.MeshStandardMaterial({ color: 0xe7e5e4, roughness: 0.95 }), 0, 0.015))
      break
    }
    default:
      add(mesh(rbox(0.3, 0.3, 0.3, 0.03), solid(0x9ca3af), 0, 0.15))
  }

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  // Name tag just above the tallest part of the apparatus
  const box = new THREE.Box3()
  group.children.forEach((c) => { if (!(c instanceof THREE.Sprite)) box.expandByObject(c) })
  const label = labelSprite(displayName)
  label.position.y = (box.isEmpty() ? 0.4 : box.max.y) + 0.22
  group.add(label)

  return group
}

/** An insulated connecting wire arching between two apparatus positions. */
export function createConnectionLine(a: THREE.Vector3, b: THREE.Vector3): THREE.Mesh {
  const p0 = a.clone().setY(a.y + 0.15)
  const p2 = b.clone().setY(b.y + 0.15)
  const p1 = p0.clone().lerp(p2, 0.5)
  p1.y += 0.15 + p0.distanceTo(p2) * 0.12
  const m = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(p0, p1, p2), 32, 0.014, 8, false),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.45 }),
  )
  m.castShadow = true
  m.userData.role = 'connection'
  return m
}
