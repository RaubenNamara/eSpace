import type { AnatomyManifest, SystemKey } from './types'

export interface SystemDef {
  key: SystemKey
  name: string
  /** swatch shown in the selector */
  colour: string
  /** one-line school summary */
  summary: string
  /** age-appropriate content: off until a teacher (or the learner) turns it on */
  sensitive?: boolean
  /** what the dataset does not have - shown so nothing is invented to fill the gap */
  gaps?: string
}

/** Order here is the order in the selector */
export const SYSTEMS: SystemDef[] = [
  { key: 'integumentary', name: 'Skin (integumentary)', colour: '#c99b7f', summary: 'The skin covers and protects the body, keeps water in and helps control body temperature.',
    gaps: 'The outer skin surface, with the hair of the head, eyebrows and lips. Nails and the layers inside the skin are not modelled.' },
  { key: 'skeletal', name: 'Skeletal system', colour: '#e8dcc0', summary: 'Bones and cartilage support the body, protect organs, allow movement and make blood cells.' },
  { key: 'muscular', name: 'Muscular system', colour: '#b5483f', summary: 'Skeletal muscles pull on bones to move the body and hold posture.',
    gaps: 'Most muscles of the trunk, limbs and neck. The muscles of facial expression and chewing are not in the dataset.' },
  { key: 'circulatory', name: 'Circulatory system', colour: '#c23b3b', summary: 'The heart pumps blood through arteries and veins, carrying oxygen and food to cells and removing waste.',
    gaps: 'Arteries and veins down to medium-sized branches; capillaries are not modelled. The spleen and thymus are shown here.' },
  { key: 'respiratory', name: 'Respiratory system', colour: '#d98a95', summary: 'The airways and lungs take in oxygen and remove carbon dioxide.',
    gaps: 'The lungs are shown as their five lobes (from BodyParts3D 3.0), with the bronchial tree inside. The tiny air sacs (alveoli) are too small to model.' },
  { key: 'digestive', name: 'Digestive system', colour: '#c98b4e', summary: 'The gut breaks food down so it can be absorbed, helped by the liver, gallbladder and pancreas.' },
  { key: 'nervous', name: 'Nervous system', colour: '#e3c455', summary: 'The brain, spinal cord and nerves carry messages that control and coordinate the body.',
    gaps: 'The brain in detail, the eyes and the nerves around them. The spinal cord is shown only by its thin central canal, and the nerves of the body and limbs are not in the dataset.' },
  { key: 'urinary', name: 'Urinary system', colour: '#8fa83a', summary: 'The kidneys filter the blood and make urine, which is stored in the bladder.' },
  { key: 'reproductive', name: 'Reproductive system', colour: '#9a6fb0', summary: 'Organs that make sex cells (eggs or sperm) and sex hormones. Choose female or male organs.',
    sensitive: true, gaps: 'Male organs are from the BodyParts3D body. Female organs (uterus, uterine tubes, ovaries, top of the vagina) are from a female body in the Human Reference Atlas and placed in this pelvis, so their position is approximate. Female external genitalia are not modelled.' },
  { key: 'endocrine', name: 'Endocrine system', colour: '#3f9e8f', summary: 'Glands release hormones into the blood that control growth, energy use and other body processes.',
    gaps: 'Pituitary, adrenal glands, pancreas and thymus (and the ovaries or testes when reproductive organs are switched on). The thyroid and parathyroid glands are not in the dataset.' },
]

export const SYSTEM_BY_KEY = Object.fromEntries(SYSTEMS.map(s => [s.key, s])) as Record<SystemKey, SystemDef>

export type Availability = 'available' | 'missing'

/** A system is shown only if the manifest actually has meshes for it */
export function systemAvailability(manifest: AnatomyManifest | null, key: SystemKey): Availability {
  const a = manifest?.systems[key]
  if (a && a.file && a.count > 0) return 'available'
  // endocrine glands may live inside other systems' files (the pancreas is in the digestive file)
  if (manifest?.structures.some(s => s.also.includes(key))) return 'available'
  return 'missing'
}

/** The asset files that must be loaded to show a system (its own file + files holding shared structures) */
export function filesForSystem(manifest: AnatomyManifest, key: SystemKey): SystemKey[] {
  const out = new Set<SystemKey>()
  const own = manifest.systems[key]
  if (own?.file && own.count > 0) out.add(key)
  for (const s of manifest.structures) if (s.also.includes(key)) out.add(s.system)
  return [...out]
}
