import * as THREE from 'three'

/**
 * Surface pictures for the computer's parts, painted on canvases so nothing has to be downloaded:
 * a circuit board with copper traces, tiny components and printed labels; memory chips; product
 * stickers; brushed metal; fan grilles. Seeded, so a part looks the same every time.
 */
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}
function canvas(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return { c, g: c.getContext('2d')! }
}
function tex(c: HTMLCanvasElement, srgb = true) {
  const t = new THREE.CanvasTexture(c)
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

/** A motherboard's face: solder mask, traces, components, slot outlines and silkscreen print */
export function motherboardTexture() {
  const { c, g } = canvas(1024, 1280)
  const r = rng(7)
  g.fillStyle = '#123d2a'
  g.fillRect(0, 0, 1024, 1280)
  // copper traces under the mask: bundles of thin parallel lines
  g.lineWidth = 2
  for (let i = 0; i < 140; i++) {
    g.strokeStyle = `rgba(46, 125, 80, ${0.35 + r() * 0.3})`
    const x = r() * 1024
    const y = r() * 1280
    const len = 60 + r() * 300
    const horizontal = r() > 0.5
    g.beginPath()
    for (let k = 0; k < 4; k++) {
      const off = k * 6
      g.moveTo(horizontal ? x : x + off, horizontal ? y + off : y)
      g.lineTo(horizontal ? x + len : x + off + (r() > 0.6 ? 30 : 0), horizontal ? y + off + (r() > 0.6 ? 30 : 0) : y + len)
    }
    g.stroke()
  }
  // little surface-mount parts: resistors and capacitors
  for (let i = 0; i < 900; i++) {
    const x = r() * 1024
    const y = r() * 1280
    g.fillStyle = r() > 0.5 ? '#1f2937' : '#8b6b3d'
    g.fillRect(x, y, 6 + r() * 4, 3 + r() * 2)
    g.fillStyle = '#c7c9cc'
    g.fillRect(x - 1, y, 1.5, 3)
  }
  // mounting holes with their copper rings
  for (const [x, y] of [[40, 40], [984, 40], [40, 1240], [984, 1240], [512, 640], [40, 640]]) {
    g.fillStyle = '#b08d57'
    g.beginPath(); g.arc(x, y, 16, 0, Math.PI * 2); g.fill()
    g.fillStyle = '#0b0b0b'
    g.beginPath(); g.arc(x, y, 8, 0, Math.PI * 2); g.fill()
  }
  // silkscreen print
  g.fillStyle = '#e8ecef'
  g.font = 'bold 34px monospace'
  g.fillText('ATX  REV 1.02', 600, 1210)
  g.font = '22px monospace'
  const labels: [string, number, number][] = [['CPU1', 300, 120], ['DIMM_A1', 760, 90], ['DIMM_B1', 830, 90], ['PCIEX16_1', 380, 760], ['PCIEX1_1', 360, 870], ['SATA6G_1', 40, 840], ['SATA6G_2', 40, 900], ['ATX24P', 900, 600], ['CPU_FAN', 540, 70], ['F_PANEL', 330, 1250], ['BAT1', 170, 1010], ['USB3_12', 80, 1170], ['CHA_FAN1', 860, 1180]]
  for (const [t, x, y] of labels) g.fillText(t, x, y)
  // white outlines where parts sit
  g.strokeStyle = 'rgba(232,236,239,0.85)'
  g.lineWidth = 2
  g.strokeRect(150, 140, 300, 300)
  g.strokeRect(740, 110, 30, 560)
  g.strokeRect(810, 110, 30, 560)
  g.strokeRect(260, 780, 420, 26)
  return tex(c)
}

/** One side of a memory stick: green board, a row of black chips, a label, gold contacts */
export function ramTexture() {
  const { c, g } = canvas(1024, 256)
  g.fillStyle = '#0f5132'
  g.fillRect(0, 0, 1024, 256)
  for (let i = 0; i < 8; i++) {
    g.fillStyle = '#16181b'
    g.fillRect(40 + i * 120, 70, 92, 110)
    g.fillStyle = '#9aa0a6'
    g.font = '14px monospace'
    g.fillText('K4A8G', 50 + i * 120, 130)
  }
  g.fillStyle = '#f5f5f4'
  g.fillRect(340, 12, 300, 46)
  g.fillStyle = '#111'
  g.font = 'bold 22px sans-serif'
  g.fillText('8GB DDR4-2666', 360, 44)
  g.fillStyle = '#d4a017'
  for (let i = 0; i < 120; i++) g.fillRect(8 + i * 8.4, 214, 6, 40)
  return tex(c)
}

/** A product sticker: brand-free spec label with a barcode */
export function stickerTexture(title: string, lines: string[], accent = '#1d4ed8') {
  const { c, g } = canvas(512, 320)
  g.fillStyle = '#f8fafc'
  g.fillRect(0, 0, 512, 320)
  g.fillStyle = accent
  g.fillRect(0, 0, 512, 64)
  g.fillStyle = '#fff'
  g.font = 'bold 36px sans-serif'
  g.fillText(title, 20, 46)
  g.fillStyle = '#111827'
  g.font = '24px sans-serif'
  lines.forEach((l, i) => g.fillText(l, 20, 104 + i * 34))
  // barcode
  const r = rng(title.length * 31)
  let x = 300
  while (x < 492) {
    const w = 1 + Math.floor(r() * 4)
    g.fillRect(x, 240, w, 60)
    x += w + 1 + Math.floor(r() * 3)
  }
  // safety marks
  g.strokeStyle = '#111827'
  g.lineWidth = 3
  g.strokeRect(24, 250, 44, 44)
  g.font = 'bold 26px sans-serif'
  g.fillText('CE', 76, 284)
  return tex(c)
}

/** Brushed metal: fine streaks */
export function brushedMetalTexture(base = '#9ca3af') {
  const { c, g } = canvas(512, 512)
  g.fillStyle = base
  g.fillRect(0, 0, 512, 512)
  const r = rng(3)
  for (let i = 0; i < 2200; i++) {
    const y = r() * 512
    const shade = Math.floor(r() * 40) - 20
    g.strokeStyle = `rgba(${shade > 0 ? 255 : 0},${shade > 0 ? 255 : 0},${shade > 0 ? 255 : 0},${Math.abs(shade) / 260})`
    g.beginPath()
    g.moveTo(0, y)
    g.lineTo(512, y + (r() - 0.5) * 2)
    g.stroke()
  }
  const t = tex(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

/** A round fan grille / honeycomb mesh, drawn white on transparent (for alpha) */
export function honeycombTexture() {
  const { c, g } = canvas(256, 256)
  g.fillStyle = '#222'
  g.fillRect(0, 0, 256, 256)
  g.fillStyle = '#000'
  const R = 9
  for (let row = 0; row < 18; row++) {
    for (let col = 0; col < 16; col++) {
      const x = col * R * 1.75 + (row % 2) * R * 0.875
      const y = row * R * 1.5
      g.beginPath()
      for (let k = 0; k < 6; k++) {
        const a = Math.PI / 3 * k + Math.PI / 6
        g.lineTo(x + Math.cos(a) * (R - 2), y + Math.sin(a) * (R - 2))
      }
      g.fill()
    }
  }
  const t = tex(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

/** A graphics card's shroud: dark plastic with angular trim lines */
export function shroudTexture() {
  const { c, g } = canvas(1024, 512)
  g.fillStyle = '#1b1f24'
  g.fillRect(0, 0, 1024, 512)
  g.strokeStyle = '#4b5563'
  g.lineWidth = 6
  g.beginPath()
  g.moveTo(0, 60); g.lineTo(340, 60); g.lineTo(400, 120); g.lineTo(1024, 120)
  g.moveTo(0, 452); g.lineTo(620, 452); g.lineTo(680, 392); g.lineTo(1024, 392)
  g.stroke()
  g.fillStyle = '#9ca3af'
  g.font = 'bold 40px sans-serif'
  g.fillText('GRAPHICS  8GB GDDR6', 560, 80)
  return tex(c)
}

/** The processor socket's contact area (LGA): a grid of gold pins round an empty middle, with the pin-1 triangle */
export function lgaPadTexture() {
  const { c, g } = canvas(512, 512)
  g.fillStyle = '#3a3226'
  g.fillRect(0, 0, 512, 512)
  const n = 44
  const step = 512 / n
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = (i + 0.5) * step
      const y = (j + 0.5) * step
      // the middle has no pins
      if (i > 15 && i < 28 && j > 15 && j < 28) continue
      const grad = g.createRadialGradient(x - 1, y - 1, 0, x, y, step * 0.42)
      grad.addColorStop(0, '#fff3c4')
      grad.addColorStop(0.5, '#d4a72c')
      grad.addColorStop(1, '#7a5a12')
      g.fillStyle = grad
      g.beginPath()
      g.arc(x, y, step * 0.36, 0, Math.PI * 2)
      g.fill()
    }
  }
  g.fillStyle = '#2a241b'
  g.fillRect(16 * step, 16 * step, 12 * step, 12 * step)
  g.fillStyle = '#facc15'
  g.beginPath()
  g.moveTo(6, 506); g.lineTo(46, 506); g.lineTo(6, 466)
  g.fill()
  return tex(c)
}

/** The top of an electrolytic capacitor: aluminium with a pressed safety vent */
export function capTopTexture() {
  const { c, g } = canvas(128, 128)
  const grad = g.createRadialGradient(54, 50, 4, 64, 64, 64)
  grad.addColorStop(0, '#f1f5f9')
  grad.addColorStop(1, '#8b95a3')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  g.strokeStyle = '#5b6470'
  g.lineWidth = 6
  g.beginPath()
  g.moveTo(64, 18); g.lineTo(64, 110)
  g.moveTo(64, 64); g.lineTo(26, 30)
  g.moveTo(64, 64); g.lineTo(102, 30)
  g.stroke()
  return tex(c)
}

/** A connector's face: square pin holes in a grid (24-pin power, fan header) */
export function pinHolesTexture(cols: number, rows: number, body = '#f1f5f9') {
  const W = 64 * cols
  const H = 64 * rows
  const { c, g } = canvas(W, H)
  g.fillStyle = body
  g.fillRect(0, 0, W, H)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      g.fillStyle = '#1f2937'
      g.fillRect(i * 64 + 14, j * 64 + 14, 36, 36)
      g.fillStyle = '#b08d57'
      g.fillRect(i * 64 + 26, j * 64 + 26, 12, 12)
    }
  }
  return tex(c)
}

/** Header pins seen from above: gold pins standing in a black strip */
export function headerPinsTexture(cols: number, rows: number) {
  const W = 48 * cols
  const H = 48 * rows
  const { c, g } = canvas(W, H)
  g.fillStyle = '#0b0f14'
  g.fillRect(0, 0, W, H)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      g.fillStyle = '#e3b341'
      g.fillRect(i * 48 + 16, j * 48 + 16, 16, 16)
    }
  }
  return tex(c)
}

