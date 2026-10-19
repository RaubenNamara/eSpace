#!/usr/bin/env node
/**
 * Builds the Anatomy Explorer assets from the BodyParts3D 4.0 dataset.
 *
 *   node scripts/anatomy/build-bodyparts3d.mjs <isa-obj-dir> <isa_element_parts.txt> <partof_element_parts.txt> [out-dir]
 *
 * Source: BodyParts3D, (c) The Database Center for Life Science, licensed under
 * Creative Commons Attribution 4.0 International (see README_e.html of the LATEST release;
 * the OBJ headers still carry the older CC BY-SA 2.1 JP notice - see public/anatomy/bodyparts3d/LICENSE.md).
 * Download: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
 *
 * What it does:
 *  - reads every OBJ element file (mm, z up, -y = anterior) and turns it into metres, y up, +z = anterior;
 *  - sorts each element into one body system using the dataset's own part-of and is-a trees;
 *  - groups elements into school-level organs (e.g. all 156 pieces of the right lung -> "right lung");
 *  - writes one GLB per system (one named mesh per element), then simplifies and compresses it
 *    with gltfpack (meshopt), and writes manifest.json with names, FMA ids, groups and bounds.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
// optional: --lungs <BodyParts3D 3.0 obj folder>. Release 4.0 has no lung tissue (only the bronchial
// tree); release 3.0 of the same body has the five lung lobes, under CC BY-SA 2.1 Japan.
const argv = process.argv.slice(2)
const flag = (name) => { const i = argv.indexOf(name); if (i < 0) return null; const v = argv[i + 1]; argv.splice(i, 2); return v }
const lungsDir = flag('--lungs')
// optional: --female <folder of Human Reference Atlas GLBs> (uterus-female, ovary-female-left/right,
// fallopian-tube-female-left/right, urinary-bladder-female). BodyParts3D is a male body only.
const femaleDir = flag('--female')
const [objDir, isaFile, partofFile, outArg] = argv
if (!objDir || !isaFile || !partofFile) {
  console.error('usage: build-bodyparts3d.mjs <isa-obj-dir> <isa_element_parts.txt> <partof_element_parts.txt> [out-dir]')
  process.exit(1)
}
const OUT = path.resolve(outArg ?? path.join(HERE, '../../public/anatomy/bodyparts3d'))
const TMP = path.join(OUT, '.raw')
fs.mkdirSync(TMP, { recursive: true })

/** concept-name sets per element file, from a "concept id \t name \t element file id" table */
function readTree(file) {
  const tree = new Map()
  const counts = new Map()
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/).slice(1)) {
    const [, name, fj] = line.split('\t')
    if (!fj) continue
    if (!tree.has(fj)) tree.set(fj, new Set())
    tree.get(fj).add(name)
    counts.set(name, (counts.get(name) ?? 0) + 1)
  }
  return { tree, counts }
}
const isa = readTree(isaFile)
const partof = readTree(partofFile)

// --- body systems: the first rule that matches wins ---
const SYSTEMS = ['integumentary', 'skeletal', 'muscular', 'circulatory', 'respiratory', 'digestive', 'nervous', 'urinary', 'reproductive', 'endocrine']
const BRAIN = /thalam|commissure|colliculus|corpus callosum|fornix|interpeduncular|interventricular foramen|lamina terminalis|mammillary|chiasm|optic (nerve|tract)|peduncle|septum of telencephalon|stria (terminalis|medullaris)|tentorium|amygdala|caudate nucleus|ganglion|ciliary nerve|corona ciliaris|geniculate|globus pallidus|putamen|\bnerve\b|trochlea of|common tendinous ring/
const LARYNX = /cricothyroid|conus elasticus|thyrohyoid membrane|larynx|thyroid cartilage|cricoid|epiglott|arytenoid/
const VESSEL = /\b(artery|arteries|vein|veins|aorta|vena cava|venous|arterial|coronary sinus|pulmonary trunk|celiac trunk|palmar arch|wall of ventricle|thyrocervical trunk|costocervical trunk|brachiocephalic trunk|arch of aorta)\b/i

