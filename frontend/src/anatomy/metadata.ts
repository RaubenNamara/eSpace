import type { AnatomyManifest, DetailLevel, OrganGroup, ReproSex, Structure, StructureInfo, SystemKey } from './types'
import { contentFor } from './content'
import { SYSTEM_BY_KEY } from './systems'

export class ManifestError extends Error {}

/** Fetches and checks manifest.json. Throws ManifestError with a readable message on any problem. */
export async function loadManifest(url: string, fetchImpl: typeof fetch = fetch): Promise<AnatomyManifest> {
  let res: Response
  try {
    res = await fetchImpl(url)
  } catch {
    throw new ManifestError('Could not reach the anatomy data. Check your connection and try again.')
  }
  if (!res.ok) throw new ManifestError(`The anatomy data is missing on the server (HTTP ${res.status}).`)
  let data: unknown
  try {
    data = await res.json()
  } catch {
    throw new ManifestError('The anatomy data file is damaged (not valid JSON).')
  }
  const m = data as Partial<AnatomyManifest>
  if (!m || typeof m !== 'object' || !Array.isArray(m.structures) || typeof m.systems !== 'object' || !m.source) {
    throw new ManifestError('The anatomy data file is not in the expected format.')
  }
  return m as AnatomyManifest
}

export const groupKey = (s: Pick<Structure, 'system' | 'group'>) => `${s.system}/${s.group}`

/** British school spellings and everyday names -> the dataset's terms */
const SYNONYMS: [RegExp, string][] = [
  [/\boesophag/g, 'esophag'], [/\bgullet\b/g, 'esophagus'], [/\bwindpipe\b/g, 'trachea'],
  [/\bfaec/g, 'fec'], [/\bhaem/g, 'hem'], [/\bcaecum\b/g, 'cecum'], [/\bfoetus\b/g, 'fetus'],
  [/\bkneecap\b/g, 'patella'], [/\bthigh ?bone\b/g, 'femur'], [/\bcollar ?bone\b/g, 'clavicle'],
  [/\bbreast ?bone\b/g, 'sternum'], [/\b(back ?bone|spine)\b/g, 'vertebral column'], [/\bshoulder ?blade\b/g, 'scapula'],
  [/\bshin ?bone\b/g, 'tibia'], [/\bjaw ?bone\b/g, 'mandible'], [/\bribs\b/g, 'rib'], [/\bvertebrae\b/g, 'vertebra'],
  [/\bbiceps\b/g, 'biceps brachii'], [/\btriceps\b/g, 'triceps brachii'], [/\bcalf muscle\b/g, 'gastrocnemius'],
  [/\bsix ?pack\b/g, 'rectus abdominis'], [/\bbowel\b/g, 'intestine'], [/\bgut\b/g, 'intestine'], [/\bcolon\b/g, 'colon'],
  [/\bbladder\b/g, 'bladder'], [/\bteeth\b/g, 'tooth'], [/\blungs\b/g, 'lung'], [/\bkidneys\b/g, 'kidney'],
  [/\bbrain ?stem\b/g, 'brainstem'], [/\badrenal\b/g, 'adrenal'], [/\btestes\b/g, 'testis'], [/\bcranium\b/g, 'skull'],
]
export function normaliseQuery(q: string) {
  let s = q.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()
  for (const [re, to] of SYNONYMS) s = s.replace(re, to)
  return s
}

export interface SearchResult {
  type: 'group' | 'structure'
  /** group key ("digestive/liver") or structure id */
  key: string
  name: string
  system: SystemKey
  /** how many parts a group has */
  parts: number
  score: number
}

/** All lookups the viewer needs, built once from the manifest */
export class AnatomyIndex {
  readonly byId = new Map<string, Structure>()
  readonly groups = new Map<string, OrganGroup>()
  private searchText = new Map<string, string>()

