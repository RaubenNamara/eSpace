/** Shared types for the Anatomy Explorer. The asset data comes from public/anatomy/<source>/manifest.json,
 *  written by scripts/anatomy/build-bodyparts3d.mjs. */

/** which reproductive organs are shown: BodyParts3D (male body) or the Human Reference Atlas female organs */
export type ReproSex = 'male' | 'female'

export type SystemKey =
  | 'skeletal' | 'muscular' | 'circulatory' | 'respiratory' | 'digestive'
  | 'nervous' | 'urinary' | 'reproductive' | 'endocrine' | 'integumentary'

/** What a structure is made of - decides its colour */
export type StructureKind =
  | 'skin' | 'bone' | 'cartilage' | 'muscle' | 'tendon' | 'artery' | 'vein' | 'heart'
  | 'brain' | 'nerve' | 'eye' | 'organ' | 'duct' | 'gland' | 'tooth'

/** One element mesh of the model (BodyParts3D "FJ" file) */
export interface Structure {
  id: string
  name: string
  /** Foundational Model of Anatomy concept id, e.g. FMA7088 */
  fma: string | null
  system: SystemKey
  /** other systems this structure also belongs to (e.g. the pancreas is digestive and endocrine) */
  also: SystemKey[]
  kind: StructureKind
  /** school-level organ it belongs to (slug), e.g. "right-lung" */
  group: string
  groupName: string
  /** bounding-box centre and size, metres, y up, +z towards the front of the body */
  centre: [number, number, number]
  size: [number, number, number]
  /** not anatomy: the smooth skin cover shown when reproductive content is off */
  cover?: boolean
  /** set when the structure comes from another release (see manifest.extraSources) */
  source?: string
  /** reproductive structures belong to one sex; the viewer shows one set at a time */
  sex?: ReproSex
}

export interface SystemAsset {
  file: string | null
  count: number
  bytes: number
}

export interface AnatomyManifest {
  version: number
  source: {
    name: string
    version: string
    holder: string
    licence: string
    licenceUrl: string
    attribution: string
    url: string
    changes: string
  }
  /** other releases used for particular structures, e.g. the lung lobes from BodyParts3D 3.0 */
  extraSources?: { name: string; version: string; holder: string; licence: string; licenceUrl: string; attribution: string; url: string; covers: string }[]
  units: 'm'
  height: number | null
  systems: Partial<Record<SystemKey, SystemAsset>>
  structures: Structure[]
}

/** How much detail to show: school-level (whole organs) or advanced (each named part) */
export type DetailLevel = 'school' | 'advanced'

/** A school-level organ: one or more structures shown and selected together */
export interface OrganGroup {
  key: string
  name: string
  system: SystemKey
  systems: SystemKey[]
  ids: string[]
  centre: [number, number, number]
  size: [number, number, number]
}

/** What the details panel shows for a selection */
export interface StructureInfo {
  title: string
  system: SystemKey
  systems: SystemKey[]
  /** written for the school curriculum; null where we have no checked text for it */
  summary: string | null
  function: string | null
  location: string
  importance: string | null
  facts: string[]
  /** technical details: FMA ids, part names */
  advanced: { label: string; value: string }[]
  /** what is selected: the whole organ or one part of it */
  scope: 'group' | 'structure'
  curriculum: string[]
}

/** A cross-section: x = sagittal, y = transverse, z = frontal; keep the part above / below the plane */
export interface ClipSpec { axis: 'x' | 'y' | 'z'; position: number; keep: 'above' | 'below' }

export type ViewName = 'front' | 'back' | 'left' | 'right' | 'top'

export type LoadState =
  | { status: 'idle' }
  | { status: 'loading'; progress: number }
  | { status: 'ready' }
  | { status: 'error'; message: string }