function classify(fj, name) {
  const P = partof.tree.get(fj) ?? new Set()
  const I = isa.tree.get(fj) ?? new Set()
  const n = name.toLowerCase()
  if (/pubic hair/.test(n)) return 'reproductive'
  if (P.has('integumentary system') || n === 'skin' || /hair of head|eyebrow|^lip$/.test(n)) return 'integumentary'
  // the liver is modelled as its segments (Couinaud "hepatovenous segments"), with the bile ducts inside
  if (/hepatovenous segment|lobe of liver|biliary|hepatic duct|bile duct|cystic duct/.test(n)) return 'digestive'
  if (P.has('cardiovascular system') || I.has('artery') || I.has('vein') || VESSEL.test(n)) return 'circulatory'
  if (P.has('endocrine system') && !/pancrea/.test(n)) return 'endocrine'
  if (I.has('spleen') || n === 'spleen' || /thymus/.test(n)) return 'circulatory' // lymphoid organs sit with the blood system here
  if (P.has('urinary system')) return 'urinary'
  if (P.has('genital system') || /testis|penis|prostate|scrot|epididym|seminal|deferent duct|ductus deferens|spermatic/.test(n)) return 'reproductive'
  if (P.has('nervous system') || I.has('nerve') || I.has('segment of neuraxis') || BRAIN.test(n) || /eyeball|cornea|sclera|choroid|retina|\blens\b|iris|vitreous|lacrimal|eyelid|\bear\b|cochlea/.test(n)) return 'nervous'
  if (P.has('respiratory system') || LARYNX.test(n) || /nasal|nose|alar cartilage/.test(n)) return 'respiratory'
  if (P.has('alimentary system') || I.has('tooth') || /tooth|gingiva|tongue|salivary|parotid|submandibular|sublingual|pharyn|palat(e|ine tonsil)|duct of .*liver|biliary|pterygomandibular raphe/.test(n)) return 'digestive'
  if (I.has('bone organ') || I.has('cartilage organ') || P.has('skeletal system') || /bone|vertebra|\brib\b|sternum|manubrium|xiphoid|phalanx|patella|sacrum|coccyx|clavicle|scapula|intervertebral disk|meniscus|costal cartilage|ligament|interosseous membrane/.test(n)) return 'skeletal'
  if (I.has('muscle organ') || P.has('deep fascial system') || /muscle|fascia|tendon|aponeurosis|retinaculum|iliotibial|sphincter|\b(head|part) of\b|vastus|rectus femoris|interossei|lumbricals|levatores|longus colli|intertransversari|interspinales|rotator|spinalis|tendinous arch|linea alba|iliococcygeus|pubococcygeus|puborectalis/.test(n)) return 'muscular'
  return null
}

/** Systems a structure is also shown in (the endocrine glands that are part of other organs) */
function alsoIn(name) {
  const n = name.toLowerCase()
  const s = []
  if (/pancrea/.test(n)) s.push('endocrine')
  if (/testis/.test(n)) s.push('endocrine')
  if (/thymus/.test(n)) s.push('endocrine')
  if (n === 'diaphragm') s.push('muscular')
  return s
}

// --- school-level organs: the most specific of these part-of concepts that holds the element ---
const GROUPS = [
  'brain', 'cerebellum', 'brainstem', 'left cerebral hemisphere', 'right cerebral hemisphere', 'spinal cord', 'left eyeball', 'right eyeball',
  'heart', 'aorta', 'inferior vena cava', 'superior vena cava', 'pulmonary trunk',
  'left lung', 'right lung', 'trachea', 'left main bronchus', 'right main bronchus', 'external nose',
  'esophagus', 'stomach', 'liver', 'gallbladder', 'pancreas', 'small intestine', 'large intestine', 'tongue', 'mouth',
  'left kidney', 'right kidney', 'left ureter', 'right ureter', 'urinary bladder', 'urethra',
  'skull', 'rib cage', 'vertebral column', 'sternum', 'thymus',
]
/** the system each school-level group belongs to: a group only collects elements of its own system */
const GROUP_SYSTEM = {
  brain: 'nervous', cerebellum: 'nervous', brainstem: 'nervous', 'left cerebral hemisphere': 'nervous', 'right cerebral hemisphere': 'nervous', 'spinal cord': 'nervous', 'left eyeball': 'nervous', 'right eyeball': 'nervous',
  heart: 'circulatory', aorta: 'circulatory', 'inferior vena cava': 'circulatory', 'superior vena cava': 'circulatory', 'pulmonary trunk': 'circulatory', thymus: 'circulatory',
  'left lung': 'respiratory', 'right lung': 'respiratory', trachea: 'respiratory', 'left main bronchus': 'respiratory', 'right main bronchus': 'respiratory', 'external nose': 'respiratory',
  esophagus: 'digestive', stomach: 'digestive', liver: 'digestive', gallbladder: 'digestive', pancreas: 'digestive', 'small intestine': 'digestive', 'large intestine': 'digestive', tongue: 'digestive', mouth: 'digestive',
  'left kidney': 'urinary', 'right kidney': 'urinary', 'left ureter': 'urinary', 'right ureter': 'urinary', 'urinary bladder': 'urinary', urethra: 'urinary',
  skull: 'skeletal', 'rib cage': 'skeletal', 'vertebral column': 'skeletal', sternum: 'skeletal',
}
const groupName = (fj, name, system) => {
  const P = partof.tree.get(fj)
  const n = name.toLowerCase()
  let best = null
  // heart vessels (coronary arteries and cardiac veins) stay themselves; the heart's walls, valves and chambers join "heart"
  const vessel = system === 'circulatory' && /artery|vein|sinus|vena|aorta|trunk/.test(n)
  if (P) for (const g of GROUPS) {
    if (!P.has(g) || GROUP_SYSTEM[g] !== system) continue
    if (vessel && g === 'heart') continue
    if (best === null || partof.counts.get(g) < partof.counts.get(best)) best = g
  }
  if (best) return best
  if (system === 'circulatory' && !vessel && /ventricle|atrium|atrial|valve|cusp|leaflet|papillary|myocard|interventricular septum/.test(n)) return 'heart'
  // muscle heads and parts belong to the whole muscle ("long head of right biceps brachii" -> "right biceps brachii")
  const part = /^(?:[a-z ]+ )?(?:head|part|belly) of (left |right )?(.+)$/.exec(n)
  if (system === 'muscular' && part) return (part[1] ?? '') + part[2]
  if (system === 'reproductive' && /penis|pubic hair|external genitalia/.test(n)) return 'external genitalia'
  if (system === 'digestive' && /incisor|canine|premolar|molar|tooth/.test(n)) return 'teeth'
  return n.replace(/^set of /, '')
}
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** What a structure is, so the viewer can colour it */
function kindOf(system, name, fj) {
  const n = name.toLowerCase()
  const I = isa.tree.get(fj) ?? new Set()
  if (system === 'integumentary') return 'skin'
  if (/vein|vena|venous|sinus/.test(n) || I.has('vein')) return 'vein'
  if (/artery|aorta|arterial|trunk$/.test(n) || I.has('artery')) return 'artery'
  if (system === 'circulatory') return /spleen|thymus/.test(n) ? 'organ' : 'heart'
  if (/tooth|incisor|canine|molar/.test(n)) return 'tooth'
  if (system === 'skeletal') return /disk|cartilage|meniscus|ligament/.test(n) ? 'cartilage' : 'bone'
  if (system === 'muscular') return /fascia|tendon|aponeurosis|retinaculum|iliotibial/.test(n) ? 'tendon' : 'muscle'
  if (system === 'nervous') return /eyeball|cornea|sclera|choroid|iris|lens|vitreous|chamber|lacrimal|eyelid/.test(n) ? 'eye' : /nerve|plexus/.test(n) ? 'nerve' : 'brain'
  if (system === 'endocrine') return 'gland'
  if (/duct|biliary/.test(n)) return 'duct'
  return 'organ'
}

