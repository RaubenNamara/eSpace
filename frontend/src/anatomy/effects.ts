import * as THREE from 'three'
import type { AnatomyEngine } from './engine'
import type { AnatomyIndex } from './metadata'
import { colourOf } from './materials'
import { disposeMaterial } from './dispose'

/**
 * "How it works" animations, played on the real model. Each one changes only transforms and
 * materials it owns and puts everything back in dispose(). They are described as plain data
 * (EffectSpec) in systemGuides.ts and built here.
 */

/** A point: a structure's centre by exact name (optionally moved by an offset, metres) or a position */
export type PathPoint = { at: string; offset?: [number, number, number]; stage: number; colour?: number; dwell?: number } | { pos: [number, number, number]; stage: number; colour?: number; dwell?: number }

export type EffectSpec =
  | { type: 'heartbeat'; structures: RegExp; bpm?: number }
  /** travelling glow bands: blood in vessels (by kind), or with names + dir any tube (gut, ureters, brain) */
  | { type: 'flow'; kinds?: string[]; origin: string; colour?: number; names?: RegExp; dir?: 1 | -1; speed?: number
      /** waves per metre (55 = about 11 cm apart), band sharpness (higher = thinner), brightness */
      freq?: number; sharp?: number; strength?: number }
  /** a gentle rhythmic squeeze, e.g. the stomach churning */
  | { type: 'wobble'; structure: string; amount?: number; period?: number }
  | { type: 'breathe'; lungs: string[]; diaphragm: string; period?: number }
  | { type: 'travel'; path: PathPoint[]; colour: number; seconds: number; size?: number }
  | { type: 'hinge'; pivotOf: string; pivotEnd: 'bottom' | 'top'; moving: (s: { name: string; centre: number[]; system: string }) => boolean; degrees: number; period?: number; contract?: RegExp }
  | { type: 'glow'; groups: string[][]; colour?: number; seconds?: number }
  | { type: 'fill'; structure: string; period?: number }
  | { type: 'all'; effects: EffectSpec[] }
  /** cut one organ open (only that organ), like a textbook section; the cut face shows deeper red */
  | { type: 'cut'; group: string; axis: 'x' | 'y' | 'z'; keep: 'above' | 'below'; position?: number }

export interface Effect {
  update(t: number): void
  dispose(): void
  /** for path effects: which caption is current */
  stage(): number
}

export interface EffectEnv { engine: AnatomyEngine; index: AnatomyIndex }

const V = (a: number[]) => new THREE.Vector3(a[0], a[1], a[2])

/** structures (shown ones first) whose name matches exactly or by pattern */
function idsByName(env: EffectEnv, name: string | RegExp) {
  return env.index.manifest.structures.filter(s => (typeof name === 'string' ? s.name === name : name.test(s.name))).map(s => s.id)
}

/** Move a structure's node: transform about a world pivot. The nodes start at identity. */
function transformAbout(node: THREE.Object3D, pivot: THREE.Vector3, q: THREE.Quaternion, s: THREE.Vector3) {
  node.quaternion.copy(q)
  node.scale.copy(s)
  // position so that the pivot stays where it is: p - R(S p)
  node.position.copy(pivot).sub(pivot.clone().multiply(s).applyQuaternion(q))
}
function resetNode(node: THREE.Object3D) {
  node.position.set(0, 0, 0)
  node.quaternion.identity()
  node.scale.set(1, 1, 1)
}

/** "lub-dub": two quick beats, then rest */
function beat(phase: number) {
  const b = (c: number, w: number) => Math.exp(-(((phase - c) / w) ** 2))
  return b(0.12, 0.06) + 0.6 * b(0.32, 0.05)
}

