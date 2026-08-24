import * as THREE from 'three'

/**
 * Builds a labelled Three.js group for one piece of lab equipment from primitive geometry - there
 * is no 3D-asset pipeline in this project, so every object here is procedural (cylinders, cones,
 * boxes) rather than an imported model. Realism comes from getting materials/colors right (real
 * glass reads as clear, not blue; a resistor reads by its colour bands; a meter reads by its dial)
 * rather than geometric complexity - a plain grey cylinder with a proper resistor colour code is
 * far more recognizable than a fancier shape in the wrong colour.
 *
 * Each group tags the sub-meshes that later need to animate (liquid level, flame, needle, lever,
 * LED) via `userData.role` so VirtualLabScene can find them without re-walking the object type's
 * construction logic.
 */

// Plain alpha transparency, not physically-based `transmission` - transmission renders by
// sampling whatever is behind the object through an extra render pass, which needs a real scene
// background to refract against. This scene's canvas is transparent (alpha:true, no background)
// so there is nothing for it to sample, and a transmissive glass object washes out to nearly
// invisible instead of looking glossy - confirmed live (a conical flask disappeared entirely).
// Real lab glassware reads as clear/faintly cool-white, not tinted blue, so the default leans
// almost colorless.
const glass = (color = 0xf1f6f5) => new THREE.MeshPhysicalMaterial({
  color, transparent: true, opacity: 0.32, roughness: 0.06, metalness: 0, clearcoat: 0.8, clearcoatRoughness: 0.1,
})
const solid = (color: number) => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.15 })
const metal = (color = 0xaaaaaa) => new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.85 })
const brass = () => new THREE.MeshStandardMaterial({ color: 0xc9a227, roughness: 0.3, metalness: 0.9 })
const plastic = (color: number) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05 })

// Built once at a fixed max height, then shown/hidden by scaling Y - this is what lets
// VirtualLabScene rescale it live as the student actually pours (real volume tracking), rather
// than baking in a single fixed fill level that can only ever be exactly right by chance.
function liquidMesh(radius: number, height: number, color: string, fillRatio = 0.55): THREE.Mesh {
  const maxFillHeight = height * 0.85
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.92, radius * 0.92, maxFillHeight, 40),
    new THREE.MeshStandardMaterial({ color, roughness: 0.12, metalness: 0.05 })
  )
  const f = Math.max(0.001, fillRatio)
  mesh.scale.y = f
  mesh.position.y = (maxFillHeight * f) / 2
  mesh.userData.role = 'liquid'
  mesh.userData.maxFillHeight = maxFillHeight
  return mesh
}

/** Thin white graduation rings around a glassware wall, like the printed scale on real glassware. */
function graduationRings(radius: number, height: number, count: number): THREE.Group {
  const group = new THREE.Group()
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
  for (let i = 1; i <= count; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.001, 0.004, 6, 40), mat)
    ring.rotation.x = Math.PI / 2
    ring.position.y = (height * i) / (count + 1)
    group.add(ring)
  }
  return group
}

function labelSprite(text: string): THREE.Sprite {
  const canvas = document.createElement('canvas')
  const scale = 3
  canvas.width = 256 * scale
  canvas.height = 64 * scale
  const ctx = canvas.getContext('2d')!
  ctx.scale(scale, scale)
  ctx.fillStyle = 'rgba(15,23,42,0.88)'
  ctx.roundRect(0, 8, 256, 48, 10)
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 28px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 128, 32)
  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 4
  texture.colorSpace = THREE.SRGBColorSpace
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false, transparent: true }))
  sprite.scale.set(1.1, 0.28, 1)
  sprite.userData.role = 'label'
  return sprite
}