  constructor(readonly manifest: AnatomyManifest) {
    for (const s of manifest.structures) {
      this.byId.set(s.id, s)
      const key = groupKey(s)
      let g = this.groups.get(key)
      if (!g) {
        g = { key, name: s.groupName, system: s.system, systems: [s.system], ids: [], centre: [0, 0, 0], size: [0, 0, 0] }
        this.groups.set(key, g)
      }
      g.ids.push(s.id)
      for (const a of s.also) if (!g.systems.includes(a)) g.systems.push(a)
    }
    // each group's box is the union of its parts' boxes
    for (const g of this.groups.values()) {
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity]
      for (const id of g.ids) {
        const s = this.byId.get(id)!
        for (let k = 0; k < 3; k++) { min[k] = Math.min(min[k], s.centre[k] - s.size[k] / 2); max[k] = Math.max(max[k], s.centre[k] + s.size[k] / 2) }
      }
      g.centre = [0, 1, 2].map(k => (min[k] + max[k]) / 2) as [number, number, number]
      g.size = [0, 1, 2].map(k => max[k] - min[k]) as [number, number, number]
      this.searchText.set(g.key, normaliseQuery(g.name))
    }
    for (const s of manifest.structures) this.searchText.set(s.id, normaliseQuery(s.name))
  }

  structure(id: string) { return this.byId.get(id) ?? null }

  /** the sex an organ belongs to ('male' / 'female'), or null for organs everyone has */
  sexOf(groupKey: string): ReproSex | null {
    const g = this.groups.get(groupKey)
    if (!g) return null
    const sexes = new Set(g.ids.map(id => this.byId.get(id)?.sex).filter((s): s is ReproSex => !!s))
    return sexes.size === 1 ? [...sexes][0] : null
  }
  /** shown for the chosen sex? (organs everyone has are always shown) */
  fitsSex(groupKey: string, sex: ReproSex) {
    const s = this.sexOf(groupKey)
    return !s || s === sex
  }
  group(key: string) { return this.groups.get(key) ?? null }
  groupOf(id: string) { const s = this.byId.get(id); return s ? this.groups.get(groupKey(s)) ?? null : null }

  /** Structures shown when the given systems are switched on */
  structuresIn(systems: Iterable<SystemKey>): Structure[] {
    const on = new Set(systems)
    return this.manifest.structures.filter(s => on.has(s.system) || s.also.some(a => on.has(a)))
  }

  /** What a click on a structure selects: the whole organ (school) or the single part (advanced) */
  selectionFor(id: string, level: DetailLevel): { scope: 'group' | 'structure'; key: string; ids: string[] } | null {
    const s = this.byId.get(id)
    if (!s) return null
    const g = this.groups.get(groupKey(s))
    if (level === 'school' && g) return { scope: 'group', key: g.key, ids: [...g.ids] }
    return { scope: 'structure', key: s.id, ids: [s.id] }
  }

  /**
   * Name search. Groups (whole organs) come first at school level; individual parts are included at
   * advanced level. Every word of the query must appear; matches at word starts rank higher.
   */
  search(query: string, level: DetailLevel = 'school', limit = 20, systems?: SystemKey[]): SearchResult[] {
    const q = normaliseQuery(query)
    if (q.length < 2) return []
    const words = q.split(' ')
    const allowed = systems ? new Set(systems) : null
    const results: SearchResult[] = []
    const score = (text: string) => {
      if (!words.every(w => text.includes(w))) return 0
      let sc = 1
      if (text === q) sc += 100
      else if (text.startsWith(q)) sc += 50
      else if (text.replace(/^(left|right) /, '') === q) sc += 90
      for (const w of words) if (new RegExp(`(^| )${w}`).test(text)) sc += 10
      return sc - text.length / 100 // shorter names first among equals
    }
    for (const g of this.groups.values()) {
      if (allowed && !g.systems.some(s => allowed.has(s))) continue
      const sc = score(this.searchText.get(g.key)!)
      if (sc > 0) results.push({ type: 'group', key: g.key, name: g.name, system: g.system, parts: g.ids.length, score: sc + (g.ids.length > 1 ? 5 : 0) })
    }
    if (level === 'advanced') {
      const seen = new Set(results.map(r => r.name.toLowerCase()))
      for (const s of this.manifest.structures) {
        if (allowed && !allowed.has(s.system) && !s.also.some(a => allowed.has(a))) continue
        if (seen.has(s.name.toLowerCase())) continue
        const sc = score(this.searchText.get(s.id)!)
        if (sc > 0) { results.push({ type: 'structure', key: s.id, name: s.name, system: s.system, parts: 1, score: sc - 2 }); seen.add(s.name.toLowerCase()) }
      }
    }
    return results.sort((a, b) => b.score - a.score).slice(0, limit)
  }

  /** Details panel text for a selected group or structure */
  describe(target: { scope: 'group' | 'structure'; key: string }, level: DetailLevel): StructureInfo | null {
    const g = target.scope === 'group' ? this.groups.get(target.key) : this.groupOf(target.key)
    const s = target.scope === 'structure' ? this.byId.get(target.key) : null
    if (!g && !s) return null
    const title = s ? s.name : g!.name
    const system = (s?.system ?? g!.system) as SystemKey
    const systems = s ? [s.system, ...s.also] : g!.systems
    // checked school text: the organ itself, else (for a part) the organ it belongs to
    const own = contentFor(title)
    const content = own ?? (g ? contentFor(g.name) : null) ?? genericContent(s ?? this.byId.get(g!.ids[0])!)
    const partOf = s && g && g.ids.length > 1 && g.name !== s.name ? g.name : null
    const where = describeLocation(s ? s.centre : g!.centre, this.manifest.height ?? 1.72)
    const advanced: { label: string; value: string }[] = []
    if (s?.fma) advanced.push({ label: 'FMA id', value: s.fma })
    if (s) advanced.push({ label: 'Model element', value: s.id })
    if (partOf) advanced.push({ label: 'Part of', value: partOf })
    if (!s && g && g.ids.length > 1) advanced.push({ label: 'Modelled parts', value: String(g.ids.length) })
    if (level === 'advanced' && content?.advanced) advanced.push({ label: 'More detail', value: content.advanced })
    return {
      title,
      system,
      systems,
      summary: own ? own.summary : partOf ? `Part of the ${partOf.toLowerCase()}.${content?.summary ? ' ' + content.summary : ''}` : content?.summary ?? null,
      function: content?.function ?? null,
      location: content?.location ?? where,
      importance: content?.importance ?? null,
      facts: content?.facts ?? [],
      advanced,
      scope: s ? 'structure' : 'group',
      curriculum: content?.curriculum ?? [],
    }
  }
}

