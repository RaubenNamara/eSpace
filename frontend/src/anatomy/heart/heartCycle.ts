/**
 * One heartbeat (the cardiac cycle) as plain numbers, for the heart close-up. `c` is the fraction of
 * the beat, 0..1, starting when the atria contract. Timings follow the textbook cycle at about
 * 75 beats a minute (0.8 s): atrial systole 0.1 s, ventricular systole 0.3 s, diastole 0.4 s.
 */

export type CyclePhase = 'atrial-systole' | 'isovolumetric-contraction' | 'ejection' | 'isovolumetric-relaxation' | 'filling'

export interface PhaseInfo {
  key: CyclePhase
  /** short name for the phase strip */
  name: string
  start: number
  end: number
  /** what the learner should notice, shown as the caption */
  caption: string
}

export const PHASES: PhaseInfo[] = [
  { key: 'atrial-systole', name: 'Atria contract', start: 0, end: 0.13,
    caption: 'The atria contract, topping up the ventricles through the open tricuspid and mitral valves.' },
  { key: 'isovolumetric-contraction', name: 'AV valves shut ("lub")', start: 0.13, end: 0.19,
    caption: 'The ventricles start to contract. The pressure snaps the tricuspid and mitral valves shut: the first sound, "lub".' },
  { key: 'ejection', name: 'Ventricles pump', start: 0.19, end: 0.47,
    caption: 'The pulmonary and aortic valves open. The right ventricle sends oxygen-poor blood to the lungs; the left sends oxygen-rich blood to the body.' },
  { key: 'isovolumetric-relaxation', name: 'Semilunar valves shut ("dub")', start: 0.47, end: 0.56,
    caption: 'The ventricles relax. Blood starts to fall back and closes the pulmonary and aortic valves: the second sound, "dub".' },
  { key: 'filling', name: 'Heart fills', start: 0.56, end: 1,
    caption: 'The whole heart relaxes. Blood from the veins fills the atria and flows on through the open tricuspid and mitral valves into the ventricles.' },
]

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const smooth = (a: number, b: number, x: number) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t) }
const wrap = (c: number) => ((c % 1) + 1) % 1

export function phaseAt(c: number): PhaseInfo {
  const x = wrap(c)
  return PHASES.find(p => x >= p.start && x < p.end) ?? PHASES[PHASES.length - 1]
}

/** How far the atria are squeezed, 0 relaxed .. 1 fully contracted */
export function atrialContraction(c: number) {
  const x = wrap(c)
  return x < 0.13 ? Math.sin((x / 0.13) * Math.PI) : 0
}

/** The atria swell as they fill while the AV valves are shut, then empty when the valves open */
export function atrialFilling(c: number) {
  const x = wrap(c)
  if (x < 0.13) return 0
  if (x < 0.56) return smooth(0.13, 0.5, x)
  return 1 - smooth(0.56, 0.7, x)
}

/** How far the ventricles are squeezed, 0 relaxed .. 1 fully contracted */
export function ventricularContraction(c: number) {
  const x = wrap(c)
  return smooth(0.12, 0.3, x) * (1 - smooth(0.42, 0.6, x))
}

/** Tricuspid and mitral valves: 1 open, 0 shut. Shut from early ventricular systole until the ventricles have relaxed */
export function avValveOpen(c: number) {
  const x = wrap(c)
  return Math.max(1 - smooth(0.12, 0.15, x), smooth(0.56, 0.61, x))
}

/** Pulmonary and aortic valves: 1 open, 0 shut. Open only while the ventricles eject */
export function semilunarValveOpen(c: number) {
  const x = wrap(c)
  return smooth(0.19, 0.22, x) * (1 - smooth(0.46, 0.49, x))
}

export type FlowSegment = 'vein' | 'atrium' | 'ventricle-in' | 'ventricle-out' | 'artery'

/**
 * How fast blood moves in each part of its path at this moment (1 = typical). The valves themselves
 * are gates between segments (see avValveOpen / semilunarValveOpen): blood waits behind a shut valve.
 */
export function flowRate(c: number, segment: FlowSegment) {
  const av = avValveOpen(c), sl = semilunarValveOpen(c), a = atrialContraction(c), v = ventricularContraction(c)
  switch (segment) {
    // venous return is steady, slowed a little while the atria squeeze
    case 'vein': return 1 - 0.5 * a
    // the atria empty quickly once the AV valves open, and again with the atrial "kick"
    case 'atrium': return 0.5 + av * (1.2 + 1.5 * a)
    case 'ventricle-in': return 0.4 + av * (1 + a)
    // towards the outflow valve: a rush while the ventricle squeezes
    case 'ventricle-out': return 0.3 + 2.6 * Math.max(sl, 0.4 * v)
    // the arterial pulse: a surge with each ejection, a trickle between beats
    case 'artery': return 0.35 + 2.6 * sl
  }
}