/** A real analogue meter face: tick marks around a sweep, a couple of numbers, and the unit letter. */
function gaugeTexture(unitLabel: string, accent: string): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const cx = size / 2, cy = size / 2, r = size / 2 - 6

  ctx.fillStyle = '#f8fafc'
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#cbd5e1'
  ctx.lineWidth = 6
  ctx.stroke()

  const startAngle = Math.PI * 0.72
  const sweep = Math.PI * 1.56
  const tickR1 = r - 34, tickR2 = r - 16
  ctx.strokeStyle = '#334155'
  ctx.lineWidth = 3
  for (let i = 0; i <= 10; i++) {
    const a = startAngle + (i / 10) * sweep
    const major = i % 5 === 0
    const inner = major ? r - 46 : tickR1
    ctx.lineWidth = major ? 4 : 2
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner)
    ctx.lineTo(cx + Math.cos(a) * tickR2, cy + Math.sin(a) * tickR2)
    ctx.stroke()
  }
  ctx.fillStyle = '#1e293b'
  ctx.font = 'bold 28px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ;[0, 5, 10].forEach((i) => {
    const a = startAngle + (i / 10) * sweep
    const tr = r - 76
    ctx.fillText(String(i), cx + Math.cos(a) * tr, cy + Math.sin(a) * tr)
  })

  ctx.fillStyle = accent
  ctx.font = 'bold 72px Arial'
  ctx.fillText(unitLabel, cx, cy + r * 0.42)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** A small pill sprite showing the battery's chosen voltage, regenerated whenever it changes. */
export function voltageSpriteTexture(volts: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  const scale = 3
  canvas.width = 160 * scale
  canvas.height = 64 * scale
  const ctx = canvas.getContext('2d')!
  ctx.scale(scale, scale)
  ctx.fillStyle = 'rgba(21,128,61,0.92)'
  ctx.roundRect(0, 8, 160, 48, 12)
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 26px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`${volts}V`, 80, 32)
  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 4
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** A small LCD-style readout, reused for the balance's mass display and the stopwatch's clock face. */
export function digitalDisplayTexture(text: string, accent = '#22c55e'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  const scale = 3
  canvas.width = 200 * scale
  canvas.height = 90 * scale
  const ctx = canvas.getContext('2d')!
  ctx.scale(scale, scale)
  ctx.fillStyle = '#0f172a'
  ctx.roundRect(0, 0, 200, 90, 10)
  ctx.fill()
  ctx.fillStyle = accent
  ctx.font = 'bold 34px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 100, 47)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** A linear ruler face - tick marks every cm with numbers every 5cm, printed on a canvas texture. */
function rulerTexture(): THREE.CanvasTexture {
  const w = 1024, h = 160
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#fdf6e3'
  ctx.fillRect(0, 0, w, h)
  const marginX = 20
  const usable = w - marginX * 2
  const cm = 30
  ctx.strokeStyle = '#1e293b'
  ctx.fillStyle = '#1e293b'
  ctx.lineWidth = 2
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  for (let i = 0; i <= cm; i++) {
    const x = marginX + (i / cm) * usable
    const major = i % 5 === 0
    const tickH = major ? 55 : i % 1 === 0 ? 30 : 18
    ctx.lineWidth = major ? 3 : 1.5
    ctx.beginPath()
    ctx.moveTo(x, 10)
    ctx.lineTo(x, 10 + tickH)
    ctx.stroke()
    if (major) ctx.fillText(String(i), x, 100)
  }
  ctx.strokeStyle = '#94a3b8'
  ctx.lineWidth = 2
  ctx.strokeRect(4, 4, w - 8, h - 8)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** A protractor face - degree ticks every 10deg (numbered every 30deg) around a semicircle, plus a
 *  crosshair at the centre so the student can see exactly what has to align with the ray. */
function protractorTexture(): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size / 2 + 20
  const ctx = canvas.getContext('2d')!
  const cx = size / 2, cy = size / 2 + 10, r = size / 2 - 10

  ctx.fillStyle = 'rgba(241,246,245,0.85)'
  ctx.beginPath()
  ctx.arc(cx, cy, r, Math.PI, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = '#334155'
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
      ctx.fillStyle = '#1e293b'
      ctx.font = 'bold 16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(String(deg), cx + Math.cos(a) * (r - 42), cy + Math.sin(a) * (r - 42))
    }
  }
  // Crosshair at the centre point (baseline origin) - this is what must sit on the ray/surface
  // intersection for a reading to be valid.
  ctx.strokeStyle = '#dc2626'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(cx - 10, cy); ctx.lineTo(cx + 10, cy)
  ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy + 2)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