// --- OBJ -> positions, normals, indices in metres, y up ---
let OFFSET = null // set from the skin, so feet sit on y = 0 and the body is centred
function parseObj(text) {
  const head = {}
  const v = [], vn = [], idx = [], nIdx = []
  for (const line of text.split('\n')) {
    if (line.charCodeAt(0) === 35) { // '#'
      const m = /^# (File ID|Concept ID|English name|Representation ID|Bounds\(mm\)) : (.*)$/.exec(line.trim())
      if (m) head[m[1]] = m[2].trim()
      continue
    }
    if (line.startsWith('v ')) { const p = line.split(/\s+/); v.push(+p[1], +p[2], +p[3]) }
    else if (line.startsWith('vn ')) { const p = line.split(/\s+/); vn.push(+p[1], +p[2], +p[3]) }
    else if (line.startsWith('f ')) {
      const p = line.trim().split(/\s+/).slice(1).map(t => t.split('/'))
      for (let k = 1; k + 1 < p.length; k++) for (const q of [p[0], p[k], p[k + 1]]) { idx.push(+q[0] - 1); nIdx.push(q[2] ? +q[2] - 1 : +q[0] - 1) }
    }
  }
  return { head, v, vn, idx, nIdx }
}
function toMesh({ v, vn, idx, nIdx }) {
  // the files use the same index for v and vn; if not, fall back to one vertex per corner
  const same = vn.length === v.length && idx.every((a, i) => a === nIdx[i])
  const count = same ? v.length / 3 : idx.length
  const pos = new Float32Array(count * 3), nor = new Float32Array(count * 3)
  const put = (dst, i, src, j, isPos) => {
    const x = src[j * 3], y = src[j * 3 + 1], z = src[j * 3 + 2]
    if (isPos) { dst[i * 3] = (x - OFFSET[0]) / 1000; dst[i * 3 + 1] = (z - OFFSET[2]) / 1000; dst[i * 3 + 2] = -(y - OFFSET[1]) / 1000 }
    else { dst[i * 3] = x; dst[i * 3 + 1] = z; dst[i * 3 + 2] = -y }
  }
  let indices
  if (same) {
    for (let i = 0; i < count; i++) { put(pos, i, v, i, true); put(nor, i, vn, i, false) }
    indices = Uint32Array.from(idx)
  } else {
    for (let i = 0; i < count; i++) { put(pos, i, v, idx[i], true); vn.length ? put(nor, i, vn, nIdx[i], false) : 0 }
    indices = Uint32Array.from({ length: count }, (_, i) => i)
  }
  return { pos, nor, indices }
}
function bounds(pos) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) { const a = pos[i + k]; if (a < min[k]) min[k] = a; if (a > max[k]) max[k] = a }
  return { min, max }
}

