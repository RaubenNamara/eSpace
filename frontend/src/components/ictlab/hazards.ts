import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/**
 * Spot the hazard (pages/common/IctLabHazards.vue): things that are wrong in the computer lab,
 * each built in 3D at its own place in the lab room (three/labRoom.ts - the bench top is y = 0,
 * the floor y = -0.76, the back wall z = -0.47), with what is wrong, the rule it breaks (an index
 * into LAB_RULES) and what to do about it. A round shows some of them; the decoys are things done
 * right, so a student has to think before tapping.
 */
export interface Hazard {
  key: string
  name: string
  wrong: string
  fix: string
  rule: number
  /** Where to look (and where the found mark goes) */
  at: THREE.Vector3Tuple
  build: () => THREE.Group
  /** Called every frame while it is in the room (sparks, flicker) */
  animate?: (g: THREE.Group, t: number) => void
}
export interface Decoy {
  key: string
  name: string
  why: string
  at: THREE.Vector3Tuple
  build: () => THREE.Group
}

export const FLOOR_Y = -0.76

const mat = (color: number, roughness = 0.6, metalness = 0.05, extra: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra })
function mesh(geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) {
  const o = new THREE.Mesh(geo, m)
  o.position.set(x, y, z)
  o.castShadow = true
  o.receiveShadow = true
  return o
}
const box = (w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0) => mesh(new THREE.BoxGeometry(w, h, d), m, x, y, z)
const rbox = (w: number, h: number, d: number, m: THREE.Material, r: number, x = 0, y = 0, z = 0) => mesh(new RoundedBoxGeometry(w, h, d, 3, r), m, x, y, z)
const cyl = (r: number, h: number, m: THREE.Material, x = 0, y = 0, z = 0, rTop = r, seg = 28) => mesh(new THREE.CylinderGeometry(rTop, r, h, seg), m, x, y, z)
function tube(points: THREE.Vector3Tuple[], r: number, m: THREE.Material) {
  return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), 64, r, 10, false), m)
}
function canvasTex(w: number, h: number, paint: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  paint(c.getContext('2d')!)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}
/** A generous invisible box to tap, round a small thing */
function hitBox(w: number, h: number, d: number, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ visible: false }))
  m.position.set(x, y, z)
  m.name = 'hit'
  return m
}
const placed = (g: THREE.Group, x: number, y: number, z: number, ry = 0) => {
  g.position.set(x, y, z)
  g.rotation.y = ry
  return g
}

// a plug: a black body with a cable out of the back
function plug(color = 0x111827) {
  const g = new THREE.Group()
  g.add(rbox(0.03, 0.022, 0.035, mat(color, 0.5), 0.004, 0, 0.011, 0))
  return g
}