/** A SATA port's mouth: the L-shaped opening */
export function sataMouthTexture() {
  const { c, g } = canvas(192, 96)
  g.fillStyle = '#111827'
  g.fillRect(0, 0, 192, 96)
  g.fillStyle = '#020617'
  g.fillRect(14, 30, 164, 26)
  g.fillRect(150, 30, 28, 46)
  g.fillStyle = '#b08d57'
  for (let i = 0; i < 7; i++) g.fillRect(24 + i * 18, 36, 8, 12)
  return tex(c)
}

/** The CMOS coin cell's face */
export function coinCellTexture() {
  const { c, g } = canvas(256, 256)
  const grad = g.createRadialGradient(100, 90, 10, 128, 128, 140)
  grad.addColorStop(0, '#f8fafc')
  grad.addColorStop(1, '#94a3b8')
  g.fillStyle = grad
  g.fillRect(0, 0, 256, 256)
  g.fillStyle = '#334155'
  g.textAlign = 'center'
  g.font = 'bold 58px sans-serif'
  g.fillText('+', 128, 84)
  g.font = 'bold 44px sans-serif'
  g.fillText('CR2032', 128, 150)
  g.font = '30px sans-serif'
  g.fillText('3V LITHIUM', 128, 196)
  // turned so it reads upright on the cell lying flat on the board
  const t = tex(c)
  t.center.set(0.5, 0.5)
  t.rotation = Math.PI / 2
  return t
}