// --- a minimal glTF 2.0 binary writer: one node + mesh per element, one material ---
function writeGlb(file, meshes) {
  const chunks = []
  let byteLength = 0
  const views = [], accessors = [], gltfMeshes = [], nodes = []
  const addView = (arr, target) => {
    const buf = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength)
    const pad = (4 - (buf.length % 4)) % 4
    views.push({ buffer: 0, byteOffset: byteLength, byteLength: buf.length, target })
    chunks.push(buf, Buffer.alloc(pad))
    byteLength += buf.length + pad
    return views.length - 1
  }
  for (const m of meshes) {
    const b = bounds(m.pos)
    const pv = addView(m.pos, 34962), nv = addView(m.nor, 34962), iv = addView(m.indices, 34963)
    accessors.push({ bufferView: pv, componentType: 5126, count: m.pos.length / 3, type: 'VEC3', min: b.min, max: b.max })
    accessors.push({ bufferView: nv, componentType: 5126, count: m.nor.length / 3, type: 'VEC3' })
    accessors.push({ bufferView: iv, componentType: 5125, count: m.indices.length, type: 'SCALAR' })
    const a = accessors.length - 3
    gltfMeshes.push({ name: m.id, primitives: [{ attributes: { POSITION: a, NORMAL: a + 1 }, indices: a + 2, material: 0 }] })
    nodes.push({ name: m.id, mesh: gltfMeshes.length - 1, extras: { name: m.name } })
  }
  const json = {
    asset: { version: '2.0', generator: 'eSpace build-bodyparts3d', copyright: 'BodyParts3D, (c) The Database Center for Life Science, CC BY 4.0' },
    scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes: gltfMeshes,
    materials: [{ name: 'anatomy', pbrMetallicRoughness: { baseColorFactor: [0.8, 0.8, 0.8, 1], metallicFactor: 0, roughnessFactor: 0.6 } }],
    accessors, bufferViews: views, buffers: [{ byteLength }],
  }
  let jsonBuf = Buffer.from(JSON.stringify(json))
  jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc((4 - (jsonBuf.length % 4)) % 4, 0x20)])
  const bin = Buffer.concat(chunks)
  const header = Buffer.alloc(12)
  header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(12 + 8 + jsonBuf.length + 8 + bin.length, 8)
  const jh = Buffer.alloc(8); jh.writeUInt32LE(jsonBuf.length, 0); jh.writeUInt32LE(0x4e4f534a, 4)
  const bh = Buffer.alloc(8); bh.writeUInt32LE(bin.length, 0); bh.writeUInt32LE(0x004e4942, 4)
  fs.writeFileSync(file, Buffer.concat([header, jh, jsonBuf, bh, bin]))
}

// --- run ---
const files = fs.readdirSync(objDir).filter(f => /^FJ\d+M?\.obj$/i.test(f)).sort()
console.log(`${files.length} element files`)
// the skin sets the origin: centred left-right and front-back, feet on the floor
{
  const skinId = [...partof.tree].find(([, s]) => s.has('integumentary system'))?.[0]
  const head = fs.readFileSync(path.join(objDir, `${skinId}.obj`), 'utf8').slice(0, 2000)
  const m = /Bounds\(mm\): \(([^)]*)\)-\(([^)]*)\)/.exec(head)
  const a = m[1].split(',').map(Number), b = m[2].split(',').map(Number)
  OFFSET = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, a[2]]
  console.log('origin (mm)', OFFSET.map(x => x.toFixed(1)).join(', '), 'height', ((b[2] - a[2]) / 1000).toFixed(3), 'm')
}

const bySystem = Object.fromEntries(SYSTEMS.map(s => [s, []]))
const structures = []
const skipped = []
for (const f of files) {
  const text = fs.readFileSync(path.join(objDir, f), 'utf8')
  const o = parseObj(text)
  const id = o.head['File ID'] ?? f.replace(/\.obj$/i, '')
  let rawName = o.head['English name'] || ''
  // a few right-side files have no name; their mirrored left twin (FJ....M) has the same concept and names it
  if (!rawName && fs.existsSync(path.join(objDir, `${id}M.obj`))) {
    rawName = /# English name : (.*)/.exec(fs.readFileSync(path.join(objDir, `${id}M.obj`), 'utf8').slice(0, 3000))?.[1]?.trim() ?? ''
  }
  if (!rawName) { skipped.push(`${id} (no name in the file)`); continue }
  // left out on purpose: shown as a dark mass over the groin, it hid the skin and organs (the school asked for plain skin there)
  if (/pubic hair/i.test(rawName)) continue
  const name = rawName.charAt(0).toUpperCase() + rawName.slice(1)
  const system = classify(id, rawName)
  if (!system) { skipped.push(`${id} ${rawName}`); continue }
  const mesh = toMesh(o)
  const b = bounds(mesh.pos)
  const group = groupName(id, rawName, system)
  bySystem[system].push({ id, name, ...mesh })
  structures.push({
    id, name, fma: o.head['Concept ID'] ?? null, system, also: alsoIn(rawName), kind: kindOf(system, rawName, id),
    group: slug(group), groupName: group.charAt(0).toUpperCase() + group.slice(1),
    centre: b.min.map((x, k) => +(((x + b.max[k]) / 2).toFixed(4))),
    size: b.min.map((x, k) => +((b.max[k] - x).toFixed(4))),
  })
}
console.log('skipped (no system):', skipped.length); for (const s of skipped) console.log('  ', s)

