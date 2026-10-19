/**
 * "Living body": each system working on its own while it is shown in the Explorer - the heart beats
 * and blood flows, the lungs breathe, the gut moves food along, and so on. Built from the same
 * effects as the system guides (effects.ts).
 */
import type { SystemKey, ViewName } from './types'
import { buildEffect, type Effect, type EffectEnv, type EffectSpec } from './effects'

export interface LivingSystem {
  specs: EffectSpec[]
  /** what to watch for, shown when the learner asks to see it working */
  caption: string
  /** shown with it when watching it work */
  companions?: SystemKey[]
  /** camera when watching it work */
  focus?: string[]
  view?: ViewName
}

const HEART = /^(Cavity of|.*(valve|cusp|leaflet|ventric|atri))/i
const armForMuscles = (s: { centre: number[]; system: string }) => (s.system === 'skeletal' || s.system === 'muscular') && s.centre[0] > 0.16 && s.centre[1] < 1.1 && s.centre[1] > 0.7

export const LIVING: Partial<Record<SystemKey, LivingSystem>> = {
  circulatory: {
    specs: [{ type: 'heartbeat', structures: HEART, bpm: 70 }, { type: 'flow', kinds: ['artery', 'vein'], origin: 'Cavity of left ventricle' }],
    caption: 'The heart is pumping about 70 times a minute. Pulses of blood travel away from the heart in the arteries (red) and back to it in the veins (blue).',
    focus: ['circulatory/heart', 'circulatory/aorta'],
  },
  respiratory: {
    specs: [{ type: 'breathe', lungs: ['respiratory/left-lung', 'respiratory/right-lung'], diaphragm: 'Diaphragm', period: 4.5 }],
    caption: 'Breathing: the diaphragm moves down and the lungs fill with air, then the diaphragm rises and air is pushed out.',
    focus: ['respiratory/left-lung', 'respiratory/right-lung', 'respiratory/trachea'],
  },
  digestive: {
    specs: [
      { type: 'flow', names: /^(Esophagus|Stomach|Duodenum|.*jejunum|.*ileum|.*colon|Cecum|Rectum|Appendix)$/i, origin: 'Tongue', dir: 1, colour: 0xff5a00, speed: 5, freq: 110, sharp: 3, strength: 0.75 },
      { type: 'wobble', structure: 'Stomach', amount: 0.05, period: 3 },
    ],
    caption: 'Waves of muscle contraction (peristalsis) push food along the gut, from the oesophagus to the rectum, while the stomach churns.',
    focus: ['digestive/stomach', 'digestive/small-intestine', 'digestive/esophagus'],
  },
  urinary: {
    specs: [
      { type: 'flow', names: /ureter$|^Urethra$/i, origin: 'Left kidney', dir: 1, colour: 0xffd21f, speed: 6, freq: 90, sharp: 3, strength: 1.5 },
      { type: 'fill', structure: 'Urinary bladder', period: 12 },
    ],
    caption: 'The kidneys filter the blood all the time. Urine trickles down the ureters and the bladder slowly fills.',
    companions: ['skeletal'],
    focus: ['urinary/left-kidney', 'urinary/right-kidney', 'urinary/urinary-bladder'],
  },
  nervous: {
    specs: [{ type: 'flow', kinds: ['brain', 'nerve'], origin: 'Medulla oblongata', dir: 1, colour: 0x0ea5e9, speed: 20, freq: 160, sharp: 4, strength: 1.2 }],
    caption: 'Nerve impulses - tiny electrical signals - are passing through the brain all the time, even while you sleep.',
    focus: ['nervous/left-cerebral-hemisphere', 'nervous/right-cerebral-hemisphere', 'nervous/cerebellum'],
    view: 'left',
  },
  endocrine: {
    specs: [{ type: 'glow', groups: [['endocrine/pituitary-gland', 'endocrine/left-adrenal-gland', 'endocrine/right-adrenal-gland', 'digestive/pancreas']], colour: 0x2dd4bf, seconds: 60 }],
    caption: 'The glands release hormones into the blood: the pituitary (growth, water balance), the adrenals (adrenaline) and the pancreas (insulin and glucagon).',
    companions: ['skeletal'],
  },
  skeletal: {
    specs: [{ type: 'hinge', pivotOf: 'Left humerus', pivotEnd: 'bottom', moving: armForMuscles, degrees: 70, period: 6 }],
    caption: 'The elbow is a hinge joint: watch the forearm bones swing up and down. The skeleton supports the body and lets it move.',
    focus: ['skeletal/left-humerus', 'skeletal/left-radius', 'skeletal/left-ulna'],
    view: 'left',
  },
  muscular: {
    specs: [{ type: 'hinge', pivotOf: 'Left humerus', pivotEnd: 'bottom', moving: armForMuscles, degrees: 70, period: 6, contract: /left biceps brachii/i }],
    caption: 'The biceps contracts - shorter and fatter - and pulls the forearm up. Muscles only pull, so the triceps pulls it back down.',
    companions: ['skeletal'],
    focus: ['muscular/left-biceps-brachii', 'skeletal/left-humerus', 'skeletal/left-radius'],
    view: 'left',
  },
  integumentary: {
    specs: [],
    caption: 'The skin protects the body, senses touch and temperature, and keeps body temperature steady by sweating.',
  },
}

/** One effect running every shown system at once. The arm moves only once (muscles if shown, else bones). */
export function livingEffect(env: EffectEnv, systems: SystemKey[]): Effect {
  const specs: EffectSpec[] = []
  for (const s of systems) {
    if (s === 'skeletal' && systems.includes('muscular')) continue
    specs.push(...(LIVING[s]?.specs ?? []))
  }
  return buildEffect(env, { type: 'all', effects: specs })
}