/** Plain facts for structures with no written entry: what kind of thing it is, nothing more */
function genericContent(s: Structure) {
  const sys = SYSTEM_BY_KEY[s.system]?.name.toLowerCase() ?? 'body'
  const generic: Record<string, { summary: string; function: string }> = {
    artery: { summary: 'An artery: a vessel carrying blood away from the heart.', function: 'Carries blood from the heart towards the tissues it supplies.' },
    vein: { summary: 'A vein: a vessel carrying blood back towards the heart.', function: 'Returns blood from the tissues it drains towards the heart.' },
    bone: { summary: 'A bone of the skeleton.', function: 'Supports the body, protects organs and gives attachment to muscles.' },
    cartilage: { summary: 'Cartilage: firm, flexible connective tissue.', function: 'Cushions and shapes parts of the skeleton and joints.' },
    muscle: { summary: 'A skeletal muscle.', function: 'Contracts to pull on bones (or other tissues) and produce movement.' },
    tendon: { summary: 'Tough connective tissue that joins muscle to bone or binds muscles.', function: 'Transmits the pull of muscles and holds structures in place.' },
    nerve: { summary: 'A nerve: a bundle of nerve fibres.', function: 'Carries electrical messages between the brain or spinal cord and the body.' },
    brain: { summary: 'Part of the brain.', function: 'Part of the central nervous system.' },
    tooth: { summary: 'A tooth.', function: 'Bites and chews food (mechanical digestion).' },
  }
  const g = generic[s.kind]
  return g ? { ...g, location: '', importance: '', facts: [] as string[], advanced: undefined, curriculum: [] as string[] }
    : { summary: `Part of the ${sys}.`, function: '', location: '', importance: '', facts: [] as string[], advanced: undefined, curriculum: [] as string[] }
}

/** A rough plain-language location from the model's coordinates (y up from the feet, +x = body's left, +z = front) */
export function describeLocation(c: [number, number, number], height: number) {
  const h = c[1] / height
  const region = h > 0.87 ? 'head' : h > 0.82 ? 'neck' : h > 0.62 ? 'chest' : h > 0.5 ? 'abdomen' : h > 0.45 ? 'pelvis' : h > 0.27 ? 'thigh' : h > 0.05 ? 'lower leg' : 'foot'
  const armReach = Math.abs(c[0]) > 0.19 && h > 0.35
  const side = Math.abs(c[0]) < 0.02 ? 'in the midline' : c[0] > 0 ? "on the body's left side" : "on the body's right side"
  return armReach ? `In the ${c[1] / height > 0.62 ? 'upper arm or shoulder' : 'forearm or hand'}, ${side}.` : `In the ${region}, ${side}.`
}