// The lung lobes from release 3.0 (same body, same coordinate system - checked against the stomach,
// which both releases have). They join the "right lung" / "left lung" organs of the respiratory system.
const LOBES = [
  ['FMA7333', 'Upper lobe of right lung', 'right lung'], ['FMA7383', 'Middle lobe of right lung', 'right lung'], ['FMA7337', 'Lower lobe of right lung', 'right lung'],
  ['FMA7370', 'Upper lobe of left lung', 'left lung'], ['FMA7371', 'Lower lobe of left lung', 'left lung'],
]
let lungSource = null
if (lungsDir) {
  const headerOf = (file) => fs.readFileSync(file, 'utf8').slice(0, 3000)
  const v3 = fs.readdirSync(lungsDir).filter(f => /\.obj$/i.test(f))
  const byFma = new Map()
  for (const f of v3) {
    const m = /Concept ID\s*:\s*(FMA\d+)/i.exec(headerOf(path.join(lungsDir, f))) ?? /^(FMA\d+)\.obj$/i.exec(f)
    if (m) byFma.set(m[1].toUpperCase(), f)
  }
  // Release 3.0 sits 18-32 mm higher than 4.0 and some organs were reshaped, so the lobes are
  // aligned locally: moved by the difference between the two releases' tracheas (the airway that
  // leads into the lungs). Refused if that shift is implausibly large.
  const centreOf = (v) => { const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity]; for (let i = 0; i < v.length; i += 3) for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], v[i + k]); hi[k] = Math.max(hi[k], v[i + k]) } return lo.map((x, k) => (x + hi[k]) / 2) }
  const trachea4 = files.find(f => /English name : Trachea\s*$/m.test(headerOf(path.join(objDir, f))))
  const trachea3 = byFma.get('FMA7394')
  if (!trachea4 || !trachea3) throw new Error('Need the trachea in both releases to align the lungs (fetch FMA7394.obj from release 3.0)')
  const c4 = centreOf(parseObj(fs.readFileSync(path.join(objDir, trachea4), 'utf8')).v)
  const c3 = centreOf(parseObj(fs.readFileSync(path.join(lungsDir, trachea3), 'utf8')).v)
  const shift = c4.map((x, k) => x - c3[k])
  console.log(`lung alignment shift from the trachea (mm): ${shift.map(x => x.toFixed(1)).join(', ')}`)
  if (Math.hypot(...shift) > 50) throw new Error('Release 3.0 trachea is too far from 4.0 - lungs not added')
  let added = 0
  for (const [fma, name, group] of LOBES) {
    const f = byFma.get(fma)
    if (!f) { console.log(`  lung lobe ${fma} (${name}) not found in ${lungsDir}`); continue }
    const o = parseObj(fs.readFileSync(path.join(lungsDir, f), 'utf8'))
    for (let i = 0; i < o.v.length; i += 3) for (let k = 0; k < 3; k++) o.v[i + k] += shift[k]
    const mesh = toMesh(o)
    const b = bounds(mesh.pos)
    const id = `V3${fma}`
    bySystem.respiratory.push({ id, name, ...mesh })
    structures.push({
      id, name, fma, system: 'respiratory', also: [], kind: 'organ', group: slug(group), groupName: group.charAt(0).toUpperCase() + group.slice(1),
      centre: b.min.map((x, k) => +(((x + b.max[k]) / 2).toFixed(4))), size: b.min.map((x, k) => +((b.max[k] - x).toFixed(4))),
      source: 'bp3d-3.0',
    })
    added++
  }
  console.log(`lung lobes added: ${added}`)
  if (added) lungSource = {
    name: 'BodyParts3D', version: '3.0', holder: 'The Database Center for Life Science (DBCLS)', licence: 'CC BY-SA 2.1 JP',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en',
    attribution: 'Lung lobes: BodyParts3D 3.0, © The Database Center for Life Science licensed under CC Attribution-Share Alike 2.1 Japan',
    url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html',
    covers: 'The five lung lobes',
  }
}