export const HAZARDS: Hazard[] = [
  {
    key: 'drink', name: 'A soda next to the keyboard', rule: 1,
    wrong: 'One knock and the drink spills into the keyboard and the computer - it can break them or give someone a shock.',
    fix: 'Drinks stay outside the lab. Finish it outside, then come back in.',
    at: [0.42, 0.07, 0.12],
    build: () => {
      const g = new THREE.Group()
      g.add(cyl(0.032, 0.12, mat(0xdc2626, 0.35, 0.3), 0, 0.06, 0, 0.034))
      g.add(cyl(0.034, 0.012, mat(0xf8fafc, 0.4), 0, 0.122, 0))
      const straw = cyl(0.004, 0.11, mat(0xfacc15, 0.5), 0.01, 0.16, 0)
      straw.rotation.z = -0.25
      g.add(straw)
      // a small spill already beside it
      const spill = mesh(new THREE.CircleGeometry(0.05, 24), mat(0x7f1d1d, 0.05, 0, { transparent: true, opacity: 0.55 }), 0.05, 0.002, 0.04)
      spill.rotation.x = -Math.PI / 2
      g.add(spill, hitBox(0.12, 0.2, 0.12, 0.02, 0.09, 0.02))
      return placed(g, 0.42, 0, 0.12)
    }
  },
  {
    key: 'food', name: 'Food at a workstation', rule: 1,
    wrong: 'Crumbs fall between the keys and jam them, and greasy fingers spoil the keyboard and mouse.',
    fix: 'Eat outside the lab, and wash and dry your hands before you come back.',
    at: [-0.93, 0.04, 0.2],
    build: () => {
      const g = new THREE.Group()
      g.add(cyl(0.09, 0.012, mat(0xf8fafc, 0.3), 0, 0.006, 0, 0.1))
      g.add(rbox(0.09, 0.03, 0.07, mat(0xd6a35c, 0.8), 0.01, -0.02, 0.028, 0))
      g.add(rbox(0.08, 0.025, 0.06, mat(0xe7b877, 0.8), 0.01, 0.03, 0.026, 0.03))
      for (let i = 0; i < 14; i++) g.add(box(0.006, 0.004, 0.006, mat(0xc08a4a, 0.9), -0.14 + Math.random() * 0.12, 0.002, -0.06 + Math.random() * 0.12))
      g.add(hitBox(0.26, 0.1, 0.22, -0.03, 0.04, 0))
      return placed(g, -0.93, 0, 0.2)
    }
  },
  {
    key: 'password', name: 'A password stuck on the monitor', rule: 8,
    wrong: 'Anyone walking past can read it and log in as that student - read their work, change it or hand in work in their name.',
    fix: 'Never write your password where others can see it. Keep it in your head, and change it if someone has seen it.',
    at: [0.31, 0.37, -0.17],
    build: () => {
      const g = new THREE.Group()
      const note = mesh(new THREE.PlaneGeometry(0.07, 0.07), new THREE.MeshStandardMaterial({
        roughness: 0.9,
        map: canvasTex(256, 256, c => {
          c.fillStyle = '#fde047'
          c.fillRect(0, 0, 256, 256)
          c.fillStyle = '#1f2937'
          c.font = 'bold 34px sans-serif'
          c.fillText('Password:', 18, 80)
          c.font = 'bold 40px "Comic Sans MS", sans-serif'
          c.fillText('grace123', 18, 150)
          c.font = '26px sans-serif'
          c.fillText('(don\'t lose!)', 18, 210)
        })
      }), 0, 0, 0)
      note.rotation.z = -0.12
      g.add(note, hitBox(0.1, 0.1, 0.03))
      return placed(g, 0.31, 0.37, -0.17)
    }
  },
  {
    key: 'bottle', name: 'An open water bottle on a computer', rule: 1,
    wrong: 'Water and electricity do not mix. If it falls over, the water runs straight into the system unit.',
    fix: 'Keep water bottles closed and in your bag, away from the computers.',
    at: [1.33, 0.5, -0.18],
    build: () => {
      const g = new THREE.Group()
      g.add(cyl(0.03, 0.17, mat(0x7dd3fc, 0.05, 0, { transparent: true, opacity: 0.55 }), 0, 0.085, 0))
      g.add(cyl(0.027, 0.11, mat(0x38bdf8, 0.05, 0, { transparent: true, opacity: 0.45 }), 0, 0.058, 0))
      g.add(cyl(0.015, 0.02, mat(0x7dd3fc, 0.05, 0, { transparent: true, opacity: 0.6 }), 0, 0.18, 0))
      const cap = cyl(0.016, 0.014, mat(0x2563eb, 0.4), 0.06, 0.007, 0.03)
      cap.rotation.z = Math.PI / 2
      g.add(cap, hitBox(0.13, 0.22, 0.1, 0.02, 0.1, 0.01))
      return placed(g, 1.33, 0.42, -0.18)
    }
  },
  {
    key: 'overload', name: 'An overloaded extension socket', rule: 5,
    wrong: 'Too many plugs - and one extension plugged into another - draw too much power. The socket gets hot and can start a fire.',
    fix: 'One plug in each socket, never one extension into another. Tell the teacher; do not touch it yourself.',
    at: [0.95, FLOOR_Y + 0.04, 0.22],
    build: () => {
      const g = new THREE.Group()
      g.add(rbox(0.32, 0.04, 0.07, mat(0xf1f5f9, 0.4), 0.008, 0, 0.02, 0))
      for (let i = 0; i < 4; i++) {
        const p = plug(i === 2 ? 0x1f2937 : 0x111827)
        p.position.set(-0.11 + i * 0.075, 0.04, 0)
        g.add(p)
        g.add(tube([[-0.11 + i * 0.075, 0.07, -0.01], [-0.11 + i * 0.075 + 0.02, 0.09, -0.12], [-0.05 + i * 0.1, 0.004, -0.3]], 0.004, mat(0x111827, 0.6)))
      }
      // a second extension plugged into the first
      const second = new THREE.Group()
      second.add(rbox(0.26, 0.035, 0.065, mat(0xe2e8f0, 0.4), 0.008, 0, 0.0175, 0))
      for (let i = 0; i < 3; i++) {
        const p = plug()
        p.position.set(-0.08 + i * 0.08, 0.035, 0)
        second.add(p)
      }
      second.position.set(0.25, 0, 0.16)
      second.rotation.y = 0.5
      g.add(second)
      g.add(tube([[0.15, 0.07, 0], [0.2, 0.05, 0.08], [0.2, 0.01, 0.15]], 0.004, mat(0x111827, 0.6)))
      // scorch marks and a warm glow
      const scorch = mesh(new THREE.CircleGeometry(0.03, 20), mat(0x1c1917, 1), 0.04, 0.0405, 0.036)
      scorch.rotation.x = -Math.PI / 2
      g.add(scorch)
      const glow = new THREE.PointLight(0xf97316, 0.6, 0.6)
      glow.position.set(0.04, 0.12, 0.05)
      glow.name = 'glow'
      g.add(glow, hitBox(0.6, 0.18, 0.4, 0.08, 0.05, 0.06))
      return placed(g, 0.95, FLOOR_Y, 0.22)
    },
    animate: (g, t) => {
      const l = g.getObjectByName('glow') as THREE.PointLight
      if (l) l.intensity = 0.45 + 0.35 * Math.abs(Math.sin(t * 7) * Math.sin(t * 3.1))
    }
  },
  {
    key: 'frayed', name: 'A damaged power cable', rule: 5,
    wrong: 'The outer cover is worn through and the copper wires show. Touching them can give a deadly shock, and the sparks can start a fire.',
    fix: 'Do not touch it. Tell the teacher at once so the power is switched off and the cable replaced.',
    at: [-0.55, FLOOR_Y + 0.02, 0.62],
    build: () => {
      const g = new THREE.Group()
      const black = mat(0x111827, 0.6)
      g.add(tube([[-0.5, 0.006, -0.35], [-0.3, 0.006, -0.05], [-0.06, 0.006, 0.0]], 0.006, black))
      g.add(tube([[0.06, 0.006, 0.0], [0.3, 0.006, 0.08], [0.6, 0.006, -0.1]], 0.006, black))
      // the bare section: copper strands, splayed
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2
        g.add(tube([[-0.065, 0.006, 0], [0, 0.006 + Math.sin(a) * 0.006, Math.cos(a) * 0.008], [0.065, 0.006, 0]], 0.0016, mat(0xd97706, 0.3, 0.9)))
      }
      for (let i = 0; i < 6; i++) {
        const s = mesh(new THREE.SphereGeometry(0.004, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfde68a }), 0, 0.02, 0)
        s.name = 'spark'
        g.add(s)
      }
      const flash = new THREE.PointLight(0x93c5fd, 0, 0.5)
      flash.position.set(0, 0.05, 0)
      flash.name = 'flash'
      g.add(flash, hitBox(0.36, 0.08, 0.18, 0, 0.02, 0))
      return placed(g, -0.55, FLOOR_Y, 0.62)
    },
    animate: (g, t) => {
      const on = Math.sin(t * 13) > 0.6 || Math.sin(t * 5.3) > 0.92
      g.children.forEach(o => {
        if (o.name !== 'spark') return
        o.visible = on
        if (on) o.position.set((Math.random() - 0.5) * 0.05, 0.01 + Math.random() * 0.06, (Math.random() - 0.5) * 0.04)
      })
      const l = g.getObjectByName('flash') as THREE.PointLight
      if (l) l.intensity = on ? 1.2 : 0
    }
  },
  {
    key: 'tripcable', name: 'A cable across the walkway', rule: 3,
    wrong: 'Someone walking past will trip over it - and pull the computer or monitor off the bench as they fall.',
    fix: 'Cables run along the wall or under the bench, never across where people walk. Tell the teacher.',
    at: [-0.05, FLOOR_Y + 0.02, 1.15],
    build: () => {
      const g = new THREE.Group()
      g.add(tube([[-0.35, 0.36, 0.42], [-0.4, 0.05, 0.6], [-0.3, 0.006, 0.9], [0.0, 0.006, 1.15], [0.45, 0.006, 1.3], [0.9, 0.006, 1.25]], 0.006, mat(0x0f172a, 0.6)))
      g.add(hitBox(1.0, 0.06, 0.36, 0.2, 0.02, 1.15))
      return placed(g, 0, FLOOR_Y, 0)
    }
  },
  {
    key: 'bag', name: 'A school bag in the aisle', rule: 3,
    wrong: 'Bags on the floor between the benches are easy to trip over, and they block the way out in an emergency.',
    fix: 'Leave bags on the bag rack or outside the lab, as your school asks.',
    at: [0.45, FLOOR_Y + 0.12, 1.05],
    build: () => {
      const g = new THREE.Group()
      g.add(rbox(0.32, 0.26, 0.16, mat(0x1e3a8a, 0.85), 0.04, 0, 0.13, 0))
      g.add(rbox(0.22, 0.12, 0.05, mat(0x1e40af, 0.85), 0.02, 0, 0.09, 0.09))
      const strap = mesh(new THREE.TorusGeometry(0.06, 0.008, 8, 20, Math.PI), mat(0x0f172a, 0.8), 0, 0.26, 0)
      g.add(strap, hitBox(0.36, 0.32, 0.22, 0, 0.14, 0))
      return placed(g, 0.45, FLOOR_Y, 1.05, -0.4)
    }
  },
  {
    key: 'vents', name: 'Books blocking the air vents', rule: 11,
    wrong: 'The system unit breathes through its vents. Blocked, it overheats - it slows down, switches itself off, and the parts wear out.',
    fix: 'Keep the space round a computer clear, so air can flow in and out.',
    at: [-1.57, 0.12, 0.1],
    build: () => {
      const g = new THREE.Group()
      const colors = [0x991b1b, 0x166534, 0x1e3a8a, 0x92400e]
      colors.forEach((c, i) => {
        const b = rbox(0.17, 0.03, 0.23, mat(c, 0.8), 0.004, (Math.random() - 0.5) * 0.02, 0.015 + i * 0.031, 0)
        b.rotation.y = (Math.random() - 0.5) * 0.2
        g.add(b)
      })
      const lean = rbox(0.17, 0.24, 0.03, mat(0x581c87, 0.8), 0.004, 0, 0.13, -0.11)
      lean.rotation.x = -0.12
      g.add(lean, hitBox(0.24, 0.3, 0.3, 0, 0.13, -0.02))
      return placed(g, -1.57, 0, 0.13)
    }
  },
  {
    key: 'opened', name: 'A computer left open', rule: 5,
    wrong: 'Someone has taken the side off a computer with the power still connected. Inside there are sharp edges, parts that break easily, and electricity.',
    fix: 'Only the teacher or technician opens a computer - switched off and unplugged. Report a fault instead of opening it.',
    at: [-0.4, 0.22, -0.14],
    build: () => {
      const g = new THREE.Group()
      const shell = mat(0x1f2937, 0.5)
      g.add(rbox(0.19, 0.42, 0.42, shell, 0.008, 0, 0.21, 0))
      // the open side: dark inside, a green board, a fan, a glowing light
      g.add(box(0.002, 0.38, 0.38, mat(0x0b1220, 0.8), 0.096, 0.21, 0))
      g.add(box(0.002, 0.26, 0.22, mat(0x166534, 0.6), 0.097, 0.24, -0.06))
      g.add(box(0.003, 0.05, 0.05, mat(0xcbd5e1, 0.3, 0.8), 0.099, 0.28, -0.08))
      g.add(box(0.003, 0.12, 0.02, mat(0x111827, 0.4), 0.099, 0.25, 0.0))
      const led = mesh(new THREE.SphereGeometry(0.005, 10, 8), new THREE.MeshBasicMaterial({ color: 0x22c55e }), 0.1, 0.36, 0.12)
      g.add(led)
      // the side panel and a screwdriver lying on the bench
      const panel = rbox(0.42, 0.006, 0.4, mat(0x374151, 0.5, 0.3), 0.004, 0.33, 0.003, 0.18)
      panel.rotation.y = 0.2
      g.add(panel)
      g.add(cyl(0.008, 0.07, mat(0xdc2626, 0.5), 0.3, 0.008, 0.42))
      g.children[g.children.length - 1].rotation.z = Math.PI / 2
      g.add(cyl(0.0025, 0.08, mat(0x9ca3af, 0.3, 0.9), 0.375, 0.008, 0.42))
      g.children[g.children.length - 1].rotation.z = Math.PI / 2
      g.add(hitBox(0.6, 0.46, 0.6, 0.15, 0.2, 0.15))
      return placed(g, -0.4, 0, -0.14, -0.6)
    }
  },
  {
    key: 'wetfloor', name: 'Water spilt near the sockets', rule: 2,
    wrong: 'The water is spreading towards the plugs and cables on the floor. Water carries electricity - stepping in it near a socket is very dangerous.',
    fix: 'Keep away and tell the teacher, who switches off at the mains before it is cleaned up.',
    at: [1.2, FLOOR_Y + 0.01, 0.78],
    build: () => {
      const g = new THREE.Group()
      const water = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.02, metalness: 0.2, transparent: true, opacity: 0.5 })
      for (const [x, z, r] of [[0, 0, 0.16], [0.14, 0.08, 0.1], [-0.12, -0.08, 0.09], [0.06, -0.14, 0.07]] as const) {
        const p = mesh(new THREE.CircleGeometry(r, 32), water, x, 0.002, z)
        p.rotation.x = -Math.PI / 2
        g.add(p)
      }
      const bottle = cyl(0.035, 0.2, mat(0x7dd3fc, 0.05, 0, { transparent: true, opacity: 0.55 }), -0.2, 0.035, 0.12)
      bottle.rotation.z = Math.PI / 2
      bottle.rotation.y = 0.6
      g.add(bottle)
      // a wall socket box on the floor trunking, close by
      g.add(rbox(0.12, 0.08, 0.04, mat(0xf8fafc, 0.4), 0.006, 0.22, 0.04, -0.2))
      g.add(hitBox(0.6, 0.1, 0.5, 0.02, 0.03, -0.02))
      return placed(g, 1.2, FLOOR_Y, 0.78)
    }
  },
  {
    key: 'bucket', name: 'A water bucket for fires', rule: 10,
    wrong: 'Someone has put a bucket of water out "for fires". Water on an electrical fire spreads the fire and can electrocute the person throwing it.',
    fix: 'Computer labs use a CO2 (black band) fire extinguisher. In a fire: switch off at the mains, get out, tell the teacher.',
    at: [2.3, FLOOR_Y + 0.12, 0.62],
    build: () => {
      const g = new THREE.Group()
      g.add(cyl(0.11, 0.24, mat(0xdc2626, 0.5, 0.2), 0, 0.12, 0, 0.13))
      const water = mesh(new THREE.CircleGeometry(0.12, 28), new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.05, transparent: true, opacity: 0.8 }), 0, 0.225, 0)
      water.rotation.x = -Math.PI / 2
      g.add(water)
      const handle = mesh(new THREE.TorusGeometry(0.12, 0.004, 6, 24, Math.PI), mat(0x9ca3af, 0.4, 0.8), 0, 0.24, 0)
      g.add(handle)
      const sign = mesh(new THREE.PlaneGeometry(0.16, 0.07), new THREE.MeshBasicMaterial({
        map: canvasTex(256, 112, c => {
          c.fillStyle = '#fef2f2'
          c.fillRect(0, 0, 256, 112)
          c.fillStyle = '#b91c1c'
          c.font = 'bold 64px sans-serif'
          c.fillText('FIRE', 56, 80)
        })
      }), 0, 0.12, 0.125)
      g.add(sign, hitBox(0.3, 0.32, 0.3, 0, 0.14, 0))
      return placed(g, 2.3, FLOOR_Y, 0.62, -0.5)
    }
  }
]