// Standard 4-band resistor colour code (first two significant digits + multiplier + gold
// tolerance), derived from the resistance value so the band colours are actually meaningful
// rather than decorative.
const RESISTOR_DIGIT_COLORS = ['#1a1a1a', '#7c4a1e', '#dc2626', '#f97316', '#eab308', '#16a34a', '#2563eb', '#7c3aed', '#6b7280', '#f8fafc']
function resistorBandColors(ohms: number): string[] {
  const value = Math.max(1, Math.round(ohms || 10))
  const digits = String(value)
  const d1 = parseInt(digits[0] ?? '1', 10)
  const d2 = parseInt(digits[1] ?? '0', 10)
  const multiplier = Math.min(9, Math.max(0, digits.length - 2))
  return [RESISTOR_DIGIT_COLORS[d1], RESISTOR_DIGIT_COLORS[d2], RESISTOR_DIGIT_COLORS[multiplier], '#d4af37']
}

function baseGroup(objectType: string, key: string, labelText: string): THREE.Group {
  const group = new THREE.Group()
  group.userData.objectKey = key
  group.userData.objectType = objectType
  const label = labelSprite(labelText)
  label.position.y = 1.4
  group.add(label)
  return group
}

export function createObjectMesh(objectType: string, key: string, displayName: string, props: Record<string, any> = {}): THREE.Group {
  const group = baseGroup(objectType, key, displayName)

  switch (objectType) {
    case 'beaker': {
      const r = 0.35, h = 0.6
      const wall = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.9, h, 48, 1, true), glass())
      wall.position.y = h / 2
      const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.014, 12, 48), glass())
      rim.rotation.x = Math.PI / 2
      rim.position.y = h
      // Pour spout - the small triangular lip every real beaker has.
      const spout = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.06, 3), glass())
      spout.position.set(r * 0.95, h - 0.02, 0)
      spout.rotation.z = -Math.PI / 2
      spout.rotation.y = Math.PI / 6
      group.add(wall, rim, spout, graduationRings(r * 0.9, h * 0.85, 3), liquidMesh(r, h, props.color || '#a9d6e5'))
      break
    }
    case 'test_tube': {
      const r = 0.12, h = 0.55
      const wall = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 32, 1, true), glass())
      wall.position.y = h / 2 + 0.1
      const bottom = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), glass())
      bottom.rotation.x = Math.PI
      bottom.position.y = 0.1
      group.add(wall, bottom, liquidMesh(r, h, props.color || '#cfe8f3', 0.4))
      break
    }
    case 'burette': {
      const r = 0.06, h = 1.1
      const wall = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 32, 1, true), glass())
      wall.position.y = h / 2 + 0.15
      const stopcockBody = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.3, r * 1.3, 0.1, 24), plastic(0x1d4ed8))
      stopcockBody.position.y = 0.1
      const stopcockHandle = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.025, 0.025), plastic(0x1d4ed8))
      stopcockHandle.position.set(0.08, 0.1, 0)
      group.add(wall, stopcockBody, stopcockHandle, graduationRings(r, h * 0.9, 6), liquidMesh(r, h, props.color || '#eaf6ff', 0.7))
      break
    }
    case 'pipette': {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.02, 0.7, 24), glass())
      body.position.y = 0.5
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 24), plastic(0xdc2626))
      bulb.position.y = 0.9
      group.add(body, bulb)
      break
    }
    case 'measuring_cylinder': {
      const r = 0.18, h = 0.8
      const wall = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.85, h, 40, 1, true), glass())
      wall.position.y = h / 2
      const base = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.25, r * 1.25, 0.04, 40), glass())
      base.position.y = 0.02
      group.add(wall, base, graduationRings(r * 0.95, h * 0.85, 5), liquidMesh(r, h, props.color || '#cfe8f3', 0.5))
      break
    }
    case 'bunsen_burner': {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.12, 32), metal(0x27272a))
      base.position.y = 0.06
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.5, 24), metal(0x52525b))
      stem.position.y = 0.37
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.05, 24), metal(0x71717a))
      collar.position.y = 0.18
      const on = props.flame === 'on'
      const outerFlame = new THREE.Mesh(
        new THREE.ConeGeometry(0.09, 0.3, 24),
        new THREE.MeshStandardMaterial({ color: 0xff9d3d, emissive: 0xff6a00, emissiveIntensity: on ? 1 : 0, transparent: true, opacity: on ? 0.75 : 0 })
      )
      outerFlame.position.y = 0.77
      outerFlame.userData.role = 'flame'
      const innerFlame = new THREE.Mesh(
        new THREE.ConeGeometry(0.045, 0.16, 16),
        new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x2563eb, emissiveIntensity: on ? 1.3 : 0, transparent: true, opacity: on ? 0.85 : 0 })
      )
      innerFlame.position.y = 0.7
      innerFlame.userData.role = 'flame'
      group.add(base, stem, collar, outerFlame, innerFlame)
      break
    }
    case 'thermometer': {
      const backing = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.62, 0.02), plastic(0xf8fafc))
      backing.position.set(0, 0.45, -0.025)
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.6, 24), glass(0xffffff))
      stem.position.y = 0.45
      const mercury = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.45, 12), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2 }))
      mercury.position.set(0, 0.32, 0)
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 24), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2 }))
      bulb.position.y = 0.1
      const bulbGlass = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 24), glass(0xffffff))
      bulbGlass.position.y = 0.1
      group.add(backing, stem, mercury, bulb, bulbGlass)
      break
    }
    case 'battery': {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.3, 0.3), plastic(0x1f2937))
      body.position.y = 0.15
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.302), plastic(0xdc2626))
      stripe.position.y = 0.15
      const plusCap = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.09, 20), brass())
      plusCap.position.set(0.25, 0.34, 0)
      const minusCap = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.09, 20), brass())
      minusCap.position.set(-0.25, 0.34, 0)
      const voltage = new THREE.Sprite(new THREE.SpriteMaterial({ map: voltageSpriteTexture(props.voltage || 6), depthTest: false, transparent: true }))
      voltage.scale.set(0.5, 0.2, 1)
      voltage.position.set(0, 1.05, 0)
      voltage.userData.role = 'voltage'
      group.add(body, stripe, plusCap, minusCap, voltage)
      break
    }
    case 'ruler': {
      const w = 1.5, d = 0.16
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.015, d),
        new THREE.MeshStandardMaterial({ map: rulerTexture(), roughness: 0.5, metalness: 0 })
      )
      body.position.y = 0.01
      group.add(body)
      break
    }
    case 'bulb': {
      const on = props.state === 'on'
      const glassBulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 32, 32),
        new THREE.MeshPhysicalMaterial({ color: 0xfff9e8, transparent: true, opacity: 0.35, roughness: 0.05, clearcoat: 0.8, emissive: on ? 0xffe066 : 0x000000, emissiveIntensity: on ? 1.3 : 0 })
      )
      glassBulb.position.y = 0.37
      glassBulb.userData.role = 'led'
      // A thin coiled filament, visible through the glass - the detail that actually reads as
      // "light bulb" rather than "glass ball on a plug".
      const filament = new THREE.Mesh(
        new THREE.TorusGeometry(0.05, 0.006, 8, 24, Math.PI * 1.7),
        new THREE.MeshStandardMaterial({ color: 0x44403c, emissive: on ? 0xffcc55 : 0x000000, emissiveIntensity: on ? 2 : 0 })
      )
      filament.rotation.x = Math.PI / 2
      filament.position.y = 0.34
      filament.userData.role = 'led'
      const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.11, 0.16, 24), brass())
      socket.position.y = 0.12
      // Screw-thread grooves on the socket for an Edison-base look.
      const threads = new THREE.Group()
      for (let i = 0; i < 5; i++) {
        const thread = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.006, 6, 24), brass())
        thread.rotation.x = Math.PI / 2
        thread.position.y = 0.06 + i * 0.028
        threads.add(thread)
      }
      group.add(glassBulb, filament, socket, threads)
      break
    }
    case 'switch': {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.2), plastic(0x27272a))
      base.position.y = 0.03
      const postA = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 16), metal())
      postA.position.set(-0.12, 0.11, 0)
      const postB = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.06, 16), metal())
      postB.position.set(0.12, 0.09, 0)
      const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.24, 16), metal(0xd4d4d8))
      const closed = props.state === 'closed'
      lever.position.set(closed ? 0 : -0.06, 0.16, 0)
      lever.rotation.z = closed ? Math.PI / 2 - 0.35 : Math.PI / 2 - 0.9
      lever.userData.role = 'lever'
      group.add(base, postA, postB, lever)
      break
    }
    case 'resistor': {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 32), solid(0xead9b4))
      body.rotation.z = Math.PI / 2
      body.position.y = 0.2
      const leadL = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.15, 12), metal(0xd4d4d8))
      leadL.rotation.z = Math.PI / 2
      leadL.position.set(-0.275, 0.2, 0)
      const leadR = leadL.clone()
      leadR.position.set(0.275, 0.2, 0)
      const bands = new THREE.Group()
      resistorBandColors(props.resistance_ohm).forEach((color, i) => {
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.081, 0.02, 8, 24), new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.2 }))
        band.rotation.y = Math.PI / 2
        band.position.set(-0.12 + i * 0.08, 0.2, 0)
        bands.add(band)
      })
      group.add(body, leadL, leadR, bands)
      break
    }
    case 'ammeter':
    case 'voltmeter': {
      const isAmmeter = objectType === 'ammeter'
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.15), plastic(0x1f2937))
      box.position.y = 0.2
      const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.015, 12, 48), metal(0xd4d4d8))
      bezel.position.set(0, 0.2, 0.081)
      const dial = new THREE.Mesh(
        new THREE.CircleGeometry(0.15, 48),
        new THREE.MeshStandardMaterial({ map: gaugeTexture(isAmmeter ? 'A' : 'V', isAmmeter ? '#dc2626' : '#2563eb'), roughness: 0.4 })
      )
      dial.position.set(0, 0.2, 0.082)
      const needle = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.13, 8), solid(isAmmeter ? 0xdc2626 : 0x2563eb))
      needle.position.set(0.02, 0.2, 0.095)
      needle.rotation.z = -Math.PI / 2 + 0.6
      needle.userData.role = 'needle'
      const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 12), metal(0x27272a))
      pivot.position.set(0, 0.2, 0.096)
      group.add(box, bezel, dial, needle, pivot)
      break
    }
    case 'microscope': {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.35), metal(0x1c1c1e))
      base.position.y = 0.04
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 24), metal(0x2d2d30))
      arm.position.set(-0.1, 0.4, 0)
      arm.rotation.z = 0.25
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.35, 24), metal(0x18181b))
      tube.position.set(0.05, 0.75, 0)
      tube.rotation.z = 0.25
      const eyepiece = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.12, 24), metal(0x3f3f46))
      eyepiece.position.set(0.13, 0.9, 0)
      eyepiece.rotation.z = 0.25
      const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.05, 0.1, 16), metal(0x3f3f46))
      turret.position.set(-0.03, 0.55, 0)
      const objective = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.1, 16), metal(0x18181b))
      objective.position.set(-0.03, 0.47, 0)
      const stage = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.025, 0.28), metal(0xd4d4d8))
      stage.position.y = 0.35
      const clipL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 0.12), metal(0x71717a))
      clipL.position.set(-0.1, 0.37, 0)
      const clipR = clipL.clone()
      clipR.position.set(0.1, 0.37, 0)
      // Illumination lamp under the stage - toggled generically by setObjectState({state}) via the
      // same role:'led' mechanism every switch_on/switch_off action already drives.
      const lamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.03, 20),
        new THREE.MeshStandardMaterial({ color: 0xfff7d6, emissive: 0xfacc15, emissiveIntensity: 0 })
      )
      lamp.position.y = 0.09
      lamp.userData.role = 'led'
      group.add(base, arm, tube, eyepiece, turret, objective, stage, clipL, clipR, lamp)
      break
    }
    case 'lens': {
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.22, 40, 40), glass(0xf3f8ff))
      lens.scale.set(1, 1, 0.25)
      lens.position.y = 0.3
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.02, 16, 48), metal(0x9ca3af))
      rim.position.y = 0.3
      group.add(lens, rim)
      break
    }
    case 'mirror': {
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.55, 0.04), metal(0x52525b))
      frame.position.y = 0.3
      const glassPane = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.48, 0.02), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 1, roughness: 0.03 }))
      glassPane.position.set(0, 0.3, 0.03)
      group.add(frame, glassPane)
      break
    }
    case 'biological_model': {
      const slide = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.2), glass(0xf1f6f5))
      slide.position.y = 0.05
      const coverslip = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.01, 0.16), glass(0xf1f6f5))
      coverslip.position.y = 0.075
      const specimen = new THREE.Mesh(new THREE.SphereGeometry(0.07, 32, 32), new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.5, transparent: true, opacity: 0.85 }))
      specimen.position.y = 0.07
      specimen.scale.set(1, 0.3, 1)
      group.add(slide, coverslip, specimen)
      break
    }
    case 'wire': {
      const coil = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.022, 16, 48), new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.35, metalness: 0.7 }))
      coil.rotation.x = Math.PI / 2
      coil.position.y = 0.15
      group.add(coil)
      break
    }
    case 'water_container': {
      const r = 0.3, h = 0.75
      const wall = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.85, r, h, 48, 1, true), glass())
      wall.position.y = h / 2
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.02, 12, 32, Math.PI * 1.3), glass())
      handle.rotation.z = Math.PI / 2
      handle.position.set(r * 0.85, h * 0.6, 0)
      group.add(wall, handle, liquidMesh(r * 0.9, h, props.color || '#a5d8ff', 0.8))
      break
    }
    // A generic measurable object (rod, block, sample) - its real length drives what a ruler
    // actually reads, at the same cm-to-scene-unit scale as the ruler's own printed markings
    // (1.5 scene units spans the ruler's 30cm face), so the two are always visually consistent.
    case 'specimen': {
      const lengthCm = props.length_cm ?? 12
      const lengthUnits = Math.max(0.15, lengthCm * 0.05)
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, lengthUnits, 24), metal(0x9ca3af))
      rod.rotation.z = Math.PI / 2
      rod.position.y = 0.045
      const capA = new THREE.Mesh(new THREE.SphereGeometry(0.025, 16, 16), metal(0x71717a))
      capA.position.set(-lengthUnits / 2, 0.045, 0)
      const capB = capA.clone()
      capB.position.set(lengthUnits / 2, 0.045, 0)
      group.add(rod, capA, capB)
      break
    }
    case 'balance': {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.06, 0.4), plastic(0xe5e7eb))
      base.position.y = 0.03
      const platform = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 32), metal(0xd4d4d8))
      platform.position.y = 0.07
      const display = new THREE.Sprite(new THREE.SpriteMaterial({ map: digitalDisplayTexture('0.0 g'), depthTest: false, transparent: true }))
      display.scale.set(0.4, 0.18, 1)
      display.position.set(0, 0.32, -0.14)
      display.userData.role = 'balance_display'
      group.add(base, platform, display)
      break
    }
    case 'stopwatch': {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.05, 40), plastic(0x1f2937))
      body.rotation.x = Math.PI / 2
      body.position.y = 0.16
      const button = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.03, 16), plastic(0xdc2626))
      button.position.set(0, 0.22, 0)
      const display = new THREE.Sprite(new THREE.SpriteMaterial({ map: digitalDisplayTexture('00:00.0'), depthTest: false, transparent: true }))
      display.scale.set(0.32, 0.14, 1)
      display.position.set(0, 0.16, 0.03)
      display.userData.role = 'stopwatch_display'
      group.add(body, button, display)
      break
    }
    // Built at a fixed max height and rescaled by VirtualLabScene as the real attached load
    // changes, exactly like liquidMesh's fill-by-scale approach - the coil visibly stretches
    // rather than jumping between a few baked-in poses.
    case 'spring': {
      const naturalCm = props.natural_length_cm ?? 15
      const maxSafeCm = props.max_safe_extension_cm ?? 12
      const naturalUnits = naturalCm * 0.05
      const maxUnits = (naturalCm + maxSafeCm * 1.6) * 0.05
      const coil = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, maxUnits, 12, 16, true),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.35, metalness: 0.75, wireframe: true })
      )
      coil.userData.role = 'spring_body'
      coil.userData.naturalLengthUnits = naturalUnits
      coil.userData.maxLengthUnits = maxUnits
      coil.scale.y = naturalUnits / maxUnits
      coil.position.y = 0.85 - (maxUnits * coil.scale.y) / 2
      const hook = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 8, 20), metal(0x71717a))
      hook.position.y = 0.85
      const hanger = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 24), metal(0x52525b))
      hanger.userData.role = 'spring_hanger'
      hanger.position.y = 0.85 - maxUnits * coil.scale.y
      group.add(coil, hook, hanger)
      break
    }
    case 'retort_stand': {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.03, 0.22), metal(0x27272a))
      base.position.y = 0.015
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.95, 16), metal(0x3f3f46))
      pole.position.set(-0.13, 0.5, 0)
      const clampArm = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.02, 0.04), metal(0x3f3f46))
      clampArm.position.set(0.03, 0.9, 0)
      const boss = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 16), metal(0x52525b))
      boss.rotation.x = Math.PI / 2
      boss.position.set(-0.13, 0.9, 0)
      group.add(base, pole, clampArm, boss)
      break
    }
    case 'mass_piece': {
      const massG = props.mass_g ?? 50
      const r = 0.05 + Math.min(0.05, massG / 4000)
      const h = 0.04 + Math.min(0.06, massG / 3000)
      const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 24), metal(0x3f3f46))
      body.position.y = h / 2
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, h + 0.01, 12), metal(0x18181b))
      hole.position.y = h / 2
      const tag = labelSprite(`${massG}g`)
      tag.scale.set(0.5, 0.13, 1)
      tag.position.y = h + 0.12
      group.add(body, hole, tag)
      break
    }
    case 'ray_box': {
      const on = props.state === 'on'
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.22, 0.28), plastic(0x1f2937))
      body.position.y = 0.11
      const emitter = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.08, 20),
        new THREE.MeshStandardMaterial({ color: 0xfde68a, emissive: 0xf59e0b, emissiveIntensity: on ? 1.4 : 0 })
      )
      emitter.rotation.x = Math.PI / 2
      emitter.position.set(0, 0.11, 0.18)
      emitter.userData.role = 'led'
      group.add(body, emitter)
      break
    }
    case 'glass_block': {
      const widthUnits = (props.width_cm ?? 5) * 0.05
      const block = new THREE.Mesh(new THREE.BoxGeometry(widthUnits, 0.3, 0.5), glass(0xeef6ff))
      block.position.y = 0.15
      group.add(block)
      break
    }
    case 'protractor': {
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 0.012, 48, 1, false, Math.PI, Math.PI),
        new THREE.MeshStandardMaterial({ map: protractorTexture(), transparent: true, opacity: 0.92, roughness: 0.4, side: THREE.DoubleSide })
      )
      disc.rotation.x = Math.PI / 2
      disc.position.y = 0.02
      group.add(disc)
      break
    }
    default: {
      const fallback = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), solid(0x9ca3af))
      fallback.position.y = 0.15
      group.add(fallback)
    }
  }

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return group
}

export function createConnectionLine(a: THREE.Vector3, b: THREE.Vector3): THREE.Mesh {
  const mid = a.clone().add(b).multiplyScalar(0.5)
  const distance = a.distanceTo(b)
  const geometry = new THREE.CylinderGeometry(0.016, 0.016, distance, 16)
  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4, metalness: 0.1 }))
  mesh.position.copy(mid)
  mesh.position.y += 0.15
  const dir = new THREE.Vector3().subVectors(b, a).normalize()
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
  mesh.quaternion.copy(quaternion)
  mesh.userData.role = 'connection'
  return mesh
}