// Female reproductive organs from the Human Reference Atlas (female Visible Human, CC BY 4.0). Same axes
// and units as this model (y up, +z front, +x the body's left, metres); moved so the two bladders coincide.
let femaleSource = null
if (femaleDir) {
  /** meshes of a GLB (uncompressed, no node transforms), by node name */
  const readGlb = (file) => {
    const buf = fs.readFileSync(file)
    const jlen = buf.readUInt32LE(12)
    const j = JSON.parse(buf.subarray(20, 20 + jlen).toString())
    const binStart = 20 + jlen + 8
    const view = (ai) => {
      const a = j.accessors[ai], bv = j.bufferViews[a.bufferView]
      const comps = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[a.type]
      const start = binStart + (bv.byteOffset ?? 0) + (a.byteOffset ?? 0)
      const Ctor = { 5126: Float32Array, 5125: Uint32Array, 5123: Uint16Array, 5121: Uint8Array }[a.componentType]
      const stride = bv.byteStride ?? comps * Ctor.BYTES_PER_ELEMENT
      const out = new (a.componentType === 5126 ? Float32Array : Uint32Array)(a.count * comps)
      for (let i = 0; i < a.count; i++) {
        const src = new Ctor(buf.buffer.slice(buf.byteOffset + start + i * stride, buf.byteOffset + start + i * stride + comps * Ctor.BYTES_PER_ELEMENT))
        for (let k = 0; k < comps; k++) out[i * comps + k] = src[k]
      }
      return out
    }
    const meshes = new Map()
    for (const n of j.nodes) {
      if (n.mesh === undefined) continue
      if (n.matrix || n.translation || n.rotation || n.scale) throw new Error(`${file}: node transforms are not supported`)
      const pos = [], nor = [], idx = []
      for (const p of j.meshes[n.mesh].primitives) {
        const base = pos.length / 3
        const P = view(p.attributes.POSITION)
        const N = p.attributes.NORMAL !== undefined ? view(p.attributes.NORMAL) : null
        const I = p.indices !== undefined ? view(p.indices) : Uint32Array.from({ length: P.length / 3 }, (_, i) => i)
        pos.push(...P); nor.push(...(N ?? new Float32Array(P.length))); for (const i of I) idx.push(i + base)
      }
      meshes.set(n.name, { pos, nor, idx })
    }
    return meshes
  }
  const boxOfArr = (pos) => bounds(Float32Array.from(pos))
  // where the female bladder is, and where ours is
  const fb = readGlb(path.join(femaleDir, 'urinary-bladder-female.glb'))
  const allPos = [...fb.values()].flatMap(m => m.pos)
  const fbBox = boxOfArr(allPos)
  const ours = structures.find(s => s.name === 'Urinary bladder')
  if (!ours) throw new Error('no urinary bladder in the model to align the female organs to')
  const shift = ours.centre.map((c, k) => c - (fbBox.min[k] + fbBox.max[k]) / 2)
  console.log(`female organs shift (m): ${shift.map(x => x.toFixed(3)).join(', ')}`)
  // the uterus file divides the organ two ways (by region and by wall); only the regional parts are used
  const PARTS = [
    ['uterus-female.glb', [
      ['VH_F_fundus_of_uterus', 'Fundus of uterus'], ['VH_F_body_of_uterus', 'Body of uterus'], ['VH_F_cornua', 'Cornua of uterus'],
      ['VH_F_lower_uterine_segment', 'Lower uterine segment'], ['VH_F_abdominal_ostium_of_uterine_tube', 'Openings of the uterine tubes'],
      ['VH_F_cervix', 'Cervix'], ['VH_F_internal_cervical_os', 'Internal os of cervix'], ['VH_F_external_cervical_os', 'External os of cervix'],
      ['VH_F_cervicovaginal_junction', 'Top of the vagina (cervicovaginal junction)'],
    ], 'uterus', []],
    ['ovary-female-left.glb', [['VH_F_left_ovary', 'Left ovary']], 'left ovary', ['endocrine']],
    ['ovary-female-right.glb', [['VH_F_right_ovary', 'Right ovary']], 'right ovary', ['endocrine']],
    ['fallopian-tube-female-left.glb', [
      ['VH_F_isthmus_of_fallopian_tube_L', 'Isthmus of left uterine tube'], ['VH_F_ampulla_of_uterine_tube_L', 'Ampulla of left uterine tube'],
      ['VH_F_uterine_tube_infundibulum_L', 'Infundibulum of left uterine tube'], ['VH_F_fibria_of_uterine_tube_L', 'Fimbriae of left uterine tube'],
    ], 'left uterine tube', []],
    ['fallopian-tube-female-right.glb', [
      ['VH_F_isthmus_of_fallopian_tube_R', 'Isthmus of right uterine tube'], ['VH_F_ampulla_of_uterine_tube_R', 'Ampulla of right uterine tube'],
      ['VH_F_uterine_tube_infundibulum_R', 'Infundibulum of right uterine tube'], ['VH_F_fibria_of_uterine_tube_R', 'Fimbriae of right uterine tube'],
    ], 'right uterine tube', []],
  ]
  let n = 0
  for (const [file, parts, group, also] of PARTS) {
    const meshes = readGlb(path.join(femaleDir, file))
    for (const [node, name] of parts) {
      const m = meshes.get(node)
      if (!m) { console.log(`  ${file}: ${node} missing`); continue }
      const pos = Float32Array.from(m.pos)
      for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) pos[i + k] += shift[k]
      const id = `HRAF${String(++n).padStart(2, '0')}`
      bySystem.reproductive.push({ id, name, pos, nor: Float32Array.from(m.nor), indices: Uint32Array.from(m.idx) })
      const b = bounds(pos)
      structures.push({
        id, name, fma: null, system: 'reproductive', also, kind: 'organ', group: slug(group), groupName: group.charAt(0).toUpperCase() + group.slice(1),
        centre: b.min.map((x, k) => +(((x + b.max[k]) / 2).toFixed(4))), size: b.min.map((x, k) => +((b.max[k] - x).toFixed(4))),
        sex: 'female', source: 'hra',
      })
    }
  }
  console.log(`female organs added: ${n} parts`)
  if (n) femaleSource = {
    name: 'Human Reference Atlas 3D reference organs', version: 'uterus v1.2, ovaries v1.3, uterine tubes v1.2',
    holder: 'Kristen Browne and Heidi Schlehlein (HuBMAP / NIH); data from the Visible Human Dataset, National Library of Medicine',
    licence: 'CC BY 4.0', licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'Female reproductive organs: Human Reference Atlas 3D reference organs by Kristen Browne and Heidi Schlehlein, from the Visible Human Dataset (NLM), CC BY 4.0',
    url: 'https://humanatlas.io/3d-reference-library',
    covers: 'Female reproductive organs',
  }
}
// the male reproductive organs are marked too, so the viewer can show one sex at a time
for (const s of structures) if (s.system === 'reproductive' && !s.sex && /testis|penis|prostate|seminal|deferent|epididym|genitalia|pubic hair/i.test(s.name)) s.sex = 'male'