export const DECOYS: Decoy[] = [
  {
    key: 'extinguisher', name: 'The CO2 fire extinguisher', why: 'That is right: a CO2 extinguisher (black band) on its bracket, ready for an electrical fire.',
    at: [2.25, 0.3, -0.38],
    build: () => {
      const g = new THREE.Group()
      g.add(cyl(0.07, 0.5, mat(0xdc2626, 0.35, 0.3), 0, 0.25, 0))
      g.add(cyl(0.071, 0.07, mat(0x111827, 0.4), 0, 0.33, 0))
      g.add(cyl(0.03, 0.06, mat(0x111827, 0.4), 0, 0.53, 0))
      const horn = cyl(0.02, 0.18, mat(0x111827, 0.5), 0.09, 0.45, 0, 0.012)
      horn.rotation.z = -0.5
      g.add(horn, hitBox(0.25, 0.65, 0.2, 0.02, 0.3, 0))
      return placed(g, 2.25, 0, -0.36)
    }
  },
  {
    key: 'cover', name: 'A covered computer', why: 'That is right: shut down and covered at the end of the lesson keeps the dust out.',
    at: [1.65, 0.2, -0.2],
    build: () => {
      const g = new THREE.Group()
      // a grey dust cover draped over the right-hand monitor
      g.add(rbox(0.54, 0.33, 0.05, mat(0x9ca3af, 0.95), 0.02, 0.05, 0.27, -0.27))
      g.add(rbox(0.56, 0.02, 0.1, mat(0x9ca3af, 0.95), 0.008, 0.05, 0.44, -0.27))
      g.add(hitBox(0.6, 0.4, 0.15, 0.05, 0.27, -0.27))
      return placed(g, 1.65, 0, 0)
    }
  },
  {
    key: 'tidy', name: 'A chair pushed in', why: 'That is right: chairs pushed in keep the walkway clear.',
    at: [0.1, -0.3, 0.5],
    build: () => {
      const g = new THREE.Group()
      const seatMat = mat(0x1e3a8a, 0.8)
      g.add(rbox(0.42, 0.05, 0.42, seatMat, 0.02, 0, -0.3, 0))
      g.add(rbox(0.42, 0.36, 0.04, seatMat, 0.02, 0, -0.08, 0.2))
      g.add(cyl(0.02, 0.4, mat(0x334155, 0.45, 0.6), 0, -0.53, 0))
      g.add(hitBox(0.45, 0.8, 0.45, 0, -0.35, 0.02))
      return placed(g, 0.1, 0, 0.5)
    }
  }
]

/** The middle workstation, where several hazards are: a monitor and a keyboard */
export function centreStation() {
  const g = new THREE.Group()
  const dark = mat(0x1f2937, 0.5)
  g.add(rbox(0.5, 0.3, 0.03, dark, 0.008, 0.1, 0.27, -0.2))
  g.add(mesh(new THREE.PlaneGeometry(0.47, 0.27), new THREE.MeshBasicMaterial({
    map: canvasTex(512, 300, c => {
      const grad = c.createLinearGradient(0, 0, 512, 300)
      grad.addColorStop(0, '#0f5b33')
      grad.addColorStop(1, '#22a45d')
      c.fillStyle = grad
      c.fillRect(0, 0, 512, 300)
      c.fillStyle = '#fff'
      c.font = 'bold 30px sans-serif'
      c.fillText('Tusome', 200, 160)
    })
  }), 0.1, 0.27, -0.184))
  g.add(box(0.04, 0.12, 0.03, dark, 0.1, 0.07, -0.21))
  g.add(box(0.18, 0.01, 0.12, dark, 0.1, 0.005, -0.2))
  g.add(rbox(0.38, 0.016, 0.13, dark, 0.004, 0.1, 0.008, 0.1))
  return g
}