/** Emissive bands that travel away from (dir 1) or towards (dir -1) a point - blood or urine flowing */
function flowMaterial(colour: number, glow: number, origin: THREE.Vector3, dir: number, time: { value: number }, speed = 9, freq = 55, sharp = 10, strength = 1.1) {
  const m = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.48 })
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = time
    shader.uniforms.uOrigin = { value: origin }
    shader.uniforms.uDir = { value: dir }
    shader.uniforms.uGlow = { value: new THREE.Color(glow) }
    shader.uniforms.uSpeed = { value: speed }
    shader.uniforms.uFreq = { value: freq }
    shader.uniforms.uSharp = { value: sharp }
    shader.uniforms.uStrength = { value: strength }
    shader.vertexShader = 'varying vec3 vFlowPos;\n' + shader.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\n  vFlowPos = (modelMatrix * vec4(transformed, 1.0)).xyz;')
    shader.fragmentShader = 'uniform float uTime;\nuniform float uSpeed;\nuniform float uFreq;\nuniform float uSharp;\nuniform float uStrength;\nuniform vec3 uOrigin;\nuniform float uDir;\nuniform vec3 uGlow;\nvarying vec3 vFlowPos;\n' + shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
  float flowD = distance(vFlowPos, uOrigin);
  float flowW = 0.5 + 0.5 * sin(flowD * uFreq - uDir * uTime * uSpeed);
  totalEmissiveRadiance += uGlow * pow(flowW, uSharp) * uStrength;`)
  }
  m.customProgramCacheKey = () => 'anatomy-flow'
  return m
}

export function buildEffect(env: EffectEnv, spec: EffectSpec): Effect {
  const { engine, index } = env
  const noStage = () => 0

  switch (spec.type) {
    case 'all': {
      const parts = spec.effects.map(e => buildEffect(env, e))
      return {
        update: t => parts.forEach(p => p.update(t)),
        dispose: () => parts.forEach(p => p.dispose()),
        stage: () => Math.max(...parts.map(p => p.stage())),
      }
    }

    case 'heartbeat': {
      const ids = idsByName(env, spec.structures).filter(id => engine.nodeOf(id))
      const pivot = engine.centreOf(ids)
      const nodes = ids.map(id => engine.nodeOf(id)!)
      const period = 60 / (spec.bpm ?? 70)
      const q = new THREE.Quaternion()
      return {
        update(t) {
          const k = 1 + 0.05 * beat((t / period) % 1)
          for (const n of nodes) transformAbout(n, pivot, q, new THREE.Vector3(k, k, k))
        },
        dispose() { nodes.forEach(resetNode) },
        stage: noStage,
      }
    }

    case 'flow': {
      const time = { value: 0 }
      const origin = engine.centreOf(idsByName(env, spec.origin))
      const mats = new Map<string, THREE.Material>()
      const touched: string[] = []
      const overrides = new Map<string, THREE.Material>()
      for (const s of index.manifest.structures) {
        if ((spec.kinds && !spec.kinds.includes(s.kind)) || (spec.names && !spec.names.test(s.name)) || !engine.nodeOf(s.id)) continue
        // arteries carry blood away from the heart, veins back to it; other tubes flow one way
        const dir = spec.dir ?? (s.kind === 'artery' ? 1 : -1)
        const colour = colourOf(s)
        const key = `${colour}:${dir}`
        if (!mats.has(key)) mats.set(key, flowMaterial(colour, spec.colour ?? 0xffd9d0, origin, dir, time, spec.speed ?? 9, spec.freq, spec.sharp, spec.strength))
        overrides.set(s.id, mats.get(key)!)
        touched.push(s.id)
      }
      engine.setOverrides(overrides)
      return {
        update(t) { time.value = t },
        dispose() {
          engine.setOverrides(new Map(touched.map(id => [id, null])))
          for (const m of mats.values()) disposeMaterial(m)
        },
        stage: noStage,
      }
    }

    case 'breathe': {
      const period = spec.period ?? 4.5
      const lungs = spec.lungs.map(g => {
        const ids = index.group(g)?.ids.filter(id => engine.nodeOf(id)) ?? []
        return { nodes: ids.map(id => engine.nodeOf(id)!), pivot: engine.centreOf(ids) }
      })
      const dia = idsByName(env, spec.diaphragm).map(id => engine.nodeOf(id)).filter((n): n is THREE.Object3D => !!n)
      const q = new THREE.Quaternion()
      let phase = 0
      let inhaling = true
      return {
        update(t) {
          // breathe in for 40% of the cycle, out for 60%
          const c = (t / period) % 1
          inhaling = c < 0.4
          phase = c < 0.4 ? 0.5 - 0.5 * Math.cos((c / 0.4) * Math.PI) : 0.5 + 0.5 * Math.cos(((c - 0.4) / 0.6) * Math.PI)
          for (const l of lungs) for (const n of l.nodes) transformAbout(n, l.pivot, q, new THREE.Vector3(1 + 0.08 * phase, 1 + 0.05 * phase, 1 + 0.08 * phase))
          // the diaphragm contracts and flattens: it moves down
          for (const n of dia) { resetNode(n); n.position.y = -0.02 * phase }
        },
        dispose() { lungs.forEach(l => l.nodes.forEach(resetNode)); dia.forEach(resetNode) },
        // stage 0 = breathing in, 1 = breathing out
        stage: () => (inhaling ? 0 : 1),
      }
    }

    case 'travel': {
      const pts: { p: THREE.Vector3; stage: number; colour?: number; dwell: number }[] = []
      for (const pt of spec.path) {
        let p: THREE.Vector3
        if ('pos' in pt) p = V(pt.pos)
        else {
          const s = index.manifest.structures.find(x => x.name === pt.at)
          if (!s) continue
          p = V(s.centre)
          if (pt.offset) p.add(V(pt.offset))
        }
        pts.push({ p, stage: pt.stage, colour: pt.colour, dwell: pt.dwell ?? 0 })
      }
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(spec.size ?? 0.011, 20, 14),
        new THREE.MeshBasicMaterial({ color: spec.colour, depthTest: false, transparent: true, opacity: 0.95 }),
      )
      marker.renderOrder = 40
      const halo = new THREE.Mesh(new THREE.SphereGeometry((spec.size ?? 0.011) * 2.2, 20, 14), new THREE.MeshBasicMaterial({ color: spec.colour, depthTest: false, transparent: true, opacity: 0.25 }))
      halo.renderOrder = 39
      marker.add(halo)
      engine.addObject(marker)
      // time along the path: proportional to distance, plus pauses
      const seg: number[] = []
      let total = 0
      for (let i = 0; i < pts.length - 1; i++) { const d = pts[i].p.distanceTo(pts[i + 1].p) + pts[i].dwell * 0.05; seg.push(d); total += d }
      let stage = 0
      return {
        update(t) {
          if (pts.length < 2) return
          let u = ((t % spec.seconds) / spec.seconds) * total
          let i = 0
          while (i < seg.length - 1 && u > seg[i]) { u -= seg[i]; i++ }
          const dwellLen = pts[i].dwell * 0.05
          const k = Math.max(0, Math.min(1, (u - dwellLen) / Math.max(1e-6, seg[i] - dwellLen)))
          marker.position.lerpVectors(pts[i].p, pts[i + 1].p, k)
          stage = pts[i].stage
          const c = pts[i].colour
          if (c !== undefined) { (marker.material as THREE.MeshBasicMaterial).color.setHex(c); (halo.material as THREE.MeshBasicMaterial).color.setHex(c) }
        },
        dispose() {
          engine.removeObject(marker)
          marker.geometry.dispose(); halo.geometry.dispose()
          ;(marker.material as THREE.Material).dispose(); (halo.material as THREE.Material).dispose()
        },
        stage: () => stage,
      }
    }

    case 'hinge': {
      const ref = index.manifest.structures.find(s => s.name === spec.pivotOf)
      if (!ref) return { update() {}, dispose() {}, stage: noStage }
      const pivot = V([ref.centre[0] + ref.size[0] * 0.15, ref.centre[1] + (spec.pivotEnd === 'bottom' ? -1 : 1) * ref.size[1] / 2 + 0.01, ref.centre[2]])
      const moving = index.manifest.structures.filter(s => spec.moving(s) && engine.nodeOf(s.id)).map(s => engine.nodeOf(s.id)!)
      const contract = spec.contract ? idsByName(env, spec.contract).filter(id => engine.nodeOf(id)) : []
      const cNodes = contract.map(id => engine.nodeOf(id)!)
      const cPivot = contract.length ? engine.centreOf(contract).add(new THREE.Vector3(0, 0.08, 0)) : new THREE.Vector3()
      const period = spec.period ?? 4
      const axis = new THREE.Vector3(1, 0, 0)
      const one = new THREE.Vector3(1, 1, 1), q0 = new THREE.Quaternion()
      return {
        update(t) {
          const k = 0.5 - 0.5 * Math.cos((t / period) * Math.PI * 2)
          // negative about +x swings the forearm forward and up
          const q = new THREE.Quaternion().setFromAxisAngle(axis, -THREE.MathUtils.degToRad(spec.degrees) * k)
          for (const n of moving) transformAbout(n, pivot, q, one)
          // the contracting muscle gets shorter and fatter
          for (const n of cNodes) transformAbout(n, cPivot, q0, new THREE.Vector3(1 + 0.18 * k, 1 - 0.1 * k, 1 + 0.25 * k))
        },
        dispose() { moving.forEach(resetNode); cNodes.forEach(resetNode) },
        stage: noStage,
      }
    }

    case 'glow': {
      const seconds = spec.seconds ?? 2.2
      const glow = new THREE.MeshStandardMaterial({ color: spec.colour ?? 0x34d399, emissive: spec.colour ?? 0x34d399, emissiveIntensity: 0.6, roughness: 0.4 })
      const groups = spec.groups.map(g => g.flatMap(k => index.group(k)?.ids ?? idsByName(env, k)).filter(id => engine.nodeOf(id)))
      let current = -1
      return {
        update(t) {
          const i = Math.floor(t / seconds) % groups.length
          glow.emissiveIntensity = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 6))
          if (i === current) return
          const next = new Map<string, THREE.Material | null>()
          if (current >= 0) for (const id of groups[current]) next.set(id, null)
          current = i
          for (const id of groups[i]) next.set(id, glow)
          engine.setOverrides(next)
        },
        dispose() {
          if (current >= 0) engine.setOverrides(new Map(groups[current].map(id => [id, null])))
          glow.dispose()
        },
        stage: () => Math.max(0, current),
      }
    }

    case 'cut': {
      const g = index.group(spec.group)
      const ids = (g?.ids ?? []).filter(id => engine.nodeOf(id))
      const n = new THREE.Vector3(spec.axis === 'x' ? 1 : 0, spec.axis === 'y' ? 1 : 0, spec.axis === 'z' ? 1 : 0)
      const at = spec.position ?? (g ? g.centre[{ x: 0, y: 1, z: 2 }[spec.axis]] : 0)
      if (spec.keep === 'below') n.negate()
      const plane = new THREE.Plane(n, spec.keep === 'below' ? at : -at)
      const mats = new Map<number, THREE.Material>()
      const overrides = new Map<string, THREE.Material | null>()
      for (const id of ids) {
        const s = index.structure(id)!
        const colour = colourOf(s)
        if (!mats.has(colour)) {
          const m = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.5, side: THREE.DoubleSide, clippingPlanes: [plane] })
          // the inside (back faces seen through the cut) is a deeper red, like the cut surface in a diagram
          m.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n  if (!gl_FrontFacing) diffuseColor.rgb *= vec3(0.78, 0.38, 0.42);')
          }
          m.customProgramCacheKey = () => 'anatomy-cut'
          mats.set(colour, m)
        }
        overrides.set(id, mats.get(colour)!)
      }
      engine.setOverrides(overrides)
      return {
        update() {},
        dispose() {
          engine.setOverrides(new Map(ids.map(id => [id, null])))
          for (const m of mats.values()) disposeMaterial(m)
        },
        stage: noStage,
      }
    }

    case 'wobble': {
      const ids = idsByName(env, spec.structure).filter(id => engine.nodeOf(id))
      const nodes = ids.map(id => engine.nodeOf(id)!)
      const pivot = engine.centreOf(ids)
      const period = spec.period ?? 3
      const a = spec.amount ?? 0.05
      const q = new THREE.Quaternion()
      return {
        update(t) {
          const w = (t / period) * Math.PI * 2
          for (const n of nodes) transformAbout(n, pivot, q, new THREE.Vector3(1 + a * Math.sin(w), 1 - a * 0.6 * Math.sin(w), 1 + a * 0.5 * Math.sin(w + 1.3)))
        },
        dispose() { nodes.forEach(resetNode) },
        stage: noStage,
      }
    }

    case 'fill': {
      const ids = idsByName(env, spec.structure).filter(id => engine.nodeOf(id))
      const nodes = ids.map(id => engine.nodeOf(id)!)
      const pivot = engine.centreOf(ids)
      const period = spec.period ?? 8
      const q = new THREE.Quaternion()
      return {
        update(t) {
          const c = (t / period) % 1
          // slowly fills, then empties quickly
          const k = c < 0.8 ? c / 0.8 : 1 - (c - 0.8) / 0.2
          const s = 0.8 + 0.4 * k
          for (const n of nodes) transformAbout(n, pivot, q, new THREE.Vector3(s, s, s))
        },
        dispose() { nodes.forEach(resetNode) },
        stage: noStage,
      }
    }
  }
}