// The skin over the external genitalia becomes its own structure in the reproductive system, so the
// viewer can show it plainly (age-appropriate setting) without cutting a hole in the skin.
{
  const genital = bySystem.reproductive.filter(m => /penis|testis|scrot/i.test(m.name))
  const skinMesh = bySystem.integumentary.find(m => m.name.toLowerCase() === 'skin')
  if (genital.length && skinMesh) {
    const box = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] }
    for (const m of genital) { const b = bounds(m.pos); for (let k = 0; k < 3; k++) { box.min[k] = Math.min(box.min[k], b.min[k]); box.max[k] = Math.max(box.max[k], b.max[k]) } }
    const M = 0.025
    const inBox = (x, y, z) => x > box.min[0] - M && x < box.max[0] + M && y > box.min[1] - M && y < box.max[1] + M * 1.6 && z > box.min[2] - 0.01 && z < box.max[2] + M
    const keep = [], cut = []
    const p = skinMesh.pos, ix = skinMesh.indices
    for (let t = 0; t < ix.length; t += 3) {
      let cx = 0, cy = 0, cz = 0
      for (let k = 0; k < 3; k++) { cx += p[ix[t + k] * 3]; cy += p[ix[t + k] * 3 + 1]; cz += p[ix[t + k] * 3 + 2] }
      ;(inBox(cx / 3, cy / 3, cz / 3) ? cut : keep).push(ix[t], ix[t + 1], ix[t + 2])
    }
    skinMesh.indices = Uint32Array.from(keep)
    // The cover: the same patch relaxed into a smooth membrane (its edge stays fixed to the skin, the
    // inside is averaged out), shown with the skin when reproductive content is off. Not anatomy - the
    // manifest marks it as a cover.
    {
      const used = [...new Set(cut)]
      const remap = new Map(used.map((v, i) => [v, i]))
      const cpos = new Float32Array(used.length * 3)
      used.forEach((v, i) => { cpos[i * 3] = p[v * 3]; cpos[i * 3 + 1] = p[v * 3 + 1]; cpos[i * 3 + 2] = p[v * 3 + 2] })
      const cidx = Uint32Array.from(cut.map(v => remap.get(v)))
      const edges = new Map(), nbr = used.map(() => new Set())
      for (let t = 0; t < cidx.length; t += 3) for (let k = 0; k < 3; k++) {
        const a = cidx[t + k], b = cidx[t + (k + 1) % 3]
        const key = a < b ? `${a}_${b}` : `${b}_${a}`
        edges.set(key, (edges.get(key) ?? 0) + 1)
        nbr[a].add(b); nbr[b].add(a)
      }
      const fixed = new Uint8Array(used.length)
      for (const [key, n] of edges) if (n === 1) { const [a, b] = key.split('_').map(Number); fixed[a] = fixed[b] = 1 }
      const tmp = new Float32Array(cpos.length)
      for (let it = 0; it < 4000; it++) {
        tmp.set(cpos)
        for (let i = 0; i < used.length; i++) {
          if (fixed[i] || !nbr[i].size) continue
          let x = 0, y = 0, z = 0
          for (const j of nbr[i]) { x += tmp[j * 3]; y += tmp[j * 3 + 1]; z += tmp[j * 3 + 2] }
          const n = nbr[i].size
          cpos[i * 3] = x / n; cpos[i * 3 + 1] = y / n; cpos[i * 3 + 2] = z / n
        }
      }
      // normals from the new shape (edge vertices keep the skin's normals so the seam is invisible)
      const cnor = new Float32Array(cpos.length)
      for (let t = 0; t < cidx.length; t += 3) {
        const [a, b, c] = [cidx[t], cidx[t + 1], cidx[t + 2]]
        const ux = cpos[b * 3] - cpos[a * 3], uy = cpos[b * 3 + 1] - cpos[a * 3 + 1], uz = cpos[b * 3 + 2] - cpos[a * 3 + 2]
        const vx = cpos[c * 3] - cpos[a * 3], vy = cpos[c * 3 + 1] - cpos[a * 3 + 1], vz = cpos[c * 3 + 2] - cpos[a * 3 + 2]
        const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx
        for (const v of [a, b, c]) { cnor[v * 3] += nx; cnor[v * 3 + 1] += ny; cnor[v * 3 + 2] += nz }
      }
      used.forEach((v, i) => {
        if (fixed[i]) { cnor[i * 3] = skinMesh.nor[v * 3]; cnor[i * 3 + 1] = skinMesh.nor[v * 3 + 1]; cnor[i * 3 + 2] = skinMesh.nor[v * 3 + 2]; return }
        const l = Math.hypot(cnor[i * 3], cnor[i * 3 + 1], cnor[i * 3 + 2]) || 1
        cnor[i * 3] /= l; cnor[i * 3 + 1] /= l; cnor[i * 3 + 2] /= l
      })
      const coverId = `${skinMesh.id}C`
      bySystem.integumentary.push({ id: coverId, name: 'Skin', pos: cpos, nor: cnor, indices: cidx })
      const skinEntry = structures.find(s => s.id === skinMesh.id)
      structures.push({ ...skinEntry, id: coverId, cover: true })
    }
    const id = `${skinMesh.id}G`
    bySystem.reproductive.push({ id, name: 'Skin of the external genitalia', pos: skinMesh.pos, nor: skinMesh.nor, indices: Uint32Array.from(cut) })
    const centre = box.min.map((x, k) => +(((x + box.max[k]) / 2).toFixed(4)))
    structures.push({ id, name: 'Skin of the external genitalia', fma: null, system: 'reproductive', also: [], kind: 'skin', group: 'external-genitalia', groupName: 'External genitalia', sex: 'male',
      centre, size: box.min.map((x, k) => +((box.max[k] - x).toFixed(4))) })
    console.log(`genital skin: ${cut.length / 3} of ${ix.length / 3} skin triangles`)
  }
}

const gltfpack = path.join(HERE, '../../node_modules/gltfpack/cli.js')
// how much of each system's detail to keep (the skin and the vessels are very dense)
const RATIO = { integumentary: 0.12, skeletal: 0.3, muscular: 0.3, circulatory: 0.3, respiratory: 0.3, digestive: 0.35, nervous: 0.35, urinary: 0.5, reproductive: 0.5, endocrine: 0.6 }
const systems = {}
for (const s of SYSTEMS) {
  const list = bySystem[s]
  if (!list.length) { systems[s] = { file: null, count: 0, bytes: 0 }; continue }
  const raw = path.join(TMP, `${s}.glb`), out = path.join(OUT, `${s}.glb`)
  writeGlb(raw, list)
  // -kn keep named nodes (one per structure), -ke keep extras, -cc meshopt compression, -si simplify
  execFileSync(process.execPath, [gltfpack, '-i', raw, '-o', out, '-kn', '-ke', '-cc', '-si', String(RATIO[s]), '-slb'], { stdio: 'inherit' })
  const bytes = fs.statSync(out).size
  systems[s] = { file: `${s}.glb`, count: list.length, bytes }
  console.log(`${s.padEnd(14)} ${String(list.length).padStart(5)} structures  ${(fs.statSync(raw).size / 1e6).toFixed(1)} MB -> ${(bytes / 1e6).toFixed(2)} MB`)
}
fs.rmSync(TMP, { recursive: true, force: true })

const manifest = {
  version: 1,
  source: {
    name: 'BodyParts3D',
    version: '4.0',
    holder: 'The Database Center for Life Science (DBCLS)',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: 'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International',
    url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html',
    changes: 'Converted from OBJ to GLB, re-oriented (y up, metres), grouped by body system, simplified and compressed.',
  },
  /** other releases used for particular structures (each structure names its source) */
  extraSources: [lungSource, femaleSource].filter(Boolean),
  units: 'm',
  height: null,
  systems,
  structures,
}
const skin = structures.find(s => s.system === 'integumentary')
if (skin) manifest.height = +(skin.centre[1] + skin.size[1] / 2).toFixed(3)
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest))
console.log(`manifest: ${structures.length} structures, ${(fs.statSync(path.join(OUT, 'manifest.json')).size / 1e3).toFixed(0)} kB`)
